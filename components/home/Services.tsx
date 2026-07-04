"use client";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { SERVICES } from "@/lib/content";

export default function Services() {
  return (
    <section id="services" className="section-gap">
      <div className="container-x">
        <SectionHeading
          eyebrow="What We Build"
          title="Services"
          subtitle="Six pillars of autonomous intelligence that transform how businesses operate in the digital age."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <ScrollReveal key={service.slug} delay={(i % 3) * 0.08}>
              <Link
                href={`/services/#${service.slug}`}
                className="glow-card group flex h-full flex-col"
              >
                <div
                  className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${
                    service.accent === "cyan"
                      ? "bg-cyan/10 shadow-glow-cyan"
                      : "bg-violet/10 shadow-glow-violet"
                  }`}
                  aria-hidden="true"
                >
                  {service.icon}
                </div>
                <div className="flex items-baseline justify-between gap-2">
                  <h3
                    className={`font-display text-2xl font-bold ${
                      service.accent === "cyan" ? "text-cyan" : "text-violet"
                    }`}
                  >
                    {service.title}
                  </h3>
                  <span className="whitespace-nowrap text-sm font-semibold text-faint">
                    from {service.startingPrice}
                  </span>
                </div>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">
                  {service.short}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`rounded-full border px-3 py-1 text-xs font-medium ${
                        service.accent === "cyan"
                          ? "border-cyan/30 bg-cyan/5 text-cyan"
                          : "border-violet/30 bg-violet/5 text-violet"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
