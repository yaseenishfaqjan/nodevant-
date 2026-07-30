import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { getService } from "@/lib/services";
import type { SolutionDetail } from "@/lib/solutions";

export default function SolutionCard({ solution }: { solution: SolutionDetail }) {
  const services = solution.poweredBy.map((s) => getService(s)).filter(Boolean);

  return (
    <article
      id={solution.slug}
      className="card flex scroll-mt-28 flex-col p-6"
    >
      <span className="inline-flex w-fit items-center rounded-full px-3 py-1.5 font-mono text-[11px] tracking-[0.04em] text-ink" style={{ background: "var(--tint)", border: "1px solid var(--chip-border)" }}>
        {solution.name}
      </span>
      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
        {solution.industry}
      </p>
      <h3 className="mt-2.5 font-display text-[21px] font-extrabold leading-[1.25] tracking-[-0.02em] text-ink">
        {solution.heroLead} <span className="gradient-text">{solution.gradientWord}</span>
      </h3>
      <p className="mt-2.5 text-[14px] leading-relaxed text-faint">{solution.description}</p>

      <div className="mt-4 flex flex-col gap-1.5 border-y border-line py-4">
        <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-faint">
          {solution.proofLabel}
        </span>
        <span className="gradient-text text-[17px] font-extrabold tracking-[-0.02em]">
          {solution.proofValue}
        </span>
      </div>

      <div className="border-b border-line py-4">
        <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-faint">Powered by</span>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {services.map((s) => (
            <Link
              key={s!.slug}
              href={`/services/${s!.slug}/`}
              className="inline-flex items-center rounded-lg px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.06em] text-ink transition-colors hover:text-cyan"
              style={{ background: "var(--surface-2)", border: "1px solid var(--border-strong)" }}
            >
              {s!.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-1.5">
        <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-faint">Timeline</span>
        <span className="gradient-text text-[17px] font-extrabold tracking-[-0.02em]">{solution.timeline}</span>
      </div>

      <div className="mt-5 flex flex-wrap gap-2.5">
        {solution.liveUrl && (
          <a href={solution.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
            View live system
            <Icon name="external" className="h-4 w-4" strokeWidth={1.9} />
          </a>
        )}
        <Link href={`/solutions/${solution.slug}/`} className="btn-secondary">
          See stack details →
        </Link>
      </div>
    </article>
  );
}
