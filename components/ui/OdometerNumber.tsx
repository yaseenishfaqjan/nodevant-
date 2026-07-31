"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Rolling-digit odometer used by the Live ROI Ticker, the /pricing meter and the
 * /audit results ROI tiles.
 *
 * Machine-readability first: the server render AND the first client paint output
 * the PLAIN number as a single text node, so crawlers and LLMs (which read raw
 * DOM text, not CSS transforms) extract the true figure — not the 0–9 digit
 * strips. Only after mount do we swap in the rolling-digit animation (decorative;
 * the accessible value rides on aria-label). Reduced-motion users keep the plain
 * number permanently.
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
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // SSR + first paint + reduced motion → plain, fully crawlable number.
  if (reduce || !mounted) {
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
