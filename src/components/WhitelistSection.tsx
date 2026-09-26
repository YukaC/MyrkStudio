import { WHITELIST_INVITE_NOTE } from "../content";
import { HowItWorks } from "./HowItWorks";
import { SectionHeader } from "./SectionHeader";
import { WhitelistForm } from "./WhitelistForm";

export function WhitelistSection() {
  return (
    <section
      id="whitelist"
      className="section-block pb-[max(3rem,env(safe-area-inset-bottom))]"
      aria-labelledby="whitelist-title"
    >
      <div className="page-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div>
          <SectionHeader
            titleId="whitelist-title"
            title="Reservá tu plaza"
            log={{ main: "Postulación", tail: "whitelist" }}
            blurbClassName="mb-6"
            blurb={<>{WHITELIST_INVITE_NOTE}</>}
          />
          <HowItWorks />
        </div>

        <div className="panel p-4 sm:p-6 md:p-8">
          <WhitelistForm />
        </div>
      </div>
    </section>
  );
}
