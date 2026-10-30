import { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";

/** Caso B: single PNG — ring/core split via radial CSS masks. */
const SRC_RING = "/fx/skoll-hati.png";
const SRC_CORE = "/fx/skoll-hati.png";

export default function HeroEmblem() {
  const root = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(root, { margin: "100px" });
  const [ready, setReady] = useState(() => {
    if (typeof document === "undefined") return true;
    return !document.querySelector("[data-preloader]");
  });

  useEffect(() => {
    if (ready) return;
    const go = () => setReady(true);
    window.addEventListener("preloader:done", go, { once: true });
    return () => window.removeEventListener("preloader:done", go);
  }, [ready]);

  const { scrollY, scrollYProgress: p } = useScroll({
    target: root,
    offset: ["start start", "end start"],
  });
  const y = useTransform(p, [0, 1], [0, 140]);
  const scale = useTransform(p, [0, 1], [1, 1.18]);
  const fade = useTransform(p, [0, 0.7, 1], [1, 0.5, 0]);

  const vel = useSpring(useVelocity(scrollY), { stiffness: 80, damping: 30 });
  const ringAngle = useMotionValue(0);
  const ghostAngle = useMotionValue(0);
  /** Wolves chase forever — clockwise with the runic ring. */
  const coreAngle = useMotionValue(0);
  useAnimationFrame((_, delta) => {
    if (reduce || !inView) return;
    const dt = delta / 1000;
    const boost = Math.min(Math.abs(vel.get()) / 2000, 1.5);
    // Clockwise (CSS positive = right / clock hands) for wolves + rings.
    ringAngle.set(ringAngle.get() + dt * (3 + boost * 20));
    ghostAngle.set(ghostAngle.get() + dt * (1.8 + boost * 10));
    coreAngle.set(coreAngle.get() + dt * (2.4 + boost * 14));
  });

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (event: PointerEvent) => {
      mx.set(event.clientX / window.innerWidth - 0.5);
      my.set(event.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, mx, my]);

  const coreX = useTransform(sx, [-0.5, 0.5], [-14, 14]);
  const coreY = useTransform(sy, [-0.5, 0.5], [-10, 10]);
  const tiltY = useTransform(sx, [-0.5, 0.5], [-6, 6]);
  const tiltX = useTransform(sy, [-0.5, 0.5], [5, -5]);
  const ringX = useTransform(sx, [-0.5, 0.5], [8, -8]);
  const ringY = useTransform(sy, [-0.5, 0.5], [6, -6]);

  const entryAnimate = reduce
    ? { opacity: 1, scale: 1, rotate: 0 }
    : { opacity: 1, scale: 1, rotate: 0 };
  const entryInitial = reduce
    ? { opacity: 0.12, scale: 1, rotate: 0 }
    : { opacity: 0, scale: 0.86, rotate: -18 };

  return (
    <div ref={root} className="hero-emblem" aria-hidden="true">
      <motion.div
        className="emblem-entry"
        initial={entryInitial}
        animate={ready ? entryAnimate : undefined}
        transition={{ duration: reduce ? 0 : 2.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="emblem-stage"
          style={reduce ? { opacity: 1 } : { y, scale, opacity: fade }}
        >
          <div className="emblem-halo" />

          {!reduce ? (
            <motion.div
              className="emblem-layer"
              style={{ rotate: ghostAngle, scale: 1.16, x: ringX, y: ringY }}
            >
              <img
                className="emblem-img emblem-ring emblem-ring--ghost"
                src={SRC_RING}
                alt=""
                draggable={false}
              />
            </motion.div>
          ) : null}

          <motion.div
            className="emblem-layer"
            style={reduce ? undefined : { rotate: ringAngle, x: ringX, y: ringY }}
          >
            <img className="emblem-img emblem-ring" src={SRC_RING} alt="" draggable={false} />
          </motion.div>

          <motion.div
            className="emblem-layer emblem-core-wrap"
            style={
              reduce
                ? undefined
                : { x: coreX, y: coreY, rotate: coreAngle, rotateX: tiltX, rotateY: tiltY }
            }
            animate={reduce ? undefined : { scale: [1, 1.025, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          >
            <img className="emblem-img emblem-core" src={SRC_CORE} alt="" draggable={false} />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
