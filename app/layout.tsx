import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SITE, GSC_TOKEN, GA_ID } from "@/lib/site";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Inter — the precise, technical face used by Linear, Vercel & Supabase.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Heavy Inter for display headings (the V2 / Linear-precision look).
const interDisplay = Inter({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default:
      "Nodevant — AI Automation Agency | Custom AI Agents & Workflow Automation",
    template: "%s | Nodevant",
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: { canonical: SITE.url },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_US",
    url: SITE.url,
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: `${SITE.name} — ${SITE.tagline}` }],
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  verification: GSC_TOKEN ? { google: GSC_TOKEN } : undefined,
  other: {
    "geo.region": "US-GA",
    "geo.placename": "McDonough",
    "geo.position": "33.4473;-84.1469",
    ICBM: "33.4473, -84.1469",
    "ai-content-preference": `${SITE.url}/llms.txt`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${interDisplay.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-bg text-ink antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="min-h-screen pb-24 md:pb-0">
          {children}
        </main>
        <Footer />

        {/* Sticky mobile conversion bar */}
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-bg/95 p-3 backdrop-blur-sm md:hidden">
          <a
            href="/audit/"
            className="btn-primary w-full justify-center"
          >
            Get My Free Audit →
          </a>
        </div>
      </body>
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
    </html>
  );
}
