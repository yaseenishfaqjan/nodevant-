import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/ui/JsonLd";
import BlogHub from "@/components/blog/BlogHub";
import NewsletterForm from "@/components/blog/NewsletterForm";
import { pageMetadata } from "@/lib/metadata";
import { blogSchema, breadcrumbSchema } from "@/lib/schema";
import { PUBLISHED_POSTS } from "@/lib/blog-posts";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "The Nodevant Blog | AI Automation, Explained",
    description:
      "Guides, comparisons and real numbers on AI automation — n8n vs Make vs Zapier, year-one ROI math, and a practical voice AI buyer's guide. Written by operators.",
    path: "/blog/",
    keywords: [
      "ai automation blog",
      "n8n vs make vs zapier",
      "workflow automation roi",
      "voice ai agents guide",
    ],
  }),
  alternates: {
    canonical: "https://nodevant.com/blog/",
    types: { "application/rss+xml": "/feed.xml" },
  },
};

export default function BlogPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog/" },
          ]),
          blogSchema(PUBLISHED_POSTS),
        ]}
      />

      {/* Hero */}
      <section className="grid-overlay relative overflow-hidden px-5 pb-[52px] pt-32 md:pt-40">
        <div className="pointer-events-none absolute inset-0 radial-glow" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1280px]">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint"
          >
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink">Blog</span>
          </nav>
          <p className="eyebrow mt-6">The Nodevant blog</p>
          <span className="rule mt-2.5 mb-4 block" />
          <h1 className="font-display text-[clamp(1.9rem,4.2vw,3.5rem)] font-extrabold leading-[1.1] tracking-[-0.035em] text-ink text-balance">
            AI automation, <span className="gradient-text">explained.</span>
          </h1>
          <p className="mt-5 max-w-[620px] text-[clamp(15px,1.3vw,18px)] leading-[1.65] text-body">
            Guides, comparisons and real numbers to help you automate the right things, in
            the right order.
          </p>
          <p className="mt-6 font-mono text-[10.5px] uppercase leading-[1.8] tracking-[0.14em] text-faint">
            New post weekly · Written by operators · No content-farm AI slop
          </p>
        </div>
      </section>

      <BlogHub />

      {/* Newsletter */}
      <section id="newsletter" className="px-5 pb-[clamp(56px,6vw,88px)]">
        <div
          className="mx-auto grid max-w-[1280px] items-center gap-6 rounded-[20px] p-7 md:grid-cols-2 md:p-10"
          style={{
            border: "1px solid transparent",
            backgroundImage: "linear-gradient(var(--surface),var(--surface)),var(--gradient)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box,border-box",
            boxShadow: "0 18px 44px var(--glow)",
          }}
        >
          <div className="min-w-0">
            <h2 className="font-display text-[clamp(1.3rem,2.2vw,1.75rem)] font-extrabold leading-[1.2] tracking-[-0.025em] text-ink">
              Get the <span className="gradient-text">operator&apos;s memo.</span>
            </h2>
            <p className="mt-3 max-w-[420px] text-[14.5px] leading-relaxed text-faint">
              One post a week. Real numbers, no fluff. Unsubscribe anytime.
            </p>
          </div>
          <NewsletterForm sourcePage="/blog/" />
        </div>
      </section>
    </>
  );
}
