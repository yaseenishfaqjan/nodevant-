import Link from "next/link";
import Icon, { type IconName } from "@/components/ui/Icon";
import SectionHead from "@/components/ui/SectionHead";
import FinalCTA from "@/components/home/FinalCTA";
import type { MetroLocation } from "@/lib/locations";
import { METRO_LOCATIONS } from "@/lib/locations";
import { SITE } from "@/lib/site";

const BUILDS: { icon: IconName; title: string; text: string; href: string }[] = [
  {
    icon: "phone",
    title: "AI receptionist",
    text: "Answers the call, books the appointment, and writes the lead into the CRM — including after hours.",
    href: "/solutions/ai-receptionist/",
  },
  {
    icon: "truck",
    title: "Field and route software",
    text: "Lawn, roofing, HVAC, pest, and other home-service stacks. Lead, visit, and invoice in one build.",
    href: "/products/",
  },
  {
    icon: "gear",
    title: "Workflow automation",
    text: "Intake, scheduling, follow-up, and the back-office steps that currently wait on a person.",
    href: "/services/",
  },
  {
    icon: "brain",
    title: "A custom build",
    text: "When none of the named stacks fit. Scoped on the audit, priced before anyone writes code.",
    href: "/audit/",
  },
];

export default function MetroLocationPage({ metro }: { metro: MetroLocation }) {
  const others = METRO_LOCATIONS.filter((item) => item.slug !== metro.slug);

  return (
    <>
      <section className="relative overflow-hidden px-5 pt-[clamp(88px,12vw,132px)]">
        <div className="grid-overlay" aria-hidden="true" />
        <div className="relative mx-auto max-w-[860px] text-center">
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center justify-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">
            <Link href="/" className="hover:text-ink">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/locations/" className="hover:text-ink">Locations</Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink">{metro.label}</span>
          </nav>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">{metro.eyebrow}</p>
          <h1 className="mx-auto mt-4 max-w-[780px] font-display text-[clamp(2rem,5vw,3.4rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink">
            {metro.heroLead} <span className="gradient-text">{metro.gradientWord}.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[680px] text-[clamp(1rem,1.6vw,1.125rem)] font-medium leading-relaxed text-ink">
            {metro.definition}
          </p>
          <p className="mx-auto mt-4 max-w-[640px] text-[15px] leading-relaxed text-faint">
            Headquarters stays at {SITE.address.street}, {SITE.address.city}, {SITE.address.region}{" "}
            {SITE.address.postal}. US companies are the market. There is no second office in {metro.schemaCity}.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/audit/" className="btn-primary" style={{ minHeight: 54 }}>
              Get my free audit
              <Icon name="chevron" className="h-4 w-4" strokeWidth={2.2} />
            </Link>
            <Link href="/contact/" className="btn-secondary" style={{ minHeight: 54 }}>
              Send us a message
            </Link>
          </div>
        </div>
      </section>

      <section className="section-gap px-5">
        <div className="mx-auto max-w-[860px]">
          <h2 className="font-display text-[clamp(1.4rem,2.4vw,1.85rem)] font-extrabold tracking-[-0.03em] text-ink">
            Why {metro.label} companies look this up
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-body">{metro.localContext}</p>
        </div>
      </section>

      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[1180px]">
          <SectionHead
            eyebrow="What we build"
            title={<>The same systems, <span className="gradient-text">for {metro.label}.</span></>}
            subtitle="Nothing on this page is a local package. These are the stacks a US company can buy, delivered remotely."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {BUILDS.map((build) => (
              <Link key={build.title} href={build.href} className="card card-hover p-6 text-body">
                <span className="chip flex h-[42px] w-[42px] items-center justify-center">
                  <Icon name={build.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-[17px] font-extrabold tracking-[-0.02em] text-ink">
                  {build.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-faint">{build.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[1180px]">
          <SectionHead
            eyebrow="Service area"
            title={<>Where we <span className="gradient-text">actually work.</span></>}
            subtitle="The neighborhoods are the metro a buyer means. The delivery is remote from Georgia, for these cities and for the rest of the United States."
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {metro.areas.map((area) => (
              <div key={area} className="flex items-start gap-3 rounded-2xl border border-line bg-bg p-5">
                <span className="chip flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center">
                  <Icon name="pin" className="h-[18px] w-[18px]" />
                </span>
                <p className="text-[15px] leading-relaxed text-body">{area}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[14.5px] leading-relaxed text-faint">
            Also serving{" "}
            <Link href="/locations/atlanta-ai-automation-agency/" className="font-semibold text-cyan">Atlanta</Link>
            {others.map((item) => (
              <span key={item.slug}>
                ,{" "}
                <Link href={`/locations/${item.slug}/`} className="font-semibold text-cyan">{item.label}</Link>
              </span>
            ))}
            . The Atlanta page is the headquarters metro. The others are remote service areas.
          </p>
        </div>
      </section>

      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[820px]">
          <SectionHead
            eyebrow="Questions"
            title={<>{metro.label}, <span className="gradient-text">answered plainly.</span></>}
          />
          <dl className="mt-10 divide-y divide-line">
            {metro.faqs.map((faq) => (
              <div key={faq.q} className="py-6 first:pt-0">
                <dt className="font-display text-[17px] font-extrabold tracking-[-0.02em] text-ink">{faq.q}</dt>
                <dd className="mt-2.5 text-[15px] leading-[1.75] text-faint">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
