"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/data/products";

const accentMap: Record<Product["accent"], { chip: string; ring: string }> = {
  rose: {
    chip: "border border-rose-200 text-rose-700 dark:border-rose-400/30 dark:text-rose-300",
    ring: "group-hover:ring-rose-200 dark:group-hover:ring-rose-400/30",
  },
  violet: {
    chip: "border border-violet-200 text-violet-700 dark:border-violet-400/30 dark:text-violet-300",
    ring: "group-hover:ring-violet-200 dark:group-hover:ring-violet-400/30",
  },
  sky: {
    chip: "border border-blue-200 text-blue-700 dark:border-blue-400/30 dark:text-blue-300",
    ring: "group-hover:ring-blue-200 dark:group-hover:ring-blue-400/30",
  },
  magenta: {
    chip: "border border-magenta-200 text-magenta-700 dark:border-magenta-400/30 dark:text-magenta-300",
    ring: "group-hover:ring-magenta-200 dark:group-hover:ring-magenta-400/30",
  },
};

export function ProductCard({
  product,
  index = 0,
  inGrid = false,
}: {
  product: Product;
  index?: number;
  /**
   * Set when a parent already owns this card's enter/exit — a filterable grid,
   * for instance. The card's own scroll reveal uses `once: true`, which would
   * both double up with the parent's animation and leave re-entering cards
   * stuck invisible after a filter change.
   */
  inGrid?: boolean;
}) {
  const accent = accentMap[product.accent];
  return (
    <motion.div
      initial={inGrid ? false : { opacity: 0, y: 18 }}
      whileInView={inGrid ? undefined : { opacity: 1, y: 0 }}
      viewport={inGrid ? undefined : { once: true, margin: "-60px" }}
      transition={inGrid ? undefined : { duration: 0.55, delay: index * 0.06, ease: [0.23, 1, 0.32, 1] }}
    >
      <Link
        href={`/products/${product.slug}`}
        className={`group block overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-card ring-1 ring-transparent transition-[transform,box-shadow] duration-220 ease-out-strong hover:-translate-y-1 hover:shadow-lifted dark:border-white/10 dark:bg-ink-900 ${accent.ring}`}
      >
        <div className="relative aspect-[4/3.4] w-full overflow-hidden bg-white dark:bg-white">
          <Image
            src={product.image}
            alt={`${product.name} by Nurture+ — ${product.category}`}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw"
            className="object-contain p-3 transition-transform duration-500 ease-out-strong group-hover:scale-[1.045]"
          />
        </div>
        <div className="p-6">
          <span className={`inline-flex rounded-full px-3 py-1 text-caption font-bold uppercase tracking-[0.1em] ${accent.chip}`}>
            {product.category}
          </span>
          <h3 className="mt-3 text-display-sm font-bold text-ink-950 dark:text-white">{product.name}</h3>
          <p className="mt-1 text-body-sm font-medium text-ink-500 dark:text-white/45">{product.strength}</p>
          <p className="mt-3 text-body-sm text-ink-600 line-clamp-2 dark:text-white/55">
            {product.shortDescription}
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-body-sm font-semibold text-ink-800 dark:text-white/80">
            View product
            <ArrowUpRight size={15} className="transition-transform duration-200 ease-out-strong group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
