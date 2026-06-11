"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Compass, Sparkles, Flame, Plus, Check, Search } from "lucide-react";
import { BentoTile } from "@/components/ui/BentoTile";

const RECOMMENDATIONS = [
  { id: "e1", title: "Web3 & Solidity Architecture", level: "Advanced", dur: "14h", rating: "4.9", category: "Blockchain", glow: "cyan", tag: "Hot" },
  { id: "e2", title: "PyTorch for Deep Learning", level: "Intermediate", dur: "28h", rating: "4.8", category: "AI & ML", glow: "violet", tag: "New" },
  { id: "e3", title: "UI/UX & Interactive Framer", level: "Beginner", dur: "8h", rating: "4.9", category: "Design", glow: "rose", tag: "Popular" },
  { id: "e4", title: "Docker & Kubernetes Orchestration", level: "Intermediate", dur: "18h", rating: "4.7", category: "DevOps", glow: "amber", tag: "Hot" }
];

export default function ExplorePage() {
  const [enrolled, setEnrolled] = useState<string[]>([]);
  const [filter, setFilter] = useState("All");

  const toggleEnroll = (id: string) => {
    setEnrolled(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const categories = ["All", "AI & ML", "Blockchain", "Design", "DevOps"];
  const filtered = filter === "All" ? RECOMMENDATIONS : RECOMMENDATIONS.filter(r => r.category === filter);

  return (
    <section className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-text-muted text-xs font-medium uppercase tracking-widest mb-1">DISCOVER OPPORTUNITIES</h2>
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary flex items-center gap-2">
            Explore Catalog <Sparkles className="text-amber-400" size={24} />
          </h1>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium border whitespace-nowrap transition-colors duration-200 ${
              filter === cat
                ? "bg-violet-500/15 border-violet-500/30 text-violet-400"
                : "border-border-subtle hover:border-text-muted text-text-secondary hover:text-text-primary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item, idx) => (
          <BentoTile
            key={item.id}
            index={idx}
            glowColor={item.glow as any}
            className="p-6 flex flex-col justify-between h-[220px]"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-text-muted px-2 py-0.5 rounded border border-border-subtle bg-bg-surface">
                  {item.category}
                </span>
                <span className="text-[10px] ml-2 text-amber-400 font-mono">★ {item.rating}</span>
              </div>
              {item.tag && (
                <div className="flex items-center gap-1 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-full">
                  <Flame size={12} className="fill-rose-400" />
                  <span className="font-medium text-[10px] uppercase font-mono">{item.tag}</span>
                </div>
              )}
            </div>

            <div className="mt-4 space-y-1.5">
              <h3 className="font-bold text-text-primary text-base leading-snug">{item.title}</h3>
              <p className="text-xs text-text-secondary">
                {item.level} • {item.dur} duration
              </p>
            </div>

            <div className="flex justify-between items-center mt-6">
              <span className="text-sm font-semibold text-text-primary">Free Access</span>
              <button
                onClick={() => toggleEnroll(item.id)}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-300 ${
                  enrolled.includes(item.id)
                    ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                    : "bg-bg-elevated hover:bg-violet-500/10 border-border-subtle hover:border-violet-500/30 text-text-primary"
                }`}
              >
                {enrolled.includes(item.id) ? (
                  <>
                    <Check size={14} /> Enrolled
                  </>
                ) : (
                  <>
                    <Plus size={14} /> Start Learning
                  </>
                )}
              </button>
            </div>
          </BentoTile>
        ))}
      </div>
    </section>
  );
}
