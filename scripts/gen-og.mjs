// One-shot generator: rasterizes branded SVGs into 1200x630 PNG OG images.
// Run with: node scripts/gen-og.mjs
import sharp from "sharp";
import { writeFileSync } from "node:fs";

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
  const png = await sharp(Buffer.from(ogSvg(t))).png().toBuffer();
  writeFileSync(t.file, png);
  console.log("wrote", t.file, png.length, "bytes");
}
