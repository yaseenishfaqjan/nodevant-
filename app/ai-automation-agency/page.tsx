import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import TrustLine from "@/components/ui/TrustLine";
import CTABand from "@/components/ui/CTABand";
import ScrollReveal from "@/components/ui/ScrollReveal";
import JsonLd from "@/components/ui/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";
import { SERVICES } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title: "AI Automation Agency Services | Nodevant",
  description:
    "Nodevant is an AI automation agency that builds custom AI agents, workflow automations, and integrations. See what an AI automation agency does, what it costs, and how to choose one.",
  path: "/ai-automation-agency/",
  keywords: [
    "ai automation agency",
    "workflow automation agency",
    "ai agents for business",
    "business automation consultant",
    "n8n automation agency",
  ],
});

const FAQS = [
  {
    q: "What is an AI automation agency?",
    a: "An AI automation agency designs, builds, and maintains custom systems that replace repetitive human work with intelligent software — workflow automations, AI agents, and integrations tailored to your exact tools and processes.",
  },
  {
    q: "How much does an AI automation agency cost?",
    a: "Focused automations typically start around $1,200, AI agents and integrations run $1,800–$4,500, and larger custom builds scale from there. Every Nodevant engagement begins with a free audit that estimates your ROI before you commit.",
  },
  {
    q: "How is an AI automation agency different from Zapier or Make?",
    a: "Zapier and Make are tools that connect apps with simple triggers. An agency builds systems around your real business logic — handling edge cases, AI decisions, and custom data — on top of those tools where they fit and with custom code where they don't.",
  },
  {
    q: "How long does it take to build an automation?",
    a: "Most projects go live in 1–3 weeks. Simple workflow automations ship in days; voice agents and custom AI builds take 2–5 weeks depending on complexity.",
  },
];

function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

function serviceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "AI Automation Agency",
    name: "AI Automation Agency Services",
    description:
      "Custom AI agents, workflow automation, and system integration for growth-stage businesses.",
    url: `${SITE.url}/ai-automation-agency/`,
    provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
    areaServed: "Worldwide",
  };
}

export default function AiAutomationAgencyPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema(),
          faqSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "AI Automation Agency", path: "/ai-automation-agency/" },
          ]),
        ]}
      />
      <PageHero
        eyebrow="AI Automation Agency"
        title={
          <>
            The AI automation agency that proves your{" "}
            <span className="gradient-text">ROI before you commit</span>
          </>
        }
        subtitle="Nodevant builds custom AI agents, workflow automations, and integrations that eliminate busywork and scale revenue — and we estimate the return before writing a line of code."
      />

      <div className="pb-12">
        <TrustLine />
      </div>

      <section className="pb-8">
        <div className="container-x">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <div className="article">
                <h2>What does an AI automation agency actually do?</h2>
                <p>
                  An <strong>AI automation agency</strong> designs and builds
                  systems that do your repetitive work for you. Instead of hiring
                  more people to chase leads, copy data between tools, answer the
                  same questions, and build the same reports, you get
                  AI-powered workflows that run 24/7 without errors. The three
                  core deliverables are <strong>workflow automations</strong>{" "}
                  (multi-step processes that run on triggers),{" "}
                  <strong>AI agents</strong> (software that reasons, decides, and
                  acts), and <strong>system integrations</strong> (connecting
                  your CRM, email, and data so nothing is copied by hand).
                </p>

                <h2>Why businesses choose Nodevant</h2>
                <p>
                  Most agencies look the same and ask you to “book a call” before
                  you understand the value. We do the opposite — we lead with
                  proof and ROI:
                </p>
                <ul>
                  <li>
                    <strong>ROI before you commit.</strong> Our free{" "}
                    <Link href="/audit/">90-second automation audit</Link>{" "}
                    estimates your annual savings, payback period, and the exact
                    system to build — before you pay anything.
                  </li>
                  <li>
                    <strong>We run our own systems.</strong> We&apos;ve shipped 6
                    production AI systems across fintech, manufacturing, and SaaS.
                    See the <Link href="/case-studies/">case studies</Link>.
                  </li>
                  <li>
                    <strong>Tool-agnostic.</strong> We build on n8n, Make,
                    LangChain, and VAPI where they fit and write custom code where
                    they don&apos;t — no lock-in.
                  </li>
                  <li>
                    <strong>Fast.</strong> Most automations go live in 1–3 weeks
                    with previews at every milestone.
                  </li>
                </ul>

                <h2>What we automate</h2>
                <p>
                  Our <Link href="/services/">six core services</Link> cover the
                  highest-ROI workflows in most businesses:
                </p>
                <ul>
                  {SERVICES.map((s) => (
                    <li key={s.slug}>
                      <strong>{s.title}</strong> — {s.short} (from{" "}
                      {s.startingPrice})
                    </li>
                  ))}
                </ul>

                <h2>How much does it cost?</h2>
                <p>
                  Focused automations start around <strong>$1,200</strong>, AI
                  agents and integrations run <strong>$1,800–$4,500</strong>, and
                  full custom builds scale from there. Because we quantify the ROI
                  up front, most clients see the project pay for itself within the
                  first 1–2 months. Read more in{" "}
                  <Link href="/blog/workflow-automation-roi/">
                    the ROI of workflow automation
                  </Link>{" "}
                  or learn{" "}
                  <Link href="/blog/what-is-an-ai-automation-agency/">
                    what an AI automation agency is
                  </Link>
                  .
                </p>

                <h2>Frequently asked questions</h2>
                {FAQS.map((f) => (
                  <div key={f.q}>
                    <h3>{f.q}</h3>
                    <p>{f.a}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
