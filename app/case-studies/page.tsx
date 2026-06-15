import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import TrustLine from "@/components/ui/TrustLine";
import CTABand from "@/components/ui/CTABand";
import ScrollReveal from "@/components/ui/ScrollReveal";
import JsonLd from "@/components/ui/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { CASE_STUDIES } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title: "Case Studies | Real AI Automation Results — Nodevant",
  description:
    "See how Nodevant's AI automations deliver measurable ROI — from automated lead pipelines to voice AI support agents and real-time data sync. Real clients, real numbers.",
  path: "/case-studies/",
  keywords: [
    "ai automation case studies",
    "workflow automation results",
    "automate lead generation ai",
  ],
});

export default function CaseStudiesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies/" },
        ])}
      />
      <PageHero
        eyebrow="Proof, Not Promises"
        title={
          <>
            Automation that delivered <span className="gradient-text">real numbers</span>
          </>
        }
        subtitle="Skepticism is healthy. Here's exactly what we built, what it replaced, and the measurable results it produced."
      />

      <div className="pb-12">
        <TrustLine />
      </div>

      <section className="pb-8">
        <div className="container-x space-y-8">
          {CASE_STUDIES.map((cs, i) => (
            <ScrollReveal key={cs.slug} delay={(i % 2) * 0.08}>
              <article className="glow-card">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-cyan/30 bg-cyan/5 px-3 py-1 text-xs font-semibold text-cyan">
                    {cs.industry}
                  </span>
                  <span className="text-sm text-faint">{cs.client}</span>
                  <span className="text-sm text-faint">·</span>
                  <span className="text-sm text-faint">{cs.service}</span>
                </div>

                <h2 className="mt-4 font-display text-2xl font-bold text-ink md:text-3xl">
                  {cs.title}
                </h2>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
                      The Challenge
                    </h3>
                    <p className="mt-2 leading-relaxed text-muted">
                      {cs.challenge}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
                      What We Built
                    </h3>
                    <p className="mt-2 leading-relaxed text-muted">
                      {cs.solution}
                    </p>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line">
                  {cs.metrics.map((m) => (
                    <div key={m.label} className="bg-bg-soft p-5 text-center">
                      <div className="gradient-text font-display text-2xl font-bold md:text-3xl">
                        {m.value}
                      </div>
                      <div className="mt-1 text-xs text-faint">{m.label}</div>
                    </div>
                  ))}
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <CTABand title="Want results like these? Start with your free audit." />
    </>
  );
}
