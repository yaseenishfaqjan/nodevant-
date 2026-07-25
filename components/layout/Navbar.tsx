"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Sub = { label: string; href: string; desc: string };
type Item = { label: string; href?: string; items?: Sub[] };

const NAV: Item[] = [
  {
    label: "Services",
    items: [
      { label: "Agentic Workflows", href: "/services/#agentic-workflows", desc: "Autonomous multi-step automation" },
      { label: "AI Voice Agents", href: "/services/#ai-voice-agents", desc: "24/7 inbound call handling" },
      { label: "Lead Gen Pipeline", href: "/services/#lead-gen-pipeline", desc: "Find, reach & convert on autopilot" },
      { label: "All Services", href: "/services/", desc: "Complete service catalog" },
    ],
  },
  {
    label: "Solutions",
    items: [
      { label: "Fintech & Finance", href: "/solutions/fintech/", desc: "Storehouse360 stack" },
      { label: "Manufacturing", href: "/solutions/manufacturing/", desc: "FABRIOZA system" },
      { label: "SaaS & Sales", href: "/solutions/saas-sales/", desc: "Scalaro framework" },
      { label: "Field Services", href: "/solutions/field-services/", desc: "Roofing & contractors" },
      { label: "Education", href: "/solutions/education/", desc: "Academy stack" },
      { label: "Home Services", href: "/solutions/home-services/", desc: "Local services system" },
    ],
  },
  { label: "Case Studies", href: "/case-studies/" },
  { label: "About", href: "/about/" },
  { label: "Blog", href: "/blog/" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setDropdown(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header
      ref={ref}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "nav-blur py-2.5" : "border-b border-transparent bg-transparent py-4"
      }`}
    >
      <nav className="container-x flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="Nodevant home">
          <Image
            src="/images/logo-emblem.png"
            alt="Nodevant AI automation agency logo"
            width={157}
            height={155}
            priority
            className="h-10 w-auto md:h-11"
          />
          <span className="flex flex-col leading-none">
            <span className="gradient-text font-display text-xl font-black tracking-[-0.02em] md:text-2xl">
              NODEVANT
            </span>
            <span className="mt-1 font-mono text-[9px] font-medium uppercase tracking-[0.28em] text-faint md:text-[10px]">
              AI Automation Agency
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-0.5 lg:flex">
          {NAV.map((item) =>
            item.items ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setDropdown(item.label)}
                onMouseLeave={() => setDropdown(null)}
              >
                <button className="flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm text-muted transition-colors hover:bg-white/5 hover:text-ink">
                  {item.label}
                  <svg
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${dropdown === item.label ? "rotate-180" : ""}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {dropdown === item.label && (
                  <div className="absolute left-0 top-[calc(100%+4px)] w-64 overflow-hidden rounded-xl border border-line bg-elevated shadow-2xl">
                    {item.items.map((sub, i) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        onClick={() => setDropdown(null)}
                        className={`group flex flex-col px-4 py-3 transition-colors hover:bg-white/5 ${
                          i < item.items!.length - 1 ? "border-b border-line-muted" : ""
                        }`}
                      >
                        <span className="text-sm font-semibold text-ink transition-colors group-hover:text-cyan">
                          {sub.label}
                        </span>
                        <span className="mt-0.5 text-xs text-faint">{sub.desc}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href!}
                className="rounded-lg px-3.5 py-2 text-sm text-muted transition-colors hover:bg-white/5 hover:text-ink"
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/contact/" className="btn-secondary px-4 py-2 text-sm">
            Contact
          </Link>
          <Link href="/audit/" className="btn-primary px-4 py-2 text-sm">
            Free Audit →
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-line text-ink lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-5 bg-ink transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-ink transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="nav-blur border-t border-line lg:hidden">
          <div className="container-x flex flex-col gap-1 py-4">
            {NAV.map((item) =>
              item.items ? (
                <div key={item.label}>
                  <p className="px-3 py-2 font-mono text-xs uppercase tracking-widest text-faint">
                    {item.label}
                  </p>
                  {item.items.map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-6 py-2 text-sm text-muted transition-colors hover:bg-white/5 hover:text-ink"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-muted transition-colors hover:bg-white/5 hover:text-ink"
                >
                  {item.label}
                </Link>
              )
            )}
            <Link href="/audit/" onClick={() => setOpen(false)} className="btn-primary mt-2 w-full">
              Get My Free Audit →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
