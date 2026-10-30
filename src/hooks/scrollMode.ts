/**
 * Which engine owns scrolling.
 *
 * `smooth` = Lenis drives the wheel (desktop only).
 * `native` = the browser owns the gesture.
 *
 * Touch devices stay native on purpose. Lenis cannot drive a touch gesture
 * (`syncTouch` off), but its wheel/touch handlers still sit in front of the
 * scroller, and a downward swipe on Android starts pull-to-refresh, which the
 * browser claims and answers with `touchcancel` — the report "I can scroll down
 * but not back up". Native momentum also feels better than a hijacked one.
 */
export type ScrollMode = "smooth" | "native";

export type ScrollEnvironment = {
  reducedMotion: boolean;
  /** `(pointer: fine)` — mouse, trackpad or stylus. */
  finePointer: boolean;
  /** `(hover: hover)` — excludes touch screens that emulate a fine pointer. */
  canHover: boolean;
};

export function resolveScrollMode(env: ScrollEnvironment): ScrollMode {
  if (env.reducedMotion) return "native";
  return env.finePointer && env.canHover ? "smooth" : "native";
}

/** Reads the live media queries and resolves the current engine. */
export function detectScrollMode(): ScrollMode {
  if (typeof window === "undefined") return "native";
  return resolveScrollMode({
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    finePointer: window.matchMedia("(pointer: fine)").matches,
    canHover: window.matchMedia("(hover: hover)").matches,
  });
}
