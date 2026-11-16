const { Pool } = require("pg");

const QUERY_TIMEOUT_MS = Number(process.env.PG_QUERY_TIMEOUT_MS || 8000);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Small pool — this is a low-traffic lead capture service. A stuck query
  // must not pin a slot forever: connection and statement timeouts release it.
  max: Number(process.env.PG_POOL_MAX || 5),
  connectionTimeoutMillis: Number(process.env.PG_CONNECT_TIMEOUT_MS || 5000),
  idleTimeoutMillis: 30_000,
  query_timeout: QUERY_TIMEOUT_MS,
  statement_timeout: QUERY_TIMEOUT_MS,
  idle_in_transaction_session_timeout: 10_000,
  allowExitOnIdle: true,
  application_name: "nodevant-api",
});

// Idle clients emit 'error' on network partitions. With no listener Node
// treats that as an uncaught exception and exits.
pool.on("error", (err) => {
  console.error("[db] idle client error:", err && err.message ? err.message : err);
});

const SCHEMA_STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS leads (
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
  )`,
  `ALTER TABLE leads ADD COLUMN IF NOT EXISTS phone TEXT`,
  `ALTER TABLE leads ADD COLUMN IF NOT EXISTS meeting_at TIMESTAMPTZ`,
  `ALTER TABLE leads ADD COLUMN IF NOT EXISTS meeting_type TEXT`,
  `ALTER TABLE leads ADD COLUMN IF NOT EXISTS external_id TEXT`,
  `CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at DESC)`,
  `CREATE INDEX IF NOT EXISTS idx_leads_status ON leads (status)`,
  `CREATE INDEX IF NOT EXISTS idx_leads_status_created ON leads (status, created_at DESC)`,
  `CREATE INDEX IF NOT EXISTS idx_leads_type_created ON leads (type, created_at DESC)`,
  `CREATE UNIQUE INDEX IF NOT EXISTS idx_leads_external_id ON leads (external_id) WHERE external_id IS NOT NULL`,
];

const LEAD_COLUMNS = [
  "type", "name", "email", "company", "message", "source", "industry",
  "team_size", "biggest_pain", "hours_wasted", "hourly_rate", "current_tools",
  "automation_goal", "score", "recommended_service", "annual_savings", "roi_multiple",
  "phone", "meeting_at", "meeting_type", "external_id",
];

function defaultExec(text, params) {
  return pool.query(text, params);
}

function parseTimestamp(value) {
  if (value == null || value === "") return null;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date;
}

function clampLimit(limit, { fallback = 200, max = 1000 } = {}) {
  const n = Number(limit);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(1, Math.min(Math.floor(n), max));
}

function normalizeLead(lead) {
  const row = { ...lead };
  row.meeting_at = parseTimestamp(lead.meeting_at);
  row.external_id = lead.external_id ? String(lead.external_id).slice(0, 200) : null;
  if (row.hours_wasted != null && Number.isFinite(Number(row.hours_wasted))) {
    row.hours_wasted = Math.max(0, Math.min(100_000, Math.round(Number(row.hours_wasted))));
  }
  return row;
}

async function init(retries = 10) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await pool.query(SCHEMA_STATEMENTS.join(";\n"));
      console.log("[db] schema ready");
      return;
    } catch (err) {
      console.warn(`[db] not ready (attempt ${attempt}/${retries}): ${err.message}`);
      if (attempt === retries) throw err;
      await new Promise((r) => setTimeout(r, 2000));
    }
  }
}

async function ping() {
  await pool.query("SELECT 1");
}

async function insertLead(lead, exec = defaultExec) {
  const row = normalizeLead(lead);
  const values = LEAD_COLUMNS.map((c) => row[c] ?? null);
  const placeholders = LEAD_COLUMNS.map((_, i) => `$${i + 1}`).join(", ");
  const { rows } = await exec(
    `INSERT INTO leads (${LEAD_COLUMNS.join(", ")}) VALUES (${placeholders}) RETURNING id, created_at`,
    values
  );
  return rows[0];
}

async function mergeLead(row, exec) {
  const prev = await exec(
    `SELECT id, created_at, meeting_at, email, phone FROM leads WHERE external_id = $1`,
    [row.external_id]
  );
  const existing = prev.rows[0];
  if (!existing) {
    const err = new Error("duplicate lead row missing");
    err.code = "23505";
    throw err;
  }
  const prevAt = parseTimestamp(existing.meeting_at);
  const nextAt = row.meeting_at;
  const meetingChanged = Boolean(nextAt && (!prevAt || prevAt.getTime() !== nextAt.getTime()));
  const enriched = Boolean((!existing.email && row.email) || (!existing.phone && row.phone));
  const updated = await exec(
    `UPDATE leads SET
       name = COALESCE(name, $2),
       email = COALESCE(email, $3),
       phone = COALESCE(phone, $4),
       company = COALESCE(company, $5),
       message = CASE
         WHEN $6::text IS NULL THEN message
         WHEN message IS NULL OR char_length($6::text) > char_length(message) THEN $6
         ELSE message
       END,
       meeting_at = COALESCE($7::timestamptz, meeting_at),
       meeting_type = COALESCE($8, meeting_type),
       source = COALESCE($9, source)
     WHERE external_id = $1
     RETURNING id, created_at`,
    [
      row.external_id,
      row.name ?? null,
      row.email ?? null,
      row.phone ?? null,
      row.company ?? null,
      row.message ?? null,
      row.meeting_at ?? null,
      row.meeting_type ?? null,
      row.source ?? null,
    ]
  );
  if (!updated.rows[0]) {
    const err = new Error("duplicate lead row missing");
    err.code = "23505";
    throw err;
  }
  return { ...updated.rows[0], created: false, meetingChanged, enriched };
}

// Insert, or merge into the existing row when external_id collides.
// Webhook providers retry and the voice agent emits more than one event per
// call; both used to create a second lead and a second email.
async function saveLead(lead, exec = defaultExec) {
  const row = normalizeLead(lead);
  if (!row.external_id) {
    const inserted = await insertLead(row, exec);
    return { ...inserted, created: true, meetingChanged: false, enriched: false };
  }
  try {
    const inserted = await insertLead(row, exec);
    return { ...inserted, created: true, meetingChanged: false, enriched: false };
  } catch (err) {
    if (!err || err.code !== "23505") throw err;
  }
  return mergeLead(row, exec);
}

async function listLeads({ status, type, limit = 200, max = 1000 } = {}) {
  const where = [];
  const params = [];
  if (typeof status === "string" && status) {
    params.push(status.slice(0, 40));
    where.push(`status = $${params.length}`);
  }
  if (typeof type === "string" && type) {
    params.push(type.slice(0, 40));
    where.push(`type = $${params.length}`);
  }
  params.push(clampLimit(limit, { max }));
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
      let value = fields[key];
      if (value !== null && typeof value !== "string") value = String(value);
      if (typeof value === "string") value = value.slice(0, key === "notes" ? 10_000 : 40);
      params.push(value);
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

module.exports = {
  pool,
  init,
  ping,
  insertLead,
  saveLead,
  listLeads,
  updateLead,
  deleteLead,
  stats,
  parseTimestamp,
  clampLimit,
  SCHEMA_STATEMENTS,
  LEAD_COLUMNS,
};
