import Link from "next/link";
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
            <Link href="/" className="font-display text-xl font-bold tracking-tight">
              <span className="gradient-text">NODE</span>
              <span className="text-ink">VANT</span>
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
