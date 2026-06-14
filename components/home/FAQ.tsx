"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { FAQS } from "@/lib/content";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section-pad">
      <div className="container-x">
        <SectionHeading
          eyebrow="Questions"
          title="Frequently asked questions"
          subtitle="Everything you need to know before you start. Still curious? Book a call."
        />

        <div className="mx-auto mt-14 max-w-3xl space-y-4">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div
                  className={`rounded-2xl border transition-colors ${
                    isOpen
                      ? "border-cyan/40 bg-white/[0.03]"
                      : "border-line bg-white/[0.02]"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-lg font-semibold text-ink">
                      {faq.q}
                    </span>
                    <span
                      className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border text-lg transition-all ${
                        isOpen
                          ? "rotate-45 border-cyan text-cyan"
                          : "border-line text-faint"
                      }`}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-[15px] leading-relaxed text-muted">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
