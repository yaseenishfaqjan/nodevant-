// Audit scoring engine — authoritative server-side copy (mirrors lib/auditEngine.ts).

const PAIN_LABEL = {
  lead_follow_up: "Lead Follow-Up Automation",
  data_entry: "Data Entry & Sync Automation",
  reporting: "Automated Reporting",
  customer_support: "Customer Support Automation",
  onboarding: "Onboarding Automation",
  scheduling: "Scheduling Automation",
};

const EFFICIENCY_BY_PAIN = {
  lead_follow_up: 0.9,
  data_entry: 0.95,
  reporting: 0.85,
  customer_support: 0.8,
  onboarding: 0.75,
  scheduling: 0.85,
};

const BUILD_COST_BY_PAIN = {
  lead_follow_up: 1800,
  data_entry: 1200,
  reporting: 2200,
  customer_support: 2800,
  onboarding: 2400,
  scheduling: 1500,
};

const RECOMMENDATIONS = {
  lead_follow_up: {
    serviceTitle: "AI Lead Qualification Pipeline",
    description:
      "Automatically score, qualify, and follow up with every lead the moment they enter your funnel — no human needed until it's time to close.",
    tools: ["n8n", "OpenAI", "HubSpot / CRM of choice", "Gmail"],
    timelineWeeks: "1–2",
    startingPrice: 1800,
    caseStudyHook:
      "An agency client went from manually screening 200 leads/day to a fully automated pipeline that books calls directly into their calendar.",
  },
  data_entry: {
    serviceTitle: "Data Sync & Entry Automation",
    description:
      "Connect your tools so data flows automatically between systems — zero manual copying, zero errors, real-time everywhere.",
    tools: ["n8n", "Make", "Airtable", "REST APIs"],
    timelineWeeks: "1–2",
    startingPrice: 1200,
    caseStudyHook:
      "A logistics company saved 40 hours/week by syncing their ERP, Slack, email, and spreadsheets into one automated flow.",
  },
  customer_support: {
    serviceTitle: "AI Voice or Chat Support Agent",
    description:
      "Deploy an AI agent that handles 70–80% of inbound support questions 24/7 — escalating to humans only when necessary.",
    tools: ["VAPI", "ElevenLabs", "OpenAI", "Twilio"],
    timelineWeeks: "2–3",
    startingPrice: 2800,
    caseStudyHook:
      "An e-commerce brand deflected 78% of support calls with a voice AI agent, saving $8k/month in staffing.",
  },
  reporting: {
    serviceTitle: "Automated Reporting Dashboard",
    description:
      "Pull data from every source into a live dashboard that updates automatically — reports write themselves.",
    tools: ["n8n", "Google Sheets / Notion", "OpenAI", "Slack"],
    timelineWeeks: "2–3",
    startingPrice: 2200,
    caseStudyHook:
      "A SaaS team eliminated 15 hours/week of manual reporting and got real-time metrics in Slack every morning.",
  },
  onboarding: {
    serviceTitle: "Client Onboarding Automation",
    description:
      "From signed contract to fully onboarded client — every step automated: welcome emails, account setup, task creation, kickoff scheduling.",
    tools: ["n8n", "HubSpot", "Notion", "Gmail"],
    timelineWeeks: "1–2",
    startingPrice: 2400,
    caseStudyHook:
      "An agency reduced onboarding from 3 days to 4 hours by automating every step from contract to kickoff.",
  },
  scheduling: {
    serviceTitle: "Smart Scheduling Automation",
    description:
      "AI-powered scheduling that eliminates back-and-forth, routes to the right team member, and sends automated reminders.",
    tools: ["n8n", "Cal.com", "OpenAI", "Slack"],
    timelineWeeks: "1",
    startingPrice: 1500,
    caseStudyHook:
      "A consultancy eliminated 8 hours/week of scheduling coordination with a smart routing + booking automation.",
  },
};

function scoreAudit(a) {
  let score = 100;
  const hours = Number(a.hours_wasted) || 0;
  if (hours >= 20) score -= 35;
  else if (hours >= 10) score -= 25;
  else if (hours >= 5) score -= 15;

  if (["lead_follow_up", "data_entry", "reporting"].includes(a.biggest_pain))
    score -= 20;

  const tools = Array.isArray(a.current_tools)
    ? a.current_tools
    : String(a.current_tools || "").split(",").map((t) => t.trim()).filter(Boolean);
  if (tools.includes("none") || tools.length <= 1) score -= 20;

  if (parseInt(a.avg_hourly_rate) >= 55) score -= 10;

  return Math.max(5, Math.min(100, score));
}

function calculateROI(a) {
  const hoursPerWeek = Number(a.hours_wasted) || 0;
  const rate = parseInt(a.avg_hourly_rate) || 0;
  const annualCostOfProblem = hoursPerWeek * rate * 52;
  const efficiency = EFFICIENCY_BY_PAIN[a.biggest_pain] || 0.8;
  const annualSavings = Math.round(annualCostOfProblem * efficiency);
  const buildCost = BUILD_COST_BY_PAIN[a.biggest_pain] || 1800;
  const paybackWeeks =
    annualSavings > 0 ? Math.round((buildCost / annualSavings) * 52 * 10) / 10 : 0;
  const roiMultiple =
    buildCost > 0 ? Math.round((annualSavings / buildCost) * 10) / 10 : 0;
  return {
    weeklyHoursWasted: hoursPerWeek,
    hourlyRate: rate,
    annualCostOfProblem,
    automationEfficiency: efficiency,
    annualSavings,
    buildCost,
    paybackWeeks,
    roiMultiple,
  };
}

function getRecommendation(a) {
  return RECOMMENDATIONS[a.biggest_pain] || RECOMMENDATIONS.lead_follow_up;
}

function scoreLabel(score) {
  if (score < 40) return "High opportunity";
  if (score < 70) return "Medium opportunity";
  return "Solid baseline";
}

function painLabel(pain) {
  return PAIN_LABEL[pain] || "Automation Opportunity";
}

function buildReport(a) {
  const score = scoreAudit(a);
  return {
    score,
    scoreLabel: scoreLabel(score),
    painLabel: painLabel(a.biggest_pain),
    recommendation: getRecommendation(a),
    roi: calculateROI(a),
  };
}

module.exports = { buildReport, scoreAudit, calculateROI, getRecommendation, scoreLabel, painLabel };
