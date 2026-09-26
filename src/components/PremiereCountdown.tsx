import { PREMIERE, PREMIERE_DATE, SERIES_NAME } from "../content";
import { useCountdown } from "../hooks/useCountdown";

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

export function PremiereCountdown() {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(PREMIERE_DATE);
  const label = isExpired ? PREMIERE.expiredLabel : PREMIERE.countdownLabel;

  return (
    <div className="border border-line bg-black/30 px-4 py-3">
      <p className="font-term text-[0.6rem] tracking-wider text-faint uppercase">
        {label} {SERIES_NAME}
      </p>
      {isExpired ? (
        <p className="font-display text-base font-semibold text-accent uppercase">
          {PREMIERE.liveNow}
        </p>
      ) : (
        <p className="font-display text-xl font-bold text-white tabular-nums">
          {days}d {pad(hours)}:{pad(minutes)}:{pad(seconds)}
        </p>
      )}
    </div>
  );
}
