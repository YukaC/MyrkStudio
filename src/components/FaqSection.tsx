import { useState } from "react";
import { accentStyle, FAQ, FAQ_SECTION } from "../content";

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
    </svg>
  );
}

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
        <h2 id="faq-title" className="section-title">
          {FAQ_SECTION.title}
        </h2>
        <p className="prose-muted mb-6 md:mb-8">{FAQ_SECTION.blurb}</p>

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
              style={accentStyle(index)}
            >
              <summary className="flex items-start justify-between gap-3 font-display text-sm font-semibold text-white uppercase sm:text-base">
                <span>{entry.question}</span>
                <ChevronIcon className="mt-0.5 size-4 shrink-0 text-faint transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-muted">{entry.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
