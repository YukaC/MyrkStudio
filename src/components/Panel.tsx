import type { ReactNode } from "react";

type PanelProps = {
  /** Small label in the header bar (e.g. "status · whitelist") */
  title: string;
  /** Status chip on the right of the header bar */
  badge?: string;
  /** Tailwind text class for the badge (e.g. "text-success") */
  badgeClassName?: string;
  children: ReactNode;
  className?: string;
};

export function Panel({ title, badge, badgeClassName = "text-accent", children, className }: PanelProps) {
  return (
    <div className={`panel overflow-hidden ${className ?? ""}`}>
      <div className="flex items-center justify-between gap-3 border-b border-line bg-black/50 px-4 py-2.5 sm:px-5">
        <span className="font-term text-[0.7rem] tracking-wider text-faint uppercase">{title}</span>
        {badge ? <span className={`font-term text-[0.65rem] ${badgeClassName}`}>{badge}</span> : null}
      </div>
      {children}
    </div>
  );
}
