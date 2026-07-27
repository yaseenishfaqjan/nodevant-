import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/ui/JsonLd";
import BlogPost from "@/components/blog/BlogPost";
import ComingSoon from "@/components/blog/ComingSoon";
import LegacyRedirect from "@/components/blog/LegacyRedirect";
import { pageMetadata } from "@/lib/metadata";
import { blogPostingSchema, breadcrumbSchema } from "@/lib/schema";
import { BLOG_POSTS, LEGACY_BLOG_REDIRECTS, getBlogPost } from "@/lib/blog-posts";

export function generateStaticParams() {
  return [
    ...BLOG_POSTS.map((p) => ({ slug: p.slug })),
    ...Object.keys(LEGACY_BLOG_REDIRECTS).map((slug) => ({ slug })),
  ];
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const legacy = LEGACY_BLOG_REDIRECTS[params.slug];
  if (legacy) {
    return {
      title: { absolute: "This article moved | Nodevant" },
      robots: { index: false, follow: true },
      alternates: { canonical: `https://nodevant.com/blog/${legacy}/` },
    };
  }

  const post = getBlogPost(params.slug);
  if (!post) return {};

  if (!post.published) {
    // Placeholder pages resolve gracefully but stay out of the index.
    return {
      ...pageMetadata({
        title: `${post.metaTitle.replace(" | Nodevant", "")} — Coming Soon | Nodevant`,
        description: post.metaDescription,
        path: `/blog/${post.slug}/`,
        keywords: post.keywords,
      }),
      robots: { index: false, follow: true },
    };
  }

  return pageMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    path: `/blog/${post.slug}/`,
    keywords: post.keywords,
  });
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const legacy = LEGACY_BLOG_REDIRECTS[params.slug];
  if (legacy) return <LegacyRedirect href={`/blog/${legacy}/`} />;

  const post = getBlogPost(params.slug);
  if (!post) notFound();

  if (!post.published) return <ComingSoon post={post} />;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog/" },
            { name: post.title, path: `/blog/${post.slug}/` },
          ]),
          blogPostingSchema(post),
        ]}
      />
      <BlogPost post={post} />
    </>
  );
}
