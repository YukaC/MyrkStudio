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
    <dl aria-label={STAT_COUNTERS_LABEL} className="grid grid-cols-3 gap-3">
      {stats.map((stat) => (
        <div key={stat.label} className="border border-line bg-black/60 px-3 py-2.5 text-center">
          <dt className="font-term text-[0.6rem] tracking-wider text-faint uppercase">
            {stat.label}
          </dt>
          <dd className="font-display text-xl font-bold text-white tabular-nums sm:text-2xl">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
