import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

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
  const reducedMotion = useReducedMotion();

  const kicker = log ? (
    <p className="editorial-section-kicker">
      {index ? <span className="editorial-section-index">{index}</span> : null}
      <span>
        <b>{log.main}</b>
        <span className="text-faint"> · </span>
        {log.tail}
      </span>
    </p>
  ) : index ? (
    <p className="editorial-section-kicker">
      <span className="editorial-section-index">{index}</span>
    </p>
  ) : null;

  const titleClass = isTitleHidden ? "sr-only" : "editorial-section-title";

  return (
    <>
      {kicker}
      {reducedMotion ? (
        <h2 id={titleId} className={titleClass}>
          {title}
        </h2>
      ) : (
        <motion.h2
          id={titleId}
          className={titleClass}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] as const }}
        >
          {title}
        </motion.h2>
      )}
      {blurb ? <p className={blurbClassName}>{blurb}</p> : null}
    </>
  );
}
