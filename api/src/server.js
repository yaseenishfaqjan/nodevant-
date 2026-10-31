const express = require("express");
const cors = require("cors");
const db = require("./db");
const routes = require("./routes");
const { errorHandler } = require("./http");
const { whenIdle } = require("./inflight");

function createApp() {
  const app = express();
  app.set("trust proxy", true);
  app.disable("x-powered-by");

  // CORS: same-origin in prod (proxied under /api), but allow the site origin too.
  const origins = (process.env.CORS_ORIGINS || "https://nodevant.com,https://www.nodevant.com,http://localhost:3000,http://localhost:3001")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  app.use(cors({ origin: origins, methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"] }));
  app.use(express.json({ limit: "8mb" })); // 8mb so large CSV lead imports fit (was 100kb)

  // Docker HEALTHCHECK hits this. 200 only when Postgres answers, so a dead
  // database stops receiving traffic instead of failing every lead write.
  app.get("/api/health", async (_req, res) => {
    try {
      await db.ping();
      res.json({ ok: true });
    } catch (err) {
      console.error("[health] db ping failed:", err && err.message ? err.message : err);
      res.status(503).json({ ok: false });
    }
  });

  app.use("/api", routes);
  app.use(errorHandler);
  return app;
}

const app = createApp();
const PORT = Number(process.env.PORT || 4000);

function configureTimeouts(server) {
  // Reverse-audit scans are the slowest legitimate request (bounded fetches
  // plus one model call). Everything else finishes well inside this.
  server.requestTimeout = 75_000;
  server.headersTimeout = 20_000;
  server.keepAliveTimeout = 5_000;
}

function start() {
  process.on("unhandledRejection", (err) => {
    console.error("[api] unhandledRejection:", err && err.stack ? err.stack : err);
  });

  return db.init().then(
    () =>
      new Promise((resolve) => {
        const server = app.listen(PORT, () => {
          console.log(`[api] listening on :${PORT}`);
          resolve(server);
        });
        configureTimeouts(server);

        const shutdown = (sig) => {
          console.log(`[api] ${sig} received, closing`);
          server.close(() => {
            whenIdle(8_000)
              .catch(() => {})
              .then(() => db.pool.end())
              .then(() => process.exit(0))
              .catch(() => process.exit(1));
          });
          setTimeout(() => process.exit(1), 12_000).unref();
        };
        process.once("SIGTERM", () => shutdown("SIGTERM"));
        process.once("SIGINT", () => shutdown("SIGINT"));
      })
  );
}

if (require.main === module) {
  start().catch((err) => {
    console.error("[api] failed to init db:", err.message);
    process.exit(1);
  });
}

module.exports = { createApp, start, app };
