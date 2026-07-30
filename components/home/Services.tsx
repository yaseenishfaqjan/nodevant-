import Link from "next/link";
import Icon, { type IconName } from "@/components/ui/Icon";
import SectionHead from "@/components/ui/SectionHead";

type Card = {
  icon: IconName;
  title: string;
  desc: string;
  features: { icon: IconName; label: string }[];
  href: string;
  flagship?: boolean;
};

const CARDS: Card[] = [
  {
    icon: "brain",
    title: "AI Agents",
    desc: "Autonomous agents that qualify leads, book meetings and follow up — while your team sleeps.",
    href: "/audit/",
    features: [
      { icon: "funnel", label: "Lead qualification" },
      { icon: "calendar-check", label: "Appointment booking" },
      { icon: "clock", label: "24/7 follow-up" },
    ],
  },
  {
    icon: "refresh",
    title: "Workflow Automation",
    desc: "Your tools finally talk to each other. Data moves itself between CRM, email, calendar and billing.",
    href: "/audit/",
    features: [
      { icon: "target", label: "CRM sync" },
      { icon: "doc", label: "Invoice automation" },
      { icon: "chart", label: "Report generation" },
    ],
  },
  {
    icon: "phone",
    title: "Voice AI",
    desc: "Phone agents that answer every call, take bookings and route emergencies — in natural conversation.",
    href: "/audit/",
    features: [
      { icon: "phone", label: "Inbound answering" },
      { icon: "funnel", label: "Outbound campaigns" },
      { icon: "doc", label: "Call summaries" },
    ],
  },
  {
    icon: "sparkle",
    title: "Social Media Automation",
    desc: "An AI content engine that creates and publishes across every platform you own — daily, on brand, on autopilot.",
    href: "/#social",
    flagship: true,
    features: [
      { icon: "video", label: "AI video & ad creation" },
      { icon: "send", label: "10-platform publishing" },
      { icon: "chart", label: "Engagement analytics" },
    ],
  },
];

function ServiceCard({ c }: { c: Card }) {
  return (
    <div
      className={`card card-hover flex flex-col p-[26px] ${c.flagship ? "relative" : ""}`}
      style={
        c.flagship
          ? {
              border: "1px solid transparent",
              backgroundImage:
                "linear-gradient(var(--surface),var(--surface)),var(--gradient)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box,border-box",
            }
          : undefined
      }
    >
      {c.flagship && (
        <span className="absolute right-[18px] top-[18px] rounded-full px-[9px] py-[5px] font-mono text-[9px] uppercase tracking-[0.16em] text-ink" style={{ border: "1px solid var(--chip-border)", background: "var(--tint)" }}>
          Flagship
        </span>
      )}
      <span className="chip h-[46px] w-[46px]" style={{ boxShadow: "inset 0 0 14px var(--glow)" }}>
        <Icon name={c.icon} className="h-[22px] w-[22px]" />
      </span>
      <h3 className="mt-[18px] font-display text-xl font-extrabold tracking-[-0.02em] text-ink">
        {c.title}
      </h3>
      <p className="mb-5 mt-[9px] text-sm leading-relaxed text-faint">{c.desc}</p>
      <div className="mt-auto flex flex-col border-t border-line">
        {c.features.map((f, i) => (
          <span
            key={f.label}
            className={`flex items-center gap-[11px] py-3 ${i < c.features.length - 1 ? "border-b border-line" : ""}`}
          >
            <span className="chip h-[34px] w-[34px]">
              <Icon name={f.icon} className="h-[17px] w-[17px]" />
            </span>
            <span className="text-sm font-semibold text-ink">{f.label}</span>
          </span>
        ))}
      </div>
      <Link href={c.href} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan">
        Explore
        <Icon name="chevron" className="h-3.5 w-3.5" strokeWidth={2.2} />
      </Link>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="section-gap border-t border-line px-5">
      <div className="mx-auto max-w-[1280px]">
        <SectionHead
          eyebrow="Services"
          title={<>Four things. <span className="gradient-text">Done exceptionally.</span></>}
          subtitle="No web design, no SEO retainers. We deploy AI systems that do work your team is doing by hand today."
        />
        <div className="mt-11 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((c) => (
            <ServiceCard key={c.title} c={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
