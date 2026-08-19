import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

/**
 * Shared shell for policy pages. Long-form reading wants a narrow measure,
 * generous leading and a plain background — none of the section rhythm the
 * marketing pages use.
 */
export function LegalPage({
  title,
  crumbLabel,
  children,
}: {
  title: string;
  crumbLabel: string;
  children: ReactNode;
}) {
  return (
    <>
      <Breadcrumbs items={[{ label: crumbLabel }]} />
      <section className="pb-24 pt-8 md:pb-32">
        <div className="container container-px max-w-prose">
          <h1 className="text-display-md font-bold text-ink-950 dark:text-white">{title}</h1>
          <p className="mt-4 text-body-sm text-ink-500 dark:text-white/45">
            Last updated: {new Date().getFullYear()}
          </p>
          <div className="mt-10 space-y-8 text-body-md text-ink-600 dark:text-white/70 [&_h2]:text-body-lg [&_h2]:font-bold [&_h2]:text-ink-950 dark:[&_h2]:text-white [&_h2+p]:mt-2 [&_a]:font-medium [&_a]:text-emerald-700 [&_a]:underline [&_a]:underline-offset-2 dark:[&_a]:text-emerald-300">
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
