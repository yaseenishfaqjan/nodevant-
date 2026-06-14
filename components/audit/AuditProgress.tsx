"use client";
import { motion } from "framer-motion";

interface AuditProgressProps {
  current: number; // 1-based
  total: number;
}

export default function AuditProgress({ current, total }: AuditProgressProps) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="mx-auto mb-12 w-full max-w-2xl">
      <div className="mb-3 flex items-center justify-between text-sm">
        <span className="font-display font-semibold text-cyan">
          Step {current} of {total}
        </span>
        <span className="text-faint">{pct}% complete</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          className="h-full rounded-full bg-brand-gradient"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}
