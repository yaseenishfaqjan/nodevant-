"use client";

const TOOLS = [
  "n8n",
  "Make",
  "OpenAI",
  "HubSpot",
  "Salesforce",
  "Slack",
  "Notion",
  "Zapier",
  "Shopify",
  "Vapi",
  "Airtable",
  "Twilio",
];

export default function TrustedBy() {
  return (
    <section className="border-y border-line py-12" aria-label="Tools we work with">
      <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.18em] text-faint">
        Building on the tools your team already trusts
      </p>
      <div className="relative overflow-hidden">
        <div className="flex w-max animate-ticker gap-12 pr-12">
          {[...TOOLS, ...TOOLS].map((tool, i) => (
            <span
              key={i}
              className="whitespace-nowrap font-display text-xl font-semibold text-faint/70 transition-colors hover:text-cyan"
            >
              {tool}
            </span>
          ))}
        </div>
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent" />
      </div>
    </section>
  );
}
