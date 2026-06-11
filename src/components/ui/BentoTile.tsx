"use client";

import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { ReactNode } from "react";

interface BentoTileProps {
  children: ReactNode;
  className?: string;
  glowColor?: "violet" | "cyan" | "emerald" | "amber" | "rose";
  index?: number;
}

const glowStyles: Record<string, string> = {
  violet: "hover:shadow-[0_0_30px_#7C5CFC25,0_0_0_1px_#7C5CFC35] hover:border-violet-500/30",
  cyan: "hover:shadow-[0_0_30px_#22D3EE25,0_0_0_1px_#22D3EE35] hover:border-cyan-500/30",
  emerald: "hover:shadow-[0_0_30px_#10B98125,0_0_0_1px_#10B98135] hover:border-emerald-500/30",
  amber: "hover:shadow-[0_0_30px_#F59E0B25,0_0_0_1px_#F59E0B35] hover:border-amber-500/30",
  rose: "hover:shadow-[0_0_30px_#F43F5E25,0_0_0_1px_#F43F5E35] hover:border-rose-500/30",
};

const spotlightColors: Record<string, string> = {
  violet: "rgba(124, 92, 252, 0.12)",
  cyan: "rgba(34, 211, 238, 0.12)",
  emerald: "rgba(16, 185, 129, 0.12)",
  amber: "rgba(245, 158, 11, 0.12)",
  rose: "rgba(244, 63, 94, 0.12)",
};

export function BentoTile({
  children,
  className = "",
  glowColor = "violet",
  index = 0,
}: BentoTileProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const background = useMotionTemplate`radial-gradient(250px circle at ${mouseX}px ${mouseY}px, ${spotlightColors[glowColor]}, transparent 80%)`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.08,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        scale: 1.015,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      onMouseMove={handleMouseMove}
      className={`
        relative rounded-2xl border border-border-subtle bg-bg-card
        overflow-hidden cursor-default group
        transition-all duration-300
        ${glowStyles[glowColor]}
        ${className}
      `}
    >
      {/* Cursor tracking spotlight glow overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{ background }}
      />

      {/* Subtle noise texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Relative content wrapper to sit above background effects */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.article>
  );
}
