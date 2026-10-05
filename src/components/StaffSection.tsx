import { motion, useReducedMotion } from "motion/react";
import { STAFF, STAFF_SECTION } from "../content";
import { useMyrkMultiChrome } from "../hooks/useMyrkMultiChrome";
import { SectionHeader } from "./SectionHeader";

const gridVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.36, ease: [0.23, 1, 0.32, 1] as const },
  },
};

export function StaffSection() {
  const isMyrkMulti = useMyrkMultiChrome();
  const reducedMotion = useReducedMotion();

  const cards = STAFF.map((member) => (
    <li key={member.name} className="panel panel-hover p-4 sm:p-5">
      <p className="font-term text-[0.65rem] tracking-wider text-accent">{member.callsign}</p>
      <p className="font-display mt-1 text-xl font-semibold text-white uppercase">{member.name}</p>
      <p className="mt-1 text-sm text-muted">{member.role}</p>
    </li>
  ));

  return (
    <section id="staff" className="section-block" aria-labelledby="staff-title">
      <div className="page-shell">
        <SectionHeader
          titleId="staff-title"
          title={STAFF_SECTION.title}
          log={STAFF_SECTION.log}
          blurbClassName="prose-muted mb-8"
          blurb={STAFF_SECTION.blurb}
        />

        {isMyrkMulti && !reducedMotion ? (
          <motion.ul
            className="mb-4 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-3"
            variants={gridVariants}
            initial="hidden"
            animate="show"
          >
            {STAFF.map((member) => (
              <motion.li key={member.name} variants={cardVariants} className="panel panel-hover p-4 sm:p-5">
                <p className="font-term text-[0.65rem] tracking-wider text-accent">{member.callsign}</p>
                <p className="font-display mt-1 text-xl font-semibold text-white uppercase">
                  {member.name}
                </p>
                <p className="mt-1 text-sm text-muted">{member.role}</p>
              </motion.li>
            ))}
          </motion.ul>
        ) : (
          <ul className="mb-4 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-3">{cards}</ul>
        )}

        <p className="mt-4 font-term text-[0.7rem] tracking-wide text-faint">{STAFF_SECTION.note}</p>
      </div>
    </section>
  );
}
