// One-off: maps the user's named images in "article images/" to article heroes.
import sharp from "sharp";
import { readdirSync } from "node:fs";
import { join } from "node:path";

const SRC = "article images";

// match by keyword -> target article number
const MAP = [
  { n: 1, kw: ["automation agency"] }, // What Is an AI Automation Agency
  { n: 2, kw: ["n8n"] }, // n8n vs Make vs Zapier
  { n: 3, kw: ["replacing"] }, // AI Agents Replacing Functions
  { n: 4, kw: ["roi"] }, // ROI of Workflow Automation
  { n: 5, kw: ["voice"] }, // Voice AI Agents
  { n: 6, kw: ["automate lead", "lead"] }, // Automate Lead Generation
];

const files = readdirSync(SRC);

for (const { n, kw } of MAP) {
  const match = files.find((f) =>
    kw.some((k) => f.toLowerCase().includes(k))
  );
  if (!match) {
    console.warn(`! no source matched article ${n} (keywords: ${kw.join(", ")})`);
    continue;
  }
  const out = `public/images/blog/article-${n}-hero.png`;
  await sharp(join(SRC, match))
    .resize(1200, 630, { fit: "cover", position: "centre" })
    .png()
    .toFile(out);
  console.log(`✓ "${match}" → ${out}`);
}
