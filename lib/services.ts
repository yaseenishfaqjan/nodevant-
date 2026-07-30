// Rich per-service data — single source for /services and every /services/[slug].
// Base facts (title, tools, timeline, startingPrice) mirror lib/content.ts; this
// file adds the depth the rebuilt pages need (diagrams, proof, FAQ, process).
import type { IconName } from "@/components/ui/Icon";

export type DiagramType =
  | "node-graph"
  | "voice"
  | "pipeline"
  | "hub"
  | "funnel"
  | "modular";

export interface ProductRef {
  key: string;
  name: string;
  url: string;
  initial: string;
  industry: string;
  outcome: string;
  services: string[];
  chip: string;
  solutionSlug?: string; // matching /solutions/[slug] operating system
  caseSlug?: string; // matching /case-studies/[slug] deployed case study
}

export const PRODUCTS: Record<string, ProductRef> = {
  storehouse360: {
    key: "storehouse360",
    name: "Storehouse360",
    url: "https://storehouse360.com",
    initial: "S",
    industry: "Fintech",
    outcome: "3-bureau credit intelligence, credit- and debit-card insights, AI-matched funding and real-estate opportunities in one financial hub.",
    services: ["Complex Logic Engines", "System Integration"],
    chip: "3-BUREAU · CARDS · FUNDING",
    solutionSlug: "storehouse360",
    caseSlug: "storehouse360",
  },
  scalaro: {
    key: "scalaro",
    name: "Scalaro",
    url: "https://scalaro.io",
    initial: "S",
    industry: "AI Sales",
    outcome: "20+ autonomous agents sourcing, calling and booking meetings end to end.",
    services: ["Agentic Workflows", "AI Voice Agents"],
    chip: "20+ AGENTS · 7 CHANNELS",
    solutionSlug: "scalaro",
    caseSlug: "scalaro",
  },
  fairway360: {
    key: "fairway360",
    name: "Fairway360",
    url: "https://fairway360.io",
    initial: "F",
    industry: "Golf & Clubs",
    outcome: "An AI operating system for golf courses and country clubs.",
    services: ["AI Voice Agents", "Lead Gen Pipeline"],
    chip: "POWERED BY SCALARO",
    solutionSlug: "scalaro",
    caseSlug: "fairway360",
  },
  globalshield360: {
    key: "globalshield360",
    name: "GlobalShield360",
    url: "https://globalshield360.io",
    initial: "G",
    industry: "Roofing",
    outcome: "Storm leads, roof scans, estimates, dispatch, claims and invoicing in one command center.",
    services: ["Lead Gen Pipeline", "Custom AI Solutions"],
    chip: "LEAD → INVOICE, ONE SYSTEM",
    solutionSlug: "bmaikr",
    caseSlug: "bmaikr",
  },
  peachpicks: {
    key: "peachpicks",
    name: "PeachPicks",
    url: "https://peachpicks.app",
    initial: "P",
    industry: "Sports",
    outcome: "Free-to-play sports predictions with leaderboards and a local sponsor marketplace.",
    services: ["System Integration", "Custom AI Solutions"],
    chip: "PLAYERS + SPONSOR ECOSYSTEM",
    caseSlug: "peachpicks",
  },
  fabrioza: {
    key: "fabrioza",
    name: "Fabrioza",
    url: "https://fabrioza.com",
    initial: "F",
    industry: "Manufacturing",
    outcome: "B2B custom apparel manufacturing with a quote-to-production pipeline.",
    services: ["Agentic Workflows", "Lead Gen Pipeline"],
    chip: "QUOTE IN 24 HOURS",
    solutionSlug: "fabrioza",
    caseSlug: "fabrioza",
  },
};

export interface ServiceDetail {
  slug: string;
  num: string;
  name: string;
  gradientWord: string; // last word rendered in gradient
  subtitle: string; // mono triad
  description: string;
  tools: string[];
  toolsRationale: string;
  build: { icon: IconName; title: string; text: string }[];
  process: { icon: IconName; title: string; text: string }[];
  diagram: DiagramType;
  diagramStatus: string;
  diagramAlt: string;
  timeline: string;
  price: string; // "From $X,XXX"
  priceNum: number;
  rangeLine: string;
  bestFor: string;
  complexity: "Entry" | "Flagship" | "Deep build";
  outcome: string; // typical outcome (comparison table)
  problem: { pain: string; tries: string[] };
  deployedIn: string[]; // product keys
  related: string[]; // slugs
  faq: { q: string; a: string }[];
  metaTitle: string;
  metaDescription: string;
}

const MOVES_UP = [
  "Additional integrations (each +$300–800)",
  "Custom LLM tuning / training",
  "Multi-location or multi-brand deployment",
  "Retainer for ongoing iteration ($500–$2,500/mo)",
];

export const INCLUDED = [
  "Discovery & workflow mapping",
  "Build, integrate, and test",
  "Deployment + 30 days of monitoring",
];

export { MOVES_UP };

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    slug: "agentic-workflows",
    num: "01",
    name: "Agentic Workflows",
    gradientWord: "Workflows",
    subtitle: "Trigger · Decide · Act",
    description:
      "Agents that read the inbox, decide what matters and act — qualifying leads, updating records and sending the follow-up before anyone opens a tab. You approve the rules once; the workflow runs forever.",
    tools: ["n8n", "Make", "OpenAI", "Webhooks"],
    toolsRationale:
      "We build on n8n and Make because you can see every node, own the logic and change it without us. OpenAI handles the judgement calls; webhooks wire it into whatever you already run.",
    build: [
      { icon: "funnel", title: "Inbox triage agent", text: "Every enquiry read, classified and routed in seconds." },
      { icon: "target", title: "CRM write-back", text: "Records created and enriched without manual entry." },
      { icon: "calendar-check", title: "Follow-up sequences", text: "Timed, personalised, stopped the moment someone replies." },
      { icon: "shield-check", title: "Human-in-the-loop gates", text: "Anything risky waits for a one-tap approval." },
    ],
    process: [
      { icon: "target", title: "Map the busywork", text: "We watch one week of a real workflow and mark every manual step." },
      { icon: "gear", title: "Build the graph", text: "Triggers, branches and AI decisions wired in n8n or Make." },
      { icon: "shield-check", title: "Test on real data", text: "Run against last month's traffic before a single live action." },
      { icon: "refresh", title: "Deploy & monitor", text: "Live with alerts on failures and 30 days of tuning." },
    ],
    diagram: "node-graph",
    diagramStatus: "FLOW ACTIVE",
    diagramAlt: "Four tool nodes exchanging work through a central agent that decides and acts.",
    timeline: "1–2 weeks",
    price: "From $1,800",
    priceNum: 1800,
    rangeLine: "INDUSTRY RANGE: $2,000–$8,000 · WE PRICE BELOW FLOOR",
    bestFor: "Repetitive decisions in an inbox",
    complexity: "Entry",
    outcome: "Leads triaged and followed up in seconds",
    problem: {
      pain: "Your team lives in the inbox — reading, sorting, copying into the CRM, chasing replies. It is the work that never ends and never scales, and it is exactly the work a machine does better.",
      tries: ["Zapier zaps that break silently", "A shared inbox and good intentions", "Hiring a coordinator to copy-paste", "Templated replies no one keeps updated"],
    },
    deployedIn: ["scalaro", "fabrioza"],
    related: ["system-integration", "lead-gen-pipeline"],
    faq: [
      { q: "Do I keep control of the automations?", a: "Yes. They live in your n8n or Make account and you can read, pause or edit every node. Nothing is locked to us." },
      { q: "What happens when a workflow hits an edge case?", a: "Risky or ambiguous steps route to a human approval gate — the agent proposes, you approve with one tap, and it learns the pattern." },
      { q: "How is this different from Zapier?", a: "Zapier chains triggers; agentic workflows add judgement — classifying, deciding and branching with an LLM, not just moving data A to B." },
      { q: "How long until it pays for itself?", a: "Most clients recover the build in the first month of hours returned. We estimate your exact number in the free audit." },
    ],
    metaTitle: "Agentic Workflows — AI Automation That Decides & Acts | Nodevant",
    metaDescription:
      "Custom agentic workflows that triage inboxes, update your CRM and run follow-ups automatically. Built on n8n & Make, live in 1–2 weeks. From $1,800.",
  },
  {
    slug: "ai-voice-agents",
    num: "02",
    name: "AI Voice Agents",
    gradientWord: "Agents",
    subtitle: "Answer · Qualify · Escalate",
    description:
      "A phone agent that picks up on the first ring at 2am, books the job, and hands genuine emergencies to a human with full context. Missed calls stop being lost revenue.",
    tools: ["VAPI", "Retell", "ElevenLabs", "Twilio"],
    toolsRationale:
      "VAPI and Retell give us sub-second latency and real telephony; ElevenLabs makes the voice yours, not a robot's; Twilio carries the calls. The stack is production telephony, not a demo.",
    build: [
      { icon: "phone", title: "24/7 inbound answering", text: "Every call answered in your brand's voice, any hour." },
      { icon: "calendar-check", title: "Live booking", text: "Slots checked and confirmed during the call." },
      { icon: "send", title: "Human escalation", text: "Warm transfer with a 5-second summary for the human." },
      { icon: "doc", title: "Call summaries + CRM notes", text: "Transcript, outcome and next step logged automatically." },
    ],
    process: [
      { icon: "chat", title: "Script the calls", text: "We map the real conversations your best rep has and encode them." },
      { icon: "phone", title: "Wire the telephony", text: "Number, routing and escalation paths connected in VAPI." },
      { icon: "shield-check", title: "Test with real callers", text: "Dozens of live test calls before it answers a customer." },
      { icon: "refresh", title: "Deploy & tune", text: "Live 24/7 with transcript review and weekly tuning." },
    ],
    diagram: "voice",
    diagramStatus: "24/7 ANSWERING",
    diagramAlt: "An inbound call flowing through a live voice agent that either books or transfers to a human.",
    timeline: "2–3 weeks",
    price: "From $2,800",
    priceNum: 2800,
    rangeLine: "INDUSTRY RANGE: $5,000–$25,000 · WE PRICE BELOW MARKET",
    bestFor: "Missed calls and after-hours demand",
    complexity: "Flagship",
    outcome: "Every call answered, jobs booked 24/7",
    problem: {
      pain: "Every missed call is a customer who called your competitor next. After hours, at lunch, when the line's busy — the phone rings out and the revenue walks. A voicemail is not an answer.",
      tries: ["A voicemail box no one checks fast enough", "An answering service reading from a card", "Hiring night staff you can't afford", "Praying they call back tomorrow"],
    },
    deployedIn: ["scalaro", "fairway360"],
    related: ["lead-gen-pipeline", "system-integration"],
    faq: [
      { q: "Will callers know it's AI?", a: "It answers naturally in your brand's voice and never pretends to be a specific person. Most callers simply get their answer or booking and move on." },
      { q: "What about real emergencies?", a: "Anything the agent flags as urgent is warm-transferred to a human with a full context summary, so no one waits on hold in a crisis." },
      { q: "Can it book into my calendar?", a: "Yes — it checks live availability and confirms the slot during the call, writing straight into your calendar and CRM." },
      { q: "What does it cost to run?", a: "Telephony and voice-model minutes bill directly to you at cost. We don't mark up usage; the build fee is separate and fixed." },
    ],
    metaTitle: "AI Voice Agents — 24/7 Answering & Booking | Nodevant",
    metaDescription:
      "AI phone agents that answer every call, qualify, book jobs and escalate emergencies to a human. Built on VAPI & Twilio, live in 2–3 weeks. From $2,800.",
  },
  {
    slug: "complex-logic-engines",
    num: "03",
    name: "Complex Logic Engines",
    gradientWord: "Engines",
    subtitle: "Ingest · Evaluate · Decide",
    description:
      "For the work that lives in someone's head: pricing rules, eligibility checks, dispute logic, underwriting. We encode the decision, test it against your history and put it in production with an audit trail.",
    tools: ["Node.js", "Python", "PostgreSQL", "Redis"],
    toolsRationale:
      "This is real engineering, not a no-code toy. Python and Node carry the logic, Postgres holds the record of every decision, and Redis keeps it fast at volume — because a decision engine has to be both correct and auditable.",
    build: [
      { icon: "doc", title: "Document ingestion", text: "PDFs, statements and forms parsed into structured data." },
      { icon: "gear", title: "Rule + model hybrid", text: "Deterministic where it must be, AI where judgement helps." },
      { icon: "shield-check", title: "Audit trail", text: "Every decision explainable, with the inputs that drove it." },
      { icon: "chart", title: "Backtesting", text: "Validated against your last 12 months before go-live." },
    ],
    process: [
      { icon: "brain", title: "Extract the logic", text: "We sit with your expert and write down every rule and exception." },
      { icon: "gear", title: "Build the engine", text: "Deterministic core plus AI judgement, versioned and testable." },
      { icon: "chart", title: "Backtest on history", text: "Run it against a year of real cases and reconcile the deltas." },
      { icon: "refresh", title: "Deploy with an audit trail", text: "Live with every decision logged and explainable." },
    ],
    diagram: "pipeline",
    diagramStatus: "PROCESSING",
    diagramAlt: "Input documents and events flow into a decision engine that emits approved or flagged results.",
    timeline: "3–5 weeks",
    price: "From $4,500",
    priceNum: 4500,
    rangeLine: "INDUSTRY RANGE: $5,000–$25,000+ · WE PRICE AT MARKET FLOOR",
    bestFor: "Expert judgement stuck in one head",
    complexity: "Deep build",
    outcome: "Consistent decisions with an audit trail",
    problem: {
      pain: "One person knows how you price, qualify or adjudicate — and when they're out, the work stops or the answers drift. The logic is too nuanced for a spreadsheet and too important to guess.",
      tries: ["A 40-tab spreadsheet only one person understands", "Training that never quite sticks", "Off-the-shelf software that fits 80%", "Living with inconsistent outcomes"],
    },
    deployedIn: ["storehouse360"],
    related: ["custom-ai-solutions", "system-integration"],
    faq: [
      { q: "Is it AI or hard-coded rules?", a: "Both, deliberately. The parts that must be exact are deterministic; the parts that need judgement use a model — and every path is logged." },
      { q: "How do you prove it's correct?", a: "We backtest against your last 12 months of real cases and reconcile every difference with you before it goes live." },
      { q: "Can we explain a decision to a regulator or customer?", a: "Yes. Every decision stores its inputs and the rule or model output that drove it, so it's fully explainable after the fact." },
      { q: "Who owns the engine?", a: "You do — source code, database and logic. It runs in your infrastructure and you can hand it to any engineer later." },
    ],
    metaTitle: "Complex Logic Engines — Custom Decision Systems | Nodevant",
    metaDescription:
      "Custom decision engines for pricing, eligibility and underwriting — deterministic where it matters, AI where it helps, with a full audit trail. From $4,500.",
  },
  {
    slug: "system-integration",
    num: "04",
    name: "System Integration",
    gradientWord: "Integration",
    subtitle: "Connect · Sync · Trust",
    description:
      "The fastest win available. Your CRM, inbox, calendar, billing and spreadsheets stop being islands — one record of truth, synced both ways, with conflicts resolved by rules you set.",
    tools: ["REST APIs", "n8n", "Airtable", "Webhooks"],
    toolsRationale:
      "We connect through the APIs your tools already expose rather than brittle scraping, orchestrate the sync in n8n so you can see it, and alert the moment a connection fails — because silent data drift is worse than no sync at all.",
    build: [
      { icon: "puzzle", title: "Two-way sync", text: "Update it anywhere, it is correct everywhere." },
      { icon: "refresh", title: "Deduplication", text: "Three records for one customer become one." },
      { icon: "mail", title: "Failure alerts", text: "A sync breaks, you hear about it before a customer does." },
      { icon: "chart", title: "One reporting view", text: "Numbers pulled from every system into one dashboard." },
    ],
    process: [
      { icon: "layers", title: "Map the systems", text: "We list every tool, field and the record that should win in a conflict." },
      { icon: "puzzle", title: "Wire the connections", text: "Two-way sync built on real APIs, with dedupe rules applied." },
      { icon: "shield-check", title: "Test the edge cases", text: "Conflicting edits and failures rehearsed before go-live." },
      { icon: "refresh", title: "Deploy & watch", text: "Live with failure alerts and one clean reporting view." },
    ],
    diagram: "hub",
    diagramStatus: "SYNCED",
    diagramAlt: "Six business systems connected as spokes to one central sync hub.",
    timeline: "1–2 weeks",
    price: "From $1,200",
    priceNum: 1200,
    rangeLine: "INDUSTRY RANGE: $1,500–$7,500 · WE STAY BELOW MID-MARKET",
    bestFor: "Teams retyping data between tools",
    complexity: "Entry",
    outcome: "One record of truth, no double entry",
    problem: {
      pain: "The same customer exists five times across five tools, each version slightly wrong. Your team retypes data between systems all day and still can't trust a single number. The tools don't talk.",
      tries: ["CSV exports and manual imports", "One brave soul copy-pasting daily", "A native integration that syncs one field", "Just living with the mess"],
    },
    deployedIn: ["storehouse360", "peachpicks"],
    related: ["agentic-workflows", "custom-ai-solutions"],
    faq: [
      { q: "Which tools can you connect?", a: "Anything with an API or webhook — CRMs, inboxes, calendars, billing, spreadsheets and databases. If it exposes data, we can sync it." },
      { q: "What if two systems disagree?", a: "You set the rule for which record wins per field, and the sync applies it consistently instead of overwriting blindly." },
      { q: "Will I know if a sync breaks?", a: "Yes — a failed connection alerts you immediately, so you hear about it before a customer sees stale data." },
      { q: "Why is this the lowest-priced service?", a: "It's the fastest to build and the highest-leverage — most teams get their double-entry hours back within days of go-live." },
    ],
    metaTitle: "System Integration — Sync Your Tools Into One Truth | Nodevant",
    metaDescription:
      "Connect your CRM, inbox, calendar and billing into one two-way synced source of truth with dedupe and failure alerts. Live in 1–2 weeks. From $1,200.",
  },
  {
    slug: "lead-gen-pipeline",
    num: "05",
    name: "Lead Gen Pipeline",
    gradientWord: "Pipeline",
    subtitle: "Source · Score · Book",
    description:
      "A machine that fills the calendar: sources matching accounts, enriches them, scores intent, then runs multi-channel outreach until a meeting is on the books. Your reps only talk to people worth talking to.",
    tools: ["n8n", "OpenAI", "HubSpot", "Clay"],
    toolsRationale:
      "Clay and enrichment APIs find and complete the accounts, OpenAI writes outreach that reads like a person, n8n sequences it across channels, and HubSpot holds the pipeline — so the whole thing runs as one engine, not five disconnected tools.",
    build: [
      { icon: "target", title: "ICP sourcing", text: "Accounts that match your best customers, refreshed weekly." },
      { icon: "sparkle", title: "Enrichment + scoring", text: "Signals ranked so the hottest lead is always first." },
      { icon: "mail", title: "Multi-channel outreach", text: "Email, LinkedIn and voice, sequenced not spammed." },
      { icon: "calendar-check", title: "Meetings booked", text: "Straight into the right rep's calendar with context attached." },
    ],
    process: [
      { icon: "target", title: "Define your ICP", text: "We profile your best customers and turn it into a sourcing query." },
      { icon: "sparkle", title: "Build the engine", text: "Sourcing, enrichment, scoring and sequenced outreach wired together." },
      { icon: "shield-check", title: "Warm up & test", text: "Deliverability protected; messaging tested before volume." },
      { icon: "refresh", title: "Deploy & optimise", text: "Live and booking, tuned on reply and show-rate weekly." },
    ],
    diagram: "funnel",
    diagramStatus: "LEADS FLOWING",
    diagramAlt: "A funnel narrowing from sourcing through enrichment and scoring to a booked meeting.",
    timeline: "2–3 weeks",
    price: "From $2,400",
    priceNum: 2400,
    rangeLine: "INDUSTRY RANGE: $2,000–$8,000 · WE PRICE AT MARKET FLOOR",
    bestFor: "Sales teams starved of meetings",
    complexity: "Flagship",
    outcome: "A calendar that fills itself weekly",
    problem: {
      pain: "Your reps are great on calls and terrible at filling their own calendar — because prospecting is a full-time job no closer wants. So the pipeline runs dry and everyone blames marketing.",
      tries: ["Buying a list and blasting it", "A junior SDR who churns in six months", "Ad spend with no follow-up system", "Waiting for referrals to save the quarter"],
    },
    deployedIn: ["globalshield360", "fairway360", "fabrioza"],
    related: ["ai-voice-agents", "agentic-workflows"],
    faq: [
      { q: "Where do the leads come from?", a: "We source accounts that match your ideal customer profile from enrichment providers, then verify and complete them before any outreach." },
      { q: "Won't automated outreach hurt my domain?", a: "No — we warm up sending, respect volume limits and protect deliverability. Sequenced and human-sounding, never a blast." },
      { q: "Does it replace my sales team?", a: "It feeds them. Reps stop prospecting and only talk to scored, booked prospects with full context attached." },
      { q: "What counts as a good result?", a: "A calendar that reliably fills with qualified meetings each week. We tune on reply and show-rate, not vanity opens." },
    ],
    metaTitle: "Lead Gen Pipeline — An Automated Meeting Engine | Nodevant",
    metaDescription:
      "An automated pipeline that sources, enriches, scores and books qualified meetings across email, LinkedIn and voice. Live in 2–3 weeks. From $2,400.",
  },
  {
    slug: "custom-ai-solutions",
    num: "06",
    name: "Custom AI Solutions",
    gradientWord: "Solutions",
    subtitle: "Scope · Build · Own",
    description:
      "When nothing off the shelf fits: an internal copilot on your own documents, a customer-facing AI product, a data pipeline no vendor sells. You own the code and the models stay yours.",
    tools: ["OpenAI", "LangChain", "Pinecone", "Next.js"],
    toolsRationale:
      "We ground answers in your data with a real RAG stack — Pinecone for retrieval, LangChain to orchestrate, OpenAI for reasoning and Next.js for the surface — so it's a product you own outright, not a wrapper you rent.",
    build: [
      { icon: "brain", title: "RAG knowledge base", text: "Answers grounded in your documents, with citations." },
      { icon: "chat", title: "Internal copilot", text: "Your team's questions answered from your own data." },
      { icon: "doc", title: "Document pipelines", text: "Intake to structured output, at whatever volume you run." },
      { icon: "layers", title: "Productised features", text: "AI shipped inside your own app, not bolted on." },
    ],
    process: [
      { icon: "target", title: "Scope the problem", text: "We define exactly what to build and what success looks like." },
      { icon: "layers", title: "Build the system", text: "Retrieval, reasoning and interface assembled and evaluated." },
      { icon: "shield-check", title: "Ground & guardrail", text: "Answers cited to your data, with safety and eval in place." },
      { icon: "refresh", title: "Ship & hand over", text: "Deployed in your stack with the code and keys handed to you." },
    ],
    diagram: "modular",
    diagramStatus: "BUILT FOR YOU",
    diagramAlt: "Modular AI building blocks joined by gradient connectors into one custom product.",
    timeline: "3–6 weeks",
    price: "From $4,500",
    priceNum: 4500,
    rangeLine: "INDUSTRY RANGE: $5,000–$25,000+ · WE PRICE BELOW FLOOR",
    bestFor: "Products nothing off-the-shelf fits",
    complexity: "Deep build",
    outcome: "An AI feature you own outright",
    problem: {
      pain: "You've hit the wall where every SaaS tool almost fits but none actually does — because your problem is specific to you. You need something built, not configured, and you need to own it.",
      tries: ["Stitching five SaaS tools with tape", "A generic chatbot that hallucinates", "Waiting for a vendor to build your feature", "A ChatGPT tab and copy-paste"],
    },
    deployedIn: ["peachpicks", "globalshield360"],
    related: ["complex-logic-engines", "system-integration"],
    faq: [
      { q: "Do I own what you build?", a: "Fully — source code, models and keys are yours, running in your infrastructure. There's no lock-in to Nodevant." },
      { q: "How do you stop it hallucinating?", a: "We ground answers in your documents with retrieval and citations, add evaluation and guardrails, and refuse to answer outside the knowledge base." },
      { q: "Can it live inside our existing app?", a: "Yes. We ship it as a feature in your product or an internal tool for your team, not a separate bolted-on chatbot." },
      { q: "How do you scope something custom?", a: "We start with the free audit and a short discovery to define exactly what to build and what success looks like before any code." },
    ],
    metaTitle: "Custom AI Solutions — Bespoke AI You Own | Nodevant",
    metaDescription:
      "Bespoke AI built for your exact problem — RAG copilots, document pipelines and productised features, grounded in your data. You own the code. From $4,500.",
  },
];

export function getService(slug: string): ServiceDetail | undefined {
  return SERVICE_DETAILS.find((s) => s.slug === slug);
}
