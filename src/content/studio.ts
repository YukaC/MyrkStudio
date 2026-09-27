import { STUDIO_NAME } from "./site";

export const STUDIO_SECTION = {
  log: { main: "El estudio", tail: "about" },
  title: `Nosotros somos ${STUDIO_NAME}`,
  blurb:
    'Somos un estudio. "Japan Apocalypse" es nuestra primera producción. Cada futura serie explorará un colapso distinto.',
} as const;

/** Rendered as classified cards until the studio announces them (no teaser data) */
export const UPCOMING_PROJECTS = ["PROYECTO_02", "PROYECTO_03"] as const;

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

export const STAFF_SECTION = {
  log: { main: "Comando", tail: "roster" },
  title: "Equipo de comando",
  blurb:
    "Builders, guionistas y programadores en producción, con colaboración externa en animación y cinemáticas. Roster completo en Discord.",
} as const;

export const STUDIO_STATEMENT = {
  quote:
    "Cada bloque colocado en este páramo tiene un propósito en nuestra historia compartida. Preparamos el servidor y dejamos que la comunidad viva su propia aventura, porque, al final del día, lo que nos une es nuestra pasión por los bloques.",
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
  log: { main: "Equipo", tail: "redes" },
  title: "Streamers ON",
  blurb: "Participantes del servidor",
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
