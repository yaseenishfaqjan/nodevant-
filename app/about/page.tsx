import type { Metadata } from "next";
import Link from "next/link";
import Icon, { type IconName } from "@/components/ui/Icon";
import SectionHead from "@/components/ui/SectionHead";
import BrandLogo from "@/components/ui/BrandLogo";
import JsonLd from "@/components/ui/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "About Nodevant | Six Platforms Live · The AI Automation Agency",
  description:
    "Nodevant built and runs six live platforms — Storehouse360, Scalaro, Fabrioza, Fairway360, GlobalShield360 and PeachPicks. Fixed pricing, live in weeks, monitored after launch.",
  path: "/about/",
  keywords: [
    "about nodevant",
    "ai automation agency",
    "business automation consultant",
  ],
});

// The six live platforms we own and operate — the proof asset, surfaced first.
// URLs mirror the Organization sameAs list in lib/schema.ts.
const PRODUCTS: { initial: string; logoSlug: string; name: string; industry: string; url: string }[] = [
  { initial: "S", logoSlug: "storehouse360", name: "Storehouse360", industry: "Fintech · Financial Hub", url: "https://storehouse360.com" },
  { initial: "S", logoSlug: "scalaro", name: "Scalaro", industry: "B2B SaaS Sales", url: "https://scalaro.io" },
  { initial: "F", logoSlug: "fabrioza", name: "Fabrioza", industry: "Custom Manufacturing", url: "https://fabrioza.com" },
  { initial: "F", logoSlug: "fairway360", name: "Fairway360", industry: "Hospitality · Golf Ops", url: "https://fairway360.io" },
  { initial: "G", logoSlug: "globalshield360", name: "GlobalShield360", industry: "Field Services · Roofing", url: "https://globalshield360.io" },
  { initial: "P", logoSlug: "peachpicks", name: "PeachPicks", industry: "Consumer · Sports & Rewards", url: "https://peachpicks.app" },
];

const TRUST: { icon: IconName; label: string }[] = [
  { icon: "layers", label: "6 platforms live" },
  { icon: "clock", label: "3-year track record" },
  { icon: "tag", label: "Fixed project pricing" },
  { icon: "shield-check", label: "Human-approved before ship" },
];

const DIFFERENTIATORS: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "chart",
    title: "ROI before you commit",
    text: "We're the only agency that shows you your estimated return before you ever book a call. No black boxes, no vague promises.",
  },
  {
    icon: "bolt",
    title: "Ship in weeks, not quarters",
    text: "Most automations go live in 1–3 weeks. You see working previews at every milestone, not a big reveal at the end.",
  },
  {
    icon: "puzzle",
    title: "Tool-agnostic by design",
    text: "We recommend the right stack for your problem — n8n, Make, custom code — not whatever we happen to resell.",
  },
  {
    icon: "growth",
    title: "We stay after launch",
    text: "94% of clients stay past their first project. We monitor, tune and expand your systems as you grow.",
  },
];

const STEPS: { num: string; icon: IconName; title: string; text: string }[] = [
  {
    num: "01",
    icon: "clipboard-check",
    title: "Free 90-second audit",
    text: "You answer 7 questions. We map your biggest automation opportunity and estimated ROI. Free, no email required to start.",
  },
  {
    num: "02",
    icon: "signature",
    title: "Scope and fixed quote",
    text: "We define exactly what we'll build, on what timeline, for what fixed price. No hourly billing, no scope creep.",
  },
  {
    num: "03",
    icon: "refresh",
    title: "Build with weekly previews",
    text: "You see working previews every week. Course corrections cost nothing early on. We ship when the numbers work, not when the calendar says.",
  },
  {
    num: "04",
    icon: "shield-check",
    title: "Deploy and 30 days monitored",
    text: "Live systems with monitoring included for 30 days. If it drifts, we fix it before you notice.",
  },
];

const COMMITMENTS: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "shield",
    title: "Fixed price, published up front",
    text: "The number we quote is the number you pay. No creeping invoices, no surprise change orders.",
  },
  {
    icon: "eye",
    title: "Weekly working previews",
    text: "You never wait until launch to see progress. If a preview doesn't work for you, we course-correct that week.",
  },
  {
    icon: "refresh",
    title: "30 days monitoring, drift-fix included",
    text: "For 30 days after launch we watch it for drift. If it breaks, we fix it — no ticket, no invoice.",
  },
];

function IconChip({ name, size = "lg" }: { name: IconName; size?: "lg" | "md" }) {
  const cls = size === "lg" ? "h-[46px] w-[46px]" : "h-10 w-10";
  const icon = size === "lg" ? "h-[22px] w-[22px]" : "h-5 w-5";
  return (
    <span className={`chip ${cls}`}>
      <Icon name={name} className={icon} />
    </span>
  );
}

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about/" },
          ]),
          organizationSchema(),
        ]}
      />

      {/* 1 · Hero */}
      <section className="relative overflow-hidden px-5 pb-14 pt-[112px]">
        <div className="grid-overlay" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1280px]">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">
            <Link href="/" className="transition-colors hover:text-ink">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink">About</span>
          </nav>
          <p className="mt-[26px] font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
            About Nodevant · Six platforms live
          </p>
          <span className="rule my-[10px]" />
          <h1 className="m-0 max-w-[900px] font-display text-[clamp(1.75rem,3.8vw,3.25rem)] font-extrabold leading-[1.12] tracking-[-0.035em] text-ink">
            We built the AI systems six live companies now run on.{" "}
            <span className="gradient-text">That&apos;s the credential.</span>
          </h1>
          <p className="mt-[22px] max-w-[620px] text-[clamp(0.94rem,1.3vw,1.125rem)] leading-relaxed text-body">
            Nodevant is the AI automation agency for businesses that want the systems, not the pitch deck. We built Storehouse360, Scalaro, Fabrioza, Fairway360, GlobalShield360 and PeachPicks — real companies serving real customers on infrastructure we designed. When we build yours, we&apos;re not learning on your budget.
          </p>
          <div className="mt-[30px] flex flex-wrap gap-2.5">
            {TRUST.map((t) => (
              <span
                key={t.label}
                className="inline-flex items-center gap-[9px] rounded-full px-3.5 py-[9px] font-mono text-[11px] uppercase tracking-[0.05em] text-ink"
                style={{ background: "var(--tint)", border: "1px solid var(--chip-border)", boxShadow: "inset 0 0 12px var(--glow)" }}
              >
                <Icon name={t.icon} className="h-[15px] w-[15px] text-cyan" strokeWidth={1.6} />
                {t.label}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/audit/" className="btn-primary" style={{ minHeight: 54 }}>
              Get My Free Audit
              <Icon name="chevron" className="h-[15px] w-[15px]" strokeWidth={2.2} />
            </Link>
            <Link href="/case-studies/" className="btn-secondary" style={{ minHeight: 54 }}>
              See our deployed work
              <Icon name="chevron" className="h-[15px] w-[15px]" strokeWidth={2.2} />
            </Link>
          </div>
        </div>
      </section>

      {/* 2 · Six Products We Own — proof-first */}
      <section id="proof" className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[1280px]">
          <SectionHead
            eyebrow="Proof we eat our own cooking"
            title={<>Six businesses we <span className="gradient-text">own and run</span> on these systems.</>}
            subtitle="We don't just build automations for clients — we run our own companies across multiple industries on the exact same stack. That's where these systems are battle-tested."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((p) => (
              <div key={p.name} className="card card-hover flex flex-wrap items-center justify-between gap-4 p-[22px]">
                <span className="flex items-center gap-3.5">
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-[13px] text-xl font-extrabold" style={{ background: "var(--surface-2)", border: "1px solid var(--chip-border)" }}>
                    <BrandLogo slug={p.logoSlug} name={p.name} fallback={p.initial} className="h-full w-full object-cover" />
                  </span>
                  <span className="flex min-w-0 flex-col gap-1.5">
                    <span className="font-display text-lg font-extrabold tracking-[-0.02em] text-ink">{p.name}</span>
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-faint">{p.industry}</span>
                  </span>
                </span>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto inline-flex min-h-[44px] items-center gap-[7px] rounded-[11px] px-4 text-[13.5px] font-semibold text-ink transition-colors hover:bg-[var(--surface-2)]"
                  style={{ border: "1px solid var(--border-strong)" }}
                >
                  Visit
                  <Icon name="external" className="h-[15px] w-[15px]" strokeWidth={1.9} />
                </a>
              </div>
            ))}
          </div>
          <Link
            href="/solutions/"
            className="mt-7 inline-flex items-center gap-2.5 font-mono text-[10.5px] uppercase leading-relaxed tracking-[0.14em] text-ink transition-colors hover:text-cyan"
          >
            Every one of these runs on automations we built — explore the industry systems behind them
            <Icon name="chevron" className="h-3.5 w-3.5 flex-shrink-0" strokeWidth={2.2} />
          </Link>
        </div>
      </section>

      {/* 3 · Mission */}
      <section id="mission" className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[900px]">
          <SectionHead
            eyebrow="Mission"
            title={<>Give businesses their <span className="gradient-text">time back.</span></>}
          />
          <p className="mt-[22px] text-[clamp(1rem,1.5vw,1.1875rem)] leading-[1.75] text-body">
            Every business is quietly bleeding hours to repetitive work — chasing leads, copying data, answering the same questions, building the same reports. We exist to find that wasted time, quantify it in dollars, and replace it with intelligent systems that run 24/7 without error.
          </p>
          <p className="mt-4 text-[clamp(1rem,1.5vw,1.1875rem)] leading-[1.75] text-faint">
            The result: leaner teams, faster growth, and people freed to do the work that actually needs a human.
          </p>
        </div>
      </section>

      {/* 4 · What Makes Us Different */}
      <section id="why" className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[1180px]">
          <SectionHead
            eyebrow="Why Nodevant"
            title={<>What makes us <span className="gradient-text">different.</span></>}
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {DIFFERENTIATORS.map((d) => (
              <div key={d.title} className="card flex flex-col p-[26px]">
                <IconChip name={d.icon} />
                <h3 className="mt-[18px] font-display text-lg font-extrabold tracking-[-0.02em] text-ink">{d.title}</h3>
                <p className="mt-[9px] text-sm leading-relaxed text-faint">{d.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 · How We Work */}
      <section id="process" className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[1280px]">
          <SectionHead
            eyebrow="How we work"
            title={<>From audit to deployed in <span className="gradient-text">4 steps.</span></>}
          />
          <div className="mt-11 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.num} className="card flex flex-col p-6">
                <span className="flex items-center gap-3">
                  <span className="gradient-text font-mono text-[13px] font-semibold">{s.num}</span>
                  <IconChip name={s.icon} size="md" />
                </span>
                <h3 className="mt-4 font-display text-[16.5px] font-extrabold tracking-[-0.02em] text-ink">{s.title}</h3>
                <p className="mt-[9px] text-sm leading-relaxed text-faint">{s.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-7 font-mono text-[10.5px] uppercase leading-loose tracking-[0.14em] text-faint">
            Typical timeline: 1–3 weeks · Typical delivery: fixed price · Typical outcome: pays for itself in month one
          </p>
        </div>
      </section>

      {/* 6 · Our Commitments */}
      <section id="commitments" className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[1180px]">
          <SectionHead
            eyebrow="Our commitments"
            title={<>The <span className="gradient-text">written promises.</span></>}
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COMMITMENTS.map((c) => (
              <div key={c.title} className="card flex flex-col p-[26px]">
                <IconChip name={c.icon} />
                <h3 className="mt-[18px] font-display text-lg font-extrabold tracking-[-0.02em] text-ink">{c.title}</h3>
                <p className="mt-[9px] text-sm leading-relaxed text-faint">{c.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-[680px] text-sm leading-relaxed text-faint">
            We don&apos;t guarantee outcomes we can&apos;t control, like your market or your team. We guarantee the ones we can — timeline, price and stability.
          </p>
        </div>
      </section>

      {/* 7 · Founder */}
      <section id="founder" className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[1180px]">
          <SectionHead
            eyebrow="Who builds this"
            title={<>Built by operators, <span className="gradient-text">not consultants.</span></>}
          />
          <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.62fr_1fr] lg:gap-12">
            <div className="min-w-0">
              {/* FOUNDER PHOTO SLOT — replace this placeholder with an <Image> of the founder headshot (square, 640px min) */}
              <div
                className="relative flex aspect-square w-full max-w-[340px] flex-col items-center justify-center gap-3.5 overflow-hidden rounded-[18px]"
                style={{ background: "var(--surface)", border: "1px solid var(--border-strong)" }}
              >
                <IconChip name="user" />
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">Founder headshot</span>
              </div>
              {/* FOUNDER NAME SLOT — replace "Founder name" with the real name once confirmed */}
              <p className="mt-[18px] font-display text-[17px] font-extrabold tracking-[-0.02em] text-ink">Founder name</p>
              <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">Founder and lead engineer</p>
            </div>
            <div className="min-w-0">
              <p className="text-[clamp(1rem,1.5vw,1.1875rem)] leading-[1.75] text-body">
                I built Storehouse360 to run my own finances in one place — credit, cards, funding and property. It worked. Then I built Scalaro to run its outbound. Now six businesses run on stacks I designed.
              </p>
              <p className="mt-[18px] text-[clamp(1rem,1.5vw,1.1875rem)] leading-[1.75] text-faint">
                Nodevant is what happens when the person selling you the automation is the same person shipping it. There&apos;s no account manager between you and the code.
              </p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                <Link href="/case-studies/" className="btn-secondary" style={{ minHeight: 46 }}>
                  Read the deployed cases
                  <Icon name="chevron" className="h-3.5 w-3.5" strokeWidth={2.2} />
                </Link>
                <a href="/contact/" className="btn-secondary" style={{ minHeight: 46 }}>
                  Contact the team
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8 · Final CTA */}
      <section className="relative overflow-hidden px-5 py-[clamp(60px,6vw,96px)]" style={{ background: "var(--surface)" }}>
        <div className="grid-overlay" aria-hidden="true" />
        <div className="relative mx-auto max-w-[760px] text-center">
          <h2 className="m-0 font-display text-[clamp(1.6rem,3.2vw,2.5rem)] font-extrabold leading-[1.16] tracking-[-0.03em] text-ink">
            Ready to see your ROI <span className="gradient-text">before you commit?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-base leading-relaxed text-faint">
            The 90-second audit maps your biggest automation opportunity and returns a personalized ROI report — free, no email required to start.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/audit/" className="btn-primary" style={{ minHeight: 54 }}>
              Get My Free Audit
              <Icon name="chevron" className="h-[15px] w-[15px]" strokeWidth={2.2} />
            </Link>
            <Link href="/contact/" className="btn-secondary" style={{ minHeight: 54 }}>
              Book a Call
            </Link>
          </div>
          <p className="mt-[18px] flex items-center justify-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">
            <Icon name="shield-check" className="h-[15px] w-[15px] text-cyan" strokeWidth={1.6} />
            No obligations · Just real insights
          </p>
        </div>
      </section>
    </>
  );
}
