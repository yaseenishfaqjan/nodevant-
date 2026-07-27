"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

/**
 * Client-side redirect stub for renamed article slugs. The site is a static
 * export (no server redirects), so old indexed URLs render this tiny page,
 * which is noindexed + canonicaled to the new URL and replaces itself
 * immediately. The visible link is the no-JS fallback.
 */
export default function LegacyRedirect({ href }: { href: string }) {
  const router = useRouter();

  useEffect(() => {
    router.replace(href);
  }, [router, href]);

  return (
    <section className="px-5 pb-24 pt-40">
      <div className="mx-auto max-w-[620px] text-center">
        <p className="eyebrow">This article moved</p>
        <p className="mt-4 text-[16px] leading-relaxed text-body">
          Taking you to the updated version…
        </p>
        <Link href={href} className="btn-primary mt-6">
          Continue to the article
        </Link>
      </div>
    </section>
  );
}
