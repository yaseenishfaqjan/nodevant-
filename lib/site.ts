// Lead delivery endpoint — set at build time. Works with an n8n/Make/Zapier
// webhook URL or a form service like Web3Forms. If empty, forms still work
// (audit shows results, contact confirms) but no lead is forwarded.
//   Example (n8n):       NEXT_PUBLIC_LEAD_ENDPOINT=https://n8n.yoursite.com/webhook/nodevant-leads
//   Example (Web3Forms): NEXT_PUBLIC_LEAD_ENDPOINT=https://api.web3forms.com/submit
//                        NEXT_PUBLIC_LEAD_ACCESS_KEY=your-web3forms-access-key
export const LEAD_ENDPOINT = process.env.NEXT_PUBLIC_LEAD_ENDPOINT || "";
export const LEAD_ACCESS_KEY = process.env.NEXT_PUBLIC_LEAD_ACCESS_KEY || "";

// Your Cal.com booking link, e.g. "nodevant/strategy-call".
// Set NEXT_PUBLIC_CAL_LINK to your real one when your Cal.com is ready.
export const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK || "nodevant-strategy-call/30min";

// Google Search Console verification token (paste after verifying the domain).
export const GSC_TOKEN = process.env.NEXT_PUBLIC_GSC_TOKEN || "";

// Google Analytics 4 measurement ID (public). Override via NEXT_PUBLIC_GA_ID if needed.
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-Y7JWPQF7LW";

export const SITE = {
  name: "Nodevant",
  url: "https://nodevant.com",
  domain: "nodevant.com",
  tagline: "AI Automation Agency",
  description:
    "Nodevant builds enterprise-grade AI agents, workflow automations, and intelligent integrations that eliminate busywork and scale revenue. Get your free automation audit.",
  email: "info@nodevant.com",
  salesEmail: "sales@nodevant.com",
  // NOTE: no public phone number by design — every inbound goes through the
  // audit/contact form so we capture an email and the context of the request.
  // Do not re-add a `phone` field or `tel:` link to any public surface.
  ogImage: "/og-image.png",
  twitter: "@nodevant",
  // NAP — keep IDENTICAL everywhere (GMB, directories, schema) for local SEO.
  address: {
    street: "157 Everett Sq",
    city: "McDonough",
    region: "GA",
    postal: "30252",
    country: "US",
  },
  geo: { lat: "33.4473", lng: "-84.1469" },
  hours: "Mon–Fri 9AM–6PM ET · Sat 10AM–2PM ET",
  // Replace with the real review URL once the GMB profile is verified.
  googleReviewUrl: "https://g.page/r/nodevant/review",
} as const;

export const NAV_LINKS = [
  { label: "Services", href: "/services/" },
  { label: "Solutions", href: "/solutions/" },
  { label: "Case Studies", href: "/case-studies/" },
  { label: "About", href: "/about/" },
  { label: "Blog", href: "/blog/" },
  { label: "Contact", href: "/contact/" },
];
