import type { CSSProperties, ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type EditorialCardProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "a";
  href?: string;
  target?: string;
  rel?: string;
};

/** Stagger-friendly surface card (21st-inspired grid depth, MYRK tokens). */
export function EditorialCard({
  children,
  className = "",
  style,
  as = "div",
  href,
  target,
  rel,
}: EditorialCardProps) {
  const reducedMotion = useReducedMotion();
  const mergedClass = `editorial-card ${className}`.trim();

  const motionProps = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-8% 0px" },
        transition: { duration: 0.45, ease: [0.23, 1, 0.32, 1] as const },
      };

  if (as === "a" && href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        className={mergedClass}
        style={style}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.div className={mergedClass} style={style} {...motionProps}>
      {children}
    </motion.div>
  );
}
