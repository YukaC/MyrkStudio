import { useState } from "react";
import { FAQ, FAQ_SECTION } from "../content";
import { SectionHeader } from "./SectionHeader";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function handleToggle(index: number, isOpen: boolean) {
    setOpenIndex((current) => (isOpen ? index : current === index ? null : current));
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

        <div className="editorial-accordion">
          {FAQ.map((entry, index) => (
            <details
              key={entry.question}
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
              <p className="editorial-accordion-answer">{entry.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
