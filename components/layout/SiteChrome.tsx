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
      {/* The sticky mobile CTA below is fixed-position, so it overlays whatever
          ends the page. The footer renders AFTER <main>, so bottom padding has
          to live on the footer (not main) or the last footer rows sit under the
          bar. Footer carries `pb-28 md:pb-6` for exactly that clearance. */}
      <main id="main-content" className="min-h-screen">
        {children}
      </main>
      <Footer />

      {/* Sticky mobile conversion bar */}
      <div className="nav-blur fixed inset-x-0 bottom-0 z-40 p-3 md:hidden">
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
