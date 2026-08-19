import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-gray-200/70 dark:bg-white/10",
        className
      )}
    />
  );
}
