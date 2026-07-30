import Link from "next/link";
import Icon, { type IconName } from "@/components/ui/Icon";
import SectionHead from "@/components/ui/SectionHead";
import BrandLogo from "@/components/ui/BrandLogo";

type Product = {
  initial: string;
  logoSlug: string;
  name: string;
  tag: string;
  url: string;
  desc: string;
  metric: string;
  solutionSlug?: string;
  caseSlug?: string;
};

const PRODUCTS: Product[] = [
  { initial: "S", logoSlug: "storehouse360", name: "Storehouse360", tag: "Fintech · Financial Hub", url: "https://storehouse360.com", desc: "An all-in-one financial hub — 3-bureau credit intelligence and monitoring, spending insights across credit and debit cards, AI-matched funding up to $400K, and real-estate opportunity discovery.", metric: "Credit, cards, funding & real estate — one hub", solutionSlug: "storehouse360", caseSlug: "storehouse360" },
  { initial: "S", logoSlug: "scalaro", name: "Scalaro", tag: "Agentic AI · SaaS Platform", url: "https://scalaro.io", desc: "Agentic AI sales platform — 20+ autonomous agents that find leads, run outreach, make voice calls and book meetings. Live in 14 days.", metric: "20+ agents · 7 channels", solutionSlug: "scalaro", caseSlug: "scalaro" },
  { initial: "F", logoSlug: "fairway360", name: "Fairway360", tag: "Hospitality · Golf & Clubs", url: "https://fairway360.io", desc: "AI operating system for golf courses and country clubs — every lead captured, every call answered, every follow-up automated, 24/7.", metric: "Powered by Scalaro", solutionSlug: "scalaro", caseSlug: "fairway360" },
  { initial: "G", logoSlug: "globalshield360", name: "GlobalShield360", tag: "Field Services · Roofing", url: "https://globalshield360.io", desc: "AI roofing command center — storm leads, AI roof scans, instant estimates, crew dispatch, insurance claims and invoicing in one platform.", metric: "Lead → invoice, one system", solutionSlug: "bmaikr", caseSlug: "bmaikr" },
  { initial: "P", logoSlug: "peachpicks", name: "PeachPicks", tag: "Consumer · Sports & Rewards", url: "https://peachpicks.app", desc: "Free-to-play sports prediction platform — picks, points, statewide leaderboards, and a sponsor marketplace connecting local businesses to fans.", metric: "Players + sponsor ecosystem", caseSlug: "peachpicks" },
  { initial: "F", logoSlug: "fabrioza", name: "Fabrioza", tag: "Manufacturing · Apparel", url: "https://fabrioza.com", desc: "B2B custom clothing manufacturer platform — quote-to-production pipeline for sportswear, team uniforms and private label, from 50-piece MOQ.", metric: "Quote in 24 hours", solutionSlug: "fabrioza", caseSlug: "fabrioza" },
];

const FLOW: { icon: IconName; label: string; x: string; y: string }[] = [
  { icon: "funnel", label: "STORM LEAD", x: "20%", y: "24%" },
  { icon: "doc", label: "AI ESTIMATE", x: "80%", y: "24%" },
  { icon: "truck", label: "DISPATCH", x: "20%", y: "76%" },
  { icon: "check", label: "INVOICE", x: "80%", y: "76%" },
];

function ProductCard({ p }: { p: Product }) {
  return (
    <div className="card card-hover p-[26px]">
      <span className="flex items-center gap-3.5">
        <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl p-2 text-xl font-extrabold" style={{ background: "var(--surface-2)", border: "1px solid var(--chip-border)" }}>
          <BrandLogo slug={p.logoSlug} name={p.name} fallback={p.initial} className="max-h-full max-w-full object-contain" />
        </span>
        <span className="flex min-w-0 flex-col gap-1.5">
          <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-[7px] font-display text-[19px] font-extrabold tracking-[-0.02em] text-ink transition-colors hover:text-cyan">
            {p.name}
            <Icon name="external" className="h-[15px] w-[15px] opacity-55" strokeWidth={1.8} />
          </a>
          <span className="w-fit rounded-full px-[9px] py-1 font-mono text-[9.5px] uppercase tracking-[0.12em] text-faint" style={{ border: "1px solid var(--border-strong)" }}>
            {p.tag}
          </span>
        </span>
      </span>
      <p className="mb-3.5 mt-4 text-sm leading-relaxed text-faint">{p.desc}</p>
      <span className="mb-5 inline-flex items-center gap-[7px] rounded-full px-[11px] py-1.5 font-mono text-[9.5px] uppercase tracking-[0.1em] text-ink" style={{ background: "var(--tint)", border: "1px solid var(--chip-border)" }}>
        <span className="h-[5px] w-[5px] rounded-full" style={{ background: "var(--ok)" }} aria-hidden="true" />
        {p.metric}
      </span>
      <span className="flex flex-wrap items-center gap-3">
        <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center gap-[7px] rounded-[10px] px-4 text-[13.5px] font-semibold text-ink transition-colors hover:bg-[var(--surface-2)]" style={{ border: "1px solid var(--border-strong)" }}>
          Visit live site
          <Icon name="external" className="h-[15px] w-[15px]" strokeWidth={1.8} />
        </a>
        {p.solutionSlug && (
          <Link href={`/solutions/${p.solutionSlug}/`} className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-cyan">
            See the stack
            <Icon name="chevron" className="h-3.5 w-3.5" strokeWidth={2.2} />
          </Link>
        )}
        {p.caseSlug && (
          <Link href={`/case-studies/${p.caseSlug}/`} className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-cyan">
            Read the case study
            <Icon name="chevron" className="h-3.5 w-3.5" strokeWidth={2.2} />
          </Link>
        )}
      </span>
    </div>
  );
}

export default function Work() {
  return (
    <section id="work" className="section-gap border-t border-line px-5">
      <div className="mx-auto max-w-[1280px]">
        <SectionHead
          eyebrow="Deployed Work"
          title={<>Real systems. <span className="gradient-text">Live right now.</span></>}
          subtitle="Built by the team behind real, deployed AI systems across fintech, manufacturing, SaaS, hospitality and field services."
        />
        <p className="mt-3 font-mono text-[9.5px] uppercase tracking-[0.13em] text-faint">
          Six platforms live · Fairway360 runs on Scalaro — we build systems that power other systems
        </p>

        <div className="mt-11 grid gap-[18px] md:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.name} p={p} />
          ))}
        </div>

        {/* Featured case study */}
        <div className="mt-[18px] grid items-center gap-9 rounded-[20px] p-7 md:grid-cols-2 md:p-11" style={{ background: "var(--surface)", border: "1px solid var(--border-strong)" }}>
          <div className="min-w-0">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">
              Field Services · GlobalShield360
            </p>
            <h3 className="mt-3.5 font-display text-[clamp(1.3rem,2.2vw,1.75rem)] font-extrabold leading-tight tracking-[-0.03em] text-ink">
              How a roofing operation went from storm lead to{" "}
              <span className="gradient-text">signed invoice in one system.</span>
            </h3>
            <p className="mt-4 text-[14.5px] leading-relaxed text-faint">
              <span className="font-semibold text-ink">Challenge.</span> Roofing contractors lose jobs to whoever quotes first — storm leads scattered across channels, manual measuring, and estimates that took days.
            </p>
            <p className="mt-2.5 text-[14.5px] leading-relaxed text-faint">
              <span className="font-semibold text-ink">Solution.</span> We built an AI command center: storm-lead capture, AI roof scans, instant estimates, automated follow-up, crew dispatch, insurance-claim tracking and invoicing — one platform, end to end.
            </p>
            <div className="my-6 grid grid-cols-3 gap-[18px] border-t border-line pt-5">
              {[
                { v: "Days → Hours", l: "Estimate to close" },
                { v: "100%", l: "Leads captured & chased" },
                { v: "1", l: "Platform, lead to invoice" },
              ].map((s) => (
                <span key={s.l} className="block">
                  <span className="gradient-text block font-display text-xl font-extrabold tracking-[-0.02em]">{s.v}</span>
                  <span className="mt-1.5 block font-mono text-[9.5px] uppercase tracking-[0.12em] text-faint">{s.l}</span>
                </span>
              ))}
            </div>
            <span className="flex flex-wrap items-center gap-3">
              <Link href="/audit/" className="btn-primary" style={{ minHeight: 50 }}>
                Start a similar project
                <Icon name="chevron" className="h-[15px] w-[15px]" strokeWidth={2.2} />
              </Link>
              <a href="https://globalshield360.io" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ minHeight: 50 }}>
                Visit live site
                <Icon name="external" className="h-[15px] w-[15px]" strokeWidth={1.8} />
              </a>
            </span>
          </div>

          <div className="relative aspect-[5/4] min-h-[250px] min-w-0 overflow-hidden rounded-2xl" style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
            <svg aria-hidden="true" viewBox="0 0 400 320" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
              <g stroke="var(--accent-1)" strokeOpacity="0.4" strokeWidth="1.2" strokeDasharray="5 5" fill="none" vectorEffect="non-scaling-stroke">
                {["M78 78 L200 160", "M322 78 L200 160", "M78 242 L200 160", "M322 242 L200 160"].map((d, i) => (
                  <path key={d} d={d} style={{ animation: `nv-dash 1.6s linear infinite ${i * 0.3}s` }} />
                ))}
              </g>
            </svg>
            {FLOW.map((f) => (
              <span key={f.label} className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-[7px] rounded-[10px] px-[11px] py-2" style={{ left: f.x, top: f.y, background: "var(--surface)", border: "1px solid var(--border-strong)" }}>
                <Icon name={f.icon} className="h-[15px] w-[15px] text-cyan" />
                <span className="font-mono text-[9.5px] text-ink">{f.label}</span>
              </span>
            ))}
            <span className="absolute left-1/2 top-1/2 h-[62px] w-[62px] -translate-x-1/2 -translate-y-1/2">
              <span aria-hidden="true" data-pulse className="absolute inset-0 rounded-full border" style={{ borderColor: "var(--accent-1)", animation: "nv-ring 2.6s ease-out infinite" }} />
              <span className="absolute inset-0 flex items-center justify-center rounded-full" style={{ background: "var(--gradient)", animation: "nv-glow 2.6s ease-in-out infinite" }}>
                <Icon name="bolt" className="h-7 w-7 text-white" strokeWidth={1.8} />
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
