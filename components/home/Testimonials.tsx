"use client";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { TESTIMONIALS } from "@/lib/content";

export default function Testimonials() {
  return (
    <section className="section-pad bg-bg-soft">
      <div className="container-x">
        <SectionHeading
          eyebrow="Proof, Not Promises"
          title="Teams that stopped doing it manually"
          subtitle="The agencies, retailers, and ops teams who let automation carry the busywork."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 0.1}>
              <figure className="glow-card flex h-full flex-col">
                <div className="mb-4 text-cyan" aria-hidden="true">
                  {"★★★★★"}
                </div>
                <blockquote className="flex-1 text-[15px] leading-relaxed text-ink">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-gradient font-display text-sm font-bold text-bg">
                    {t.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-ink">
                      {t.name}
                    </span>
                    <span className="block text-xs text-faint">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
