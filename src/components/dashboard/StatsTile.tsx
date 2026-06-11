"use client";

import { motion } from "framer-motion";
import { BentoTile } from "@/components/ui/BentoTile";
import { TrendingUp, Users, Star, Award } from "lucide-react";

interface StatsTileProps {
  index?: number;
}

const stats = [
  { icon: TrendingUp, label: "Rank", value: "#42", sub: "Top 5%", color: "text-violet-400", bg: "bg-violet-400/10" },
  { icon: Users, label: "Peers", value: "1.2k", sub: "Learning with you", color: "text-cyan-400", bg: "bg-cyan-400/10" },
  { icon: Star, label: "XP Points", value: "8,420", sub: "+320 this week", color: "text-amber-400", bg: "bg-amber-400/10" },
  { icon: Award, label: "Badges", value: "12", sub: "3 new unlocked", color: "text-emerald-400", bg: "bg-emerald-400/10" },
];

export function StatsTile({ index = 2 }: StatsTileProps) {
  return (
    <BentoTile index={index} glowColor="emerald" className="p-5">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-transparent" />
      <div className="relative z-10 h-full flex flex-col gap-4">
        <h2 className="text-text-primary font-semibold text-sm">Your Stats</h2>
        <div className="grid grid-cols-2 gap-2 flex-1">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.08 + i * 0.07, duration: 0.4 }}
                className={`flex flex-col gap-1.5 p-3 rounded-xl ${s.bg} border border-border-subtle/50`}
              >
                <Icon size={14} className={s.color} />
                <p className={`text-lg font-bold font-mono leading-none ${s.color}`}>{s.value}</p>
                <p className="text-text-muted text-[10px] leading-tight">{s.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </BentoTile>
  );
}
