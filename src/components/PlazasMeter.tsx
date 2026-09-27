import { useId } from "react";
import { PLAZAS, PLAZAS_METER_LABEL, plazasMeterAriaLabel, plazasPercent } from "../content";

export function PlazasMeter({ compact = false }: { compact?: boolean }) {
  const percent = plazasPercent();
  const labelId = useId();
  const segments = compact ? 16 : 24;
  const filled = Math.round((PLAZAS.occupied / PLAZAS.total) * segments);

  return (
    <div className="w-full" role="group" aria-labelledby={labelId}>
      <div className="mb-2 flex items-end justify-between gap-3 font-term text-[0.7rem] tracking-wider uppercase">
        <span id={labelId} className="text-muted">
          {PLAZAS_METER_LABEL}
        </span>
        <span className="text-accent tabular-nums">
          {PLAZAS.occupied}/{PLAZAS.total} · {percent}%
        </span>
      </div>
      <div
        className="flex gap-1"
        role="progressbar"
        aria-valuenow={PLAZAS.occupied}
        aria-valuemin={0}
        aria-valuemax={PLAZAS.total}
        aria-label={plazasMeterAriaLabel()}
      >
        {Array.from({ length: segments }, (_, index) => (
          <div
            key={index}
            className={`h-2.5 flex-1 sm:h-3 ${index < filled ? "bg-accent" : "bg-line"}`}
          />
        ))}
      </div>
    </div>
  );
}
