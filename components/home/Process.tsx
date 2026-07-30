import Icon, { type IconName } from "@/components/ui/Icon";
import SectionHead from "@/components/ui/SectionHead";

const STEPS: { n: string; icon: IconName; title: string; desc: string }[] = [
  {
    n: "01",
    icon: "clock",
    title: "Free Audit (90 seconds)",
    desc: "Tell us your workflows. We map where hours leak and what AI recovers first.",
  },
  {
    n: "02",
    icon: "gear",
    title: "Build & Integrate (1–3 weeks)",
    desc: "We build on n8n, Make and OpenAI — wired into the tools you already run.",
  },
  {
    n: "03",
    icon: "shield-check",
    title: "Deploy & Monitor (ongoing)",
    desc: "Live systems with monitoring, iteration and support. It keeps working after launch.",
  },
];

export default function Process() {
  return (
    <section id="process" className="section-gap relative overflow-hidden border-t border-line px-5">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-36 -top-36 h-[420px] w-[420px] rounded-full opacity-[0.04]"
        style={{ border: "1px solid var(--accent-1)", boxShadow: "0 0 0 60px var(--accent-1) inset" }}
      />
      <div className="relative mx-auto max-w-[1280px]">
        <SectionHead
          eyebrow="Process"
          title={<>Deployed in <span className="gradient-text">weeks, not months.</span></>}
          subtitle="Three steps from first call to a system running in production."
        />
        <div className="relative mt-12 grid gap-[22px] md:grid-cols-3">
          <span
            aria-hidden="true"
            className="absolute left-[16%] right-[16%] top-[23px] hidden h-px opacity-40 md:block"
            style={{
              backgroundImage: "linear-gradient(90deg,var(--accent-1) 50%,transparent 0)",
              backgroundSize: "12px 1px",
              animation: "nv-line 1.4s linear infinite",
            }}
          />
          {STEPS.map((s) => (
            <div key={s.n} className="card relative p-[26px]">
              <span className="flex items-center gap-3">
                <span className="gradient-text font-mono text-[13px] font-semibold">{s.n}</span>
                <span className="chip h-10 w-10">
                  <Icon name={s.icon} className="h-5 w-5" />
                </span>
              </span>
              <h3 className="mt-4 font-display text-lg font-extrabold tracking-[-0.02em] text-ink">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-faint">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
