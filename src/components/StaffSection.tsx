import { STAFF, STAFF_SECTION } from "../content";
import { SectionHeader } from "./SectionHeader";

export function StaffSection() {
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

        <ul className="mb-4 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-3">
          {STAFF.map((member) => (
            <li key={member.name} className="panel panel-hover p-4 sm:p-5">
              <p className="font-term text-[0.65rem] tracking-wider text-accent">{member.callsign}</p>
              <p className="font-display mt-1 text-xl font-semibold text-white uppercase">
                {member.name}
              </p>
              <p className="mt-1 text-sm text-muted">{member.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
