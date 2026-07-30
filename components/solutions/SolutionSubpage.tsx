import Link from "next/link";
import Icon from "@/components/ui/Icon";
import SectionHead from "@/components/ui/SectionHead";
import ServiceDiagram from "@/components/services/ServiceDiagram";
import ProductCard from "@/components/services/ProductCard";
import { getService, PRODUCTS } from "@/lib/services";
import { getSolution, type SolutionDetail } from "@/lib/solutions";

export default function SolutionSubpage({ solution }: { solution: SolutionDetail }) {
  const services = solution.poweredBy.map((s) => getService(s)).filter(Boolean);
  const related = solution.related.map((s) => getSolution(s)).filter(Boolean) as SolutionDetail[];
  const product = solution.product ? PRODUCTS[solution.product] : undefined;

  return (
    <>
      {/* 1–2 · Breadcrumb + Hero */}
      <section className="grid-overlay relative overflow-hidden px-5 pb-12 pt-32 md:pt-40">
        <div className="pointer-events-none absolute inset-0 radial-glow" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1180px] items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="min-w-0">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">
              <Link href="/solutions/" className="hover:text-ink">Solutions</Link>
              <span aria-hidden="true">/</span>
              <span className="text-ink">{solution.name}</span>
            </nav>
            <p className="eyebrow mt-6">{solution.industry}</p>
            <span className="rule mt-2.5 mb-4 block" />
            <h1 className="font-display text-[clamp(2rem,4.6vw,3.5rem)] font-extrabold leading-[1.08] tracking-[-0.04em] text-ink text-balance">
              {solution.heroLead} <span className="gradient-text">{solution.gradientWord}</span>
            </h1>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-faint">{solution.description}</p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] text-body" style={{ background: "var(--tint)", border: "1px solid var(--chip-border)" }}>
                <Icon name="chart" className="h-3.5 w-3.5 text-cyan" strokeWidth={1.8} /> {solution.proofValue}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] text-body" style={{ background: "var(--tint)", border: "1px solid var(--chip-border)" }}>
                <Icon name="clock" className="h-3.5 w-3.5 text-cyan" strokeWidth={1.8} /> {solution.timeline}
              </span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/#audit" className="btn-primary">
                Book a stack consultation
                <Icon name="chevron" className="h-4 w-4" strokeWidth={2.2} />
              </Link>
              {solution.liveUrl ? (
                <a href={solution.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  View live system <Icon name="external" className="h-4 w-4" strokeWidth={1.9} />
                </a>
              ) : (
                <Link href="/solutions/" className="btn-secondary">All solutions →</Link>
              )}
            </div>
          </div>
          <ServiceDiagram type={solution.diagram} status={solution.diagramStatus} alt={solution.diagramAlt} />
        </div>
      </section>

      {/* 3 · The problem */}
      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto grid max-w-[1080px] gap-10 md:grid-cols-2">
          <div>
            <p className="eyebrow">The problem</p>
            <span className="rule mt-2.5 mb-5 block" />
            <p className="text-[16px] leading-relaxed text-body">{solution.problem.pain}</p>
          </div>
          <div className="rounded-2xl border border-line bg-elevated p-6">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">What teams try first</p>
            <div className="mt-4 flex flex-col gap-2.5">
              {solution.problem.tries.map((t) => (
                <span key={t} className="flex items-start gap-2.5 text-[14px] text-faint">
                  <Icon name="x" className="mt-0.5 h-4 w-4 flex-shrink-0 opacity-70" strokeWidth={1.8} />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4 · Inside the stack */}
      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[1080px]">
          <SectionHead eyebrow="Inside the stack" title={<>What the <span className="gradient-text">system does.</span></>} />
          <div className="mt-9 grid gap-3.5 sm:grid-cols-2">
            {solution.modules.map((m) => (
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

      {/* 5 · How it works */}
      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[1080px]">
          <SectionHead eyebrow="How it works" title={<>From scope to <span className="gradient-text">live.</span></>} />
          <div className="mt-9 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {solution.process.map((p, i) => (
              <div key={p.title} className="card p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg font-mono text-[12px] font-bold text-white" style={{ background: "var(--gradient)" }}>
                    {i + 1}
                  </span>
                  <span className="chip h-9 w-9">
                    <Icon name={p.icon} className="h-[17px] w-[17px]" />
                  </span>
                </div>
                <p className="mt-3.5 text-[15px] font-semibold text-ink">{p.title}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-faint">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 · Powered by these services */}
      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[1080px]">
          <SectionHead
            eyebrow="Powered by"
            title={<>The services <span className="gradient-text">underneath.</span></>}
            subtitle="This stack bundles individual Nodevant services. Each is available on its own if you only need the one piece."
          />
          <div className="mt-9 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link key={s!.slug} href={`/services/${s!.slug}/`} className="card card-hover flex items-center justify-between gap-4 p-5 text-body">
                <span className="flex flex-col gap-1">
                  <span className="font-display text-[16px] font-extrabold tracking-[-0.02em] text-ink">{s!.name}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-faint">{s!.subtitle}</span>
                </span>
                <Icon name="chevron" className="h-5 w-5 flex-shrink-0 text-cyan" strokeWidth={2} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7 · Deployed live */}
      {product && (
        <section className="section-gap border-t border-line px-5">
          <div className="mx-auto max-w-[1080px]">
            <SectionHead eyebrow="Deployed live" title={<>Running in <span className="gradient-text">production.</span></>} />
            <div className="mt-9 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
              <ProductCard product={product} />
            </div>
          </div>
        </section>
      )}

      {/* 8 · Investment */}
      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[1080px]">
          <SectionHead eyebrow="Investment" title={<>What it <span className="gradient-text">takes.</span></>} />
          <div className="mt-9 grid gap-6 md:grid-cols-[1fr_1.1fr]">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">Fixed project pricing</p>
              <p className="gradient-text mt-2 font-display text-[clamp(1.75rem,3.4vw,2.5rem)] font-extrabold tracking-[-0.03em]">
                Scoped to your operation
              </p>
              <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-faint">
                Multiple services, one project · No hourly billing
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[11px] text-body" style={{ background: "var(--tint)", border: "1px solid var(--chip-border)" }}>
                  <Icon name="clock" className="h-3.5 w-3.5 text-cyan" /> Timeline: {solution.timeline}
                </span>
              </div>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.06em] text-faint/80">
                {solution.investmentRange}
              </p>
              <Link href="/#audit" className="btn-primary mt-6">
                Full quote after your free audit →
              </Link>
            </div>
            <div className="rounded-2xl border border-line bg-elevated p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-faint">What&apos;s included</p>
              <div className="mt-4 flex flex-col gap-3">
                {["Discovery & operation mapping", "Build, integrate, and test every service in the stack", "Deployment + 30 days of monitoring"].map((line) => (
                  <span key={line} className="flex items-start gap-2 text-[13.5px] text-body">
                    <span className="chip mt-px h-5 w-5 flex-shrink-0">
                      <Icon name="check" className="h-3 w-3" strokeWidth={2.4} />
                    </span>
                    {line}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9 · FAQ */}
      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[860px]">
          <SectionHead eyebrow="FAQ" title={<>Questions, <span className="gradient-text">answered.</span></>} />
          <div className="mt-9 flex flex-col gap-2.5">
            {solution.faq.map((f) => (
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
            Want the {solution.name} for <span className="gradient-text">your business?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[16px] leading-relaxed text-faint">
            The free 90-second audit maps this stack to your operation and returns your highest-ROI
            starting point — no obligation.
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

      {/* 11 · Related solutions */}
      {related.length > 0 && (
        <section className="border-t border-line px-5 py-14">
          <div className="mx-auto max-w-[1080px]">
            <p className="eyebrow">Related stacks</p>
            <div className="mt-6 grid gap-3.5 sm:grid-cols-2">
              {related.map((r) => (
                <Link key={r.slug} href={`/solutions/${r.slug}/`} className="card card-hover flex items-center justify-between gap-4 p-6 text-body">
                  <span className="flex flex-col gap-1">
                    <span className="font-display text-[18px] font-extrabold tracking-[-0.02em] text-ink">{r.name}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-faint">{r.industry}</span>
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
