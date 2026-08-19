"use client";

import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  type AnimationPlaybackControls,
} from "framer-motion";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { VelocityTracker, project, rubberband } from "@/lib/motion";
import { haptic } from "@/lib/haptics";
import { cn } from "@/lib/utils";

/**
 * A sheet you can throw away.
 *
 * It enters and exits along the same axis it came from, tracks the finger 1:1
 * from wherever it was grabbed, resists past its open bound instead of
 * stopping dead, and hands the release velocity to the spring so there is no
 * seam between dragging and animating.
 *
 * Dismissal is decided by the *velocity sign* first, not position: a short,
 * fast flick should dismiss even from near-open, because that is what the
 * gesture said to do. Position only decides when the release was slow.
 */
export function Sheet({
  open,
  onClose,
  children,
  label,
  className,
  offsetTop = 0,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  label: string;
  className?: string;
  /** Distance from the viewport top the panel starts at (e.g. under a header). */
  offsetTop?: number;
}) {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);
  const height = useRef(0);
  const running = useRef<AnimationPlaybackControls | null>(null);
  const tracker = useRef(new VelocityTracker());
  const gesture = useRef({ active: false, startPointer: 0, startY: 0, moved: false });

  const measure = useCallback(() => {
    height.current = panelRef.current?.offsetHeight ?? 0;
  }, []);

  useLayoutEffect(() => {
    if (!open) return;
    measure();
    y.set(0);
  }, [open, measure, y]);

  /**
   * Focus management. `aria-modal="true"` is a promise that the rest of the
   * page is unreachable — without moving focus in, trapping Tab, and handing
   * focus back on close, that promise is false for anyone using a keyboard.
   */
  useEffect(() => {
    if (!open) return;
    const returnTo = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;

    const focusables = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) ?? []
      ).filter((el) => el.offsetParent !== null);

    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      // Wrap at both ends so Tab can never land on the page behind.
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      returnTo?.focus();
    };
  }, [open, onClose]);

  /**
   * The panel is `lg:hidden`, but `open` is state that a resize does not touch.
   * Crossing the breakpoint while open otherwise leaves a `display: none`
   * dialog holding the scroll lock, with its own close button hidden too.
   */
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    if (mq.matches) onClose();
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) onClose();
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [open, onClose]);

  const stop = useCallback(() => {
    running.current?.stop();
    running.current = null;
  }, []);

  const settle = useCallback(
    (target: number, velocity: number, dismiss: boolean) => {
      stop();
      running.current = animate(y, target, {
        type: "spring",
        stiffness: 320,
        damping: dismiss ? 36 : 30,
        velocity,
        restDelta: 0.5,
        onComplete: () => {
          if (dismiss) onClose();
        },
      });
      // Fires with the spring, not after it — the touch and the feel land together.
      haptic(dismiss ? "commit" : "snap");
    },
    [onClose, stop, y]
  );

  // A drag that happens to end over a link must not also navigate.
  function suppressClickAfterDrag(e: React.MouseEvent) {
    if (gesture.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      gesture.current.moved = false;
    }
  }

  function onPointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    if (reduce) return;
    // Interrupt: whatever the sheet was doing, it now belongs to the finger and
    // continues from its live on-screen position.
    stop();
    e.currentTarget.setPointerCapture(e.pointerId);
    gesture.current = { active: true, startPointer: e.clientY, startY: y.get(), moved: false };
    tracker.current.reset();
    tracker.current.add(e.clientY);
    measure();
  }

  function onPointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    const g = gesture.current;
    if (!g.active) return;
    tracker.current.add(e.clientY);
    const delta = e.clientY - g.startPointer;
    // ~10px of hysteresis before this counts as a drag, so a slightly shaky
    // tap on a nav link still reads as a tap.
    if (Math.abs(delta) > 10) g.moved = true;
    const next = g.startY + delta;
    // Free upward (toward dismissal); resisted downward, since there is nothing
    // further to open into.
    y.set(next <= 0 ? next : rubberband(next, height.current || 1));
  }

  function onPointerUp(e: ReactPointerEvent<HTMLDivElement>) {
    const g = gesture.current;
    if (!g.active) return;
    g.active = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }

    const velocity = tracker.current.velocity;
    const current = y.get();
    const h = height.current || 1;
    const projected = current + project(velocity);

    // Velocity decides first; position is the tie-breaker for a slow release.
    const flickedAway = velocity < -420;
    const flickedBack = velocity > 420;
    const dismiss = flickedAway || (!flickedBack && projected < -h * 0.4);

    settle(dismiss ? -h : 0, velocity, dismiss);
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* A modal task dims its background — the scrim is part of the focus,
              not decoration. It fades on its own axis so it never appears to
              travel with the sheet. */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            aria-hidden
            className="fixed inset-0 z-40 bg-ink-950/35 lg:hidden"
            style={{ top: offsetTop }}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            style={{ y, top: offsetTop, touchAction: "none" }}
            // Materialize: blur and scale resolve together so the panel reads as
            // a surface arriving, not an image cross-fading. Exit mirrors entry.
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -24, filter: "blur(10px)" }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -24, filter: "blur(10px)" }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onClickCapture={suppressClickAfterDrag}
            className={cn(
              "fixed inset-x-0 z-50 material-thick shadow-material will-change-transform lg:hidden",
              className
            )}
          >
            {/* Grab handle sits at the edge the sheet leaves by — this one
                dismisses upward, so the affordance belongs at the top. A handle
                placed away from the dismissal edge mis-maps the gesture. */}
            {!reduce && (
              <div className="flex justify-center pb-1 pt-2.5" aria-hidden>
                <span className="h-1 w-9 rounded-full bg-ink-900/15 dark:bg-white/25" />
              </div>
            )}

            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
