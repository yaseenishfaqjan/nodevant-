"use client";
import { useTheme } from "./ThemeProvider";

/** Sun/moon switch — matches the prototype's 52×28 pill toggle. */
export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const light = theme === "light";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={light}
      aria-label={light ? "Switch to dark theme" : "Switch to light theme"}
      onClick={toggle}
      className="relative h-7 w-[52px] flex-shrink-0 rounded-full border p-0 transition-colors duration-300"
      style={{
        background: "var(--surface-2)",
        borderColor: "var(--border-strong)",
      }}
    >
      {/* Sun (visible in dark mode, i.e. click to go light) */}
      <span
        aria-hidden="true"
        className="absolute left-2 top-1/2 flex -translate-y-1/2 transition-all duration-300"
        style={{
          color: "var(--text-strong)",
          opacity: light ? 0 : 0.75,
          transform: light
            ? "translateY(-50%) rotate(90deg)"
            : "translateY(-50%) rotate(0deg)",
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2.5v2.2M12 19.3v2.2M21.5 12h-2.2M4.7 12H2.5M18.4 5.6 16.9 7.1M7.1 16.9l-1.5 1.5M18.4 18.4l-1.5-1.5M7.1 7.1 5.6 5.6" />
        </svg>
      </span>
      {/* Moon (visible in light mode) */}
      <span
        aria-hidden="true"
        className="absolute right-2 top-1/2 flex -translate-y-1/2 transition-all duration-300"
        style={{
          color: "var(--text-strong)",
          opacity: light ? 0.75 : 0,
          transform: light
            ? "translateY(-50%) rotate(0deg)"
            : "translateY(-50%) rotate(-90deg)",
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 14.2A8.4 8.4 0 0 1 9.8 4 8.5 8.5 0 1 0 20 14.2Z" />
        </svg>
      </span>
      {/* Knob */}
      <span
        aria-hidden="true"
        className="absolute top-[3px] h-5 w-5 rounded-full transition-all duration-300"
        style={{
          left: light ? "27px" : "3px",
          background: "var(--gradient)",
          boxShadow: "0 2px 8px var(--glow)",
        }}
      />
    </button>
  );
}
