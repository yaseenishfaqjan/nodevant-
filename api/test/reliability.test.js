const { describe, test } = require("node:test");
const assert = require("node:assert/strict");
const express = require("express");
const { guard, errorHandler } = require("../src/http");
const { createLimiter, pruneHits } = require("../src/ratelimit");
const { createTracker } = require("../src/inflight");
const db = require("../src/db");
const {
  isPrivateAddress,
  screenHttpUrl,
  assertPublicHttpUrl,
  fetchPublicText,
  collectPublicPages,
  completeJson,
  htmlToText,
  readCappedText,
} = require("../src/scan");

function textStream(text) {
  return new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(text));
      controller.close();
    },
  });
}

function chunkStream(parts) {
  return new ReadableStream({
    start(controller) {
      for (const part of parts) controller.enqueue(part);
      controller.close();
    },
  });
}

function listen(app) {
  return new Promise((resolve) => {
    const server = app.listen(0, "127.0.0.1", () => resolve(server));
  });
}

const publicLookup = async () => [{ address: "1.1.1.1", family: 4 }];

describe("database guards", () => {
  test("idle pool errors are handled instead of crashing", () => {
    assert.doesNotThrow(() => db.pool.emit("error", new Error("connection reset")));
  });

  test("schema keeps the lookup and dedupe indexes", () => {
    const sql = db.SCHEMA_STATEMENTS.join("\n");
    assert.match(sql, /idx_leads_status_created/);
    assert.match(sql, /idx_leads_type_created/);
    assert.match(sql, /idx_leads_external_id/);
    assert.match(sql, /external_id TEXT/);
  });

  test("limit clamps away negatives, NaN, and values above the cap", () => {
    assert.equal(db.clampLimit(undefined), 200);
    assert.equal(db.clampLimit("nope"), 200);
    assert.equal(db.clampLimit(-1), 1);
    assert.equal(db.clampLimit(0), 1);
    assert.equal(db.clampLimit(50.9), 50);
    assert.equal(db.clampLimit(5000), 1000);
    assert.equal(db.clampLimit(5000, { max: 5000 }), 5000);
    assert.equal(db.clampLimit(9000, { max: 5000 }), 5000);
  });

  test("invalid meeting timestamps become null instead of an Invalid Date", () => {
    assert.equal(db.parseTimestamp("not-a-date"), null);
    assert.equal(db.parseTimestamp(""), null);
    assert.equal(db.parseTimestamp(null), null);
    assert.ok(db.parseTimestamp("2020-01-02T03:04:05.000Z") instanceof Date);
  });

  test("duplicate external ids merge and only flag a real meeting change", async () => {
    const calls = [];
    const exec = async (text, params) => {
      calls.push({ text, params });
      if (text.includes("INSERT INTO")) {
        const err = new Error("duplicate key");
        err.code = "23505";
        throw err;
      }
      if (text.includes("SELECT")) {
        return {
          rows: [{
            id: 7,
            created_at: "2020-01-01T00:00:00.000Z",
            meeting_at: "2020-01-01T00:00:00.000Z",
            email: null,
            phone: "+15550001",
          }],
        };
      }
      if (text.includes("UPDATE")) return { rows: [{ id: 7, created_at: "2020-01-01T00:00:00.000Z" }] };
      throw new Error(`unexpected query: ${text}`);
    };

    const saved = await db.saveLead({
      type: "booking",
      external_id: "cal:abc",
      email: "a@b.co",
      meeting_at: "not-a-real-date",
    }, exec);
    assert.equal(saved.created, false);
    assert.equal(saved.meetingChanged, false);
    assert.equal(saved.enriched, true);
    const update = calls.find((c) => c.text.includes("UPDATE"));
    assert.equal(update.params[6], null);

    const moved = await db.saveLead({
      type: "booking",
      external_id: "cal:abc",
      email: "a@b.co",
      phone: "+15550001",
      meeting_at: "2020-02-01T00:00:00.000Z",
    }, async (text) => {
      if (text.includes("INSERT INTO")) {
        const err = new Error("duplicate key");
        err.code = "23505";
        throw err;
      }
      if (text.includes("SELECT")) {
        return {
          rows: [{
            id: 7,
            created_at: "2020-01-01T00:00:00.000Z",
            meeting_at: "2020-01-01T00:00:00.000Z",
            email: "a@b.co",
            phone: "+15550001",
          }],
        };
      }
      if (text.includes("UPDATE")) return { rows: [{ id: 7, created_at: "2020-01-01T00:00:00.000Z" }] };
      throw new Error(`unexpected query: ${text}`);
    });
    assert.equal(moved.meetingChanged, true);
    assert.equal(moved.enriched, false);
    assert.equal(moved.id, 7);
  });

  test("a new lead reports created and stores a parsed timestamp", async () => {
    let params;
    const exec = async (_text, values) => {
      params = values;
      return { rows: [{ id: 3, created_at: "2020-01-01T00:00:00.000Z" }] };
    };
    const saved = await db.saveLead({
      type: "booking",
      email: "a@b.co",
      meeting_at: "2020-05-01T12:00:00.000Z",
    }, exec);
    assert.equal(saved.created, true);
    assert.equal(saved.meetingChanged, false);
    const meetingIndex = db.LEAD_COLUMNS.indexOf("meeting_at");
    assert.equal(params[meetingIndex].toISOString(), "2020-05-01T12:00:00.000Z");
  });
});

describe("rate limit", () => {
  test("blocks once the window is full and prune drops expired keys", () => {
    const limiter = createLimiter({ windowMs: 1000, max: 2 });
    assert.equal(limiter.check("1.1.1.1", 0).limited, false);
    assert.equal(limiter.check("1.1.1.1", 10).limited, false);
    const blocked = limiter.check("1.1.1.1", 20);
    assert.equal(blocked.limited, true);
    assert.equal(blocked.retryAfterSeconds, 1);
    limiter.prune(5000);
    assert.equal(limiter.hits.size, 0);
    const map = new Map([["9.9.9.9", [1]], ["8.8.8.8", [4000]]]);
    pruneHits(map, 1000, 4500);
    assert.deepEqual([...map.keys()], ["8.8.8.8"]);
  });
});

describe("background work", () => {
  test("whenIdle waits for tracked work and stops waiting at the timeout", async () => {
    const tracker = createTracker();
    let release;
    const pending = tracker.track(new Promise((resolve) => { release = resolve; }));
    assert.equal(tracker.count(), 1);
    const early = tracker.whenIdle(40);
    release();
    await pending;
    assert.equal(await early, true);
    assert.equal(tracker.count(), 0);

    const stuck = createTracker();
    stuck.track(new Promise(() => {}));
    const started = Date.now();
    assert.equal(await stuck.whenIdle(50), false);
    assert.ok(Date.now() - started < 400);
  });
});

describe("reverse-audit fetch", () => {
  test("rejects private, loopback, metadata, and obfuscated targets", async () => {
    for (const ip of ["127.0.0.1", "10.1.2.3", "192.168.1.9", "172.16.0.4", "169.254.169.254", "0.0.0.0", "::1", "fe80::1", "fd00::1"]) {
      assert.equal(isPrivateAddress(ip), true, ip);
    }
    assert.equal(isPrivateAddress("8.8.8.8"), false);
    assert.equal(isPrivateAddress("1.1.1.1"), false);

    const blocked = [
      "http://127.0.0.1/",
      "http://localhost/admin",
      "http://169.254.169.254/latest/meta-data",
      "http://2130706433/",
      "http://10.0.0.5/",
      "file:///etc/passwd",
      "http://user:pass@example.com/",
      "http://metadata.google.internal/",
    ];
    for (const raw of blocked) {
      assert.throws(() => screenHttpUrl(raw), (err) => err.code === "blocked-url" || err.code === "invalid-url", raw);
    }

    let lookedUp = false;
    assert.throws(() => screenHttpUrl("http://localhost/"), () => true);
    await assert.rejects(
      () => assertPublicHttpUrl("https://rebind.example/", async () => {
        lookedUp = true;
        return [{ address: "127.0.0.1", family: 4 }];
      }),
      (err) => err.code === "blocked-url"
    );
    assert.equal(lookedUp, true);
    await assertPublicHttpUrl("https://example.com/", publicLookup);
  });

  test("does not follow a redirect onto a private address", async () => {
    let fetchedPrivate = false;
    const fetchImpl = async (url) => {
      if (String(url).includes("127.0.0.1")) {
        fetchedPrivate = true;
        throw new Error("fetched private");
      }
      return {
        status: 302,
        ok: false,
        headers: { get: (name) => (name === "location" ? "http://127.0.0.1/secret" : null) },
        body: { cancel: async () => {} },
      };
    };
    await assert.rejects(
      () => fetchPublicText("https://example.com/start", { fetchImpl, lookup: publicLookup }),
      (err) => err.code === "blocked-url"
    );
    assert.equal(fetchedPrivate, false);
  });

  test("stops after the redirect cap and drops oversized bodies", async () => {
    let hops = 0;
    const fetchImpl = async () => {
      hops += 1;
      return {
        status: 302,
        ok: false,
        headers: { get: () => "https://example.com/again" },
        body: { cancel: async () => {} },
      };
    };
    const redirected = await fetchPublicText("https://example.com/start", {
      fetchImpl,
      lookup: publicLookup,
      maxRedirects: 2,
    });
    assert.equal(redirected, null);
    assert.equal(hops, 3);

    const big = await fetchPublicText("https://example.com/huge", {
      lookup: publicLookup,
      maxBytes: 8,
      fetchImpl: async () => ({
        status: 200,
        ok: true,
        headers: { get: () => null },
        body: chunkStream([Buffer.from("0123456789"), Buffer.from("abcdef")]),
      }),
    });
    assert.equal(big, null);
    assert.equal(await readCappedText(textStream("hello"), 10), "hello");
  });

  test("fetches pages concurrently", async () => {
    const started = Date.now();
    const fetchImpl = async () => {
      await new Promise((resolve) => setTimeout(resolve, 80));
      return {
        status: 200,
        ok: true,
        headers: { get: () => null },
        body: textStream("<html><script>secret()</script><p>Visible</p></html>"),
      };
    };
    const pages = await collectPublicPages("https://example.com", ["/", "/contact", "/pricing", "/careers"], {
      fetchImpl,
      lookup: publicLookup,
    });
    const elapsed = Date.now() - started;
    assert.ok(elapsed < 220, `expected parallel fetches, took ${elapsed}ms`);
    assert.equal(Object.keys(pages).length, 4);
    assert.equal(pages["/"], "Visible");
    assert.equal(htmlToText("<style>x</style><script>nope</script> Hi").includes("nope"), false);
  });

  test("model calls abort instead of hanging", async () => {
    const started = Date.now();
    const fetchImpl = (_url, opts) => new Promise((resolve, reject) => {
      const timer = setTimeout(() => resolve({ ok: true, body: textStream("{}") }), 5000);
      opts.signal.addEventListener("abort", () => {
        clearTimeout(timer);
        const err = new Error("aborted");
        err.name = "AbortError";
        reject(err);
      });
    });
    const result = await completeJson({
      url: "https://api.openai.com/v1/chat/completions",
      headers: {},
      body: { ping: true },
      timeoutMs: 60,
      fetchImpl,
    });
    assert.equal(result, null);
    assert.ok(Date.now() - started < 1000);
  });
});

describe("http server", () => {
  test("rejected handlers return 500 and the process keeps serving", async () => {
    const unhandled = [];
    const onUnhandled = (err) => unhandled.push(err);
    process.on("unhandledRejection", onUnhandled);
    const app = express();
    app.get("/boom", guard(async () => { throw new Error("explode"); }));
    app.get("/ok", (_req, res) => res.json({ ok: true }));
    app.use(errorHandler);
    const server = await listen(app);
    try {
      const base = `http://127.0.0.1:${server.address().port}`;
      const boom = await fetch(`${base}/boom`);
      assert.equal(boom.status, 500);
      assert.deepEqual(await boom.json(), { error: "Request failed" });
      const ok = await fetch(`${base}/ok`);
      assert.equal(ok.status, 200);
      await new Promise((resolve) => setTimeout(resolve, 30));
      assert.equal(unhandled.length, 0);
    } finally {
      process.off("unhandledRejection", onUnhandled);
      await new Promise((resolve) => server.close(resolve));
    }
  });

  test("health reflects the database and bad JSON stays a 400", async () => {
    const { createApp } = require("../src/server");
    const original = db.ping;
    const server = await listen(createApp());
    const base = `http://127.0.0.1:${server.address().port}`;
    try {
      db.ping = async () => { throw new Error("db down"); };
      const down = await fetch(`${base}/api/health`);
      assert.equal(down.status, 503);
      assert.deepEqual(await down.json(), { ok: false });

      db.ping = async () => {};
      const up = await fetch(`${base}/api/health`);
      assert.equal(up.status, 200);
      assert.deepEqual(await up.json(), { ok: true });

      const bad = await fetch(`${base}/api/audit`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: "{",
      });
      assert.equal(bad.status, 400);
      assert.deepEqual(await bad.json(), { error: "Invalid request body" });
    } finally {
      db.ping = original;
      await new Promise((resolve) => server.close(resolve));
    }
  });

  test("booking and voice retries share one external id", async () => {
    const routes = require("../src/routes");
    const original = db.saveLead;
    const seen = [];
    db.saveLead = async (lead) => {
      seen.push(lead);
      return { id: 11, created_at: new Date().toISOString(), created: false, meetingChanged: false, enriched: false };
    };
    const app = express();
    app.use(express.json());
    app.use("/api", routes);
    app.use(errorHandler);
    const server = await listen(app);
    const base = `http://127.0.0.1:${server.address().port}`;
    const post = (path, body) => fetch(`${base}${path}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    try {
      const booking = {
        triggerEvent: "BOOKING_CREATED",
        payload: {
          uid: "book-1",
          startTime: "not-a-date",
          attendees: [{ name: "Ada", email: "ada@example.com" }],
        },
      };
      const first = await post("/api/cal-webhook", booking);
      const second = await post("/api/cal-webhook", { ...booking, triggerEvent: "BOOKING_RESCHEDULED" });
      assert.equal(first.status, 200);
      assert.equal(second.status, 200);
      assert.equal(seen[0].external_id, "cal:book-1");
      assert.equal(seen[1].external_id, "cal:book-1");
      assert.equal(seen[0].meeting_at, "not-a-date");

      const call = (type) => ({
        message: {
          type,
          call: { id: "call-1" },
          toolCallList: [{
            id: "tc1",
            function: { name: "capture_lead", arguments: { name: "Ada", email: "ada@example.com", phone: "+15551212" } },
          }],
          analysis: { summary: "Asked about automation", structuredData: { email: "ada@example.com", name: "Ada" } },
          customer: { number: "+15551212" },
        },
      });
      const tool = await post("/api/voice-lead", call("tool-calls"));
      const end = await post("/api/voice-lead", call("end-of-call-report"));
      assert.equal(tool.status, 200);
      assert.equal(end.status, 200);
      assert.equal(seen[2].external_id, "vapi:call-1");
      assert.equal(seen[3].external_id, "vapi:call-1");
      assert.equal(seen[3].type, "call");
    } finally {
      db.saveLead = original;
      await new Promise((resolve) => server.close(resolve));
    }
  });

  test("scan budget ignores unparseable urls and blocks private targets", async () => {
    const routes = require("../src/routes");
    routes.scanLimiter.hits.clear();
    const app = express();
    app.use(express.json());
    app.use("/api", routes);
    app.use(errorHandler);
    const server = await listen(app);
    const base = `http://127.0.0.1:${server.address().port}`;
    const post = (url) => fetch(`${base}/api/reverse-audit/scan`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ url }),
    });
    try {
      for (let i = 0; i < 5; i++) {
        const res = await post("://");
        assert.equal(res.status, 400, `blank-ish url ${i}`);
      }
      for (let i = 0; i < 3; i++) {
        const res = await post("http://127.0.0.1/latest");
        assert.equal(res.status, 400);
        assert.deepEqual(await res.json(), { error: "invalid-url" });
      }
      const limited = await post("http://169.254.169.254/");
      assert.equal(limited.status, 429);
      const body = await limited.json();
      assert.equal(body.error, "rate-limited");
      assert.ok(body.retryAfterSeconds > 0);
    } finally {
      routes.scanLimiter.hits.clear();
      await new Promise((resolve) => server.close(resolve));
    }
  });
});
