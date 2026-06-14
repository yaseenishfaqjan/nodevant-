"use client";
import { useEffect, useState } from "react";

interface ScoreGaugeProps {
  score: number; // 0-100
  label: string;
}

/** Semi-circular gauge. Lower score = more opportunity (warmer color). */
export default function ScoreGauge({ score, label }: ScoreGaugeProps) {
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    let raf = 0;
    let start: number | null = null;
    const duration = 1400;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setAnimated(Math.round(eased * score));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [score]);

  const radius = 90;
  const circumference = Math.PI * radius; // half circle
  const offset = circumference * (1 - animated / 100);

  // Color: low score => cyan (high opportunity), high score => violet
  const color = animated < 40 ? "#00D4FF" : animated < 70 ? "#5BA8FF" : "#9B5CFF";

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: 220, height: 130 }}>
        <svg width="220" height="130" viewBox="0 0 220 130">
          <path
            d="M 20 120 A 90 90 0 0 1 200 120"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="16"
            strokeLinecap="round"
          />
          <path
            d="M 20 120 A 90 90 0 0 1 200 120"
            fill="none"
            stroke={color}
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              transition: "stroke 0.4s ease",
              filter: `drop-shadow(0 0 10px ${color}80)`,
            }}
          />
        </svg>
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center">
          <span
            className="font-display text-5xl font-bold"
            style={{ color }}
          >
            {animated}
          </span>
          <span className="text-sm text-faint">out of 100</span>
        </div>
      </div>
      <span
        className="mt-3 rounded-full border px-4 py-1 text-sm font-semibold"
        style={{ color, borderColor: `${color}55`, background: `${color}11` }}
      >
        {label}
      </span>
    </div>
  );
}
