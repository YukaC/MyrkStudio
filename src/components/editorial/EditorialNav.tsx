import { useEffect, useRef, useState } from "react";
import { CTA_LABEL, NAV_LINKS, STUDIO_NAME, WHITELIST_HREF } from "../../content";
import { readCssLengthPx } from "../../hooks/cssLength";
import { useNavChrome } from "../../hooks/useNavChrome";
import { resolveNavScrollStates, type NavScrollState } from "../../hooks/navScrollSpy";
import { AppLink } from "../AppLink";
import { MenuIcon } from "../icons";
import { MyrkStudioMark } from "./MyrkStudioMark";
import { WolfSealMark } from "./WolfSealMark";

const INITIAL_NAV_SCROLL: Record<string, NavScrollState> = Object.fromEntries(
  NAV_LINKS.map((link) => [link.href, "future" as const]),
);

function NavCtaArrow() {
  return (
    <svg
      className="editorial-nav-cta-arrow"
      width="28"
      height="17"
      viewBox="0 0 24 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect
        className="editorial-nav-cta-pill"
        x="0.5"
        y="0.5"
        width="23"
        height="13.6667"
        rx="6.83333"
        stroke="currentColor"
      />
      <path className="editorial-nav-cta-line" d="M7 7.333H17" stroke="currentColor" />
      <path
        className="editorial-nav-cta-chevron"
        d="M13.667 4L17 7.333L13.667 10.667"
        stroke="currentColor"
      />
    </svg>
  );
}

export function EditorialNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isPastReveal, setIsPastReveal] = useState(false);
  const [navScrollStates, setNavScrollStates] =
    useState<Record<string, NavScrollState>>(INITIAL_NAV_SCROLL);
  const headerRef = useRef<HTMLElement>(null);
  useNavChrome(headerRef);

  useEffect(() => {
    let frame = 0;

    function syncNavChrome() {
      const navHeight = readCssLengthPx(
        getComputedStyle(document.documentElement).getPropertyValue("--nav-h"),
        64,
      );
      const headerBottom = headerRef.current?.getBoundingClientRect().bottom || navHeight;
      // Mid-viewport probe: the section occupying the reading band wins.
      const probeY = Math.max(headerBottom + 24, window.innerHeight * 0.35);

      const heroEl = document.getElementById("top");
      if (heroEl) {
        setIsPastHero(heroEl.getBoundingClientRect().bottom <= headerBottom + 2);
      }

      const revealSentinel = document.getElementById("nav-reveal-sentinel");
      if (revealSentinel) {
        setIsPastReveal(revealSentinel.getBoundingClientRect().top <= headerBottom + 2);
      } else {
        setIsPastReveal(window.scrollY >= 5);
      }

      const nextStates = resolveNavScrollStates(NAV_LINKS, probeY);
      setNavScrollStates((prev) => {
        for (const link of NAV_LINKS) {
          if (prev[link.href] !== nextStates[link.href]) return nextStates;
        }
        return prev;
      });
    }

    function onScrollOrResize() {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        syncNavChrome();
      });
    }

    syncNavChrome();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

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
  const pastHeroAttr = isPastHero ? "true" : "false";
  const pastRevealAttr = isPastReveal ? "true" : "false";

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

      <header
        ref={headerRef}
        className="editorial-nav"
        data-past-hero={pastHeroAttr}
        data-past-reveal={pastRevealAttr}
      >
        <div className="editorial-nav-shell">
          <AppLink href="#top" className="editorial-nav-brand" onClick={closeMobileMenu}>
            <span className="sr-only">{STUDIO_NAME}</span>
            <span aria-hidden className="editorial-nav-mark">
              <MyrkStudioMark />
            </span>
          </AppLink>

          <div className="editorial-nav-main">
            <nav className="editorial-nav-center" aria-label="Principal">
              <ul className="editorial-nav-links">
                {NAV_LINKS.map((link, index) => (
                  <li key={link.href} className="editorial-nav-item">
                    {index > 0 ? (
                      <span className="editorial-nav-dot" aria-hidden>
                        ·
                      </span>
                    ) : null}
                    <AppLink
                      href={link.href}
                      className={`editorial-nav-link is-${navScrollStates[link.href] ?? "future"}`}
                      navScrollState={navScrollStates[link.href] ?? "future"}
                    >
                      {link.label}
                    </AppLink>
                  </li>
                ))}
              </ul>
              <AppLink
                href={WHITELIST_HREF}
                className="editorial-nav-cta"
                data-magnetic=""
              >
                <span className="editorial-nav-cta-label">{CTA_LABEL}</span>
                <NavCtaArrow />
              </AppLink>
            </nav>
            <div className="editorial-nav-border" aria-hidden />
          </div>

          <div className="editorial-nav-end">
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
            <span className="editorial-nav-seal" aria-hidden>
              <WolfSealMark />
            </span>
          </div>
        </div>

        <div id="editorial-mobile-menu" data-open={openAttr} className="editorial-mobile-menu">
          {NAV_LINKS.map((link) => (
            <AppLink
              key={link.href}
              href={link.href}
              className={`editorial-mobile-link is-${navScrollStates[link.href] ?? "future"}`}
              navScrollState={navScrollStates[link.href] ?? "future"}
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
