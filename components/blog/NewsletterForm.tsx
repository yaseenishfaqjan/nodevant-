"use client";
import { useState } from "react";
import Icon from "@/components/ui/Icon";
import { submitLead } from "@/lib/leads";

/**
 * Newsletter capture — posts to /api/newsletter, which stores the lead and
 * fires sendLeadNotification({ source: "newsletter" }) on the backend.
 * Never blocks the UI: the success state shows even if delivery is degraded.
 */
export default function NewsletterForm({ sourcePage }: { sourcePage: string }) {
  const [subscribed, setSubscribed] = useState(false);
  const [sending, setSending] = useState(false);
  const inputId = `nv-news-${sourcePage.replace(/[^a-z0-9-]/gi, "") || "form"}`;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending || subscribed) return;
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const hp = (form.elements.namedItem("_hp") as HTMLInputElement).value;
    setSending(true);
    await submitLead({ type: "newsletter", email, source: "newsletter", sourcePage, _hp: hp });
    setSending(false);
    setSubscribed(true);
  }

  return (
    <div className="min-w-0">
      <form onSubmit={onSubmit} className="flex flex-wrap gap-2.5">
        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        {/* Honeypot — hidden from humans, filled by bots, dropped by the API */}
        <input
          type="text"
          name="_hp"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
        />
        <input
          id={inputId}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          className="min-h-[52px] flex-[1_1_200px] rounded-[11px] border border-line-strong bg-bg px-3.5 text-[15px] text-ink transition-[border-color,box-shadow,background-color] duration-200 focus:border-cyan focus:shadow-[0_0_0_3px_var(--tint)] focus:outline-none"
        />
        <button
          type="submit"
          disabled={sending}
          className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-[11px] border-0 px-[22px] text-[15px] font-semibold text-white shadow-glow transition-colors duration-300"
          style={{ background: subscribed ? "var(--ok)" : "var(--gradient)" }}
        >
          {subscribed ? "Subscribed" : sending ? "Subscribing…" : "Subscribe"}
          <Icon name="chevron" className="h-[15px] w-[15px]" strokeWidth={2.2} />
        </button>
      </form>
      <p aria-live="polite" className="m-0">
        {subscribed && (
          <span className="mt-3 flex items-center gap-2 text-[13.5px] text-ink">
            <Icon name="check" className="h-4 w-4 text-cyan" strokeWidth={2.2} />
            Subscribed — the next memo lands in your inbox.
          </span>
        )}
      </p>
    </div>
  );
}
