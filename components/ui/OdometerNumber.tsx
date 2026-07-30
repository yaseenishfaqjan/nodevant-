"use client";

import { useReducedMotion } from "framer-motion";

/**
 * Rolling-digit odometer used by the Live ROI Ticker, the /pricing meter and the
 * /audit results ROI tiles. Each digit is a 0–9 column translated to its value, so
 * the TRUE number renders in static/SSR markup (crawlers + no-JS see real digits)
 * and the roll animates purely as enhancement when the `value` prop changes.
 * Reduced-motion users get a plain gradient number with no transform.
 */

const gradText: React.CSSProperties = {
  background: "var(--gradient)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

export default function OdometerNumber({
  value,
  className,
}: {
  value: string | number;
  className?: string;
}) {
  const str = String(value);
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <span className={className} style={gradText}>
        {str}
      </span>
    );
  }

  return (
    <span
      className={className}
      style={{ display: "inline-flex" }}
      role="text"
      aria-label={str}
    >
      {str.split("").map((ch, i) => {
        if (!/\d/.test(ch)) {
          return (
            <span
              key={`c${i}`}
              aria-hidden="true"
              style={{ ...gradText, whiteSpace: "pre" }}
            >
              {ch}
            </span>
          );
        }
        const d = Number(ch);
        return (
          <span
            key={`d${i}`}
            aria-hidden="true"
            style={{ display: "inline-block", overflow: "hidden", height: "1em" }}
          >
            <span
              style={{
                display: "block",
                transform: `translateY(-${d}em)`,
                transition: "transform 400ms cubic-bezier(0.22,1,0.36,1)",
                transitionDelay: `${i * 30}ms`,
              }}
            >
              {Array.from({ length: 10 }, (_, n) => (
                <span
                  key={n}
                  style={{ display: "block", height: "1em", lineHeight: 1, ...gradText }}
                >
                  {n}
                </span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}
