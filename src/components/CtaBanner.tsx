import { DISCORD_URL, SERIES_NAME } from "../content";

export function CtaBanner() {
  return (
    <section className="section-block" aria-labelledby="cta-title">
      <div className="page-shell">
        <div className="panel relative overflow-hidden p-6 text-center sm:p-12">
          <div className="cta-glow" aria-hidden />
          <div className="relative">
            <p className="log-label mb-3">
              [LOG] <b>Señal abierta</b> // discord
            </p>
            <h2 id="cta-title" className="section-title">
              La zona cero no espera
            </h2>
            <p className="prose-muted mx-auto mb-6">
              Los próximos eventos, las transmisiones y las plazas de whitelist se anuncian primero
              en el Discord de {SERIES_NAME}.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="btn btn-accent">
                Entrar al Discord
              </a>
              <a href="#whitelist" className="btn btn-ghost">
                Postular a la whitelist
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
