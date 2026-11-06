export default function QuickAnswer({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <aside
      className={`rounded-2xl border border-line p-4 text-left sm:p-5 ${className}`}
      style={{ background: "var(--surface)" }}
      aria-label="Quick answer"
    >
      <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-cyan">Quick answer</p>
      <p className="mt-2 text-[15.5px] leading-relaxed text-ink">{children}</p>
    </aside>
  );
}
