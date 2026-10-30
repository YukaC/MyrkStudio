import type { ReactNode } from "react";

type StaggerTag = "div" | "ul" | "ol";

type EditorialScrollStaggerProps = {
  children: ReactNode;
  className?: string;
  as?: StaggerTag;
  /** Kept for call-site compatibility; GSAP data-reveal owns timing. */
  stagger?: number;
};

/** Structural stagger wrapper — enter motion is GSAP via `data-reveal="stagger"`. */
export function EditorialScrollStagger({
  children,
  className,
  as = "div",
}: EditorialScrollStaggerProps) {
  if (as === "ul") {
    return (
      <ul className={className} data-reveal="stagger">
        {children}
      </ul>
    );
  }
  if (as === "ol") {
    return (
      <ol className={className} data-reveal="stagger">
        {children}
      </ol>
    );
  }
  return (
    <div className={className} data-reveal="stagger">
      {children}
    </div>
  );
}

type EditorialScrollItemProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
};

export function EditorialScrollItem({
  children,
  className,
  as = "div",
}: EditorialScrollItemProps) {
  if (as === "li") {
    return <li className={className}>{children}</li>;
  }
  if (as === "article") {
    return <article className={className}>{children}</article>;
  }
  return <div className={className}>{children}</div>;
}
