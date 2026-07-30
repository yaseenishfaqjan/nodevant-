import Icon, { type IconName } from "@/components/ui/Icon";
import SectionHead from "@/components/ui/SectionHead";

const CARDS: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "lock",
    title: "Cases we can't share",
    text: "Some clients require an NDA. The numbers are real; the names aren't public.",
  },
  {
    icon: "progress",
    title: "Cases still in delivery",
    text: "Ongoing builds don't get a case study until they're 90 days deployed with measurable results.",
  },
  {
    icon: "alert",
    title: "Cases that failed",
    text: "We've had two. If you want to hear about them on a call, we'll tell you — no marketing spin.",
  },
];

/** The "What we don't show" honesty section — NDA, in-delivery, and failed cases. */
export default function HonestyBand() {
  return (
    <section className="section-gap border-t border-line px-5">
      <div className="mx-auto max-w-[1180px]">
        <SectionHead eyebrow="Honesty" title={<>What we <span className="gradient-text">don&apos;t show.</span></>} />
        <div className="mt-8 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((c) => (
            <div key={c.title} className="card p-6">
              <span className="chip h-11 w-11">
                <Icon name={c.icon} className="h-5 w-5" />
              </span>
              <p className="mt-4 text-[16px] font-extrabold tracking-[-0.02em] text-ink">{c.title}</p>
              <p className="mt-2 text-[14px] leading-relaxed text-faint">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
