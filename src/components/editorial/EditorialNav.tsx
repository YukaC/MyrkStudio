import { useEffect, useRef, useState } from "react";
import { CTA_LABEL, DISCORD_URL, NAV_LINKS, STUDIO_NAME, WHITELIST_HREF } from "../../content";
import { AppLink } from "../AppLink";
import { MenuIcon } from "../icons";

export function EditorialNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

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

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isMobileMenuOpen]);

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  const openAttr = isMobileMenuOpen ? "true" : "false";

  return (
    <>
      <button
        type="button"
        data-mobile-menu-backdrop=""
        data-open={openAttr}
        aria-label="Cerrar menú"
        aria-hidden={!isMobileMenuOpen}
        tabIndex={isMobileMenuOpen ? 0 : -1}
        className="mobile-menu-backdrop editorial-menu-backdrop"
        onClick={closeMobileMenu}
      />

      <header ref={headerRef} className="editorial-nav">
        <div className="editorial-nav-rule" aria-hidden />
        <nav className="editorial-nav-inner page-shell" aria-label="Principal">
          <AppLink href="#top" className="editorial-nav-brand" onClick={closeMobileMenu}>
            <span className="sr-only">{STUDIO_NAME}</span>
            <span aria-hidden className="editorial-nav-mark">
              M
            </span>
          </AppLink>

          <ul className="editorial-nav-links">
            {NAV_LINKS.map((link, index) => (
              <li key={link.href} className="editorial-nav-item">
                {index > 0 ? (
                  <span className="editorial-nav-dot" aria-hidden>
                    ·
                  </span>
                ) : null}
                <AppLink href={link.href} className="editorial-nav-link">
                  {link.label}
                </AppLink>
              </li>
            ))}
          </ul>

          <div className="editorial-nav-actions">
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noreferrer"
              className="editorial-nav-ghost"
            >
              Discord
            </a>
            <AppLink href={WHITELIST_HREF} className="editorial-nav-cta">
              {CTA_LABEL}
              <span aria-hidden> →</span>
            </AppLink>
            <button
              type="button"
              className="editorial-nav-menu-btn lg:hidden"
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="editorial-mobile-menu"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
            >
              <MenuIcon open={isMobileMenuOpen} />
            </button>
          </div>
        </nav>

        <div id="editorial-mobile-menu" data-open={openAttr} className="editorial-mobile-menu">
          {NAV_LINKS.map((link) => (
            <AppLink
              key={link.href}
              href={link.href}
              className="editorial-mobile-link"
              onClick={closeMobileMenu}
            >
              {link.label}
            </AppLink>
          ))}
        </div>
      </header>
    </>
  );
}
