import type { ReactNode } from "react";

type SectionHeaderProps = {
  title: string;
  /** Required whenever the section wraps this in aria-labelledby */
  titleId?: string;
  /** [LOG] label line: main text bolded, tail after "//" */
  log?: { main: string; tail: string };
  blurb?: ReactNode;
  /** Hidden h2 for sections whose visible label is the log line (a11y keeps the heading) */
  isTitleHidden?: boolean;
  /** Full class for the blurb; include the color you want so it never fights prose-muted */
  blurbClassName?: string;
};

const DEFAULT_BLURB_CLASS = "prose-muted mb-6";

export function SectionHeader({
  title,
  titleId,
  log,
  blurb,
  isTitleHidden = false,
  blurbClassName = DEFAULT_BLURB_CLASS,
}: SectionHeaderProps) {
  return (
    <>
      {log ? (
        <p className="log-label mb-3">
          [LOG] <b>{log.main}</b> // {log.tail}
        </p>
      ) : null}
      <h2 id={titleId} className={isTitleHidden ? "sr-only" : "section-title"}>
        {title}
      </h2>
      {blurb ? <p className={blurbClassName}>{blurb}</p> : null}
    </>
  );
}
