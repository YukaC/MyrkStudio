import { SERIES_FEATURES, SERIES_SECTION } from "../content";
import { EditorialCard } from "./editorial/EditorialCard";
import { EditorialScrollItem, EditorialScrollStagger } from "./editorial/EditorialScrollStagger";
import { SectionHeader } from "./SectionHeader";

export function SeriesSection() {
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

        <EditorialScrollStagger as="ul" className="editorial-feature-list list-none p-0" stagger={0.09}>
          {SERIES_FEATURES.map((feature) => (
            <EditorialScrollItem key={feature.id} as="li" className="list-none">
              <EditorialCard
                scrollMotion={false}
                data-tilt=""
                className="editorial-feature-card grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 p-4 sm:p-5"
              >
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
            </EditorialScrollItem>
          ))}
        </EditorialScrollStagger>
      </div>
    </section>
  );
}
