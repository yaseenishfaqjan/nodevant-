import Icon, { type IconName } from "@/components/ui/Icon";

const COLUMNS: {
  icon: IconName;
  label: string;
  desc: string;
  chips: { label: string; slug: string }[];
}[] = [
  {
    icon: "gear",
    label: "You sell services on-site",
    desc: "Crews, callouts and appointments — where the job happens at the customer's location.",
    chips: [
      { label: "BMAIKR · Field Services", slug: "bmaikr" },
      { label: "Home Services", slug: "home-services" },
    ],
  },
  {
    icon: "cart",
    label: "You sell products or software",
    desc: "Quotes, orders and pipeline — where the buying cycle runs through a sales team.",
    chips: [
      { label: "Fabrioza · Manufacturing", slug: "fabrioza" },
      { label: "Scalaro · SaaS", slug: "scalaro" },
    ],
  },
  {
    icon: "layers",
    label: "You run programs or a marketplace",
    desc: "Members, applications and enrolments — where many people apply and transact.",
    chips: [
      { label: "Storehouse360 · Fintech", slug: "storehouse360" },
      { label: "Academy · Education", slug: "academy" },
    ],
  },
];

export default function IndustryRouter() {
  return (
    <div className="mt-9 grid gap-[18px] md:grid-cols-3">
      {COLUMNS.map((col) => (
        <div key={col.label} className="card flex flex-col p-6">
          <span className="chip h-11 w-11">
            <Icon name={col.icon} className="h-5 w-5" />
          </span>
          <p className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">
            {col.label}
          </p>
          <p className="mt-2 text-[15px] leading-relaxed text-ink">{col.desc}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {col.chips.map((c) => (
              <a
                key={c.slug}
                href={`#${c.slug}`}
                className="inline-flex items-center rounded-full px-3.5 py-2 font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink transition-colors hover:text-cyan"
                style={{ background: "var(--surface-2)", border: "1px solid var(--border-strong)" }}
              >
                {c.label}
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
