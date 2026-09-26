import { DISCORD_URL, SERIES_NAME, STUDIO_NAME } from "../content";
import { DiscordIcon } from "./icons";

const FOOTER_COLUMNS = [
  {
    heading: "Sitio",
    links: [
      { href: "#serie", label: "La Serie" },
      { href: "#estudio", label: "Estudio" },
      { href: "#streamers", label: "Streamers" },
      { href: "#staff", label: "Staff" },
    ],
  },
  {
    heading: "Comunidad",
    links: [
      { href: "#faq", label: "FAQ" },
      { href: "#whitelist", label: "Whitelist" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-line py-10 pb-[max(2.5rem,env(safe-area-inset-bottom))]">
      <div className="page-shell">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div>
            <p className="font-display text-lg font-semibold tracking-tight text-white uppercase">
              {STUDIO_NAME}
              <span className="text-accent">.</span>
            </p>
            <p className="mt-1 max-w-xs font-term text-[0.7rem] leading-relaxed text-faint">
              Whitelist, escaleta y novedades de {SERIES_NAME} en un solo lugar.
            </p>
          </div>

          <nav className="flex gap-10" aria-label="Footer">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.heading}>
                <p className="font-term text-[0.65rem] tracking-[0.16em] text-muted uppercase">
                  {column.heading}
                </p>
                <ul className="mt-3 space-y-2">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="font-term text-[0.7rem] tracking-wide text-faint uppercase transition-colors duration-150 hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="flex flex-wrap items-start gap-3">
            <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="btn btn-ghost">
              <DiscordIcon className="h-4 w-4" />
              Discord
            </a>
            <a href="#whitelist" className="btn btn-primary">
              Postular
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-line pt-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="font-term text-[0.65rem] leading-relaxed text-faint">
            © 2026 · {SERIES_NAME}
          </p>
          <p className="font-term text-[0.65rem] leading-relaxed text-faint">
            Minecraft es marca de Mojang Studios / Microsoft. {STUDIO_NAME} Studio no está
            afiliado a Mojang ni a Microsoft.
          </p>
        </div>
      </div>
    </footer>
  );
}
