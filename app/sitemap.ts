import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { PUBLISHED_POSTS } from "@/lib/blog-posts";
import { SERVICE_DETAILS } from "@/lib/services";
import { SOLUTION_DETAILS } from "@/lib/solutions";
import { CASE_STUDY_DETAILS } from "@/lib/case-studies";
import { AI_EMPLOYEE_PAGES } from "@/lib/ai-employees";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/audit/", priority: 0.95, changeFrequency: "monthly" },
    { path: "/ai-automation-agency/", priority: 0.95, changeFrequency: "monthly" },
    { path: "/services/", priority: 0.9, changeFrequency: "monthly" },
    { path: "/solutions/", priority: 0.9, changeFrequency: "monthly" },
    { path: "/solutions/ai-receptionist/", priority: 0.85, changeFrequency: "monthly" },
    { path: "/ai-employees/", priority: 0.9, changeFrequency: "monthly" },
    { path: "/pricing/ai-voice-agent-cost/", priority: 0.8, changeFrequency: "monthly" },
    { path: "/resources/automation-roi-calculator/", priority: 0.85, changeFrequency: "monthly" },
    { path: "/locations/atlanta-ai-automation-agency/", priority: 0.7, changeFrequency: "monthly" },
    { path: "/case-studies/", priority: 0.8, changeFrequency: "monthly" },
    { path: "/about/", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact/", priority: 0.7, changeFrequency: "monthly" },
    { path: "/blog/", priority: 0.7, changeFrequency: "weekly" },
    // Added 16 Nov 2026. All three return 200 with `index, follow` and
    // are linked from the footer, but this list is hand-maintained and
    // they were never added when the routes were created. /admin/ and
    // /audit/results/ stay out on purpose - both are noindex and
    // Disallow'd in robots.txt.
    { path: "/pricing/", priority: 0.85, changeFrequency: "monthly" },
    { path: "/reverse-audit/", priority: 0.8, changeFrequency: "monthly" },
    { path: "/build/", priority: 0.6, changeFrequency: "weekly" },
  ];

  const servicePages: MetadataRoute.Sitemap = SERVICE_DETAILS.map((s) => ({
    url: `${SITE.url}/services/${s.slug}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const solutionPages: MetadataRoute.Sitemap = SOLUTION_DETAILS.map((s) => ({
    url: `${SITE.url}/solutions/${s.slug}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const aiEmployeePages: MetadataRoute.Sitemap = AI_EMPLOYEE_PAGES.map((e) => ({
    url: `${SITE.url}/ai-employees/${e.slug}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const caseStudyPages: MetadataRoute.Sitemap = CASE_STUDY_DETAILS.map((c) => ({
    url: `${SITE.url}/case-studies/${c.slug}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Published posts only — coming-soon placeholders are noindexed.
  const blogPages: MetadataRoute.Sitemap = PUBLISHED_POSTS.map((post) => ({
    url: `${SITE.url}/blog/${post.slug}/`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...staticPages.map((p) => ({
      url: `${SITE.url}${p.path}`,
      lastModified: now,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
    ...servicePages,
    ...solutionPages,
    ...aiEmployeePages,
    ...caseStudyPages,
    ...blogPages,
  ];
}
