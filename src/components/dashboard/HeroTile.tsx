"use client";

import { motion } from "framer-motion";
import { Zap, Clock, CheckCircle, Target } from "lucide-react";
import { BentoTile } from "@/components/ui/BentoTile";
import { UserStats } from "@/types";

interface HeroTileProps {
  stats: UserStats;
  index?: number;
}

export function HeroTile({ stats, index = 0 }: HeroTileProps) {
  const statItems = [
    { icon: Zap, label: "Day Streak", value: stats.streak, color: "text-amber-400", bg: "bg-amber-400/10" },
    { icon: Clock, label: "Hours Learned", value: stats.totalHours, color: "text-cyan-400", bg: "bg-cyan-400/10" },
    { icon: CheckCircle, label: "Completed", value: stats.coursesCompleted, color: "text-emerald-400", bg: "bg-emerald-400/10" },
  ];

  return (
    <BentoTile index={index} glowColor="violet" className="col-span-1 md:col-span-2 p-6 md:p-8">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 bg-gradient-radial from-violet-600/8 via-transparent to-transparent" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-cyan-500/5 via-transparent to-transparent" />

      <div className="relative z-10">
        {/* Greeting */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 + 0.2, duration: 0.4 }}
              className="text-text-muted text-sm mb-1 font-medium tracking-wide uppercase"
            >
              Good morning
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 + 0.3, duration: 0.4 }}
              className="text-2xl md:text-3xl font-bold text-text-primary"
            >
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Alex</span> 👋
            </motion.h1>
          </div>

          {/* Streak indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.08 + 0.4, type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/25"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap size={16} className="text-amber-400 fill-amber-400" />
            </motion.div>
            <div className="text-right">
              <p className="text-amber-300 font-bold text-lg leading-none">{stats.streak}</p>
              <p className="text-amber-500 text-[10px] uppercase tracking-wide">day streak</p>
            </div>
          </motion.div>
        </div>

        {/* Weekly goal progress */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08 + 0.4, duration: 0.4 }}
          className="mb-6 p-4 rounded-xl bg-bg-elevated border border-border-subtle"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Target size={14} className="text-violet-400" />
              <span className="text-text-secondary text-sm">Weekly goal</span>
            </div>
            <span className="text-text-primary text-sm font-mono font-medium">
              {stats.weeklyProgress}/{stats.weeklyGoal} hrs
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-bg-base overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-violet-400"
              style={{ boxShadow: "0 0 8px #7C5CFC80" }}
              initial={{ width: 0 }}
              animate={{ width: `${(stats.weeklyProgress / stats.weeklyGoal) * 100}%` }}
              transition={{ duration: 1.4, delay: index * 0.08 + 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </div>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          {statItems.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 + 0.5 + i * 0.06, duration: 0.4 }}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl ${stat.bg} border border-border-subtle/50`}
              >
                <Icon size={16} className={stat.color} />
                <span className={`text-xl font-bold font-mono ${stat.color}`}>{stat.value}</span>
                <span className="text-text-muted text-[10px] text-center leading-tight">{stat.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </BentoTile>
  );
}
