"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { springDefault, springSnappy } from "@/lib/motion";
import { haptic } from "@/lib/haptics";
import { cn } from "@/lib/utils";

type TabItem = { id: string; label: string; content: ReactNode };

/**
 * The selection pill is one object that travels between tabs on a shared
 * spring — grab-and-redirect safe, and it hints at where selection is heading
 * rather than blinking from one place to another.
 *
 * Arrow-key navigation follows the standard tablist pattern, so keyboard users
 * get the same model as pointer users instead of tabbing through every option.
 */
export function Tabs({ items, className }: { items: TabItem[]; className?: string }) {
  const [active, setActive] = useState(items[0]?.id);
  const activeIndex = Math.max(0, items.findIndex((i) => i.id === active));
  const activeItem = items[activeIndex] ?? items[0];
  const reduce = useReducedMotion();
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function select(index: number) {
    const item = items[index];
    if (!item) return;
    haptic("select");
    setActive(item.id);
    tabRefs.current[index]?.focus();
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const last = items.length - 1;
    const map: Record<string, number> = {
      ArrowRight: activeIndex === last ? 0 : activeIndex + 1,
      ArrowLeft: activeIndex === 0 ? last : activeIndex - 1,
      Home: 0,
      End: last,
    };
    const next = map[e.key];
    if (next === undefined) return;
    e.preventDefault();
    select(next);
  }

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label="Product details"
        onKeyDown={onKeyDown}
        className="flex flex-wrap gap-1.5 rounded-full border border-gray-200 bg-gray-50 p-1.5 dark:border-white/10 dark:bg-white/5"
      >
        {items.map((item, i) => {
          const isActive = item.id === activeItem?.id;
          return (
            <motion.button
              key={item.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.id}`}
              aria-selected={isActive}
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => select(i)}
              whileTap={reduce ? undefined : { scale: 0.96 }}
              transition={springSnappy}
              className={cn(
                "relative rounded-full px-4 py-2 text-control-sm font-semibold transition-colors duration-160 ease-out-strong",
                isActive
                  ? "text-white dark:text-ink-950"
                  : "text-ink-600 hover:text-ink-900 dark:text-white/60 dark:hover:text-white"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId={`${baseId}-pill`}
                  transition={reduce ? { duration: 0 } : springDefault}
                  className="absolute inset-0 rounded-full bg-emerald-600 dark:bg-emerald-500"
                />
              )}
              <span className="relative">{item.label}</span>
            </motion.button>
          );
        })}
      </div>

      <motion.div
        key={activeItem?.id}
        role="tabpanel"
        id={`${baseId}-panel-${activeItem?.id}`}
        aria-labelledby={`${baseId}-tab-${activeItem?.id}`}
        tabIndex={0}
        initial={{ opacity: 0, y: reduce ? 0 : 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduce ? { duration: 0.15 } : springDefault}
        className="mt-8 focus-visible:outline-none"
      >
        {activeItem?.content}
      </motion.div>
    </div>
  );
}
