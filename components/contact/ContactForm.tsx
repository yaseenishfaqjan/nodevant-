"use client";
import { useState } from "react";
import Icon from "@/components/ui/Icon";
import { submitLead } from "@/lib/leads";
import { SITE } from "@/lib/site";

const inputClass =
  "w-full rounded-xl border border-line bg-bg px-4 py-3 text-ink transition-[border-color,box-shadow,background-color] duration-200 placeholder:text-faint/60 focus:border-cyan focus:outline-none focus:shadow-[0_0_0_3px_var(--tint)]";

/**
 * Contact message form. Posts through the existing unified pipe:
 * submitLead({type:"contact"}) → /api/contact → sendLeadNotification
 * ({source:"contact"}). No new endpoint — wiring unchanged from V1.
 */
export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [hp, setHp] = useState(""); // honeypot
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const valid =
    form.name.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
    form.message.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid || sending) return;
    setSending(true);
    setError(false);
    const res = await submitLead({
      type: "contact",
      name: form.name.trim(),
      email: form.email.trim(),
      company: form.company.trim(),
      message: form.message.trim(),
      source: "contact",
      sourcePage: "/contact",
      company_website: hp, // honeypot
    });
    setSending(false);
    // submitLead returns null on any failure — only confirm on a real success.
    if (!res) {
      setError(true);
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="card p-7 text-center" aria-live="polite">
        <span
          aria-hidden="true"
          className="mx-auto flex h-12 w-12 items-center justify-center rounded-full text-white shadow-glow"
          style={{ background: "var(--gradient)" }}
        >
          <Icon name="check" className="h-6 w-6" strokeWidth={2.4} />
        </span>
        <h3 className="mt-4 font-display text-2xl font-extrabold tracking-[-0.02em] text-ink">
          Thanks, {form.name.split(" ")[0]}!
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-faint">
          We&apos;ve got your message and reply within 4 hours on business days.
          Want to skip the inbox? Pick a time in the scheduler and we&apos;ll see
          you on the call.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4 p-6 md:p-7">
      {/* Honeypot — hidden from humans, catches bots */}
      <input
        type="text"
        name="company_website"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />
      <h2 className="font-display text-[22px] font-extrabold tracking-[-0.02em] text-ink">
        Send a message
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="mb-1.5 block text-sm font-medium text-faint"
          >
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass}
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="mb-1.5 block text-sm font-medium text-faint"
          >
            Work email
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputClass}
            placeholder="jane@company.com"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="contact-company"
          className="mb-1.5 block text-sm font-medium text-faint"
        >
          Company <span className="text-faint/60">(optional)</span>
        </label>
        <input
          id="contact-company"
          type="text"
          autoComplete="organization"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          className={inputClass}
          placeholder="Acme Inc."
        />
      </div>
      <div>
        <label
          htmlFor="contact-message"
          className="mb-1.5 block text-sm font-medium text-faint"
        >
          What do you want to automate?
        </label>
        <textarea
          id="contact-message"
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={`${inputClass} resize-none`}
          placeholder="We spend ~10 hours a week following up with leads manually…"
        />
      </div>
      <button
        type="submit"
        disabled={!valid || sending}
        className={`btn-primary w-full ${
          !valid || sending ? "cursor-not-allowed opacity-40" : ""
        }`}
      >
        {sending ? "Sending…" : "Send Message"}
        <Icon name="chevron" className="h-4 w-4" strokeWidth={2.2} />
      </button>
      {error && (
        <p className="text-sm leading-relaxed text-ink" role="alert">
          We couldn&apos;t send that just now. Please try again in a moment, or
          email us directly at{" "}
          <a href={`mailto:${SITE.email}`} className="font-semibold text-cyan hover:underline">
            {SITE.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}
