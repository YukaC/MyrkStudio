import { STUDIO_NAME } from "./site";

export type WhitelistStep = {
  id: string;
  text: string;
};

/** Postulación steps — single source behind the HowItWorks list (§V6). Web-only flow (B15) */
export const WHITELIST_STEPS: WhitelistStep[] = [
  { id: "01", text: `Completá el form de postulación de esta página.` },
  { id: "02", text: "Revisá los datos y aceptá las normas del servidor." },
  { id: "03", text: "Enviá la postulación." },
  { id: "04", text: `Esperá la respuesta del staff de ${STUDIO_NAME}.` },
];

/** How the invite/priority rule reads to the applicant. One string, two surfaces (§V6) */
export const WHITELIST_INVITE_NOTE =
  "Invitación + formulario público. Si venís por invitación, el staff prioriza tu plaza al revisar tu postulación.";

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
