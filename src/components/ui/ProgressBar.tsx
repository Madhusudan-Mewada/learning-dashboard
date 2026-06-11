"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ProgressBarProps {
  value: number;
  color?: string;
  height?: string;
  showLabel?: boolean;
  delay?: number;
}

const colorMap: Record<string, { bar: string; glow: string }> = {
  violet: {
    bar: "from-violet-500 to-violet-400",
    glow: "shadow-[0_0_8px_#7C5CFC80]",
  },
  cyan: {
    bar: "from-cyan-500 to-cyan-400",
    glow: "shadow-[0_0_8px_#22D3EE80]",
  },
  emerald: {
    bar: "from-emerald-500 to-emerald-400",
    glow: "shadow-[0_0_8px_#10B98180]",
  },
  amber: {
    bar: "from-amber-500 to-amber-400",
    glow: "shadow-[0_0_8px_#F59E0B80]",
  },
  rose: {
    bar: "from-rose-500 to-rose-400",
    glow: "shadow-[0_0_8px_#F43F5E80]",
  },
};

const colorCycle = ["violet", "cyan", "emerald", "amber", "rose"];

export function ProgressBar({
  value,
  color,
  height = "h-1.5",
  showLabel = true,
  delay = 0,
}: ProgressBarProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const resolvedColor = color ?? colorCycle[Math.floor(Math.random() * colorCycle.length)];
  const { bar, glow } = colorMap[resolvedColor] ?? colorMap.violet;

  return (
    <div ref={ref} className="space-y-1.5">
      {showLabel && (
        <div className="flex justify-between text-xs">
          <span className="text-text-muted">Progress</span>
          <span className="text-text-secondary font-mono">{value}%</span>
        </div>
      )}
      <div className={`w-full ${height} rounded-full bg-bg-elevated overflow-hidden`}>
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${bar} ${glow}`}
          initial={{ width: 0 }}
          animate={inView ? { width: `${value}%` } : { width: 0 }}
          transition={{
            duration: 1.2,
            delay: delay + 0.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
      </div>
    </div>
  );
}
