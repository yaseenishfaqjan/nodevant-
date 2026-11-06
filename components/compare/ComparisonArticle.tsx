import Link from "next/link";
import Icon from "@/components/ui/Icon";
import QuickAnswer from "@/components/content/QuickAnswer";
import RelatedReading from "@/components/content/RelatedReading";
import type { ComparisonPage } from "@/lib/comparisons";
import { readingForComparison } from "@/lib/related-reading";

export default function ComparisonArticle({ page }: { page: ComparisonPage }) {
  const checked = new Date(`${page.checked}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  const reading = readingForComparison(page.slug);
  return (
    <>
      <section className="grid-overlay relative overflow-hidden px-5 pb-12 pt-32 md:pt-40">
        <div className="pointer-events-none absolute inset-0 radial-glow" aria-hidden="true" />
        <div className="relative mx-auto max-w-[860px]">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">
            <Link href="/" className="hover:text-ink">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/compare/" className="hover:text-ink">Compare</Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink">{page.name}</span>
          </nav>
          <p className="eyebrow mt-6">{page.eyebrow}</p>
          <span className="rule mt-2.5 mb-4 block" />
          <h1 className="font-display text-[clamp(2rem,4.6vw,3.4rem)] font-extrabold leading-[1.08] tracking-[-0.04em] text-ink text-balance">
            {page.heroLead} <span className="gradient-text">{page.gradientWord}</span>
          </h1>
          <QuickAnswer className="mt-6">{page.quickAnswer ?? page.definition}</QuickAnswer>
          <p className="mt-4 text-[15px] leading-relaxed text-faint">
            Vendor pages below were checked in {checked}. They move. The source links are at the bottom of this page.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/audit/" className="btn-primary">
              Get a free audit
              <Icon name="chevron" className="h-4 w-4" strokeWidth={2.2} />
            </Link>
            <Link href="/products/" className="btn-secondary">All software stacks</Link>
          </div>
        </div>
      </section>

      <section className="border-t border-line px-5 py-14" aria-labelledby="verdict">
        <div className="mx-auto max-w-[860px]">
          <h2 id="verdict" className="font-display text-[clamp(1.4rem,2.4vw,1.85rem)] font-extrabold tracking-[-0.03em] text-ink">
            The short version
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-body">{page.verdict}</p>
        </div>
      </section>

      <section className="border-t border-line px-5 py-14" aria-labelledby="compare-table">
        <div className="mx-auto max-w-[1080px]">
          <h2 id="compare-table" className="font-display text-[clamp(1.4rem,2.4vw,1.85rem)] font-extrabold tracking-[-0.03em] text-ink">
            Side by side
          </h2>
          <div className="mt-6 overflow-x-auto rounded-xl border border-line">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr>
                  {page.tableHead.map((heading) => (
                    <th key={heading || "aspect"} scope="col" className="border-b border-line bg-[var(--surface-2)] p-3 font-semibold text-ink">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {page.table.map((row) => (
                  <tr key={row.aspect} className="border-b border-line last:border-b-0">
                    <th scope="row" className="w-[22%] p-3 align-top font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-faint">
                      {row.aspect}
                    </th>
                    <td className="p-3 align-top leading-relaxed text-body">{row.them}</td>
                    <td className="p-3 align-top leading-relaxed text-body">{row.us}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-t border-line px-5 py-14">
        <div className="mx-auto grid max-w-[1080px] gap-6 md:grid-cols-2">
          {[page.chooseThem, page.chooseUs].map((column) => (
            <div key={column.title} className="card p-6">
              <h2 className="font-display text-[20px] font-extrabold tracking-[-0.02em] text-ink">{column.title}</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {column.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[14.5px] leading-relaxed text-body">
                    <Icon name="check" className="mt-0.5 h-4 w-4 flex-shrink-0 text-cyan" strokeWidth={2.2} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {page.sections.map((section) => (
        <section key={section.heading} className="border-t border-line px-5 py-14">
          <div className="mx-auto max-w-[860px]">
            <h2 className="font-display text-[clamp(1.35rem,2.2vw,1.7rem)] font-extrabold tracking-[-0.03em] text-ink">
              {section.heading}
            </h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="mt-4 text-[16px] leading-relaxed text-body">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      ))}

      <section className="border-t border-line px-5 py-14" aria-labelledby="compare-faq">
        <div className="mx-auto max-w-[860px]">
          <h2 id="compare-faq" className="font-display text-[clamp(1.4rem,2.4vw,1.85rem)] font-extrabold tracking-[-0.03em] text-ink">
            Questions
          </h2>
          <div className="mt-6 flex flex-col gap-2.5">
            {page.faq.map((item) => (
              <details key={item.q} className="card">
                <summary className="flex min-h-[56px] cursor-pointer items-center justify-between gap-4 px-[22px] py-[19px] text-base font-semibold text-ink">
                  {item.q}
                  <Icon name="chevron" className="h-[18px] w-[18px] flex-shrink-0 text-cyan" strokeWidth={1.8} />
                </summary>
                <p className="px-[22px] pb-5 text-[14.5px] leading-relaxed text-faint">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line px-5 py-14" aria-labelledby="sources">
        <div className="mx-auto max-w-[860px]">
          <h2 id="sources" className="font-display text-[clamp(1.3rem,2vw,1.6rem)] font-extrabold tracking-[-0.03em] text-ink">
            Sources
          </h2>
          <ul className="mt-5 flex flex-col gap-4">
            {page.sources.map((source) => (
              <li key={source.href} className="text-[15px] leading-relaxed text-body">
                {source.href.startsWith("http") ? (
                  <a href={source.href} className="font-semibold text-cyan" target="_blank" rel="noopener noreferrer">
                    {source.label}
                  </a>
                ) : (
                  <Link href={source.href} className="font-semibold text-cyan">
                    {source.label}
                  </Link>
                )}
                <span className="text-faint"> — {source.note}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

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
          <h2 className="font-display text-[clamp(1.5rem,3.4vw,2.4rem)] font-extrabold leading-[1.12] tracking-[-0.03em] text-ink text-balance">
            Not sure which side you are on? <span className="gradient-text">Start with the audit.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[16px] leading-relaxed text-faint">
            The free audit maps the leak in your operation. If a subscription you already know is the better buy, that is the answer you should get.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/audit/" className="btn-primary">
              Get a free audit
              <Icon name="chevron" className="h-4 w-4" strokeWidth={2.2} />
            </Link>
            <Link href="/contact/" className="btn-secondary">Send a message</Link>
          </div>
        </div>
      </section>

      {reading.length > 0 ? (
        <RelatedReading links={reading} />
      ) : (
        <section className="border-t border-line px-5 py-14">
          <div className="mx-auto max-w-[1080px]">
            <p className="eyebrow">Related</p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {page.related.map((item) => (
                <Link key={item.href} href={item.href} className="btn-secondary">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
