import Link from "next/link";
import Icon from "@/components/ui/Icon";
import ServiceDiagram from "@/components/services/ServiceDiagram";
import type { CaseStudyDetail } from "@/lib/case-studies";

/** Hub card for a deployed case study: stat tiles, tags, challenge/solution,
 *  live + read links, /solutions + /services cross-links, and a diagram panel. */
export default function CaseCard({ study }: { study: CaseStudyDetail }) {
  return (
    <article
      data-case={study.slug}
      data-industry={study.industry}
      data-outcome={study.outcome}
      data-service={study.service}
      data-stack={study.stack}
      className="card flex flex-col overflow-hidden"
    >
      <div className="flex flex-1 flex-col p-[26px]">
        {/* Stat tiles */}
        <div
          className="grid gap-px overflow-hidden rounded-[14px]"
          style={{
            gridTemplateColumns: "repeat(auto-fit,minmax(96px,1fr))",
            background: "var(--border)",
            border: "1px solid var(--border)",
          }}
        >
          {study.bento.map((b) => (
            <span key={b.label} className="block p-[15px_13px]" style={{ background: "var(--surface)" }}>
              <span className="gradient-text block font-mono text-[17px] font-semibold tracking-[-0.02em]">
                {b.value}
              </span>
              <span className="mt-[7px] block font-mono text-[9px] uppercase leading-[1.5] tracking-[0.12em] text-faint">
                {b.label}
              </span>
            </span>
          ))}
        </div>

        {/* Tags */}
        <div className="mt-[18px] flex flex-wrap gap-2">
          <span
            className="inline-flex items-center rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink"
            style={{ background: "var(--tint)", border: "1px solid var(--chip-border)" }}
          >
            {study.industryLabel}
          </span>
          <span
            className="inline-flex items-center rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-faint"
            style={{ background: "var(--surface-2)", border: "1px solid var(--border-strong)" }}
          >
            {study.stackName}
          </span>
        </div>

        {/* Headline */}
        <h3 className="mt-[18px] font-display text-[20px] font-extrabold leading-[1.28] tracking-[-0.025em] text-ink">
          {study.heroLead} <span className="gradient-text">{study.gradientWord}</span>
        </h3>

        {/* Challenge / Solution */}
        <div className="mt-[18px] grid gap-[18px] border-t border-line pt-[18px] sm:grid-cols-2">
          <span>
            <span className="block font-mono text-[9.5px] uppercase tracking-[0.16em] text-cyan">The challenge</span>
            <span className="mt-2 block text-[13.5px] leading-relaxed text-faint">{study.challenge}</span>
          </span>
          <span>
            <span className="block font-mono text-[9.5px] uppercase tracking-[0.16em] text-cyan">What we built</span>
            <span className="mt-2 block text-[13.5px] leading-relaxed text-faint">{study.solution}</span>
          </span>
        </div>

        {/* Footer CTAs */}
        <div className="mt-auto flex flex-wrap gap-2.5 pt-[22px]">
          <a href={study.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ minHeight: 46 }}>
            View live system
            <Icon name="external" className="h-3.5 w-3.5" strokeWidth={1.9} />
          </a>
          <Link href={`/case-studies/${study.slug}/`} className="btn-secondary" style={{ minHeight: 46 }}>
            Read the full case
            <Icon name="chevron" className="h-3.5 w-3.5" strokeWidth={2.2} />
          </Link>
        </div>

        {/* Cross-links */}
        {study.solutionSlug && (
          <Link
            href={`/solutions/${study.solutionSlug}/`}
            className="mt-3 inline-flex items-center gap-1.5 self-start px-1 font-mono text-[10px] uppercase tracking-[0.1em] text-cyan hover:underline"
          >
            See the {study.stackName} stack →
          </Link>
        )}
      </div>

      {/* Diagram panel */}
      <div className="border-t border-line p-[26px]" style={{ background: "var(--surface-2)" }}>
        <ServiceDiagram type={study.diagram} status={study.diagramStatus} alt={study.diagramAlt} />
      </div>
    </article>
  );
}
