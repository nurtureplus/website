import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="container container-px pt-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-caption font-medium text-ink-500 dark:text-white/45">
        <li className="flex items-center gap-1.5">
          <Link href="/" className="flex items-center gap-1 transition-colors hover:text-ink-700 dark:hover:text-white/80">
            <Home size={13} />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight size={13} className="shrink-0 opacity-60" />
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-ink-700 dark:hover:text-white/80">
                {item.label}
              </Link>
            ) : (
              <span className="text-ink-700 dark:text-white/80">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
