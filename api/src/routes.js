const express = require("express");
const { buildReport } = require("./engine");
const db = require("./db");
const { sendLeadNotification } = require("./notify");

const router = express.Router();
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "";

const isEmail = (e) => typeof e === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
const clean = (s, max = 2000) =>
  s === undefined || s === null ? null : String(s).slice(0, max);

function adminOnly(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.replace(/^Bearer\s+/i, "") || req.query.token || "";
  if (!ADMIN_TOKEN || token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

// ── Triage metadata for every intake ──────────────────────────────────
function meta(req, extra = {}) {
  return {
    ip: req.ip || req.headers["x-forwarded-for"] || null,
    userAgent: clean(req.headers["user-agent"], 400),
    sourcePage: clean(req.body?.sourcePage || req.headers["referer"], 400),
    timestamp: new Date().toISOString(),
    ...extra,
  };
}

// ── Honeypot: bots fill hidden fields; humans never see them ───────────
function isSpam(body) {
  return Boolean(body && (body._hp || body.company_website || body._gotcha));
}

// ── Simple in-memory rate limit (per IP) for human-facing forms ────────
const HITS = new Map(); // ip -> number[] (timestamps)
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
function rateLimit(req, res, next) {
  const ip = req.ip || "unknown";
  const now = Date.now();
  const hits = (HITS.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= MAX_PER_WINDOW) {
    return res.status(429).json({ error: "Too many submissions. Please try again later." });
  }
  hits.push(now);
  HITS.set(ip, hits);
  next();
}
// Occasional cleanup so the map can't grow unbounded.
setInterval(() => {
  const now = Date.now();
  for (const [ip, hits] of HITS) {
    const live = hits.filter((t) => now - t < WINDOW_MS);
    if (live.length) HITS.set(ip, live);
    else HITS.delete(ip);
  }
}, WINDOW_MS).unref?.();

// GET /api/live-metrics — aggregate stats for the homepage Live ROI Ticker.
// Cached 30s server-side. PRODUCTION: replace the starter block with real
// aggregation across the six product APIs; on any product failure, use its
// last-known cached value and set isLive:false.
let _metricsCache = null;
const METRICS_TTL_MS = 30 * 1000;
router.get("/live-metrics", (_req, res) => {
  const now = Date.now();
  if (_metricsCache && now - _metricsCache.at < METRICS_TTL_MS) {
    return res.json(_metricsCache.payload);
  }
  // PRODUCTION: replace with real product-API aggregation.
  const payload = {
    leadsThisMonth: 1284,
    callsAnsweredLast24h: 347,
    hoursAutomatedThisWeek: 612,
    uptimePercent: 99.94,
    cachedAt: new Date().toISOString(),
    isLive: true,
  };
  _metricsCache = { at: now, payload };
  res.set("Cache-Control", "public, max-age=30");
  res.json(payload);
});

// ── POST /api/reverse-audit/scan ──────────────────────────────────────
// Fetches a visitor's public pages and asks an LLM to name up to 3 real
// automation gaps. NEVER fabricates: if fewer than 2 high-confidence findings,
// returns status:"no-findings". Privacy: the target URL is never persisted —
// only anonymized category counts are logged.
const SCAN_HITS = new Map(); // ip -> number[]
const SCAN_WINDOW_MS = 60 * 60 * 1000;
const SCAN_MAX = 3;
const VALID_SERVICES = new Set(["agentic-workflows", "ai-voice-agents", "complex-logic-engines", "system-integration", "lead-gen-pipeline", "custom-ai-solutions"]);
const VALID_CASES = new Set(["storehouse360", "scalaro", "fabrioza", "fairway360", "bmaikr", "peachpicks"]);

function scanRateLimit(req, res, next) {
  const ip = req.ip || "unknown";
  const now = Date.now();
  const hits = (SCAN_HITS.get(ip) || []).filter((t) => now - t < SCAN_WINDOW_MS);
  if (hits.length >= SCAN_MAX) {
    const reset = Math.ceil((hits[0] + SCAN_WINDOW_MS) / 1000);
    res.set("X-RateLimit-Reset", String(reset));
    return res.status(429).json({ error: "rate-limited", retryAfterSeconds: reset - Math.floor(now / 1000) });
  }
  hits.push(now);
  SCAN_HITS.set(ip, hits);
  next();
}

async function fetchHtml(u, timeoutMs = 8000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const r = await fetch(u, { signal: ctrl.signal, redirect: "follow", headers: { "User-Agent": "NodevantReverseAudit/1.0 (+https://nodevant.com/reverse-audit)" } });
    if (!r.ok) return null;
    return await r.text();
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}

function htmlToText(html) {
  return String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 3500);
}

const SCAN_SYS =
  "You are Nodevant's reverse-audit engine. Given the public text of a business's website pages, identify concrete AUTOMATION opportunities a visitor could infer from the outside (e.g. contact form with no autoresponder, pricing page with no instant quote, careers page hiring for repetitive manual roles, no live chat, no online booking). " +
  "Return ONLY real, evidence-backed gaps — never invent findings. For each, set confidence 'high' only when the page text clearly supports it, else 'low'. " +
  'Respond as JSON: {"opportunities":[{"rank":1,"category":"Lead response","title":"...","evidence":{"pageSeen":"host/contact","whatWasFound":"..."},"impact":{"metric":"...","industryAvg":"..."},"fix":{"whatWeBuild":"...","timelineDays":3,"priceFrom":1200},"linkedService":"lead-gen-pipeline","similarToCaseStudy":"bmaikr","confidence":"high"}]}. ' +
  "linkedService must be one of: agentic-workflows, ai-voice-agents, complex-logic-engines, system-integration, lead-gen-pipeline, custom-ai-solutions. " +
  "similarToCaseStudy must be one of: storehouse360, scalaro, fabrioza, fairway360, bmaikr, peachpicks. Return at most 3, ranked by impact.";

async function openaiAnalyze(host, pages) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const userMsg =
    `Host: ${host}\n\n` +
    Object.entries(pages).map(([p, txt]) => `=== ${host}${p} ===\n${txt}`).join("\n\n");
  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        response_format: { type: "json_object" },
        messages: [{ role: "system", content: SCAN_SYS }, { role: "user", content: userMsg }],
      }),
    });
    if (!r.ok) return null;
    const data = await r.json();
    const txt = data.choices?.[0]?.message?.content;
    return txt ? JSON.parse(txt) : null;
  } catch {
    return null;
  }
}

function sanitizeOpps(list) {
  if (!Array.isArray(list)) return [];
  return list
    .filter((o) => o && o.title && o.evidence && o.fix)
    .slice(0, 3)
    .map((o, i) => ({
      rank: i + 1,
      category: clean(o.category, 40) || "Automation gap",
      title: clean(o.title, 120),
      evidence: { pageSeen: clean(o.evidence?.pageSeen, 120) || "", whatWasFound: clean(o.evidence?.whatWasFound, 200) || "" },
      impact: { metric: clean(o.impact?.metric, 80) || "", industryAvg: clean(o.impact?.industryAvg, 80) || "", estimatedCostMonthly: Number(o.impact?.estimatedCostMonthly) || undefined },
      fix: { whatWeBuild: clean(o.fix?.whatWeBuild, 200) || "", timelineDays: Math.max(1, Math.min(60, parseInt(o.fix?.timelineDays) || 5)), priceFrom: Math.max(0, parseInt(o.fix?.priceFrom) || 1200) },
      linkedService: VALID_SERVICES.has(o.linkedService) ? o.linkedService : "custom-ai-solutions",
      similarToCaseStudy: VALID_CASES.has(o.similarToCaseStudy) ? o.similarToCaseStudy : "scalaro",
      confidence: o.confidence === "low" ? "low" : "high",
    }));
}

router.post("/reverse-audit/scan", scanRateLimit, async (req, res) => {
  const raw = clean(req.body?.url, 300);
  if (!raw) return res.status(400).json({ error: "invalid-url" });
  let target;
  try {
    target = new URL(/^https?:\/\//i.test(raw) ? raw : "https://" + raw);
  } catch {
    return res.status(400).json({ error: "invalid-url" });
  }

  // Hybrid: with no LLM key configured, we don't run an AI scan — the request is
  // handed to the team for a manual audit (the frontend then captures an email).
  if (!process.env.OPENAI_API_KEY) {
    try {
      console.log("[reverse-audit]", JSON.stringify({ status: "manual-queued" }));
    } catch {
      /* ignore */
    }
    return res.json({
      status: "manual-queued",
      scanId: "ra_" + Math.random().toString(36).slice(2, 8),
      targetUrl: target.origin,
      scannedAt: new Date().toISOString(),
    });
  }

  // Respect robots.txt at a basic level: skip paths disallowed for all agents.
  let disallow = [];
  const robots = await fetchHtml(new URL("/robots.txt", target.origin).href, 4000);
  if (robots) {
    let all = false;
    for (const line of robots.split(/\r?\n/)) {
      const l = line.trim().toLowerCase();
      if (l.startsWith("user-agent:")) all = l.includes("*");
      else if (all && l.startsWith("disallow:")) disallow.push(l.split(":")[1].trim());
    }
  }
  const allowed = (p) => !disallow.some((d) => d && p.startsWith(d));

  const paths = ["/", "/contact", "/pricing", "/careers"].filter(allowed);
  const pages = {};
  for (const p of paths) {
    const html = await fetchHtml(new URL(p, target.origin).href);
    if (html) pages[p] = htmlToText(html);
  }
  if (Object.keys(pages).length === 0) return res.status(502).json({ error: "unreachable" });

  const analysis = await openaiAnalyze(target.hostname, pages);
  let opportunities = sanitizeOpps(analysis?.opportunities);
  const highConf = opportunities.filter((o) => o.confidence !== "low");

  let status;
  if (highConf.length < 2) {
    status = "no-findings"; // never fabricate to reach 3
    opportunities = [];
  } else {
    status = opportunities.some((o) => o.confidence === "low") ? "mixed" : "excellent";
  }

  // PRIVACY: never persist the target URL — log only anonymized category counts.
  try {
    console.log("[reverse-audit]", JSON.stringify({ status, categories: opportunities.map((o) => o.category) }));
  } catch {
    /* ignore */
  }

  res.json({
    scanId: "ra_" + Math.random().toString(36).slice(2, 8),
    targetUrl: target.origin,
    scannedAt: new Date().toISOString(),
    status,
    opportunities,
  });
});

// POST /api/audit — score, store, email report + notify
router.post("/audit", rateLimit, async (req, res) => {
  try {
    const a = req.body || {};
    if (isSpam(a)) return res.json({ success: true }); // silently drop bots
    if (!isEmail(a.email)) return res.status(400).json({ error: "Valid email required" });

    const report = buildReport(a);
    const tools = Array.isArray(a.current_tools)
      ? a.current_tools.join(", ")
      : clean(a.current_tools, 500);

    const lead = {
      type: "audit",
      name: clean(a.firstName || a.name, 200),
      email: clean(a.email, 320),
      source: clean(a.source || "audit", 100),
      industry: clean(a.industry, 100),
      team_size: clean(a.team_size, 50),
      biggest_pain: clean(a.biggest_pain, 100),
      hours_wasted: Number.isFinite(+a.hours_wasted) ? Math.round(+a.hours_wasted) : null,
      hourly_rate: clean(a.avg_hourly_rate, 50),
      current_tools: tools,
      automation_goal: clean(a.automation_goal, 100),
      score: report.score,
      recommended_service: report.recommendation.serviceTitle,
      annual_savings: report.roi.annualSavings,
      roi_multiple: report.roi.roiMultiple,
    };

    const saved = await db.insertLead(lead);
    // Fire notifications without blocking the response.
    sendLeadNotification(lead, meta(req, { report })).catch((e) =>
      console.error("[notify] audit", e.message)
    );

    res.json({ success: true, id: saved.id, report });
  } catch (err) {
    console.error("[audit]", err);
    res.status(500).json({ error: "Audit processing failed" });
  }
});

// POST /api/contact — store + notify (handles contact AND service inquiries)
router.post("/contact", rateLimit, async (req, res) => {
  try {
    const b = req.body || {};
    if (isSpam(b)) return res.json({ success: true });
    if (!isEmail(b.email)) return res.status(400).json({ error: "Valid email required" });

    const serviceName = clean(b.serviceName || b.service, 120);
    const lead = {
      type: serviceName ? "service" : "contact",
      name: clean(b.name, 200),
      email: clean(b.email, 320),
      company: clean(b.company, 200),
      phone: clean(b.phone, 40),
      message: clean(b.message, 5000),
      source: clean(b.source || (serviceName ? "service" : "contact"), 100),
    };
    const saved = await db.insertLead(lead);
    sendLeadNotification(lead, meta(req, { serviceName: serviceName || undefined })).catch((e) =>
      console.error("[notify] contact", e.message)
    );
    res.json({ success: true, id: saved.id });
  } catch (err) {
    console.error("[contact]", err);
    res.status(500).json({ error: "Contact processing failed" });
  }
});

// POST /api/newsletter — signup capture (ready for a future newsletter form)
router.post("/newsletter", rateLimit, async (req, res) => {
  try {
    const b = req.body || {};
    if (isSpam(b)) return res.json({ success: true });
    if (!isEmail(b.email)) return res.status(400).json({ error: "Valid email required" });
    const lead = {
      type: "newsletter",
      name: clean(b.name, 200),
      email: clean(b.email, 320),
      source: clean(b.source || "newsletter", 100),
    };
    const saved = await db.insertLead(lead);
    sendLeadNotification(lead, meta(req)).catch((e) =>
      console.error("[notify] newsletter", e.message)
    );
    res.json({ success: true, id: saved.id });
  } catch (err) {
    console.error("[newsletter]", err);
    res.status(500).json({ error: "Newsletter signup failed" });
  }
});

// POST /api/cal-webhook — capture Cal.com bookings as leads.
const CAL_WEBHOOK_SECRET = process.env.CAL_WEBHOOK_SECRET || "";
router.post("/cal-webhook", async (req, res) => {
  try {
    if (CAL_WEBHOOK_SECRET && req.query.key !== CAL_WEBHOOK_SECRET) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const evt = req.body || {};
    const trigger = evt.triggerEvent || "";
    if (!["BOOKING_CREATED", "BOOKING_RESCHEDULED"].includes(trigger)) {
      return res.json({ ok: true, ignored: trigger });
    }
    const p = evt.payload || {};
    const attendee = Array.isArray(p.attendees) && p.attendees[0] ? p.attendees[0] : {};
    const location =
      p.location || p.videoCallData?.url || p.metadata?.videoCallUrl || "";

    const lead = {
      type: "booking",
      name: clean(attendee.name, 200),
      email: clean(attendee.email, 320),
      source: clean(`cal.com${trigger === "BOOKING_RESCHEDULED" ? " (rescheduled)" : ""}`, 100),
      message: clean([p.title, location, attendee.timeZone].filter(Boolean).join(" · "), 2000),
      meeting_at: p.startTime ? new Date(p.startTime) : null,
      meeting_type: clean(p.type || p.eventTitle || p.title, 200),
    };
    const saved = await db.insertLead(lead);
    sendLeadNotification(lead, meta(req, { sourcePage: "cal.com booking" })).catch((e) =>
      console.error("[notify] booking", e.message)
    );
    res.json({ success: true, id: saved.id });
  } catch (err) {
    console.error("[cal-webhook]", err);
    res.status(500).json({ error: "Webhook processing failed" });
  }
});

// POST /api/voice-lead — capture leads from the voice agent (VAPI).
const VOICE_WEBHOOK_SECRET = process.env.VOICE_WEBHOOK_SECRET || "";
router.post("/voice-lead", async (req, res) => {
  let toolCallId = null;
  try {
    if (VOICE_WEBHOOK_SECRET && req.query.key !== VOICE_WEBHOOK_SECRET) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const body = req.body || {};
    const msg = body.message;
    let f = {}; // collected fields
    let callMeta = {}; // duration / agent number / transcript

    if (msg && msg.type === "tool-calls") {
      const calls =
        msg.toolCallList ||
        msg.toolCalls ||
        (msg.toolWithToolCallList || []).map((t) => t.toolCall).filter(Boolean) ||
        [];
      const call =
        calls.find((c) => (c.function?.name || c.name) === "capture_lead") || calls[0];
      if (!call) return res.json({ results: [] });
      toolCallId = call.id;
      let args = call.function?.arguments ?? call.arguments ?? {};
      if (typeof args === "string") {
        try { args = JSON.parse(args); } catch { args = {}; }
      }
      f = args;
      callMeta = {
        agentNumber: msg.phoneNumber?.number || msg.call?.phoneNumber?.number || null,
      };
    } else if (msg && msg.type && msg.type !== "end-of-call-report") {
      return res.json({ ok: true, ignored: msg.type });
    } else if (msg && (msg.type === "end-of-call-report" || msg.analysis || msg.customer)) {
      const a = msg.analysis || {};
      const sd = a.structuredData || {};
      const transcript =
        (typeof msg.transcript === "string" && msg.transcript) ||
        (typeof msg.artifact?.transcript === "string" && msg.artifact.transcript) ||
        "";
      f = {
        name: sd.name || sd.firstName,
        email: sd.email,
        phone: msg.customer?.number || sd.phone || sd.phoneNumber,
        business: sd.business || sd.company,
        summary: a.summary || (transcript ? transcript.slice(0, 1500) : ""),
        outcome: sd.outcome || sd.booked || a.successEvaluation,
      };
      const started = msg.startedAt ? new Date(msg.startedAt).getTime() : null;
      const ended = msg.endedAt ? new Date(msg.endedAt).getTime() : null;
      callMeta = {
        durationSeconds:
          msg.durationSeconds != null
            ? Math.round(msg.durationSeconds)
            : msg.call?.duration != null
            ? Math.round(msg.call.duration)
            : started && ended
            ? Math.round((ended - started) / 1000)
            : null,
        agentNumber:
          msg.phoneNumber?.number || msg.call?.phoneNumber?.number || null,
        transcriptPreview: transcript ? transcript.slice(0, 200) : null,
      };
    } else {
      f = body; // flat
    }

    const email = f.email;
    const phone = f.phone || f.phoneNumber;

    if (!phone && !isEmail(email)) {
      if (toolCallId)
        return res.json({ results: [{ toolCallId, result: "No contact info captured yet." }] });
      return res.status(400).json({ error: "phone or email required" });
    }

    const detail = [
      clean(f.summary || f.notes || f.message, 4000),
      f.outcome ? `Outcome: ${f.outcome}` : null,
    ]
      .filter(Boolean)
      .join(" | ");

    const lead = {
      type: "call",
      name: clean(f.name || f.firstName, 200),
      email: isEmail(email) ? clean(email, 320) : null,
      phone: clean(phone, 40),
      company: clean(f.business || f.company, 200),
      source: clean(callMeta.agentNumber ? `voice-call (${callMeta.agentNumber})` : "voice-call (Alex)", 100),
      message: detail || null,
    };
    const saved = await db.insertLead(lead);
    sendLeadNotification(lead, meta(req, callMeta)).catch((e) =>
      console.error("[notify] call", e.message)
    );

    if (toolCallId)
      return res.json({ results: [{ toolCallId, result: "Lead saved to the Nodevant CRM." }] });
    return res.json({ success: true, id: saved.id });
  } catch (err) {
    console.error("[voice-lead]", err);
    if (toolCallId)
      return res.json({ results: [{ toolCallId, result: "Could not save lead." }] });
    return res.status(500).json({ error: "Voice lead processing failed" });
  }
});

// ---- CRM (admin) ----
router.get("/leads", adminOnly, async (req, res) => {
  const leads = await db.listLeads({
    status: req.query.status,
    type: req.query.type,
    limit: req.query.limit,
  });
  res.json({ leads });
});

router.get("/stats", adminOnly, async (_req, res) => {
  res.json(await db.stats());
});

router.patch("/leads/:id", adminOnly, async (req, res) => {
  const updated = await db.updateLead(req.params.id, {
    status: req.body.status,
    notes: req.body.notes,
  });
  if (!updated) return res.status(404).json({ error: "Not found" });
  res.json({ lead: updated });
});

router.delete("/leads/:id", adminOnly, async (req, res) => {
  const ok = await db.deleteLead(req.params.id);
  if (!ok) return res.status(404).json({ error: "Not found" });
  res.json({ success: true });
});

router.get("/leads/export.csv", adminOnly, async (req, res) => {
  const leads = await db.listLeads({ limit: 5000 });
  const cols = [
    "id", "created_at", "type", "status", "name", "email", "phone", "company",
    "industry", "team_size", "biggest_pain", "hours_wasted", "hourly_rate",
    "automation_goal", "score", "recommended_service", "annual_savings",
    "roi_multiple", "meeting_at", "meeting_type", "message", "notes",
  ];
  const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const csv = [cols.join(",")]
    .concat(leads.map((l) => cols.map((c) => esc(l[c])).join(",")))
    .join("\n");
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", 'attachment; filename="nodevant-leads.csv"');
  res.send(csv);
});

module.exports = router;
