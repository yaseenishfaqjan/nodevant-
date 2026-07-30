import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/ui/JsonLd";
import SolutionSubpage from "@/components/solutions/SolutionSubpage";
import { pageMetadata } from "@/lib/metadata";
import {
  breadcrumbSchema,
  solutionDetailSchema,
  faqPageSchema,
} from "@/lib/schema";
import { SOLUTION_DETAILS, getSolution } from "@/lib/solutions";

export function generateStaticParams() {
  return SOLUTION_DETAILS.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = getSolution(params.slug);
  if (!s) return {};
  return pageMetadata({
    title: s.metaTitle,
    description: s.metaDescription,
    path: `/solutions/${s.slug}/`,
    keywords: [s.name.toLowerCase(), `${s.industry.toLowerCase()} automation`, "ai operating system"],
  });
}

export default function SolutionDetailPage({ params }: { params: { slug: string } }) {
  const solution = getSolution(params.slug);
  if (!solution) notFound();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Solutions", path: "/solutions/" },
            { name: solution.name, path: `/solutions/${solution.slug}/` },
          ]),
          solutionDetailSchema({
            name: solution.name,
            slug: solution.slug,
            description: solution.description,
            poweredBy: solution.poweredBy,
          }),
          faqPageSchema(solution.faq),
        ]}
      />
      <SolutionSubpage solution={solution} />
    </>
  );
}
