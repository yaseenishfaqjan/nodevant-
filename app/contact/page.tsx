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
      </section>
    </>
  );
}
