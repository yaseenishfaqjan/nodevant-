PORTFOLIO BRAND LOGOS — drop your files here
=============================================

The homepage "Deployed Work" section (components/home/Work.tsx) renders each
brand's real logo from this folder, and falls back to the gradient letter-mark
until the file exists. So you can add these any time — no code change needed.

Drop one file per brand, using these EXACT base names (any one of .svg / .png / .webp;
SVG or transparent PNG preferred, roughly square or wordmark, ~200px+):

  storehouse360.svg     (or .png / .webp)
  scalaro.svg
  fairway360.svg
  globalshield360.svg
  peachpicks.svg
  fabrioza.svg

Notes:
- Transparent background works best (the tile is a dark/light surface that flips with theme).
- The loader tries .svg first, then .png, then .webp, then the letter-mark.
- These same slugs can be reused on /case-studies later.
