import Link from "next/link";
import Icon, { type IconName } from "@/components/ui/Icon";
import SectionHead from "@/components/ui/SectionHead";

const STEPS: { n: string; icon: IconName; title: string; desc: string; tag?: string; accent?: boolean }[] = [
  { n: "01", icon: "doc", title: "Brand Intake", desc: "Voice, colors, offers and goals — captured once." },
  { n: "02", icon: "sparkle", title: "AI Content Studio", desc: "Avatar spokesperson videos, UGC-style ads, product visuals and shorts — generated weekly.", tag: "HeyGen · Higgsfield", accent: true },
  { n: "03", icon: "layers", title: "Platform Packaging", desc: "Captions, hashtags and formats tuned per platform — vertical for TikTok, professional for LinkedIn." },
  { n: "04", icon: "send", title: "Auto-Publish", desc: "Best-time scheduling pushes every post to every connected account." },
  { n: "05", icon: "refresh", title: "Learn & Repeat", desc: "Engagement data feeds next week's content. The engine gets sharper monthly." },
];

const PLATFORMS: { icon: IconName; label: string }[] = [
  { icon: "p-photo", label: "Instagram" },
  { icon: "p-social", label: "Facebook" },
  { icon: "p-x", label: "X (Twitter)" },
  { icon: "p-work", label: "LinkedIn" },
  { icon: "p-note", label: "TikTok" },
  { icon: "p-play", label: "YouTube" },
  { icon: "p-pin", label: "Pinterest" },
  { icon: "p-thread", label: "Threads" },
  { icon: "p-sky", label: "Bluesky" },
  { icon: "p-store", label: "Google Business" },
];

const CAPS: { icon: IconName; title: string; desc: string }[] = [
  { icon: "video", title: "Avatar spokesperson videos", desc: "A consistent on-brand presenter, without filming days." },
  { icon: "target", title: "UGC-style ad creatives", desc: "Native-feeling ads that don't scream AI." },
  { icon: "image", title: "Product & promo visuals", desc: "Scroll-stopping stills and shorts from your catalog." },
  { icon: "chat", title: "Platform-tuned captions & hashtags", desc: "Written per channel, not copy-pasted." },
  { icon: "clock", title: "Best-time scheduling", desc: "Every post lands when your audience is actually online." },
  { icon: "chart", title: "Monthly performance report", desc: "What ran, what worked, what we're doubling down on." },
];

const STATS = [
  { value: "20+ hrs", label: "Returned weekly" },
  { value: "60–80%", label: "Content time cut" },
  { value: "25–40%", label: "Engagement lift" },
  { value: "10", label: "Platforms, one engine" },
];

export default function SocialAutopilot() {
  return (
    <section id="social" className="section-gap relative overflow-hidden border-t border-line px-5">
      <div className="pointer-events-none absolute -left-36 -top-40 h-[420px] w-[420px] rounded-full bg-violet opacity-[0.05] blur-[120px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1280px]">
        <SectionHead
          eyebrow="Flagship · Social Media Autopilot"
          title={<>Your brand, posting <span className="gradient-text">everywhere, every day</span> — on autopilot.</>}
          subtitle="Businesses burn 20+ hours a week posting by hand. We build an AI content engine that creates, schedules and publishes across every account you own — while you run the business."
        />

        {/* Engine steps */}
        <div className="relative mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <span
            aria-hidden="true"
            className="absolute left-[10%] right-[10%] top-[42px] hidden h-px opacity-40 lg:block"
            style={{ backgroundImage: "linear-gradient(90deg,var(--accent-1) 50%,transparent 0)", backgroundSize: "12px 1px", animation: "nv-line 1.4s linear infinite" }}
          />
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="relative rounded-2xl p-[22px]"
              style={
                s.accent
                  ? {
                      border: "1px solid transparent",
                      backgroundImage: "linear-gradient(var(--surface),var(--surface)),var(--gradient)",
                      backgroundOrigin: "border-box",
                      backgroundClip: "padding-box,border-box",
                    }
                  : { background: "var(--surface)", border: "1px solid var(--border)" }
              }
            >
              <span className="flex items-center gap-[11px]">
                <span className="gradient-text font-mono text-[12px] font-semibold">{s.n}</span>
                <span className="chip h-10 w-10">
                  <Icon name={s.icon} className="h-5 w-5" />
                </span>
              </span>
              <h3 className="mt-[15px] font-display text-base font-extrabold tracking-[-0.02em] text-ink">
                {s.title}
              </h3>
              <p className="mt-[7px] text-[13.5px] leading-relaxed text-faint">{s.desc}</p>
              {s.tag && (
                <span className="mt-3 inline-block rounded-full px-[9px] py-[5px] font-mono text-[9px] uppercase tracking-[0.14em] text-faint" style={{ border: "1px solid var(--border-strong)" }}>
                  {s.tag}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Platforms */}
        <p className="mb-4 mt-[52px] font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">
          One engine · Up to 10 platforms
        </p>
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {PLATFORMS.map((p) => (
            <span key={p.label} className="card flex min-h-[52px] items-center gap-2.5 px-3.5 py-3">
              <span className="chip h-[30px] w-[30px]">
                <Icon name={p.icon} className="h-4 w-4" />
              </span>
              <span className="flex-1 text-[13.5px] font-semibold text-ink">{p.label}</span>
              <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: "var(--ok)" }} aria-hidden="true" />
            </span>
          ))}
        </div>
        <p className="mt-3.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-faint">
          Have 3 accounts or 10 — the engine scales to whatever you run
        </p>

        {/* Capabilities */}
        <div className="mt-[52px] grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CAPS.map((c) => (
            <span key={c.title} className="card flex items-start gap-[13px] p-4">
              <span className="chip h-[42px] w-[42px]">
                <Icon name={c.icon} className="h-5 w-5" />
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-[15px] font-semibold text-ink">{c.title}</span>
                <span className="text-[13px] leading-relaxed text-faint">{c.desc}</span>
              </span>
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-[26px] sm:grid-cols-4">
          {STATS.map((s) => (
            <span key={s.label} className="block">
              <span className="gradient-text block font-display text-[26px] font-extrabold tracking-[-0.03em]">
                {s.value}
              </span>
              <span className="mt-1.5 block font-mono text-[9.5px] uppercase tracking-[0.12em] text-faint">
                {s.label}
              </span>
            </span>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start gap-3.5">
          <Link href="/audit/" className="btn-primary">
            Automate My Social Media
            <Icon name="chevron" className="h-4 w-4" strokeWidth={2.2} />
          </Link>
          <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
            <Icon name="shield-check" className="h-[15px] w-[15px] text-cyan" strokeWidth={1.6} />
            Human-approved before anything ships
          </p>
        </div>
      </div>
    </section>
  );
}
