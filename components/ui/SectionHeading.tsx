import ScrollReveal from "./ScrollReveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  return (
    <ScrollReveal>
      <div
        className={
          align === "center"
            ? "mx-auto max-w-2xl text-center"
            : "max-w-2xl text-left"
        }
      >
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 className="font-display text-4xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 text-lg leading-relaxed text-muted">{subtitle}</p>
        )}
      </div>
    </ScrollReveal>
  );
}
