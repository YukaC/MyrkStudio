# Changelog

All notable changes to this project will be documented in this file.

## [0.3.0] — 2026-09-26

### Changed

- **Código de invitación fuera del form** (pedido del estudio): en v0 la prioridad la aplica el
  staff al revisar las postulaciones en Discord. Copy de whitelist, FAQ y su JSON-LD reescritos
  para dejar de prometer un campo que el form no pide (SPEC T3 · B7)
- `App.tsx` pasa de 513 a 45 líneas: ahora solo compone secciones (§V11)
- `STREAMERS` se deriva de `STAFF` con los X/Twitter reales del equipo (antes era un roster paralelo)
- `HowItWorks` data-driven desde `WHITELIST_STEPS`; el canal `#whitelist` pasó de parsearse con
  `split()` a un campo `channel` (fin del copy frágil y del nombre del estudio duplicado)

### Added

- Secciones: streamers destacados, statement del estudio, FAQ accordion, CTA banner
- `PremiereCountdown` + `useCountdown` — cuenta regresiva al estreno (`PREMIERE_DATE` en content.ts)
- `StatCounters` en el hero, derivado de `PLAZAS` (ocupadas / libres / %)
- `StatusBanner` global (aviso de mantenimiento, `NOTICE = null` → no renderiza)
- `SiteFooter` con navegación por columnas + disclaimer de marca (Mojang/Microsoft)
- `LiveBadge` en las cards de staff, condicionado a `isLive` (dato de entrada, nunca adivinado)
- Primitivas reutilizables: `SectionHeader`, `Panel`, `PlazasMeter`, `icons.tsx`

### Fixed

- Componentes que existían pero nunca se montaron (`FeaturedStreamers`, `FaqSection`,
  `StudioStatement`, `CtaBanner`) dejaban el typecheck en rojo por imports inexistentes (B2)
- `useCountdown` podía renderizar `NaNd NaN:NaN` si la fecha objetivo estaba mal formada

### Docs

- SPEC: §B2–§B7 (causas y fixes), §V9–§V11 (baseline verde · sin componentes huérfanos ·
  `App.tsx` orquestador), §T12–T17, §C y §I actualizados
- `PLAN.md` con tabla de desvíos D1–D7 · `ARCHITECTURE.md` con superficies UI, estructura de
  archivos y patrones tomados de las webs de referencia · `ROADMAP.md` con gates y decisiones
  abiertas · `AGENTS.md` con estructura y gates de turno

### Notes

- Fecha del estreno asumida: **2027-09-26**, 20:00 ART (la hora no fue confirmada → B4)
- Precios de `docs/QUOTE.md` **sin tocar**; el scope del demo creció y queda como decisión
  comercial del dueño (SPEC T17)

## [0.2.0] — 2026-09-25

### Changed

- Staff público: Maxi → **Kuda**
- UX/UI craft pass (tokens @theme, hero split, motion Emil, a11y)
- SEO: meta OG/Twitter, JSON-LD, robots, sitemap, og.png, manifest

### Added

- Design tokens Tailwind v4 `@theme`
- Headers de seguridad en Vercel

### Added

- Bootstrap repo: SPEC, README, LICENSE, plan, quote, architecture, lore público
- Demo Vite+React migrada desde HTML base (landing + form whitelist)
- Discord invite canónico + campo código de invitación (prioridad UX)
