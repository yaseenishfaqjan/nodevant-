import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import JsonLd from "@/components/ui/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, productHubSchema } from "@/lib/schema";
import { getSolution } from "@/lib/solutions";

export const metadata: Metadata = pageMetadata({
  title: "Software Stacks for US Companies | Nodevant",
  description:
    "Done-for-you software stacks Nodevant builds for US lawn care, field service, financial, golf and B2B teams. Fixed USD pricing, live in 1–3 weeks, monitored after launch.",
  path: "/products/",
  keywords: [
    "custom business software",
    "lawn care software",
    "credit repair software",
    "field service software",
    "us software stacks",
  ],
});

/** Sellable stacks first, then the deployed systems they sit on. */
const STACK_ORDER = [
  "lawn-care-software",
  "credit-repair-software",
  "fairway360",
  "bmaikr",
  "home-services",
  "storehouse360",
  "scalaro",
  "fabrioza",
  "academy",
];

const DISPLAY_NAME: Record<string, string> = {
  bmaikr: "GlobalShield360",
};

const EXTRAS: {
  name: string;
  path: string;
  summary: string;
  price: string;
}[] = [
  {
    name: "AI Receptionist",
    path: "/solutions/ai-receptionist/",
    summary:
      "A voice receptionist that answers every call, books the appointment, and writes the lead into the CRM.",
    price: "Voice builds from $2,800 · see the receptionist page",
  },
  {
    name: "PeachPicks",
    path: "/case-studies/peachpicks/",
    summary:
      "A custom sports-prediction platform with leaderboards and a local sponsor marketplace. Published as a case study.",
    price: "Custom build · quoted after a free audit",
  },
];

function priceLabel(slug: string): string {
  const offer = getSolution(slug)?.offer;
  if (!offer) return "Fixed quote after a free audit";
  const fmt = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
  return `${fmt.format(offer.low)}–${fmt.format(offer.high)} USD`;
}

export default function ProductsPage() {
  const stacks = STACK_ORDER.map((slug) => {
    const solution = getSolution(slug);
    if (!solution) return null;
    return {
      name: DISPLAY_NAME[slug] ?? solution.name,
      path: `/solutions/${solution.slug}/`,
      summary: solution.definition ?? solution.description,
      price: priceLabel(slug),
      note: slug === "bmaikr" ? "Field stack · BMAIKR engine" : solution.industry,
    };
  }).filter((item): item is NonNullable<typeof item> => item !== null);

  const cards = [
    ...stacks,
    ...EXTRAS.map((item) => ({ ...item, note: "Nodevant" })),
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products/" },
          ]),
          productHubSchema(
            cards.map((card) => ({
              name: card.name,
              description: card.summary,
              path: card.path,
            })),
          ),
        ]}
      />

      <section className="grid-overlay relative overflow-hidden px-5 pb-14 pt-32 md:pt-40">
        <div className="pointer-events-none absolute inset-0 radial-glow" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1280px]">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">
            <Link href="/" className="hover:text-ink">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink">Products</span>
          </nav>
          <p className="eyebrow mt-6">Software stacks</p>
          <span className="rule mt-2.5 mb-4 block" />
          <h1 className="max-w-4xl font-display text-[clamp(2.125rem,5vw,4rem)] font-extrabold leading-[1.06] tracking-[-0.04em] text-ink text-balance">
            Software stacks Nodevant builds for <span className="gradient-text">US companies.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-ink">
            Nodevant sells done-for-you software stacks — a named system for a US team, priced as one project, live in 1–3 weeks, and monitored after launch.
          </p>
          <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-faint">
            Lawn care, field service, credit and financial teams, golf clubs, and B2B sales are the stacks below. The free audit turns the $10,000–$20,000 band into a fixed quote for your operation.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/audit/" className="btn-primary">
              Get a free audit
              <Icon name="chevron" className="h-4 w-4" strokeWidth={2.2} />
            </Link>
            <Link href="/solutions/" className="btn-secondary">How a stack is built</Link>
          </div>
        </div>
      </section>

      <section className="section-gap border-t border-line px-5" aria-label="All software stacks">
        <div className="mx-auto grid max-w-[1280px] gap-[18px] md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <article key={card.path} className="card flex flex-col p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">{card.note}</p>
              <h2 className="mt-2 font-display text-[22px] font-extrabold tracking-[-0.03em] text-ink">
                <Link href={card.path} className="text-ink hover:text-cyan">{card.name}</Link>
              </h2>
              <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-faint">{card.summary}</p>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.08em] text-ink">{card.price}</p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                <Link href={card.path} className="btn-secondary">See the stack</Link>
                <Link href="/audit/" className="btn-primary">Free audit</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
