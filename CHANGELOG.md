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
- `LoreTerminal` → `ClassifiedDossier`: la sección de lore pasó de terminal a expediente clasificado
  (filas con dato o tachón, sello `CLASIFICADO`, badge `PARCIAL`) y todo su copy vive en `LORE_DOSSIER` /
  `DOSSIER_ROWS` (SPEC T14)
- `src/content.ts` partido en 9 módulos por dominio tras un barrel `src/content/index.ts`; los imports
  de los componentes (`from "../content"`) no cambian
- Nav sin `#whitelist` (lo cubre el CTA `Postular`) y footer con el sitio como fila horizontal
  segmentada que lee `NAV_LINKS`, más Discord solo como botón (sin destino repetido) ·
  `CTA_LABEL` único para header y footer (SPEC T21 · §V15)
- `EscaletaSection` · `FaqSection` · `FeaturedStreamers` adoptan `SectionHeader`; el blurb de la
  escaleta pasa a ser etiqueta de log y su título pasa al dato (`ESCALETA_SECTION`)
- Footer rediseñado en 3 bandas (marca + tagline / CTAs, banda de índice con los 5 links de sitio
  numerados y separados por reglas, barra legal) y sitio de una sola línea
- `[LOG]` en todas las cabeceras de sección que faltaban (serie · estudio · comando · faq): una sola
  voz visual en todo el scroll
- Inventario único de CTA: Discord y Postular quedan solo en hero, header sticky y banner de cierre.
  Se fueron los botones duplicados del footer, del bloque de staff, del cierre de FAQ y del form, más
  el "Reservar plaza" del panel del hero (mismo destino a 20px del "Postular a Whitelist") · §V15 con
  test de conteo
- Copy de serie, estudio y staff al dato (`SERIES_SECTION` · `STUDIO_SECTION` · `UPCOMING_PROJECTS` ·
  `STAFF_SECTION`)
- **Postulación por la web solamente**: el form pasó de "copiar al portapapeles y pegar en
  `#whitelist`" a un envío simulado (botón `Enviar postulación` → `Enviado.`) — sin clipboard, sin
  `textarea` de salida y sin paso 03 de "copiá y pegá". Nada sale del navegador: es una simulación
  documentada para la demo (SPEC B15)
- Copy de marca renovado: badge del hero a `Building`, `No somos una serie del montón`, cuerpo del
  hero cerrado en "cada decisión cuenta", extracto del expediente reescrito, `Nosotros somos
  Wasteland` + cita del estudio, `Streamers ON` / `Participantes del servidor`, tagline del footer
  con el nombre del estudio y `© 2026 · Wasteland`

### Added

- Secciones: streamers destacados, statement del estudio, FAQ accordion, CTA banner
- `PremiereCountdown` + `useCountdown` — cuenta regresiva al estreno (`PREMIERE_DATE` en content.ts)
- `StatCounters` en el hero, derivado de `PLAZAS` (ocupadas / libres / %)
- `StatusBanner` global (aviso de mantenimiento, `NOTICE = null` → no renderiza)
- `SiteFooter` con navegación por columnas + disclaimer de marca (Mojang/Microsoft)
- `LiveBadge` en las cards de staff, condicionado a `isLive` (dato de entrada, nunca adivinado)
- Primitivas reutilizables: `SectionHeader`, `Panel`, `PlazasMeter`, `icons.tsx`
- vitest + 16 tests como red anti-drift de §V6: porcentaje y etiqueta del medidor de plazas
  derivado de `PLAZAS`, `STREAMERS` calcado de `STAFF`, invites, `StatCounters` derivados, nav sin
  destino duplicado, espejo FAQ↔`index.html` (JSON-LD) y contrato del barrel

### Fixed

- Componentes que existían pero nunca se montaron (`FeaturedStreamers`, `FaqSection`,
  `StudioStatement`, `CtaBanner`) dejaban el typecheck en rojo por imports inexistentes (B2)
- `useCountdown` podía renderizar `NaNd NaN:NaN` si la fecha objetivo estaba mal formada
- CSS muerto: `animate-blink`, `cursor-blink` y `reveal-delay-4` quedaron sin uso tras la separación
  de la terminal y el fin del 4º delay del hero

### Docs

- SPEC: §B2–§B7 (causas y fixes), §V9–§V11 (baseline verde · sin componentes huérfanos ·
  `App.tsx` orquestador), §T12–T17, §C y §I actualizados
- `PLAN.md` con tabla de desvíos D1–D7 · `ARCHITECTURE.md` con superficies UI, estructura de
  archivos y patrones tomados de las webs de referencia · `ROADMAP.md` con gates y decisiones
  abiertas · `AGENTS.md` con estructura, gates de turno y `npm test`
- SPEC: §B8–§B13 (lote de refinamiento, incluida la colisión de ids con un turno paralelo → §V13),
  §V12–§V14 (contenido único en `src/content/` · snapshots de diff · tests derivados de la fuente
  única) y §T18–§T21 cerradas · §T22–§T26 quedan pendientes y anotadas

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
