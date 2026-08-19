"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { springSnappy } from "@/lib/motion";

/**
 * Press feedback runs on pointer-*down*, not on click.
 *
 * The scale is a spring rather than a CSS transition so an interrupted press —
 * released early, or dragged away and back — animates from wherever the button
 * currently is instead of restarting from the target. Framer cancels the tap
 * state when the pointer leaves the element, which gives the standard
 * drag-away-to-cancel behaviour for free.
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-control font-semibold whitespace-nowrap transition-[box-shadow,background-color,border-color,color] duration-200 ease-out-strong disabled:opacity-60 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-emerald-600 text-white shadow-soft hover:bg-emerald-500 hover:shadow-lifted dark:bg-emerald-500 dark:text-ink-950 dark:hover:bg-emerald-400",
        secondary:
          "border border-gray-300 bg-white text-ink-800 hover:border-ink-400 hover:bg-ink-50/60 dark:border-white/15 dark:bg-transparent dark:text-white dark:hover:border-white/35 dark:hover:bg-white/5",
        ghost: "text-ink-600 hover:text-ink-900 dark:text-white/65 dark:hover:text-white",
        "on-dark": "bg-white text-ink-900 shadow-soft hover:bg-white/90",
      },
      size: {
        md: "px-6 py-3.5",
        sm: "px-5 py-2.5 text-control-sm",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

/** Shared press behaviour, so a link and a button feel identical under the finger. */
function usePress() {
  const reduce = useReducedMotion();
  return {
    whileTap: reduce ? undefined : { scale: 0.97 },
    whileHover: reduce ? undefined : { scale: 1.01 },
    transition: springSnappy,
  };
}

export function Button({
  className,
  variant,
  size,
  ...props
}: ComponentPropsWithoutRef<typeof motion.button> & ButtonVariantProps) {
  return (
    <motion.button {...usePress()} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}

const MotionLink = motion.create(Link);

export function LinkButton({
  className,
  variant,
  size,
  href,
  ...props
}: ComponentPropsWithoutRef<typeof MotionLink> & ButtonVariantProps & { href: string }) {
  const classes = cn(buttonVariants({ variant, size }), className);
  const press = usePress();

  // In-page anchors stay plain <a> so the browser handles the hash itself.
  if (href.startsWith("#")) {
    return <motion.a {...press} href={href} className={classes} {...(props as object)} />;
  }
  return <MotionLink {...press} href={href} className={classes} {...props} />;
}
