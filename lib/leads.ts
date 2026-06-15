import { LEAD_ENDPOINT, LEAD_ACCESS_KEY } from "./site";

export type LeadType = "audit" | "contact";

export interface LeadPayload {
  type: LeadType;
  [key: string]: unknown;
}

/**
 * Delivers a lead to the backend. By default posts to the same-origin API
 * (`/api/audit` or `/api/contact`), which our nginx proxies to nodevant-api.
 * If NEXT_PUBLIC_LEAD_ENDPOINT is set, posts there instead (n8n/Web3Forms).
 * NEVER throws — the UI keeps working even if delivery fails.
 * Returns the parsed JSON response on success, or null on failure.
 */
export async function submitLead(
  payload: LeadPayload
): Promise<Record<string, unknown> | null> {
  const endpoint = LEAD_ENDPOINT || `/api/${payload.type}`;

  const body: Record<string, unknown> = { ...payload };
  if (LEAD_ENDPOINT) {
    // External form-service compatibility (ignored by our own API).
    if (LEAD_ACCESS_KEY) body.access_key = LEAD_ACCESS_KEY;
    body.subject = `New Nodevant ${payload.type} lead`;
    body.submitted_from = "nodevant.com";
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) return null;
    return await res.json().catch(() => ({}));
  } catch (err) {
    if (typeof console !== "undefined") console.error("[lead] delivery failed", err);
    return null;
  }
}
