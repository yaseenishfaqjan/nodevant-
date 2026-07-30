"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/ui/Icon";
import OdometerNumber from "@/components/ui/OdometerNumber";
import {
  computeLeak,
  formatPaybackDays,
  RESPONSE_TIME_LABELS,
  LOSS_RATE_BY_RESPONSE,
  type ResponseTime,
} from "@/lib/loss-benchmarks";

/**
 * Cost-of-Doing-Nothing meter — /pricing section 1. Fully client-side (no backend):
 * an ambient "leads lost while you read" counter plus a personal leak calculator that
 * runs entirely in the browser. The "SIMULATED ON YOUR BROWSER" badge stays visible at
 * all times; the payback figure uses the shared 30-day floor.
 */

const fmt = (n: number) => Math.round(n).toLocaleString("en-US");

const RESPONSE_OPTIONS: { value: ResponseTime; label: string }[] = [
  { value: "under-5-min", label: "Under 5 minutes" },
  { value: "under-1-hour", label: "Under 1 hour" },
  { value: "under-4-hours", label: "Under 4 hours" },
  { value: "same-day", label: "Same day" },
  { value: "next-day", label: "Next day" },
];

const inputCls =
  "h-12 w-full rounded-[10px] border px-4 font-mono text-[15px] text-ink outline-none transition-colors focus:border-cyan";

function scrollToPackages(e: React.MouseEvent) {
  e.preventDefault();
  document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" });
}

export default function CostOfNothingMeter() {
  const [count, setCount] = useState(0);
  const [leads, setLeads] = useState("40");
  const [deal, setDeal] = useState("5000");
  const [resp, setResp] = useState<ResponseTime | "">("under-4-hours");

  // Ambient meter: +1 lead every 30s, per-visit and browser-local only.
  useEffect(() => {
    const iv = setInterval(() => setCount((c) => c + 1), 30000);
    return () => clearInterval(iv);
  }, []);

  const L = parseFloat(leads);
  const D = parseFloat(deal);
  const ok = L > 0 && D > 0 && !!resp;

  const result = ok
    ? computeLeak({ leadsPerWeek: L, dealValue: D, responseTime: resp as ResponseTime })
    : null;
  const payback = result ? formatPaybackDays(result.paybackDays) : null;
  const lossPct = resp ? Math.round((LOSS_RATE_BY_RESPONSE[resp as ResponseTime] ?? 0) * 100) : 0;

  return (
    <section
      aria-label="The cost of doing nothing"
      className="grid-overlay relative overflow-hidden px-5 py-20 md:py-[88px]"
    >
      <div className="pointer-events-none absolute -top-36 left-1/2 h-[380px] w-[560px] -translate-x-[70%] rounded-full bg-cyan opacity-[0.06] blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-20 -top-32 h-[360px] w-[480px] rounded-full bg-violet opacity-[0.06] blur-[120px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1100px]">
        {/* Ambient counter */}
        <div className="text-center">
          <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-faint">
            While you read this page
          </span>
          <div aria-hidden="true" className="mx-auto my-3 h-0.5 w-6 rounded-full" style={{ background: "var(--gradient)" }} />
          <div className="flex flex-wrap items-baseline justify-center gap-x-[18px] gap-y-2.5" aria-live="polite">
            <span className="font-mono text-[clamp(2.75rem,6vw,4.5rem)] font-medium leading-none tracking-[-0.02em]">
              <OdometerNumber value={count} />
            </span>
            <span className="font-display text-[clamp(1.6rem,3.4vw,2.75rem)] font-extrabold leading-tight tracking-[-0.03em] text-ink">
              {count === 1 ? "lead has been lost" : "leads have been lost"}
            </span>
            <span
              className="inline-flex items-center gap-[7px] whitespace-nowrap rounded-full px-[11px] py-[5px] font-mono text-[10.5px] font-medium uppercase tracking-[0.12em] text-faint"
              style={{ background: "var(--surface-2)", border: "1px solid var(--border-strong)" }}
            >
              <span className="h-[7px] w-[7px] flex-none rounded-full" style={{ background: "var(--muted)" }} aria-hidden="true" />
              Simulated on your browser
            </span>
          </div>
          <p className="mx-auto mt-[22px] max-w-[620px] font-mono text-[11.5px] leading-[1.8] tracking-[0.04em] text-faint">
            Every 30 seconds this page loads, the average B2B business loses 1 qualified lead to slow response (industry data: 42-hour avg reply, 78% loss after 30 min).
          </p>
        </div>

        {/* Calculator */}
        <div className="card mt-14 overflow-hidden shadow-card">
          <div className="grid md:grid-cols-2">
            {/* Inputs */}
            <div className="flex flex-col gap-[22px] border-line p-8 md:border-r">
              <div>
                <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-faint">Now calculate yours</span>
                <div aria-hidden="true" className="my-3 h-0.5 w-6 rounded-full" style={{ background: "var(--gradient)" }} />
                <h3 className="font-display text-[clamp(1.25rem,2.2vw,1.75rem)] font-extrabold tracking-[-0.02em] text-ink">
                  How much are YOU <span className="gradient-text">losing?</span>
                </h3>
              </div>

              <label className="flex flex-col gap-2">
                <span className="flex items-center gap-2.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-body">
                  <span className="chip h-[26px] w-[26px]"><Icon name="users" className="h-3.5 w-3.5" /></span>
                  Leads per week
                </span>
                <input type="number" min={0} inputMode="numeric" value={leads} onChange={(e) => setLeads(e.target.value)} placeholder="40" className={inputCls} style={{ background: "var(--surface-2)", borderColor: "var(--border-strong)" }} />
              </label>

              <label className="flex flex-col gap-2">
                <span className="flex items-center gap-2.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-body">
                  <span className="chip h-[26px] w-[26px]"><Icon name="coin" className="h-3.5 w-3.5" /></span>
                  Average deal value
                </span>
                <div className="relative">
                  <span aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-mono text-[15px] text-faint">$</span>
                  <input type="number" min={0} inputMode="numeric" value={deal} onChange={(e) => setDeal(e.target.value)} placeholder="5,000" className={inputCls + " pl-8"} style={{ background: "var(--surface-2)", borderColor: "var(--border-strong)" }} />
                </div>
              </label>

              <label className="flex flex-col gap-2">
                <span className="flex items-center gap-2.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-body">
                  <span className="chip h-[26px] w-[26px]"><Icon name="clock" className="h-3.5 w-3.5" /></span>
                  Current response time
                </span>
                <select value={resp} onChange={(e) => setResp(e.target.value as ResponseTime)} className={inputCls + " cursor-pointer appearance-none"} style={{ background: "var(--surface-2)", borderColor: "var(--border-strong)" }}>
                  <option value="" disabled>Select response time</option>
                  {RESPONSE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </label>

              <p className="font-mono text-[10.5px] font-medium uppercase leading-[1.8] tracking-[0.1em] text-faint">
                Uses real industry benchmarks. No email required. Your inputs don&apos;t leave your browser.
              </p>
            </div>

            {/* Result */}
            <div className="flex flex-col justify-center gap-[18px] p-8" style={{ background: "var(--surface-2)" }} aria-live="polite">
              {ok && result ? (
                <>
                  <div>
                    <div className="min-h-[1em] font-mono text-[clamp(2.5rem,5vw,4rem)] font-medium leading-none tracking-[-0.02em]">
                      <OdometerNumber value={"$" + fmt(result.revenueLeakPerMonth)} />
                    </div>
                    <div className="mt-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-body">Lost per month to slow response</div>
                    <p className="mt-3.5 text-[13.5px] font-medium leading-relaxed text-faint">
                      You said: {fmt(L)} leads/week at ${fmt(D)} avg with {RESPONSE_TIME_LABELS[resp as ResponseTime]} response time. Industry data: at that response time, ~{lossPct}% of leads are lost to whoever answered faster.
                    </p>
                  </div>
                  <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(140px,1fr))]">
                    {[
                      { label: "Leads lost/week", value: fmt(result.leadsLostPerWeek) },
                      { label: "Revenue leaked/month", value: "$" + fmt(result.revenueLeakPerMonth) },
                      { label: "Nodevant system pays back in", value: payback!.label },
                    ].map((t) => (
                      <div key={t.label} className="card flex flex-col gap-2 p-3.5">
                        <span className="font-mono text-[9.5px] font-medium uppercase leading-relaxed tracking-[0.12em] text-faint">{t.label}</span>
                        <span className="gradient-text font-mono text-[22px] font-medium">{t.value}</span>
                      </div>
                    ))}
                  </div>
                  <a href="#packages" onClick={scrollToPackages} className="btn-primary self-start">
                    Fix this — see the packages <span aria-hidden="true">↓</span>
                  </a>
                  {payback!.floored && (
                    <p className="font-mono text-[10px] font-medium uppercase leading-[1.7] tracking-[0.1em] text-faint">
                      *Assumes your stated lead volume and deal value hold for the first 30 days. The audit pressure-tests this before we quote.
                    </p>
                  )}
                </>
              ) : (
                <div className="flex flex-col gap-3.5">
                  <div aria-hidden="true" className="font-mono text-[clamp(2.5rem,5vw,4rem)] font-medium leading-none text-faint">$ —</div>
                  <div className="font-mono text-[10.5px] font-medium uppercase leading-[1.8] tracking-[0.14em] text-faint">
                    {L > 0 ? "Add deal value + response time to see your leak" : "Enter your numbers — the math runs in your browser"}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <p className="mx-auto mt-7 max-w-[860px] text-center font-mono text-[10.5px] font-medium uppercase leading-[1.9] tracking-[0.08em] text-faint">
          Methodology: response-time impact modeled from published B2B benchmark data (Harvard Business Review, lead-response studies), adjusted for deal value and lead volume. Your actual results depend on your funnel — the audit calibrates this.
        </p>
      </div>
    </section>
  );
}
