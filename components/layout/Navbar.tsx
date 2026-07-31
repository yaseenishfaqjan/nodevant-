"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/Icon";
import ThemeToggle from "@/components/theme/ThemeToggle";

type Sub = { label: string; href: string; desc: string };
type Item = { label: string; href?: string; items?: Sub[]; wide?: boolean };

const NAV: Item[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    wide: true,
    items: [
      { label: "Agentic Workflows", href: "/services/agentic-workflows/", desc: "Agents that triage, decide and act for you." },
      { label: "AI Voice Agents", href: "/services/ai-voice-agents/", desc: "Answer, qualify and book calls 24/7." },
      { label: "Complex Logic Engines", href: "/services/complex-logic-engines/", desc: "Encode expert decisions with an audit trail." },
      { label: "System Integration", href: "/services/system-integration/", desc: "Your tools synced into one source of truth." },
      { label: "Lead Gen Pipeline", href: "/services/lead-gen-pipeline/", desc: "Source, score and book meetings on autopilot." },
      { label: "Custom AI Solutions", href: "/services/custom-ai-solutions/", desc: "Bespoke AI you own, built for your problem." },
    ],
  },
  {
    label: "Solutions",
    wide: true,
    items: [
      { label: "Storehouse360 · Fintech", href: "/solutions/storehouse360/", desc: "Credit intelligence, card insights, funding and real estate." },
      { label: "FABRIOZA · Manufacturing", href: "/solutions/fabrioza/", desc: "Quote-to-production, RFQs priced the same hour." },
      { label: "Scalaro · SaaS Sales", href: "/solutions/scalaro/", desc: "20+ agents sourcing, calling and booking meetings." },
      { label: "BMAIKR · Field Services", href: "/solutions/bmaikr/", desc: "Leads, scans, dispatch, claims and invoicing." },
      { label: "Academy · Education", href: "/solutions/academy/", desc: "Enquiries, applications and enrolment automated." },
      { label: "Home Services", href: "/solutions/home-services/", desc: "Missed calls returned before the lead cools." },
      { label: "AI Receptionist", href: "/solutions/ai-receptionist/", desc: "Answer every call, book and log leads 24/7." },
      { label: "All Solutions", href: "/solutions/", desc: "Every operating system we've built and deployed." },
    ],
  },
  { label: "Case Studies", href: "/case-studies/" },
  { label: "Pricing", href: "/pricing/" },
  { label: "About", href: "/about/" },
  { label: "Blog", href: "/blog/" },
  { label: "Contact", href: "/contact/" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setDropdown(null);
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDropdown(null);
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", key);
    };
  }, []);

  const Wordmark = () => (
    <Link href="/" className="flex flex-shrink-0 items-center gap-[11px]" aria-label="Nodevant home">
      <span
        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
        style={{
          background: "var(--tint)",
          border: "1px solid var(--chip-border)",
          boxShadow: "inset 0 0 16px var(--glow)",
        }}
      >
        <Image
          src="/images/logo-emblem.png"
          alt="Nodevant logo"
          width={157}
          height={155}
          priority
          className="h-7 w-7 object-contain"
        />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-base font-extrabold tracking-[-0.03em] text-ink">
          NODE<span className="gradient-text">VANT</span>
        </span>
        <span className="mt-[5px] font-mono text-[9px] uppercase tracking-[0.2em] text-faint">
          AI Automation Agency
        </span>
      </span>
    </Link>
  );

  return (
    <header
      ref={ref}
      className={`fixed inset-x-0 top-0 z-[130] transition-all duration-300 ${
        scrolled ? "nav-blur" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[74px] max-w-[1280px] items-center gap-6 px-5">
        <Wordmark />

        {/* Desktop nav */}
        <nav aria-label="Primary" className="ml-auto hidden items-center gap-5 lg:flex">
          {NAV.map((item) =>
            item.items ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setDropdown(item.label)}
                onMouseLeave={() => setDropdown(null)}
              >
                <button
                  aria-haspopup="true"
                  aria-expanded={dropdown === item.label}
                  onClick={() =>
                    setDropdown((d) => (d === item.label ? null : item.label))
                  }
                  className="flex items-center gap-1 py-2 text-sm font-semibold text-body transition-colors hover:text-ink"
                >
                  {item.label}
                  <Icon
                    name="chevron"
                    className={`h-[13px] w-[13px] opacity-60 transition-transform ${
                      dropdown === item.label ? "rotate-[270deg]" : "rotate-90"
                    }`}
                  />
                </button>
                {dropdown === item.label && (
                  <div
                    role="menu"
                    className={`absolute left-[-16px] top-11 grid gap-0.5 rounded-2xl p-2 shadow-card ${
                      item.wide ? "w-[560px] grid-cols-2" : "w-[300px]"
                    }`}
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border-strong)",
                      animation: "nv-dd .22s cubic-bezier(.22,1,.36,1) both",
                    }}
                  >
                    {item.items.map((sub) => (
                      <Link
                        key={sub.label + sub.href}
                        href={sub.href}
                        role="menuitem"
                        onClick={() => setDropdown(null)}
                        className="block rounded-[10px] px-3 py-[11px] transition-colors hover:bg-[var(--surface-2)]"
                      >
                        <span className="block text-[13.5px] font-semibold text-ink">
                          {sub.label}
                        </span>
                        <span className="mt-[3px] block text-xs text-faint">
                          {sub.desc}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href!}
                className="py-2 text-sm font-semibold text-body transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Desktop right */}
        <div className="ml-1 hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Link
            href="/audit/"
            className="flex items-center gap-[7px] rounded-[10px] px-[17px] py-[11px] text-[13.5px] font-semibold text-white"
            style={{ background: "var(--gradient)", boxShadow: "var(--shadow-glow)" }}
          >
            Free Audit
            <Icon name="chevron" className="h-[13px] w-[13px]" strokeWidth={2.2} />
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="ml-auto flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-[11px] text-ink"
            style={{ border: "1px solid var(--border-strong)", background: "var(--surface)" }}
          >
            <Icon name={open ? "x" : "menu"} className="h-[22px] w-[22px]" strokeWidth={1.6} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="fixed inset-0 z-[160] overflow-y-auto px-5 pb-12 pt-4 lg:hidden"
          style={{ background: "var(--bg)", animation: "nv-fade .2s ease both" }}
        >
          <div className="flex h-[58px] items-center justify-between">
            <Wordmark />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="flex h-11 w-11 items-center justify-center rounded-[11px] text-ink"
              style={{ border: "1px solid var(--border-strong)", background: "var(--surface)" }}
            >
              <Icon name="x" className="h-5 w-5" strokeWidth={1.8} />
            </button>
          </div>
          <div className="mt-5 flex flex-col">
            {NAV.map((item) =>
              item.items ? (
                <details key={item.label} className="border-b border-line">
                  <summary className="flex items-center justify-between py-4 text-lg font-semibold text-ink">
                    {item.label}
                    <Icon name="chevron" data-chev className="h-[18px] w-[18px] text-faint transition-transform" />
                  </summary>
                  <div className="flex flex-col gap-3 px-1 pb-[18px]">
                    {item.items.map((sub) => (
                      <Link
                        key={sub.label + sub.href}
                        href={sub.href}
                        onClick={() => setOpen(false)}
                        className="text-[15px] text-faint"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </details>
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  onClick={() => setOpen(false)}
                  className="border-b border-line py-4 text-lg font-semibold text-ink"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
          <div className="mt-6 flex flex-col gap-2.5">
            <Link
              href="/audit/"
              onClick={() => setOpen(false)}
              className="btn-primary w-full"
            >
              Get My Free Audit →
            </Link>
            <a
              href="tel:+16784399321"
              className="btn-secondary w-full"
            >
              +1 (678) 439-9321
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
