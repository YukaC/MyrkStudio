import { PLAZAS, plazasPercent } from "../../content";
import { PlazasMeter } from "../PlazasMeter";
import { PremiereCountdown } from "../PremiereCountdown";

/** Minimal plazas + premiere readout for the hero foot (no section-card chrome). */
export function EditorialHeroSignal() {
  const percent = plazasPercent();

  return (
    <div className="editorial-hero-signal">
      <div className="editorial-hero-signal-primary">
        <p className="editorial-hero-signal-label">Plazas · estreno</p>
        <PlazasMeter compact />
        <p className="editorial-hero-signal-meta tabular-nums">
          {PLAZAS.occupied}/{PLAZAS.total} ocupadas · {percent}% del cupo
        </p>
      </div>
      <div className="editorial-hero-signal-countdown">
        <PremiereCountdown />
      </div>
    </div>
  );
}
