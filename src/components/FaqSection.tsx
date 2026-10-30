import { useRef, useState } from "react";
import { FAQ, FAQ_SECTION } from "../content";
import { DUR, EASE, gsap } from "../lib/gsap";
import { prefersReducedMotion } from "../lib/useReducedMotion";
import { EditorialScrollItem, EditorialScrollStagger } from "./editorial/EditorialScrollStagger";
import { SectionHeader } from "./SectionHeader";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const panelRefs = useRef<Array<HTMLParagraphElement | null>>([]);

  function animatePanel(index: number, isOpen: boolean) {
    const panel = panelRefs.current[index];
    if (!panel || prefersReducedMotion()) return;
    if (isOpen) {
      gsap.set(panel, { height: "auto", overflow: "hidden" });
      gsap.from(panel, { height: 0, duration: DUR.fast, ease: EASE });
    } else {
      gsap.to(panel, { height: 0, duration: DUR.fast, ease: EASE, overflow: "hidden" });
    }
  }

  function handleToggle(index: number, isOpen: boolean) {
    setOpenIndex((current) => {
      if (current !== null && current !== index && isOpen) {
        animatePanel(current, false);
      }
      animatePanel(index, isOpen);
      return isOpen ? index : current === index ? null : current;
    });
  }

  return (
    <section id="faq" className="editorial-section section-block" aria-labelledby="faq-title">
      <div className="page-shell">
        <SectionHeader
          index="08"
          titleId="faq-title"
          title={FAQ_SECTION.title}
          log={FAQ_SECTION.log}
          blurb={FAQ_SECTION.blurb}
        />

        <EditorialScrollStagger className="editorial-accordion" stagger={0.06}>
          {FAQ.map((entry, index) => (
            <EditorialScrollItem key={entry.question}>
              <details
                name="wl-faq"
                open={openIndex === index}
                onToggle={(event) => handleToggle(index, event.currentTarget.open)}
                className="editorial-accordion-item"
              >
                <summary>
                  <span className="editorial-accordion-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{entry.question}</span>
                  <span className="editorial-accordion-toggle" aria-hidden>
                    <span className="editorial-accordion-toggle-open">[−]</span>
                    <span className="editorial-accordion-toggle-closed">[+]</span>
                  </span>
                </summary>
                <p
                  ref={(node) => {
                    panelRefs.current[index] = node;
                  }}
                  className="editorial-accordion-answer"
                >
                  {entry.answer}
                </p>
              </details>
            </EditorialScrollItem>
          ))}
        </EditorialScrollStagger>
      </div>
    </section>
  );
}
