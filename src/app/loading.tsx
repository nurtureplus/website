import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container container-px py-20">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="mt-5 h-10 w-2/3 max-w-lg" />
      <Skeleton className="mt-4 h-5 w-full max-w-xl" />
      <Skeleton className="mt-2 h-5 w-5/6 max-w-lg" />

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10">
            <Skeleton className="aspect-[4/3.4] w-full rounded-none" />
            <div className="p-6">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="mt-3 h-5 w-2/3" />
              <Skeleton className="mt-2 h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
