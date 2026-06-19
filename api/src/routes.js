const express = require("express");
const { buildReport } = require("./engine");
const db = require("./db");
const { sendReportEmail, sendNotification } = require("./mailer");

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

// POST /api/audit — score, store, email report + notify
router.post("/audit", async (req, res) => {
  try {
    const a = req.body || {};
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
    // Fire emails without blocking the response.
    sendReportEmail(lead, report).catch((e) => console.error("[mail] report", e.message));
    sendNotification(lead, report).catch((e) => console.error("[mail] notify", e.message));

    res.json({ success: true, id: saved.id, report });
  } catch (err) {
    console.error("[audit]", err);
    res.status(500).json({ error: "Audit processing failed" });
  }
});

// POST /api/contact — store + notify
router.post("/contact", async (req, res) => {
  try {
    const b = req.body || {};
    if (!isEmail(b.email)) return res.status(400).json({ error: "Valid email required" });

    const lead = {
      type: "contact",
      name: clean(b.name, 200),
      email: clean(b.email, 320),
      company: clean(b.company, 200),
      message: clean(b.message, 5000),
      source: clean(b.source || "contact", 100),
    };
    const saved = await db.insertLead(lead);
    sendNotification(lead, null).catch((e) => console.error("[mail] notify", e.message));
    res.json({ success: true, id: saved.id });
  } catch (err) {
    console.error("[contact]", err);
    res.status(500).json({ error: "Contact processing failed" });
  }
});

// POST /api/cal-webhook — capture Cal.com bookings as leads.
// In Cal.com: Settings → Developer → Webhooks → add
//   https://nodevant.com/api/cal-webhook?key=YOUR_CAL_WEBHOOK_SECRET
// subscribing to BOOKING_CREATED (and optionally RESCHEDULED).
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
      p.location ||
      p.videoCallData?.url ||
      p.metadata?.videoCallUrl ||
      "";

    const lead = {
      type: "booking",
      name: clean(attendee.name, 200),
      email: clean(attendee.email, 320),
      source: clean(`cal.com${trigger === "BOOKING_RESCHEDULED" ? " (rescheduled)" : ""}`, 100),
      message: clean(
        [p.title, location, attendee.timeZone].filter(Boolean).join(" · "),
        2000
      ),
      meeting_at: p.startTime ? new Date(p.startTime) : null,
      meeting_type: clean(p.type || p.eventTitle || p.title, 200),
    };
    const saved = await db.insertLead(lead);
    sendNotification(lead, null).catch((e) => console.error("[mail] notify", e.message));
    res.json({ success: true, id: saved.id });
  } catch (err) {
    console.error("[cal-webhook]", err);
    res.status(500).json({ error: "Webhook processing failed" });
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
    "id", "created_at", "type", "status", "name", "email", "company", "industry",
    "team_size", "biggest_pain", "hours_wasted", "hourly_rate", "automation_goal",
    "score", "recommended_service", "annual_savings", "roi_multiple",
    "meeting_at", "meeting_type", "message", "notes",
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
