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
  /** One sentence answer engines can quote. Shown above the longer description. */
  definition?: string;
  /** Compact facts table for AEO. */
  facts?: { label: string; value: string }[];
  /** USD fixed-scope band. Drives the price on the page and in Offer schema. */
  offer?: { low: number; high: number };
  caseStudySlug?: string;
  /** Button label when the linked case study is a neighbouring deployment. */
  caseStudyLabel?: string;
  applicationCategory?: string;
  /** "offer" pages are sellable product landings, not the deployed-stack grid. */
  listing?: "stack" | "offer";
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
    related: ["credit-repair-software", "scalaro"],
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
    related: ["fairway360", "bmaikr"],
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
    related: ["lawn-care-software", "bmaikr"],
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
  {
    slug: "fairway360",
    name: "Fairway360",
    gradientWord: "Software",
    heroLead: "Golf Club",
    industry: "Hospitality · US golf courses & clubs",
    routerGroup: "onsite",
    definition:
      "Fairway360 is a done-for-you software stack for US golf courses and country clubs that answers every call, books tee times, and follows up on membership and event leads.",
    facts: [
      { label: "Who it's for", value: "US golf courses and country clubs" },
      { label: "What it does", value: "Answers calls, books tee times, follows up on membership and event leads" },
      { label: "Price", value: "$10,000–$20,000 USD, fixed after a free audit" },
      { label: "Timeline", value: "Live in 1–3 weeks" },
      { label: "After launch", value: "Monitored and tuned" },
      { label: "Live reference", value: "fairway360.io" },
      { label: "Built on", value: "Scalaro voice and lead infrastructure" },
    ],
    description:
      "Built for clubs whose pro shop cannot staff a night desk. Voice answering, tee-time booking and lead follow-up run on the same Scalaro infrastructure already live at fairway360.io. You get a fixed-scope build for your club, not a seat in someone else's tool.",
    proofLabel: "Live",
    proofValue: "fairway360.io · 24/7 answering",
    liveUrl: "https://fairway360.io",
    liveLabel: "Fairway360",
    timeline: "1–3 weeks",
    investmentRange: "USD $10,000–$20,000 · FIXED SCOPE · FINAL QUOTE AFTER AUDIT",
    offer: { low: 10000, high: 20000 },
    poweredBy: ["ai-voice-agents", "lead-gen-pipeline"],
    related: ["scalaro", "home-services"],
    product: "fairway360",
    caseStudySlug: "fairway360",
    applicationCategory: "BusinessApplication",
    listing: "stack",
    diagram: "voice",
    diagramStatus: "24/7 ANSWERING",
    diagramAlt: "An inbound club call answered by software that books a tee time and logs the lead.",
    problem: {
      pain: "A golf course loses the booking when the pro shop is with a member or the enquiry arrives after close. The call does not show up in a report. It just goes to the club down the road.",
      tries: ["A voicemail box checked in the morning", "The pro shop answering between members", "An answering service reading a script", "Calling back the next day, if at all"],
    },
    modules: [
      { icon: "phone", title: "Every call answered", text: "Inbound calls picked up in the club's voice, including after hours." },
      { icon: "calendar-check", title: "Tee-time booking", text: "Availability checked and the time confirmed on the call." },
      { icon: "funnel", title: "Lead follow-up", text: "Membership and event enquiries captured when the shop is busy." },
      { icon: "layers", title: "On proven infrastructure", text: "Deployed on the Scalaro framework already running in production." },
      { icon: "refresh", title: "Monitored after launch", text: "Booking rate and missed calls watched after go-live." },
    ],
    process: [
      { icon: "target", title: "Map the desk", text: "We trace how your club actually answers, books and follows up." },
      { icon: "gear", title: "Configure the stack", text: "Voice, tee sheet and follow-up wired to your tools." },
      { icon: "shield-check", title: "Test real calls", text: "Live test calls before it answers a member." },
      { icon: "refresh", title: "Launch and monitor", text: "Live in 1–3 weeks, then watched and tuned." },
    ],
    faq: [
      { q: "What is Fairway360?", a: "Fairway360 is a done-for-you software stack for US golf courses and country clubs. It answers calls, books tee times, and follows up on membership and event leads. The live reference is fairway360.io." },
      { q: "Who is it for?", a: "US golf courses and country clubs that lose bookings when the pro shop is busy or closed. It is a build for your club, not a generic consumer app." },
      { q: "How much does Fairway360 cost?", a: "Most club stacks land between $10,000 and $20,000 USD, fixed before build. The free audit confirms scope and returns the exact number. There is no hourly billing." },
      { q: "How fast does it go live?", a: "Typically 1–3 weeks after the audit, because the voice and lead infrastructure is already proven. A ground-up telephony project takes longer; this one does not start from zero." },
      { q: "Is this the same product as Scalaro?", a: "No. Scalaro is the agent framework. Fairway360 is the golf-club stack deployed on that framework. You can read the Fairway360 case study for how that deployment went." },
      { q: "Will callers know they are talking to software?", a: "It answers in the club's voice and does not impersonate a named person. Most callers get a tee time and hang up. Calls that need a person are handed over with the context." },
      { q: "What happens after launch?", a: "The stack is monitored after go-live. We watch booking and missed-call behaviour and tune it, rather than handing you a login and leaving." },
    ],
    metaTitle: "Fairway360 — Golf Club Software for US Courses | Nodevant",
    metaDescription:
      "Fairway360 is done-for-you golf club software for US courses: every call answered, tee times booked, leads followed up. $10,000–$20,000. Live in 1–3 weeks.",
  },
  {
    slug: "lawn-care-software",
    name: "Lawn Care Software",
    gradientWord: "Software",
    heroLead: "Lawn Care",
    industry: "Field service · US lawn & landscape",
    routerGroup: "onsite",
    definition:
      "Lawn care software from Nodevant is a done-for-you stack for US lawn, landscape, and field crews that captures every lead, books the route, and invoices the job when the work is done.",
    facts: [
      { label: "Who it's for", value: "US lawn care, landscape, and similar route businesses" },
      { label: "What it replaces", value: "Missed calls, whiteboard routing, and invoices sent days later" },
      { label: "Price", value: "$10,000–$20,000 USD, fixed after a free audit" },
      { label: "Timeline", value: "Live in 1–3 weeks" },
      { label: "Includes", value: "Answering, booking, job status, invoicing, review requests" },
      { label: "After launch", value: "Monitored for missed calls and unbilled jobs" },
      { label: "Closest deployment", value: "GlobalShield360 field-service case study" },
    ],
    description:
      "Built for owners who are on a mower when the phone rings. The stack answers, books the visit onto the right crew's day, moves the job through completion, and sends the invoice without a second system. Fixed scope, then monitored after launch.",
    proofLabel: "Pattern",
    proofValue: "Same field flow as GlobalShield360",
    liveUrl: null,
    liveLabel: null,
    timeline: "1–3 weeks",
    investmentRange: "USD $10,000–$20,000 · FIXED SCOPE · FINAL QUOTE AFTER AUDIT",
    offer: { low: 10000, high: 20000 },
    poweredBy: ["lead-gen-pipeline", "ai-voice-agents", "system-integration"],
    related: ["home-services", "bmaikr"],
    product: null,
    caseStudySlug: "bmaikr",
    caseStudyLabel: "Read the field-service case study",
    applicationCategory: "BusinessApplication",
    listing: "offer",
    diagram: "hub",
    diagramStatus: "ROUTE BOOKED",
    diagramAlt: "A lawn-care lead moving from the missed call through booking and the crew route to the invoice.",
    problem: {
      pain: "Lawn and landscape companies lose the job in the gaps: a call during a route, an estimate written on paper, an invoice sent days later. The work got done. The money and the next booking did not.",
      tries: ["A voicemail returned after the route", "The owner booking jobs from the truck", "A group text for who is on which lawn", "Invoices batched on Sunday night"],
    },
    modules: [
      { icon: "phone", title: "Calls answered on the route", text: "Every inbound call picked up while the crew is on a job." },
      { icon: "calendar-check", title: "Visits booked", text: "The job lands on the right crew's day, not a sticky note." },
      { icon: "truck", title: "Route status", text: "Each job moves from booked to done without a whiteboard." },
      { icon: "doc", title: "Invoice when the work is done", text: "Completed visits billed without a weekend catch-up." },
      { icon: "star", title: "Review after the visit", text: "A review request goes out once the job is actually finished." },
      { icon: "refresh", title: "Monitored after launch", text: "Missed calls and unbilled jobs watched after go-live." },
    ],
    process: [
      { icon: "target", title: "Map one route", text: "We follow a real lead from the ring to the paid invoice." },
      { icon: "gear", title: "Build the stack", text: "Answering, booking, status and invoicing connected." },
      { icon: "shield-check", title: "Test the handoffs", text: "Missed-call and invoice paths rehearsed before go-live." },
      { icon: "refresh", title: "Launch and monitor", text: "Live in 1–3 weeks, then tuned on real calls." },
    ],
    faq: [
      { q: "What is Nodevant lawn care software?", a: "It is a done-for-you software stack for US lawn, landscape, and similar route businesses. It captures the lead, books the visit, tracks the job, and invoices when the work is done." },
      { q: "Is this an off-the-shelf lawn app?", a: "No. It is built around how your crews, calendar and invoicing already work. You own the deployment. It is not a seat in a generic field-service subscription." },
      { q: "How much does it cost?", a: "Typical builds are $10,000–$20,000 USD, fixed after a free audit. The audit is what turns that band into a number for your routes, cities and tools. No hourly billing." },
      { q: "How long until it is live?", a: "Most lawn and field stacks go live in 1–3 weeks. A single missed-call and booking flow is the short end of that. Extra locations or a custom price book add time, and the audit says which." },
      { q: "Will customers know a person did not pick up?", a: "The stack answers in your business's voice and books the visit. It does not pretend to be a named employee. Calls that need a person are handed over with the address and the request." },
      { q: "Do you have a lawn-care case study?", a: "The closest published deployment is GlobalShield360, a field-service stack that runs lead, dispatch and invoice in one system. The lawn stack uses that same job lifecycle, configured for routes and recurring visits rather than storm restoration." },
      { q: "What is included after launch?", a: "Monitoring is part of the build. We watch for missed calls and jobs that stall before the invoice, and tune the stack after it is live." },
    ],
    metaTitle: "Lawn Care Software for US Crews | Nodevant",
    metaDescription:
      "Done-for-you lawn care software for US crews: every lead captured, routes booked, jobs invoiced. $10,000–$20,000, live in 1–3 weeks, monitored after launch.",
  },
  {
    slug: "credit-repair-software",
    name: "Credit Repair Software",
    gradientWord: "Software",
    heroLead: "Credit Repair",
    industry: "Financial services · US credit teams",
    routerGroup: "program",
    definition:
      "Credit repair software from Nodevant is a Storehouse360-based stack for US credit and financial teams that pulls 3-bureau data, tracks the work on each client, and keeps every decision auditable.",
    facts: [
      { label: "Who it's for", value: "US credit and financial teams — not consumers seeking repair" },
      { label: "What it is", value: "Software Nodevant builds. Nodevant does not operate a credit-repair service." },
      { label: "Based on", value: "Storehouse360, the live financial hub" },
      { label: "Includes", value: "3-bureau view, per-file tracking, audit trail" },
      { label: "Price", value: "$10,000–$20,000 USD, fixed after a free audit" },
      { label: "Timeline", value: "Live in 1–3 weeks for a standard scope" },
      { label: "After launch", value: "Monitored for stalled files and failed syncs" },
    ],
    description:
      "Nodevant does not operate a consumer credit-repair service. We build the software a credit business runs: bureau data in one view, the work on each file tracked, and the reason for each step stored. Storehouse360 is the live reference deployment. Your build is scoped to your letters, portals and billing.",
    proofLabel: "Reference",
    proofValue: "Storehouse360 financial hub",
    liveUrl: "https://storehouse360.com",
    liveLabel: "Storehouse360",
    timeline: "1–3 weeks",
    investmentRange: "USD $10,000–$20,000 · FIXED SCOPE · FINAL QUOTE AFTER AUDIT",
    offer: { low: 10000, high: 20000 },
    poweredBy: ["complex-logic-engines", "system-integration", "custom-ai-solutions"],
    related: ["storehouse360", "scalaro"],
    product: "storehouse360",
    caseStudySlug: "storehouse360",
    caseStudyLabel: "Read the Storehouse360 case study",
    applicationCategory: "FinanceApplication",
    listing: "offer",
    diagram: "modular",
    diagramStatus: "FILES TRACKED",
    diagramAlt: "Client credit files, bureau data and the audit trail joined into one software stack.",
    problem: {
      pain: "A credit business dies in the file: bureau portals that do not match, letters tracked in a spreadsheet, and a status the client cannot see. Scaling means more people re-checking the same three sites.",
      tries: ["A login per bureau and a notebook", "Dispute status in a spreadsheet", "Clients calling for an update you have to look up", "Billing kept in a separate tool from the file"],
    },
    modules: [
      { icon: "chart", title: "3-bureau view", text: "Equifax, Experian and TransUnion pulled into one client record." },
      { icon: "doc", title: "Work tracked per file", text: "Letters, status and next step live on the client, not in an inbox." },
      { icon: "shield-check", title: "Auditable steps", text: "Each recommendation stores the inputs that produced it." },
      { icon: "layers", title: "Storehouse360 base", text: "Configured from the financial hub already running in production." },
      { icon: "refresh", title: "Monitored after launch", text: "Stalled files and failed syncs watched after go-live." },
    ],
    process: [
      { icon: "target", title: "Map the file", text: "We document how a client moves from intake to the next bureau pull." },
      { icon: "gear", title: "Configure the hub", text: "Bureau data, file status and billing connected for your workflow." },
      { icon: "chart", title: "Check it on real files", text: "Run against historical clients before anyone relies on it." },
      { icon: "refresh", title: "Launch and monitor", text: "Live in 1–3 weeks for a standard scope, then tuned." },
    ],
    faq: [
      { q: "What is Nodevant credit repair software?", a: "It is a Storehouse360-based software stack for US credit and financial teams. It puts 3-bureau data, the work on each client file, and an audit trail in one system. Nodevant builds the software. We do not run a consumer credit-repair service." },
      { q: "Is this Storehouse360?", a: "Storehouse360 is the live reference: a financial hub with 3-bureau credit intelligence, card insights, funding matches and property discovery. A credit-repair build starts from that hub and is configured to your letters, portals and billing. You can read the Storehouse360 case study for the deployment." },
      { q: "How much does it cost?", a: "A standard credit-team stack is $10,000–$20,000 USD, fixed after the free audit. Extra bureaus integrations, a client portal, or multi-brand billing move the quote. The audit is where that gets decided, before any build starts." },
      { q: "How long does a build take?", a: "A stack scoped to bureau data, file tracking and billing typically goes live in 1–3 weeks. Deeper custom logic, of the kind on the full Storehouse360 hub, runs longer and is quoted separately." },
      { q: "Can we show a client why a step was taken?", a: "Yes. The point of the audit trail is that each stored step keeps the inputs behind it, so a client or a reviewer can see why the file moved." },
      { q: "Do we have to replace our billing?", a: "No. System integration connects the stack to the billing and CRM you already use when those tools should stay. The audit lists what gets connected and what gets replaced." },
      { q: "What happens after it launches?", a: "Monitoring is included. We watch for stalled files and failed data syncs and tune the stack after launch, instead of ending the project at handoff." },
    ],
    metaTitle: "Credit Repair Software for US Firms | Nodevant",
    metaDescription:
      "Storehouse360-based credit repair software for US teams: 3-bureau data, file tracking, and an audit trail. $10,000–$20,000, live in 1–3 weeks. Free audit.",
  },
];

export function getSolution(slug: string): SolutionDetail | undefined {
  return SOLUTION_DETAILS.find((s) => s.slug === slug);
}
