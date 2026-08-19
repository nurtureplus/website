"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { springSnappy } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Feedback on pointer-*down*, not on release. Waiting for click to acknowledge
 * a press is the single most common way an interface starts to feel dead.
 *
 * `whileTap` in Framer Motion fires on pointerdown, and the spring is
 * interruptible — releasing mid-press animates back from the live scale rather
 * than snapping from the target.
 */
export function Pressable({
  children,
  className,
  scale = 0.97,
  ...props
}: ComponentPropsWithoutRef<typeof motion.div> & { children: ReactNode; scale?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      whileTap={reduce ? undefined : { scale }}
      transition={springSnappy}
      className={cn("touch-manipulation", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * A card that lifts on hover and presses on pointer-down. Both directions run
 * on the same critically-damped spring so an interrupted hover reverses
 * smoothly instead of jumping.
 */
export function PressableCard({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<typeof motion.div> & { children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      whileHover={reduce ? undefined : { y: -4 }}
      whileTap={reduce ? undefined : { scale: 0.985, y: -1 }}
      transition={springSnappy}
      className={cn("touch-manipulation", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
