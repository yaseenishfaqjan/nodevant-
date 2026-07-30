import Icon, { type IconName } from "@/components/ui/Icon";
import type { DiagramType } from "@/lib/services";

const nodeCls =
  "absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center min-w-[86px] min-h-[38px] px-2.5 rounded-[11px] border border-line-strong bg-surface";
const labelCls = "font-mono text-[9.5px] tracking-[0.1em] text-ink";

function Node({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <span className={nodeCls} style={{ left: `${x}%`, top: `${y}%` }}>
      <span className={labelCls}>{label}</span>
    </span>
  );
}

function Bar({
  topPct,
  inset,
  label,
  accent,
}: {
  topPct: number;
  inset: number;
  label: string;
  accent?: boolean;
}) {
  return (
    <span
      className="absolute flex min-h-[42px] items-center justify-center rounded-[11px]"
      style={{
        top: `${topPct}%`,
        left: `${inset}%`,
        right: `${inset}%`,
        border: accent ? "1px solid transparent" : "1px solid var(--border-strong)",
        background: accent
          ? "linear-gradient(var(--surface-2),var(--surface-2)),var(--gradient)"
          : "var(--surface)",
        backgroundOrigin: accent ? "border-box" : undefined,
        backgroundClip: accent ? "padding-box,border-box" : undefined,
      }}
    >
      <span className={labelCls}>{label}</span>
    </span>
  );
}

function Core({ icon }: { icon: IconName }) {
  return (
    <span
      className="absolute left-1/2 top-1/2 flex h-[62px] w-[62px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
      style={{ background: "var(--gradient)", animation: "nv-glow 2.6s ease-in-out infinite" }}
    >
      <Icon name={icon} className="h-6 w-6 text-white" strokeWidth={1.8} />
    </span>
  );
}

// Dashed connector overlay. Coordinates are in a 360×300 space stretched to fit
// (preserveAspectRatio none), so x% → x/100·360, y% → y/100·300.
function Wires({ paths, gradient }: { paths: string[]; gradient?: boolean }) {
  return (
    <svg
      viewBox="0 0 360 300"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      {gradient && (
        <defs>
          <linearGradient id="nv-diagram-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--accent-1)" />
            <stop offset="1" stopColor="var(--accent-2)" />
          </linearGradient>
        </defs>
      )}
      <g
        stroke={gradient ? "url(#nv-diagram-grad)" : "var(--accent-1)"}
        strokeOpacity={gradient ? 0.55 : 0.4}
        strokeWidth={1.2}
        strokeDasharray={gradient ? undefined : "5 5"}
        fill="none"
        vectorEffect="non-scaling-stroke"
      >
        {paths.map((d, i) => (
          <path key={i} d={d} style={{ animation: gradient ? undefined : `nv-dash 1.6s linear infinite ${i * 0.2}s` }} />
        ))}
      </g>
    </svg>
  );
}

function Frame({
  status,
  alt,
  children,
}: {
  status: string;
  alt: string;
  children: React.ReactNode;
}) {
  return (
    <div
      role="img"
      aria-label={alt}
      className="relative aspect-[6/5] min-h-[260px] w-full overflow-hidden rounded-2xl border border-line"
      style={{ background: "var(--surface-2)" }}
    >
      <span aria-hidden="true" className="absolute left-4 top-4 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--border-strong)" }} />
        ))}
      </span>
      <span className="absolute right-4 top-4 font-mono text-[9px] tracking-[0.18em] text-faint">
        NODEVANT
      </span>
      {children}
      <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-body">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--gradient)", animation: "nv-pulse 1.6s ease-in-out infinite" }} />
        {status}
      </span>
    </div>
  );
}

export default function ServiceDiagram({
  type,
  status,
  alt,
}: {
  type: DiagramType;
  status: string;
  alt: string;
}) {
  return (
    <Frame status={status} alt={alt}>
      {type === "node-graph" && (
        <>
          <Wires paths={["M68 63 L180 150", "M292 63 L180 150", "M68 237 L180 150", "M292 237 L180 150"]} />
          <Node x={19} y={21} label="TRIGGER" />
          <Node x={81} y={21} label="ENRICH" />
          <Node x={19} y={79} label="CRM" />
          <Node x={81} y={79} label="NOTIFY" />
          <Core icon="brain" />
        </>
      )}

      {type === "hub" && (
        <>
          <Wires paths={["M61 60 L180 150", "M180 45 L180 150", "M299 60 L180 150", "M61 240 L180 150", "M180 255 L180 150", "M299 240 L180 150"]} />
          <Node x={17} y={20} label="CRM" />
          <Node x={50} y={15} label="EMAIL" />
          <Node x={83} y={20} label="BILLING" />
          <Node x={17} y={80} label="CALENDAR" />
          <Node x={50} y={85} label="DOCS" />
          <Node x={83} y={80} label="SLACK" />
          <Core icon="puzzle" />
        </>
      )}

      {type === "pipeline" && (
        <>
          <Wires paths={["M180 84 L180 122", "M180 190 L180 232"]} />
          <Bar topPct={16} inset={8} label="INPUT · DOCS · EVENTS" />
          <Bar topPct={42} inset={8} label="DECISION ENGINE" accent />
          <Bar topPct={70} inset={8} label="OUTPUT · APPROVED / FLAGGED" />
        </>
      )}

      {type === "funnel" && (
        <>
          <Wires paths={["M180 62 L180 98", "M180 134 L180 170", "M180 206 L180 242"]} />
          <Bar topPct={12} inset={6} label="SOURCE" />
          <Bar topPct={37} inset={16} label="ENRICH" />
          <Bar topPct={62} inset={26} label="SCORE" />
          <Bar topPct={84} inset={34} label="BOOK" accent />
        </>
      )}

      {type === "modular" && (
        <>
          <Wires gradient paths={["M110 88 L250 88", "M110 150 L250 150", "M180 88 L180 212"]} />
          <Node x={22} y={29} label="RAG" />
          <Node x={78} y={29} label="COPILOT" />
          <Node x={22} y={50} label="DOC PIPE" />
          <Node x={78} y={50} label="RETRIEVAL" />
          <span
            className="absolute left-1/2 top-[74%] flex min-h-[46px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[12px] px-4"
            style={{
              border: "1px solid transparent",
              background: "linear-gradient(var(--surface-2),var(--surface-2)),var(--gradient)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box,border-box",
            }}
          >
            <span className={labelCls}>YOUR PRODUCT</span>
          </span>
        </>
      )}

      {type === "voice" && (
        <>
          <span
            className="absolute left-1/2 top-[20%] flex -translate-x-1/2 -translate-y-1/2 items-center gap-2.5 rounded-[11px] border border-line-strong bg-surface px-3.5 py-2.5"
          >
            <Icon name="phone" className="h-[17px] w-[17px] text-cyan" />
            <span className={labelCls}>INBOUND CALL</span>
          </span>
          <span aria-hidden="true" className="absolute left-1/2 top-[46%] flex h-[46px] -translate-x-1/2 items-end gap-1">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <span
                key={i}
                className="w-1 rounded-full"
                style={{
                  height: `${45 + (i % 3) * 18}%`,
                  background: "var(--gradient)",
                  animation: `nv-pulse 1.1s ease-in-out infinite ${i * 0.12}s`,
                }}
              />
            ))}
          </span>
          <Node x={26} y={80} label="BOOKED" />
          <Node x={74} y={80} label="TO HUMAN" />
        </>
      )}
    </Frame>
  );
}
