"use client";

// Per-brand calling playbook. Mirrors the script that lives inside each
// product's own super-admin, so the caller reads the same words either way.
// Positioning is fixed: we are an AI automation agency, never "a software
// company" — that phrasing triggers an instant "we already have software".

import { useState } from "react";

interface Block {
  title: string;
  body: string;
}

const industryOf: Record<string, { vertical: string; who: string; peak: string; ask: string }> = {
  fairway360: {
    vertical: "golf clubs",
    who: "pro shop",
    peak: "a Saturday morning when the pro shop is slammed",
    ask: "tee time",
  },
  lawnpilot360: {
    vertical: "lawn care and landscaping companies",
    who: "office",
    peak: "a Monday morning when every crew is out",
    ask: "estimate",
  },
  globalshield360: {
    vertical: "security companies",
    who: "dispatch desk",
    peak: "an after-hours callout",
    ask: "site visit",
  },
};

function scriptsFor(brandId: string, brandName: string): { section: string; items: Block[] }[] {
  const v = industryOf[brandId] ?? industryOf.fairway360;
  return [
    {
      section: "How we introduce ourselves",
      items: [
        {
          title: "READ THIS FIRST — we are an AI automation agency",
          body: `We are an AI AUTOMATION AGENCY. We are NOT a software company.

WHY: "we're a software company" gets an instant "we already have software" and the call is over. Every business already bought software. Nobody has already bought AI automation.

NEVER SAY about ourselves: software · platform · system · product · app · another login.
ALWAYS SAY: AI automation agency · we automate · we handle the work · it answers the phone.

WE ALWAYS OFFER TWO DOORS:

  DOOR 1 — "We already built one for your industry."
  ${brandName} is our ready-made automation for ${v.vertical}. If they want
  something that works on day one, we show it in the demo.

  DOOR 2 — "Or we automate whatever YOU already do."
  Their own process, their own tools — we build the automation around THAT.

Door 2 is what saves the call when they say "that's not how we do it."
The outcome we sell either way: save time, cut cost, scale without hiring.

THE REFRAME:
"Your software is good at HOLDING information. It doesn't answer the phone when the ${v.who} is slammed, and it doesn't follow up at 9pm. That's the part we automate — on top of whatever you already run."

We sit ON TOP of their existing systems. We never ask them to rip anything out.`,
        },
      ],
    },
    {
      section: "Openers",
      items: [
        {
          title: "Decision-maker opening (USE THIS)",
          body: `Hi [NAME], this is [CALLER] with ${brandName}. I'll keep this brief.

We're an AI automation agency that works specifically with ${v.vertical}. We automate the things that eat your staff's day — inbound calls, ${v.ask} requests, new customer inquiries and follow-up.

I'm not calling to sell you another system to log into. Quick question — when the ${v.who} gets busy, who's picking up the phone?

— Then STOP TALKING. Let them answer.`,
        },
        {
          title: "Opening — Nodevant (parent brand)",
          body: `Hi [NAME], this is [CALLER] with Nodevant — we're an AI automation agency here in Georgia.

We build AI phone assistants for ${v.vertical}. It answers the calls your team can't get to, books the ${v.ask} straight into your calendar, and texts the customer back so nobody falls through.

Quick question — on ${v.peak}, who's picking up the phone?

— ${brandName} is then introduced at demo time as the version we already built for ${v.vertical}.`,
        },
        {
          title: "Gatekeeper",
          body: `Hi, this is [CALLER] with ${brandName}. I'm trying to reach whoever is responsible for operations and technology. Would that be the owner or the general manager?

If asked "What's this regarding?":
We're an AI automation agency that works with ${v.vertical}. We automate inbound calls, ${v.ask} requests and follow-up so staff aren't buried in repetitive work.

Then get: name · position · direct number · email · best time. Thank them — gatekeepers open doors.`,
        },
        {
          title: "Transition to demo",
          body: `That's exactly why I called. Rather than explaining it over the phone, it makes more sense to show you — and I'll build the demo with your name and logo on it, not a generic tour.

Would [TIME A] or [TIME B] work better?

— Always two options. Never "would you maybe want to schedule something sometime?"`,
        },
      ],
    },
    {
      section: "Discovery",
      items: [
        {
          title: "The five that qualify",
          body: `1. How many calls a day come into the ${v.who}?
2. Who answers them — and what happens after 5pm and on weekends?
3. How does someone request a ${v.ask} right now?
4. How many customers / members do you have?
5. When a call gets missed, does anybody call them back?

Q4 sets the pricing tier. Q2 and Q5 are the pain — capture them in their own words.`,
        },
      ],
    },
    {
      section: "Objections",
      items: [
        {
          title: `"We already have software" — THE BIG ONE`,
          body: `Good — you should, and I'm not asking you to replace it.

We're not a software company. We're an AI automation agency. Your software is good at HOLDING information. It doesn't answer the phone when the ${v.who} is slammed, and it doesn't follow up at 9pm. That's the part we automate — and we sit on top of whatever you already run.

What are you using today?
… And when the desk is busy or it's after hours, what happens to those calls?

— Log the platform. Their answer to the second question is the pain you demo against.`,
        },
        {
          title: `"That's not how we do things"`,
          body: `That's fine — and honestly that's the more common answer.

We work two ways. We've already built a system for ${v.vertical}, but if you've got your own process that works, we don't touch it — we build the automation around what YOU already do. Your workflow, your tools.

So tell me how it actually runs today, and I'll tell you straight whether we can automate it.

— DOOR 2. This is the save. Never let "that's not how we do it" end the call.`,
        },
        {
          title: `"We already use AI / we have a chatbot"`,
          body: `Most companies have something — usually a website chatbot or an auto-responder.

Ours is different: it answers the phone in a real voice, books the ${v.ask}, and hands off to a human the second it's out of its depth. It works the phone line, not just the website.

What does yours handle today?`,
        },
        {
          title: `"Not interested"`,
          body: `Fair enough — most people aren't, before they know what it is.

One question and I'll let you go: how many calls a week do you think end up in voicemail?

— Nine times out of ten they don't know. That uncertainty is the door back in.`,
        },
        {
          title: `"Send me information"`,
          body: `Absolutely. What's the best email address?

So I send the right thing — is it the call-answering side or the follow-up side that's more of a headache?

Rather than letting it disappear in your inbox, when would be reasonable for me to follow up?

— "Send info" with no follow-up date is NOT a qualified opportunity.`,
        },
        {
          title: `"How much does it cost?"`,
          body: `It depends on your size and how much you actually use it, so rather than quoting you for things you may never need, the demo lets us size it properly.

Use only approved anchors from the pricing playbook. Never invent pricing. Anything custom goes to the closer.`,
        },
        {
          title: `"Call me later"`,
          body: `Absolutely. What day and time would be best?

— Never end with just "okay". Log the callback before moving to the next lead.`,
        },
      ],
    },
    {
      section: "Voicemail & close",
      items: [
        {
          title: "Voicemail (leave one every time)",
          body: `Hi [NAME], this is [CALLER] with ${brandName}. We're an AI automation agency that works with ${v.vertical} — we automate inbound calls, ${v.ask} requests and follow-up.

I had one question about how you handle calls on the weekend. You can reach me at [NUMBER]. Thanks.

— Short. One question. No pitch.`,
        },
        {
          title: "The close",
          body: `Here's what I'd suggest. Give me fifteen minutes and I'll show you a live demo with your name and logo on it — not a generic thing. If it's not a fit, tell me and I'll leave you alone.

Tuesday at 10, or Thursday at 2?

— Two options. Never "does that sound good?"`,
        },
      ],
    },
  ];
}

export default function BrandScripts({ brandId, brandName }: { brandId: string; brandName: string }) {
  const [copied, setCopied] = useState("");
  const sections = scriptsFor(brandId, brandName);

  const copy = async (b: Block) => {
    await navigator.clipboard.writeText(b.body);
    setCopied(b.title);
    setTimeout(() => setCopied(""), 1500);
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">{brandName} — call scripts</h1>
      <p className="mt-1 text-sm text-faint">
        We are an AI automation agency, never a software company. Tap any block to copy it.
      </p>

      <div className="mt-6 space-y-6">
        {sections.map((sec) => (
          <div key={sec.section}>
            <div className="mb-2 text-[10px] font-semibold uppercase tracking-[1.5px] text-accent">{sec.section}</div>
            <div className="grid gap-3 md:grid-cols-2">
              {sec.items.map((b) => (
                <div key={b.title} className="rounded-xl border border-line bg-bg-soft p-4">
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold text-ink">{b.title}</h3>
                    <button onClick={() => void copy(b)} className="btn-secondary shrink-0 px-2 py-1 text-[11px]">
                      {copied === b.title ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed text-muted">{b.body}</pre>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
