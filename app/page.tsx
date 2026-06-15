import Hero from "@/components/home/Hero";
import TrustedBy from "@/components/home/TrustedBy";
import AuditCTA from "@/components/home/AuditCTA";
import Services from "@/components/home/Services";
import Solutions from "@/components/home/Solutions";
import Process from "@/components/home/Process";
import Stats from "@/components/home/Stats";
import FAQ from "@/components/home/FAQ";
import FinalCTA from "@/components/home/FinalCTA";
import JsonLd from "@/components/ui/JsonLd";
import { organizationSchema, websiteSchema, faqSchema } from "@/lib/schema";

export default function Home() {
  return (
    <>
      <JsonLd data={[organizationSchema(), websiteSchema(), faqSchema()]} />
      <Hero />
      <TrustedBy />
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
