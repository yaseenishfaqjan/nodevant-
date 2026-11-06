import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import JsonLd from "@/components/ui/JsonLd";
import { METRO_LOCATIONS } from "@/lib/locations";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "US Locations | Nodevant",
  description:
    "Nodevant's only office is in McDonough, Georgia. Atlanta is the home market. Dallas, Houston, Miami, Tampa, Chicago, Charlotte, and Phoenix are remote service areas — not offices.",
  path: "/locations/",
  keywords: [
    "ai automation agency atlanta",
    "ai automation houston",
    "ai automation phoenix",
    "ai automation tampa",
    "ai automation charlotte",
  ],
  ogImage: "/og/locations/index.png",
});

const CARDS: { href: string; label: string; note: string }[] = [
  {
    href: "/locations/atlanta-ai-automation-agency/",
    label: "Atlanta & McDonough, GA",
    note: "Headquarters in McDonough, Henry County. No separate Atlanta office. Home market, and the work is still mostly on calls.",
  },
  ...METRO_LOCATIONS.map((metro) => ({
    href: `/locations/${metro.slug}/`,
    label: metro.label,
    note: metro.definition,
  })),
];

export default function LocationsIndexPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations/" },
        ])}
      />
      <section className="grid-overlay relative overflow-hidden px-5 pb-14 pt-32 md:pt-40">
        <div className="pointer-events-none absolute inset-0 radial-glow" aria-hidden="true" />
        <div className="relative mx-auto max-w-[860px]">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">
            <Link href="/" className="hover:text-ink">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink">Locations</span>
          </nav>
          <p className="eyebrow mt-6">United States</p>
          <span className="rule mt-2.5 mb-4 block" />
          <h1 className="font-display text-[clamp(2rem,4.6vw,3.4rem)] font-extrabold leading-[1.08] tracking-[-0.04em] text-ink text-balance">
            One office in Georgia. <span className="gradient-text">US companies everywhere else.</span>
          </h1>
          <p className="mt-5 text-[17px] leading-relaxed text-body">
            Nodevant is at {SITE.address.street}, {SITE.address.city}, {SITE.address.region} {SITE.address.postal}.
            The city pages below are service areas, not storefronts. We do not publish local client lists for cities where we have not done the work.
          </p>
        </div>
      </section>
      <section className="section-gap border-t border-line px-5">
        <div className="mx-auto grid max-w-[1080px] gap-4 md:grid-cols-2">
          {CARDS.map((card) => (
            <article key={card.href} className="card flex flex-col p-6">
              <h2 className="font-display text-[22px] font-extrabold tracking-[-0.03em] text-ink">
                <Link href={card.href} className="hover:text-cyan">{card.label}</Link>
              </h2>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-faint">{card.note}</p>
              <Link href={card.href} className="btn-secondary mt-5 w-fit">
                View {card.label}
                <Icon name="chevron" className="h-4 w-4" strokeWidth={2.2} />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
