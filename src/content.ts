export const SITE_URL =
  import.meta.env.VITE_SITE_URL ?? "https://wlandstudio.vercel.app";

export const DISCORD_URL =
  import.meta.env.VITE_DISCORD_URL ?? "https://discord.gg/3PvWKJBw";

/** Occupied / total whitelist slots — single source (§V6) */
export const PLAZAS = {
  occupied: 35,
  total: 90,
} as const;

export const STUDIO_NAME = "Wasteland";
export const SERIES_NAME = "Wasteland: Japan Apocalypse";

export const SEO = {
  title: "Wasteland: Japan Apocalypse | Serie Minecraft post-apocalíptica",
  titleShort: "Wasteland | Japan Apocalypse",
  description:
    "Serie narrada en Minecraft: supervivencia, facciones y eventos guionizados en un Japón colapsado. Whitelist por invitación. Unite al Discord de Wasteland Studio.",
  keywords: [
    "Wasteland",
    "Japan Apocalypse",
    "Minecraft",
    "serie Minecraft",
    "SMP narrativo",
    "roleplay Minecraft",
    "whitelist",
    "post apocalipsis",
    "Wasteland Studio",
  ].join(", "),
  locale: "es_LA",
  ogImagePath: "/og.png",
} as const;

export type StaffMember = {
  name: string;
  role: string;
  callsign: string;
};

export const STAFF: StaffMember[] = [
  { name: "Kuda", role: "Fundador / Cara pública", callsign: "CMD-01" },
  { name: "Holy", role: "Co-owner / Financiación", callsign: "CMD-02" },
  { name: "Yuka", role: "Web / Administración", callsign: "OPS-WEB" },
];

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
    body: "Un Japón post-colapso, distinto a cualquier apocalipsis típico.",
  },
];

export const WEEK1_DAYS = [
  { label: "DÍA 1", detail: "Apertura", state: "open" as const },
  { label: "DÍA 2", detail: "[CORRUPTO]", state: "corrupt" as const },
  { label: "DÍA 3", detail: "[CORRUPTO]", state: "corrupt" as const },
  { label: "DÍA 4", detail: "Asentamiento", state: "open" as const },
];

/** Demo-only invite codes. Prod validates server-side (§V3, §V5). */
export function getDemoInviteCodes(): Set<string> {
  const raw = import.meta.env.VITE_DEMO_INVITE_CODES ?? "WL-ALPHA,WL-FOUNDER,NETFO-01";
  return new Set(
    raw
      .split(",")
      .map((code: string) => code.trim().toUpperCase())
      .filter(Boolean),
  );
}

export function isValidDemoInvite(code: string): boolean {
  const normalized = code.trim().toUpperCase();
  if (!normalized) return false;
  return getDemoInviteCodes().has(normalized);
}

export function plazasPercent(): number {
  return Math.round((PLAZAS.occupied / PLAZAS.total) * 100);
}

export function absoluteUrl(path: string): string {
  const base = SITE_URL.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
