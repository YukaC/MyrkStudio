import { STAFF, STAFF_SECTION } from "../content";
import { EditorialCard } from "./editorial/EditorialCard";
import { EditorialScrollItem, EditorialScrollStagger } from "./editorial/EditorialScrollStagger";
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

        <EditorialScrollStagger
          as="ul"
          className="mb-4 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-3"
          stagger={0.08}
        >
          {STAFF.map((member, index) => (
            <EditorialScrollItem key={member.name} as="li" className="list-none">
              <EditorialCard scrollMotion={false} data-tilt="" className="flex flex-col p-4 sm:p-5">
                <span className="editorial-streamer-rank">{String(index + 1).padStart(2, "0")}</span>
                <p className="font-term text-[0.65rem] tracking-wider text-accent">{member.callsign}</p>
                <p className="font-sans mt-1 text-xl font-semibold text-cream uppercase">
                  {member.name}
                </p>
                <p className="mt-1 text-sm text-cream/70">{member.role}</p>
              </EditorialCard>
            </EditorialScrollItem>
          ))}
        </EditorialScrollStagger>

        <p className="mt-4 text-sm text-cream/50">{STAFF_SECTION.note}</p>
      </div>
    </section>
  );
}
