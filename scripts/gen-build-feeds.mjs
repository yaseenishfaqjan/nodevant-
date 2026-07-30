// Postbuild: generates the Build Log's RSS feed (out/build-feed.xml) and iCal
// calendar (out/build.ics) from lib/build-entries.json — the same source the
// /build page renders. Runs after `next build` (see package.json).
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";

const SITE = "https://nodevant.com";
const entries = JSON.parse(readFileSync("lib/build-entries.json", "utf8"));

const TYPE_LABELS = {
  "product-ship": "Product ship",
  "client-deploy": "Client deploy",
  infra: "Infra",
  fix: "Fix",
  experiment: "Experiment",
};
const PLATFORM_LABELS = {
  storehouse360: "Storehouse360",
  scalaro: "Scalaro",
  fabrioza: "Fabrioza",
  fairway360: "Fairway360",
  globalshield360: "GlobalShield360",
  peachpicks: "PeachPicks",
  "client-work": "Client work",
};

const xml = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const rssItems = entries
  .map((e) => {
    const title = `[${PLATFORM_LABELS[e.platform] ?? e.platform}] ${e.headline}`;
    const desc = [e.context, e.stats].filter(Boolean).join(" — ");
    return `    <item>
      <title>${xml(title)}</title>
      <link>${SITE}/build/</link>
      <guid isPermaLink="false">nodevant-build-${new Date(e.timestamp).getTime()}</guid>
      <category>${xml(TYPE_LABELS[e.type] ?? e.type)}</category>
      <pubDate>${new Date(e.timestamp).toUTCString()}</pubDate>
      <description>${xml(desc)}</description>
    </item>`;
  })
  .join("\n");

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Nodevant Build Log</title>
    <link>${SITE}/build/</link>
    <atom:link href="${SITE}/build-feed.xml" rel="self" type="application/rss+xml"/>
    <description>What Nodevant ships in public — real deployments across six platforms and client work.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date(entries[0]?.timestamp ?? Date.now()).toUTCString()}</lastBuildDate>
${rssItems}
  </channel>
</rss>
`;

const ics = (d) => new Date(d).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
const icsEvents = entries
  .map((e) => {
    const stamp = ics(e.timestamp);
    const summary = `[${PLATFORM_LABELS[e.platform] ?? e.platform}] ${e.headline}`.replace(/[,;\\]/g, "\\$&");
    const desc = [e.context, e.stats].filter(Boolean).join(" — ").replace(/[,;\\]/g, "\\$&").replace(/\n/g, "\\n");
    return `BEGIN:VEVENT
UID:build-${new Date(e.timestamp).getTime()}@nodevant.com
DTSTAMP:${stamp}
DTSTART:${stamp}
SUMMARY:${summary}
DESCRIPTION:${desc}
URL:${SITE}/build/
END:VEVENT`;
  })
  .join("\n");

const cal = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Nodevant//Build Log//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Nodevant Build Log
${icsEvents}
END:VCALENDAR
`;

const outDir = existsSync("out") ? "out" : "public";
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
writeFileSync(path.join(outDir, "build-feed.xml"), rss);
writeFileSync(path.join(outDir, "build.ics"), cal);
console.log(`[build-feeds] wrote ${outDir}/build-feed.xml and ${outDir}/build.ics (${entries.length} entries)`);
