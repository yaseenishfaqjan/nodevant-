import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/ui/JsonLd";
import ServiceSubpage from "@/components/services/ServiceSubpage";
import { pageMetadata } from "@/lib/metadata";
import {
  breadcrumbSchema,
  serviceDetailSchema,
  faqPageSchema,
} from "@/lib/schema";
import { SERVICE_DETAILS, getService } from "@/lib/services";

export function generateStaticParams() {
  return SERVICE_DETAILS.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = getService(params.slug);
  if (!s) return {};
  return pageMetadata({
    title: s.metaTitle,
    description: s.metaDescription,
    path: `/services/${s.slug}/`,
    keywords: [s.name.toLowerCase(), "ai automation", ...s.tools.map((t) => t.toLowerCase())],
  });
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getService(params.slug);
  if (!service) notFound();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services/" },
            { name: service.name, path: `/services/${service.slug}/` },
          ]),
          serviceDetailSchema({
            name: service.name,
            slug: service.slug,
            description: service.description,
            priceNum: service.priceNum,
            rangeLine: service.rangeLine,
          }),
          faqPageSchema(service.faq),
        ]}
      />
      <ServiceSubpage service={service} />
    </>
  );
}
