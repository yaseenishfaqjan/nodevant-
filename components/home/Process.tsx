"use client";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { PROCESS } from "@/lib/content";

export default function Process() {
  return (
    <section className="section-pad bg-bg-soft">
      <div className="container-x">
        <SectionHeading
          eyebrow="How It Works"
          title="From bottleneck to automated in four steps"
          subtitle="A transparent, milestone-driven process so you always know exactly what's happening and what's next."
        />

        {/* Process visual */}
        <ScrollReveal>
          <div className="relative mt-14 w-full overflow-hidden rounded-2xl border border-line">
            <Image
              src="/images/process-flow.webp"
              alt="Nodevant AI automation process: Map, Build, Test, Deliver"
              width={1400}
              height={1050}
              priority
              className="h-auto w-full"
            />
          </div>
        </ScrollReveal>

        {/* Supporting step summary */}
        <div className="relative mt-12 grid gap-8 md:grid-cols-4">
          {/* Connecting line */}
          <div
            className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent md:block"
            aria-hidden="true"
          />
          {PROCESS.map((step, i) => (
            <ScrollReveal key={step.step} delay={i * 0.1}>
              <div className="relative text-center md:text-left">
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan/30 bg-bg text-xl shadow-glow-cyan md:mx-0">
                  <span aria-hidden="true">{step.icon}</span>
                </div>
                <div className="mb-2 font-mono text-sm font-medium tracking-wider text-cyan">
                  STEP {step.step}
                </div>
                <h3 className="font-display text-xl font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
