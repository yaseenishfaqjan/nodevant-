# Nodevant — Launch Notes & Deploy Runbook

Launched **2026-07-31**. This documents what shipped in the "signature features" release
and exactly how to deploy/update going forward.

## What shipped

**5 signature features**
- **Live ROI Ticker** — homepage, between hero and trust marquee. Renders SSR-safe starter
  numbers, polls `GET /api/live-metrics` every 30s, LIVE/CACHED badge. `components/home/LiveROITicker.tsx`.
- **Cost-of-Doing-Nothing meter** — `/pricing` section 1. 100% client-side calculator +
  ambient counter. Constants in `lib/loss-benchmarks.ts`. `components/pricing/CostOfNothingMeter.tsx`.
- **Public Build Log** — new `/build` route. Data in `lib/build-entries.json` (edit here to add
  ships). RSS `/build-feed.xml` + iCal `/build.ics` generated at build by `scripts/gen-build-feeds.mjs`.
- **Audit Results preview** — `/audit/results` rebuilt as `components/audit/AuditResultsView.tsx`:
  custom recommended-stack diagram, ROI tiles, and the poor-fit "we'd decline" honesty card.
- **Reverse Audit** — new `/reverse-audit` + Express `POST /api/reverse-audit/scan`. **Hybrid:**
  with a valid `OPENAI_API_KEY` (must start `sk-`) it runs the real AI scan; without one it queues
  a **manual hands-on audit** and captures the visitor's email via the normal lead pipeline.

**Shared/infra**
- `components/ui/CoreDiagram.tsx` (live / recommendation / scanning variants; collapses to a grid
  on mobile via `[data-nv-stage]` rules in `app/globals.css`) and `components/ui/OdometerNumber.tsx`.
- **Real brand logos** — `public/images/logos/*.webp`, rendered by `components/ui/BrandLogo.tsx`
  (falls back to a gradient letter). Wired into homepage Work, services, case-studies, solutions, about.
- **Storehouse360 repositioned** from credit-repair → **financial hub** across the whole site.
- Cross-links: hero "Try the Reverse Audit", contact "Four ways to reach us" 4th column, footer Build Log.

## How to deploy an update (the ONLY flow you need)

On the VPS:
```bash
cd /opt/nodevant
git pull origin main
docker compose -f docker-compose.yml up -d --build
```
That's it. Do **NOT** add the Caddy overlay (`docker-compose.prod.yml`) — see gotchas.

- Frontend is a Next.js static export (`output: 'export'`) served by nginx in the `web` container.
- Backend is the Express `api` container (`/api/*`), fronted by the shared `scalaro-nginx-1`.
- `docker-compose.yml` attaches `web` to the external **`scalaro-net`**, so the shared nginx reaches
  `nodevant-web:80` automatically after every rebuild.

## Deploy gotchas (learned at launch)

1. **Shared reverse proxy.** This VPS runs many apps behind one `scalaro-nginx-1` (nginx on
   `scalaro-net`, owns ports 80/443). nodevant.com's server block already lives in
   `/opt/scalaro/nginx.conf` with its Let's Encrypt cert and `proxy_pass http://nodevant-web:80;`.
   So nodevant must **not** run its own Caddy (port 80 conflict) — just publish `web` and be on `scalaro-net`.
2. **If nginx can't reach web after a manual container change:**
   `docker network connect scalaro-net nodevant-web && docker exec scalaro-nginx-1 nginx -s reload`
   (normal `up --build` does the attach for you; a reload re-resolves the upstream if you recreated web).
3. **`.env` values must be comment-free.** Docker `env_file` treats an inline `# comment` as part of
   the value — `OPENAI_API_KEY=   # blank` became a bad key. Keep values clean. (Code now ignores any
   key not starting with `sk-`, so a blank/comment safely falls back to manual mode.)

## Env (`.env` on the VPS — not in git)

- `SMTP_*` are set → audit/contact/reverse-audit bookings email **info@nodevant.com** + `LEAD_NOTIFY_TO`.
- `OPENAI_API_KEY` blank → Reverse Audit = manual lead-capture. Set a real `sk-...` key + recreate the
  api (`docker compose up -d --no-deps --force-recreate api`) to enable the instant AI scan.

## Still optional (not blocking)

- [ ] Test an audit booking → confirm the `[AUDIT] …` email arrives at info@nodevant.com.
- [ ] Replace Storehouse360 + Scalaro logos with square/emblem or transparent versions (they're wide
      wordmarks, so they read small in square tiles). Drop files in `public/images/logos/`.
- [ ] Add `OPENAI_API_KEY=sk-...` to flip Reverse Audit to instant AI mode.
- [ ] Add OG share images `public/og-image.png` / `public/og-audit.png` for link previews.
- [ ] Wire `/api/live-metrics` to real product-API aggregation (currently starter numbers).
