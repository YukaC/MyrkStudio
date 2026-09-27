/** Occupied / total whitelist slots — single source (§V6) */
export const PLAZAS = {
  occupied: 35,
  total: 90,
} as const;

export function plazasPercent(): number {
  return Math.round((PLAZAS.occupied / PLAZAS.total) * 100);
}

/** Accessible name for the plazas counter group */
export const STAT_COUNTERS_LABEL = "Detalle de plazas de whitelist";

/** Visible labels for the counter group — single source (§V6) */
export const WHITELIST_STAT_LABELS = {
  occupied: "Ocupadas",
  available: "Libres",
  percent: "Ocupación",
} as const;

export const PLAZAS_METER_LABEL = "Ocupación whitelist";

/** Screen-reader description of the meter — derived, never hand-typed (§V6) */
export function plazasMeterAriaLabel(): string {
  return `${PLAZAS.occupied} de ${PLAZAS.total} plazas ocupadas`;
}
