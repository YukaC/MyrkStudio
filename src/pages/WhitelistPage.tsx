import { PageFrame } from "../components/PageFrame";
import { WhitelistSection } from "../components/WhitelistSection";

/** Operate — form is the product; one viewport, no inner scroll. */
export function WhitelistPage() {
  return (
    <PageFrame>
      <WhitelistSection compact />
    </PageFrame>
  );
}
