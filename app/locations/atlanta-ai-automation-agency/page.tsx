import MetroLocationPage from "@/components/locations/MetroLocationPage";
import JsonLd from "@/components/ui/JsonLd";
import { ATLANTA_LOCATION } from "@/lib/locations";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqPageSchema, localBusinessSchema, metroServiceSchema } from "@/lib/schema";

const metro = ATLANTA_LOCATION;

export const metadata = pageMetadata({
  title: metro.metaTitle,
  description: metro.metaDescription,
  path: "/locations/atlanta-ai-automation-agency/",
  keywords: metro.keywords,
  ogImage: "/og/locations/atlanta-ai-automation-agency.png",
});

export default function AtlantaLocationPage() {
  const path = "/locations/atlanta-ai-automation-agency/";
  return (
    <>
      <JsonLd
        data={[
          localBusinessSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Locations", path: "/locations/" },
            { name: "Atlanta and McDonough, GA", path },
          ]),
          faqPageSchema(metro.faqs),
          metroServiceSchema({
            name: "AI automation for Atlanta",
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
