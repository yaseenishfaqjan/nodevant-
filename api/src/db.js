const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // small pool — this is a low-traffic lead capture service
  max: 5,
});

async function init(retries = 10) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS leads (
          id            SERIAL PRIMARY KEY,
          type          TEXT NOT NULL DEFAULT 'audit',
          name          TEXT,
          email         TEXT,
          company       TEXT,
          message       TEXT,
          source        TEXT,
          industry      TEXT,
          team_size     TEXT,
          biggest_pain  TEXT,
          hours_wasted  INTEGER,
          hourly_rate   TEXT,
          current_tools TEXT,
          automation_goal TEXT,
          score         INTEGER,
          recommended_service TEXT,
          annual_savings INTEGER,
          roi_multiple  NUMERIC,
          phone         TEXT,
          meeting_at    TIMESTAMPTZ,
          meeting_type  TEXT,
          status        TEXT NOT NULL DEFAULT 'new',
          notes         TEXT,
          created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
        );
        ALTER TABLE leads ADD COLUMN IF NOT EXISTS phone TEXT;
        ALTER TABLE leads ADD COLUMN IF NOT EXISTS meeting_at TIMESTAMPTZ;
        ALTER TABLE leads ADD COLUMN IF NOT EXISTS meeting_type TEXT;
        CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at DESC);
        CREATE INDEX IF NOT EXISTS idx_leads_status ON leads (status);
      `);
      console.log("[db] schema ready");
      return;
    } catch (err) {
      console.warn(`[db] not ready (attempt ${attempt}/${retries}): ${err.message}`);
      if (attempt === retries) throw err;
      await new Promise((r) => setTimeout(r, 2000));
    }
  }
}

async function insertLead(lead) {
  const cols = [
    "type", "name", "email", "company", "message", "source", "industry",
    "team_size", "biggest_pain", "hours_wasted", "hourly_rate", "current_tools",
    "automation_goal", "score", "recommended_service", "annual_savings", "roi_multiple",
    "phone", "meeting_at", "meeting_type",
  ];
  const values = cols.map((c) => lead[c] ?? null);
  const placeholders = cols.map((_, i) => `$${i + 1}`).join(", ");
  const { rows } = await pool.query(
    `INSERT INTO leads (${cols.join(", ")}) VALUES (${placeholders}) RETURNING id, created_at`,
    values
  );
  return rows[0];
}

async function listLeads({ status, type, limit = 200 } = {}) {
  const where = [];
  const params = [];
  if (status) { params.push(status); where.push(`status = $${params.length}`); }
  if (type) { params.push(type); where.push(`type = $${params.length}`); }
  params.push(Math.min(Number(limit) || 200, 1000));
  const clause = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const { rows } = await pool.query(
    `SELECT * FROM leads ${clause} ORDER BY created_at DESC LIMIT $${params.length}`,
    params
  );
  return rows;
}

async function updateLead(id, fields) {
  const allowed = ["status", "notes"];
  const sets = [];
  const params = [];
  for (const key of allowed) {
    if (fields[key] !== undefined) {
      params.push(fields[key]);
      sets.push(`${key} = $${params.length}`);
    }
  }
  if (!sets.length) return null;
  params.push(id);
  const { rows } = await pool.query(
    `UPDATE leads SET ${sets.join(", ")} WHERE id = $${params.length} RETURNING *`,
    params
  );
  return rows[0] || null;
}

async function deleteLead(id) {
  const { rowCount } = await pool.query("DELETE FROM leads WHERE id = $1", [id]);
  return rowCount > 0;
}

async function stats() {
  const { rows } = await pool.query(`
    SELECT
      COUNT(*)::int AS total,
      COUNT(*) FILTER (WHERE type = 'audit')::int AS audits,
      COUNT(*) FILTER (WHERE type = 'contact')::int AS contacts,
      COUNT(*) FILTER (WHERE type = 'booking')::int AS bookings,
      COUNT(*) FILTER (WHERE type = 'call')::int AS calls,
      COUNT(*) FILTER (WHERE created_at > now() - interval '7 days')::int AS last7
    FROM leads;
  `);
  return rows[0];
}

module.exports = { pool, init, insertLead, listLeads, updateLead, deleteLead, stats };
