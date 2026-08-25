"use client";

// Nodevant super-admin console.
//
// One dashboard over every product we run. The sidebar switches brands;
// each brand's CRM and call scripts are served live from that product's own
// API through Nodevant's /api/brands/* proxy, so there is a single set of
// data and each product's own super-admin keeps working unchanged.

import { useCallback, useEffect, useState } from "react";
import NodevantLeads from "./NodevantLeads";
import BrandCrm from "./BrandCrm";
import BrandScripts from "./BrandScripts";

const TOKEN_KEY = "nodevant_admin_token";

interface Brand {
  id: string;
  name: string;
  industry: string;
  accent: string;
  enabled: boolean;
}

type View = { kind: "leads" } | { kind: "brand"; id: string; tab: "crm" | "scripts" };

export default function AdminDashboard() {
  const [token, setToken] = useState("");
  const [authed, setAuthed] = useState(false);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [view, setView] = useState<View>({ kind: "leads" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  const signIn = useCallback(async (t: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/brands", { headers: { Authorization: `Bearer ${t}` } });
      if (res.status === 401) {
        setError("Invalid token.");
        localStorage.removeItem(TOKEN_KEY);
        setAuthed(false);
        return;
      }
      const data = await res.json();
      setBrands(data.brands || []);
      setAuthed(true);
      localStorage.setItem(TOKEN_KEY, t);
    } catch {
      setError("Could not reach the API. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(TOKEN_KEY);
    if (saved) {
      setToken(saved);
      void signIn(saved);
    }
  }, [signIn]);

  const onUnauthorized = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setAuthed(false);
    setError("Session expired — sign in again.");
  }, []);

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setAuthed(false);
    setToken("");
    setBrands([]);
    setView({ kind: "leads" });
  };

  // ---- Login gate ----
  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-sm rounded-2xl border border-line bg-white/[0.02] p-8">
          <h1 className="font-display text-2xl font-bold text-ink">Nodevant Console</h1>
          <p className="mt-2 text-sm text-muted">Enter your admin token to continue.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void signIn(token);
            }}
            className="mt-6 space-y-3"
          >
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Admin token"
              className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-ink placeholder:text-faint/60 focus:border-cyan focus:outline-none"
            />
            <button type="submit" disabled={!token || loading} className="btn-primary w-full">
              {loading ? "Checking…" : "Sign in"}
            </button>
          </form>
          {error && <p className="mt-3 text-sm text-violet">{error}</p>}
        </div>
      </div>
    );
  }

  const activeBrand = view.kind === "brand" ? brands.find((b) => b.id === view.id) : undefined;

  const NavContents = (
    <nav className="flex h-full flex-col gap-6 p-5">
      <div>
        <div className="font-display text-lg font-bold text-ink">Nodevant</div>
        <div className="text-[10px] uppercase tracking-[1.5px] text-faint">Super-admin console</div>
      </div>

      <div>
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[1.5px] text-faint">Nodevant</div>
        <button
          onClick={() => {
            setView({ kind: "leads" });
            setNavOpen(false);
          }}
          className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
            view.kind === "leads" ? "bg-tint text-ink" : "text-muted hover:bg-white/5 hover:text-ink"
          }`}
        >
          Inbound leads
        </button>
      </div>

      <div className="min-h-0 flex-1">
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[1.5px] text-faint">Products</div>
        <div className="space-y-1">
          {brands.map((b) => {
            const isActive = view.kind === "brand" && view.id === b.id;
            return (
              <div key={b.id}>
                <button
                  disabled={!b.enabled}
                  onClick={() => {
                    setView({ kind: "brand", id: b.id, tab: "crm" });
                    setNavOpen(false);
                  }}
                  title={b.enabled ? b.industry : `${b.name} is not connected yet`}
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    isActive ? "bg-tint text-ink" : "text-muted hover:bg-white/5 hover:text-ink"
                  } ${b.enabled ? "" : "cursor-not-allowed opacity-40"}`}
                >
                  <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: b.accent }} />
                  <span className="flex-1 truncate">{b.name}</span>
                  {!b.enabled && <span className="text-[9px] uppercase text-faint">soon</span>}
                </button>

                {isActive && (
                  <div className="ml-4 mt-1 space-y-0.5 border-l border-line pl-3">
                    {(["crm", "scripts"] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setView({ kind: "brand", id: b.id, tab: t })}
                        className={`block w-full rounded px-2 py-1 text-left text-xs transition-colors ${
                          view.tab === t ? "text-cyan" : "text-faint hover:text-ink"
                        }`}
                      >
                        {t === "crm" ? "Sales CRM" : "Call scripts"}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          {!brands.length && <p className="px-3 text-xs text-faint">No products configured.</p>}
        </div>
      </div>

      <button onClick={logout} className="btn-secondary w-full px-3 py-2 text-sm">
        Log out
      </button>
    </nav>
  );

  return (
    <div className="flex min-h-screen">
      {/* desktop sidebar */}
      <aside className="hidden w-60 shrink-0 border-r border-line bg-bg-soft md:block">
        <div className="sticky top-0 h-screen">{NavContents}</div>
      </aside>

      {/* mobile drawer */}
      {navOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden" onClick={() => setNavOpen(false)}>
          <div className="h-full w-64 border-r border-line bg-bg" onClick={(e) => e.stopPropagation()}>
            {NavContents}
          </div>
          <div className="flex-1 bg-black/60" />
        </div>
      )}

      <main className="min-w-0 flex-1 px-5 py-8 md:px-8">
        <button onClick={() => setNavOpen(true)} className="btn-secondary mb-5 px-3 py-1.5 text-sm md:hidden">
          ☰ Menu
        </button>

        {view.kind === "leads" && <NodevantLeads token={token} onUnauthorized={onUnauthorized} />}

        {view.kind === "brand" && activeBrand && view.tab === "crm" && (
          <BrandCrm
            key={activeBrand.id}
            brandId={activeBrand.id}
            brandName={activeBrand.name}
            token={token}
            onUnauthorized={onUnauthorized}
          />
        )}

        {view.kind === "brand" && activeBrand && view.tab === "scripts" && (
          <BrandScripts brandId={activeBrand.id} brandName={activeBrand.name} />
        )}
      </main>
    </div>
  );
}
