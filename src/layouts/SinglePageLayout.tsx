import { NAV_LINKS, WHITELIST_HREF } from "../content";
import { CtaBanner } from "../components/CtaBanner";
import { EscaletaSection } from "../components/EscaletaSection";
import { FaqSection } from "../components/FaqSection";
import { FeaturedStreamers } from "../components/FeaturedStreamers";
import { HeroSection } from "../components/HeroSection";
import { ClassifiedDossier } from "../components/ClassifiedDossier";
import { SeriesSection } from "../components/SeriesSection";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { StaffSection } from "../components/StaffSection";
import { StatusBanner } from "../components/StatusBanner";
import { StudioSection } from "../components/StudioSection";
import { WhitelistSection } from "../components/WhitelistSection";

/** Classic demo — one scroll, hash anchors. */
export function SinglePageLayout() {
  return (
    <div className="relative min-h-dvh overflow-x-clip">
      <div className="crt-overlay" aria-hidden />
      <div className="noise-overlay" aria-hidden />
      <div className="vignette" aria-hidden />

      <a href={WHITELIST_HREF} className="skip-link">
        Ir a postulación
      </a>

      <StatusBanner />
      <SiteHeader navLinks={NAV_LINKS} whitelistHref={WHITELIST_HREF} />
      <HeroSection whitelistHref={WHITELIST_HREF} />

      <main>
        <SeriesSection />
        <ClassifiedDossier />
        <EscaletaSection />
        <StudioSection />
        <StaffSection />
        <FeaturedStreamers />
        <FaqSection />
        <WhitelistSection />
      </main>

      <CtaBanner whitelistHref={WHITELIST_HREF} />
      <SiteFooter navLinks={NAV_LINKS} variant="single" />
    </div>
  );
}
