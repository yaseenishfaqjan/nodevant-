"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import {
  AVG_CLOSE_RATE_OF_RESPONDED,
  NODEVANT_STARTING_PRICE,
  formatPaybackDays,
} from "@/lib/loss-benchmarks";

// Assumptions (shown to the user — the site's honesty ethos beats a black box).
const WEEKS_PER_MONTH = 4.33;
const AUTOMATABLE_SHARE = 0.8; // share of repetitive hours an AI workforce reclaims
const FTE_HOURS_PER_MONTH = 173.3; // 40h/wk × 52 ÷ 12

const usd = (n: number) =>
  "$" + Math.round(n).toLocaleString("en-US");

type Field = {
  key: "missed" | "value" | "hours" | "rate";
  label: string;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
};

const FIELDS: Field[] = [
  { key: "missed", label: "Calls / leads you miss per week", min: 0, max: 100, step: 1 },
  { key: "value", label: "Average value of a customer", min: 50, max: 10000, step: 50, prefix: "$" },
  { key: "hours", label: "Hours/week your team spends on repetitive work", min: 0, max: 80, step: 1, suffix: " hrs" },
  { key: "rate", label: "Loaded hourly cost of that work", min: 15, max: 150, step: 1, prefix: "$" },
];

export default function RoiCalculator() {
  const [missed, setMissed] = useState(12);
  const [value, setValue] = useState(500);
  const [hours, setHours] = useState(20);
  const [rate, setRate] = useState(30);

  const state = { missed, value, hours, rate };
  const setters = {
    missed: setMissed,
    value: setValue,
    hours: setHours,
    rate: setRate,
  } as const;

  const r = useMemo(() => {
    // Revenue recovered when every lead is answered + followed up instantly.
    const recoveredRevenue =
      missed * WEEKS_PER_MONTH * AVG_CLOSE_RATE_OF_RESPONDED * value;
    // Repetitive hours an AI workforce takes off the team's plate.
    const hoursReclaimed = hours * WEEKS_PER_MONTH * AUTOMATABLE_SHARE;
    const laborValue = hoursReclaimed * rate;
    const monthlyValue = recoveredRevenue + laborValue;
    const fte = hoursReclaimed / FTE_HOURS_PER_MONTH;
    const annualValue = monthlyValue * 12;
    const paybackDays =
      monthlyValue > 0
        ? Math.ceil((NODEVANT_STARTING_PRICE / monthlyValue) * 30)
        : 0;
    return {
      recoveredRevenue,
      hoursReclaimed,
      monthlyValue,
      fte,
      annualValue,
      paybackDays,
    };
  }, [missed, value, hours, rate]);

  const payback = formatPaybackDays(r.paybackDays);

  return (
    <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
      {/* Inputs */}
      <div className="card p-6 md:p-7">
        <h2 className="font-display text-[20px] font-extrabold tracking-[-0.02em] text-ink">
          Your business, roughly
        </h2>
        <p className="mt-1.5 text-sm text-faint">
          Drag the sliders. Everything updates live — no email required.
        </p>
        <div className="mt-6 flex flex-col gap-6">
          {FIELDS.map((f) => {
            const v = state[f.key];
            return (
              <div key={f.key}>
                <div className="flex items-baseline justify-between gap-3">
                  <label htmlFor={`roi-${f.key}`} className="text-sm text-body">
                    {f.label}
                  </label>
                  <span className="font-mono text-[15px] font-semibold text-ink">
                    {f.prefix ?? ""}
                    {v.toLocaleString("en-US")}
                    {f.suffix ?? ""}
                  </span>
                </div>
                <input
                  id={`roi-${f.key}`}
                  type="range"
                  min={f.min}
                  max={f.max}
                  step={f.step}
                  value={v}
                  onChange={(e) => setters[f.key](Number(e.target.value))}
                  className="mt-3 w-full"
                  style={{ accentColor: "var(--accent-1)" }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Results */}
      <div
        className="relative overflow-hidden rounded-[20px] p-6 md:p-7"
        style={{ background: "var(--surface)", border: "1px solid var(--border-strong)" }}
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
          With an AI workforce, you could
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Metric label="Recover per month" value={usd(r.recoveredRevenue)} hero />
          <Metric label="Reclaim per month" value={`${Math.round(r.hoursReclaimed)} hrs`} />
          <Metric label="AI workers replaced" value={r.fte.toFixed(1)} sub="full-time equivalent" />
          <Metric label="Total value / year" value={usd(r.annualValue)} />
        </div>

        <div className="mt-6 rounded-2xl border border-line bg-bg p-5">
          <div className="flex items-center gap-3">
            <span className="chip flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center">
              <Icon name="refresh" className="h-[18px] w-[18px]" />
            </span>
            <p className="text-sm text-body">
              A Nodevant build starts at{" "}
              <span className="font-semibold text-ink">
                {usd(NODEVANT_STARTING_PRICE)}
              </span>
              . At your numbers it pays for itself in{" "}
              <span className="font-semibold text-ink">{payback.label}</span>.
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2.5">
          <Link href="/audit/" className="btn-primary" style={{ minHeight: 48 }}>
            Get my exact numbers — free audit
            <Icon name="chevron" className="h-4 w-4" strokeWidth={2.2} />
          </Link>
          <Link href="/pricing/" className="btn-secondary" style={{ minHeight: 48 }}>
            See pricing
          </Link>
        </div>

        <p className="mt-5 text-[11.5px] leading-relaxed text-faint">
          Estimates only. Recovered revenue assumes a{" "}
          {Math.round(AVG_CLOSE_RATE_OF_RESPONDED * 100)}% close rate on leads
          that get answered and followed up (published lead-response
          benchmarks), and that automation reclaims{" "}
          {Math.round(AUTOMATABLE_SHARE * 100)}% of the repetitive hours you
          entered. Your real numbers come from the free 90-second audit.
        </p>
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  sub,
  hero = false,
}: {
  label: string;
  value: string;
  sub?: string;
  hero?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-line bg-bg p-5">
      <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-faint">
        {label}
      </p>
      <p
        className={`mt-1.5 font-display font-extrabold tracking-[-0.03em] gradient-text ${
          hero ? "text-[clamp(1.9rem,4.4vw,2.6rem)]" : "text-[clamp(1.5rem,3.4vw,2rem)]"
        }`}
        style={{ transition: "opacity 120ms" }}
      >
        {value}
      </p>
      {sub && (
        <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-faint">
          {sub}
        </p>
      )}
    </div>
  );
}
