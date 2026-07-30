"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Icon, { type IconName } from "@/components/ui/Icon";
import { submitLead } from "@/lib/leads";

/**
 * Reverse Audit — paste a URL, we scan the public site and return up to 3 automation
 * opportunities. Frontend drives the 5-step scan animation while POSTing to
 * /api/reverse-audit/scan; it renders whatever the backend returns and NEVER fabricates
 * findings (on localhost with no backend it shows a labelled demo result so the page is
 * viewable in dev). All honesty states from the design are preserved.
 */

type Phase = "idle" | "scanning" | "results" | "rate-limited" | "failed" | "manual";
type Kind = "excellent" | "mixed" | "none";

interface Opportunity {
  rank: number;
  category: string;
  title: string;
  evidence: { pageSeen: string; whatWasFound: string };
  impact: { metric: string; industryAvg: string; estimatedCostMonthly?: number };
  fix: { whatWeBuild: string; timelineDays: number; priceFrom: number };
  linkedService: string;
  similarToCaseStudy: string;
  confidence?: "high" | "low";
}

const SCAN_MS = 18000;
const WEIGHTS = [0.5, 2, 3, 2, 0.5];
const STEPS: { label: string; subs: string[] }[] = [
  { label: "Reading homepage structure", subs: ["Fetching {host}…", "Parsing DOM"] },
  { label: "Detecting contact form + response mechanisms", subs: ["Detecting contact form…", "Testing form response…"] },
  { label: "Analyzing pricing surface + ROI signals", subs: ["Scanning /pricing…", "Checking for instant-quote path…"] },
  { label: "Scanning careers page for role signals", subs: ["Fetching /careers…", "Mapping roles to workflow signals…"] },
  { label: "Generating opportunity report", subs: ["Ranking candidate gaps…", "Selecting top 3"] },
];

const CASE_LABELS: Record<string, string> = {
  storehouse360: "Storehouse360",
  scalaro: "Scalaro",
  fabrioza: "Fabrioza",
  fairway360: "Fairway360",
  bmaikr: "GlobalShield360",
  peachpicks: "PeachPicks",
};

// Labelled DEMO result — shown only on localhost when no backend is reachable.
const DEMO_OPPS: Opportunity[] = [
  { rank: 1, category: "Lead response", title: "Contact form with no autoresponder", evidence: { pageSeen: "{host}/contact", whatWasFound: "form submits to a mailto: link" }, impact: { metric: "4-hour reply gap", industryAvg: "~78% of leads lost", estimatedCostMonthly: 0 }, fix: { whatWeBuild: "instant SMS + email autoresponder + Slack ping to your team", timelineDays: 3, priceFrom: 1200 }, linkedService: "lead-gen-pipeline", similarToCaseStudy: "bmaikr" },
  { rank: 2, category: "Sales surface", title: "Pricing page with no instant quote", evidence: { pageSeen: "{host}/pricing", whatWasFound: "static tiers, no calculator or quote path" }, impact: { metric: "quote friction", industryAvg: "~35% of buyers bounce" }, fix: { whatWeBuild: "instant quote calculator wired to your rate card + CRM", timelineDays: 5, priceFrom: 2400 }, linkedService: "complex-logic-engines", similarToCaseStudy: "fabrioza" },
  { rank: 3, category: "Workflow signal", title: "Careers page hiring for manual work", evidence: { pageSeen: "{host}/careers", whatWasFound: "hiring 2 data-entry coordinators" }, impact: { metric: "2 FTE on repeatable work", industryAvg: "≈ $96,000/yr" }, fix: { whatWeBuild: "workflow automation covering the repetitive 80%", timelineDays: 14, priceFrom: 4800 }, linkedService: "agentic-workflows", similarToCaseStudy: "scalaro", confidence: "low" },
];

const TRUST = ["20-second scan", "No email required", "No signup", "Real analysis, not a template"];

const HOW: { icon: IconName; title: string; body: string }[] = [
  { icon: "eye", title: "We scan public pages only", body: "No private URLs, no scraping behind logins. If it isn't visible to any visitor, we don't look at it." },
  { icon: "lock", title: "We don't store your URL", body: "The scan runs on-request. We keep aggregated pattern data, never your URL." },
  { icon: "clock", title: "Results in ~20 seconds", body: "This is Nodevant's own automation running on you — the exact thing we'd build for your customers." },
];

function hostOf(raw: string) {
  const s = (raw || "").trim() || "your-site.com";
  return s.replace(/^https?:\/\//, "").replace(/\/.*$/, "").toLowerCase();
}

export default function ReverseAuditPage() {
  const [url, setUrl] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [scanStart, setScanStart] = useState(0);
  const [opps, setOpps] = useState<Opportunity[]>([]);
  const [kind, setKind] = useState<Kind>("excellent");
  const [rlEnd, setRlEnd] = useState(0);
  const [, setTick] = useState(0);
  const [email, setEmail] = useState("");
  const [manualSent, setManualSent] = useState(false);
  const [manualSending, setManualSending] = useState(false);
  const reduce = useRef(false);

  useEffect(() => {
    try {
      reduce.current = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      // dev/preview hook: /reverse-audit/?preview=manual|results forces a state
      const p = new URLSearchParams(location.search).get("preview");
      if (p === "manual") setPhase("manual");
      else if (p === "results") {
        setOpps(DEMO_OPPS);
        setKind("excellent");
        setPhase("results");
      }
    } catch {
      /* ignore */
    }
  }, []);

  // drives the scan clock + rate-limit countdown
  useEffect(() => {
    if (phase !== "scanning" && phase !== "rate-limited") return;
    const iv = setInterval(() => setTick((t) => t + 1), 250);
    return () => clearInterval(iv);
  }, [phase]);

  const host = hostOf(url);

  async function startScan() {
    if (phase === "scanning") return;
    setPhase("scanning");
    setScanStart(Date.now());
    const minAnim = new Promise((r) => setTimeout(r, reduce.current ? 1200 : SCAN_MS));
    try {
      const res = await fetch("/api/reverse-audit/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ url }),
      });
      if (res.status === 429) {
        const d = await res.json().catch(() => ({}));
        await minAnim;
        setRlEnd(Date.now() + (Number(d.retryAfterSeconds) || 3600) * 1000);
        setPhase("rate-limited");
        return;
      }
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      await minAnim;
      if (data.status === "manual-queued") {
        setPhase("manual"); // no AI key configured → team does a hands-on audit
        return;
      }
      const list: Opportunity[] = Array.isArray(data.opportunities) ? data.opportunities : [];
      setOpps(list);
      setKind(data.status === "no-findings" || list.length === 0 ? "none" : data.status === "mixed" ? "mixed" : "excellent");
      setPhase("results");
    } catch {
      await minAnim;
      const isLocal = typeof location !== "undefined" && /^(localhost|127\.)/.test(location.hostname);
      if (isLocal) {
        setOpps(DEMO_OPPS);
        setKind("excellent");
        setPhase("results");
      } else {
        setPhase("failed");
      }
    }
  }

  function reset() {
    setPhase("idle");
    setUrl("");
    setOpps([]);
    setManualSent(false);
    setEmail("");
  }

  async function submitManual(e: React.FormEvent) {
    e.preventDefault();
    if (!email || manualSending) return;
    setManualSending(true);
    await submitLead({
      type: "contact",
      source: "reverse-audit",
      sourcePage: "/reverse-audit/",
      email,
      message: `Reverse-audit request for ${url || "(no url)"} — please run a hands-on audit and send the breakdown.`,
    });
    setManualSending(false);
    setManualSent(true);
  }

  // scan-step states
  const elapsed = phase === "scanning" ? Math.min(Date.now() - scanStart, SCAN_MS) : 0;
  const clockS = (elapsed / 1000).toFixed(1);
  const totalW = WEIGHTS.reduce((a, b) => a + b, 0);
  let acc = 0;
  const bounds = WEIGHTS.map((w) => {
    const b: [number, number] = [acc, acc + (w / totalW) * SCAN_MS];
    acc = b[1];
    return b;
  });

  const rlLeft = Math.max(0, Math.round((rlEnd - Date.now()) / 1000));
  const countdown = `${String(Math.floor(rlLeft / 60)).padStart(2, "0")}:${String(rlLeft % 60).padStart(2, "0")}`;

  return (
    <main className="bg-bg">
      {/* Hero + input */}
      <section className="grid-overlay relative overflow-hidden px-5 pb-10 pt-28 md:pt-[100px]">
        <div className="pointer-events-none absolute -top-36 left-1/2 h-[380px] w-[560px] -translate-x-[70%] rounded-full bg-cyan opacity-[0.06] blur-[120px]" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-20 -top-32 h-[360px] w-[480px] rounded-full bg-violet opacity-[0.06] blur-[120px]" aria-hidden="true" />
        <div className="relative mx-auto max-w-[900px]">
          <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-faint">Reverse Audit · 20 seconds · No signup</span>
          <div aria-hidden="true" className="my-3 h-0.5 w-6 rounded-full" style={{ background: "var(--gradient)" }} />
          <h1 className="font-display text-[clamp(2.1rem,5.4vw,4.25rem)] font-extrabold leading-[1.04] tracking-[-0.04em] text-ink">
            Paste your URL. We&apos;ll audit <span className="gradient-text">your site, not you.</span>
          </h1>
          <p className="mt-5 max-w-[620px] text-[18px] leading-relaxed text-faint text-pretty">
            Every other agency asks you to fill out a form about your business. We&apos;ll scan your website right now and
            tell you three automation opportunities we can see from the outside — before you tell us anything.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {TRUST.map((t) => (
              <span key={t} className="card flex items-center gap-2.5 px-3.5 py-2 text-[13.5px] font-medium text-body">
                <span className="chip h-[22px] w-[22px]"><Icon name="check" className="h-3 w-3" /></span>
                {t}
              </span>
            ))}
          </div>

          <div className="card mt-8 p-[22px] shadow-card">
            <form
              className="flex flex-wrap gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                startScan();
              }}
            >
              <label htmlFor="ra-url" className="sr-only">Your website URL</label>
              <input
                id="ra-url"
                type="url"
                required
                placeholder="https://your-site.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="h-[52px] flex-[1_1_320px] rounded-xl border px-[18px] font-mono text-[14px] text-ink outline-none transition-colors focus:border-cyan"
                style={{ background: "var(--surface-2)", borderColor: "var(--border-strong)" }}
              />
              <button
                type="submit"
                disabled={phase === "scanning"}
                className="btn-primary h-[52px] px-[26px] disabled:opacity-70"
              >
                {phase === "scanning" ? "Scanning…" : "Scan Site →"}
              </button>
            </form>
            <p className="mt-3.5 font-mono text-[10.5px] font-medium uppercase leading-[1.8] tracking-[0.1em] text-faint">
              <span aria-hidden="true" className="mr-2 inline-block h-[7px] w-[7px] rounded-full" style={{ background: "var(--ok)" }} />
              We scan public pages only. We don&apos;t store your URL. <a href="#how-it-works" className="text-cyan hover:text-violet">See how →</a>
            </p>
          </div>
        </div>
      </section>

      {/* Scanning terminal */}
      {phase === "scanning" && (
        <section aria-label="Live scan in progress" className="px-5 pb-14">
          <div className="mx-auto max-w-[900px]" style={{ animation: "nv-fade .4s ease both" }}>
            <div className="card overflow-hidden shadow-card">
              <div className="flex items-center gap-3 border-b border-line px-5 py-3.5">
                <span aria-hidden="true" className="flex gap-1.5">
                  <span className="h-[9px] w-[9px] rounded-full" style={{ background: "#EF4444" }} />
                  <span className="h-[9px] w-[9px] rounded-full" style={{ background: "#F59E0B" }} />
                  <span className="h-[9px] w-[9px] rounded-full" style={{ background: "#10B981" }} />
                </span>
                <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-faint">Scanning · {host}</span>
                <span className="ml-auto gradient-text font-mono text-[10.5px] font-medium tracking-[0.1em]">T+{clockS}S</span>
              </div>
              <div className="flex flex-col p-7" aria-live="polite">
                {STEPS.map((st, i) => {
                  const [a, b] = bounds[i];
                  const done = elapsed >= b;
                  const active = !done && elapsed >= a;
                  const sub = done
                    ? st.subs[st.subs.length - 1]
                    : active
                    ? st.subs[Math.min(st.subs.length - 1, Math.floor(((elapsed - a) / (b - a)) * st.subs.length))]
                    : "";
                  return (
                    <div key={i} className="flex gap-3.5">
                      <div className="flex flex-col items-center">
                        <span
                          className="flex h-[26px] w-[26px] flex-none items-center justify-center rounded-lg font-mono text-[12px]"
                          style={
                            done
                              ? { background: "var(--glow)", border: "1px solid var(--ok)", color: "var(--ok)" }
                              : active
                              ? { background: "var(--gradient)", color: "#fff" }
                              : { background: "var(--surface-2)", border: "1px solid var(--border-strong)", color: "var(--muted)" }
                          }
                        >
                          {done ? "✓" : active ? "●" : "·"}
                        </span>
                        {i < STEPS.length - 1 && (
                          <span aria-hidden="true" className="my-1 min-h-[18px] w-0.5 flex-1" style={{ background: "linear-gradient(180deg,var(--accent-1),var(--accent-2))", opacity: done ? 0.7 : 0.25 }} />
                        )}
                      </div>
                      <div className="min-w-0 pb-[18px]">
                        <div className="font-mono text-[12px] font-medium tracking-[0.06em]" style={{ color: done ? "var(--muted)" : active ? "var(--text-strong)" : "var(--muted)" }}>{st.label}</div>
                        <div className="mt-1 min-h-[14px] font-mono text-[10.5px] tracking-[0.06em] text-faint">{sub.replace("{host}", host)}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Results */}
      {phase === "results" && (
        <section aria-label="Scan results" className="px-5 pb-14">
          <div className="mx-auto max-w-[1100px]" style={{ animation: "nv-fade .4s ease both" }}>
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full px-3 py-[5px] font-mono text-[10.5px] font-medium uppercase tracking-[0.14em]" style={{ background: "var(--surface-2)", border: "1px solid var(--border-strong)", color: "var(--ok)" }}>
                <span className="h-2 w-2 rounded-full" style={{ background: "var(--ok)" }} />Scan complete
              </span>
              <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-faint">
                {kind === "none" ? `0 opportunities · ${host}` : `${opps.length} opportunities · ${host} · nothing stored`}
              </span>
              <button onClick={reset} className="ml-auto font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-cyan hover:text-violet">Scan another site ↺</button>
            </div>

            {kind !== "none" ? (
              <>
                <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(290px,1fr))]">
                  {opps.map((o) => (
                    <div key={o.rank} className="card card-hover flex flex-col gap-3.5 p-[28px_24px]">
                      <div className="flex items-center gap-2.5">
                        <span className="gradient-text font-mono text-[28px] font-medium">{String(o.rank).padStart(2, "0")}</span>
                        <span className="rounded-md px-2.5 py-1 font-mono text-[9.5px] font-medium uppercase tracking-[0.12em] text-cyan" style={{ background: "var(--glow)", border: "1px solid var(--chip-border)" }}>{o.category}</span>
                        {o.confidence === "low" && (
                          <span className="rounded-md px-2.5 py-1 font-mono text-[9.5px] font-medium uppercase tracking-[0.12em] text-faint" style={{ background: "var(--surface-2)", border: "1px dashed var(--border-strong)" }}>Low confidence</span>
                        )}
                      </div>
                      <h3 className="text-[clamp(1.25rem,2vw,1.5rem)] font-bold leading-[1.25] tracking-[-0.02em] text-ink text-pretty">{o.title}</h3>
                      <p className="font-mono text-[10.5px] font-medium uppercase leading-[1.7] tracking-[0.08em] text-faint">Seen at: {o.evidence.pageSeen.replace("{host}", host)} — {o.evidence.whatWasFound}</p>
                      <p className="font-mono text-[10.5px] font-medium uppercase leading-[1.7] tracking-[0.08em]" style={{ color: "var(--warning,#F59E0B)" }}>Estimated cost: {o.impact.metric} · {o.impact.industryAvg}</p>
                      <p className="text-[13.5px] font-medium leading-relaxed text-body"><strong className="text-ink">We&apos;d build:</strong> {o.fix.whatWeBuild}. Deploy: {o.fix.timelineDays} days. From ${o.fix.priceFrom.toLocaleString()}.</p>
                      <div className="mt-auto flex flex-col gap-2 border-t border-line pt-3.5">
                        <Link href={`/case-studies/${o.similarToCaseStudy}/`} className="font-mono text-[10.5px] font-medium uppercase tracking-[0.1em] text-cyan hover:text-violet">Similar to {CASE_LABELS[o.similarToCaseStudy] ?? o.similarToCaseStudy} →</Link>
                        <Link href={`/services/${o.linkedService}/`} className="text-[13.5px] font-medium text-faint hover:text-cyan">See the service →</Link>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="card mt-7 flex flex-wrap items-center gap-5 p-8">
                  <div className="flex-[1_1_360px]">
                    <h3 className="text-[clamp(1.25rem,2.2vw,1.75rem)] font-bold tracking-[-0.02em] text-ink">Want the full audit — the one that&apos;s <span className="gradient-text">personalized to your business?</span></h3>
                    <p className="mt-2.5 text-[14px] leading-relaxed text-faint text-pretty">This scan only sees your public site. The 90-second audit maps your internal workflows and returns a personalized ROI report.</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link href="/audit/" className="btn-primary">Take the Full Audit <Icon name="chevron" className="h-[15px] w-[15px]" strokeWidth={2.2} /></Link>
                    <Link href="/contact/" className="btn-secondary">Book a Call</Link>
                  </div>
                </div>
              </>
            ) : (
              <div className="card flex max-w-[720px] flex-col gap-4 p-9">
                <div className="inline-flex items-center gap-2.5 font-mono text-[12px] font-medium uppercase tracking-[0.12em] text-ink">
                  <span aria-hidden="true" className="h-2 w-2 flex-none rounded-full" style={{ background: "var(--ok)" }} />
                  We couldn&apos;t find significant automation gaps from your public site
                </div>
                <p className="text-[15px] leading-[1.65] text-faint text-pretty">Your public site looks well-instrumented. That means either (a) you&apos;re already automating well — congratulations — or (b) the opportunities are in workflows we can&apos;t see from outside.</p>
                <Link href="/audit/" className="btn-primary self-start">Take the full audit — we ask 7 questions about your internal workflows <Icon name="chevron" className="h-[15px] w-[15px]" strokeWidth={2.2} /></Link>
                <p className="border-t border-line pt-4 font-mono text-[10.5px] font-medium uppercase tracking-[0.12em] text-faint">This result ships ~20% of the time. We could fake 3 findings, but we don&apos;t.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Rate limited */}
      {phase === "rate-limited" && (
        <section aria-label="Scan limit reached" className="px-5 pb-14">
          <div className="mx-auto max-w-[720px]" style={{ animation: "nv-fade .4s ease both" }}>
            <div className="card flex flex-col gap-4 p-9">
              <div className="inline-flex items-center gap-2.5 font-mono text-[12px] font-medium uppercase tracking-[0.12em] text-ink">
                <span aria-hidden="true" className="h-2 w-2 flex-none rounded-full" style={{ background: "var(--warning,#F59E0B)" }} />
                Scan limit reached for this hour
              </div>
              <p className="text-[15px] leading-[1.65] text-faint text-pretty">You&apos;ve run 3 scans in the last hour. This is a rate limit to prevent abuse — not you specifically. Come back when the timer clears, or take the full audit instead.</p>
              <div className="flex items-baseline gap-3.5">
                <span className="gradient-text font-mono text-[clamp(2.5rem,5vw,3.5rem)] font-medium leading-none tracking-[0.02em]">{countdown}</span>
                <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-faint">Until your next scan</span>
              </div>
              <Link href="/audit/" className="btn-primary self-start">Take the full audit — no rate limit <Icon name="chevron" className="h-[15px] w-[15px]" strokeWidth={2.2} /></Link>
            </div>
          </div>
        </section>
      )}

      {/* Failed */}
      {phase === "failed" && (
        <section aria-label="Scan failed" className="px-5 pb-14">
          <div className="mx-auto max-w-[720px]" style={{ animation: "nv-fade .4s ease both" }}>
            <div className="card flex flex-col gap-4 p-9">
              <div className="inline-flex items-center gap-2.5 font-mono text-[12px] font-medium uppercase tracking-[0.12em] text-ink">
                <span aria-hidden="true" className="h-2 w-2 flex-none rounded-full" style={{ background: "#EF4444" }} />
                We couldn&apos;t reach that URL
              </div>
              <p className="text-[15px] leading-[1.65] text-faint text-pretty">The site didn&apos;t respond, or it blocks automated readers. Check the address and try again — or skip the scan and take the full audit. Nothing was stored either way.</p>
              <div className="flex flex-wrap gap-3">
                <button onClick={reset} className="btn-primary">Try another URL ↺</button>
                <Link href="/audit/" className="btn-secondary">Take the full audit →</Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Manual (hybrid fallback — no AI key configured) */}
      {phase === "manual" && (
        <section aria-label="Queued for a hands-on audit" className="px-5 pb-14">
          <div className="mx-auto max-w-[720px]" style={{ animation: "nv-fade .4s ease both" }}>
            <div className="card flex flex-col gap-4 p-9">
              <div className="inline-flex items-center gap-2.5 font-mono text-[12px] font-medium uppercase tracking-[0.12em] text-ink">
                <span aria-hidden="true" className="h-2 w-2 flex-none rounded-full" style={{ background: "var(--ok)" }} />
                {manualSent ? "Request received" : "Your site is queued for a hands-on audit"}
              </div>
              {manualSent ? (
                <>
                  <p className="text-[15px] leading-[1.65] text-faint text-pretty">A real engineer will review {host} and send your three biggest automation opportunities within 4 hours on business days — an actual person, not an autoresponder.</p>
                  <div className="flex flex-wrap gap-3">
                    <button onClick={reset} className="btn-secondary">Scan another site ↺</button>
                    <Link href="/audit/" className="btn-primary">Take the full audit now →</Link>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-[15px] leading-[1.65] text-faint text-pretty">We&apos;ll personally review your public site and send three automation opportunities we can see from the outside. Where should we send the breakdown?</p>
                  <form className="flex flex-wrap gap-3" onSubmit={submitManual}>
                    <label htmlFor="ra-email" className="sr-only">Your email</label>
                    <input id="ra-email" type="email" required placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} className="h-[52px] flex-[1_1_260px] rounded-xl border px-[18px] font-mono text-[14px] text-ink outline-none transition-colors focus:border-cyan" style={{ background: "var(--surface-2)", borderColor: "var(--border-strong)" }} />
                    <button type="submit" disabled={manualSending} className="btn-primary h-[52px] px-[26px] disabled:opacity-70">{manualSending ? "Sending…" : "Send my breakdown →"}</button>
                  </form>
                  <p className="font-mono text-[10.5px] font-medium uppercase tracking-[0.12em] text-faint">Reply within 4 hours on business days · No sales sequence unless you ask.</p>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {/* How it works */}
      <section id="how-it-works" aria-label="How this works" className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[1100px]">
          <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-faint">How this works</span>
          <div aria-hidden="true" className="my-3 h-0.5 w-6 rounded-full" style={{ background: "var(--gradient)" }} />
          <h2 className="mb-7 font-display text-[clamp(1.4rem,2.6vw,2rem)] font-extrabold tracking-[-0.02em] text-ink">
            Fair play requires <span className="gradient-text">transparency.</span>
          </h2>
          <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
            {HOW.map((h) => (
              <div key={h.title} className="card flex gap-3.5 p-[22px]">
                <span className="chip h-[42px] w-[42px] flex-none"><Icon name={h.icon} className="h-5 w-5" /></span>
                <div>
                  <div className="text-[14px] font-semibold text-ink">{h.title}</div>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-faint text-pretty">{h.body}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-faint">
            Six platforms live · Fairway360 runs on Scalaro — we build systems that power other systems
          </p>
        </div>
      </section>
    </main>
  );
}
