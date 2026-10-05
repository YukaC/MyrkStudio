import { motion, useReducedMotion } from "motion/react";
import { SERIES_FEATURES, SERIES_SECTION } from "../content";
import { EditorialCard } from "./editorial/EditorialCard";
import { SectionHeader } from "./SectionHeader";

export function SeriesSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="serie" className="editorial-section section-block" aria-labelledby="serie-title">
      <div className="page-shell">
        <SectionHeader
          index="02"
          titleId="serie-title"
          title={SERIES_SECTION.title}
          log={SERIES_SECTION.log}
          blurb={SERIES_SECTION.blurb}
        />

        <motion.ul
          className="feature-row list-none p-0"
          {...(reducedMotion
            ? {}
            : {
                initial: "hidden",
                whileInView: "show",
                viewport: { once: true, margin: "-5% 0px" },
                variants: {
                  hidden: { opacity: 0 },
                  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
                },
              })}
        >
          {SERIES_FEATURES.map((feature) => (
            <motion.li
              key={feature.id}
              className="list-none"
              {...(reducedMotion
                ? {}
                : {
                    variants: {
                      hidden: { opacity: 0, y: 16 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                    },
                  })}
            >
              <EditorialCard className="feature-item grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 p-4 sm:p-5">
                <span className="editorial-section-index" aria-hidden>
                  {feature.id}
                </span>
                <div>
                  <h3 className="font-editorial mb-1 text-lg font-semibold text-cream uppercase sm:text-xl">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-cream/70">{feature.body}</p>
                </div>
              </EditorialCard>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
