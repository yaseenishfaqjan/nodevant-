import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/contact/ContactForm";
import CalEmbed from "@/components/contact/CalEmbed";
import JsonLd from "@/components/ui/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact Nodevant | Book a Free AI Automation Strategy Call",
  description:
    "Get in touch with Nodevant. Book a free 30-minute strategy call to map your biggest automation opportunity, or send us a message about your project.",
  path: "/contact/",
  keywords: ["contact ai automation agency", "book automation consultation"],
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact/" },
        ])}
      />
      <PageHero
        eyebrow="Let's Talk"
        title={
          <>
            Book your free <span className="gradient-text">strategy call</span>
          </>
        }
        subtitle="Tell us what's slowing your team down. In 30 minutes we'll map your biggest opportunity and show you exactly what to automate first."
      />

      <section className="pb-24">
        <div className="container-x grid gap-8 lg:grid-cols-2">
          {/* Form */}
          <div>
            <ContactForm />

            <div className="mt-6 rounded-2xl border border-line bg-bg-soft p-6">
              <h2 className="font-display text-lg font-semibold text-ink">
                What happens on the call
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                <li className="flex gap-2">
                  <span className="text-cyan">✓</span> We map your biggest
                  automation opportunity and the system to fix it
                </li>
                <li className="flex gap-2">
                  <span className="text-cyan">✓</span> You get a clear ROI
                  estimate and timeline — no pitch
                </li>
                <li className="flex gap-2">
                  <span className="text-cyan">✓</span> If it&apos;s a fit, we
                  scope exactly what to build first
                </li>
              </ul>
              <p className="mt-4 text-sm text-faint">
                We reply within 4 hours on business days. Minimum project size
                starts around <span className="text-ink">$1,200</span>.
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-line bg-bg-soft p-6">
              <p className="text-sm text-faint">
                Prefer the fast path?{" "}
                <a href="/audit/" className="font-semibold text-cyan hover:underline">
                  Take the free 90-second audit
                </a>{" "}
                and walk into the call already knowing your ROI.
              </p>
              <p className="mt-3 text-sm text-faint">
                Or email us directly at{" "}
                <a
                  href={`mailto:${SITE.email}`}
                  className="font-semibold text-cyan hover:underline"
                >
                  {SITE.email}
                </a>
              </p>
            </div>
          </div>

          {/* Cal.com booking embed */}
          <div>
            <CalEmbed />
          </div>
        </div>

        {/* Find Us — local SEO / NAP */}
        <div className="container-x mt-12">
          <div className="grid gap-8 rounded-3xl border border-line bg-bg-soft p-8 lg:grid-cols-2 lg:p-10">
            <div>
              <h2 className="font-display text-2xl font-bold text-ink">Find us</h2>
              <p className="mt-3 text-muted">
                Remote-first — we serve clients across the US, UK, Canada,
                Australia, and worldwide.
              </p>
              <address className="mt-6 space-y-1 text-sm not-italic leading-relaxed text-muted">
                <div className="font-semibold text-ink">{SITE.name}</div>
                <div>{SITE.address.street}</div>
                <div>
                  {SITE.address.city}, {SITE.address.region} {SITE.address.postal}
                </div>
                <div>United States</div>
              </address>
              <dl className="mt-6 space-y-2 text-sm">
                <div className="flex gap-2">
                  <dt className="text-faint">Hours:</dt>
                  <dd className="text-ink">{SITE.hours}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-faint">Email:</dt>
                  <dd>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="font-semibold text-cyan hover:underline"
                    >
                      {SITE.email}
                    </a>
                  </dd>
                </div>
              </dl>
              <a
                href={SITE.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block text-sm font-semibold text-cyan hover:underline"
              >
                ⭐ Review us on Google →
              </a>
            </div>
            <div>
              <iframe
                src="https://www.google.com/maps?q=157+Everett+Sq,+McDonough,+GA+30252&output=embed"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: "12px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Nodevant office location — McDonough, GA"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
