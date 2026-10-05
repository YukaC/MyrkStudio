import {
  ESCALETA_SECTION,
  ESCALETA_VISIBLE_WEEKS,
  ESCALETA_WEEKS,
  getVisibleEscaletaWeeks,
  type EscaletaDayState,
} from "../content";
import { LockIcon } from "./icons";
import { SectionHeader } from "./SectionHeader";

/** Record, not a ternary in a template string: a new state then fails the type
    check instead of silently rendering as the "open" case. */
const DAY_PANEL_CLASSES: Record<EscaletaDayState, string> = {
  open: "",
  corrupt: "opacity-70",
};

const DAY_DETAIL_CLASSES: Record<EscaletaDayState, string> = {
  open: "text-cream",
  corrupt: "text-accent line-through decoration-accent",
};

export function EscaletaSection() {
  const weeks = getVisibleEscaletaWeeks();
  const hasUpcoming = ESCALETA_VISIBLE_WEEKS < ESCALETA_WEEKS.length;

  return (
    <section id="escaleta" className="editorial-section section-block" aria-labelledby="escaleta-title">
      <div className="page-shell">
        <SectionHeader
          index="04"
          titleId="escaleta-title"
          title={ESCALETA_SECTION.title}
          blurb={ESCALETA_SECTION.blurb}
        />

        <div className="flex flex-col gap-6 sm:gap-8">
          {weeks.map((week, weekIndex) => (
            <div key={week.id}>
              <h3 className="editorial-escaleta-week-title">
                <span className="editorial-section-index">
                  {String(weekIndex + 1).padStart(2, "0")}
                </span>
                {week.title}
              </h3>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
                {week.days.map((day) => (
                  <div
                    key={`${week.id}-${day.label}`}
                    className={`editorial-card editorial-escaleta-day ${DAY_PANEL_CLASSES[day.state]}`}
                  >
                    {day.state === "corrupt" ? (
                      <span className="absolute top-1.5 right-1.5 scale-75 text-faint" aria-hidden>
                        <LockIcon />
                      </span>
                    ) : null}
                    <span className="font-term text-[0.65rem] tracking-wider text-cream/50">
                      {day.label}
                    </span>
                    <span
                      className={`mt-1 font-editorial text-sm font-semibold uppercase break-words hyphens-auto sm:text-base ${DAY_DETAIL_CLASSES[day.state]}`}
                    >
                      {day.detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {hasUpcoming ? (
          <p className="mt-5 font-term text-[0.7rem] tracking-wide text-faint">
            {ESCALETA_SECTION.upcomingNote}
          </p>
        ) : null}
      </div>
    </section>
  );
}
