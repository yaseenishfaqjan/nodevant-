"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import ScoreGauge from "@/components/ui/ScoreGauge";
import { painLabel, type AuditReport } from "@/lib/auditEngine";

const fmt = (n: number) => `$${n.toLocaleString()}`;

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const card: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: EASE },
  }),
};

export default function AuditResults() {
  const [report, setReport] = useState<AuditReport | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("auditReport");
      if (raw) setReport(JSON.parse(raw) as AuditReport);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  if (ready && !report) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-3xl font-bold text-ink">
          No audit results found
        </h1>
        <p className="mt-3 max-w-md text-muted">
          It looks like you haven&apos;t completed the audit yet, or your session
          expired. It only takes 90 seconds.
        </p>
        <Link href="/audit/" className="btn-primary mt-8">
          Take the Free Audit →
        </Link>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-line border-t-cyan" />
      </div>
    );
  }

  const { score, scoreLabel, recommendation, roi, answers } = report;
  const annualCost = roi.annualCostOfProblem;

  return (
    <div className="container-x py-28 md:py-32">
      <div className="mx-auto max-w-3xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="eyebrow mb-3">Your Automation Report</p>
          <h1 className="font-display text-4xl font-bold leading-tight text-ink md:text-5xl">
            {answers.firstName
              ? `${answers.firstName}, here's your opportunity`
              : "Here's your automation opportunity"}
          </h1>
          <p className="mt-4 text-muted">
            Based on your answers, we found a clear, high-ROI place to start.
          </p>
        </motion.div>

        <div className="mt-12 space-y-6">
          {/* 1. Score */}
          <motion.div
            custom={0}
            variants={card}
            initial="hidden"
            animate="show"
            className="glow-card flex flex-col items-center gap-6 md:flex-row md:justify-between"
          >
            <div className="text-center md:text-left">
              <h2 className="font-display text-2xl font-bold text-ink">
                Your Automation Score
              </h2>
              <p className="mt-2 max-w-xs text-sm text-muted">
                Lower score means more time and money on the table —{" "}
                <span className="text-cyan">more opportunity to automate.</span>
              </p>
            </div>
            <ScoreGauge score={score} label={scoreLabel} />
          </motion.div>

          {/* 2. #1 Opportunity */}
          <motion.div
            custom={1}
            variants={card}
            initial="hidden"
            animate="show"
            className="glow-card"
          >
            <div className="eyebrow mb-2">🎯 Your #1 Opportunity</div>
            <h2 className="font-display text-2xl font-bold text-cyan">
              {painLabel(answers.biggest_pain)}
            </h2>
            <p className="mt-3 leading-relaxed text-muted">
              Your team spends{" "}
              <span className="font-semibold text-ink">
                ~{roi.weeklyHoursWasted} hours/week
              </span>{" "}
              on this. At {fmt(roi.hourlyRate)}/hr, that&apos;s{" "}
              <span className="font-semibold text-ink">{fmt(annualCost)}/year</span>{" "}
              in labor on a task that can be{" "}
              {Math.round(roi.automationEfficiency * 100)}% automated.
            </p>
          </motion.div>

          {/* 3. ROI */}
          <motion.div
            custom={2}
            variants={card}
            initial="hidden"
            animate="show"
            className="glow-card"
          >
            <div className="eyebrow mb-4">💰 Your Estimated ROI</div>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
              {[
                { label: "Year 1 savings", value: fmt(roi.annualSavings), big: true },
                { label: "Build cost (est.)", value: fmt(roi.buildCost) },
                { label: "Payback period", value: `${roi.paybackWeeks} wks` },
                { label: "12-month ROI", value: `${roi.roiMultiple}×`, big: true },
              ].map((m) => (
                <div key={m.label} className="bg-bg-soft p-5 text-center">
                  <div
                    className={`font-display font-bold ${
                      m.big ? "gradient-text text-2xl" : "text-2xl text-ink"
                    }`}
                  >
                    {m.value}
                  </div>
                  <div className="mt-1 text-xs text-faint">{m.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 4. Recommended Service */}
          <motion.div
            custom={3}
            variants={card}
            initial="hidden"
            animate="show"
            className="glow-card"
          >
            <div className="eyebrow mb-2">🔧 Recommended Solution</div>
            <h2 className="font-display text-2xl font-bold text-ink">
              {recommendation.serviceTitle}
            </h2>
            <p className="mt-3 leading-relaxed text-muted">
              {recommendation.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {recommendation.tools.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-cyan/30 bg-cyan/5 px-3 py-1 text-xs font-medium text-cyan"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-5 text-sm">
              <div>
                <span className="text-faint">Timeline</span>
                <div className="mt-0.5 font-semibold text-ink">
                  {recommendation.timelineWeeks} weeks
                </div>
              </div>
              <div>
                <span className="text-faint">Starting from</span>
                <div className="mt-0.5 font-semibold text-ink">
                  {fmt(recommendation.startingPrice)}
                </div>
              </div>
            </div>
          </motion.div>

          {/* 5. Next steps CTA */}
          <motion.div
            custom={4}
            variants={card}
            initial="hidden"
            animate="show"
            className="relative overflow-hidden rounded-3xl border border-cyan/25 bg-brand-gradient-soft p-8 text-center md:p-12"
          >
            <div className="eyebrow mb-3">📋 What Happens Next</div>
            <ul className="mx-auto mb-7 max-w-sm space-y-2 text-left text-sm text-muted">
              <li className="flex gap-2">
                <span className="text-cyan">✓</span> Your full report is on its way
                to your inbox
              </li>
              <li className="flex gap-2">
                <span className="text-cyan">✓</span> Book a free 30-min call to
                confirm scope
              </li>
              <li className="flex gap-2">
                <span className="text-cyan">✓</span> We build it in{" "}
                {recommendation.timelineWeeks} weeks
              </li>
            </ul>
            <Link
              href="/contact/?from=audit"
              className="btn-primary text-lg"
            >
              Book Your Free Strategy Call →
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
