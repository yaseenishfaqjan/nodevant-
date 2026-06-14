// Generates on-brand 1200x630 hero placeholders for the 6 blog articles.
// Replace these with real artwork at the same paths when ready.
// Run: node scripts/gen-blog-heroes.mjs
import sharp from "sharp";
import { mkdirSync, writeFileSync } from "node:fs";

mkdirSync("public/images/blog", { recursive: true });

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function hero({ category, title }) {
  const lines = title.match(/.{1,26}(\s|$)/g) || [title];
  const tspans = lines
    .map(
      (l, i) =>
        `<tspan x="80" dy="${i === 0 ? 0 : 64}">${esc(l.trim())}</tspan>`
    )
    .join("");
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bg" cx="20%" cy="20%" r="90%">
      <stop offset="0%" stop-color="#0e1430"/>
      <stop offset="60%" stop-color="#08080F"/>
    </radialGradient>
    <linearGradient id="nv" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#00D4FF"/>
      <stop offset="1" stop-color="#9B5CFF"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1050" cy="120" r="220" fill="url(#nv)" opacity="0.10"/>
  <circle cx="120" cy="560" r="180" fill="#00D4FF" opacity="0.08"/>
  <text x="80" y="120" font-family="'Segoe UI',sans-serif" font-size="22" font-weight="700" letter-spacing="4" fill="#00D4FF">${esc(
    category.toUpperCase()
  )}</text>
  <text y="240" font-family="'Space Grotesk','Segoe UI',sans-serif" font-size="56" font-weight="800" fill="#F0F0FF">${tspans}</text>
  <g transform="translate(80,540)">
    <rect width="34" height="34" rx="9" fill="url(#nv)"/>
    <circle cx="17" cy="17" r="6" fill="#08080F"/>
    <text x="48" y="25" font-family="'Space Grotesk','Segoe UI',sans-serif" font-size="26" font-weight="700"><tspan fill="#00D4FF">NODE</tspan><tspan fill="#F0F0FF">VANT</tspan></text>
  </g>
</svg>`;
}

const articles = [
  { n: 1, category: "Guides", title: "What Is an AI Automation Agency?" },
  { n: 2, category: "Comparisons", title: "n8n vs Make vs Zapier in 2026" },
  { n: 3, category: "Trends", title: "How AI Agents Are Replacing Business Functions" },
  { n: 4, category: "ROI", title: "The ROI of Workflow Automation" },
  { n: 5, category: "Voice AI", title: "Voice AI Agents for Customer Support" },
  { n: 6, category: "Lead Gen", title: "How to Automate Lead Generation with AI" },
];

for (const a of articles) {
  const png = await sharp(Buffer.from(hero(a))).png().toBuffer();
  const file = `public/images/blog/article-${a.n}-hero.png`;
  writeFileSync(file, png);
  console.log("wrote", file, png.length, "bytes");
}
