import { DISCORD_URL, STUDIO_NAME, WHITELIST_HREF } from "../content";
import { AppLink } from "./AppLink";
import { EditorialScrollReveal } from "./editorial/EditorialScrollReveal";

type CtaBannerProps = {
  whitelistHref?: string;
};

export function CtaBanner({ whitelistHref = WHITELIST_HREF }: CtaBannerProps) {
  return (
    <section
      id="discord"
      className="editorial-section section-block"
      aria-labelledby="cta-title"
    >
      <div className="page-shell">
        <EditorialScrollReveal>
          <div className="editorial-surface editorial-cta-surface relative overflow-hidden p-6 text-center sm:p-12">
            <div className="cta-glow opacity-40" aria-hidden />
            <div className="relative">
              <p className="editorial-section-kicker mb-3 justify-center" data-reveal="">
                <span className="editorial-section-index">10</span>
                <span>
                  <b>Señal abierta</b>
                  <span className="text-faint"> · </span>
                  discord
                </span>
              </p>
              <h2 id="cta-title" className="editorial-section-title" data-split="lines">
                La zona cero no espera
              </h2>
              <p className="editorial-section-blurb mx-auto mb-6 text-center" data-reveal="">
                Los próximos eventos, las transmisiones y las plazas de whitelist se anuncian primero
                en el Discord de {STUDIO_NAME}.
              </p>
              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href={DISCORD_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="editorial-btn editorial-btn-primary"
                  data-magnetic=""
                >
                  Entrar al Discord
                </a>
                <AppLink
                  href={whitelistHref}
                  className="editorial-btn editorial-btn-outline"
                  data-magnetic=""
                >
                  Postular a la whitelist
                  <span aria-hidden> →</span>
                </AppLink>
              </div>
            </div>
          </div>
        </EditorialScrollReveal>
      </div>
    </section>
  );
}
