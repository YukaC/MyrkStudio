import { NAV_LINKS, WHITELIST_HREF } from "../content";
import { CtaBanner } from "../components/CtaBanner";
import { EditorialHero } from "../components/editorial/EditorialHero";
import { EditorialNav } from "../components/editorial/EditorialNav";
import { EscaletaSection } from "../components/EscaletaSection";
import { FaqSection } from "../components/FaqSection";
import { FeaturedStreamers } from "../components/FeaturedStreamers";
import { ClassifiedDossier } from "../components/ClassifiedDossier";
import { SeriesSection } from "../components/SeriesSection";
import { SiteFooter } from "../components/SiteFooter";
import { StaffSection } from "../components/StaffSection";
import { StatusBanner } from "../components/StatusBanner";
import { StudioSection } from "../components/StudioSection";
import { WhitelistSection } from "../components/WhitelistSection";

/** Canonical single-scroll experience (Bunkr structure · MYRK palette). */
export function SinglePageLayout() {
  return (
    <div className="editorial-site relative min-h-dvh overflow-x-clip">
      <div className="noise-overlay opacity-[0.06]" aria-hidden />

      <a href={WHITELIST_HREF} className="skip-link">
        Ir a postulación
      </a>

      <StatusBanner />
      <EditorialNav />
      <EditorialHero />

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

      <CtaBanner />
      <SiteFooter navLinks={NAV_LINKS} />
    </div>
  );
}
