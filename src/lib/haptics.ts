/**
 * Haptic feedback, used sparingly.
 *
 * Three rules govern every call site here:
 *  - Causality: fire on the actual causal event (the snap landing, the submit
 *    succeeding) — never on hover, scroll, or arrival at a screen.
 *  - Harmony: fire on the same frame as the visual change, so the two read as
 *    one event rather than two.
 *  - Utility: reserve it for moments that mean something. Over-feedback trains
 *    people to ignore all of it, which costs the moments that matter.
 *
 * The Vibration API is unsupported on iOS Safari and is a no-op there; this is
 * deliberately an enhancement, never the only signal for anything.
 */

type Pattern = "select" | "commit" | "snap" | "error";

const patterns: Record<Pattern, number | number[]> = {
  /** Light tick — a discrete choice landed (tab switch, filter applied). */
  select: 8,
  /** Firmer confirmation — something was submitted or completed. */
  commit: [12, 40, 18],
  /** A thrown element reached its resting position. */
  snap: 10,
  /** Something went wrong and needs attention. */
  error: [18, 60, 18],
};

export function haptic(pattern: Pattern = "select") {
  if (typeof window === "undefined") return;
  if (!("vibrate" in navigator)) return;
  // Browsers reject vibration before the page has had a real user gesture, and
  // log an error when you try. Check first rather than emitting console noise
  // on every programmatic or pre-interaction call.
  const activation = (navigator as Navigator & { userActivation?: { hasBeenActive: boolean } })
    .userActivation;
  if (activation && !activation.hasBeenActive) return;
  // Someone who has asked for reduced motion has not asked for less haptics,
  // but pairing a buzz with motion we have suppressed reads as noise.
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
  try {
    navigator.vibrate(patterns[pattern]);
  } catch {
    // Vibration is best-effort; a blocked or unsupported call is not an error.
  }
}
