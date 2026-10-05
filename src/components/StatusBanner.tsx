import { NOTICE } from "../content";

export function StatusBanner() {
  if (!NOTICE) return null;

  const toneClass =
    NOTICE.tone === "warn"
      ? "border-[color-mix(in_srgb,var(--color-warning)_35%,var(--color-line))] text-[color-mix(in_srgb,var(--color-warning)_85%,var(--color-cream))]"
      : "border-[color-mix(in_srgb,var(--color-cream)_18%,var(--color-line))] text-cream/75";

  return (
    <div
      role="status"
      className={`editorial-status-banner border-b px-4 py-2.5 text-center text-xs tracking-[0.14em] uppercase sm:text-[0.7rem] ${toneClass}`}
    >
      {NOTICE.text}
    </div>
  );
}
