# SPEC — WLandStudio / web oficial Wasteland Studio + serie Japan Apocalypse

> Docs: `docs/PLAN.md` · `docs/QUOTE.md` · `docs/ARCHITECTURE.md` · `docs/LORE.md` · `docs/MULTI_PAGE_PLAN.md` · `ROADMAP.md`
> Base HTML origen: `Wasteland _ Japan Apocalypse.html` (Descargas → migrado a Vite)

## §G

Landing + form whitelist (invitación prioriza plaza) para Wasteland Studio; serie flagship Japan Apocalypse (MC narrativo post-apo). Demo Vercel → prod Cloudflare `WLandStudio.net`.

## §C

- stack demo/prod front: React 19 + Vite 7 + TypeScript estricto + Tailwind 4
- deploy demo: Vercel · DNS/dominio: Cloudflare `WLandStudio.net`
- Discord canónico: `https://discord.gg/3PvWKJBw`
- studio = **Wasteland** · serie = **Wasteland: Japan Apocalypse** · ⊥ confundir nombres
- acceso: **invitación + form público**; código invite → reserva/prioridad plaza (§V3)
- demo v0: el form **simula** un envío por web (`Enviar postulación` → `Enviado.`), sin backend ni clipboard: nada sale del navegador, por decisión del dueño (B15) · Discord **queda fuera de la postulación**: solo hero, header y banner de cierre
- v1: API submit + store postulaciones + validar invite codes
- ⊥ inventar installments/lore no confirmado; lore público = resumen; lore full = clasificado in-game
- ⊥ secretos en repo (tokens Discord webhook, DB, invite master list)
- licencia: MIT · autor: Agustín Ciucani (Yuka) + Wasteland Studio
- idioma UI: español · código/idents: inglés
- repo: `git@github.com:YukaC/WLandStudio.git` (privado)
- comercial: cotización **fixed-price** por web entregada (no hora) → `docs/QUOTE.md` · B=USD 1400 · C=USD 2200
- **componentes**: `App.tsx` es orquestador (solo compone) · copy/datos en `src/content/` · hooks en `src/hooks/` · un componente = una sección, <300 líneas
- **refs de diseño**: `dedsafiostats.com` (tracker fans) + `dedsafio4.com` (hud server) → se toman patrones de UI (contadores, countdown, accordion, banner de estado, footer por columnas), **⊥ su data** (ranks/muertes/hermandad no existen acá)
- **estreno**: `2027-09-26T20:00:00-03:00` → countdown en hero. Hora 20:00 ART asumida por falta de dato (§B4)
- **staff público**: 3 con X/Twitter real en `STAFF[].twitter` → `STREAMERS` se **deriva** de `STAFF` (⊥ roster paralelo)
- **streaming**: `FeaturedStreamer.isLive` existe pero es **dato de entrada**, nunca se adivina; sin data real = badge oculto
- **tests**: vitest 5 (`npm test` / `test:watch`) como red anti-drift de §V6 — ok del dueño 2026-09-26 · leer el HTML con `?raw` de Vite, ⊥ sumar `@types/node`
- **imágenes**: no hay generador de imágenes en el entorno → los PNG (`favicon-*.png` `icon-192` `apple-touch-icon` `og`) son externos. Para el emblema del estudio se **escribe SVG a mano** en `public/` (W voxel isométrica al estilo del favicon, 4:5): geometría por polígonos, tokens del sitio, ⊥ assets/texturas de Mojang (la web declara no afiliación)
- **vocabulario visual**: toda sección abre con `[LOG] <asunto> // <token>` (una sola voz en el scroll) · el hero es la excepción (badge de estado) · `.btn` tiene `min-height: 3rem` → los links de apoyo van inline, ⊥ como botón chico · relleno de demo **sin inventar datos**: copy genérico del género o placeholders visibles, nunca números/fechas/nombres propios

## §I

```
route: / → demo clásica (scroll único, hash anchors)
route: /m → demo multi home (1 viewport: Hero compact + chips)
route: /m/serie · /m/lore · /m/escaleta · /m/estudio · /m/staff · /m/canales · /m/faq · /m/whitelist
       → 1 sección = 1 viewport (PageFrame · glass dock · scroll interno solo faq/form)
dep: react-router-dom 7 (demo dual-variant)
file: docs/MULTI_PAGE_PLAN.md → plan + decisiones Emil · **motion norma viva** (§1 tabla superficies)
api (v1): POST /api/applications → Application {discord,mc,age,platform,exp,motive,inviteCode?}
api (v1): GET /api/invite/:code → {valid,priority,reservedSlot?}
env: VITE_DISCORD_URL → invite Discord
env: VITE_SITE_URL → canonical prod (reservado p/ T6; hoy los og: viven hardcodeados en index.html)
env: VITE_DEMO_INVITE_CODES → csv de códigos demo. **Sin uso en v0** (el campo salió del form, T3);
      reservado para T7, que los valida server-side (§V5) — ver §B B8
env (v1): DISCORD_WEBHOOK_URL · DATABASE_URL · INVITE_SECRET
file: src/content/ → 9 módulos por dominio (site·plazas·series·studio·lore·faq·whitelist·nav·ui) + `index.ts` barrel; los componentes importan `from "../content"` (fuente única, §V6)
      exports sin uso hoy, a propósito: `SEO`/`SITE_URL`/`absoluteUrl` (T15 · B6) y
      `getDemoInviteCodes`/`isValidDemoInvite` (T7 · B8)
file: src/hooks/useCountdown.ts → tick 1s → {days,hours,minutes,seconds,isExpired}
file: public/studio-mark.svg → emblema (W voxel estilo favicon, 4:5) listo en `public/` · **sin montar**:
       `StudioStatement` mantiene el fallback punteado (`STUDIO_NAME.` + "Japan Apocalypse") hasta T9
file: src/components/*.tsx → 1 sección = 1 componente (SiteHeader HeroSeries ClassifiedDossier Escaleta
       Studio Staff FeaturedStreamers Faq Whitelist Cta SiteFooter) + primitivas
       (SectionHeader Panel PlazasMeter StatCounters HowItWorks StatusBanner PremiereCountdown icons)
cmd: `npm run dev` → Vite :5173
cmd: `npm run build` → dist/
cmd: `npm run typecheck` → tsc --noEmit
```

## §V

V1: studio name = Wasteland · series name = Wasteland: Japan Apocalypse · UI ! distinguir
V2: Discord CTA ! apunta a `https://discord.gg/3PvWKJBw` (configurable env, default ese)
V3: invite code válido → prioridad/reserva plaza; sin código → cola pública; ⊥ inventar prioridad
V4: form ! campos mínimos: discord, mc, age, motive, normas aceptadas
V5: ⊥ commitear secretos / webhook / lista master invites
V6: plazas ocupadas/total = fuente única content config (no hardcode disperso)
V7: lore público teaser; ⊥ spoiler guion/escaleta completa en web abierta
V8: TypeScript estricto · ⊥ `any`
V9: baseline verde antes de editar (`npm run typecheck`); si falla al arrancar turno → drift externo en working tree → restituir y reportar antes de tocar nada
V10: todo componente en `src/components/` ! está montado desde `App.tsx` (component huérfano = drift, la clase de bug que causó B1)
V11: `App.tsx` = orquestador; ! contiene markup de sección (extraer a `src/components/`)
V12: cambio de contrato (semántica) de prop compartida en `src/components/` → grep de **todos** los call sites en el mismo turno; ⊥ dejar call sites con la semántica vieja (regresión silenciosa: typecheck + build en verde)
V13: escritura por lotes → snapshot `git diff` antes/después del lote; si cambió algo fuera del lote → parar y reportar, ⊥ seguir editando encima (V9 cubre solo el drift al arrancar)

## §T

id|status|task|cites
T1|x|bootstrap repo: SPEC README LICENSE gitignore AGENTS docs|§G
T2|x|migrar HTML base → React+Vite+TW demo deployable|V1,V2,V4,V6
T3|x|invite code field REMOVED del form (pedido) → resuelto: **v0 sin campo**, el staff aplica prioridad al revisar en Discord; el campo vuelve solo si T7 expone `GET /api/invite/:code` (§I). Copy + JSON-LD alineados a esta realidad|V3
T4|x|deploy demo Vercel + README how-to|§I
T5|x|cotización + plan fases (QUOTE PLAN ROADMAP)|§G
T6|.|Cloudflare DNS WLandStudio.net → Vercel|§C
T7|.|API applications + Discord webhook + store|V3,V4,V5
T8|.|admin/staff panel revisar postulaciones|V3
T9|.|contenido real staff bios + assets brand|V1
T10|.|próximas series placeholders → CMS/content|V1,V7
T11|x|secciones: streamers destacados + nosotros + FAQ accordion + CTA banner|V1,V7
T12|x|extracción: `App.tsx` 513→45 líneas = 19 componentes + `useCountdown` (§V11)|V10,V11
T13|x|countdown estreno (2027-09-26) + StatCounters (derivados de PLAZAS) en hero|V6,V7
T14|x|STREAMERS derivado de STAFF (twitter real) + LiveBadge tras `isLive`|V6
T15|.|SEO/OG: `index.html` hardcodea og: contra `SEO`/`SITE_URL`/`absoluteUrl` en `content/site.ts` (sin uso) → elegir fuente única al migrar dominio|T6,V6
T16|.|copia real de FAQ/STAFF bios/proyectos — hoy es copy redactado desde §G, requiere visto bueno del estudio|V1,V7
T17|.|**comercial**: el demo creció (4 secciones + countdown + extracción) — decidir con el dueño si entra en B o va como addendum. Precios **sin tocar**|§C → `docs/QUOTE.md`
T18|x|lore: `LoreTerminal` (terminal "acceso denegado" + input de código muerto) → `ClassifiedDossier` (expediente: ficha `DOSSIER_ROWS` + filas redactadas + sello) · copy a `LORE_DOSSIER`|V6,V7,V10,V12
T19|x|`src/content.ts` (299/300) partido en 9 módulos por dominio + barrel `index.ts` → imports de componentes sin cambios, todos ≤59 líneas|V6
T20|x|copy de `EscaletaSection` movido a `ESCALETA_SECTION`; `FeaturedStreamers` y `FaqSection` adoptan `SectionHeader` (⊥ markup de header duplicado a mano)|V6
T21|x|nav sin `#whitelist` (lo cubre el CTA "Postular"); footer: sitio como **fila horizontal segmentada** que lee `NAV_LINKS` + Discord solo como botón — la 1ª variante (2 columnas Sitio/Comunidad) se cayó: 5 links en columna vertical contra 1 link = desbalance, y ese link repetía el destino del botón (§V15 · B14)|V6,V15
T22|.|§V6 en curso: bajados a `content/` los títulos y blurbs de serie (`SERIES_SECTION`), estudio (`STUDIO_SECTION`, `UPCOMING_PROJECTS`) y staff (`STAFF_SECTION`) + el cierre de FAQ; **quedan** ~35 strings en `WhitelistForm` (labels y estados), `HeroSection` (h1 y CTA) y `CtaBanner` → módulos `content/` **sin tocar texto visible** (T16)|V6
T23|x|`src/index.css` en 653 líneas (>300 del estándar global; §V no lo cubre) → partido en `src/styles/{base,atmosphere,layout,components,motion}.css` por capa, `index.css` queda con `@theme` + los `@import`|V17
T24|x|red anti-drift: vitest + 16 tests (`plazasPercent` · `plazasMeterAriaLabel` · `buildWhitelistStats` · `getDemoInviteCodes` · `STREAMERS←STAFF` · nav sin destino duplicado · espejo FAQ↔index.html · contrato del barrel) — **ok del dueño 2026-09-26**; sin `@types/node`: el HTML y el fuente del footer se leen con `?raw` de Vite|V6,V15
T25|.|`<h1>` del hero parte `"Japan"` / `"Apocalypse"` hardcodeado (fuente paralela de `SERIES_NAME`) → `SERIES_TITLE_LINES` como campo del dato, ⊥ derivar con `split()`|V1,V6
T26|.|a11y fino: aviso de "abre en pestaña nueva" (WCAG 3.2.5) en los `target="_blank"` · `aria-label` de `StatCounters` sobre `<dl>` (elemento sin rol ARIA) · unificar `STAT_COUNTERS_LABEL` con `PLAZAS_METER_LABEL` (2 nombres accesibles para los mismos datos)|V6
T27|.|`getDemoInviteCodes`/`isValidDemoInvite` quedaron sin consumidor en la app desde que el campo de invite salió del form (T3) — hoy solo los ejercita el test: borrar, o dejar con la nota "vuelve en v1" y el test como documentación|V1
T28|x|el footer quedó sin acceso a Discord por decisión del dueño (lo sacó el turno paralelo, B16) → se cierra como descartada; si vuelve, es un `btn btn-ghost` en la banda superior y `primary CTAs` pasa a 4 superficies|V15
T29|.|lote "Tailwind @utility + responsive full": estilos a capas + fixes de responsive (overflow 320px en CTA, safe-area del menú móvil, `minmax(0,…)` en grillas, targets táctiles, `text-wrap: balance`, a11y de validación del form, `aria-invalid` + foco al primer inválido) + craft (`--animate-rise` 450ms sin `filter: blur`, ping bajo `prefers-reduced-motion`, `:active` en cards, `ease-out` en las 3 transiciones de Tailwind) + `icons.test.tsx` (20 tests) — cerrado salvo T30/T31 y las decisiones de owner|T11,T12,V16,V17
T30|.|`StudioStatement` renderiza `"Japan Apocalypse"` hardcodeado (§V6): `SERIES_NAME` es `"Wasteland: Japan Apocalypse"`, así que importarlo duplicaría el wordmark `WASTELAND.` → hace falta un `SERIES_SHORT_NAME` en `content/site.ts`. **No se inventa el dato sin el dueño** (§C, T16)|V1,V6
T31|.|`HeroSection` conserva su propio badge de estado mientras `LiveBadge` vive en `icons.tsx`: no es drop-in (padding, tamaño, label y `reveal` difieren). Reconciliar es un cambio de diseño, no un refactor → copiar o unificar, decisión del dueño|V1
T32|.|`text-faint` (#71717a sobre `--color-panel` = 3.89:1) **falla AA 4.5:1** como texto normal y se usa en `log-label`, `.field-label`, tags de staff y `StaffSection.callsign` (4.01:1). Dos salidas: subir el token (cambia el look de todo el sitio) o migrar los call sites de texto chico a `text-muted` (7.34:1). Medido, sin aplicar|B19,V6
T33|x|demo dual: `/` scroll · `/m/*` 1 sección=1 viewport (RR7 · multi.css glass · PageFrame · MultiChromeBar · wheel/swipe · scroll interno faq/form · hash→path). Home multi sin “Empezá por” (wayfinding = header)|V6,V15
T34|x|motion norma + craft hero: section enter vía `state.multiSlide` · MenuIcon morph · opacidad panels/CTAs · wordmark 砂嵐 · CRT scanlines · docs `MULTI_PAGE_PLAN` §1|V17
T35|.|CI Deploy Vercel: rotar secret `VERCEL_TOKEN` (inválido → `vercel pull` exit 1). Runs `36344124432` · `36294551223`. Fix = secret en GitHub Actions, ⊥ cambio de código|B20

## §B

id|date|cause|fix
B1|2026-09-26|`git restore .` externo revirtió a HEAD 4 archivos trackeados con trabajo sin commitear entre turnos; no había gate que lo detectara hasta el próximo build fallido|V9: baseline typecheck antes de editar
B2|2026-09-26|4 componentes existen pero **nunca se montaron** (FeaturedStreamers FaqSection StudioStatement CtaBanner) → typecheck rojo por imports de exports inexistentes; nadie lo cerró hasta el próximo build|V10 + V9: componente sin montar es drift; verificar typecheck al arrancar turno
B3|2026-09-26|`App.tsx` creció a 513 líneas con 8 secciones inline → límite de 300 del estándar; imposible de revisar o testear por bloque|V11: 1 sección = 1 componente en src/components/
B4|2026-09-26|estreno "dentro de un año" (relativo, sin fecha absoluta) → 2027-09-26 asumido; **hora 20:00 ART asumida** sin dato. Es dato duro, vive solo en `PREMIERE_DATE`|confirmar con el estudio; corregir = 1 línea de `content/plazas.ts`
B5|2026-09-26|`<ol>` de postulación hardcodeaba `Wasteland` y parseaba `#whitelist` con `split()` → nombre duplicado (⊥V6) y copy frágil al editarlo|canal como campo `channel?: string` en `WHITELIST_STEPS`; texto con `STUDIO_NAME` por template
B6|2026-09-26|`SEO`/`SITE_URL`/`absoluteUrl` en `content/site.ts` sin uso: los og: viven hardcodeados en index.html → dos fuentes de verdad del mismo dato, drift silencioso|T15: al migrar dominio (T6) elegir una sola fuente
B7|2026-09-26|T3 removió el campo invite del form → el copy del paso 02 se ajustó, pero §V3 sigue incluyendo invites: **copy y spec desalineados**|RESUELTO en T3: v0 sin campo, prioridad manual por staff en Discord; copy de whitelist + FAQ + JSON-LD reescritos a esa realidad
B8|2026-09-26|el turno paralelo cambió `SectionHeader.blurbClassName` de "sufijo" a "clase completa" y actualizó 5 de 6 call sites; `WhitelistSection.tsx:19` siguió con la semántica vieja → el blurb de la sección de conversión perdió `prose-muted` (measure/color/font-size/line-height) con typecheck y build en verde|V12: grep de la prop en todos los call sites antes de cerrar el bloque
B9|2026-09-26|Al sacar el campo quedaron **sin uso** `getDemoInviteCodes`/`isValidDemoInvite`; su único consumidor válido es el backend, no este repo. Sin nota, se leía como código muerto que borrar|documentados en §I y en `docs/ARCHITECTURE.md` como reservados para T7; borrarlos recién con la API
B10|2026-09-26|La 4ª copia del copy de invites (panel del hero) decía "Código invite = prioridad" → la página seguía vendiendo un campo inexistente, y en JSX (⊥V6). Y `STREAMERS` reutilizaba `role` de staff como `tag`, mezclando dominio staff vs streaming|hero usa `HERO.inviteNote` desde `content/ui.ts` (las 4 copias alineadas); sección re-titulada "El equipo, en sus canales" (son cuentas del staff, ⊥ roster de streamers) + nav "Equipo"
B11|2026-09-26|edición concurrente de otro turno sobre el mismo working tree **durante** este turno (`content.ts`, `SectionHeader`, `SiteHeader`, `SiteFooter`…); V9 solo cubre el drift al arrancar y el typecheck quedó verde todo el tiempo. Efecto colateral: las dos escrituras al SPEC se pisaron los ids (B8 duplicado, B9 duplicado) → §B quedó con ids repetidos hasta que este turno los renumeró|V13: snapshot `git diff` antes/después de cada lote de escrituras; ids de §B se asignan contra el archivo, no en memoria
|V14: los tests de datos derivan de la fuente única — cada assert compara contra `PLAZAS`/`STAFF`/`NAV_LINKS`/el HTML real, ⊥ un número copiado a mano
|V15: los CTA primarios (Discord + `#whitelist`) viven **solo en 3 superficies** — hero · header sticky · banner de cierre — y cada una los muestra 1 vez (el header tiene el par móvil/desktop, que nunca coexiste). Enforcement: test que cuenta los anchors y que solo esos 3 archivos los contengan (3 Discord · 4 `#whitelist`)
|V16: un componente que acepta `className` **fusiona** las clases estructurales **después** de las del call site, nunca las reemplaza: `className={\`${className} …estructurales…\`}`. Motivo físico: un `<svg>` inline con `viewBox` y sin `width`/`height` resuelve al default de elemento reemplazado (**300×150**), así que perder `size-*` no degrada el ícono, **infla la sección**. Enforcement: `icons.test.tsx` renderiza con `react-dom/server` y asserta que cada ícono conserve su caja, + un test de integración sobre el markup de `FaqSection` (§B B18)
|V17: toda clase del sistema de diseño vive en `@layer components` → las utilities ganan. Solo las preferencias del usuario (`prefers-reduced-motion` / `prefers-reduced-transparency`) quedan **unlayered**, porque tienen que ganarle a las utilities de Tailwind (`animate-ping`). Enforcement: la cascada se verifica contra el CSS compilado de `dist/`, ⊥ por lectura del fuente (§B B18)
B12|2026-09-26|cambios de copy/a11y del turno paralelo entraron sin registro: `STREAMERS_SECTION.log` ("Cobertura // en vivo" → "Equipo // redes"), `STAT_COUNTERS_LABEL` ("Ocupación de plazas…" → "Detalle de plazas…") y el log de `FeaturedStreamers` al adoptar `SectionHeader` (`mb-2` → `mb-3`) → el próximo turno los leía como intencionales sin estar anotados|anotados acá: el primero **deja de afirmar "en vivo" sin dato** (§C/§V3), el segundo queda en T26, el +4px es el precio de no duplicar markup
B13|2026-09-26|el contrato nuevo de `blurbClassName` (clase completa) dejó `.prose-muted` fuera del blurb de `EscaletaSection`: `.prose-muted` es unlayered y le ganaba a `text-xs`/`text-faint`, así que esos tokens estaban **inertes** y el blurb se veía como párrafo muted|intencional, NO es regresión: la variante label ahora sí aplica (chico, apagado, uppercase = 1 línea de etiqueta de log). **⊥ prefixar `prose-muted` en ese call site**; los otros 6 keeps lo incluyen
B14|2026-09-26|el footer modeló el sitemap como "columnas" genéricas (`FOOTER.columns`): 5 links de sitio en una columna vertical alta quedaron desbalanceados frente a una columna "Comunidad" de 1 solo link, y ese link **repetía el destino** del botón Discord contiguo — §V6 (contenido único) solo penalizaba el copy duplicado, no el destino duplicado, y nadie miró el balance visual|decisión del dueño 2026-09-26: sitio como fila horizontal segmentada (separadores `border-l`, sin headings, sin `<h2>`) leyendo de `NAV_LINKS` directo, y Discord solo como botón → borrados `FOOTER.columns`, `FooterColumn` y `FooterLink`. Nuevo **§V15** (un destino por superficie) + test que cuenta los anchors a `DISCORD_URL` en el fuente de `SiteFooter`. Segunda iteración del dueño: la fila horizontal se vio "perdida" entre la marca y los botones → footer en **3 bandas** (marca+tagline/CTAs · banda de índice `[01]`–`[05]` derivado del orden · barra legal)
B15|2026-09-27|el form de postulación copiaba al portapapeles para que el usuario pegara en `#whitelist` (T3): en una demo de venta se lee como form de adorno, suma un paso que el usuario final no conoce y deja el aviso "Copiado. Pegalo…" contradiciendo cualquier botón que se llame Enviar|decisión del dueño 2026-09-27: flujo **envío por la web solamente** → botón `Enviar postulación`, aviso `Enviado.`, sin `navigator.clipboard`, sin `textarea` de salida, sin paso 03 "copiá y pegá", sin "pegá en #whitelist" al pie, y **Discord sale del form**. La postulación no llega a ningún lado: simulación documentada (⊥ leer esto como envío real en el contrato del proyecto)
B16|2026-09-27|un turno paralelo editó `SiteFooter.tsx` y `FaqSection.tsx` a las 00:09 (y `content.test.ts` a las 00:11) sobre el mismo working tree: **borró** el botón de Discord del footer y el cierre "¿Falta alguna respuesta? → Sumate al Discord" que el dueño había aprobado, y agregó `primary CTAs` exigiendo Discord solo en hero/header/banner. El test además fallaba contra el "Abrir Discord" del propio form (4 anclas vs 3)|decisión del dueño 2026-09-27: **gana el test** → Discord solo en hero, header y banner de cierre, y el form pierde su "Abrir Discord" (coherente con B15). El botón de Discord en el footer queda como pendiente explícito (T28), no como olvido
B17|2026-09-27|los CTA primarios llegaron a **7 superficies de Discord y 5 de whitelist** (footer, staff, FAQ, form, hero×2) porque §V15 era una regla declarativa sin enforcement: cada sección nueva repetía el botón "por cortesía" y nada lo delataba; el caso grave era el hero, que mostraba 2 CTAs del mismo destino a la vez ("Postular a Whitelist" en la fila y "Reservar plaza" en el panel de estado)|decisión del dueño 2026-09-27 → quedan **hero · header sticky · banner de cierre**. Fuera: botones de footer, staff, FAQ y form, y el "Reservar plaza" del panel. §V15 reescrito como inventario cerrado (con el par móvil/desktop del header como excepción documentada) + enforcement por test: conteo de anchors y lista de archivos que los contienen. **Renumerada de B15 a B17**: colisión de ids con el turno paralelo (V13)
B18|2026-09-27|el lote de "Tailwind @utility + responsive full" introduzió **dos regresiones que el typecheck y los tests no pueden ver**, porque ninguna rompe tipos: (a) `ChevronIcon({ className = "size-4 shrink-0" })` con default **por destructuring** → el `className` del call site **reemplaza** el default, no lo fusiona; `FaqSection` pasaba `className="mt-0.5 text-faint …"` sin `size-4`, dejando un `<svg>` con `viewBox` y sin dimensiones → default de elemento reemplazado **300×150** dentro de cada `<summary>` → la sección FAQ quedó gigante en mobile. El sub-agente reportó "rendered output identical" y el turno lo aceptó sin verificar. El mismo patrón ya estaba **latente** en `DiscordIcon` (`SiteHeader.tsx` pasa `className="h-4 w-4"`, que descartaba el `shrink-0` del default) y se leyó como "squash" sin notar que era la misma causa. (b) Las clases del sistema estaban **unlayered** en `index.css` → ganaban a las utilities: `tracking-tight` (en `SiteHeader`/`SiteFooter`) y `pb-[max(3rem,env(safe-area-inset-bottom))]` (en `WhitelistSection`) eran **utilities muertas**; typecheck y build en verde|causa raíz única: **capas y defaults por destructuring**, no valores. Fix: `className` fusiona las clases estructurales al final (§V16) + todo el sistema a `@layer components`, preferencias de usuario unlayered (§V17) — ambas verificadas contra el **CSS compilado de `dist/`** y por test (`react-dom/server`, 20 tests). El(size) de un componente no se deduce leyendo su fuente: hay que assertar el **markup renderizado**. ElInvariant que evita la recaída es behavioral, no de estilo
B19|2026-09-27|medición de contraste: `text-faint` (#71717a) sobre `--color-panel` (#111116) da **3.89:1**, o sea **falla AA 4.5:1 para texto normal** incluso sin atenuación; `opacity-60/80/90` sobre el panel bloqueado de `EscaletaSection` dejaban el ícono del candado en 2.18/2.93/3.36:1 (piso 1.4.3 no-text = 3:1) y el subtexto de 12px en 2.93/3.36/3.89:1|sub-agente subió `opacity-60→80` y reportó el gap sin cerrarlo; recalculado → `opacity-90` cierra el ícono. El subtexto **no** se arregla con opacity (el token es el techo) → `text-muted` en ese call site (6.17:1). **`text-faint` como color de texto chico sigue fallando AA en el resto del sitio** (`log-label`, `.field-label`, tags de staff, `StaffSection.callsign` en 4.01:1): corregirlo es cambiar el token o migrar call sites → decisión del dueño, no de este lote (T29)
B20|2026-09-27|Deploy Vercel (GHA) falla en `Pull Vercel env`: CLI 60.x → `The token provided via "--token" argument is not valid`. Checkout/Setup Node/Install CLI OK; Build y Deploy skipped. Misma falla en 2 runs (`36294551223`, `36344124432` sobre `464143f`). **No es bug de app**|rotar `VERCEL_TOKEN` en Vercel Account Tokens + actualizar secret GitHub Actions; doc en README · SECURITY · T35
