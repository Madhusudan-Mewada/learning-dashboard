"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, BookOpen, Compass, Trophy, BarChart2,
  Settings, ChevronLeft, ChevronRight, Zap, GraduationCap,
  LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  BookOpen,
  Compass,
  Trophy,
  BarChart2,
  Settings,
};

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard", href: "/dashboard" },
  { id: "courses", label: "My Courses", icon: "BookOpen", href: "/dashboard/courses" },
  { id: "explore", label: "Explore", icon: "Compass", href: "/dashboard/explore" },
  { id: "achievements", label: "Achievements", icon: "Trophy", href: "/dashboard/achievements" },
  { id: "analytics", label: "Analytics", icon: "BarChart2", href: "/dashboard/analytics" },
  { id: "settings", label: "Settings", icon: "Settings", href: "/dashboard/settings" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    // Auto-collapse sidebar on tablet screens (<1024px)
    const mediaQuery = window.matchMedia("(max-width: 1024px)");
    
    // Set initial state based on current viewport
    setCollapsed(mediaQuery.matches);

    const handleResize = (e: MediaQueryListEvent) => {
      setCollapsed(e.matches);
    };

    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.nav
        animate={{ width: collapsed ? 72 : 240 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="hidden md:flex relative flex-col h-full bg-bg-surface border-r border-border-subtle overflow-hidden shrink-0"
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-border-subtle select-none animate-fadeIn">
          <div
            onClick={() => collapsed && setCollapsed(false)}
            className={`flex items-center gap-3 ${
              collapsed
                ? "cursor-pointer p-1.5 -m-1.5 rounded-xl hover:bg-bg-elevated border border-transparent hover:border-border-subtle/50 transition-all duration-200"
                : ""
            }`}
            title={collapsed ? "Expand Sidebar" : undefined}
          >
            <motion.div
              whileHover={collapsed ? { scale: 1.08 } : {}}
              className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-violet-400 shrink-0 shadow-[0_0_15px_rgba(124,92,252,0.2)]"
            >
              <GraduationCap size={18} className="text-white" />
            </motion.div>
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="font-semibold text-text-primary text-sm tracking-wide whitespace-nowrap"
                >
                  LearnFlow
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="flex items-center justify-center w-6 h-6 rounded-lg bg-bg-elevated border border-border-subtle text-text-muted hover:text-text-primary hover:border-violet-500/40 transition-all duration-200"
              title="Collapse Sidebar"
            >
              <ChevronLeft size={14} />
            </button>
          )}
        </div>

        {/* Nav Items */}
        <div className="flex-1 py-4 px-2 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = iconMap[item.icon];
            const isActive = pathname === item.href;

            return (
              <Link key={item.id} href={item.href}>
                <motion.div
                  className="relative flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer group"
                  whileHover={{ x: 2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600/20 to-violet-400/10 border border-violet-500/30"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Icon
                    size={18}
                    className={`relative z-10 shrink-0 transition-colors duration-200 ${
                      isActive ? "text-violet-400" : "text-text-muted group-hover:text-text-secondary"
                    }`}
                  />
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        transition={{ duration: 0.15 }}
                        className={`relative z-10 text-sm whitespace-nowrap transition-colors duration-200 ${
                          isActive ? "text-text-primary font-medium" : "text-text-secondary group-hover:text-text-primary"
                        }`}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* Theme toggle handled in Settings page */}

        {/* Streak badge */}
        <div className="px-2 pb-4">
          <AnimatePresence>
            {!collapsed ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20"
              >
                <Zap size={14} className="text-amber-400 shrink-0" />
                <span className="text-xs text-amber-300 font-medium">14-day streak!</span>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center"
              >
                <Zap size={18} className="text-amber-400" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Collapse toggle handled in header and via logo tap when collapsed */}
      </motion.nav>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around bg-bg-surface backdrop-blur-xl border-t border-border-subtle px-1 py-3">
        {NAV_ITEMS.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive = pathname === item.href;

          return (
            <Link key={item.id} href={item.href} className="flex-1">
              <motion.div
                whileTap={{ scale: 0.95 }}
                className="relative flex flex-col items-center gap-1.5 py-1 px-1 text-center"
              >
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-active"
                    className="absolute inset-x-1 inset-y-0 rounded-xl bg-violet-500/10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon
                  size={18}
                  className={`relative z-10 ${isActive ? "text-violet-400" : "text-text-muted"}`}
                />
                <span className={`relative z-10 text-[9px] font-medium tracking-wide uppercase transition-colors duration-200 ${isActive ? "text-violet-400" : "text-text-secondary"}`}>
                  {item.id === "courses" ? "Courses" : item.label.split(" ")[0]}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
