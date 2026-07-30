import Link from "next/link";
import Icon from "@/components/ui/Icon";

const STATS = [
  { v: "90 sec", l: "Audit" },
  { v: "24 hrs", l: "Response guarantee" },
  { v: "1–3 wks", l: "Typical delivery" },
  { v: "24/7", l: "System uptime" },
];

export default function FinalCTA() {
  return (
    <section
      id="cta"
      className="relative overflow-hidden px-5 py-[clamp(72px,8vw,120px)]"
      style={{
        background: "var(--surface)",
        borderTop: "2px solid transparent",
        backgroundImage:
          "linear-gradient(var(--surface),var(--surface)),var(--gradient)",
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box,border-box",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-overlay"
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%,#000 10%,transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%,#000 10%,transparent 100%)",
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan opacity-[0.07] blur-[120px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-[760px] text-center">
        <h2 className="font-display text-[clamp(1.6rem,3.6vw,2.875rem)] font-extrabold leading-[1.15] tracking-[-0.03em] text-ink text-balance">
          Ready to stop doing work{" "}
          <span className="gradient-text">AI can do for you?</span>
        </h2>
        <p className="mx-auto mt-4 max-w-[520px] text-base leading-relaxed text-faint">
          90-second audit. Zero obligation. We&apos;ll show you exactly which
          hours you get back.
        </p>
        <Link href="/audit/" className="btn-primary mt-7 inline-flex">
          Get My Free Audit
          <Icon name="chevron" className="h-4 w-4" strokeWidth={2.2} />
        </Link>
        <p className="mt-[18px] flex items-center justify-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">
          <Icon name="shield-check" className="h-[15px] w-[15px] text-cyan" strokeWidth={1.6} />
          No obligations · Just real insights
        </p>
        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl sm:grid-cols-4" style={{ background: "var(--border)", border: "1px solid var(--border)" }}>
          {STATS.map((s) => (
            <span key={s.l} className="block px-3 py-5" style={{ background: "var(--surface)" }}>
              <span className="gradient-text block font-display text-[22px] font-extrabold tracking-[-0.02em]">{s.v}</span>
              <span className="mt-1.5 block font-mono text-[9.5px] uppercase tracking-[0.14em] text-faint">{s.l}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
