import Link from "next/link";

interface ArticleCTAProps {
  text?: string;
  button?: string;
}

/** Inline audit CTA block used mid- and end-article. */
export default function ArticleCTA({
  text = "Not sure if automation is right for your business? Take our free 90-second audit. Answer 7 questions and get a personalized report showing your biggest automation opportunity and estimated ROI.",
  button = "Take the Free Audit →",
}: ArticleCTAProps) {
  return (
    <div className="my-10 rounded-2xl border border-cyan/25 bg-brand-gradient-soft p-7 not-prose">
      <p className="text-[17px] leading-relaxed text-ink">{text}</p>
      <Link href="/audit/" className="btn-primary mt-5">
        {button}
      </Link>
    </div>
  );
}
