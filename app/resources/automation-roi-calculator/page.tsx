import Link from "next/link";
import Icon from "@/components/ui/Icon";
import SectionHead from "@/components/ui/SectionHead";
import FinalCTA from "@/components/home/FinalCTA";
import JsonLd from "@/components/ui/JsonLd";
import RoiCalculator from "@/components/resources/RoiCalculator";
import { pageMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";
import { faqPageSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata = pageMetadata({
  title: "AI Automation ROI Calculator — See What an AI Workforce Recovers | Nodevant",
  description:
    "Free AI automation ROI calculator. Enter your missed calls, customer value and repetitive hours, and see the revenue you'd recover, the hours you'd reclaim, and how many full-time employees an AI workforce replaces — instantly, no email required.",
  path: "/resources/automation-roi-calculator/",
  keywords: [
    "ai automation roi calculator",
    "automation roi calculator",
    "ai workforce roi",
    "workflow automation roi",
    "how many employees can ai replace",
    "ai automation savings calculator",
  ],
});

const FAQS: { q: string; a: string }[] = [
  {
    q: "How does the AI automation ROI calculator work?",
    a: "Enter how many calls or leads you miss weekly, your average customer value, and the hours your team spends on repetitive work. It instantly estimates the revenue you'd recover, the hours an AI workforce reclaims, and how many full-time employees that equals — using published lead-response benchmarks.",
  },
  {
    q: "How many employees can AI realistically replace?",
    a: "AI rarely replaces a whole person, but it removes the repetitive share of many roles — answering calls, following up, scheduling, data entry. The calculator expresses reclaimed hours as full-time-equivalents so you can see, for example, that automating 20 hours a week is roughly 0.9 of a full-time employee.",
  },
  {
    q: "What is a realistic ROI for AI automation?",
    a: "Most small-business automations pay back in weeks, not months, because the recovered revenue from answered leads plus reclaimed labor usually dwarfs the one-time build. This calculator shows your payback period against Nodevant's starting price; the free 90-second audit returns exact numbers for your business.",
  },
  {
    q: "Are these numbers guaranteed?",
    a: "No — they're directional estimates from your inputs and published benchmarks, meant to size the opportunity, not quote a result. Recovered revenue assumes a 15% close rate on answered leads and that automation reclaims 80% of the repetitive hours you enter. Your real figures come from the audit.",
  },
];

function CalculatorJsonLd() {
  const url = `${SITE.url}/resources/automation-roi-calculator/`;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "AI Automation ROI Calculator",
          url,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Any",
          description:
            "Free interactive calculator that estimates the revenue recovered, hours reclaimed and full-time-employee equivalent of replacing repetitive work with an AI workforce.",
          offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
          provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
        }}
      />
      <JsonLd data={faqPageSchema(FAQS)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources/automation-roi-calculator/" },
          { name: "ROI Calculator", path: "/resources/automation-roi-calculator/" },
        ])}
      />
    </>
  );
}

export default function RoiCalculatorPage() {
  return (
    <>
      <CalculatorJsonLd />

      {/* Hero */}
      <section className="relative overflow-hidden px-5 pt-[clamp(88px,12vw,132px)]">
        <div className="grid-overlay" aria-hidden="true" />
        <div className="relative mx-auto max-w-[860px] text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
            Free tool · no email required
          </p>
          <h1 className="mx-auto mt-4 max-w-[780px] font-display text-[clamp(2rem,5vw,3.4rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink">
            What would an AI workforce <span className="gradient-text">recover for you?</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[620px] text-[clamp(1rem,1.6vw,1.1875rem)] leading-relaxed text-faint">
            Three sliders. See the revenue you&apos;d recover, the hours you&apos;d
            reclaim, and how many full-time employees an AI workforce replaces —
            instantly.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="px-5 pt-10">
        <div className="mx-auto max-w-[1080px]">
          <RoiCalculator />
        </div>
      </section>

      {/* Reframe: hiring → AI workers */}
      <section className="section-gap px-5">
        <div className="mx-auto max-w-[1180px]">
          <SectionHead
            eyebrow="The shift"
            title={<>Stop hiring for <span className="gradient-text">repetitive work.</span></>}
            subtitle="The work that eats your team's day — answering, following up, scheduling, logging — is exactly what an AI workforce does 24/7, without payroll, turnover or training."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { icon: "phone", h: "Never miss a lead", t: "Every call and enquiry answered in seconds, day or night — the revenue that used to leak to voicemail." },
              { icon: "refresh", h: "Reclaim the busywork", t: "Follow-ups, scheduling and data entry run themselves, giving your team its hours back for real work." },
              { icon: "brain", h: "Scale without headcount", t: "Add capacity by adding AI workers, not employees — margins stay high as volume grows." },
            ].map((c) => (
              <div key={c.h} className="card p-6">
                <span className="chip flex h-[42px] w-[42px] items-center justify-center">
                  <Icon name={c.icon as "phone"} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-[17px] font-extrabold tracking-[-0.02em] text-ink">
                  {c.h}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-faint">{c.t}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-2.5">
            <Link href="/solutions/ai-receptionist/" className="btn-secondary" style={{ minHeight: 46 }}>
              AI receptionist
              <Icon name="chevron" className="h-3.5 w-3.5" strokeWidth={2.2} />
            </Link>
            <Link href="/pricing/ai-voice-agent-cost/" className="btn-secondary" style={{ minHeight: 46 }}>
              What it costs
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[820px]">
          <SectionHead
            eyebrow="Questions"
            title={<>ROI, <span className="gradient-text">answered.</span></>}
          />
          <dl className="mt-10 divide-y divide-line">
            {FAQS.map((f) => (
              <div key={f.q} className="py-6 first:pt-0">
                <dt className="font-display text-[17px] font-extrabold tracking-[-0.02em] text-ink">
                  {f.q}
                </dt>
                <dd className="mt-2.5 text-[15px] leading-[1.75] text-faint">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
