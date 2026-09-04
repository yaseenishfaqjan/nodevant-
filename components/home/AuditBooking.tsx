"use client";
import { useMemo, useState } from "react";
import Icon from "@/components/ui/Icon";
import SectionHead from "@/components/ui/SectionHead";
import { SITE } from "@/lib/site";
import { submitLead } from "@/lib/leads";

const MONTHS = [
  "January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December",
];

const inputCls =
  "min-h-[46px] rounded-[9px] px-[13px] text-[14.5px] text-ink transition-colors focus:outline-none";
const inputStyle = {
  background: "var(--bg)",
  border: "1px solid var(--border-strong)",
} as const;
const labelCls =
  "font-mono text-[11.5px] uppercase tracking-[0.08em] text-faint";

export default function AuditBooking() {
  const now = useMemo(() => new Date(), []);
  const yy = now.getFullYear();
  const mm = now.getMonth();
  const firstDow = new Date(yy, mm, 1).getDay();
  const total = new Date(yy, mm + 1, 0).getDate();
  const [day, setDay] = useState<number | null>(null);
  const [booked, setBooked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(false);
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) || "").trim();
    const preferred = day ? `${MONTHS[mm]} ${day}, ${yy}` : "No preference";
    // Compose a lossless message so every field survives into email + DB.
    const message = [
      `Looking for: ${get("focus") || "—"}`,
      `Preferred date: ${preferred}`,
      get("requirements") ? `Wants fixed: ${get("requirements")}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    // Route through the same backend as every other form (/api/contact).
    const res = await submitLead({
      type: "contact",
      name: get("name"),
      email: get("email"),
      company: get("company"),
      message,
      source: "homepage-audit-booking",
      sourcePage: "/#audit",
      // Honeypot — bots fill it, humans can't see it.
      company_website: get("company_website"),
    });
    setSubmitting(false);
    // submitLead returns null on any failure (rate limit, network, 4xx/5xx).
    // Only claim success when the lead actually reached the backend.
    if (!res) {
      setError(true);
      return;
    }
    setBooked(true);
  };

  return (
    <section id="audit" className="section-gap border-t border-line px-5">
      <div className="mx-auto max-w-[1180px]">
        <SectionHead
          eyebrow="Free Audit"
          title={<>Book your free <span className="gradient-text">90-second audit.</span></>}
          subtitle="Pick a time, tell us your stack, and we'll map exactly which hours AI gives you back."
        />

        <div className="mt-11 grid overflow-hidden rounded-[20px] shadow-card md:grid-cols-[1fr_1.1fr]" style={{ border: "1px solid var(--border-strong)" }}>
          {/* Calendar panel */}
          <div className="p-6 md:p-8" style={{ background: "var(--surface-2)" }}>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink">
              {MONTHS[mm]} {yy}
            </p>
            <div className="grid grid-cols-7 gap-1.5 text-center font-mono text-[10px] text-faint" aria-hidden="true">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <span key={i}>{d}</span>
              ))}
            </div>
            <div role="group" aria-label="Choose an audit date" className="mt-2 grid grid-cols-7 gap-1.5">
              {Array.from({ length: total }).map((_, i) => {
                const d = i + 1;
                const sel = day === d;
                return (
                  <button
                    key={d}
                    type="button"
                    aria-pressed={sel}
                    aria-label={`Select ${MONTHS[mm]} ${d}`}
                    onClick={() => setDay(d)}
                    className="flex min-h-[34px] items-center justify-center rounded-lg font-mono text-[12px] transition-colors"
                    style={{
                      gridColumnStart: d === 1 ? firstDow + 1 : undefined,
                      border: `1px solid ${sel ? "transparent" : "var(--border)"}`,
                      background: sel ? "var(--gradient)" : "transparent",
                      color: sel ? "#fff" : "var(--text)",
                    }}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
            <p className="mt-[18px] text-[13px] text-faint">
              {day
                ? `Selected: ${MONTHS[mm]} ${day}, ${yy} · we confirm a time by email.`
                : "Pick a preferred day — we confirm the exact time by email."}
            </p>
            <div className="mt-[22px] flex flex-col gap-3 border-t border-line pt-5">
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-[11px] text-sm text-body transition-colors hover:text-ink">
                <span className="chip h-[38px] w-[38px]"><Icon name="mail" className="h-[18px] w-[18px]" /></span>
                {SITE.email}
              </a>
              <span className="flex items-center gap-[11px] text-sm text-body">
                <span className="chip h-[38px] w-[38px]"><Icon name="clock" className="h-[18px] w-[18px]" /></span>
                We reply within 24 hours
              </span>
              <span className="flex items-start gap-[11px] text-sm text-body">
                <span className="chip h-[38px] w-[38px]"><Icon name="pin" className="h-[18px] w-[18px]" /></span>
                <span className="leading-relaxed">
                  {SITE.address.city}, {SITE.address.region}
                  <span className="mt-0.5 block text-[13px] text-faint">Serving clients globally</span>
                </span>
              </span>
            </div>
          </div>

          {/* Form panel */}
          <div className="p-6 md:p-8" style={{ background: "var(--surface)" }}>
            <form onSubmit={onSubmit} className="grid gap-3.5 sm:grid-cols-2">
              {/* Honeypot — hidden from humans, catches bots */}
              <input
                type="text"
                name="company_website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
              />
              <span className="flex flex-col gap-1.5">
                <label htmlFor="nv-name" className={labelCls}>Full name *</label>
                <input id="nv-name" name="name" type="text" required autoComplete="name" placeholder="Jane Cooper" className={inputCls} style={inputStyle} />
              </span>
              <span className="flex flex-col gap-1.5">
                <label htmlFor="nv-email" className={labelCls}>Email *</label>
                <input id="nv-email" name="email" type="email" required autoComplete="email" placeholder="jane@company.com" className={inputCls} style={inputStyle} />
              </span>
              <span className="flex flex-col gap-1.5">
                <label htmlFor="nv-company" className={labelCls}>Company (optional)</label>
                <input id="nv-company" name="company" type="text" autoComplete="organization" placeholder="Cooper Roofing" className={inputCls} style={inputStyle} />
              </span>
              <span className="flex flex-col gap-1.5 sm:col-span-2">
                <label htmlFor="nv-focus" className={labelCls}>What are you looking for? *</label>
                <select id="nv-focus" name="focus" required className={inputCls} style={inputStyle} defaultValue="">
                  <option value="" disabled>Choose the closest match…</option>
                  <optgroup label="A system we've already built for your industry">
                    <option>Roofing / construction / field services</option>
                    <option>Golf clubs &amp; hospitality</option>
                    <option>Home services</option>
                    <option>Manufacturing / custom products</option>
                    <option>Fintech / financial operations</option>
                    <option>Education / online courses</option>
                    <option>B2B SaaS sales</option>
                    <option>Another industry — I&apos;ll describe it below</option>
                  </optgroup>
                  <optgroup label="A custom build">
                    <option>AI receptionist / voice agent</option>
                    <option>Workflow automation</option>
                    <option>AI agents for my process</option>
                    <option>Lead generation pipeline</option>
                    <option>Connecting my existing tools</option>
                    <option>Not sure yet — help me scope it</option>
                  </optgroup>
                </select>
              </span>
              <span className="flex flex-col gap-1.5 sm:col-span-2">
                <label htmlFor="nv-req" className={labelCls}>What do you want fixed?</label>
                <textarea id="nv-req" name="requirements" rows={4} placeholder="What's the one thing you'd most like fixed? e.g. we miss calls after 5pm, quotes take 3 days, leads never get followed up." className="resize-y rounded-[9px] px-[13px] py-3 text-[14.5px] leading-relaxed text-ink focus:outline-none" style={inputStyle} />
              </span>
              <span className="flex items-start gap-2.5 sm:col-span-2">
                <input id="nv-consent" name="consent" type="checkbox" required className="mt-0.5 h-[18px] w-[18px] flex-shrink-0" style={{ accentColor: "var(--accent-1)" }} />
                <label htmlFor="nv-consent" className="text-[13px] leading-relaxed text-faint">
                  I agree to be contacted about my audit by email. No lists, no spam, no cold calls.
                </label>
              </span>
              <button
                type="submit"
                disabled={submitting || booked}
                className="col-span-full mt-1 min-h-[52px] rounded-xl px-6 text-base font-semibold text-white shadow-glow transition-colors"
                style={{ background: booked ? "var(--ok)" : "var(--gradient)" }}
              >
                {booked ? "Audit Booked →" : submitting ? "Sending…" : "Book My Free Audit →"}
              </button>
            </form>
            {booked && (
              <p className="mt-3.5 flex items-center gap-2 text-[13.5px] text-ink animate-nv-fade">
                <Icon name="check" className="h-4 w-4 text-cyan" strokeWidth={2.2} />
                Audit request received — we reply within 24 hours.
              </p>
            )}
            {error && (
              <p className="mt-3.5 text-[13.5px] leading-relaxed text-ink animate-nv-fade" role="alert">
                We couldn&apos;t send that just now. Please try again in a moment, or
                email us directly at{" "}
                <a href={`mailto:${SITE.email}`} className="font-semibold text-cyan hover:underline">
                  {SITE.email}
                </a>
                .
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
