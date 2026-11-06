import Link from "next/link";
import type { ReadingLink } from "@/lib/related-reading";

const KIND: Record<ReadingLink["kind"], string> = {
  stack: "Stack",
  comparison: "Comparison",
  guide: "Guide",
  city: "City",
};

export default function RelatedReading({ links }: { links: ReadingLink[] }) {
  if (links.length === 0) return null;

  return (
    <section className="border-t border-line px-5 py-14" aria-labelledby="related-reading">
      <div className="mx-auto max-w-[1080px]">
        <p id="related-reading" className="eyebrow">Related</p>
        <ul className="mt-5 grid list-none gap-3 p-0 sm:grid-cols-2">
          {links.map((link) => (
            <li key={`${link.kind}-${link.href}`}>
              <Link
                href={link.href}
                className="card card-hover flex min-h-[76px] flex-col justify-center gap-1 p-4 text-body"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                  {KIND[link.kind]}
                </span>
                <span className="font-display text-[16px] font-extrabold leading-snug tracking-[-0.02em] text-ink">
                  {link.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
