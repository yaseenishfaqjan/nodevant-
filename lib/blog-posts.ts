// Unified blog architecture — single source for /blog, /blog/[slug], the RSS
// feed, the sitemap, and "Related reading" links on service subpages.
// Replaces the retired lib/content BLOG_POSTS + lib/articles ARTICLES split.
//
// Bodies are structured blocks (not JSX) so this stays a pure .ts data module;
// components/blog/BlogPost.tsx renders them. Inline syntax inside text/items:
//   [label](/path/)  → link        **text** → strong

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "chips"; label: string; links: { label: string; href: string }[] }
  | { type: "cta" };

export type BlogCategory =
  | "Guides"
  | "Comparisons"
  | "Trends"
  | "ROI"
  | "Voice AI"
  | "Lead Gen";

// "All" first — the hub renders this list directly as filter chips.
export const BLOG_CATEGORIES: readonly ["All", ...BlogCategory[]] = [
  "All",
  "Guides",
  "Comparisons",
  "Trends",
  "ROI",
  "Voice AI",
  "Lead Gen",
];

export interface BlogPost {
  slug: string;
  title: string;
  gradientWords: number; // trailing words of the title rendered in gradient
  category: BlogCategory;
  excerpt: string;
  date: string; // ISO — publish date (published) or planned date (coming soon)
  readMinutes: number;
  published: boolean;
  featured?: boolean;
  mesh: number; // gradient-mesh thumbnail variant (0–5)
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  relatedServices: string[]; // /services/[slug] — drives their "Related reading"
  relatedPosts: string[]; // post slugs; only published ones are rendered
  body?: ArticleBlock[]; // present only when published
}

export const BLOG_POSTS: BlogPost[] = [
  // ── Published ─────────────────────────────────────────────────────────
  {
    slug: "n8n-vs-make-vs-zapier",
    title: "n8n vs Make vs Zapier in 2026: which automation tool is right for you?",
    gradientWords: 4,
    category: "Comparisons",
    excerpt:
      "A head-to-head comparison of the three biggest automation platforms — pricing models, learning curve, self-hosting, and the point where a custom build beats all three.",
    date: "2026-05-21",
    readMinutes: 9,
    published: true,
    featured: true,
    mesh: 0,
    metaTitle: "n8n vs Make vs Zapier in 2026: Which Tool Is Right for You? | Nodevant",
    metaDescription:
      "An operator's comparison of n8n, Make and Zapier in 2026 — pricing models, learning curve, self-hosting, error handling, and when to reach for a custom build instead.",
    keywords: [
      "n8n vs make vs zapier",
      "automation tool comparison 2026",
      "n8n vs zapier",
      "make vs zapier",
      "workflow automation platforms",
    ],
    relatedServices: ["agentic-workflows"],
    relatedPosts: ["roi-of-workflow-automation-year-one", "voice-ai-agents-buyers-guide"],
    body: [
      {
        type: "p",
        text: "Every automation project starts with the same question: which platform do we build on? It sounds like a tooling decision. It's actually a decision about cost structure, maintenance, and who in your company can safely touch the thing once it's live.",
      },
      {
        type: "p",
        text: "We deploy on all three of these platforms — and replace all three with custom builds when they run out of road — so this is not a vendor pitch. It's the decision framework we use on real client work.",
      },
      { type: "h2", text: "The short version" },
      {
        type: "ul",
        items: [
          "**Zapier** gets a non-technical team to its first working automation fastest, and costs the most once volume grows.",
          "**Make** sits in the middle: a visual canvas with real branching and a pricing model that stays reasonable at moderate volume.",
          "**n8n** offers the most power and control — code steps, self-hosting, flat execution pricing — at the price of a steeper learning curve.",
          "**None of them** is the answer once your logic needs versioning, testing, or sub-second performance. That's custom territory.",
        ],
      },
      { type: "h2", text: "What each platform actually is" },
      {
        type: "p",
        text: "**Zapier** is the household name: 7,000+ app connectors and a linear trigger-action model. Its genius is that a marketing manager can wire a form to a spreadsheet in ten minutes without asking anyone for help. Its ceiling is that the linear model fights you the moment a workflow needs loops, branches, or non-trivial data transformation.",
      },
      {
        type: "p",
        text: "**Make** (formerly Integromat) is a visual canvas. Workflows are node graphs with routers, iterators, and aggregators, so genuinely complex flows are buildable without code. The trade is readability: a fifty-module Make scenario is powerful, and also the kind of artifact only its author fully understands.",
      },
      {
        type: "p",
        text: "**n8n** is the developer-grade option: source-available, self-hostable, with first-class code nodes and native AI-agent tooling. You can run it on your own infrastructure, keep customer data inside your own perimeter, and drop into JavaScript whenever a connector falls short.",
      },
      { type: "h2", text: "Head to head" },
      {
        type: "table",
        head: ["", "Zapier", "Make", "n8n"],
        rows: [
          ["Pricing unit", "Per task (each step, each record)", "Per operation", "Per execution (or flat, self-hosted)"],
          ["Learning curve", "Minutes", "Hours", "Days"],
          ["Self-hosting", "No", "No", "Yes"],
          ["Complex logic", "Limited", "Good", "Excellent — code when needed"],
          ["Error handling", "Basic replay", "Scenario-level handlers", "Full retry / branch / alert control"],
          ["Best for", "First automations, small teams", "Visual builders, mid volume", "Engineering-minded teams, data control"],
        ],
      },
      { type: "h2", text: "Pricing: where the bills diverge" },
      {
        type: "p",
        text: "The pricing models matter more than the sticker prices. Zapier bills per **task** — every step, for every record. Make bills per **operation**, which behaves similarly but at a lower unit price. n8n bills per **execution**: one workflow run counts once no matter how many steps it contains, and a self-hosted instance has no per-run metering at all — you pay for the server.",
      },
      {
        type: "p",
        text: "Run the numbers on a real workload and the divergence is dramatic. Say you enrich 10,000 leads a month through a six-step workflow. On Zapier that's 60,000 tasks — a mid-tier plan blown through before month's end. On Make it's 60,000 operations at a friendlier rate. On n8n it's 10,000 executions on a cloud plan, or effectively a fixed server bill if you self-host. Same workflow, order-of-magnitude different cost curve.",
      },
      {
        type: "p",
        text: "This is why \"which tool costs least?\" has no static answer. At ten runs a day, tooling cost is noise and Zapier's speed wins. At ten thousand, the platform choice is the difference between a rounding error and a five-figure annual line item.",
      },
      { type: "h2", text: "The 2026 wrinkle: AI inside the workflow" },
      {
        type: "p",
        text: "All three platforms now ship AI features, and the depth varies. Zapier's AI steps are great at the small stuff — drafting a reply, classifying a ticket — inside its linear model. Make lets you weave model calls through complex scenario logic. n8n goes furthest: native agent nodes with tool-calling, memory, and model routing, which is why it has become the default orchestration layer for teams building [agentic workflows](/services/agentic-workflows/) rather than sprinkling AI on top of old ones. If your roadmap includes agents that decide and act — not just generate text — that gap should weigh heavily.",
      },
      { type: "cta" },
      { type: "h2", text: "The deciding factor nobody prices in: maintenance" },
      {
        type: "p",
        text: "Automations are not fire-and-forget. APIs change, edge cases arrive, and the person who built the workflow leaves. The honest question is: **who fixes this at 9am on a Tuesday when it breaks?** If the answer is a non-technical operator, Zapier's simplicity is worth its premium. If you have (or hire) engineering support, n8n's inspectability — versionable JSON, code steps, real logs — makes failures diagnosable instead of mysterious.",
      },
      { type: "h2", text: "When none of them is the answer" },
      {
        type: "p",
        text: "All three platforms share a ceiling. When a workflow needs deterministic pricing logic, heavy data processing, sub-second response times, or an audit trail a regulator would accept, gluing modules together stops being engineering and starts being hope. That's the point where we move clients to a custom logic engine — real code, tested and versioned — usually still orchestrated by n8n at the edges.",
      },
      { type: "h2", text: "What we actually deploy" },
      {
        type: "p",
        text: "Our default is **n8n**, self-hosted, for the flat cost curve, the data control, and the AI-agent support — it's the orchestration layer under most of our client stacks and our own [Scalaro](/case-studies/scalaro/) sales system. We reach for **Make** when a client's own team will co-own a visually complex workflow, and we leave **Zapier** in place when it's already working and volume is low — ripping out a functioning automation to save a small subscription is bad math.",
      },
      {
        type: "p",
        text: "The tool matters less than the map. Pick the workflow with the highest hours-saved first, choose the platform that fits your volume and your team, and let the second workflow inherit the infrastructure of the first.",
      },
      {
        type: "chips",
        label: "Related on Nodevant",
        links: [
          { label: "Service: Agentic Workflows", href: "/services/agentic-workflows/" },
          { label: "Service: System Integration", href: "/services/system-integration/" },
          { label: "Case study: Scalaro", href: "/case-studies/scalaro/" },
        ],
      },
    ],
  },
  {
    slug: "roi-of-workflow-automation-year-one",
    title: "The real ROI of workflow automation in year one",
    gradientWords: 2,
    category: "ROI",
    excerpt:
      "The formula we run before writing a line of code: hours recovered, errors eliminated, speed-to-lead — minus the costs vendors don't mention. Real math, no hype.",
    date: "2026-06-11",
    readMinutes: 8,
    published: true,
    mesh: 1,
    metaTitle: "The Real ROI of Workflow Automation in Year One | Nodevant",
    metaDescription:
      "The exact formula for calculating workflow automation ROI in year one: hours recovered, error cost, speed-to-lead — and the maintenance costs vendors leave out.",
    keywords: [
      "workflow automation roi",
      "automation payback period",
      "roi of ai automation",
      "business process automation savings",
    ],
    relatedServices: ["system-integration", "complex-logic-engines"],
    relatedPosts: ["n8n-vs-make-vs-zapier", "voice-ai-agents-buyers-guide"],
    body: [
      {
        type: "p",
        text: "Automation vendors love the word \"transformative.\" We prefer arithmetic. Before we write a line of code for a client, we run one calculation — and if the number doesn't clear the bar, we tell them not to build. This is that calculation, in full, so you can run it yourself.",
      },
      { type: "h2", text: "The formula" },
      {
        type: "p",
        text: "Year-one return has three inputs on the gain side and three on the cost side:",
      },
      {
        type: "ul",
        items: [
          "**Hours recovered** — hours per week the workflow eliminates × the loaded hourly rate of the person doing it × 52.",
          "**Errors eliminated** — the annual cost of the mistakes manual handling produces: re-work, refunds, churned customers, compliance exposure.",
          "**Speed converted to revenue** — what responding in minutes instead of hours is worth in won deals and kept customers.",
        ],
      },
      {
        type: "ul",
        items: [
          "**Build cost** — the one-time project fee, whatever you pay a partner or your own team.",
          "**Tooling** — platform subscriptions, API usage, hosting. Typically tens to a few hundred dollars a month, not thousands.",
          "**Maintenance** — budget roughly 10–15% of build cost per year for API changes and edge cases. Anyone who quotes zero is selling something.",
        ],
      },
      {
        type: "p",
        text: "One definition matters before the arithmetic: use the **loaded** hourly rate, not salary. A $55,000 coordinator costs the business roughly $70,000 once payroll taxes, benefits, software seats, and overhead are counted — about $34–38 an hour, not $26. Undercount the rate and every automation looks worse than it is; it's the most common error in build-versus-don't decisions.",
      },
      { type: "h2", text: "A worked example" },
      {
        type: "p",
        text: "An operations coordinator spends 11 hours a week copying data between a CRM, a billing tool, and a spreadsheet. At a loaded rate of $38/hour, that's **$21,736 a year** spent on copy-paste — before counting a single typo. A [system integration](/services/system-integration/) that syncs those tools eliminates the task outright, and the coordinator's 11 hours go back into work that actually needs judgment.",
      },
      {
        type: "p",
        text: "Against a fixed one-time build and a modest tool subscription, that single workflow typically pays for itself inside the first one to two months. Everything after payback is margin — which is why the sequencing question (\"what do we automate first?\") matters more than the tooling question.",
      },
      {
        type: "table",
        head: ["Year-one ledger", "Manual", "Automated"],
        rows: [
          ["Hours on the task", "572 hrs (11/wk × 52)", "~26 hrs (exception handling)"],
          ["Labor cost at $38/hr loaded", "$21,736", "~$988"],
          ["Data-entry defects", "~250 (0.5% of 50k records)", "Near zero"],
          ["Sync delay", "Up to 3 days", "Real time"],
        ],
      },
      { type: "h2", text: "Where ROI hides beyond the timesheet" },
      {
        type: "p",
        text: "Hours are the visible return. Two quieter ones routinely dominate the math:",
      },
      {
        type: "p",
        text: "**Speed-to-lead.** A lead answered within minutes is dramatically more likely to become a conversation than one answered the next morning; every hour of delay costs winnable revenue that never shows up in a cost report. When [Fabrioza](/case-studies/fabrioza/) cut custom-manufacturing quotes from days to under 24 hours, the win wasn't saved admin time — it was the orders that stopped going to whoever quoted first.",
      },
      {
        type: "p",
        text: "**Error elimination.** A human keying 500 records a week at even a 1% slip rate produces five defects a week, and a wrong invoice or a mis-filed dispute costs far more to unwind than to prevent. Machines don't get bored on record 401.",
      },
      { type: "cta" },
      { type: "h2", text: "The payback curve, honestly" },
      {
        type: "p",
        text: "Year one is not a straight line. Months one and two carry the build cost and an adoption dip — people double-check the machine before they trust it, and edge cases surface that discovery missed. The steady state arrives around month three, and from there the return runs quietly every week. The silent killer is not the technology; it's adoption. A workflow the team routes around returns nothing, which is why we track usage after every deployment and treat \"the team stopped using it\" as a defect, not a client problem.",
      },
      {
        type: "p",
        text: "The second-order effect is where automation compounds: workflow two reuses the integrations, data model, and monitoring built for workflow one, so it costs less and pays back faster. Teams that sequence well end year one with three or four workflows running on infrastructure they paid for once.",
      },
      { type: "h2", text: "What doesn't pay back in year one" },
      {
        type: "ul",
        items: [
          "**Automating a broken process.** Encoding a bad workflow just produces bad outcomes faster. Fix the process, then automate it.",
          "**Edge-case-heavy work.** If every third instance needs human judgment, you'll build an expensive exception queue, not an automation.",
          "**Vanity automations.** A workflow that saves 20 minutes a month never repays serious build effort. Volume × frequency is the filter.",
        ],
      },
      { type: "h2", text: "Run the math before you build" },
      {
        type: "p",
        text: "The pattern across our deployments is consistent: the first well-chosen workflow clears payback in months, and the second one is cheaper because it inherits the infrastructure of the first. The discipline is choosing by arithmetic instead of excitement — highest hours × rate × error cost first, everything else after.",
      },
      {
        type: "p",
        text: "Our free audit runs exactly this formula against your answers to seven questions and returns the workflow with your fastest payback. If the math says \"don't build yet,\" it will tell you that too.",
      },
      {
        type: "chips",
        label: "Related on Nodevant",
        links: [
          { label: "Service: System Integration", href: "/services/system-integration/" },
          { label: "Service: Complex Logic Engines", href: "/services/complex-logic-engines/" },
          { label: "Case study: Fabrioza", href: "/case-studies/fabrioza/" },
        ],
      },
    ],
  },
  {
    slug: "voice-ai-agents-buyers-guide",
    title: "Voice AI agents: a practical build-versus-buy guide",
    gradientWords: 2,
    category: "Voice AI",
    excerpt:
      "Modern voice agents answer, qualify, and book without a human on the line. Here's how to decide between a packaged product and a custom build — and what each really costs.",
    date: "2026-07-02",
    readMinutes: 8,
    published: true,
    mesh: 2,
    metaTitle: "Voice AI Agents: A Practical Build-vs-Buy Guide | Nodevant",
    metaDescription:
      "A practical buyer's guide to voice AI agents in 2026: what they can do, packaged product vs custom build, per-minute cost anatomy, and the questions to ask before going live.",
    keywords: [
      "voice ai agents",
      "ai phone agent",
      "ai receptionist build vs buy",
      "vapi retell comparison",
      "voice ai for business",
    ],
    relatedServices: ["ai-voice-agents"],
    relatedPosts: ["n8n-vs-make-vs-zapier", "roi-of-workflow-automation-year-one"],
    body: [
      {
        type: "p",
        text: "Two years ago, AI phone agents were a demo: impressive for ninety seconds, unusable in production. In 2026 they cross the bar that matters — sub-second responses, graceful interruption handling, and voices callers stop noticing. The question is no longer whether voice agents work. It's whether you buy a packaged product or build on a platform.",
      },
      { type: "h2", text: "What a modern voice agent actually does" },
      {
        type: "ul",
        items: [
          "Answers every inbound call, at 2pm or 2am, without hold music.",
          "Qualifies the caller against your criteria and captures structured data, not just a transcript.",
          "Books directly into live calendar availability and writes the record to your CRM.",
          "Returns missed calls within minutes, while the lead still remembers dialing you.",
          "Escalates to a human the moment a conversation warrants one — with context attached.",
        ],
      },
      {
        type: "p",
        text: "Those last two items are the tell. A voice agent that can talk but can't **act** — check a calendar, create a record, hand off cleanly — is a novelty answering machine.",
      },
      {
        type: "p",
        text: "What changed technically is latency and turn-taking. Older systems took two to three seconds to respond, which callers read as a broken line. Current production stacks stream transcription, model, and voice in parallel and respond in well under a second, handle a caller talking over them mid-sentence, and recover from background noise. That's the difference between \"impressive demo\" and something you'd let answer a customer at 2am.",
      },
      { type: "h2", text: "The buy option: packaged AI receptionists" },
      {
        type: "p",
        text: "A wave of subscription products will put an AI receptionist on your number this week. They're genuinely good at the narrow case: answer, take a message, capture a callback number. Setup is self-serve, pricing is a flat monthly fee, and for a solo operator that's often exactly enough.",
      },
      {
        type: "p",
        text: "The limits show up at the edges. Scripts are configurable only within the vendor's template. Integrations are whatever the vendor shipped — if your scheduling tool or CRM isn't on the list, you're exporting CSVs. And your call data lives in their system, on their retention terms.",
      },
      { type: "h2", text: "The build option: platforms like Vapi and Retell" },
      {
        type: "p",
        text: "Underneath every voice agent is the same pipeline: speech-to-text, a language model deciding what to say and do, text-to-speech, and telephony. Orchestration platforms like Vapi and Retell expose that pipeline directly, which means a built agent can run **your** call logic — mid-call lookups against your systems, custom qualification branches, your brand's voice, escalation rules you define.",
      },
      {
        type: "p",
        text: "The trade is that someone has to build and tune it: prompt design, tool wiring, latency budgets, failure handling. This is exactly the layer we deploy for clients — it's what answers for [Fairway360](/case-studies/fairway360/) and what powers the missed-call recovery in our [home services stack](/solutions/home-services/).",
      },
      { type: "h2", text: "Cost anatomy" },
      {
        type: "p",
        text: "Packaged products bill a flat monthly subscription. Built agents bill by usage: as of early 2026 a production stack — transcription, model, voice, and telephony combined — typically lands somewhere around $0.10–$0.30 per connected minute, plus the one-time build. The crossover math is straightforward: low call volume favors a subscription; meaningful volume with integration needs favors owning the stack, because per-minute costs keep falling while subscription tiers don't.",
      },
      {
        type: "p",
        text: "There's also a migration path most buyers miss: these aren't mutually exclusive forever. Plenty of businesses start with a packaged receptionist to stop the bleeding — every missed call is a competitor's booked job — then graduate to a built agent once call volume and integration needs justify it. The scripts, objection patterns, and escalation rules learned in phase one transfer directly into the custom build.",
      },
      { type: "cta" },
      { type: "h2", text: "Questions to ask before anything answers your phone" },
      {
        type: "ul",
        items: [
          "**Latency:** are responses consistently under a second? Anything slower reads as broken to a caller.",
          "**Interruption:** can a caller talk over it mid-sentence and be heard? Barge-in handling separates production systems from demos.",
          "**Action:** can it book into real availability and write to your actual CRM, or does it only take messages?",
          "**Escalation:** what triggers a human handoff, and does the human receive the context or start cold?",
          "**Compliance:** are recording disclosures and consent handled correctly for your jurisdiction?",
          "**Failure mode:** when the model or carrier hiccups, does the call ring through to a person or dead-end?",
        ],
      },
      { type: "h2", text: "When not to deploy one" },
      {
        type: "p",
        text: "Skip voice AI if your call volume is a handful a day and a human answers reliably — the math isn't there yet. Skip it for conversations that are genuinely high-stakes and emotional; an agent should route those to a person immediately, not attempt them. And never deploy one that impersonates a human. Callers don't mind talking to a good system. They mind being deceived by one.",
      },
      { type: "h2", text: "Where we land" },
      {
        type: "p",
        text: "Buy a packaged receptionist when you need basic coverage this week and your tools are on the vendor's list. Build when the agent has to participate in your operation — booking, qualifying, syncing, escalating. The businesses getting real returns treat the voice agent as the front door to an automated workflow, not as a gadget bolted onto the phone line.",
      },
      {
        type: "chips",
        label: "Related on Nodevant",
        links: [
          { label: "Service: AI Voice Agents", href: "/services/ai-voice-agents/" },
          { label: "Solution: Home Services Stack", href: "/solutions/home-services/" },
          { label: "Case study: Fairway360", href: "/case-studies/fairway360/" },
        ],
      },
    ],
  },

  // ── Coming soon (rendered as graceful fallback pages, noindexed) ──────
  {
    slug: "what-is-an-ai-automation-agency",
    title: "What is an AI automation agency, and do you need one?",
    gradientWords: 3,
    category: "Guides",
    excerpt:
      "A plain-English breakdown of what AI automation agencies do, how they compare to hiring in-house, and how to know if your business is ready.",
    date: "2026-08-05",
    readMinutes: 8,
    published: false,
    mesh: 3,
    metaTitle: "What Is an AI Automation Agency? | Nodevant",
    metaDescription:
      "What AI automation agencies do, how they compare to hiring in-house, and how to know if your business is ready. Coming soon on the Nodevant blog.",
    keywords: ["ai automation agency", "hire automation agency", "automation consulting"],
    relatedServices: [],
    relatedPosts: ["n8n-vs-make-vs-zapier", "roi-of-workflow-automation-year-one"],
  },
  {
    slug: "ai-agents-for-business",
    title: "How AI agents are replacing entire business functions",
    gradientWords: 2,
    category: "Trends",
    excerpt:
      "From SDRs to support teams, autonomous agents are taking over whole workflows. What's actually possible today — and what's still marketing.",
    date: "2026-08-19",
    readMinutes: 9,
    published: false,
    mesh: 4,
    metaTitle: "How AI Agents Are Replacing Entire Business Functions | Nodevant",
    metaDescription:
      "Autonomous AI agents are taking over whole workflows, from sales development to support. What's real and what's marketing. Coming soon on the Nodevant blog.",
    keywords: ["ai agents for business", "autonomous agents", "agentic workflows"],
    relatedServices: [],
    relatedPosts: ["voice-ai-agents-buyers-guide", "n8n-vs-make-vs-zapier"],
  },
  {
    slug: "how-to-automate-lead-generation",
    title: "Automating lead generation end to end: the full blueprint",
    gradientWords: 2,
    category: "Lead Gen",
    excerpt:
      "A step-by-step blueprint for an AI lead engine that captures, enriches, scores, and follows up with prospects while your team sleeps.",
    date: "2026-09-02",
    readMinutes: 11,
    published: false,
    mesh: 5,
    metaTitle: "Automating Lead Generation End to End | Nodevant",
    metaDescription:
      "The full blueprint for an AI lead engine: capture, enrichment, scoring and automated follow-up. Coming soon on the Nodevant blog.",
    keywords: ["automate lead generation", "ai lead generation", "lead gen pipeline"],
    relatedServices: [],
    relatedPosts: ["roi-of-workflow-automation-year-one", "n8n-vs-make-vs-zapier"],
  },
];

export const PUBLISHED_POSTS = BLOG_POSTS.filter((p) => p.published);

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

/** Published post to surface as "Related reading" on a /services/[slug] page. */
export function getPostForService(serviceSlug: string): BlogPost | undefined {
  return PUBLISHED_POSTS.find((p) => p.relatedServices.includes(serviceSlug));
}

// Old article slugs that were renamed in the V2 ship. Each renders a tiny
// redirect stub (static export has no server redirects) pointing at the new URL.
export const LEGACY_BLOG_REDIRECTS: Record<string, string> = {
  "workflow-automation-roi": "roi-of-workflow-automation-year-one",
  "voice-ai-agents-customer-support": "voice-ai-agents-buyers-guide",
};

/** Splits a title so the trailing `n` words render in the brand gradient. */
export function splitTitle(title: string, n: number): [string, string] {
  const words = title.split(" ");
  if (words.length <= n) return [title, ""];
  return [
    words.slice(0, words.length - n).join(" "),
    words.slice(words.length - n).join(" "),
  ];
}

export function formatPostDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
