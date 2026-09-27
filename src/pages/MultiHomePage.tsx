import { MULTI_WHITELIST_HREF } from "../content";
import { HeroSection } from "../components/HeroSection";
import { PageFrame } from "../components/PageFrame";

/** One viewport: full-bleed hero. Wayfinding = header nav. */
export function MultiHomePage() {
  return (
    <PageFrame withAtmosphere={false} className="multi-frame--hero-bleed">
      <HeroSection whitelistHref={MULTI_WHITELIST_HREF} layout="viewport" />
    </PageFrame>
  );
}
