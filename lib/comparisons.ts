// Commercial comparison pages. Prices are the vendor's published figures,
// with a link and the date they were checked. Anything a vendor does not
// publish is described as unpublished — not filled in from a roundup.

import { COMPARISON_BATCH } from "@/lib/comparisons-batch";

export interface ComparisonPage {
  slug: string;
  name: string;
  eyebrow: string;
  heroLead: string;
  gradientWord: string;
  definition: string;
  /** One answer-first paragraph. Falls back to definition in the template. */
  quickAnswer?: string;
  verdict: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  /** ISO date the cited vendor pages were checked. */
  checked: string;
  tableHead: [string, string, string];
  table: { aspect: string; them: string; us: string }[];
  chooseThem: { title: string; items: string[] };
  chooseUs: { title: string; items: string[] };
  sections: { heading: string; paragraphs: string[] }[];
  faq: { q: string; a: string }[];
  sources: { label: string; href: string; note: string }[];
  related: { href: string; label: string }[];
}

const COMPARISON_PAGE_LIST: ComparisonPage[] = [
  {
    slug: "lawn-care-software-vs-jobber",
    name: "Lawn care software vs Jobber",
    eyebrow: "Comparison · US lawn and landscape",
    heroLead: "Lawn care software",
    gradientWord: "vs Jobber",
    definition:
      "Jobber is subscription field-service software you rent and run. Nodevant lawn care software is a done-for-you stack, usually $10,000–$20,000 USD, built around your routes and monitored after launch.",
    quickAnswer:
      "Keep Jobber if quotes, scheduling, and invoices are the whole job and your office can run the app. In October 2026 Jobber listed Core from $29 a month, Connect from $99, and Grow from $149, billed annually for one user. A Nodevant lawn stack is $10,000–$20,000 once, and it is the better buy when the phone during the route is what loses the work. Plenty of crews should stay on Jobber.",
    verdict:
      "Buy Jobber if you want quotes, scheduling, and invoices in a known app this week and your office can run it. Buy a Nodevant stack if the leak is the phone during the route, the handoff onto the crew's day, and invoices that wait until someone is off the mower. Plenty of US crews should stay on Jobber. The free audit will say so when a build is the wrong buy.",
    metaTitle: "Lawn Care Software vs Jobber | Nodevant",
    metaDescription:
      "Jobber vs a done-for-you lawn care stack for US crews. Published Jobber prices (October 2026), what each one actually does, and when not to build.",
    keywords: [
      "lawn care software vs jobber",
      "jobber alternative",
      "lawn care software",
      "jobber pricing",
      "landscaping software",
    ],
    checked: "2026-10-31",
    tableHead: ["", "Jobber", "Nodevant lawn care stack"],
    table: [
      {
        aspect: "What you buy",
        them: "A subscription app for quotes, scheduling, invoicing, and payments.",
        us: "A stack built around your crews, calendar, and invoices. You own the deployment.",
      },
      {
        aspect: "Published price",
        them: "Core from $29/mo billed annually for 1 user. Connect from $99/mo and Grow from $149/mo, also billed annually, 1 user. Month-to-month is higher. Extra users are $29/mo each.",
        us: "$10,000–$20,000 USD once, fixed after a free audit. Not a per-seat subscription.",
      },
      {
        aspect: "Phone while the crew is out",
        them: "The office still answers, or you add Jobber's optional receptionist. That add-on is priced separately on Jobber's own pages.",
        us: "Answering and booking are part of the standard stack, including while the route is rolling.",
      },
      {
        aspect: "Quotes, schedule, invoice",
        them: "This is the product. QuickBooks Online sync starts on Connect. Two-way text and job costing are on Grow.",
        us: "Included when the audit scopes them. If Jobber already does this part well, we will not rebuild it.",
      },
      {
        aspect: "Time to first use",
        them: "A trial you can start yourself.",
        us: "A standard scope goes live in 1–3 weeks after the audit.",
      },
      {
        aspect: "After it is live",
        them: "Your team administers the account. Jobber bills the subscription.",
        us: "We monitor missed calls and unbilled jobs and tune the stack.",
      },
    ],
    chooseThem: {
      title: "Choose Jobber when",
      items: [
        "You need a crew app, quotes, and invoices this week and your workflow fits the plan.",
        "One to a handful of office users can run it, and $29–$149 a month (annual, one user, October 2026 list prices) is the budget.",
        "QuickBooks and automated reminders matter, and Connect or Grow already includes them.",
        "You would rather rent a mature product than own a custom build.",
      ],
    },
    chooseUs: {
      title: "Choose a Nodevant stack when",
      items: [
        "Jobs are lost because nobody answers while the crew is on a lawn.",
        "Routing and invoicing do not match the way the app wants the day to run.",
        "You want one fixed project price instead of seats that grow with headcount.",
        "You want the system monitored after launch, not handed over as a login.",
      ],
    },
    sections: [
      {
        heading: "What Jobber is",
        paragraphs: [
          "Jobber (getjobber.com) is field-service software for home-service crews, including lawn and landscape. The plans a buyer sees first are Core, Connect, and Grow, plus a Plus tier for larger teams. On the pricing page checked in October 2026, Core starts at $29 per month billed annually for one user and covers booking, quotes, invoices, online payments, a website, and reporting. Connect starts at $99 per month billed annually and adds reminders, automatic payments, checklists, quote and invoice follow-ups, QuickBooks Online, and time. Grow starts at $149 per month billed annually and adds richer quotes, job costing, two-way text, and custom automations.",
          "Those are the annual 'starting at' prices for one user. The same page lists higher month-to-month prices and higher prices as you add users, at $29 per extra user per month. Core with two or more users is listed as contact-sales on third-party captures of the same page. Read getjobber.com/pricing before you compare a quote to a number on this page. Jobber changes plans.",
        ],
      },
      {
        heading: "What the Nodevant stack is",
        paragraphs: [
          "Nodevant lawn care software is not a Jobber skin. It is a build for a US lawn, landscape, or similar route business: the call is answered, the visit is booked onto a crew's day, the job status moves, and the invoice goes out when the work is done. A typical build is $10,000–$20,000 USD, fixed after a free audit, and live in 1–3 weeks for a standard scope.",
          "We do not publish a lawn-care client story. The closest deployment is GlobalShield360, a field stack that runs lead, dispatch, and invoice together. The lawn stack uses that lifecycle for routes and recurring visits, not for storm restoration.",
        ],
      },
      {
        heading: "What this page will not claim",
        paragraphs: [
          "We have not run a head-to-head trial against Jobber, and we do not publish a win rate, a star rating, or a 'customers switched and saved X' number. Jobber's app marketplace, payments, and mobile app are real product surface that a custom stack does not automatically copy. If those are the reason you are shopping, start a Jobber trial. If the reason is missed calls and a close that never quite happens, start with the audit.",
        ],
      },
    ],
    faq: [
      {
        q: "Is Nodevant lawn care software a Jobber alternative?",
        a: "It is an alternative when you want a system built around your routes instead of a subscription seat. It is not a cheaper clone of Jobber's app. If Jobber's quotes, schedule, and invoices already fit, keep Jobber.",
      },
      {
        q: "How much does Jobber cost compared with a custom lawn stack?",
        a: "In October 2026 Jobber's pricing page listed Core from $29/mo, Connect from $99/mo, and Grow from $149/mo, billed annually for one user, with extra users at $29/mo. A Nodevant lawn stack is $10,000–$20,000 once. The subscription is cheaper in year one for a crew that can run the app. The build is the better buy when the phone and the handoffs are what lose the jobs.",
      },
      {
        q: "Does Jobber include an AI receptionist?",
        a: "Jobber sells a receptionist add-on separately from the field-service plan. The price is on Jobber's own pages and is not quoted here, because it moves. Nodevant's stack includes answering in the standard lawn scope. You can also read the AI receptionist comparison if the only gap is the phone.",
      },
      {
        q: "Can I use Jobber and still hire Nodevant for the phone?",
        a: "Yes. The audit will say when the right scope is an AI receptionist on top of the tools you already pay for, rather than a full stack. We would rather build the missing piece than replace a system that works.",
      },
      {
        q: "How fast can a Nodevant lawn stack go live?",
        a: "A standard scope — answering, booking, job status, and invoicing — typically goes live in 1–3 weeks. Extra cities or a custom price book add time. The audit names which.",
      },
      {
        q: "Do you have a lawn-care case study?",
        a: "No. The closest published deployment is GlobalShield360, a field-service stack. We do not invent a lawn client or a savings percentage.",
      },
    ],
    sources: [
      {
        label: "Jobber pricing",
        href: "https://www.getjobber.com/pricing/",
        note: "Plan names and starting annual prices checked October 2026. Confirm before you buy.",
      },
      {
        label: "Nodevant lawn care software",
        href: "/solutions/lawn-care-software/",
        note: "Scope, $10,000–$20,000 band, and what the stack does.",
      },
    ],
    related: [
      { href: "/solutions/lawn-care-software/", label: "Lawn care software" },
      { href: "/blog/how-much-does-lawn-care-software-cost/", label: "How much lawn care software costs" },
      { href: "/solutions/pest-control-software/", label: "Pest control software" },
      { href: "/audit/", label: "Free audit" },
    ],
  },
  {
    slug: "field-service-software-vs-servicetitan",
    name: "Field service software vs ServiceTitan",
    eyebrow: "Comparison · US trades and field service",
    heroLead: "Field service software",
    gradientWord: "vs ServiceTitan",
    definition:
      "ServiceTitan is an enterprise trades platform priced per technician, with no dollar price on its website. Nodevant field service software is a fixed-scope lead-to-invoice stack, usually $10,000–$20,000 USD, not a replacement for ServiceTitan's full suite.",
    quickAnswer:
      "Get a ServiceTitan quote if you want one trades system of record and can staff the rollout. ServiceTitan does not publish a dollar price. A Nodevant field stack is $10,000–$20,000 for lead, estimate, dispatch, and invoice. It is not a ServiceTitan replacement.",
    verdict:
      "Get a ServiceTitan quote if you want one system of record for dispatch, a deep pricebook, memberships, payroll, and marketing, and you can staff the rollout. Choose a Nodevant stack if the leak is the lead, the estimate, the crew, and the invoice — the lifecycle already running at GlobalShield360 — and you want a fixed project instead of a per-technician contract. We do not claim to replace ServiceTitan.",
    metaTitle: "Field Service Software vs ServiceTitan | Nodevant",
    metaDescription:
      "ServiceTitan vs a fixed-scope field stack for US roofing, HVAC, and trades. What ServiceTitan publishes, what it does not, and when a $10k–$20k build is the smaller system you actually need.",
    keywords: [
      "field service software vs servicetitan",
      "servicetitan alternative",
      "servicetitan pricing",
      "roofing software",
      "hvac software",
    ],
    checked: "2026-10-31",
    tableHead: ["", "ServiceTitan", "Nodevant field stack"],
    table: [
      {
        aspect: "What it is",
        them: "A trades operating system: dispatch, scheduling, call booking, invoicing, and a pricebook on the entry package, with more on higher packages.",
        us: "A build of the job lifecycle: lead, estimate, dispatch, and invoice. Roofing reference: GlobalShield360.",
      },
      {
        aspect: "Published price",
        them: "No dollar amount. The pricing page says per-technician pricing and lists Starter, Essentials, and The Works with a request-pricing action.",
        us: "$10,000–$20,000 USD for a standard scope, fixed after a free audit. A wider command center is quoted separately.",
      },
      {
        aspect: "Who it is built for",
        them: "HVAC, plumbing, electrical, garage door, roofing, and similar contractors that want one vendor's platform.",
        us: "US roofing, restoration, HVAC, and other field crews whose leak is that lifecycle, not a missing enterprise suite.",
      },
      {
        aspect: "Go-live",
        them: "ServiceTitan documents a guided implementation: prepare the company, implement with their team, then go live. Duration depends on the shop. They do not publish a one-week setup.",
        us: "A standard scope is live in 1–3 weeks. Large price books and multi-location migrations take longer and are quoted.",
      },
      {
        aspect: "Memberships, payroll, marketing",
        them: "Part of why companies buy the platform. Higher packages and Pro add-ons extend it. Confirm the current package list with them.",
        us: "Not in the standard scope. We will not imply they are included. If you need them, ServiceTitan — or a later, separate quote — is the honest answer.",
      },
      {
        aspect: "You own it",
        them: "You license ServiceTitan.",
        us: "You own the deployment we build for your crews and your service area.",
      },
    ],
    chooseThem: {
      title: "Choose ServiceTitan when",
      items: [
        "You want dispatch, pricebook, memberships, and reporting in one vendor's product.",
        "You have the office staff and the months for their implementation.",
        "Per-technician pricing is acceptable once you have their written quote.",
        "Replacing that suite with a narrower build would leave holes you actually use.",
      ],
    },
    chooseUs: {
      title: "Choose a Nodevant stack when",
      items: [
        "The leak is storm or inbound leads, estimates, crew assignment, and invoices.",
        "You want a number before the build: $10,000–$20,000 for a standard scope.",
        "You do not need, or already own, memberships and payroll software.",
        "You want a roofing reference you can read: GlobalShield360.",
      ],
    },
    sections: [
      {
        heading: "What ServiceTitan publishes",
        paragraphs: [
          "ServiceTitan's pricing page, checked October 2026, does not list a dollar price. It describes per-technician pricing and three packages. Starter includes dispatching, scheduling, call booking, invoicing, and a pricebook. Essentials and The Works add further operations features. Advanced products are sold around that core. Every package asks you to request pricing.",
          "Independent write-ups estimate a per-technician monthly fee and a separate implementation fee. ServiceTitan has not confirmed those dollars. This page does not repeat them. If a salesperson, a competitor, or a blog gives you a number, ask ServiceTitan to put the subscription, implementation, add-ons, and term in one quote.",
        ],
      },
      {
        heading: "What Nodevant will and will not build",
        paragraphs: [
          "The field stack is the pattern behind GlobalShield360: a lead comes in, an estimate can be priced (for roofing, from imagery plus your price book), a crew is assigned, claim status can be tracked, and the invoice goes out when the job is done. Roofing and restoration companies can buy that as a named stack. HVAC companies can buy a call-to-invoice scope. Neither page pretends to be ServiceTitan.",
          "A standard scope is $10,000–$20,000 and 1–3 weeks. Multi-location dispatch, a deep custom pricebook, or claim workflows past simple tracking are outside that band until the audit prices them. We would rather narrow the scope than sell an enterprise rollout under a field-service headline.",
        ],
      },
    ],
    faq: [
      {
        q: "Is Nodevant a ServiceTitan alternative?",
        a: "Only for the lead-to-invoice lifecycle. It is not an alternative if you need ServiceTitan's pricebook, memberships, payroll, and marketing as one suite. Those stay on their platform or get a separate quote.",
      },
      {
        q: "How much does ServiceTitan cost?",
        a: "ServiceTitan does not publish a dollar price. As of October 2026 the site says pricing is per technician and asks you to request it for Starter, Essentials, and The Works. Get their number in writing. Do not treat a blog's estimate as their price.",
      },
      {
        q: "How much does Nodevant field service software cost?",
        a: "A standard roofing, HVAC, or home-service scope is $10,000–$20,000 USD, fixed after a free audit. Wider systems cost more and are quoted before any build.",
      },
      {
        q: "How long does ServiceTitan take to implement?",
        a: "ServiceTitan describes a staged onboarding, not a self-serve signup. They do not publish a single duration because a three-truck shop and a multi-location company are different projects. Ask them for a timeline in the same document as the price.",
      },
      {
        q: "Do you have a field-service case study?",
        a: "Yes. GlobalShield360 is the published roofing and storm deployment: leads, estimates, dispatch, claims, and invoices. We do not have a published HVAC or plumbing client story, and we do not invent one.",
      },
      {
        q: "What if I only need the phone answered?",
        a: "Then the field stack is too much. Start with the AI receptionist, from $2,800 for the build, or read the answering-service comparison. The audit is how we tell those apart.",
      },
    ],
    sources: [
      {
        label: "ServiceTitan pricing",
        href: "https://www.servicetitan.com/pricing",
        note: "Package names and per-technician wording checked October 2026. No dollar price is published there.",
      },
      {
        label: "GlobalShield360 case study",
        href: "/case-studies/bmaikr/",
        note: "The roofing deployment this comparison points at.",
      },
      {
        label: "Roofing and restoration software",
        href: "/solutions/roofing-restoration/",
        note: "The buyer page for that scope, including the $10,000–$20,000 band.",
      },
    ],
    related: [
      { href: "/solutions/roofing-restoration/", label: "Roofing software" },
      { href: "/solutions/hvac-software/", label: "HVAC software" },
      { href: "/solutions/bmaikr/", label: "BMAIKR field engine" },
      { href: "/audit/", label: "Free audit" },
    ],
  },
  {
    slug: "credit-repair-crm-vs-alternatives",
    name: "Credit repair CRM vs alternatives",
    eyebrow: "Comparison · US credit teams",
    heroLead: "Credit repair CRM",
    gradientWord: "vs alternatives",
    definition:
      "A credit repair CRM such as Credit Repair Cloud is monthly software a US credit business rents. Nodevant credit repair software is a Storehouse360-based build, usually $10,000–$20,000 USD. Nodevant does not operate a credit-repair service.",
    quickAnswer:
      "Rent a CRM when you want a portal, letters, and billing this month and your file count fits the plan. Credit Repair Cloud's October 2026 page listed Personal at $49 a month up to 3 clients. Commission a Nodevant build, usually $10,000–$20,000, when you need 3-bureau data and an audit trail in software you own. Nodevant does not repair consumers' credit.",
    verdict:
      "Rent a CRM when you want a client portal, letters, and billing inside a product you can start this month, and your file count fits the plan. Commission a Nodevant build when you need 3-bureau data, the work on each file, and an audit trail in a system you own — configured to your letters, portals, and billing. If a template CRM already matches the operation, we will say so.",
    metaTitle: "Credit Repair CRM vs Alternatives | Nodevant",
    metaDescription:
      "Credit Repair Cloud and other monthly CRMs vs a Storehouse360-based build for US credit teams. Published CRC prices (October 2026), what a build includes, and what Nodevant will not do.",
    keywords: [
      "credit repair crm",
      "credit repair software",
      "credit repair cloud alternative",
      "credit repair crm comparison",
      "storehouse360",
    ],
    checked: "2026-10-31",
    tableHead: ["", "Credit Repair Cloud", "Nodevant credit software"],
    table: [
      {
        aspect: "What you buy",
        them: "A SaaS CRM for a credit-repair business: clients, letters, portal, and — on business plans — billing and automations.",
        us: "Software we build. 3-bureau data, file tracking, and an audit trail. We do not repair consumers' credit.",
      },
      {
        aspect: "Published monthly price",
        them: "Personal $49 (up to 3 clients, 1 user). Start $179 (300 clients, 3 users). Grow $299 (600 / 6). Scale $399 (1,200 / 12). Enterprise $599 (2,400 / 24). Annual billing is listed at 20% off on the business tiers.",
        us: "$10,000–$20,000 USD for a standard scope, once, fixed after the audit.",
      },
      {
        aspect: "Plan limits",
        them: "Active clients and team logins are capped per plan. Extra seats and extra blocks of 100 clients are paid add-ons. Personal omits CRC Billing, the marketing hub, and Zapier or API automations.",
        us: "No per-client rent. Scope is whatever the audit writes down: bureaus, letters, portal, billing. Extra depth is a bigger quote, not a surprise seat fee.",
      },
      {
        aspect: "Bureau data",
        them: "CRC is a dispute and client system. Confirm on their current feature list whether bureau pulls are included in the plan you are buying. This page does not assume they are.",
        us: "Equifax, Experian, and TransUnion in one client record, on the Storehouse360 base.",
      },
      {
        aspect: "Who owns the workflow",
        them: "You license Credit Repair Cloud. Cancel and the system stays theirs.",
        us: "You own the deployment, wired to the letters, portals, and billing you specified.",
      },
      {
        aspect: "Time to start",
        them: "A 30-day trial is on their pricing page. Monthly plans are described as no long-term contract.",
        us: "A standard scope goes live in 1–3 weeks. The full Storehouse360 hub — funding, cards, property — is a longer, separate quote.",
      },
    ],
    chooseThem: {
      title: "Choose a monthly CRM when",
      items: [
        "You want letters, a client portal, and billing without a software project.",
        "Your active-client count fits a published plan, and the cap is acceptable.",
        "Personal or Start is enough to prove the business before you spend five figures.",
        "You are fine renting the system of record.",
      ],
    },
    chooseUs: {
      title: "Choose a Nodevant build when",
      items: [
        "Bureau data, file status, and the reason for each step have to live in one record.",
        "The letter, portal, or billing workflow does not fit the CRM's template.",
        "Per-client and per-seat fees will pass the build cost, and you want to own the system.",
        "You already know Storehouse360 is the reference and you want that pattern configured for your firm.",
      ],
    },
    sections: [
      {
        heading: "The alternative this page uses as the concrete example",
        paragraphs: [
          "Credit Repair Cloud is the CRM US credit businesses most often mean by the category. Its pricing page, checked October 2026, lists five monthly plans: Personal $49, Start $179, Grow $299, Scale $399, and Enterprise $599. Client caps run from 3 (Personal, described as friends and family) to 2,400 active clients on Enterprise. Team caps run from 1 user to 24. Yearly billing is advertised at 20% off on the business tiers. Their help center says Personal does not include CRC Billing, the marketing hub, or Zapier and API automations.",
          "Other CRMs exist. Their prices are not copied here, because this page only cites numbers we checked on a vendor's own page. Use the same test on any of them: client cap, user cap, whether bureau data is actually in the plan, whether you can export, and what happens to the files if you cancel.",
        ],
      },
      {
        heading: "What Nodevant will not do",
        paragraphs: [
          "Nodevant builds software for credit and financial teams. Nodevant does not operate a consumer credit-repair service, does not send disputes for consumers, and does not promise a score outcome. The Storehouse360 case study is a financial hub — 3-bureau data, card insights, funding matches, and property discovery — not a claim about consumer results.",
          "A standard credit-team stack is $10,000–$20,000 and 1–3 weeks. A client portal, extra integrations, or the wider hub are quoted before the build, not discovered on an invoice.",
        ],
      },
    ],
    faq: [
      {
        q: "What is the difference between a credit repair CRM and Nodevant credit repair software?",
        a: "A CRM is a subscription product with client and user limits. Nodevant's software is a build on the Storehouse360 hub: 3-bureau data, the work on each file, and an audit trail. We sell the software. We do not run a credit-repair business.",
      },
      {
        q: "How much does Credit Repair Cloud cost in 2026?",
        a: "On the pricing page checked in October 2026: Personal $49/mo, Start $179/mo, Grow $299/mo, Scale $399/mo, Enterprise $599/mo. Annual billing was listed at 20% off for the business tiers. Confirm the live page before you sign. Plans change.",
      },
      {
        q: "When is Credit Repair Cloud the better buy?",
        a: "When you need a portal, letters, and billing quickly, your client count fits a plan, and you would rather pay monthly than commission a build. Start or even Personal is a rational way to prove demand.",
      },
      {
        q: "When is a custom build the better buy?",
        a: "When bureau pulls, your letter process, or your billing do not fit the template, or when seat and client add-ons will cost more than owning the system. The audit is the point where we tell you if that is actually true.",
      },
      {
        q: "Does the Personal plan include billing?",
        a: "Credit Repair Cloud's help center says no. Personal leaves out CRC Billing, the marketing hub, and Zapier or API automations. Business plans include them. Read their article before you pick Personal to run a firm.",
      },
      {
        q: "Do you have a credit-repair case study?",
        a: "The published reference is the Storehouse360 case study, the financial hub this software is based on. We do not publish consumer repair outcomes, because we do not perform consumer repair.",
      },
    ],
    sources: [
      {
        label: "Credit Repair Cloud pricing",
        href: "https://www.creditrepaircloud.com/pricing",
        note: "Plan prices, client caps, and user caps checked October 2026.",
      },
      {
        label: "Credit Repair Cloud plan limits",
        href: "https://help.creditrepaircloud.com/en/articles/13943532-credit-repair-cloud-pricing-plans-features-and-client-limits",
        note: "Help center, dated March 6, 2026, including what Personal leaves out.",
      },
      {
        label: "Nodevant credit repair software",
        href: "/solutions/credit-repair-software/",
        note: "Scope and the $10,000–$20,000 band.",
      },
    ],
    related: [
      { href: "/solutions/credit-repair-software/", label: "Credit repair software" },
      { href: "/solutions/storehouse360/", label: "Storehouse360" },
      { href: "/blog/best-credit-repair-crm-features-2026/", label: "CRM features that matter in 2026" },
      { href: "/case-studies/storehouse360/", label: "Storehouse360 case study" },
      { href: "/audit/", label: "Free audit" },
    ],
  },
  {
    slug: "ai-receptionist-vs-answering-service",
    name: "AI receptionist vs an answering service",
    eyebrow: "Comparison · US small business phones",
    heroLead: "AI receptionist",
    gradientWord: "vs answering service",
    definition:
      "An answering service puts a person on your phone line, usually billed per minute, per call, or as a monthly block. An AI receptionist is software that answers, books, and logs the call. Nodevant builds the software from $2,800.",
    quickAnswer:
      "Use a staffed answering service when callers need judgment or a person who can leave the script. Use an AI receptionist, built from $2,800, when the failure is missed calls and bookings that never reach the CRM. Many businesses should keep both: software for overflow and after hours, a person for the calls the software transfers.",
    verdict:
      "Use a staffed answering service when callers need judgment, comfort, or a person who can leave the script. Use an AI receptionist when the failure is missed calls, slow booking, and leads that never reach the CRM. Many US businesses should use both: software for after-hours and overflow, a person for the calls the software transfers. We do not claim callers cannot tell, and we do not claim the agent replaces a skilled receptionist on a hard call.",
    metaTitle: "AI Receptionist vs an Answering Service | Nodevant",
    metaDescription:
      "A staffed answering service vs a Nodevant AI receptionist for US businesses. What each one is for, what it costs to start, and when to keep a human in the loop.",
    keywords: [
      "ai receptionist vs answering service",
      "ai answering service",
      "virtual receptionist vs ai",
      "ai receptionist cost",
      "answering service alternative",
    ],
    checked: "2026-10-31",
    tableHead: ["", "Staffed answering service", "Nodevant AI receptionist"],
    table: [
      {
        aspect: "Who answers",
        them: "A person, often shared across clients, working from your script.",
        us: "Software in your business's voice. It does not impersonate a named employee.",
      },
      {
        aspect: "How you pay",
        them: "Per minute, per call, or a monthly block of calls. 24/7 coverage usually costs more than business hours. Prices differ by vendor and move — use their current page.",
        us: "A build from $2,800, then a monthly plan for the running agent, monitoring, and tuning. Voice infrastructure on our cost page is about $0.08–$0.20 per connected minute.",
      },
      {
        aspect: "Booking",
        them: "A good service can book if you give them the calendar rules. Quality depends on the agent and the script.",
        us: "It reads live availability and books, reschedules, or cancels while the caller is on the line, then writes the lead to the CRM.",
      },
      {
        aspect: "Hard calls",
        them: "Better. A person can slow down, apologize, and handle a situation the script did not list.",
        us: "Worse. Unusual, emotional, medical, or legal calls should be transferred. The agent is built to hand those off with the context, not to improvise.",
      },
      {
        aspect: "2 a.m. and overflow",
        them: "Only if you bought that coverage. Hold times rise when their floor is busy.",
        us: "Answers whenever the number is forwarded, including overflow while your team is on another line. It does not get tired. It can still be wrong.",
      },
      {
        aspect: "What gets logged",
        them: "A message, if the agent types one. Detail varies by call.",
        us: "Name, number, reason, and a transcript written to the CRM on every call the agent handles.",
      },
    ],
    chooseThem: {
      title: "Choose a staffed service when",
      items: [
        "Callers are upset, confused, or asking for something a script cannot safely answer.",
        "Your volume is low enough that a per-call plan is cheaper than a build.",
        "You want a human greeting during business hours and you already have someone booking the calendar.",
        "A regulator, a clinic, or a client contract expects a person.",
      ],
    },
    chooseUs: {
      title: "Choose an AI receptionist when",
      items: [
        "The loss is the missed call: after hours, lunch, or two rings at once.",
        "The job is booking, rescheduling, hours, pricing, and qualifying — the same questions every day.",
        "Leads have to land in the CRM without someone retyping a pink slip.",
        "You want the cost to follow minutes of voice, not a new hire, once the build is paid.",
      ],
    },
    sections: [
      {
        heading: "What an answering service actually sells",
        paragraphs: [
          "A staffed answering service — Ruby, Smith.ai's human receptionists, AnswerConnect, a local bureau — puts a person on the line. You pay for time or for calls. The honest strengths are tone and judgment. The honest weaknesses are the ones operators already know: the script drifts, the message is thin, after-hours costs more, and a busy floor means hold music. Several of those companies now sell an AI tier next to the human one. Read the order form so you know which you are buying.",
          "This page does not quote their prices. They change by plan, and copying a stale rate would be worse than sending you to the vendor. Compare the model, then pull the current rate card.",
        ],
      },
      {
        heading: "What the Nodevant receptionist costs",
        paragraphs: [
          "Nodevant builds a receptionist around your scripts, hours, services, and calendar. The build starts at $2,800. A monthly plan covers the running agent, monitoring, and tuning. Connected voice minutes are about $0.08–$0.20, which is the infrastructure figure on our voice-agent cost page, not a markup we invent per client. Most small-business receptionists go live in days, not months. That timeline is for a booking-and-logging scope. A messy phone system or a calendar with no API takes longer, and the audit says so.",
          "The rule we use: automate the routine call, warm-transfer the one that needs a person. If your calls are mostly the second kind, do not buy this.",
        ],
      },
    ],
    faq: [
      {
        q: "Is an AI receptionist the same as an answering service?",
        a: "No. An answering service is a person working from a script. An AI receptionist is software that answers, books into your calendar, and logs the lead. They fail in different places, which is why many businesses keep both.",
      },
      {
        q: "How much does an AI receptionist cost compared with an answering service?",
        a: "Nodevant's build starts at $2,800, plus a monthly plan and about $0.08–$0.20 per connected minute of voice. A staffed service is usually per minute, per call, or a monthly block. Which is cheaper depends on your volume. Low volume often favors the service. High after-hours volume often favors the software once the build is paid. The audit runs that on your numbers.",
      },
      {
        q: "Will callers know they are talking to software?",
        a: "Some will. The agent answers in the business's voice and does not pretend to be a named employee. We do not claim it is undetectable. Calls that need a person are transferred with the context.",
      },
      {
        q: "When is a human receptionist still the right hire?",
        a: "When the phone is the relationship: a front desk that also walks people through a problem, a clinical or legal line, or a volume low enough that one person covers it. Software does not replace that job. It replaces the ring that currently goes to voicemail.",
      },
      {
        q: "Can the AI book into our calendar?",
        a: "Yes, when the calendar has a connection we can use. It books, reschedules, and cancels against live availability, then writes the caller and a transcript to the CRM. If your calendar cannot be connected, the audit will say the scope is capture-and-handoff, not live booking.",
      },
      {
        q: "Should I keep my answering service?",
        a: "Keep it for the calls you want a person on. Point overflow and after-hours at the AI if those calls are bookings and messages. Cancelling a service you still need is a false saving.",
      },
    ],
    sources: [
      {
        label: "AI receptionist",
        href: "/solutions/ai-receptionist/",
        note: "What the build does, and the from-$2,800 starting price.",
      },
      {
        label: "AI voice agent cost",
        href: "/pricing/ai-voice-agent-cost/",
        note: "Build, monthly plan, and the $0.08–$0.20 per connected minute figure.",
      },
      {
        label: "AI answering vs a human receptionist",
        href: "/blog/ai-answering-service-vs-human-receptionist/",
        note: "The longer buyer note, including when to keep the person.",
      },
    ],
    related: [
      { href: "/solutions/ai-receptionist/", label: "AI receptionist" },
      { href: "/solutions/home-services/", label: "Home services software" },
      { href: "/pricing/ai-voice-agent-cost/", label: "Voice agent cost" },
      { href: "/blog/ai-answering-service-vs-human-receptionist/", label: "AI vs a human receptionist" },
      { href: "/audit/", label: "Free audit" },
    ],
  },
];

export const COMPARISON_PAGES: ComparisonPage[] = [
  ...COMPARISON_PAGE_LIST,
  ...COMPARISON_BATCH,
];

export function getComparison(slug: string): ComparisonPage | undefined {
  return COMPARISON_PAGES.find((page) => page.slug === slug);
}
