import { useRef } from "react";
import { DOSSIER_ROWS, LORE_DOSSIER } from "../content";
import { DUR, gsap, useGSAP } from "../lib/gsap";
import { prefersReducedMotion } from "../lib/useReducedMotion";
import { EditorialScrollItem, EditorialScrollStagger } from "./editorial/EditorialScrollStagger";
import { EditorialScrollReveal } from "./editorial/EditorialScrollReveal";
import { SectionHeader } from "./SectionHeader";

export function ClassifiedDossier() {
  const sectionRef = useRef<HTMLElement>(null);
  const stampRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !stampRef.current) return;
      gsap.from(stampRef.current, {
        scale: 1.6,
        rotation: -6,
        opacity: 0,
        duration: DUR.base,
        ease: "back.out(2)",
        scrollTrigger: { trigger: stampRef.current, start: "top 85%", once: true },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="lore"
      className="editorial-section section-block bg-[color-mix(in_srgb,var(--color-void)_88%,transparent)]"
      aria-labelledby="lore-title"
    >
      <div className="fx-scanlines editorial-dossier-scanlines" aria-hidden />
      <div className="page-shell">
        <SectionHeader
          index="03"
          titleId="lore-title"
          title={LORE_DOSSIER.heading}
          isTitleHidden
          log={LORE_DOSSIER.log}
        />

        <EditorialScrollReveal>
          <div className="editorial-surface editorial-dossier-surface">
            <div className="editorial-surface-head">
              <p className="editorial-surface-kicker">
                <span>
                  <b>{LORE_DOSSIER.log.main}</b>
                  <span className="editorial-kicker-dot"> · </span>
                  {LORE_DOSSIER.log.tail}
                </span>
              </p>
              <span className="editorial-surface-chip">{LORE_DOSSIER.badge}</span>
            </div>
            <EditorialScrollStagger className="editorial-surface-body grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
              <EditorialScrollItem className="space-y-4">
                <dl className="editorial-dossier-rows space-y-2" data-reveal="stagger">
                  {DOSSIER_ROWS.map((row) => (
                    <div
                      key={row.label}
                      className="editorial-dossier-row flex items-baseline gap-3 uppercase"
                    >
                      <dt className="w-24 shrink-0 sm:w-28">{row.label}</dt>
                      <dd className="min-w-0 break-words normal-case">
                        {row.isRedacted ? (
                          <span
                            className="redact"
                            tabIndex={0}
                            onPointerEnter={(e) => e.currentTarget.classList.add("is-open")}
                            onPointerLeave={(e) => e.currentTarget.classList.remove("is-open")}
                            onFocus={(e) => e.currentTarget.classList.add("is-open")}
                            onBlur={(e) => e.currentTarget.classList.remove("is-open")}
                          >
                            {LORE_DOSSIER.stamp}
                          </span>
                        ) : (
                          <span data-scramble="" aria-label={row.value}>
                            {row.value}
                          </span>
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="border-t border-[color-mix(in_srgb,var(--color-cream)_12%,transparent)] pt-4">
                  <p className="editorial-dossier-extract">{LORE_DOSSIER.extract}</p>
                  <p className="mt-3 text-xs leading-relaxed text-cream/50">{LORE_DOSSIER.note}</p>
                </div>
              </EditorialScrollItem>

              <EditorialScrollItem className="justify-self-start pb-2 md:justify-self-end">
                <span ref={stampRef} aria-hidden className="inline-block">
                  <span className="dossier-stamp">{LORE_DOSSIER.stamp}</span>
                </span>
              </EditorialScrollItem>
            </EditorialScrollStagger>
          </div>
        </EditorialScrollReveal>
      </div>
    </section>
  );
}
