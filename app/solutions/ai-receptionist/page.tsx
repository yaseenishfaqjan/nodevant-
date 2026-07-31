import Link from "next/link";
import Icon, { type IconName } from "@/components/ui/Icon";
import SectionHead from "@/components/ui/SectionHead";
import FinalCTA from "@/components/home/FinalCTA";
import JsonLd from "@/components/ui/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";
import { faqPageSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata = pageMetadata({
  title:
    "AI Receptionist for Small Business — Answer Every Call 24/7 | Nodevant",
  description:
    "A custom AI receptionist that answers every call, books appointments and logs leads to your CRM 24/7 — so a small team never misses a customer again. Built and monitored by Nodevant, from $2,800. Start with a free 90-second audit.",
  path: "/solutions/ai-receptionist/",
  keywords: [
    "ai receptionist",
    "ai receptionist for small business",
    "ai phone answering service",
    "ai answering service",
    "virtual ai receptionist",
    "ai voice receptionist",
  ],
});

// ── Content ────────────────────────────────────────────────────────────
const HANDLES: { icon: IconName; title: string; text: string }[] = [
  { icon: "phone", title: "Answers every call, 24/7", text: "Picks up on the first ring — nights, weekends and overflow when your team is already on another line. No voicemail, no missed customer." },
  { icon: "calendar-check", title: "Books appointments live", text: "Reads your real availability and books, reschedules or cancels straight into your calendar while the caller is still on the phone." },
  { icon: "funnel", title: "Qualifies and routes", text: "Asks your qualifying questions, answers common ones, and warm-transfers the calls that need a human to the right person with context." },
  { icon: "layers", title: "Logs every lead to your CRM", text: "Name, number, reason for calling and a full transcript written to your CRM automatically — so nothing lives only in someone's memory." },
  { icon: "mail", title: "Follows up after the call", text: "Sends the confirmation text or email, the booking link or the intake form, so the caller has what they need before they hang up." },
  { icon: "brain", title: "Sounds human, not robotic", text: "Natural voice, handles interruptions and accents, and stays on-script for your business — trained on how your best receptionist actually answers." },
];

const STEPS: { icon: IconName; title: string; text: string }[] = [
  { icon: "target", title: "Map your call flow", text: "We trace how your calls actually go today — the questions, the bookings, the handoffs — from one real recording." },
  { icon: "gear", title: "Build and train the agent", text: "The receptionist is built on your scripts, hours, services and FAQs, with a natural voice tuned to your brand." },
  { icon: "layers", title: "Connect calendar + CRM", text: "Wired into your scheduling and CRM so bookings and lead records land where your team already works." },
  { icon: "refresh", title: "Go live and tune", text: "Ported to your number, live in days, then tuned weekly on real calls until it books like your best rep." },
];

// AEO: exact question phrasings answered in 40–60 words, mirrored into FAQ schema.
const FAQS: { q: string; a: string }[] = [
  {
    q: "What is an AI receptionist and what can it do for a small business?",
    a: "An AI receptionist is a voice agent that answers your phone 24/7, books appointments into your calendar, answers common questions, qualifies callers and logs every lead to your CRM. For a small team it means never missing a call — even after hours, on weekends or when everyone is already busy.",
  },
  {
    q: "How much does an AI receptionist cost for a small business?",
    a: "Nodevant builds a custom AI receptionist from $2,800 for the build, plus a monthly plan for the running agent, monitoring and tuning. Unlike per-minute point tools, it's built around your scripts, calendar and CRM. The free 90-second audit shows your expected ROI before you commit to anything.",
  },
  {
    q: "Is a voice AI agent good enough to handle real customer calls yet?",
    a: "Yes, for the calls small businesses actually get — booking, rescheduling, hours, pricing, qualifying and routing. Modern voice agents answer in about a second, handle interruptions and accents, and stay on your script. The rule we use: automate the routine calls and warm-transfer anything that genuinely needs a human.",
  },
  {
    q: "How accurate and how fast are AI voice agents compared to a human receptionist?",
    a: "A well-built voice agent responds in roughly one second and never puts a caller on hold, gets tired or forgets to log a lead. On routine calls it matches a human and is more consistent; on rare, complex or emotional calls a human is still better, which is why our agents transfer those instead of guessing.",
  },
  {
    q: "Does the AI receptionist book appointments and sync with my calendar and CRM?",
    a: "Yes. It reads your real availability and books, reschedules and cancels directly in your calendar, then writes the caller's details and a full transcript to your CRM. Everything the caller does on the phone shows up where your team already works — no manual copying, no lost sticky notes.",
  },
  {
    q: "What happens to calls after hours or when all my lines are busy?",
    a: "That's exactly where it earns its keep. The AI receptionist answers overflow and after-hours calls your team would otherwise miss — booking the appointment or capturing the lead at 9pm on a Sunday — so the enquiry is handled instantly instead of going to voicemail and cooling off.",
  },
  {
    q: "How long does it take to set up an AI receptionist?",
    a: "Most small-business receptionists go live within days, not months. We map your call flow, build the agent on your scripts and connect your calendar and CRM, then port or forward your number. After go-live we tune it weekly on real calls until it books as reliably as your best rep.",
  },
];

// ── Schema ─────────────────────────────────────────────────────────────
function ReceptionistJsonLd() {
  const url = `${SITE.url}/solutions/ai-receptionist/`;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "AI Receptionist for Small Business",
          serviceType: "AI voice receptionist",
          description:
            "A custom-built AI voice receptionist that answers calls 24/7, books appointments, qualifies callers and logs leads to your CRM, built and monitored by Nodevant.",
          url,
          provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
          areaServed: "Worldwide",
          offers: {
            "@type": "Offer",
            price: 2800,
            priceCurrency: "USD",
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: 2800,
              priceCurrency: "USD",
            },
          },
        }}
      />
      <JsonLd data={faqPageSchema(FAQS)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions/" },
          { name: "AI Receptionist", path: "/solutions/ai-receptionist/" },
        ])}
      />
    </>
  );
}

export default function AiReceptionistPage() {
  return (
    <>
      <ReceptionistJsonLd />

      {/* Hero */}
      <section className="relative overflow-hidden px-5 pt-[clamp(88px,12vw,132px)]">
        <div className="grid-overlay" aria-hidden="true" />
        <div className="relative mx-auto max-w-[860px] text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
            AI Receptionist · for small business
          </p>
          <h1 className="mx-auto mt-4 max-w-[760px] font-display text-[clamp(2rem,5vw,3.4rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink">
            Never miss another <span className="gradient-text">customer call.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[620px] text-[clamp(1rem,1.6vw,1.1875rem)] leading-relaxed text-faint">
            A custom AI receptionist that answers every call, books the
            appointment and logs the lead — 24/7, in a natural voice, wired into
            the calendar and CRM you already use. Built and monitored by Nodevant.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/audit/" className="btn-primary" style={{ minHeight: 54 }}>
              Get my free 90-second audit
              <Icon name="chevron" className="h-4 w-4" strokeWidth={2.2} />
            </Link>
            <Link href="/pricing/" className="btn-secondary" style={{ minHeight: 54 }}>
              See pricing
            </Link>
          </div>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
            Custom build from $2,800 · live in days · no missed call again
          </p>
        </div>
      </section>

      {/* What it handles */}
      <section className="section-gap px-5">
        <div className="mx-auto max-w-[1180px]">
          <SectionHead
            eyebrow="What it handles"
            title={<>Every call, <span className="gradient-text">handled.</span></>}
            subtitle="The routine calls that eat your team's day — answered, booked and logged automatically. The rare ones that need a human get warm-transferred with context."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {HANDLES.map((h) => (
              <div key={h.title} className="card p-6">
                <span className="chip flex h-[42px] w-[42px] items-center justify-center">
                  <Icon name={h.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-[17px] font-extrabold tracking-[-0.02em] text-ink">
                  {h.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-faint">{h.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[1180px]">
          <SectionHead
            eyebrow="How it works"
            title={<>Live in days, <span className="gradient-text">not months.</span></>}
            subtitle="No long implementation. We build it around how your calls actually go, connect your tools, and tune it on real calls after launch."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <div key={s.title} className="card p-6">
                <div className="flex items-center gap-3">
                  <span className="chip flex h-[42px] w-[42px] items-center justify-center">
                    <Icon name={s.icon} className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                    Step {i + 1}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-[16px] font-extrabold tracking-[-0.02em] text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-faint">{s.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-2.5">
            <Link href="/services/ai-voice-agents/" className="btn-secondary" style={{ minHeight: 46 }}>
              How our voice agents work
              <Icon name="chevron" className="h-3.5 w-3.5" strokeWidth={2.2} />
            </Link>
            <Link href="/blog/voice-ai-agents-buyers-guide/" className="btn-secondary" style={{ minHeight: 46 }}>
              Voice AI buyer&apos;s guide
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ — AEO */}
      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto max-w-[820px]">
          <SectionHead
            eyebrow="Questions"
            title={<>AI receptionist, <span className="gradient-text">answered.</span></>}
          />
          <dl className="mt-10 divide-y divide-line">
            {FAQS.map((f) => (
              <div key={f.q} className="py-6 first:pt-0">
                <dt className="font-display text-[17px] font-extrabold tracking-[-0.02em] text-ink">
                  {f.q}
                </dt>
                <dd className="mt-2.5 text-[15px] leading-[1.75] text-faint">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
