import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Outlet, useLocation } from "react-router-dom";
import type { MultiLocationState, MultiSlideDirection } from "../hooks/useMultiSectionScroll";

const routeVariants = {
  initial: (slide: MultiSlideDirection | undefined) => ({
    opacity: 0,
    y: slide === "prev" ? -28 : 28,
    scale: 0.985,
    filter: "blur(6px)",
  }),
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: (slide: MultiSlideDirection | undefined) => ({
    opacity: 0,
    y: slide === "prev" ? 28 : -28,
    scale: 0.985,
    filter: "blur(4px)",
  }),
};

const reducedVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

/** Route-level cinematic transition; pairs with shared section titles (layoutId). */
export function MultiAnimatedOutlet() {
  const location = useLocation();
  const reducedMotion = useReducedMotion();
  const slide = (location.state as MultiLocationState | null)?.multiSlide;
  const variants = reducedMotion ? reducedVariants : routeVariants;

  return (
    <AnimatePresence mode="wait" custom={slide}>
      <motion.div
        key={location.pathname}
        custom={slide}
        className="multi-outlet-layer flex min-h-0 flex-1 flex-col"
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={
          reducedMotion
            ? { duration: 0.15 }
            : { duration: 0.42, ease: [0.23, 1, 0.32, 1] }
        }
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}
