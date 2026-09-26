import type { ReactNode } from "react";

type SectionHeaderProps = {
  title: string;
  titleId?: string;
  /** [LOG] label line: main text bolded, tail after "//" */
  log?: { main: string; tail: string };
  blurb?: ReactNode;
  /** Hidden h2 for sections whose visible label is the log line (a11y keeps the heading) */
  isTitleHidden?: boolean;
  blurbClassName?: string;
};

export function SectionHeader({
  title,
  titleId,
  log,
  blurb,
  isTitleHidden = false,
  blurbClassName = "mb-6",
}: SectionHeaderProps) {
  return (
    <>
      {log ? (
        <p className="log-label mb-3">
          [LOG] <b>{log.main}</b> // {log.tail}
        </p>
      ) : null}
      <h2
        id={titleId}
        className={isTitleHidden ? "sr-only" : "section-title"}
      >
        {title}
      </h2>
      {blurb ? <p className={`prose-muted ${blurbClassName}`}>{blurb}</p> : null}
    </>
  );
}
