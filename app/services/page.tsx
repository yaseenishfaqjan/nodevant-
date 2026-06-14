import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import CTABand from "@/components/ui/CTABand";
import ScrollReveal from "@/components/ui/ScrollReveal";
import JsonLd from "@/components/ui/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { serviceListSchema, breadcrumbSchema } from "@/lib/schema";
import { SERVICES } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title:
    "AI Automation Services | Workflow Automation & AI Agents — Nodevant",
  description:
    "Explore Nodevant's AI automation services — agentic workflows, AI voice agents, system integration, lead gen pipelines, and custom AI solutions. Tools, timelines, and pricing included.",
  path: "/services/",
  keywords: [
    "ai automation services",
    "workflow automation agency",
    "ai agents for business",
    "n8n automation agency",
  ],
});

export default function ServicesPage() {
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
      <PageHero
        eyebrow="Our Services"
        title={
          <>
            AI automation <span className="gradient-text">that pays for itself</span>
          </>
        }
        subtitle="Six focused services that eliminate busywork, connect your tools, and put revenue-generating tasks on autopilot. Every engagement starts with a free audit."
      />

      <section className="pb-8">
        <div className="container-x space-y-6">
          {SERVICES.map((service, i) => (
            <ScrollReveal key={service.slug} delay={(i % 2) * 0.08}>
              <article
                id={service.slug}
                className="glow-card scroll-mt-28 md:flex md:items-start md:gap-8"
              >
                <div
                  className={`mb-6 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl text-3xl md:mb-0 ${
                    service.accent === "cyan"
                      ? "bg-cyan/10 shadow-glow-cyan"
                      : "bg-violet/10 shadow-glow-violet"
                  }`}
                  aria-hidden="true"
                >
                  {service.icon}
                </div>
                <div className="flex-1">
                  <h2
                    className={`font-display text-2xl font-bold md:text-3xl ${
                      service.accent === "cyan" ? "text-cyan" : "text-violet"
                    }`}
                  >
                    {service.title}
                  </h2>
                  <p className="mt-3 max-w-2xl leading-relaxed text-muted">
                    {service.long}
                  </p>

                  <div className="mt-6 grid gap-5 sm:grid-cols-3">
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
                        Tools
                      </h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {service.tools.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-line bg-white/[0.03] px-3 py-1 text-xs text-muted"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
                        Timeline
                      </h3>
                      <p className="mt-2 font-display text-lg font-semibold text-ink">
                        {service.timeline}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
                        Starting price
                      </h3>
                      <p className="mt-2 font-display text-lg font-semibold text-ink">
                        {service.startingPrice}
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/audit/"
                    className="mt-6 inline-block text-sm font-semibold text-cyan hover:underline"
                  >
                    See if this is your #1 opportunity →
                  </Link>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <CTABand />
    </>
  );
}
