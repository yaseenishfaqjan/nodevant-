import Link from "next/link";
import Icon from "@/components/ui/Icon";

const TIERS = [
  { label: "AI Employee", value: "$997/mo" },
  { label: "Revenue Team", value: "$1,997/mo" },
  { label: "AI Workforce", value: "$3,497/mo" },
];

export default function Workforce() {
  return (
    <section
      id="workforce"
      className="px-5 py-16 md:py-20"
      style={{
        background: "var(--surface)",
        borderTop: "1px solid transparent",
        backgroundImage:
          "linear-gradient(var(--surface),var(--surface)),var(--gradient)",
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box,border-box",
      }}
    >
      <div className="mx-auto grid max-w-[1280px] items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div className="min-w-0">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
            AI Workforce
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold leading-tight tracking-[-0.03em] text-ink">
            Stop hiring for work <span className="gradient-text">AI can do.</span>
          </h2>
          <p className="mt-3.5 max-w-md text-[15px] leading-relaxed text-faint">
            Hire AI employees instead — deployed, monitored, and optimized by
            Nodevant.
          </p>
        </div>

        <div className="min-w-0">
          <div className="grid grid-cols-3 gap-3">
            {TIERS.map((t) => (
              <span key={t.label} className="card flex flex-col gap-1.5 p-4">
                <span className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-faint">
                  {t.label}
                </span>
                <span className="gradient-text font-display text-lg font-extrabold tracking-[-0.02em]">
                  {t.value}
                </span>
              </span>
            ))}
          </div>
          <Link
            href="/pricing/"
            className="mt-4 inline-flex min-h-[46px] items-center gap-1.5 rounded-[11px] px-5 text-sm font-semibold text-ink transition-colors hover:bg-[var(--surface-2)]"
            style={{ border: "1px solid var(--border-strong)" }}
          >
            See full pricing
            <Icon name="chevron" className="h-3.5 w-3.5" strokeWidth={2.2} />
          </Link>
        </div>
      </div>
    </section>
  );
}
