"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Portfolio brand logo. The gradient letter-mark shows by default; a logo from
 * /public/images/logos/<slug>.(webp|png|svg|jpg|jpeg) quietly loads behind it and
 * replaces the letter the moment it succeeds. If no file exists, the letter simply
 * stays — so there is never an empty tile or a broken-image icon.
 *
 * The ref effect handles browser-cached images (which are already `complete` on
 * mount, so their `onLoad` would never fire).
 */

const EXTENSIONS = ["webp", "png", "svg", "jpg", "jpeg"] as const;

export default function BrandLogo({
  slug,
  name,
  fallback,
  className = "max-h-full max-w-full object-contain",
}: {
  slug: string;
  name: string;
  fallback: string;
  className?: string;
}) {
  const [attempt, setAttempt] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  const exhausted = attempt >= EXTENSIONS.length;

  useEffect(() => {
    const img = ref.current;
    if (!img || !img.complete) return;
    if (img.naturalWidth > 0) setLoaded(true);
    else setAttempt((a) => a + 1); // cached-but-broken → try next extension
  }, [attempt]);

  return (
    <>
      {!loaded && <span className="gradient-text text-xl font-extrabold">{fallback}</span>}
      {!exhausted && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={ref}
          src={`/images/logos/${slug}.${EXTENSIONS[attempt]}`}
          alt={`${name} logo`}
          className={className}
          style={loaded ? undefined : { position: "absolute", width: 1, height: 1, opacity: 0 }}
          onLoad={() => setLoaded(true)}
          onError={() => setAttempt((a) => a + 1)}
        />
      )}
    </>
  );
}
