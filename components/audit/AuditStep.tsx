"use client";
import type { AuditQuestion } from "@/lib/auditQuestions";

interface AuditStepProps {
  question: AuditQuestion;
  value: string | string[] | number | undefined;
  onChange: (val: string | string[] | number) => void;
  onNext: () => void;
  onBack: () => void;
  canGoBack: boolean;
  isLast: boolean;
}

export default function AuditStep({
  question,
  value,
  onChange,
  onNext,
  onBack,
  canGoBack,
  isLast,
}: AuditStepProps) {
  const isAnswered = () => {
    if (question.type === "multi_select")
      return Array.isArray(value) && value.length > 0;
    if (question.type === "slider") return typeof value === "number";
    return typeof value === "string" && value.length > 0;
  };

  const sliderValue =
    typeof value === "number" ? value : question.default ?? question.min ?? 1;

  const toggleMulti = (optValue: string) => {
    const current = Array.isArray(value) ? [...value] : [];
    if (optValue === "none") {
      onChange(current.includes("none") ? [] : ["none"]);
      return;
    }
    const next = current.filter((v) => v !== "none");
    if (next.includes(optValue)) onChange(next.filter((v) => v !== optValue));
    else onChange([...next, optValue]);
  };

  return (
    <div>
      <h2 className="text-center font-display text-3xl font-bold leading-tight text-ink md:text-4xl">
        {question.question}
      </h2>
      {question.helper && (
        <p className="mt-3 text-center text-base text-muted">{question.helper}</p>
      )}

      {/* SINGLE SELECT */}
      {question.type === "single_select" && (
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {question.options!.map((opt) => {
            const selected = value === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  // auto-advance shortly after selecting
                  setTimeout(onNext, 220);
                }}
                className={`flex items-center gap-4 rounded-2xl border p-5 text-left transition-all duration-200 ${
                  selected
                    ? "border-cyan bg-cyan/10 shadow-glow-cyan"
                    : "border-line bg-white/[0.02] hover:border-cyan/50 hover:bg-cyan/[0.04]"
                }`}
              >
                {opt.icon && (
                  <span className="text-2xl" aria-hidden="true">
                    {opt.icon}
                  </span>
                )}
                <span
                  className={`font-medium ${
                    selected ? "text-ink" : "text-muted"
                  }`}
                >
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* MULTI SELECT */}
      {question.type === "multi_select" && (
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {question.options!.map((opt) => {
            const selected = Array.isArray(value) && value.includes(opt.value);
            return (
              <button
                key={opt.value}
                onClick={() => toggleMulti(opt.value)}
                className={`flex items-center gap-4 rounded-2xl border p-5 text-left transition-all duration-200 ${
                  selected
                    ? "border-cyan bg-cyan/10 shadow-glow-cyan"
                    : "border-line bg-white/[0.02] hover:border-cyan/50 hover:bg-cyan/[0.04]"
                }`}
              >
                <span
                  className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border text-sm ${
                    selected
                      ? "border-cyan bg-cyan text-bg"
                      : "border-faint text-transparent"
                  }`}
                  aria-hidden="true"
                >
                  ✓
                </span>
                <span className="flex items-center gap-2">
                  {opt.icon && <span aria-hidden="true">{opt.icon}</span>}
                  <span
                    className={`font-medium ${
                      selected ? "text-ink" : "text-muted"
                    }`}
                  >
                    {opt.label}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* SLIDER */}
      {question.type === "slider" && (
        <div className="mx-auto mt-12 max-w-xl">
          <div className="mb-8 text-center">
            <span className="gradient-text font-display text-6xl font-bold">
              {sliderValue}
            </span>
            <span className="ml-2 text-lg text-muted">{question.unit}</span>
          </div>
          <input
            type="range"
            min={question.min}
            max={question.max}
            step={question.step}
            value={sliderValue}
            onChange={(e) => onChange(Number(e.target.value))}
            className="audit-slider w-full"
            aria-label={question.question}
          />
          <div className="mt-2 flex justify-between text-xs text-faint">
            <span>{question.min}</span>
            <span>{question.max}+</span>
          </div>
        </div>
      )}

      {/* NAV */}
      <div className="mt-12 flex items-center justify-between">
        <button
          onClick={onBack}
          disabled={!canGoBack}
          className={`text-sm font-medium transition-colors ${
            canGoBack
              ? "text-faint hover:text-ink"
              : "cursor-not-allowed text-faint/30"
          }`}
        >
          ← Back
        </button>

        {/* Continue button for multi/slider (single_select auto-advances) */}
        {question.type !== "single_select" && (
          <button
            onClick={onNext}
            disabled={!isAnswered()}
            className={`btn-primary ${
              !isAnswered() ? "cursor-not-allowed opacity-40" : ""
            }`}
          >
            {isLast ? "See My Results →" : "Continue →"}
          </button>
        )}
      </div>

      <style jsx>{`
        .audit-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 8px;
          border-radius: 999px;
          background: linear-gradient(
            90deg,
            #00d4ff 0%,
            #9b5cff
              ${((sliderValue - (question.min ?? 1)) /
                ((question.max ?? 40) - (question.min ?? 1))) *
              100}%,
            rgba(255, 255, 255, 0.08)
              ${((sliderValue - (question.min ?? 1)) /
                ((question.max ?? 40) - (question.min ?? 1))) *
              100}%
          );
          outline: none;
        }
        .audit-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #ffffff;
          border: 3px solid #00d4ff;
          box-shadow: 0 0 20px rgba(0, 212, 255, 0.6);
          cursor: pointer;
        }
        .audit-slider::-moz-range-thumb {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #ffffff;
          border: 3px solid #00d4ff;
          box-shadow: 0 0 20px rgba(0, 212, 255, 0.6);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
