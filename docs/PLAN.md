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
| **Staff público** | Maxi (cara), Holy/Diego (financia), Yuka (web), resto vía Discord |

Fuentes lore/guion: Google Doc "Wasteland Migrado" + Miro escaleta (spoilers ⊥ web pública).

---

## Fase 0 — Docs + bootstrap (esta entrega)

- [x] SPEC / README / LICENSE / AGENTS
- [x] PLAN + QUOTE + ARCHITECTURE + LORE público
- [ ] App Vite runnable + Discord link real
- [ ] Push `main` a `YukaC/WLandStudio`

**Salida:** repo listo para tirarle demo + PDF/MD de cotización al dueño (Holy).

## Fase 1 — Demo landing (1–3 días)

1. Migrar HTML → React components (nav, hero, serie, terminal lore, escaleta teaser, estudio, staff, form)
2. Content config (`src/content.ts`): plazas, staff, Discord URL
3. Campo **código invitación** + badge prioridad (validación local demo con lista mock)
4. Deploy Vercel preview/prod URL
5. Soft QA mobile + a11y básica

**Salida:** URL pública para pitch.

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

1. Bios reales + fotos staff (OK Maxi/Holy)
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
