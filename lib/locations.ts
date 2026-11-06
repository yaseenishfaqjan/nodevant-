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
  /** Headquarters metro vs a remote service area. */
  kind?: "headquarters" | "remote";
  /** ISO date this city page was last edited. */
  updated?: string;
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

export const ATLANTA_LOCATION: MetroLocation = {
  slug: "atlanta-ai-automation-agency",
  label: "Atlanta",
  schemaCity: "Atlanta",
  state: "Georgia",
  kind: "headquarters",
  updated: "2026-11-06",
  eyebrow: "Atlanta metro · the office is in McDonough, GA",
  heroLead: "AI automation for",
  gradientWord: "Atlanta",
  definition:
    "Nodevant's only office is in McDonough, Georgia, inside the Atlanta metro. We build software for Atlanta-area companies from that address. There is no separate Atlanta office, and we do not publish a list of Atlanta clients.",
  metaTitle: "AI Automation for Atlanta Companies | Nodevant",
  metaDescription:
    "Nodevant is based in McDonough, GA, in the Atlanta metro. No separate Atlanta office. AI receptionists and field software for local companies, mostly on calls. Free audit.",
  keywords: [
    "ai automation agency atlanta",
    "ai automation agency mcdonough ga",
    "ai receptionist atlanta",
    "lawn care software atlanta",
    "roofing software atlanta",
  ],
  areas: [
    "McDonough and Henry County — this is the office",
    "Atlanta, and the metro counties a buyer means",
    "Stockbridge, Hampton, and Locust Grove",
    "No second office in the city of Atlanta",
  ],
  localContext:
    "Atlanta is the home market because the company is here, not because we keep a downtown studio or a client map of the metro. The work is the same work we sell to any US company: answering, booking, and the job lifecycle for lawn, roofing, HVAC, clubs, and credit teams. Most of it happens on calls and screen-shares, including for a company in Henry County. We do not publish Atlanta reviews or a count of local clients.",
  faqs: [
    {
      q: "Do you have an Atlanta office?",
      a: "No. The only office is 157 Everett Sq, McDonough, GA 30252, in Henry County, south of Atlanta. There is no Midtown, Buckhead, or downtown studio, and no walk-in.",
    },
    {
      q: "Is Nodevant an Atlanta company?",
      a: "The headquarters is in the Atlanta metro. That is the honest version of 'Atlanta.' Companies in the city work with us the same way companies in Houston or Chicago do: an audit, a fixed scope, and a remote build. Being nearby does not add a local crew.",
    },
    {
      q: "Can we meet in person?",
      a: "Only by arrangement, at the McDonough address or on a call. In-person meetings are not a product, and they are not how a build gets done. Email is info@nodevant.com. We do not publish a phone number.",
    },
    {
      q: "Do you have Atlanta case studies?",
      a: "No. We do not invent local clients. The deployments we can show are on the case-studies page, including Fairway360 and GlobalShield360. None of those pages is an Atlanta customer list.",
    },
  ],
};

const REMOTE_METROS: MetroLocation[] = [
  {
    slug: "houston-ai-automation-agency",
    label: "Houston",
    schemaCity: "Houston",
    state: "Texas",
    kind: "remote",
    updated: "2026-11-06",
    eyebrow: "Houston · served remotely from McDonough, GA",
    heroLead: "AI automation for",
    gradientWord: "Houston",
    definition:
      "Nodevant builds roofing, lawn, and other field software for Houston companies from McDonough, Georgia. We do not have a Houston office.",
    metaTitle: "AI Automation for Houston Companies | Nodevant",
    metaDescription:
      "Roofing, lawn, and HVAC software for Houston companies, built remotely from McDonough, GA. No Houston office and no invented local clients. Free audit.",
    keywords: [
      "ai automation agency houston",
      "roofing software houston",
      "lawn care software houston",
      "ai receptionist houston",
      "hvac software houston",
    ],
    areas: [
      "Houston",
      "Pasadena, Sugar Land, Katy, and The Woodlands",
      "The rest of the metro, remotely",
      "Nationwide from McDonough, GA — this is not a Houston office",
    ],
    localContext:
      "Houston companies call about storm roofing, lawn routes that do not fully stop, and HVAC when the cooling fails. Those are stacks we already sell anywhere in the US. Delivery is calls and screen-shares from Georgia. We do not publish a Houston client list, and we do not claim a crew that drives the city.",
    faqs: [
      {
        q: "Is there an AI automation agency in Houston?",
        a: "Nodevant serves Houston companies and is based in McDonough, Georgia. We do not have a Houston office, a showroom, or a local crew.",
      },
      {
        q: "Do you work with Houston roofing companies?",
        a: "Yes, remotely. The roofing stack is the lead, the estimate, the crew, and the invoice, usually $10,000–$20,000 for a standard scope. The published reference is GlobalShield360, which is a product deployment, not a claim of a Houston roofing client.",
      },
      {
        q: "Do you have Houston case studies?",
        a: "No. We do not invent local clients or storm-season results for this city.",
      },
      {
        q: "Do I need to visit Georgia?",
        a: "No. Start with the free audit or a message. The headquarters address is 157 Everett Sq, McDonough, GA 30252 if a vendor form asks for it. Email is info@nodevant.com.",
      },
    ],
  },
  {
    slug: "phoenix-ai-automation-agency",
    label: "Phoenix",
    schemaCity: "Phoenix",
    state: "Arizona",
    kind: "remote",
    updated: "2026-11-06",
    eyebrow: "Phoenix · served remotely from McDonough, GA",
    heroLead: "AI automation for",
    gradientWord: "Phoenix",
    definition:
      "Nodevant builds lawn, HVAC, and pest-control software for Phoenix companies from McDonough, Georgia. We do not have a Phoenix office.",
    metaTitle: "AI Automation for Phoenix Companies | Nodevant",
    metaDescription:
      "Lawn, HVAC, and pest software for Phoenix companies. Remote from McDonough, GA. No Valley office and no invented local clients. Free audit.",
    keywords: [
      "ai automation agency phoenix",
      "lawn care software phoenix",
      "hvac software phoenix",
      "pest control software phoenix",
      "ai receptionist phoenix",
    ],
    areas: [
      "Phoenix",
      "Scottsdale, Mesa, Tempe, and Chandler",
      "The rest of the Valley, remotely",
      "Nationwide from McDonough, GA — this is not a local office",
    ],
    localContext:
      "The Valley's season is the opposite of a northern route: lawn work does not pause for winter, HVAC demand stacks up with the heat, and pest routes run most of the year. The systems we sell into that are the same systems we sell in Georgia. We have not walked a Phoenix shop, and we do not publish Valley reviews.",
    faqs: [
      {
        q: "Do you have an office in Phoenix or Scottsdale?",
        a: "No. Nodevant is in McDonough, Georgia. Phoenix, Scottsdale, and the rest of the Valley are a remote service area.",
      },
      {
        q: "Is lawn care software a fit for a Phoenix crew?",
        a: "If the leak is the missed call, the route, and the invoice, yes. A standard scope is $10,000–$20,000. If a subscription app already does that, the comparison pages say when to keep it. We do not have a Phoenix lawn client to point at.",
      },
      {
        q: "Do you publish Phoenix results?",
        a: "No. There is no Valley case study and no local headcount.",
      },
      {
        q: "How do we start?",
        a: "Use the free audit or the contact form. You get a scope and a fixed quote before a build. We do not publish a phone number.",
      },
    ],
  },
  {
    slug: "tampa-ai-automation-agency",
    label: "Tampa",
    schemaCity: "Tampa",
    state: "Florida",
    kind: "remote",
    updated: "2026-11-06",
    eyebrow: "Tampa Bay · served remotely from McDonough, GA",
    heroLead: "AI automation for",
    gradientWord: "Tampa",
    definition:
      "Nodevant builds roofing, lawn, and golf-club software for Tampa Bay companies from McDonough, Georgia. We do not have a Tampa office.",
    metaTitle: "AI Automation for Tampa Companies | Nodevant",
    metaDescription:
      "Roofing, lawn, and club software for Tampa Bay companies. Built remotely from Georgia. No Tampa office and no invented local clients. Free audit.",
    keywords: [
      "ai automation agency tampa",
      "roofing software tampa",
      "lawn care software tampa",
      "golf course software tampa",
      "ai receptionist tampa",
    ],
    areas: [
      "Tampa",
      "St. Petersburg, Clearwater, and Brandon",
      "The rest of Tampa Bay, remotely",
      "Nationwide from McDonough, GA — this is not a Florida office",
    ],
    localContext:
      "Tampa Bay companies ask about the same seasonal work as the rest of the Gulf: roofing after storms, lawn routes that run through the winter, and clubs that lose the booking when the shop is busy. We build those systems in English, from Georgia. We do not claim a Tampa roofing client or a Tampa club, and we do not claim a Spanish-language desk.",
    faqs: [
      {
        q: "Is Nodevant a Tampa agency?",
        a: "We work with Tampa Bay companies remotely. The company is in McDonough, Georgia. There is no Tampa office.",
      },
      {
        q: "Can you answer calls in Spanish?",
        a: "Not as a default. The stacks on this site are built in English. If Spanish coverage is a requirement, say so before any scope is priced.",
      },
      {
        q: "Do you have Tampa or St. Petersburg case studies?",
        a: "No. Golf work is illustrated by Fairway360 and storm work by GlobalShield360. Neither page is a Tampa client.",
      },
      {
        q: "What should a Tampa service company start with?",
        a: "If the leak is the missed call, start with the AI receptionist. If the leak is lead, estimate, crew, and invoice, start with roofing or lawn software. The free audit picks one.",
      },
    ],
  },
  {
    slug: "charlotte-ai-automation-agency",
    label: "Charlotte",
    schemaCity: "Charlotte",
    state: "North Carolina",
    kind: "remote",
    updated: "2026-11-06",
    eyebrow: "Charlotte · served remotely from McDonough, GA",
    heroLead: "AI automation for",
    gradientWord: "Charlotte",
    definition:
      "Nodevant builds HVAC, lawn, and club software for Charlotte companies from McDonough, Georgia. We do not have a Charlotte office.",
    metaTitle: "AI Automation for Charlotte Companies | Nodevant",
    metaDescription:
      "HVAC, lawn, and golf-club software for Charlotte companies. Remote from McDonough, GA. No Charlotte office and no invented local clients. Free audit.",
    keywords: [
      "ai automation agency charlotte",
      "hvac software charlotte",
      "lawn care software charlotte",
      "golf course software charlotte",
      "ai receptionist charlotte",
    ],
    areas: [
      "Charlotte",
      "Matthews, Huntersville, Concord, and Gastonia",
      "The rest of the metro, remotely",
      "Nationwide from McDonough, GA — this is not a local office",
    ],
    localContext:
      "Charlotte service companies sit on a four-season calendar: HVAC around the first hot week and the first cold week, lawn work that pauses, and clubs that still miss the call when the shop is full. We sell the systems that catch that call. We do not sell a claim that we have a Charlotte financial client just because the city has banks, and we do not publish local reviews.",
    faqs: [
      {
        q: "Do you have an office in Charlotte?",
        a: "No. Nodevant is at 157 Everett Sq, McDonough, GA 30252. Charlotte companies work with us remotely.",
      },
      {
        q: "Is HVAC software a fit for a Charlotte company?",
        a: "If the leak is the service call, the booking, and the invoice, yes — usually $10,000–$20,000 for a standard scope. It is not ServiceTitan, and we do not have a Charlotte HVAC case study.",
      },
      {
        q: "Do you publish Charlotte reviews?",
        a: "No. There is no Charlotte review set. Case studies on this site are named product deployments.",
      },
      {
        q: "How do we start from Charlotte?",
        a: "Use the free audit or the contact form. Email is info@nodevant.com. We do not publish a phone number.",
      },
    ],
  },
];

METRO_LOCATIONS.push(...REMOTE_METROS);

export function getMetro(slug: string): MetroLocation | undefined {
  return METRO_LOCATIONS.find((metro) => metro.slug === slug) ?? (slug === ATLANTA_LOCATION.slug ? ATLANTA_LOCATION : undefined);
}
