import { CtaBanner } from "./components/CtaBanner";
import { EscaletaSection } from "./components/EscaletaSection";
import { FaqSection } from "./components/FaqSection";
import { FeaturedStreamers } from "./components/FeaturedStreamers";
import { HeroSection } from "./components/HeroSection";
import { ClassifiedDossier } from "./components/ClassifiedDossier";
import { SeriesSection } from "./components/SeriesSection";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { StaffSection } from "./components/StaffSection";
import { StatusBanner } from "./components/StatusBanner";
import { StudioSection } from "./components/StudioSection";
import { WhitelistSection } from "./components/WhitelistSection";

export default function App() {
  return (
    <div className="relative min-h-dvh overflow-x-hidden">
      <div className="crt-overlay" aria-hidden />
      <div className="noise-overlay" aria-hidden />
      <div className="vignette" aria-hidden />

      <a href="#whitelist" className="skip-link">
        Ir a postulación
      </a>

      <StatusBanner />
      <SiteHeader />
      <HeroSection />

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
      <SiteFooter />
    </div>
  );
}
