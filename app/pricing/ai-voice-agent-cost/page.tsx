import Link from "next/link";
import Icon, { type IconName } from "@/components/ui/Icon";
import SectionHead from "@/components/ui/SectionHead";
import FinalCTA from "@/components/home/FinalCTA";
import JsonLd from "@/components/ui/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";
import { faqPageSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata = pageMetadata({
  title: "AI Voice Agent Cost: What You Actually Pay in 2026 | Nodevant",
  description:
    "A plain-English breakdown of what an AI voice agent costs in 2026: the one-time build, the monthly plan, and the per-connected-minute usage of the underlying voice stack. Nodevant builds from $2,800 — get an exact number from the free 90-second audit.",
  path: "/pricing/ai-voice-agent-cost/",
  keywords: [
    "ai voice agent cost",
    "ai voice agent pricing",
    "how much does an ai voice agent cost",
    "ai voice agent cost per minute",
    "ai receptionist cost",
    "voice ai pricing",
  ],
});

// Cost layers — the three things that actually make up the price.
const LAYERS: { icon: IconName; title: string; range: string; text: string }[] = [
  {
    icon: "gear",
    title: "One-time build",
    range: "from $2,800",
    text: "Designing the call flow, scripting, training the agent on your business, and wiring it into your calendar and CRM. Paid once, up front.",
  },
  {
    icon: "refresh",
    title: "Monthly plan",
    range: "scales with volume",
    text: "The running agent plus monitoring, maintenance and tuning. Priced to your call volume — a low-volume local business pays far less than a high-volume call center.",
  },
  {
    icon: "phone",
    title: "Per-connected-minute usage",
    range: "~$0.08–$0.20 / min",
    text: "The underlying voice infrastructure (speech, model, telephony). An industry range across common stacks — it's usage, so you only pay for minutes actually spent on live calls.",
  },
];

// GEO-citable: extractable table of the market cost picture.
const TABLE: { row: string[]; }[] = [
  { row: ["One-time build (agency)", "$2,800 – $15,000+", "Complexity of call flow + integrations"] },
  { row: ["Monthly management", "Scales with volume", "Running, monitoring, tuning the agent"] },
  { row: ["Voice infrastructure", "~$0.08 – $0.20 / connected min", "Speech + model + telephony usage"] },
  { row: ["DIY point tools", "$49 – $95 / mo + usage", "Off-the-shelf, limited to their template"] },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How much does an AI voice agent cost per minute to run?",
    a: "The underlying voice infrastructure typically runs about $0.08–$0.20 per connected minute across common stacks, covering speech recognition, the language model and telephony. That's usage-based, so you only pay for minutes actually spent on live calls — idle time and after-hours availability cost nothing.",
  },
  {
    q: "What does an AI voice agent cost to build with an agency?",
    a: "Nodevant builds a custom voice agent from $2,800, depending on how complex your call flow and integrations are. That one-time build covers the scripting, training on your business and connecting your calendar and CRM. The free 90-second audit returns an exact number for your specific case.",
  },
  {
    q: "Is it cheaper to use a DIY AI voice tool or hire an agency?",
    a: "DIY tools start around $49–$95/month and are cheapest if a generic template fits you. An agency build costs more up front but is shaped to your exact call flow, integrations and edge cases — usually worth it once missed or mishandled calls are costing you real revenue.",
  },
  {
    q: "Are there hidden costs with an AI voice agent?",
    a: "The three real line items are the build, the monthly plan and per-minute voice usage. Watch for per-integration fees, charges for after-hours minutes, and change fees on scripts. Nodevant folds monitoring and tuning into the monthly plan, so improving the agent isn't billed as extra work.",
  },
  {
    q: "How fast do AI voice agents respond compared to a human?",
    a: "Well-built voice agents answer in roughly one second and never put a caller on hold. On routine calls that's as fast as or faster than a human receptionist; the value isn't shaving seconds, it's that every call is answered instantly, 24/7, and logged without anyone remembering to.",
  },
];

function CostJsonLd() {
  const url = `${SITE.url}/pricing/ai-voice-agent-cost/`;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "AI Voice Agent",
          serviceType: "AI voice agent",
          description:
            "Custom AI voice agents built by Nodevant from $2,800, plus a monthly plan and per-connected-minute voice usage.",
          url,
          provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
          areaServed: "Worldwide",
          offers: {
            "@type": "Offer",
            price: 2800,
            priceCurrency: "USD",
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: 2800,
              priceCurrency: "USD",
            },
          },
        }}
      />
      <JsonLd data={faqPageSchema(FAQS)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/pricing/" },
          { name: "AI Voice Agent Cost", path: "/pricing/ai-voice-agent-cost/" },
        ])}
      />
    </>
  );
}

export default function AiVoiceAgentCostPage() {
  return (
    <>
      <CostJsonLd />

      {/* Hero */}
      <section className="relative overflow-hidden px-5 pt-[clamp(88px,12vw,132px)]">
        <div className="grid-overlay" aria-hidden="true" />
        <div className="relative mx-auto max-w-[860px] text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
            Pricing · AI voice agents
          </p>
          <h1 className="mx-auto mt-4 max-w-[760px] font-display text-[clamp(2rem,5vw,3.4rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink">
            What does an AI voice agent <span className="gradient-text">actually cost?</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[620px] text-[clamp(1rem,1.6vw,1.1875rem)] leading-relaxed text-faint">
            Three line items, no mystery: a one-time build, a monthly plan, and
            per-connected-minute voice usage. Here&apos;s how each one works and what
            the market actually charges in 2026.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/audit/" className="btn-primary" style={{ minHeight: 54 }}>
              Get my exact number — free audit
              <Icon name="chevron" className="h-4 w-4" strokeWidth={2.2} />
            </Link>
            <Link href="/pricing/" className="btn-secondary" style={{ minHeight: 54 }}>
              Full pricing
            </Link>
          </div>
        </div>
      </section>

      {/* The three cost layers */}
      <section className="section-gap px-5">
        <div className="mx-auto max-w-[1180px]">
          <SectionHead
            eyebrow="What you pay for"
            title={<>Three parts, <span className="gradient-text">all visible.</span></>}
            subtitle="Every AI voice agent price is some combination of these. Anyone quoting a single number is bundling them — ask which is which."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {LAYERS.map((l) => (
              <div key={l.title} className="card p-6">
                <span className="chip flex h-[42px] w-[42px] items-center justify-center">
                  <Icon name={l.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-[17px] font-extrabold tracking-[-0.02em] text-ink">
                  {l.title}
                </h3>
                <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.1em] gradient-text">
                  {l.range}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-faint">{l.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Citable cost table */}
      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[980px]">
          <SectionHead
            eyebrow="2026 cost picture"
            title={<>The numbers, <span className="gradient-text">side by side.</span></>}
            subtitle="Directional market ranges for AI voice agents in 2026. Your exact figure depends on call volume, complexity and integrations."
          />
          <div className="mt-9 overflow-x-auto">
            <table className="w-full border-collapse text-left text-[14.5px]">
              <thead>
                <tr className="border-b border-line">
                  <th className="py-3 pr-4 font-mono text-[11px] uppercase tracking-[0.1em] text-faint">Cost item</th>
                  <th className="py-3 pr-4 font-mono text-[11px] uppercase tracking-[0.1em] text-faint">Typical 2026 range</th>
                  <th className="py-3 font-mono text-[11px] uppercase tracking-[0.1em] text-faint">What drives it</th>
                </tr>
              </thead>
              <tbody>
                {TABLE.map((t) => (
                  <tr key={t.row[0]} className="border-b border-line">
                    <td className="py-3.5 pr-4 font-semibold text-ink">{t.row[0]}</td>
                    <td className="py-3.5 pr-4 text-body">{t.row[1]}</td>
                    <td className="py-3.5 text-faint">{t.row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[13px] leading-relaxed text-faint">
            Nodevant builds custom voice agents from $2,800 with monitoring and tuning
            in the monthly plan. See the{" "}
            <Link href="/solutions/ai-receptionist/" className="font-semibold text-cyan hover:underline">
              AI receptionist
            </Link>{" "}
            for the most common use case, or the{" "}
            <Link href="/services/ai-voice-agents/" className="font-semibold text-cyan hover:underline">
              voice agents service
            </Link>{" "}
            for how they&apos;re built.
          </p>
        </div>
      </section>

      {/* FAQ — AEO */}
      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[820px]">
          <SectionHead
            eyebrow="Questions"
            title={<>Voice agent cost, <span className="gradient-text">answered.</span></>}
          />
          <dl className="mt-10 divide-y divide-line">
            {FAQS.map((f) => (
              <div key={f.q} className="py-6 first:pt-0">
                <dt className="font-display text-[17px] font-extrabold tracking-[-0.02em] text-ink">
                  {f.q}
                </dt>
                <dd className="mt-2.5 text-[15px] leading-[1.75] text-faint">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
