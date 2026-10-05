import { WHITELIST_INVITE_NOTE } from "../content";
import { HowItWorks } from "./HowItWorks";
import { SectionHeader } from "./SectionHeader";
import { WhitelistForm } from "./WhitelistForm";

type WhitelistSectionProps = {
  /** Multi viewport: denser layout, no steps column scroll. */
  compact?: boolean;
};

export function WhitelistSection({ compact = false }: WhitelistSectionProps) {
  return (
    <section
      id="whitelist"
      /* Re-states the section rhythm instead of replacing it: a bare
         `max(3rem, safe-area)` would drop the desktop bottom padding from ~80px
         to 48px while the top stays on the clamp, and every other section would
         no longer line up. Now that utilities outrank `.section-block` (§V17),
         the safe-area is a floor on top of the shared value, not a replacement. */
      className={
        compact
          ? "editorial-section section-block !py-2"
          : "editorial-section section-block pb-[max(clamp(2.75rem,7vw,5rem),env(safe-area-inset-bottom))]"
      }
      aria-labelledby="whitelist-title"
    >
      <div
        className={
          compact
            ? "page-shell grid items-center gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8"
            : "page-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14"
        }
      >
        <div>
          <SectionHeader
            index="09"
            titleId="whitelist-title"
            title="Reservá tu plaza"
            log={{ main: "Postulación", tail: "whitelist" }}
            blurbClassName={compact ? "prose-muted mb-0" : "prose-muted mb-6"}
            blurb={<>{WHITELIST_INVITE_NOTE}</>}
          />
          {compact ? null : <HowItWorks />}
        </div>

        <div className={compact ? "panel p-3 sm:p-4" : "panel p-4 sm:p-6 md:p-8"}>
          <WhitelistForm compact={compact} />
        </div>
      </div>
    </section>
  );
}
