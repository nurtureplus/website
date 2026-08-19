"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { easeOutStrong } from "@/lib/motion";

/**
 * A single, committed hero rather than an auto-rotating carousel.
 *
 * A carousel that advances on a timer takes control away from the reader and
 * shows most visitors only the first slide anyway. One clear statement, one
 * primary action, one secondary — the remaining messages have their own
 * sections further down the page.
 */
export function Hero() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: easeOutStrong },
  });

  return (
    <section id="home" className="relative overflow-hidden" aria-labelledby="hero-heading">
      {/* Ambient wash. Kept low-contrast and static — a slowly looping
          full-viewport gradient is exactly the kind of motion that triggers
          vestibular discomfort. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[560px] w-[560px] rounded-full bg-blue-100/50 blur-[130px] dark:bg-blue-500/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-40 left-[-12%] h-[420px] w-[420px] rounded-full bg-emerald-100/40 blur-[120px] dark:bg-emerald-500/10"
      />

      <div className="container container-px relative pb-16 pt-16 md:pb-24 md:pt-24">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <motion.span {...rise(0)} className="eyebrow">
              WHO-GMP Certified Manufacturing
            </motion.span>

            <motion.h1
              {...rise(0.06)}
              id="hero-heading"
              className="mt-5 text-display-2xl font-bold text-ink-950 dark:text-white"
            >
              Formulated with care.
              <span className="block font-medium text-ink-500 dark:text-white/55">
                Delivered with consistency.
              </span>
            </motion.h1>

            <motion.p
              {...rise(0.12)}
              className="mt-7 max-w-prose text-body-lg text-ink-600 dark:text-white/70"
            >
              Nurture+ manufactures premium intravenous wellness formulations for hospitals, clinics
              and distribution partners — built on pharmacopeia-grade actives and disciplined,
              batch-to-batch process control.
            </motion.p>

            <motion.div {...rise(0.18)} className="mt-9 flex flex-wrap items-center gap-3">
              <LinkButton href="/products">Explore the range</LinkButton>
              <LinkButton href="/#distributor" variant="secondary">
                Become a distributor
              </LinkButton>
            </motion.div>

            <motion.p
              {...rise(0.24)}
              className="mt-9 flex items-start gap-2.5 text-body-sm vibrant-secondary"
            >
              <ShieldCheck
                size={17}
                strokeWidth={2}
                className="mt-[3px] shrink-0 text-emerald-600 dark:text-emerald-400"
              />
              Manufactured under WHO-GMP certified standards
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: reduce ? 1 : 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: easeOutStrong }}
            className="relative"
          >
            <div className="relative aspect-[4/3.5] w-full overflow-hidden rounded-xl2 bg-white shadow-material dark:bg-white">
              <Image
                src="/products/elixir.jpg"
                alt="Elixir+NAD 500 mg — nicotinamide adenine dinucleotide injection by Nurture+"
                fill
                priority
                sizes="(min-width: 1024px) 46vw, 92vw"
                className="object-contain p-4 sm:p-6"
              />
            </div>

            {/* Anchored to the artwork it describes — proximity implies
                relationship, so the chip sits on the product, not beside it. */}
            <div className="absolute bottom-5 left-5 rounded-2xl px-4 py-3 material-thick shadow-lifted">
              <p className="text-body-sm font-bold text-ink-950 dark:text-white">NAD+ · 500 mg</p>
              <p className="text-caption vibrant-secondary">Elixir+NAD · Adds Life.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
