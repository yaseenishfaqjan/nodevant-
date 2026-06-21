"use client";
import { useState } from "react";
import { motion } from "framer-motion";

interface AuditEmailGateProps {
  onSubmit: (email: string, firstName: string) => void;
  onBack: () => void;
  loading: boolean;
}

export default function AuditEmailGate({
  onSubmit,
  onBack,
  loading,
}: AuditEmailGateProps) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const valid = firstName.trim().length > 0 && emailValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (valid) onSubmit(email.trim(), firstName.trim());
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto w-full max-w-lg"
    >
      <div className="rounded-3xl border border-cyan/25 bg-brand-gradient-soft p-8 md:p-10">
        <div className="mb-2 text-center text-4xl" aria-hidden="true">
          ✨
        </div>
        <h2 className="text-center font-display text-3xl font-bold text-ink md:text-4xl">
          Your automation report is ready.
        </h2>
        <p className="mt-3 text-center text-base text-muted">
          Enter your details and we&apos;ll send you the full breakdown —
          including a step-by-step build plan.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label
              htmlFor="firstName"
              className="mb-1.5 block text-sm font-medium text-faint"
            >
              First name
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Jane"
              className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-ink placeholder:text-faint/60 focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-faint"
            >
              Work email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@company.com"
              className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-ink placeholder:text-faint/60 focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan"
            />
            {touched && !emailValid && (
              <p className="mt-1.5 text-sm text-violet">
                Please enter a valid email.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`btn-primary w-full text-lg ${
              loading ? "cursor-wait opacity-70" : ""
            }`}
          >
            {loading ? "Crunching your numbers…" : "See My Results →"}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-faint">
          No spam. One email with your report. That&apos;s it.
        </p>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={onBack}
          className="text-sm font-medium text-faint transition-colors hover:text-ink"
        >
          ← Back to questions
        </button>
      </div>
    </motion.div>
  );
}
