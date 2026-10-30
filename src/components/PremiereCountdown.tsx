import { PREMIERE, PREMIERE_DATE, SERIES_NAME } from "../content";
import { useCountdown } from "../hooks/useCountdown";

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

export function PremiereCountdown() {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(PREMIERE_DATE);
  const label = isExpired ? PREMIERE.expiredLabel : PREMIERE.countdownLabel;

  return (
    <div className="premiere-countdown">
      <p className="premiere-countdown-label">
        {label} {SERIES_NAME}
      </p>
      <p
        key={isExpired ? "live" : "count"}
        className={
          isExpired ? "premiere-countdown-value is-live countdown-face" : "premiere-countdown-value"
        }
      >
        {isExpired ? PREMIERE.liveNow : `${days}d ${pad(hours)}:${pad(minutes)}:`}
        {!isExpired ? (
          <span key={seconds} className="countdown-tick">
            {pad(seconds)}
          </span>
        ) : null}
      </p>
    </div>
  );
}
