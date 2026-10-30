import type { ReactNode } from "react";

type SectionHeaderProps = {
  /** Editorial section index, e.g. "02" */
  index?: string;
  title: string;
  titleId?: string;
  log?: { main: string; tail: string };
  blurb?: ReactNode;
  isTitleHidden?: boolean;
  blurbClassName?: string;
};

const DEFAULT_BLURB_CLASS = "editorial-section-blurb";

export function SectionHeader({
  index,
  title,
  titleId,
  log,
  blurb,
  isTitleHidden = false,
  blurbClassName = DEFAULT_BLURB_CLASS,
}: SectionHeaderProps) {
  const kicker = log ? (
    <p className="editorial-section-kicker" data-reveal="">
      {index ? <span className="editorial-section-index">{index}</span> : null}
      <span>
        <b>{log.main}</b>
        <span className="text-faint"> · </span>
        {log.tail}
      </span>
    </p>
  ) : index ? (
    <p className="editorial-section-kicker" data-reveal="">
      <span className="editorial-section-index">{index}</span>
    </p>
  ) : null;

  const titleClass = isTitleHidden ? "sr-only" : "editorial-section-title";

  return (
    <div className="editorial-section-head">
      {kicker}
      <h2
        id={titleId}
        className={titleClass}
        {...(isTitleHidden ? {} : { "data-split": "lines" })}
      >
        {title}
      </h2>
      {blurb ? (
        <p className={blurbClassName} data-reveal="">
          {blurb}
        </p>
      ) : null}
    </div>
  );
}
