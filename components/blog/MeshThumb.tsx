import { clsx } from "clsx";

/**
 * Article thumbnail. Renders the post's real cover art when it has one, and
 * falls back to the generated gradient mesh when it doesn't — so a post can
 * ship before its artwork exists without leaving a hole in the grid.
 *
 * The mesh is pure CSS, so it re-skins with the theme toggle like every other
 * surface. Variant (0–5) rotates the mesh angle and flips the accent positions
 * so the cards read as a set, not clones.
 */
export function meshBackground(variant: number) {
  const angles = [140, 200, 110, 165, 245, 125];
  const a = angles[variant % angles.length];
  const flip = variant % 2 === 0;
  return [
    `radial-gradient(circle at ${flip ? "24% 26%" : "76% 22%"}, var(--accent-1) 0%, transparent 56%)`,
    `radial-gradient(circle at ${flip ? "78% 72%" : "22% 74%"}, var(--accent-2) 0%, transparent 56%)`,
    `linear-gradient(${a}deg, var(--surface-2), var(--surface))`,
  ].join(", ");
}

export default function MeshThumb({
  variant,
  className,
  src,
  priority = false,
}: {
  variant: number;
  className?: string;
  /** Cover image path, e.g. "/images/blog/<slug>.webp". Mesh is used if absent. */
  src?: string;
  /** Set on an above-the-fold cover (the hub's featured card, an article hero)
   *  so it loads eagerly — lazy-loading the LCP image delays it for no gain. */
  priority?: boolean;
}) {
  if (src) {
    return (
      <span className={clsx("block overflow-hidden", className)}>
        {/* Decorative: the headline sits directly beside it, so an alt string
            here would just be read out twice. Explicit dimensions reserve the
            box so the card never shifts as the image arrives. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          aria-hidden="true"
          width={1200}
          height={1200}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          decoding="async"
          className="h-full w-full object-cover"
        />
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className={clsx("block opacity-85", className)}
      style={{ backgroundImage: meshBackground(variant) }}
    />
  );
}
