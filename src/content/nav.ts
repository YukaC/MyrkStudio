import { STUDIO_NAME } from "./site";

/**
 * Site navigation — single source for header and footer (§V6).
 * Whitelist is not listed: the header CTA already targets `#whitelist`, and a
 * nav link to the same anchor reads as two ways to do the same thing.
 */
export const NAV_LINKS = [
  { href: "#serie", label: "La Serie" },
  { href: "#estudio", label: "Estudio" },
  { href: "#staff", label: "Staff" },
  { href: "#streamers", label: "Equipo" },
  { href: "#faq", label: "FAQ" },
] as const;

/** Single CTA label for header and footer (§V6) */
export const CTA_LABEL = "Postular";

/** Footer copy — the sitemap is `NAV_LINKS` itself, never a parallel list (§V6 · §V15) */
export const FOOTER = {
  tagline: `Whitelist, escaleta y novedades de ${STUDIO_NAME} en un solo lugar.`,
  legal: `Minecraft es marca de Mojang Studios / Microsoft. ${STUDIO_NAME} Studio no está afiliado a Mojang ni a Microsoft.`,
} as const;
