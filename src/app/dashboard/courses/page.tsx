"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, Layers, Network, Code2, Globe, CheckCircle2 } from "lucide-react";
import { BentoTile } from "@/components/ui/BentoTile";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { DynamicIcon } from "@/components/ui/DynamicIcon";

const ALL_COURSES = [
  { id: "1", title: "Advanced React Patterns", progress: 75, icon_name: "Layers", category: "frontend", desc: "Master custom hooks, performance profiling, and design patterns." },
  { id: "2", title: "System Design Mastery", progress: 42, icon_name: "Network", category: "backend", desc: "Scalability, microservices, load balancing, and high-availability." },
  { id: "3", title: "TypeScript Deep Dive", progress: 88, icon_name: "Code2", category: "languages", desc: "Types, generics, decorators, and compilation options." },
  { id: "4", title: "Next.js App Router", progress: 31, icon_name: "Globe", category: "frontend", desc: "Server Actions, RSC, layouts, dynamic routes, and caching." },
  { id: "5", title: "GraphQL API Architectures", progress: 100, icon_name: "Compass", category: "backend", desc: "Federation, schemas, resolvers, and security policies." },
  { id: "6", title: "Rust Basics to Systems", progress: 15, icon_name: "Zap", category: "languages", desc: "Memory safety, ownership, concurrency, and cargo tools." }
];

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"all" | "active" | "completed">("all");

  const filtered = ALL_COURSES.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
    if (tab === "active") return matchesSearch && c.progress < 100;
    if (tab === "completed") return matchesSearch && c.progress === 100;
    return matchesSearch;
  });

  return (
    <section className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-text-muted text-xs font-medium uppercase tracking-widest mb-1">LEARNING PLATFORM</h2>
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary">My Courses</h1>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-4 rounded-2xl border border-border-subtle bg-bg-surface">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search enrolled courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-border-subtle bg-bg-base text-text-primary focus:outline-none focus:border-violet-500/50 transition-colors duration-200"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-1.5 p-1 rounded-xl bg-bg-base border border-border-subtle w-full sm:w-auto">
          {(["all", "active", "completed"] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-medium uppercase tracking-wider transition-colors relative`}
            >
              {t === tab && (
                <motion.div
                  layoutId="courses-tab-active"
                  className="absolute inset-0 bg-violet-500/15 border border-violet-500/20 rounded-lg"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className={`relative z-10 ${t === tab ? "text-violet-400" : "text-text-secondary hover:text-text-primary"}`}>
                {t}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((course, idx) => (
            <motion.div
              key={course.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <BentoTile glowColor={course.progress === 100 ? "emerald" : "violet"} className="p-5 flex flex-col justify-between h-[200px] group">
                <div className="flex justify-between items-start">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${course.progress === 100 ? "bg-emerald-500/15 text-emerald-400" : "bg-violet-500/15 text-violet-400"}`}>
                    {course.progress === 100 ? <CheckCircle2 size={18} /> : <DynamicIcon name={course.icon_name} size={18} />}
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-text-muted px-2.5 py-0.5 rounded-full border border-border-subtle bg-bg-surface">{course.category}</span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-semibold text-text-primary text-sm group-hover:text-violet-400 transition-colors duration-200 line-clamp-1">{course.title}</h3>
                  <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">{course.desc}</p>
                </div>

                <div className="mt-2">
                  <ProgressBar
                    value={course.progress}
                    color={course.progress === 100 ? "emerald" : "violet"}
                    showLabel
                  />
                </div>
              </BentoTile>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <BookOpen className="mx-auto text-text-muted mb-3" size={32} />
          <p className="text-text-secondary font-medium">No courses found matching filters.</p>
        </div>
      )}
    </section>
  );
}
