import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/ui/JsonLd";
import CaseStudySubpage from "@/components/case-studies/CaseStudySubpage";
import { pageMetadata } from "@/lib/metadata";
import {
  breadcrumbSchema,
  caseStudyArticleSchema,
  faqPageSchema,
} from "@/lib/schema";
import { CASE_STUDY_DETAILS, getCaseStudy } from "@/lib/case-studies";

export function generateStaticParams() {
  return CASE_STUDY_DETAILS.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = getCaseStudy(params.slug);
  if (!c) return {};
  return pageMetadata({
    title: c.metaTitle,
    description: c.metaDescription,
    path: `/case-studies/${c.slug}/`,
    keywords: [
      `${c.stackName.toLowerCase()} case study`,
      `${c.industryLabel.toLowerCase()} ai automation`,
      "deployed ai system",
    ],
  });
}

export default function CaseStudyDetailPage({ params }: { params: { slug: string } }) {
  const study = getCaseStudy(params.slug);
  if (!study) notFound();

  const headline = `${study.heroLead} ${study.gradientWord}`.trim();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Case Studies", path: "/case-studies/" },
            { name: study.stackName, path: `/case-studies/${study.slug}/` },
          ]),
          caseStudyArticleSchema({
            slug: study.slug,
            headline,
            description: study.metaDescription,
            stackName: study.stackName,
            stackSlug: study.solutionSlug,
          }),
          faqPageSchema(study.faq),
        ]}
      />
      <CaseStudySubpage study={study} />
    </>
  );
}
