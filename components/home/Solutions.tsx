"use client";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { SOLUTIONS } from "@/lib/content";

export default function Solutions() {
  return (
    <section id="solutions" className="section-pad bg-bg-soft">
      <div className="container-x">
        <SectionHeading
          eyebrow="Turnkey Industry Solutions"
          title="Complete Business Systems"
          subtitle="Not just automations — full AI-powered operating systems built and proven for specific industries."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                <h3 className="mt-1 font-display text-xl font-bold text-ink transition-colors group-hover:text-cyan">
                  {s.title}
                </h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">
                  {s.short}
                </p>
                <span className="mt-5 text-sm font-semibold text-cyan">
                  View System →
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/solutions/" className="btn-ghost">
            Explore all industry systems →
          </Link>
        </div>
      </div>
    </section>
  );
}
