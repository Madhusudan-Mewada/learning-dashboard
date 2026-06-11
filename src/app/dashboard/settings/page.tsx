"use client";

import { useState, useEffect } from "react";
import { Settings, User, Bell, Shield, Keyboard, Save } from "lucide-react";
import { BentoTile } from "@/components/ui/BentoTile";

export default function SettingsPage() {
  const [name, setName] = useState("Alex");
  const [weeklyGoal, setWeeklyGoal] = useState("10");
  const [emailNotif, setEmailNotif] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const sections = [
    { label: "Profile", icon: User },
    { label: "Notifications", icon: Bell },
    { label: "Security", icon: Shield },
    { label: "Preferences", icon: Keyboard },
  ];

  return (
    <section className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-text-muted text-xs font-medium uppercase tracking-widest mb-1">SYSTEM PREFERENCES</h2>
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary flex items-center gap-2">
          Settings <Settings className="text-text-secondary animate-spin-slow" size={24} />
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Side: Navigation Links */}
        <div className="space-y-2">
          {sections.map((sect) => {
            const Icon = sect.icon;
            return (
              <button
                key={sect.label}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-border-subtle hover:border-violet-500/30 bg-bg-surface hover:bg-violet-500/5 text-text-secondary hover:text-text-primary text-sm font-medium transition-all duration-200 text-left"
              >
                <Icon size={16} className="text-violet-400" />
                {sect.label}
              </button>
            );
          })}
        </div>

        {/* Right Side: Configuration Panel */}
        <div className="md:col-span-2">
          <BentoTile glowColor="violet" className="p-6">
            <form onSubmit={handleSave} className="space-y-6">
              <h2 className="text-text-primary font-semibold text-sm border-b border-border-subtle pb-3">Account Configuration</h2>
              
              {/* Name */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-text-secondary">Student Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-border-subtle bg-bg-base text-text-primary focus:outline-none focus:border-violet-500/50 transition-colors duration-200"
                />
              </div>

              {/* Weekly Goal */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-text-secondary">Weekly Study Goal (Hours)</label>
                <input
                  type="number"
                  value={weeklyGoal}
                  onChange={(e) => setWeeklyGoal(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-border-subtle bg-bg-base text-text-primary focus:outline-none focus:border-violet-500/50 transition-colors duration-200"
                />
              </div>

              {/* Notification Toggles */}
              <div className="flex items-center justify-between py-2 border-t border-b border-border-subtle">
                <div>
                  <p className="text-xs font-semibold text-text-primary">Email Digests</p>
                  <p className="text-[10px] text-text-muted">Receive weekly summary of learning accomplishments.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setEmailNotif(!emailNotif)}
                  className={`w-11 h-6 rounded-full transition-colors duration-300 relative ${
                    emailNotif ? "bg-violet-500" : "bg-bg-elevated border border-border-subtle"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white absolute top-1/2 -translate-y-1/2 transition-transform duration-300 ${
                      emailNotif ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

            {/* Theme Toggle */}
            <div className="flex items-center justify-between py-3 border-b border-border-subtle">
              <div>
                <p className="text-xs font-semibold text-text-primary">Interface Theme</p>
                <p className="text-[10px] text-text-muted">Switch between dark futuristic mode and light sleek mode.</p>
              </div>
              <button
                type="button"
                onClick={toggleTheme}
                className="px-4 py-2 rounded-xl bg-bg-elevated border border-border-subtle hover:border-violet-500/30 text-text-primary text-xs font-medium transition-colors"
              >
                {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
              </button>
            </div>

            {/* Save Button */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition-all shadow-[0_0_15px_#7C5CFC40] hover:shadow-[0_0_25px_#7C5CFC60]"
                >
                  <Save size={14} />
                  {isSaved ? "Saved Successfully!" : "Save Preferences"}
                </button>
              </div>
            </form>
          </BentoTile>
        </div>
      </div>
    </section>
  );
}
