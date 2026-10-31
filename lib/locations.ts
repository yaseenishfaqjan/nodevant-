// US metro pages. Nodevant's only office is McDonough, GA. These pages
// describe remote delivery into a real metro. They do not claim a local
// office, a local team, or a local client.

export interface MetroLocation {
  slug: string;
  /** Short label for nav and cards. */
  label: string;
  /** City name used in schema areaServed. */
  schemaCity: string;
  state: string;
  eyebrow: string;
  heroLead: string;
  gradientWord: string;
  definition: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  areas: string[];
  /** Real local buying context. Not a client list. */
  localContext: string;
  faqs: { q: string; a: string }[];
}

export const METRO_LOCATIONS: MetroLocation[] = [
  {
    slug: "dallas-ai-automation-agency",
    label: "Dallas–Fort Worth",
    schemaCity: "Dallas",
    state: "Texas",
    eyebrow: "Dallas–Fort Worth · served remotely from McDonough, GA",
    heroLead: "AI automation for",
    gradientWord: "Dallas–Fort Worth",
    definition:
      "Nodevant builds AI receptionists, lead follow-up, and field-service software for Dallas–Fort Worth companies from our office in McDonough, Georgia. We do not have a Dallas office.",
    metaTitle: "AI Automation for Dallas–Fort Worth Companies | Nodevant",
    metaDescription:
      "AI receptionists, missed-call recovery, and field software for Dallas–Fort Worth lawn, roofing, HVAC, and service companies. Remote from McDonough, GA. No local office. Free audit.",
    keywords: [
      "ai automation agency dallas",
      "ai receptionist dallas",
      "lawn care software dallas",
      "roofing software dfw",
      "hvac answering service dallas",
    ],
    areas: [
      "Dallas and Fort Worth",
      "Arlington, Plano, Irving, and Frisco",
      "The rest of the DFW metro, remotely",
      "Nationwide from McDonough, GA — this is not a local storefront",
    ],
    localContext:
      "DFW is a large home-service market: lawn and landscape routes through a long season, roofing and restoration after hail, and HVAC companies that live on the no-cool call. The work we sell into that market is the same work we sell anywhere in the US — answering, booking, and the job lifecycle — delivered on calls and screen-shares. We do not publish a Dallas client list.",
    faqs: [
      {
        q: "Is there an AI automation agency in Dallas?",
        a: "Nodevant serves Dallas–Fort Worth companies and is based in McDonough, Georgia. We do not have a Dallas office, a Dallas showroom, or a local crew. The work is remote: an audit, a fixed scope, and a build your team runs.",
      },
      {
        q: "Do you work with lawn, roofing, and HVAC companies in DFW?",
        a: "Yes. Those are stacks we already sell to US companies: lawn care software, roofing and restoration software, and HVAC software, plus an AI receptionist when the only leak is the phone. A DFW company buys the same scope as a company in any other US city.",
      },
      {
        q: "Do you have Dallas case studies?",
        a: "No. We do not invent local clients. The deployments we can show are the ones on the case-studies page, including GlobalShield360 for field service and Fairway360 for clubs. None of those pages claim a Dallas address.",
      },
      {
        q: "Do I need to visit Georgia to start?",
        a: "No. Dallas clients start with the free audit or a message, then work on calls. The headquarters address is 157 Everett Sq, McDonough, GA 30252 if you need it for a vendor form. Email is info@nodevant.com.",
      },
    ],
  },
  {
    slug: "miami-ai-automation-agency",
    label: "Miami",
    schemaCity: "Miami",
    state: "Florida",
    eyebrow: "Miami and South Florida · served remotely from McDonough, GA",
    heroLead: "AI automation for",
    gradientWord: "Miami",
    definition:
      "Nodevant builds AI receptionists and field-service software for Miami and South Florida companies from McDonough, Georgia. We do not have a Miami office, and we do not claim a Spanish-language call center.",
    metaTitle: "AI Automation for Miami & South Florida Companies | Nodevant",
    metaDescription:
      "AI receptionists and roofing, lawn, and home-service software for Miami and South Florida companies. Built remotely from Georgia. No Miami office. Free audit.",
    keywords: [
      "ai automation agency miami",
      "ai receptionist miami",
      "roofing software miami",
      "lawn care software south florida",
      "answering service miami",
    ],
    areas: [
      "Miami and Miami Beach",
      "Coral Gables, Hialeah, and Doral",
      "Fort Lauderdale and the rest of Miami-Dade and Broward, remotely",
      "Nationwide from McDonough, GA — this is not a South Florida office",
    ],
    localContext:
      "South Florida companies call us about the same leaks as everyone else, with a seasonal tilt: roofing and restoration after storms, lawn routes that do not pause for winter, and a phone that rings when the owner is on a job. We build in English. If your callers need a Spanish-speaking person, say so on the audit — we will not pretend the default agent is a bilingual receptionist.",
    faqs: [
      {
        q: "Is Nodevant an AI agency in Miami?",
        a: "We work with Miami and South Florida companies remotely. The company is in McDonough, Georgia. There is no Miami office and no local walk-in.",
      },
      {
        q: "Can you answer calls in Spanish?",
        a: "Not as a default. The receptionist and the field stacks we describe on this site are built in English. If Spanish coverage is a requirement, tell us before any scope is priced. We would rather decline than imply a language we have not scoped.",
      },
      {
        q: "Do you have Miami or South Florida case studies?",
        a: "No. Storm-restoration work is illustrated by GlobalShield360, which is a product deployment, not a claim that we have a Miami roofing client. We do not publish fake local reviews.",
      },
      {
        q: "What should a Miami service company start with?",
        a: "If the leak is the missed call, start with the AI receptionist. If the leak is lead, estimate, crew, and invoice, start with roofing, lawn, or home-services software. The free audit is how we pick one instead of selling all of them.",
      },
    ],
  },
  {
    slug: "chicago-ai-automation-agency",
    label: "Chicago",
    schemaCity: "Chicago",
    state: "Illinois",
    eyebrow: "Chicago · served remotely from McDonough, GA",
    heroLead: "AI automation for",
    gradientWord: "Chicago",
    definition:
      "Nodevant builds AI receptionists, HVAC software, and other field stacks for Chicago companies from McDonough, Georgia. We do not have a Chicago office.",
    metaTitle: "AI Automation for Chicago Companies | Nodevant",
    metaDescription:
      "AI receptionists and HVAC, lawn, and home-service software for Chicago companies. Remote from McDonough, GA. No Chicago office and no invented local clients. Free audit.",
    keywords: [
      "ai automation agency chicago",
      "ai receptionist chicago",
      "hvac software chicago",
      "lawn care software chicago",
      "answering service chicago",
    ],
    areas: [
      "Chicago",
      "Evanston, Oak Park, and Naperville",
      "Schaumburg, Aurora, and the rest of the metro, remotely",
      "Nationwide from McDonough, GA — this is not a local office",
    ],
    localContext:
      "Chicago service companies feel the calendar more than Sun Belt routes do: HVAC demand stacks up around the first cold week and the first hot week, lawn work is seasonal, and the phone still rings when the trucks are out. We sell the systems that catch that call and book the visit. We do not sell a claim that we have walked a Chicago shop floor.",
    faqs: [
      {
        q: "Do you have an office in Chicago?",
        a: "No. Nodevant is at 157 Everett Sq, McDonough, GA 30252. Chicago companies work with us remotely, the same way companies in Dallas, Miami, and the rest of the US do.",
      },
      {
        q: "Is HVAC software a fit for a Chicago company?",
        a: "If the leak is the service call, the booking, and the invoice, yes — that is the HVAC stack, at $10,000–$20,000 for a standard scope. It is not ServiceTitan, and we do not have a Chicago HVAC case study. The comparison page says when the enterprise platform is the better buy.",
      },
      {
        q: "Do you publish Chicago reviews or client counts?",
        a: "No. There is no Chicago review set and no metro headcount. Case studies on this site are named product deployments, and they are labeled as such.",
      },
      {
        q: "How do we start from Chicago?",
        a: "Use the free audit or the contact form. You get a scope and a fixed quote before a build. Email is info@nodevant.com. We do not publish a phone number.",
      },
    ],
  },
];

export function getMetro(slug: string): MetroLocation | undefined {
  return METRO_LOCATIONS.find((metro) => metro.slug === slug);
}
