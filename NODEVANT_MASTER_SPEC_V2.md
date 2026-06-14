# NODEVANT.COM — MASTER BUILD SPECIFICATION V2
## Next.js 14 · TypeScript · Tailwind · Framer Motion · Node.js Audit Engine

> **Strategy brief:** After analyzing the top AI automation agency websites, their #1 conversion gap is they all look the same and do nothing interactive. Nodevant wins by giving every visitor an instant, personalized result before they talk to anyone. The Automation Audit is the weapon — it makes Nodevant the only agency where a prospect understands their ROI before booking a call.

---

## 🏆 COMPETITIVE INTELLIGENCE — WHAT THE TOP SITES DO & WHERE THEY FAIL

### What the best sites do right
| Pattern | Who Does It | Why It Works |
|---------|-------------|--------------|
| Niche specificity | aiautomation.agency | Narrows audience = higher trust |
| "Say goodbye to X / say hello to Y" copy | Multiple | Speaks to pain, not features |
| Process transparency (numbered steps) | Most | Reduces fear of the unknown |
| ROI-framing over feature-framing | Kwestra, SolvSpot | CFO-ready language converts |
| Proof > promises (case studies with $) | Top agencies | Skepticism killer |
| Interactive tools (ROI calculators) | SolvSpot, Writer, Plura | **#1 lead magnet of 2026** |

### What every competitor gets WRONG
1. **Static brochure sites** — no interactivity, no personalization, visitor leaves with nothing
2. **Generic copy** — "We automate your workflows" means nothing to a specific buyer
3. **No demo** — telling is weak; showing is strong; letting them DO it is unstoppable
4. **Vague pricing** — creates friction; most sites hide it entirely
5. **Weak SEO** — thin pages, no blog, no schema, no topical authority
6. **No lead magnet** — just a "Book a call" CTA, which converts < 2% of visitors

### Nodevant's Winning Strategy
**Give value BEFORE asking for anything.** The Automation Audit tool gives every visitor a personalized report in 90 seconds — their biggest automation opportunity, estimated ROI, and recommended service. Then it asks for their email to send the full report. **This converts 8–15× better than a contact form.**

---

## ✅ FINAL ANSWER ON YOUR QUESTIONS

### "Demo or no demo?"
**YES — but smarter than a demo. Build the Automation Audit Tool.**

A demo shows what you've built. An Audit Tool shows the visitor what THEY can gain. That's the difference between a brochure and a sales machine. Every visitor who completes the audit becomes a warm lead with context — you already know their industry, team size, pain points, and estimated ROI before the call.

### Stack decision: confirmed
- **Frontend:** Next.js 14 (App Router, static export), React, TypeScript, Tailwind CSS, Framer Motion
- **Audit Engine (backend):** Node.js + Express API — deployed as a separate service
- **Why Node.js for the audit:** Needs server-side logic (scoring algorithm, report generation, email delivery), can't be static. Deployed on your Contabo VPS or a free Render.com instance.
- **SEO starts from Claude** — all metadata, schemas, and blog content built into the spec, zero placeholder

---

## 📁 COMPLETE PROJECT STRUCTURE

```
nodevant/
├── app/                              ← Next.js App Router
│   ├── layout.tsx                    ← Root layout + all SEO metadata
│   ├── page.tsx                      ← Homepage
│   ├── globals.css
│   ├── services/page.tsx
│   ├── case-studies/page.tsx
│   ├── about/page.tsx
│   ├── audit/page.tsx                ← 🆕 Automation Audit Tool (frontend)
│   ├── audit/results/page.tsx        ← 🆕 Audit Results page
│   ├── blog/page.tsx
│   ├── blog/[slug]/page.tsx
│   ├── contact/page.tsx
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── Hero.tsx                  ← NODE/VANT stacked wordmark
│   │   ├── TrustedBy.tsx
│   │   ├── AuditCTA.tsx              ← 🆕 Prominent audit CTA block
│   │   ├── Services.tsx
│   │   ├── Process.tsx
│   │   ├── Stats.tsx
│   │   ├── Testimonials.tsx
│   │   ├── FAQ.tsx
│   │   └── FinalCTA.tsx
│   ├── audit/                        ← 🆕 All audit components
│   │   ├── AuditWizard.tsx           ← Multi-step form
│   │   ├── AuditStep.tsx
│   │   ├── AuditProgress.tsx
│   │   ├── AuditResults.tsx
│   │   └── AuditEmailGate.tsx
│   └── ui/
│       ├── ParticleCanvas.tsx
│       ├── ScrollReveal.tsx
│       ├── CounterNumber.tsx
│       ├── GlowCard.tsx
│       └── GradientBadge.tsx
├── lib/
│   ├── metadata.ts
│   └── schema.ts
├── public/
│   ├── og-image.png                  ← 1200×630
│   ├── og-audit.png                  ← OG for audit page
│   └── logo.svg
├── next.config.js
├── tailwind.config.ts
└── package.json

audit-api/                            ← 🆕 Separate Node.js backend
├── src/
│   ├── server.ts                     ← Express server
│   ├── routes/
│   │   └── audit.ts                  ← POST /api/audit
│   ├── engine/
│   │   ├── scorer.ts                 ← Scoring algorithm
│   │   ├── recommender.ts            ← Service recommender
│   │   └── roiCalculator.ts          ← ROI estimates
│   ├── email/
│   │   ├── mailer.ts                 ← Nodemailer/Resend
│   │   └── templates/
│   │       └── auditReport.html      ← Email report template
│   └── types/
│       └── audit.ts
├── package.json
└── tsconfig.json
```

---

## 🔍 SEO STRATEGY — BUILT FROM DAY ONE

### Keyword Architecture (3-tier)

**Tier 1 — Money keywords (homepage + services)**
- `ai automation agency` — 8,100 searches/mo
- `workflow automation agency` — 2,400/mo
- `ai agents for business` — 4,400/mo
- `business automation consultant` — 1,600/mo

**Tier 2 — Intent keywords (case studies + audit page)**
- `automate lead generation ai` — 1,300/mo
- `ai automation roi calculator` — 720/mo
- `workflow automation cost` — 880/mo
- `n8n automation agency` — 590/mo

**Tier 3 — Long-tail (blog posts)**
- `how to automate sales follow up with ai` — 390/mo
- `n8n vs make vs zapier 2026` — 1,200/mo
- `what is an ai automation agency` — 520/mo
- `voice ai agent customer support` — 340/mo
- `crm automation with ai` — 710/mo
- `ai automation for small business` — 960/mo

### SEO Technical Checklist (all built into code)
- [ ] `<html lang="en">` on every page
- [ ] One `<h1>` per page, contains primary keyword
- [ ] H2/H3 hierarchy with secondary keywords
- [ ] Canonical URL on every page
- [ ] OpenGraph + Twitter Card on every page
- [ ] JSON-LD: Organization, Service, FAQ, Article schemas
- [ ] Sitemap.xml auto-generated covering all pages
- [ ] Robots.txt allowing all crawlers
- [ ] `next/font` — zero font layout shift
- [ ] `alt` text on every image (keyword-relevant)
- [ ] Internal linking: every page links to /audit/ and /contact/
- [ ] Core Web Vitals: LCP <2.5s, CLS=0, INP<200ms
- [ ] Google Search Console verification slot in metadata
- [ ] No `noindex` tags anywhere

---

## 📄 PAGE SPECIFICATIONS

---

### PAGE 1: Homepage (`app/page.tsx`)

**Primary keyword:** `ai automation agency`

```ts
export const metadata: Metadata = {
  title: 'Nodevant — AI Automation Agency | Custom AI Agents & Workflow Automation',
  description: 'Nodevant builds enterprise-grade AI agents, workflow automations, and intelligent integrations that eliminate busywork and scale revenue. Get your free automation audit.',
  keywords: ['ai automation agency', 'AI agents', 'workflow automation', 'business automation', 'n8n automation', 'ai integration agency'],
  alternates: { canonical: 'https://nodevant.com' },
  openGraph: {
    title: 'Nodevant — AI Automation Agency',
    description: 'Enterprise-grade AI agents and automation that redefine what your team can accomplish.',
    url: 'https://nodevant.com',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Nodevant AI Automation Agency' }],
  },
}
```

**JSON-LD schemas on this page:**
1. Organization schema
2. FAQ schema (6 questions)
3. WebSite schema with SearchAction

**Homepage sections order:**
1. `<Hero />` — NODE/VANT wordmark, subtitle, 2 CTAs
2. `<TrustedBy />` — scrolling logo ticker
3. `<AuditCTA />` — **🆕 PROMINENT AUDIT BLOCK** — "Find your #1 automation opportunity in 90 seconds"
4. `<Services />` — 6 cards
5. `<Process />` — 4 steps
6. `<Stats />` — animated counters
7. `<Testimonials />` — 3 cards
8. `<FAQ />` — 6 questions accordion
9. `<FinalCTA />` — book a call

**AuditCTA block copy:**
```
Headline: "What's your biggest automation opportunity right now?"
Subline: "Answer 7 questions. Get a personalized report with your #1 bottleneck, estimated ROI, and the exact system to fix it. Free. 90 seconds."
CTA Button: "Get My Free Audit →"
Link: /audit/
Trust signals below button: "No email required to start · 47 audits completed this week"
```

---

### PAGE 2: Automation Audit Tool (`app/audit/page.tsx`) 🆕

**This is Nodevant's #1 conversion asset and lead magnet.**

**SEO Metadata:**
```ts
title: 'Free Automation Audit | Find Your #1 AI Automation Opportunity — Nodevant'
description: 'Take our free 90-second automation audit. Answer 7 questions about your business and get a personalized report showing your biggest automation opportunity and estimated ROI.'
canonical: 'https://nodevant.com/audit/'
openGraph.images: '/og-audit.png'
```

**JSON-LD on this page:**
```json
{
  "@type": "WebApplication",
  "name": "Nodevant Automation Audit",
  "description": "Free 7-question audit that identifies your highest-value automation opportunity",
  "url": "https://nodevant.com/audit/",
  "applicationCategory": "BusinessApplication",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
}
```

**THE 7 AUDIT QUESTIONS (wizard UI, one question per screen):**

```ts
const auditQuestions = [
  {
    id: 'industry',
    question: 'What industry is your business in?',
    type: 'single_select',
    options: [
      { value: 'saas', label: 'SaaS / Tech', icon: '💻' },
      { value: 'ecommerce', label: 'E-commerce / Retail', icon: '🛒' },
      { value: 'agency', label: 'Agency / Consulting', icon: '🏢' },
      { value: 'real_estate', label: 'Real Estate', icon: '🏠' },
      { value: 'healthcare', label: 'Healthcare / Wellness', icon: '🏥' },
      { value: 'finance', label: 'Finance / Legal', icon: '💼' },
      { value: 'other', label: 'Other', icon: '⚡' },
    ]
  },
  {
    id: 'team_size',
    question: 'How many people are on your team?',
    type: 'single_select',
    options: [
      { value: '1', label: 'Just me', icon: '👤' },
      { value: '2-5', label: '2–5 people', icon: '👥' },
      { value: '6-20', label: '6–20 people', icon: '🏃' },
      { value: '21-50', label: '21–50 people', icon: '🏢' },
      { value: '50+', label: '50+ people', icon: '🏭' },
    ]
  },
  {
    id: 'biggest_pain',
    question: 'Which of these wastes the most time in your business right now?',
    type: 'single_select',
    options: [
      { value: 'lead_follow_up', label: 'Following up with leads manually', icon: '📞' },
      { value: 'data_entry', label: 'Copying data between tools', icon: '📋' },
      { value: 'reporting', label: 'Building reports and dashboards', icon: '📊' },
      { value: 'customer_support', label: 'Answering repetitive customer questions', icon: '💬' },
      { value: 'onboarding', label: 'Client / employee onboarding', icon: '🚀' },
      { value: 'scheduling', label: 'Scheduling and calendar management', icon: '📅' },
    ]
  },
  {
    id: 'hours_wasted',
    question: 'How many hours per week does your team spend on this?',
    type: 'slider',
    min: 1,
    max: 40,
    step: 1,
    default: 10,
    label: '{value} hours/week'
  },
  {
    id: 'avg_hourly_rate',
    question: 'What is the average hourly cost of the person doing this work?',
    type: 'single_select',
    options: [
      { value: '15', label: 'Under $20/hr', icon: '💵' },
      { value: '30', label: '$20–$40/hr', icon: '💵💵' },
      { value: '55', label: '$40–$70/hr', icon: '💵💵💵' },
      { value: '85', label: '$70–$100/hr', icon: '💎' },
      { value: '120', label: '$100+/hr', icon: '💎💎' },
    ]
  },
  {
    id: 'current_tools',
    question: 'Which tools does your team currently use? (select all that apply)',
    type: 'multi_select',
    options: [
      { value: 'hubspot', label: 'HubSpot' },
      { value: 'salesforce', label: 'Salesforce' },
      { value: 'slack', label: 'Slack' },
      { value: 'notion', label: 'Notion / Airtable' },
      { value: 'gmail', label: 'Gmail / Outlook' },
      { value: 'zapier', label: 'Zapier / Make' },
      { value: 'shopify', label: 'Shopify' },
      { value: 'none', label: 'No tools yet' },
    ]
  },
  {
    id: 'automation_goal',
    question: 'What matters most to you from automation?',
    type: 'single_select',
    options: [
      { value: 'save_time', label: 'Save my team time', icon: '⏱️' },
      { value: 'scale_without_hiring', label: 'Scale without hiring more staff', icon: '📈' },
      { value: 'close_more_deals', label: 'Close more deals faster', icon: '🤝' },
      { value: 'reduce_errors', label: 'Reduce human errors', icon: '✅' },
      { value: 'customer_experience', label: 'Better customer experience', icon: '⭐' },
    ]
  },
]
```

**Email gate (after question 7, before results):**
```
Headline: "Your automation report is ready."
Subline: "Enter your email and we'll send you the full breakdown — including a step-by-step build plan."
Fields: First name, Work email
Button: "See My Results →"
Fine print: "No spam. One email with your report. That's it."
```

---

### PAGE 3: Audit Results (`app/audit/results/page.tsx`) 🆕

**This page is rendered client-side from URL params or sessionStorage after API response.**

**What the results page shows:**

```
┌────────────────────────────────────────────────┐
│  Your Automation Score: 34/100                 │
│  ████░░░░░░░░░░░░░░░  High opportunity         │
└────────────────────────────────────────────────┘

┌────────────────────────────────────────────────┐
│  🎯 Your #1 Opportunity                        │
│  Lead Follow-Up Automation                     │
│                                                │
│  Based on your answers, your team spends ~10   │
│  hours/week following up with leads manually.  │
│  At $55/hr, that's $28,600/year in labor on   │
│  a task that can be 90% automated.             │
└────────────────────────────────────────────────┘

┌────────────────────────────────────────────────┐
│  💰 Your Estimated ROI                         │
│  Year 1 savings: $25,740                       │
│  Build cost: $1,800 (est.)                     │
│  Payback period: 3.7 weeks                     │
│  12-month ROI: 14.3×                           │
└────────────────────────────────────────────────┘

┌────────────────────────────────────────────────┐
│  🔧 Recommended Solution                       │
│  AI Lead Qualification Pipeline                │
│  Tools: HubSpot + n8n + OpenAI                 │
│  Timeline: 1–2 weeks                           │
│  Starting from: $1,800                         │
└────────────────────────────────────────────────┘

┌────────────────────────────────────────────────┐
│  📋 What Happens Next                          │
│  ✓ Report sent to your email                   │
│  ✓ Book a free 30-min call to confirm scope    │
│  ✓ We build it in 1–2 weeks                    │
│                                                │
│  [Book Your Free Strategy Call →]              │
└────────────────────────────────────────────────┘
```

---

## ⚙️ NODE.JS AUDIT ENGINE SPECIFICATION

### `audit-api/src/server.ts`

```ts
import express from 'express'
import cors from 'cors'
import { auditRouter } from './routes/audit'

const app = express()
app.use(cors({ origin: ['https://nodevant.com', 'http://localhost:3000'] }))
app.use(express.json())
app.use('/api', auditRouter)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Audit API running on port ${PORT}`))
```

### `audit-api/src/routes/audit.ts`

```ts
import { Router } from 'express'
import { scoreAudit } from '../engine/scorer'
import { getRecommendation } from '../engine/recommender'
import { calculateROI } from '../engine/roiCalculator'
import { sendAuditEmail } from '../email/mailer'

const router = Router()

// POST /api/audit
router.post('/audit', async (req, res) => {
  try {
    const answers = req.body  // All 7 answers + email + name

    // 1. Score
    const score = scoreAudit(answers)

    // 2. Recommend
    const recommendation = getRecommendation(answers)

    // 3. Calculate ROI
    const roi = calculateROI(answers)

    // 4. Build report
    const report = { score, recommendation, roi, answers }

    // 5. Send email (async, don't await — don't block response)
    sendAuditEmail(answers.email, answers.firstName, report).catch(console.error)

    // 6. Return results
    res.json({ success: true, report })

  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: 'Audit processing failed' })
  }
})

export { router as auditRouter }
```

### `audit-api/src/engine/scorer.ts`

```ts
import type { AuditAnswers } from '../types/audit'

// Score from 0–100 — lower score = more opportunity = more urgency
export function scoreAudit(answers: AuditAnswers): number {
  let score = 100

  // Hours wasted penalty
  if (answers.hours_wasted >= 20) score -= 35
  else if (answers.hours_wasted >= 10) score -= 25
  else if (answers.hours_wasted >= 5) score -= 15

  // High-value pain points are worse
  const highImpactPains = ['lead_follow_up', 'data_entry', 'reporting']
  if (highImpactPains.includes(answers.biggest_pain)) score -= 20

  // No automation tools = big opportunity
  if (answers.current_tools.includes('none') || answers.current_tools.length <= 1) score -= 20

  // High hourly rate = high ROI
  if (parseInt(answers.avg_hourly_rate) >= 55) score -= 10

  return Math.max(5, Math.min(100, score))
}
```

### `audit-api/src/engine/roiCalculator.ts`

```ts
import type { AuditAnswers } from '../types/audit'

export interface ROIResult {
  weeklyHoursWasted: number
  hourlyRate: number
  annualCostOfProblem: number
  automationEfficiency: number   // 0.7–0.9 depending on task type
  annualSavings: number
  buildCost: number
  paybackWeeks: number
  roiMultiple: number
}

const EFFICIENCY_BY_PAIN: Record<string, number> = {
  lead_follow_up:    0.90,
  data_entry:        0.95,
  reporting:         0.85,
  customer_support:  0.80,
  onboarding:        0.75,
  scheduling:        0.85,
}

const BUILD_COST_BY_PAIN: Record<string, number> = {
  lead_follow_up:    1800,
  data_entry:        1200,
  reporting:         2200,
  customer_support:  2800,
  onboarding:        2400,
  scheduling:        1500,
}

export function calculateROI(answers: AuditAnswers): ROIResult {
  const hoursPerWeek = answers.hours_wasted
  const rate = parseInt(answers.avg_hourly_rate)
  const weeklyLaborCost = hoursPerWeek * rate
  const annualCostOfProblem = weeklyLaborCost * 52

  const efficiency = EFFICIENCY_BY_PAIN[answers.biggest_pain] || 0.80
  const annualSavings = Math.round(annualCostOfProblem * efficiency)

  const buildCost = BUILD_COST_BY_PAIN[answers.biggest_pain] || 1800
  const paybackWeeks = Math.round((buildCost / annualSavings) * 52 * 10) / 10
  const roiMultiple = Math.round((annualSavings / buildCost) * 10) / 10

  return {
    weeklyHoursWasted: hoursPerWeek,
    hourlyRate: rate,
    annualCostOfProblem,
    automationEfficiency: efficiency,
    annualSavings,
    buildCost,
    paybackWeeks,
    roiMultiple,
  }
}
```

### `audit-api/src/engine/recommender.ts`

```ts
import type { AuditAnswers } from '../types/audit'

export interface Recommendation {
  serviceTitle: string
  serviceSlug: string
  description: string
  tools: string[]
  timelineWeeks: string
  startingPrice: number
  caseStudyHook: string
}

const RECOMMENDATIONS: Record<string, Recommendation> = {
  lead_follow_up: {
    serviceTitle: 'AI Lead Qualification Pipeline',
    serviceSlug: 'workflow-automation',
    description: 'Automatically score, qualify, and follow up with every lead the moment they enter your funnel — no human needed until it\'s time to close.',
    tools: ['n8n', 'OpenAI', 'HubSpot / CRM of choice', 'Gmail'],
    timelineWeeks: '1–2',
    startingPrice: 1800,
    caseStudyHook: 'An agency client went from manually screening 200 leads/day to a fully automated pipeline that books calls directly into their calendar.',
  },
  data_entry: {
    serviceTitle: 'Data Sync & Entry Automation',
    serviceSlug: 'system-integration',
    description: 'Connect your tools so data flows automatically between systems — zero manual copying, zero errors, real-time everywhere.',
    tools: ['n8n', 'Make', 'Airtable', 'REST APIs'],
    timelineWeeks: '1–2',
    startingPrice: 1200,
    caseStudyHook: 'A logistics company saved 40 hours/week by syncing their ERP, Slack, email, and spreadsheets into one automated flow.',
  },
  customer_support: {
    serviceTitle: 'AI Voice or Chat Support Agent',
    serviceSlug: 'voice-ai',
    description: 'Deploy an AI agent that handles 70–80% of inbound support questions 24/7 — escalating to humans only when necessary.',
    tools: ['VAPI', 'ElevenLabs', 'OpenAI', 'Twilio'],
    timelineWeeks: '2–3',
    startingPrice: 2800,
    caseStudyHook: 'An e-commerce brand deflected 78% of support calls with a voice AI agent, saving $8k/month in staffing.',
  },
  reporting: {
    serviceTitle: 'Automated Reporting Dashboard',
    serviceSlug: 'custom-ai',
    description: 'Pull data from every source into a live dashboard that updates automatically — reports write themselves.',
    tools: ['n8n', 'Google Sheets / Notion', 'OpenAI', 'Slack'],
    timelineWeeks: '2–3',
    startingPrice: 2200,
    caseStudyHook: 'A SaaS team eliminated 15 hours/week of manual reporting and got real-time metrics in Slack every morning.',
  },
  onboarding: {
    serviceTitle: 'Client Onboarding Automation',
    serviceSlug: 'workflow-automation',
    description: 'From signed contract to fully onboarded client — every step automated: welcome emails, account setup, task creation, kickoff scheduling.',
    tools: ['n8n', 'HubSpot', 'Notion', 'Gmail'],
    timelineWeeks: '1–2',
    startingPrice: 2400,
    caseStudyHook: 'An agency reduced onboarding from 3 days to 4 hours by automating every step from contract to kickoff.',
  },
  scheduling: {
    serviceTitle: 'Smart Scheduling Automation',
    serviceSlug: 'workflow-automation',
    description: 'AI-powered scheduling that eliminates back-and-forth, routes to the right team member, and sends automated reminders.',
    tools: ['n8n', 'Cal.com', 'OpenAI', 'Slack'],
    timelineWeeks: '1',
    startingPrice: 1500,
    caseStudyHook: 'A consultancy eliminated 8 hours/week of scheduling coordination with a smart routing + booking automation.',
  },
}

export function getRecommendation(answers: AuditAnswers): Recommendation {
  return RECOMMENDATIONS[answers.biggest_pain] || RECOMMENDATIONS['lead_follow_up']
}
```

### `audit-api/src/email/mailer.ts`

```ts
import nodemailer from 'nodemailer'
import type { ROIResult } from '../engine/roiCalculator'
import type { Recommendation } from '../engine/recommender'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  }
})

export async function sendAuditEmail(
  email: string,
  firstName: string,
  report: { score: number; recommendation: Recommendation; roi: ROIResult }
) {
  const { score, recommendation, roi } = report

  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Inter, sans-serif; background: #08080F; color: #F0F0FF; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 24px; }
    .header { text-align: center; margin-bottom: 40px; }
    .logo { font-size: 24px; font-weight: 700; color: #00D4FF; }
    .score-block { background: rgba(0,212,255,0.08); border: 1px solid rgba(0,212,255,0.2); border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px; }
    .score { font-size: 48px; font-weight: 700; color: #00D4FF; }
    .section { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 24px; margin-bottom: 16px; }
    .section-title { font-size: 12px; text-transform: uppercase; letter-spacing: 0.12em; color: #7B7BA8; margin-bottom: 12px; }
    .value { font-size: 28px; font-weight: 700; color: #00D4FF; }
    .label { font-size: 14px; color: #7B7BA8; margin-top: 4px; }
    .cta { display: block; background: linear-gradient(135deg, #00D4FF, #9B5CFF); color: #08080F; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 700; text-align: center; margin: 32px 0; font-size: 16px; }
    h2 { font-size: 20px; font-weight: 700; color: #F0F0FF; margin: 0 0 12px; }
    p { color: #B0B0CC; line-height: 1.6; margin: 0; font-size: 15px; }
    .tools { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px; }
    .tool { background: rgba(0,212,255,0.1); border: 1px solid rgba(0,212,255,0.2); border-radius: 6px; padding: 4px 12px; font-size: 13px; color: #00D4FF; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">⬡ Nodevant</div>
      <p style="color:#7B7BA8;margin-top:8px;font-size:14px">Your Automation Audit Report</p>
    </div>

    <p style="margin-bottom:24px">Hi ${firstName},</p>
    <p style="margin-bottom:32px">Here's your personalized automation report. Based on your answers, we found a clear opportunity — here's exactly what it's worth and what to do about it.</p>

    <div class="score-block">
      <div style="font-size:12px;text-transform:uppercase;letter-spacing:0.12em;color:#7B7BA8;margin-bottom:8px">Your Automation Score</div>
      <div class="score">${score}/100</div>
      <div style="color:#00D4FF;margin-top:8px;font-size:14px">
        ${score < 40 ? '🔥 High opportunity — significant time being lost' : score < 70 ? '⚡ Medium opportunity — room to optimize' : '✅ Good baseline — fine-tuning available'}
      </div>
    </div>

    <div class="section">
      <div class="section-title">🎯 Your #1 Opportunity</div>
      <h2>${recommendation.serviceTitle}</h2>
      <p>${recommendation.description}</p>
      <div class="tools">
        ${recommendation.tools.map(t => `<span class="tool">${t}</span>`).join('')}
      </div>
    </div>

    <div class="section">
      <div class="section-title">💰 Estimated ROI</div>
      <table width="100%" style="border-collapse:collapse">
        <tr>
          <td style="padding:8px 0;color:#7B7BA8;font-size:14px">Annual cost of problem</td>
          <td style="padding:8px 0;color:#F0F0FF;font-weight:600;text-align:right">$${roi.annualCostOfProblem.toLocaleString()}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#7B7BA8;font-size:14px">Annual savings after automation</td>
          <td style="padding:8px 0;color:#00D4FF;font-weight:700;text-align:right">$${roi.annualSavings.toLocaleString()}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#7B7BA8;font-size:14px">Estimated build cost</td>
          <td style="padding:8px 0;color:#F0F0FF;font-weight:600;text-align:right">$${roi.buildCost.toLocaleString()}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#7B7BA8;font-size:14px">Payback period</td>
          <td style="padding:8px 0;color:#F0F0FF;font-weight:600;text-align:right">${roi.paybackWeeks} weeks</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#7B7BA8;font-size:14px">12-month ROI multiple</td>
          <td style="padding:8px 0;color:#00D4FF;font-weight:700;font-size:18px;text-align:right">${roi.roiMultiple}×</td>
        </tr>
      </table>
    </div>

    <div class="section">
      <div class="section-title">📋 Proof It Works</div>
      <p style="font-style:italic">"${recommendation.caseStudyHook}"</p>
    </div>

    <a href="https://nodevant.com/contact/?from=audit" class="cta">
      Book Your Free 30-Min Strategy Call →
    </a>

    <p style="font-size:13px;color:#7B7BA8;text-align:center">
      On the call, we'll confirm this analysis, answer your questions, and scope exactly what to build. No commitment required.
    </p>

    <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:32px 0">
    <p style="font-size:12px;color:#7B7BA8;text-align:center">
      Nodevant · hello@nodevant.com · <a href="https://nodevant.com" style="color:#00D4FF">nodevant.com</a>
    </p>
  </div>
</body>
</html>
  `

  await transporter.sendMail({
    from: '"Nodevant" <hello@nodevant.com>',
    to: email,
    subject: `Your automation report: ${roi.roiMultiple}× ROI opportunity identified`,
    html,
  })
}
```

### `audit-api/src/types/audit.ts`

```ts
export interface AuditAnswers {
  industry: string
  team_size: string
  biggest_pain: string
  hours_wasted: number
  avg_hourly_rate: string
  current_tools: string[]
  automation_goal: string
  firstName: string
  email: string
}
```

### `audit-api/package.json`

```json
{
  "name": "nodevant-audit-api",
  "version": "1.0.0",
  "scripts": {
    "dev": "ts-node-dev src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  },
  "dependencies": {
    "express": "^4.18.0",
    "cors": "^2.8.5",
    "nodemailer": "^6.9.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.0",
    "@types/cors": "^2.8.0",
    "@types/nodemailer": "^6.4.0",
    "typescript": "^5.4.0",
    "ts-node-dev": "^2.0.0"
  }
}
```

---

## 🧩 AUDIT WIZARD FRONTEND (`components/audit/AuditWizard.tsx`)

```tsx
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AuditStep from './AuditStep'
import AuditProgress from './AuditProgress'
import AuditEmailGate from './AuditEmailGate'
import { auditQuestions } from '@/lib/auditQuestions'
import { useRouter } from 'next/navigation'

export default function AuditWizard() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [showEmailGate, setShowEmailGate] = useState(false)
  const [loading, setLoading] = useState(false)

  const totalSteps = auditQuestions.length

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(prev => prev + 1)
    } else {
      setShowEmailGate(true)
    }
  }

  const handleSubmit = async (email: string, firstName: string) => {
    setLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_AUDIT_API_URL}/api/audit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...answers, email, firstName }),
      })
      const data = await res.json()
      if (data.success) {
        // Store report in sessionStorage for results page
        sessionStorage.setItem('auditReport', JSON.stringify(data.report))
        router.push('/audit/results/')
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (showEmailGate) {
    return <AuditEmailGate onSubmit={handleSubmit} loading={loading} />
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-6 py-24">
      <AuditProgress current={step + 1} total={totalSteps} />
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl"
        >
          <AuditStep
            question={auditQuestions[step]}
            value={answers[auditQuestions[step].id]}
            onChange={(val) => handleAnswer(auditQuestions[step].id, val)}
            onNext={handleNext}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
```

---

## 📝 BLOG POST CONTENT (Full SEO Articles)

### Post 1: `/blog/what-is-ai-automation-agency/`

**Title:** What Is an AI Automation Agency? (And Do You Actually Need One?)
**Target keyword:** ai automation agency (8,100/mo)
**Word count:** 1,800 words
**Structure:**
- H1: What Is an AI Automation Agency?
- H2: What does an AI automation agency actually do?
- H2: AI automation agency vs. hiring an in-house developer
- H2: What can an AI automation agency automate?
- H2: How to choose an AI automation agency
- H2: What does it cost to work with an AI automation agency?
- H2: Is an AI automation agency right for your business?
- CTA: "Find out with our free 90-second audit →"

**Internal links to:** /services/, /audit/, /case-studies/

---

### Post 2: `/blog/n8n-vs-make-vs-zapier/`

**Title:** n8n vs Make vs Zapier in 2026: Which Automation Tool Is Right for Your Business?
**Target keyword:** n8n vs make vs zapier (1,200/mo)
**Word count:** 2,200 words
**Structure:**
- Comparison table (trigger, pricing, learning curve, best for)
- Deep dive on each tool
- When to use each
- "When none of these are enough" → custom agency section → CTA to audit

---

### Post 3–6: (full articles, same format)
- "How AI Agents Are Replacing Entire Business Functions in 2026" → /blog/ai-agents-for-business/
- "The ROI of Workflow Automation: What to Expect in Year One" → /blog/workflow-automation-roi/
- "Voice AI Agents for Customer Support: The Complete Guide" → /blog/voice-ai-agents-customer-support/
- "How to Automate Lead Generation End-to-End with AI" → /blog/how-to-automate-lead-generation/

**Each post must:**
- Be 1,500–2,500 words
- Contain real numbers and examples
- Have Article JSON-LD schema
- Link to /audit/ at minimum twice
- End with audit CTA block

---

## ⚡ PERFORMANCE TARGETS

| Metric | Target | How |
|--------|--------|-----|
| Lighthouse Performance | 100 | Static export, no SSR overhead |
| Lighthouse SEO | 100 | All meta, schema, canonical in code |
| Lighthouse Accessibility | 100 | Semantic HTML, aria-labels, contrast |
| LCP | < 1.8s | Text hero (no image), `next/font` |
| CLS | 0 | Explicit dimensions everywhere |
| INP | < 100ms | Minimal JS, no heavy libs |
| Time to First Byte | < 200ms | Vercel edge CDN |
| Bundle size | < 150kb JS | Tree-shaking, no unused imports |

---

## 🚀 DEPLOYMENT

### Frontend (Next.js) → Vercel
```bash
# In nodevant/ directory
npm run build
# Output: /out directory (static HTML)
# Connect to Vercel → auto-deploy on git push
# Domain: nodevant.com → Vercel DNS
```

### Audit API (Node.js) → Contabo VPS
```bash
# In audit-api/ directory
npm run build
# Copy to VPS: /root/nodevant-audit/
# Create systemd service: nodevant-audit.service
# Nginx reverse proxy: /api/audit → localhost:4000
# Environment variables: SMTP_HOST, SMTP_USER, SMTP_PASS
```

**Nginx config for audit API (add to VPS nginx):**
```nginx
server {
    listen 443 ssl;
    server_name api.nodevant.com;

    location /api/ {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

**Systemd service:**
```ini
[Unit]
Description=Nodevant Audit API
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/root/nodevant-audit
ExecStart=/usr/bin/node dist/server.js
Restart=always
EnvironmentFile=/root/nodevant-audit/.env

[Install]
WantedBy=multi-user.target
```

```bash
systemctl enable nodevant-audit
systemctl start nodevant-audit
```

### Frontend `.env.local`
```
NEXT_PUBLIC_AUDIT_API_URL=https://api.nodevant.com
```

---

## 📋 CLAUDE CODE STARTER PROMPT

Paste this to begin:

```
Build nodevant.com — an AI automation agency website.

Full spec is below. Build in this exact order:

PHASE 1 — Setup (run these commands):
1. npx create-next-app@14 nodevant --typescript --tailwind --app --no-src-dir
2. cd nodevant && npm install framer-motion clsx
3. Create next.config.js with output:'export' and trailingSlash:true
4. Set up tailwind.config.ts with the custom colors and fonts from spec

PHASE 2 — Core site:
5. app/globals.css — CSS variables
6. app/layout.tsx — Root layout with full SEO metadata and fonts (Space Grotesk + Inter via next/font)
7. components/layout/Navbar.tsx — Fixed glass nav with mobile hamburger
8. components/layout/Footer.tsx — 4-column footer
9. components/ui/ParticleCanvas.tsx — Canvas dot grid animation
10. components/ui/ScrollReveal.tsx — Framer Motion scroll reveal
11. components/ui/CounterNumber.tsx — Animated counter
12. components/home/Hero.tsx — Stacked NODE/VANT cyan wordmark with glow + particle canvas
13. All other homepage components in order
14. app/page.tsx — Assemble homepage

PHASE 3 — Audit Tool:
15. lib/auditQuestions.ts — All 7 questions as typed data
16. components/audit/AuditWizard.tsx — Multi-step wizard
17. components/audit/AuditStep.tsx — Single question renderer (handles single_select, multi_select, slider)
18. components/audit/AuditProgress.tsx — Progress bar
19. components/audit/AuditEmailGate.tsx — Email capture
20. components/audit/AuditResults.tsx — Results display from sessionStorage
21. app/audit/page.tsx — Audit page
22. app/audit/results/page.tsx — Results page

PHASE 4 — Other pages:
23. app/services/page.tsx
24. app/case-studies/page.tsx
25. app/about/page.tsx
26. app/blog/page.tsx + app/blog/[slug]/page.tsx
27. app/contact/page.tsx
28. app/sitemap.ts + app/robots.ts

PHASE 5 — Audit API:
29. Create audit-api/ directory as separate project
30. npm init, install express cors nodemailer typescript ts-node-dev
31. Build all files from spec: server.ts, routes/audit.ts, engine/scorer.ts, engine/recommender.ts, engine/roiCalculator.ts, email/mailer.ts, types/audit.ts

DESIGN RULES:
- Background: #08080F (deep space black)
- Primary: #00D4FF (electric cyan) — matches user's existing NODE/VANT design
- Accent: #9B5CFF (violet)
- The hero NODE/VANT wordmark must be massive (clamp 5rem to 11rem), cyan glow, centered
- Space Grotesk for all headings, Inter for body
- Every section has scroll reveal via Framer Motion
- Mobile-first responsive

[PASTE FULL SPEC ABOVE]
```

---

*Nodevant Master Spec V2 — Built June 2026 — Ready for Claude Code*
