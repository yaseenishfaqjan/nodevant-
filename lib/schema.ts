import { SITE } from "./site";
import { FAQS, SERVICES } from "./content";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/logo.svg`,
    description: SITE.description,
    email: SITE.email,
    foundingDate: "2026",
    areaServed: "Worldwide",
    serviceType: [
      "AI Automation",
      "Workflow Automation",
      "AI Agents",
      "Voice AI",
      "System Integration",
      "Lead Generation",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: SITE.email,
      telephone: SITE.phoneRaw,
      areaServed: "Worldwide",
      availableLanguage: "English",
    },
    sameAs: [
      "https://storehouse360.com",
      "https://scalaro.io",
      "https://fabrioza.com",
      "https://fairway360.io",
      "https://globalshield360.io",
      "https://peachpicks.app",
    ],
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    logo: `${SITE.url}/logo.svg`,
    image: `${SITE.url}${SITE.ogImage}`,
    email: SITE.email,
    telephone: SITE.phoneRaw,
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Credit Card, Bank Transfer",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postal,
      addressCountry: SITE.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "14:00",
      },
    ],
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "Canada" },
      { "@type": "Country", name: "Australia" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI Automation Services",
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.short },
        price: s.startingPrice.replace(/[^0-9]/g, ""),
        priceCurrency: "USD",
      })),
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.url}/blog/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function serviceListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: SERVICES.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.title,
        description: s.short,
        url: `${SITE.url}/services/#${s.slug}`,
        provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
        areaServed: "Worldwide",
        offers: {
          "@type": "Offer",
          price: s.startingPrice.replace(/[^0-9]/g, ""),
          priceCurrency: "USD",
        },
      },
    })),
  };
}

export function webApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Nodevant Automation Audit",
    description:
      "Free 7-question audit that identifies your highest-value automation opportunity and estimated ROI.",
    url: `${SITE.url}/audit/`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
}

export function productListSchema() {
  const products = [
    { name: "Storehouse360", url: "https://storehouse360.com", cat: "FinanceApplication", description: "All-in-one financial hub with 3-bureau credit intelligence, credit- and debit-card insights, AI-matched funding and real-estate opportunity discovery." },
    { name: "Scalaro", url: "https://scalaro.io", cat: "BusinessApplication", description: "Agentic AI sales platform with 20+ autonomous agents for lead sourcing, outreach, voice calls and meeting booking." },
    { name: "Fairway360", url: "https://fairway360.io", cat: "BusinessApplication", description: "AI operating system for golf courses and country clubs." },
    { name: "GlobalShield360", url: "https://globalshield360.io", cat: "BusinessApplication", description: "AI roofing command center covering storm leads, roof scans, estimates, dispatch, claims and invoicing." },
    { name: "PeachPicks", url: "https://peachpicks.app", cat: "GameApplication", description: "Free-to-play sports prediction platform with leaderboards and a local sponsor marketplace." },
    { name: "Fabrioza", url: "https://fabrioza.com", cat: "BusinessApplication", description: "B2B custom apparel manufacturing platform with a quote-to-production pipeline." },
  ];
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Nodevant deployed platforms",
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "SoftwareApplication",
        name: p.name,
        url: p.url,
        applicationCategory: p.cat,
        description: p.description,
      },
    })),
  };
}

export function socialServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Social Media Marketing Automation",
    serviceType: "AI social media content creation and multi-platform publishing",
    provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
    areaServed: "Worldwide",
    description:
      "An AI content engine that creates avatar videos, UGC-style ads and platform-tuned posts, then publishes them automatically across up to 10 social platforms.",
  };
}

export function serviceDetailSchema(d: {
  name: string;
  slug: string;
  description: string;
  priceNum: number;
  rangeLine: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: d.name,
    description: d.description,
    url: `${SITE.url}/services/${d.slug}/`,
    serviceType: "AI automation",
    provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
    areaServed: "Worldwide",
    offers: {
      "@type": "Offer",
      price: d.priceNum,
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: d.priceNum,
        priceCurrency: "USD",
      },
    },
  };
}

export function faqPageSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function solutionListSchema(
  solutions: { slug: string; name: string; description: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Nodevant industry operating systems",
    itemListElement: solutions.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.name,
        description: s.description,
        url: `${SITE.url}/solutions/${s.slug}/`,
        provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
        areaServed: "Worldwide",
      },
    })),
  };
}

export function solutionDetailSchema(d: {
  name: string;
  slug: string;
  description: string;
  poweredBy: string[]; // service slugs
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: d.name,
    description: d.description,
    url: `${SITE.url}/solutions/${d.slug}/`,
    serviceType: "AI operating system",
    provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
    areaServed: "Worldwide",
    isRelatedTo: d.poweredBy.map((slug) => ({
      "@type": "Service",
      url: `${SITE.url}/services/${slug}/`,
    })),
  };
}

export function caseStudyListSchema(
  cases: { slug: string; headline: string; stackName: string; stackSlug: string | null }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Nodevant deployed case studies",
    itemListElement: cases.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Article",
        headline: c.headline,
        url: `${SITE.url}/case-studies/${c.slug}/`,
        author: { "@type": "Organization", name: SITE.name, url: SITE.url },
        ...(c.stackSlug
          ? {
              about: {
                "@type": "Service",
                name: c.stackName,
                url: `${SITE.url}/solutions/${c.stackSlug}/`,
              },
            }
          : {}),
      },
    })),
  };
}

export function caseStudyArticleSchema(d: {
  slug: string;
  headline: string;
  description: string;
  stackName: string;
  stackSlug: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: d.headline,
    description: d.description,
    url: `${SITE.url}/case-studies/${d.slug}/`,
    image: `${SITE.url}${SITE.ogImage}`,
    datePublished: "2026-01-01",
    author: { "@type": "Organization", name: SITE.name, url: SITE.url },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      logo: { "@type": "ImageObject", url: `${SITE.url}/logo.svg` },
    },
    ...(d.stackSlug
      ? {
          about: {
            "@type": "Service",
            name: d.stackName,
            url: `${SITE.url}/solutions/${d.stackSlug}/`,
          },
        }
      : {}),
  };
}

export function blogSchema(
  posts: { slug: string; title: string; date: string; category: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "The Nodevant Blog",
    url: `${SITE.url}/blog/`,
    description:
      "Guides, comparisons and real numbers on AI automation — written by operators.",
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${SITE.url}/blog/${p.slug}/`,
      datePublished: p.date,
      articleSection: p.category,
      author: { "@type": "Organization", name: SITE.name },
    })),
  };
}

export function blogPostingSchema(post: {
  slug: string;
  title: string;
  metaDescription: string;
  date: string;
  category: string;
  keywords: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    dateModified: post.date,
    articleSection: post.category,
    keywords: post.keywords.join(", "),
    url: `${SITE.url}/blog/${post.slug}/`,
    image: `${SITE.url}${SITE.ogImage}`,
    author: { "@type": "Organization", name: SITE.name, url: SITE.url },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      logo: { "@type": "ImageObject", url: `${SITE.url}/logo.svg` },
    },
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}/`,
  };
}

export function contactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Nodevant",
    url: `${SITE.url}/contact/`,
    description:
      "Book a free 30-minute strategy call, take the 90-second automation audit, or send Nodevant a message about your project.",
    mainEntity: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      email: SITE.email,
      telephone: SITE.phoneRaw,
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE.address.street,
        addressLocality: SITE.address.city,
        addressRegion: SITE.address.region,
        postalCode: SITE.address.postal,
        addressCountry: SITE.address.country,
      },
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE.url}${it.path}`,
    })),
  };
}
