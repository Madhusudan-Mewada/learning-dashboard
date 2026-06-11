import { CourseCardSkeleton, HeroTileSkeleton, Skeleton } from "@/components/ui/Skeleton";

export default function DashboardLoading() {
  return (
    <section className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-6 space-y-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-4 w-48" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-2">
          <HeroTileSkeleton />
        </div>

        {/* Stats skeleton */}
        <div className="rounded-2xl border border-border-subtle bg-bg-card p-5 space-y-4">
          <Skeleton className="h-4 w-24" />
          <div className="grid grid-cols-2 gap-2">
            {[0, 1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 rounded-xl" />
            ))}
          </div>
        </div>

        {/* Activity skeleton */}
        <div className="col-span-1 md:col-span-2 rounded-2xl border border-border-subtle bg-bg-card p-5 space-y-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-28 w-full" />
        </div>

        {/* Course skeletons */}
        {[0, 1, 2, 3].map((i) => (
          <CourseCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
