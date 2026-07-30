import type { Metadata } from "next";
import Link from "next/link";
import Icon, { type IconName } from "@/components/ui/Icon";
import SectionHead from "@/components/ui/SectionHead";
import JsonLd from "@/components/ui/JsonLd";
import ServiceCard from "@/components/services/ServiceCard";
import ProductCard from "@/components/services/ProductCard";
import { pageMetadata } from "@/lib/metadata";
import { serviceListSchema, breadcrumbSchema } from "@/lib/schema";
import { SERVICE_DETAILS, PRODUCTS, getService } from "@/lib/services";

export const metadata: Metadata = pageMetadata({
  title: "AI Automation Services | Agentic Workflows, Voice AI & Integrations — Nodevant",
  description:
    "Six focused AI automation services — agentic workflows, voice agents, logic engines, system integration, lead gen and custom AI. Fixed project pricing, deployed in weeks, proven across 6 live platforms.",
  path: "/services/",
  keywords: [
    "ai automation services",
    "workflow automation agency",
    "ai voice agents",
    "system integration automation",
    "lead generation automation",
    "custom ai development",
  ],
});

const TRUST: { icon: IconName; label: string }[] = [
  { icon: "layers", label: "Built by the team behind 6 live platforms" },
  { icon: "clock", label: "Deployed in weeks, not months" },
  { icon: "doc", label: "Fixed project pricing" },
  { icon: "shield-check", label: "Monitored after launch" },
];

const TIERS = [
  {
    label: "Entry",
    blurb: "Single-workflow builds, 1–2 weeks",
    slugs: ["system-integration", "agentic-workflows"],
    flagship: false,
  },
  {
    label: "Flagship",
    blurb: "Multi-system engines, 2–3 weeks",
    slugs: ["ai-voice-agents", "lead-gen-pipeline"],
    flagship: true,
  },
  {
    label: "Deep build",
    blurb: "Custom engines, 3–6 weeks",
    slugs: ["complex-logic-engines", "custom-ai-solutions"],
    flagship: false,
  },
];

const PHILOSOPHY: { icon: IconName; title: string; desc: string }[] = [
  { icon: "check", title: "We quote once, not by the hour.", desc: "You know the total before we start. No creeping invoices." },
  { icon: "layers", title: "Tools & APIs at cost.", desc: "OpenAI, VAPI, and n8n bills go directly to you. We don't mark up software." },
  { icon: "shield-check", title: "30 days of monitoring included.", desc: "After launch, we watch it for drift. If it breaks, we fix it." },
];

function deployedNames(slugs: string[]) {
  return slugs.map((k) => PRODUCTS[k]?.name).filter(Boolean).join(", ");
}

export default function ServicesPage() {
  const products = Object.values(PRODUCTS);

  return (
    <>
      <JsonLd
        data={[
          serviceListSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services/" },
          ]),
        ]}
      />

      {/* 1 · Hero */}
      <section className="grid-overlay relative overflow-hidden px-5 pb-14 pt-32 md:pt-40">
        <div className="pointer-events-none absolute inset-0 radial-glow" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1280px]">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">
            <Link href="/" className="hover:text-ink">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink">Services</span>
          </nav>
          <p className="eyebrow mt-6">Our Services</p>
          <span className="rule mt-2.5 mb-4 block" />
          <h1 className="max-w-3xl font-display text-[clamp(2.125rem,5vw,4rem)] font-extrabold leading-[1.06] tracking-[-0.04em] text-ink text-balance">
            AI automation that <span className="gradient-text">pays for itself.</span>
          </h1>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-faint">
            Six focused services that eliminate busywork, connect your tools, and put revenue-generating
            tasks on autopilot. Every engagement starts with a free 90-second audit.
          </p>
          <div className="mt-8 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST.map((t) => (
              <span key={t.label} className="flex items-center gap-3 text-[13.5px] text-body">
                <span className="chip h-9 w-9 flex-shrink-0">
                  <Icon name={t.icon} className="h-[18px] w-[18px]" />
                </span>
                {t.label}
              </span>
            ))}
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/#audit" className="btn-primary">
              Get My Free Audit
              <Icon name="chevron" className="h-4 w-4" strokeWidth={2.2} />
            </Link>
            <Link href="/#work" className="btn-secondary">See deployed work →</Link>
          </div>
        </div>
      </section>

      {/* 2 · Tier band */}
      <section className="px-5 pb-4">
        <div className="mx-auto grid max-w-[1280px] gap-[18px] md:grid-cols-3">
          {TIERS.map((tier) => {
            const style = tier.flagship
              ? {
                  border: "1px solid transparent",
                  backgroundImage: "linear-gradient(var(--surface),var(--surface)),var(--gradient)",
                  backgroundOrigin: "border-box" as const,
                  backgroundClip: "padding-box,border-box" as const,
                }
              : undefined;
            return (
              <div key={tier.label} className={`card relative p-6 ${tier.flagship ? "shadow-glow" : ""}`} style={style}>
                {tier.flagship && (
                  <span className="absolute -top-3 left-6 rounded-full px-3 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-white" style={{ background: "var(--gradient)" }}>
                    Most Booked
                  </span>
                )}
                <p className={`font-mono text-[10.5px] uppercase tracking-[0.18em] ${tier.flagship ? "gradient-text" : "text-faint"}`}>
                  {tier.label}
                </p>
                <p className="mt-2.5 text-[15px] font-semibold text-ink">{tier.blurb}</p>
                <div className="mt-4 flex flex-col gap-2.5 border-t border-line pt-4">
                  {tier.slugs.map((slug) => {
                    const s = getService(slug)!;
                    return (
                      <a key={slug} href={`#${slug}`} className="flex items-center justify-between gap-2 text-[14px] text-body transition-colors hover:text-ink">
                        {s.name}
                        <Icon name="chevron" className="h-3.5 w-3.5 text-faint" strokeWidth={1.8} />
                      </a>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3 · Service cards */}
      <section className="px-5 py-12">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-5">
          {SERVICE_DETAILS.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </section>

      {/* 4 · Proof band */}
      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[1280px]">
          <SectionHead
            eyebrow="Services deployed in the wild"
            title={<>Not hypothetical. <span className="gradient-text">Live right now.</span></>}
          />
          <div className="mt-9 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.key} product={p} />
            ))}
          </div>
          <p className="mt-6 font-mono text-[10.5px] uppercase tracking-[0.1em] text-faint">
            Six platforms live · Fairway360 runs on Scalaro — we build systems that power other systems
          </p>
        </div>
      </section>

      {/* 5 · Comparison band */}
      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[1280px]">
          <SectionHead
            eyebrow="Compare"
            title={<>Which service <span className="gradient-text">fits?</span></>}
            subtitle="Scan the row that matters most. Swipe sideways on the table; cards stack on small screens."
          />
          {/* Table (md+) */}
          <div className="mt-9 hidden overflow-x-auto rounded-2xl md:block" style={{ border: "1px solid var(--border)" }}>
            <table className="w-full min-w-[860px] border-collapse text-sm">
              <thead>
                <tr>
                  {["Service", "Best for", "Timeline", "Starting price", "Complexity", "Deployed in"].map((h, i) => (
                    <th
                      key={h}
                      className={`p-4 text-left font-mono text-[10px] uppercase tracking-[0.1em] text-faint ${i === 0 ? "sticky left-0" : ""}`}
                      style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--border)" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SERVICE_DETAILS.map((s) => (
                  <tr key={s.slug}>
                    <th scope="row" className="sticky left-0 p-4 text-left font-semibold text-ink" style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)", borderRight: "1px solid var(--border)" }}>
                      {s.name}
                    </th>
                    <td className="p-4 text-faint" style={{ borderBottom: "1px solid var(--border)" }}>{s.bestFor}</td>
                    <td className="p-4 text-faint" style={{ borderBottom: "1px solid var(--border)" }}>{s.timeline}</td>
                    <td className="p-4 font-semibold text-ink" style={{ borderBottom: "1px solid var(--border)" }}>{s.price.replace("From ", "")}</td>
                    <td className="p-4 text-faint" style={{ borderBottom: "1px solid var(--border)" }}>{s.complexity}</td>
                    <td className="p-4 text-faint" style={{ borderBottom: "1px solid var(--border)" }}>{deployedNames(s.deployedIn)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Stacked cards (mobile) */}
          <div className="mt-8 flex flex-col gap-3 md:hidden">
            {SERVICE_DETAILS.map((s) => (
              <div key={s.slug} className="card p-5">
                <p className="font-display text-[17px] font-extrabold text-ink">{s.name}</p>
                <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2.5 text-[13px]">
                  <dt className="text-faint">Best for</dt>
                  <dd className="text-body">{s.bestFor}</dd>
                  <dt className="text-faint">Timeline</dt>
                  <dd className="text-body">{s.timeline}</dd>
                  <dt className="text-faint">From</dt>
                  <dd className="font-semibold text-ink">{s.price.replace("From ", "")}</dd>
                  <dt className="text-faint">Complexity</dt>
                  <dd className="text-body">{s.complexity}</dd>
                  <dt className="text-faint">Deployed in</dt>
                  <dd className="text-body">{deployedNames(s.deployedIn)}</dd>
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 · Pricing philosophy */}
      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[1080px]">
          <SectionHead
            eyebrow="Pricing Philosophy"
            title={<>Fixed project pricing. <span className="gradient-text">No surprises.</span></>}
          />
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {PHILOSOPHY.map((p) => (
              <div key={p.title} className="flex items-start gap-3.5">
                <span className="chip h-11 w-11 flex-shrink-0">
                  <Icon name={p.icon} className="h-5 w-5" />
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-[15px] font-semibold text-ink">{p.title}</span>
                  <span className="text-[13.5px] leading-relaxed text-faint">{p.desc}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 · Audit CTA */}
      <section className="px-5 py-16">
        <div
          className="mx-auto max-w-[880px] rounded-[28px] p-9 text-center md:p-14"
          style={{
            border: "1px solid transparent",
            backgroundImage: "linear-gradient(var(--surface),var(--surface)),var(--gradient)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box,border-box",
          }}
        >
          <h2 className="font-display text-[clamp(1.5rem,3.4vw,2.625rem)] font-extrabold leading-[1.12] tracking-[-0.03em] text-ink text-balance">
            Not sure which service <span className="gradient-text">you need?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-faint">
            The 90-second audit maps your workflows and returns your highest-ROI starting point — free,
            no email required to start.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/#audit" className="btn-primary">
              Get My Free Audit
              <Icon name="chevron" className="h-4 w-4" strokeWidth={2.2} />
            </Link>
            <Link href="/contact/" className="btn-secondary">Book a Call</Link>
          </div>
        </div>
      </section>
    </>
  );
}
