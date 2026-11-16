// Public-page fetch used by the reverse audit.
// Bounds every outbound request: public hosts only, short timeout, capped
// body, limited redirects. Pages are fetched concurrently by the caller.

const dns = require("dns").promises;
const net = require("net");

const DEFAULT_TIMEOUT_MS = 8000;
const DEFAULT_MAX_BYTES = 750_000;
const DEFAULT_MAX_REDIRECTS = 3;

function tooLarge() {
  const err = new Error("body-too-large");
  err.code = "body-too-large";
  return err;
}

function coded(code) {
  const err = new Error(code);
  err.code = code;
  return err;
}

function isPrivateAddress(ip) {
  if (typeof ip !== "string" || !ip) return true;
  let addr = ip.toLowerCase().split("%")[0];
  if (addr.startsWith("[") && addr.endsWith("]")) addr = addr.slice(1, -1);
  if (addr.startsWith("::ffff:")) {
    const mapped = addr.slice("::ffff:".length);
    if (net.isIP(mapped) === 4) return isPrivateAddress(mapped);
  }

  if (net.isIP(addr) === 4) {
    const parts = addr.split(".").map((n) => Number(n));
    if (parts.length !== 4 || parts.some((n) => !Number.isInteger(n) || n < 0 || n > 255)) return true;
    const [a, b, c] = parts;
    if (a === 0 || a === 10 || a === 127) return true;
    if (a === 169 && b === 254) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    if (a === 100 && b >= 64 && b <= 127) return true; // CGNAT
    if (a === 192 && b === 0 && (c === 0 || c === 2)) return true;
    if (a === 198 && (b === 18 || b === 19)) return true;
    if (a === 198 && b === 51 && c === 100) return true;
    if (a === 203 && b === 0 && c === 113) return true;
    if (a >= 224) return true;
    return false;
  }

  if (net.isIP(addr) === 6) {
    if (addr === "::" || addr === "::1") return true;
    const pieces = addr.split(":");
    const head = pieces[0] || "";
    if (head.startsWith("fc") || head.startsWith("fd")) return true; // fc00::/7
    if (/^fe[89ab]/.test(head)) return true; // fe80::/10
    if (head.startsWith("ff")) return true; // multicast
    if (head === "2001" && (pieces[1] || "").startsWith("db8")) return true;
    return false;
  }

  return true;
}

function hostBlocked(host) {
  const name = String(host || "").replace(/^\[|\]$/g, "").toLowerCase();
  if (!name) return true;
  if (name === "localhost" || name.endsWith(".localhost") || name.endsWith(".local") || name.endsWith(".internal")) {
    return true;
  }
  // Decimal or hex IP literals (http://2130706433 → 127.0.0.1) bypass net.isIP.
  if (/^\d+$/.test(name) || /^0x[0-9a-f.]+$/i.test(name)) return true;
  if (/^[\d.]+$/.test(name) && net.isIP(name) === 0) return true;
  return false;
}

async function defaultLookup(host) {
  return dns.lookup(host, { all: true, verbatim: true });
}

// One lookup per host per scan. Parallel page fetches would otherwise resolve
// the same name again, and a cached promise is shared if they overlap.
function memoLookup(lookup = defaultLookup) {
  const cache = new Map();
  return (host, options) => {
    const key = String(host || "").toLowerCase();
    if (!cache.has(key)) cache.set(key, Promise.resolve().then(() => lookup(host, options)));
    return cache.get(key);
  };
}

function screenHttpUrl(rawUrl) {
  let url;
  try {
    url = rawUrl instanceof URL ? rawUrl : new URL(rawUrl);
  } catch {
    throw coded("invalid-url");
  }
  if (url.username || url.password) throw coded("blocked-url");
  if (url.protocol !== "http:" && url.protocol !== "https:") throw coded("blocked-url");
  const host = url.hostname.replace(/^\[|\]$/g, "");
  if (hostBlocked(host)) throw coded("blocked-url");
  if (net.isIP(host) && isPrivateAddress(host)) throw coded("blocked-url");
  return url;
}

async function assertPublicHttpUrl(rawUrl, lookup = defaultLookup) {
  const url = screenHttpUrl(rawUrl);
  const host = url.hostname.replace(/^\[|\]$/g, "");
  if (net.isIP(host)) return url;

  let records;
  try {
    records = await lookup(host, { all: true, verbatim: true });
  } catch {
    throw coded("unreachable");
  }
  const list = Array.isArray(records) ? records : records ? [records] : [];
  if (!list.length || list.some((record) => isPrivateAddress(record.address))) {
    throw coded("blocked-url");
  }
  return url;
}

async function cancelBody(res) {
  try {
    if (res && res.body && typeof res.body.cancel === "function") await res.body.cancel();
  } catch {
    /* already closed */
  }
}

async function readCappedText(body, maxBytes) {
  if (body == null) return "";
  if (typeof body === "string") {
    if (Buffer.byteLength(body) > maxBytes) throw tooLarge();
    return body;
  }
  if (Buffer.isBuffer(body) || body instanceof Uint8Array) {
    if (body.byteLength > maxBytes) throw tooLarge();
    return Buffer.from(body).toString("utf8");
  }

  if (typeof body.getReader === "function") {
    const reader = body.getReader();
    const chunks = [];
    let total = 0;
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const buf = Buffer.from(value);
        total += buf.length;
        if (total > maxBytes) {
          await reader.cancel().catch(() => {});
          throw tooLarge();
        }
        chunks.push(buf);
      }
    } catch (err) {
      if (err && err.code === "body-too-large") throw err;
      try { await reader.cancel(); } catch { /* ignore */ }
      throw err;
    }
    return Buffer.concat(chunks).toString("utf8");
  }

  if (typeof body[Symbol.asyncIterator] === "function") {
    const chunks = [];
    let total = 0;
    for await (const value of body) {
      const buf = Buffer.from(value);
      total += buf.length;
      if (total > maxBytes) {
        if (typeof body.destroy === "function") body.destroy();
        throw tooLarge();
      }
      chunks.push(buf);
    }
    return Buffer.concat(chunks).toString("utf8");
  }

  throw coded("unsupported-body");
}

async function fetchPublicText(target, options = {}) {
  const {
    timeoutMs = DEFAULT_TIMEOUT_MS,
    maxBytes = DEFAULT_MAX_BYTES,
    maxRedirects = DEFAULT_MAX_REDIRECTS,
    fetchImpl = globalThis.fetch,
    lookup = defaultLookup,
  } = options;

  let current = await assertPublicHttpUrl(target, lookup);
  for (let hop = 0; hop <= maxRedirects; hop++) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeoutMs);
    let res;
    try {
      res = await fetchImpl(current.href, {
        signal: ctrl.signal,
        redirect: "manual",
        headers: {
          "User-Agent": "NodevantReverseAudit/1.0 (+https://nodevant.com/reverse-audit)",
          Accept: "text/html,text/plain;q=0.9,*/*;q=0.8",
        },
      });
    } catch {
      return null;
    } finally {
      clearTimeout(timer);
    }

    const status = res.status || 0;
    if (status >= 300 && status < 400) {
      const location = res.headers && typeof res.headers.get === "function" ? res.headers.get("location") : "";
      await cancelBody(res);
      if (!location || hop === maxRedirects) return null;
      current = await assertPublicHttpUrl(new URL(location, current), lookup);
      continue;
    }

    if (!res.ok) {
      await cancelBody(res);
      return null;
    }

    try {
      return await readCappedText(res.body, maxBytes);
    } catch (err) {
      if (err && err.code === "body-too-large") return null;
      return null;
    }
  }
  return null;
}

function htmlToText(html, maxChars = 3500) {
  return String(html || "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxChars);
}

async function collectPublicPages(origin, paths, options) {
  const entries = await Promise.all(
    paths.map(async (p) => {
      const html = await fetchPublicText(new URL(p, origin).href, options);
      return [p, html ? htmlToText(html) : null];
    })
  );
  const pages = {};
  for (const [path, text] of entries) {
    if (text) pages[path] = text;
  }
  return pages;
}

async function completeJson({
  url,
  headers,
  body,
  timeoutMs = 20000,
  maxBytes = 1_000_000,
  fetchImpl = globalThis.fetch,
}) {
  let res;
  try {
    res = await fetchImpl(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(timeoutMs),
    });
  } catch {
    return null;
  }
  if (!res || !res.ok) {
    await cancelBody(res);
    return null;
  }
  try {
    const text = await readCappedText(res.body, maxBytes);
    return JSON.parse(text);
  } catch {
    return null;
  }
}

module.exports = {
  isPrivateAddress,
  screenHttpUrl,
  assertPublicHttpUrl,
  readCappedText,
  fetchPublicText,
  htmlToText,
  collectPublicPages,
  completeJson,
  memoLookup,
  DEFAULT_TIMEOUT_MS,
  DEFAULT_MAX_BYTES,
};
