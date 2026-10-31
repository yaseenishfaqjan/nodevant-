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

## Outer reverse proxy (production VPS — not in this repo)

Production does **not** use the Caddy overlay above. `LAUNCH_NOTES.md` documents
the live path: one shared nginx (`scalaro-nginx`) already owns ports 80 and 443.
Its server block for `nodevant.com` lives on the VPS at `/opt/scalaro/nginx.conf`
and `proxy_pass`es to `http://nodevant-web:80`. That file is **not** in this
repository. Two things have to be true or URLs break:

1. **This repo's `nginx.conf`** (inside the `web` container) must keep
   `absolute_redirect off`. With it on, a URL missing its trailing slash
   (`/pricing` → `/pricing/`) is redirected to `http://…` because the container
   only speaks HTTP. The outer proxy turns that absolute http redirect into a
   **500**. Relative redirects (`Location: /pricing/`) are safe. Rebuild the
   web container for this to take effect:
   ```bash
   cd /opt/nodevant
   docker compose -f docker-compose.yml -f docker-compose.vps.yml up -d --build
   ```
2. **The outer proxy must send plain HTTP to HTTPS itself**, and send HSTS only
   on the HTTPS response. Apply this on the VPS (then `nginx -t` and reload).
   Do not commit secrets or certificate paths from the server into git.

   ```nginx
   # Port 80 — every host on this site, including www, to the https apex.
   server {
       listen 80;
       listen [::]:80;
       server_name nodevant.com www.nodevant.com;
       return 301 https://nodevant.com$request_uri;
   }

   server {
       listen 443 ssl;
       listen [::]:443 ssl;
       server_name www.nodevant.com;
       # existing ssl_certificate directives stay here
       return 301 https://nodevant.com$request_uri;
   }

   server {
       listen 443 ssl;
       listen [::]:443 ssl;
       server_name nodevant.com;
       # existing ssl_certificate + proxy_pass http://nodevant-web:80 stay here

       add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
   }
   ```

   `$request_uri` keeps the path and query string, so `/pricing?x=1` becomes
   `https://nodevant.com/pricing?x=1` and the inner nginx can still add the
   trailing slash with a relative redirect.

Check after reload:

```bash
curl -sI http://nodevant.com/pricing | head -n 15
curl -sI https://nodevant.com/pricing | head -n 15
curl -sI https://nodevant.com/ | grep -i strict-transport
```

Expect `301` to `https://nodevant.com/...` from port 80, then `301` to the
trailing-slash path (a relative `Location`, or an https absolute URL) and
`200` on the slashed URL. A `500` on the unsashed or http URL means the outer
block above is not in effect yet, or the web container was not rebuilt.
