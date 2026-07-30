import {
  type BuildEntry,
  type BuildType,
  TYPE_LABELS,
  PLATFORM_LABELS,
  formatBuildDate,
} from "@/lib/build-log";

const badgeBase =
  "inline-flex items-center rounded-md px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.12em]";

function badgeStyle(type: BuildType): React.CSSProperties {
  switch (type) {
    case "product-ship":
      return {
        border: "1px solid transparent",
        background:
          "linear-gradient(var(--surface),var(--surface)) padding-box, var(--gradient) border-box",
        color: "var(--text-strong)",
      };
    case "client-deploy":
      return { background: "var(--glow)", border: "1px solid var(--chip-border)", color: "var(--accent-1)" };
    case "infra":
      return { background: "var(--glow)", border: "1px solid var(--chip-border)", color: "var(--accent-2)" };
    case "fix":
      return { background: "var(--surface-2)", border: "1px solid var(--border-strong)", color: "var(--muted)" };
    default:
      return { background: "transparent", border: "1px dashed var(--border-strong)", color: "var(--muted)" };
  }
}

/** One timeline row: timestamp · node + dashed connector · card. Stacks on mobile. */
export default function BuildLogEntry({ entry, last }: { entry: BuildEntry; last: boolean }) {
  return (
    <div className="grid grid-cols-[28px_minmax(0,1fr)] gap-x-3.5 md:grid-cols-[236px_28px_minmax(0,1fr)] md:gap-x-[18px]">
      {/* Timestamp — right rail on desktop, above the card on mobile */}
      <div className="col-start-2 row-start-1 pb-2 pt-0 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-faint md:col-start-1 md:row-start-1 md:pt-3.5 md:text-right">
        {formatBuildDate(entry.timestamp)}
      </div>

      {/* Node + connector */}
      <div className="col-start-1 row-start-1 row-end-3 flex flex-col items-center md:col-start-2 md:row-end-2" aria-hidden="true">
        <span className="mt-4 h-[9px] w-[9px] flex-none rounded-full" style={{ background: "var(--gradient)", boxShadow: "0 0 10px var(--glow)" }} />
        {!last && (
          <span
            className="mt-1.5 w-0.5 flex-1"
            style={{
              background: "linear-gradient(180deg, var(--accent-1), var(--accent-2))",
              WebkitMaskImage: "repeating-linear-gradient(180deg, black 0 4px, transparent 4px 9px)",
              maskImage: "repeating-linear-gradient(180deg, black 0 4px, transparent 4px 9px)",
            }}
          />
        )}
      </div>

      {/* Card */}
      <div className="col-start-2 row-start-2 pb-[22px] md:col-start-3">
        <div className="card card-hover flex flex-col gap-2.5 p-[18px_20px]">
          <div className="flex flex-wrap items-center gap-2">
            <span className={badgeBase} style={badgeStyle(entry.type)}>{TYPE_LABELS[entry.type]}</span>
            <span
              className="rounded-md px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-faint"
              style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
            >
              {PLATFORM_LABELS[entry.platform]}
            </span>
          </div>
          <h3 className="text-[15px] font-bold leading-[1.45] tracking-[-0.01em] text-ink">{entry.headline}</h3>
          {entry.context && <p className="text-[13px] leading-relaxed text-faint">{entry.context}</p>}
          {entry.stats && (
            <p className="font-mono text-[10.5px] font-medium uppercase tracking-[0.12em] text-faint">{entry.stats}</p>
          )}
        </div>
      </div>
    </div>
  );
}
