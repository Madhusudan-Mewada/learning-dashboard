"use client";

import { motion } from "framer-motion";
import { BentoTile } from "@/components/ui/BentoTile";
import { ActivityDay } from "@/types";
import { Activity } from "lucide-react";

interface ActivityTileProps {
  data: ActivityDay[];
  index?: number;
}

function getColor(count: number): string {
  if (count === 0) return "bg-bg-elevated";
  if (count === 1) return "bg-violet-900/60";
  if (count === 2) return "bg-violet-700/70";
  if (count === 3) return "bg-violet-500/80";
  return "bg-violet-400";
}

export function ActivityTile({ data, index = 7 }: ActivityTileProps) {
  // Show last 15 weeks = 105 days
  const recentData = data.slice(-105);
  const weeks: ActivityDay[][] = [];
  for (let i = 0; i < recentData.length; i += 7) {
    weeks.push(recentData.slice(i, i + 7));
  }

  const totalActive = data.filter((d) => d.count > 0).length;
  const thisWeek = data.slice(-7).reduce((acc, d) => acc + d.count, 0);

  return (
    <BentoTile index={index} glowColor="cyan" className="col-span-1 md:col-span-2 lg:col-span-2 p-5">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/5 to-transparent" />

      <div className="relative z-10 h-full flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-cyan-400" />
            <h2 className="text-text-primary font-semibold text-sm">Learning Activity</h2>
          </div>
          <div className="flex items-center gap-3 text-xs text-text-muted">
            <span>{totalActive} active days</span>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex gap-3">
          <div className="px-3 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-center">
            <p className="text-cyan-300 font-bold font-mono text-lg leading-none">{thisWeek}</p>
            <p className="text-cyan-500 text-[10px] mt-0.5">this week</p>
          </div>
          <div className="px-3 py-2 rounded-lg bg-bg-elevated border border-border-subtle text-center">
            <p className="text-text-primary font-bold font-mono text-lg leading-none">{totalActive}</p>
            <p className="text-text-muted text-[10px] mt-0.5">total days</p>
          </div>
        </div>

        {/* Contribution grid with overflow wrapper */}
        <div className="overflow-x-auto pb-2 -mx-2 px-2 scrollbar-thin">
          <div className="flex gap-1 min-w-max">
            {weeks.map((week, wi) => (
              <motion.div
                key={wi}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.08 + wi * 0.015,
                  duration: 0.3,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className="flex flex-col gap-1"
              >
                {week.map((day) => (
                  <div
                    key={day.date}
                    title={`${day.date}: ${day.count} session${day.count !== 1 ? "s" : ""}`}
                    className={`w-3 h-3 rounded-sm ${getColor(day.count)} cursor-pointer hover:ring-1 hover:ring-cyan-400/50 transition-all duration-150`}
                  />
                ))}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1.5 mt-auto">
          <span className="text-text-muted text-[10px]">Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div key={level} className={`w-3 h-3 rounded-sm ${getColor(level)}`} />
          ))}
          <span className="text-text-muted text-[10px]">More</span>
        </div>
      </div>
    </BentoTile>
  );
}
