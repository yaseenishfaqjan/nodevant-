import type { Metadata } from "next";
import { SITE } from "./site";

interface PageMetaInput {
  title: string;
  description: string;
  path: string; // e.g. "/services/"
  keywords?: string[];
  ogImage?: string;
}

/**
 * Builds a complete, SEO-correct Metadata object for a page:
 * unique title + description, canonical, OpenGraph, Twitter card.
 */
export function pageMetadata({
  title,
  description,
  path,
  keywords,
  ogImage = SITE.ogImage,
}: PageMetaInput): Metadata {
  const url = `${SITE.url}${path}`;
  return {
    // Absolute so the root layout's "%s | Nodevant" template isn't appended
    // (these titles already include the brand).
    title: { absolute: title },
    description,
    keywords,
    alternates: {
      canonical: url,
      // Self-referencing hreflang (English site serving US/UK/CA/AU).
      languages: { "en-US": url, "x-default": url },
    },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      title,
      description,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${SITE.name} — ${SITE.tagline}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
