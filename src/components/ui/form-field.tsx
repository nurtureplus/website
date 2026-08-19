import type { LabelHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const inputClass =
  "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-control text-ink-900 placeholder:text-ink-400/60 outline-none transition-[border-color,box-shadow] duration-160 ease-out-strong focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder:text-white/35 dark:focus:border-blue-400/60 dark:focus:ring-blue-400/10";

export function Label({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("mb-1.5 block text-body-sm font-semibold text-ink-700 dark:text-white/75", className)} {...props} />;
}
