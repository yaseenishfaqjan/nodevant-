import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/site";

const FOOTER_COLS = [
  {
    title: "Services",
    links: [
      { label: "Agentic Workflows", href: "/services/#agentic-workflows" },
      { label: "AI Voice Agents", href: "/services/#ai-voice-agents" },
      { label: "System Integration", href: "/services/#system-integration" },
      { label: "Lead Gen Pipeline", href: "/services/#lead-gen-pipeline" },
      { label: "Custom AI Solutions", href: "/services/#custom-ai-solutions" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about/" },
      { label: "Industry Solutions", href: "/solutions/" },
      { label: "Case Studies", href: "/case-studies/" },
      { label: "Blog", href: "/blog/" },
      { label: "Contact", href: "/contact/" },
    ],
  },
  {
    title: "Get Started",
    links: [
      { label: "Free Automation Audit", href: "/audit/" },
      { label: "Book a Call", href: "/contact/" },
      { label: "AI Automation Agency", href: "/ai-automation-agency/" },
      { label: "All Services", href: "/services/" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-bg-soft">
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand col */}
          <div className="md:col-span-1">
            <Link
              href="/"
              aria-label="Nodevant home"
              className="flex items-center gap-2.5"
            >
              <Image
                src="/images/logo-emblem.png"
                alt="Nodevant AI automation agency logo"
                width={157}
                height={155}
                className="h-10 w-auto"
              />
              <span className="flex flex-col leading-none">
                <span className="gradient-text font-display text-xl font-bold tracking-[-0.02em]">
                  NODEVANT
                </span>
                <span className="mt-1.5 text-[9px] font-medium uppercase tracking-[0.3em] text-faint">
                  AI Automation Agency
                </span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-faint">
              The AI automation agency that shows you the ROI before you ever
              book a call.
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-4 inline-block text-sm font-medium text-cyan hover:underline"
            >
              {SITE.email}
            </a>
            <address className="mt-4 text-sm not-italic leading-relaxed text-faint">
              {SITE.address.street}
              <br />
              {SITE.address.city}, {SITE.address.region} {SITE.address.postal}
              <br />
              United States · Serving clients globally
            </address>
            <a
              href={`tel:${SITE.phoneRaw}`}
              className="mt-2 inline-block text-sm font-medium text-cyan hover:underline"
            >
              {SITE.phone}
            </a>
            <a
              href={SITE.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-medium text-faint hover:text-cyan"
            >
              ⭐ Review us on Google
            </a>
          </div>

          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-ink">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-faint transition-colors hover:text-cyan"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-sm text-faint md:flex-row">
          <p>© {new Date().getFullYear()} Nodevant. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/audit/" className="hover:text-cyan">
              Free Audit
            </Link>
            <Link href="/contact/" className="hover:text-cyan">
              Contact
            </Link>
            <a
              href="https://twitter.com/nodevant"
              className="hover:text-cyan"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
