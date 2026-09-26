import { DISCORD_URL, STAFF } from "../content";
import { DiscordIcon } from "./icons";
import { SectionHeader } from "./SectionHeader";

export function StaffSection() {
  return (
    <section id="staff" className="section-block" aria-labelledby="staff-title">
      <div className="page-shell">
        <SectionHeader
          titleId="staff-title"
          title="Equipo de comando"
          blurbClassName="mb-8"
          blurb={
            <>
              Builders, guionistas y programadores en producción, con colaboración externa en
              animación y cinemáticas. Roster completo en Discord.
            </>
          }
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

        <a
          href={DISCORD_URL}
          target="_blank"
          rel="noreferrer"
          className="panel panel-hover flex items-center justify-center gap-2 py-5 font-term text-xs tracking-[0.14em] text-muted uppercase hover:text-white"
        >
          <DiscordIcon className="h-4 w-4" />
          Ver equipo completo en Discord
        </a>
      </div>
    </section>
  );
}
