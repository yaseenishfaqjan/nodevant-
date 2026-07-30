"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import BuildLogEntry from "@/components/build/BuildLogEntry";
import {
  BUILD_ENTRIES,
  TYPE_LABELS,
  PLATFORM_LABELS,
  type BuildType,
  type BuildPlatform,
} from "@/lib/build-log";

const TYPE_OPTIONS: [string, string][] = [
  ["all", "All"],
  ...(Object.entries(TYPE_LABELS) as [BuildType, string][]).map(
    ([v, l]) => [v, l] as [string, string],
  ),
];
const PLATFORM_OPTIONS: [string, string][] = [
  ["all", "All"],
  ...(Object.entries(PLATFORM_LABELS) as [BuildPlatform, string][]).map(
    ([v, l]) => [v, l] as [string, string],
  ),
];

const DIMS = [
  { key: "type" as const, label: "Type", aria: "Filter by type", options: TYPE_OPTIONS },
  { key: "platform" as const, label: "Platform", aria: "Filter by platform", options: PLATFORM_OPTIONS },
];

type DimKey = "type" | "platform";
type State = Record<DimKey, string>;

const chip = (on: boolean): React.CSSProperties =>
  on
    ? { background: "var(--gradient)", color: "#fff", border: "1px solid transparent", boxShadow: "var(--shadow-glow)" }
    : { background: "var(--surface)", color: "var(--text)", border: "1px solid var(--border-strong)" };

export default function BuildLogClient() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const initial = useMemo<State>(() => {
    const s: State = { type: "all", platform: "all" };
    for (const d of DIMS) {
      const v = params.get(d.key);
      if (v && d.options.some((o) => o[0] === v)) s[d.key] = v;
    }
    return s;
  }, [params]);

  const [state, setState] = useState<State>(initial);

  // Sync the URL AFTER render (never during) so router updates can't fire mid-render.
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const q = new URLSearchParams();
    for (const d of DIMS) if (state[d.key] !== "all") q.set(d.key, state[d.key]);
    const qs = q.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [state, pathname, router]);

  const setFilter = (key: DimKey, val: string) =>
    setState((s) => ({ ...s, [key]: s[key] === val ? "all" : val }));
  const reset = () => setState({ type: "all", platform: "all" });

  const shown = BUILD_ENTRIES.filter(
    (e) =>
      (state.type === "all" || e.type === state.type) &&
      (state.platform === "all" || e.platform === state.platform),
  );
  const anyActive = state.type !== "all" || state.platform !== "all";
  const countLabel = `${shown.length} ${shown.length === 1 ? "entry" : "entries"}`;

  return (
    <>
      {/* Filters */}
      <div className="flex flex-col gap-3.5">
        {DIMS.map((dim) => (
          <div key={dim.key} role="group" aria-label={dim.aria} className="flex flex-wrap items-center gap-2">
            <span className="w-[76px] font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-faint">{dim.label}</span>
            {dim.options.map(([val, label]) => {
              const on = state[dim.key] === val;
              return (
                <button
                  key={val}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setFilter(dim.key, val)}
                  className="inline-flex min-h-[38px] items-center whitespace-nowrap rounded-lg px-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.08em] transition-colors"
                  style={chip(on)}
                >
                  {label}
                </button>
              );
            })}
          </div>
        ))}
        <div className="flex flex-wrap items-center gap-3.5">
          <p aria-live="polite" className="font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-faint">{countLabel} · last 3 weeks</p>
          {anyActive && (
            <button type="button" onClick={reset} className="inline-flex min-h-[36px] items-center rounded-full px-3.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink transition-colors hover:bg-[var(--surface-2)]" style={{ border: "1px solid var(--border-strong)" }}>
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-9" style={{ animation: "nv-fade .25s ease both" }}>
        {shown.length > 0 ? (
          shown.map((e, i) => <BuildLogEntry key={e.timestamp} entry={e} last={i === shown.length - 1} />)
        ) : (
          <div className="rounded-2xl border border-line-strong bg-surface p-12 text-center">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-faint">No entries match these filters</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3.5">
              <button type="button" onClick={reset} className="btn-primary">Reset filters</button>
              <Link href="/case-studies/" className="btn-secondary">
                Read our case studies <Icon name="chevron" className="h-3.5 w-3.5" strokeWidth={2.2} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
