import Icon from "@/components/ui/Icon";
import SectionHead from "@/components/ui/SectionHead";

const QUOTES = [
  {
    quote:
      "Inbound leads used to sit until someone opened the inbox. Now first reply is under a minute and booked calls doubled.",
    name: "Priya N.",
    role: "General Manager · Hospitality",
  },
  {
    quote:
      "Quotes that took two days go out the same hour. My estimator now reviews instead of typing.",
    name: "Marcus D.",
    role: "Owner · Field Services · Roofing",
  },
  {
    quote:
      "Month-end reconciliation went from three days of spreadsheets to a report waiting on Monday morning.",
    name: "Elena R.",
    role: "Finance Lead · Fintech",
  },
];

export default function Clients() {
  return (
    <section id="clients" className="section-gap relative overflow-hidden border-t border-line px-5">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-32 h-[400px] w-[400px] rounded-full opacity-[0.04]"
        style={{ border: "1px solid var(--accent-2)", boxShadow: "0 0 0 70px var(--accent-2) inset" }}
      />
      <div className="relative mx-auto max-w-[1280px]">
        <SectionHead
          eyebrow="Clients"
          title={<>Teams that stopped doing <span className="gradient-text">robot work.</span></>}
        />
        <div className="mt-11 grid gap-[18px] md:grid-cols-3">
          {QUOTES.map((q) => (
            <div key={q.name} className="card relative overflow-hidden p-[26px]">
              <span aria-hidden="true" className="gradient-text absolute -top-7 right-2 text-[130px] font-extrabold leading-none opacity-[0.08]">
                &ldquo;
              </span>
              <span className="relative flex gap-[3px] text-cyan">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} name="star" filled className="h-[15px] w-[15px]" />
                ))}
              </span>
              <p className="relative my-4 text-[15px] leading-relaxed text-body">{q.quote}</p>
              <span className="block text-sm font-semibold text-ink">{q.name}</span>
              <span className="mt-[5px] block font-mono text-[10px] uppercase tracking-[0.1em] text-faint">
                {q.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
