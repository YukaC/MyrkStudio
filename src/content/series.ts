import { SERIES_NAME } from "./site";

export const SERIES_SECTION = {
  log: { main: "La serie", tail: "archivo" },
  title: "No somos una serie del montón",
  blurb: `${SERIES_NAME} trata de lo que queda después del colapso: territorio, recursos y una amenaza inesperada.`,
} as const;

export type SeriesFeature = {
  id: string;
  title: string;
  body: string;
};

export const SERIES_FEATURES: SeriesFeature[] = [
  {
    id: "01",
    title: "Supervivencia real",
    body: "Escasez, decisiones con consecuencias y un mundo que no perdona.",
  },
  {
    id: "02",
    title: "Facciones",
    body: "Grupos con intereses propios disputándose la zona cero.",
  },
  {
    id: "03",
    title: "Eventos guionizados",
    body: "Una escaleta narrativa dirige la historia semana a semana.",
  },
  {
    id: "04",
    title: "Zona cero explorable",
    body: "Un Japón post-colapso, un territorio por descubrir...",
  },
];

export const ESCALETA_SECTION = {
  title: "Escaleta",
  blurb: "Evento de 4 semanas · se revela al avance del servidor",
  upcomingNote: "Las semanas siguientes se desbloquean con el progreso in-game.",
} as const;

export type EscaletaDayState = "open" | "corrupt";

export type EscaletaDay = {
  label: string;
  detail: string;
  state: EscaletaDayState;
};

export type EscaletaWeek = {
  id: string;
  title: string;
  days: readonly EscaletaDay[];
};

/**
 * How many weeks are public (1–4). Bump this as the server progresses —
 * later weeks stay out of the DOM until unlocked (§V7).
 */
export const ESCALETA_VISIBLE_WEEKS = 1;

const CORRUPT_DAY = { detail: "[CORRUPTO]", state: "corrupt" as const };

/** Six-day week template: intermediates sealed; day 6 = Main Event. */
function buildWeekDays(day1Detail: string): EscaletaDay[] {
  return [
    { label: "DÍA 1", detail: day1Detail, state: "open" },
    { label: "DÍA 2", ...CORRUPT_DAY },
    { label: "DÍA 3", ...CORRUPT_DAY },
    { label: "DÍA 4", ...CORRUPT_DAY },
    { label: "DÍA 5", ...CORRUPT_DAY },
    { label: "DÍA 6", detail: "Main Event", state: "open" },
  ];
}

export const ESCALETA_WEEKS: EscaletaWeek[] = [
  { id: "w1", title: "Semana 1", days: buildWeekDays("Apertura") },
  { id: "w2", title: "Semana 2", days: buildWeekDays("Inicio") },
  { id: "w3", title: "Semana 3", days: buildWeekDays("Inicio") },
  { id: "w4", title: "Semana 4", days: buildWeekDays("Inicio") },
];

/** Weeks currently safe to render on the public site. */
export function getVisibleEscaletaWeeks(
  visibleCount: number = ESCALETA_VISIBLE_WEEKS,
): EscaletaWeek[] {
  const count = Math.min(Math.max(visibleCount, 0), ESCALETA_WEEKS.length);
  return ESCALETA_WEEKS.slice(0, count);
}

/** @deprecated Prefer ESCALETA_WEEKS / getVisibleEscaletaWeeks — kept for any stray imports */
export const WEEK1_DAYS = ESCALETA_WEEKS[0].days;
