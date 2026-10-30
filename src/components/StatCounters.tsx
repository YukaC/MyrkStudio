import { PLAZAS, STAT_COUNTERS_LABEL, WHITELIST_STAT_LABELS, plazasPercent } from "../content";

type StatItem = {
  value: string;
  label: string;
};

/** Derived from PLAZAS only — never hand-typed (§V6) */
export function buildWhitelistStats(): StatItem[] {
  return [
    { value: String(PLAZAS.occupied), label: WHITELIST_STAT_LABELS.occupied },
    { value: String(PLAZAS.total - PLAZAS.occupied), label: WHITELIST_STAT_LABELS.available },
    { value: `${plazasPercent()}%`, label: WHITELIST_STAT_LABELS.percent },
  ];
}

export function StatCounters() {
  const stats = buildWhitelistStats();

  return (
    <dl aria-label={STAT_COUNTERS_LABEL} className="stat-counters grid grid-cols-3 gap-2 sm:gap-3">
      {stats.map((stat) => (
        <div key={stat.label} className="stat-counter">
          <dt className="stat-counter-label">{stat.label}</dt>
          <dd className="stat-counter-value tabular-nums">{stat.value}</dd>
        </div>
      ))}
    </dl>
  );
}
