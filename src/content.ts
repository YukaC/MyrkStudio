export const DISCORD_URL =
  import.meta.env.VITE_DISCORD_URL ?? "https://discord.gg/3PvWKJBw";

/** Occupied / total whitelist slots — single source (§V6) */
export const PLAZAS = {
  occupied: 35,
  total: 90,
} as const;

export const STUDIO_NAME = "Wasteland";
export const SERIES_NAME = "Wasteland: Japan Apocalypse";

export type StaffMember = {
  name: string;
  role: string;
};

export const STAFF: StaffMember[] = [
  { name: "Maxi", role: "Fundador / Cara pública" },
  { name: "Holy", role: "Co-owner / Financiación" },
  { name: "Yuka", role: "Web / Administración" },
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
