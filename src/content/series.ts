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
  title: "Semana 1",
  blurb: "Escaleta de eventos · en proceso",
  lockedTitle: "Semanas 2 · 3 · 4",
  lockedDetail: "Calendario bloqueado hasta progresión del servidor",
} as const;

export const WEEK1_DAYS = [
  { label: "DÍA 1", detail: "Apertura", state: "open" as const },
  { label: "DÍA 2", detail: "[CORRUPTO]", state: "corrupt" as const },
  { label: "DÍA 3", detail: "[CORRUPTO]", state: "corrupt" as const },
  { label: "DÍA 4", detail: "Asentamiento", state: "open" as const },
];
