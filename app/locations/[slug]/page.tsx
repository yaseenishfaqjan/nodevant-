import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MetroLocationPage from "@/components/locations/MetroLocationPage";
import JsonLd from "@/components/ui/JsonLd";
import { METRO_LOCATIONS, getMetro } from "@/lib/locations";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqPageSchema, metroServiceSchema } from "@/lib/schema";

export function generateStaticParams() {
  return METRO_LOCATIONS.map((metro) => ({ slug: metro.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const metro = getMetro(params.slug);
  if (!metro) return {};
  return pageMetadata({
    title: metro.metaTitle,
    description: metro.metaDescription,
    path: `/locations/${metro.slug}/`,
    keywords: metro.keywords,
  });
}

export default function MetroPage({ params }: { params: { slug: string } }) {
  const metro = getMetro(params.slug);
  if (!metro) notFound();
  const path = `/locations/${metro.slug}/`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Locations", path: "/locations/" },
            { name: metro.label, path },
          ]),
          faqPageSchema(metro.faqs),
          metroServiceSchema({
            name: `AI automation for ${metro.label}`,
            description: metro.definition,
            path,
            city: metro.schemaCity,
            state: metro.state,
          }),
        ]}
      />
      <MetroLocationPage metro={metro} />
    </>
  );
}
