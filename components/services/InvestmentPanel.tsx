import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { INCLUDED, MOVES_UP, type ServiceDetail } from "@/lib/services";

function Check({ label }: { label: string }) {
  return (
    <span className="flex items-start gap-2 text-[13.5px] text-body">
      <span className="chip mt-px h-5 w-5 flex-shrink-0">
        <Icon name="check" className="h-3 w-3" strokeWidth={2.4} />
      </span>
      {label}
    </span>
  );
}

function MovesUp() {
  return (
    <details className="mt-3 border-t border-line pt-3">
      <summary className="flex cursor-pointer items-center justify-between text-[13px] font-semibold text-cyan">
        What moves it up?
        <Icon name="chevron" data-chev className="h-3.5 w-3.5 transition-transform" strokeWidth={2} />
      </summary>
      <ul className="mt-2.5 flex flex-col gap-1.5">
        {MOVES_UP.map((m) => (
          <li key={m} className="flex items-start gap-2 text-[13px] text-faint">
            <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-cyan" aria-hidden="true" />
            {m}
          </li>
        ))}
      </ul>
    </details>
  );
}

/** Compact panel used inside each /services card. */
export function InvestmentCard({ service }: { service: ServiceDetail }) {
  return (
    <div className="rounded-2xl border border-line bg-elevated p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">Investment</p>
      <p className="gradient-text mt-1.5 font-display text-3xl font-extrabold tracking-[-0.03em]">
        {service.price}
      </p>
      <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.08em] text-faint">
        Fixed project pricing · No hourly billing
      </p>
      <div className="mt-4 flex flex-col gap-2 border-t border-line pt-4">
        {INCLUDED.map((line) => (
          <Check key={line} label={line} />
        ))}
      </div>
      <p className="mt-3.5 font-mono text-[9.5px] uppercase tracking-[0.06em] text-faint/80">
        {service.rangeLine}
      </p>
      <MovesUp />
      <Link
        href="/#audit"
        className="mt-4 inline-flex items-center gap-1.5 border-t border-line pt-4 text-[13px] font-semibold text-cyan hover:underline"
      >
        Full quote after your free 90-second audit →
      </Link>
    </div>
  );
}

/** Full-width breakdown used on each subpage. */
export function InvestmentFull({ service }: { service: ServiceDetail }) {
  return (
    <div className="grid gap-6 md:grid-cols-[1fr_1.1fr]">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">Investment</p>
        <p className="gradient-text mt-2 font-display text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.03em]">
          {service.price}
        </p>
        <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-faint">
          Fixed project pricing · No hourly billing
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[11px] text-body"
            style={{ background: "var(--tint)", border: "1px solid var(--chip-border)" }}
          >
            <Icon name="clock" className="h-3.5 w-3.5 text-cyan" /> Timeline: {service.timeline}
          </span>
        </div>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.06em] text-faint/80">
          {service.rangeLine}
        </p>
        <Link href="/#audit" className="btn-primary mt-6">
          Full quote after your free audit →
        </Link>
      </div>
      <div className="rounded-2xl border border-line bg-elevated p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-faint">What&apos;s included</p>
        <div className="mt-4 flex flex-col gap-3">
          {INCLUDED.map((line) => (
            <Check key={line} label={line} />
          ))}
        </div>
        <MovesUp />
      </div>
    </div>
  );
}
