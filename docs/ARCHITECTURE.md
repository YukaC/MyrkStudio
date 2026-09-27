# Architecture — WLandStudio

## Visión

Sitio marketing + funnel whitelist para **Wasteland Studio**. La serie **Japan Apocalypse** es el producto visible; el studio es la marca paraguas.

```
[Browser]
    │
    ▼
[Vite React SPA] ──content/──► copy/plazas/staff
    │
    │  demo (F1): clipboard → Discord #whitelist
    │  prod (F3): POST /api/applications
    ▼
[API] ──► DB (applications, invites)
    │
    └──► Discord webhook (staff channel)
```

## Componentes

| Capa | Tech (decisión) | Alternativa |
|---|---|---|
| Front | React 19 + Vite 7 + TS + Tailwind 4 | Next.js (si SSR/SEO agresivo) |
| Hosting demo | Vercel | Cloudflare Pages |
| DNS | Cloudflare (`WLandStudio.net`) | — |
| API v1 | Vercel Serverless **o** CF Worker | Express en Fly (overkill) |
| DB v1 | Turso / CF D1 / Neon | Google Sheets (solo prototipo) |
| Invites | tabla `invites(code, maxUses, used, priority)` | lista env JSON (demo) |

## Superficies UI (orden de render en `App.tsx`)

| # | Componente | Sección / ancla | Qué |
|---|---|---|---|
| 0 | `StatusBanner` | global (arriba) | Aviso de mantenimiento; `NOTICE = null` → no renderiza |
| 1 | `SiteHeader` | nav | Nav desktop + menú mobile (overlay, foco y `body` overflow) |
| 2 | `HeroSection` | `#top` | Brand serie · **PlazasMeter** + **StatCounters** + **PremiereCountdown** + CTA |
| 3 | `SeriesSection` | `#serie` | Pitch no-zombie + features (`SERIES_FEATURES`) |
| 4 | `ClassifiedDossier` | — | Ficha de metadatos con filas redactadas (`DOSSIER_ROWS`) + sello CLASIFICADO |
| 5 | `EscaletaSection` | — | Semana 1 teaser; semanas 2–4 bloqueadas (⊥V7) |
| 6 | `StudioSection` | `#estudio` | Wasteland ≠ serie + `StudioStatement` + próximos proyectos |
| 7 | `StaffSection` | `#staff` | Roster (`STAFF`) + link Discord |
| 8 | `FeaturedStreamers` | `#streamers` | Cards con avatar mc-heads; derivado de `STAFF`; `LiveBadge` si `isLive` |
| 9 | `FaqSection` | `#faq` | Accordion nativo (`details[name]`) |
| 10 | `WhitelistSection` | `#whitelist` | `HowItWorks` (`WHITELIST_STEPS`) + `WhitelistForm` |
| 11 | `CtaBanner` | — | Cierre a Discord + posto |
| 12 | `SiteFooter` | — | Columnas de navegación + disclaimer de marca + CTAs |

**Primitivas reutilizables:** `SectionHeader` (`[LOG] label` + h2 + blurb) · `Panel` (barra de estado con badge) · `PlazasMeter` (barra segmentada) · `StatCounters` (`dl` derivado de `PLAZAS`) · `HowItWorks` (`ol` data-driven) · `PremiereCountdown` · `icons.tsx`.

**Hooks:** `useCountdown(targetIso)` → tick 1s, se auto-detiene al expirar, guarda `NaN` (fecha mal formada → `isExpired`).

## Estructura de archivos

```
src/
  content/            ← fuente única por dominio: site · plazas · series · studio · lore · faq
    index.ts            (barrel: los componentes importan from "../content")
    whitelist.ts      (WHITELIST_STEPS, invite codes) · nav.ts (NAV_LINKS, FOOTER) · ui.ts
  App.tsx             ← orquestador (solo compone secciones)
  hooks/
    useCountdown.ts   ← tick 1s → {days,hours,minutes,seconds,isExpired}
  components/
    SiteHeader · HeroSection · SeriesSection · ClassifiedDossier · EscaletaSection
    StudioSection · StaffSection · FeaturedStreamers · FaqSection · WhitelistSection
    CtaBanner · SiteFooter · StudioStatement · WhitelistForm
    SectionHeader · Panel · PlazasMeter · StatCounters · HowItWorks
    StatusBanner · PremiereCountdown · icons
```

Reglas de estructura: 1 sección = 1 componente · `App.tsx` sin markup de sección (§V11) ·
ningún componente sin montar (§V10) · copy y datos numéricos **nunca** en el JSX (§V6).

## Referencias de diseño (patrones, no data)

Tomadas de `dedsafiostats.com` y `dedsafio4.com` (proyectos de fans de otra serie):

| Patrón | Dónde se aplicó | Qué **no** se tomó |
|---|---|---|
| Contadores de estado en hero | `StatCounters` | El ranking de jugadores / muertes / tótems: no hay data |
| Cuenta regresiva a próximo evento | `PremiereCountdown` | El calendario con horarios por país |
| Bloque "cómo funciona" numerado | `HowItWorks` | — |
| Accordion de FAQ | `FaqSection` | — |
| Banner de estado / advertencia | `StatusBanner` | — |
| Badge "en vivo" | `LiveBadge` (tras `isLive`) | Detectar stream en vivo: requiere fuente de datos |
| Footer por columnas + disclaimer | `SiteFooter` | — |

## Invitaciones (regla de negocio)

> **Decidido (SPEC §T T3 · §B B7).** El campo de código de invitación se quitó del form por
> pedido, así que en **v0 no hay path de UI**: el postulante completa el form, pega en
> `#whitelist` y **el staff aplica la prioridad al revisar** las que llegan por invitación.
> El copy de la sección whitelist, el FAQ y su JSON-LD se reescribieron para decir eso
> (antes prometían un código que el form no pedía → B7).
> El campo vuelve **solo** cuando exista backend con `GET /api/invite/:code` (T7, ya previsto
> en §I). `getDemoInviteCodes`/`isValidDemoInvite` quedan disponibles, sin uso, para ese momento.

```
submit(application):              # v1 (T7)
  if inviteCode válido y con cupo:
    priority = high
    optional: reservedSlot = true
  else:
    priority = normal
  persist + notify Discord
```

## Seguridad

- Rate limit por IP + honeypot
- Invite codes no en bundle público (demo: mock hashed/list corta OK; prod: server-only)
- ⊥ secretos en git (§V5)

## SEO / OG

Meta title/description serie; OG image brand; canonical `https://wlandstudio.net` post-F2.

Ver ADR: `docs/decisions/ADR-0001-stack.md`
