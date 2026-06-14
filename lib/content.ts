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

export const STATS: Stat[] = [
  { value: 120, suffix: "+", label: "Automations shipped" },
  { value: 47, suffix: "", label: "Clients served" },
  { value: 380, suffix: "k", label: "Hours saved" },
  { value: 94, suffix: "%", label: "Client retention" },
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

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "growthlane-lead-pipeline",
    client: "GrowthLane Agency",
    industry: "Marketing Agency",
    title: "From 200 manual leads/day to a fully automated booking pipeline",
    challenge:
      "GrowthLane's team spent 4+ hours a day manually screening inbound leads, leaving qualified prospects waiting hours for a response.",
    solution:
      "We built an AI lead qualification pipeline that scores every lead the moment it arrives, enriches it with company data, and books qualified prospects directly into the team's calendar.",
    metrics: [
      { value: "30+", label: "Calls booked / month" },
      { value: "4 hrs", label: "Saved per day" },
      { value: "11×", label: "ROI in year one" },
    ],
    service: "Lead Gen Pipeline",
  },
  {
    slug: "northbeam-voice-support",
    client: "Northbeam Retail",
    industry: "E-commerce",
    title: "Deflecting 78% of support calls with a voice AI agent",
    challenge:
      "A growing e-commerce brand was drowning in repetitive support calls — order status, returns, sizing — burning $8k/month in staffing.",
    solution:
      "We deployed a context-aware voice AI agent that resolves the most common questions 24/7 and escalates only the complex cases to human reps.",
    metrics: [
      { value: "78%", label: "Calls deflected" },
      { value: "$8k", label: "Saved / month" },
      { value: "24/7", label: "Coverage" },
    ],
    service: "AI Voice Agents",
  },
  {
    slug: "loop-logistics-data-sync",
    client: "Loop Logistics",
    industry: "Logistics",
    title: "Syncing ERP, Slack, and spreadsheets into one automated flow",
    challenge:
      "Loop's ops team manually copied shipment data between an ERP, email, Slack, and spreadsheets — 40 hours a week lost to data entry and constant errors.",
    solution:
      "We connected every system into a single real-time data fabric, so information flows automatically with zero manual copying and a full audit trail.",
    metrics: [
      { value: "40 hrs", label: "Saved per week" },
      { value: "0", label: "Manual errors" },
      { value: "3 wks", label: "Payback period" },
    ],
    service: "System Integration",
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
  problem: string;
  included: string[];
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
