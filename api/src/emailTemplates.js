// ONE source of truth for every Nodevant email. Both the internal alert and
// the lead-facing confirmation render from here, type-driven, so styling never
// drifts between audit / contact / service / booking / call / newsletter.

const FROM_ADDR = process.env.SMTP_USER || "info@nodevant.com";
const SITE = process.env.SITE_URL || "https://nodevant.com";

const C = {
  bg: "#0C0C0F",
  surface: "#13131A",
  border: "rgba(255,255,255,0.08)",
  a1: "#3B82F6",
  a2: "#8B5CF6",
  text: "#ECECF4",
  muted: "#A6A6BC",
  faint: "#6E6E86",
  grad: "linear-gradient(100deg,#3B82F6,#8B5CF6)",
  ok: "#34D399",
};

const fmt = (n) => `$${Number(n || 0).toLocaleString("en-US")}`;
const esc = (s) =>
  String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

// Human labels + subject prefixes per source type.
const LABEL = {
  audit: "Automation Audit",
  contact: "Contact Message",
  service: "Service Inquiry",
  booking: "Meeting Booking",
  call: "Voice Call",
  newsletter: "Newsletter Signup",
};
const PREFIX = {
  audit: "AUDIT",
  contact: "CONTACT",
  service: "SERVICE",
  booking: "BOOKING",
  call: "CALL",
  newsletter: "NEWSLETTER",
};

function subjectPrefix(lead, meta = {}) {
  const t = lead.type || "contact";
  if (t === "service" && meta.serviceName) return `SERVICE: ${meta.serviceName}`;
  return PREFIX[t] || t.toUpperCase();
}

// Shared HTML shell — logo header + footer.
function shell(inner, preheader = "") {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;background:${C.bg};color:${C.text};font-family:Inter,-apple-system,Arial,sans-serif;-webkit-font-smoothing:antialiased">
${preheader ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${esc(preheader)}</div>` : ""}
<div style="max-width:600px;margin:0 auto;padding:40px 24px">
  <div style="text-align:center;margin-bottom:28px">
    <span style="font-size:22px;font-weight:800;letter-spacing:-0.02em;color:${C.text}">NODE<span style="background:${C.grad};-webkit-background-clip:text;background-clip:text;color:transparent">VANT</span></span>
    <div style="margin-top:6px;font-family:ui-monospace,monospace;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:${C.faint}">AI Automation Agency</div>
  </div>
  ${inner}
  <hr style="border:none;border-top:1px solid ${C.border};margin:32px 0">
  <p style="font-size:12px;color:${C.faint};text-align:center;margin:0">Nodevant · <a href="mailto:${FROM_ADDR}" style="color:${C.a1};text-decoration:none">${FROM_ADDR}</a> · <a href="${SITE}" style="color:${C.a1};text-decoration:none">nodevant.com</a></p>
</div></body></html>`;
}

const btn = (href, text) =>
  `<div style="text-align:center;margin:24px 0"><a href="${href}" style="display:inline-block;background:${C.grad};color:#fff;text-decoration:none;padding:15px 30px;border-radius:10px;font-weight:700;font-size:15px">${text}</a></div>`;

const card = (inner, accent) =>
  `<div style="background:${accent ? "rgba(59,130,246,0.08)" : "rgba(255,255,255,0.03)"};border:1px solid ${accent ? "rgba(59,130,246,0.25)" : C.border};border-radius:12px;padding:22px;margin-bottom:16px">${inner}</div>`;

const label = (t) =>
  `<div style="font-family:ui-monospace,monospace;font-size:11px;text-transform:uppercase;letter-spacing:.14em;color:${C.a1};margin-bottom:10px">${t}</div>`;

// ── Lead-facing confirmation (type-driven) ─────────────────────────────
function confirmationHtml(lead, report) {
  const first = (lead.name || "").trim().split(" ")[0] || "there";
  const type = lead.type || "contact";

  // Audit gets the rich ROI report as its confirmation.
  if (type === "audit" && report) {
    const { score, recommendation, roi } = report;
    const band =
      score < 40
        ? "High opportunity — significant time being lost"
        : score < 70
        ? "Medium opportunity — room to optimize"
        : "Good baseline — fine-tuning available";
    const inner = `
      <p style="color:${C.muted};line-height:1.6;font-size:15px;margin:0 0 20px">Hi ${esc(first)}, here's your personalized automation report — what your #1 opportunity is worth and what to do about it.</p>
      ${card(
        `${label("Your Automation Score")}<div style="font-size:44px;font-weight:800;color:${C.a1};text-align:center">${score}/100</div><div style="text-align:center;color:${C.a1};font-size:14px;margin-top:6px">${band}</div>`,
        true
      )}
      ${card(
        `${label("Your #1 Opportunity")}<h2 style="font-size:20px;color:${C.text};margin:0 0 8px">${esc(recommendation.serviceTitle)}</h2><p style="color:${C.muted};line-height:1.6;margin:0;font-size:15px">${esc(recommendation.description)}</p>`
      )}
      ${card(
        `${label("Estimated ROI")}<table width="100%" style="border-collapse:collapse;font-size:14px">
          <tr><td style="color:${C.muted};padding:6px 0">Annual cost of the problem</td><td style="text-align:right;color:${C.text};font-weight:600">${fmt(roi.annualCostOfProblem)}</td></tr>
          <tr><td style="color:${C.muted};padding:6px 0">Annual savings after automation</td><td style="text-align:right;color:${C.a1};font-weight:700">${fmt(roi.annualSavings)}</td></tr>
          <tr><td style="color:${C.muted};padding:6px 0">Estimated build cost</td><td style="text-align:right;color:${C.text};font-weight:600">${fmt(roi.buildCost)}</td></tr>
          <tr><td style="color:${C.muted};padding:6px 0">Payback period</td><td style="text-align:right;color:${C.text};font-weight:600">${esc(roi.paybackWeeks)} weeks</td></tr>
          <tr><td style="color:${C.muted};padding:6px 0">12-month ROI</td><td style="text-align:right;color:${C.a1};font-weight:800;font-size:18px">${esc(roi.roiMultiple)}×</td></tr>
        </table>`
      )}
      ${card(
        `${label("What Happens Next")}<p style="color:${C.muted};line-height:1.6;margin:0;font-size:15px">An automation expert will personally review your answers and <b style="color:${C.text}">reach out within 24 hours</b>. Prefer to lock a time now?</p>`,
        true
      )}
      ${btn(`${SITE}/contact/?from=audit`, "Book Your Free 30-Min Strategy Call →")}`;
    return shell(inner, `Your automation report — ${roi.roiMultiple}× ROI opportunity`);
  }

  // Copy per non-audit type.
  const COPY = {
    contact: {
      intro: "Thanks for reaching out — we've received your message.",
      body: "An automation expert will personally reach out within 24 hours to learn more and map your highest-ROI automation. In the meantime, see your numbers instantly with our free 90-second audit.",
      cta: [`${SITE}/audit/`, "Take the Free 90-Second Audit →"],
    },
    service: {
      intro: "Thanks — we've received your service inquiry.",
      body: "An automation expert will review your requirements and reach out within 24 hours with next steps and a clear scope. Want a head start? Run the free 90-second audit for an instant ROI estimate.",
      cta: [`${SITE}/audit/`, "Take the Free 90-Second Audit →"],
    },
    booking: {
      intro: "Your strategy call is confirmed — we're looking forward to it.",
      body: "We'll review your business beforehand so the call is focused from the first minute. If anything changes, just reply to this email.",
      cta: [`${SITE}/`, "Explore Nodevant →"],
    },
    call: {
      intro: "Thanks for calling Nodevant.",
      body: "We've logged your call and an automation expert will follow up within 24 hours. In the meantime, see your automation ROI instantly with our free 90-second audit.",
      cta: [`${SITE}/audit/`, "Take the Free 90-Second Audit →"],
    },
    newsletter: {
      intro: "You're subscribed — welcome aboard.",
      body: "You'll get practical automation playbooks and deployed-system breakdowns, no fluff. Want to see your own numbers first?",
      cta: [`${SITE}/audit/`, "Take the Free 90-Second Audit →"],
    },
  };
  const c = COPY[type] || COPY.contact;
  const submitted = summarizeSubmitted(lead);
  const inner = `
    <p style="color:${C.muted};line-height:1.6;font-size:15px;margin:0 0 16px">Hi ${esc(first)},</p>
    <p style="color:${C.text};font-size:17px;font-weight:700;margin:0 0 16px">${esc(c.intro)}</p>
    <p style="color:${C.muted};line-height:1.6;font-size:15px;margin:0 0 8px">${esc(c.body)}</p>
    ${submitted ? card(`${label("What you sent us")}${submitted}`) : ""}
    ${btn(c.cta[0], c.cta[1])}`;
  return shell(inner, c.intro);
}

// A compact "here's what you submitted" block for the confirmation.
function summarizeSubmitted(lead) {
  const rows = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Company", lead.company],
    ["Message", lead.message],
  ].filter(([, v]) => v);
  if (!rows.length) return "";
  return `<table width="100%" style="border-collapse:collapse;font-size:14px">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="color:${C.faint};padding:5px 12px 5px 0;vertical-align:top;white-space:nowrap">${k}</td><td style="color:${C.muted};padding:5px 0">${esc(v)}</td></tr>`
    )
    .join("")}</table>`;
}

// ── Internal alert (all fields + triage meta + reply link) ─────────────
function internalAlertHtml(lead, meta = {}) {
  const fields = Object.entries(lead)
    .filter(([, v]) => v !== null && v !== undefined && v !== "")
    .map(
      ([k, v]) =>
        `<tr><td style="color:${C.faint};padding:5px 12px 5px 0;vertical-align:top;white-space:nowrap"><b>${esc(k)}</b></td><td style="color:${C.text};padding:5px 0;word-break:break-word">${esc(v)}</td></tr>`
    )
    .join("");

  const metaRows = [
    ["Received", meta.timestamp || new Date().toISOString()],
    ["Source page", meta.sourcePage],
    ["IP", meta.ip],
    ["User agent", meta.userAgent],
    meta.durationSeconds != null ? ["Call duration", `${meta.durationSeconds}s`] : null,
    meta.agentNumber ? ["Agent number", meta.agentNumber] : null,
  ]
    .filter(Boolean)
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="color:${C.faint};padding:4px 12px 4px 0;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="color:${C.muted};padding:4px 0;word-break:break-word">${esc(v)}</td></tr>`
    )
    .join("");

  const reportLine = meta.report
    ? `<p style="color:${C.muted};font-size:14px;margin:0 0 14px"><b style="color:${C.text}">Score:</b> ${meta.report.score}/100 · <b style="color:${C.text}">Service:</b> ${esc(meta.report.recommendation.serviceTitle)} · <b style="color:${C.text}">Savings:</b> ${fmt(meta.report.roi.annualSavings)}/yr · <b style="color:${C.text}">ROI:</b> ${meta.report.roi.roiMultiple}×</p>`
    : "";

  const transcript = meta.transcriptPreview
    ? card(`${label("Transcript preview")}<p style="color:${C.muted};line-height:1.6;margin:0;font-size:13px;font-style:italic">"${esc(meta.transcriptPreview)}"</p>`)
    : "";

  // Reply link (mailto with prefilled subject) + tel link for calls.
  const replySubject = encodeURIComponent(`Re: your ${LABEL[lead.type] || "message"} to Nodevant`);
  const replyBtn = lead.email
    ? `<a href="mailto:${esc(lead.email)}?subject=${replySubject}" style="display:inline-block;background:${C.grad};color:#fff;text-decoration:none;padding:12px 22px;border-radius:9px;font-weight:700;font-size:14px;margin-right:8px">Reply to lead →</a>`
    : "";
  const callBtn = lead.phone
    ? `<a href="tel:${esc(lead.phone)}" style="display:inline-block;border:1px solid ${C.border};color:${C.text};text-decoration:none;padding:12px 22px;border-radius:9px;font-weight:700;font-size:14px;margin-right:8px">Call ${esc(lead.phone)} →</a>`
    : "";
  const crmBtn = `<a href="${SITE}/admin/" style="display:inline-block;border:1px solid ${C.border};color:${C.text};text-decoration:none;padding:12px 22px;border-radius:9px;font-weight:700;font-size:14px">Open CRM →</a>`;

  const inner = `
    <div style="text-align:center;margin-bottom:8px"><span style="font-family:ui-monospace,monospace;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:${C.ok}">● New ${esc(LABEL[lead.type] || lead.type || "lead")}</span></div>
    <h2 style="font-size:20px;color:${C.text};text-align:center;margin:0 0 20px">${esc(lead.name || lead.email || lead.phone || "New lead")}</h2>
    ${reportLine}
    ${card(`${label("Lead details")}<table width="100%" style="border-collapse:collapse;font-size:14px">${fields}</table>`)}
    ${transcript}
    ${metaRows ? card(`${label("Triage")}<table width="100%" style="border-collapse:collapse">${metaRows}</table>`) : ""}
    <div style="text-align:center;margin-top:20px">${replyBtn}${callBtn}${crmBtn}</div>`;
  return shell(inner, `New ${LABEL[lead.type] || "lead"} — ${lead.name || lead.email || "lead"}`);
}

module.exports = {
  confirmationHtml,
  internalAlertHtml,
  subjectPrefix,
  LABEL,
  PREFIX,
};
