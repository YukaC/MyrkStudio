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

/** Editorial surface with optional status chip (plazas panel, dossier). */
export function Panel({ title, badge, badgeClassName = "text-accent", children, className }: PanelProps) {
  return (
    <div className={`panel overflow-hidden ${className ?? ""}`}>
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-5">
        <span className="font-editorial text-sm tracking-[0.08em] text-cream/60 uppercase">{title}</span>
        {badge ? (
          <span className={`font-term text-[0.65rem] tracking-wider uppercase ${badgeClassName}`}>
            {badge}
          </span>
        ) : null}
      </div>
      {children}
    </div>
  );
}
