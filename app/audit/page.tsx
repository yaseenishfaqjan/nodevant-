import type { Metadata } from "next";
import AuditWizard from "@/components/audit/AuditWizard";
import JsonLd from "@/components/ui/JsonLd";
import { webApplicationSchema, breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title:
    "Free Automation Audit | Find Your #1 AI Automation Opportunity — Nodevant",
  description:
    "Take our free 90-second automation audit. Answer 7 questions about your business and get a personalized report showing your biggest automation opportunity and estimated ROI.",
  path: "/audit/",
  keywords: [
    "automation audit",
    "ai automation roi calculator",
    "free automation assessment",
    "workflow automation cost",
  ],
  ogImage: "/og-audit.png",
});

export default function AuditPage() {
  return (
    <>
      <JsonLd
        data={[
          webApplicationSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Free Automation Audit", path: "/audit/" },
          ]),
        ]}
      />
      {/* Visually-hidden H1 for SEO; wizard renders the active question as a heading */}
      <h1 className="sr-only">
        Free AI Automation Audit — Find Your #1 Automation Opportunity
      </h1>
      <AuditWizard />
    </>
  );
}
