import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import CTABand from "@/components/ui/CTABand";
import ScrollReveal from "@/components/ui/ScrollReveal";
import JsonLd from "@/components/ui/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { BLOG_POSTS } from "@/lib/content";
import { getArticle } from "@/lib/articles";

export const metadata: Metadata = pageMetadata({
  title: "Blog | AI Automation Guides, Comparisons & ROI — Nodevant",
  description:
    "Practical guides on AI automation, workflow tools, and ROI. Learn how to automate lead generation, compare n8n vs Make vs Zapier, and deploy voice AI agents.",
  path: "/blog/",
  keywords: [
    "ai automation blog",
    "n8n vs make vs zapier",
    "how to automate lead generation",
    "workflow automation guide",
  ],
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog/" },
        ])}
      />
      <PageHero
        eyebrow="The Nodevant Blog"
        title={
          <>
            AI automation, <span className="gradient-text">explained</span>
          </>
        }
        subtitle="Guides, comparisons, and real numbers to help you automate the right things, in the right order."
      />

      <section className="pb-8">
        <div className="container-x">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map((post, i) => {
              const article = getArticle(post.slug);
              return (
              <ScrollReveal key={post.slug} delay={(i % 3) * 0.08}>
                <Link
                  href={`/blog/${post.slug}/`}
                  className="glow-card group flex h-full flex-col !p-0 overflow-hidden"
                >
                  {/* Cover */}
                  <div className="relative mb-5 h-40 w-full overflow-hidden bg-brand-gradient-soft">
                    {article && (
                      <Image
                        src={article.heroImage}
                        alt={article.heroAlt}
                        width={1200}
                        height={630}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                    <span className="absolute left-3 top-3 rounded-full border border-cyan/30 bg-bg/70 px-3 py-1 font-display text-xs font-semibold uppercase tracking-widest text-cyan backdrop-blur">
                      {post.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col px-7 pb-7">
                  <div className="mb-3 flex items-center gap-3 text-xs text-faint">
                    <span>{formatDate(post.date)}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="font-display text-xl font-bold leading-snug text-ink transition-colors group-hover:text-cyan">
                    {post.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {post.excerpt}
                  </p>
                  <span className="mt-5 text-sm font-semibold text-cyan">
                    Read article →
                  </span>
                  </div>
                </Link>
              </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
