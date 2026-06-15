import Hero from "@/components/home/Hero";
import TrustedBy from "@/components/home/TrustedBy";
import TrustLine from "@/components/ui/TrustLine";
import AuditCTA from "@/components/home/AuditCTA";
import Services from "@/components/home/Services";
import Solutions from "@/components/home/Solutions";
import Process from "@/components/home/Process";
import Stats from "@/components/home/Stats";
import FAQ from "@/components/home/FAQ";
import FinalCTA from "@/components/home/FinalCTA";
import JsonLd from "@/components/ui/JsonLd";
import {
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
  faqSchema,
} from "@/lib/schema";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title:
    "Nodevant — AI Automation Agency | Custom AI Agents & Workflow Automation",
  description:
    "Nodevant builds enterprise-grade AI agents, workflow automations, and intelligent integrations that eliminate busywork and scale revenue. Get your free automation audit.",
  path: "/",
  keywords: [
    "ai automation agency",
    "ai automation agency USA",
    "ai automation agency Georgia",
    "ai automation agency McDonough GA",
    "workflow automation agency",
    "ai agents for business",
    "n8n automation agency",
  ],
});

export default function Home() {
  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          localBusinessSchema(),
          websiteSchema(),
          faqSchema(),
        ]}
      />
      <Hero />
      <TrustedBy />
      <div className="pt-12">
        <TrustLine />
      </div>
      <AuditCTA />
      <Services />
      <Solutions />
      <Process />
      <Stats />
      <FAQ />
      <FinalCTA />
    </>
  );
}
