import {
  ESCALETA_SECTION,
  ESCALETA_VISIBLE_WEEKS,
  ESCALETA_WEEKS,
  getVisibleEscaletaWeeks,
  type EscaletaDayState,
} from "../content";
import { LockIcon } from "./icons";
import { EditorialScrollItem, EditorialScrollStagger } from "./editorial/EditorialScrollStagger";
import { SectionHeader } from "./SectionHeader";

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
  const firstWeek = weeks[0];

  return (
    <section id="escaleta" className="editorial-section section-block relative" aria-labelledby="escaleta-title">
      <div
        data-progress=""
        aria-hidden
        className="fx-escaleta-progress"
        style={{
          position: "absolute",
          left: 0,
          top: "4rem",
          bottom: "4rem",
          width: 2,
          background: "var(--accent)",
          transformOrigin: "top",
          transform: "scaleY(0)",
        }}
      />
      <div className="page-shell">
        <SectionHeader
          index="04"
          titleId="escaleta-title"
          title={ESCALETA_SECTION.title}
          blurb={ESCALETA_SECTION.blurb}
        />

        {firstWeek ? (
          <div className="mb-8">
            <h3 className="editorial-escaleta-week-title">
              <span className="editorial-section-index">01</span>
              {firstWeek.title}
            </h3>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
              {firstWeek.days.map((day) => (
                <div
                  key={`${firstWeek.id}-${day.label}`}
                  data-day=""
                  className={`editorial-card editorial-escaleta-day ${DAY_PANEL_CLASSES[day.state]}`}
                  style={{ borderColor: "transparent" }}
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
                    className={`mt-1 font-sans text-sm font-semibold uppercase break-words hyphens-auto sm:text-base ${DAY_DETAIL_CLASSES[day.state]}`}
                    {...(day.state === "corrupt"
                      ? { "data-scramble": "", "data-corrupt-glitch": "" }
                      : {})}
                  >
                    {day.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {weeks.length > 1 ? (
          <EditorialScrollStagger className="flex flex-col gap-6 sm:gap-8" stagger={0.12}>
            {weeks.slice(1).map((week, weekIndex) => (
              <EditorialScrollItem key={week.id}>
                <h3 className="editorial-escaleta-week-title">
                  <span className="editorial-section-index">
                    {String(weekIndex + 2).padStart(2, "0")}
                  </span>
                  {week.title}
                </h3>
                <EditorialScrollStagger
                  className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6"
                  stagger={0.04}
                >
                  {week.days.map((day) => (
                    <EditorialScrollItem key={`${week.id}-${day.label}`}>
                      <div
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
                          className={`mt-1 font-sans text-sm font-semibold uppercase break-words hyphens-auto sm:text-base ${DAY_DETAIL_CLASSES[day.state]}`}
                        >
                          {day.detail}
                        </span>
                      </div>
                    </EditorialScrollItem>
                  ))}
                </EditorialScrollStagger>
              </EditorialScrollItem>
            ))}
          </EditorialScrollStagger>
        ) : null}

        {hasUpcoming ? (
          <p className="mt-5 font-term text-[0.7rem] tracking-wide text-faint">
            {ESCALETA_SECTION.upcomingNote}
          </p>
        ) : null}
      </div>
    </section>
  );
}
