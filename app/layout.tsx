import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SITE, GSC_TOKEN, GA_ID } from "@/lib/site";
import SiteChrome from "@/components/layout/SiteChrome";
import { ThemeProvider, themeInitScript } from "@/components/theme/ThemeProvider";

// One variable Inter for body and headings. A second next/font call with
// static 700/800/900 weights downloaded those files again on every page.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
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
  alternates: {
    canonical: SITE.url,
    // Self-referencing hreflang: one English site serving US/UK/CA/AU.
    languages: { "en-US": SITE.url, "x-default": SITE.url },
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
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
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <meta name="theme-color" content="#0C0C0F" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="bg-bg text-body antialiased">
        <ThemeProvider>
          <SiteChrome>{children}</SiteChrome>
        </ThemeProvider>
      </body>
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
    </html>
  );
}
