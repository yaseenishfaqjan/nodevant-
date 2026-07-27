import Link from "next/link";
import Icon from "@/components/ui/Icon";
import MeshThumb from "@/components/blog/MeshThumb";
import NewsletterForm from "@/components/blog/NewsletterForm";
import { PUBLISHED_POSTS, splitTitle, type BlogPost } from "@/lib/blog-posts";

/**
 * Graceful fallback for posts announced on the hub but not yet published.
 * Not a 404: the page confirms the post is real, captures the reader's email,
 * and routes them to published articles. Noindexed via the route's metadata.
 */
export default function ComingSoon({ post }: { post: BlogPost }) {
  const [lead, grad] = splitTitle(post.title, post.gradientWords);

  return (
    <>
      <section className="grid-overlay relative overflow-hidden px-5 pb-12 pt-32 md:pt-40">
        <div className="pointer-events-none absolute inset-0 radial-glow" aria-hidden="true" />
        <div className="relative mx-auto max-w-[820px]">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint"
          >
            <Link href="/blog/" className="hover:text-ink">
              Blog
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink">{post.category}</span>
          </nav>
          <div className="mt-7 flex flex-wrap items-center gap-2.5">
            <span
              className="inline-flex items-center rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white shadow-glow"
              style={{ background: "var(--gradient)" }}
            >
              Coming soon
            </span>
            <span
              className="inline-flex items-center rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink"
              style={{ background: "var(--tint)", border: "1px solid var(--chip-border)" }}
            >
              {post.category}
            </span>
          </div>
          <span className="rule mt-5 mb-4 block" />
          <h1 className="font-display text-[clamp(1.9rem,4.2vw,3.25rem)] font-extrabold leading-[1.12] tracking-[-0.035em] text-ink text-balance">
            {lead} <span className="gradient-text">{grad}</span>
          </h1>
          <p className="mt-5 max-w-[620px] text-[16px] leading-relaxed text-faint">
            {post.excerpt}
          </p>
          <p className="mt-5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">
            In the writing queue · ~{post.readMinutes} min read when it ships
          </p>
        </div>
      </section>

      {/* Notify capture */}
      <section className="px-5">
        <div
          className="mx-auto grid max-w-[820px] items-center gap-6 rounded-[20px] p-7 md:grid-cols-2 md:p-9"
          style={{
            border: "1px solid transparent",
            backgroundImage: "linear-gradient(var(--surface),var(--surface)),var(--gradient)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box,border-box",
            boxShadow: "0 18px 44px var(--glow)",
          }}
        >
          <div className="min-w-0">
            <h2 className="font-display text-[clamp(1.2rem,2vw,1.6rem)] font-extrabold leading-[1.2] tracking-[-0.025em] text-ink">
              Get it the day <span className="gradient-text">it ships.</span>
            </h2>
            <p className="mt-2.5 max-w-[420px] text-[14.5px] leading-relaxed text-faint">
              Subscribe and this post lands in your inbox the morning it publishes — along
              with one operator&apos;s memo a week.
            </p>
          </div>
          <NewsletterForm sourcePage={`/blog/${post.slug}/`} />
        </div>
      </section>

      {/* Published posts while you wait */}
      <section className="px-5 py-14">
        <div className="mx-auto max-w-[820px]">
          <p className="eyebrow">Read these while you wait</p>
          <div className="mt-6 grid gap-3.5 sm:grid-cols-2">
            {PUBLISHED_POSTS.slice(0, 2).map((r) => {
              const [rLead, rGrad] = splitTitle(r.title, r.gradientWords);
              return (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}/`}
                  className="card card-hover flex flex-col overflow-hidden text-body"
                >
                  <MeshThumb variant={r.mesh} className="h-[110px]" />
                  <span className="flex flex-1 flex-col p-5">
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-faint">
                      {r.category} · {r.readMinutes} min read
                    </span>
                    <span className="mt-2.5 font-display text-[16px] font-extrabold leading-[1.35] tracking-[-0.02em] text-ink">
                      {rLead} <span className="gradient-text">{rGrad}</span>
                    </span>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[13.5px] font-semibold text-cyan">
                      Read article
                      <Icon name="chevron" className="h-3.5 w-3.5" strokeWidth={2.2} />
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
          <Link
            href="/blog/"
            className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan"
          >
            All articles
            <Icon name="chevron" className="h-[15px] w-[15px]" strokeWidth={2.2} />
          </Link>
        </div>
      </section>
    </>
  );
}
