import Link from "next/link";
import Icon from "@/components/ui/Icon";
import SectionHead from "@/components/ui/SectionHead";
import ServiceDiagram from "@/components/services/ServiceDiagram";
import ProductCard from "@/components/services/ProductCard";
import MeshThumb from "@/components/blog/MeshThumb";
import { ToolChips } from "@/components/services/ServiceCard";
import { InvestmentFull } from "@/components/services/InvestmentPanel";
import { PRODUCTS, getService, type ServiceDetail } from "@/lib/services";
import { formatPostDate, getPostForService, splitTitle } from "@/lib/blog-posts";

const HERO_TRUST = ["Deployed in weeks", "Fixed project pricing", "Monitored after launch"];

export default function ServiceSubpage({ service }: { service: ServiceDetail }) {
  const products = service.deployedIn.map((k) => PRODUCTS[k]).filter(Boolean);
  const related = service.related.map((s) => getService(s)).filter(Boolean) as ServiceDetail[];
  const post = getPostForService(service.slug);
  const lead = service.name.split(" ").slice(0, -1).join(" ");

  return (
    <>
      {/* 2 · Hero (breadcrumb = 1) */}
      <section className="grid-overlay relative overflow-hidden px-5 pb-12 pt-32 md:pt-40">
        <div className="pointer-events-none absolute inset-0 radial-glow" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1180px] items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="min-w-0">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">
              <Link href="/services/" className="hover:text-ink">Services</Link>
              <span aria-hidden="true">/</span>
              <span className="text-ink">{service.name}</span>
            </nav>
            <p className="eyebrow mt-6">Service {service.num}</p>
            <span className="rule mt-2.5 mb-4 block" />
            <h1 className="font-display text-[clamp(2rem,4.6vw,3.5rem)] font-extrabold leading-[1.08] tracking-[-0.04em] text-ink text-balance">
              {lead} <span className="gradient-text">{service.gradientWord}</span>
            </h1>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-cyan">{service.subtitle}</p>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-faint">{service.description}</p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {HERO_TRUST.map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] text-body" style={{ background: "var(--tint)", border: "1px solid var(--chip-border)" }}>
                  <Icon name="check" className="h-3.5 w-3.5 text-cyan" strokeWidth={2.2} /> {t}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/#audit" className="btn-primary">
                Get My Free Audit
                <Icon name="chevron" className="h-4 w-4" strokeWidth={2.2} />
              </Link>
              <Link href="/services/" className="btn-secondary">All services →</Link>
            </div>
          </div>
          <ServiceDiagram type={service.diagram} status={service.diagramStatus} alt={service.diagramAlt} />
        </div>
      </section>

      {/* 3 · The problem it solves */}
      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto grid max-w-[1080px] gap-10 md:grid-cols-2">
          <div>
            <p className="eyebrow">The problem</p>
            <span className="rule mt-2.5 mb-5 block" />
            <p className="text-[16px] leading-relaxed text-body">{service.problem.pain}</p>
          </div>
          <div className="rounded-2xl border border-line bg-elevated p-6">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">What teams try first</p>
            <div className="mt-4 flex flex-col gap-2.5">
              {service.problem.tries.map((t) => (
                <span key={t} className="flex items-start gap-2.5 text-[14px] text-faint">
                  <Icon name="x" className="mt-0.5 h-4 w-4 flex-shrink-0 opacity-70" strokeWidth={1.8} />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4 · What we build */}
      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[1080px]">
          <SectionHead eyebrow="What we build" title={<>Inside the <span className="gradient-text">{service.gradientWord.toLowerCase()}</span>.</>} />
          <div className="mt-9 grid gap-3.5 sm:grid-cols-2">
            {service.build.map((b) => (
              <div key={b.title} className="card flex items-start gap-3.5 p-5">
                <span className="chip h-11 w-11 flex-shrink-0">
                  <Icon name={b.icon} className="h-5 w-5" />
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-[15px] font-semibold text-ink">{b.title}</span>
                  <span className="text-[13.5px] leading-relaxed text-faint">{b.text}</span>
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
            {service.process.map((p, i) => (
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

      {/* 6 · Tools we use */}
      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto grid max-w-[1080px] items-center gap-8 md:grid-cols-2">
          <div>
            <p className="eyebrow">Tools we use</p>
            <span className="rule mt-2.5 mb-5 block" />
            <ToolChips tools={service.tools} />
          </div>
          <p className="text-[15px] leading-relaxed text-faint">{service.toolsRationale}</p>
        </div>
      </section>

      {/* 7 · Deployed with this service */}
      {products.length > 0 && (
        <section className="section-gap border-t border-line px-5">
          <div className="mx-auto max-w-[1080px]">
            <SectionHead eyebrow="Deployed with this service" title={<>Live, <span className="gradient-text">not hypothetical.</span></>} />
            <div className="mt-9 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <ProductCard key={p.key} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8 · Investment */}
      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[1080px]">
          <SectionHead eyebrow="Investment" title={<>What it <span className="gradient-text">costs.</span></>} />
          <div className="mt-9">
            <InvestmentFull service={service} />
          </div>
        </div>
      </section>

      {/* 9 · FAQ */}
      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[860px]">
          <SectionHead eyebrow="FAQ" title={<>Questions, <span className="gradient-text">answered.</span></>} />
          <div className="mt-9 flex flex-col gap-2.5">
            {service.faq.map((f) => (
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
            Is {service.name} your <span className="gradient-text">#1 opportunity?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[16px] leading-relaxed text-faint">
            The free 90-second audit tells you where {lead.toLowerCase()} {service.gradientWord.toLowerCase()} rank
            against everything else you could automate first.
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

      {/* 11 · Related reading — matching blog post, when one exists */}
      {post && (
        <section className="border-t border-line px-5 py-14">
          <div className="mx-auto max-w-[1080px]">
            <p className="eyebrow">Related reading</p>
            <Link
              href={`/blog/${post.slug}/`}
              className="card card-hover mt-6 flex flex-col overflow-hidden text-body sm:flex-row"
            >
              <MeshThumb variant={post.mesh} className="h-[120px] flex-shrink-0 sm:h-auto sm:w-[220px] sm:border-r sm:border-line" />
              <span className="flex min-w-0 flex-1 flex-col p-6">
                <span className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-faint">
                  {post.category} · {formatPostDate(post.date)} · {post.readMinutes} min read
                </span>
                <span className="mt-2.5 font-display text-[18px] font-extrabold leading-[1.3] tracking-[-0.02em] text-ink">
                  {splitTitle(post.title, post.gradientWords)[0]}{" "}
                  <span className="gradient-text">
                    {splitTitle(post.title, post.gradientWords)[1]}
                  </span>
                </span>
                <span className="mt-2 text-[13.5px] leading-relaxed text-faint">
                  {post.excerpt}
                </span>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[13.5px] font-semibold text-cyan">
                  Read article
                  <Icon name="chevron" className="h-3.5 w-3.5" strokeWidth={2.2} />
                </span>
              </span>
            </Link>
          </div>
        </section>
      )}

      {/* 12 · Related services */}
      {related.length > 0 && (
        <section className="border-t border-line px-5 py-14">
          <div className="mx-auto max-w-[1080px]">
            <p className="eyebrow">Often paired with</p>
            <div className="mt-6 grid gap-3.5 sm:grid-cols-2">
              {related.map((r) => (
                <Link key={r.slug} href={`/services/${r.slug}/`} className="card card-hover flex items-center justify-between gap-4 p-6 text-body">
                  <span className="flex flex-col gap-1">
                    <span className="font-display text-[18px] font-extrabold tracking-[-0.02em] text-ink">{r.name}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-faint">{r.subtitle}</span>
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
