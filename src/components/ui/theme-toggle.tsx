"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

const SWITCH_MS = 300;
let switchTimer: number | undefined;

function applyTheme(theme: Theme) {
  const root = document.documentElement;

  // Put every surface on one clock for the length of the switch. Without this
  // only `body` eases and each card, panel and border cuts instantly, so half
  // the screen fades and half of it jumps.
  root.classList.add("theme-switching");
  window.clearTimeout(switchTimer);
  switchTimer = window.setTimeout(() => root.classList.remove("theme-switching"), SWITCH_MS + 20);

  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
  window.localStorage.setItem("nurture-theme", theme);
}

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem("nurture-theme") as Theme | null;
    const initial = stored ?? (document.documentElement.classList.contains("dark") ? "dark" : "light");
    setTheme(initial);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className={
        "relative before:absolute before:-inset-1 before:content-[''] flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-ink-600 transition-colors duration-160 ease-out-strong hover:bg-ink-50 active:scale-[0.92] dark:text-white/70 dark:hover:bg-white/10 " +
        (className ?? "")
      }
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme ?? "pending"}
          initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 60, scale: 0.6 }}
          transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
          className="flex items-center justify-center"
        >
          {theme === "dark" ? <Sun size={18} strokeWidth={1.75} /> : <Moon size={18} strokeWidth={1.75} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
