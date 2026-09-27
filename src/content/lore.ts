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
    "Japón colapsó: perdimos todo contacto con los supervivientes. El territorio, recursos y una amenaza latente que solo los altos mandos conocen. Eso es todo lo que pudimos descifrar — el resto del expediente circula solo en un grupo reducido dentro del servidor.",
  note: "La verdad está en el servidor. Encontrá cintas y documentos en la zona de exclusión.",
} as const;

export const DOSSIER_ROWS: DossierRow[] = [
  { label: "Archivo", value: "Wasteland: Japan Apocalypse" },
  { label: "Materia", value: "Supervivencia post-colapso" },
  { label: "Ubicación", value: "Zona de exclusión" },
  { label: "Contenido", isRedacted: true },
  { label: "Acceso", isRedacted: true },
];
