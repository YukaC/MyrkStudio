import { useState } from "react";
import { DISCORD_URL, PLAZAS, SERIES_NAME, STAFF, STUDIO_NAME } from "./content";
import { WhitelistForm } from "./components/WhitelistForm";

function DiscordIcon() {
  return (
    <svg className="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
    </svg>
  );
}

function PlazasBar() {
  const segments = 20;
  const filled = Math.round((PLAZAS.occupied / PLAZAS.total) * segments);
  return (
    <div className="mb-8 flex gap-[3px]" aria-hidden>
      {Array.from({ length: segments }, (_, index) => (
        <div
          key={index}
          className={`h-3 w-3 ${index < filled ? "bg-red-600" : "bg-zinc-800"}`}
        />
      ))}
    </div>
  );
}

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  return (
    <div className="relative overflow-x-hidden">
      <div className="crt-overlay" />

      <nav className="fixed z-40 w-full border-b border-zinc-800/60 bg-zinc-950/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a href="#top" className="font-display text-lg font-bold tracking-tight text-white">
            WASTELAND<span className="text-red-600">.</span>
          </a>
          <div className="hidden items-center gap-8 font-term text-xs tracking-widest text-zinc-400 uppercase md:flex">
            <a href="#serie" className="transition hover:text-white">
              La Serie
            </a>
            <a href="#estudio" className="transition hover:text-white">
              Estudio
            </a>
            <a href="#staff" className="transition hover:text-white">
              Staff
            </a>
            <a
              href="#whitelist"
              className="bg-red-700 px-4 py-2 text-white normal-case tracking-normal transition hover:bg-red-600"
            >
              Postular
            </a>
          </div>
          <button
            type="button"
            className="text-zinc-400 transition hover:text-white md:hidden"
            aria-label="Abrir menú"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        <div
          id="mobile-menu"
          className={`${isMobileMenuOpen ? "flex" : "hidden"} flex-col border-t border-zinc-800/60 bg-zinc-950 font-term text-xs tracking-widest text-zinc-400 uppercase md:hidden`}
        >
          <a href="#serie" className="border-b border-zinc-900 px-6 py-3 hover:text-white" onClick={closeMobileMenu}>
            La Serie
          </a>
          <a href="#estudio" className="border-b border-zinc-900 px-6 py-3 hover:text-white" onClick={closeMobileMenu}>
            Estudio
          </a>
          <a href="#staff" className="border-b border-zinc-900 px-6 py-3 hover:text-white" onClick={closeMobileMenu}>
            Staff
          </a>
          <a href="#whitelist" className="px-6 py-3 text-red-500" onClick={closeMobileMenu}>
            Postular a Whitelist
          </a>
        </div>
      </nav>

      <header
        id="top"
        className="relative flex flex-col items-center border-b border-zinc-800 px-6 pt-32 pb-16 text-center"
      >
        <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-red-900/50 bg-red-950/30 px-3 py-1.5 font-term text-xs text-red-500">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
          </span>
          SISTEMA EN LÍNEA ·{" "}
          <span>
            {PLAZAS.occupied}/{PLAZAS.total} PLAZAS
          </span>
        </div>

        <PlazasBar />

        <p className="mb-3 font-term text-xs tracking-[0.2em] text-zinc-500 uppercase">
          {STUDIO_NAME} Studio presenta
        </p>
        <h1 className="font-display mb-5 text-5xl leading-[0.95] font-bold tracking-tight text-white uppercase sm:text-6xl">
          Japan
          <br />
          <span className="glitch-text text-red-600">Apocalypse</span>
        </h1>

        <p className="mb-9 max-w-sm text-sm leading-relaxed text-zinc-400">
          Japón ha caído. Lo que fue el pináculo de la civilización es ahora una zona cero: un
          ecosistema letal, no una simple plaga de muertos vivientes.
        </p>

        <div className="flex w-full max-w-xs flex-col gap-3">
          <a
            href="#whitelist"
            className="bg-white px-6 py-3 text-center text-sm font-bold tracking-wide text-black uppercase transition hover:bg-zinc-200"
          >
            Postular a Whitelist
          </a>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 bg-indigo-600 px-6 py-3 text-sm font-bold tracking-wide text-white uppercase transition hover:bg-indigo-700"
          >
            <DiscordIcon />
            Unirse al Discord
          </a>
        </div>
        <p className="mt-4 font-term text-[11px] text-zinc-600">
          Invitación + form · código invite = prioridad de plaza
        </p>
      </header>

      <section id="serie" className="mx-auto max-w-3xl border-b border-zinc-800 p-6">
        <p className="log-label mb-3">
          [LOG_01] <b>LA SERIE</b> // {SERIES_NAME.toUpperCase()}
        </p>
        <p className="mb-6 text-sm leading-relaxed text-zinc-300">
          No es una serie de zombies. Es una serie sobre lo que queda después del colapso: facciones
          que se disputan territorio, recursos que se agotan y un virus que apenas es el punto de
          partida de algo mucho más grande.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              title: "Supervivencia real",
              body: "Escasez, decisiones con consecuencias y un mundo que no perdona.",
            },
            {
              title: "Facciones",
              body: "Grupos con intereses propios disputándose la zona cero.",
            },
            {
              title: "Eventos guionizados",
              body: "Una escaleta narrativa dirige la historia semana a semana.",
            },
            {
              title: "Zona cero explorable",
              body: "Un Japón post-colapso, distinto a cualquier apocalipsis típico.",
            },
          ].map((card) => (
            <div key={card.title} className="border border-zinc-800 bg-zinc-900/60 p-4">
              <p className="font-display mb-1 text-sm font-semibold text-white">{card.title}</p>
              <p className="text-xs leading-relaxed text-zinc-500">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl border-b border-zinc-800 bg-zinc-950 p-6">
        <p className="log-label mb-4">
          [LOG_02] <b>BASE DE DATOS</b> // ACCESO RESTRINGIDO
        </p>
        <div className="border border-zinc-800 bg-black p-4 font-term text-sm">
          <p className="mb-2 text-green-500">&gt; INICIANDO PROTOCOLO_</p>
          <p className="mb-4 text-zinc-500">&gt; ACCESO DENEGADO. LORE CLASIFICADO.</p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-green-500">&gt; INGRESE CÓDIGO IN-GAME:</span>
            <input
              type="text"
              maxLength={8}
              className="w-24 border-b border-zinc-700 bg-transparent text-red-500 uppercase transition outline-none focus:border-red-500"
              placeholder="XXXX"
              aria-label="Código in-game"
            />
          </div>
          <p className="mt-3 text-xs text-zinc-600">
            La verdad está en el servidor, no aquí. Encuentra cintas y documentos en la zona de
            exclusión para descifrarla.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl border-b border-zinc-800 p-6">
        <p className="log-label mb-1">
          [LOG_03] <b>ESCALETA DE EVENTOS</b>
        </p>
        <p className="mb-5 font-term text-xs text-zinc-600">EN BASE A GUION FINAL · EN PROCESO</p>
        <div className="space-y-3">
          <div className="border border-zinc-800 bg-zinc-900/50 p-4">
            <h3 className="font-display mb-2 text-sm font-semibold text-white">SEMANA 1</h3>
            <div className="grid grid-cols-2 gap-2 font-term text-xs sm:grid-cols-4">
              <div className="border border-zinc-800 bg-zinc-950 p-2 text-center text-zinc-400">
                DÍA 1: Apertura
              </div>
              <div className="border border-zinc-800 bg-zinc-950 p-2 text-center text-red-500/70 line-through">
                DÍA 2: [CORRUPTO]
              </div>
              <div className="border border-zinc-800 bg-zinc-950 p-2 text-center text-red-500/70 line-through">
                DÍA 3: [CORRUPTO]
              </div>
              <div className="border border-zinc-800 bg-zinc-950 p-2 text-center text-zinc-400">
                DÍA 4: Asentamiento
              </div>
            </div>
          </div>
          <div className="border border-zinc-800 bg-zinc-900/50 p-4 opacity-50">
            <h3 className="font-display mb-2 text-sm font-semibold text-white">SEMANAS 2 · 3 · 4</h3>
            <p className="font-term text-xs text-zinc-500">
              &gt; CALENDARIO BLOQUEADO HASTA PROGRESIÓN DEL SERVIDOR
            </p>
          </div>
        </div>
      </section>

      <section id="estudio" className="mx-auto w-full max-w-3xl border-b border-zinc-800 p-6">
        <p className="log-label mb-3">
          [LOG_04] <b>EL ESTUDIO</b> // {STUDIO_NAME.toUpperCase()}
        </p>
        <p className="mb-8 text-sm leading-relaxed text-zinc-400">
          {STUDIO_NAME} no es una serie, es el estudio detrás de ella. &quot;Japan Apocalypse&quot; es
          nuestra primera producción: un colapso concreto, en un lugar concreto. Cada futura serie
          de {STUDIO_NAME} explorará un escenario de colapso distinto, no siempre zombies.
        </p>
        <h3 className="mb-3 font-term text-xs tracking-widest text-zinc-500 uppercase">
          Próximas producciones
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {["PROYECTO_02", "PROYECTO_03"].map((projectId) => (
            <div
              key={projectId}
              className="flex flex-col items-center justify-center gap-2 border border-dashed border-zinc-700 bg-zinc-900/30 p-4 text-center"
            >
              <svg className="h-4 w-4 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span className="font-term text-xs text-zinc-500">
                {projectId}
                <br />
                [CLASIFICADO]
              </span>
            </div>
          ))}
        </div>
      </section>

      <section id="staff" className="mx-auto w-full max-w-3xl border-b border-zinc-800 p-6">
        <p className="log-label mb-4">
          [LOG_05] <b>EQUIPO DE COMANDO</b>
        </p>
        <div className="grid grid-cols-2 gap-3">
          {STAFF.map((member) => (
            <div key={member.name} className="flex flex-col border border-zinc-800 bg-zinc-900 p-3">
              <span className="font-display text-sm font-semibold text-white">{member.name}</span>
              <span className="font-term text-xs text-zinc-500">{member.role}</span>
            </div>
          ))}
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noreferrer"
            className="col-span-2 flex flex-col items-center justify-center border border-dashed border-zinc-700 bg-zinc-900 py-4 transition hover:border-zinc-500"
          >
            <span className="font-term text-xs text-zinc-500">+ VER EQUIPO COMPLETO EN DISCORD</span>
          </a>
        </div>
      </section>

      <section id="whitelist" className="mx-auto w-full max-w-3xl border-b border-zinc-800 p-6">
        <p className="log-label mb-3">
          [LOG_06] <b>POSTULACIÓN</b> // WHITELIST
        </p>
        <ol className="mb-6 list-inside list-decimal space-y-1 font-term text-xs text-zinc-500">
          <li>Únete al Discord de {STUDIO_NAME}.</li>
          <li>Completa el formulario (si tenés invitación, ingresá el código).</li>
          <li>
            Copia tu postulación y pégala en <span className="text-zinc-300">#whitelist</span>.
          </li>
          <li>Espera la respuesta del staff.</li>
        </ol>
        <WhitelistForm />
      </section>

      <footer className="p-6 text-center font-term text-xs text-zinc-600">
        <p>
          {STUDIO_NAME.toUpperCase()} STUDIO © 2026 · {SERIES_NAME}
        </p>
        <p>SISTEMA AISLADO · DEMO</p>
      </footer>
    </div>
  );
}
