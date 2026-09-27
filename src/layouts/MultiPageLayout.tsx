import { useRef } from "react";
import { Outlet } from "react-router-dom";
import { MULTI_NAV_LINKS, MULTI_WHITELIST_HREF } from "../content";
import { AppLink } from "../components/AppLink";
import { MultiChromeBar } from "../components/MultiChromeBar";
import { MultiHashRedirect } from "../components/MultiHashRedirect";
import { SiteHeader } from "../components/SiteHeader";
import { StatusBanner } from "../components/StatusBanner";
import { useMultiSectionScroll } from "../hooks/useMultiSectionScroll";

/** Multi-page shell — one viewport; wheel/swipe advances sections with a soft settle. */
export function MultiPageLayout() {
  const shellRef = useRef<HTMLDivElement>(null);
  useMultiSectionScroll(shellRef);

  return (
    <div ref={shellRef} className="multi-shell relative">
      <div className="crt-overlay" aria-hidden />
      <div className="noise-overlay" aria-hidden />
      <div className="vignette" aria-hidden />

      <AppLink href={MULTI_WHITELIST_HREF} className="skip-link">
        Ir a postulación
      </AppLink>

      <MultiHashRedirect />
      <StatusBanner />
      <SiteHeader navLinks={MULTI_NAV_LINKS} whitelistHref={MULTI_WHITELIST_HREF} />

      <main className="multi-main">
        <Outlet />
      </main>

      <MultiChromeBar />
    </div>
  );
}
