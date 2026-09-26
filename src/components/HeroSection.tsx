import { DISCORD_URL, STUDIO_NAME } from "../content";
import { DiscordIcon } from "./icons";
import { Panel } from "./Panel";
import { PlazasMeter } from "./PlazasMeter";
import { PremiereCountdown } from "./PremiereCountdown";
import { StatCounters } from "./StatCounters";

export function HeroSection() {
  return (
    <div
      id="top"
      className="relative flex min-h-dvh flex-col justify-center border-b border-line pt-[calc(var(--nav-h)+env(safe-area-inset-top,0px))] pb-14 sm:pb-16"
    >
      <div className="hero-glow" aria-hidden />
      <div className="hero-grid" aria-hidden />

      <div className="page-shell relative z-[1] grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:text-left">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="reveal mb-5 inline-flex items-center gap-2 border border-[color-mix(in_srgb,var(--color-accent)_45%,var(--color-line))] bg-[color-mix(in_srgb,var(--color-accent)_12%,transparent)] px-3 py-1.5 font-term text-[0.7rem] tracking-wider text-accent uppercase">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Sistema en línea
          </div>

          <p className="reveal reveal-delay-1 mb-2 font-term text-[0.7rem] tracking-[0.22em] text-faint uppercase sm:text-xs">
            {STUDIO_NAME} Studio presenta
          </p>

          <h1 className="reveal reveal-delay-1 font-display mb-4 max-w-[14ch] text-[clamp(2.75rem,10vw,5.25rem)] leading-[0.92] font-bold text-white uppercase">
            Japan
            <br />
            <span className="glitch-text text-accent">Apocalypse</span>
          </h1>

          <p className="reveal reveal-delay-2 prose-muted mb-8 lg:mx-0">
            Japón ha caído. Supervivencia, facciones y eventos guionizados en Minecraft: un
            ecosistema letal, no una plaga genérica.
          </p>

          <div className="reveal reveal-delay-3 flex w-full max-w-md flex-col gap-3 sm:flex-row lg:max-w-lg">
            <a href="#whitelist" className="btn btn-primary flex-1">
              Postular a Whitelist
            </a>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noreferrer"
              className="btn btn-discord flex-1"
            >
              <DiscordIcon />
              Discord
            </a>
          </div>
        </div>

        <aside className="reveal reveal-delay-2 w-full max-w-md justify-self-center lg:max-w-none lg:justify-self-stretch">
          <Panel title="status · whitelist" badge="LIVE" badgeClassName="text-success">
            <div className="space-y-4 p-4 sm:p-5">
              <PlazasMeter compact />
              <StatCounters />
              <p className="font-term text-[0.7rem] leading-relaxed text-faint">
                Invitación + form público. Código invite = prioridad de plaza.
              </p>
              <PremiereCountdown />
              <a href="#whitelist" className="btn btn-accent w-full">
                Reservar plaza
              </a>
            </div>
          </Panel>
        </aside>
      </div>
    </div>
  );
}
