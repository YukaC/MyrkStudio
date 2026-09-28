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
  /** Last-known-good local copy under /public/avatars — fallback if live X fetch fails. */
  avatarSrc: string;
};

export const STAFF: StaffMember[] = [
  {
    name: "Kuda",
    role: "Co-owner",
    callsign: "CMD-01",
    twitter: "https://x.com/IAmKudaoficial",
    avatarSrc: "/avatars/kuda.jpg",
  },
  {
    name: "Holy",
    role: "Co-owner",
    callsign: "CMD-02",
    twitter: "https://x.com/HDinosaur750",
    avatarSrc: "/avatars/holy.jpg",
  },
  {
    name: "Yuka",
    role: "Web / Administración",
    callsign: "OPS-WEB",
    twitter: "https://x.com/Yukamoll",
    avatarSrc: "/avatars/yuka.jpg",
  },
];

/** Handle from `https://x.com/Name` / twitter.com — null if the path is not a profile. */
export function twitterHandleFromUrl(twitterUrl: string): string | null {
  const match = twitterUrl
    .trim()
    .match(/^https?:\/\/(?:www\.)?(?:x|twitter)\.com\/([^/?#]+)/i);
  const handle = match?.[1];
  if (!handle || handle === "i" || handle === "intent" || handle === "home") return null;
  return handle;
}

/**
 * Day bucket for unavatar URLs. Their CDN caches ~28d; a daily `?v=` forces
 * one fresh fetch per calendar day (UTC) without manual bumps.
 */
function avatarCacheDayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Live profile photo via unavatar (proxies X/Twitter CDN).
 * Prefer this at runtime; fall back to the local `avatarSrc` copy on error.
 */
export function liveXAvatarUrl(twitterUrl: string): string | null {
  const handle = twitterHandleFromUrl(twitterUrl);
  if (!handle) return null;
  return `https://unavatar.io/x/${encodeURIComponent(handle)}?v=${avatarCacheDayKey()}`;
}

export const STAFF_SECTION = {
  log: { main: "Comando", tail: "roster" },
  title: "Equipo de comando",
  blurb:
    "Builders, guionistas y programadores en producción, con colaboración externa en animación y cinemáticas. Roster completo en Discord.",
  note: "El resto del roster se irá anunciando a medida que avance el proyecto.",
} as const;

export const STUDIO_STATEMENT = {
  quote:
    "Cada bloque colocado en este páramo tiene un propósito en nuestra historia compartida. Preparamos el servidor y dejamos que la comunidad viva su propia aventura, porque, al final del día, lo que nos une es nuestra pasión por los bloques.",
  signature: "att. Kuda · Holy",
  signOff: "Porque todos amamos este mundo",
  /** Optimized studio mark (Gemini render → WebP + JPEG fallback). */
  emblem: {
    webp: "/studio-emblem.webp",
    jpeg: "/studio-emblem.jpg",
    width: 800,
    height: 800,
    alt: "Emblema de Wasteland Studio: la W en un páramo con motivos japoneses",
  },
} as const;

export type FeaturedStreamer = {
  displayName: string;
  minecraftName?: string;
  /** Live X avatar URL (unavatar). Tried first. */
  avatarLive?: string;
  /** Last-known-good local copy — fallback if live fetch fails. */
  avatarSrc?: string;
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
  avatarLive: liveXAvatarUrl(member.twitter) ?? undefined,
  avatarSrc: member.avatarSrc,
}));
