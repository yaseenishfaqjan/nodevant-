import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
  AI_EMPLOYEE_PAGES,
  EMPLOYEE_INCLUDES,
  EMPLOYEE_MONTHLY,
  EMPLOYEE_SETUP,
  getAiEmployee,
} from "@/lib/ai-employees";

/** Only roles without their own existing money page get a detail route — the
 *  receptionist already lives at /solutions/ai-receptionist and duplicating it
 *  would split the ranking signal for the same keyword. */
export function generateStaticParams() {
  return AI_EMPLOYEE_PAGES.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const e = getAiEmployee(params.slug);
  if (!e) return {};
  return pageMetadata({
    title: e.metaTitle,
    description: e.metaDescription,
    path: `/ai-employees/${e.slug}/`,
    keywords: e.keywords,
  });
}

export default function AiEmployeePage({
  params,
}: {
  params: { slug: string };
}) {
  const e = getAiEmployee(params.slug);
  if (!e || e.external) notFound();

  const others = AI_EMPLOYEES.filter((o) => o.slug !== e.slug);
  const url = `${SITE.url}/ai-employees/${e.slug}/`;

  const faqs = [
    {
      q: `What does an ${e.name.toLowerCase()} do?`,
      a: e.jobTitle,
    },
    {
      q: `How much does an ${e.name.toLowerCase()} cost?`,
      a: `${EMPLOYEE_MONTHLY} per month plus a ${EMPLOYEE_SETUP} implementation. That covers the build, your integrations, the included monthly allowances and ongoing optimisation. Hiring more than one role costs less per role.`,
    },
    {
      q: "How long does it take to go live?",
      a: "Days rather than months for a single role. We map how the job runs today, build it against your real process, connect your tools, then tune it on live results after launch.",
    },
    {
      q: "What happens with the cases it cannot handle?",
      a: "They go to a person, with the context attached. The pattern that works is the AI owning the routine loop while a human owns the exceptions — and anything irreversible keeps an approval gate.",
    },
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: e.name,
          serviceType: "AI business automation",
          description: e.jobTitle,
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
      <JsonLd data={faqPageSchema(faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "AI Employees", path: "/ai-employees/" },
          { name: e.name, path: `/ai-employees/${e.slug}/` },
        ])}
      />

      {/* Hero */}
      <section className="relative overflow-hidden px-5 pt-[clamp(88px,12vw,132px)]">
        <div className="grid-overlay" aria-hidden="true" />
        <div className="relative mx-auto max-w-[860px] text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
            AI Employee · {e.role}
          </p>
          <h1 className="mx-auto mt-4 max-w-[780px] font-display text-[clamp(2rem,5vw,3.3rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-ink">
            {e.name}
          </h1>
          <p className="mx-auto mt-5 max-w-[640px] text-[clamp(1rem,1.6vw,1.1875rem)] leading-relaxed text-faint">
            {e.jobTitle}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/audit/" className="btn-primary" style={{ minHeight: 54 }}>
              Get my free 90-second audit
              <Icon name="chevron" className="h-4 w-4" strokeWidth={2.2} />
            </Link>
            <Link href="/pricing/" className="btn-secondary" style={{ minHeight: 54 }}>
              See pricing
            </Link>
          </div>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
            {EMPLOYEE_MONTHLY}/mo + {EMPLOYEE_SETUP} implementation
          </p>
        </div>
      </section>

      {/* Why this role */}
      <section className="section-gap px-5">
        <div className="mx-auto max-w-[820px]">
          <SectionHead eyebrow="The role" title={<>Why this hire <span className="gradient-text">exists.</span></>} />
          <p className="mt-8 text-[15.5px] leading-[1.8] text-faint">{e.summary}</p>
          <p className="mt-4 text-[15.5px] leading-[1.8] text-faint">{e.costToday}</p>
          <p className="mt-4 text-[15px] leading-relaxed text-body">
            <strong className="text-ink">Best for:</strong> {e.bestFor}
          </p>
        </div>
      </section>

      {/* The job description */}
      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[900px]">
          <SectionHead
            eyebrow="Job description"
            title={<>What it <span className="gradient-text">actually does.</span></>}
            subtitle="Written the way you would brief a new hire — concrete duties, not capabilities."
          />
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {e.does.map((d) => (
              <li key={d} className="flex items-start gap-3 rounded-2xl border border-line bg-bg p-5">
                <span className="chip mt-0.5 flex h-[26px] w-[26px] flex-shrink-0 items-center justify-center">
                  <Icon name="check" className="h-[14px] w-[14px] text-cyan" strokeWidth={2.4} />
                </span>
                <span className="text-[14.5px] leading-relaxed text-body">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What it reports */}
      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[900px]">
          <SectionHead
            eyebrow="Reporting"
            title={<>What it <span className="gradient-text">reports back.</span></>}
            subtitle="The measures on your dashboard. Real numbers appear once it is live — we don't publish sample figures from someone else's business."
          />
          <div className="mt-10 flex flex-wrap gap-2.5">
            {e.tracks.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line bg-bg px-4 py-2.5 text-[13.5px] text-body"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {e.backedBy.map((b) => (
              <Link key={b.href} href={b.href} className="btn-secondary" style={{ minHeight: 46 }}>
                {b.label}
                <Icon name="chevron" className="h-3.5 w-3.5" strokeWidth={2.2} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Included */}
      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[1180px]">
          <SectionHead
            eyebrow="Included"
            title={<>Everything the hire <span className="gradient-text">comes with.</span></>}
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
        </div>
      </section>

      {/* FAQ */}
      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[820px]">
          <SectionHead eyebrow="Questions" title={<>Answered <span className="gradient-text">plainly.</span></>} />
          <dl className="mt-10 divide-y divide-line">
            {faqs.map((f) => (
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

      {/* How it hands off */}
      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[820px]">
          <SectionHead
            eyebrow="Working with the others"
            title={<>It doesn&apos;t work <span className="gradient-text">alone.</span></>}
          />
          <p className="mt-8 text-[15.5px] leading-[1.8] text-faint">{e.handoff}</p>
          <p className="mt-4 text-[15px] leading-relaxed text-faint">
            Hiring more than one role costs less per role — the{" "}
            <Link href="/pricing/" className="font-semibold text-cyan hover:underline">
              Revenue Team and Workforce tiers
            </Link>{" "}
            bundle several employees with larger allowances and human approval
            gates. See the whole{" "}
            <Link href="/ai-employees/" className="font-semibold text-cyan hover:underline">
              roster
            </Link>
            .
          </p>
        </div>
      </section>

      {/* The rest of the roster */}
      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[1180px]">
          <SectionHead eyebrow="The rest of the team" title={<>Who else you <span className="gradient-text">can hire.</span></>} />
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} href={o.href} className="card card-hover flex flex-col p-6 text-body">
                <span className="chip flex h-[42px] w-[42px] items-center justify-center">
                  <Icon name={o.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-[17px] font-extrabold tracking-[-0.02em] text-ink">
                  {o.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-faint">{o.role}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
