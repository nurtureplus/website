import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { navLinks } from "@/data/site";

/**
 * Never trap the reader. A dead end that only offers "back to home" makes them
 * start their search over — so name the actual destinations instead.
 */
export default function NotFound() {
  return (
    <section className="container container-px flex min-h-[68vh] flex-col justify-center py-24">
      <div className="max-w-prose">
        <span className="eyebrow">404</span>
        <h1 className="mt-4 text-display-lg font-bold text-ink-950 dark:text-white">
          We couldn&rsquo;t find that page.
        </h1>
        <p className="mt-5 text-body-lg text-ink-600 dark:text-white/70">
          The page may have moved, or the link may be out of date. Here&rsquo;s where most people
          are heading:
        </p>

        <ul className="mt-8 grid gap-px overflow-hidden rounded-xl2 bg-ink-100/70 shadow-card sm:grid-cols-2 dark:bg-white/10">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group flex items-center justify-between gap-3 bg-white px-5 py-4 text-body-md font-semibold transition-colors hover:bg-emerald-50/60 dark:bg-ink-900 dark:hover:bg-white/5"
              >
                {link.label}
                <ArrowUpRight
                  size={16}
                  className="shrink-0 text-ink-400 transition-transform duration-300 ease-out-strong group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:text-white/40"
                />
              </Link>
            </li>
          ))}
        </ul>

        <LinkButton href="/" className="mt-8">
          Back to home
        </LinkButton>
      </div>
    </section>
  );
}
