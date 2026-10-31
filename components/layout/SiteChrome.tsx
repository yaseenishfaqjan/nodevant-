"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LeadCapturePopup from "@/components/ui/LeadCapturePopup";

/**
 * Public-site chrome (nav, footer, sticky mobile CTA).
 *
 * The super-admin console at /admin is a full-screen internal tool with its own
 * sidebar and header — the marketing navbar used to render on top of it and
 * collide with the panel titles. So chrome is skipped entirely on /admin.
 */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";
  const isConsole = pathname.startsWith("/admin");

  if (isConsole) {
    return (
      <main id="main-content" className="min-h-screen">
        {children}
      </main>
    );
  }

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      {/* The sticky mobile CTA is fixed, so it covers the bottom of the viewport.
          Clearance lives on the footer (it renders after main): mobile padding
          is the bar height plus the iOS home-indicator inset. */}
      <main id="main-content" className="min-h-screen">
        {children}
      </main>
      <Footer />

      {/* Sticky mobile conversion bar. pb includes the safe-area inset so the
          button sits above the home indicator instead of under it. */}
      <div className="nav-blur fixed inset-x-0 bottom-0 z-40 border-t border-line px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] md:hidden">
        <a href="/audit/" className="btn-primary w-full justify-center">
          Get My Free Audit →
        </a>
      </div>

      {/* Exit-intent / scroll-depth email capture. Self-suppressing; skips
          pages where the visitor is already converting. */}
      <LeadCapturePopup />
    </>
  );
}
