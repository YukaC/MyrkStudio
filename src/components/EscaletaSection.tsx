import { WEEK1_DAYS } from "../content";
import { LockIcon } from "./icons";
import { SectionHeader } from "./SectionHeader";

export function EscaletaSection() {
  return (
    <section className="section-block" aria-labelledby="escaleta-title">
      <div className="page-shell">
        <SectionHeader
          titleId="escaleta-title"
          title="Semana 1"
          blurbClassName="mb-6 font-term text-xs tracking-wider text-faint uppercase"
          blurb="Escaleta de eventos · en proceso"
        />

        <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
          {WEEK1_DAYS.map((day) => (
            <div
              key={day.label}
              className={`panel flex min-h-[5.5rem] flex-col justify-center p-3 text-center sm:min-h-[6.5rem] sm:p-4 ${
                day.state === "corrupt" ? "opacity-70" : ""
              }`}
            >
              <span className="font-term text-[0.65rem] tracking-wider text-faint">{day.label}</span>
              <span
                className={`mt-1 font-display text-sm font-semibold uppercase sm:text-base ${
                  day.state === "corrupt"
                    ? "text-accent line-through decoration-accent"
                    : "text-white"
                }`}
              >
                {day.detail}
              </span>
            </div>
          ))}
        </div>

        <div className="panel mt-3 flex items-center gap-3 p-4 opacity-60 sm:mt-4">
          <LockIcon />
          <div>
            <p className="font-display text-sm font-semibold text-white uppercase">
              Semanas 2 · 3 · 4
            </p>
            <p className="font-term text-xs text-faint">
              Calendario bloqueado hasta progresión del servidor
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
