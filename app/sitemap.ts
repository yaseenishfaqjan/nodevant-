import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { PUBLISHED_POSTS } from "@/lib/blog-posts";
import { SERVICE_DETAILS } from "@/lib/services";
import { SOLUTION_DETAILS } from "@/lib/solutions";
import { CASE_STUDY_DETAILS } from "@/lib/case-studies";
import { AI_EMPLOYEE_PAGES } from "@/lib/ai-employees";
import { BUILD_ENTRIES } from "@/lib/build-log";
import { COMPARISON_PAGES } from "@/lib/comparisons";
import { METRO_LOCATIONS } from "@/lib/locations";

export const dynamic = "force-static";

/**
 * Last substantive edit of each URL. Dates come from the content's own
 * publish date or the commit that last changed that page — not from the
 * build clock, which would mark every URL modified on every deploy.
 */
const STATIC_LASTMOD: Record<string, string> = {
  "/": "2026-10-31",
  "/audit/": "2026-06-21",
  "/ai-automation-agency/": "2026-07-27",
  "/services/": "2026-07-30",
  "/solutions/": "2026-10-31",
  "/solutions/ai-receptionist/": "2026-08-01",
  "/products/": "2026-10-31",
  "/ai-employees/": "2026-09-04",
  "/pricing/": "2026-08-02",
  "/pricing/ai-voice-agent-cost/": "2026-08-02",
  "/build/": "2026-07-30",
  "/reverse-audit/": "2026-07-30",
  "/resources/automation-roi-calculator/": "2026-08-02",
  "/locations/atlanta-ai-automation-agency/": "2026-11-06",
  "/locations/": "2026-11-06",
  "/compare/": "2026-11-06",
  "/case-studies/": "2026-07-31",
  "/about/": "2026-07-31",
  "/contact/": "2026-10-31",
  "/blog/": "2026-09-04",
};

const SERVICE_LASTMOD = "2026-07-30";
const SOLUTION_LASTMOD_DEFAULT = "2026-07-31";
const SOLUTION_LASTMOD: Record<string, string> = {
  fairway360: "2026-10-31",
  "lawn-care-software": "2026-10-31",
  "credit-repair-software": "2026-10-31",
  "home-services": "2026-10-31",
  "roofing-restoration": "2026-10-31",
  "hvac-software": "2026-10-31",
  "pest-control-software": "2026-10-31",
};
const CASE_STUDY_LASTMOD_DEFAULT = "2026-07-30";
const CASE_STUDY_LASTMOD: Record<string, string> = {
  fairway360: "2026-10-31",
};
const AI_EMPLOYEE_LASTMOD = "2026-09-04";

function on(iso: string): Date {
  return new Date(iso);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const newestPost = PUBLISHED_POSTS.reduce(
    (max, post) => (post.date > max ? post.date : max),
    "2026-07-27",
  );
  const newestBuild = BUILD_ENTRIES.reduce(
    (max, entry) => (entry.timestamp > max ? entry.timestamp : max),
    "2026-07-30",
  );

  const staticPages: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    lastmod?: string;
  }[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/audit/", priority: 0.95, changeFrequency: "monthly" },
    { path: "/ai-automation-agency/", priority: 0.95, changeFrequency: "monthly" },
    { path: "/services/", priority: 0.9, changeFrequency: "monthly" },
    { path: "/solutions/", priority: 0.9, changeFrequency: "monthly" },
    { path: "/solutions/ai-receptionist/", priority: 0.85, changeFrequency: "monthly" },
    { path: "/products/", priority: 0.9, changeFrequency: "monthly" },
    { path: "/ai-employees/", priority: 0.9, changeFrequency: "monthly" },
    { path: "/pricing/", priority: 0.85, changeFrequency: "monthly" },
    { path: "/pricing/ai-voice-agent-cost/", priority: 0.8, changeFrequency: "monthly" },
    { path: "/build/", priority: 0.6, changeFrequency: "weekly", lastmod: newestBuild.slice(0, 10) },
    { path: "/reverse-audit/", priority: 0.75, changeFrequency: "monthly" },
    { path: "/resources/automation-roi-calculator/", priority: 0.85, changeFrequency: "monthly" },
    { path: "/locations/", priority: 0.65, changeFrequency: "monthly" },
    { path: "/locations/atlanta-ai-automation-agency/", priority: 0.7, changeFrequency: "monthly" },
    { path: "/compare/", priority: 0.75, changeFrequency: "monthly" },
    { path: "/case-studies/", priority: 0.8, changeFrequency: "monthly" },
    { path: "/about/", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact/", priority: 0.7, changeFrequency: "monthly" },
    { path: "/blog/", priority: 0.7, changeFrequency: "weekly", lastmod: newestPost },
  ];

  const servicePages: MetadataRoute.Sitemap = SERVICE_DETAILS.map((s) => ({
    url: `${SITE.url}/services/${s.slug}/`,
    lastModified: on(SERVICE_LASTMOD),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const solutionPages: MetadataRoute.Sitemap = SOLUTION_DETAILS.map((s) => ({
    url: `${SITE.url}/solutions/${s.slug}/`,
    lastModified: on(SOLUTION_LASTMOD[s.slug] ?? SOLUTION_LASTMOD_DEFAULT),
    changeFrequency: "monthly",
    priority: s.offer ? 0.85 : 0.8,
  }));

  const aiEmployeePages: MetadataRoute.Sitemap = AI_EMPLOYEE_PAGES.map((e) => ({
    url: `${SITE.url}/ai-employees/${e.slug}/`,
    lastModified: on(AI_EMPLOYEE_LASTMOD),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const caseStudyPages: MetadataRoute.Sitemap = CASE_STUDY_DETAILS.map((c) => ({
    url: `${SITE.url}/case-studies/${c.slug}/`,
    lastModified: on(CASE_STUDY_LASTMOD[c.slug] ?? CASE_STUDY_LASTMOD_DEFAULT),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Published posts only — coming-soon placeholders are noindexed.
  // /audit/results/ is intentionally absent (noindex utility page).
  const comparisonPages: MetadataRoute.Sitemap = COMPARISON_PAGES.map((page) => ({
    url: `${SITE.url}/compare/${page.slug}/`,
    lastModified: on(page.checked),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const metroPages: MetadataRoute.Sitemap = METRO_LOCATIONS.map((metro) => ({
    url: `${SITE.url}/locations/${metro.slug}/`,
    lastModified: on(metro.updated ?? "2026-10-31"),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = PUBLISHED_POSTS.map((post) => ({
    url: `${SITE.url}/blog/${post.slug}/`,
    lastModified: on(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...staticPages.map((p) => ({
      url: `${SITE.url}${p.path}`,
      lastModified: on(p.lastmod ?? STATIC_LASTMOD[p.path] ?? "2026-07-31"),
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
    ...servicePages,
    ...solutionPages,
    ...aiEmployeePages,
    ...caseStudyPages,
    ...comparisonPages,
    ...metroPages,
    ...blogPages,
  ];
}
