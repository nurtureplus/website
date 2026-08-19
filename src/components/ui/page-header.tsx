import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/ui/breadcrumbs";

/**
 * One editorial header shared by every inner route. Consistency here is what
 * makes the site feel like one place — same eyebrow position, same measure,
 * same rhythm, so a reader always knows where they are and what they're
 * looking at before they read a word.
 */
export function PageHeader({
  eyebrow,
  title,
  lede,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  crumbs: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-14 pt-4 md:pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 right-[-8%] h-[440px] w-[440px] rounded-full bg-emerald-100/35 blur-[130px] dark:bg-emerald-500/[0.07]"
      />
      <Breadcrumbs items={crumbs} />
      <div className="container container-px relative mt-8 max-w-prose">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="mt-4 text-display-lg font-bold text-ink-950 dark:text-white">{title}</h1>
        {lede && (
          <p className="mt-6 text-body-lg text-ink-600 dark:text-white/70">{lede}</p>
        )}
        {children}
      </div>
    </section>
  );
}
