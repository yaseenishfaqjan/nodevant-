import type { Metadata } from "next";
import Link from "next/link";
import Icon, { type IconName } from "@/components/ui/Icon";
import SectionHead from "@/components/ui/SectionHead";
import JsonLd from "@/components/ui/JsonLd";
import ContactForm from "@/components/contact/ContactForm";
import CalEmbed from "@/components/contact/CalEmbed";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, contactPageSchema, organizationSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";
import { BLOG_POSTS } from "@/lib/blog-posts";

export const metadata: Metadata = pageMetadata({
  title: "Contact Nodevant | Book a Free AI Automation Strategy Call",
  description:
    "Three ways to reach Nodevant: take the free 90-second audit, book a 30-minute strategy call, or send a message. We reply within 4 hours on business days.",
  path: "/contact/",
  keywords: ["contact ai automation agency", "book automation consultation"],
});

const HERO_TRUST: { icon: IconName; label: string }[] = [
  { icon: "clock", label: "Reply within 4 hours" },
  { icon: "calendar-check", label: "30-minute call" },
  { icon: "shield-check", label: "No obligation" },
];

const WAYS: {
  icon: IconName;
  title: string;
  text: string;
  href: string;
  cta: string;
}[] = [
  {
    icon: "target",
    title: "Take the audit",
    text: "The fastest path. Seven questions, 90 seconds, and you walk into any call already knowing your highest-ROI automation.",
    href: "/#audit",
    cta: "Start the audit",
  },
  {
    icon: "calendar-check",
    title: "Book a call",
    text: "Thirty minutes with an engineer, not a salesperson. We map your operation live and tell you what to automate first.",
    href: "#schedule",
    cta: "Pick a time",
  },
  {
    icon: "mail",
    title: "Send a message",
    text: "Describe what's slowing your team down. A real person reads it and replies within 4 hours on business days.",
    href: "#message",
    cta: "Write to us",
  },
];

const CALL_ITEMS: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "target",
    title: "We map your operation",
    text: "You talk, we diagram — the workflows, tools and handoffs that eat your team's week.",
  },
  {
    icon: "chart",
    title: "You get the ROI math",
    text: "Hours × loaded rate × 52, run live on your numbers. The same formula our audit uses — no vague promises.",
  },
  {
    icon: "clipboard-check",
    title: "We scope the first build",
    text: "If there's a fit, you leave with the first project defined: outcome, timeline, and a fixed price.",
  },
  {
    icon: "shield-check",
    title: "You keep the map either way",
    text: "No fit, no pressure. The opportunity map is yours whether or not we ever build together.",
  },
];

export default function ContactPage() {
  const featuredPost = BLOG_POSTS.find((p) => p.featured && p.published);
  const featuredLabel = featuredPost
    ? featuredPost.title.split(":")[0]
    : "The Nodevant blog";
  const featuredHref = featuredPost ? `/blog/${featuredPost.slug}/` : "/blog/";
  const mapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    `${SITE.address.street}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.postal}`
  )}`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact/" },
          ]),
          contactPageSchema(),
          organizationSchema(),
        ]}
      />

      {/* 1 · Hero */}
      <section className="grid-overlay relative overflow-hidden px-5 pb-12 pt-32 md:pt-40">
        <div className="pointer-events-none absolute inset-0 radial-glow" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1080px]">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint"
          >
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink">Contact</span>
          </nav>
          <p className="eyebrow mt-6">Let&apos;s talk</p>
          <span className="rule mt-2.5 mb-4 block" />
          <h1 className="font-display text-[clamp(2rem,4.6vw,3.5rem)] font-extrabold leading-[1.08] tracking-[-0.04em] text-ink text-balance">
            Book your free <span className="gradient-text">strategy call.</span>
          </h1>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-faint">
            Tell us what&apos;s slowing your team down. In 30 minutes we&apos;ll map your
            biggest automation opportunity and show you exactly what to build first.
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {HERO_TRUST.map((t) => (
              <span
                key={t.label}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] text-body"
                style={{ background: "var(--tint)", border: "1px solid var(--chip-border)" }}
              >
                <Icon name={t.icon} className="h-3.5 w-3.5 text-cyan" strokeWidth={1.8} />
                {t.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 2 · Three ways to reach us */}
      <section className="border-t border-line px-5 py-14 md:py-16">
        <div className="mx-auto max-w-[1080px]">
          <p className="eyebrow">Three ways to reach us</p>
          <span className="rule mt-2.5 mb-7 block" />
          <div className="grid gap-3.5 sm:grid-cols-3">
            {WAYS.map((w) => (
              <a
                key={w.title}
                href={w.href}
                className="card card-hover flex flex-col gap-3 p-6 text-body"
              >
                <span className="chip h-11 w-11">
                  <Icon name={w.icon} className="h-5 w-5" />
                </span>
                <span className="font-display text-[17px] font-extrabold tracking-[-0.02em] text-ink">
                  {w.title}
                </span>
                <span className="text-[13.5px] leading-relaxed text-faint">{w.text}</span>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-[13.5px] font-semibold text-cyan">
                  {w.cta}
                  <Icon name="chevron" className="h-3.5 w-3.5" strokeWidth={2.2} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 3 · Direct contact strip */}
      <section className="border-t border-line px-5 py-8">
        <div className="mx-auto flex max-w-[1080px] flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href={`mailto:${SITE.email}`}
            className="inline-flex items-center gap-2.5 text-[14px] font-medium text-body hover:text-ink"
          >
            <span className="chip h-9 w-9">
              <Icon name="mail" className="h-4 w-4" />
            </span>
            {SITE.email}
          </a>
          <a
            href={`tel:${SITE.phoneRaw}`}
            className="inline-flex items-center gap-2.5 text-[14px] font-medium text-body hover:text-ink"
          >
            <span className="chip h-9 w-9">
              <Icon name="phone" className="h-4 w-4" />
            </span>
            {SITE.phone}
          </a>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 text-[14px] font-medium text-body hover:text-ink"
          >
            <span className="chip h-9 w-9">
              <Icon name="pin" className="h-4 w-4" />
            </span>
            {SITE.address.street}, {SITE.address.city}, {SITE.address.region}{" "}
            {SITE.address.postal} — remote-first, serving clients worldwide
          </a>
        </div>
      </section>

      {/* 4 · Cal.com scheduler + message form */}
      <section className="border-t border-line px-5 py-14 md:py-16">
        <div className="mx-auto grid max-w-[1080px] items-start gap-6 lg:grid-cols-2">
          <div id="schedule" style={{ scrollMarginTop: "96px" }}>
            <CalEmbed />
          </div>
          <div id="message" style={{ scrollMarginTop: "96px" }}>
            <ContactForm />
            <p className="mt-4 text-[13px] leading-relaxed text-faint">
              Prefer the fast path?{" "}
              <Link href="/#audit" className="font-semibold text-cyan hover:underline">
                Take the free 90-second audit
              </Link>{" "}
              and walk into the call already knowing your ROI.
            </p>
          </div>
        </div>
      </section>

      {/* 5 · What happens on the call */}
      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[1080px]">
          <SectionHead
            eyebrow="What happens on the call"
            title={
              <>
                Thirty minutes, <span className="gradient-text">zero pitch.</span>
              </>
            }
          />
          <div className="mt-9 grid gap-3.5 sm:grid-cols-2">
            {CALL_ITEMS.map((item) => (
              <div key={item.title} className="card flex items-start gap-3.5 p-5">
                <span className="chip h-11 w-11 flex-shrink-0">
                  <Icon name={item.icon} className="h-5 w-5" />
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-[15px] font-semibold text-ink">{item.title}</span>
                  <span className="text-[13.5px] leading-relaxed text-faint">
                    {item.text}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 · Honest expectations */}
      <section className="px-5 pb-4">
        <div
          className="mx-auto grid max-w-[1080px] items-center gap-8 rounded-[20px] p-7 md:grid-cols-[1.1fr_1fr] md:p-10"
          style={{
            border: "1px solid transparent",
            backgroundImage: "linear-gradient(var(--surface),var(--surface)),var(--gradient)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box,border-box",
            boxShadow: "0 18px 44px var(--glow)",
          }}
        >
          <div className="min-w-0">
            <p className="eyebrow">Honest expectations</p>
            <h2 className="mt-3 font-display text-[clamp(1.3rem,2.4vw,1.9rem)] font-extrabold leading-[1.2] tracking-[-0.025em] text-ink">
              Fixed pricing, and a straight answer{" "}
              <span className="gradient-text">either way.</span>
            </h2>
            <p className="mt-3.5 max-w-[520px] text-[14.5px] leading-relaxed text-faint">
              Engagements start at <span className="font-semibold text-ink">$1,200</span>{" "}
              for a focused integration and scale with scope — every project is quoted as
              one fixed number after your audit, never by the hour. And if the math says
              you shouldn&apos;t build yet, we&apos;ll tell you that on the call and send
              you off with the map for free.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {[
              "One fixed quote per project — no hourly billing",
              "No retainers required to get started",
              "The free audit runs before any number is quoted",
            ].map((line) => (
              <span key={line} className="flex items-start gap-2.5 text-[14px] text-body">
                <span className="chip mt-px h-5 w-5 flex-shrink-0">
                  <Icon name="check" className="h-3 w-3" strokeWidth={2.4} />
                </span>
                {line}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 7 · Related links footer strip */}
      <section className="px-5 py-14">
        <div className="mx-auto max-w-[1080px]">
          <p className="eyebrow">While you&apos;re here</p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            <Link
              href="/case-studies/"
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full px-4 text-[13px] font-medium text-ink transition-colors hover:text-cyan"
              style={{ background: "var(--tint)", border: "1px solid var(--chip-border)" }}
            >
              Case studies: six live deployments
              <Icon name="chevron" className="h-3.5 w-3.5 text-cyan" strokeWidth={2.2} />
            </Link>
            <Link
              href={featuredHref}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full px-4 text-[13px] font-medium text-ink transition-colors hover:text-cyan"
              style={{ background: "var(--tint)", border: "1px solid var(--chip-border)" }}
            >
              Featured read: {featuredLabel}
              <Icon name="chevron" className="h-3.5 w-3.5 text-cyan" strokeWidth={2.2} />
            </Link>
            <Link
              href="/services/"
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full px-4 text-[13px] font-medium text-ink transition-colors hover:text-cyan"
              style={{ background: "var(--tint)", border: "1px solid var(--chip-border)" }}
            >
              All six services
              <Icon name="chevron" className="h-3.5 w-3.5 text-cyan" strokeWidth={2.2} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
