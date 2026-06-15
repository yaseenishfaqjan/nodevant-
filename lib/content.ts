// Shared site content — single source of truth for homepage + schema + pages.

export interface Service {
  slug: string;
  title: string;
  icon: string;
  short: string;
  long: string;
  tags: string[];
  tools: string[];
  timeline: string;
  startingPrice: string;
  accent: "cyan" | "violet";
}

export const SERVICES: Service[] = [
  {
    slug: "agentic-workflows",
    title: "Agentic Workflows",
    icon: "🤖",
    short:
      "n8n/Make orchestration with intelligent automation that adapts to your business processes in real-time, learning and evolving with your needs.",
    long: "We design autonomous, multi-step workflows that connect every tool in your stack. Triggers fire, data routes, AI decides — and the work gets done without a human in the loop until it actually matters.",
    tags: ["Orchestration", "Automation", "n8n/Make"],
    tools: ["n8n", "Make", "OpenAI", "Webhooks"],
    timeline: "1–2 weeks",
    startingPrice: "$1,800",
    accent: "cyan",
  },
  {
    slug: "ai-voice-agents",
    title: "AI Voice Agents",
    icon: "🎙️",
    short:
      "Vapi/Retell integration for real-time voice intelligence that understands context, responds naturally, and handles complex conversations.",
    long: "Deploy voice agents that answer calls, qualify leads, book appointments, and resolve support tickets 24/7 — escalating to a human only when it's truly needed.",
    tags: ["Voice AI", "Real-time", "Vapi/Retell"],
    tools: ["Vapi", "Retell", "ElevenLabs", "Twilio"],
    timeline: "2–3 weeks",
    startingPrice: "$2,800",
    accent: "violet",
  },
  {
    slug: "complex-logic-engines",
    title: "Complex Logic Engines",
    icon: "⚙️",
    short:
      "Custom development for algorithmic data processing that handles massive computations with precision and unmatched performance.",
    long: "When off-the-shelf tools hit their ceiling, we build custom engines — pricing algorithms, routing logic, scoring systems — that process data at scale with deterministic precision.",
    tags: ["Custom Dev", "Processing", "Algorithms"],
    tools: ["Node.js", "Python", "PostgreSQL", "Redis"],
    timeline: "3–5 weeks",
    startingPrice: "$4,500",
    accent: "cyan",
  },
  {
    slug: "system-integration",
    title: "System Integration",
    icon: "🔗",
    short:
      "Connect your CRM, marketing, finance, and ops tools into one seamless data fabric so information flows automatically with zero manual copying.",
    long: "We unify disconnected systems into a single source of truth. Real-time sync between your CRM, spreadsheets, billing, and comms — no more copy-paste, no more stale data.",
    tags: ["Sync", "APIs", "Data Fabric"],
    tools: ["REST APIs", "n8n", "Airtable", "Webhooks"],
    timeline: "1–2 weeks",
    startingPrice: "$1,200",
    accent: "violet",
  },
  {
    slug: "lead-gen-pipeline",
    title: "Lead Gen Pipeline",
    icon: "🎯",
    short:
      "Automated lead capture, enrichment, scoring, and follow-up that turns cold traffic into booked calls while your team sleeps.",
    long: "An end-to-end engine that scrapes, enriches, scores, and nurtures leads — then books qualified prospects straight into your calendar with personalized AI outreach.",
    tags: ["Lead Gen", "Enrichment", "Outreach"],
    tools: ["n8n", "OpenAI", "HubSpot", "Clay"],
    timeline: "2–3 weeks",
    startingPrice: "$2,400",
    accent: "cyan",
  },
  {
    slug: "custom-ai-solutions",
    title: "Custom AI Solutions",
    icon: "✨",
    short:
      "Bespoke AI products built around your exact problem — RAG assistants, document processing, internal copilots, and decision engines.",
    long: "Have a problem no template solves? We build it. Retrieval-augmented assistants, document pipelines, internal copilots — production-grade AI tailored to your workflow.",
    tags: ["RAG", "Copilots", "Bespoke"],
    tools: ["OpenAI", "LangChain", "Pinecone", "Next.js"],
    timeline: "3–6 weeks",
    startingPrice: "$4,500",
    accent: "violet",
  },
];

export interface ProcessStep {
  step: string;
  title: string;
  desc: string;
  icon: string;
}

export const PROCESS: ProcessStep[] = [
  {
    step: "01",
    title: "Discovery",
    desc: "We map your workflows, find the highest-ROI bottlenecks, and scope exactly what to automate — starting from your free audit.",
    icon: "🔍",
  },
  {
    step: "02",
    title: "Build",
    desc: "Our team designs and ships your automation in tight iterations, with previews you can test at every milestone.",
    icon: "🛠️",
  },
  {
    step: "03",
    title: "Launch",
    desc: "We deploy to production, connect it to your live tools, and validate every edge case before it touches real data.",
    icon: "🚀",
  },
  {
    step: "04",
    title: "Support",
    desc: "Ongoing monitoring, tuning, and expansion. Your systems get smarter and faster as your business grows.",
    icon: "🤝",
  },
];

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

// Honest, verifiable stats — defensible from the real portfolio.
export const STATS: Stat[] = [
  { value: 6, suffix: "", label: "Complete systems built" },
  { value: 6, suffix: "", label: "Industries covered" },
  { value: 90, suffix: "s", label: "Free audit, that's it" },
  { value: 100, suffix: "%", label: "ROI-first approach" },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Nodevant rebuilt our entire lead pipeline in two weeks. We went from chasing leads manually to booking 30+ qualified calls a month on autopilot.",
    name: "Sarah Chen",
    role: "Founder, GrowthLane Agency",
    initials: "SC",
  },
  {
    quote:
      "Their voice AI agent now handles 78% of our inbound support. Our team finally focuses on the conversations that actually need a human.",
    name: "Marcus Webb",
    role: "COO, Northbeam Retail",
    initials: "MW",
  },
  {
    quote:
      "The data sync automation alone saves us 40 hours a week. It paid for itself in under a month and never makes a mistake.",
    name: "Priya Nair",
    role: "Ops Director, Loop Logistics",
    initials: "PN",
  },
];

export interface FAQItem {
  q: string;
  a: string;
}

export const FAQS: FAQItem[] = [
  {
    q: "What exactly does an AI automation agency do?",
    a: "We design and build systems that do your repetitive work for you — qualifying leads, syncing data between tools, answering support questions, generating reports, and more. Instead of hiring more people, you get AI-powered workflows that run 24/7 without errors.",
  },
  {
    q: "How long does a typical automation take to build?",
    a: "Most projects ship in 1–3 weeks. Simple workflow automations are often live within a week, while custom AI engines and voice agents take 2–5 weeks depending on complexity. You'll see working previews throughout.",
  },
  {
    q: "How much does it cost to work with Nodevant?",
    a: "Projects typically start from $1,200 for a focused automation and scale to $4,500+ for custom AI solutions. Every engagement starts with a free audit so you know your expected ROI before committing a dollar.",
  },
  {
    q: "Which tools and platforms do you work with?",
    a: "We're tool-agnostic and integrate with n8n, Make, Zapier, HubSpot, Salesforce, Slack, Notion, Airtable, Gmail, Shopify, OpenAI, Vapi, Retell, and virtually any platform with an API. We recommend the right stack for your problem, not the one we're locked into.",
  },
  {
    q: "What kind of ROI can I expect from automation?",
    a: "Clients typically see payback in under 6 weeks and 10×+ annual ROI on focused automations. The exact number depends on how many hours you're losing and at what cost — our free 90-second audit estimates it for you instantly.",
  },
  {
    q: "Do you offer support after the automation goes live?",
    a: "Yes. Every build includes monitoring and tuning, and we offer ongoing support plans to maintain, optimize, and expand your systems as your business grows. 94% of our clients stay with us past their first project.",
  },
];

export interface CaseStudy {
  slug: string;
  client: string;
  industry: string;
  title: string;
  challenge: string;
  solution: string;
  metrics: { value: string; label: string }[];
  service: string;
}

// Real portfolio — systems we designed, built, and deployed.
export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "storehouse360-credit-repair-saas",
    client: "Storehouse360",
    industry: "Fintech / Credit Repair",
    title: "A full credit-repair SaaS with end-to-end dispute automation",
    challenge:
      "Credit-repair businesses needed a complete, automated system for dispute management, 3-bureau credit monitoring, and client communication — work that doesn't scale by hand.",
    solution:
      "We built a full Next.js + FastAPI SaaS on Supabase: 3-bureau credit monitoring, AI-generated dispute letters, Lob API for certified mail, a client portal, and Stripe subscription billing. White-label ready.",
    metrics: [
      { value: "3-bureau", label: "Automated monitoring" },
      { value: "AI", label: "Dispute letters" },
      { value: "White-label", label: "Ready to resell" },
    ],
    service: "Custom AI Solutions",
  },
  {
    slug: "fabrioza-sales-automation",
    client: "FABRIOZA (Hermes 2.0)",
    industry: "Manufacturing",
    title: "An autonomous sales pipeline for a custom manufacturer — no sales team",
    challenge:
      "A custom clothing manufacturer needed to generate leads, run outreach, and handle inbound sales without hiring a sales team.",
    solution:
      "We built Hermes 2.0 — an autonomous go-to-market system: Google Maps lead scraping, AI-personalized email outreach, an ElevenLabs voice agent for inbound calls, a GPT reply handler, and a Telegram control interface, running 24/7 on a VPS.",
    metrics: [
      { value: "24/7", label: "Autonomous outreach" },
      { value: "Voice AI", label: "Inbound calls" },
      { value: "0", label: "Sales hires needed" },
    ],
    service: "Lead Gen Pipeline",
  },
  {
    slug: "scalaro-ai-sales-platform",
    client: "Scalaro",
    industry: "B2B SaaS",
    title: "A multi-agent AI sales platform built from scratch",
    challenge:
      "Build a scalable, production-grade AI sales-automation platform with orchestrated agents covering the full sales motion.",
    solution:
      "We built Scalaro — a multi-agent system with 6 specialized AI agents (Content, DM, Sales, Research, SEO, Voice), a FastAPI backend, and a Next.js frontend, with full agent orchestration and a comprehensive test suite.",
    metrics: [
      { value: "6", label: "Specialized AI agents" },
      { value: "196", label: "Tests passing" },
      { value: "v0.9", label: "Production-ready" },
    ],
    service: "Custom AI Solutions",
  },
];

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "what-is-an-ai-automation-agency",
    title: "What Is an AI Automation Agency? (And Do You Actually Need One?)",
    excerpt:
      "A plain-English breakdown of what AI automation agencies do, how they compare to hiring in-house, and how to know if your business is ready.",
    category: "Guides",
    readTime: "8 min read",
    date: "2026-06-02",
  },
  {
    slug: "n8n-vs-make-vs-zapier",
    title: "n8n vs Make vs Zapier in 2026: Which Automation Tool Is Right for You?",
    excerpt:
      "A head-to-head comparison of the three biggest automation platforms — pricing, learning curve, triggers, and when to reach for a custom build instead.",
    category: "Comparisons",
    readTime: "11 min read",
    date: "2026-05-21",
  },
  {
    slug: "ai-agents-for-business",
    title: "How AI Agents Are Replacing Entire Business Functions in 2026",
    excerpt:
      "From SDRs to support teams, autonomous AI agents are taking over whole workflows. Here's what's actually possible today — and what isn't.",
    category: "Trends",
    readTime: "9 min read",
    date: "2026-05-09",
  },
  {
    slug: "workflow-automation-roi",
    title: "The ROI of Workflow Automation: What to Expect in Year One",
    excerpt:
      "Real numbers on payback periods, annual savings, and ROI multiples — plus the formula we use to estimate value before writing a line of code.",
    category: "ROI",
    readTime: "7 min read",
    date: "2026-04-28",
  },
  {
    slug: "voice-ai-agents-customer-support",
    title: "Voice AI Agents for Customer Support: The Complete Guide",
    excerpt:
      "How modern voice agents handle real conversations, what they cost to build, and how to deploy one without frustrating your customers.",
    category: "Voice AI",
    readTime: "10 min read",
    date: "2026-04-14",
  },
  {
    slug: "how-to-automate-lead-generation",
    title: "How to Automate Lead Generation End-to-End with AI",
    excerpt:
      "A step-by-step blueprint for building an AI lead engine that captures, enriches, scores, and follows up with prospects automatically.",
    category: "Lead Gen",
    readTime: "12 min read",
    date: "2026-03-30",
  },
];

export interface Solution {
  slug: string;
  icon: string;
  industry: string;
  title: string;
  tag: string;
  short: string; // 2-line homepage/hub description
  intro: string; // longer opening paragraph for the detail page
  problem: string;
  included: string[];
  workflow: string[]; // step-by-step of how the system runs
  results: { value: string; label: string }[];
  techStack: string[];
  timeline: string;
  investment: string;
}

export const SOLUTIONS: Solution[] = [
  {
    slug: "fintech",
    icon: "💳",
    industry: "Fintech / Credit Repair",
    title: "Credit Repair SaaS System",
    tag: "Storehouse360",
    intro:
      "A credit-repair operation lives or dies on turnaround and accuracy. This system runs the entire dispute lifecycle — from intake to bureau response — automatically, so your team handles exceptions instead of paperwork and clients watch progress in real time.",
    workflow: [
      "Client signs up and uploads their credit reports through a branded portal",
      "The system pulls 3-bureau data and flags every disputable item automatically",
      "AI drafts a tailored dispute letter for each item, ready for review",
      "Letters are mailed via the Lob API and tracked through to delivery",
      "Bureau responses update each client's dashboard, and billing runs on Stripe",
    ],
    short:
      "Full dispute workflow automation, 3-bureau credit monitoring, AI letter generation, client portal, and payment processing. White-label ready.",
    problem:
      "Credit repair operations drown in manual dispute letters, bureau tracking, and client updates — work that scales linearly with headcount and is riddled with errors that cost clients results.",
    included: [
      "Automated 3-bureau dispute workflow with status tracking",
      "AI-generated dispute letters tailored to each item",
      "Client portal with real-time progress and document upload",
      "Payment processing and subscription billing automation",
      "Lob / mail API integration for physical letter delivery",
      "Automated client onboarding and milestone notifications",
    ],
    results: [
      { value: "90%", label: "Less manual letter work" },
      { value: "3-bureau", label: "Automated tracking" },
      { value: "White-label", label: "Ready to resell" },
    ],
    techStack: ["n8n", "OpenAI", "Lob API", "Stripe", "Next.js", "PostgreSQL"],
    timeline: "3–6 weeks",
    investment: "From $4,500",
  },
  {
    slug: "manufacturing",
    icon: "🏭",
    industry: "Manufacturing / Custom Products",
    title: "Custom Manufacturing Operations",
    tag: "FABRIOZA Stack",
    intro:
      "Custom manufacturers lose deals to whoever quotes first and follows up hardest. This system runs the entire top of funnel — find, reach, qualify, and quote — without a sales hire, so every inbound and outbound opportunity gets a fast, consistent response.",
    workflow: [
      "Scrapes and enriches target businesses by location and industry",
      "Sends AI-personalized cold outreach across email at scale",
      "An ElevenLabs voice agent answers inbound calls and qualifies intent",
      "A GPT reply handler answers questions and books interested buyers",
      "You monitor and steer everything from a single Telegram control interface",
    ],
    short:
      "Lead scraping → email outreach → AI quote generation → CRM automation → voice agent for inbound. A full go-to-market system for custom manufacturers.",
    problem:
      "Custom product manufacturers lose deals to slow quoting and inconsistent follow-up. Sales reps juggle spreadsheets, email, and manual estimates while leads go cold.",
    included: [
      "Targeted lead scraping and enrichment by industry",
      "Automated cold email outreach with personalization",
      "AI quote and estimate generation from specs",
      "CRM automation that logs and routes every opportunity",
      "Inbound voice AI agent for quote requests and FAQs",
      "Automated follow-up sequences until the deal closes",
    ],
    results: [
      { value: "Hours→mins", label: "Quote turnaround" },
      { value: "24/7", label: "Inbound coverage" },
      { value: "5×", label: "Outreach volume" },
    ],
    techStack: ["n8n", "OpenAI", "Vapi", "Clay", "HubSpot", "Gmail"],
    timeline: "3–5 weeks",
    investment: "From $3,500",
  },
  {
    slug: "saas-sales",
    icon: "🤖",
    industry: "B2B SaaS Sales",
    title: "AI Sales Agency Platform",
    tag: "Scalaro Framework",
    intro:
      "Pipeline can't depend on hiring more SDRs. This multi-agent platform runs research, content, and outreach in parallel — each agent specialized for one job — so your sales motion scales with compute instead of headcount.",
    workflow: [
      "Research agents build and enrich a target list against your ICP",
      "Content and SEO agents produce assets that warm the market",
      "DM and email agents run personalized, multi-step outreach",
      "A voice agent qualifies and books the prospects that engage",
      "Orchestration ties the agents together with a full, test-backed pipeline",
    ],
    short:
      "A multi-agent sales system with content automation, DM outreach, email sequences, VAPI voice agents, lead research, and a Telegram command center.",
    problem:
      "B2B SaaS teams need consistent pipeline but can't afford to scale SDR headcount. Outreach, research, and content all compete for the same limited hours.",
    included: [
      "Multi-agent system for research, outreach, and qualification",
      "Automated content generation and scheduling",
      "DM and email outreach sequences across channels",
      "VAPI voice agents for qualification and booking",
      "Real-time Telegram command center for control",
      "Lead research and enrichment on autopilot",
    ],
    results: [
      { value: "Multi-agent", label: "Always-on sales" },
      { value: "Omnichannel", label: "DM + email + voice" },
      { value: "Real-time", label: "Telegram control" },
    ],
    techStack: ["n8n", "OpenAI", "Vapi", "Telegram API", "Apollo", "Instantly"],
    timeline: "4–6 weeks",
    investment: "From $4,500",
  },
  {
    slug: "field-services",
    icon: "🏗️",
    industry: "Construction / Field Services",
    title: "Roofing & Field Service Automation",
    tag: "BMAIKR Engine",
    intro:
      "In field services, the first accurate quote usually wins the job. This system captures every lead, produces an instant estimate, and chases it until it closes — turning a days-long quoting process into hours.",
    workflow: [
      "Captures leads from ads, forms, and Google Maps into one inbox",
      "AI generates an instant, itemized estimate from the request",
      "The quote is delivered and e-signed without back-and-forth",
      "Automated follow-up sequences chase every unsigned quote",
      "Won jobs are scheduled and a review request fires after completion",
    ],
    short:
      "Lead capture → AI estimating → automated quote delivery → follow-up → job scheduling. Cuts estimate-to-close from days to hours.",
    problem:
      "Roofing and field service businesses lose jobs to whoever quotes first. Manual measuring, estimating, and follow-up means quotes take days — and most never get sent.",
    included: [
      "Lead capture from ads, forms, and Google Maps",
      "AI estimating and instant quote generation",
      "Automated quote delivery and e-sign",
      "Follow-up sequences that chase every quote",
      "Job scheduling and dispatch automation",
      "Review request automation after job completion",
    ],
    results: [
      { value: "Days→hours", label: "Estimate to close" },
      { value: "100%", label: "Quotes followed up" },
      { value: "Auto", label: "Scheduling + reviews" },
    ],
    techStack: ["n8n", "OpenAI", "Cal.com", "Twilio", "Stripe", "Google Maps"],
    timeline: "2–4 weeks",
    investment: "From $2,800",
  },
  {
    slug: "education",
    icon: "📚",
    industry: "Education / Online Services",
    title: "Online Education Business System",
    tag: "Academy Stack",
    intro:
      "Online education businesses lose students to slow enrollment and patchy communication. This system automates intake-to-onboarding and keeps parents informed, so admins stop chasing forms and payments and focus on teaching quality.",
    workflow: [
      "Prospective students enroll through an automated intake flow",
      "Classes are scheduled and matched to the right teacher",
      "Parents receive automated reminders and progress updates",
      "Payments and renewals are collected and reconciled automatically",
      "An SEO-optimized site keeps new enrollments flowing in",
    ],
    short:
      "Student intake automation, class scheduling, teacher management, parent communication, and a full SEO-optimized website — deployed and ranking.",
    problem:
      "Online education businesses lose students to slow enrollment and poor communication. Admins manually schedule classes, chase payments, and update parents.",
    included: [
      "Automated student intake and enrollment",
      "Class scheduling and teacher assignment",
      "Parent communication and reminder automation",
      "Payment collection and renewal automation",
      "Teacher management and attendance tracking",
      "SEO-optimized website built to rank and convert",
    ],
    results: [
      { value: "Automated", label: "Intake to onboarding" },
      { value: "Ranking", label: "SEO website live" },
      { value: "Hands-off", label: "Parent comms" },
    ],
    techStack: ["n8n", "OpenAI", "Cal.com", "Stripe", "Next.js", "Gmail"],
    timeline: "3–5 weeks",
    investment: "From $3,500",
  },
  {
    slug: "home-services",
    icon: "🌿",
    industry: "Home Services",
    title: "Lawn Care & Home Services System",
    tag: "Home Services Stack",
    intro:
      "Local home-service demand is steady, but most businesses only capture it by word of mouth. This system generates leads from local search, re-engages past clients each season, and books jobs automatically — turning a feast-or-famine pipeline into a predictable one.",
    workflow: [
      "Finds prospects from Google Maps within your service area",
      "Runs automated outreach to new prospects and past customers",
      "AI estimates common jobs and sends quotes instantly",
      "Seasonal campaigns re-engage clients at the right time of year",
      "Booking, reminders, and review requests all run automatically",
    ],
    short:
      "Google Maps lead generation, automated outreach, AI estimating, seasonal follow-up campaigns, and review management for local businesses.",
    problem:
      "Local home service businesses rely on word of mouth and miss steady demand. Lead gen is inconsistent and follow-up is nonexistent between seasons.",
    included: [
      "Google Maps lead generation by service area",
      "Automated outreach to prospects and past clients",
      "AI estimating for common service requests",
      "Seasonal follow-up and re-engagement campaigns",
      "Booking and scheduling automation",
      "Review generation and reputation management",
    ],
    results: [
      { value: "Local SEO", label: "Maps lead gen" },
      { value: "Seasonal", label: "Re-engagement" },
      { value: "5-star", label: "Review automation" },
    ],
    techStack: ["n8n", "OpenAI", "Google Maps", "Twilio", "Cal.com", "Gmail"],
    timeline: "2–4 weeks",
    investment: "From $2,400",
  },
];
