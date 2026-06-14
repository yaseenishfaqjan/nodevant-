# Deploying Nodevant to a VPS (Docker + auto-HTTPS)

The site is a static export served by nginx in a container, with Caddy in front
for automatic Let's Encrypt SSL.

## 0. Prerequisites
- A VPS with Docker + Docker Compose, ports **80** and **443** free.
- DNS: `nodevant.com` and `www.nodevant.com` **A records → your VPS IP**.

## 1. Get the code onto the VPS
Pick ONE:

**Option A — git (recommended)**
```bash
# on your PC: push the project to a (private) GitHub repo once
# on the VPS:
mkdir -p /opt/nodevant && cd /opt/nodevant
git clone <your-repo-url> .
```

**Option B — copy from your PC (no GitHub)**
```bash
# from your Windows machine (Git Bash), excluding node_modules/out:
rsync -av --exclude node_modules --exclude out --exclude .next \
  ./ root@SERVER_IP:/opt/nodevant/
```

## 2. Configure (lead capture, Cal.com, domain)
```bash
cd /opt/nodevant
cp .env.example .env
nano .env
```
Set:
```
DOMAIN=nodevant.com
NEXT_PUBLIC_LEAD_ENDPOINT=https://your-n8n/webhook/nodevant-leads
NEXT_PUBLIC_CAL_LINK=your-cal-username/your-event
NEXT_PUBLIC_GSC_TOKEN=          # optional, after Search Console verify
```

## 3. Launch (build + run with HTTPS)
```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```
Caddy provisions the SSL cert automatically. Give it ~30s, then visit
**https://nodevant.com**.

## 4. Updating later
```bash
cd /opt/nodevant && git pull   # or rsync again
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

## Notes
- Local dev/preview (no Caddy): `docker compose up -d` → http://localhost:3001
- If port 80/443 is already used on the VPS by another app, either free them or
  point your existing reverse proxy at the `web` container instead of using Caddy.
- Env values are build-time (static export), so changing `.env` requires the
  `--build` flag to take effect.
