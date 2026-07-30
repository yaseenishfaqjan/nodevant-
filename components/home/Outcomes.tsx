import SectionHead from "@/components/ui/SectionHead";

const RINGS: { pct: number; value: string; title: string; desc: string; small?: boolean }[] = [
  { pct: 70, value: "70%", title: "Time returned weekly", desc: "Hours per week handed back to the people doing the work." },
  { pct: 50, value: "50%", title: "Support cost reduction", desc: "Tier-one tickets resolved without a human touching them." },
  { pct: 85, value: "5×", title: "Team output per head", desc: "Same headcount, five times the throughput on routed work." },
  { pct: 95, value: "<60s", title: "Lead response time", desc: "First reply to every inbound, day or night, anywhere.", small: true },
];

export default function Outcomes() {
  return (
    <section id="outcomes" className="section-gap border-t border-line px-5">
      <div className="mx-auto max-w-[1280px]">
        <SectionHead
          eyebrow="Outcomes"
          title={<>Results you can <span className="gradient-text">measure.</span></>}
          subtitle="Averages across deployed systems, measured 60 days after launch."
        />
        <div className="mt-11 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
          {RINGS.map((r) => (
            <div key={r.title} className="card p-[26px]">
              <span
                className="relative flex h-16 w-16 items-center justify-center rounded-full"
                style={{ background: `conic-gradient(var(--accent-1) ${r.pct}%, var(--tint) 0)` }}
              >
                <span
                  className={`flex h-[50px] w-[50px] items-center justify-center rounded-full bg-card font-mono font-semibold text-ink ${r.small ? "text-[11px]" : "text-[12.5px]"}`}
                >
                  {r.value}
                </span>
              </span>
              <h3 className="mt-[18px] font-display text-[17px] font-extrabold tracking-[-0.02em] text-ink">
                {r.title}
              </h3>
              <p className="mt-[7px] text-[13.5px] leading-relaxed text-faint">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
