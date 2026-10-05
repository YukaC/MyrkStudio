export type DossierRow =
  | { label: string; value: string; isRedacted?: false }
  | { label: string; isRedacted: true };

/** Lore teaser ficha — public copy only, no spoilers (§V7). */
export const LORE_DOSSIER = {
  log: { main: "Expediente", tail: "desclasificación parcial" },
  panelTitle: "expediente · japan apocalypse",
  badge: "PARCIAL",
  stamp: "Clasificado",
  heading: "Lore clasificado",
  redactedLabel: "Redactado",
  extract:
    "Tras el colapso, Japón quedó fuera del mapa usable. Lo poco que filtró habla de supervivencia sin red, recursos disputados y una amenaza que los informes oficiales no nombran. El resto del archivo sigue sellado — circula solo entre quienes ya cruzaron la exclusión.",
  note: "En el servidor, las cintas y los documentos rotos completan lo que esta ficha no puede decir.",
} as const;

export const DOSSIER_ROWS: DossierRow[] = [
  { label: "Archivo", value: "Wasteland: Japan Apocalypse" },
  { label: "Materia", value: "Supervivencia post-colapso" },
  { label: "Ubicación", value: "Zona de exclusión" },
  { label: "Contenido", isRedacted: true },
  { label: "Acceso", isRedacted: true },
];
