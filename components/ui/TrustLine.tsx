import Link from "next/link";

/**
 * Founder E-E-A-T trust strip — conveys first-hand experience near the top of
 * key pages. Links to the proof (case studies / about).
 */
export default function TrustLine() {
  return (
    <div className="container-x">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 rounded-2xl border border-line bg-white/[0.02] px-6 py-4 text-center sm:flex-row sm:text-left">
        <span
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-brand-gradient font-display text-sm font-bold text-bg"
          aria-hidden="true"
        >
          YI
        </span>
        <p className="text-sm leading-relaxed text-muted">
          Built by <span className="font-semibold text-ink">Yaseen</span> — a
          founder who has shipped <span className="text-ink">6 production AI
          systems</span> across fintech, manufacturing, SaaS, and more.{" "}
          <Link href="/case-studies/" className="font-semibold text-cyan hover:underline">
            See the work →
          </Link>
        </p>
      </div>
    </div>
  );
}
