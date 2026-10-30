/** Parse a CSS length (px/rem) from a custom property into device pixels. */
export function readCssLengthPx(value: string, fallback = 64): number {
  const trimmed = value.trim();
  if (!trimmed) return fallback;

  const amount = parseFloat(trimmed);
  if (!Number.isFinite(amount)) return fallback;

  if (trimmed.endsWith("rem")) {
    const root =
      typeof document !== "undefined"
        ? parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
        : 16;
    return amount * root;
  }

  return amount;
}
