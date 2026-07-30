import type { Metadata } from "next";
import JsonLd from "@/components/ui/JsonLd";
import ReverseAuditPage from "@/components/reverse-audit/ReverseAuditPage";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Reverse Audit — We Scan Your Site for Automation Gaps | Nodevant",
  description:
    "Paste your URL and Nodevant scans your public website in ~20 seconds, returning up to three automation opportunities we can see from the outside — no signup, no email, nothing stored.",
  path: "/reverse-audit/",
  keywords: [
    "reverse audit",
    "website automation audit",
    "free automation scan",
    "ai automation opportunities",
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Reverse Audit", path: "/reverse-audit/" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Nodevant Reverse Audit",
            url: `${SITE.url}/reverse-audit/`,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            description:
              "Scans a public website and returns up to three automation opportunities. No signup, no email, nothing stored.",
            provider: { "@type": "Organization", name: "Nodevant", url: SITE.url },
          },
        ]}
      />
      <ReverseAuditPage />
    </>
  );
}
