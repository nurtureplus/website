"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type AnimationPlaybackControls,
} from "framer-motion";
import { Expand, X } from "lucide-react";
import { VelocityTracker, project, springSheet, springSnappy } from "@/lib/motion";
import { haptic } from "@/lib/haptics";

/**
 * The enlarged image grows out of the thumbnail that opened it and returns the
 * same way, so the two are obviously the same object rather than two unrelated
 * pictures. It can also be thrown away: drag it in any vertical direction and
 * release, and the momentum decides whether it dismisses or springs home.
 */
export function ImageLightbox({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const y = useMotionValue(0);
  // Dragging away dims and shrinks in proportion — the in-between frames say
  // what releasing now will do.
  const scrim = useTransform(y, [-320, 0, 320], [0, 1, 0]);
  const scale = useTransform(y, [-320, 0, 320], [0.88, 1, 0.88]);

  const running = useRef<AnimationPlaybackControls | null>(null);
  const tracker = useRef(new VelocityTracker());
  const gesture = useRef({ active: false, start: 0, startY: 0 });

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    y.set(0);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    const triggerNode = triggerRef.current;
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      // Focus goes back to the control that opened it — never strand the user.
      triggerNode?.focus();
    };
  }, [open, close, y]);

  /** Anchor the panel's transform-origin at the thumbnail, before first paint. */
  const anchor = useCallback((node: HTMLDivElement | null) => {
    if (!node || !triggerRef.current) return;
    const t = triggerRef.current.getBoundingClientRect();
    const r = node.getBoundingClientRect();
    node.style.transformOrigin = `${t.left + t.width / 2 - r.left}px ${t.top + t.height / 2 - r.top}px`;
  }, []);

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce) return;
    running.current?.stop();
    e.currentTarget.setPointerCapture(e.pointerId);
    gesture.current = { active: true, start: e.clientY, startY: y.get() };
    tracker.current.reset();
    tracker.current.add(e.clientY);
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!gesture.current.active) return;
    tracker.current.add(e.clientY);
    y.set(gesture.current.startY + (e.clientY - gesture.current.start));
  }

  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (!gesture.current.active) return;
    gesture.current.active = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    const v = tracker.current.velocity;
    const projected = y.get() + project(v);
    const dismiss = Math.abs(v) > 520 || Math.abs(projected) > 220;

    running.current?.stop();
    running.current = animate(y, dismiss ? Math.sign(projected || v) * 700 : 0, {
      type: "spring",
      stiffness: 300,
      damping: dismiss ? 38 : 30,
      velocity: v,
      restDelta: 0.5,
      onComplete: () => {
        if (dismiss) close();
      },
    });
    haptic(dismiss ? "commit" : "snap");
  }

  return (
    <>
      <motion.button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Enlarge image of ${alt}`}
        whileTap={reduce ? undefined : { scale: 0.985 }}
        transition={springSnappy}
        className="group relative block aspect-square w-full overflow-hidden rounded-xl2 bg-white shadow-card ring-1 ring-ink-100/50 dark:bg-white dark:ring-white/10"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 44vw, 92vw"
          className="object-contain p-4 transition-transform duration-500 ease-out-strong group-hover:scale-[1.03]"
        />
        <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink-700 opacity-0 shadow-soft backdrop-blur transition-opacity duration-200 ease-out-strong group-hover:opacity-100 dark:bg-ink-900/90 dark:text-white">
          <Expand size={16} />
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            className="fixed inset-0 z-[70] flex items-center justify-center p-6"
          >
            <motion.div
              aria-hidden
              style={{ opacity: reduce ? 1 : scrim }}
              className="absolute inset-0 bg-ink-950/85 backdrop-blur-sm"
            />

            <motion.div
              ref={anchor}
              role="dialog"
              aria-modal="true"
              aria-label={alt}
              style={reduce ? undefined : { y, scale, touchAction: "none" }}
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6, filter: "blur(12px)" }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6, filter: "blur(12px)" }}
              transition={springSheet}
              onClick={(e) => e.stopPropagation()}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              className="relative aspect-square w-full max-w-xl cursor-grab overflow-hidden rounded-xl2 bg-white will-change-transform active:cursor-grabbing"
            >
              <Image src={src} alt={alt} fill sizes="90vw" className="select-none object-contain" draggable={false} />
            </motion.div>

            <motion.button
              type="button"
              onClick={close}
              aria-label="Close"
              whileTap={{ scale: 0.9 }}
              transition={springSnappy}
              className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              <X size={20} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
