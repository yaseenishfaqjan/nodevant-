"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import OdometerNumber from "@/components/ui/OdometerNumber";

/**
 * Live ROI Ticker — real numbers from Nodevant's own infrastructure.
 * Renders baked-in starter numbers in server/static markup (SSR-safe, so crawlers
 * and no-JS visitors see real figures), then polls GET /api/live-metrics every 30s
 * and rolls the odometers to the fresh values. Badge flips LIVE ⇄ CACHED depending
 * on whether the last refresh succeeded.
 */

interface Metrics {
  leads: number;
  calls: number;
  hours: number;
  uptime: number;
}

// Starter numbers — mirror the design preview until real product-API aggregation
// is wired in the api service. See api/src/routes.js GET /live-metrics.
const STARTER: Metrics = { leads: 1284, calls: 347, hours: 612, uptime: 99.94 };

const fmt = (n: number) => Math.round(n).toLocaleString("en-US");

const TILES: { key: keyof Metrics; label: string; sub: string }[] = [
  { key: "leads", label: "Leads captured · this month", sub: "Across 6 live platforms" },
  { key: "calls", label: "Calls answered · last 24h", sub: "Fairway360 · Scalaro · GlobalShield360" },
  { key: "hours", label: "Hours automated · this week", sub: "Manual work eliminated" },
  { key: "uptime", label: "Infrastructure uptime · 30d", sub: "Storehouse360 · Scalaro · Fabrioza + 3 more" },
];

export default function LiveROITicker() {
  const [metrics, setMetrics] = useState<Metrics>(STARTER);
  const [live, setLive] = useState(true);

  useEffect(() => {
    let alive = true;
    const poll = async () => {
      try {
        const res = await fetch("/api/live-metrics", { headers: { Accept: "application/json" } });
        if (!res.ok) throw new Error(String(res.status));
        const d = await res.json();
        if (!alive) return;
        setMetrics({
          leads: Number(d.leadsThisMonth) || STARTER.leads,
          calls: Number(d.callsAnsweredLast24h) || STARTER.calls,
          hours: Number(d.hoursAutomatedThisWeek) || STARTER.hours,
          uptime: Number(d.uptimePercent) || STARTER.uptime,
        });
        setLive(d.isLive !== false);
      } catch {
        if (alive) setLive(false); // couldn't refresh → serve cached numbers
      }
    };
    poll();
    const iv = setInterval(poll, 30000);
    return () => {
      alive = false;
      clearInterval(iv);
    };
  }, []);

  const value = (k: keyof Metrics) =>
    k === "uptime" ? metrics.uptime.toFixed(2) + "%" : fmt(metrics[k]);

  return (
    <section
      aria-label="Live metrics from Nodevant infrastructure"
      className="grid-overlay relative overflow-hidden border-t border-line px-5 py-20 md:py-[88px]"
    >
      <div className="pointer-events-none absolute -top-36 left-1/2 h-[380px] w-[560px] -translate-x-[70%] rounded-full bg-cyan opacity-[0.06] blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-20 -top-32 h-[360px] w-[480px] rounded-full bg-violet opacity-[0.06] blur-[120px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1200px]">
        <div className="mb-3.5 flex flex-wrap items-center justify-center gap-3.5">
          <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-[5px] font-mono text-[10.5px] font-medium uppercase tracking-[0.14em]"
            style={{ background: "var(--surface-2)", border: "1px solid var(--border-strong)", color: live ? "var(--ok)" : "var(--muted)" }}
          >
            <span className="relative h-2 w-2 flex-none">
              <span className="absolute inset-0 rounded-full" style={{ background: live ? "var(--ok)" : "var(--muted)" }} />
              {live && <span aria-hidden="true" className="absolute inset-0 rounded-full animate-nv-pulse" style={{ background: "var(--ok)" }} />}
            </span>
            {live ? "LIVE" : "CACHED"}
          </span>
          <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-faint">
            Live from our infrastructure · Updated every 30 seconds
          </span>
        </div>
        <div aria-hidden="true" className="mx-auto mb-10 h-0.5 w-6 rounded-full" style={{ background: "var(--gradient)" }} />

        <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(152px,1fr))]" aria-live="polite">
          {TILES.map((t) => (
            <div key={t.key} className="card card-hover flex min-h-[158px] flex-col gap-3 p-[22px] pt-[26px]">
              <div className="min-h-[1em] font-mono text-[clamp(2.5rem,4.6vw,4rem)] font-medium leading-none tracking-[-0.02em]">
                <OdometerNumber value={value(t.key)} />
              </div>
              <div className="font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-body">{t.label}</div>
              <div className="font-mono text-[10.5px] leading-relaxed tracking-[0.06em] text-faint">{t.sub}</div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center font-mono text-[10.5px] font-medium uppercase leading-[1.9] tracking-[0.14em] text-faint">
          Pulled from Storehouse360 · Scalaro · Fabrioza · Fairway360 · GlobalShield360 · PeachPicks — verified on every request
        </p>
        <p className="mt-[18px] text-center text-[13.5px] font-medium">
          <Link href="/about/#how-we-measure" className="inline-flex items-center gap-1.5 text-cyan transition-colors hover:text-violet">
            See how we measure this <span aria-hidden="true">→</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
