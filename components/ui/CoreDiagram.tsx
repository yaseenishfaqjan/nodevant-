import Icon, { type IconName } from "@/components/ui/Icon";

/**
 * Shared "Nodevant Core" diagram. One implementation, three sites of use:
 *  - variant="live"           → homepage hero (fixed channels converging on the core)
 *  - variant="recommendation" → /audit/results (custom recommended stack, angle-placed)
 *  - variant="scanning"       → /reverse-audit (a target site being scanned)
 *
 * Presentational only (no hooks) so it renders from server or client components.
 */

export type CoreVariant = "live" | "recommendation" | "scanning";

export interface CoreNode {
  icon: IconName;
  label: string;
  /** Explicit position (live variant). Omit to auto-place around a circle. */
  x?: string;
  y?: string;
  /** Status pill text, e.g. "SYNCED", "24/7", "RECOMMENDED", "START HERE". */
  statusLabel?: string;
  /** Pill emphasis: "on" = accent (default), "muted" = phase-2 / deferred. */
  tone?: "on" | "muted";
  /** Optional link — audit nodes deep-link to /services/[slug]. */
  href?: string;
}

export interface CoreDiagramProps {
  nodes: CoreNode[];
  variant: CoreVariant;
  /** Text inside the core (company name). If absent, centerIcon is shown. */
  centerLabel?: string;
  centerIcon?: IconName;
  cornerLabel?: string; // e.g. "Nodevant Core" | "NODEVANT · YOUR CUSTOM STACK"
  cornerRight?: string; // e.g. the audit hash "#7c4a2f"
  bottomStatus?: string; // e.g. "6 channels connected · uptime 99.9%"
  bottomRight?: string; // e.g. "GENERATED FROM YOUR AUDIT ANSWERS · …"
  alt?: string;
}

const LIVE_WIRES = [
  "M70 66 L200 150",
  "M200 60 L200 150",
  "M330 66 L200 150",
  "M70 234 L200 150",
  "M200 240 L200 150",
  "M330 234 L200 150",
];

/** Evenly place N nodes on a circle, starting at the top (−90°). */
function placeOnCircle(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const ang = ((-90 + i * (360 / count)) * Math.PI) / 180;
    return { cx: 50 + 37 * Math.cos(ang), cy: 50 + 37 * Math.sin(ang) };
  });
}

export default function CoreDiagram({
  nodes,
  variant,
  centerLabel,
  centerIcon = "bolt",
  cornerLabel = "Nodevant Core",
  cornerRight,
  bottomStatus,
  bottomRight,
  alt,
}: CoreDiagramProps) {
  const isLive = variant === "live";
  const placed = isLive ? [] : placeOnCircle(nodes.length);

  return (
    <div
      role="img"
      aria-label={alt ?? cornerLabel}
      className="card overflow-hidden shadow-card"
    >
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-[9px] w-[9px] rounded-full" style={{ background: "#FF5F57" }} aria-hidden="true" />
        <span className="h-[9px] w-[9px] rounded-full" style={{ background: "#FEBC2E" }} aria-hidden="true" />
        <span className="h-[9px] w-[9px] rounded-full" style={{ background: "#28C840" }} aria-hidden="true" />
        <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
          {cornerLabel}
        </span>
        {cornerRight && (
          <span className="gradient-text ml-auto font-mono text-[10px] uppercase tracking-[0.1em]">
            {cornerRight}
          </span>
        )}
      </div>

      {/* Stage */}
      <div
        data-nv-stage={isLive ? undefined : "true"}
        className="relative aspect-[4/3] min-h-[270px] w-full sm:min-h-[300px]"
      >
        {/* Wires */}
        {isLive ? (
          <svg aria-hidden="true" viewBox="0 0 400 300" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            <g stroke="var(--accent-1)" strokeOpacity="0.45" strokeWidth="1.2" strokeDasharray="5 5" fill="none" vectorEffect="non-scaling-stroke">
              {LIVE_WIRES.map((d, i) => (
                <path key={d} d={d} style={{ animation: `nv-dash 1.6s linear infinite ${i * 0.2}s` }} />
              ))}
            </g>
          </svg>
        ) : (
          <svg aria-hidden="true" className="absolute inset-0 h-full w-full">
            <g stroke="var(--accent-1)" strokeOpacity="0.45" strokeWidth="1.2" strokeDasharray="4 5" fill="none" vectorEffect="non-scaling-stroke">
              {placed.map((p, i) => (
                <line
                  key={i}
                  x1="50%"
                  y1="50%"
                  x2={`${p.cx}%`}
                  y2={`${p.cy}%`}
                  style={{ animation: `nv-dash 1.8s linear infinite ${(0.2 + i * 0.17).toFixed(2)}s` }}
                />
              ))}
            </g>
          </svg>
        )}

        {/* Nodes */}
        {nodes.map((n, i) => {
          const pos = isLive
            ? { left: n.x, top: n.y }
            : { left: `${placed[i].cx}%`, top: `${placed[i].cy}%` };

          if (isLive) {
            return (
              <span
                key={n.label}
                className="absolute flex w-[94px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-[5px] rounded-xl px-1.5 py-2.5"
                style={{ ...pos, background: "var(--surface-2)", border: "1px solid var(--border-strong)" }}
              >
                <span className="chip h-[34px] w-[34px]">
                  <Icon name={n.icon} className="h-[18px] w-[18px]" />
                </span>
                <span className="font-mono text-[10px] text-ink">{n.label}</span>
                <span className="flex items-center gap-1">
                  <span className="h-[5px] w-[5px] rounded-full" style={{ background: "var(--ok)" }} aria-hidden="true" />
                  <span className="font-mono text-[8px] tracking-[0.1em] text-faint">{n.statusLabel}</span>
                </span>
              </span>
            );
          }

          const muted = n.tone === "muted";
          const NodeInner = (
            <>
              <span className="chip h-[30px] w-[30px] shrink-0">
                <Icon name={n.icon} className="h-[15px] w-[15px]" />
              </span>
              <span className="flex min-w-0 flex-col gap-1">
                <span className="whitespace-nowrap font-mono text-[10px] tracking-[0.1em] text-ink">{n.label}</span>
                {n.statusLabel && (
                  <span
                    className="self-start rounded-[5px] px-[7px] py-[2px] font-mono text-[8.5px] font-medium tracking-[0.1em]"
                    style={
                      muted
                        ? { background: "var(--tint)", border: "1px solid var(--border)", color: "var(--muted)" }
                        : { background: "var(--glow)", border: "1px solid var(--chip-border)", color: "var(--accent-1)" }
                    }
                  >
                    {n.statusLabel}
                  </span>
                )}
              </span>
            </>
          );

          const nodeCls =
            "absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2.5 rounded-[11px] px-3 py-2.5 shadow-card";
          const nodeStyle = { ...pos, background: "var(--surface-2)", border: "1px solid var(--border-strong)" };

          return n.href ? (
            <a key={n.label + i} href={n.href} data-nv-node="true" className={nodeCls} style={nodeStyle}>
              {NodeInner}
            </a>
          ) : (
            <span key={n.label + i} data-nv-node="true" className={nodeCls} style={nodeStyle}>
              {NodeInner}
            </span>
          );
        })}

        {/* Center core */}
        {isLive ? (
          <span className="absolute left-1/2 top-1/2 h-[76px] w-[76px] -translate-x-1/2 -translate-y-1/2">
            <span aria-hidden="true" className="absolute -inset-4 rounded-full border border-dashed opacity-[0.35]" style={{ borderColor: "var(--accent-1)", animation: "nv-orbit 20s linear infinite" }} />
            <span aria-hidden="true" data-pulse className="absolute inset-0 rounded-full border" style={{ borderColor: "var(--accent-1)", animation: "nv-ring 2.6s ease-out infinite" }} />
            <span className="absolute inset-0 flex items-center justify-center rounded-full" style={{ background: "var(--gradient)", animation: "nv-glow 2.6s ease-in-out infinite" }}>
              <Icon name={centerIcon} className="h-[34px] w-[34px] text-white" strokeWidth={1.8} />
            </span>
          </span>
        ) : (
          <span data-nv-core="true" className="absolute left-1/2 top-1/2 h-[104px] w-[104px] -translate-x-1/2 -translate-y-1/2">
            <span aria-hidden="true" className="absolute -inset-5 rounded-full border border-dashed opacity-[0.35]" style={{ borderColor: "var(--accent-1)", animation: "nv-orbit 20s linear infinite" }} />
            <span aria-hidden="true" data-pulse className="absolute inset-0 rounded-full" style={{ background: "var(--gradient)", animation: "nv-ring 2.6s ease-out infinite", opacity: 0.35 }} />
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-full px-2 text-center" style={{ background: "var(--gradient)", boxShadow: "var(--shadow-glow)" }}>
              <Icon name={centerIcon} className="h-[22px] w-[22px] text-white" strokeWidth={1.6} />
              {centerLabel && (
                <span className="font-mono text-[9px] font-medium leading-tight tracking-[0.1em] text-white">{centerLabel}</span>
              )}
            </span>
          </span>
        )}
      </div>

      {/* Footer */}
      {(bottomStatus || bottomRight) && (
        <div className="flex flex-wrap items-center gap-2 border-t border-line px-4 py-[11px]">
          <span className="h-1.5 w-1.5 animate-nv-pulse rounded-full" style={{ background: "var(--ok)" }} aria-hidden="true" />
          <span className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-faint">{bottomStatus}</span>
          {bottomRight && (
            <span className="ml-auto font-mono text-[9.5px] uppercase tracking-[0.12em]" style={{ color: "var(--muted)" }}>
              {bottomRight}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
