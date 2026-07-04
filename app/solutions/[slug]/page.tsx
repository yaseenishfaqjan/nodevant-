import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import JsonLd from "@/components/ui/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";
import { SOLUTIONS } from "@/lib/content";

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }));
}

function getSolution(slug: string) {
  return SOLUTIONS.find((s) => s.slug === slug);
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const s = getSolution(params.slug);
  if (!s)
    return pageMetadata({ title: "Solution", description: "", path: "/solutions/" });
  return pageMetadata({
    title: s.metaTitle,
    description: `${s.short} A complete, deployed AI automation system for ${s.industry.toLowerCase()}.`,
    path: `/solutions/${s.slug}/`,
    keywords: [
      `${s.industry.toLowerCase()} automation`,
      "ai automation system",
      s.tag.toLowerCase(),
    ],
  });
}

function serviceSchema(slug: string) {
  const s = getSolution(slug)!;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.short,
    serviceType: `${s.industry} automation system`,
    url: `${SITE.url}/solutions/${s.slug}/`,
    provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
    areaServed: "Worldwide",
    offers: {
      "@type": "Offer",
      price: s.investment.replace(/[^0-9]/g, ""),
      priceCurrency: "USD",
    },
  };
}

export default function SolutionPage({
  params,
}: {
  params: { slug: string };
}) {
  const s = getSolution(params.slug);
  if (!s) notFound();

  return (
    <>
      <JsonLd
        data={[
          serviceSchema(params.slug),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Solutions", path: "/solutions/" },
            { name: s.title, path: `/solutions/${s.slug}/` },
          ]),
        ]}
      />

      <PageHero
        eyebrow={`${s.industry} · ${s.tag}`}
        title={
          <>
            <span className="mr-3" aria-hidden="true">
              {s.icon}
            </span>
            {s.title}
          </>
        }
        subtitle={s.short}
      />

      <section className="pb-8">
        <div className="container-x">
          <div className="mx-auto max-w-4xl space-y-6">
            {/* Intro */}
            <ScrollReveal>
              <p className="text-lg leading-relaxed text-muted">{s.intro}</p>
            </ScrollReveal>

            {/* Full image */}
            <ScrollReveal>
              <div className="overflow-hidden rounded-2xl border border-line">
                <Image
                  src={s.image}
                  alt={`${s.title} — ${s.industry} automation by Nodevant`}
                  width={1400}
                  height={1045}
                  priority
                  className="h-auto w-full"
                />
              </div>
            </ScrollReveal>

            {/* Problem */}
            <ScrollReveal>
              <div className="glow-card">
                <h2 className="eyebrow mb-3">The Problem</h2>
                <p className="text-lg leading-relaxed text-muted">{s.problem}</p>
              </div>
            </ScrollReveal>

            {/* What's included */}
            <ScrollReveal>
              <div className="glow-card">
                <h2 className="font-display text-2xl font-bold text-ink">
                  What&apos;s Included
                </h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {s.included.map((item) => (
                    <li key={item} className="flex gap-3 text-[15px] text-muted">
                      <span className="mt-0.5 text-cyan" aria-hidden="true">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* How it works */}
            <ScrollReveal>
              <div className="glow-card">
                <h2 className="font-display text-2xl font-bold text-ink">
                  How it works
                </h2>
                <ol className="mt-5 space-y-4">
                  {s.workflow.map((step, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-cyan/40 bg-cyan/5 font-display text-sm font-bold text-cyan">
                        {i + 1}
                      </span>
                      <span className="pt-1 text-[15px] leading-relaxed text-muted">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </ScrollReveal>

            {/* Results */}
            <ScrollReveal>
              <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line">
                {s.results.map((r) => (
                  <div key={r.label} className="bg-bg-soft p-6 text-center">
                    <div className="gradient-text font-display text-2xl font-bold md:text-3xl">
                      {r.value}
                    </div>
                    <div className="mt-1 text-xs text-faint">{r.label}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Tech stack + investment */}
            <ScrollReveal>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="glow-card">
                  <h2 className="font-display text-xl font-bold text-ink">
                    Tech Stack
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {s.techStack.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-line bg-white/[0.03] px-3 py-1 text-xs text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="glow-card">
                  <h2 className="font-display text-xl font-bold text-ink">
                    Timeline &amp; Investment
                  </h2>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-faint">Timeline</span>
                      <div className="mt-0.5 font-display text-lg font-semibold text-ink">
                        {s.timeline}
                      </div>
                    </div>
                    <div>
                      <span className="text-faint">Investment</span>
                      <div className="mt-0.5 font-display text-lg font-semibold text-ink">
                        {s.investment}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* CTA */}
            <ScrollReveal>
              <div className="relative overflow-hidden rounded-3xl border border-cyan/25 bg-brand-gradient-soft p-10 text-center">
                <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
                  Want this system built for your business?
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-muted">
                  Book a free strategy call to scope it, or take the 90-second
                  audit to see your highest-ROI starting point.
                </p>
                <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Link href="/contact/?from=solutions" className="btn-primary text-lg">
                    Book a Call →
                  </Link>
                  <Link href="/audit/" className="btn-secondary text-lg">
                    Take the Free Audit
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <div className="text-center">
              <Link
                href="/solutions/"
                className="text-sm font-semibold text-cyan hover:underline"
              >
                ← All industry systems
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
