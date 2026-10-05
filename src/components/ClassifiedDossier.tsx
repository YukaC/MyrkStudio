import { DOSSIER_ROWS, LORE_DOSSIER } from "../content";
import { Panel } from "./Panel";
import { SectionHeader } from "./SectionHeader";

export function ClassifiedDossier() {
  return (
    <section
      id="lore"
      className="editorial-section section-block bg-[color-mix(in_srgb,var(--color-void)_88%,transparent)]"
      aria-labelledby="lore-title"
    >
      <div className="page-shell">
        <SectionHeader
          index="03"
          titleId="lore-title"
          title={LORE_DOSSIER.heading}
          isTitleHidden
          log={LORE_DOSSIER.log}
        />

        <Panel title={LORE_DOSSIER.panelTitle} badge={LORE_DOSSIER.badge}>
          <div className="grid gap-6 p-4 sm:p-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
            <div className="space-y-4">
              <dl className="space-y-2">
                {DOSSIER_ROWS.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-baseline gap-3 font-term text-[0.72rem] tracking-wider uppercase"
                  >
                    <dt className="w-24 shrink-0 text-faint sm:w-28">{row.label}</dt>
                    <dd className="min-w-0 break-words text-foreground">
                      {row.isRedacted ? (
                        <>
                          <span
                            aria-hidden
                            className="inline-block h-[0.9em] w-16 translate-y-[0.12em] bg-line-strong sm:w-24"
                          />
                          <span className="sr-only">{LORE_DOSSIER.redactedLabel}</span>
                        </>
                      ) : (
                        row.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="border-t border-line pt-4">
                <p className="text-sm leading-relaxed text-muted">{LORE_DOSSIER.extract}</p>
                <p className="mt-3 font-term text-xs leading-relaxed text-faint">
                  {LORE_DOSSIER.note}
                </p>
              </div>
            </div>

            {/* stamp wrapper carries the entrance motion so the inner rotation survives it.
                pb-2 reserves room for the stamp's outline-offset (4px + 1px) drawn in its
                rotated space: -9deg on a ~190px box overhangs the layout box by ~15px
                vertically, and the panel's overflow-hidden would clip it. */}
            <span
              className="reveal reveal-delay-2 justify-self-start pb-2 md:justify-self-end"
              aria-hidden
            >
              <span className="dossier-stamp">{LORE_DOSSIER.stamp}</span>
            </span>
          </div>
        </Panel>
      </div>
    </section>
  );
}
