import { useState } from "react";
import { FAQ, FAQ_SECTION } from "../content";
import { ChevronIcon } from "./icons";
import { SectionHeader } from "./SectionHeader";

export function FaqSection() {
  // Everything starts collapsed so every row loads at the same height.
  // React owns `open` so the DOM cannot drift from the accordion state; the
  // native name="wl-faq" group stays only as a no-JS exclusivity fallback.
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function handleToggle(index: number, isOpen: boolean) {
    setOpenIndex((current) => (isOpen ? index : current === index ? null : current));
  }

  return (
    <section id="faq" className="section-block" aria-labelledby="faq-title">
      <div className="page-shell">
        <SectionHeader
          titleId="faq-title"
          title={FAQ_SECTION.title}
          log={FAQ_SECTION.log}
          blurbClassName="prose-muted mb-6 md:mb-8"
          blurb={FAQ_SECTION.blurb}
        />

        {/* items-start: the default stretch made a closed item inherit the
            open sibling's height and read as an open-but-empty panel */}
        <div className="grid gap-3 items-start md:grid-cols-2">
          {FAQ.map((entry, index) => (
            <details
              key={entry.question}
              name="wl-faq"
              open={openIndex === index}
              onToggle={(event) => handleToggle(index, event.currentTarget.open)}
              className="faq-item panel group p-5"
            >
              <summary className="flex items-start justify-between gap-3 font-display text-sm font-semibold text-white uppercase sm:text-base">
                <span>{entry.question}</span>
                <ChevronIcon className="faq-chevron mt-0.5 text-faint group-open:rotate-180" />
              </summary>
              <p className="faq-answer text-sm leading-relaxed text-muted">{entry.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
