import { STAFF, STAFF_SECTION } from "../content";
import { SectionHeader } from "./SectionHeader";

export function StaffSection() {
  return (
    <section id="staff" className="editorial-section section-block" aria-labelledby="staff-title">
      <div className="page-shell">
        <SectionHeader
          index="06"
          titleId="staff-title"
          title={STAFF_SECTION.title}
          log={STAFF_SECTION.log}
          blurb={STAFF_SECTION.blurb}
        />

        <ul className="mb-4 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-3">
          {STAFF.map((member) => (
            <li key={member.name} className="panel panel-hover p-4 sm:p-5">
              <p className="font-term text-[0.65rem] tracking-wider text-accent">{member.callsign}</p>
              <p className="font-editorial mt-1 text-xl font-semibold text-cream uppercase">
                {member.name}
              </p>
              <p className="mt-1 text-sm text-cream/70">{member.role}</p>
            </li>
          ))}
        </ul>

        <p className="font-term text-[0.7rem] tracking-wide text-faint">{STAFF_SECTION.note}</p>
      </div>
    </section>
  );
}
