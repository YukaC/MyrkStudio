import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { CTA_LABEL, DISCORD_URL, STUDIO_NAME, type NavLinkItem } from "../content";
import { AppLink } from "./AppLink";
import { DiscordIcon, MenuIcon } from "./icons";

type SiteHeaderProps = {
  navLinks: readonly NavLinkItem[];
  whitelistHref: string;
};

export function SiteHeader({ navLinks, whitelistHref }: SiteHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const location = useLocation();

  // Close the drawer on route change (multi-page); hash jumps on single-page
  // still use onClick on each link.
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    function closeMobileMenu() {
      setIsMobileMenuOpen(false);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeMobileMenu();
    }

    function onPointerDown(event: PointerEvent) {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (headerRef.current?.contains(target)) return;
      closeMobileMenu();
    }

    function onResize() {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        closeMobileMenu();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("resize", onResize);
    };
  }, [isMobileMenuOpen]);

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  const openAttr = isMobileMenuOpen ? "true" : "false";
  const brandHref = whitelistHref.startsWith("/") ? "/m" : "#top";

  return (
    <>
      <button
        type="button"
        data-mobile-menu-backdrop=""
        data-open={openAttr}
        aria-label="Cerrar menú"
        aria-hidden={!isMobileMenuOpen}
        tabIndex={isMobileMenuOpen ? 0 : -1}
        className="mobile-menu-backdrop"
        onClick={closeMobileMenu}
      />

      <header ref={headerRef} className="site-nav">
        <nav className="page-shell nav-inner" aria-label="Principal">
          <AppLink
            href={brandHref}
            className="font-display text-lg font-bold tracking-tight text-white uppercase sm:text-xl"
            onClick={closeMobileMenu}
          >
            {STUDIO_NAME}
            <span className="text-accent">.</span>
          </AppLink>

          <div className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((link) => (
              <AppLink key={link.href} href={link.href} className="nav-link">
                {link.label}
              </AppLink>
            ))}
            <AppLink href={whitelistHref} className="nav-cta ml-2">
              {CTA_LABEL}
            </AppLink>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <AppLink href={whitelistHref} className="nav-cta" onClick={closeMobileMenu}>
              {CTA_LABEL}
            </AppLink>
            <button
              type="button"
              className="nav-chrome-control inline-flex size-11 items-center justify-center text-muted hover:text-accent active:scale-[0.97] active:text-accent"
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
            >
              <MenuIcon open={isMobileMenuOpen} />
            </button>
          </div>
        </nav>

        <div id="mobile-menu" data-open={openAttr} className="mobile-menu-panel">
          {navLinks.map((link) => (
            <AppLink
              key={link.href}
              href={link.href}
              className="nav-chrome-control border-b border-line px-6 py-4 font-term text-xs tracking-[0.14em] text-muted uppercase hover:bg-[color-mix(in_srgb,var(--color-accent)_10%,transparent)] hover:text-accent active:bg-[color-mix(in_srgb,var(--color-accent)_10%,transparent)] active:text-accent"
              onClick={closeMobileMenu}
            >
              {link.label}
            </AppLink>
          ))}
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noreferrer"
            className="nav-chrome-control flex items-center gap-2 px-6 py-4 font-term text-xs tracking-[0.14em] text-[#a5b4fc] uppercase hover:bg-[color-mix(in_srgb,var(--color-accent)_10%,transparent)] hover:text-accent"
            onClick={closeMobileMenu}
          >
            <DiscordIcon className="h-4 w-4" />
            Discord
          </a>
        </div>
      </header>
    </>
  );
}
