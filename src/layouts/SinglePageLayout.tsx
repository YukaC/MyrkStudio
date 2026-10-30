import { useRef } from "react";
import { NAV_LINKS, WHITELIST_HREF } from "../content";
import { CtaBanner } from "../components/CtaBanner";
import { EditorialHero } from "../components/editorial/EditorialHero";
import { GuardapampaDivider } from "../components/editorial/GuardapampaDivider";
import { EditorialNav } from "../components/editorial/EditorialNav";
import Cursor from "../components/fx/Cursor";
import Grain from "../components/fx/Grain";
import Marquee from "../components/fx/Marquee";
import Preloader from "../components/fx/Preloader";
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
import { useScrollFx } from "../hooks/useScrollFx";

/** Canonical single-scroll experience (Bunkr structure · MYRK palette). */
export function SinglePageLayout() {
  const rootRef = useRef<HTMLDivElement>(null);
  useScrollFx(rootRef);

  return (
    <div ref={rootRef} className="editorial-site relative min-h-dvh overflow-x-clip">
      <Preloader />
      <Cursor />
      <Grain />

      <a href={WHITELIST_HREF} className="skip-link">
        Ir a postulación
      </a>

      <StatusBanner />
      <EditorialNav />
      <EditorialHero />
      <GuardapampaDivider id="nav-reveal-sentinel" />
      <Marquee />

      <main>
        <SeriesSection />
        <GuardapampaDivider />
        <ClassifiedDossier />
        <GuardapampaDivider />
        <EscaletaSection />
        <GuardapampaDivider />
        <StudioSection />
        <GuardapampaDivider />
        <StaffSection />
        <GuardapampaDivider />
        <FeaturedStreamers />
        <GuardapampaDivider />
        <FaqSection />
        <GuardapampaDivider />
        <WhitelistSection />
      </main>

      <GuardapampaDivider />
      <CtaBanner />
      <SiteFooter navLinks={NAV_LINKS} />
    </div>
  );
}
