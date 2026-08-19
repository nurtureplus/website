"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Search as SearchIcon } from "lucide-react";
import { navLinks } from "@/data/site";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";
import { springSheet, springSnappy } from "@/lib/motion";
import { haptic } from "@/lib/haptics";
import { LinkButton } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Sheet } from "@/components/ui/sheet";

const HEADER_H = 76;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Where the search overlay should appear to grow *from*. An overlay that
  // scales out of the control that summoned it keeps the spatial relationship
  // obvious; one that blooms from screen centre feels unrelated to the click.
  const originRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [searchOpen]);

  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!searchOpen) return;
    const t = window.setTimeout(() => searchInputRef.current?.focus(), 60);
    return () => window.clearTimeout(t);
  }, [searchOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        originRef.current = null; // summoned by keyboard — no anchor to grow from
        setSearchOpen(true);
      }
      if (e.key === "Escape") setSearchOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openSearchFrom = useCallback((el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    originRef.current = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    // Only one overlay at a time. Both are light translucent materials, and
    // stacking one on the other destroys the legibility of both.
    setOpen(false);
    setSearchOpen(true);
  }, []);

  const toggleMenu = useCallback(() => {
    setSearchOpen(false);
    setOpen((v) => !v);
  }, []);

  /** Set transform-origin before first paint so the very first frame is right. */
  const anchorPanel = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const o = originRef.current;
    if (!o) {
      node.style.transformOrigin = "50% 0%";
      return;
    }
    const r = node.getBoundingClientRect();
    node.style.transformOrigin = `${o.x - r.left}px ${o.y - r.top}px`;
  }, []);

  const results =
    query.trim().length > 0
      ? products.filter((p) =>
          `${p.name} ${p.category} ${p.shortDescription}`.toLowerCase().includes(query.trim().toLowerCase())
        )
      : products;

  function goToProduct(slug: string) {
    haptic("select");
    setSearchOpen(false);
    setQuery("");
    router.push(`/products/${slug}`);
  }

  return (
    <header
      // `scroll-edge` is always present so its gradient can fade rather than
      // being toggled into existence at the threshold; the data attribute
      // drives the opacity.
      data-scrolled={scrolled}
      className={cn(
        "scroll-edge sticky top-0 z-50 w-full transition-[background-color,backdrop-filter] duration-300 ease-out-strong",
        scrolled ? "material-thin" : "bg-transparent"
      )}
    >
      <div className="container container-px flex h-[76px] items-center justify-between">
        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="Nurture+ home">
          <Image
            src="/brand/logo.png"
            alt="Nurture+ — Adds Life"
            width={176}
            height={44}
            priority
            className="h-9 w-auto md:h-10 dark:brightness-0 dark:invert"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          {navLinks.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative py-1 text-control font-medium tracking-[0.006em] transition-colors duration-160 ease-out-strong",
                  active
                    ? "text-ink-900 dark:text-white"
                    : "text-ink-700 hover:text-ink-900 dark:text-white/70 dark:hover:text-white"
                )}
              >
                {link.label}
                {/* The indicator travels between items on a shared spring, so
                    switching pages reads as one object moving rather than two
                    separate fades. */}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    transition={springSnappy}
                    className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full bg-emerald-600 dark:bg-emerald-400"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-1.5 lg:flex">
          <IconButton
            label="Search products"
            onPress={(el) => openSearchFrom(el)}
            className="text-ink-700 hover:bg-ink-50 dark:text-white/70 dark:hover:bg-white/10"
          >
            <SearchIcon size={18} strokeWidth={1.75} />
          </IconButton>
          <ThemeToggle />
          <LinkButton href="/#distributor" size="sm" className="ml-2">
            Partner with Nurture+
          </LinkButton>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <IconButton
            label="Search products"
            onPress={(el) => openSearchFrom(el)}
            className="text-ink-900 dark:text-white"
          >
            <SearchIcon size={20} strokeWidth={1.75} />
          </IconButton>
          <ThemeToggle />
          <IconButton
            label={open ? "Close menu" : "Open menu"}
            expanded={open}
            controls="mobile-nav"
            onPress={toggleMenu}
            className="text-ink-900 dark:text-white"
          >
            {/* Icon swap is a cross-fade with a slight rotation so the control
                reads as one thing changing state, not two icons trading places. */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "close" : "open"}
                initial={{ opacity: 0, rotate: open ? -70 : 70, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: open ? 70 : -70, scale: 0.8 }}
                transition={springSnappy}
                className="flex"
              >
                {open ? <X size={22} /> : <Menu size={22} />}
              </motion.span>
            </AnimatePresence>
          </IconButton>
        </div>
      </div>

      <Sheet
        open={open}
        onClose={() => setOpen(false)}
        label="Site navigation"
        offsetTop={HEADER_H}
        className="rounded-b-3xl"
      >
        <nav id="mobile-nav" className="flex flex-col gap-1 px-6 pb-8 pt-2 md:px-10" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-ink-900/[0.07] py-3.5 text-body-lg font-medium text-ink-800 dark:border-white/10 dark:text-white/85"
            >
              {link.label}
            </Link>
          ))}
          <LinkButton href="/#distributor" onClick={() => setOpen(false)} className="mt-6">
            Partner with Nurture+
          </LinkButton>
        </nav>
      </Sheet>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[60] bg-ink-950/45 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              ref={anchorPanel}
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              transition={springSheet}
              onClick={(e) => e.stopPropagation()}
              className="mx-auto mt-24 w-[92%] max-w-xl overflow-hidden rounded-2xl bg-white shadow-material ring-1 ring-ink-100/60 dark:bg-ink-900 dark:ring-white/10"
            >
              <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4 dark:border-white/10">
                <SearchIcon size={18} className="shrink-0 text-ink-400" />
                <input
                  ref={searchInputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products…"
                  aria-label="Search products"
                  className="w-full bg-transparent text-control text-ink-900 outline-none placeholder:text-ink-400/70 dark:text-white dark:placeholder:text-white/40"
                />
                <kbd className="hidden shrink-0 rounded border border-gray-200 px-1.5 py-0.5 text-caption font-medium text-ink-400 sm:block dark:border-white/15 dark:text-white/50">
                  Esc
                </kbd>
              </div>
              <ul className="max-h-[60vh] overflow-y-auto p-2">
                {results.length === 0 ? (
                  <li className="px-4 py-8 text-center text-body-sm text-ink-400 dark:text-white/50">
                    No products match &ldquo;{query}&rdquo;.
                  </li>
                ) : (
                  results.map((p) => (
                    <li key={p.slug}>
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.985 }}
                        transition={springSnappy}
                        onClick={() => goToProduct(p.slug)}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-140 ease-out-strong hover:bg-gray-50 dark:hover:bg-white/5"
                      >
                        <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-gray-50 dark:bg-white/10">
                          <Image src={p.image} alt="" fill className="object-cover" sizes="44px" />
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-body-sm font-semibold text-ink-900 dark:text-white">
                            {p.name}
                          </span>
                          <span className="block truncate text-caption text-ink-400 dark:text-white/50">
                            {p.category}
                          </span>
                        </span>
                      </motion.button>
                    </li>
                  ))
                )}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/**
 * Icon control with press feedback on pointer-down. `onPress` receives the
 * element so callers can anchor an overlay to it.
 */
function IconButton({
  children,
  label,
  onPress,
  className,
  expanded,
  controls,
}: {
  children: React.ReactNode;
  label: string;
  onPress: (el: HTMLElement) => void;
  className?: string;
  expanded?: boolean;
  controls?: string;
}) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      aria-expanded={expanded}
      aria-controls={controls}
      whileTap={{ scale: 0.9 }}
      transition={springSnappy}
      onClick={(e) => onPress(e.currentTarget)}
      className={cn(
        // Visually 40px, but the hit area is padded out to 48px so the touch
        // target clears the 44px minimum without making the chrome heavier.
        "relative before:absolute before:-inset-1 before:content-[''] flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-160 ease-out-strong",
        className
      )}
    >
      {children}
    </motion.button>
  );
}
