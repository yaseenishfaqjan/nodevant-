// Rich per-case-study data — single source for /case-studies and every
// /case-studies/[slug]. A "case study" is a deployed system with real numbers,
// cross-linked to the /solutions stack and /services that powered it.
import type { IconName } from "@/components/ui/Icon";
import type { DiagramType } from "@/lib/services";

// Filter dimensions (single-select each, mirroring the design build)
export type Industry =
  | "fintech"
  | "manufacturing"
  | "saas"
  | "field"
  | "hospitality"
  | "consumer";
export type Outcome = "revenue" | "time" | "speed" | "cost" | "consolidation";
export type ServiceTag = "agentic" | "voice" | "logic" | "integration" | "leadgen" | "custom";

export interface CaseStudyDetail {
  slug: string;
  stackName: string; // display name of the stack/build
  industryLabel: string; // human label for the tag chip
  liveUrl: string;
  liveLabel: string;

  // Filter metadata (single-select dims)
  industry: Industry;
  outcome: Outcome;
  service: ServiceTag; // primary service dimension for the filter
  stack: string; // filter stack key, e.g. "scalaro" | "none"

  // Cross-links
  solutionSlug: string | null; // matching /solutions/[slug]
  servicesUsed: string[]; // matching /services/[slug] subpage slugs
  tools: string[]; // mono tool chips

  // Hub card
  heroLead: string; // headline minus gradient word
  gradientWord: string; // last word of the headline, gradient
  challenge: string; // 2 sentences
  solution: string; // 2 sentences
  bento: { value: string; label: string }[]; // 3 stat tiles
  diagram: DiagramType;
  diagramStatus: string;
  diagramAlt: string;

  // Subpage
  summary: { challenge: string; built: string; outcome: string };
  fullChallenge: string[]; // 2–3 paragraphs
  triedBefore: string[]; // 3–4 chip items
  modules: { icon: IconName; title: string; text: string }[];
  numbers: { metric: string; result: string }[]; // 6–8 rows
  quote: { text: string; attribution: string } | null;
  perspective: string; // "Why this one matters" engineer note (quote fallback)
  faq: { q: string; a: string }[];
  related: string[]; // 2 other case-study slugs

  metaTitle: string;
  metaDescription: string;
}

export const CASE_STUDY_DETAILS: CaseStudyDetail[] = [
  {
    slug: "storehouse360",
    stackName: "Storehouse360",
    industryLabel: "Fintech",
    liveUrl: "https://storehouse360.com",
    liveLabel: "Storehouse360",
    industry: "fintech",
    outcome: "revenue",
    service: "logic",
    stack: "storehouse360",
    solutionSlug: "storehouse360",
    servicesUsed: ["complex-logic-engines", "system-integration", "custom-ai-solutions"],
    tools: ["Node.js", "Python", "PostgreSQL", "OpenAI"],
    heroLead: "An all-in-one financial hub with end-to-end client",
    gradientWord: "automation.",
    challenge:
      "The client's finances lived in a dozen places: separate bureau portals, card and bank accounts, funding options, and property leads — all reconciled by hand in spreadsheets nobody trusted.",
    solution:
      "One financial hub — 3-bureau credit intelligence, credit- and debit-card insights, AI-matched funding to $400K, and real-estate opportunity discovery — with a client portal that cut support volume in week one.",
    bento: [
      { value: "6-in-1", label: "Money workflows" },
      { value: "3-bureau", label: "Credit monitoring" },
      { value: "White-label", label: "Ready to resell" },
    ],
    diagram: "modular",
    diagramStatus: "PLATFORM LIVE",
    diagramAlt:
      "A financial hub joining credit intelligence, card insights, funding and real-estate opportunities into one platform.",
    summary: {
      challenge: "A client's money was scattered across bureaus, cards, accounts and property leads, reconciled by hand with no single source of truth.",
      built: "A financial hub: 3-bureau credit intelligence, card and spending insights, AI-matched funding, real-estate opportunity discovery and AI document generation.",
      outcome: "One platform for credit, cards, funding and property — support volume down from day one, and a white-label build ready to resell.",
    },
    fullChallenge: [
      "Managing money well is a decision problem wearing a paperwork costume. The value is knowing where a client stands across credit, cards, funding and property — but that picture was buried under the mechanical work of pulling data from every bureau and account and stitching it together by hand.",
      "Every bureau had its own portal. Card and bank activity sat in yet another place. Funding options and real-estate leads lived in inboxes and spreadsheets that drifted over time. Scaling meant hiring more people to do more of the same manual reconciliation — which is the opposite of leverage.",
      "The business needed one live view of a client's whole financial position — connected to real data, made auditable, so any insight or match could be explained months later.",
    ],
    triedBefore: [
      "Separate portals for each credit bureau",
      "Card and account data tracked in spreadsheets",
      "A broker's gut feel on funding matches",
      "Real-estate leads scattered across inboxes",
    ],
    modules: [
      { icon: "chart", title: "3-bureau credit monitoring", text: "Equifax, Experian and TransUnion pulled and normalised into one live view." },
      { icon: "layers", title: "Card & spending insights", text: "Credit- and debit-card activity unified into one clear view of the money." },
      { icon: "brain", title: "AI-matched funding", text: "Client profiles scored against lenders for matches up to $400K, with reasoning attached." },
      { icon: "doc", title: "Real-estate opportunities", text: "Property and investment opportunities surfaced and matched to each client's profile." },
      { icon: "users", title: "Client portal", text: "Self-serve status and documents that cut inbound support volume in week one." },
      { icon: "shield-check", title: "Auditable decisions", text: "Every insight and match stores the inputs and rule output that drove it." },
    ],
    numbers: [
      { metric: "Money workflows unified", result: "6-in-1 platform" },
      { metric: "Credit bureaus monitored", result: "3, normalised to one view" },
      { metric: "Insight compile time", result: "Hours → seconds" },
      { metric: "Funding matched per client", result: "Up to $400K" },
      { metric: "Support volume after portal launch", result: "Down from week one" },
      { metric: "Decision audit trail", result: "100% logged" },
      { metric: "Deployment model", result: "White-label, resell-ready" },
    ],
    quote: null,
    perspective:
      "The hard part was never the AI — it was making financial decisions explainable after the fact. We encoded the logic deterministically and let the model handle only the drafting and surfacing, so every insight and match can be traced back to the exact inputs that produced it. That is what makes it safe to scale.",
    faq: [
      { q: "What does the hub actually unify?", a: "Credit intelligence, credit- and debit-card insights, AI-matched funding and real-estate opportunities — plus the client portal and billing — in one white-label platform." },
      { q: "Is the logic AI or hard rules?", a: "The financial logic is deterministic and encoded. The model only drafts and surfaces; it never decides eligibility, so every recommendation is explainable." },
      { q: "Can this be resold under our own brand?", a: "Yes. Storehouse360 is deployed as a white-label platform — the reference build runs live, and your instance is configured to your data sources, lenders and branding." },
      { q: "How is funding matched to $400K?", a: "Client profiles are scored against lender criteria by a decision engine that surfaces matches with the reasoning attached, so an advisor can explain any recommendation." },
    ],
    related: ["fabrioza", "scalaro"],
    metaTitle: "Storehouse360: An All-in-One Financial Hub | Nodevant Case Study",
    metaDescription:
      "How Nodevant built Storehouse360 — a financial hub unifying 3-bureau credit intelligence, card insights, AI-matched funding to $400K and real-estate opportunity discovery in one white-label platform.",
  },
  {
    slug: "fabrioza",
    stackName: "FABRIOZA",
    industryLabel: "Manufacturing",
    liveUrl: "https://fabrioza.com",
    liveLabel: "Fabrioza",
    industry: "manufacturing",
    outcome: "time",
    service: "agentic",
    stack: "fabrioza",
    solutionSlug: "fabrioza",
    servicesUsed: ["agentic-workflows", "lead-gen-pipeline", "ai-voice-agents"],
    tools: ["n8n", "OpenAI", "VAPI", "Webhooks"],
    heroLead: "Autonomous outreach and quoting for custom",
    gradientWord: "manufacturing.",
    challenge:
      "Quotes took two to three days because specs arrived over email and pricing meant chasing material costs and floor capacity. Buyers ordered from whoever answered first.",
    solution:
      "Structured spec intake, an automated pricing engine with approval gates, voice capture for phone enquiries, and follow-up that runs until the buyer decides.",
    bento: [
      { value: "24/7", label: "Autonomous outreach" },
      { value: "Voice AI", label: "Inbound answering" },
      { value: "0", label: "Sales hires needed" },
    ],
    diagram: "pipeline",
    diagramStatus: "PROCESSING",
    diagramAlt:
      "An enquiry flowing through structured spec capture and automated pricing into a tracked, followed-up quote.",
    summary: {
      challenge: "Custom-apparel quotes took days because specs arrived unstructured and pricing was manual, so fast buyers went elsewhere.",
      built: "Structured spec intake, an automated pricing engine with approval gates, voice capture and relentless follow-up.",
      outcome: "Quotes issued the same hour, 24/7 outreach and inbound answering, with no new sales hires.",
    },
    fullChallenge: [
      "Custom manufacturing dies in the gap between enquiry and quote. A buyer emails a spec — sizes, materials, print, quantity — and someone eventually reads it, works out the price against material cost and floor capacity, and sends a number two or three days later. By then the buyer has three other quotes and has ordered from whoever answered first.",
      "The work that wins orders is the work nobody has time for: reading the RFQ carefully, pricing it correctly, and following up until the buyer decides. It is repetitive, it is constant, and it is exactly the work that was being dropped whenever the floor got busy.",
      "The business needed the quote to move at the speed of the enquiry, without adding headcount to a margin-sensitive operation.",
    ],
    triedBefore: [
      "An inbox full of half-read RFQs",
      "Pricing worked out on a calculator",
      "A spreadsheet tracking production by colour",
      "Losing fast buyers to slower quotes",
    ],
    modules: [
      { icon: "doc", title: "Structured spec intake", text: "Email and form enquiries parsed into a clean, priceable product spec automatically." },
      { icon: "chart", title: "Automated pricing engine", text: "Rules-based quotes generated the same hour against your real cost model." },
      { icon: "shield-check", title: "Approval gates", text: "Anything outside the rules is flagged for a human before the quote goes out." },
      { icon: "phone", title: "Voice capture", text: "Phone enquiries answered and captured into the same pipeline, day or night." },
      { icon: "refresh", title: "Relentless follow-up", text: "Sequenced outreach runs until the buyer confirms or declines." },
    ],
    numbers: [
      { metric: "Quote turnaround", result: "2–3 days → same hour" },
      { metric: "Outreach coverage", result: "24/7, autonomous" },
      { metric: "Inbound phone enquiries", result: "Answered and captured" },
      { metric: "New sales hires required", result: "0" },
      { metric: "RFQs read and structured", result: "100%, automatically" },
      { metric: "Out-of-rule quotes", result: "Human-approved before send" },
      { metric: "Follow-up on open quotes", result: "Runs until decision" },
    ],
    quote: null,
    perspective:
      "Speed is the whole game in custom manufacturing — the first accurate quote usually wins. We did not try to replace the sales team; we removed the two days of reading and pricing that sat between the enquiry and the number, so a small operation can answer like a much larger one.",
    faq: [
      { q: "Will it price genuinely complex custom orders?", a: "Pricing is rules-based on your real cost model. Anything the rules do not cover is flagged for a human before the quote is sent, so complexity is handled rather than guessed." },
      { q: "Does it replace our sales team?", a: "No — it arms them. Reps stop retyping specs and pricing by hand and spend their time closing the quotes the system issues within the hour." },
      { q: "Can buyers still reach a person?", a: "Always. The voice agent handles first contact and follow-up and hands genuine conversations to your team with the full spec and quote context attached." },
      { q: "How does '0 sales hires' hold as you grow?", a: "The pipeline scales with volume, not headcount — more enquiries mean more automated quotes, not more coordinators retyping RFQs." },
    ],
    related: ["scalaro", "storehouse360"],
    metaTitle: "FABRIOZA: Quotes in the Hour, Not Days | Nodevant Case Study",
    metaDescription:
      "How Nodevant built FABRIOZA — structured spec intake, an automated pricing engine with approval gates and 24/7 voice capture for custom manufacturing. No new hires.",
  },
  {
    slug: "scalaro",
    stackName: "Scalaro Framework",
    industryLabel: "B2B SaaS",
    liveUrl: "https://scalaro.io",
    liveLabel: "Scalaro",
    industry: "saas",
    outcome: "cost",
    service: "agentic",
    stack: "scalaro",
    solutionSlug: "scalaro",
    servicesUsed: ["agentic-workflows", "ai-voice-agents", "lead-gen-pipeline"],
    tools: ["n8n", "OpenAI", "Clay", "VAPI"],
    heroLead: "Six specialized agents replacing an entire SDR",
    gradientWord: "function.",
    challenge:
      "Pipeline generation was logistics: list building, enrichment, rewriting the same opener, chasing no-replies. Reps researched all week and sold on Friday.",
    solution:
      "An agentic framework where sourcing, enrichment, messaging and voice agents hand off to each other across seven channels — with 196 tests guarding the handoffs.",
    bento: [
      { value: "6", label: "Specialized agents" },
      { value: "196", label: "Tests passing" },
      { value: "v0.9", label: "Production-ready" },
    ],
    diagram: "node-graph",
    diagramStatus: "AGENTS ACTIVE",
    diagramAlt:
      "Six specialised sales agents coordinating sourcing, enrichment, messaging, voice and booking through a central engine.",
    summary: {
      challenge: "A SaaS team spent its best hours on SDR logistics — sourcing, enriching and chasing — instead of closing.",
      built: "An agentic framework of six specialised agents that hand off across seven channels, guarded by 196 tests.",
      outcome: "The SDR function runs autonomously at a fraction of headcount cost, production-ready at v0.9.",
    },
    fullChallenge: [
      "A B2B pipeline needs constant feeding, and human SDRs are expensive, slow to ramp and quick to churn. The result is a familiar trap: the sales team spends its best hours prospecting — building lists, enriching accounts, rewriting the same opener — and closes in whatever time is left. The pipeline swings with headcount, and every departure resets the ramp.",
      "None of that work is actually selling. It is logistics: finding accounts that match the ICP, completing their data, sequencing outreach, and chasing no-replies across channels. It is repetitive and rule-bound, which is exactly what makes it automatable — if you can make the handoffs between steps reliable.",
      "The business needed the whole SDR motion to run without a human in the loop, and it needed to trust that a sourcing miss would not quietly poison the outreach downstream.",
    ],
    triedBefore: [
      "An SDR team that churns every six months",
      "A list bought and blasted once",
      "Point tools that do not talk to each other",
      "Reps prospecting instead of closing",
    ],
    modules: [
      { icon: "target", title: "Sourcing agent", text: "Finds and refreshes accounts that match your ICP continuously." },
      { icon: "sparkle", title: "Enrichment agent", text: "Completes and verifies account data before anything is sent." },
      { icon: "mail", title: "Messaging agent", text: "Writes and sequences outreach that reads like a person, per channel." },
      { icon: "phone", title: "Voice agent", text: "Dials, qualifies and books without a human on the line." },
      { icon: "calendar-check", title: "Booking agent", text: "Lands qualified prospects in the right rep's calendar with context." },
      { icon: "shield-check", title: "196-test harness", text: "Every agent handoff is guarded so a sourcing miss never poisons outreach." },
    ],
    numbers: [
      { metric: "Specialised agents in the framework", result: "6, coordinated" },
      { metric: "Channels covered", result: "7" },
      { metric: "Automated tests guarding handoffs", result: "196 passing" },
      { metric: "Release maturity", result: "v0.9, production-ready" },
      { metric: "SDR headcount to run the motion", result: "Near-zero" },
      { metric: "Prospecting hours returned to reps", result: "The whole week" },
      { metric: "Other stacks built on the framework", result: "Fairway360 and more" },
    ],
    quote: null,
    perspective:
      "Most 'AI SDR' demos fall apart at the handoffs — a bad enrichment quietly corrupts the outreach and you only find out when replies dry up. The 196-test harness is the actual product here: it is what lets six agents pass work to each other in production without a human babysitting every step.",
    faq: [
      { q: "Six agents — is that a real architecture or marketing?", a: "Real. Discrete agents own sourcing, enrichment, messaging, voice and booking, coordinated through one engine, with a 196-test harness guarding every handoff. Scalaro runs them in production." },
      { q: "What does '196 tests' actually protect?", a: "The seams between agents. A sourcing or enrichment error can silently poison downstream outreach; the tests catch bad handoffs before they reach a prospect." },
      { q: "Will automated outreach hurt our domain?", a: "No — sending is warmed up, volume-limited and deliverability-protected. It is sequenced and human-sounding, never a spray." },
      { q: "Is Scalaro a product we buy or a build?", a: "A build on the Scalaro framework, configured to your ICP, channels and CRM. It is also the foundation other Nodevant stacks — like Fairway360 — run on." },
    ],
    related: ["fairway360", "fabrioza"],
    metaTitle: "Scalaro: Six Agents Replacing an SDR Team | Nodevant Case Study",
    metaDescription:
      "How Nodevant built the Scalaro framework — six specialised sales agents across seven channels, guarded by 196 tests, replacing an entire SDR function at v0.9.",
  },
  {
    slug: "bmaikr",
    stackName: "BMAIKR Engine",
    industryLabel: "Field Services",
    liveUrl: "https://globalshield360.io",
    liveLabel: "GlobalShield360",
    industry: "field",
    outcome: "speed",
    service: "leadgen",
    stack: "bmaikr",
    solutionSlug: "bmaikr",
    servicesUsed: ["lead-gen-pipeline", "custom-ai-solutions", "ai-voice-agents"],
    tools: ["n8n", "OpenAI", "Computer Vision", "Twilio"],
    heroLead: "Storm lead to signed invoice in a single field operations",
    gradientWord: "platform.",
    challenge:
      "After a storm, the job goes to whoever quotes first. Leads arrived across four channels, measuring was manual, and estimates took days.",
    solution:
      "One command center: multi-channel lead capture, AI roof scanning and instant estimating, e-sign quotes, crew dispatch, claim tracking and invoicing.",
    bento: [
      { value: "Days→Hours", label: "Estimate to close" },
      { value: "100%", label: "Quotes followed up" },
      { value: "1", label: "Platform, lead to invoice" },
    ],
    diagram: "funnel",
    diagramStatus: "SYNCED",
    diagramAlt:
      "A field-operations pipeline from storm lead through AI estimate and dispatch to a signed invoice.",
    summary: {
      challenge: "Storm-damage jobs go to whoever quotes first, but leads were scattered, measuring was manual and estimates took days.",
      built: "One command center: multi-channel capture, AI roof scanning, instant estimates, dispatch, claims and invoicing.",
      outcome: "Estimate-to-close dropped from days to hours, every quote is followed up, and the job runs on one platform.",
    },
    fullChallenge: [
      "A field services business loses money in the seams. After a storm, the roof goes to whoever quotes first — but the storm lead sits unanswered, the estimate takes days because someone has to physically measure the roof, and the crew is dispatched by phone tag. Each handoff between capture, estimate, dispatch, claim and invoice is a place where the job stalls or the money leaks.",
      "The leads themselves arrived across four channels, so nobody had a single list of who to call first. Measuring meant a ladder and a tape, which made same-day estimates impossible. And once the job was won, the insurance claim and the invoice lived in separate apps that nobody reconciled.",
      "The business needed one system that carried a job from the first storm lead to a paid invoice without a manual handoff — because in field services, speed to quote is the whole competition.",
    ],
    triedBefore: [
      "Storm leads chased on a whiteboard",
      "Estimates measured by hand on a ladder",
      "Crews dispatched by group text",
      "Claims and invoices in separate apps",
    ],
    modules: [
      { icon: "funnel", title: "Multi-channel capture", text: "Storm leads from four channels captured and qualified the moment weather hits." },
      { icon: "image", title: "AI roof scanning", text: "Roofs measured from imagery — no ladder, no tape, no waiting." },
      { icon: "doc", title: "Instant estimates", text: "Priced, e-signable quotes generated and sent on the spot." },
      { icon: "truck", title: "Crew dispatch", text: "The right crew routed to the job automatically." },
      { icon: "shield-check", title: "Claim tracking", text: "Insurance claims progressed through their stages and never left to slip." },
      { icon: "coin", title: "Invoicing", text: "Completed jobs invoiced without a manual handoff." },
    ],
    numbers: [
      { metric: "Estimate to close", result: "Days → hours" },
      { metric: "Quotes followed up", result: "100%" },
      { metric: "Lead channels unified", result: "4 → 1 list" },
      { metric: "Roof measurement", result: "Ladder → AI scan" },
      { metric: "Job lifecycle", result: "1 platform, lead to invoice" },
      { metric: "Insurance claims", result: "Tracked, none left to slip" },
      { metric: "Manual handoffs between stages", result: "Removed" },
    ],
    quote: null,
    perspective:
      "In roofing, the winner is almost always the contractor who quotes first, so the entire build was about compressing the time between a storm lead and a signed estimate. Getting the roof measurement off the ladder and into an AI scan is what made same-hour quoting possible — everything downstream is just refusing to drop the job at a handoff.",
    faq: [
      { q: "Do the AI roof scans really skip the ladder?", a: "For measurement, yes — the system sizes the roof from imagery to price an estimate fast. A physical inspection still happens when the job warrants it, but it no longer blocks the quote." },
      { q: "Can it handle insurance claims end to end?", a: "It tracks each claim through its stages and flags anything stalling, so a claim never quietly dies between the adjuster and the crew." },
      { q: "Is GlobalShield360 the product we get?", a: "GlobalShield360 is the live deployment of the BMAIKR engine. Your build is configured to your service area, crews and pricing." },
      { q: "What does 'days to hours' depend on?", a: "The AI scan and instant estimate remove the measuring delay; the multi-channel capture removes the who-do-I-call-first delay. Together they compress the quote from days to the same day." },
    ],
    related: ["fairway360", "scalaro"],
    metaTitle: "BMAIKR / GlobalShield360: Storm Lead to Invoice | Nodevant Case Study",
    metaDescription:
      "How Nodevant built the BMAIKR engine behind GlobalShield360 — multi-channel capture, AI roof scanning, instant estimates, dispatch, claims and invoicing in one platform.",
  },
  {
    slug: "fairway360",
    stackName: "Scalaro-powered",
    industryLabel: "Hospitality",
    liveUrl: "https://fairway360.io",
    liveLabel: "Fairway360",
    industry: "hospitality",
    outcome: "speed",
    service: "voice",
    stack: "scalaro",
    solutionSlug: "scalaro",
    servicesUsed: ["ai-voice-agents", "lead-gen-pipeline"],
    tools: ["VAPI", "Scalaro", "Twilio", "n8n"],
    heroLead: "A hospitality operating system built on top of our own",
    gradientWord: "framework.",
    challenge:
      "Golf courses and clubs lose bookings to unanswered phones — pro shops are busy, and enquiries arrive outside office hours from every timezone.",
    solution:
      "Fairway360 deployed on the Scalaro framework rather than beside it: voice agents answer and book, lead capture runs continuously, and the infrastructure was already proven.",
    bento: [
      { value: "On Scalaro", label: "Built on our framework" },
      { value: "24/7", label: "Call answering" },
      { value: "Zero", label: "Missed bookings" },
    ],
    diagram: "voice",
    diagramStatus: "24/7 ANSWERING",
    diagramAlt:
      "An inbound call answered by a voice agent that captures the lead and books a tee time, running on the Scalaro framework.",
    summary: {
      challenge: "Golf clubs lose bookings whenever the pro shop is busy or closed, and enquiries arrive around the clock.",
      built: "Fairway360, deployed on the proven Scalaro framework — voice agents that answer and book, plus continuous lead capture.",
      outcome: "24/7 call answering with no missed bookings, on infrastructure that was already battle-tested.",
    },
    fullChallenge: [
      "Golf courses and country clubs live and die by the phone, and the phone is the thing they are worst placed to answer. The pro shop is serving members, the starter is on the first tee, and the enquiry that would have been a booking rings out. After hours it is worse: tee-time requests arrive from every timezone, long after anyone is there to pick up.",
      "A missed call at a club is not a missed call — it is a booking that went to another course. The revenue is real and it is recurring, and it leaks quietly because no one is counting the calls that were never answered.",
      "The business needed every call answered and every enquiry captured, around the clock, without staffing a night desk — and it needed to launch quickly rather than waiting on a ground-up build.",
    ],
    triedBefore: [
      "A voicemail box no one returns fast enough",
      "The pro shop answering between members",
      "An answering service reading a script",
      "Calling back tomorrow, if at all",
    ],
    modules: [
      { icon: "phone", title: "24/7 voice answering", text: "Every call picked up in the club's voice, any hour, any timezone." },
      { icon: "calendar-check", title: "Tee-time booking", text: "Availability checked and the booking confirmed during the call." },
      { icon: "funnel", title: "Continuous lead capture", text: "Enquiries captured and nurtured whenever the shop cannot pick up." },
      { icon: "layers", title: "On the Scalaro framework", text: "Deployed on proven infrastructure rather than a ground-up rebuild." },
    ],
    numbers: [
      { metric: "Call answering", result: "24/7" },
      { metric: "Missed bookings", result: "Zero" },
      { metric: "Underlying infrastructure", result: "Scalaro framework" },
      { metric: "Timezones covered", result: "All, around the clock" },
      { metric: "Night-desk staff required", result: "0" },
      { metric: "Time to launch vs ground-up build", result: "Substantially faster" },
      { metric: "Enquiries captured when shop is busy", result: "All" },
    ],
    quote: null,
    perspective:
      "Fairway360 is the clearest proof that Scalaro is real infrastructure and not a one-off. We did not build a hospitality product beside the framework — we deployed on top of it, which is why it launched fast and answered reliably from day one. When your platform can carry someone else's product, that is the platform working.",
    faq: [
      { q: "Will callers know they are talking to AI?", a: "The agent answers naturally in the club's voice and never impersonates a specific person. Most callers simply get their tee time booked and move on." },
      { q: "What does 'built on Scalaro' actually mean?", a: "Fairway360 runs on the same Scalaro framework we built for SaaS sales, reused for hospitality. It launched faster because the voice and lead-capture infrastructure was already proven in production." },
      { q: "How fast is an after-hours enquiry handled?", a: "Immediately — the voice agent answers on the first ring at any hour, so a tee-time request at 2am is booked rather than lost to voicemail." },
      { q: "Does it book straight into our system?", a: "Yes. It checks live availability and confirms the booking during the call, writing into your tee-sheet rather than leaving a message for someone to action later." },
    ],
    related: ["scalaro", "bmaikr"],
    metaTitle: "Fairway360: 24/7 Booking on the Scalaro Framework | Nodevant Case Study",
    metaDescription:
      "How Nodevant deployed Fairway360 on its own Scalaro framework — 24/7 AI voice answering and continuous lead capture for golf clubs, with zero missed bookings.",
  },
  {
    slug: "peachpicks",
    stackName: "Custom build",
    industryLabel: "Consumer",
    liveUrl: "https://peachpicks.app",
    liveLabel: "PeachPicks",
    industry: "consumer",
    outcome: "consolidation",
    service: "custom",
    stack: "none",
    solutionSlug: null,
    servicesUsed: ["system-integration", "custom-ai-solutions"],
    tools: ["Next.js", "PostgreSQL", "OpenAI", "Stripe"],
    heroLead: "A consumer prediction platform with a local sponsor",
    gradientWord: "marketplace.",
    challenge:
      "A two-sided product with no off-the-shelf answer: fans wanted free predictions and standings, local businesses wanted access to those fans.",
    solution:
      "A free-to-play prediction platform with points, statewide leaderboards and a sponsor marketplace connecting local businesses to an engaged audience.",
    bento: [
      { value: "Statewide", label: "Leaderboards" },
      { value: "Sponsor", label: "Marketplace" },
      { value: "Free-to-play", label: "Model" },
    ],
    diagram: "hub",
    diagramStatus: "LIVE",
    diagramAlt:
      "Players and local sponsors both connected to a shared statewide leaderboard at the centre of the platform.",
    summary: {
      challenge: "A two-sided consumer product — fans and local sponsors — with no off-the-shelf platform that fit.",
      built: "A custom free-to-play prediction platform with points, statewide leaderboards and a sponsor marketplace.",
      outcome: "One product that gives fans a free game and gives local businesses direct access to an engaged audience.",
    },
    fullChallenge: [
      "PeachPicks is a two-sided product, and two-sided products have no off-the-shelf answer. On one side, fans want a free, fun place to make predictions, earn points and see where they rank against the whole state. On the other, local businesses want direct access to exactly that engaged, local audience. Neither side is served by a generic tool, and the value only appears when both sides are on the same platform.",
      "Off-the-shelf software could do a piece of it — a leaderboard here, a payments integration there — but nothing tied the free-to-play consumer experience to a working sponsor marketplace. The product had to be built, not configured, because the whole point was the connection between the two sides.",
      "The business needed a platform it owned outright: the prediction game, the statewide standings, and the marketplace that turns an engaged audience into local sponsorship revenue.",
    ],
    triedBefore: [
      "Generic leaderboard plugins that do not scale",
      "Stitching consumer tools to a payments app",
      "No marketplace connecting fans to sponsors",
      "A product no vendor actually sells",
    ],
    modules: [
      { icon: "trophy", title: "Statewide leaderboards", text: "Fans ranked against the whole state, updated as results come in." },
      { icon: "target", title: "Free-to-play predictions", text: "A points-based prediction game with no barrier to entry." },
      { icon: "briefcase", title: "Sponsor marketplace", text: "Local businesses connected directly to an engaged local audience." },
      { icon: "layers", title: "Integrated payments", text: "Sponsorship and transactions wired in as one owned system." },
    ],
    numbers: [
      { metric: "Product sides served", result: "2 — players and sponsors" },
      { metric: "Leaderboard scope", result: "Statewide" },
      { metric: "Player model", result: "Free-to-play" },
      { metric: "Sponsor access", result: "Direct marketplace" },
      { metric: "Off-the-shelf equivalent", result: "None — fully custom" },
      { metric: "Ownership", result: "Client owns the code" },
      { metric: "Systems consolidated into one build", result: "Game, standings, marketplace" },
    ],
    quote: null,
    perspective:
      "Two-sided marketplaces are the hardest consumer products to bootstrap because neither side shows up until the other one has. We built the free-to-play game to bring the fans and the sponsor marketplace to monetise them, as one owned platform — because the value was never in either half alone, it was in the connection.",
    faq: [
      { q: "Why build this custom instead of using existing tools?", a: "Because it is two-sided. A leaderboard plugin or a payments app can each do a slice, but nothing off the shelf connects a free-to-play consumer game to a working local-sponsor marketplace. That connection is the product." },
      { q: "Who owns the platform?", a: "The client. The prediction game, the statewide standings and the sponsor marketplace are one owned build — source code and all — not a rented SaaS stack." },
      { q: "How does a free-to-play model make money?", a: "The free game builds the engaged audience; the sponsor marketplace monetises it by connecting local businesses directly to those fans. The two sides fund each other." },
      { q: "Is there a Nodevant stack behind this like the others?", a: "No — PeachPicks is a fully custom build rather than a productised stack. It draws on our system integration and custom AI services, assembled specifically for this two-sided problem." },
    ],
    related: ["storehouse360", "scalaro"],
    metaTitle: "PeachPicks: A Two-Sided Prediction Marketplace | Nodevant Case Study",
    metaDescription:
      "How Nodevant built PeachPicks — a custom free-to-play sports prediction platform with statewide leaderboards and a local sponsor marketplace, owned by the client.",
  },
];

export function getCaseStudy(slug: string): CaseStudyDetail | undefined {
  return CASE_STUDY_DETAILS.find((c) => c.slug === slug);
}
