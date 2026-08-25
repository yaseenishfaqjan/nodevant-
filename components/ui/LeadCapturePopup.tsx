"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Icon from "@/components/ui/Icon";
import { submitLead } from "@/lib/leads";

/**
 * Exit-intent / scroll-depth lead capture.
 *
 * Why it exists: we publish no phone number, so the form IS the front door.
 * This catches visitors who are about to leave without converting and asks for
 * the one thing we actually need — an email we can reply to.
 *
 * Politeness rules (a popup that nags is worse than no popup):
 *  - never on pages where they're already converting (/audit, /contact, …)
 *  - once per visitor per SNOOZE_DAYS, and never again after they convert
 *  - desktop: real exit intent (cursor leaves via the top edge)
 *    mobile: no cursor to track, so scroll depth OR dwell time instead
 *  - Esc / backdrop / X all close it; focus is trapped while open and
 *    restored to wherever it came from on close
 */

const KEY_SEEN = "nv-lead-popup-seen";
const KEY_DONE = "nv-lead-popup-converted";
const SNOOZE_DAYS = 14;
const SCROLL_TRIGGER = 0.45; // 45% down the page
const DWELL_MS = 30000;

// Pages where a popup would be redundant or actively annoying.
const EXCLUDED = ["/audit", "/contact", "/reverse-audit", "/admin"];

function suppressed() {
  try {
    if (localStorage.getItem(KEY_DONE)) return true;
    const seen = localStorage.getItem(KEY_SEEN);
    if (!seen) return false;
    const days = (Date.now() - Number(seen)) / 86400000;
    return days < SNOOZE_DAYS;
  } catch {
    return false; // storage blocked — still allow one show
  }
}

export default function LeadCapturePopup() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [goal, setGoal] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);
  const [hp, setHp] = useState(""); // honeypot

  const dialogRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const armed = useRef(false);

  const excluded = EXCLUDED.some((p) => pathname.startsWith(p));

  const show = useCallback(() => {
    if (armed.current) return;
    armed.current = true;
    restoreFocusRef.current = document.activeElement as HTMLElement;
    setOpen(true);
    try {
      localStorage.setItem(KEY_SEEN, String(Date.now()));
    } catch {
      /* storage blocked — popup simply isn't snoozed */
    }
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    restoreFocusRef.current?.focus?.();
  }, []);

  // ── Triggers ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (excluded || suppressed()) return;

    const onExit = (e: MouseEvent) => {
      // Only a genuine exit toward the browser chrome, not a stray move.
      if (e.clientY <= 0) show();
    };
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (h > 0 && window.scrollY / h >= SCROLL_TRIGGER) show();
    };

    const coarse = window.matchMedia?.("(pointer: coarse)").matches;
    let timer: number | undefined;

    if (coarse) {
      window.addEventListener("scroll", onScroll, { passive: true });
      timer = window.setTimeout(show, DWELL_MS);
    } else {
      document.addEventListener("mouseout", onExit);
      // Fallback so desktop visitors who never exit-intent still see it once.
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    return () => {
      document.removeEventListener("mouseout", onExit);
      window.removeEventListener("scroll", onScroll);
      if (timer) clearTimeout(timer);
    };
  }, [excluded, show]);

  // ── Esc to close + focus trap + scroll lock ────────────────────────────
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    emailRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const nodes = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      if (!nodes || nodes.length === 0) return;
      const list = Array.from(nodes).filter((n) => n.offsetParent !== null);
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError(false);

    const res = await submitLead({
      type: "contact",
      name: "",
      email: email.trim(),
      message: goal.trim()
        ? `What they want to automate: ${goal.trim()}`
        : "(no detail given — captured via exit-intent popup)",
      source: "exit-popup",
      sourcePage: pathname,
      company_website: hp, // honeypot
    });

    setSending(false);
    // submitLead returns null on ANY failure — never claim success blindly.
    if (!res) {
      setError(true);
      return;
    }
    setDone(true);
    try {
      localStorage.setItem(KEY_DONE, "1");
    } catch {
      /* non-fatal */
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[300] flex items-end justify-center p-4 sm:items-center"
      style={{ background: "rgba(4,4,10,0.72)", backdropFilter: "blur(4px)" }}
      onClick={close}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="nv-popup-title"
        onClick={(e) => e.stopPropagation()}
        className="card animate-nv-fade relative w-full max-w-[440px] p-6 sm:p-7"
        style={{ background: "var(--surface)", border: "1px solid var(--border-strong)" }}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="tap-44 absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg text-faint transition-colors hover:text-ink"
        >
          <Icon name="x" className="h-4 w-4" strokeWidth={2} />
        </button>

        {done ? (
          <div className="py-2 text-center">
            <span
              aria-hidden="true"
              className="mx-auto flex h-12 w-12 items-center justify-center rounded-full text-white"
              style={{ background: "var(--gradient)" }}
            >
              <Icon name="check" className="h-6 w-6" strokeWidth={2.4} />
            </span>
            <h2
              id="nv-popup-title"
              className="mt-4 font-display text-[22px] font-extrabold tracking-[-0.02em] text-ink"
            >
              Got it — check your inbox.
            </h2>
            <p className="mt-2.5 text-[14.5px] leading-relaxed text-faint">
              We&apos;ve sent a confirmation and an automation expert will reply
              personally within 24 hours.
            </p>
            <button type="button" onClick={close} className="btn-secondary mt-5" style={{ minHeight: 46 }}>
              Keep browsing
            </button>
          </div>
        ) : (
          <>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">
              Before you go
            </p>
            <h2
              id="nv-popup-title"
              className="mt-2 font-display text-[clamp(1.3rem,4.5vw,1.55rem)] font-extrabold leading-[1.18] tracking-[-0.02em] text-ink"
            >
              Find out what AI could <span className="gradient-text">save you.</span>
            </h2>
            <p className="mt-2.5 text-[14.5px] leading-relaxed text-faint">
              Leave your email and we&apos;ll send your free automation teardown —
              your highest-ROI opportunity and what it&apos;s worth. No calls, no
              spam.
            </p>

            <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-3">
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
              <div>
                <label htmlFor="nv-popup-email" className="sr-only">
                  Work email
                </label>
                <input
                  id="nv-popup-email"
                  ref={emailRef}
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="min-h-[48px] w-full rounded-[10px] px-4 text-[15px] text-ink focus:outline-none"
                  style={{ background: "var(--bg)", border: "1px solid var(--border-strong)" }}
                />
              </div>
              <div>
                <label htmlFor="nv-popup-goal" className="sr-only">
                  What do you want to automate?
                </label>
                <input
                  id="nv-popup-goal"
                  type="text"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="What do you want to automate? (optional)"
                  className="min-h-[48px] w-full rounded-[10px] px-4 text-[15px] text-ink focus:outline-none"
                  style={{ background: "var(--bg)", border: "1px solid var(--border-strong)" }}
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="btn-primary w-full justify-center"
                style={{ minHeight: 50 }}
              >
                {sending ? "Sending…" : "Send My Free Teardown →"}
              </button>
              {error && (
                <p role="alert" className="text-[13px] leading-relaxed text-ink">
                  We couldn&apos;t send that just now. Please try again, or email{" "}
                  <a href="mailto:info@nodevant.com" className="font-semibold text-cyan hover:underline">
                    info@nodevant.com
                  </a>
                  .
                </p>
              )}
              <p className="text-center text-[11.5px] text-faint">
                We reply by email — we never cold-call.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
