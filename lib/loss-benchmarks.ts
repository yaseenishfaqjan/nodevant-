// Loss / response-time benchmarks shared by the /pricing Cost-of-Doing-Nothing
// meter (Feature 2) and the /audit results ROI math (Feature 4).
//
// Sources: published B2B lead-response studies (Harvard Business Review /
// Lead Response Management). Client-side only — no network, no PII.

export type ResponseTime =
  | "under-5-min"
  | "under-1-hour"
  | "under-4-hours"
  | "same-day"
  | "next-day";

/** Share of qualified leads lost to a faster competitor at each response speed. */
export const LOSS_RATE_BY_RESPONSE: Record<ResponseTime, number> = {
  "under-5-min": 0.05,
  "under-1-hour": 0.35,
  "under-4-hours": 0.78,
  "same-day": 0.85,
  "next-day": 0.94,
};

export const RESPONSE_TIME_LABELS: Record<ResponseTime, string> = {
  "under-5-min": "under-5-minute",
  "under-1-hour": "under-1-hour",
  "under-4-hours": "4-hour",
  "same-day": "same-day",
  "next-day": "next-day",
};

/** Of the leads that DO get responded to, the share that close. */
export const AVG_CLOSE_RATE_OF_RESPONDED = 0.15;

/** Nodevant's starting engagement price, used for payback math. */
export const NODEVANT_STARTING_PRICE = 2400;

/** Payback periods under this many days render as "Under 30 days*" with a footnote. */
export const PAYBACK_FLOOR_DAYS = 30;

export interface LeakInputs {
  leadsPerWeek: number;
  dealValue: number;
  responseTime: ResponseTime;
}

export interface LeakResult {
  leadsLostPerWeek: number;
  revenueLeakPerMonth: number;
  paybackDays: number;
  lossRate: number;
}

/**
 * Core leak model, shared so /pricing and /audit never drift.
 *   leadsLostPerWeek    = leadsPerWeek * LOSS_RATE_BY_RESPONSE[responseTime]
 *   revenueLeakPerMonth = leadsLostPerWeek * 4 * dealValue * AVG_CLOSE_RATE_OF_RESPONDED
 *   paybackDays         = ceil((NODEVANT_STARTING_PRICE / revenueLeakPerMonth) * 30)
 */
export function computeLeak({
  leadsPerWeek,
  dealValue,
  responseTime,
}: LeakInputs): LeakResult {
  const lossRate = LOSS_RATE_BY_RESPONSE[responseTime] ?? 0;
  const leadsLostPerWeek = leadsPerWeek * lossRate;
  const revenueLeakPerMonth =
    leadsLostPerWeek * 4 * dealValue * AVG_CLOSE_RATE_OF_RESPONDED;
  const paybackDays =
    revenueLeakPerMonth > 0
      ? Math.ceil((NODEVANT_STARTING_PRICE / revenueLeakPerMonth) * 30)
      : 0;
  return { leadsLostPerWeek, revenueLeakPerMonth, paybackDays, lossRate };
}

/**
 * Payback-days floor (same rule on /pricing and /audit): anything under
 * PAYBACK_FLOOR_DAYS is shown as "Under 30 days*" so we never over-promise a
 * suspiciously fast number. Returns the label plus whether the footnote applies.
 */
export function formatPaybackDays(days: number): {
  label: string;
  floored: boolean;
} {
  if (days > 0 && days < PAYBACK_FLOOR_DAYS) {
    return { label: `Under ${PAYBACK_FLOOR_DAYS} days*`, floored: true };
  }
  return { label: `${days} days`, floored: false };
}

/** Same floor expressed in weeks (used by the audit ROI tiles). */
export function formatPaybackWeeks(weeks: number): {
  label: string;
  floored: boolean;
} {
  if (weeks * 7 < PAYBACK_FLOOR_DAYS) {
    return { label: `Under ${PAYBACK_FLOOR_DAYS} days*`, floored: true };
  }
  return { label: `${weeks} weeks`, floored: false };
}
