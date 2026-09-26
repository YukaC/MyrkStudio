import { SERIES_FEATURES, SERIES_NAME } from "../content";
import { SectionHeader } from "./SectionHeader";

export function SeriesSection() {
  return (
    <section id="serie" className="section-block" aria-labelledby="serie-title">
      <div className="page-shell">
        <SectionHeader
          titleId="serie-title"
          title="No es una serie de zombies"
          blurbClassName="mb-8 md:mb-10"
          blurb={
            <>
              {SERIES_NAME} trata de lo que queda después del colapso: territorio, recursos y un
              virus que apenas abre la historia.
            </>
          }
        />

        <ul className="feature-row list-none p-0">
          {SERIES_FEATURES.map((feature) => (
            <li key={feature.id} className="panel panel-hover feature-item">
              <span className="feature-index" aria-hidden>
                {feature.id}
              </span>
              <div>
                <h3 className="font-display mb-1 text-base font-semibold text-white uppercase sm:text-lg">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{feature.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
