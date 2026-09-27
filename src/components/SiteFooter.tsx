import { FOOTER, STUDIO_NAME, type NavLinkItem } from "../content";
import { AppLink } from "./AppLink";

/** Zero-padded index for the sitemap band: derived from the array order (§V6) */
function linkIndex(position: number): string {
  return String(position + 1).padStart(2, "0");
}

type SiteFooterProps = {
  navLinks: readonly NavLinkItem[];
  /** Which demo variant is active — switcher links to the other */
  variant: "single" | "multi";
};

export function SiteFooter({ navLinks, variant }: SiteFooterProps) {
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
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 py-4 sm:justify-between lg:flex-nowrap">
            {navLinks.map((link, index) => (
              <li key={link.href} className="flex items-baseline gap-2">
                <span aria-hidden className="font-term text-[0.65rem] tracking-[0.14em] text-accent">
                  {linkIndex(index)}
                </span>
                <AppLink
                  href={link.href}
                  className="nav-chrome-control font-term inline-block py-2.5 text-[0.75rem] tracking-[0.12em] text-faint uppercase hover:text-accent"
                >
                  {link.label}
                </AppLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <p className="font-term text-[0.65rem] tracking-wide text-faint">
              © 2026 · {STUDIO_NAME}
            </p>
            <p className="font-term text-[0.65rem] tracking-wide text-faint">
              Demo:{" "}
              {variant === "single" ? (
                <>
                  <span className="text-muted">Clásica</span>
                  {" · "}
                  <AppLink href="/m" className="text-accent underline-offset-2 hover:underline">
                    Multi-page
                  </AppLink>
                </>
              ) : (
                <>
                  <AppLink href="/" className="text-accent underline-offset-2 hover:underline">
                    Clásica
                  </AppLink>
                  {" · "}
                  <span className="text-muted">Multi-page</span>
                </>
              )}
            </p>
          </div>
          <p className="font-term text-[0.65rem] leading-relaxed text-faint sm:max-w-md sm:text-right">
            {FOOTER.legal}
          </p>
        </div>
      </div>
    </footer>
  );
}
