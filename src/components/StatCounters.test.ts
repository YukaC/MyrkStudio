import { describe, expect, it } from "vitest";
import { PLAZAS, WHITELIST_STAT_LABELS, plazasPercent } from "../content";
import { buildWhitelistStats } from "./StatCounters";

describe("buildWhitelistStats", () => {
  it("should derive every counter from PLAZAS instead of hand-typed numbers", () => {
    expect(buildWhitelistStats()).toEqual([
      { value: String(PLAZAS.occupied), label: WHITELIST_STAT_LABELS.occupied },
      { value: String(PLAZAS.total - PLAZAS.occupied), label: WHITELIST_STAT_LABELS.available },
      { value: `${plazasPercent()}%`, label: WHITELIST_STAT_LABELS.percent },
    ]);
  });
});
