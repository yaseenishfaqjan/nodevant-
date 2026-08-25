// Brand federation for the Nodevant super-admin console.
//
// The console is ONE dashboard over MANY products. Rather than copying each
// product's CRM data into Nodevant (which would immediately drift), we proxy
// straight through to each product's own API, server-to-server, using a shared
// service token. A call Brady logs here lands in Fairway's real database, and
// Fairway's own super-admin shows it instantly. One set of data, two doors.
//
// The browser only ever talks to nodevant.com/api, so there is no CORS and no
// cross-site cookie problem. The service token never reaches the browser.

const express = require("express");

// --- brand registry -------------------------------------------------------
// Each product exposes the same /api/admin/* outreach surface. A brand is
// enabled only when both its base URL and its service token are configured,
// so a half-configured product is never shown as clickable in the sidebar.
const BRANDS = [
  {
    id: "fairway360",
    name: "Fairway360",
    industry: "Golf clubs",
    accent: "#12B76A",
    baseUrl: process.env.FAIRWAY_API_URL || "",
    token: process.env.FAIRWAY_SERVICE_TOKEN || process.env.OUTREACH_SERVICE_TOKEN || "",
  },
  {
    id: "lawnpilot360",
    name: "LawnPilot360",
    industry: "Lawn care",
    accent: "#65A30D",
    baseUrl: process.env.LAWNPILOT_API_URL || "",
    token: process.env.LAWNPILOT_SERVICE_TOKEN || process.env.OUTREACH_SERVICE_TOKEN || "",
  },
  {
    id: "globalshield360",
    name: "GlobalShield360",
    industry: "Security",
    accent: "#2563EB",
    baseUrl: process.env.GLOBALSHIELD_API_URL || "",
    token: process.env.GLOBALSHIELD_SERVICE_TOKEN || process.env.OUTREACH_SERVICE_TOKEN || "",
  },
];

const findBrand = (id) => BRANDS.find((b) => b.id === id);
const isEnabled = (b) => Boolean(b.baseUrl && b.token);

/** Public shape for the sidebar — never leaks baseUrl or token. */
const publicBrand = (b) => ({
  id: b.id,
  name: b.name,
  industry: b.industry,
  accent: b.accent,
  enabled: isEnabled(b),
});

// Only these upstream paths may be reached through the proxy. Anything else is
// refused, so a bug in the console can never reach an unrelated product route.
const ALLOWED = [
  /^prospects$/,
  /^prospects\/[\w-]+$/,
  /^prospects\/[\w-]+\/calls$/,
  /^prospects\/[\w-]+\/send-email$/,
  /^prospects\/bulk-import$/,
  /^prospects\/tag-campaign$/,
  /^prospects-export$/,
  /^outreach\/summary$/,
  /^settings$/,
];

const pathAllowed = (p) => ALLOWED.some((re) => re.test(p));

function build(adminOnly) {
  const router = express.Router();

  // Sidebar contents.
  router.get("/brands", adminOnly, (_req, res) => {
    res.json({ brands: BRANDS.map(publicBrand) });
  });

  // Everything after /brands/:id/ is forwarded to <baseUrl>/api/admin/<rest>.
  router.all("/brands/:id/*", adminOnly, async (req, res) => {
    const brand = findBrand(req.params.id);
    if (!brand) return res.status(404).json({ error: "Unknown brand" });
    if (!isEnabled(brand)) {
      return res.status(503).json({
        error: `${brand.name} is not connected yet`,
        detail: "Set its API URL and service token, then restart the API.",
      });
    }

    const rest = req.params[0] || "";
    if (!pathAllowed(rest)) {
      return res.status(403).json({ error: "Path not permitted through the console" });
    }

    const qs = req.originalUrl.includes("?") ? req.originalUrl.slice(req.originalUrl.indexOf("?")) : "";
    const url = `${brand.baseUrl.replace(/\/+$/, "")}/api/admin/${rest}${qs}`;

    const init = {
      method: req.method,
      headers: {
        "x-service-token": brand.token,
        "content-type": "application/json",
        accept: req.headers.accept || "application/json",
      },
      signal: AbortSignal.timeout(30000),
    };
    if (!["GET", "HEAD"].includes(req.method)) init.body = JSON.stringify(req.body ?? {});

    try {
      const upstream = await fetch(url, init);
      const type = upstream.headers.get("content-type") || "";
      res.status(upstream.status);

      // CSV export and anything non-JSON is streamed through as text.
      if (!type.includes("application/json")) {
        const dispo = upstream.headers.get("content-disposition");
        if (type) res.set("content-type", type);
        if (dispo) res.set("content-disposition", dispo);
        return res.send(await upstream.text());
      }
      const text = await upstream.text();
      return res.send(text || "{}");
    } catch (err) {
      const timedOut = err && (err.name === "TimeoutError" || err.name === "AbortError");
      return res.status(timedOut ? 504 : 502).json({
        error: timedOut ? `${brand.name} took too long to respond` : `Could not reach ${brand.name}`,
        detail: String((err && err.message) || err),
      });
    }
  });

  return router;
}

module.exports = { build, BRANDS, publicBrand };
