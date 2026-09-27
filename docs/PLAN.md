# Plan de implementación — WLandStudio

Ordenado para **demo rápida → prod con dominio → backend whitelist**.

## Contexto (ordenando el quilombo)

| Concepto | Qué es |
|---|---|
| **Wasteland** | El **studio** (varias series post-apo, no solo zombies) |
| **Wasteland: Japan Apocalypse** | La **serie** flagship (MC narrativo, Japón colapsado, virus NETFO) |
| **Whitelist** | Acceso al servidor: **invitación + form público** |
| **Invitación** | Código → reserva plaza y/o prioridad en cola |
| **Discord** | Hub comunidad: https://discord.gg/3PvWKJBw |
| **Dominio** | `WLandStudio.net` vía Cloudflare |
| **Demo** | Vercel ya, sin backend (clipboard → `#whitelist`) |
| **Staff público** | Kuda (cara), Holy/Diego (financia), Yuka (web), resto vía Discord |

Fuentes lore/guion: Google Doc "Wasteland Migrado" + Miro escaleta (spoilers ⊥ web pública).

---

## Fase 0 — Docs + bootstrap (esta entrega)

- [x] SPEC / README / LICENSE / AGENTS
- [x] PLAN + QUOTE + ARCHITECTURE + LORE público
- [x] App Vite runnable + Discord link real
- [x] Push `main` a `YukaC/WLandStudio`

**Salida:** repo listo para tirarle demo + PDF/MD de cotización al dueño (Holy).

## Fase 1 — Demo landing (1–3 días) ✅ cerrada

1. Migrar HTML → React components (nav, hero, serie, terminal lore, escaleta teaser, estudio, staff, form)
2. Content config (`src/content/`): plazas, staff, Discord URL
3. ~~Campo **código invitación** + badge prioridad~~ → **removido por pedido** (ver "Desvíos")
4. Deploy Vercel preview/prod URL
5. Soft QA mobile + a11y básica
6. **+ Secciones nuevas** (T11): streamers · statement del estudio · FAQ accordion · CTA banner
7. **+ Countdown de estreno** + StatCounters en hero (T13) · STREAMERS derivado de STAFF (T14)
8. **+ Extracción de componentes** (T12): `App.tsx` 513 → 45 líneas, 19 componentes

**Salida:** URL pública para pitch. https://wlandstudio.vercel.app

### Desvíos de F1 (decisiones que se apartaron del plan original)

| # | Plan original | Qué pasó | Dónde |
|---|---|---|---|
| D1 | Campo código invitación en el form, con prioridad (§V3) | **Removido del form por pedido** y **resuelto** (SPEC T3): v0 sin campo, el staff aplica prioridad al revisar en Discord; el campo vuelve solo si T7 expone `GET /api/invite/:code`. Copy de whitelist + FAQ + JSON-LD reescritos | SPEC T3 · B7 |
| D2 | "Kuda (cara), Holy/Diego (financia)" | Nombre público = **Holy** (sin Diego). 3 staff con X/Twitter real | `content/studio.ts` `STAFF[].twitter` |
| D3 | Sin countdown | Estreno **2027-09-26** (interpretación de "este día, dentro de un año"); **hora 20:00 ART asumida** | `PREMIERE_DATE` · B4 |
| D4 | Roster de streamers aparte | Se **deriva de `STAFF`** (⊥ roster paralelo). `isLive` existe pero es dato de entrada, nunca adivinado | `content/studio.ts` `STREAMERS` |
| D5 | Referencia visual: solo HTML base | Se toman patrones de UI de `dedsafiostats.com` (contadores, countdown, accordion, banner, footer por columnas) y `dedsafio4.com` (hud, horarios). **⊥ su data**: ranks/muertes/hermandad no existen acá | §C · T11–T14 |
| D6 | `App.tsx` monolítico con secciones inline | 1 sección = 1 componente (19 en total) + `src/hooks/useCountdown.ts`. `App.tsx` = orquestador de 45 líneas | SPEC §V10/§V11 · T12 |
| D7 | SEO meta en `content/site.ts` | Los `og:` viven hardcodeados en `index.html`; `SEO`/`SITE_URL`/`absoluteUrl` quedaron sin uso → **dos fuentes de verdad** | T15 · B6 |

## Fase 2 — Dominio Cloudflare (medio día)

1. Zona `WLandStudio.net` en Cloudflare
2. DNS → Vercel (CNAME/A) o CF Pages si migran
3. HTTPS + redirect apex/www
4. OG meta + favicon brand

**Salida:** sitio en dominio real.

## Fase 3 — Backend postulaciones (3–7 días)

1. `POST /api/applications` (Vercel serverless **o** Cloudflare Worker)
2. Persistencia: D1 / Turso / Postgres (elegir 1)
3. Validar invite codes (tabla + usos + expiry)
4. Webhook Discord → canal staff
5. Rate limit + honeypot anti-spam
6. Email/Discord ack al postulante (opcional)

**Salida:** form deja de ser copy-paste.

## Fase 4 — Admin mínimo (3–5 días)

1. Login staff (PIN o Discord OAuth)
2. Lista postulaciones: pendientes / prioridad invite / aceptadas / rechazadas
3. Acciones: aceptar → marca plaza; rechazar; nota interna
4. Contador plazas live (§V6)

**Salida:** operación diaria sin Sheets improvisado.

## Fase 5 — Contenido & polish (continuo)

1. Bios reales + fotos staff (OK Kuda/Holy)
2. Assets brand (logo, trailer embed)
3. Próximas series (clasificado → reveal)
4. Lore terminal codes in-game → unlock teaser web (nice-to-have)
5. Analytics privacy-friendly (opcional)

---

## Dependencias entre fases

```
F0 docs ──► F1 demo ──► F2 dominio
                │
                └──► F3 API ──► F4 admin
                                  │
                                  └──► F5 contenido
```

Demo (F1) **no bloquea** pitch. F3+F4 = valor operativo whitelist.

## Riesgos

| Riesgo | Mitigación |
|---|---|
| Spoilers filtrados | LORE público corto; guion solo docs privados |
| Spam form | rate limit + invite + Discord verify |
| Plazas desync | fuente única + admin (§V6) |
| Scope creep (CMS, tienda, launcher) | ROADMAP; cotizar aparte |
