import { useEffect, useRef, type RefObject } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MULTI_SCROLL_PATHS } from "../content";

const WHEEL_THRESHOLD = 24;
const TOUCH_THRESHOLD = 36;
/** ≥ multi-section enter (380ms) so cooldown outlives the settle. */
const COOLDOWN_MS = 420;

export type MultiSlideDirection = "next" | "prev";

export type MultiLocationState = {
  multiSlide?: MultiSlideDirection;
};

function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  return Boolean(target.closest("input, textarea, select, [contenteditable='true']"));
}

/**
 * Only FAQ/form frames (`data-scroll="true"`) gate section jumps.
 * Clipped one-screen frames often have scrollHeight > clientHeight on mobile
 * while overflow is hidden — treating them as scrollers blocks swipe forever.
 */
function canNavigatePastInnerScroll(target: EventTarget | null, deltaY: number): boolean {
  if (!(target instanceof Element)) return true;
  const scroller = target.closest<HTMLElement>(".multi-frame-body");
  if (!scroller) return true;
  if (scroller.dataset.scroll !== "true") return true;

  const { scrollTop, scrollHeight, clientHeight } = scroller;
  const maxScroll = scrollHeight - clientHeight;
  if (maxScroll <= 1) return true;

  if (deltaY > 0) return scrollTop >= maxScroll - 1;
  if (deltaY < 0) return scrollTop <= 1;
  return true;
}

/**
 * Wheel / touch → next|prev multi route. Cooldown + edge-aware for FAQ/form scroll.
 * Passes `state.multiSlide` so PageFrame owns the enter class (reliable remount anim).
 */
export function useMultiSectionScroll(shellRef: RefObject<HTMLElement | null>) {
  const navigate = useNavigate();
  const location = useLocation();
  const cooldownRef = useRef(false);
  const cooldownTimerRef = useRef(0);
  const wheelAccRef = useRef(0);
  const touchStartYRef = useRef<number | null>(null);
  /** Live path without re-binding listeners on every section change (mobile stuck). */
  const pathnameRef = useRef(location.pathname);
  pathnameRef.current = location.pathname;

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const root = shell;
    const paths = MULTI_SCROLL_PATHS.map(normalizePath);

    function currentIndex(): number {
      const path = normalizePath(pathnameRef.current);
      return paths.indexOf(path as (typeof paths)[number]);
    }

    function releaseCooldown() {
      cooldownRef.current = false;
    }

    function go(direction: 1 | -1) {
      if (cooldownRef.current) return false;
      const index = currentIndex();
      if (index < 0) return false;
      const nextPath = paths[index + direction];
      if (!nextPath) return false;

      cooldownRef.current = true;
      wheelAccRef.current = 0;

      const slide: MultiSlideDirection = direction > 0 ? "next" : "prev";

      window.clearTimeout(cooldownTimerRef.current);
      cooldownTimerRef.current = window.setTimeout(releaseCooldown, COOLDOWN_MS);

      navigate(nextPath, { state: { multiSlide: slide } satisfies MultiLocationState });
      return true;
    }

    function onWheel(event: WheelEvent) {
      if (event.ctrlKey) return;
      if (isEditableTarget(event.target)) return;
      if (!canNavigatePastInnerScroll(event.target, event.deltaY)) return;

      // Held scroll / inertia during cooldown: absorb, don't queue a jump.
      if (cooldownRef.current) {
        event.preventDefault();
        wheelAccRef.current = 0;
        return;
      }

      wheelAccRef.current += event.deltaY;
      if (Math.abs(wheelAccRef.current) < WHEEL_THRESHOLD) return;

      const direction = wheelAccRef.current > 0 ? 1 : -1;
      const index = currentIndex();
      const canGo = index >= 0 && paths[index + direction] !== undefined;
      if (!canGo) {
        wheelAccRef.current = 0;
        return;
      }

      event.preventDefault();
      go(direction);
    }

    function onTouchStart(event: TouchEvent) {
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    }

    function onTouchEnd(event: TouchEvent) {
      const startY = touchStartYRef.current;
      touchStartYRef.current = null;
      if (startY === null) return;
      if (cooldownRef.current) return;

      const endY = event.changedTouches[0]?.clientY;
      if (endY === undefined) return;

      const deltaY = startY - endY;
      if (Math.abs(deltaY) < TOUCH_THRESHOLD) return;
      if (isEditableTarget(event.target)) return;
      if (!canNavigatePastInnerScroll(event.target, deltaY)) return;

      go(deltaY > 0 ? 1 : -1);
    }

    function onTouchCancel() {
      touchStartYRef.current = null;
    }

    root.addEventListener("wheel", onWheel, { passive: false });
    root.addEventListener("touchstart", onTouchStart, { passive: true });
    root.addEventListener("touchend", onTouchEnd, { passive: true });
    root.addEventListener("touchcancel", onTouchCancel, { passive: true });

    return () => {
      window.clearTimeout(cooldownTimerRef.current);
      releaseCooldown();
      root.removeEventListener("wheel", onWheel);
      root.removeEventListener("touchstart", onTouchStart);
      root.removeEventListener("touchend", onTouchEnd);
      root.removeEventListener("touchcancel", onTouchCancel);
    };
  }, [shellRef, navigate]);
}
