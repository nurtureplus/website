"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: reduce ? 0 : 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: reduce ? 0 : -6 }}
        transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
