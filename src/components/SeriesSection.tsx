import { motion, useReducedMotion } from "motion/react";
import { SERIES_FEATURES, SERIES_SECTION } from "../content";
import { useMyrkMultiChrome } from "../hooks/useMyrkMultiChrome";
import { SectionHeader } from "./SectionHeader";

const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: [0.23, 1, 0.32, 1] as const },
  },
};

export function SeriesSection() {
  const isMyrkMulti = useMyrkMultiChrome();
  const reducedMotion = useReducedMotion();

  const features = (
    <ul className="feature-row list-none p-0">
      {SERIES_FEATURES.map((feature) => (
        <li key={feature.id} className="panel panel-hover feature-item">
          <span className="feature-index" aria-hidden>
            {feature.id}
          </span>
          <div>
            <h3 className="font-display mb-1 text-base font-semibold text-white uppercase sm:text-lg">
              {feature.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted">{feature.body}</p>
          </div>
        </li>
      ))}
    </ul>
  );

  return (
    <section id="serie" className="section-block" aria-labelledby="serie-title">
      <div className="page-shell">
        <SectionHeader
          titleId="serie-title"
          title={SERIES_SECTION.title}
          log={SERIES_SECTION.log}
          blurbClassName="prose-muted mb-8 md:mb-10"
          blurb={SERIES_SECTION.blurb}
        />

        {isMyrkMulti && !reducedMotion ? (
          <motion.ul
            className="feature-row list-none p-0"
            variants={listVariants}
            initial="hidden"
            animate="show"
          >
            {SERIES_FEATURES.map((feature) => (
              <motion.li
                key={feature.id}
                variants={itemVariants}
                className="panel panel-hover feature-item"
              >
                <span className="feature-index" aria-hidden>
                  {feature.id}
                </span>
                <div>
                  <h3 className="font-display mb-1 text-base font-semibold text-white uppercase sm:text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">{feature.body}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        ) : (
          features
        )}
      </div>
    </section>
  );
}
