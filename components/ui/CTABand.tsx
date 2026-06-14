import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

interface CTABandProps {
  title?: string;
  subtitle?: string;
}

/** Reusable audit/contact CTA band — internal linking to /audit/ on every page. */
export default function CTABand({
  title = "See your #1 automation opportunity in 90 seconds",
  subtitle = "Answer 7 quick questions and get a personalized ROI report — free, no email required to start.",
}: CTABandProps) {
  return (
    <section className="section-pad">
      <div className="container-x">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl border border-cyan/25 bg-brand-gradient-soft p-10 text-center md:p-14">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold leading-tight text-ink md:text-4xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">{subtitle}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/audit/" className="btn-primary text-lg">
                Get My Free Audit →
              </Link>
              <Link href="/contact/" className="btn-ghost text-lg">
                Book a Call
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
