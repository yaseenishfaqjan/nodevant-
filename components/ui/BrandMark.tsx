/** The Nodevant node "N" mark. Gradient id is shared/identical across
 *  instances, which is valid SVG. Uses the theme accent variables. */
export default function BrandMark({
  className,
}: {
  className?: string;
}) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="nv-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--accent-1)" />
          <stop offset="1" stopColor="var(--accent-2)" />
        </linearGradient>
      </defs>
      <circle
        cx="24"
        cy="24"
        r="21"
        fill="none"
        stroke="url(#nv-grad)"
        strokeOpacity=".45"
        strokeWidth="1.4"
        strokeDasharray="88 44"
        strokeLinecap="round"
      />
      <path
        d="M17 32V16l14 16V16"
        fill="none"
        stroke="url(#nv-grad)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="17" cy="16" r="3" fill="url(#nv-grad)" />
      <circle cx="31" cy="32" r="3" fill="url(#nv-grad)" />
      <circle cx="31" cy="16" r="2.2" fill="url(#nv-grad)" />
      <circle cx="17" cy="32" r="2.2" fill="url(#nv-grad)" />
    </svg>
  );
}
