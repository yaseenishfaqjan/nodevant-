// Unified notification layer. EVERY intake channel calls sendLeadNotification —
// no Nodemailer code lives anywhere else. Guarantees:
//   • internal alert always reaches info@ (forced) + any LEAD_NOTIFY_TO extras
//   • lead-facing confirmation from the same template file
//   • [SOURCE]-prefixed subjects, IP/UA triage, reply link
//   • best-effort retry so a transient SMTP hiccup doesn't silently drop a lead
const { getTransport, FROM_NAME, FROM_ADDR } = require("./mailer");
const { confirmationHtml, internalAlertHtml, subjectPrefix } = require("./emailTemplates");

// info@ is ALWAYS notified; LEAD_NOTIFY_TO adds extra recipients (comma-sep).
const INFO_ADDR = FROM_ADDR || "info@nodevant.com";
const EXTRA_TO = (process.env.LEAD_NOTIFY_TO || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const BCC = (process.env.LEAD_NOTIFY_BCC || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

function internalRecipients() {
  const set = new Set([INFO_ADDR.toLowerCase()]);
  for (const a of EXTRA_TO) set.add(a.toLowerCase());
  return Array.from(set);
}

async function sendWithRetry(transport, opts, attempts = 2) {
  let lastErr;
  for (let i = 0; i < attempts; i++) {
    try {
      return await transport.sendMail(opts);
    } catch (err) {
      lastErr = err;
      if (i < attempts - 1) await new Promise((r) => setTimeout(r, 1500));
    }
  }
  throw lastErr;
}

/**
 * @param {object} lead  { type, name, email, phone, company, message, ... }
 * @param {object} meta  { report, ip, userAgent, sourcePage, timestamp,
 *                         serviceName, durationSeconds, agentNumber,
 *                         transcriptPreview, confirm=true }
 * @returns {Promise<{internal:boolean, confirmation:boolean}>}
 */
async function sendLeadNotification(lead, meta = {}) {
  const result = { internal: false, confirmation: false };
  const t = getTransport();
  if (!t) {
    console.warn("[notify] SMTP not configured — skipping", lead.type, lead.email || lead.phone);
    return result;
  }
  meta.timestamp = meta.timestamp || new Date().toISOString();

  // 1) Internal alert → info@ (+ extras), never blocks the caller's response.
  try {
    await sendWithRetry(t, {
      from: `"${FROM_NAME} Leads" <${INFO_ADDR}>`,
      to: internalRecipients(),
      bcc: BCC.length ? BCC : undefined,
      replyTo: lead.email || undefined,
      subject: `[${subjectPrefix(lead, meta)}] ${lead.name || lead.email || lead.phone || "New lead"}`,
      html: internalAlertHtml(lead, meta),
    });
    result.internal = true;
  } catch (err) {
    console.error("[notify] internal alert failed:", err.message);
  }

  // 2) Lead-facing confirmation (only if we have their email + not suppressed).
  if (lead.email && meta.confirm !== false) {
    try {
      const isAudit = lead.type === "audit" && meta.report;
      await sendWithRetry(t, {
        from: `"${FROM_NAME}" <${INFO_ADDR}>`,
        to: lead.email,
        replyTo: INFO_ADDR,
        subject: isAudit
          ? `Your automation report: ${meta.report.roi.roiMultiple}× ROI opportunity`
          : confirmSubject(lead.type),
        html: confirmationHtml(lead, meta.report),
      });
      result.confirmation = true;
    } catch (err) {
      console.error("[notify] confirmation failed:", err.message);
    }
  }

  return result;
}

function confirmSubject(type) {
  switch (type) {
    case "booking":
      return "Your Nodevant strategy call is confirmed ✅";
    case "service":
      return "We've got your service inquiry — an expert will reach out";
    case "newsletter":
      return "You're subscribed to Nodevant";
    case "call":
      return "Thanks for calling Nodevant — we'll follow up shortly";
    default:
      return "We've got your details — an expert will reach out shortly";
  }
}

module.exports = { sendLeadNotification };
