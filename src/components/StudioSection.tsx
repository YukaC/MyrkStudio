import { STUDIO_SECTION, UPCOMING_PROJECTS } from "../content";
import { LockIcon } from "./icons";
import { SectionHeader } from "./SectionHeader";
import { StudioStatement } from "./StudioStatement";

export function StudioSection() {
  return (
    <section id="estudio" className="section-block" aria-labelledby="estudio-title">
      <div className="page-shell grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:gap-14">
        <div>
          <SectionHeader
            titleId="estudio-title"
            title={STUDIO_SECTION.title}
            log={STUDIO_SECTION.log}
            blurbClassName="prose-muted mb-6"
            blurb={STUDIO_SECTION.blurb}
          />
        </div>

        <div>
          <h3 className="mb-3 font-term text-[0.7rem] tracking-[0.16em] text-faint uppercase">
            Próximas producciones
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {UPCOMING_PROJECTS.map((projectId) => (
              <div
                key={projectId}
                className="flex min-h-[7rem] flex-col items-center justify-center gap-2 border border-dashed border-line-strong bg-[color-mix(in_srgb,var(--color-panel)_40%,transparent)] p-5 text-center"
              >
                <LockIcon />
                <span className="font-term text-xs tracking-wider text-faint">
                  {projectId}
                  <br />
                  [CLASIFICADO]
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 lg:mt-14">
        <StudioStatement />
      </div>
    </section>
  );
}
