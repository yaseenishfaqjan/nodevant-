import Link from "next/link";
import Icon from "@/components/ui/Icon";
import SectionHead from "@/components/ui/SectionHead";
import MeshThumb from "@/components/blog/MeshThumb";
import { PUBLISHED_POSTS } from "@/lib/blog-posts";

/**
 * Homepage "Insights" strip — the three newest published articles.
 *
 * Driven straight off PUBLISHED_POSTS rather than a local copy: a hardcoded
 * list here had silently drifted from the real posts (wrong titles, stale read
 * times, and hrefs missing the trailing slash, which cost a redirect hop on
 * every click). Reading the real data keeps it correct for free and picks up
 * cover art automatically.
 */
const LATEST = [...PUBLISHED_POSTS]
  .sort((a, b) => (a.date < b.date ? 1 : -1))
  // Newest first, but float posts that have real cover art to the top: a strip
  // of three where one card is a bare gradient reads as unfinished. Posts
  // without art still show once they have some — nothing is hidden permanently.
  .sort((a, b) => Number(Boolean(b.cover)) - Number(Boolean(a.cover)))
  .slice(0, 3);

export default function Insights() {
  return (
    <section id="insights" className="section-gap border-t border-line px-5">
      <div className="mx-auto max-w-[1280px]">
        <SectionHead
          eyebrow="Insights"
          title={<>Automation, <span className="gradient-text">explained plainly.</span></>}
        />
        <div className="mt-11 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {LATEST.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}/`}
              className="card card-hover flex flex-col overflow-hidden text-body"
            >
              <MeshThumb variant={p.mesh} src={p.cover} className="h-[150px]" />
              <span className="flex flex-col p-[22px]">
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-faint">
                  {p.readMinutes} min read
                </span>
                <span className="my-3 font-display text-[17px] font-extrabold leading-[1.35] tracking-[-0.02em] text-ink">
                  {p.title}
                </span>
                <span className="mt-auto inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-cyan">
                  Read more
                  <Icon name="chevron" className="h-3.5 w-3.5" strokeWidth={2.2} />
                </span>
              </span>
            </Link>
          ))}
        </div>
        <Link href="/blog/" className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan">
          View all articles
          <Icon name="chevron" className="h-[15px] w-[15px]" strokeWidth={2.2} />
        </Link>
      </div>
    </section>
  );
}
