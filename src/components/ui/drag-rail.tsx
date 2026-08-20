"use client";

import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type AnimationPlaybackControls,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { VelocityTracker, nearestSnapPoint, project, rubberbandClamp, springSnappy } from "@/lib/motion";
import { haptic } from "@/lib/haptics";
import { cn } from "@/lib/utils";

/**
 * A horizontally draggable rail with Apple's fluid-gesture behaviour:
 *
 *  - 1:1 tracking from the exact grab point (pointer capture keeps tracking
 *    alive even when the pointer leaves the element)
 *  - momentum projection on release — the flick lands where the gesture was
 *    *going*, not at the nearest card to where the finger left
 *  - velocity handoff, so there is no seam between dragging and animating
 *  - rubber-banding at both ends instead of a hard stop
 *  - fully interruptible: grabbing a moving rail stops it at its live position
 *
 * Under `prefers-reduced-motion` this degrades to native scroll with CSS snap,
 * which keeps the content reachable without any of the inertial travel.
 */
export function DragRail({
  children,
  label,
  className,
  itemClassName,
}: {
  children: ReactNode[];
  label: string;
  className?: string;
  itemClassName?: string;
}) {
  const reduce = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const x = useMotionValue(0);
  const runningAnimation = useRef<AnimationPlaybackControls | null>(null);
  const tracker = useRef(new VelocityTracker());
  const gesture = useRef({ active: false, startPointer: 0, startX: 0, moved: false });

  const [maxDrag, setMaxDrag] = useState(0);
  const [snapPoints, setSnapPoints] = useState<number[]>([0]);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  /** 0 → 1 across the rail's travel, for the position track. */
  const progress = useTransform(x, [0, -Math.max(maxDrag, 1)], [0, 1], { clamp: true });

  /** Recompute bounds and snap targets from live layout. */
  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const overflow = Math.max(0, track.scrollWidth - viewport.clientWidth);
    setMaxDrag(overflow);

    const trackLeft = track.getBoundingClientRect().left - x.get();
    const points = itemRefs.current
      .filter((el): el is HTMLDivElement => el !== null)
      .map((el) => {
        const offset = el.getBoundingClientRect().left - trackLeft;
        return -Math.min(offset, overflow);
      });
    // Always include the exact far bound. Card offsets are measured from live
    // layout and can land a few pixels short of `overflow`, which used to leave
    // the rail unable to reach its end — so the "next" arrow never disabled and
    // the position track never filled.
    setSnapPoints([...new Set([0, ...points, -overflow])].sort((a, b) => b - a));

    // A resize can leave the rail scrolled past the new end.
    if (x.get() < -overflow) x.set(-overflow);
    if (x.get() > 0) x.set(0);
  }, [x]);

  useLayoutEffect(() => {
    measure();
    const viewport = viewportRef.current;
    if (!viewport || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    ro.observe(viewport);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, [measure]);

  useEffect(() => {
    const update = (v: number) => {
      // A 1px tolerance would leave the arrow enabled after a spring settles a
      // hair short of the bound; 4px is still visually "at the end".
      setAtStart(v > -4);
      setAtEnd(v < -maxDrag + 4);
    };
    update(x.get());
    return x.on("change", update);
  }, [x, maxDrag]);

  const stopAnimation = useCallback(() => {
    runningAnimation.current?.stop();
    runningAnimation.current = null;
  }, []);

  /**
   * An `overflow: hidden` box is still a scroll container: the browser scrolls
   * it to reveal a focused descendant, and script can set `scrollLeft` directly.
   * Either one moves the content without touching `x`, so the rail's position
   * state starts lying — arrows disabled at the wrong end, the next drag jumping.
   *
   * The container is therefore never allowed to hold scroll. Whatever offset it
   * takes is zeroed and re-expressed through the transform, leaving the focused
   * card exactly where the browser put it.
   *
   * Applied instantly rather than sprung, for two reasons. A spring leaves the
   * card transiently out of view, so the browser scrolls again to chase it and
   * the two settle at a wrong resting position. And this path is keyboard-
   * driven, where animation is only lag.
   */
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || reduce) return;
    const onScroll = () => {
      const shift = viewport.scrollLeft;
      if (shift === 0) return;
      viewport.scrollLeft = 0;
      runningAnimation.current?.stop();
      runningAnimation.current = null;
      x.set(Math.max(-maxDrag, Math.min(0, x.get() - shift)));
    };
    viewport.addEventListener("scroll", onScroll);
    return () => viewport.removeEventListener("scroll", onScroll);
  }, [reduce, maxDrag, x]);

  /**
   * Bring a keyboard-focused card into view ourselves.
   *
   * Zeroing the container's scroll (above) means the browser can no longer do
   * this for us in both directions: `scrollLeft` cannot go below zero, so once
   * the transform has carried content leftward the browser is structurally
   * unable to reveal an *earlier* card. Measuring the focused item against the
   * viewport and moving `x` works either way.
   */
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || reduce) return;
    const PAD = 16;
    const onFocusIn = (e: FocusEvent) => {
      const item = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-rail-item]");
      if (!item) return;
      viewport.scrollLeft = 0;
      const vp = viewport.getBoundingClientRect();
      const it = item.getBoundingClientRect();
      let dx = 0;
      if (it.left < vp.left + PAD) dx = vp.left + PAD - it.left;
      else if (it.right > vp.right - PAD) dx = vp.right - PAD - it.right;
      if (dx === 0) return;
      runningAnimation.current?.stop();
      runningAnimation.current = null;
      x.set(Math.max(-maxDrag, Math.min(0, x.get() + dx)));
    };
    viewport.addEventListener("focusin", onFocusIn);
    return () => viewport.removeEventListener("focusin", onFocusIn);
  }, [reduce, maxDrag, x]);

  /** Spring to a target, carrying the gesture's release velocity into it. */
  const springTo = useCallback(
    (target: number, velocity: number) => {
      stopAnimation();
      runningAnimation.current = animate(x, target, {
        type: "spring",
        // Critically damped when settling from rest; a touch of overshoot is
        // only appropriate here because a physical flick preceded it.
        stiffness: 220,
        damping: 28,
        velocity,
        restDelta: 0.5,
      });
      // Only a real throw earns a haptic. Arrow clicks and slow drags settle
      // silently — feedback on every landing would train people to ignore it.
      if (Math.abs(velocity) > 220) haptic("snap");
    },
    [stopAnimation, x]
  );

  function onPointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    if (reduce || maxDrag <= 0) return;

    // Interrupt: the rail stops exactly where it is on screen, never jumping
    // to the animation's target value.
    stopAnimation();

    e.currentTarget.setPointerCapture(e.pointerId);
    gesture.current = {
      active: true,
      startPointer: e.clientX,
      startX: x.get(),
      moved: false,
    };
    tracker.current.reset();
    tracker.current.add(e.clientX);
  }

  function onPointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    const g = gesture.current;
    if (!g.active) return;

    const delta = e.clientX - g.startPointer;
    if (Math.abs(delta) > 8) g.moved = true;

    tracker.current.add(e.clientX);

    // Track the finger 1:1 inside the bounds, and resist progressively outside.
    const viewportWidth = viewportRef.current?.clientWidth ?? 1;
    x.set(rubberbandClamp(g.startX + delta, -maxDrag, 0, viewportWidth));
  }

  function onPointerUp(e: ReactPointerEvent<HTMLDivElement>) {
    const g = gesture.current;
    if (!g.active) return;
    g.active = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }

    const velocity = tracker.current.velocity;
    const current = x.get();

    // Already outside the bounds — spring straight back to the edge.
    if (current > 0 || current < -maxDrag) {
      springTo(current > 0 ? 0 : -maxDrag, velocity);
      return;
    }

    // Project where the flick would come to rest, then snap to the card
    // nearest *that* point rather than nearest the release point.
    const projected = current + project(velocity);
    const clamped = Math.max(-maxDrag, Math.min(0, projected));
    springTo(nearestSnapPoint(clamped, snapPoints), velocity);
  }

  /** Step one viewport-width, used by the arrows and by keyboard users. */
  const step = useCallback(
    (direction: 1 | -1) => {
      const viewportWidth = viewportRef.current?.clientWidth ?? 0;
      const target = Math.max(-maxDrag, Math.min(0, x.get() - direction * viewportWidth * 0.8));
      springTo(nearestSnapPoint(target, snapPoints), 0);
    },
    [maxDrag, snapPoints, springTo, x]
  );

  // Suppress the click that follows a drag, so flicking a rail of links
  // doesn't navigate.
  function onClickCapture(e: React.MouseEvent) {
    if (gesture.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      gesture.current.moved = false;
    }
  }

  if (reduce) {
    return (
      <div className={className}>
        <div
          role="region"
          aria-label={label}
          tabIndex={0}
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
        >
          {children.map((child, i) => (
            <div key={i} className={cn("shrink-0 snap-start self-stretch", itemClassName)}>
              {child}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div
        ref={viewportRef}
        role="region"
        aria-label={label}
        className="overflow-hidden"
        style={{ touchAction: "pan-y" }}
      >
        <motion.div
          ref={trackRef}
          style={{ x, cursor: maxDrag > 0 ? "grab" : "default" }}
          whileTap={maxDrag > 0 ? { cursor: "grabbing" } : undefined}
          className="flex gap-5 will-change-transform"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onClickCapture={onClickCapture}
        >
          {children.map((child, i) => (
            <div
              key={i}
              data-rail-item
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className={cn("shrink-0 self-stretch", itemClassName)}
            >
              {child}
            </div>
          ))}
        </motion.div>
      </div>

      {maxDrag > 0 && (
        <div className="mt-8 flex items-center gap-3">
          <RailButton label={`Scroll ${label} left`} disabled={atStart} onClick={() => step(-1)}>
            <ChevronLeft size={19} strokeWidth={2.25} />
          </RailButton>
          <RailButton label={`Scroll ${label} right`} disabled={atEnd} onClick={() => step(1)}>
            <ChevronRight size={19} strokeWidth={2.25} />
          </RailButton>

          {/* Position track. Answers "how much more is there?" — the arrows
              alone say a direction exists but not how far it runs. It tracks
              the same motion value as the rail, so it moves with the finger
              during a drag rather than catching up afterwards. */}
          <div
            aria-hidden
            className="relative ml-2 h-[3px] w-24 overflow-hidden rounded-full bg-ink-900/10 dark:bg-white/15"
          >
            <motion.span
              style={{ scaleX: progress }}
              className="absolute inset-0 origin-left rounded-full bg-ink-900/45 dark:bg-white/55"
            />
          </div>
        </div>
      )}
    </div>
  );
}

function RailButton({
  children,
  label,
  disabled,
  onClick,
}: {
  children: ReactNode;
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileTap={disabled ? undefined : { scale: 0.9 }}
      transition={springSnappy}
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex h-12 w-12 items-center justify-center rounded-full border transition-[opacity,background-color,border-color,color] duration-200 ease-out-strong",
        disabled
          // Dimmed, but still legible. The previous 45% opacity read as a
          // rendering fault rather than a disabled control.
          ? "cursor-not-allowed border-ink-900/10 text-ink-400 dark:border-white/10 dark:text-white/25"
          : "border-ink-900/15 bg-white text-ink-900 shadow-card hover:border-ink-900/30 hover:bg-ink-50 dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/10"
      )}
    >
      {children}
    </motion.button>
  );
}
