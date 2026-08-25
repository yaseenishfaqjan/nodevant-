"use client";

// Nodevant's own inbound leads (audits, contact forms, voice calls, bookings).
// Auth lives in the console shell — this panel just receives the token.

import { useCallback, useEffect, useState } from "react";

interface Lead {
  id: number;
  created_at: string;
  type: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  message: string | null;
  biggest_pain: string | null;
  score: number | null;
  annual_savings: number | null;
  roi_multiple: number | null;
  meeting_at: string | null;
  meeting_type: string | null;
  status: string;
}

interface Stats {
  total: number;
  audits: number;
  contacts: number;
  bookings: number;
  calls: number;
  last7: number;
}

const STATUSES = ["new", "contacted", "qualified", "won", "lost"];

export default function NodevantLeads({
  token,
  onUnauthorized,
}: {
  token: string;
  onUnauthorized: () => void;
}) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<{ status: string; type: string }>({ status: "", type: "" });

  const headers = useCallback(
    () => ({ Authorization: `Bearer ${token}`, "Content-Type": "application/json" }),
    [token]
  );

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (filter.status) params.set("status", filter.status);
      if (filter.type) params.set("type", filter.type);
      const [lr, sr] = await Promise.all([
        fetch(`/api/leads?${params}`, { headers: headers() }),
        fetch(`/api/stats`, { headers: headers() }),
      ]);
      if (lr.status === 401) {
        onUnauthorized();
        return;
      }
      setLeads((await lr.json()).leads || []);
      setStats(await sr.json());
    } catch {
      setError("Could not reach the API. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }, [filter, headers, onUnauthorized]);

  useEffect(() => {
    void load();
  }, [load]);

  const updateLead = async (id: number, patch: Partial<Lead>) => {
    await fetch(`/api/leads/${id}`, { method: "PATCH", headers: headers(), body: JSON.stringify(patch) });
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  };

  const deleteLead = async (id: number) => {
    if (!confirm("Delete this lead permanently?")) return;
    const res = await fetch(`/api/leads/${id}`, { method: "DELETE", headers: headers() });
    if (res.ok) setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  const money = (n: number | null) => (n ? `$${n.toLocaleString()}` : "—");
  const date = (s: string) =>
    new Date(s).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Nodevant leads</h1>
          <p className="mt-1 text-sm text-faint">Inbound audits, contact forms, voice calls and bookings.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => window.open(`/api/leads/export.csv?token=${encodeURIComponent(token)}`, "_blank")}
            className="btn-secondary px-4 py-2 text-sm"
          >
            Export CSV
          </button>
          <button onClick={() => void load()} className="btn-secondary px-4 py-2 text-sm">
            {loading ? "Loading…" : "Refresh"}
          </button>
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-violet">{error}</p>}

      {stats && (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {[
            { label: "Total leads", value: stats.total },
            { label: "Audits", value: stats.audits },
            { label: "Contacts", value: stats.contacts },
            { label: "Voice calls", value: stats.calls },
            { label: "Meetings booked", value: stats.bookings },
            { label: "Last 7 days", value: stats.last7 },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-line bg-bg-soft p-4 text-center">
              <div className="gradient-text font-display text-2xl font-bold">{s.value}</div>
              <div className="mt-1 text-xs text-faint">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        <select
          value={filter.type}
          onChange={(e) => setFilter((f) => ({ ...f, type: e.target.value }))}
          className="rounded-lg border border-line bg-bg px-3 py-2 text-sm text-ink"
        >
          <option value="">All types</option>
          <option value="audit">Audit</option>
          <option value="contact">Contact</option>
          <option value="call">Voice call</option>
          <option value="booking">Meeting</option>
        </select>
        <select
          value={filter.status}
          onChange={(e) => setFilter((f) => ({ ...f, status: e.target.value }))}
          className="rounded-lg border border-line bg-bg px-3 py-2 text-sm text-ink"
        >
          <option value="">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="article mt-6">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>When</th>
                <th>Type</th>
                <th>Name</th>
                <th>Email</th>
                <th>Pain / Meeting</th>
                <th>Score</th>
                <th>Savings/yr</th>
                <th>ROI</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id}>
                  <td className="whitespace-nowrap">{date(l.created_at)}</td>
                  <td>{l.type}</td>
                  <td>{l.name || "—"}</td>
                  <td>
                    {l.email ? (
                      <a href={`mailto:${l.email}`} className="text-cyan">
                        {l.email}
                      </a>
                    ) : (
                      !l.phone && "—"
                    )}
                    {l.phone && (
                      <a href={`tel:${l.phone}`} className="block text-xs text-faint hover:text-cyan">
                        📞 {l.phone}
                      </a>
                    )}
                  </td>
                  <td>
                    {l.type === "booking" ? (
                      <span className="text-cyan">
                        📅 {l.meeting_at ? date(l.meeting_at) : "booked"}
                        {l.meeting_type ? ` · ${l.meeting_type}` : ""}
                      </span>
                    ) : (
                      l.biggest_pain || (l.message ? "📝 msg" : "—")
                    )}
                  </td>
                  <td>{l.score ?? "—"}</td>
                  <td>{money(l.annual_savings)}</td>
                  <td>{l.roi_multiple ? `${l.roi_multiple}×` : "—"}</td>
                  <td>
                    <select
                      value={l.status}
                      onChange={(e) => void updateLead(l.id, { status: e.target.value })}
                      className="rounded border border-line bg-bg px-2 py-1 text-xs text-ink"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button
                      onClick={() => void deleteLead(l.id)}
                      title="Delete lead"
                      className="rounded border border-line px-2 py-1 text-xs text-faint transition-colors hover:border-violet hover:text-violet"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {!leads.length && (
                <tr>
                  <td colSpan={10} className="text-center text-faint">
                    No leads yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
