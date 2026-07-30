import Link from "next/link";
import Icon from "@/components/ui/Icon";

const EX_CHIP =
  "inline-flex items-center rounded-lg px-2.5 py-1.5 font-mono text-[10.5px] tracking-[0.04em] text-ink";
const EX_STYLE = { background: "var(--surface-2)", border: "1px solid var(--border-strong)" };

export default function SolutionsVsServices() {
  return (
    <>
      <div className="mt-9 grid gap-4 md:grid-cols-2">
        {/* Solutions — highlighted */}
        <div
          className="relative rounded-[18px] p-7 shadow-glow"
          style={{
            border: "1px solid transparent",
            backgroundImage: "linear-gradient(var(--surface),var(--surface)),var(--gradient)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box,border-box",
          }}
        >
          <span className="chip h-11 w-11">
            <Icon name="layers" className="h-5 w-5" />
          </span>
          <p className="gradient-text mt-4 font-mono text-[10px] uppercase tracking-[0.16em]">
            Solutions · this page
          </p>
          <h3 className="mt-2.5 text-[18px] font-extrabold leading-[1.35] tracking-[-0.02em] text-ink">
            You want a complete operating system for your industry
          </h3>
          <p className="mt-2.5 text-[14px] leading-relaxed text-faint">
            Multiple services bundled into a proven stack. Faster to deploy, industry-tuned.
          </p>
          <div className="mt-4 flex flex-col gap-2.5 border-t border-line pt-4">
            <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-faint">For example</span>
            <span className="flex flex-wrap items-center gap-2">
              <span className={EX_CHIP} style={EX_STYLE}>Fairway360</span>
              <span className="text-[13px] text-faint">=</span>
              <span className={EX_CHIP} style={EX_STYLE}>AI Voice Agents</span>
              <span className={EX_CHIP} style={EX_STYLE}>Lead Gen Pipeline</span>
              <span className={EX_CHIP} style={EX_STYLE}>Custom AI</span>
            </span>
          </div>
          <Link href="/#audit" className="btn-primary mt-6">
            Book a stack consultation
            <Icon name="chevron" className="h-4 w-4" strokeWidth={2.2} />
          </Link>
        </div>

        {/* Services */}
        <div className="card p-7">
          <span className="chip h-11 w-11">
            <Icon name="puzzle" className="h-5 w-5" />
          </span>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">Services</p>
          <h3 className="mt-2.5 text-[18px] font-extrabold leading-[1.35] tracking-[-0.02em] text-ink">
            You need one specific capability added to what you already run
          </h3>
          <p className="mt-2.5 text-[14px] leading-relaxed text-faint">
            Individual builds. Faster to price, tighter scope.
          </p>
          <div className="mt-4 flex flex-col gap-2.5 border-t border-line pt-4">
            <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-faint">For example</span>
            <span className="flex flex-wrap gap-2">
              <span className={EX_CHIP} style={EX_STYLE}>Just AI Voice Agents to answer missed calls</span>
            </span>
          </div>
          <Link href="/services/" className="btn-secondary mt-6">
            Browse services →
          </Link>
        </div>
      </div>
      <p className="mt-5">
        <Link href="/#audit" className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-cyan hover:underline">
          Not sure? The 90-second audit maps your stack in 3 questions
          <Icon name="chevron" className="h-3.5 w-3.5" strokeWidth={2.2} />
        </Link>
      </p>
    </>
  );
}
