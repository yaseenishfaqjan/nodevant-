import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import TrustLine from "@/components/ui/TrustLine";
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

      <div className="pb-12">
        <TrustLine />
      </div>

      <section className="pb-8">
        <div className="container-x space-y-6">
          {SERVICES.map((service, i) => (
            <ScrollReveal key={service.slug} delay={(i % 2) * 0.08}>
              <article
                id={service.slug}
                className="glow-card scroll-mt-28 overflow-hidden !p-0"
              >
                {/* Image header with overlay */}
                <div className="relative h-[260px] w-full overflow-hidden">
                  <Image
                    src={service.image}
                    alt={`${service.title} — ${service.short.slice(0, 70)}`}
                    fill
                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
                  <div className="absolute bottom-5 left-6 right-6">
                    <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.25em] text-cyan">
                      Nodevant · AI Automation
                    </p>
                    <h2 className="font-display text-2xl font-bold tracking-tight text-white">
                      {service.title}
                    </h2>
                    <p className="mt-0.5 text-sm text-cyan/80">
                      {service.tagline}
                    </p>
                  </div>
                  <div className="absolute right-4 top-4 rounded-lg bg-black/40 px-3 py-1 backdrop-blur-sm">
                    <span className="font-mono text-xs text-white/70">
                      from {service.startingPrice}
                    </span>
                  </div>
                </div>

                {/* Detail body */}
                <div className="p-7">
                  <p className="max-w-2xl leading-relaxed text-muted">
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
