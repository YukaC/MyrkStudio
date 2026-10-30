import { STUDIO_SECTION, UPCOMING_PROJECTS } from "../content";
import { LockIcon } from "./icons";
import { EditorialCard } from "./editorial/EditorialCard";
import { EditorialScrollItem, EditorialScrollStagger } from "./editorial/EditorialScrollStagger";
import { EditorialScrollReveal } from "./editorial/EditorialScrollReveal";
import { SectionHeader } from "./SectionHeader";
import { StudioStatement } from "./StudioStatement";

export function StudioSection() {
  return (
    <section id="estudio" className="editorial-section section-block" aria-labelledby="estudio-title">
      <div className="page-shell grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-start lg:gap-14">
        <div>
          <SectionHeader
            index="05"
            titleId="estudio-title"
            title={STUDIO_SECTION.title}
            log={STUDIO_SECTION.log}
            blurb={STUDIO_SECTION.blurb}
          />
        </div>

        <div>
          <h3 className="mb-3 font-sans text-sm font-semibold tracking-[0.16em] text-cream/55 uppercase">
            Próximas producciones
          </h3>
          <EditorialScrollStagger className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1" stagger={0.1}>
            {UPCOMING_PROJECTS.map((projectId, index) => (
              <EditorialScrollItem key={projectId}>
                <EditorialCard scrollMotion={false} data-tilt="" className="flex min-h-[7rem] flex-col items-center justify-center gap-2 p-5 text-center">
                  <span className="editorial-streamer-rank">{String(index + 1).padStart(2, "0")}</span>
                  <LockIcon />
                  <span className="font-term text-xs tracking-wider text-cream/45 uppercase">
                    {projectId}
                    <br />
                    clasificado
                  </span>
                </EditorialCard>
              </EditorialScrollItem>
            ))}
          </EditorialScrollStagger>
        </div>
      </div>

      <div className="page-shell mt-10 lg:mt-14">
        <EditorialScrollReveal delay={0.08}>
          <StudioStatement />
        </EditorialScrollReveal>
      </div>
    </section>
  );
}
