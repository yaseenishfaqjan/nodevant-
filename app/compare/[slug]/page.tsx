import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ComparisonArticle from "@/components/compare/ComparisonArticle";
import JsonLd from "@/components/ui/JsonLd";
import { COMPARISON_PAGES, getComparison } from "@/lib/comparisons";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";

export function generateStaticParams() {
  return COMPARISON_PAGES.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = getComparison(params.slug);
  if (!page) return {};
  return pageMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/compare/${page.slug}/`,
    keywords: page.keywords,
  });
}

export default function ComparisonDetailPage({ params }: { params: { slug: string } }) {
  const page = getComparison(params.slug);
  if (!page) notFound();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Compare", path: "/compare/" },
            { name: page.name, path: `/compare/${page.slug}/` },
          ]),
          faqPageSchema(page.faq),
        ]}
      />
      <ComparisonArticle page={page} />
    </>
  );
}
