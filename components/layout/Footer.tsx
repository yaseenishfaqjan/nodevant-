import Link from "next/link";
import Image from "next/image";
import Icon, { type IconName } from "@/components/ui/Icon";
import { SITE } from "@/lib/site";

const COLS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Services",
    links: [
      { label: "Agentic Workflows", href: "/services/agentic-workflows/" },
      { label: "AI Voice Agents", href: "/services/ai-voice-agents/" },
      { label: "Complex Logic Engines", href: "/services/complex-logic-engines/" },
      { label: "System Integration", href: "/services/system-integration/" },
      { label: "Lead Gen Pipeline", href: "/services/lead-gen-pipeline/" },
      { label: "Custom AI Solutions", href: "/services/custom-ai-solutions/" },
    ],
  },
  {
    title: "Industry Solutions",
    links: [
      { label: "Storehouse360 · Fintech", href: "/solutions/storehouse360/" },
      { label: "FABRIOZA · Manufacturing", href: "/solutions/fabrioza/" },
      { label: "Scalaro · SaaS Sales", href: "/solutions/scalaro/" },
      { label: "BMAIKR · Field Services", href: "/solutions/bmaikr/" },
      { label: "Academy · Education", href: "/solutions/academy/" },
      { label: "Home Services", href: "/solutions/home-services/" },
      { label: "All Solutions", href: "/solutions/" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about/" },
      { label: "Case Studies", href: "/case-studies/" },
      { label: "Industry Solutions", href: "/solutions/" },
      { label: "AI Receptionist", href: "/solutions/ai-receptionist/" },
      { label: "Atlanta / McDonough, GA", href: "/locations/atlanta-ai-automation-agency/" },
      { label: "Blog", href: "/blog/" },
      { label: "Contact", href: "/contact/" },
    ],
  },
  {
    title: "Get Started",
    links: [
      { label: "Free Automation Audit", href: "/audit/" },
      { label: "ROI Calculator", href: "/resources/automation-roi-calculator/" },
      { label: "Pricing", href: "/pricing/" },
      { label: "Book a Call", href: "/contact/" },
      { label: "All Services", href: "/services/" },
      { label: "Build Log ↗", href: "/build/" },
    ],
  },
];

function Chip({ name }: { name: IconName }) {
  return (
    <span className="chip h-[38px] w-[38px]">
      <Icon name={name} className="h-[18px] w-[18px]" />
    </span>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-line pb-6 pt-12 md:pt-[72px]">
      <div className="mx-auto grid max-w-[1280px] gap-9 px-5 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1.2fr_1fr_1fr]">
        {/* Brand col */}
        <div className="min-w-0">
          <Link href="/" aria-label="Nodevant home" className="flex items-center gap-3">
            <span
              className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[13px]"
              style={{
                background: "var(--tint)",
                border: "1px solid var(--chip-border)",
                boxShadow: "inset 0 0 18px var(--glow)",
              }}
            >
              <Image
                src="/images/logo-emblem.png"
                alt="Nodevant logo"
                width={157}
                height={155}
                className="h-8 w-8 object-contain"
              />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-[17px] font-extrabold tracking-[-0.03em] text-ink">
                NODE<span className="gradient-text">VANT</span>
              </span>
              <span className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-faint">
                AI Automation Agency
              </span>
            </span>
          </Link>
          <p className="mb-5 mt-[18px] max-w-xs text-sm leading-relaxed text-faint">
            The AI automation agency that shows you the ROI before you ever book
            a call.
          </p>
          <div className="flex flex-col gap-3">
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-[11px] text-sm text-body transition-colors hover:text-ink">
              <Chip name="mail" />
              {SITE.email}
            </a>
            <a href={`tel:${SITE.phoneRaw}`} className="flex items-center gap-[11px] text-sm text-body transition-colors hover:text-ink">
              <Chip name="phone" />
              {SITE.phone}
            </a>
            <div className="flex items-start gap-[11px] text-sm text-body">
              <Chip name="pin" />
              <span className="leading-relaxed">
                {SITE.address.street}, {SITE.address.city}, {SITE.address.region}{" "}
                {SITE.address.postal}, United States
                <span className="mt-0.5 block text-[13px] text-faint">
                  Serving clients globally
                </span>
              </span>
            </div>
            <a
              href={SITE.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-[11px] text-sm text-body transition-colors hover:text-ink"
            >
              <Chip name="star" />
              Review us on Google
            </a>
          </div>
        </div>

        {COLS.map((col) => (
          <div key={col.title} className="min-w-0">
            <p className="mb-4 font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">
              {col.title}
            </p>
            <div className="flex flex-col gap-3">
              {col.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center justify-between gap-2 text-sm text-body transition-colors hover:text-ink"
                >
                  {link.label}
                  <Icon name="chevron" className="h-[15px] w-[15px] text-faint" strokeWidth={1.8} />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-9 flex max-w-[1280px] flex-wrap items-center justify-between gap-x-6 gap-y-3.5 border-t border-line px-5 pt-[22px]">
        <span className="text-[13px] text-faint">
          © {new Date().getFullYear()} Nodevant. All rights reserved.
        </span>
        <span
          className="rounded-full px-3 py-1.5 font-mono text-[9.5px] uppercase tracking-[0.16em] text-faint"
          style={{ border: "1px solid var(--border)" }}
        >
          Built with our own automations
        </span>
        {/* Legal pages not yet drafted — spans (not links) until real content
            exists, so enterprise buyers never hit a 404. Tracked in TECH_DEBT.md. */}
        <span className="flex gap-5 text-[13px]">
          <span
            title="Coming soon"
            aria-disabled="true"
            className="cursor-default text-faint/70"
          >
            Privacy
          </span>
          <span
            title="Coming soon"
            aria-disabled="true"
            className="cursor-default text-faint/70"
          >
            Terms
          </span>
        </span>
      </div>
    </footer>
  );
}
