import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTABand from "@/components/ui/CTABand";
import JsonLd from "@/components/ui/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";
import { ARTICLES, getArticle } from "@/lib/articles";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const article = getArticle(params.slug);
  if (!article)
    return pageMetadata({ title: "Article", description: "", path: "/blog/" });
  return pageMetadata({
    title: article.metaTitle,
    description: article.description,
    path: `/blog/${article.slug}/`,
    keywords: article.keywords,
    ogImage: article.heroImage,
  });
}

function articleSchema(slug: string) {
  const a = getArticle(slug)!;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.h1,
    description: a.description,
    datePublished: a.date,
    dateModified: a.date,
    articleSection: a.category,
    url: `${SITE.url}/blog/${a.slug}/`,
    image: `${SITE.url}${a.heroImage}`,
    author: {
      "@type": "Person",
      name: "Yaseen",
      jobTitle: "Founder & AI Systems Engineer",
      worksFor: { "@type": "Organization", name: SITE.name, url: SITE.url },
      url: `${SITE.url}/about/`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: `${SITE.url}/logo.svg` },
    },
    mainEntityOfPage: `${SITE.url}/blog/${a.slug}/`,
  };
}

function faqSchema(slug: string) {
  const a = getArticle(slug)!;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: a.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  const related = article.related
    .map((slug) => getArticle(slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  return (
    <>
      <JsonLd
        data={[
          articleSchema(params.slug),
          faqSchema(params.slug),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog/" },
            { name: article.h1, path: `/blog/${article.slug}/` },
          ]),
        ]}
      />

      <article className="pt-28 md:pt-32">
        <div className="container-x">
          <div className="mx-auto max-w-3xl">
            {/* Meta */}
            <div className="mb-5 flex flex-wrap items-center gap-3 text-sm">
              <Link href="/blog/" className="text-cyan hover:underline">
                ← All articles
              </Link>
              <span className="text-faint">·</span>
              <span className="font-semibold uppercase tracking-wider text-cyan">
                {article.category}
              </span>
              <span className="text-faint">·</span>
              <span className="text-faint">{formatDate(article.date)}</span>
              <span className="text-faint">·</span>
              <span className="text-faint">{article.readTime}</span>
            </div>

            {/* H1 */}
            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
              {article.h1}
            </h1>

            {/* Author byline — E-E-A-T signal */}
            <div className="mt-5 flex items-center gap-3 border-y border-line py-4">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gradient font-display text-sm font-bold text-bg"
                aria-hidden="true"
              >
                YI
              </span>
              <span className="text-sm">
                <span className="text-muted">By </span>
                <Link href="/about/" className="font-semibold text-ink hover:text-cyan">
                  Yaseen
                </Link>
                <span className="text-faint"> · Founder & AI Systems Engineer at Nodevant</span>
              </span>
            </div>

            {/* Hero image */}
            <div className="relative mt-8 aspect-[1200/630] overflow-hidden rounded-2xl border border-line">
              <Image
                src={article.heroImage}
                alt={article.heroAlt}
                width={1200}
                height={630}
                priority
                className="h-full w-full object-cover"
              />
            </div>

            {/* Body */}
            <div className="article mt-10">{article.body}</div>

            {/* FAQ */}
            <section className="mt-16">
              <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
                Frequently Asked Questions
              </h2>
              <div className="mt-6 space-y-4">
                {article.faqs.map((f, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-line bg-white/[0.02] p-6"
                  >
                    <h3 className="font-display text-lg font-semibold text-ink">
                      {f.q}
                    </h3>
                    <p className="mt-2 leading-relaxed text-muted">{f.a}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Related */}
            {related.length > 0 && (
              <section className="mt-16 border-t border-line pt-10">
                <h2 className="font-display text-2xl font-bold text-ink">
                  Keep reading
                </h2>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/blog/${r.slug}/`}
                      className="glow-card group"
                    >
                      <span className="text-xs font-semibold uppercase tracking-wider text-cyan">
                        {r.category}
                      </span>
                      <h3 className="mt-2 font-display text-lg font-semibold text-ink transition-colors group-hover:text-cyan">
                        {r.h1}
                      </h3>
                      <span className="mt-3 inline-block text-sm font-semibold text-cyan">
                        Read article →
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </article>

      <CTABand />
    </>
  );
}
