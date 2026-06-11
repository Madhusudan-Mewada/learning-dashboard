import { Suspense } from "react";
import { HeroTile } from "@/components/dashboard/HeroTile";
import { ActivityTile } from "@/components/dashboard/ActivityTile";
import { StatsTile } from "@/components/dashboard/StatsTile";
import { CourseGrid } from "@/components/dashboard/CourseGrid";
import { CourseCardSkeleton, HeroTileSkeleton } from "@/components/ui/Skeleton";
import { USER_STATS, generateActivityData } from "@/lib/data";

export default function DashboardPage() {
  const activityData = generateActivityData();

  return (
    <section className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Page header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-text-muted text-xs font-medium uppercase tracking-widest mb-1">
            Overview
          </h2>
          <p className="text-text-secondary text-sm">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        {/* Ambient glow orbs - decorative */}
        <div className="hidden md:flex gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10B981]" />
          <span className="text-text-muted text-xs">All systems go</span>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* Row 1: Hero (2 cols) + Stats (1 col) */}
        <Suspense fallback={<HeroTileSkeleton />}>
          <HeroTile stats={USER_STATS} index={0} />
        </Suspense>

        <StatsTile index={1} />

        {/* Row 2: Activity (2 cols wide on lg) */}
        <ActivityTile data={activityData} index={2} />

        {/* Row 3: Course cards from Supabase */}
        <Suspense
          fallback={
            <>
              {[0, 1, 2, 3].map((i) => (
                <CourseCardSkeleton key={i} />
              ))}
            </>
          }
        >
          <CourseGrid />
        </Suspense>
      </div>
    </section>
  );
}
