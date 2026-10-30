import { FOOTER, STUDIO_NAME, type NavLinkItem } from "../content";
import { AppLink } from "./AppLink";
import { EditorialScrollReveal } from "./editorial/EditorialScrollReveal";

function linkIndex(position: number): string {
  return String(position + 1).padStart(2, "0");
}

type SiteFooterProps = {
  navLinks: readonly NavLinkItem[];
};

export function SiteFooter({ navLinks }: SiteFooterProps) {
  return (
    <footer id="footer" className="editorial-footer pb-[max(2.5rem,env(safe-area-inset-bottom))]">
      <EditorialScrollReveal className="page-shell">
        <p className="font-editorial text-2xl uppercase tracking-wide text-cream">{STUDIO_NAME}</p>
        <p className="mt-2 max-w-md text-sm text-cream/60">{FOOTER.tagline}</p>

        <nav aria-label="Sitio" className="editorial-footer-index mt-8">
          {navLinks.map((link, index) => (
            <AppLink key={link.href} href={link.href}>
              [{linkIndex(index)}] {link.label}
            </AppLink>
          ))}
        </nav>

        <div className="editorial-footer-legal mt-6 flex flex-col gap-2 sm:flex-row sm:justify-between">
          <p>© 2026 · {STUDIO_NAME}</p>
          <p className="sm:max-w-md sm:text-right">{FOOTER.legal}</p>
        </div>
      </EditorialScrollReveal>
    </footer>
  );
}
