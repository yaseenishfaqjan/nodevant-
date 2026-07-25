"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import ParticleCanvas from "@/components/ui/ParticleCanvas";

const FEATURES = [
  { icon: "⚡", label: "Leads followed up in seconds" },
  { icon: "🔗", label: "Tools synced automatically" },
  { icon: "📞", label: "Support handled 24/7" },
];

export default function Hero() {
  return (
    <section className="grid-overlay relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20">
      {/* Background layers */}
      <div className="absolute inset-0 radial-glow" aria-hidden="true" />
      {/* Glow orbs (V2) */}
      <div
        className="pointer-events-none absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-cyan opacity-[0.08] blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/4 right-1/4 h-[320px] w-[320px] rounded-full bg-violet opacity-[0.07] blur-[110px]"
        aria-hidden="true"
      />
      <ParticleCanvas />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-center"
        >
          <span className="badge badge-accent">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-cyan" />
            AI Automation Agency · McDonough, GA
          </span>
        </motion.div>

        {/* NODE VANT wordmark — the hero's visual focal point (decorative;
            the keyword H1 below is the semantic heading for SEO) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
          className="wordmark font-display font-bold leading-none tracking-tight"
          style={{ fontSize: "clamp(3.5rem, 15vw, 11rem)" }}
        >
          NODE&nbsp;VANT
        </motion.div>

        {/* Real, keyword-rich H1 (one per page) */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto mt-6 max-w-3xl text-sm font-semibold uppercase tracking-[0.2em] text-cyan md:text-base"
        >
          AI Automation Agency — Custom AI Agents &amp; Workflow Automation
        </motion.h1>

        {/* Value-prop subtitle (pain-first) */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted md:text-xl"
        >
          Your team wastes hours on work AI can do in seconds. We build the
          systems that fix that — fully deployed, fully automated, in weeks not
          months.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link href="/audit/" className="btn-primary w-full sm:w-auto">
            Get My Free Audit →
          </Link>
          <Link href="/case-studies/" className="btn-secondary w-full sm:w-auto">
            See Our Work
          </Link>
        </motion.div>

        {/* Feature row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-faint"
        >
          {FEATURES.map((f) => (
            <span key={f.label} className="flex items-center gap-2">
              <span aria-hidden="true">{f.icon}</span>
              {f.label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
