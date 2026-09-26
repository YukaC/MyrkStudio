import { STUDIO_NAME, STUDIO_STATEMENT } from "../content";

function HeartIcon() {
  return (
    <svg className="size-4 shrink-0 fill-accent text-accent" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 21s-7.5-4.7-9.6-9A5.4 5.4 0 0 1 12 6.2 5.4 5.4 0 0 1 21.6 12c-2.1 4.3-9.6 9-9.6 9z" />
    </svg>
  );
}

export function StudioStatement() {
  return (
    <div className="panel relative overflow-hidden">
      <div className="statement-glow" aria-hidden />
      <div className="relative p-5 sm:p-8">
        <p className="log-label mb-5 text-center sm:text-left">
          [LOG] <b>Nosotros</b> // {STUDIO_NAME} studio
        </p>

        <div className="grid items-center gap-8 md:grid-cols-2">
          <figure className="mx-auto w-full max-w-xs text-center">
            <div className="flex aspect-[4/5] flex-col items-center justify-center gap-3 border border-dashed border-line-strong bg-black/30 p-6">
              <p className="font-display text-4xl leading-none font-bold text-white uppercase">
                {STUDIO_NAME}
                <span className="text-accent">.</span>
              </p>
              <p className="font-term text-[0.65rem] tracking-[0.2em] text-faint uppercase">
                Japan Apocalypse
              </p>
            </div>
            <figcaption className="mt-3 font-term text-xs tracking-wide text-muted">
              {STUDIO_STATEMENT.signature}
            </figcaption>
          </figure>

          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <blockquote className="font-display text-lg leading-snug text-pretty text-white sm:text-xl">
              &ldquo;{STUDIO_STATEMENT.quote}&rdquo;
            </blockquote>
            <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-muted">
              <HeartIcon />
              {STUDIO_STATEMENT.signOff}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
