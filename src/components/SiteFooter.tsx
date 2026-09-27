import { FOOTER, NAV_LINKS, STUDIO_NAME } from "../content";

/** Zero-padded index for the sitemap band: derived from the array order, not stored (§V6) */
function linkIndex(position: number): string {
  return String(position + 1).padStart(2, "0");
}

export function SiteFooter() {
  return (
    <footer className="pb-[max(2.5rem,env(safe-area-inset-bottom))]">
      <div className="page-shell">
        <div className="py-10 sm:py-12">
          <div className="max-w-sm">
            <p className="font-display text-2xl font-semibold tracking-tight text-white uppercase">
              {STUDIO_NAME}
              <span className="text-accent">.</span>
            </p>
            <p className="mt-2 font-term text-[0.7rem] leading-relaxed text-faint">
              {FOOTER.tagline}
            </p>
          </div>
        </div>

        <nav aria-label="Sitio" className="border-y border-line">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 py-4 sm:flex-nowrap sm:justify-between">
            {NAV_LINKS.map((link, index) => (
              <li key={link.href} className="flex items-baseline gap-2">
                <span aria-hidden className="font-term text-[0.65rem] tracking-[0.14em] text-accent">
                  {linkIndex(index)}
                </span>
                <a
                  href={link.href}
                  className="font-term text-[0.75rem] tracking-[0.12em] text-faint uppercase transition-colors duration-150 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-term text-[0.65rem] tracking-wide text-faint">
            © 2026 · {STUDIO_NAME}
          </p>
          <p className="font-term text-[0.65rem] leading-relaxed text-faint sm:max-w-md sm:text-right">
            {FOOTER.legal}
          </p>
        </div>
      </div>
    </footer>
  );
}
