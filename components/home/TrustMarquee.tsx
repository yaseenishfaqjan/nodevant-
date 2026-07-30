const TOOLS = [
  "n8n", "Make", "OpenAI", "HubSpot", "Salesforce", "Slack", "Notion",
  "Zapier", "Shopify", "VAPI", "Airtable", "Twilio", "HeyGen", "Higgsfield",
];

export default function TrustMarquee() {
  return (
    <section aria-label="Tools we build on" className="border-t border-line py-10 md:py-[52px]">
      <p className="mb-6 text-center font-mono text-[10.5px] uppercase tracking-[0.18em] text-faint">
        Built on the tools your team already trusts
      </p>
      <div
        className="relative overflow-hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)",
          maskImage:
            "linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)",
        }}
      >
        <div className="flex w-max animate-nv-marquee">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center gap-[52px] pr-[52px]" aria-hidden={dup === 1}>
              {TOOLS.map((t) => (
                <span
                  key={t}
                  className="whitespace-nowrap text-[17px] font-semibold text-faint transition-colors hover:text-ink"
                >
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
