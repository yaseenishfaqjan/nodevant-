const nodemailer = require("nodemailer");

const FROM_NAME = process.env.MAIL_FROM_NAME || "Nodevant";
const FROM_ADDR = process.env.SMTP_USER || "info@nodevant.com";
const NOTIFY_TO = process.env.LEAD_NOTIFY_TO || FROM_ADDR;
const SITE = process.env.SITE_URL || "https://nodevant.com";

let transporter = null;

function getTransport() {
  if (transporter) return transporter;
  if (!process.env.SMTP_HOST || !process.env.SMTP_PASS) {
    console.warn("[mail] SMTP not configured — emails will be skipped");
    return null;
  }
  const port = Number(process.env.SMTP_PORT || 465);
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  return transporter;
}

const fmt = (n) => `$${Number(n || 0).toLocaleString("en-US")}`;

function reportHtml(firstName, report) {
  const { score, recommendation, roi, painLabel } = report;
  const band =
    score < 40
      ? "🔥 High opportunity — significant time being lost"
      : score < 70
      ? "⚡ Medium opportunity — room to optimize"
      : "✅ Good baseline — fine-tuning available";
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    body{font-family:Inter,Arial,sans-serif;background:#08080F;color:#F0F0FF;margin:0;padding:0}
    .c{max-width:600px;margin:0 auto;padding:40px 24px}
    .logo{font-size:24px;font-weight:700;color:#00D4FF}
    .score-block{background:rgba(0,212,255,0.08);border:1px solid rgba(0,212,255,0.2);border-radius:12px;padding:24px;text-align:center;margin-bottom:24px}
    .score{font-size:48px;font-weight:700;color:#00D4FF}
    .section{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:24px;margin-bottom:16px}
    .label{font-size:12px;text-transform:uppercase;letter-spacing:.12em;color:#7B7BA8;margin-bottom:12px}
    .cta{display:inline-block;background:linear-gradient(135deg,#00D4FF,#9B5CFF);color:#08080F;text-decoration:none;padding:16px 32px;border-radius:8px;font-weight:700;margin:24px 0}
    h2{font-size:20px;color:#F0F0FF;margin:0 0 12px}p{color:#B0B0CC;line-height:1.6;margin:0;font-size:15px}
    td{padding:8px 0;font-size:14px}.tool{display:inline-block;background:rgba(0,212,255,0.1);border:1px solid rgba(0,212,255,0.2);border-radius:6px;padding:4px 12px;font-size:13px;color:#00D4FF;margin:2px}
  </style></head><body><div class="c">
    <div style="text-align:center;margin-bottom:32px"><div class="logo">⬡ Nodevant</div>
      <p style="color:#7B7BA8;margin-top:8px;font-size:14px">Your Automation Audit Report</p></div>
    <p style="margin-bottom:24px">Hi ${firstName || "there"},</p>
    <p style="margin-bottom:32px">Here's your personalized automation report. Based on your answers, we found a clear opportunity — here's what it's worth and what to do about it.</p>
    <div class="score-block"><div class="label">Your Automation Score</div>
      <div class="score">${score}/100</div>
      <div style="color:#00D4FF;margin-top:8px;font-size:14px">${band}</div></div>
    <div class="section"><div class="label">🎯 Your #1 Opportunity</div>
      <h2>${recommendation.serviceTitle}</h2><p>${recommendation.description}</p>
      <div style="margin-top:12px">${recommendation.tools.map((t) => `<span class="tool">${t}</span>`).join("")}</div></div>
    <div class="section"><div class="label">💰 Estimated ROI</div>
      <table width="100%" style="border-collapse:collapse">
        <tr><td style="color:#7B7BA8">Annual cost of the problem</td><td style="text-align:right;color:#F0F0FF;font-weight:600">${fmt(roi.annualCostOfProblem)}</td></tr>
        <tr><td style="color:#7B7BA8">Annual savings after automation</td><td style="text-align:right;color:#00D4FF;font-weight:700">${fmt(roi.annualSavings)}</td></tr>
        <tr><td style="color:#7B7BA8">Estimated build cost</td><td style="text-align:right;color:#F0F0FF;font-weight:600">${fmt(roi.buildCost)}</td></tr>
        <tr><td style="color:#7B7BA8">Payback period</td><td style="text-align:right;color:#F0F0FF;font-weight:600">${roi.paybackWeeks} weeks</td></tr>
        <tr><td style="color:#7B7BA8">12-month ROI</td><td style="text-align:right;color:#00D4FF;font-weight:700;font-size:18px">${roi.roiMultiple}×</td></tr>
      </table></div>
    <div class="section"><div class="label">📋 Proof It Works</div><p style="font-style:italic">"${recommendation.caseStudyHook}"</p></div>
    <div class="section" style="background:rgba(0,212,255,0.06);border-color:rgba(0,212,255,0.2)">
      <div class="label">⏱️ What Happens Next</div>
      <p>One of our automation experts will personally review your answers and <b style="color:#F0F0FF">reach out within the next few hours</b> to help you map exactly what to build. Prefer to lock in a time now? Grab a free 30-minute strategy call below.</p>
    </div>
    <div style="text-align:center"><a href="${SITE}/contact/?from=audit" class="cta">Book Your Free 30-Min Strategy Call →</a></div>
    <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:32px 0">
    <p style="font-size:12px;color:#7B7BA8;text-align:center">Nodevant · ${FROM_ADDR} · <a href="${SITE}" style="color:#00D4FF">nodevant.com</a></p>
  </div></body></html>`;
}

function notifyHtml(lead, report) {
  const rows = Object.entries(lead)
    .filter(([, v]) => v !== null && v !== undefined && v !== "")
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#666"><b>${k}</b></td><td style="padding:4px 0">${v}</td></tr>`)
    .join("");
  return `<div style="font-family:Arial,sans-serif">
    <h2>New ${lead.type} lead — ${lead.email || "no email"}</h2>
    ${report ? `<p><b>Score:</b> ${report.score}/100 · <b>Service:</b> ${report.recommendation.serviceTitle} · <b>Savings:</b> ${fmt(report.roi.annualSavings)}/yr · <b>ROI:</b> ${report.roi.roiMultiple}×</p>` : ""}
    <table style="border-collapse:collapse">${rows}</table>
    <p style="margin-top:16px"><a href="${SITE}/admin/">Open CRM →</a></p></div>`;
}

async function sendReportEmail(lead, report) {
  const t = getTransport();
  if (!t || !lead.email) return;
  await t.sendMail({
    from: `"${FROM_NAME}" <${FROM_ADDR}>`,
    to: lead.email,
    subject: `Your automation report: ${report.roi.roiMultiple}× ROI opportunity identified`,
    html: reportHtml(lead.name, report),
  });
}

async function sendNotification(lead, report) {
  const t = getTransport();
  if (!t) return;
  const labels = {
    audit: "audit",
    contact: "contact / service request",
    booking: "meeting booking",
    call: "voice call",
  };
  await t.sendMail({
    from: `"${FROM_NAME} Leads" <${FROM_ADDR}>`,
    to: NOTIFY_TO,
    replyTo: lead.email || undefined,
    subject: `🔔 New ${labels[lead.type] || lead.type} — ${lead.name || lead.email || "lead"}`,
    html: notifyHtml(lead, report),
  });
}

// Branded "we've got your info" welcome to the prospect.
function welcomeHtml(firstName, kind) {
  const hi = firstName ? `Hi ${firstName},` : "Hi there,";
  const intro =
    kind === "booking"
      ? "Your strategy call is confirmed — we're looking forward to it."
      : "Thanks for reaching out — we've received your details.";
  const body =
    kind === "booking"
      ? "One of our automation experts will review your business beforehand so the call is focused and useful from the very first minute. If anything changes, just reply to this email."
      : "One of our automation experts will personally reach out within the next few hours to learn more and map your highest-ROI automation. In the meantime, you can see your numbers instantly with our free 90-second audit.";
  const cta =
    kind === "booking"
      ? `<a href="${SITE}/" class="cta">Explore Nodevant →</a>`
      : `<a href="${SITE}/audit/" class="cta">Take the Free 90-Second Audit →</a>`;
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    body{font-family:Inter,Arial,sans-serif;background:#08080F;color:#F0F0FF;margin:0}
    .c{max-width:600px;margin:0 auto;padding:40px 24px}
    .logo{font-size:24px;font-weight:700;color:#00D4FF}
    p{color:#B0B0CC;line-height:1.6;font-size:15px}
    .cta{display:inline-block;background:linear-gradient(135deg,#00D4FF,#9B5CFF);color:#08080F;text-decoration:none;padding:14px 28px;border-radius:8px;font-weight:700;margin:24px 0}
  </style></head><body><div class="c">
    <div style="text-align:center;margin-bottom:28px"><div class="logo">⬡ Nodevant</div></div>
    <p style="margin-bottom:20px">${hi}</p>
    <p style="margin-bottom:16px;color:#F0F0FF;font-size:17px"><b>${intro}</b></p>
    <p style="margin-bottom:24px">${body}</p>
    <div style="text-align:center">${cta}</div>
    <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:32px 0">
    <p style="font-size:12px;color:#7B7BA8;text-align:center">Nodevant · ${FROM_ADDR} · <a href="${SITE}" style="color:#00D4FF">nodevant.com</a></p>
  </div></body></html>`;
}

async function sendWelcomeEmail(lead, kind) {
  const t = getTransport();
  if (!t || !lead.email) return;
  const subject =
    kind === "booking"
      ? "Your Nodevant strategy call is confirmed ✅"
      : "We've got your details — an expert will reach out shortly";
  await t.sendMail({
    from: `"${FROM_NAME}" <${FROM_ADDR}>`,
    to: lead.email,
    replyTo: NOTIFY_TO,
    subject,
    html: welcomeHtml(lead.name, kind),
  });
}

module.exports = {
  sendReportEmail,
  sendWelcomeEmail,
  sendNotification,
  // Exposed so the unified notification layer (notify.js) reuses one transport.
  getTransport,
  FROM_NAME,
  FROM_ADDR,
  NOTIFY_TO,
};
