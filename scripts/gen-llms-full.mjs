// Postbuild: generates out/llms-full.txt = llms.txt header + the full text of
// every blog article, extracted from the rendered HTML in out/blog/<slug>/.
// Runs automatically after `next build` (see package.json).
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const SLUGS = [
  "what-is-an-ai-automation-agency",
  "n8n-vs-make-vs-zapier",
  "ai-agents-for-business",
  "workflow-automation-roi",
  "voice-ai-agents-customer-support",
  "how-to-automate-lead-generation",
];

function decode(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&rsquo;|&#8217;/g, "’")
    .replace(/&lsquo;|&#8216;/g, "‘")
    .replace(/&mdash;|&#8212;/g, "—")
    .replace(/&ndash;|&#8211;/g, "–")
    .replace(/&ldquo;|&#8220;/g, "“")
    .replace(/&rdquo;|&#8221;/g, "”")
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&times;/g, "×")
    .replace(/&[a-zA-Z]+;/g, " ");
}

function htmlToText(html) {
  let s = html;
  s = s.replace(/<script[\s\S]*?<\/script>/gi, "");
  s = s.replace(/<style[\s\S]*?<\/style>/gi, "");
  s = s.replace(/<svg[\s\S]*?<\/svg>/gi, "");
  // headings
  s = s.replace(/<h1[^>]*>/gi, "\n\n# ").replace(/<\/h1>/gi, "\n");
  s = s.replace(/<h2[^>]*>/gi, "\n\n## ").replace(/<\/h2>/gi, "\n");
  s = s.replace(/<h3[^>]*>/gi, "\n\n### ").replace(/<\/h3>/gi, "\n");
  // lists / paragraphs / breaks
  s = s.replace(/<li[^>]*>/gi, "\n- ").replace(/<\/li>/gi, "");
  s = s.replace(/<\/p>/gi, "\n").replace(/<p[^>]*>/gi, "\n");
  s = s.replace(/<br\s*\/?>/gi, "\n");
  s = s.replace(/<\/tr>/gi, "\n").replace(/<(td|th)[^>]*>/gi, " | ");
  // strip remaining tags
  s = s.replace(/<[^>]+>/g, "");
  s = decode(s);
  // tidy whitespace
  s = s
    .split("\n")
    .map((l) => l.replace(/[ \t]+/g, " ").trimEnd())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return s;
}

function extractMain(html) {
  const m = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  return m ? m[1] : html;
}

const header = existsSync("public/llms.txt")
  ? readFileSync("public/llms.txt", "utf8")
  : "# Nodevant\n";

let out = header.trimEnd() + "\n\n---\n\n# Full Blog Content\n";

for (const slug of SLUGS) {
  const file = `out/blog/${slug}/index.html`;
  if (!existsSync(file)) {
    console.warn(`! missing ${file} — skipping`);
    continue;
  }
  const html = readFileSync(file, "utf8");
  const text = htmlToText(extractMain(html));
  out += `\n\n---\n\nURL: https://nodevant.com/blog/${slug}/\n\n${text}\n`;
}

writeFileSync("out/llms-full.txt", out, "utf8");
console.log(`✓ wrote out/llms-full.txt (${out.length} chars)`);
