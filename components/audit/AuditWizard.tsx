"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import AuditStep from "./AuditStep";
import AuditProgress from "./AuditProgress";
import AuditEmailGate from "./AuditEmailGate";
import { auditQuestions } from "@/lib/auditQuestions";
import { buildReport, type AuditAnswers } from "@/lib/auditEngine";
import { submitLead } from "@/lib/leads";

type AnswerValue = string | string[] | number;

export default function AuditWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [showEmailGate, setShowEmailGate] = useState(false);
  const [loading, setLoading] = useState(false);

  const totalSteps = auditQuestions.length;

  const handleAnswer = (questionId: string, value: AnswerValue) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    setDirection(1);
    if (step < totalSteps - 1) setStep((prev) => prev + 1);
    else setShowEmailGate(true);
  };

  const handleBack = () => {
    setDirection(-1);
    if (showEmailGate) {
      setShowEmailGate(false);
      return;
    }
    if (step > 0) setStep((prev) => prev - 1);
  };

  const handleSubmit = (email: string, firstName: string) => {
    setLoading(true);
    // Build the full audit answers object with sensible fallbacks.
    const fullAnswers: AuditAnswers = {
      industry: (answers.industry as string) ?? "other",
      team_size: (answers.team_size as string) ?? "2-5",
      biggest_pain: (answers.biggest_pain as string) ?? "lead_follow_up",
      hours_wasted: (answers.hours_wasted as number) ?? 10,
      avg_hourly_rate: (answers.avg_hourly_rate as string) ?? "55",
      current_tools: (answers.current_tools as string[]) ?? [],
      automation_goal: (answers.automation_goal as string) ?? "save_time",
      firstName,
      email,
    };

    // Compute report client-side so results always render (works on static hosting).
    const report = buildReport(fullAnswers);

    try {
      sessionStorage.setItem("auditReport", JSON.stringify(report));
    } catch {
      /* sessionStorage unavailable — results page handles missing data */
    }

    // Deliver to the backend (stores the lead + emails the report). Fire-and-
    // forget — the results page renders from the client-side report regardless.
    void submitLead({
      type: "audit",
      source: "audit",
      firstName,
      email,
      industry: fullAnswers.industry,
      team_size: fullAnswers.team_size,
      biggest_pain: fullAnswers.biggest_pain,
      hours_wasted: fullAnswers.hours_wasted,
      avg_hourly_rate: fullAnswers.avg_hourly_rate,
      current_tools: fullAnswers.current_tools,
      automation_goal: fullAnswers.automation_goal,
    });

    // Brief delay for the "crunching numbers" affordance.
    window.setTimeout(() => router.push("/audit/results/"), 600);
  };

  if (showEmailGate) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 py-28">
        <AuditEmailGate
          onSubmit={handleSubmit}
          onBack={handleBack}
          loading={loading}
        />
      </div>
    );
  }

  const current = auditQuestions[step];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-28">
      <AuditProgress current={step + 1} total={totalSteps} />
      <div className="w-full max-w-2xl overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            initial={{ opacity: 0, x: direction * 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -50 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <AuditStep
              question={current}
              value={answers[current.id]}
              onChange={(val) => handleAnswer(current.id, val)}
              onNext={handleNext}
              onBack={handleBack}
              canGoBack={step > 0}
              isLast={step === totalSteps - 1}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
