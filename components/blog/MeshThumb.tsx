import { clsx } from "clsx";

/**
 * Gradient-mesh article thumbnail — pure CSS, so it re-skins with the theme
 * toggle like every other surface. Variant (0–5) rotates the mesh angle and
 * flips the accent positions so the six cards read as a set, not clones.
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
}: {
  variant: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={clsx("block opacity-85", className)}
      style={{ backgroundImage: meshBackground(variant) }}
    />
  );
}
