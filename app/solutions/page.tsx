import type { Metadata } from "next";
import Link from "next/link";
import Icon, { type IconName } from "@/components/ui/Icon";
import SectionHead from "@/components/ui/SectionHead";
import JsonLd from "@/components/ui/JsonLd";
import SolutionCard from "@/components/solutions/SolutionCard";
import IndustryRouter from "@/components/solutions/IndustryRouter";
import SolutionsVsServices from "@/components/solutions/SolutionsVsServices";
import { pageMetadata } from "@/lib/metadata";
import { solutionListSchema, breadcrumbSchema } from "@/lib/schema";
import { SOLUTION_DETAILS } from "@/lib/solutions";
import { PRODUCTS } from "@/lib/services";

export const metadata: Metadata = pageMetadata({
  title: "Industry AI Stacks — Complete Operating Systems | Nodevant",
  description:
    "Six proven AI operating systems for fintech, manufacturing, SaaS, field services, education and home services. Built, deployed and running in production today.",
  path: "/solutions/",
  keywords: [
    "ai operating system",
    "industry ai automation",
    "fintech automation",
    "field services automation",
    "manufacturing automation",
    "ai business systems",
  ],
});

const TRUST: { icon: IconName; label: string }[] = [
  { icon: "layers", label: "6 stacks live in production" },
  { icon: "clock", label: "Deployed in weeks" },
  { icon: "doc", label: "Fixed project pricing" },
  { icon: "bolt", label: "Powered by our own services" },
];

const RANGE_CELLS = [
  "Healthcare",
  "Real Estate",
  "Logistics",
  "Professional Services",
  "E-Commerce",
  "Hospitality",
];

export default function SolutionsPage() {
  const products = Object.values(PRODUCTS);

  return (
    <>
      <JsonLd
        data={[
          solutionListSchema(SOLUTION_DETAILS.map((s) => ({ slug: s.slug, name: s.name, description: s.description }))),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Solutions", path: "/solutions/" },
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
            <span className="text-ink">Solutions</span>
          </nav>
          <p className="eyebrow mt-6">Complete business systems</p>
          <span className="rule mt-2.5 mb-4 block" />
          <h1 className="max-w-4xl font-display text-[clamp(2.125rem,5vw,4rem)] font-extrabold leading-[1.06] tracking-[-0.04em] text-ink text-balance">
            We don&apos;t just automate tasks. <span className="gradient-text">We build entire operating systems.</span>
          </h1>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-faint">
            Every stack below has been built, deployed and proven — not templates, but real businesses
            running on these systems. Pick the one closest to yours, or use the audit to map a custom
            stack in 90 seconds.
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
            <Link href="/services/" className="btn-secondary">See the underlying services →</Link>
          </div>
        </div>
      </section>

      {/* 2 · Industry router */}
      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[1280px]">
          <SectionHead
            eyebrow="Find your stack"
            title={<>Which one sounds like <span className="gradient-text">your business?</span></>}
          />
          <IndustryRouter />
        </div>
      </section>

      {/* 3 · Six stacks */}
      <section id="stacks" className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[1280px]">
          <SectionHead
            eyebrow="Six operating systems"
            title={<>Each one is <span className="gradient-text">running a real business.</span></>}
          />
          <div className="mt-9 grid gap-[18px] md:grid-cols-2 lg:grid-cols-3">
            {SOLUTION_DETAILS.map((s) => (
              <SolutionCard key={s.slug} solution={s} />
            ))}
          </div>
        </div>
      </section>

      {/* 4 · Solutions vs services */}
      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[1180px]">
          <SectionHead
            eyebrow="Solutions vs services"
            title={<>When to book <span className="gradient-text">which.</span></>}
          />
          <SolutionsVsServices />
        </div>
      </section>

      {/* 5 · Ecosystem line */}
      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[1180px]">
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {products.map((p) => (
              <a
                key={p.key}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card card-hover flex flex-col items-center gap-2.5 p-4 text-center text-body"
              >
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-xl font-display text-lg font-extrabold"
                  style={{ background: "var(--surface-2)", border: "1px solid var(--chip-border)" }}
                >
                  <span className="gradient-text">{p.initial}</span>
                </span>
                <span className="text-[13.5px] font-semibold text-ink">{p.name}</span>
              </a>
            ))}
          </div>
          <p className="mt-6 text-center font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">
            Six stacks live · Fairway360 runs on Scalaro — we build systems that power other systems
          </p>
        </div>
      </section>

      {/* 6 · Don't see your industry */}
      <section className="px-5 py-16">
        <div
          className="relative mx-auto max-w-[900px] overflow-hidden rounded-[28px] p-9 text-center md:p-14"
          style={{
            border: "1px solid transparent",
            backgroundImage: "linear-gradient(var(--surface),var(--surface)),var(--gradient)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box,border-box",
          }}
        >
          <h2 className="font-display text-[clamp(1.5rem,3.4vw,2.625rem)] font-extrabold leading-[1.15] tracking-[-0.03em] text-ink text-balance">
            Don&apos;t see your industry? <span className="gradient-text">We&apos;ve probably solved it.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-faint">
            We&apos;ve built for fintech, manufacturing, SaaS, field services, education, hospitality and
            consumer platforms — the patterns transfer. Book a call and we&apos;ll map a complete operating
            system for your business.
          </p>
          <div className="mx-auto mt-7 grid max-w-[820px] gap-x-4 gap-y-2 sm:grid-cols-3">
            {RANGE_CELLS.map((c) => (
              <span key={c} className="flex min-h-[44px] items-center justify-center border-t border-line font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">
                {c}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
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
