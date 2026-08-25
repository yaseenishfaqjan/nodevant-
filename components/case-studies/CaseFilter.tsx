"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import CaseCard from "@/components/case-studies/CaseCard";
import type { CaseStudyDetail } from "@/lib/case-studies";

type DimKey = "industry" | "outcome" | "service" | "stack";

const DIMS: { key: DimKey; label: string; aria: string; options: [string, string][] }[] = [
  {
    key: "industry",
    label: "Industry",
    aria: "Filter by industry",
    options: [
      ["all", "All"], ["fintech", "Fintech"], ["manufacturing", "Manufacturing"], ["saas", "SaaS"],
      ["field", "Field Services"], ["hospitality", "Hospitality"], ["consumer", "Consumer"],
      ["education", "Education"], ["home", "Home Services"],
    ],
  },
  {
    key: "outcome",
    label: "Outcome",
    aria: "Filter by outcome",
    options: [
      ["all", "All"], ["revenue", "Revenue lift"], ["time", "Time saved"], ["speed", "Response speed"],
      ["cost", "Cost cut"], ["consolidation", "System consolidation"],
    ],
  },
  {
    key: "service",
    label: "Service",
    aria: "Filter by service",
    options: [
      ["all", "All"], ["agentic", "Agentic Workflows"], ["voice", "AI Voice Agents"], ["logic", "Complex Logic Engines"],
      ["integration", "System Integration"], ["leadgen", "Lead Gen Pipeline"], ["custom", "Custom AI Solutions"],
    ],
  },
  {
    key: "stack",
    label: "Stack",
    aria: "Filter by stack",
    options: [
      ["all", "All"], ["storehouse360", "Storehouse360"], ["fabrioza", "FABRIOZA"], ["scalaro", "Scalaro"],
      ["bmaikr", "BMAIKR"], ["academy", "Academy"], ["home-services", "Home Services"],
    ],
  },
];

type State = Record<DimKey, string>;

const ALL_OFF: State = {
  industry: "all",
  outcome: "all",
  service: "all",
  stack: "all",
};

export default function CaseFilter({ cases }: { cases: CaseStudyDetail[] }) {
  const router = useRouter();
  const pathname = usePathname();

  /**
   * Starts unfiltered so every case is rendered into the STATIC HTML.
   *
   * This used to seed state from `useSearchParams()`, which opts the subtree
   * out of static rendering — so the exported HTML contained only the empty
   * Suspense fallback and Googlebot never saw a single case. Search Console
   * duly filed the page under "Duplicate without user-selected canonical"
   * (i.e. too thin to index). Deep-linked filters are applied after mount
   * instead, which costs one client-side pass and keeps the cases crawlable.
   */
  const [state, setState] = useState<State>(ALL_OFF);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const next: State = { ...ALL_OFF };
    let found = false;
    for (const d of DIMS) {
      const v = q.get(d.key);
      if (v && d.options.some((o) => o[0] === v)) {
        next[d.key] = v;
        found = true;
      }
    }
    if (found) setState(next);
  }, []);

  const syncUrl = useCallback(
    (next: State) => {
      const q = new URLSearchParams();
      for (const d of DIMS) if (next[d.key] !== "all") q.set(d.key, next[d.key]);
      const qs = q.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router],
  );

  const setFilter = useCallback(
    (key: DimKey, val: string) => {
      setState((s) => {
        const next = { ...s, [key]: s[key] === val ? "all" : val };
        syncUrl(next);
        return next;
      });
    },
    [syncUrl],
  );

  const reset = useCallback(() => {
    const next: State = { ...ALL_OFF };
    setState(next);
    syncUrl(next);
  }, [syncUrl]);

  const shown = cases.filter(
    (c) =>
      (state.industry === "all" || c.industry === state.industry) &&
      (state.outcome === "all" || c.outcome === state.outcome) &&
      (state.service === "all" || c.service === state.service) &&
      (state.stack === "all" || c.stack === state.stack),
  );

  const anyActive = DIMS.some((d) => state[d.key] !== "all");
  const sig = `${state.industry}-${state.outcome}-${state.service}-${state.stack}`;
  const countLabel =
    shown.length === cases.length
      ? `Showing all ${cases.length} deployed cases`
      : `${shown.length} ${shown.length === 1 ? "case matches" : "cases match"} your filter`;

  return (
    <>
      {/* Filter band */}
      <div className="mt-9 flex flex-col gap-[18px]">
        {DIMS.map((dim) => (
          <div key={dim.key} role="group" aria-label={dim.aria} className="min-w-0">
            <p className="mb-2.5 font-mono text-[9.5px] uppercase tracking-[0.16em] text-faint">{dim.label}</p>
            <div className="flex gap-2 overflow-x-auto pb-1.5 md:flex-wrap md:overflow-visible md:pb-0">
              {dim.options.map(([val, label]) => {
                const on = state[dim.key] === val || (val === "all" && state[dim.key] === "all");
                return (
                  <button
                    key={val}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setFilter(dim.key, val)}
                    className="inline-flex min-h-[44px] flex-shrink-0 items-center justify-center whitespace-nowrap rounded-full px-[15px] font-mono text-[11px] uppercase tracking-[0.08em] transition-colors"
                    style={
                      on
                        ? { background: "var(--gradient)", color: "#fff", border: "1px solid transparent", boxShadow: "var(--shadow-glow)" }
                        : { background: "var(--surface)", color: "var(--text)", border: "1px solid var(--border-strong)" }
                    }
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Count + reset */}
      <div className="mt-[22px] flex flex-wrap items-center gap-3.5">
        <p aria-live="polite" className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">
          {countLabel}
        </p>
        {anyActive && (
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-[36px] items-center gap-1.5 rounded-full px-3.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink transition-colors hover:bg-[var(--surface-2)]"
            style={{ background: "none", border: "1px solid var(--border-strong)" }}
          >
            Reset filters
          </button>
        )}
      </div>

      {/* Grid */}
      <div
        key={sig}
        className="mt-9 grid items-start gap-[18px] md:grid-cols-2"
        style={{ animation: "nv-fade .25s ease both" }}
      >
        {shown.map((c) => (
          <CaseCard key={c.slug} study={c} />
        ))}

        {shown.length === 0 && (
          <div className="rounded-[18px] border border-line-strong bg-surface p-10 text-center md:col-span-2">
            <p className="mx-auto max-w-[520px] text-[16px] leading-relaxed text-body">
              No case matches this combination. Reset the filters, or book an audit and we&apos;ll show you the
              closest deployed pattern.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={reset}
                className="inline-flex min-h-[52px] items-center justify-center rounded-xl px-6 text-[15px] font-semibold text-ink"
                style={{ background: "none", border: "1px solid var(--border-strong)" }}
              >
                Reset filters
              </button>
              <Link href="/#audit" className="btn-primary" style={{ minHeight: 52 }}>
                Book an audit
                <Icon name="chevron" className="h-4 w-4" strokeWidth={2.2} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
