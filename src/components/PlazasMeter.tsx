import { useId, useRef } from "react";
import { PLAZAS, PLAZAS_METER_LABEL, plazasMeterAriaLabel, plazasPercent } from "../content";
import { DUR, EASE, gsap, useGSAP } from "../lib/gsap";
import { prefersReducedMotion } from "../lib/useReducedMotion";

export function PlazasMeter({ compact = false }: { compact?: boolean }) {
  const percent = plazasPercent();
  const labelId = useId();
  const segments = compact ? 16 : 24;
  const filled = Math.round((PLAZAS.occupied / PLAZAS.total) * segments);
  const rootRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !rootRef.current) return;
      const counter = { v: 0 };
      gsap.to(counter, {
        v: PLAZAS.occupied,
        duration: DUR.base,
        ease: EASE,
        scrollTrigger: { trigger: rootRef.current, start: "top 90%", once: true },
        onUpdate: () => {
          if (!valueRef.current) return;
          const n = Math.round(counter.v);
          valueRef.current.textContent = `${n}/${PLAZAS.total} · ${Math.round((n / PLAZAS.total) * 100)}%`;
        },
      });
      gsap.from(rootRef.current.querySelectorAll(".plazas-meter-segment.is-filled"), {
        scaleX: 0,
        transformOrigin: "left center",
        stagger: 0.03,
        duration: DUR.fast,
        ease: EASE,
        scrollTrigger: { trigger: rootRef.current, start: "top 90%", once: true },
      });
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="plazas-meter w-full" role="group" aria-labelledby={labelId}>
      <div className="plazas-meter-head mb-2 flex items-end justify-between gap-3 uppercase">
        <span id={labelId} className="plazas-meter-label">
          {PLAZAS_METER_LABEL}
        </span>
        <span ref={valueRef} className="plazas-meter-value tabular-nums">
          {PLAZAS.occupied}/{PLAZAS.total} · {percent}%
        </span>
      </div>
      <div
        className="plazas-meter-track flex gap-1"
        role="progressbar"
        aria-valuenow={PLAZAS.occupied}
        aria-valuemin={0}
        aria-valuemax={PLAZAS.total}
        aria-label={plazasMeterAriaLabel()}
      >
        {Array.from({ length: segments }, (_, index) => (
          <div
            key={index}
            className={`plazas-meter-segment h-2 flex-1 sm:h-2.5 ${index < filled ? "is-filled" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
