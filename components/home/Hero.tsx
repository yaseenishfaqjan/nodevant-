"use client";
import Link from "next/link";
import Icon, { type IconName } from "@/components/ui/Icon";
import CoreDiagram, { type CoreNode } from "@/components/ui/CoreDiagram";

const FEATURES: { icon: IconName; label: string }[] = [
  { icon: "bolt", label: "Leads followed up in seconds" },
  { icon: "puzzle", label: "Tools synced automatically" },
  { icon: "phone", label: "Support handled 24/7" },
];

const STATS = [
  { value: "6+", label: "Platforms Live" },
  { value: "Any", label: "Industry, Worldwide" },
  { value: "24/7", label: "Global Coverage" },
  { value: "Free", label: "90-Second Audit" },
];

// The six channels that converge on the core.
const NODES: CoreNode[] = [
  { icon: "mail", label: "Email", statusLabel: "SYNCED", x: "17%", y: "21%" },
  { icon: "calendar", label: "Calendar", statusLabel: "ACTIVE", x: "50%", y: "19%" },
  { icon: "target", label: "CRM", statusLabel: "SYNCED", x: "83%", y: "21%" },
  { icon: "phone", label: "Voice", statusLabel: "24/7", x: "17%", y: "79%" },
  { icon: "chat", label: "Chat", statusLabel: "ACTIVE", x: "50%", y: "81%" },
  { icon: "chart", label: "Data", statusLabel: "LIVE", x: "83%", y: "79%" },
];

const FLOWS = [
  { d: "M0,52 C 420,60 720,110 996,396", dur: "9s", delay: "0s" },
  { d: "M0,832 C 356,802 700,656 998,456", dur: "12.5s", delay: "-1.7s" },
  { d: "M300,0 C 470,60 700,120 1002,404", dur: "7.5s", delay: "-3.4s" },
  { d: "M764,0 C 852,124 932,262 1006,398", dur: "10.5s", delay: "-5.1s" },
  { d: "M700,900 C 832,802 940,602 1008,462", dur: "13.5s", delay: "-6.8s" },
  { d: "M1440,764 C 1246,664 1082,542 1016,470", dur: "8.5s", delay: "-8.5s" },
];

export default function Hero() {
  return (
    <section className="grid-overlay relative overflow-hidden px-5 pb-16 pt-28 md:pt-[112px]">
      {/* Masked grid + glow orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-overlay"
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 65% at 50% 28%,#000 25%,transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 90% 65% at 50% 28%,#000 25%,transparent 100%)",
        }}
      />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[720px] -translate-x-[60%] rounded-full bg-cyan opacity-[0.035] blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-40 -top-36 h-[520px] w-[640px] rounded-full bg-violet opacity-[0.035] blur-[120px]" aria-hidden="true" />

      {/* Desktop flow lines converging on the diagram */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full lg:block"
      >
        <defs>
          <linearGradient id="nv-flow-fade" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1080" y2="0">
            <stop offset="0" stopColor="var(--accent-1)" stopOpacity=".06" />
            <stop offset="0.55" stopColor="var(--accent-1)" stopOpacity=".09" />
            <stop offset="0.78" stopColor="var(--accent-2)" stopOpacity=".18" />
            <stop offset="1" stopColor="var(--accent-2)" stopOpacity="0" />
          </linearGradient>
          <clipPath id="nv-flow-clip">
            <rect x="770" y="0" width="670" height="900" />
          </clipPath>
        </defs>
        {FLOWS.map((f) => (
          <path key={f.d} d={f.d} fill="none" stroke="url(#nv-flow-fade)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        ))}
        <g clipPath="url(#nv-flow-clip)">
          {FLOWS.map((f) => (
            <path
              key={f.d}
              data-pulse
              d={f.d}
              fill="none"
              stroke="var(--accent-1)"
              strokeWidth="3"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              strokeDasharray="11 1160"
              style={{
                animation: `nv-flow ${f.dur} linear infinite ${f.delay}`,
                filter: "drop-shadow(0 0 5px var(--accent-1))",
                opacity: 0.42,
              }}
            />
          ))}
        </g>
      </svg>

      <div className="relative z-10 mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        {/* Left column */}
        <div className="min-w-0">
          <span className="badge badge-accent">
            <span className="h-1.5 w-1.5 animate-nv-pulse rounded-full bg-cyan" aria-hidden="true" />
            AI Automation Agency · Serving Clients Worldwide
          </span>

          <h1 className="mt-[22px] font-display text-[clamp(2.1rem,5.4vw,4.25rem)] font-extrabold leading-[1.06] tracking-[-0.04em] text-ink text-balance">
            Stop Doing Work{" "}
            <span className="gradient-text">AI Can Do For You</span>
          </h1>

          <p className="mt-[22px] max-w-[520px] text-[clamp(0.95rem,1.3vw,1.125rem)] leading-relaxed text-body text-pretty">
            Your team wastes hours on work AI handles in seconds. We build fully
            deployed automation systems for businesses worldwide — in weeks, not
            months.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/audit/" className="btn-primary w-full sm:w-auto">
              Get My Free Audit
              <Icon name="chevron" className="h-[15px] w-[15px]" strokeWidth={2.2} />
            </Link>
            <Link href="/reverse-audit/" className="btn-secondary w-full sm:w-auto">
              Try the Reverse Audit
              <Icon name="chevron" className="h-[15px] w-[15px]" strokeWidth={2.2} />
            </Link>
            <Link href="/case-studies/" className="btn-secondary w-full sm:w-auto">
              See Our Work
            </Link>
          </div>

          <div className="mt-[30px] flex max-w-[520px] flex-col gap-3">
            {FEATURES.map((f) => (
              <span key={f.label} className="flex items-center gap-3">
                <span className="chip h-10 w-10" style={{ boxShadow: "inset 0 0 12px var(--glow)" }}>
                  <Icon name={f.icon} className="h-5 w-5" />
                </span>
                <span className="text-[15px] font-semibold text-ink">{f.label}</span>
              </span>
            ))}
          </div>

          <div className="mt-9 grid max-w-[620px] grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-[26px] sm:grid-cols-4">
            {STATS.map((s) => (
              <span key={s.label} className="block">
                <span className="gradient-text block font-display text-3xl font-extrabold tracking-[-0.03em]">
                  {s.value}
                </span>
                <span className="mt-1.5 block font-mono text-[10.5px] uppercase tracking-[0.1em] text-faint">
                  {s.label}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Right column — Nodevant Core diagram */}
        <div className="min-w-0 animate-nv-float">
          <CoreDiagram
            variant="live"
            nodes={NODES}
            centerIcon="bolt"
            cornerLabel="Nodevant Core"
            bottomStatus="6 channels connected · uptime 99.9%"
            alt="Nodevant Core: six channels — email, calendar, CRM, voice, chat and data — converging on a central automation core"
          />
        </div>
      </div>
    </section>
  );
}
