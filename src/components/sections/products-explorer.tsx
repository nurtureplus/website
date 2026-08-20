"use client";

import { useId, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ProductCard } from "@/components/ui/product-card";
import { products } from "@/data/products";
import { productCategories } from "@/data/site";
import { springDefault, springSnappy } from "@/lib/motion";
import { haptic } from "@/lib/haptics";
import { cn } from "@/lib/utils";

export function ProductsExplorer({ initialCategory }: { initialCategory?: string }) {
  const [category, setCategory] = useState<string>(initialCategory ?? "All");
  const [query, setQuery] = useState("");
  const reduce = useReducedMotion();
  const baseId = useId();

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        category === "All" || p.category.toLowerCase().includes(category.toLowerCase());
      const matchesQuery =
        query.trim().length === 0 ||
        `${p.name} ${p.category} ${p.shortDescription}`.toLowerCase().includes(query.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const tabs = ["All", ...productCategories.map((c) => c.filter)];

  return (
    <div>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        {/* Same selection model as the product-detail tabs: one pill that
            travels between options on a shared spring, rather than two
            independent background swaps. */}
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const label = tab === "All" ? "All Products" : tab.split(" / ")[0];
            const active = category === tab;
            return (
              <motion.button
                key={tab}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  haptic("select");
                  setCategory(tab);
                }}
                whileTap={reduce ? undefined : { scale: 0.96 }}
                transition={springSnappy}
                className={cn(
                  "relative rounded-full px-4 py-2 text-control-sm font-semibold transition-colors duration-160 ease-out-strong",
                  active
                    ? "text-white dark:text-ink-950"
                    : "bg-gray-100 text-ink-600 hover:bg-gray-200 dark:bg-white/5 dark:text-white/60 dark:hover:bg-white/10"
                )}
              >
                {active && (
                  <motion.span
                    layoutId={`${baseId}-filter-pill`}
                    transition={reduce ? { duration: 0 } : springDefault}
                    className="absolute inset-0 rounded-full bg-emerald-600 dark:bg-emerald-500"
                  />
                )}
                <span className="relative">{label}</span>
              </motion.button>
            );
          })}
        </div>

        <div className="relative w-full sm:w-64">
          <Search
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400 dark:text-white/40"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products…"
            aria-label="Search products"
            className="w-full rounded-full border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-control text-ink-900 outline-none placeholder:text-ink-400/70 focus:border-blue-300 focus:ring-4 focus:ring-blue-100 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/35"
          />
        </div>
      </div>

      {/* Announce result counts to screen readers — the visual change is
          obvious, the count is not. */}
      <p aria-live="polite" className="sr-only">
        {filtered.length} {filtered.length === 1 ? "product" : "products"} shown
      </p>

      {filtered.length === 0 ? (
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={springDefault}
          className="mt-16 rounded-xl2 border border-dashed border-gray-300 py-20 text-center dark:border-white/15"
        >
          <p className="text-body-md font-medium text-ink-600 dark:text-white/60">
            No products match your search.
          </p>
        </motion.div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* `popLayout` takes leaving cards out of flow immediately, so the
              survivors close the gap on the same spring instead of waiting for
              the exit to finish. Cards leave along the scale path they arrived
              on, rather than vanishing. */}
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((product, i) => (
              <motion.div
                key={product.slug}
                layout={!reduce}
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                transition={reduce ? { duration: 0.15 } : springSnappy}
                className="h-full"
              >
                <ProductCard product={product} index={i} inGrid />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
