import Link from "next/link";
import Icon, { type IconName } from "@/components/ui/Icon";
import SectionHead from "@/components/ui/SectionHead";
import FinalCTA from "@/components/home/FinalCTA";
import CostOfNothingMeter from "@/components/pricing/CostOfNothingMeter";
import JsonLd from "@/components/ui/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Pricing — Hire Your AI Workforce | Nodevant",
  description:
    "Hire AI employees that qualify leads, answer calls and run workflows — custom-built, integrated, monitored and optimized by Nodevant. Plans from $997/month, implementation from $4,500.",
  path: "/pricing/",
  keywords: [
    "ai employee pricing",
    "ai workforce pricing",
    "ai automation pricing",
    "ai agent monthly plans",
    "hire ai employees",
  ],
});

type Plan = {
  name: string;
  monthly: string;
  setup: string;
  blurb: string;
  cta: { label: string; href: string };
  popular?: boolean;
  features: { icon: IconName; label: string }[];
  intro?: string;
};

const PLANS: Plan[] = [
  {
    name: "AI Employee",
    monthly: "$997",
    setup: "$4,500 implementation",
    blurb: "One AI employee, hired for the single role that eats the most hours.",
    cta: { label: "Book a Demo", href: "/audit/" },
    features: [
      { icon: "brain", label: "1 custom AI employee (choose one role)" },
      { icon: "chat", label: "Voice, SMS, chat or email" },
      { icon: "puzzle", label: "Up to 3 integrations" },
      { icon: "refresh", label: "Up to 3 core workflows" },
      { icon: "target", label: "CRM & calendar connectivity" },
      { icon: "doc", label: "Knowledge base setup" },
      { icon: "phone", label: "500 voice minutes / mo" },
      { icon: "bolt", label: "2,500 digital actions / mo" },
      { icon: "gear", label: "Monthly optimization" },
      { icon: "chart", label: "Reporting dashboard" },
    ],
  },
  {
    name: "AI Revenue Team",
    monthly: "$1,997",
    setup: "$9,500 implementation",
    blurb: "A three-strong team that sources, qualifies and books revenue end to end.",
    cta: { label: "Book a Demo", href: "/audit/" },
    popular: true,
    intro: "Everything in AI Employee, plus:",
    features: [
      { icon: "brain", label: "3 custom AI employees" },
      { icon: "phone", label: "Inbound & outbound voice" },
      { icon: "puzzle", label: "Up to 8 integrations" },
      { icon: "refresh", label: "Up to 10 workflows" },
      { icon: "funnel", label: "Lead qualification" },
      { icon: "clock", label: "Missed-call recovery" },
      { icon: "doc", label: "Estimates & follow-up" },
      { icon: "send", label: "Long-term nurturing" },
      { icon: "phone", label: "1,500 voice minutes / mo" },
      { icon: "bolt", label: "10,000 digital actions / mo" },
      { icon: "gear", label: "Biweekly optimization" },
      { icon: "shield-check", label: "Priority support" },
    ],
  },
  {
    name: "AI Workforce",
    monthly: "$3,497",
    setup: "$15,000 implementation",
    blurb: "A full workforce across departments and locations, with human approval gates.",
    cta: { label: "Book a Demo", href: "/audit/" },
    intro: "Everything in AI Revenue Team, plus:",
    features: [
      { icon: "brain", label: "6 custom AI employees" },
      { icon: "puzzle", label: "Up to 15 integrations" },
      { icon: "refresh", label: "Up to 25 workflows" },
      { icon: "pin", label: "Multi-location support (3)" },
      { icon: "layers", label: "Cross-department access" },
      { icon: "chart", label: "Operations & reporting suite" },
      { icon: "shield-check", label: "Human approval gates" },
      { icon: "phone", label: "3,500 voice minutes / mo" },
      { icon: "bolt", label: "25,000 digital actions / mo" },
      { icon: "gear", label: "Weekly optimization" },
      { icon: "clock", label: "Priority implementation" },
    ],
  },
  {
    name: "Enterprise Workforce",
    monthly: "Custom",
    setup: "$25,000+ implementation · $5,000–$15,000+/mo",
    blurb: "Unlimited scale with dedicated management, SLAs and compliance.",
    cta: { label: "Contact Sales", href: "/contact/" },
    features: [
      { icon: "globe", label: "Unlimited employees, integrations & workflows" },
      { icon: "building", label: "Unlimited locations" },
      { icon: "shield-check", label: "Advanced security & compliance" },
      { icon: "briefcase", label: "Dedicated account manager" },
      { icon: "clock", label: "SLA & uptime guarantees" },
      { icon: "sparkle", label: "White-glove onboarding" },
      { icon: "chart", label: "Custom reporting" },
      { icon: "phone", label: "24/7 priority support" },
    ],
  },
];

const TRUST: { icon: IconName; label: string }[] = [
  { icon: "shield-check", label: "Enterprise-grade security (SSO, RBAC, audit logs)" },
  { icon: "check", label: "Your data is never sold" },
  { icon: "layers", label: "SOC 2-compliant infrastructure partners" },
  { icon: "chat", label: "Human support, real people" },
];

const ANNUAL = [
  { plan: "AI Employee", standard: "$16,464", prepay: "$14,470", save: "$1,994" },
  { plan: "AI Revenue Team", standard: "$33,464", prepay: "$29,470", save: "$3,994" },
  { plan: "AI Workforce", standard: "$56,964", prepay: "$49,970", save: "$6,994" },
];

const ADDONS: { icon: IconName; label: string; price: string }[] = [
  { icon: "brain", label: "Additional AI employee", price: "$500/mo + setup" },
  { icon: "pin", label: "Additional location", price: "$350/mo + setup" },
  { icon: "phone", label: "+1,000 voice minutes", price: "$400" },
  { icon: "bolt", label: "+1,000 digital actions", price: "$75" },
  { icon: "puzzle", label: "Custom integration", price: "$1,500–$5,000" },
  { icon: "refresh", label: "Custom workflow", price: "from $1,000" },
];

const FAQS = [
  { q: "What's an AI employee?", a: "A role you hire, not a tool you configure. Each AI employee is custom-built for one job — a receptionist, an SDR, an estimator — trained on your business, wired into your stack, and monitored by us after launch." },
  { q: "What counts as a digital action?", a: "Any automated step your workforce takes: sending an email or SMS, updating a CRM record, generating a document, booking a meeting, running a workflow branch. Voice minutes are metered separately." },
  { q: "Can I change plans?", a: "Yes. Upgrade, downgrade or add roles at any time — new capacity applies from your next billing cycle, and add-ons scale you up without a re-implementation." },
  { q: "What does implementation include?", a: "Discovery, role design, integration into your CRM and stack, knowledge-base training, testing, and launch. It's a one-time build fee billed separately from the monthly service." },
];

function ProductJsonLd() {
  const fixed = PLANS.filter((p) => p.monthly !== "Custom").map((p) => ({
    "@type": "Product",
    name: `Nodevant ${p.name}`,
    description: p.blurb,
    brand: { "@type": "Brand", name: SITE.name },
    offers: {
      "@type": "Offer",
      price: p.monthly.replace(/[^0-9]/g, ""),
      priceCurrency: "USD",
      url: `${SITE.url}/pricing/`,
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: p.monthly.replace(/[^0-9]/g, ""),
        priceCurrency: "USD",
        unitText: "MONTH",
      },
    },
  }));
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Nodevant AI Workforce plans",
        itemListElement: fixed.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item,
        })),
      }}
    />
  );
}

function PlanCard({ p }: { p: Plan }) {
  const style = p.popular
    ? {
        border: "1px solid transparent",
        backgroundImage:
          "linear-gradient(var(--surface),var(--surface)),var(--gradient)",
        backgroundOrigin: "border-box" as const,
        backgroundClip: "padding-box,border-box" as const,
      }
    : undefined;
  return (
    <div className={`card relative flex flex-col p-6 ${p.popular ? "shadow-glow" : ""}`} style={style}>
      {p.popular && (
        <span className="absolute -top-3 left-6 rounded-full px-3 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-white" style={{ background: "var(--gradient)" }}>
          Most Popular
        </span>
      )}
      <h3 className="font-display text-xl font-extrabold tracking-[-0.02em] text-ink">{p.name}</h3>
      <p className="mt-1.5 text-[13px] leading-relaxed text-faint">{p.blurb}</p>
      <div className="mt-4 flex items-end gap-1.5">
        <span className="gradient-text font-display text-4xl font-extrabold tracking-[-0.03em]">
          {p.monthly}
        </span>
        {p.monthly !== "Custom" && <span className="mb-1.5 text-sm text-faint">/mo</span>}
      </div>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-faint">{p.setup}</p>
      <Link href={p.cta.href} className={`mt-5 w-full justify-center ${p.popular ? "btn-primary" : "btn-secondary"}`}>
        {p.cta.label}
      </Link>
      {p.intro && (
        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.12em] text-faint">{p.intro}</p>
      )}
      <div className={`flex flex-col gap-2.5 border-t border-line pt-4 ${p.intro ? "mt-2.5" : "mt-6"}`}>
        {p.features.map((f) => (
          <span key={f.label} className="flex items-start gap-2.5">
            <span className="chip mt-px h-6 w-6 flex-shrink-0">
              <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.4} />
            </span>
            <span className="text-[13.5px] leading-snug text-body">{f.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function PricingPage() {
  return (
    <>
      <ProductJsonLd />

      {/* Hero */}
      <section className="grid-overlay relative overflow-hidden px-5 pb-12 pt-36 md:pb-16 md:pt-44">
        <div className="pointer-events-none absolute inset-0 radial-glow" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl text-center">
          <span className="badge badge-accent">Pricing</span>
          <h1 className="mt-5 font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.08] tracking-[-0.04em] text-ink text-balance">
            Hire your <span className="gradient-text">AI workforce.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-faint">
            Custom-built, integrated, monitored, and optimized by Nodevant.
            Starting at $997/month · implementation from $4,500.
          </p>
        </div>
      </section>

      {/* Cost of Doing Nothing — section 1 */}
      <CostOfNothingMeter />

      {/* Trust strip */}
      <section className="px-5 pb-6">
        <div className="mx-auto grid max-w-[1180px] gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST.map((t) => (
            <span key={t.label} className="card flex items-center gap-3 p-4">
              <span className="chip h-9 w-9 flex-shrink-0">
                <Icon name={t.icon} className="h-[18px] w-[18px]" />
              </span>
              <span className="text-[13px] font-medium text-body">{t.label}</span>
            </span>
          ))}
        </div>
      </section>

      {/* Deep-dive link */}
      <section className="px-5 pb-2">
        <p className="mx-auto max-w-[1180px] text-center text-[13.5px] text-faint">
          Pricing a phone agent specifically?{" "}
          <Link href="/pricing/ai-voice-agent-cost/" className="font-semibold text-cyan hover:underline">
            See exactly what an AI voice agent costs →
          </Link>
        </p>
      </section>

      {/* Plans */}
      <section id="packages" className="scroll-mt-24 px-5 py-12">
        <div className="mx-auto grid max-w-[1280px] gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((p) => (
            <PlanCard key={p.name} p={p} />
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-[1280px] text-center font-mono text-[10px] uppercase tracking-[0.12em] text-faint">
          Implementation billed separately · monthly service can be prepaid annually to save two months
        </p>
      </section>

      {/* Annual prepay */}
      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[1080px]">
          <SectionHead
            eyebrow="Annual Prepay"
            title={<>Save two months with <span className="gradient-text">annual prepayment.</span></>}
            subtitle="Discount applies to the monthly service. Implementation is billed separately."
          />
          <div className="mt-9 overflow-x-auto rounded-2xl" style={{ border: "1px solid var(--border)" }}>
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  {["Plan", "First-year standard", "Annual prepay", "You save"].map((h) => (
                    <th key={h} className="p-4 text-left font-mono text-[10.5px] uppercase tracking-[0.1em] text-faint" style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--border)" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ANNUAL.map((r) => (
                  <tr key={r.plan}>
                    <td className="p-4 font-semibold text-ink" style={{ borderBottom: "1px solid var(--border)" }}>{r.plan}</td>
                    <td className="p-4 text-faint" style={{ borderBottom: "1px solid var(--border)" }}>{r.standard}</td>
                    <td className="p-4 font-semibold text-ink" style={{ borderBottom: "1px solid var(--border)" }}>{r.prepay}</td>
                    <td className="gradient-text p-4 font-semibold" style={{ borderBottom: "1px solid var(--border)" }}>{r.save}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[1280px]">
          <SectionHead
            eyebrow="Expand As You Grow"
            title={<>Add capacity, <span className="gradient-text">any time.</span></>}
            subtitle="Usage is billed monthly in arrears — overage is transparent and predictable, never a surprise."
          />
          <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ADDONS.map((a) => (
              <span key={a.label} className="card flex items-center gap-3.5 p-4">
                <span className="chip h-11 w-11 flex-shrink-0">
                  <Icon name={a.icon} className="h-5 w-5" />
                </span>
                <span className="flex flex-1 flex-col">
                  <span className="text-[15px] font-semibold text-ink">{a.label}</span>
                  <span className="font-mono text-[11px] text-faint">{a.price}</span>
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Pilot */}
      <section className="px-5 py-12">
        <div className="mx-auto flex max-w-[1080px] flex-wrap items-center gap-5 rounded-[20px] p-7 md:p-9" style={{ border: "1px solid transparent", backgroundImage: "linear-gradient(var(--surface),var(--surface)),var(--gradient)", backgroundOrigin: "border-box", backgroundClip: "padding-box,border-box" }}>
          <span className="chip h-12 w-12 flex-shrink-0">
            <Icon name="bolt" className="h-6 w-6" />
          </span>
          <span className="flex min-w-[240px] flex-1 flex-col gap-1">
            <span className="font-display text-xl font-extrabold tracking-[-0.02em] text-ink">
              30-Day AI Workforce Pilot — $2,500
            </span>
            <span className="text-[14px] text-faint">Fully credited toward your implementation when you continue.</span>
          </span>
          <Link href="/audit/" className="btn-primary">
            Start the Pilot
            <Icon name="chevron" className="h-4 w-4" strokeWidth={2.2} />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[880px]">
          <SectionHead eyebrow="FAQ" title={<>Pricing, <span className="gradient-text">answered.</span></>} />
          <div className="mt-9 flex flex-col gap-2.5">
            {FAQS.map((f) => (
              <details key={f.q} className="card">
                <summary className="flex min-h-[56px] items-center justify-between gap-4 px-[22px] py-[19px] text-base font-semibold text-ink">
                  {f.q}
                  <Icon name="chevron" data-chev className="h-[18px] w-[18px] flex-shrink-0 text-cyan transition-transform" strokeWidth={1.8} />
                </summary>
                <p className="px-[22px] pb-5 text-[14.5px] leading-relaxed text-faint">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
