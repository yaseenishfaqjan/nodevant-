import Link from "next/link";
import Icon from "@/components/ui/Icon";
import SectionHead from "@/components/ui/SectionHead";
import FinalCTA from "@/components/home/FinalCTA";
import JsonLd from "@/components/ui/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";
import { faqPageSchema, breadcrumbSchema } from "@/lib/schema";
import {
  AI_EMPLOYEES,
  EMPLOYEE_INCLUDES,
  EMPLOYEE_MONTHLY,
  EMPLOYEE_SETUP,
} from "@/lib/ai-employees";

export const metadata = pageMetadata({
  title: "Hire AI Employees — Receptionist, Sales, Content & Operations | Nodevant",
  description:
    "Hire AI employees that do a job, not software you have to run. Four roles — receptionist, sales, content and operations — built for your business, from $997/month plus implementation.",
  path: "/ai-employees/",
  keywords: [
    "hire ai employees",
    "ai employee",
    "ai workforce",
    "ai receptionist",
    "ai sales agent",
    "ai operations automation",
  ],
});

const FAQS: { q: string; a: string }[] = [
  {
    q: "What is an AI employee?",
    a: "An AI employee is a system built to perform one job in your business end to end — answering the phone, following up with leads, producing content, or running back-office admin. You are not buying model access or a tool to operate; you are hiring the outcome, and we build, run and maintain it.",
  },
  {
    q: "How much does an AI employee cost?",
    a: `One AI employee is ${EMPLOYEE_MONTHLY} per month plus a ${EMPLOYEE_SETUP} implementation. That covers the build, your integrations, the monthly allowances and ongoing optimisation. Hiring several roles is cheaper per role — see pricing for the Revenue Team and Workforce tiers.`,
  },
  {
    q: "Can I start with one role instead of all four?",
    a: "Yes, and most clients should. We recommend starting with the single role where the loss is easiest to measure — usually missed calls, because you can count what went to voicemail last month and therefore prove whether it worked within a fortnight.",
  },
  {
    q: "Do the AI employees work together?",
    a: "Yes. They share the same CRM and workflow layer, so the receptionist's booking triggers the operations employee's confirmation, and a completed job can trigger the content employee. That loop is the point — it is why a workforce is worth more than four separate tools.",
  },
  {
    q: "Will an AI employee replace my staff?",
    a: "It replaces the repetitive share of a role, not the person. The pattern that works in production is the AI owning the routine loop and a human owning the exceptions — it books the standard appointment and warm-transfers the unusual call. Anything irreversible keeps a human approval gate.",
  },
];

function HubJsonLd() {
  const url = `${SITE.url}/ai-employees/`;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "AI Employees",
          serviceType: "AI business automation",
          description:
            "Custom-built AI employees that perform a defined job end to end: receptionist, sales follow-up, marketing content, and back-office operations.",
          url,
          provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
          areaServed: "Worldwide",
          offers: {
            "@type": "Offer",
            price: 997,
            priceCurrency: "USD",
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: 997,
              priceCurrency: "USD",
            },
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Nodevant AI employees",
          itemListElement: AI_EMPLOYEES.map((e, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: e.name,
            description: e.jobTitle,
            url: `${SITE.url}${e.href}`,
          })),
        }}
      />
      <JsonLd data={faqPageSchema(FAQS)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "AI Employees", path: "/ai-employees/" },
        ])}
      />
    </>
  );
}

export default function AiEmployeesPage() {
  return (
    <>
      <HubJsonLd />

      {/* Hero */}
      <section className="relative overflow-hidden px-5 pt-[clamp(88px,12vw,132px)]">
        <div className="grid-overlay" aria-hidden="true" />
        <div className="relative mx-auto max-w-[880px] text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
            AI Employees · hire a job, not a tool
          </p>
          <h1 className="mx-auto mt-4 max-w-[800px] font-display text-[clamp(2rem,5vw,3.4rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink">
            Stop buying software. <span className="gradient-text">Hire the outcome.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[640px] text-[clamp(1rem,1.6vw,1.1875rem)] leading-relaxed text-faint">
            Every AI employee below is built for one job and judged on whether it
            does it. No dashboard for you to learn, no prompts to write — we build
            it, run it and keep it working.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/audit/" className="btn-primary" style={{ minHeight: 54 }}>
              Find which role to hire first
              <Icon name="chevron" className="h-4 w-4" strokeWidth={2.2} />
            </Link>
            <Link href="/pricing/" className="btn-secondary" style={{ minHeight: 54 }}>
              See pricing
            </Link>
          </div>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
            From {EMPLOYEE_MONTHLY}/mo + {EMPLOYEE_SETUP} implementation
          </p>
        </div>
      </section>

      {/* The four roles */}
      <section className="section-gap px-5">
        <div className="mx-auto max-w-[1180px]">
          <SectionHead
            eyebrow="The roster"
            title={<>Four roles, <span className="gradient-text">four job descriptions.</span></>}
            subtitle="Each one is a real job with a defined finish line. Hire one, or hire the team and let them hand work to each other."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {AI_EMPLOYEES.map((e) => (
              <Link
                key={e.slug}
                href={e.href}
                className="card card-hover flex flex-col p-6 text-body"
              >
                <div className="flex items-center gap-3">
                  <span className="chip flex h-[42px] w-[42px] items-center justify-center">
                    <Icon name={e.icon} className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                    {e.role}
                  </span>
                </div>
                <h2 className="mt-4 font-display text-[19px] font-extrabold tracking-[-0.02em] text-ink">
                  {e.name}
                </h2>
                <p className="mt-2 text-[14.5px] leading-relaxed text-faint">
                  {e.jobTitle}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-cyan">
                  See the job description
                  <Icon name="chevron" className="h-3.5 w-3.5" strokeWidth={2.2} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* What every employee includes */}
      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[1180px]">
          <SectionHead
            eyebrow="What you get"
            title={<>Every hire includes <span className="gradient-text">the same foundation.</span></>}
            subtitle={`One AI employee is ${EMPLOYEE_MONTHLY}/month plus ${EMPLOYEE_SETUP} implementation. Hiring more than one role costs less per role.`}
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {EMPLOYEE_INCLUDES.map((f) => (
              <div key={f.label} className="flex items-center gap-3 rounded-2xl border border-line bg-bg p-5">
                <span className="chip flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center">
                  <Icon name={f.icon} className="h-[18px] w-[18px]" />
                </span>
                <p className="text-[14.5px] leading-snug text-body">{f.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[14px] leading-relaxed text-faint">
            Need several roles? The{" "}
            <Link href="/pricing/" className="font-semibold text-cyan hover:underline">
              Revenue Team and Workforce tiers
            </Link>{" "}
            bundle three and six employees with larger allowances, more
            integrations and human approval gates.
          </p>
        </div>
      </section>

      {/* The loop */}
      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[880px]">
          <SectionHead
            eyebrow="Why a team beats a tool"
            title={<>They hand work <span className="gradient-text">to each other.</span></>}
          />
          <p className="mt-8 text-[15.5px] leading-[1.8] text-faint">
            A lead calls and the <strong className="text-ink">receptionist</strong>{" "}
            answers and books them. They go quiet, so the{" "}
            <strong className="text-ink">sales employee</strong> follows up until
            they commit. The job gets scheduled and the{" "}
            <strong className="text-ink">operations employee</strong> confirms it,
            updates the CRM and triggers the invoice. Once it is finished, the{" "}
            <strong className="text-ink">content employee</strong> turns the result
            into a post — which brings in the next call.
          </p>
          <p className="mt-4 text-[15.5px] leading-[1.8] text-faint">
            That loop is the whole argument. Four separate tools cannot pass work
            between themselves; four employees sharing one CRM and workflow layer
            can, and each handoff is a place a lead used to be dropped.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[820px]">
          <SectionHead
            eyebrow="Questions"
            title={<>Hiring AI employees, <span className="gradient-text">answered.</span></>}
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
