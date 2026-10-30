import { WHITELIST_INVITE_NOTE } from "../content";
import { EditorialScrollItem, EditorialScrollStagger } from "./editorial/EditorialScrollStagger";
import { HowItWorks } from "./HowItWorks";
import { SectionHeader } from "./SectionHeader";
import { WhitelistForm } from "./WhitelistForm";

export function WhitelistSection() {
  return (
    <section
      id="whitelist"
      className="editorial-section section-block pb-[max(clamp(2.75rem,7vw,5rem),env(safe-area-inset-bottom))]"
      aria-labelledby="whitelist-title"
    >
      <EditorialScrollStagger className="page-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14" stagger={0.12}>
        <EditorialScrollItem>
          <SectionHeader
            index="09"
            titleId="whitelist-title"
            title="Reservá tu plaza"
            log={{ main: "Postulación", tail: "whitelist" }}
            blurb={WHITELIST_INVITE_NOTE}
          />
          <HowItWorks />
        </EditorialScrollItem>

        <EditorialScrollItem className="editorial-form-shell">
          <WhitelistForm />
        </EditorialScrollItem>
      </EditorialScrollStagger>
    </section>
  );
}
