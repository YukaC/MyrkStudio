import type { CSSProperties } from "react";

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
  twitter: string;
};

export const STAFF: StaffMember[] = [
  { name: "Kuda", role: "Co-owner", callsign: "CMD-01", twitter: "https://x.com/IAmKudaoficial" },
  { name: "Holy", role: "Co-owner", callsign: "CMD-02", twitter: "https://x.com/HDinosaur750" },
  { name: "Yuka", role: "Web / Administración", callsign: "OPS-WEB", twitter: "https://x.com/Yukamoll" },
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

/** Rotating per-card accent, mirroring the reference tracker wheel (§V1 tokens only) */
export const ACCENT_CYCLE = [
  "var(--color-accent)",
  "var(--color-signal-cyan)",
  "var(--color-warning)",
  "var(--color-success)",
  "var(--color-signal-violet)",
] as const;

export type AccentStyle = CSSProperties & { "--card-accent": string };

export function accentStyle(index: number): AccentStyle {
  return { "--card-accent": ACCENT_CYCLE[index % ACCENT_CYCLE.length] };
}

export const STUDIO_STATEMENT = {
  quote:
    "Cada lugar de este mundo existe porque alguien decidió que la historia lo necesitaba. Construimos el escenario y dejamos que la historia pase.",
  signature: "att. Kuda · Holy · Yuka",
  signOff: "Porque todos amamos este mundo",
} as const;

export type FeaturedStreamer = {
  displayName: string;
  minecraftName?: string;
  tag?: string;
  url?: string;
  /** Flip to true when the crew announces a live session (data entry, never guessed). */
  isLive?: boolean;
};

export const STREAMERS_SECTION = {
  title: "El equipo, en sus canales",
  blurb: "Las cuentas públicas del equipo de Wasteland.",
  note: "Los perfiles de streaming se anuncian con el lanzamiento. Roster completo en Discord.",
} as const;

/**
 * Bootstrapped from the real crew so there is a single source of names (§V6);
 * `minecraftName` arrives when each streaming profile is published.
 */
export const STREAMERS: FeaturedStreamer[] = STAFF.map((member) => ({
  displayName: member.name,
  tag: member.role,
  url: member.twitter,
}));

export type FaqEntry = {
  question: string;
  answer: string;
};

export const FAQ_SECTION = {
  title: "Preguntas frecuentes",
  blurb: "Lo que hay que saber antes de entrar a la zona cero.",
} as const;

/** Mirrored 1:1 in the FAQPage JSON-LD of index.html — keep both in sync */
export const FAQ: FaqEntry[] = [
  {
    question: "¿Qué es Wasteland: Japan Apocalypse?",
    answer:
      "Una serie de supervivencia post-apocalíptica ambientada en un Japón colapsado, con guion propio: facciones, una escaleta de eventos semanal y decisiones con consecuencias. No es un survival vanilla.",
  },
  {
    question: "¿Wasteland es la serie o el estudio?",
    answer:
      "Las dos cosas, pero no son lo mismo: Wasteland es el estudio y Japan Apocalypse es su primera producción. Cada serie futura explorará un colapso distinto, no siempre de zombies.",
  },
  {
    question: "¿Cómo se accede al servidor?",
    answer:
      "Por whitelist: sumate al Discord y completá el formulario público de esta web. El staff revisa las postulaciones en el canal y aplica prioridad a las que llegan por invitación; el resto entra por orden de llegada.",
  },
  {
    question: "¿Qué necesito para postular?",
    answer:
      "Tu usuario de Discord, tu nombre de Minecraft, tu edad, por qué querés entrar y la aceptación de las normas. La experiencia previa en roleplay ayuda, pero no es obligatoria.",
  },
  {
    question: "¿Puedo conocer el lore antes de entrar?",
    answer:
      "Solo el teaser público. El resto del lore está clasificado y aparece dentro del servidor: hay cintas y documentos repartidos por la zona de exclusión para quien sepa dónde mirar.",
  },
  {
    question: "¿Cada cuánto se actualiza el mundo?",
    answer:
      "La escaleta narrativa dirige la historia semana a semana. Cada jornada tiene un estado propio y las semanas siguientes se desbloquean a medida que el servidor progresa.",
  },
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

/** Premiere instant for the countdown; single source (§V6). */
export const PREMIERE_DATE = "2027-09-26T20:00:00-03:00";

export type WhitelistStep = {
  id: string;
  text: string;
  /** Discord channel token highlighted inside `text` (never parsed out of the string) */
  channel?: string;
};

/** Postulación steps — single source behind the HowItWorks list (§V6). */
export const WHITELIST_STEPS: WhitelistStep[] = [
  { id: "01", text: `Unite al Discord de ${STUDIO_NAME}.` },
  { id: "02", text: "Completá el form." },
  { id: "03", text: "Copiá y pegá en el canal de postulaciones.", channel: "#whitelist" },
  { id: "04", text: "Esperá respuesta del staff." },
];

/** Hero copy with state semantics — single source (§V6) */
export const HERO = {
  statusLabel: "Sistema en línea",
} as const;

/** How the invite/priority rule reads to the applicant. One string, two surfaces (§V6) */
export const WHITELIST_INVITE_NOTE =
  "Invitación + formulario público. Si venís por invitación, el staff prioriza tu plaza al revisar tu postulación.";

/** Accessible name for the plazas counter group */
export const STAT_COUNTERS_LABEL = "Ocupación de plazas de whitelist";

/** Premiere copy — single source (§V6) */
export const PREMIERE = {
  countdownLabel: "Estreno de",
  expiredLabel: "Estreno",
  liveNow: "Ya está en el aire",
} as const;

export type Notice = {
  text: string;
  tone: "info" | "warn";
};

/** Global banner (maintenance/announcement). null → not rendered. */
export const NOTICE: Notice | null = null;

export function absoluteUrl(path: string): string {
  const base = SITE_URL.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
