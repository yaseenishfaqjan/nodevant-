"use client";

// Brand-agnostic outbound CRM.
//
// Every request goes to /api/brands/<brandId>/… on Nodevant's own API, which
// proxies server-to-server to that product's real outreach API. So this panel
// reads and writes the SAME database the product's own super-admin uses —
// a call logged here shows up there immediately, and vice versa.

import { useCallback, useEffect, useMemo, useState } from "react";

export const STAGES = [
  "New Lead", "Attempted", "Gatekeeper", "DM Identified", "Connected",
  "Qualified", "Demo Booked", "Follow-Up", "Demo Completed", "Proposal",
  "Closed Won", "Closed Lost", "Do Not Call",
] as const;

const OUTCOMES = [
  "No Answer", "Voicemail", "Gatekeeper", "DM Conversation", "Qualified",
  "Demo Booked", "Callback Scheduled", "Not Interested", "Do Not Call",
] as const;

const SIGNALS_BY_BRAND: Record<string, readonly string[]> = {
  fairway360: [
    "Private club", "Large membership operation", "Restaurant / dining",
    "Weddings / events", "Significant tournament activity", "High inbound call volume",
    "Multiple departments", "Known missed-call problem", "Staffing problem",
    "Membership growth objective", "Decision-maker engaged", "Technology upgrade interest",
  ],
  lawnpilot360: [
    "Recurring route work", "Commercial accounts", "Chemical / treatment services",
    "Snow removal season", "Large crew count", "High inbound call volume",
    "Multiple crews or locations", "Known missed-call problem", "Staffing problem",
    "Growth objective", "Decision-maker engaged", "Technology upgrade interest",
  ],
};
const DEFAULT_SIGNALS = SIGNALS_BY_BRAND.fairway360;

type Prospect = Record<string, unknown> & {
  id: string | number;
  stage: string;
  score?: number | null;
  scoreSignals?: string[] | null;
};

interface Summary {
  today?: Record<string, number>;
  funnel?: { stage: string; count: number }[];
  totalProspects?: number;
  campaigns?: { name: string; count: number }[];
  followupsDueToday?: number;
  upcomingDemos?: { id: string | number; clubName?: string; businessName?: string; dmName?: string | null; demoAt: string | null }[];
  bestOpportunity?: { id: string | number; clubName?: string; businessName?: string; score?: number | null; stage?: string } | null;
}

const nameOf = (p: Record<string, unknown>): string =>
  String(p.clubName || p.businessName || p.name || "Untitled");

const tierOf = (score: number): { label: string; cls: string } => {
  if (score >= 16) return { label: "HOT", cls: "bg-red-500/15 text-red-400 border-red-500/30" };
  if (score >= 10) return { label: "WARM", cls: "bg-amber-500/15 text-amber-400 border-amber-500/30" };
  if (score >= 5) return { label: "DEVELOP", cls: "bg-sky-500/15 text-sky-400 border-sky-500/30" };
  return { label: "LOW", cls: "bg-white/5 text-faint border-line" };
};

export default function BrandCrm({
  brandId,
  brandName,
  token,
  onUnauthorized,
}: {
  brandId: string;
  brandName: string;
  token: string;
  onUnauthorized: () => void;
}) {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [selected, setSelected] = useState<Prospect | null>(null);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [q, setQ] = useState("");
  const [stage, setStage] = useState("");
  const [campaign, setCampaign] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const signals = SIGNALS_BY_BRAND[brandId] ?? DEFAULT_SIGNALS;

  const api = useCallback(
    async (path: string, init?: RequestInit) => {
      const res = await fetch(`/api/brands/${brandId}/${path}`, {
        ...init,
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", ...(init?.headers || {}) },
      });
      if (res.status === 401) {
        onUnauthorized();
        throw new Error("Unauthorized");
      }
      const text = await res.text();
      const data = text ? JSON.parse(text) : {};
      if (!res.ok) throw new Error(data.error || data.title || `Request failed (${res.status})`);
      return data;
    },
    [brandId, token, onUnauthorized]
  );

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (stage) params.set("stage", stage);
      if (campaign) params.set("campaign", campaign);
      params.set("limit", "200");
      const [list, sum] = await Promise.all([
        api(`prospects?${params}`),
        api("outreach/summary"),
      ]);
      // Fairway returns a bare array; other products may wrap it.
      setProspects(Array.isArray(list) ? list : list.prospects || list.items || []);
      setSummary(sum || null);
    } catch (e) {
      if ((e as Error).message !== "Unauthorized") setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [api, q, stage, campaign]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    api("settings")
      .then((s) => setSettings(s?.settings || s || {}))
      .catch(() => undefined);
  }, [api]);

  const patch = async (id: string | number, body: Record<string, unknown>) => {
    try {
      const updated = await api(`prospects/${id}`, { method: "PATCH", body: JSON.stringify(body) });
      const next = (updated.prospect || updated) as Prospect;
      setProspects((prev) => prev.map((p) => (p.id === id ? { ...p, ...next } : p)));
      setSelected((s) => (s && s.id === id ? { ...s, ...next } : s));
      setNotice("Saved");
      setTimeout(() => setNotice(""), 1500);
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const logCall = async (id: string | number, outcome: string, notes: string) => {
    try {
      await api(`prospects/${id}/calls`, {
        method: "POST",
        body: JSON.stringify({ outcome, notes, calledAt: new Date().toISOString() }),
      });
      setNotice(`Call logged: ${outcome}`);
      setTimeout(() => setNotice(""), 2000);
      await load();
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const toggleSignal = (p: Prospect, sig: string) => {
    const cur = Array.isArray(p.scoreSignals) ? [...p.scoreSignals] : [];
    const next = cur.includes(sig) ? cur.filter((s) => s !== sig) : [...cur, sig];
    void patch(p.id, { scoreSignals: next });
  };

  const importCsv = async (file: File) => {
    setLoading(true);
    setError("");
    try {
      const csv = await file.text();
      const r = await api("prospects/bulk-import", { method: "POST", body: JSON.stringify({ csv }) });
      setNotice(`Imported ${r.inserted ?? r.count ?? 0} prospects`);
      await load();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const campaigns = summary?.campaigns || [];
  const today = summary?.today || {};

  const kpis = useMemo(
    () => [
      { label: "Calls today", value: today.callsAttempted ?? 0 },
      { label: "Conversations", value: today.conversations ?? 0 },
      { label: "Qualified", value: today.qualified ?? 0 },
      { label: "Demos booked", value: today.demosBooked ?? 0 },
      { label: "Follow-ups due", value: summary?.followupsDueToday ?? 0 },
      { label: "Total prospects", value: summary?.totalProspects ?? 0 },
    ],
    [today, summary]
  );

  return (
    <div>
      {/* header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">{brandName} — Sales CRM</h1>
          <p className="mt-1 text-sm text-faint">
            Live data from {brandName}. Changes here appear in its own super-admin instantly.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <label className="btn-secondary cursor-pointer px-4 py-2 text-sm">
            Import CSV
            <input
              type="file"
              accept=".csv,text/csv"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void importCsv(f);
                e.target.value = "";
              }}
            />
          </label>
          <button
            onClick={() => window.open(`/api/brands/${brandId}/prospects-export?token=${encodeURIComponent(token)}`, "_blank")}
            className="btn-secondary px-4 py-2 text-sm"
          >
            Export
          </button>
          <button onClick={() => void load()} className="btn-secondary px-4 py-2 text-sm">
            {loading ? "Loading…" : "Refresh"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">{error}</div>
      )}
      {notice && (
        <div className="mt-4 rounded-xl border border-ok/30 bg-ok/10 p-3 text-sm text-ok">{notice}</div>
      )}

      {/* KPIs */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-xl border border-line bg-bg-soft p-4 text-center">
            <div className="gradient-text font-display text-2xl font-bold">{k.value}</div>
            <div className="mt-1 text-xs text-faint">{k.label}</div>
          </div>
        ))}
      </div>

      {/* pipeline */}
      {summary?.funnel && (
        <div className="mt-6">
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[1.5px] text-accent">Pipeline</div>
          <div className="flex flex-wrap gap-2">
            {summary.funnel.map((f) => (
              <button
                key={f.stage}
                onClick={() => setStage((s) => (s === f.stage ? "" : f.stage))}
                className={`rounded-lg border px-3 py-2 text-xs transition-colors ${
                  stage === f.stage ? "border-cyan bg-tint text-ink" : "border-line text-muted hover:border-line-strong"
                }`}
              >
                {f.stage} <span className="ml-1 font-semibold text-ink">{f.count}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* filters */}
      <div className="mt-6 flex flex-wrap gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name, city, contact…"
          className="min-w-[220px] flex-1 rounded-lg border border-line bg-bg px-3 py-2 text-sm text-ink placeholder:text-faint/60"
        />
        <select
          value={campaign}
          onChange={(e) => setCampaign(e.target.value)}
          className="rounded-lg border border-line bg-bg px-3 py-2 text-sm text-ink"
        >
          <option value="">All campaigns</option>
          {campaigns.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name} ({c.count})
            </option>
          ))}
        </select>
        {(stage || campaign || q) && (
          <button
            onClick={() => {
              setStage("");
              setCampaign("");
              setQ("");
            }}
            className="btn-secondary px-4 py-2 text-sm"
          >
            Clear
          </button>
        )}
      </div>

      {/* list */}
      <div className="article mt-6">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Contact</th>
                <th>Stage</th>
                <th>Score</th>
                <th>Campaign</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {prospects.map((p) => {
                const score = Number(p.score ?? 0);
                const tier = tierOf(score);
                return (
                  <tr key={String(p.id)}>
                    <td className="font-medium text-ink">{nameOf(p)}</td>
                    <td className="whitespace-nowrap text-faint">
                      {[p.city, p.state].filter(Boolean).join(", ") || "—"}
                    </td>
                    <td>
                      {p.dmName ? <div className="text-ink">{String(p.dmName)}</div> : null}
                      {p.mainPhone ? (
                        <a href={`tel:${p.mainPhone}`} className="text-xs text-cyan">
                          📞 {String(p.mainPhone)}
                        </a>
                      ) : (
                        !p.dmName && "—"
                      )}
                    </td>
                    <td className="whitespace-nowrap text-muted">{p.stage}</td>
                    <td>
                      <span className={`rounded border px-2 py-0.5 text-[10px] font-semibold ${tier.cls}`}>
                        {tier.label} {score}
                      </span>
                    </td>
                    <td className="text-faint">{(p.campaign as string) || "—"}</td>
                    <td>
                      <button onClick={() => setSelected(p)} className="btn-secondary px-3 py-1 text-xs">
                        Open
                      </button>
                    </td>
                  </tr>
                );
              })}
              {!prospects.length && !loading && (
                <tr>
                  <td colSpan={7} className="text-center text-faint">
                    No prospects match these filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* settings */}
      <div className="mt-8 rounded-2xl border border-line bg-bg-soft p-5">
        <div className="mb-3 text-[10px] font-semibold uppercase tracking-[1.5px] text-accent">
          {brandName} outreach settings
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { key: "bookingUrl", label: "Meeting / booking link" },
            { key: "demoUrl", label: "Demo link" },
            { key: "sender", label: "Sender (From)" },
            { key: "replyTo", label: "Reply-to address" },
          ].map((f) => (
            <label key={f.key} className="block">
              <span className="mb-1 block text-xs text-faint">{f.label}</span>
              <input
                value={settings[f.key] ?? ""}
                onChange={(e) => setSettings((s) => ({ ...s, [f.key]: e.target.value }))}
                onBlur={() =>
                  void api("settings", { method: "PATCH", body: JSON.stringify({ [f.key]: settings[f.key] ?? "" }) })
                    .then(() => setNotice("Settings saved"))
                    .catch((e) => setError((e as Error).message))
                }
                className="w-full rounded-lg border border-line bg-bg px-3 py-2 text-sm text-ink"
              />
            </label>
          ))}
        </div>
      </div>

      {/* detail drawer */}
      {selected && (
        <ProspectDrawer
          p={selected}
          signals={signals}
          settings={settings}
          onClose={() => setSelected(null)}
          onPatch={patch}
          onToggleSignal={toggleSignal}
          onLogCall={logCall}
        />
      )}
    </div>
  );
}

function ProspectDrawer({
  p,
  signals,
  settings,
  onClose,
  onPatch,
  onToggleSignal,
  onLogCall,
}: {
  p: Prospect;
  signals: readonly string[];
  settings: Record<string, string>;
  onClose: () => void;
  onPatch: (id: string | number, body: Record<string, unknown>) => void;
  onToggleSignal: (p: Prospect, s: string) => void;
  onLogCall: (id: string | number, outcome: string, notes: string) => void;
}) {
  const [notes, setNotes] = useState(String(p.notes ?? ""));
  const active = Array.isArray(p.scoreSignals) ? (p.scoreSignals as string[]) : [];
  const score = Number(p.score ?? 0);
  const tier = tierOf(score);
  const booking = settings.bookingUrl || "";

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="h-full w-full max-w-xl overflow-y-auto border-l border-line bg-bg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-bold text-ink">{nameOf(p)}</h2>
            <p className="mt-1 text-sm text-faint">
              {[p.city, p.state].filter(Boolean).join(", ")} · {String(p.stage)}
            </p>
          </div>
          <button onClick={onClose} className="btn-secondary px-3 py-1 text-sm">
            Close
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className={`rounded border px-2 py-1 text-xs font-semibold ${tier.cls}`}>
            {tier.label} · {score} pts
          </span>
          {p.mainPhone ? (
            <a href={`tel:${p.mainPhone}`} className="btn-secondary px-3 py-1 text-xs">
              📞 Call {String(p.mainPhone)}
            </a>
          ) : null}
          {booking && (
            <a href={booking} target="_blank" rel="noreferrer" className="btn-secondary px-3 py-1 text-xs">
              📅 Book meeting
            </a>
          )}
        </div>

        {/* stage */}
        <div className="mt-6">
          <div className="mb-1 text-xs text-faint">Stage</div>
          <select
            value={String(p.stage)}
            onChange={(e) => onPatch(p.id, { stage: e.target.value })}
            className="w-full rounded-lg border border-line bg-bg-soft px-3 py-2 text-sm text-ink"
          >
            {STAGES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* qualification signals */}
        <div className="mt-6">
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[1.5px] text-accent">
            Qualification signals — 2 pts each
          </div>
          <div className="grid gap-1.5 sm:grid-cols-2">
            {signals.map((s) => (
              <label key={s} className="flex cursor-pointer items-center gap-2 rounded-lg border border-line px-2.5 py-1.5 text-xs text-muted hover:border-line-strong">
                <input
                  type="checkbox"
                  checked={active.includes(s)}
                  onChange={() => onToggleSignal(p, s)}
                  className="accent-cyan"
                />
                {s}
              </label>
            ))}
          </div>
        </div>

        {/* log a call */}
        <div className="mt-6">
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[1.5px] text-accent">Log a call</div>
          <div className="flex flex-wrap gap-2">
            {OUTCOMES.map((o) => (
              <button
                key={o}
                onClick={() => onLogCall(p.id, o, notes)}
                className="rounded-lg border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:border-cyan hover:text-ink"
              >
                {o}
              </button>
            ))}
          </div>
          <p className="mt-2 text-[11px] text-faint">
            Logging a call advances the pipeline automatically — it never moves a prospect backwards.
          </p>
        </div>

        {/* notes */}
        <div className="mt-6">
          <div className="mb-1 text-xs text-faint">Notes</div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onBlur={() => onPatch(p.id, { notes })}
            rows={5}
            className="w-full rounded-lg border border-line bg-bg-soft px-3 py-2 text-sm text-ink"
            placeholder="What did they say — in their own words?"
          />
        </div>
      </div>
    </div>
  );
}
