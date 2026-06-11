"use client";

import { BentoTile } from "@/components/ui/BentoTile";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { Course } from "@/types";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface CourseCardProps {
  course: Course;
  index: number;
}

const colorCycle: Array<"violet" | "cyan" | "emerald" | "amber" | "rose"> = [
  "violet", "cyan", "emerald", "amber",
];
const progressColors = ["violet", "cyan", "emerald", "amber", "rose"];
const gradients = [
  "from-violet-600/10 to-violet-400/5",
  "from-cyan-600/10 to-cyan-400/5",
  "from-emerald-600/10 to-emerald-400/5",
  "from-amber-600/10 to-amber-400/5",
];
const iconColors = [
  "text-violet-400 bg-violet-400/10",
  "text-cyan-400 bg-cyan-400/10",
  "text-emerald-400 bg-emerald-400/10",
  "text-amber-400 bg-amber-400/10",
];

export function CourseCard({ course, index }: CourseCardProps) {
  const colorIndex = index % colorCycle.length;
  const glow = colorCycle[colorIndex];
  const gradient = gradients[colorIndex];
  const iconColor = iconColors[colorIndex];
  const progressColor = progressColors[colorIndex];

  return (
    <BentoTile index={index + 3} glowColor={glow} className="p-5 group">
      {/* Abstract gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-white/[0.02] to-transparent rounded-full" />

      <div className="relative z-10 flex flex-col h-full gap-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${iconColor} shrink-0`}>
            <DynamicIcon name={course.icon_name} size={18} />
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 15 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-text-muted hover:text-text-primary"
          >
            <ArrowUpRight size={16} />
          </motion.button>
        </div>

        {/* Title */}
        <div>
          <h3 className="text-text-primary font-semibold text-sm leading-snug line-clamp-2">
            {course.title}
          </h3>
        </div>

        {/* Progress */}
        <div className="mt-auto">
          <ProgressBar
            value={course.progress}
            color={progressColor}
            delay={index * 0.08}
            showLabel
          />
        </div>
      </div>
    </BentoTile>
  );
}
