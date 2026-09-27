import { DISCORD_URL, HERO, STUDIO_NAME, WHITELIST_HREF, WHITELIST_INVITE_NOTE } from "../content";
import { AppLink } from "./AppLink";
import { DiscordIcon } from "./icons";
import { Panel } from "./Panel";
import { PlazasMeter } from "./PlazasMeter";
import { PremiereCountdown } from "./PremiereCountdown";
import { StatCounters } from "./StatCounters";

type HeroSectionProps = {
  whitelistHref?: string;
  /**
   * `scroll` — classic landing (min-h-dvh, own nav offset).
   * `viewport` — multi home: full-bleed backdrop, fills parent frame.
   */
  layout?: "scroll" | "viewport";
};

function HeroBackdrop() {
  const { backdrop } = HERO;
  return (
    <div className="multi-hero-media" aria-hidden>
      <picture>
        <source media="(max-width: 640px)" srcSet={backdrop.webpSm} type="image/webp" />
        <source srcSet={backdrop.webp} type="image/webp" />
        <img
          src={backdrop.jpeg}
          alt=""
          width={backdrop.width}
          height={backdrop.height}
          decoding="async"
          fetchPriority="high"
          className="multi-hero-image"
        />
      </picture>
      <div className="multi-hero-scrim" />
    </div>
  );
}

export function HeroSection({
  whitelistHref = WHITELIST_HREF,
  layout = "scroll",
}: HeroSectionProps) {
  const isViewport = layout === "viewport";

  return (
    <div
      id="top"
      /* The nav is fixed, so the hero pays its offset in padding-top — and that
         offset is the nav box and nothing else, which left the status badge
         resting on the nav border (measured -1px) at any viewport where the hero
         overflows its box: phones in portrait, and any short viewport in
         landscape, where `justify-center` degenerates to start. The 1.5rem is
         that missing air, unconditional on purpose: scoping it to a breakpoint
         just moves the collision to the widths that were excluded.
         Multi `viewport` clears the nav inside the hero so the backdrop can
         bleed edge-to-edge under the glass header. */
      className={
        isViewport
          ? "multi-hero"
          : "relative flex min-h-dvh flex-col justify-start border-b border-line pt-[calc(var(--nav-h)+env(safe-area-inset-top,0px)+1.5rem)] pb-14 sm:justify-center sm:pb-16"
      }
    >
      {isViewport ? <HeroBackdrop /> : null}

      {!isViewport ? (
        <>
          <div className="hero-glow" aria-hidden />
          <div className="hero-grid" aria-hidden />
        </>
      ) : null}

      <div className="page-shell relative z-[1] grid items-center gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:text-left">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="reveal mb-4 inline-flex items-center gap-2 border border-[color-mix(in_srgb,var(--color-accent)_45%,var(--color-line))] bg-[color-mix(in_srgb,var(--color-accent)_10%,rgb(7_7_8)_78%)] px-3 py-1.5 font-term text-[0.7rem] tracking-wider text-accent uppercase">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            {HERO.statusLabel}
          </div>
          <p className="reveal reveal-delay-1 mb-2 font-term text-[0.7rem] tracking-[0.22em] text-faint uppercase sm:text-xs">
            {STUDIO_NAME} Studio presenta
          </p>

          <h1
            className={
              isViewport
                ? "multi-hero-title reveal reveal-delay-1 font-display mb-3 max-w-[14ch] font-bold text-white uppercase"
                : "reveal reveal-delay-1 font-display mb-4 max-w-[14ch] text-[clamp(2.75rem,10vw,5.25rem)] leading-[0.92] font-bold text-white uppercase"
            }
          >
            Japan
            <br />
            <span className="glitch-text" data-text="Apocalypse">
              Apocalypse
            </span>
          </h1>

          <p
            className={`reveal reveal-delay-2 prose-muted lg:mx-0 ${isViewport ? "mb-5" : "mb-8"}`}
          >
            Japón ha caído. Supervivencia, facciones y eventos guionizados en Minecraft: un
            ecosistema letal, cada decisión cuenta.
          </p>

          <div className="reveal reveal-delay-3 flex w-full max-w-md flex-col gap-3 sm:flex-row lg:max-w-lg">
            <AppLink href={whitelistHref} className="btn btn-primary hero-cta flex-1">
              Postular a Whitelist
            </AppLink>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noreferrer"
              className="btn btn-discord hero-cta flex-1"
            >
              <DiscordIcon />
              Discord
            </a>
          </div>
        </div>

        <aside className="reveal reveal-delay-2 w-full max-w-md justify-self-center lg:max-w-none lg:justify-self-stretch">
          <Panel
            title="status · whitelist"
            badge="LIVE"
            badgeClassName="text-success"
            className={isViewport ? "multi-hero-panel" : undefined}
          >
            <div className={`space-y-4 ${isViewport ? "p-3 sm:p-4" : "p-4 sm:p-5"}`}>
              <PlazasMeter compact />
              <StatCounters />
              <p className="font-term text-[0.7rem] leading-relaxed text-muted">
                {WHITELIST_INVITE_NOTE}
              </p>
              <PremiereCountdown />
            </div>
          </Panel>
        </aside>
      </div>
    </div>
  );
}
