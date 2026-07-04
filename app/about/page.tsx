import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import CTABand from "@/components/ui/CTABand";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import JsonLd from "@/components/ui/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "About Nodevant | The AI Automation Agency That Proves ROI First",
  description:
    "Nodevant is an AI automation agency on a mission to give every business its time back. Learn what makes us different and meet the team behind the automations.",
  path: "/about/",
  keywords: ["about nodevant", "ai automation agency", "business automation consultant"],
});

const DIFFERENTIATORS = [
  {
    icon: "🎯",
    title: "ROI before you commit",
    desc: "We're the only agency that shows you your estimated return before you ever book a call. No black boxes, no vague promises.",
  },
  {
    icon: "⚡",
    title: "Ship in weeks, not quarters",
    desc: "Most automations go live in 1–3 weeks. You see working previews at every milestone, not a big reveal at the end.",
  },
  {
    icon: "🧩",
    title: "Tool-agnostic by design",
    desc: "We recommend the right stack for your problem — n8n, Make, custom code — not whatever we happen to resell.",
  },
  {
    icon: "🤝",
    title: "We stay after launch",
    desc: "94% of clients stay past their first project. We monitor, tune, and expand your systems as you grow.",
  },
];

// Real businesses we own and operate — proof we build systems that run companies,
// not just demos. Linked to the matching industry solution where relevant.
const OWNED_BUSINESSES: {
  name: string;
  industry: string;
  icon: string;
  href: string;
  external?: boolean;
}[] = [
  {
    name: "Storehouse360",
    industry: "Fintech · Financial Operating System",
    icon: "💳",
    href: "https://storehouse360.com",
    external: true,
  },
  {
    name: "Scalaro",
    industry: "B2B SaaS Sales",
    icon: "🤖",
    href: "https://scalaro.io",
    external: true,
  },
  {
    name: "Fabrioza",
    industry: "Custom Manufacturing",
    icon: "🏭",
    href: "https://fabrioza.com",
    external: true,
  },
  {
    name: "Roofing Systems",
    industry: "Field Services",
    icon: "🏗️",
    href: "/solutions/field-services/",
  },
  {
    name: "Lawn Care Systems",
    industry: "Home Services",
    icon: "🌿",
    href: "/solutions/home-services/",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about/" },
        ])}
      />
      <PageHero
        eyebrow="About Nodevant"
        title={
          <>
            We give businesses <span className="gradient-text">their time back</span>
          </>
        }
        subtitle="Nodevant is an AI automation agency built on a simple belief: your team's hours are too valuable to spend on work a machine can do better."
      />

      <div className="container-x">
        <div className="mb-16 overflow-hidden rounded-2xl border border-line">
          <Image
            src="/images/pipeline-hero.webp"
            alt="Every Nodevant project is built, tested, and deployed to production"
            width={1400}
            height={1050}
            priority
            className="h-auto w-full"
          />
        </div>
      </div>

      {/* Mission */}
      <section className="pb-8">
        <div className="container-x">
          <ScrollReveal>
            <div className="glow-card mx-auto max-w-3xl text-center">
              <h2 className="font-display text-2xl font-bold text-cyan">
                Our Mission
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                Every business is quietly bleeding hours to repetitive work —
                chasing leads, copying data, answering the same questions,
                building the same reports. We exist to find that wasted time,
                quantify it in dollars, and replace it with intelligent systems
                that run 24/7 without error. The result: leaner teams, faster
                growth, and people freed to do the work that actually needs a
                human.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Differentiators */}
      <section className="section-gap">
        <div className="container-x">
          <SectionHeading
            eyebrow="Why Nodevant"
            title="What makes us different"
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {DIFFERENTIATORS.map((d, i) => (
              <ScrollReveal key={d.title} delay={(i % 2) * 0.08}>
                <div className="glow-card flex gap-5">
                  <span className="text-3xl" aria-hidden="true">
                    {d.icon}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-ink">
                      {d.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-muted">{d.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Businesses we own and operate */}
      <section className="section-gap">
        <div className="container-x">
          <SectionHeading
            eyebrow="Proof We Eat Our Own Cooking"
            title="Businesses we own and run on these systems"
            subtitle="We don't just build automations for clients — we run our own companies across multiple industries on the exact same stack. That's where these systems are battle-tested."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {OWNED_BUSINESSES.map((biz, i) => {
              const cardClass =
                "glow-card group flex items-center gap-4";
              const inner = (
                <>
                  <span
                    className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-cyan/10 text-2xl shadow-glow-cyan"
                    aria-hidden="true"
                  >
                    {biz.icon}
                  </span>
                  <span>
                    <span className="flex items-center gap-1.5 font-display text-lg font-bold text-ink transition-colors group-hover:text-cyan">
                      {biz.name}
                      {biz.external && (
                        <span className="text-xs text-faint" aria-hidden="true">
                          ↗
                        </span>
                      )}
                    </span>
                    <span className="block text-sm text-faint">
                      {biz.industry}
                    </span>
                  </span>
                </>
              );
              return (
                <ScrollReveal key={biz.name} delay={(i % 3) * 0.08}>
                  {biz.external ? (
                    <a
                      href={biz.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cardClass}
                    >
                      {inner}
                    </a>
                  ) : (
                    <Link href={biz.href} className={cardClass}>
                      {inner}
                    </Link>
                  )}
                </ScrollReveal>
              );
            })}
          </div>
          <p className="mt-8 text-center text-sm text-faint">
            Every one of these runs on automations we built — explore the{" "}
            <Link href="/solutions/" className="font-semibold text-cyan hover:underline">
              industry systems
            </Link>{" "}
            behind them.
          </p>
        </div>
      </section>

      <CTABand />
    </>
  );
}
