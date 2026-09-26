import { useEffect, useState } from "react";

export type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
};

const EXPIRED: CountdownParts = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  isExpired: true,
};

function computeParts(targetMs: number): CountdownParts {
  // A malformed target would otherwise render "NaNd NaN:NaN" forever
  if (Number.isNaN(targetMs)) return EXPIRED;
  const remainingMs = targetMs - Date.now();
  if (remainingMs <= 0) return EXPIRED;
  return {
    days: Math.floor(remainingMs / 86_400_000),
    hours: Math.floor((remainingMs % 86_400_000) / 3_600_000),
    minutes: Math.floor((remainingMs % 3_600_000) / 60_000),
    seconds: Math.floor((remainingMs % 60_000) / 1000),
    isExpired: false,
  };
}

/** Ticks once a second until the target; stops (and freezes) once expired. */
export function useCountdown(targetIso: string): CountdownParts {
  const targetMs = new Date(targetIso).getTime();
  const [parts, setParts] = useState<CountdownParts>(() => computeParts(targetMs));

  useEffect(() => {
    if (parts.isExpired) return;
    const intervalId = window.setInterval(() => {
      const next = computeParts(targetMs);
      setParts(next);
      if (next.isExpired) window.clearInterval(intervalId);
    }, 1000);
    return () => window.clearInterval(intervalId);
  }, [targetMs, parts.isExpired]);

  return parts;
}
