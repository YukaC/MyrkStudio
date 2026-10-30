import type { ReactNode } from "react";

type EditorialScrollRevealProps = {
  children: ReactNode;
  className?: string;
  /** Kept for call-site compatibility; GSAP data-reveal owns timing. */
  delay?: number;
};

/** Structural block wrapper — enter motion is GSAP via `data-reveal`. */
export function EditorialScrollReveal({ children, className }: EditorialScrollRevealProps) {
  return (
    <div className={className} data-reveal="">
      {children}
    </div>
  );
}
