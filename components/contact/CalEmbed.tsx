"use client";
import { useEffect, useState } from "react";
import { useTheme } from "@/components/theme/ThemeProvider";
import { CAL_LINK } from "@/lib/site";

// Next.js inlines NEXT_PUBLIC_* at build time — this detects whether the env
// var was actually provided. CAL_LINK itself falls back to a default slug, so
// the direct link below always points somewhere sensible.
const CAL_ENV_SET = Boolean(process.env.NEXT_PUBLIC_CAL_LINK);

/**
 * Cal.com inline booking embed. Single source of truth for the booking URL is
 * NEXT_PUBLIC_CAL_LINK (CAL_LINK).
 *  - Env var unset → no iframe: direct-link card only + dev console warning.
 *  - Embed slow/blocked → "Loading" overlay clears on load OR after a timeout
 *    and surfaces the direct link, so a broken embed can never block a booking.
 *  - The "Open the calendar directly" link renders ALWAYS, in every state.
 *  - The iframe theme follows the site toggle (re-mounts on switch).
 */
export default function CalEmbed() {
  const { theme } = useTheme();
  const [loaded, setLoaded] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const directUrl = `https://cal.com/${CAL_LINK}`;
  const embedUrl = `${directUrl}?embed=true&theme=${theme}`;

  useEffect(() => {
    if (!CAL_ENV_SET && process.env.NODE_ENV !== "production") {
      console.warn(
        "[CalEmbed] NEXT_PUBLIC_CAL_LINK is not set — rendering the direct calendar link only."
      );
    }
    // Never let the overlay hang: reveal the fallback after 3.5s regardless.
    const t = setTimeout(() => setTimedOut(true), 3500);
    return () => clearTimeout(t);
  }, []);

  const showFallbackOverlay = CAL_ENV_SET && timedOut && !loaded;

  return (
    <div className="card flex min-h-[560px] flex-col p-4">
      <div className="px-3 pb-3 pt-2">
        <h2 className="font-display text-[22px] font-extrabold tracking-[-0.02em] text-ink">
          Pick a time
        </h2>
        <p className="mt-1 text-sm text-faint">
          Choose a slot that works for you — calls are 30 minutes, no commitment.
        </p>
      </div>

      <div className="relative flex-1 overflow-hidden rounded-2xl border border-line bg-bg transition-colors duration-300">
        {!CAL_ENV_SET ? (
          // Env var not configured — direct link only, no dead iframe.
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
            <p className="max-w-xs text-sm text-body">
              Our live scheduler opens in a new tab — same calendar, same times.
            </p>
            <a
              href={directUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Open the calendar directly ↗
            </a>
          </div>
        ) : (
          <>
            {!loaded && !showFallbackOverlay && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
                <div className="h-9 w-9 animate-spin rounded-full border-2 border-line border-t-cyan" />
                <p className="text-sm text-faint">Loading scheduler…</p>
              </div>
            )}

            {showFallbackOverlay && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 p-6 text-center" style={{ background: "var(--bg)" }}>
                <p className="max-w-xs text-sm text-body">
                  The scheduler is taking a moment. You can open it directly —
                  same calendar, same times.
                </p>
                <a
                  href={directUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Open the calendar directly ↗
                </a>
              </div>
            )}

            <iframe
              key={theme}
              src={embedUrl}
              title="Book a strategy call with Nodevant"
              loading="lazy"
              onLoad={() => setLoaded(true)}
              className="h-full min-h-[520px] w-full"
              style={{ border: 0 }}
            />
          </>
        )}
      </div>

      {/* Always-visible fallback — never hidden, in any widget state */}
      <p className="px-3 pt-3 text-center text-xs text-faint">
        Widget not loading?{" "}
        <a
          href={directUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-cyan hover:underline"
        >
          Open the calendar directly ↗
        </a>
      </p>
    </div>
  );
}
