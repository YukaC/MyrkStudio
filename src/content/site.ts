export const SITE_URL =
  import.meta.env.VITE_SITE_URL ?? "https://wlandstudio.vercel.app";

export const DISCORD_URL =
  import.meta.env.VITE_DISCORD_URL ?? "https://discord.gg/3PvWKJBw";

/** Developer studio behind the series — carries the "Studio" suffix itself (§V18) */
export const STUDIO_NAME = "Myrk Studio";
/** Event series; the current episode is "Japan Apocalypse" */
export const SERIES_NAME = "Wasteland: Japan Apocalypse";

export const SEO = {
  title: "Wasteland: Japan Apocalypse | Serie Minecraft post-apocalíptica",
  titleShort: "Wasteland | Japan Apocalypse",
  description:
    "Serie narrada en Minecraft: supervivencia, facciones y eventos guionizados en un Japón colapsado. Whitelist por invitación. Unite al Discord de Myrk Studio.",
  keywords: [
    "Wasteland",
    "Japan Apocalypse",
    "Minecraft",
    "serie Minecraft",
    "SMP narrativo",
    "roleplay Minecraft",
    "whitelist",
    "post apocalipsis",
    "Myrk Studio",
  ].join(", "),
  locale: "es_LA",
  ogImagePath: "/og.png",
} as const;

export function absoluteUrl(path: string): string {
  const base = SITE_URL.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
