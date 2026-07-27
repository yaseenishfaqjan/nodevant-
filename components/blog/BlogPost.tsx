import Link from "next/link";
import Icon from "@/components/ui/Icon";
import MeshThumb from "@/components/blog/MeshThumb";
import NewsletterForm from "@/components/blog/NewsletterForm";
import {
  formatPostDate,
  getBlogPost,
  splitTitle,
  type ArticleBlock,
  type BlogPost as BlogPostData,
} from "@/lib/blog-posts";

/** Renders the tiny inline syntax used in post bodies: [label](href) + **bold**. */
function Inline({ text }: { text: string }) {
  const nodes: React.ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[1]) {
      nodes.push(
        <Link key={k++} href={m[2]}>
          {m[1]}
        </Link>,
      );
    } else {
      nodes.push(<strong key={k++}>{m[3]}</strong>);
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return <>{nodes}</>;
}

function AuditCta() {
  return (
    <div
      className="not-prose my-10 rounded-2xl p-7"
      style={{
        border: "1px solid transparent",
        backgroundImage: "linear-gradient(var(--surface),var(--surface)),var(--gradient)",
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box,border-box",
      }}
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
        Run this math on your operation
      </div>
      <div className="mt-2.5 text-[16px] leading-relaxed text-body">
        The free 90-second audit maps your workflows, applies the ROI formula to your
        answers, and returns your highest-payback automation — no call required, no
        obligation.
      </div>
      <Link href="/#audit" className="btn-primary mt-5">
        Get My Free Audit
        <Icon name="chevron" className="h-4 w-4" strokeWidth={2.2} />
      </Link>
    </div>
  );
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "p":
      return (
        <p>
          <Inline text={block.text} />
        </p>
      );
    case "h2":
      return <h2>{block.text}</h2>;
    case "ul":
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item.slice(0, 40)}>
              <Inline text={item} />
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                {block.head.map((h, i) => (
                  <th key={i} scope="col">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r}>
                  {row.map((cell, c) => (
                    <td key={c}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "chips":
      return (
        <div className="not-prose my-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
            {block.label}
          </div>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {block.links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full px-4 text-[13px] font-medium text-ink transition-colors hover:text-cyan"
                style={{ background: "var(--tint)", border: "1px solid var(--chip-border)" }}
              >
                {l.label}
                <Icon name="chevron" className="h-3.5 w-3.5 text-cyan" strokeWidth={2.2} />
              </Link>
            ))}
          </div>
        </div>
      );
    case "cta":
      return <AuditCta />;
  }
}

export default function BlogPost({ post }: { post: BlogPostData }) {
  const [lead, grad] = splitTitle(post.title, post.gradientWords);
  const related = post.relatedPosts
    .map((slug) => getBlogPost(slug))
    .filter((p): p is BlogPostData => Boolean(p && p.published));

  return (
    <>
      {/* Hero */}
      <section className="grid-overlay relative overflow-hidden px-5 pb-10 pt-32 md:pt-40">
        <div className="pointer-events-none absolute inset-0 radial-glow" aria-hidden="true" />
        <div className="relative mx-auto max-w-[820px]">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint"
          >
            <Link href="/blog/" className="hover:text-ink">
              Blog
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink">{post.category}</span>
          </nav>
          <p className="eyebrow mt-6">
            {post.category} · {formatPostDate(post.date)} · {post.readMinutes} min read
          </p>
          <span className="rule mt-2.5 mb-4 block" />
          <h1 className="font-display text-[clamp(1.9rem,4.2vw,3.25rem)] font-extrabold leading-[1.12] tracking-[-0.035em] text-ink text-balance">
            {lead} <span className="gradient-text">{grad}</span>
          </h1>
          <div className="mt-6 flex items-center gap-3 border-y border-line py-4">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-full font-display text-sm font-bold text-white"
              style={{ background: "var(--gradient)" }}
            >
              N
            </span>
            <span className="text-sm text-faint">
              By the{" "}
              <Link href="/about/" className="font-semibold text-ink hover:text-cyan">
                Nodevant team
              </Link>{" "}
              · AI Automation Agency
            </span>
          </div>
          <MeshThumb
            variant={post.mesh}
            className="mt-8 h-[180px] rounded-2xl border border-line md:h-[240px]"
          />
        </div>
      </section>

      {/* Body */}
      <section className="px-5 pb-4">
        <div className="article mx-auto max-w-[760px]">
          {(post.body ?? []).map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>
      </section>

      {/* Keep reading */}
      {related.length > 0 && (
        <section className="px-5 py-14">
          <div className="mx-auto max-w-[820px] border-t border-line pt-10">
            <p className="eyebrow">Keep reading</p>
            <div className="mt-6 grid gap-3.5 sm:grid-cols-2">
              {related.map((r) => {
                const [rLead, rGrad] = splitTitle(r.title, r.gradientWords);
                return (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}/`}
                    className="card card-hover flex flex-col overflow-hidden text-body"
                  >
                    <MeshThumb variant={r.mesh} className="h-[110px]" />
                    <span className="flex flex-1 flex-col p-5">
                      <span className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-faint">
                        {r.category} · {r.readMinutes} min read
                      </span>
                      <span className="mt-2.5 font-display text-[16px] font-extrabold leading-[1.35] tracking-[-0.02em] text-ink">
                        {rLead} <span className="gradient-text">{rGrad}</span>
                      </span>
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[13.5px] font-semibold text-cyan">
                        Read article
                        <Icon name="chevron" className="h-3.5 w-3.5" strokeWidth={2.2} />
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="px-5 pb-16">
        <div
          className="mx-auto grid max-w-[820px] items-center gap-6 rounded-[20px] p-7 md:grid-cols-2 md:p-9"
          style={{
            border: "1px solid transparent",
            backgroundImage: "linear-gradient(var(--surface),var(--surface)),var(--gradient)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box,border-box",
            boxShadow: "0 18px 44px var(--glow)",
          }}
        >
          <div className="min-w-0">
            <h2 className="font-display text-[clamp(1.3rem,2.2vw,1.75rem)] font-extrabold leading-[1.2] tracking-[-0.025em] text-ink">
              Get the <span className="gradient-text">operator&apos;s memo.</span>
            </h2>
            <p className="mt-2.5 max-w-[420px] text-[14.5px] leading-relaxed text-faint">
              One post a week. Real numbers, no fluff. Unsubscribe anytime.
            </p>
          </div>
          <NewsletterForm sourcePage={`/blog/${post.slug}/`} />
        </div>
      </section>
    </>
  );
}
