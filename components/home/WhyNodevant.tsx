import Icon from "@/components/ui/Icon";
import SectionHead from "@/components/ui/SectionHead";

const TYPICAL = [
  "3–6 month timelines",
  "Jargon decks, no deployment",
  "Custom quotes only, priced against your budget",
  "Disappears after launch",
  "Generalist: web + SEO + everything",
];

const NODEVANT = [
  "Deployed in weeks",
  "Working systems, not slideware",
  "Fixed project pricing, published up front",
  "Monitored after launch",
  "AI automation specialists only",
];

export default function WhyNodevant() {
  return (
    <section id="why" className="section-gap border-t border-line px-5">
      <div className="mx-auto max-w-[1080px]">
        <SectionHead
          eyebrow="Why Nodevant"
          title={<>Not a <span className="gradient-text">typical agency.</span></>}
          subtitle="Same spend, different outcome. Here is the difference in five lines."
        />
        <div className="mt-11 grid gap-[18px] md:grid-cols-2">
          {/* Typical */}
          <div className="rounded-2xl border border-line p-[26px]" style={{ background: "var(--surface-2)" }}>
            <p className="mb-[18px] font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
              Typical agency
            </p>
            <div className="flex flex-col">
              {TYPICAL.map((t) => (
                <span key={t} className="flex items-center gap-3 border-t border-line py-[13px] text-[15px] text-faint">
                  <Icon name="x" className="h-[18px] w-[18px] flex-shrink-0 opacity-70" strokeWidth={1.8} />
                  {t}
                </span>
              ))}
            </div>
          </div>
          {/* Nodevant */}
          <div
            className="rounded-2xl p-[26px] shadow-glow"
            style={{
              border: "1px solid transparent",
              backgroundImage: "linear-gradient(var(--surface),var(--surface)),var(--gradient)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box,border-box",
            }}
          >
            <p className="gradient-text mb-[18px] font-mono text-[11px] uppercase tracking-[0.16em]">
              Nodevant
            </p>
            <div className="flex flex-col">
              {NODEVANT.map((t) => (
                <span key={t} className="flex items-center gap-3 border-t border-line py-[13px] text-[15px] font-semibold text-ink">
                  <Icon name="check" className="h-[18px] w-[18px] flex-shrink-0 text-cyan" strokeWidth={2} />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
