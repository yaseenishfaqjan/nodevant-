// Rich per-solution data — single source for /solutions and every /solutions/[slug].
// A "solution" is a complete operating system: several services bundled into a
// proven, industry-tuned stack. Each one maps to a real deployed product.
import type { IconName } from "@/components/ui/Icon";
import type { DiagramType } from "@/lib/services";

export interface SolutionDetail {
  slug: string;
  name: string; // stack name, e.g. "Storehouse360"
  gradientWord: string; // last word of the hero title in gradient
  heroLead: string; // hero title minus the gradient word
  industry: string; // mono uppercase line
  routerGroup: "onsite" | "product" | "program";
  description: string;
  proofLabel: string;
  proofValue: string;
  liveUrl: string | null; // null → hide "Visit live system"
  liveLabel: string | null; // display name of the live deployment
  timeline: string;
  investmentRange: string; // mono line, no fixed price
  poweredBy: string[]; // /services subpage slugs
  related: string[]; // other solution slugs
  product: string | null; // PRODUCTS key for the "deployed" card
  diagram: DiagramType;
  diagramStatus: string;
  diagramAlt: string;
  problem: { pain: string; tries: string[] };
  modules: { icon: IconName; title: string; text: string }[]; // stack breakdown
  process: { icon: IconName; title: string; text: string }[]; // how it works (4)
  faq: { q: string; a: string }[];
  metaTitle: string;
  metaDescription: string;
}

export const SOLUTION_DETAILS: SolutionDetail[] = [
  {
    slug: "storehouse360",
    name: "Storehouse360",
    gradientWord: "Platform",
    heroLead: "Financial Hub",
    industry: "Fintech · Financial Operations",
    routerGroup: "program",
    description:
      "3-bureau credit intelligence, credit- and debit-card insights, AI-matched funding up to $400K and real-estate opportunity discovery — one financial hub for a modern money business, not five disconnected tools.",
    proofLabel: "Proof",
    proofValue: "Credit, cards, funding & property — one hub",
    liveUrl: "https://storehouse360.com",
    liveLabel: "Storehouse360",
    timeline: "3–6 weeks",
    investmentRange: "INVESTMENT RANGE: MULTI-SERVICE STACK · FULL QUOTE AFTER AUDIT",
    poweredBy: ["complex-logic-engines", "system-integration", "custom-ai-solutions"],
    related: ["scalaro", "fabrioza"],
    product: "storehouse360",
    diagram: "modular",
    diagramStatus: "PLATFORM LIVE",
    diagramAlt: "Modular financial-hub blocks joined into one platform: credit intelligence, card insights, funding and real-estate opportunities.",
    problem: {
      pain: "A modern money business runs on decisions — where a client stands on credit, which cards and accounts matter, what funding fits, which properties to pursue — and those decisions live in spreadsheets, portals and one expert's head. Nothing is connected, nothing is auditable, and scaling means hiring more people to do the same manual review.",
      tries: ["Separate portals for each credit bureau", "Card and account data tracked in spreadsheets", "A broker's gut feel on funding matches", "Real-estate leads scattered across inboxes"],
    },
    modules: [
      { icon: "chart", title: "3-bureau credit monitoring", text: "Equifax, Experian and TransUnion pulled and normalised into one view." },
      { icon: "layers", title: "Card & spending insights", text: "Credit- and debit-card activity unified into one clear view of the money." },
      { icon: "brain", title: "AI-matched funding", text: "Profiles scored against lenders for matches up to $400K." },
      { icon: "doc", title: "Real-estate opportunities", text: "Property and investment opportunities surfaced and matched to each profile." },
      { icon: "shield-check", title: "Auditable decisions", text: "Every recommendation stores the inputs that drove it." },
    ],
    process: [
      { icon: "target", title: "Map the operation", text: "We document every decision your team makes and where the data lives." },
      { icon: "gear", title: "Build the engines", text: "Credit, card, funding and property logic encoded and connected." },
      { icon: "chart", title: "Backtest on history", text: "Validated against real client outcomes before go-live." },
      { icon: "refresh", title: "Deploy & monitor", text: "Live with an audit trail and 30 days of tuning." },
    ],
    faq: [
      { q: "Is this a template or built for us?", a: "Built. Storehouse360 is the reference deployment — your stack is configured to your data sources, lenders and rules, and you own the result." },
      { q: "How is funding matched?", a: "Client profiles are scored against lender criteria by a decision engine, surfacing matches up to $400K with the reasoning attached." },
      { q: "Can we prove a decision later?", a: "Yes. Every insight and funding recommendation logs its inputs and the rule or model output, so it's explainable to a client or regulator." },
      { q: "What does it cost?", a: "It's a multi-service stack priced as one project — no per-module fee. The free audit maps your exact scope and returns a fixed quote." },
    ],
    metaTitle: "Storehouse360 — All-in-One Financial Hub | Nodevant",
    metaDescription:
      "A complete financial hub: 3-bureau credit intelligence, card insights, AI-matched funding and real-estate opportunities. Deployed live. Book a stack consultation.",
  },
  {
    slug: "fabrioza",
    name: "FABRIOZA Stack",
    gradientWord: "Pipeline",
    heroLead: "Quote-to-Production",
    industry: "Manufacturing · Custom Products",
    routerGroup: "product",
    description:
      "B2B custom apparel from enquiry to shop floor: specs captured, quotes priced and issued, production status tracked — without a spreadsheet in the loop.",
    proofLabel: "Proof",
    proofValue: "Quote in 24 hours",
    liveUrl: "https://fabrioza.com",
    liveLabel: "Fabrioza",
    timeline: "3–5 weeks",
    investmentRange: "INVESTMENT RANGE: MULTI-SERVICE STACK · FULL QUOTE AFTER AUDIT",
    poweredBy: ["agentic-workflows", "lead-gen-pipeline", "ai-voice-agents"],
    related: ["scalaro", "storehouse360"],
    product: "fabrioza",
    diagram: "pipeline",
    diagramStatus: "PROCESSING",
    diagramAlt: "An enquiry flowing through spec capture and pricing into a tracked production order.",
    problem: {
      pain: "Custom manufacturing dies in the gap between enquiry and quote. A buyer emails specs, someone eventually reads them, prices them by hand, and days later sends a number — by which time the buyer has three other quotes. The work that wins orders is the work no one has time for.",
      tries: ["An inbox full of half-read RFQs", "Pricing worked out on a calculator", "A spreadsheet tracking production by colour", "Losing fast buyers to slower quotes"],
    },
    modules: [
      { icon: "doc", title: "Spec capture", text: "Enquiries parsed into structured product specs automatically." },
      { icon: "chart", title: "Instant pricing", text: "Rules-based quotes generated and issued the same hour." },
      { icon: "funnel", title: "Order intake", text: "Approved quotes converted to production orders in one step." },
      { icon: "refresh", title: "Production tracking", text: "Every order's status visible without a spreadsheet." },
      { icon: "phone", title: "Buyer follow-up", text: "Voice and email follow-ups until the order is confirmed." },
    ],
    process: [
      { icon: "target", title: "Map the quote flow", text: "We trace one real enquiry from inbox to shipped order." },
      { icon: "gear", title: "Build the pipeline", text: "Spec capture, pricing and tracking wired end to end." },
      { icon: "shield-check", title: "Test on real RFQs", text: "Run against last month's enquiries before go-live." },
      { icon: "refresh", title: "Deploy & tune", text: "Live with quote-time and win-rate tracked weekly." },
    ],
    faq: [
      { q: "Will it price complex custom orders?", a: "Yes — pricing is rules-based on your real cost model, with anything outside the rules flagged for a human before the quote goes out." },
      { q: "Does it replace our sales team?", a: "It arms them. Reps stop retyping specs and pricing by hand and spend their time closing the quotes the system issues." },
      { q: "Can buyers still talk to a person?", a: "Always. The voice agent handles first contact and follow-up, and hands genuine conversations to your team with full context." },
      { q: "What does it cost?", a: "A multi-service stack priced as one project. The free audit scopes your quote flow and returns a fixed number." },
    ],
    metaTitle: "FABRIOZA Stack — Manufacturing Operating System | Nodevant",
    metaDescription:
      "A quote-to-production operating system for custom manufacturing: specs captured, quotes issued in the hour, production tracked. Deployed live. Book a stack consultation.",
  },
  {
    slug: "scalaro",
    name: "Scalaro Framework",
    gradientWord: "Infrastructure",
    heroLead: "Agentic Sales",
    industry: "B2B SaaS Sales",
    routerGroup: "product",
    description:
      "Twenty-plus autonomous agents that find accounts, run outreach, make voice calls and book meetings across seven channels. Other stacks are built on top of it.",
    proofLabel: "Proof",
    proofValue: "20+ agents · 7 channels",
    liveUrl: "https://scalaro.io",
    liveLabel: "Scalaro",
    timeline: "4–6 weeks",
    investmentRange: "INVESTMENT RANGE: FLAGSHIP STACK · FULL QUOTE AFTER AUDIT",
    poweredBy: ["agentic-workflows", "ai-voice-agents", "lead-gen-pipeline"],
    related: ["bmaikr", "home-services"],
    product: "scalaro",
    diagram: "node-graph",
    diagramStatus: "AGENTS ACTIVE",
    diagramAlt: "A network of autonomous sales agents coordinating sourcing, outreach and booking through a central engine.",
    problem: {
      pain: "A B2B pipeline needs constant feeding, and human SDRs are expensive, slow to ramp and quick to churn. The result is a sales team that spends its best hours prospecting instead of closing, and a pipeline that swings with headcount.",
      tries: ["An SDR team that churns every six months", "A list bought and blasted once", "Point tools that don't talk to each other", "Reps prospecting instead of closing"],
    },
    modules: [
      { icon: "target", title: "Account sourcing", text: "Agents find and enrich accounts that match your ICP continuously." },
      { icon: "mail", title: "Multi-channel outreach", text: "Sequenced across seven channels, human-sounding, never a blast." },
      { icon: "phone", title: "Autonomous voice calls", text: "Agents dial, qualify and book without a human on the line." },
      { icon: "calendar-check", title: "Meeting booking", text: "Qualified prospects land in the right rep's calendar with context." },
      { icon: "layers", title: "Framework foundation", text: "The base other Nodevant stacks — like Fairway360 — run on." },
    ],
    process: [
      { icon: "target", title: "Define the motion", text: "We profile your ICP and the exact steps your best rep runs." },
      { icon: "gear", title: "Assemble the agents", text: "Sourcing, outreach, voice and booking agents wired together." },
      { icon: "shield-check", title: "Warm up & test", text: "Deliverability protected and messaging tested before volume." },
      { icon: "refresh", title: "Deploy & optimise", text: "Live and booking, tuned on reply and show-rate weekly." },
    ],
    faq: [
      { q: "Is this a product we buy or a build?", a: "A build on the Scalaro framework, configured to your ICP, channels and CRM. You get the deployment, not a seat in someone else's tool." },
      { q: "Twenty agents — is that real?", a: "Yes. Discrete agents own sourcing, enrichment, each outreach channel, voice and booking, coordinated through one engine. Scalaro runs them in production today." },
      { q: "Will automated outreach hurt our domain?", a: "No — sending is warmed up, volume-limited and deliverability-protected. Sequenced and human-sounding, never a spray." },
      { q: "What does it cost?", a: "It's our flagship stack, priced as one project. The free audit scopes your motion and returns a fixed quote." },
    ],
    metaTitle: "Scalaro Framework — B2B SaaS Sales Operating System | Nodevant",
    metaDescription:
      "An agentic sales operating system: 20+ autonomous agents sourcing, calling and booking meetings across seven channels. The framework other stacks run on. Book a consultation.",
  },
  {
    slug: "bmaikr",
    name: "BMAIKR Engine",
    gradientWord: "Command Center",
    heroLead: "Field Operations",
    industry: "Construction · Field Services",
    routerGroup: "onsite",
    description:
      "Storm leads captured, roofs scanned by AI, estimates issued instantly, crews dispatched, insurance claims tracked and invoices sent — deployed as GlobalShield360.",
    proofLabel: "Proof",
    proofValue: "Lead → invoice in one system",
    liveUrl: "https://globalshield360.io",
    liveLabel: "GlobalShield360",
    timeline: "2–4 weeks",
    investmentRange: "INVESTMENT RANGE: MULTI-SERVICE STACK · FULL QUOTE AFTER AUDIT",
    poweredBy: ["lead-gen-pipeline", "custom-ai-solutions", "ai-voice-agents"],
    related: ["home-services", "scalaro"],
    product: "globalshield360",
    diagram: "hub",
    diagramStatus: "SYNCED",
    diagramAlt: "A field-operations command center connecting leads, roof scans, dispatch, claims and invoicing as one hub.",
    problem: {
      pain: "A field services business loses money in the seams — a storm lead sits unanswered, an estimate takes days, a crew is dispatched by phone tag, a claim slips, an invoice is forgotten. Each handoff is a leak, and the whole job runs across six disconnected tools.",
      tries: ["Storm leads chased on a whiteboard", "Estimates measured by hand on a ladder", "Crews dispatched by group text", "Claims and invoices tracked in separate apps"],
    },
    modules: [
      { icon: "target", title: "Storm lead capture", text: "Leads captured and qualified the moment weather hits." },
      { icon: "image", title: "AI roof scans", text: "Roofs measured from imagery — no ladder, no guesswork." },
      { icon: "doc", title: "Instant estimates", text: "Priced estimates generated and sent on the spot." },
      { icon: "truck", title: "Crew dispatch", text: "The right crew routed to the job automatically." },
      { icon: "shield-check", title: "Claims tracking", text: "Insurance claims progressed and never left to slip." },
      { icon: "chart", title: "Invoicing", text: "Completed jobs invoiced without a manual handoff." },
    ],
    process: [
      { icon: "target", title: "Map the job lifecycle", text: "We trace one job from storm lead to paid invoice." },
      { icon: "gear", title: "Build the command center", text: "Capture, scans, dispatch, claims and invoicing connected." },
      { icon: "shield-check", title: "Test the handoffs", text: "Every seam rehearsed so nothing leaks before go-live." },
      { icon: "refresh", title: "Deploy & watch", text: "Live with alerts on stalled jobs and 30 days of tuning." },
    ],
    faq: [
      { q: "Do roof scans really skip the ladder?", a: "For measurement, yes — AI sizes the roof from imagery to price an estimate fast. Physical inspection still happens when the job warrants it." },
      { q: "Can it handle insurance claims?", a: "It tracks each claim through its stages and flags anything stalling, so a claim never quietly dies between the adjuster and the crew." },
      { q: "Is GlobalShield360 the product we get?", a: "GlobalShield360 is the live deployment of the BMAIKR engine. Your build is configured to your service area, crews and pricing." },
      { q: "What does it cost?", a: "A multi-service stack priced as one project. The free audit scopes your job lifecycle and returns a fixed quote." },
    ],
    metaTitle: "BMAIKR Engine — Field Services Operating System | Nodevant",
    metaDescription:
      "A field operations command center: storm leads, AI roof scans, instant estimates, crew dispatch, claims and invoicing in one system. Deployed as GlobalShield360.",
  },
  {
    slug: "academy",
    name: "Academy Stack",
    gradientWord: "Engine",
    heroLead: "Enrollment & Delivery",
    industry: "Education · Online Services",
    routerGroup: "program",
    description:
      "Enquiries answered in any timezone, applications processed, cohorts scheduled and learners nurtured — the administrative half of an education business, automated.",
    proofLabel: "Proof",
    proofValue: "SEO-ranked · fully deployed",
    liveUrl: null,
    liveLabel: null,
    timeline: "3–5 weeks",
    investmentRange: "INVESTMENT RANGE: MULTI-SERVICE STACK · FULL QUOTE AFTER AUDIT",
    poweredBy: ["system-integration", "agentic-workflows", "lead-gen-pipeline"],
    related: ["home-services", "scalaro"],
    product: null,
    diagram: "funnel",
    diagramStatus: "ENROLLING",
    diagramAlt: "A funnel narrowing from enquiry through application and scheduling to an enrolled, nurtured learner.",
    problem: {
      pain: "An education business is two jobs: teaching, and the mountain of admin around it. Enquiries arrive at 2am from another timezone, applications pile up, cohorts need scheduling, and prospective learners go cold while someone gets to the inbox. The teaching is the mission; the admin is the bottleneck.",
      tries: ["An inbox that only opens 9-to-5", "Applications processed by hand", "A spreadsheet juggling cohort dates", "Warm leads cooling in a queue"],
    },
    modules: [
      { icon: "chat", title: "24/7 enquiry answering", text: "Questions answered instantly, in any timezone." },
      { icon: "doc", title: "Application processing", text: "Applications intake, validated and moved forward automatically." },
      { icon: "calendar", title: "Cohort scheduling", text: "Learners placed into the right cohort without a spreadsheet." },
      { icon: "mail", title: "Learner nurture", text: "Prospects nurtured to enrolment, then onboarded on autopilot." },
      { icon: "layers", title: "Connected records", text: "One synced record from first enquiry to graduation." },
    ],
    process: [
      { icon: "target", title: "Map the journey", text: "We trace a learner from first enquiry to enrolled and onboarded." },
      { icon: "gear", title: "Build the engine", text: "Answering, applications, scheduling and nurture wired together." },
      { icon: "shield-check", title: "Test the flow", text: "Run real enquiries and applications through before go-live." },
      { icon: "refresh", title: "Deploy & tune", text: "Live with response-time and enrolment tracked weekly." },
    ],
    faq: [
      { q: "Does it teach or just handle admin?", a: "Admin — the enrolment and delivery operations around your programs. Your instructors keep teaching; the stack removes the bottleneck around them." },
      { q: "Can it answer questions accurately?", a: "It answers from your own program docs with citations and hands anything outside the knowledge base to a human, so it never guesses." },
      { q: "Will it fit our LMS?", a: "System integration connects it to the tools you already run — LMS, CRM, calendar and billing — as one synced record." },
      { q: "What does it cost?", a: "A multi-service stack priced as one project. The free audit scopes your enrolment flow and returns a fixed quote." },
    ],
    metaTitle: "Academy Stack — Education Operating System | Nodevant",
    metaDescription:
      "An enrollment and delivery operating system for education: 24/7 enquiry answering, application processing, cohort scheduling and learner nurture. Book a stack consultation.",
  },
  {
    slug: "home-services",
    name: "Home Services Stack",
    gradientWord: "System",
    heroLead: "Missed-Call Recovery",
    industry: "Home Services",
    routerGroup: "onsite",
    description:
      "Every call answered, every missed call returned before the lead cools, jobs booked into the right technician's day and review requests sent after completion.",
    proofLabel: "Proof",
    proofValue: "24/7 lead capture",
    liveUrl: null,
    liveLabel: null,
    timeline: "2–4 weeks",
    investmentRange: "INVESTMENT RANGE: MULTI-SERVICE STACK · FULL QUOTE AFTER AUDIT",
    poweredBy: ["lead-gen-pipeline", "ai-voice-agents", "system-integration"],
    related: ["bmaikr", "academy"],
    product: null,
    diagram: "voice",
    diagramStatus: "24/7 ANSWERING",
    diagramAlt: "An inbound call answered by a voice agent that books the job or returns a missed call before the lead cools.",
    problem: {
      pain: "In home services, the business goes to whoever answers the phone. But you're on a job, it's after hours, or two calls come at once — and the ring-out is a booked job at the competitor down the road. Missed calls aren't missed calls; they're lost revenue you never see.",
      tries: ["A voicemail no one returns fast enough", "The owner answering from a ladder", "An answering service reading a script", "Calling back tomorrow, if at all"],
    },
    modules: [
      { icon: "phone", title: "24/7 call answering", text: "Every call picked up in your brand's voice, any hour." },
      { icon: "refresh", title: "Missed-call recovery", text: "Any missed call returned before the lead goes cold." },
      { icon: "calendar-check", title: "Job booking", text: "Jobs booked into the right technician's day automatically." },
      { icon: "star", title: "Review requests", text: "Review asks sent the moment a job is marked complete." },
      { icon: "layers", title: "One synced record", text: "Calls, jobs and customers connected across your tools." },
    ],
    process: [
      { icon: "chat", title: "Script the calls", text: "We map the calls your best dispatcher takes and encode them." },
      { icon: "gear", title: "Build the system", text: "Answering, recovery, booking and reviews wired together." },
      { icon: "shield-check", title: "Test with real calls", text: "Live test calls before it answers a single customer." },
      { icon: "refresh", title: "Deploy & tune", text: "Live 24/7 with booking-rate and recovery tracked weekly." },
    ],
    faq: [
      { q: "Will callers know it's AI?", a: "It answers naturally in your brand's voice and never impersonates a person. Most callers just get booked and move on." },
      { q: "How fast is a missed call returned?", a: "Within minutes — while the caller still remembers dialling you, not the next morning when they've booked someone else." },
      { q: "Does it book into our schedule?", a: "Yes. It checks live availability and books the job into the right technician's day, writing straight into your system." },
      { q: "What does it cost?", a: "A multi-service stack priced as one project. The free audit scopes your call flow and returns a fixed quote." },
    ],
    metaTitle: "Home Services Stack — Missed-Call Recovery System | Nodevant",
    metaDescription:
      "A home services operating system: 24/7 call answering, missed-call recovery, job booking and review requests. Never lose a lead to a ring-out. Book a stack consultation.",
  },
];

export function getSolution(slug: string): SolutionDetail | undefined {
  return SOLUTION_DETAILS.find((s) => s.slug === slug);
}
