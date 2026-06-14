"use client";
import { useState } from "react";
import { submitLead } from "@/lib/leads";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
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
    // Deliver the lead; confirm regardless so the visitor is never blocked.
    await submitLead({
      type: "contact",
      name: form.name.trim(),
      email: form.email.trim(),
      company: form.company.trim(),
      message: form.message.trim(),
      source: "contact",
    });
    setSending(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="glow-card text-center">
        <div className="text-4xl" aria-hidden="true">
          ✅
        </div>
        <h3 className="mt-4 font-display text-2xl font-bold text-ink">
          Thanks, {form.name.split(" ")[0]}!
        </h3>
        <p className="mt-3 text-muted">
          We&apos;ve got your message. Pick a time below and we&apos;ll see you on
          the call.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glow-card space-y-4">
      <h2 className="font-display text-2xl font-bold text-ink">Send a message</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-faint">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-ink placeholder:text-faint/60 focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan"
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-faint">
            Work email
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-ink placeholder:text-faint/60 focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan"
            placeholder="jane@company.com"
          />
        </div>
      </div>
      <div>
        <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-faint">
          Company <span className="text-faint/60">(optional)</span>
        </label>
        <input
          id="company"
          type="text"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-ink placeholder:text-faint/60 focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan"
          placeholder="Acme Inc."
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-faint">
          What do you want to automate?
        </label>
        <textarea
          id="message"
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full resize-none rounded-xl border border-line bg-bg px-4 py-3 text-ink placeholder:text-faint/60 focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan"
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
        {sending ? "Sending…" : "Send Message →"}
      </button>
    </form>
  );
}
