import type { CSSProperties } from "react";

/** Hero copy with state semantics — single source (§V6) */
export const HERO = {
  statusLabel: "Building",
  lede:
    "Serie narrada en Minecraft: supervivencia, facciones y eventos guionizados en un Japón colapsado. Postulación por invitación — cada decisión cuenta.",
  /** Multi-page home full-bleed backdrop (Japan Apocalypse landscape). */
  backdrop: {
    webp: "/hero-backdrop.webp",
    webpSm: "/hero-backdrop-sm.webp",
    jpeg: "/hero-backdrop.jpg",
    width: 1024,
    height: 576,
  },
} as const;

/** Premiere instant for the countdown; single source (§V6). */
export const PREMIERE_DATE = "2027-09-26T20:00:00-03:00";

/** Premiere copy — single source (§V6) */
export const PREMIERE = {
  countdownLabel: "Estreno de",
  expiredLabel: "Estreno",
  liveNow: "Ya está en el aire",
} as const;

/** Rotating per-card accent, mirroring the reference tracker wheel (§V1 tokens only) */
const ACCENT_CYCLE = [
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

export type Notice = {
  text: string;
  tone: "info" | "warn";
};

/** Global banner (maintenance/announcement). null → not rendered. */
export const NOTICE: Notice | null = null;
