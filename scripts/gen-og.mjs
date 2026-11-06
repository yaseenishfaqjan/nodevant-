// Rasterizes branded SVGs into 1200x630 PNG OG images.
// Run with: node scripts/gen-og.mjs
// The two site-wide cards stay at public/og-*.png. Detail pages land in
// public/og/<kind>/<slug>.png and are referenced from page metadata.
import sharp from "sharp";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

function ogSvg({ pill, sub }) {
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bg" cx="50%" cy="38%" r="75%">
      <stop offset="0%" stop-color="#0e1430"/>
      <stop offset="70%" stop-color="#08080F"/>
    </radialGradient>
    <linearGradient id="nv" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#00D4FF"/>
      <stop offset="1" stop-color="#9B5CFF"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <g transform="translate(600,150)">
    <rect x="-150" y="-30" width="300" height="56" rx="28" fill="rgba(0,212,255,0.06)" stroke="rgba(0,212,255,0.3)"/>
    <circle cx="-110" cy="-2" r="7" fill="#00D4FF"/>
    <text x="12" y="7" text-anchor="middle" font-family="sans-serif" font-size="26" fill="#9fb6d6">${pill}</text>
  </g>
  <text x="600" y="360" text-anchor="middle" font-family="'Space Grotesk','Segoe UI',sans-serif" font-size="150" font-weight="800" letter-spacing="-4">
    <tspan fill="#00D4FF">NODE</tspan><tspan fill="#F0F0FF">VANT</tspan>
  </text>
  <text x="600" y="450" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="34" fill="#B0B0CC">${sub}</text>
</svg>`;
}

const targets = [
  {
    file: "public/og-image.png",
    pill: "AI Automation Agency",
    sub: "Custom AI agents &amp; workflow automation that pay for themselves.",
  },
  {
    file: "public/og-audit.png",
    pill: "Free Automation Audit",
    sub: "Find your #1 automation opportunity in 90 seconds.",
  },
];

for (const t of targets) {
  if (existsSync(t.file)) continue;
  const png = await sharp(Buffer.from(ogSvg(t))).png().toBuffer();
  writeFileSync(t.file, png);
  console.log("wrote", t.file, png.length, "bytes");
}

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function wrapTitle(title) {
  const clean = title.replace(/\s*\|\s*Nodevant\s*$/i, "").replace(/\s+/g, " ").trim();
  const words = clean.split(" ");
  const max = 32;
  const lines = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > max && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 4);
}

function cardSvg({ eyebrow, title }) {
  const lines = wrapTitle(title);
  const size = lines.length > 3 ? 42 : 52;
  const startY = 250;
  const tspans = lines
    .map((line, i) => `<tspan x="88" dy="${i === 0 ? 0 : size + 12}">${escapeXml(line)}</tspan>`)
    .join("");
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bg" cx="18%" cy="0%" r="85%">
      <stop offset="0%" stop-color="#12304a"/>
      <stop offset="55%" stop-color="#08080F"/>
    </radialGradient>
    <linearGradient id="nv" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#00D4FF"/>
      <stop offset="1" stop-color="#9B5CFF"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="12" height="630" fill="url(#nv)"/>
  <text x="88" y="118" font-family="sans-serif" font-size="28" font-weight="700" letter-spacing="3">
    <tspan fill="#00D4FF">NODE</tspan><tspan fill="#F4F4FF">VANT</tspan>
  </text>
  <text x="88" y="176" font-family="sans-serif" font-size="18" letter-spacing="2.4" fill="#8FB4C9">${escapeXml(eyebrow.toUpperCase())}</text>
  <text x="88" y="${startY}" font-family="sans-serif" font-size="${size}" font-weight="700" fill="#F4F7FF">${tspans}</text>
  <text x="88" y="560" font-family="sans-serif" font-size="22" fill="#9AA3B8">nodevant.com</text>
</svg>`;
}

function pairsFrom(file) {
  const src = readFileSync(file, "utf8");
  const re = /slug:\s*"([^"]+)"[\s\S]*?metaTitle:\s*"([^"]+)"/g;
  const found = [];
  let match;
  while ((match = re.exec(src))) found.push({ slug: match[1], title: match[2] });
  return found;
}

const cards = [
  ...pairsFrom("lib/comparisons.ts").map((card) => ({ ...card, kind: "compare", eyebrow: "Comparison" })),
  ...pairsFrom("lib/comparisons-batch.ts").map((card) => ({ ...card, kind: "compare", eyebrow: "Comparison" })),
  ...pairsFrom("lib/solutions.ts").map((card) => ({ ...card, kind: "solutions", eyebrow: "Software stack" })),
  ...pairsFrom("lib/blog-posts.ts").map((card) => ({ ...card, kind: "blog", eyebrow: "Guide" })),
  ...pairsFrom("lib/buyer-posts.ts").map((card) => ({ ...card, kind: "blog", eyebrow: "Guide" })),
  ...pairsFrom("lib/buyer-batch.ts").map((card) => ({ ...card, kind: "blog", eyebrow: "Guide" })),
  ...pairsFrom("lib/locations.ts").map((card) => ({ ...card, kind: "locations", eyebrow: "US service area" })),
  {
    kind: "solutions",
    slug: "ai-receptionist",
    eyebrow: "AI receptionist",
    title: "AI Receptionist for Small Business — Answer Every Call 24/7",
  },
  {
    kind: "compare",
    slug: "index",
    eyebrow: "Comparisons",
    title: "Software Comparisons for US Buyers",
  },
  {
    kind: "locations",
    slug: "index",
    eyebrow: "Locations",
    title: "One Office in Georgia. US Companies Everywhere Else.",
  },
];

const seen = new Set();
for (const card of cards) {
  const key = `${card.kind}/${card.slug}`;
  if (seen.has(key)) continue;
  seen.add(key);
  if (card.kind === "blog" && existsSync(`public/images/blog/${card.slug}-og.jpg`)) continue;
  const file = `public/og/${card.kind}/${card.slug}.png`;
  mkdirSync(dirname(file), { recursive: true });
  const png = await sharp(Buffer.from(cardSvg(card))).png().toBuffer();
  writeFileSync(file, png);
  console.log("wrote", file, png.length, "bytes");
}
