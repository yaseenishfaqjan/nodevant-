import Link from "next/link";
import Icon from "@/components/ui/Icon";
import SectionHead from "@/components/ui/SectionHead";
import ServiceDiagram from "@/components/services/ServiceDiagram";
import { getService } from "@/lib/services";
import { getSolution } from "@/lib/solutions";
import { getCaseStudy, type CaseStudyDetail } from "@/lib/case-studies";

export default function CaseStudySubpage({ study }: { study: CaseStudyDetail }) {
  const services = study.servicesUsed.map((s) => getService(s)).filter(Boolean);
  const solution = study.solutionSlug ? getSolution(study.solutionSlug) : undefined;
  const related = study.related.map((s) => getCaseStudy(s)).filter(Boolean) as CaseStudyDetail[];

  const SUMMARY: { label: string; text: string }[] = [
    { label: "The challenge", text: study.summary.challenge },
    { label: "What we built", text: study.summary.built },
    { label: "The outcome", text: study.summary.outcome },
  ];

  return (
    <>
      {/* 1–2 · Breadcrumb + Hero */}
      <section className="grid-overlay relative overflow-hidden px-5 pb-12 pt-32 md:pt-40">
        <div className="pointer-events-none absolute inset-0 radial-glow" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1180px] items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="min-w-0">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">
              <Link href="/case-studies/" className="hover:text-ink">Case Studies</Link>
              <span aria-hidden="true">/</span>
              <span className="text-ink">{study.stackName}</span>
            </nav>
            <p className="eyebrow mt-6">{study.industryLabel} · Deployed</p>
            <span className="rule mt-2.5 mb-4 block" />
            <h1 className="font-display text-[clamp(2rem,4.6vw,3.5rem)] font-extrabold leading-[1.08] tracking-[-0.04em] text-ink text-balance">
              {study.heroLead} <span className="gradient-text">{study.gradientWord}</span>
            </h1>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-faint">{study.solution}</p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] text-body" style={{ background: "var(--tint)", border: "1px solid var(--chip-border)" }}>
                <Icon name="layers" className="h-3.5 w-3.5 text-cyan" strokeWidth={1.8} /> {study.stackName}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] text-body" style={{ background: "var(--tint)", border: "1px solid var(--chip-border)" }}>
                <Icon name="external" className="h-3.5 w-3.5 text-cyan" strokeWidth={1.8} /> {study.liveLabel} · live
              </span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={study.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                View live system
                <Icon name="external" className="h-4 w-4" strokeWidth={1.9} />
              </a>
              <Link href="/#audit" className="btn-secondary">
                Start a similar project →
              </Link>
            </div>
          </div>
          <ServiceDiagram type={study.diagram} status={study.diagramStatus} alt={study.diagramAlt} />
        </div>
      </section>

      {/* 3 · Executive summary */}
      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[1080px]">
          <SectionHead eyebrow="At a glance" title={<>The whole story in <span className="gradient-text">three lines.</span></>} />
          <div className="mt-9 grid gap-3.5 md:grid-cols-3">
            {SUMMARY.map((s) => (
              <div key={s.label} className="card p-6">
                <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-cyan">{s.label}</p>
                <p className="mt-3 text-[14.5px] leading-relaxed text-body">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 · The challenge */}
      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto grid max-w-[1080px] gap-10 md:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="eyebrow">The challenge</p>
            <span className="rule mt-2.5 mb-5 block" />
            <div className="flex flex-col gap-4">
              {study.fullChallenge.map((p, i) => (
                <p key={i} className="text-[16px] leading-relaxed text-body">{p}</p>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-line bg-elevated p-6">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">What they tried before</p>
            <div className="mt-4 flex flex-col gap-2.5">
              {study.triedBefore.map((t) => (
                <span key={t} className="flex items-start gap-2.5 text-[14px] text-faint">
                  <Icon name="x" className="mt-0.5 h-4 w-4 flex-shrink-0 opacity-70" strokeWidth={1.8} />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5 · What we built */}
      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[1080px]">
          <SectionHead eyebrow="What we built" title={<>The modules that <span className="gradient-text">shipped.</span></>} />
          <div className="mt-9 grid gap-3.5 sm:grid-cols-2">
            {study.modules.map((m) => (
              <div key={m.title} className="card flex items-start gap-3.5 p-5">
                <span className="chip h-11 w-11 flex-shrink-0">
                  <Icon name={m.icon} className="h-5 w-5" />
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-[15px] font-semibold text-ink">{m.title}</span>
                  <span className="text-[13.5px] leading-relaxed text-faint">{m.text}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 · The stack that powered it */}
      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[1080px]">
          <SectionHead
            eyebrow="Under the hood"
            title={<>The stack that <span className="gradient-text">powered it.</span></>}
            subtitle="Every deployment is assembled from a proven operating-system stack and individual Nodevant services. Each is available on its own."
          />
          <div className="mt-9 flex flex-col gap-6">
            {solution && (
              <div>
                <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-faint">Solution stack</p>
                <div className="mt-3">
                  <Link
                    href={`/solutions/${solution.slug}/`}
                    className="card card-hover inline-flex items-center gap-2.5 px-4 py-3 text-body"
                  >
                    <span className="font-display text-[15px] font-extrabold tracking-[-0.02em] text-ink">{solution.name}</span>
                    <Icon name="chevron" className="h-4 w-4 text-cyan" strokeWidth={2} />
                  </Link>
                </div>
              </div>
            )}

            {services.length > 0 && (
              <div>
                <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-faint">Services used</p>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {services.map((s) => (
                    <Link
                      key={s!.slug}
                      href={`/services/${s!.slug}/`}
                      className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 font-mono text-[10.5px] uppercase tracking-[0.06em] text-ink transition-colors hover:text-cyan"
                      style={{ background: "var(--surface-2)", border: "1px solid var(--border-strong)" }}
                    >
                      {s!.name}
                      <Icon name="chevron" className="h-3 w-3 text-cyan" strokeWidth={2.2} />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-faint">Tools</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {study.tools.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center rounded-lg px-2.5 py-1.5 font-mono text-[10.5px] tracking-[0.04em] text-faint"
                    style={{ background: "var(--surface-2)", border: "1px solid var(--border-strong)" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7 · The numbers */}
      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[1080px]">
          <SectionHead eyebrow="The numbers" title={<>What it actually <span className="gradient-text">produced.</span></>} />
          <div className="mt-9 overflow-hidden rounded-2xl border border-line">
            {study.numbers.map((n, i) => (
              <div
                key={n.metric}
                className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
                style={{ borderTop: i === 0 ? "none" : "1px solid var(--border)", background: i % 2 ? "var(--surface)" : "var(--surface-2)" }}
              >
                <span className="text-[14.5px] text-body">{n.metric}</span>
                <span className="gradient-text font-mono text-[14px] font-semibold tracking-[-0.01em]">{n.result}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8 · Why this one matters */}
      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[860px]">
          <SectionHead eyebrow="Why this one matters" title={<>Straight from the <span className="gradient-text">build.</span></>} />
          <blockquote className="mt-9 rounded-2xl border border-line bg-elevated p-8">
            <p className="text-[17px] leading-relaxed text-body">
              {study.quote ? study.quote.text : study.perspective}
            </p>
            <footer className="mt-5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">
              {study.quote ? study.quote.attribution : "— Nodevant engineering"}
            </footer>
          </blockquote>
        </div>
      </section>

      {/* 9 · FAQ */}
      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[860px]">
          <SectionHead eyebrow="FAQ" title={<>Questions, <span className="gradient-text">answered.</span></>} />
          <div className="mt-9 flex flex-col gap-2.5">
            {study.faq.map((f) => (
              <details key={f.q} className="card">
                <summary className="flex min-h-[56px] items-center justify-between gap-4 px-[22px] py-[19px] text-base font-semibold text-ink">
                  {f.q}
                  <Icon name="chevron" data-chev className="h-[18px] w-[18px] flex-shrink-0 text-cyan transition-transform" strokeWidth={1.8} />
                </summary>
                <p className="px-[22px] pb-5 text-[14.5px] leading-relaxed text-faint">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 10 · CTA band */}
      <section className="px-5 py-16">
        <div
          className="mx-auto max-w-[880px] rounded-[28px] p-9 text-center md:p-14"
          style={{
            border: "1px solid transparent",
            backgroundImage: "linear-gradient(var(--surface),var(--surface)),var(--gradient)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box,border-box",
          }}
        >
          <h2 className="font-display text-[clamp(1.5rem,3.4vw,2.5rem)] font-extrabold leading-[1.12] tracking-[-0.03em] text-ink text-balance">
            Want results like <span className="gradient-text">{study.liveLabel}?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[16px] leading-relaxed text-faint">
            This build started with the same free 90-second audit — seven questions, a personalized ROI
            report, no obligation.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/#audit" className="btn-primary">
              Get My Free Audit
              <Icon name="chevron" className="h-4 w-4" strokeWidth={2.2} />
            </Link>
            <Link href="/contact/" className="btn-secondary">Book a Call</Link>
          </div>
        </div>
      </section>

      {/* 11 · Related case studies */}
      {related.length > 0 && (
        <section className="border-t border-line px-5 py-14">
          <div className="mx-auto max-w-[1080px]">
            <p className="eyebrow">Related case studies</p>
            <div className="mt-6 grid gap-3.5 sm:grid-cols-2">
              {related.map((r) => (
                <Link key={r.slug} href={`/case-studies/${r.slug}/`} className="card card-hover flex items-center justify-between gap-4 p-6 text-body">
                  <span className="flex flex-col gap-1">
                    <span className="font-display text-[18px] font-extrabold tracking-[-0.02em] text-ink">{r.stackName}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-faint">{r.industryLabel}</span>
                  </span>
                  <Icon name="chevron" className="h-5 w-5 flex-shrink-0 text-cyan" strokeWidth={2} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
