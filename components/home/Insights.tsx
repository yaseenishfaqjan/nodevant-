import Link from "next/link";
import Icon from "@/components/ui/Icon";
import SectionHead from "@/components/ui/SectionHead";

const POSTS = [
  {
    href: "/blog/n8n-vs-make-vs-zapier",
    meta: "6 min read",
    title: "n8n vs Make vs Zapier: what we actually deploy",
    grad: "radial-gradient(circle at 22% 28%, var(--accent-1) 0%, transparent 55%), radial-gradient(circle at 78% 68%, var(--accent-2) 0%, transparent 55%), linear-gradient(140deg, var(--surface-2), var(--surface))",
  },
  {
    href: "/blog/voice-ai-agents-buyers-guide/",
    meta: "8 min read",
    title: "Voice AI receptionists: a practical buyer's guide",
    grad: "radial-gradient(circle at 70% 25%, var(--accent-2) 0%, transparent 55%), radial-gradient(circle at 25% 75%, var(--accent-1) 0%, transparent 55%), linear-gradient(140deg, var(--surface-2), var(--surface))",
  },
  {
    href: "/blog/what-is-an-ai-automation-agency",
    meta: "4 min read",
    title: "The 90-second automation audit, explained",
    grad: "radial-gradient(circle at 50% 20%, var(--accent-1) 0%, transparent 50%), radial-gradient(circle at 85% 80%, var(--accent-2) 0%, transparent 50%), linear-gradient(140deg, var(--surface-2), var(--surface))",
  },
];

export default function Insights() {
  return (
    <section id="insights" className="section-gap border-t border-line px-5">
      <div className="mx-auto max-w-[1280px]">
        <SectionHead
          eyebrow="Insights"
          title={<>Automation, <span className="gradient-text">explained plainly.</span></>}
        />
        <div className="mt-11 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((p) => (
            <Link key={p.href} href={p.href} className="card card-hover flex flex-col overflow-hidden text-body">
              <span aria-hidden="true" className="block h-[150px] opacity-85" style={{ backgroundImage: p.grad }} />
              <span className="flex flex-col p-[22px]">
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-faint">{p.meta}</span>
                <span className="my-3 font-display text-[17px] font-extrabold leading-[1.35] tracking-[-0.02em] text-ink">
                  {p.title}
                </span>
                <span className="mt-auto inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-cyan">
                  Read more
                  <Icon name="chevron" className="h-3.5 w-3.5" strokeWidth={2.2} />
                </span>
              </span>
            </Link>
          ))}
        </div>
        <Link href="/blog/" className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan">
          View all articles
          <Icon name="chevron" className="h-[15px] w-[15px]" strokeWidth={2.2} />
        </Link>
      </div>
    </section>
  );
}
