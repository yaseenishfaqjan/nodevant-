import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import JsonLd from "@/components/ui/JsonLd";
import { COMPARISON_PAGES } from "@/lib/comparisons";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "Software Comparisons for US Buyers | Nodevant",
  description:
    "Honest comparisons for US buyers: lawn care software vs Jobber, field service software vs ServiceTitan, credit repair CRMs, and an AI receptionist vs an answering service.",
  path: "/compare/",
  keywords: [
    "lawn care software vs jobber",
    "servicetitan alternative",
    "credit repair crm",
    "ai receptionist vs answering service",
  ],
});

export default function CompareHubPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Compare", path: "/compare/" },
        ])}
      />
      <section className="grid-overlay relative overflow-hidden px-5 pb-14 pt-32 md:pt-40">
        <div className="pointer-events-none absolute inset-0 radial-glow" aria-hidden="true" />
        <div className="relative mx-auto max-w-[860px]">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">
            <Link href="/" className="hover:text-ink">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink">Compare</span>
          </nav>
          <p className="eyebrow mt-6">Commercial comparisons</p>
          <span className="rule mt-2.5 mb-4 block" />
          <h1 className="font-display text-[clamp(2rem,4.6vw,3.4rem)] font-extrabold leading-[1.08] tracking-[-0.04em] text-ink text-balance">
            Compare the stack to the <span className="gradient-text">software you already know.</span>
          </h1>
          <p className="mt-5 text-[17px] leading-relaxed text-body">
            These pages are for US buyers choosing between a product they can subscribe to and a system Nodevant builds. Prices are cited from the vendor&apos;s own page where one exists. Where a vendor does not publish a price, we say that.
          </p>
        </div>
      </section>
      <section className="section-gap border-t border-line px-5" aria-label="Comparisons">
        <div className="mx-auto grid max-w-[1080px] gap-4">
          {COMPARISON_PAGES.map((page) => (
            <article key={page.slug} className="card p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">{page.eyebrow}</p>
              <h2 className="mt-2 font-display text-[22px] font-extrabold tracking-[-0.03em] text-ink">
                <Link href={`/compare/${page.slug}/`} className="hover:text-cyan">{page.name}</Link>
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-faint">{page.definition}</p>
              <Link href={`/compare/${page.slug}/`} className="btn-secondary mt-5">
                Read the comparison
                <Icon name="chevron" className="h-4 w-4" strokeWidth={2.2} />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
