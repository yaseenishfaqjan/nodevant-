import Icon from "@/components/ui/Icon";
import SectionHead from "@/components/ui/SectionHead";

const FAQS = [
  { q: "How fast until my first automation is live?", a: "Most systems go live 1–3 weeks after the audit. Simple workflows ship in days." },
  { q: "Do you work with clients outside the US?", a: "Yes — worldwide, across every timezone. Deployed systems run 24/7 regardless of geography." },
  { q: "What tools do you build on?", a: "n8n, Make, OpenAI and VAPI, wired into the CRM and stack you already run." },
  { q: "What does it cost?", a: "Fixed project pricing quoted after the free audit. No hourly billing." },
  { q: "What if it breaks?", a: "Monitoring and support are included. We catch and fix drift before you notice it." },
  { q: "Do I need technical staff?", a: "No. We handle build, deployment and maintenance end to end." },
  { q: "Which social platforms can you automate?", a: "All the majors — Instagram, Facebook, X, LinkedIn, TikTok, YouTube, Pinterest, Threads, Bluesky and Google Business. Connect 3 accounts or 10; every post is human-approved before it ships." },
];

export default function FAQ() {
  return (
    <section id="faq" className="section-gap border-t border-line px-5">
      <div className="mx-auto max-w-[880px]">
        <SectionHead
          eyebrow="FAQ"
          title={<>Answered <span className="gradient-text">before you ask.</span></>}
        />
        <div className="mt-10 flex flex-col gap-2.5">
          {FAQS.map((f) => (
            <details key={f.q} className="card">
              <summary className="flex min-h-[56px] items-center justify-between gap-4 px-[22px] py-[19px] text-base font-semibold text-ink">
                {f.q}
                <Icon name="chevron" data-chev className="h-[18px] w-[18px] flex-shrink-0 text-cyan transition-transform" strokeWidth={1.8} />
              </summary>
              <p className="px-[22px] pb-5 text-[14.5px] leading-relaxed text-faint">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
