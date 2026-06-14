"use client";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function AuditCTA() {
  return (
    <section className="section-pad">
      <div className="container-x">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl border border-cyan/25 bg-brand-gradient-soft p-10 text-center md:p-16">
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan/10 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-violet/10 blur-3xl"
              aria-hidden="true"
            />
            <p className="eyebrow mb-4">Free · 90 seconds · No email to start</p>
            <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold leading-tight text-ink md:text-5xl">
              What&apos;s your biggest automation opportunity right now?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted">
              Answer 7 questions. Get a personalized report with your #1
              bottleneck, estimated ROI, and the exact system to fix it. Free. 90
              seconds.
            </p>
            <div className="mt-8 flex justify-center">
              <Link href="/audit/" className="btn-primary text-lg">
                Start Free Audit →
              </Link>
            </div>
            <p className="mt-5 text-sm text-faint">
              No email required to start · 47 audits completed this week
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
