export type QuestionType = "single_select" | "multi_select" | "slider";

export interface QuestionOption {
  value: string;
  label: string;
  icon?: string;
}

export interface AuditQuestion {
  id: string;
  question: string;
  helper?: string;
  type: QuestionType;
  options?: QuestionOption[];
  min?: number;
  max?: number;
  step?: number;
  default?: number;
  unit?: string;
}

export const auditQuestions: AuditQuestion[] = [
  {
    id: "industry",
    question: "What industry is your business in?",
    helper: "This helps us benchmark you against similar teams.",
    type: "single_select",
    options: [
      { value: "saas", label: "SaaS / Tech", icon: "💻" },
      { value: "ecommerce", label: "E-commerce / Retail", icon: "🛒" },
      { value: "agency", label: "Agency / Consulting", icon: "🏢" },
      { value: "real_estate", label: "Real Estate", icon: "🏠" },
      { value: "healthcare", label: "Healthcare / Wellness", icon: "🏥" },
      { value: "finance", label: "Finance / Legal", icon: "💼" },
      { value: "other", label: "Other", icon: "⚡" },
    ],
  },
  {
    id: "team_size",
    question: "How many people are on your team?",
    type: "single_select",
    options: [
      { value: "1", label: "Just me", icon: "👤" },
      { value: "2-5", label: "2–5 people", icon: "👥" },
      { value: "6-20", label: "6–20 people", icon: "🏃" },
      { value: "21-50", label: "21–50 people", icon: "🏢" },
      { value: "50+", label: "50+ people", icon: "🏭" },
    ],
  },
  {
    id: "biggest_pain",
    question: "Which of these wastes the most time right now?",
    helper: "Pick the one that hurts the most.",
    type: "single_select",
    options: [
      { value: "lead_follow_up", label: "Following up with leads manually", icon: "📞" },
      { value: "data_entry", label: "Copying data between tools", icon: "📋" },
      { value: "reporting", label: "Building reports and dashboards", icon: "📊" },
      { value: "customer_support", label: "Answering repetitive questions", icon: "💬" },
      { value: "onboarding", label: "Client / employee onboarding", icon: "🚀" },
      { value: "scheduling", label: "Scheduling & calendar management", icon: "📅" },
    ],
  },
  {
    id: "hours_wasted",
    question: "How many hours per week does your team spend on this?",
    helper: "Drag to estimate. Most teams underestimate this.",
    type: "slider",
    min: 1,
    max: 40,
    step: 1,
    default: 10,
    unit: "hours/week",
  },
  {
    id: "avg_hourly_rate",
    question: "What's the average hourly cost of the person doing it?",
    type: "single_select",
    options: [
      { value: "15", label: "Under $20/hr", icon: "💵" },
      { value: "30", label: "$20–$40/hr", icon: "💵" },
      { value: "55", label: "$40–$70/hr", icon: "💴" },
      { value: "85", label: "$70–$100/hr", icon: "💎" },
      { value: "120", label: "$100+/hr", icon: "💎" },
    ],
  },
  {
    id: "current_tools",
    question: "Which tools does your team currently use?",
    helper: "Select all that apply.",
    type: "multi_select",
    options: [
      { value: "hubspot", label: "HubSpot", icon: "🟠" },
      { value: "salesforce", label: "Salesforce", icon: "☁️" },
      { value: "slack", label: "Slack", icon: "💬" },
      { value: "notion", label: "Notion / Airtable", icon: "📒" },
      { value: "gmail", label: "Gmail / Outlook", icon: "✉️" },
      { value: "zapier", label: "Zapier / Make", icon: "⚡" },
      { value: "shopify", label: "Shopify", icon: "🛍️" },
      { value: "none", label: "No tools yet", icon: "🚫" },
    ],
  },
  {
    id: "automation_goal",
    question: "What matters most to you from automation?",
    type: "single_select",
    options: [
      { value: "save_time", label: "Save my team time", icon: "⏱️" },
      { value: "scale_without_hiring", label: "Scale without hiring more staff", icon: "📈" },
      { value: "close_more_deals", label: "Close more deals faster", icon: "🤝" },
      { value: "reduce_errors", label: "Reduce human errors", icon: "✅" },
      { value: "customer_experience", label: "Better customer experience", icon: "⭐" },
    ],
  },
];
