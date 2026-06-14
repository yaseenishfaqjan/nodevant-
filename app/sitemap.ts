import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { BLOG_POSTS, SOLUTIONS } from "@/lib/content";

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
    { path: "/audit/results/", priority: 0.3, changeFrequency: "monthly" },
    { path: "/services/", priority: 0.9, changeFrequency: "monthly" },
    { path: "/solutions/", priority: 0.9, changeFrequency: "monthly" },
    { path: "/case-studies/", priority: 0.8, changeFrequency: "monthly" },
    { path: "/about/", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact/", priority: 0.7, changeFrequency: "monthly" },
    { path: "/blog/", priority: 0.7, changeFrequency: "weekly" },
  ];

  const solutionPages: MetadataRoute.Sitemap = SOLUTIONS.map((s) => ({
    url: `${SITE.url}/solutions/${s.slug}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
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
    ...solutionPages,
    ...blogPages,
  ];
}
