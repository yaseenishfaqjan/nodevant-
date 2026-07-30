import Link from "next/link";
import Icon from "@/components/ui/Icon";
import ServiceDiagram from "@/components/services/ServiceDiagram";
import { InvestmentCard } from "@/components/services/InvestmentPanel";
import type { ServiceDetail } from "@/lib/services";

export function ToolChips({ tools }: { tools: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tools.map((t) => (
        <span
          key={t}
          className="inline-flex items-center rounded-full px-3 py-1.5 font-mono text-[11px] tracking-[0.04em] text-ink"
          style={{
            background: "var(--tint)",
            border: "1px solid var(--chip-border)",
            boxShadow: "inset 0 0 12px var(--glow)",
          }}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

export default function ServiceCard({ service }: { service: ServiceDetail }) {
  return (
    <article
      id={service.slug}
      className="card grid scroll-mt-28 items-center gap-8 p-6 md:p-10 lg:grid-cols-[1.5fr_1fr]"
    >
      <div className="min-w-0">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">
          Nodevant · Service {service.num}
        </p>
        <h2 className="mt-3 font-display text-[clamp(1.5rem,2.6vw,2.125rem)] font-extrabold leading-[1.15] tracking-[-0.03em] text-ink">
          {service.name.split(" ").slice(0, -1).join(" ")}{" "}
          <span className="gradient-text">{service.gradientWord}</span>
        </h2>
        <p className="mt-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-cyan">
          {service.subtitle}
        </p>
        <p className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-faint">
          {service.description}
        </p>

        <div className="mt-5">
          <ToolChips tools={service.tools} />
        </div>

        <div className="mt-6 flex flex-col border-t border-line">
          {service.build.map((b) => (
            <span key={b.title} className="flex items-start gap-3 border-b border-line py-3.5 last:border-b-0">
              <span className="chip h-9 w-9 flex-shrink-0">
                <Icon name={b.icon} className="h-[17px] w-[17px]" />
              </span>
              <span className="flex flex-col">
                <span className="text-[15px] font-semibold text-ink">{b.title}</span>
                <span className="mt-0.5 text-[13px] leading-snug text-faint">{b.text}</span>
              </span>
            </span>
          ))}
        </div>

        <div className="mt-6">
          <InvestmentCard service={service} />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={`/services/${service.slug}/`} className="btn-primary">
            Explore {service.name}
            <Icon name="chevron" className="h-4 w-4" strokeWidth={2.2} />
          </Link>
          <Link href="/#audit" className="btn-secondary">
            See if this is your #1 opportunity →
          </Link>
        </div>
      </div>

      <div>
        <ServiceDiagram type={service.diagram} status={service.diagramStatus} alt={service.diagramAlt} />
      </div>
    </article>
  );
}
