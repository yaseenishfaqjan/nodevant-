import Link from "next/link";
import Icon from "@/components/ui/Icon";
import BrandLogo from "@/components/ui/BrandLogo";
import type { ProductRef } from "@/lib/services";

export default function ProductCard({ product }: { product: ProductRef }) {
  return (
    <div className="flex flex-col">
      <a
        href={product.url}
        target="_blank"
        rel="noopener noreferrer"
        className="card card-hover flex flex-1 flex-col gap-3.5 p-5 text-body"
      >
        <div className="flex items-center gap-3.5">
          <span
            className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl font-display text-lg font-extrabold"
            style={{
              background: "var(--surface-2)",
              border: "1px solid var(--chip-border)",
            }}
          >
            <BrandLogo slug={product.key} name={product.name} fallback={product.initial} className="h-full w-full object-cover" />
          </span>
          <span className="flex flex-col gap-1">
            <span className="inline-flex items-center gap-1.5 font-display text-[16px] font-extrabold tracking-[-0.02em] text-ink">
              {product.name}
              <Icon name="external" className="h-3.5 w-3.5 opacity-50" strokeWidth={1.8} />
            </span>
            <span className="w-fit rounded-full border border-line px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-faint">
              {product.industry}
            </span>
          </span>
        </div>
        <p className="text-[13.5px] leading-relaxed text-faint">{product.outcome}</p>
        <p className="font-mono text-[9.5px] uppercase tracking-[0.1em] text-faint/80">
          {product.services.join(" · ")}
        </p>
        <span
          className="mt-auto inline-flex w-fit items-center rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.1em]"
          style={{ background: "var(--tint)", border: "1px solid var(--chip-border)", color: "var(--accent-1)" }}
        >
          {product.chip}
        </span>
      </a>
      {(product.solutionSlug || product.caseSlug) && (
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 px-1">
          {product.solutionSlug && (
            <Link
              href={`/solutions/${product.solutionSlug}/`}
              className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-cyan hover:underline"
            >
              See the full stack →
            </Link>
          )}
          {product.caseSlug && (
            <Link
              href={`/case-studies/${product.caseSlug}/`}
              className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-cyan hover:underline"
            >
              Read the case study →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
