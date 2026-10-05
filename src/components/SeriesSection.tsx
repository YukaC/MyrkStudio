import { SERIES_FEATURES, SERIES_SECTION } from "../content";
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

        <ul className="feature-row list-none p-0">
          {SERIES_FEATURES.map((feature) => (
            <li key={feature.id} className="panel panel-hover feature-item">
              <span className="feature-index" aria-hidden>
                {feature.id}
              </span>
              <div>
                <h3 className="font-editorial mb-1 text-lg font-semibold text-cream uppercase sm:text-xl">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-cream/70">{feature.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
