import { Course, ActivityDay, UserStats } from "@/types";

export const MOCK_COURSES: Course[] = [
  {
    id: "1",
    title: "Advanced React Patterns",
    progress: 75,
    icon_name: "Layers",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "System Design Mastery",
    progress: 42,
    icon_name: "Network",
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "TypeScript Deep Dive",
    progress: 88,
    icon_name: "Code2",
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Next.js App Router",
    progress: 31,
    icon_name: "Globe",
    created_at: new Date().toISOString(),
  },
];

export const USER_STATS: UserStats = {
  streak: 14,
  totalHours: 127,
  coursesCompleted: 8,
  weeklyGoal: 10,
  weeklyProgress: 7,
};

export function generateActivityData(): ActivityDay[] {
  const days: ActivityDay[] = [];
  const now = new Date();

  for (let i = 364; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const rand = Math.random();
    days.push({
      date: date.toISOString().split("T")[0],
      count: rand > 0.6 ? Math.floor(Math.random() * 5) + 1 : 0,
    });
  }
  return days;
}

export const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard", href: "/dashboard" },
  { id: "courses", label: "My Courses", icon: "BookOpen", href: "/dashboard/courses" },
  { id: "explore", label: "Explore", icon: "Compass", href: "/dashboard/explore" },
  { id: "achievements", label: "Achievements", icon: "Trophy", href: "/dashboard/achievements" },
  { id: "analytics", label: "Analytics", icon: "BarChart2", href: "/dashboard/analytics" },
  { id: "settings", label: "Settings", icon: "Settings", href: "/dashboard/settings" },
];
