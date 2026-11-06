// Internal links for compare, solution, blog, and city pages.
// Each entry is a stack, a comparison, a guide, and a city — the four
// hops a buyer should be able to make without using search.

export interface ReadingLink {
  kind: "stack" | "comparison" | "guide" | "city";
  href: string;
  label: string;
}

function links(
  stack: ReadingLink,
  comparison: ReadingLink,
  guide: ReadingLink,
  city: ReadingLink,
): ReadingLink[] {
  return [stack, comparison, guide, city];
}

const LAWN: ReadingLink = { kind: "stack", href: "/solutions/lawn-care-software/", label: "Lawn care software" };
const ROOF: ReadingLink = { kind: "stack", href: "/solutions/roofing-restoration/", label: "Roofing and restoration software" };
const GOLF: ReadingLink = { kind: "stack", href: "/solutions/fairway360/", label: "Fairway360 golf club software" };
const CREDIT: ReadingLink = { kind: "stack", href: "/solutions/credit-repair-software/", label: "Credit repair software" };
const HVAC: ReadingLink = { kind: "stack", href: "/solutions/hvac-software/", label: "HVAC software" };
const HOME: ReadingLink = { kind: "stack", href: "/solutions/home-services/", label: "Home services software" };
const RECEPTION: ReadingLink = { kind: "stack", href: "/solutions/ai-receptionist/", label: "AI receptionist" };
const PEST: ReadingLink = { kind: "stack", href: "/solutions/pest-control-software/", label: "Pest control software" };

const VS_JOBBER: ReadingLink = { kind: "comparison", href: "/compare/lawn-care-software-vs-jobber/", label: "Lawn care software vs Jobber" };
const VS_LAWNPRO: ReadingLink = { kind: "comparison", href: "/compare/lawn-care-software-vs-lawnpro/", label: "Lawn care software vs LawnPro" };
const VS_SA: ReadingLink = { kind: "comparison", href: "/compare/lawn-care-software-vs-service-autopilot/", label: "Lawn care software vs Service Autopilot" };
const VS_ST: ReadingLink = { kind: "comparison", href: "/compare/field-service-software-vs-servicetitan/", label: "Field service software vs ServiceTitan" };
const VS_ACCULYNX: ReadingLink = { kind: "comparison", href: "/compare/roofing-crm-vs-acculynx/", label: "Roofing CRM vs AccuLynx" };
const VS_JN: ReadingLink = { kind: "comparison", href: "/compare/roofing-crm-vs-jobnimbus/", label: "Roofing CRM vs JobNimbus" };
const VS_FOREUP: ReadingLink = { kind: "comparison", href: "/compare/fairway360-vs-foreup/", label: "Fairway360 vs foreUP" };
const VS_CP: ReadingLink = { kind: "comparison", href: "/compare/fairway360-vs-club-prophet/", label: "Fairway360 vs Club Prophet" };
const VS_LS: ReadingLink = { kind: "comparison", href: "/compare/fairway360-vs-lightspeed-golf/", label: "Fairway360 vs Lightspeed Golf" };
const VS_CRC: ReadingLink = { kind: "comparison", href: "/compare/credit-repair-crm-vs-alternatives/", label: "Credit repair CRM vs alternatives" };
const VS_DF: ReadingLink = { kind: "comparison", href: "/compare/credit-repair-crm-vs-disputefox/", label: "Credit repair CRM vs DisputeFox" };
const VS_ANSWER: ReadingLink = { kind: "comparison", href: "/compare/ai-receptionist-vs-answering-service/", label: "AI receptionist vs an answering service" };

const GUIDE_LAWN_COST: ReadingLink = { kind: "guide", href: "/blog/how-much-does-lawn-care-software-cost/", label: "How much lawn care software costs" };
const GUIDE_LAWN_EST: ReadingLink = { kind: "guide", href: "/blog/how-to-automate-lawn-care-estimates/", label: "How to automate lawn care estimates" };
const GUIDE_ROOF: ReadingLink = { kind: "guide", href: "/blog/how-much-does-roofing-crm-cost/", label: "How much a roofing CRM costs" };
const GUIDE_GOLF: ReadingLink = { kind: "guide", href: "/blog/golf-course-management-software-checklist/", label: "Golf course software checklist" };
const GUIDE_CREDIT: ReadingLink = { kind: "guide", href: "/blog/best-credit-repair-crm-features-2026/", label: "Credit repair CRM features that matter" };
const GUIDE_CREDIT_START: ReadingLink = { kind: "guide", href: "/blog/credit-repair-business-software-startup-checklist/", label: "Credit repair software startup checklist" };
const GUIDE_PHONE: ReadingLink = { kind: "guide", href: "/blog/ai-answering-service-vs-human-receptionist/", label: "AI answering vs a human receptionist" };
const GUIDE_AGENCY: ReadingLink = { kind: "guide", href: "/blog/how-much-does-an-ai-automation-agency-cost/", label: "What an AI automation agency costs" };
const GUIDE_VOICE: ReadingLink = { kind: "guide", href: "/blog/voice-ai-agents-buyers-guide/", label: "Voice AI build-versus-buy guide" };

const CITY_ATL: ReadingLink = { kind: "city", href: "/locations/atlanta-ai-automation-agency/", label: "Atlanta and McDonough, GA" };
const CITY_DFW: ReadingLink = { kind: "city", href: "/locations/dallas-ai-automation-agency/", label: "Dallas–Fort Worth" };
const CITY_MIA: ReadingLink = { kind: "city", href: "/locations/miami-ai-automation-agency/", label: "Miami" };
const CITY_CHI: ReadingLink = { kind: "city", href: "/locations/chicago-ai-automation-agency/", label: "Chicago" };
const CITY_HOU: ReadingLink = { kind: "city", href: "/locations/houston-ai-automation-agency/", label: "Houston" };
const CITY_PHX: ReadingLink = { kind: "city", href: "/locations/phoenix-ai-automation-agency/", label: "Phoenix" };
const CITY_TPA: ReadingLink = { kind: "city", href: "/locations/tampa-ai-automation-agency/", label: "Tampa" };
const CITY_CLT: ReadingLink = { kind: "city", href: "/locations/charlotte-ai-automation-agency/", label: "Charlotte" };

const COMPARE: Record<string, ReadingLink[]> = {
  "lawn-care-software-vs-jobber": links(LAWN, VS_LAWNPRO, GUIDE_LAWN_COST, CITY_DFW),
  "field-service-software-vs-servicetitan": links(ROOF, VS_ACCULYNX, GUIDE_ROOF, CITY_CHI),
  "credit-repair-crm-vs-alternatives": links(CREDIT, VS_DF, GUIDE_CREDIT, CITY_ATL),
  "ai-receptionist-vs-answering-service": links(RECEPTION, VS_ANSWER, GUIDE_PHONE, CITY_ATL),
  "fairway360-vs-foreup": links(GOLF, VS_CP, GUIDE_GOLF, CITY_ATL),
  "fairway360-vs-club-prophet": links(GOLF, VS_LS, GUIDE_GOLF, CITY_CLT),
  "fairway360-vs-lightspeed-golf": links(GOLF, VS_FOREUP, GUIDE_GOLF, CITY_TPA),
  "credit-repair-crm-vs-disputefox": links(CREDIT, VS_CRC, GUIDE_CREDIT_START, CITY_ATL),
  "lawn-care-software-vs-lawnpro": links(LAWN, VS_SA, GUIDE_LAWN_EST, CITY_PHX),
  "lawn-care-software-vs-service-autopilot": links(LAWN, VS_JOBBER, GUIDE_LAWN_COST, CITY_HOU),
  "roofing-crm-vs-acculynx": links(ROOF, VS_JN, GUIDE_ROOF, CITY_HOU),
  "roofing-crm-vs-jobnimbus": links(ROOF, VS_ST, GUIDE_ROOF, CITY_TPA),
};

const SOLUTION: Record<string, ReadingLink[]> = {
  fairway360: links(GOLF, VS_FOREUP, GUIDE_GOLF, CITY_ATL),
  "lawn-care-software": links(LAWN, VS_JOBBER, GUIDE_LAWN_COST, CITY_PHX),
  "credit-repair-software": links(CREDIT, VS_DF, GUIDE_CREDIT_START, CITY_ATL),
  "roofing-restoration": links(ROOF, VS_ACCULYNX, GUIDE_ROOF, CITY_HOU),
  "hvac-software": links(HVAC, VS_ST, GUIDE_ROOF, CITY_CHI),
  "pest-control-software": links(PEST, VS_LAWNPRO, GUIDE_LAWN_EST, CITY_PHX),
  "home-services": links(HOME, VS_ANSWER, GUIDE_PHONE, CITY_ATL),
  "ai-receptionist": links(RECEPTION, VS_ANSWER, GUIDE_VOICE, CITY_ATL),
  bmaikr: links(ROOF, VS_JN, GUIDE_ROOF, CITY_HOU),
  storehouse360: links(CREDIT, VS_CRC, GUIDE_CREDIT, CITY_ATL),
  scalaro: links(GOLF, VS_LS, GUIDE_VOICE, CITY_ATL),
  fabrioza: links({ kind: "stack", href: "/solutions/fabrioza/", label: "FABRIOZA manufacturing stack" }, VS_ST, GUIDE_AGENCY, CITY_ATL),
  academy: links({ kind: "stack", href: "/solutions/academy/", label: "Academy enrollment stack" }, VS_ANSWER, GUIDE_AGENCY, CITY_ATL),
};

const BLOG: Record<string, ReadingLink[]> = {
  "how-much-does-lawn-care-software-cost": links(LAWN, VS_JOBBER, GUIDE_LAWN_EST, CITY_DFW),
  "best-credit-repair-crm-features-2026": links(CREDIT, VS_CRC, GUIDE_CREDIT_START, CITY_ATL),
  "ai-answering-service-vs-human-receptionist": links(RECEPTION, VS_ANSWER, GUIDE_VOICE, CITY_ATL),
  "how-much-does-roofing-crm-cost": links(ROOF, VS_ACCULYNX, GUIDE_ROOF, CITY_HOU),
  "golf-course-management-software-checklist": links(GOLF, VS_FOREUP, GUIDE_GOLF, CITY_ATL),
  "how-to-automate-lawn-care-estimates": links(LAWN, VS_LAWNPRO, GUIDE_LAWN_COST, CITY_PHX),
  "credit-repair-business-software-startup-checklist": links(CREDIT, VS_DF, GUIDE_CREDIT, CITY_ATL),
  "how-much-does-an-ai-automation-agency-cost": links(RECEPTION, VS_ANSWER, GUIDE_AGENCY, CITY_ATL),
  "n8n-vs-make-vs-zapier": links(HOME, VS_JOBBER, GUIDE_AGENCY, CITY_ATL),
  "roi-of-workflow-automation-year-one": links(HOME, VS_ST, GUIDE_AGENCY, CITY_ATL),
  "voice-ai-agents-buyers-guide": links(RECEPTION, VS_ANSWER, GUIDE_PHONE, CITY_ATL),
  "what-is-an-ai-automation-agency": links(HOME, VS_ANSWER, GUIDE_AGENCY, CITY_ATL),
  "ai-agents-for-business": links(GOLF, VS_FOREUP, GUIDE_VOICE, CITY_ATL),
  "how-to-automate-lead-generation": links(HOME, VS_ANSWER, GUIDE_LAWN_EST, CITY_ATL),
};

const CITY: Record<string, ReadingLink[]> = {
  "atlanta-ai-automation-agency": links(GOLF, VS_FOREUP, GUIDE_GOLF, CITY_HOU),
  "dallas-ai-automation-agency": links(LAWN, VS_JOBBER, GUIDE_LAWN_COST, CITY_HOU),
  "miami-ai-automation-agency": links(ROOF, VS_ACCULYNX, GUIDE_ROOF, CITY_TPA),
  "chicago-ai-automation-agency": links(HVAC, VS_ST, GUIDE_ROOF, CITY_CLT),
  "houston-ai-automation-agency": links(ROOF, VS_JN, GUIDE_ROOF, CITY_DFW),
  "phoenix-ai-automation-agency": links(LAWN, VS_SA, GUIDE_LAWN_EST, CITY_PHX),
  "tampa-ai-automation-agency": links(ROOF, VS_LS, GUIDE_GOLF, CITY_MIA),
  "charlotte-ai-automation-agency": links(HVAC, VS_CP, GUIDE_GOLF, CITY_ATL),
};

// Phoenix city page should not link to itself as the city hop.
CITY["phoenix-ai-automation-agency"] = links(LAWN, VS_SA, GUIDE_LAWN_EST, CITY_TPA);

export function readingForComparison(slug: string): ReadingLink[] {
  return COMPARE[slug] ?? [];
}

export function readingForSolution(slug: string): ReadingLink[] {
  return SOLUTION[slug] ?? [];
}

export function readingForBlog(slug: string): ReadingLink[] {
  return BLOG[slug] ?? [];
}

export function readingForCity(slug: string): ReadingLink[] {
  return CITY[slug] ?? [];
}
