"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { products } from "@/data/products";
import { DragRail } from "@/components/ui/drag-rail";
import { Reveal } from "@/components/motion/reveal";
import { LinkButton } from "@/components/ui/button";

export function ProductRail() {
  return (
    <section className="section-y surface-calm" aria-labelledby="rail-heading">
      <div className="container container-px">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="eyebrow">The Portfolio</span>
              <h2 id="rail-heading" className="mt-4 max-w-xl text-display-md font-bold">
                Explore by product.
              </h2>
            </div>
            <LinkButton href="/products" variant="secondary" size="sm">
              View all products
            </LinkButton>
          </div>
        </Reveal>
      </div>

      {/* Full-bleed rail: cards run to the viewport edge so the row reads as
          continuous rather than boxed, with container padding faked by a spacer. */}
      <div className="mt-12 overflow-hidden">
        <div className="container container-px">
          {/* Sized so the next card always peeks past the edge — a rail that
              fits exactly gives no signal that there is more to see. */}
          <DragRail label="Product range" itemClassName="w-[272px] sm:w-[320px] lg:w-[364px]">
            {products.map((product) => (
              <RailCard key={product.slug} product={product} />
            ))}
          </DragRail>
        </div>
      </div>
    </section>
  );
}

function RailCard({ product }: { product: (typeof products)[number] }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      draggable={false}
      className="group block h-full overflow-hidden rounded-xl2 border border-ink-100/70 bg-white shadow-card transition-[box-shadow,border-color] duration-300 ease-out-strong hover:border-emerald-200 hover:shadow-lifted dark:border-white/10 dark:bg-ink-900 dark:hover:border-emerald-400/30"
    >
      {/* The shots are all normalised to a square frame with matching margins,
          so `contain` shows each product whole at a consistent optical size —
          `cover` was cropping the wider cartons and made the range look like
          four unrelated photographs. */}
      <div className="relative aspect-square w-full overflow-hidden bg-white dark:bg-white">
        <Image
          src={product.image}
          alt={`${product.name} — ${product.category}`}
          fill
          draggable={false}
          // Card tops out at 364px; on a 2× display that needs ~730px of source.
          // The old 300px hint was serving a visibly soft image.
          sizes="(min-width: 1024px) 364px, (min-width: 640px) 320px, 272px"
          className="select-none object-contain transition-transform duration-500 ease-out-strong group-hover:scale-[1.04]"
        />
      </div>
      <div className="border-t border-ink-100/70 p-6 dark:border-white/10">
        <p className="text-caption font-bold uppercase tracking-[0.1em] text-emerald-700 dark:text-emerald-300">
          {product.strength}
        </p>
        <h3 className="mt-2 text-display-sm font-bold">{product.name}</h3>
        <p className="mt-2 line-clamp-2 text-body-sm text-ink-600 dark:text-white/65">
          {product.shortDescription}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-body-sm font-semibold text-ink-800 dark:text-white/85">
          View product
          <ArrowUpRight
            size={15}
            className="transition-transform duration-300 ease-out-strong group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </Link>
  );
}
