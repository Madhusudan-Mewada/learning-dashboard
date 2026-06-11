"use client";

import { motion } from "framer-motion";
import { BarChart2, TrendingUp, Clock, Calendar, CheckCircle } from "lucide-react";
import { BentoTile } from "@/components/ui/BentoTile";

export default function AnalyticsPage() {
  const stats = [
    { label: "Study Time", value: "127 hrs", desc: "Total time spent studying", icon: Clock, color: "violet" },
    { label: "Weekly Avg", value: "9.4 hrs", desc: "+1.2 hrs since last week", icon: Calendar, color: "cyan" },
    { label: "Avg Score", value: "92%", desc: "Based on final assignments", icon: TrendingUp, color: "emerald" },
    { label: "Courses Done", value: "8", desc: "Successfully completed", icon: CheckCircle, color: "amber" }
  ];

  return (
    <section className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-text-muted text-xs font-medium uppercase tracking-widest mb-1">DATA INSIGHTS</h2>
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary flex items-center gap-2">
          Performance Analytics <BarChart2 className="text-violet-400" size={24} />
        </h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <BentoTile key={stat.label} index={idx} glowColor={stat.color as any} className="p-5 flex flex-col justify-between h-[150px]">
              <div className="flex justify-between items-start">
                <span className="text-xs text-text-secondary font-medium">{stat.label}</span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-${stat.color}-500/10 text-${stat.color}-400`}>
                  <Icon size={16} />
                </div>
              </div>
              <div className="space-y-0.5">
                <p className="text-2xl font-bold text-text-primary font-mono">{stat.value}</p>
                <p className="text-[10px] text-text-muted">{stat.desc}</p>
              </div>
            </BentoTile>
          );
        })}
      </div>

      {/* Progress Chart Placeholder */}
      <BentoTile glowColor="violet" className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-text-primary font-semibold text-sm">Monthly Progress (Hours)</h2>
            <span className="text-xs text-text-muted">Jan - Jun 2026</span>
          </div>
          {/* Mock Bar Chart */}
          <div className="flex items-end justify-between h-[180px] pt-4 gap-2">
            {[32, 45, 28, 55, 62, 48].map((val, idx) => {
              const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(val / 70) * 100}%` }}
                    transition={{ delay: idx * 0.1, duration: 0.8, type: "spring", stiffness: 120 }}
                    className="w-full max-w-[40px] rounded-t-lg bg-gradient-to-t from-violet-600/30 to-violet-400/80 hover:to-cyan-400/80 transition-all duration-300 relative group cursor-pointer"
                  >
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-bg-surface text-text-primary text-[10px] px-1.5 py-0.5 rounded border border-border-subtle opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none font-mono">
                      {val}h
                    </span>
                  </motion.div>
                  <span className="text-[10px] text-text-muted font-mono">{months[idx]}</span>
                </div>
              );
            })}
          </div>
        </div>
      </BentoTile>
    </section>
  );
}
