// Public Build Log data. SAMPLE ENTRIES — replace with real ships as they happen;
// the /build page, the RSS feed and the .ics calendar all read from this one array.
// Keep newest-first (sorted DESC by timestamp).

export type BuildType =
  | "product-ship"
  | "client-deploy"
  | "infra"
  | "fix"
  | "experiment";

export type BuildPlatform =
  | "storehouse360"
  | "scalaro"
  | "fabrioza"
  | "fairway360"
  | "globalshield360"
  | "peachpicks"
  | "client-work";

export interface BuildEntry {
  timestamp: string; // ISO 8601 (UTC)
  type: BuildType;
  platform: BuildPlatform;
  headline: string; // ≤100 chars
  context?: string; // ≤200 chars
  stats?: string; // e.g. "+2,400 LOC · 3 DEPLOYS · 0 ROLLBACKS"
}

export const TYPE_LABELS: Record<BuildType, string> = {
  "product-ship": "Product ship",
  "client-deploy": "Client deploy",
  infra: "Infra",
  fix: "Fix",
  experiment: "Experiment",
};

export const PLATFORM_LABELS: Record<BuildPlatform, string> = {
  storehouse360: "Storehouse360",
  scalaro: "Scalaro",
  fabrioza: "Fabrioza",
  fairway360: "Fairway360",
  globalshield360: "GlobalShield360",
  peachpicks: "PeachPicks",
  "client-work": "Client work",
};

// SAMPLE DATA — single source of truth in lib/build-entries.json, shared with the
// RSS/iCal feed generator (scripts/gen-build-feeds.mjs). Replace with real entries.
import entriesData from "./build-entries.json";
export const BUILD_ENTRIES: BuildEntry[] = entriesData as unknown as BuildEntry[];

const WD = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MO = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

/** Deterministic absolute UTC label — safe for SSG (no Date.now, no hydration drift). */
export function formatBuildDate(iso: string): string {
  const d = new Date(iso);
  const hh = String(d.getUTCHours()).padStart(2, "0");
  const mm = String(d.getUTCMinutes()).padStart(2, "0");
  return `${WD[d.getUTCDay()]} · ${MO[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()} · ${hh}:${mm} UTC`;
}
