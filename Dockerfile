# ---- Stage 1: build the static export ----
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies (cached unless package files change)
COPY package.json package-lock.json ./
RUN npm ci

# Build-time public config (inlined into the static export).
ARG NEXT_PUBLIC_LEAD_ENDPOINT=""
ARG NEXT_PUBLIC_LEAD_ACCESS_KEY=""
ARG NEXT_PUBLIC_CAL_LINK=""
ARG NEXT_PUBLIC_GSC_TOKEN=""
ENV NEXT_PUBLIC_LEAD_ENDPOINT=$NEXT_PUBLIC_LEAD_ENDPOINT
ENV NEXT_PUBLIC_LEAD_ACCESS_KEY=$NEXT_PUBLIC_LEAD_ACCESS_KEY
ENV NEXT_PUBLIC_CAL_LINK=$NEXT_PUBLIC_CAL_LINK
ENV NEXT_PUBLIC_GSC_TOKEN=$NEXT_PUBLIC_GSC_TOKEN

# Build the static export -> /app/out
COPY . .
RUN npm run build

# ---- Stage 2: serve with nginx ----
FROM nginx:1.27-alpine AS runner

# Custom nginx config tuned for the Next.js static export (trailing slashes)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Static site
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80

# Basic healthcheck hitting the homepage
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q -O /dev/null http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
