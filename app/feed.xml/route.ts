// RSS 2.0 feed for the blog — statically generated at build time (the site is
// a static export). New posts appear here automatically once published: true.
import { SITE } from "@/lib/site";
import { PUBLISHED_POSTS } from "@/lib/blog-posts";

export const dynamic = "force-static";

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function GET() {
  const posts = [...PUBLISHED_POSTS].sort((a, b) => b.date.localeCompare(a.date));
  const lastBuild = posts[0] ? new Date(`${posts[0].date}T12:00:00Z`) : new Date(0);

  const items = posts
    .map((p) => {
      const url = `${SITE.url}/blog/${p.slug}/`;
      return [
        "    <item>",
        `      <title>${esc(p.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${new Date(`${p.date}T12:00:00Z`).toUTCString()}</pubDate>`,
        `      <category>${esc(p.category)}</category>`,
        `      <description>${esc(p.excerpt)}</description>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>The Nodevant Blog</title>
    <link>${SITE.url}/blog/</link>
    <description>Guides, comparisons and real numbers on AI automation — written by operators.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuild.toUTCString()}</lastBuildDate>
    <atom:link href="${SITE.url}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
