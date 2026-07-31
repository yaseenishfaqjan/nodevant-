"use client";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/theme/ThemeProvider";
import { CAL_LINK } from "@/lib/site";

// Next.js inlines NEXT_PUBLIC_* at build time — this detects whether the env
// var was actually provided. CAL_LINK itself falls back to a default slug, so
// the direct link below always points somewhere sensible.
const CAL_ENV_SET = Boolean(process.env.NEXT_PUBLIC_CAL_LINK);

type EmbedState = "loading" | "ready" | "failed";

/**
 * Cal.com inline booking embed using Cal.com's OFFICIAL embed script.
 *
 * Why not a raw <iframe src="cal.com/...?embed=true">? Because cal.com serves
 * `X-Frame-Options: SAMEORIGIN`, so the browser refuses to frame it and you get
 * a broken-image box. The supported path is `app.cal.com/embed/embed.js`, which
 * renders into a container and is allowed to frame.
 *
 *  - Env var unset OR the booking link doesn't resolve (Cal fires `linkFailed`)
 *    → we show a clean direct-link card, never a broken embed.
 *  - `linkReady` clears the spinner; a 6s watchdog also reveals the fallback if
 *    Cal never answers, so a booking is always reachable.
 *  - The "Open the calendar directly" link renders ALWAYS, in every state.
 *  - The embed theme follows the site toggle (re-inlines on switch).
 */
export default function CalEmbed() {
  const { theme } = useTheme();
  const directUrl = `https://cal.com/${CAL_LINK}`;
  const [state, setState] = useState<EmbedState>(
    CAL_ENV_SET ? "loading" : "failed"
  );
  const eventsBound = useRef(false);

  useEffect(() => {
    if (!CAL_ENV_SET) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          "[CalEmbed] NEXT_PUBLIC_CAL_LINK is not set — rendering the direct calendar link only."
        );
      }
      return;
    }

    // Official Cal.com embed loader (idempotent — safe to call on every run).
    /* eslint-disable */
    (function (C: any, A: string, L: string) {
      let p = function (a: any, ar: any) {
        a.q.push(ar);
      };
      let d = C.document;
      C.Cal =
        C.Cal ||
        function () {
          let cal = C.Cal;
          let ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function () {
              p(api, arguments);
            };
            const namespace = ar[1];
            (api as any).q = (api as any).q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    const Cal = (window as any).Cal;
    /* eslint-enable */
    Cal("init", { origin: "https://cal.com" });

    // Bind global lifecycle events once.
    if (!eventsBound.current) {
      eventsBound.current = true;
      Cal("on", {
        action: "linkReady",
        callback: () => setState("ready"),
      });
      Cal("on", {
        action: "linkFailed",
        callback: () => setState("failed"),
      });
    }

    // Render the calendar into the (re-keyed) container.
    Cal("inline", {
      elementOrSelector: "#nodevant-cal-inline",
      calLink: CAL_LINK,
      layout: "month_view",
      config: { theme },
    });

    // Watchdog: if Cal never reports back, surface the direct-link fallback.
    const watchdog = setTimeout(() => {
      setState((s) => (s === "loading" ? "failed" : s));
    }, 6000);

    return () => clearTimeout(watchdog);
  }, [theme]);

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
        {/* Clean direct-link card whenever there is no working embed. */}
        {state === "failed" && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 p-6 text-center" style={{ background: "var(--bg)" }}>
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
        )}

        {/* Spinner while the official embed boots. */}
        {state === "loading" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
            <div className="h-9 w-9 animate-spin rounded-full border-2 border-line border-t-cyan" />
            <p className="text-sm text-faint">Loading scheduler…</p>
          </div>
        )}

        {/* Cal.com renders its (frame-allowed) iframe into this element.
            Re-keyed on theme so a toggle re-inlines with the new theme. */}
        {CAL_ENV_SET && (
          <div
            key={theme}
            id="nodevant-cal-inline"
            className="h-full min-h-[520px] w-full overflow-y-auto"
          />
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
