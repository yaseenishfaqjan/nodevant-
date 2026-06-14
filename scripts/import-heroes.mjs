// Imports your real hero images into the site.
//
// HOW TO USE:
// 1. Save your 6 images (right-click → Save image as) into ANY folder,
//    naming them 1.png, 2.png, 3.png, 4.png, 5.png, 6.png in THIS order:
//      1 = Brain → EMAIL/CRM/PHONE/SPREADSHEET   (What Is an AI Automation Agency)
//      2 = n8n / Make / Zapier logos             (n8n vs Make vs Zapier)
//      3 = Silhouette → robot with particles     (AI Agents Replacing Functions)
//      4 = Rising $ bar chart                     (ROI of Workflow Automation)
//      5 = Microphone + speech bubbles            (Voice AI Agents)
//      6 = Funnel → diamond                       (Automate Lead Generation)
// 2. Run:  node scripts/import-heroes.mjs "C:/path/to/that/folder"
// 3. Rebuild: docker compose up -d --build
//
// Accepts .png/.jpg/.jpeg/.webp sources and outputs optimized 1200x630 PNGs.
import sharp from "sharp";
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const src = process.argv[2];
if (!src || !existsSync(src)) {
  console.error("Usage: node scripts/import-heroes.mjs <sourceFolder>");
  process.exit(1);
}

const exts = [".png", ".jpg", ".jpeg", ".webp"];
const files = readdirSync(src);

for (let n = 1; n <= 6; n++) {
  const match = files.find((f) => {
    const base = f.toLowerCase().replace(/\.[^.]+$/, "");
    const ext = f.toLowerCase().slice(f.lastIndexOf("."));
    return base === String(n) && exts.includes(ext);
  });
  if (!match) {
    console.warn(`! No file named ${n}.(png|jpg|webp) found — skipping ${n}`);
    continue;
  }
  const out = `public/images/blog/article-${n}-hero.png`;
  await sharp(join(src, match))
    .resize(1200, 630, { fit: "cover", position: "centre" })
    .png()
    .toFile(out);
  console.log(`✓ ${match} → ${out}`);
}
console.log("\nDone. Now rebuild:  docker compose up -d --build");
