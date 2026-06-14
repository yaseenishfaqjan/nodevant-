import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import CTABand from "@/components/ui/CTABand";
import ScrollReveal from "@/components/ui/ScrollReveal";
import JsonLd from "@/components/ui/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { SOLUTIONS } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title:
    "Industry AI Automation Systems | Nodevant — Turnkey Business Solutions",
  description:
    "Complete AI automation systems built for specific industries — credit repair, manufacturing, SaaS sales, field services, education, and home services. Deployed and proven.",
  path: "/solutions/",
  keywords: [
    "business automation systems by industry",
    "ai automation systems",
    "turnkey business automation",
    "industry automation solutions",
  ],
});

export default function SolutionsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions/" },
        ])}
      />
      <PageHero
        eyebrow="Complete Business Systems"
        title={
          <>
            We don&apos;t just automate tasks. We build entire{" "}
            <span className="gradient-text">operating systems.</span>
          </>
        }
        subtitle="Every system below has been built, deployed, and proven. Not templates — real businesses running on these stacks."
      />

      <section className="pb-8">
        <div className="container-x">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SOLUTIONS.map((s, i) => (
              <ScrollReveal key={s.slug} delay={(i % 3) * 0.08}>
                <Link
                  href={`/solutions/${s.slug}/`}
                  className="glow-card group flex h-full flex-col"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <span
                      className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan/10 text-2xl shadow-glow-cyan"
                      aria-hidden="true"
                    >
                      {s.icon}
                    </span>
                    <span className="rounded-full border border-violet/30 bg-violet/5 px-3 py-1 text-xs font-medium text-violet">
                      {s.tag}
                    </span>
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-faint">
                    {s.industry}
                  </p>
                  <h2 className="mt-1 font-display text-xl font-bold text-ink transition-colors group-hover:text-cyan">
                    {s.title}
                  </h2>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">
                    {s.short}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-sm">
                    <span className="text-faint">{s.timeline}</span>
                    <span className="font-semibold text-cyan">
                      View System →
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Don't see your industry? We've probably solved it."
        subtitle="Book a call and we'll map a complete operating system for your business — or take the free audit to find your highest-ROI starting point."
      />
    </>
  );
}
