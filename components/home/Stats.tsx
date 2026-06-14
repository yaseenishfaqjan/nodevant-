"use client";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CounterNumber from "@/components/ui/CounterNumber";
import { STATS } from "@/lib/content";

export default function Stats() {
  return (
    <section className="section-pad">
      <div className="container-x">
        <div className="rounded-3xl border border-line bg-bg-soft p-10 md:p-16">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <div className="gradient-text font-display text-5xl font-bold md:text-6xl">
                    <CounterNumber value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="mt-3 text-sm font-medium uppercase tracking-wider text-faint">
                    {stat.label}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
