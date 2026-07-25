import ScrollReveal from "./ScrollReveal";

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
}

/** Standard inner-page header with the brand radial glow. */
export default function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section className="grid-overlay relative overflow-hidden pb-12 pt-36 md:pb-16 md:pt-44">
      <div className="absolute inset-0 radial-glow" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/3 top-10 h-[360px] w-[360px] rounded-full bg-cyan opacity-[0.06] blur-[120px]"
        aria-hidden="true"
      />
      <div className="container-x relative z-10">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 flex justify-center">
              <span className="badge badge-accent">{eyebrow}</span>
            </div>
            <h1 className="font-display text-4xl font-black leading-tight tracking-tight text-ink md:text-6xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted">
                {subtitle}
              </p>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
