import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useMyrkMultiChrome } from "../hooks/useMyrkMultiChrome";

type SectionHeaderProps = {
  title: string;
  /** Required whenever the section wraps this in aria-labelledby */
  titleId?: string;
  /** Label line: main text bolded, tail after "//" */
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
  const isMyrkMulti = useMyrkMultiChrome();

  const kicker = log ? (
    isMyrkMulti ? (
      <p className="myrk-section-kicker mb-3">
        <b>{log.main}</b>
        <span className="text-faint"> · </span>
        {log.tail}
      </p>
    ) : (
      <p className="log-label mb-3">
        [LOG] <b>{log.main}</b> // {log.tail}
      </p>
    )
  ) : null;

  const titleClass = isTitleHidden ? "sr-only" : "section-title";
  const titleEl =
    isMyrkMulti && !isTitleHidden ? (
      <motion.h2
        id={titleId}
        layoutId="myrk-section-title"
        className={titleClass}
        transition={{ type: "spring", stiffness: 380, damping: 34 }}
      >
        {title}
      </motion.h2>
    ) : (
      <h2 id={titleId} className={titleClass}>
        {title}
      </h2>
    );

  return (
    <>
      {kicker}
      {titleEl}
      {blurb ? <p className={blurbClassName}>{blurb}</p> : null}
    </>
  );
}
