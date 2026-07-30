import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import Icon, { type IconName } from "@/components/ui/Icon";
import JsonLd from "@/components/ui/JsonLd";
import NewsletterForm from "@/components/blog/NewsletterForm";
import BuildLogClient from "@/components/build/BuildLogClient";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "Public Build Log — We Ship in Public, Every Week | Nodevant",
  description:
    "What Nodevant deployed, fixed and shipped across six live platforms and client work — real dates, real timestamps, no marketing spin. Updated weekly.",
  path: "/build/",
  keywords: [
    "nodevant build log",
    "ship in public",
    "ai automation changelog",
    "deployment log",
  ],
});

const HERO_STATS = [
  { value: "52", label: "Weeks tracked" },
  { value: "61", label: "Deployments this quarter" },
  { value: "4.7", label: "Avg ships per week" },
];

const TRUST: { icon: IconName; label: string }[] = [
  { icon: "check", label: "Real deployments" },
  { icon: "clock", label: "Real timestamps" },
  { icon: "shield", label: "Zero marketing spin" },
  { icon: "layers", label: "6 platforms + client work" },
];

export default function BuildLogPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Build Log", path: "/build/" },
        ])}
      />

      {/* Hero */}
      <section className="grid-overlay relative overflow-hidden px-5 pb-16 pt-28 md:pt-[110px]">
        <div className="pointer-events-none absolute -top-36 left-1/2 h-[380px] w-[560px] -translate-x-[70%] rounded-full bg-cyan opacity-[0.06] blur-[120px]" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-20 -top-32 h-[360px] w-[480px] rounded-full bg-violet opacity-[0.06] blur-[120px]" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1200px]">
          <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-faint">Public build log · Updated weekly</span>
          <div aria-hidden="true" className="my-3 h-0.5 w-6 rounded-full" style={{ background: "var(--gradient)" }} />
          <h1 className="font-display text-[clamp(2.1rem,5.4vw,4.25rem)] font-extrabold leading-[1.04] tracking-[-0.04em] text-ink">
            We ship in public. <span className="gradient-text">Every week.</span>
          </h1>
          <p className="mt-5 max-w-[620px] text-[18px] leading-relaxed text-faint text-pretty">
            This is what we deployed, fixed, and shipped across our own platforms and client engagements. Real work,
            real dates, no marketing spin. If a competitor tells you they ship fast, ask for their log.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-9 gap-y-3.5">
            {HERO_STATS.map((s) => (
              <span key={s.label} className="flex items-baseline gap-2.5">
                <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-faint">{s.label}</span>
                <span className="gradient-text font-mono text-[22px] font-medium">{s.value}</span>
              </span>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            {TRUST.map((t) => (
              <span key={t.label} className="card flex items-center gap-2.5 px-3.5 py-2 text-[13.5px] font-medium text-body">
                <span className="chip h-[22px] w-[22px]"><Icon name={t.icon} className="h-3 w-3" /></span>
                {t.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Filter + timeline */}
      <section aria-label="Build log timeline" className="px-5 pb-[72px]">
        <div className="mx-auto max-w-[1200px]">
          <Suspense fallback={<div className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">Loading log…</div>}>
            <BuildLogClient />
          </Suspense>
        </div>
      </section>

      {/* Subscribe */}
      <section aria-label="Subscribe to the build log" className="px-5 pb-[88px]">
        <div className="mx-auto max-w-[1200px]">
          <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-faint">Subscribe</span>
          <div aria-hidden="true" className="my-3 h-0.5 w-6 rounded-full" style={{ background: "var(--gradient)" }} />
          <h2 className="mb-6 font-display text-[clamp(1.6rem,3.6vw,2.75rem)] font-extrabold tracking-[-0.03em] text-ink">
            Get the log <span className="gradient-text">delivered.</span>
          </h2>
          <div className="card p-7">
            <NewsletterForm sourcePage="build-log" />
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
              <a href="/build-feed.xml" className="font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-cyan transition-colors hover:text-violet">RSS ↗</a>
              <a href="/build.ics" className="font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-cyan transition-colors hover:text-violet">.ICS ↗</a>
              <p className="basis-full font-mono text-[10.5px] font-medium uppercase tracking-[0.12em] text-faint">Add to your reader. This log fires when we ship, not on a schedule.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section aria-label="Get started" className="section-gap border-t border-line px-5 text-center" style={{ borderTopWidth: 2, borderImage: "linear-gradient(100deg, var(--accent-1), var(--accent-2)) 1" }}>
        <div className="mx-auto max-w-[720px]">
          <h2 className="font-display text-[clamp(1.6rem,3.6vw,2.75rem)] font-extrabold tracking-[-0.03em] text-ink">
            Want to see this cadence on <span className="gradient-text">YOUR business?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[15px] leading-relaxed text-faint text-pretty">
            The teams we work with ship weekly, not quarterly. The audit shows you where to start.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3.5">
            <Link href="/audit/" className="btn-primary">Get My Free Audit <Icon name="chevron" className="h-[15px] w-[15px]" strokeWidth={2.2} /></Link>
            <Link href="/case-studies/" className="btn-secondary">Read our case studies <Icon name="chevron" className="h-[15px] w-[15px]" strokeWidth={2.2} /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
