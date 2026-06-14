"use client";
import { useState } from "react";
import { CAL_LINK } from "@/lib/site";

/**
 * Cal.com inline booking embed via iframe (works on static hosting, no deps).
 * Set NEXT_PUBLIC_CAL_LINK to your real Cal.com link to go live.
 */
export default function CalEmbed() {
  const [loaded, setLoaded] = useState(false);
  const src = `https://cal.com/${CAL_LINK}?embed=true&theme=dark`;

  return (
    <div className="glow-card flex min-h-[560px] flex-col !p-4">
      <div className="px-3 pb-3 pt-2">
        <h2 className="font-display text-2xl font-bold text-ink">Pick a time</h2>
        <p className="mt-1 text-sm text-muted">
          Choose a slot that works for you — calls are 30 minutes, no commitment.
        </p>
      </div>

      <div className="relative flex-1 overflow-hidden rounded-2xl border border-line bg-bg">
        {!loaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
            <div className="h-9 w-9 animate-spin rounded-full border-2 border-line border-t-cyan" />
            <p className="text-sm text-faint">Loading scheduler…</p>
          </div>
        )}
        <iframe
          src={src}
          title="Book a strategy call with Nodevant"
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className="h-full min-h-[520px] w-full"
          style={{ border: 0 }}
        />
      </div>

      <p className="px-3 pt-3 text-center text-xs text-faint">
        Trouble booking?{" "}
        <a
          href={`https://cal.com/${CAL_LINK}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-cyan hover:underline"
        >
          Open the scheduler in a new tab →
        </a>
      </p>
    </div>
  );
}
