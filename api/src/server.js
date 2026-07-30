const express = require("express");
const cors = require("cors");
const db = require("./db");
const routes = require("./routes");

const app = express();
app.set("trust proxy", true);

// CORS: same-origin in prod (proxied under /api), but allow the site origin too.
const origins = (process.env.CORS_ORIGINS || "https://nodevant.com,https://www.nodevant.com,http://localhost:3000,http://localhost:3001")
  .split(",")
  .map((s) => s.trim());
app.use(cors({ origin: origins, methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"] }));
app.use(express.json({ limit: "100kb" }));

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api", routes);

const PORT = Number(process.env.PORT || 4000);

db.init()
  .then(() => {
    app.listen(PORT, () => console.log(`[api] listening on :${PORT}`));
  })
  .catch((err) => {
    console.error("[api] failed to init db:", err.message);
    process.exit(1);
  });
