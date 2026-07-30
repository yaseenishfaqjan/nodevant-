import Hero from "@/components/home/Hero";
import LiveROITicker from "@/components/home/LiveROITicker";
import TrustMarquee from "@/components/home/TrustMarquee";
import Services from "@/components/home/Services";
import SocialAutopilot from "@/components/home/SocialAutopilot";
import Process from "@/components/home/Process";
import Outcomes from "@/components/home/Outcomes";
import Work from "@/components/home/Work";
import WhyNodevant from "@/components/home/WhyNodevant";
import Industries from "@/components/home/Industries";
import Clients from "@/components/home/Clients";
import Workforce from "@/components/home/Workforce";
import FAQ from "@/components/home/FAQ";
import AuditBooking from "@/components/home/AuditBooking";
import FinalCTA from "@/components/home/FinalCTA";
import Insights from "@/components/home/Insights";
import JsonLd from "@/components/ui/JsonLd";
import {
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
  faqSchema,
  productListSchema,
  socialServiceSchema,
} from "@/lib/schema";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title:
    "Nodevant — AI Automation Agency | AI Agents, Workflow Automation & Voice AI",
  description:
    "Nodevant builds fully deployed AI agents, workflow automation and voice AI for businesses worldwide — live in 1–3 weeks, fixed pricing, monitored after launch. Get your free automation audit.",
  path: "/",
  keywords: [
    "ai automation agency",
    "ai automation agency USA",
    "ai automation agency Georgia",
    "ai automation agency McDonough GA",
    "workflow automation agency",
    "ai agents for business",
    "social media automation agency",
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
          socialServiceSchema(),
          productListSchema(),
          faqSchema(),
        ]}
      />
      <Hero />
      <LiveROITicker />
      <TrustMarquee />
      <Services />
      <SocialAutopilot />
      <Process />
      <Outcomes />
      <Work />
      <WhyNodevant />
      <Industries />
      <Clients />
      <Workforce />
      <FAQ />
      <AuditBooking />
      <FinalCTA />
      <Insights />
    </>
  );
}
