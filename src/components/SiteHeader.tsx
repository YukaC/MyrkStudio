import { useEffect, useState } from "react";
import { CTA_LABEL, DISCORD_URL, NAV_LINKS } from "../content";
import { DiscordIcon, MenuIcon } from "./icons";

export function SiteHeader() {
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
            {CTA_LABEL}
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a href="#whitelist" className="nav-cta">
            {CTA_LABEL}
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
  );
}
