"use client";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function FinalCTA() {
  return (
    <section className="section-gap">
      <div className="container-x">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-bg-soft p-12 text-center md:p-20">
            <div className="absolute inset-0 radial-glow" aria-hidden="true" />
            <div className="relative z-10">
              <p className="eyebrow mb-4">Ready when you are</p>
              <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold leading-tight text-ink md:text-5xl">
                Let&apos;s build the system that gives your team its time back
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
                Book a free 30-minute strategy call. We&apos;ll map your biggest
                opportunity and show you exactly what to automate first.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/contact/" className="btn-primary text-lg">
                  Book a Call →
                </Link>
                <Link href="/audit/" className="btn-secondary text-lg">
                  Take the Free Audit
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
