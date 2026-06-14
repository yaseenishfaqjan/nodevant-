import { LEAD_ENDPOINT, LEAD_ACCESS_KEY } from "./site";

export type LeadType = "audit" | "contact";

export interface LeadPayload {
  type: LeadType;
  // common
  name?: string;
  email?: string;
  // contact
  company?: string;
  message?: string;
  source?: string;
  // audit
  [key: string]: unknown;
}

/**
 * Fire-and-forget lead delivery to a configurable webhook / form service.
 * NEVER throws — the UI must keep working even if delivery fails or is unset.
 * Returns true only when a request was sent and the endpoint accepted it.
 */
export async function submitLead(payload: LeadPayload): Promise<boolean> {
  if (!LEAD_ENDPOINT) {
    // No endpoint configured yet — log for local dev, don't break the flow.
    if (typeof console !== "undefined") {
      console.info("[lead] no LEAD_ENDPOINT configured; skipping delivery", payload);
    }
    return false;
  }

  const body: Record<string, unknown> = {
    ...payload,
    // Web3Forms compatibility (ignored by n8n/Make/Zapier webhooks):
    ...(LEAD_ACCESS_KEY ? { access_key: LEAD_ACCESS_KEY } : {}),
    subject: `New Nodevant ${payload.type} lead${payload.email ? ` — ${payload.email}` : ""}`,
    submitted_from: "nodevant.com",
  };

  try {
    const res = await fetch(LEAD_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
    });
    return res.ok;
  } catch (err) {
    if (typeof console !== "undefined") {
      console.error("[lead] delivery failed", err);
    }
    return false;
  }
}
