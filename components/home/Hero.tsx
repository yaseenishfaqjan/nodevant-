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
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20">
      {/* Background layers */}
      <div className="absolute inset-0 radial-glow" aria-hidden="true" />
      <ParticleCanvas />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Status pill — replaces COMING SOON */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-center"
        >
          <span className="pill">
            <span className="h-2 w-2 animate-pulse-dot rounded-full bg-cyan shadow-glow-cyan" />
            AI Automation Agency
          </span>
        </motion.div>

        {/* NODE VANT wordmark — visual element (not the H1, for SEO) */}
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
          We replace your team&apos;s most time-consuming manual work with
          intelligent AI systems — so leads get followed up instantly, data
          syncs automatically, and support runs 24/7 without adding headcount.
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
          <Link href="/case-studies/" className="btn-ghost w-full sm:w-auto">
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
