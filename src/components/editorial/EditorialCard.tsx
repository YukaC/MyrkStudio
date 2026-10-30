import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

type EditorialCardProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "a";
  href?: string;
  target?: string;
  rel?: string;
  /** Kept for call-site compatibility; GSAP owns enter motion. */
  scrollMotion?: boolean;
} & Omit<HTMLAttributes<HTMLElement>, "children" | "className" | "style">;

/** Stagger-friendly surface card (21st-inspired grid depth, MYRK tokens). */
export function EditorialCard({
  children,
  className = "",
  style,
  as = "div",
  href,
  target,
  rel,
  scrollMotion: _scrollMotion = true,
  ...rest
}: EditorialCardProps) {
  const mergedClass = `editorial-card ${className}`.trim();

  if (as === "a" && href) {
    return (
      <a href={href} target={target} rel={rel} className={mergedClass} style={style} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <div className={mergedClass} style={style} {...rest}>
      {children}
    </div>
  );
}
