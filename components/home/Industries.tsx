import Link from "next/link";
import Icon, { type IconName } from "@/components/ui/Icon";
import SectionHead from "@/components/ui/SectionHead";

const ITEMS: { icon: IconName; title: string; desc: string }[] = [
  { icon: "chart", title: "Fintech", desc: "KYC documents read and filed in 40 seconds." },
  { icon: "gear", title: "Manufacturing", desc: "RFQs quoted the same hour they arrive." },
  { icon: "funnel", title: "SaaS Sales", desc: "Every inbound lead answered in 30 seconds." },
  { icon: "pin", title: "Field Services", desc: "Calls answered, jobs booked, techs dispatched." },
  { icon: "doc", title: "Education", desc: "Enrollment questions handled in any timezone." },
  { icon: "phone", title: "Home Services", desc: "Missed calls returned before the lead cools." },
  { icon: "cart", title: "E-Commerce & Retail", desc: "Orders, returns and restock alerts handled without staff." },
  { icon: "building", title: "Real Estate", desc: "Every enquiry answered and every showing booked automatically." },
  { icon: "health", title: "Healthcare", desc: "Intake forms, reminders and rescheduling run themselves." },
  { icon: "truck", title: "Logistics", desc: "Shipment status and exceptions escalated before customers ask." },
  { icon: "cup", title: "Hospitality", desc: "Bookings, reviews and guest questions handled around the clock." },
  { icon: "briefcase", title: "Professional Services", desc: "Proposals drafted and follow-ups sent the same day." },
];

export default function Industries() {
  return (
    <section id="industries" className="section-gap border-t border-line px-5">
      <div className="mx-auto max-w-[1280px]">
        <SectionHead
          eyebrow="Industries"
          title={<>Any industry. <span className="gradient-text">Anywhere.</span></>}
          subtitle="If your team does repetitive work, we can automate it — these are just the sectors we've shipped in most."
        />
        <div className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((it) => (
            <Link
              key={it.title}
              href="/audit/"
              className="card card-hover flex min-h-[88px] items-center gap-3.5 p-5"
            >
              <span className="chip h-11 w-11">
                <Icon name={it.icon} className="h-[21px] w-[21px]" />
              </span>
              <span className="flex flex-1 flex-col gap-1">
                <span className="text-base font-semibold text-ink">{it.title}</span>
                <span className="text-[13px] text-faint">{it.desc}</span>
              </span>
              <Icon name="chevron" className="h-[18px] w-[18px] flex-shrink-0 text-faint" strokeWidth={1.8} />
            </Link>
          ))}

          {/* Your industry CTA */}
          <Link
            href="/audit/"
            className="flex flex-wrap items-center gap-4 rounded-2xl p-6 shadow-glow sm:col-span-2 lg:col-span-3"
            style={{
              border: "1px solid transparent",
              backgroundImage: "linear-gradient(var(--surface),var(--surface)),var(--gradient)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box,border-box",
            }}
          >
            <span className="chip h-11 w-11">
              <Icon name="globe" className="h-[21px] w-[21px]" />
            </span>
            <span className="flex min-w-[220px] flex-1 flex-col gap-1">
              <span className="font-display text-[17px] font-extrabold tracking-[-0.02em] text-ink">
                Your industry
              </span>
              <span className="text-[13.5px] text-faint">
                Don&apos;t see yours? The audit maps your exact workflows in 90 seconds.
              </span>
            </span>
            <span className="inline-flex min-h-[46px] items-center gap-1.5 rounded-[11px] px-5 text-sm font-semibold text-white" style={{ background: "var(--gradient)" }}>
              Get My Free Audit
              <Icon name="chevron" className="h-3.5 w-3.5" strokeWidth={2.2} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
