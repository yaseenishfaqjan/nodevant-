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
  mesh: number; // gradient-mesh thumbnail variant (0–5) — fallback when no cover
  cover?: string; // real cover art, e.g. "/images/blog/<slug>.webp"; mesh used if omitted
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
    slug: "how-much-does-an-ai-automation-agency-cost",
    title: "How much does an AI automation agency cost?",
    gradientWords: 1,
    category: "Guides",
    excerpt:
      "A plain-English breakdown of what AI automation actually costs in 2026 — the one-time build, the monthly plan and the usage — plus the price ranges by project type and how to tell a fair quote from a bad one.",
    date: "2026-08-01",
    readMinutes: 7,
    published: true,
    mesh: 2,
    metaTitle: "How Much Does an AI Automation Agency Cost in 2026? | Nodevant",
    metaDescription:
      "What an AI automation agency costs in 2026: one-time build, monthly plan and usage, with real price ranges by project type and how to spot a fair quote.",
    keywords: [
      "how much does an ai automation agency cost",
      "ai automation agency cost",
      "ai automation pricing",
      "ai automation cost",
      "ai agency pricing 2026",
    ],
    relatedServices: ["agentic-workflows", "ai-voice-agents"],
    relatedPosts: [
      "roi-of-workflow-automation-year-one",
      "n8n-vs-make-vs-zapier",
    ],
    body: [
      {
        type: "p",
        text: "It's the first question every buyer asks and the one most agencies dodge until a sales call. So here it is straight: what AI automation actually costs in 2026, what you're paying for, and how to tell a fair quote from an inflated one.",
      },
      { type: "h2", text: "The short answer" },
      {
        type: "p",
        text: "A single, well-scoped automation starts around **$1,800**. A custom AI agent or [voice receptionist](/solutions/ai-receptionist/) typically runs **$2,800–$15,000+** to build, depending on complexity. Larger multi-workflow systems for mid-market teams run **$25,000 and up**. On top of the build, expect a **monthly plan** for running, monitoring and tuning — and small **usage** costs (API calls, voice minutes).",
      },
      { type: "h2", text: "The three things you're actually paying for" },
      {
        type: "ul",
        items: [
          "**One-time build** — scoping, building, integrating and testing the automation. Paid once, up front. This is the number most quotes lead with.",
          "**Monthly plan** — the running system plus monitoring, maintenance and tuning. Priced to your volume; a low-volume local business pays far less than a high-volume operation.",
          "**Usage** — the underlying infrastructure: API calls, model tokens, and voice at roughly $0.08–$0.20 per connected minute. It's metered, so you only pay for what actually runs.",
        ],
      },
      {
        type: "p",
        text: "Anyone quoting a single all-in number is bundling these three. That's fine — but ask which is which, so you can compare quotes and know what scales with your growth.",
      },
      { type: "h2", text: "Typical 2026 price ranges by project" },
      {
        type: "table",
        head: ["Project type", "One-time build", "Runs monthly"],
        rows: [
          ["Single workflow automation", "$1,800 – $4,500", "Tooling only, ~$20–$200"],
          ["AI voice agent / receptionist", "$2,800 – $15,000+", "Plan + per-minute usage"],
          ["Custom AI agent (single process)", "$8,000 – $25,000", "Plan + API usage"],
          ["Multi-workflow / mid-market system", "$25,000+", "Plan scaled to volume"],
          ["DIY point tool (no agency)", "—", "$49 – $95 + usage"],
        ],
      },
      { type: "h2", text: "What moves your price up or down" },
      {
        type: "ul",
        items: [
          "**Complexity** — how many decisions and edge cases the automation has to handle. A linear flow is cheap; branching logic and judgment calls cost more.",
          "**Integrations** — every tool it has to connect to (CRM, calendar, billing, telephony) adds build time. Standard tools are quick; a legacy system with no API is not.",
          "**Volume** — higher call and transaction volume raises the monthly plan and usage, not the build.",
          "**Compliance** — regulated work (finance, healthcare, legal) needs extra safeguards, audit trails and review, which is time.",
        ],
      },
      { type: "h2", text: "DIY tool, agency, or in-house hire?" },
      {
        type: "p",
        text: "A DIY point tool is cheapest if a generic template happens to fit you. An agency build costs more up front but is shaped to your exact process, integrations and edge cases — and someone owns it when a tool updates and it breaks. Hiring in-house only pays off once you have enough automation work to keep an engineer busy full time. For most small and growth-stage businesses, the agency build wins the moment missed or mishandled work is costing real revenue — which is exactly what the [ROI calculator](/resources/automation-roi-calculator/) is for.",
      },
      { type: "h2", text: "How to tell a fair quote from a bad one" },
      {
        type: "ul",
        items: [
          "It **separates build, monthly and usage** instead of hiding one big number.",
          "It **budgets for maintenance** — roughly 10–15% of build per year. A quote that promises zero upkeep is selling something.",
          "It **ties price to an outcome**, not just hours — what the automation recovers or saves should dwarf what it costs.",
          "It says **no** to bad-fit work. An honest partner will tell you when an off-the-shelf tool is the smarter buy.",
        ],
      },
      {
        type: "p",
        text: "Nodevant builds from $2,800 with monitoring and tuning folded into the monthly plan, and every engagement starts with a free 90-second audit that shows your highest-ROI automation and its payback before you commit a dollar.",
      },
      {
        type: "chips",
        label: "Keep reading",
        links: [
          { label: "What an AI voice agent costs", href: "/pricing/ai-voice-agent-cost/" },
          { label: "ROI calculator", href: "/resources/automation-roi-calculator/" },
          { label: "Full pricing", href: "/pricing/" },
        ],
      },
      { type: "cta" },
    ],
  },
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
    cover: "/images/blog/n8n-vs-make-vs-zapier.webp",
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
    cover: "/images/blog/roi-of-workflow-automation-year-one.webp",
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
    cover: "/images/blog/voice-ai-agents-buyers-guide.webp",
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
    readMinutes: 6,
    published: true,
    mesh: 3,
    cover: "/images/blog/what-is-an-ai-automation-agency.webp",
    metaTitle: "What Is an AI Automation Agency? | Nodevant",
    metaDescription:
      "What an AI automation agency actually does, how it compares to hiring in-house or buying a tool, and the honest signals that tell you whether you are ready.",
    keywords: ["ai automation agency", "hire automation agency", "automation consulting"],
    relatedServices: ["agentic-workflows", "system-integration"],
    relatedPosts: ["n8n-vs-make-vs-zapier", "roi-of-workflow-automation-year-one"],
    body: [
      {
        type: "p",
        text: "\"AI automation agency\" is a young enough label that two companies using it can do completely different work. One is a strategy shop that hands you a slide deck. Another is three people wiring up templates. The category has no licensing body and no standard deliverable, which makes it genuinely hard to tell what you are buying. Here is what the work actually involves, when it beats the alternatives, and the cases where you should not hire one at all.",
      },
      { type: "h2", text: "What the work actually is" },
      {
        type: "p",
        text: "Strip away the language and an AI automation agency does one thing: it finds the repetitive decisions and hand-offs inside your business and replaces them with software that runs without a person. The AI part matters where the work needs judgment — reading an email and deciding what it is about, qualifying a caller, pulling the right number out of a messy document. Everything else is ordinary integration work, and any agency that pretends otherwise is selling the buzzword rather than the outcome.",
      },
      { type: "p", text: "A real engagement usually covers four things:" },
      {
        type: "ul",
        items: [
          "**Discovery that follows one real job end to end.** Not a workshop about your goals — tracing a single enquiry from the moment it arrives to the moment it is paid, and writing down every place a human touches it.",
          "**Building the thing**, including the unglamorous parts: authentication, error handling, retries, and what happens when an API returns something unexpected at 2am.",
          "**Connecting it to the tools you already run.** Most of the value is in the seams — the CRM, the calendar, the billing system — not in the model.",
          "**Owning it after launch.** Tools change their APIs, edge cases surface, and a workflow nobody maintains quietly rots. Whoever builds it should still be there in month six.",
        ],
      },
      { type: "h2", text: "What it is not" },
      {
        type: "p",
        text: "It is not a chatbot on your website. It is not a strategy deck about your AI readiness. And it is not a replacement for a product team — automating your operations is a very different job from building the software you sell. If a proposal is mostly workshops, frameworks and maturity models, you are buying consulting with an AI label on it. Ask what will be running in production at the end, and who fixes it when it breaks.",
      },
      { type: "h2", text: "Agency, in-house, or a tool off the shelf" },
      {
        type: "p",
        text: "All three are legitimate. They fit different situations, and the honest answer is that plenty of businesses should buy the tool and skip the agency entirely.",
      },
      {
        type: "table",
        head: ["Option", "Best when", "The real cost"],
        rows: [
          ["Off-the-shelf tool", "A generic template genuinely fits how you already work", "$49–$95/mo — but you bend your process to the tool"],
          ["Agency build", "Your process has real edge cases, or missed work is costing revenue now", "From ~$1,800 for one workflow; more for agents and voice"],
          ["In-house hire", "You have enough automation work to keep someone busy every week", "A salary, plus the months before they ship anything"],
        ],
      },
      {
        type: "p",
        text: "The tipping point is usually specificity. The moment your answer to \"how does that work here?\" takes more than a sentence, template tools start costing you in workarounds — and workarounds are where automations quietly break. We wrote the full price breakdown in [what an AI automation agency costs](/blog/how-much-does-an-ai-automation-agency-cost/), including the three line items every quote should separate.",
      },
      { type: "h2", text: "Signs you are ready" },
      {
        type: "ul",
        items: [
          "**A specific job eats hours every week** and you can name it — chasing quotes, re-typing orders, returning missed calls.",
          "**The work is rule-shaped.** A competent new hire could learn it from a page of instructions, even if some judgment is involved.",
          "**You know roughly what a customer is worth.** Without that number you cannot tell whether an automation pays for itself, and neither can we.",
          "**Someone owns the process today.** Automating a workflow nobody is accountable for just makes the confusion faster.",
        ],
      },
      { type: "h2", text: "Signs you are not, yet" },
      {
        type: "p",
        text: "We turn work down for these reasons more often than people expect, because building on top of them produces something that demos well and gets abandoned in a month:",
      },
      {
        type: "ul",
        items: [
          "**The process changes every week.** Automate it after it settles, not before — you will pay twice otherwise.",
          "**The volume is tiny.** Two enquiries a week does not justify a build. Do it manually and spend the money on getting more enquiries.",
          "**The rules live in people's heads.** If nothing is written down, discovery becomes a documentation project first.",
          "**Nobody internally wants it.** The most common failure mode is not technical. A team that routes around the system returns nothing, which is why we treat \"they stopped using it\" as a defect on our side.",
        ],
      },
      { type: "h2", text: "How to judge one before you sign" },
      {
        type: "p",
        text: "Ask what they would decline to build, and why. An agency that says yes to everything has no opinion, and an opinion is most of what you are paying for. Ask who maintains it — if maintenance is not in the quote, it is not in the plan. Ask for the arithmetic behind the value, not a percentage from a case study about someone else's business. And ask to see something running, not a diagram of something that could run.",
      },
      {
        type: "p",
        text: "That is why our own engagements start with a free [90-second audit](/audit/) rather than a sales call. It returns your highest-ROI opportunity and an estimated payback before either of us has spent anything — and sometimes the honest answer it produces is that a $79/month tool would serve you better.",
      },
      {
        type: "chips",
        label: "Keep reading",
        links: [
          { label: "What an agency costs", href: "/blog/how-much-does-an-ai-automation-agency-cost/" },
          { label: "n8n vs Make vs Zapier", href: "/blog/n8n-vs-make-vs-zapier/" },
          { label: "Year-one ROI", href: "/blog/roi-of-workflow-automation-year-one/" },
        ],
      },
      { type: "cta" },
    ],
  },
  {
    slug: "ai-agents-for-business",
    title: "How AI agents are replacing entire business functions",
    gradientWords: 2,
    category: "Trends",
    excerpt:
      "From SDRs to support teams, autonomous agents are taking over whole workflows. What's actually possible today — and what's still marketing.",
    date: "2026-08-19",
    readMinutes: 5,
    published: true,
    mesh: 4,
    cover: "/images/blog/ai-agents-for-business.webp",
    metaTitle: "How AI Agents Are Replacing Entire Business Functions | Nodevant",
    metaDescription:
      "Autonomous AI agents are taking over whole workflows, from sales development to front-desk calls. What genuinely works in production today, and what is still marketing.",
    keywords: ["ai agents for business", "autonomous agents", "agentic workflows"],
    relatedServices: ["agentic-workflows", "ai-voice-agents"],
    relatedPosts: ["voice-ai-agents-buyers-guide", "n8n-vs-make-vs-zapier"],
    body: [
      {
        type: "p",
        text: "The claim doing the rounds is that AI agents will replace whole departments. The reality we see in production is narrower and more useful: agents are absorbing **functions**, not job titles. A function is a bounded loop of work with a clear trigger and a clear finish — answer the call, qualify the lead, chase the unpaid invoice. Where the loop is that tight, agents genuinely run it end to end today. Where it is not, they still need a human at the edges.",
      },
      { type: "h2", text: "What \"agent\" actually means" },
      {
        type: "p",
        text: "The word is doing a lot of work in marketing copy, so it is worth being precise. The difference is not intelligence, it is who decides the next step.",
      },
      {
        type: "table",
        head: ["", "Who decides the next step", "Breaks when"],
        rows: [
          ["Chatbot", "You do — it answers, you act", "The answer needs an action taken"],
          ["Workflow automation", "The developer did, in advance", "Reality goes off the mapped path"],
          ["AI agent", "The agent does, at runtime, using tools", "The goal is ambiguous or the tools are missing"],
        ],
      },
      {
        type: "p",
        text: "That middle row is why so much \"agentic\" work is really just automation with a model in the loop — which is fine, and often the right build. A [workflow automation](/services/agentic-workflows/) that never surprises you is worth more than an agent that occasionally invents a step. The honest question is not which is more advanced, it is which one the job needs.",
      },
      { type: "h2", text: "Functions agents genuinely run today" },
      {
        type: "ul",
        items: [
          "**Front desk.** Answering every call, qualifying the caller, booking into a real calendar and writing the record to the CRM. This is the most reliably solved function we deploy — see the [AI receptionist](/solutions/ai-receptionist/) for the shape of it.",
          "**Sales development.** Sourcing accounts that match a profile, enriching them, sequencing outreach across channels and handling the first replies. Our own [Scalaro](/solutions/scalaro/) stack runs this as a set of cooperating agents rather than one.",
          "**Quote and estimate production.** Reading a messy inbound enquiry, extracting a structured spec, pricing it against rules and issuing the quote — the core of the [FABRIOZA](/solutions/fabrioza/) build, which took quoting from days to inside the hour.",
          "**Follow-up that never forgets.** The unglamorous one, and often the highest-value: chasing the quote, the no-show, the unpaid invoice, on schedule, forever.",
          "**Intake and triage.** Reading what arrived, deciding what it is, routing it to the right place with the context attached.",
        ],
      },
      {
        type: "p",
        text: "Notice what these share. Each has an unambiguous success condition — the meeting is booked, the quote is sent, the record exists. That is the property that makes a function automatable, far more than how clever the model is.",
      },
      { type: "h2", text: "What is still marketing" },
      {
        type: "p",
        text: "We would rather lose a deal than oversell this, so plainly:",
      },
      {
        type: "ul",
        items: [
          "**\"Replace your whole sales team.\"** Agents book meetings well. Closing a complex deal involves reading a room, negotiating and being trusted, and they do not do that.",
          "**Fully autonomous multi-agent \"companies.\"** Impressive in demos, fragile in production. Every extra agent multiplies the ways a run can drift, and nobody wants to debug a conversation between two bots at 2am.",
          "**\"It learns your business on its own.\"** It learns what you write down and give it access to. The work of encoding your rules does not disappear; it moves to the start of the project.",
          "**Anything irreversible without a checkpoint.** Sending money, signing, deleting, promising a price outside the rules. Not a capability limit — a judgment one.",
        ],
      },
      { type: "h2", text: "The pattern that actually works" },
      {
        type: "p",
        text: "The builds that survive contact with real customers all look the same: the agent owns the loop, and a human owns the exceptions. Concretely — the agent handles the routine call and warm-transfers the unusual one; it drafts the quote and a person approves anything outside the pricing rules; it chases the invoice and escalates the dispute. You are not choosing between a human and an agent. You are deciding which slice of a function is routine enough to hand over.",
      },
      {
        type: "p",
        text: "That framing also makes the ROI legible. You are not paying to \"add AI\" — you are moving a measurable share of a function off payroll, and the [ROI calculator](/resources/automation-roi-calculator/) will tell you what that share is worth in hours and full-time-employee equivalents before you commit.",
      },
      { type: "h2", text: "How to pick the first function" },
      {
        type: "p",
        text: "Pick the loop where the cost of missing it is obvious and the success condition is unarguable. Missed calls are the classic first build because the loss is countable — you can put a number on the enquiries that went to voicemail last month, which means you can also tell whether the agent worked.",
      },
      {
        type: "p",
        text: "Avoid starting with the most complex function to prove the technology. Start with the one where you will know within a fortnight whether it earned its keep, then use that result to fund the next one.",
      },
      {
        type: "chips",
        label: "Keep reading",
        links: [
          { label: "Voice AI buyer's guide", href: "/blog/voice-ai-agents-buyers-guide/" },
          { label: "AI receptionist", href: "/solutions/ai-receptionist/" },
          { label: "ROI calculator", href: "/resources/automation-roi-calculator/" },
        ],
      },
      { type: "cta" },
    ],
  },
  {
    slug: "how-to-automate-lead-generation",
    title: "Automating lead generation end to end: the full blueprint",
    gradientWords: 2,
    category: "Lead Gen",
    excerpt:
      "A step-by-step blueprint for an AI lead engine that captures, enriches, scores, and follows up with prospects while your team sleeps.",
    date: "2026-08-26",
    readMinutes: 6,
    published: true,
    mesh: 5,
    cover: "/images/blog/how-to-automate-lead-generation.webp",
    metaTitle: "Automating Lead Generation End to End | Nodevant",
    metaDescription:
      "The full blueprint for an automated lead engine: capture, enrichment, scoring, instant response and follow-up — with the speed-to-lead maths that decides whether it pays.",
    keywords: ["automate lead generation", "ai lead generation", "lead gen pipeline"],
    relatedServices: ["lead-gen-pipeline", "ai-voice-agents"],
    relatedPosts: ["roi-of-workflow-automation-year-one", "n8n-vs-make-vs-zapier"],
    body: [
      {
        type: "p",
        text: "Most businesses do not have a lead generation problem. They have a lead **handling** problem — enquiries arrive and then sit. This is the blueprint we actually build: five stages, what each one does, and the arithmetic that decides whether automating it is worth the money.",
      },
      { type: "h2", text: "The five stages" },
      {
        type: "table",
        head: ["Stage", "What it does", "What happens without it"],
        rows: [
          ["1. Capture", "Every enquiry lands in one place, whatever channel it came from", "Leads live in an inbox, a phone and someone's notebook"],
          ["2. Enrich", "Adds the context you would otherwise google", "Reps research instead of selling"],
          ["3. Score", "Ranks by fit and intent against your rules", "Everything is treated as equally urgent, so nothing is"],
          ["4. Respond", "Replies and books within minutes, automatically", "The fastest competitor wins the deal"],
          ["5. Follow up", "Chases on a schedule until there is an answer", "80% of the pipeline quietly evaporates"],
        ],
      },
      { type: "h2", text: "Stage 1 — Capture everything in one place" },
      {
        type: "p",
        text: "The first job is unglamorous: one destination for every enquiry, regardless of whether it came from a form, a phone call, an inbox, a DM or a marketplace. Until that exists, every downstream stage is guesswork because your data has holes in it.",
      },
      {
        type: "p",
        text: "The channel people forget is the phone. A missed call is a lead that never enters the system at all — it leaves no row to follow up. That is why an [AI receptionist](/solutions/ai-receptionist/) is often the highest-yield first build for local and service businesses: it converts an invisible loss into a captured record.",
      },
      { type: "h2", text: "Stage 2 — Enrich before a human ever looks" },
      {
        type: "p",
        text: "By the time anyone opens the record it should already know the company size, industry, location, likely budget band and where the lead came from. This is pure grunt work — exactly the kind of lookup-and-append job that automation does perfectly and people do slowly and inconsistently.",
      },
      {
        type: "p",
        text: "Keep it honest: enrich with what you can actually verify. A confidently wrong company size will send a good lead down the wrong track, which is worse than no enrichment at all.",
      },
      { type: "h2", text: "Stage 3 — Score against your rules, not a vibe" },
      {
        type: "ul",
        items: [
          "**Fit** — do they match who you actually serve? Industry, size, geography, the things that make delivery work.",
          "**Intent** — did they ask for pricing, or download a guide? Those are not the same lead.",
          "**Urgency** — is there a deadline, a storm, a renewal, a broken process bleeding money right now?",
          "**Disqualifiers** — say them out loud. A pipeline that never rejects anything is a to-do list, not a funnel.",
        ],
      },
      {
        type: "p",
        text: "Write the scoring rules with the person who actually closes deals, then encode them. The value is not the model; it is that the rules become explicit, consistent and reviewable rather than living in one rep's instinct.",
      },
      { type: "h2", text: "Stage 4 — Respond in minutes, because the maths is brutal" },
      {
        type: "p",
        text: "This is the stage that decides the return on the whole build. Published lead-response research is unusually consistent, and it is the same benchmark set our [pricing meter](/pricing/) and audit run on:",
      },
      {
        type: "table",
        head: ["You respond in", "Qualified leads lost to a faster competitor"],
        rows: [
          ["Under 5 minutes", "~5%"],
          ["Under 1 hour", "~35%"],
          ["Within 4 hours", "~78%"],
          ["Same day", "~85%"],
          ["Next day", "~94%"],
        ],
      },
      {
        type: "p",
        text: "Work an example. Say you get 40 enquiries a month, a customer is worth $2,000, and about 15% of the leads you actually reach turn into business. Reply next day and roughly 94% are gone before you start — you are competing for the remainder. Reply inside five minutes and almost all of them are still winnable. The gap between those two worlds is not a better sales pitch; it is a machine that answers while you are asleep.",
      },
      {
        type: "p",
        text: "Run your own numbers in the [ROI calculator](/resources/automation-roi-calculator/) rather than trusting ours — it uses exactly these benchmarks and shows the payback against a real build price.",
      },
      { type: "h2", text: "Stage 5 — Follow up until there is an answer" },
      {
        type: "p",
        text: "Most revenue lost after contact is lost to silence, not rejection. The follow-up sequence is the least clever and most profitable part of the pipeline: a defined cadence across email, SMS and voice, escalating to a human at the right moment, stopping instantly when they reply or ask you to.",
      },
      {
        type: "p",
        text: "Two rules keep this from becoming spam. Stop the moment they respond — nothing destroys trust faster than a nurture email arriving after a real conversation started. And cap it. \"Forever\" is not a cadence, it is harassment with a scheduler.",
      },
      { type: "h2", text: "Where these pipelines break" },
      {
        type: "ul",
        items: [
          "**Nobody owns the exceptions.** The automation handles 85% and the remainder silently piles up in a queue no one reads.",
          "**Scoring never gets revisited.** Rules written in January are wrong by June, and a stale score is worse than none because people trust it.",
          "**The CRM becomes two sources of truth.** If reps keep a private spreadsheet, the pipeline has already failed.",
          "**Volume without qualification.** Doubling enquiries while conversion stays flat just means you now waste twice as much time. Fix stage 3 before scaling stage 1.",
        ],
      },
      { type: "h2", text: "What to build first" },
      {
        type: "p",
        text: "Not all five. Build stage 4 first — instant response — because it produces a measurable result within a fortnight and funds everything after it. Then stage 1 for whichever channel currently leaks most, usually the phone. Then follow-up. Enrichment and scoring come last: they make a working pipeline more efficient, but they cannot rescue one that answers a day late.",
      },
      {
        type: "p",
        text: "If you are not sure which stage is costing you most, the free [90-second audit](/audit/) will tell you, and it will say so plainly if the honest answer is that your volume does not yet justify building any of it.",
      },
      {
        type: "chips",
        label: "Keep reading",
        links: [
          { label: "Year-one ROI", href: "/blog/roi-of-workflow-automation-year-one/" },
          { label: "AI receptionist", href: "/solutions/ai-receptionist/" },
          { label: "ROI calculator", href: "/resources/automation-roi-calculator/" },
        ],
      },
      { type: "cta" },
    ],
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
