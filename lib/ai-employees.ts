import type { IconName } from "@/components/ui/Icon";

/**
 * The four AI employees Nodevant hires out.
 *
 * Positioning: we sell a JOB BEING DONE, not model access. Each role is one
 * "AI employee" on the published ladder — /pricing's first tier is literally
 * "1 custom AI employee (choose one role)", so a single role is $997/mo +
 * $4,500 implementation and nothing here invents a new number. Multi-role
 * pricing points at the existing Revenue Team / Workforce tiers.
 *
 * Capabilities below are limited to what the site already sells (voice agents,
 * lead-gen pipeline, the social content engine, agentic workflows +
 * integrations). Do not add a capability here that no service page backs up.
 */

/** Single-role price — mirrors the "AI Employee" tier on /pricing. */
export const EMPLOYEE_MONTHLY = "$997";
export const EMPLOYEE_SETUP = "$4,500";

/** What one employee includes, taken verbatim from the /pricing AI Employee tier. */
export const EMPLOYEE_INCLUDES: { icon: IconName; label: string }[] = [
  { icon: "chat", label: "Voice, SMS, chat or email" },
  { icon: "puzzle", label: "Up to 3 integrations" },
  { icon: "refresh", label: "Up to 3 core workflows" },
  { icon: "phone", label: "500 voice minutes / mo" },
  { icon: "bolt", label: "2,500 digital actions / mo" },
  { icon: "gear", label: "Monthly optimization + reporting" },
];

export interface AiEmployee {
  slug: string;
  name: string;
  /** Card label — the role, not the product name. */
  role: string;
  icon: IconName;
  /** Where the full page lives. The receptionist already has a money page. */
  href: string;
  /** True when href sits outside /ai-employees/ (don't build a detail page). */
  external?: boolean;
  /** One-line job description, written the way you'd brief a new hire. */
  jobTitle: string;
  summary: string;
  /** The actual duties. Kept concrete — no "leverages AI to synergise". */
  does: string[];
  /** Metric LABELS the dashboard reports. Never ship invented values. */
  tracks: string[];
  bestFor: string;
  /** What this job costs you while a person still does it. Unique per role —
   *  shared boilerplate across sibling pages is what makes Google fold them
   *  together as duplicates. */
  costToday: string;
  /** How this role hands work to the others. */
  handoff: string;
  /** Where the underlying capability is documented on the site. */
  backedBy: { label: string; href: string }[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export const AI_EMPLOYEES: AiEmployee[] = [
  {
    slug: "ai-receptionist",
    name: "AI Receptionist",
    role: "Front desk",
    icon: "phone",
    href: "/solutions/ai-receptionist/",
    external: true,
    jobTitle:
      "Answers your business 24/7 and turns every caller into a booked appointment or a logged lead.",
    summary:
      "The first hire for most businesses, because a missed call is the one loss you never see. It never reaches a spreadsheet, so it never gets followed up.",
    does: [
      "Answers every inbound call on the first ring — nights, weekends and overflow",
      "Answers your common questions from a knowledge base you control",
      "Qualifies the caller and works out which service they need",
      "Books, reschedules and cancels straight into your real calendar",
      "Warm-transfers the calls that genuinely need a person, with context",
      "Writes the caller, the reason and a full transcript to your CRM",
      "Sends the confirmation and the reminder so people actually turn up",
      "Handles missed-call text-back when every line is busy",
    ],
    tracks: [
      "Calls handled",
      "Leads captured",
      "Appointments booked",
      "Transferred to staff",
      "After-hours calls saved",
    ],
    bestFor: "Service businesses losing enquiries to voicemail after 5pm.",
    costToday:
      "A missed call is the only lost sale that leaves no trace — no row in the CRM, no note to follow up, nothing to review at the end of the month. Most owners underestimate it badly because the evidence is invisible. Pull your phone records for last month and count the inbound calls under 15 seconds: that is the number, and it is usually the cheapest revenue in the business to recover.",
    handoff:
      "Every booking it takes triggers the operations employee to confirm and notify. Every caller who does not book is handed to the sales employee for follow-up rather than being forgotten.",
    backedBy: [
      { label: "AI Voice Agents", href: "/services/ai-voice-agents/" },
      { label: "What it costs", href: "/pricing/ai-voice-agent-cost/" },
    ],
    metaTitle: "AI Receptionist — Answer Every Call 24/7 | Nodevant",
    metaDescription:
      "An AI receptionist that answers every call, books appointments and logs leads to your CRM 24/7.",
    keywords: ["ai receptionist", "ai phone answering", "virtual ai receptionist"],
  },
  {
    slug: "ai-sales-employee",
    name: "AI Sales Employee",
    role: "Follow-up & conversion",
    icon: "funnel",
    href: "/ai-employees/ai-sales-employee/",
    jobTitle:
      "Follows up with every lead until they book, buy, decline or need a human — and never forgets one.",
    summary:
      "The receptionist works inbound: customer to business. This role works the other direction — business to lead — and it exists because most revenue is lost to silence, not to rejection.",
    does: [
      "Responds to a new lead within minutes, not the next morning",
      "Runs the follow-up sequence across SMS, email and outbound voice",
      "Qualifies against your rules and flags the leads worth a human call",
      "Chases the quote that was sent and never answered",
      "Recovers no-shows and re-engages leads that went cold months ago",
      "Handles the routine objections and sends the booking link",
      "Moves the opportunity through your CRM stages automatically",
      "Stops the moment they reply or book — no sequence talking over a real conversation",
    ],
    tracks: [
      "Leads contacted",
      "Follow-ups sent",
      "Cold leads recovered",
      "Appointments generated",
      "Average speed to first response",
    ],
    bestFor:
      "Teams generating enough leads that follow-up is the bottleneck, not lead volume.",
    costToday:
      "Follow-up is the work that always loses to whatever is urgent. A quote goes out, the day gets busy, and nobody chases it — not because the team is careless, but because chasing has no deadline attached. That is why most pipelines leak in the middle rather than at the top, and why hiring more lead sources rarely fixes it.",
    handoff:
      "It picks up every caller the receptionist could not close, and hands the ones who commit to the operations employee to schedule and confirm.",
    backedBy: [
      { label: "Lead Gen Pipeline", href: "/services/lead-gen-pipeline/" },
      { label: "The lead-gen blueprint", href: "/blog/how-to-automate-lead-generation/" },
    ],
    metaTitle: "AI Sales Employee — Automated Lead Follow-Up That Never Forgets | Nodevant",
    metaDescription:
      "Hire an AI sales employee that responds to every lead in minutes, runs multi-channel follow-up, recovers cold leads and books appointments into your calendar.",
    keywords: [
      "ai sales agent",
      "ai sales employee",
      "automated lead follow up",
      "ai sdr",
      "ai lead nurturing",
    ],
  },
  {
    slug: "ai-content-employee",
    name: "AI Content Employee",
    role: "Marketing content",
    icon: "video",
    href: "/ai-employees/ai-content-employee/",
    jobTitle:
      "Turns the work you already do into a steady stream of on-brand content, published for you.",
    summary:
      "Most small businesses do not stop posting because they ran out of ideas. They stop because the person doing it got busy. This role removes the person from the loop without removing the brand.",
    does: [
      "Learns your brand once — voice, colours, offers and goals",
      "Generates avatar spokesperson videos without a filming day",
      "Produces UGC-style ads and product visuals from your catalogue",
      "Writes captions and hashtags per platform, not copy-pasted across them",
      "Formats vertical for TikTok and Reels, professional for LinkedIn",
      "Sends every piece for your approval before anything goes out",
      "Schedules and publishes to your connected accounts at the right times",
      "Feeds engagement data back in, so next month's content is sharper",
    ],
    tracks: [
      "Videos produced",
      "Posts published",
      "Platforms covered",
      "Impressions",
      "Leads attributed to content",
    ],
    bestFor:
      "Businesses whose marketing goes quiet whenever the owner gets busy.",
    costToday:
      "Marketing consistency is almost never a creative problem. It is a capacity problem: the person who posts is usually the person who also runs the business, so posting stops the moment work gets busy — which is exactly when the pipeline needs filling for six weeks from now. The cost is not the missed post; it is the quiet gap in enquiries a month later.",
    handoff:
      "It takes the finished jobs the operations employee closes out and turns them into proof — before-and-after posts and reviews that bring the next caller to the receptionist.",
    backedBy: [
      { label: "Social autopilot", href: "/#social" },
      { label: "Custom AI Solutions", href: "/services/custom-ai-solutions/" },
    ],
    metaTitle: "AI Content Employee — Branded Video & Social, Published for You | Nodevant",
    metaDescription:
      "Hire an AI content employee that creates avatar videos, UGC-style ads and platform-tuned posts from your brand, then publishes them across your social accounts after you approve.",
    keywords: [
      "ai content creation service",
      "ai social media automation",
      "ai video marketing agency",
      "automated social media posting",
      "ai content employee",
    ],
  },
  {
    slug: "ai-operations-employee",
    name: "AI Operations Employee",
    role: "Back office",
    icon: "gear",
    href: "/ai-employees/ai-operations-employee/",
    jobTitle:
      "Runs the repetitive admin between the sale and the invoice, so your team stays on the work itself.",
    summary:
      "The least glamorous role and often the one that buys back the most hours — the confirmations, updates, chasing and re-typing that quietly consume a day a week.",
    does: [
      "Confirms appointments and notifies the right crew or staff member",
      "Keeps the CRM current without anyone re-typing anything",
      "Moves jobs through their stages and alerts on the ones that stall",
      "Triggers invoices and chases the ones that go unpaid",
      "Collects the documents and details you need before work starts",
      "Requests the review once the job is actually finished",
      "Syncs data between the tools that do not talk to each other",
      "Sends the daily summary so nothing needs chasing by memory",
    ],
    tracks: [
      "Tasks automated",
      "Customer updates sent",
      "Staff notifications",
      "Review requests",
      "Estimated hours saved",
    ],
    bestFor:
      "Operations with a clear job lifecycle — booked, scheduled, completed, invoiced.",
    costToday:
      "This is the work nobody has a job title for: confirming, updating, re-typing, chasing the invoice, asking for the review. It gets absorbed across three or four people in small chunks, which is precisely why it never shows up as a line item — and why it is usually the largest single block of recoverable hours in the business.",
    handoff:
      "It confirms what the receptionist books, keeps the sales employee's CRM stages accurate, and tells the content employee when a job is finished and worth posting.",
    backedBy: [
      { label: "Agentic Workflows", href: "/services/agentic-workflows/" },
      { label: "System Integration", href: "/services/system-integration/" },
    ],
    metaTitle: "AI Operations Employee — Automate the Back Office | Nodevant",
    metaDescription:
      "Hire an AI operations employee to run appointment confirmations, CRM updates, job status, invoice chasing, document collection and review requests automatically.",
    keywords: [
      "back office automation",
      "ai operations automation",
      "business process automation service",
      "automate admin tasks",
      "ai operations employee",
    ],
  },
];

export function getAiEmployee(slug: string): AiEmployee | undefined {
  return AI_EMPLOYEES.find((e) => e.slug === slug);
}

/** Only the roles that get their own page under /ai-employees/. */
export const AI_EMPLOYEE_PAGES = AI_EMPLOYEES.filter((e) => !e.external);
