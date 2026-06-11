"use client";

import { motion } from "framer-motion";
import { Trophy, Star, ShieldAlert, Award, Zap, Heart, Compass } from "lucide-react";
import { BentoTile } from "@/components/ui/BentoTile";

const BADGES = [
  { id: "a1", name: "Speed Demon", desc: "Finished 3 courses in under a week.", unlocked: true, date: "Jun 04", color: "amber", icon: Zap },
  { id: "a2", name: "Code Crusader", desc: "Completed 5 TypeScript modules successfully.", unlocked: true, date: "May 28", color: "violet", icon: Award },
  { id: "a3", name: "Consistency King", desc: "Kept up a 14-day study streak.", unlocked: true, date: "May 15", color: "cyan", icon: Trophy },
  { id: "a4", name: "Deep Explorer", desc: "Visited and completed 10 separate topics.", unlocked: false, date: "Locked", color: "rose", icon: Compass }
];

export default function AchievementsPage() {
  return (
    <section className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-text-muted text-xs font-medium uppercase tracking-widest mb-1">PROUD MILESTONES</h2>
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary flex items-center gap-2">
          Achievements & Badges <Trophy className="text-amber-400 fill-amber-400/20" size={24} />
        </h1>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {BADGES.map((badge, idx) => {
          const Icon = badge.icon;
          return (
            <BentoTile
              key={badge.id}
              index={idx}
              glowColor={badge.color as any}
              className={`p-6 flex flex-col justify-between items-center text-center h-[240px] ${!badge.unlocked ? "opacity-60" : ""}`}
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center border transition-shadow duration-300 ${
                badge.unlocked 
                  ? `bg-${badge.color}-500/10 border-${badge.color}-500/30 text-${badge.color}-400 shadow-[0_0_20px_rgba(124,92,252,0.1)]` 
                  : "bg-bg-elevated border-border-subtle text-text-muted"
              }`}>
                <Icon size={26} className={badge.unlocked ? "" : "opacity-40"} />
              </div>

              <div className="space-y-1 mt-4">
                <h3 className="font-bold text-text-primary text-sm">{badge.name}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{badge.desc}</p>
              </div>

              <div className="mt-4 text-[10px] uppercase font-mono tracking-widest text-text-muted">
                {badge.unlocked ? `Unlocked ${badge.date}` : "Locked"}
              </div>
            </BentoTile>
          );
        })}
      </div>
    </section>
  );
}
