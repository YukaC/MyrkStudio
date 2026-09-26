# SPEC — WLandStudio / web oficial Wasteland Studio + serie Japan Apocalypse

> Docs: `docs/PLAN.md` · `docs/QUOTE.md` · `docs/ARCHITECTURE.md` · `docs/LORE.md` · `ROADMAP.md`
> Base HTML origen: `Wasteland _ Japan Apocalypse.html` (Descargas → migrado a Vite)

## §G

Landing + form whitelist (invitación prioriza plaza) para Wasteland Studio; serie flagship Japan Apocalypse (MC narrativo post-apo). Demo Vercel → prod Cloudflare `WLandStudio.net`.

## §C

- stack demo/prod front: React 19 + Vite 7 + TypeScript estricto + Tailwind 4
- deploy demo: Vercel · DNS/dominio: Cloudflare `WLandStudio.net`
- Discord canónico: `https://discord.gg/3PvWKJBw`
- studio = **Wasteland** · serie = **Wasteland: Japan Apocalypse** · ⊥ confundir nombres
- acceso: **invitación + form público**; código invite → reserva/prioridad plaza (§V3)
- demo v0: form copia postulación (clipboard) → pegar `#whitelist` (sin backend)
- v1: API submit + store postulaciones + validar invite codes
- ⊥ inventar installments/lore no confirmado; lore público = resumen; lore full = clasificado in-game
- ⊥ secretos en repo (tokens Discord webhook, DB, invite master list)
- licencia: MIT · autor: Agustín Ciucani (Yuka) + Wasteland Studio
- idioma UI: español · código/idents: inglés
- repo: `git@github.com:YukaC/WLandStudio.git` (privado)
- comercial: cotización **fixed-price** por web entregada (no hora) → `docs/QUOTE.md` · B=USD 1400 · C=USD 2200
- **componentes**: `App.tsx` es orquestador (solo compone) · copy/datos en `src/content.ts` · hooks en `src/hooks/` · un componente = una sección, <300 líneas
- **refs de diseño**: `dedsafiostats.com` (tracker fans) + `dedsafio4.com` (hud server) → se toman patrones de UI (contadores, countdown, accordion, banner de estado, footer por columnas), **⊥ su data** (ranks/muertes/hermandad no existen acá)
- **estreno**: `2027-09-26T20:00:00-03:00` → countdown en hero. Hora 20:00 ART asumida por falta de dato (§B4)
- **staff público**: 3 con X/Twitter real en `STAFF[].twitter` → `STREAMERS` se **deriva** de `STAFF` (⊥ roster paralelo)
- **streaming**: `FeaturedStreamer.isLive` existe pero es **dato de entrada**, nunca se adivina; sin data real = badge oculto

## §I

```
route: / → landing (hero, serie, lore teaser, escaleta, estudio, staff, streamers, faq, whitelist, cta, footer)
route: /#whitelist → form postulación
api (v1): POST /api/applications → Application {discord,mc,age,platform,exp,motive,inviteCode?}
api (v1): GET /api/invite/:code → {valid,priority,reservedSlot?}
env: VITE_DISCORD_URL → invite Discord
env: VITE_SITE_URL → canonical prod (reservado p/ T6; hoy los og: viven hardcodeados en index.html)
env: VITE_DEMO_INVITE_CODES → csv de códigos demo (solo v0)
env (v1): DISCORD_WEBHOOK_URL · DATABASE_URL · INVITE_SECRET
file: src/content.ts → copy staff/series/plazas/fecha Premiere/steps (fuente única, §V6)
file: src/hooks/useCountdown.ts → tick 1s → {days,hours,minutes,seconds,isExpired}
file: src/components/*.tsx → 1 sección = 1 componente (SiteHeader HeroSeries LoreTerminal Escaleta
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
T15|.|SEO/OG: `index.html` hardcodea og: contra `SEO`/`SITE_URL`/`absoluteUrl` en content.ts (sin uso) → elegir fuente única al migrar dominio|T6,V6
T16|.|copia real de FAQ/STAFF bios/proyectos — hoy es copy redactado desde §G, requiere visto bueno del estudio|V1,V7
T17|.|**comercial**: el demo creció (4 secciones + countdown + extracción) — decidir con el dueño si entra en B o va como addendum. Precios **sin tocar**|§C → `docs/QUOTE.md`

## §B

id|date|cause|fix
B1|2026-09-26|`git restore .` externo revirtió a HEAD 4 archivos trackeados con trabajo sin commitear entre turnos; no había gate que lo detectara hasta el próximo build fallido|V9: baseline typecheck antes de editar
B2|2026-09-26|4 componentes existen pero **nunca se montaron** (FeaturedStreamers FaqSection StudioStatement CtaBanner) → typecheck rojo por imports de exports inexistentes; nadie lo cerró hasta el próximo build|V10 + V9: componente sin montar es drift; verificar typecheck al arrancar turno
B3|2026-09-26|`App.tsx` creció a 513 líneas con 8 secciones inline → límite de 300 del estándar; imposible de revisar o testear por bloque|V11: 1 sección = 1 componente en src/components/
B4|2026-09-26|estreno "dentro de un año" (relativo, sin fecha absoluta) → 2027-09-26 asumido; **hora 20:00 ART asumida** sin dato. Es dato duro, vive solo en `PREMIERE_DATE`|confirmar con el estudio; corregir = 1 línea de content.ts
B5|2026-09-26|`<ol>` de postulación hardcodeaba `Wasteland` y parseaba `#whitelist` con `split()` → nombre duplicado (⊥V6) y copy frágil al editarlo|canal como campo `channel?: string` en `WHITELIST_STEPS`; texto con `STUDIO_NAME` por template
B6|2026-09-26|`SEO`/`SITE_URL`/`absoluteUrl` en content.ts sin uso: los og: viven hardcodeados en index.html → dos fuentes de verdad del mismo dato, drift silencioso|T15: al migrar dominio (T6) elegir una sola fuente
B7|2026-09-26|T3 removió el campo invite del form → el copy del paso 02 se ajustó, pero §V3 sigue incluyendo invites: **copy y spec desalineados**|RESUELTO en T3: v0 sin campo, prioridad manual por staff en Discord; copy de whitelist + FAQ + JSON-LD reescritos a esa realidad
