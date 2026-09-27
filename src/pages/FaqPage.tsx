import { FaqSection } from "../components/FaqSection";
import { PageFrame } from "../components/PageFrame";

/** One job: resolver dudas. Scroll interno si el accordion no cabe. */
export function FaqPage() {
  return (
    <PageFrame allowScroll>
      <FaqSection />
    </PageFrame>
  );
}
