"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  message?: string;
  retry?: () => void;
}

export function ErrorState({ message = "Something went wrong", retry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 rounded-2xl border border-rose-500/20 bg-rose-500/5 text-center">
      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-rose-500/10">
        <AlertTriangle size={22} className="text-rose-400" />
      </div>
      <div>
        <p className="text-text-primary font-medium text-sm mb-1">Failed to load</p>
        <p className="text-text-muted text-xs max-w-xs">{message}</p>
      </div>
      {retry && (
        <button
          onClick={retry}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 text-xs font-medium transition-colors duration-200"
        >
          <RefreshCw size={12} />
          Try again
        </button>
      )}
    </div>
  );
}
