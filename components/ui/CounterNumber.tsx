"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CounterNumberProps {
  value: number;
  suffix?: string;
  duration?: number;
}

// useLayoutEffect on the client, no-op on the server (static export safe).
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Renders the REAL value in server/static markup (never 0 — so crawlers,
 * screen readers, and no-JS visitors see the true numbers). On the client,
 * the count-up from 0 runs purely as progressive enhancement, and is skipped
 * entirely when the user prefers reduced motion.
 */
export default function CounterNumber({
  value,
  suffix = "",
  duration = 1800,
}: CounterNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  // Initial render (SSR + hydration) shows the true value → no zeros in HTML.
  const [display, setDisplay] = useState(value);
  const [animate, setAnimate] = useState(false);

  // Before first paint on the client, drop to 0 so the count-up has a start
  // point — unless the visitor prefers reduced motion, in which case we leave
  // the real value untouched.
  useIsoLayoutEffect(() => {
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;
    setAnimate(true);
    setDisplay(0);
  }, []);

  useEffect(() => {
    if (!animate || !inView) return;
    let raf = 0;
    let start: number | null = null;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [animate, inView, value, duration]);

  return (
    <span ref={ref}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}
