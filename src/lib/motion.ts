/**
 * Motion primitives, following Apple's fluid-interface model.
 *
 * Apple parameterises springs by *damping ratio* (overshoot) and *response*
 * (seconds to reach the target) rather than mass/stiffness/damping. Framer
 * Motion's `bounce` + `duration` spring API maps onto that almost directly:
 *   bounce   = 1 - dampingRatio
 *   duration = response
 *
 * House style is critically damped (bounce 0) everywhere. Overshoot is
 * reserved for motion the user physically threw — a flick or a drag release.
 */

export type Spring = {
  type: "spring";
  bounce: number;
  duration: number;
};

/** Critically damped. The default for anything that isn't momentum-driven. */
export const springDefault: Spring = { type: "spring", bounce: 0, duration: 0.4 };

/** Snappier critical damping, for small elements (chips, icons, toggles). */
export const springSnappy: Spring = { type: "spring", bounce: 0, duration: 0.28 };

/** Slight overshoot — only after a gesture carried momentum into it. */
export const springMomentum: Spring = { type: "spring", bounce: 0.18, duration: 0.4 };

/** Sheets and drawers: Apple ships damping 0.8 / response 0.3 here. */
export const springSheet: Spring = { type: "spring", bounce: 0.2, duration: 0.3 };

/** Matches the existing `ease-out-strong` token, for non-spring transitions. */
export const easeOutStrong = [0.23, 1, 0.32, 1] as const;

/**
 * Where a flick would come to rest, using the same exponential-decay model as
 * scroll deceleration. This is Apple's projection function from the Designing
 * Fluid Interfaces sample code — not the textbook v^2/(2a), which lands short.
 *
 * @param initialVelocity px/s at release
 * @param decelerationRate 0.998 reads like normal scroll; 0.99 is snappier
 */
export function project(initialVelocity: number, decelerationRate = 0.998): number {
  return ((initialVelocity / 1000) * decelerationRate) / (1 - decelerationRate);
}

/**
 * Progressive resistance past a boundary. A hard stop reads as "frozen"; this
 * reads as "responsive, but there's nothing more here."
 *
 * @param overshoot how far past the bound the pointer has travelled
 * @param dimension the size of the scrollable/draggable axis
 */
export function rubberband(overshoot: number, dimension: number, constant = 0.55): number {
  if (dimension === 0) return 0;
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));
}

/** Clamp with rubber-banding outside [min, max] rather than a hard cut. */
export function rubberbandClamp(value: number, min: number, max: number, dimension: number): number {
  if (value > max) return max + rubberband(value - max, dimension);
  if (value < min) return min - rubberband(min - value, dimension);
  return value;
}

/** Nearest snap point to a projected resting position. */
export function nearestSnapPoint(projected: number, snapPoints: number[]): number {
  return snapPoints.reduce(
    (best, p) => (Math.abs(p - projected) < Math.abs(best - projected) ? p : best),
    snapPoints[0] ?? 0
  );
}

/**
 * Tracks recent pointer samples so a gesture can hand its release velocity to
 * the spring that follows it. Using only the last two events makes velocity
 * jittery; a short window smooths it without adding lag.
 */
export class VelocityTracker {
  private samples: { value: number; time: number }[] = [];
  constructor(private windowMs = 100) {}

  add(value: number, time = performance.now()) {
    this.samples.push({ value, time });
    const cutoff = time - this.windowMs;
    while (this.samples.length > 2 && this.samples[0].time < cutoff) {
      this.samples.shift();
    }
  }

  /** px/s over the tracked window. Zero if there isn't enough history. */
  get velocity(): number {
    if (this.samples.length < 2) return 0;
    const first = this.samples[0];
    const last = this.samples[this.samples.length - 1];
    const dt = last.time - first.time;
    if (dt <= 0) return 0;
    return ((last.value - first.value) / dt) * 1000;
  }

  reset() {
    this.samples = [];
  }
}
