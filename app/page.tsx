import Image from "next/image";
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
  title: "Nodevant | AI Automation Agency & AI Agents",
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

      {/* Hero showcase visual — cinematic AI core, blends into the page */}
      <section className="relative -mt-8 overflow-hidden pb-6 md:-mt-16">
        <div className="container-x">
          <div className="relative mx-auto max-w-6xl">
            <Image
              src="/images/hero-main.webp"
              alt="Nodevant AI automation core connecting your business tools — email, calendar, CRM, phone, chat, and data"
              width={1280}
              height={543}
              priority
              className="h-auto w-full"
            />
            {/* Edge fades so the dark image melts into the page background */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-bg to-transparent" />
          </div>
        </div>
      </section>

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
