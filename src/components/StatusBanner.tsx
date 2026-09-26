import { NOTICE } from "../content";

export function StatusBanner() {
  if (!NOTICE) return null;

  const toneClass =
    NOTICE.tone === "warn"
      ? "border-[color-mix(in_srgb,var(--color-warning)_50%,var(--color-line))] bg-[color-mix(in_srgb,var(--color-warning)_12%,transparent)] text-warning"
      : "border-[color-mix(in_srgb,var(--color-signal-cyan)_50%,var(--color-line))] bg-[color-mix(in_srgb,var(--color-signal-cyan)_12%,transparent)] text-signal-cyan";

  return (
    <div
      role="status"
      className={`border-b px-4 py-2.5 text-center font-term text-[0.7rem] tracking-wide uppercase ${toneClass}`}
    >
      {NOTICE.text}
    </div>
  );
}
