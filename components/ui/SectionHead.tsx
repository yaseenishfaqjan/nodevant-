interface SectionHeadProps {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  className?: string;
}

/** Prototype section header: mono eyebrow · gradient rule · heavy H2 · subtitle. */
export default function SectionHead({
  eyebrow,
  title,
  subtitle,
  className,
}: SectionHeadProps) {
  return (
    <div className={className}>
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
        {eyebrow}
      </p>
      <span className="rule my-[10px]" />
      <h2 className="font-display text-[clamp(1.6rem,3.4vw,2.75rem)] font-extrabold leading-[1.15] tracking-[-0.03em] text-ink">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3.5 max-w-xl text-[15px] leading-relaxed text-faint">
          {subtitle}
        </p>
      )}
    </div>
  );
}
