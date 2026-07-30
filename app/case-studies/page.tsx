import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import Icon, { type IconName } from "@/components/ui/Icon";
import SectionHead from "@/components/ui/SectionHead";
import BrandLogo from "@/components/ui/BrandLogo";
import JsonLd from "@/components/ui/JsonLd";
import CaseFilter from "@/components/case-studies/CaseFilter";
import HonestyBand from "@/components/case-studies/HonestyBand";
import { pageMetadata } from "@/lib/metadata";
import { caseStudyListSchema, breadcrumbSchema } from "@/lib/schema";
import { CASE_STUDY_DETAILS } from "@/lib/case-studies";
import { PRODUCTS } from "@/lib/services";

export const metadata: Metadata = pageMetadata({
  title: "Case Studies | Real AI Automation Results — Nodevant",
  description:
    "Six deployed AI systems with real numbers: quote-to-cash in 24 hours, 100% of quotes followed up, sub-60-second first response. Named products, live URLs.",
  path: "/case-studies/",
  keywords: [
    "ai automation case studies",
    "workflow automation results",
    "deployed ai systems",
    "ai roi case study",
  ],
});

const HERO_STATS = [
  { value: "6", label: "Platforms live" },
  { value: "100%", label: "Of quotes followed up" },
  { value: "<60s", label: "First-response time" },
];

const TRUST: { icon: IconName; label: string }[] = [
  { icon: "layers", label: "6 platforms live" },
  { icon: "clock", label: "3-year track record" },
  { icon: "external", label: "Named products, real URLs" },
];

export default function CaseStudiesPage() {
  const products = Object.values(PRODUCTS);

  return (
    <>
      <JsonLd
        data={[
          caseStudyListSchema(
            CASE_STUDY_DETAILS.map((c) => ({
              slug: c.slug,
              headline: `${c.heroLead} ${c.gradientWord}`.trim(),
              stackName: c.stackName,
              stackSlug: c.solutionSlug,
            })),
          ),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Case Studies", path: "/case-studies/" },
          ]),
        ]}
      />

      {/* 1 · Hero with big-number bento */}
      <section className="grid-overlay relative overflow-hidden px-5 pb-14 pt-32 md:pt-40">
        <div className="pointer-events-none absolute inset-0 radial-glow" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1280px]">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">
            <Link href="/" className="hover:text-ink">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink">Case Studies</span>
          </nav>
          <p className="eyebrow mt-6">Proof, not promises</p>
          <span className="rule mt-2.5 mb-5 block" />

          <div className="grid max-w-[1000px] gap-3.5 sm:grid-cols-3">
            {HERO_STATS.map((s) => (
              <span key={s.label} className="card block p-[22px]">
                <span className="gradient-text block font-mono text-[clamp(3rem,5.4vw,4.25rem)] font-semibold leading-none tracking-[-0.04em]">
                  {s.value}
                </span>
                <span className="mt-3.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                  {s.label}
                </span>
              </span>
            ))}
          </div>

          <h1 className="mt-8 max-w-[820px] font-display text-[clamp(1.75rem,3.6vw,3rem)] font-extrabold leading-[1.12] tracking-[-0.035em] text-ink text-balance">
            Six systems live in production. Real numbers, real deployments,{" "}
            <span className="gradient-text">real revenue.</span>
          </h1>
          <p className="mt-5 max-w-[620px] text-[17px] leading-relaxed text-faint">
            Skepticism is healthy. Here&apos;s exactly what we built for each business, what it replaced, and
            the measurable outcome it produced.
          </p>

          <div className="mt-7 flex flex-wrap gap-2.5">
            {TRUST.map((t) => (
              <span key={t.label} className="inline-flex items-center gap-2 rounded-full px-3.5 py-2.5 font-mono text-[11px] tracking-[0.05em] text-ink" style={{ background: "var(--tint)", border: "1px solid var(--chip-border)" }}>
                <Icon name={t.icon} className="h-[15px] w-[15px] text-cyan" strokeWidth={1.6} />
                {t.label}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/#audit" className="btn-primary">
              Get My Free Audit
              <Icon name="chevron" className="h-4 w-4" strokeWidth={2.2} />
            </Link>
            <Link href="/solutions/" className="btn-secondary">See the underlying stacks →</Link>
          </div>
        </div>
      </section>

      {/* 2 · Filter band + case grid */}
      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[1280px]">
          <SectionHead
            eyebrow="Filter proof"
            title={<>Find a case that <span className="gradient-text">looks like yours.</span></>}
          />
          <Suspense fallback={<div className="mt-9 min-h-[400px]" aria-hidden="true" />}>
            <CaseFilter cases={CASE_STUDY_DETAILS} />
          </Suspense>
        </div>
      </section>

      {/* 3 · Ecosystem line */}
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
                  className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl font-display text-lg font-extrabold"
                  style={{ background: "var(--surface-2)", border: "1px solid var(--chip-border)" }}
                >
                  <BrandLogo slug={p.key} name={p.name} fallback={p.initial} className="h-full w-full object-cover" />
                </span>
                <span className="text-[13.5px] font-semibold text-ink">{p.name}</span>
              </a>
            ))}
          </div>
          <p className="mt-6 text-center font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">
            Six platforms live · Fairway360 runs on Scalaro — we build systems that power other systems
          </p>
        </div>
      </section>

      {/* 4 · Honesty band */}
      <HonestyBand />

      {/* 5 · CTA band */}
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
          <h2 className="font-display text-[clamp(1.5rem,3.4vw,2.5rem)] font-extrabold leading-[1.12] tracking-[-0.03em] text-ink text-balance">
            Want results <span className="gradient-text">like these?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[16px] leading-relaxed text-faint">
            Every case above started with the same free 90-second audit — seven questions, a personalized
            ROI report, no obligation.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/#audit" className="btn-primary">
              Get My Free Audit
              <Icon name="chevron" className="h-4 w-4" strokeWidth={2.2} />
            </Link>
            <Link href="/contact/" className="btn-secondary">Book a Call</Link>
          </div>
          <p className="mt-[18px] inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">
            <Icon name="shield-check" className="h-[15px] w-[15px] text-cyan" strokeWidth={1.6} />
            No obligations · Just real insights
          </p>
        </div>
      </section>
    </>
  );
}
