import type { SVGProps } from "react";

/** Inline icon set (stroke = currentColor) transcribed from the design system.
 *  Usage: <Icon name="bolt" className="h-5 w-5" /> */
const PATHS: Record<string, React.ReactNode> = {
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2.5" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  "calendar-check": (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2.5" />
      <path d="M3 10h18M8 3v4M16 3v4M9 15l2 2 4-4" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  phone: (
    <path d="M7 3.5h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 5 5.7 2 2 0 0 1 7 3.5Z" />
  ),
  chat: (
    <>
      <path d="M20 14.5a2.5 2.5 0 0 1-2.5 2.5H9l-4 3.5V6.5A2.5 2.5 0 0 1 7.5 4h10A2.5 2.5 0 0 1 20 6.5Z" />
      <path d="M9 9h7M9 12.5h4.5" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20V5" />
      <path d="M4 20h16" />
      <path d="M8.5 20v-6M13 20V8.5M17.5 20v-9" />
    </>
  ),
  bolt: <path d="M13.5 3 5.5 13.5H11l-.5 7.5 8-10.5H13l.5-7.5Z" />,
  funnel: <path d="M4 5h16l-6 7v7l-4 2v-9L4 5Z" />,
  brain: (
    <>
      <path d="M12 5.5a3 3 0 0 0-5.7-1.3A2.8 2.8 0 0 0 4 7a2.9 2.9 0 0 0 .6 1.8A3 3 0 0 0 5 14.5a3 3 0 0 0 3 4A3 3 0 0 0 12 20Z" />
      <path d="M12 5.5a3 3 0 0 1 5.7-1.3A2.8 2.8 0 0 1 20 7a2.9 2.9 0 0 1-.6 1.8A3 3 0 0 1 19 14.5a3 3 0 0 1-3 4A3 3 0 0 1 12 20Z" />
      <path d="M12 5.5V20" />
    </>
  ),
  doc: (
    <>
      <path d="M6 3h8l4 4v14H6Z" />
      <path d="M14 3v4h4M9 12h6M9 16h4" />
    </>
  ),
  refresh: (
    <>
      <path d="M20 12a8 8 0 1 1-2.4-5.7" />
      <path d="M20 4v4.5h-4.5" />
    </>
  ),
  star: (
    <path d="m12 3.8 2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8Z" />
  ),
  "shield-check": (
    <>
      <path d="M12 3.2 5 6v6c0 4.3 3 7.4 7 8.8 4-1.4 7-4.5 7-8.8V6Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </>
  ),
  puzzle: (
    <path d="M10 4h4v2.2a1.8 1.8 0 1 0 3.6 0V4H20v4.4h-2.2a1.8 1.8 0 1 0 0 3.6H20V20h-4.4v-2.2a1.8 1.8 0 1 0-3.6 0V20H4v-4.4h2.2a1.8 1.8 0 1 0 0-3.6H4V8h6Z" />
  ),
  pin: (
    <>
      <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  chevron: <path d="m9.5 6 6 6-6 6" />,
  external: (
    <>
      <path d="M8 16 16.5 7.5" />
      <path d="M9.5 7.5h7v7" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3.5v2.2M12 18.3v2.2M20.5 12h-2.2M5.7 12H3.5M18 6l-1.6 1.6M7.6 16.4 6 18M18 18l-1.6-1.6M7.6 7.6 6 6" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  x: <path d="M6.5 6.5 17.5 17.5M17.5 6.5 6.5 17.5" />,
  cart: (
    <>
      <path d="M3.5 4h2.2l2.4 10.5h9.2L19.5 7H7" />
      <circle cx="10" cy="19" r="1.4" />
      <circle cx="17" cy="19" r="1.4" />
    </>
  ),
  building: (
    <>
      <path d="M4 21V6.5L12 3l8 3.5V21" />
      <path d="M4 21h16M9.5 21v-5h5v5M8.5 10h2M13.5 10h2M8.5 13.5h2M13.5 13.5h2" />
    </>
  ),
  health: <path d="M3.5 12h4l1.8-4 3 8 2.2-4h6" />,
  truck: (
    <>
      <path d="M3 7h10v9H3zM13 10.5h4l3 3V16h-7z" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </>
  ),
  cup: (
    <>
      <path d="M5 6h11v6a5.5 5.5 0 0 1-11 0Z" />
      <path d="M16 7.5h2.2a2.3 2.3 0 0 1 0 4.6H16M4 21h13" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7.5" width="18" height="12" rx="2.2" />
      <path d="M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5M3 13h18" />
    </>
  ),
  video: (
    <>
      <rect x="3" y="6" width="12" height="12" rx="2.4" />
      <path d="m15 11 5.5-3v8L15 13Z" />
    </>
  ),
  image: (
    <>
      <rect x="3.5" y="5" width="17" height="14" rx="2.4" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="m4.5 17 5-4.5 4.5 4 2.5-2 3 2.5" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3.5 13.8 9l5.5 1.8-5.5 1.8L12 18l-1.8-5.4L4.7 10.8 10.2 9Z" />
      <path d="M18.5 4v3M20 5.5h-3" />
    </>
  ),
  send: (
    <>
      <path d="M20.5 3.5 3.5 10.5l7 2.6 2.6 7Z" />
      <path d="m10.5 13.1 4.4-4.4" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3.5 8.5 4.3L12 12 3.5 7.8Z" />
      <path d="m3.5 12 8.5 4.2 8.5-4.2M3.5 16.2 12 20.4l8.5-4.2" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.7 9.5h16.6M3.7 14.5h16.6" />
      <path d="M12 3.5c2.4 2.4 3.6 5.3 3.6 8.5s-1.2 6.1-3.6 8.5c-2.4-2.4-3.6-5.3-3.6-8.5S9.6 5.9 12 3.5Z" />
    </>
  ),
  menu: <path d="M4 8.5h16M4 15.5h16" />,
  coin: (
    <>
      <ellipse cx="12" cy="7" rx="7.5" ry="3.2" />
      <path d="M4.5 7v5.5c0 1.8 3.4 3.2 7.5 3.2s7.5-1.4 7.5-3.2V7" />
      <path d="M4.5 12.5V18c0 1.8 3.4 3.2 7.5 3.2s7.5-1.4 7.5-3.2v-5.5" />
    </>
  ),
  network: (
    <>
      <circle cx="12" cy="5" r="2.4" />
      <circle cx="5" cy="18" r="2.4" />
      <circle cx="19" cy="18" r="2.4" />
      <path d="M10.6 7 6.4 15.8M13.4 7l4.2 8.8M7.4 18h9.2" />
    </>
  ),
  trophy: (
    <>
      <path d="M8 4h8v5a4 4 0 0 1-8 0Z" />
      <path d="M8 5.5H5.5V8a2.5 2.5 0 0 0 2.5 2.5M16 5.5h2.5V8a2.5 2.5 0 0 1-2.5 2.5M9.5 20h5M12 13v7" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8.5" r="3.2" />
      <path d="M3.5 20c0-3 2.5-5.2 5.5-5.2s5.5 2.2 5.5 5.2" />
      <path d="M16 5.6a3.2 3.2 0 0 1 0 6M17.5 14.9c2 .6 3.5 2.5 3.5 5.1" />
    </>
  ),
  lock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.4" />
      <path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7" />
    </>
  ),
  progress: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 3.5a8.5 8.5 0 0 1 8.5 8.5" />
    </>
  ),
  alert: (
    <>
      <path d="M12 4.5 21 19.5H3Z" />
      <path d="M12 10v4M12 16.8v.2" />
    </>
  ),
  growth: (
    <>
      <path d="M12 20.5v-7" />
      <path d="M12 13.5c0-3.3-2.4-5.5-6-5.5 0 3.6 2.4 5.5 6 5.5Z" />
      <path d="M12 13.5c0-4 2.8-6.5 7-6.5 0 4.2-2.8 6.5-7 6.5Z" />
      <path d="M8.5 20.5h7" />
    </>
  ),
  "clipboard-check": (
    <>
      <rect x="5" y="4.5" width="14" height="16" rx="2.4" />
      <path d="M9 4.5V3h6v1.5M9.5 12.5l2 2 3.5-3.5" />
    </>
  ),
  signature: (
    <>
      <path d="M6 3.5h8l4 4v9H6Z" />
      <path d="M14 3.5v4h4" />
      <path d="M4 20.5c2-2.5 3.5.5 5.5 0s2.5-2 4.5-1 4 1.5 6 0" />
    </>
  ),
  shield: (
    <path d="M12 3.2 5 6v6c0 4.3 3 7.4 7 8.8 4-1.4 7-4.5 7-8.8V6Z" />
  ),
  eye: (
    <>
      <path d="M2.8 12S6.5 5.8 12 5.8 21.2 12 21.2 12 17.5 18.2 12 18.2 2.8 12 2.8 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8.2" r="3.6" />
      <path d="M4.5 20.5c0-4 3.4-6.6 7.5-6.6s7.5 2.6 7.5 6.6" />
    </>
  ),
  tag: (
    <>
      <path d="M12.4 3.5H20v7.6l-8.9 8.9-7.6-7.6Z" />
      <circle cx="16.4" cy="7.6" r="1.4" />
    </>
  ),
  // Platform marks
  "p-photo": (
    <>
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="16.8" cy="7.2" r=".9" fill="currentColor" stroke="none" />
    </>
  ),
  "p-social": (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <path d="M13.5 20v-6.5h2.2l.4-2.6h-2.6V9.4c0-.8.3-1.3 1.4-1.3h1.3V5.8a17 17 0 0 0-2-.1c-2.1 0-3.4 1.2-3.4 3.4v1.8H8.5v2.6h2.3V20" />
    </>
  ),
  "p-x": <path d="M5.5 5.5 18.5 18.5M18.5 5.5 5.5 18.5" />,
  "p-work": (
    <>
      <rect x="4" y="4" width="16" height="16" rx="3.4" />
      <circle cx="8.2" cy="8.4" r="1.1" />
      <path d="M8.2 11.5v5M12 16.5v-3a1.9 1.9 0 0 1 3.8 0v3" />
    </>
  ),
  "p-note": (
    <>
      <path d="M10 16.5V5.5l6.5 2" />
      <circle cx="8" cy="16.8" r="2.6" />
    </>
  ),
  "p-play": (
    <>
      <rect x="3" y="6" width="18" height="12" rx="4" />
      <path d="m10.5 9.5 4.5 2.5-4.5 2.5Z" />
    </>
  ),
  "p-pin": (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M10 18.5 12.6 8M9.6 12.6a3 3 0 1 1 4.6 2.4" />
    </>
  ),
  "p-thread": (
    <>
      <path d="M12 20.5c-4.7 0-8-3.4-8-8.5S7.3 3.5 12 3.5s8 3.4 8 8.5" />
      <path d="M9.2 13.4c0 1.7 1.4 2.6 3 2.6 2.2 0 3.4-1.6 3.4-4.4 0-1.8-1.2-3-3-3-1.4 0-2.6.6-3.2 1.6" />
    </>
  ),
  "p-sky": (
    <path d="M12 17c-2.2-3-5.5-5-6.6-7.7C4.6 7.4 5.7 5.5 7.6 6c1.6.4 3.3 2.4 4.4 4.6 1.1-2.2 2.8-4.2 4.4-4.6 1.9-.5 3 1.4 2.2 3.3C17.5 12 14.2 14 12 17Z" />
  ),
  "p-store": (
    <>
      <path d="M4 9.5h16V20H4Z" />
      <path d="M3.5 9.5 5 4.5h14l1.5 5M9.5 20v-5.5h5V20" />
    </>
  ),
};

export type IconName = keyof typeof PATHS;

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
  /** Render as a solid fill (used for star ratings). */
  filled?: boolean;
}

export default function Icon({ name, filled, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {PATHS[name]}
    </svg>
  );
}
