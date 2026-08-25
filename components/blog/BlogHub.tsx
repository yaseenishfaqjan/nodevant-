"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import MeshThumb from "@/components/blog/MeshThumb";
import {
  BLOG_CATEGORIES,
  BLOG_POSTS,
  formatPostDate,
  splitTitle,
  type BlogPost,
} from "@/lib/blog-posts";

const categorySlug = (c: string) => c.toLowerCase().replace(/ /g, "-");

function PostCard({ post }: { post: BlogPost }) {
  const [lead, grad] = splitTitle(post.title, post.gradientWords);
  return (
    <Link
      href={post.published ? `/blog/${post.slug}/` : `/blog/${post.slug}/?coming-soon=true`}
      className={`card card-hover flex flex-col overflow-hidden text-body ${post.published ? "" : "opacity-[0.82]"}`}
    >
      <MeshThumb variant={post.mesh} src={post.cover} className="h-[150px]" />
      <span className="flex flex-1 flex-col p-[22px]">
        <span className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] ${
              post.published ? "text-ink" : "border border-line-strong bg-elevated text-faint"
            }`}
            style={
              post.published
                ? { background: "var(--tint)", border: "1px solid var(--chip-border)" }
                : undefined
            }
          >
            {post.category}
          </span>
          {!post.published && (
            <span className="inline-flex items-center rounded-full border border-line-strong bg-elevated px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-faint">
              Coming soon
            </span>
          )}
        </span>
        <span className="mt-3.5 block font-mono text-[9.5px] uppercase tracking-[0.12em] text-faint">
          {post.published ? formatPostDate(post.date) : "Publishing soon"} · {post.readMinutes} min
          read
        </span>
        <span className="mt-3 font-display text-[17.5px] font-extrabold leading-[1.32] tracking-[-0.02em] text-ink">
          {lead} <span className="gradient-text">{grad}</span>
        </span>
        <span className="mb-[18px] mt-[11px] text-[13.5px] leading-relaxed text-faint">
          {post.excerpt}
        </span>
        <span className="mt-auto inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-cyan">
          {post.published ? "Read article" : "See what’s coming"}
          <Icon name="chevron" className="h-3.5 w-3.5" strokeWidth={2.2} />
        </span>
      </span>
    </Link>
  );
}

function FeaturedCard({ post }: { post: BlogPost }) {
  const [lead, grad] = splitTitle(post.title, post.gradientWords);
  return (
    <Link
      href={`/blog/${post.slug}/`}
      className="grid overflow-hidden rounded-[20px] border border-line-strong bg-surface text-body shadow-card transition-[border-color,background-color] duration-200 hover:border-chip-border lg:grid-cols-[1.25fr_0.75fr]"
    >
      <span className="flex min-w-0 flex-col p-7 md:p-10">
        <span className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white shadow-glow" style={{ background: "var(--gradient)" }}>
            Featured
          </span>
          <span
            className="inline-flex items-center rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink"
            style={{ background: "var(--tint)", border: "1px solid var(--chip-border)" }}
          >
            {post.category}
          </span>
        </span>
        <span className="mt-3.5 block font-mono text-[9.5px] uppercase tracking-[0.12em] text-faint">
          {formatPostDate(post.date)} · {post.readMinutes} min read
        </span>
        <span className="mt-3.5 font-display text-[clamp(1.4rem,2.6vw,2.1rem)] font-extrabold leading-[1.2] tracking-[-0.03em] text-ink">
          {lead} <span className="gradient-text">{grad}</span>
        </span>
        <span className="mt-3.5 max-w-[560px] text-[15px] leading-relaxed text-faint">
          {post.excerpt}
        </span>
        <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[14.5px] font-semibold text-cyan">
          Read article
          <Icon name="chevron" className="h-[15px] w-[15px]" strokeWidth={2.2} />
        </span>
      </span>
      <MeshThumb variant={post.mesh} src={post.cover} priority className="min-h-[180px] border-line lg:min-h-full lg:border-l" />
    </Link>
  );
}

export default function BlogHub() {
  const [category, setCategory] = useState<string>("All");

  // URL param persistence (?category=voice-ai) without a useSearchParams
  // Suspense bailout — read once on mount, write via replaceState on change.
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("category");
    const match = param && BLOG_CATEGORIES.find((c) => categorySlug(c) === param);
    if (match && match !== "All") setCategory(match);
  }, []);

  function selectCategory(c: string) {
    const next = category === c ? "All" : c;
    const qs = next === "All" ? "" : `?category=${categorySlug(next)}`;
    try {
      window.history.replaceState(null, "", window.location.pathname + qs);
    } catch {
      /* history unavailable */
    }
    setCategory(next);
  }

  const featured = BLOG_POSTS.find((p) => p.featured && p.published);
  const shown = BLOG_POSTS.filter((p) => category === "All" || p.category === category);
  const gridPosts = shown.filter(
    (p) => !(featured && category === "All" && p.slug === featured.slug),
  );

  return (
    <>
      {/* Filter */}
      <section className="px-5">
        <div className="mx-auto max-w-[1280px] border-t border-line pt-[clamp(32px,3.5vw,48px)]">
          <p className="mb-2.5 font-mono text-[9.5px] uppercase tracking-[0.16em] text-faint">
            Category
          </p>
          <div
            role="group"
            aria-label="Filter posts by category"
            className="flex gap-2 overflow-x-auto pb-1.5 md:flex-wrap md:overflow-visible md:pb-0"
          >
            {BLOG_CATEGORIES.map((c) => {
              const on = category === c;
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={on}
                  onClick={() => selectCategory(c)}
                  className={`inline-flex min-h-[44px] flex-shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-full px-4 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors duration-200 ${
                    on
                      ? "border border-transparent text-white shadow-glow"
                      : "border border-line-strong bg-surface text-body"
                  }`}
                  style={on ? { background: "var(--gradient)" } : undefined}
                >
                  {c}
                </button>
              );
            })}
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3.5">
            <p
              aria-live="polite"
              className="m-0 font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint"
            >
              {category === "All"
                ? `Showing all ${BLOG_POSTS.length} posts`
                : `${shown.length} ${shown.length === 1 ? "post" : "posts"} in ${category}`}
            </p>
            {category !== "All" && (
              <button
                type="button"
                onClick={() => selectCategory("All")}
                className="inline-flex min-h-[36px] items-center rounded-full border border-line-strong px-3.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink transition-colors duration-200 hover:bg-elevated"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Posts */}
      <section id="posts" className="px-5 pb-[clamp(48px,5vw,80px)] pt-[clamp(32px,3.5vw,44px)]">
        <div className="mx-auto max-w-[1280px]">
          {featured && category === "All" && <FeaturedCard post={featured} />}

          {gridPosts.length > 0 && (
            <div className="mt-[18px] grid items-start gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
              {gridPosts.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          )}

          {shown.length === 0 && (
            <div className="rounded-[18px] border border-line-strong bg-surface px-7 py-10 text-center">
              <p className="mx-auto max-w-[480px] text-base leading-relaxed text-body">
                No posts in that category yet. Reset the filter, or subscribe below and
                we&apos;ll send the next one.
              </p>
              <button
                type="button"
                onClick={() => selectCategory("All")}
                className="btn-secondary mt-5"
              >
                Reset filter
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
