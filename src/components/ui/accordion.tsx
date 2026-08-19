"use client";

import { useId, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { springDefault, springSnappy } from "@/lib/motion";
import { haptic } from "@/lib/haptics";
import { cn } from "@/lib/utils";

type Item = { question: string; answer: ReactNode };

/**
 * Height and chevron both run on springs rather than fixed-duration tweens, so
 * toggling a row mid-animation reverses from its live height instead of
 * snapping to the target and replaying. Opening one row closes the other on the
 * same spring, which reads as a single connected movement.
 */
export function Accordion({ items, className }: { items: Item[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();
  const baseId = useId();

  return (
    <div className={cn("divide-y divide-ink-900/[0.08] dark:divide-white/10", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <div key={i} className="py-1">
            <motion.button
              id={buttonId}
              type="button"
              onClick={() => {
                haptic("select");
                setOpen(isOpen ? null : i);
              }}
              aria-expanded={isOpen}
              aria-controls={panelId}
              whileTap={reduce ? undefined : { scale: 0.995 }}
              transition={springSnappy}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="text-body-lg font-semibold text-ink-900 dark:text-white">
                {item.question}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={springDefault}
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-200",
                  isOpen
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300"
                    : "bg-gray-50 text-ink-500 dark:bg-white/5 dark:text-white/50"
                )}
              >
                <ChevronDown size={16} />
              </motion.span>
            </motion.button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={
                    reduce
                      ? { duration: 0.15 }
                      : { height: springDefault, opacity: { duration: 0.18 } }
                  }
                  className="overflow-hidden"
                >
                  <p className="pb-5 pr-10 text-body-md text-ink-600 dark:text-white/65">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
