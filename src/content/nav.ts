import { STUDIO_NAME } from "./site";

export type NavLinkItem = {
  href: string;
  label: string;
};

/**
 * Single-page nav — in-page anchors (§V6).
 * Whitelist is not listed: the header CTA already targets it.
 */
export const NAV_LINKS = [
  { href: "#serie", label: "La Serie" },
  { href: "#estudio", label: "Estudio" },
  { href: "#staff", label: "Staff" },
  { href: "#streamers", label: "Equipo" },
  { href: "#faq", label: "FAQ" },
] as const satisfies readonly NavLinkItem[];

/** Multi-page demo base path — classic scroll stays at `/` */
export const MULTI_BASE = "/m";

/**
 * Multi-page nav — one link per section page (despejado: sin apilar secciones).
 * Whitelist = CTA, no ítem de nav.
 */
export const MULTI_NAV_LINKS = [
  { href: `${MULTI_BASE}/serie`, label: "La Serie" },
  { href: `${MULTI_BASE}/lore`, label: "Lore" },
  { href: `${MULTI_BASE}/escaleta`, label: "Escaleta" },
  { href: `${MULTI_BASE}/estudio`, label: "Estudio" },
  { href: `${MULTI_BASE}/staff`, label: "Staff" },
  { href: `${MULTI_BASE}/canales`, label: "Canales" },
  { href: `${MULTI_BASE}/faq`, label: "FAQ" },
] as const satisfies readonly NavLinkItem[];

/** Single CTA label for header (§V6) */
export const CTA_LABEL = "Postular";

/** Whitelist targets per demo variant */
export const WHITELIST_HREF = "#whitelist";
export const MULTI_WHITELIST_HREF = `${MULTI_BASE}/whitelist`;

/**
 * Scroll order for multi-page wheel/swipe navigation.
 * Home → nav sections → whitelist (CTA destination last).
 */
export const MULTI_SCROLL_PATHS = [
  MULTI_BASE,
  ...MULTI_NAV_LINKS.map((link) => link.href),
  MULTI_WHITELIST_HREF,
] as const;

/** Footer copy — sitemap is the active NAV list, never a parallel (§V6 · §V15) */
export const FOOTER = {
  tagline: `Whitelist, escaleta y novedades de ${STUDIO_NAME} en un solo lugar.`,
  legal: `Minecraft es marca de Mojang Studios / Microsoft. ${STUDIO_NAME} Studio no está afiliado a Mojang ni a Microsoft.`,
} as const;
