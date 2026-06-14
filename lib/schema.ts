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
    sameAs: [
      "https://www.linkedin.com/company/nodevant",
      "https://twitter.com/nodevant",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: SITE.email,
      areaServed: "Worldwide",
      availableLanguage: "English",
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
