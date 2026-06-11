"use client";

import { ErrorState } from "@/components/ui/ErrorState";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto flex items-center justify-center min-h-[60vh]">
      <ErrorState
        message={error.message || "Failed to load dashboard data."}
        retry={reset}
      />
    </section>
  );
}
