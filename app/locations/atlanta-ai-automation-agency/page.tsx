import Link from "next/link";
import Icon, { type IconName } from "@/components/ui/Icon";
import SectionHead from "@/components/ui/SectionHead";
import FinalCTA from "@/components/home/FinalCTA";
import JsonLd from "@/components/ui/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";
import { localBusinessSchema, faqPageSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata = pageMetadata({
  title:
    "AI Automation Agency in Atlanta & McDonough, GA | Nodevant",
  description:
    "Nodevant is an AI automation agency based in McDonough, GA (Henry County), serving Atlanta-metro businesses and clients worldwide. AI agents, voice AI receptionists and workflow automation — built and run by the same team. Start with a free 90-second audit.",
  path: "/locations/atlanta-ai-automation-agency/",
  keywords: [
    "ai automation agency atlanta",
    "ai automation agency near me",
    "ai automation agency mcdonough ga",
    "ai automation agency henry county",
    "ai agency atlanta",
    "ai voice agent agency atlanta",
  ],
});

const BUILDS: { icon: IconName; title: string; text: string }[] = [
  { icon: "phone", title: "AI voice receptionists", text: "Answer every call 24/7, book appointments and log leads — for local service businesses that lose money on missed calls." },
  { icon: "funnel", title: "Lead-gen pipelines", text: "Source, qualify and follow up with leads automatically, so your team spends its time closing, not chasing." },
  { icon: "gear", title: "Workflow automation", text: "The repetitive back-office work — intake, scheduling, invoicing, follow-up — run without a person in the loop." },
  { icon: "brain", title: "Custom AI agents", text: "Agents that reason and act end-to-end on your specific process, built on your data and owned by you." },
];

const AREA: string[] = [
  "McDonough & Henry County",
  "Atlanta metro (Fulton, DeKalb, Gwinnett, Clayton, Fayette)",
  "Stockbridge · Locust Grove · Hampton · Griffin",
  "Remote across the US, UK, Canada & Australia",
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "Is there an AI automation agency near me in Atlanta?",
    a: "Yes. Nodevant is an AI automation agency based in McDonough, GA, in Henry County just south of Atlanta. We build AI agents, voice AI receptionists and workflow automation for Atlanta-metro businesses, and work remotely with clients across the US, UK, Canada and Australia.",
  },
  {
    q: "Do you work with small businesses in the Atlanta area?",
    a: "Yes — small and growth-stage businesses are our focus. Every engagement starts with a free 90-second automation audit that shows your single biggest opportunity and its estimated ROI before you commit, so a small team can see the payback before spending anything.",
  },
  {
    q: "Do I need to be located in Atlanta to work with Nodevant?",
    a: "No. We're rooted in McDonough, GA but deliver remote-first, so location doesn't matter for the work. Local Atlanta-metro clients can meet in person; everyone else works with us over calls and screen-shares — the same senior team either way.",
  },
  {
    q: "Where is Nodevant based and how do I reach you?",
    a: `Nodevant is at ${SITE.address.street}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.postal}. Call ${SITE.phone} or email ${SITE.email}. The fastest start is the free 90-second audit on our site, which maps your highest-ROI automation before any call.`,
  },
];

function LocationJsonLd() {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <JsonLd data={faqPageSchema(FAQS)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations/atlanta-ai-automation-agency/" },
          { name: "Atlanta & McDonough, GA", path: "/locations/atlanta-ai-automation-agency/" },
        ])}
      />
    </>
  );
}

export default function AtlantaLocationPage() {
  return (
    <>
      <LocationJsonLd />

      {/* Hero */}
      <section className="relative overflow-hidden px-5 pt-[clamp(88px,12vw,132px)]">
        <div className="grid-overlay" aria-hidden="true" />
        <div className="relative mx-auto max-w-[860px] text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
            McDonough, GA · serving the Atlanta metro
          </p>
          <h1 className="mx-auto mt-4 max-w-[780px] font-display text-[clamp(2rem,5vw,3.4rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink">
            AI automation agency in <span className="gradient-text">Atlanta &amp; McDonough, GA.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[640px] text-[clamp(1rem,1.6vw,1.1875rem)] leading-relaxed text-faint">
            We build AI agents, voice AI receptionists and workflow automation for
            Atlanta-metro businesses — from our base in Henry County — and run them
            for clients worldwide. The person who sells you the automation is the
            same person who ships it.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/audit/" className="btn-primary" style={{ minHeight: 54 }}>
              Get my free 90-second audit
              <Icon name="chevron" className="h-4 w-4" strokeWidth={2.2} />
            </Link>
            <a href={`tel:${SITE.phoneRaw}`} className="btn-secondary" style={{ minHeight: 54 }}>
              Call {SITE.phone}
            </a>
          </div>
        </div>
      </section>

      {/* What we build locally */}
      <section className="section-gap px-5">
        <div className="mx-auto max-w-[1180px]">
          <SectionHead
            eyebrow="What we build"
            title={<>Automation for <span className="gradient-text">Atlanta businesses.</span></>}
            subtitle="The same systems that run six of our own platforms — scaled down and built for local service businesses, agencies and growth-stage teams."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {BUILDS.map((b) => (
              <div key={b.title} className="card p-6">
                <span className="chip flex h-[42px] w-[42px] items-center justify-center">
                  <Icon name={b.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-[17px] font-extrabold tracking-[-0.02em] text-ink">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-faint">{b.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-2.5">
            <Link href="/services/" className="btn-secondary" style={{ minHeight: 46 }}>
              All services
              <Icon name="chevron" className="h-3.5 w-3.5" strokeWidth={2.2} />
            </Link>
            <Link href="/solutions/ai-receptionist/" className="btn-secondary" style={{ minHeight: 46 }}>
              AI receptionist
            </Link>
            <Link href="/about/" className="btn-secondary" style={{ minHeight: 46 }}>
              Who builds this
            </Link>
          </div>
        </div>
      </section>

      {/* Service area */}
      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[1180px]">
          <SectionHead
            eyebrow="Service area"
            title={<>Local roots, <span className="gradient-text">remote reach.</span></>}
            subtitle="Based in McDonough and available in person across the Atlanta metro — and working remotely with clients around the world."
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {AREA.map((a) => (
              <div key={a} className="flex items-start gap-3 rounded-2xl border border-line bg-bg p-5">
                <span className="chip flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center">
                  <Icon name="pin" className="h-[18px] w-[18px]" />
                </span>
                <p className="text-[15px] leading-relaxed text-body">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — local AEO */}
      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[820px]">
          <SectionHead
            eyebrow="Questions"
            title={<>AI automation in Atlanta, <span className="gradient-text">answered.</span></>}
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
