import { useEffect, useId, useState } from "react";
import {
  DISCORD_URL,
  PLAZAS,
  SERIES_FEATURES,
  SERIES_NAME,
  STAFF,
  STUDIO_NAME,
  WEEK1_DAYS,
  plazasPercent,
} from "./content";
import { WhitelistForm } from "./components/WhitelistForm";

function DiscordIcon({ className = "h-5 w-5 shrink-0" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      {open ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      )}
    </svg>
  );
}

function LockIcon() {
  return (
    <svg className="h-5 w-5 text-faint" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  );
}

function PlazasMeter({ compact = false }: { compact?: boolean }) {
  const percent = plazasPercent();
  const labelId = useId();
  const segments = compact ? 16 : 24;
  const filled = Math.round((PLAZAS.occupied / PLAZAS.total) * segments);

  return (
    <div className="w-full" role="group" aria-labelledby={labelId}>
      <div className="mb-2 flex items-end justify-between gap-3 font-term text-[0.7rem] tracking-wider uppercase">
        <span id={labelId} className="text-muted">
          Ocupación whitelist
        </span>
        <span className="text-accent tabular-nums">
          {PLAZAS.occupied}/{PLAZAS.total} · {percent}%
        </span>
      </div>
      <div
        className="flex gap-1"
        role="progressbar"
        aria-valuenow={PLAZAS.occupied}
        aria-valuemin={0}
        aria-valuemax={PLAZAS.total}
        aria-label={`${PLAZAS.occupied} de ${PLAZAS.total} plazas ocupadas`}
      >
        {Array.from({ length: segments }, (_, index) => (
          <div
            key={index}
            className={`h-2.5 flex-1 sm:h-3 ${index < filled ? "bg-accent" : "bg-line"}`}
          />
        ))}
      </div>
    </div>
  );
}

const NAV_LINKS = [
  { href: "#serie", label: "La Serie" },
  { href: "#estudio", label: "Estudio" },
  { href: "#staff", label: "Staff" },
  { href: "#whitelist", label: "Whitelist" },
] as const;

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isMobileMenuOpen]);

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  return (
    <div className="relative min-h-dvh overflow-x-hidden">
      <div className="crt-overlay" aria-hidden />
      <div className="noise-overlay" aria-hidden />
      <div className="vignette" aria-hidden />

      <a href="#whitelist" className="skip-link">
        Ir a postulación
      </a>

      <header className="site-nav">
        <nav className="page-shell nav-inner" aria-label="Principal">
          <a href="#top" className="font-display text-lg font-bold tracking-tight text-white sm:text-xl">
            WASTELAND<span className="text-accent">.</span>
          </a>

          <div className="hidden items-center gap-0.5 lg:flex">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
            <a href="#whitelist" className="nav-cta ml-2">
              Postular
            </a>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <a href="#whitelist" className="nav-cta">
              Postular
            </a>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center text-muted transition-colors duration-150 hover:text-white"
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
            >
              <MenuIcon open={isMobileMenuOpen} />
            </button>
          </div>
        </nav>

        <div
          id="mobile-menu"
          className={`${isMobileMenuOpen ? "flex" : "hidden"} max-h-[calc(100dvh-var(--nav-h))] flex-col overflow-y-auto border-t border-line bg-background lg:hidden`}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="border-b border-line px-6 py-4 font-term text-xs tracking-[0.14em] text-muted uppercase hover:bg-panel hover:text-white"
              onClick={closeMobileMenu}
            >
              {link.label}
            </a>
          ))}
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-6 py-4 font-term text-xs tracking-[0.14em] text-[#a5b4fc] uppercase"
            onClick={closeMobileMenu}
          >
            <DiscordIcon className="h-4 w-4" />
            Discord
          </a>
        </div>
      </header>

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
            <div className="panel overflow-hidden">
              <div className="flex items-center justify-between gap-3 border-b border-line bg-black/50 px-4 py-2.5">
                <span className="font-term text-[0.65rem] tracking-wider text-faint uppercase">
                  status · whitelist
                </span>
                <span className="font-term text-[0.65rem] text-success">LIVE</span>
              </div>
              <div className="space-y-5 p-4 sm:p-5">
                <PlazasMeter compact />
                <p className="font-term text-[0.7rem] leading-relaxed text-faint">
                  Invitación + form público. Código invite = prioridad de plaza.
                </p>
                <a href="#whitelist" className="btn btn-accent w-full">
                  Reservar plaza
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <main>
        <section id="serie" className="section-block" aria-labelledby="serie-title">
          <div className="page-shell">
            <h2 id="serie-title" className="section-title">
              No es una serie de zombies
            </h2>
            <p className="prose-muted mb-8 md:mb-10">
              {SERIES_NAME} trata de lo que queda después del colapso: territorio, recursos y un
              virus que apenas abre la historia.
            </p>

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

        <section className="section-block bg-[color-mix(in_srgb,var(--color-background-elevated)_70%,transparent)]" aria-labelledby="lore-title">
          <div className="page-shell">
            <p className="log-label mb-3">
              [LOG] <b>Base de datos</b> // acceso restringido
            </p>
            <h2 id="lore-title" className="sr-only">
              Lore clasificado
            </h2>
            <div className="panel overflow-hidden">
              <div className="flex items-center justify-between gap-3 border-b border-line bg-black/40 px-4 py-2.5 sm:px-5">
                <span className="font-term text-[0.7rem] tracking-wider text-faint uppercase">
                  terminal · netfo-archive
                </span>
                <span className="font-term text-[0.65rem] text-accent">DENEGADO</span>
              </div>
              <div className="space-y-3 p-4 font-term text-sm sm:p-5 sm:text-[0.95rem]">
                <p className="cursor-blink text-success">&gt; INICIANDO PROTOCOLO_</p>
                <p className="text-faint">&gt; ACCESO DENEGADO. LORE CLASIFICADO.</p>
                <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:flex-wrap sm:items-center">
                  <label htmlFor="lore-code" className="text-success">
                    &gt; INGRESE CÓDIGO IN-GAME:
                  </label>
                  <input
                    id="lore-code"
                    type="text"
                    maxLength={8}
                    spellCheck={false}
                    className="w-full border-b border-line-strong bg-transparent py-1 text-accent uppercase outline-none transition-[border-color] duration-150 focus:border-accent sm:w-28"
                    placeholder="XXXX"
                    autoComplete="off"
                  />
                </div>
                <p className="pt-2 text-xs leading-relaxed text-faint sm:text-[0.8rem]">
                  La verdad está en el servidor. Encontrá cintas y documentos en la zona de exclusión.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-block" aria-labelledby="escaleta-title">
          <div className="page-shell">
            <h2 id="escaleta-title" className="section-title">
              Semana 1
            </h2>
            <p className="mb-6 font-term text-xs tracking-wider text-faint uppercase">
              Escaleta de eventos · en proceso
            </p>

            <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
              {WEEK1_DAYS.map((day) => (
                <div
                  key={day.label}
                  className={`panel flex min-h-[5.5rem] flex-col justify-center p-3 text-center sm:min-h-[6.5rem] sm:p-4 ${
                    day.state === "corrupt" ? "opacity-70" : ""
                  }`}
                >
                  <span className="font-term text-[0.65rem] tracking-wider text-faint">{day.label}</span>
                  <span
                    className={`mt-1 font-display text-sm font-semibold uppercase sm:text-base ${
                      day.state === "corrupt"
                        ? "text-accent line-through decoration-accent"
                        : "text-white"
                    }`}
                  >
                    {day.detail}
                  </span>
                </div>
              ))}
            </div>

            <div className="panel mt-3 flex items-center gap-3 p-4 opacity-60 sm:mt-4">
              <LockIcon />
              <div>
                <p className="font-display text-sm font-semibold text-white uppercase">
                  Semanas 2 · 3 · 4
                </p>
                <p className="font-term text-xs text-faint">
                  Calendario bloqueado hasta progresión del servidor
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="estudio" className="section-block" aria-labelledby="estudio-title">
          <div className="page-shell grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:gap-14">
            <div>
              <h2 id="estudio-title" className="section-title">
                {STUDIO_NAME} no es una serie
              </h2>
              <p className="prose-muted">
                Es el estudio. &quot;Japan Apocalypse&quot; es la primera producción. Cada futura
                serie explorará un colapso distinto - no siempre zombies.
              </p>
            </div>

            <div>
              <h3 className="mb-3 font-term text-[0.7rem] tracking-[0.16em] text-faint uppercase">
                Próximas producciones
              </h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {["PROYECTO_02", "PROYECTO_03"].map((projectId) => (
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
        </section>

        <section id="staff" className="section-block" aria-labelledby="staff-title">
          <div className="page-shell">
            <h2 id="staff-title" className="section-title">
              Equipo de comando
            </h2>
            <p className="prose-muted mb-8">
              Builders, guionistas y programadores en producción, con colaboración externa en
              animación y cinemáticas. Roster completo en Discord.
            </p>

            <ul className="mb-4 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-3">
              {STAFF.map((member) => (
                <li key={member.name} className="panel panel-hover p-4 sm:p-5">
                  <p className="font-term text-[0.65rem] tracking-wider text-accent">{member.callsign}</p>
                  <p className="font-display mt-1 text-xl font-semibold text-white uppercase">
                    {member.name}
                  </p>
                  <p className="mt-1 text-sm text-muted">{member.role}</p>
                </li>
              ))}
            </ul>

            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noreferrer"
              className="panel panel-hover flex items-center justify-center gap-2 py-5 font-term text-xs tracking-[0.14em] text-muted uppercase hover:text-white"
            >
              <DiscordIcon className="h-4 w-4" />
              Ver equipo completo en Discord
            </a>
          </div>
        </section>

        <section
          id="whitelist"
          className="section-block pb-[max(3rem,env(safe-area-inset-bottom))]"
          aria-labelledby="whitelist-title"
        >
          <div className="page-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <div>
              <p className="log-label mb-2">
                [LOG] <b>Postulación</b> // whitelist
              </p>
              <h2 id="whitelist-title" className="section-title">
                Reservá tu plaza
              </h2>
              <p className="prose-muted mb-6">
                Invitación + formulario público. Con código: prioridad o plaza reservada.
              </p>
              <ol className="space-y-3 font-term text-xs tracking-wide text-muted sm:text-[0.8rem]">
                <li className="flex gap-3">
                  <span className="text-accent">01</span>
                  <span>Unite al Discord de {STUDIO_NAME}.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">02</span>
                  <span>Completá el form (invite opcional).</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">03</span>
                  <span>
                    Copiá y pegá en <span className="text-white">#whitelist</span>.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">04</span>
                  <span>Esperá respuesta del staff.</span>
                </li>
              </ol>
            </div>

            <div className="panel p-4 sm:p-6 md:p-8">
              <WhitelistForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line py-10 pb-[max(2.5rem,env(safe-area-inset-bottom))]">
        <div className="page-shell flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="font-display text-lg font-semibold tracking-tight text-white uppercase">
              {STUDIO_NAME}
              <span className="text-accent">.</span>
            </p>
            <p className="mt-1 font-term text-[0.7rem] text-faint">
              © 2026 · {SERIES_NAME}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="btn btn-ghost">
              <DiscordIcon className="h-4 w-4" />
              Discord
            </a>
            <a href="#whitelist" className="btn btn-primary">
              Postular
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
