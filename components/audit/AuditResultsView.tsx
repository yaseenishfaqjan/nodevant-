"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Icon, { type IconName } from "@/components/ui/Icon";
import CoreDiagram, { type CoreNode } from "@/components/ui/CoreDiagram";
import OdometerNumber from "@/components/ui/OdometerNumber";
import { painLabel, type AuditReport } from "@/lib/auditEngine";
import { formatPaybackWeeks } from "@/lib/loss-benchmarks";

/**
 * Audit Results — the custom "here's the system we'd build you" preview.
 * Renders from the client-side AuditReport (sessionStorage). Reuses the shared
 * CoreDiagram (recommendation variant) + OdometerNumber, applies the payback
 * floor, and shows the poor-fit "we'd decline" honesty card unchanged.
 */

type NodeDef = { icon: IconName; label: string; slug: string };

const STACK_BY_PAIN: Record<string, NodeDef[]> = {
  lead_follow_up: [
    { icon: "funnel", label: "Lead Capture", slug: "lead-gen-pipeline" },
    { icon: "target", label: "Score & Qualify", slug: "lead-gen-pipeline" },
    { icon: "refresh", label: "Auto Follow-up", slug: "agentic-workflows" },
    { icon: "calendar", label: "Book Meeting", slug: "agentic-workflows" },
    { icon: "network", label: "CRM Sync", slug: "system-integration" },
  ],
  data_entry: [
    { icon: "network", label: "System Connect", slug: "system-integration" },
    { icon: "refresh", label: "Auto Sync", slug: "system-integration" },
    { icon: "doc", label: "Data Validation", slug: "complex-logic-engines" },
    { icon: "chart", label: "Live Dashboard", slug: "custom-ai-solutions" },
  ],
  reporting: [
    { icon: "chart", label: "Data Pull", slug: "system-integration" },
    { icon: "doc", label: "Auto Report", slug: "custom-ai-solutions" },
    { icon: "chat", label: "Slack Digest", slug: "agentic-workflows" },
    { icon: "refresh", label: "Scheduled Runs", slug: "agentic-workflows" },
  ],
  customer_support: [
    { icon: "chat", label: "AI Support Agent", slug: "ai-voice-agents" },
    { icon: "phone", label: "Voice Deflection", slug: "ai-voice-agents" },
    { icon: "doc", label: "Knowledge Base", slug: "custom-ai-solutions" },
    { icon: "users", label: "Human Handoff", slug: "agentic-workflows" },
  ],
  onboarding: [
    { icon: "mail", label: "Welcome Flow", slug: "agentic-workflows" },
    { icon: "gear", label: "Account Setup", slug: "system-integration" },
    { icon: "check", label: "Task Creation", slug: "agentic-workflows" },
    { icon: "calendar", label: "Kickoff Booking", slug: "agentic-workflows" },
  ],
  scheduling: [
    { icon: "calendar", label: "Smart Booking", slug: "agentic-workflows" },
    { icon: "target", label: "Route to Team", slug: "agentic-workflows" },
    { icon: "refresh", label: "Auto Reminders", slug: "agentic-workflows" },
    { icon: "network", label: "Calendar Sync", slug: "system-integration" },
  ],
};

function shortHash(s: string): string {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return "#" + h.toString(16).slice(0, 6).padStart(6, "0");
}

const DECLINE_INDUSTRIES = ["crypto", "mlm", "political", "gambling", "adult"];

type Fit = "excellent" | "moderate" | "poor";

function classify(report: AuditReport): { fit: Fit; reasons: string[] } {
  const team = (report.answers.team_size || "").toLowerCase();
  const industry = (report.answers.industry || "").toLowerCase();
  const tinyTeam = /just me|solo|^\s*1\b|1-2|1 –|1-/.test(team) || team === "1" || team === "2";
  const industryDecline = DECLINE_INDUSTRIES.some((d) => industry.includes(d));
  const alreadyAutomated = report.score >= 78;

  if (industryDecline || tinyTeam || alreadyAutomated) {
    const reasons: string[] = [];
    if (tinyTeam)
      reasons.push(
        "Your team is small enough that an automation engagement with us would cost more than it returns this year. Revisit us at 5+ people handling repeatable work.",
      );
    if (alreadyAutomated)
      reasons.push(
        "You're already automating the pain points we'd usually solve. You likely need a workflow consultant for a day, not a build partner for a quarter.",
      );
    if (industryDecline)
      reasons.push("This isn't an industry we take on — it's outside where we can do our best work.");
    return { fit: "poor", reasons: reasons.slice(0, 2) };
  }
  return { fit: report.score < 50 ? "excellent" : "moderate", reasons: [] };
}

function NoReport() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="font-display text-3xl font-bold text-ink">No audit results found</h1>
      <p className="mt-3 max-w-md text-faint">
        It looks like you haven&apos;t completed the audit yet, or your session expired. It only takes 90 seconds.
      </p>
      <Link href="/audit/" className="btn-primary mt-8">Take the Free Audit →</Link>
    </div>
  );
}

export default function AuditResultsView() {
  const [report, setReport] = useState<AuditReport | null>(null);
  const [ready, setReady] = useState(false);
  const [genDate, setGenDate] = useState("");

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("auditReport");
      if (raw) setReport(JSON.parse(raw) as AuditReport);
    } catch {
      /* ignore */
    }
    setGenDate(
      new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
    );
    setReady(true);
  }, []);

  if (ready && !report) return <NoReport />;
  if (!report)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-line border-t-cyan" />
      </div>
    );

  const { answers, roi, recommendation } = report;
  const pain = answers.biggest_pain;
  const stack = STACK_BY_PAIN[pain] ?? STACK_BY_PAIN.lead_follow_up;
  const { fit, reasons } = classify(report);
  const hash = shortHash(`${answers.firstName}${pain}${answers.industry}`);
  const company = (answers.firstName || "Your").toUpperCase();

  // ROI figures
  const hoursReturned = Math.round(roi.weeklyHoursWasted * roi.automationEfficiency);
  const paybackWeeksNum = Math.max(1, Math.round(roi.paybackWeeks));
  const payback = formatPaybackWeeks(paybackWeeksNum);
  const yearOneRoi = Math.round(roi.roiMultiple * 100);

  const nodes: CoreNode[] = stack.map((n, i) => {
    const start = fit === "moderate" && i < 2;
    const phase2 = fit === "moderate" && i >= 2;
    return {
      icon: n.icon,
      label: n.label,
      href: `/services/${n.slug}/`,
      statusLabel: start ? "START HERE" : phase2 ? "PHASE 2" : "RECOMMENDED",
      tone: phase2 ? "muted" : "on",
    };
  });

  const bookHref = "/contact/?from=audit";

  return (
    <main className="bg-bg">
      {/* Header */}
      <section className="grid-overlay relative overflow-hidden px-5 pb-12 pt-28 md:pt-[100px]">
        <div className="pointer-events-none absolute -top-36 left-1/2 h-[380px] w-[560px] -translate-x-[70%] rounded-full bg-cyan opacity-[0.06] blur-[120px]" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1100px]">
          <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-faint">
            Your audit · Generated {genDate}
          </span>
          <div aria-hidden="true" className="my-3 h-0.5 w-6 rounded-full" style={{ background: "var(--gradient)" }} />
          <h1 className="font-display text-[clamp(2.1rem,5.4vw,4.25rem)] font-extrabold leading-[1.04] tracking-[-0.04em] text-ink">
            {fit === "poor" ? "Here's the honest answer: " : "Here's the system "}
            <span className="gradient-text">{fit === "poor" ? "we'd decline." : "we'd build you."}</span>
          </h1>
          <p className="mt-5 max-w-[620px] text-[18px] leading-relaxed text-faint text-pretty">
            {fit === "poor"
              ? "Based on your answers, an automation engagement with us would cost more than it returns this year. Here's why — and where we'd point you instead."
              : `Based on your answers, this is the exact automation Nodevant would deploy to fix your ${painLabel(pain).toLowerCase()}. Not a template — your custom system, rendered in our production visual language.`}
          </p>
          {fit !== "poor" && (
            <div className="mt-6 inline-flex items-center gap-2.5 rounded-[10px] px-4 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-body" style={{ border: "1px solid transparent", background: "linear-gradient(var(--surface),var(--surface)) padding-box, var(--gradient) border-box" }}>
              <span aria-hidden="true" className="h-[7px] w-[7px] flex-none rounded-full" style={{ background: "var(--ok)" }} />
              Screenshot this. Share it with your team. Book a call to walk through it.
            </div>
          )}
        </div>
      </section>

      {fit !== "poor" ? (
        <>
          {/* Custom diagram */}
          <section aria-label={`Recommended stack for ${company}`} className="px-5 pb-16">
            <div className="mx-auto max-w-[1100px]">
              {fit === "moderate" && (
                <div className="mb-4 inline-flex items-center gap-2.5 rounded-[10px] px-4 py-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.12em] text-faint" style={{ background: "var(--surface)", border: "1px solid var(--border-strong)" }}>
                  <span aria-hidden="true" className="h-[7px] w-[7px] flex-none rounded-full" style={{ background: "var(--warning, #F59E0B)" }} />
                  Moderate fit · 2 of {nodes.length} nodes carry most of the ROI — we&apos;d start there and earn the rest
                </div>
              )}
              <CoreDiagram
                variant="recommendation"
                nodes={nodes}
                centerLabel={company}
                centerIcon="bolt"
                cornerLabel="Nodevant · your custom stack"
                cornerRight={hash}
                bottomStatus={`${nodes.length} nodes · est. ${recommendation.timelineWeeks} weeks to deploy · from $${recommendation.startingPrice.toLocaleString()}`}
                bottomRight={`Generated from your audit answers · ${genDate} · ${hash}`}
                alt={`Recommended automation stack for ${company}: ${stack.map((n) => n.label.toLowerCase()).join(", ")} connected to a central Nodevant core`}
              />
            </div>
          </section>

          {/* Breakdown */}
          <section aria-label="What we would build" className="px-5 pb-16">
            <div className="mx-auto max-w-[1100px]">
              <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-faint">The breakdown</span>
              <div aria-hidden="true" className="my-3 h-0.5 w-6 rounded-full" style={{ background: "var(--gradient)" }} />
              <h2 className="mb-7 font-display text-[clamp(1.6rem,3.6vw,2.75rem)] font-extrabold tracking-[-0.03em] text-ink">
                What we&apos;d build, in <span className="gradient-text">plain English.</span>
              </h2>
              <div className="flex flex-col gap-3.5">
                {stack.map((n) => (
                  <div key={n.label} className="card card-hover flex flex-wrap items-start gap-4 p-5">
                    <span className="chip h-[42px] w-[42px] flex-none"><Icon name={n.icon} className="h-5 w-5" /></span>
                    <div className="min-w-0 flex-[1_1_300px]">
                      <h3 className="mb-1.5 text-[18px] font-semibold tracking-[-0.01em] text-ink">{n.label}</h3>
                      <p className="text-[13.5px] leading-relaxed text-faint text-pretty">
                        {recommendation.description}
                      </p>
                    </div>
                    <Link href={`/services/${n.slug}/`} className="self-center whitespace-nowrap text-[13.5px] font-semibold text-cyan transition-colors hover:text-violet">
                      Explore service →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ROI */}
          <section aria-label="Your projected ROI" className="px-5 pb-[72px]">
            <div className="mx-auto max-w-[1100px]">
              <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-faint">Your projected ROI</span>
              <div aria-hidden="true" className="my-3 h-0.5 w-6 rounded-full" style={{ background: "var(--gradient)" }} />
              <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]" aria-live="polite">
                {[
                  { node: <OdometerNumber value={String(hoursReturned)} />, label: "Hours returned weekly (est.)" },
                  { node: <OdometerNumber value={payback.label} />, label: "Estimated payback period" },
                  { node: <OdometerNumber value={yearOneRoi + "%"} />, label: "Year-one ROI (est.)" },
                ].map((t, i) => (
                  <div key={i} className="card card-hover flex flex-col gap-3 p-[22px]">
                    <div className="min-h-[1em] font-mono text-[clamp(2.1rem,3.4vw,3rem)] font-medium leading-none tracking-[-0.02em]">{t.node}</div>
                    <div className="font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-body">{t.label}</div>
                  </div>
                ))}
              </div>
              <p className="mt-[22px] font-mono text-[10.5px] font-medium uppercase leading-[1.9] tracking-[0.1em] text-faint">
                Projections based on your audit inputs + benchmarks from six deployed platforms. Not a guarantee — a hypothesis the 30-min call validates.
              </p>
              {payback.floored && (
                <p className="mt-2 font-mono text-[10.5px] font-medium uppercase leading-[1.9] tracking-[0.1em] text-faint">
                  *Assumes your stated volume and value hold for the first 30 days. The call pressure-tests this before we quote.
                </p>
              )}
            </div>
          </section>
        </>
      ) : (
        /* Poor-fit decline card — signature honesty move, unchanged */
        <section aria-label="We would decline this project" className="px-5 pb-[72px]">
          <div className="mx-auto max-w-[820px]">
            <div className="card overflow-hidden shadow-card">
              <div className="flex items-center gap-3 border-b border-line px-5 py-3.5">
                <span aria-hidden="true" className="flex gap-1.5">
                  <span className="h-[9px] w-[9px] rounded-full" style={{ background: "#EF4444" }} />
                  <span className="h-[9px] w-[9px] rounded-full" style={{ background: "#F59E0B" }} />
                  <span className="h-[9px] w-[9px] rounded-full" style={{ background: "#10B981" }} />
                </span>
                <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-faint">Nodevant · audit verdict</span>
                <span className="ml-auto font-mono text-[10.5px] font-medium tracking-[0.1em] text-faint">{hash}</span>
              </div>
              <div className="flex flex-col gap-[22px] p-8">
                <div className="inline-flex items-center gap-2.5 font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-ink">
                  <span aria-hidden="true" className="h-2 w-2 flex-none rounded-full" style={{ background: "var(--warning, #F59E0B)" }} />
                  We&apos;d decline this project
                </div>
                <div className="flex flex-col gap-3.5">
                  {reasons.map((r, i) => (
                    <div key={i} className="flex gap-3 rounded-xl p-4" style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
                      <span aria-hidden="true" className="flex-none font-mono text-[12px] text-faint">{String(i + 1).padStart(2, "0")}</span>
                      <p className="text-[14px] leading-relaxed text-body text-pretty">{r}</p>
                    </div>
                  ))}
                </div>
                <p className="border-t border-line pt-[18px] font-mono text-[11px] font-medium uppercase leading-[1.8] tracking-[0.12em] text-faint">
                  We only take on projects we can grow. This is us saving you a call.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Next steps */}
      <section aria-label="Next steps" className="section-gap border-t border-line px-5" style={{ borderTopWidth: 2, borderImage: "linear-gradient(100deg, var(--accent-1), var(--accent-2)) 1" }}>
        <div className="mx-auto grid max-w-[1100px] gap-5 md:grid-cols-2">
          <div className="card flex flex-col gap-3.5 p-8">
            <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-faint">Fast path</span>
            <h3 className="font-display text-[clamp(1.25rem,2.2vw,1.75rem)] font-extrabold tracking-[-0.02em] text-ink">
              {fit === "poor" ? "Still want a " : "Ready to "}
              <span className="gradient-text">{fit === "poor" ? "second opinion?" : "build this?"}</span>
            </h3>
            <p className="text-[15px] leading-relaxed text-faint text-pretty">
              {fit === "poor"
                ? "Book 15 minutes anyway. We'll tell you the same thing live, for free, and point you to the right-sized help. No pitch."
                : "Book a 30-minute strategy call. We'll walk through the diagram, validate the numbers, and scope Week 1."}
            </p>
            <Link href={bookHref} className="btn-primary mt-1.5 self-start">
              {fit === "poor" ? "Book 15 minutes" : "Book the strategy call"} <Icon name="chevron" className="h-[15px] w-[15px]" strokeWidth={2.2} />
            </Link>
          </div>
          <div className="card flex flex-col gap-3.5 p-8">
            <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-faint">Slow path</span>
            <h3 className="font-display text-[clamp(1.25rem,2.2vw,1.75rem)] font-extrabold tracking-[-0.02em] text-ink">
              Want to <span className="gradient-text">think about it?</span>
            </h3>
            <p className="text-[15px] leading-relaxed text-faint text-pretty">
              Keep this page — it&apos;s generated from your answers and stays consistent. Come back when you&apos;re ready. No follow-up sequence unless you ask for one.
            </p>
            <Link href="/case-studies/" className="btn-secondary mt-1.5 self-start">
              See deployed proof <Icon name="chevron" className="h-[15px] w-[15px]" strokeWidth={2.2} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
