# Plan multi-page — WLandStudio

> Estado: **demo dual** (`/` scroll · `/m/*` **1 sección = 1 viewport**).
> Materials Apple (glass nav/dock) · scroll interno solo FAQ/form · wayfinding = header.
> Rollback: quitar rutas `/m` en `App.tsx` o revertir el commit del lote.
> Docs relacionados: `SPEC.md` · `docs/ARCHITECTURE.md` · `docs/PLAN.md` · `docs/QUOTE.md`

## Decisiones cerradas (dueño → agente)

| # | Decisión | Valor |
|---|---|---|
| 1 | Router | `react-router-dom` 7 |
| 2 | Sitemap | 1 sección = 1 ruta: serie · lore · escaleta · estudio · staff · canales · faq · whitelist (+ home) |
| 3 | Viewport | `h-dvh` locked · sin footer alto · MultiChromeBar |
| 4 | Nav | MULTI_NAV = secciones (sin whitelist; CTA aparte) · glass material |
| 5 | Scroll | ⊥ document scroll en `/m` · overflow interno solo faq/whitelist (y home corto) |
| 6 | Acceso | ambas demos vivas; switcher en MultiChromeBar |
| 7 | Chrome | PageFrame · header = mapa completo · home = hero CTAs (⊥ “Empezá por” / chips sitemap — removido) |

---

## 0. Tesis

Hoy el sitio clásico es un **scroll Persuade** con un solo job: entender Wasteland + postular.

Multi-page (pedido del dueño): **cada sección vive en su propia página/viewport**.
Home multi = Hero (CTAs). Mapa completo = header.
Cada ruta monta **una** sección con el mismo look (atmosphere, motion) y exit ramps quietos.

Si una página no tiene un job distinto, no merece ruta — y cada sección del scroll **sí** lo tiene.

---

## 1. Principios (Emil + SPEC)

| Principio | Implicación |
|---|---|
| Un job por superficie | Home ≠ FAQ ≠ form. No embutir postulación en 4 páginas |
| Persuade / Read / Operate | El modo define densidad, motion y CTAs |
| Beauty = leverage | Cada página: brand fuerte en primer viewport, no dashboard de secciones |
| Detalles invisibles | Shell compartido, mismos tokens, mismo nav origin, foco al cambiar de ruta |
| Frecuencia → motion | Transición de ruta = ocasional → sutil o **ninguna**. Nunca “page wipe” cinematográfico |
| §V1 · §V6 · §V15 | Nombres studio/serie · copy en `content/` · Discord+#whitelist solo en superficies inventariadas |
| ⊥ inventar lore | Páginas profundas solo cuando hay copy real (T16); si no, teaser + “clasificado” |

### Motion por tipo de superficie (norma viva — código)

Fuente: `src/styles/motion.css` · `src/styles/multi.css` · tokens `--ease-out` / `--ease-in-out` en `src/index.css`.

| Superficie | Frecuencia | Motion permitido |
|---|---|---|
| Cambio de ruta SPA (`/m`) | Occasional | Enter class en `PageFrame` vía `navigate state.multiSlide`: **settle 380ms** `translateY(±10vh) scale(0.985)` + opacity. `.reveal` off durante enter (un solo movimiento). Reduced-motion: fade 200ms. Cooldown ≥420ms. Gate swipe: solo `data-scroll=true` |
| Menú mobile panel | Occasional | Enter/exit `@starting-style` (opacity + `translateY(-6px)` 140–200ms). Se mantiene |
| MenuIcon (burger↔X) | Occasional | 3 líneas morph 180ms `var(--ease-out)`; reduced-motion = snap |
| Burger / chrome press | Tens/día | `:active scale(0.97)` 140ms `var(--ease-out)` (`.nav-chrome-control`, `.btn`, `.nav-cta`) |
| Hover cards / panels | Tens/día | **Solo color** (border/bg). ⊥ `translateY` lift |
| Submit whitelist | Rare | `.form-status--alive` morph 200ms (opacity + blur≤2px) |
| FAQ open | Occasional | Answer enter `faq-answer-in` 180ms + chevron rotate 200ms. Exit nativo instant (tradeoff `<details>`) |
| Countdown expire | Rare (1×) | `.countdown-face` opacity 200ms al flip idle→live. ⊥ animar ticks |
| Reveal (hero/secciones) | Load | 450ms `var(--ease-out)` classic + multi (mismo budget) |
| Wordmark `Apocalypse` | Ambient | 砂嵐: fill accent sólido + `::after` ruido negro (`multiply`, opacity baja). ⊥ hover. Reduced-motion: sin overlay |
| CRT scanlines | Ambient | `.crt-overlay` `repeating-linear-gradient` 3px · opacity ~0.72 (multi ~0.55) |

**Nunca animar:** back/forward del browser como “show”, focus jumps, countdown ticks, page wipe cinematográfico.

**Easing UI:** siempre `var(--ease-out)` (`cubic-bezier(0.23, 1, 0.32, 1)`). ⊥ Tailwind `ease-out` débil en chrome interactivo.

---

## 2. Sitemap propuesto (v1)

Cinco rutas. Menos = mejor.

```
/                 Persuade   home corta
/serie            Read       pitch + lore teaser + escaleta
/estudio          Read       studio + próximas producciones
/equipo           Read       staff + canales (ex-streamers)
/faq              Read       accordion FAQ
/whitelist        Operate    plazas + form (+ how-it-works)
```

### Qué **no** se parte

| Contenido | Destino | Por qué |
|---|---|---|
| Hero / countdown / plazas tease | `/` | Brand + urgencia viven en home |
| CTA Discord cierre | shell (banner) o solo home+whitelist | §V15: inventario cerrado |
| Lore full / spoilers | ⊥ web pública | SPEC §V7 · in-game |
| Admin postulaciones | T8 futuro, otra app | No es marketing |

### Redirects de compatibilidad

| Viejo | Nuevo |
|---|---|
| `/#serie` | `/serie` |
| `/#estudio` | `/estudio` |
| `/#staff` · `/#streamers` | `/equipo` (anclas internas `#staff` / `#canales` opcionales) |
| `/#faq` | `/faq` |
| `/#whitelist` | `/whitelist` |
| `/#top` | `/` |

Implementación: mapa en el router + `Navigate` / `useEffect` en mount si hay hash legacy.

---

## 3. Brief por ruta

### `/` — Home (Persuade)

| | |
|---|---|
| **Job** | Reconocer marca + decidir postular o Discord en ≤1 viewport + scroll corto |
| **Primer viewport** | Brand `WASTELAND.` · h1 serie · 1 frase · CTA Postular + Discord · countdown/plazas compactos |
| **Debajo** | 1 bloque “por qué no es vanilla” (3 bullets max) · link “Ver la serie →” · teaser dossier 2 líneas · link “Equipo →” |
| **⊥** | FAQ completo · form · roster largo · escaleta completa |
| **CTA** | Header sticky + hero (cuenta §V15) |
| **Motion** | Reveal hero (ya). Sin transición de ruta pesada al llegar |

### `/serie` — La Serie (Read → soft Persuade)

| | |
|---|---|
| **Job** | Entender Japan Apocalypse sin spoiler |
| **Contenido** | `SeriesSection` · `ClassifiedDossier` · `EscaletaSection` |
| **Primer viewport** | Título serie · blurb · CTA “Postular” secundario (ghost → `/whitelist`) |
| **Motion** | Entrada de página: ninguna o opacity 120ms. FAQ-like solo si hay accordion futuro |

### `/estudio` — Estudio (Read)

| | |
|---|---|
| **Job** | Separar Wasteland (studio) de Japan Apocalypse (serie) — §V1 |
| **Contenido** | `StudioSection` (+ statement cuando T9/T30) |
| **CTA** | Ghost a `/whitelist` + texto Discord solo si §V15 lo permite (preferible no: Discord queda en shell) |

### `/equipo` — Equipo (Read)

| | |
|---|---|
| **Job** | Rostros públicos + canales |
| **Contenido** | `StaffSection` + `FeaturedStreamers` (una página, dos bandas; mata la confusión Staff vs Equipo del nav) |
| **Nav label** | Un solo ítem: **Equipo** (deja de duplicar Staff/Equipo) |

### `/faq` — FAQ (Read)

| | |
|---|---|
| **Job** | Resolver dudas antes de postular |
| **Contenido** | `FaqSection` |
| **Cierre** | CTA único a `/whitelist` (ghost o primary — **una** vez; no Discord extra) |

### `/whitelist` — Postulación (Operate)

| | |
|---|---|
| **Job** | Completar el form sin distracción |
| **Contenido** | PlazasMeter · HowItWorks · `WhitelistForm` |
| **Primer viewport** | Título Operate + plazas + form above-the-fold en desktop |
| **⊥** | Lore, escaleta, roster |
| **Motion** | Status morph. Sin parallax. Focus al primer inválido (ya) |
| **Skip link** | `Ir a postulación` → `/whitelist` (o `#form` en esa página) |

---

## 4. Shell compartido

```
<root>
  atmosphere (crt/noise/vignette)
  StatusBanner?
  SiteHeader     ← links a rutas, CTA → /whitelist
  <Outlet />     ← página
  CtaBanner?     ← solo home (+ opcional whitelist). ⊥ en FAQ/equipo si satura §V15
  SiteFooter     ← mismo NAV_LINKS (rutas)
</root>
```

### Nav (`content/nav.ts`) — contrato nuevo

```ts
export const NAV_LINKS = [
  { href: "/serie", label: "La Serie" },
  { href: "/estudio", label: "Estudio" },
  { href: "/equipo", label: "Equipo" },
  { href: "/faq", label: "FAQ" },
] as const;

export const CTA_HREF = "/whitelist"; // antes #whitelist
```

### §V15 reescrito (propuesta)

Inventario CTA primarios:

| Destino | Superficies |
|---|---|
| Discord | header (par móvil/desktop) · hero home · (opcional) banner solo en `/` |
| `/whitelist` | header CTA · hero home · FAQ cierre · banner home |

Enforcement: tests de conteo de anchors **por ruta** + lista de archivos permitidos (extender `content.test.ts`).

### Active nav

`aria-current="page"` en el link activo. Hover sigue rosa unificado. **Sin** underline animado ni pill slide (tens/día → no).

---

## 5. Stack técnico

| Decisión | Recomendación | Nota |
|---|---|---|
| Router | **React Router 7** (data/SPA) | Dep nueva → **pedir OK al dueño** antes de `npm i` |
| Alternativa | Vite MPA multi-`index` | Más simple deploy, peor SPA; no preferida |
| SSR | No en v1 multi-page | T15 SEO: `index.html` + meta por ruta via RR + `react-helmet-async` **o** document title en loader |
| Code split | `lazy()` por page | Home carga liviana; form no bloquea serie |
| Base path | `/` | Sin subpath |

Estructura de archivos (propuesta):

```
src/
  App.tsx              → RouterProvider + shell
  pages/
    HomePage.tsx
    SeriePage.tsx
    EstudioPage.tsx
    EquipoPage.tsx
    FaqPage.tsx
    WhitelistPage.tsx
  components/          → sin cambio de ownership; pages solo componen
  content/nav.ts       → hrefs absolutos de ruta
```

`App.tsx` sigue orquestador: shell + `<Outlet />`. Páginas <300 líneas, solo composición (§V11).

---

## 6. Fases de implementación

| Fase | Qué | Criterio done | Rollback |
|---|---|---|---|
| **P0** | Spec AMEND §I rutas + §T T33… + OK dep React Router | SPEC mergeado | n/a |
| **P1** | Router + shell + rutas renderizan **mismo** contenido actual (split mecánico) | `/` y deep links verdes; tests nav | `git revert` commit router |
| **P2** | Home distill (sacar FAQ/form/roster del scroll) | Home < ~2.5 viewports desktop | feature flag `VITE_MULTI_PAGE=0` → layout monolítico |
| **P3** | Redirects hash → path · CTA_HREF · §V15 tests | Legacy bookmarks OK | redirects off |
| **P4** | SEO titles/descriptions por ruta (T15 alineado) | `<title>` distinto por page | meta fallback global |
| **P5** | (Opcional) content real T16 por página | Copy aprobado estudio | placeholders |

**No mezclar** P2 con rediseño visual. Multi-page primero = IA; look se preserva (impeccable: refinement, no redesign).

### Orden de commits sugerido

1. `chore: add react-router` (tras OK)
2. `feat: route shell + page wrappers (parity)`
3. `feat: distill home; move sections to pages`
4. `feat: hash redirects + nav CTA paths`
5. `test: V15 + nav hrefs multi-page`
6. `docs: SPEC §I/§T + ARCHITECTURE`

---

## 7. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Menos conversión al alargar camino al form | Home CTA + header sticky siempre a `/whitelist`; form above-fold en Operate |
| Contento seco en `/estudio` / `/equipo` | No lanzar P2 hasta copy mínimo; o dejar teaser en home y página “soon” honesta |
| §V15 se rompe con CTAs “por cortesía” | Test de conteo por archivo + por ruta |
| Double nav Staff/Equipo confunde | Una ruta `/equipo` |
| SEO soft en SPA | Titles por ruta ya en P4; SSR solo si T6+ métricas lo piden |
| Dep + bundle | Lazy pages; medir `npm run build` gzip |

---

## 8. Rollback

Tres capas (usar la más barata que baste):

1. **Git:** revert del commit de fase (P1–P4 son atómicos).
2. **Flag:** `VITE_MULTI_PAGE=false` restaura `LegacyLanding` (un solo `App` scroll) sin borrar `pages/`.
3. **Deploy:** redeploy tag pre-multi-page en Vercel.

No borrar `pages/` en rollback por flag: quedan muertas pero el shell viejo no las monta.

---

## 9. Decisiones que necesita el dueño

Antes de P0, confirmar:

1. **¿OK agregar `react-router`?** (sí / preferís MPA Vite / Next más adelante)
2. **¿Sitemap de 5 rutas** (`/` serie estudio equipo faq whitelist) o **comprimir a 4** (meter FAQ dentro de `/whitelist` como banda superior)?
3. **¿CtaBanner** solo en `/` o también `/whitelist`?
4. **¿Nav “Staff” desaparece** a favor de “Equipo” único?
5. **¿Empezar P1 esta semana** o esperar T16 (copy real)?

---

## 10. Criterio de calidad (Definition of Done global)

- [ ] Cada ruta tiene un job enunciable en una frase
- [ ] Home no incluye form ni FAQ completo
- [ ] `/whitelist` no incluye lore/escaleta/roster
- [ ] §V1 visible (studio ≠ serie) en home y `/estudio`
- [ ] §V15 tests verdes
- [ ] Hash legacy redirige
- [ ] `prefers-reduced-motion` intacto
- [ ] Transición de ruta ≤150ms opacity o instant — medido, no “feel”
- [ ] `npm run typecheck` · `npm test` · `npm run build` verdes
- [ ] Rollback por flag verificado una vez en local

---

## 11. Relación con cotización

Multi-page **no estaba** en el demo v0 cerrado. Tratar como **addendum** a `docs/QUOTE.md` (alineado T17) si el alcance comercial era “landing one-page”. Decidir con el dueño si entra en paquete B/C o se cotiza aparte — **sin tocar precios** en este doc.
