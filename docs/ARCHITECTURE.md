# Architecture — WLandStudio

## Visión

Sitio marketing + funnel whitelist para **Wasteland Studio**. La serie **Japan Apocalypse** es el producto visible; el studio es la marca paraguas.

```
[Browser]
    │
    ▼
[Vite React SPA] ──content.ts──► copy/plazas/staff
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

## Superficies UI

1. **Hero** — brand serie + plazas + CTA Postular / Discord
2. **La Serie** — pitch no-zombie, facciones, eventos
3. **Terminal lore** — teaser clasificado (códigos in-game futuro)
4. **Escaleta** — semanas teaser, sin spoilers
5. **Estudio** — Wasteland + próximas series clasificadas
6. **Staff** — owners + link Discord equipo
7. **Whitelist form** — campos §V4 + invite code §V3

## Invitaciones (regla de negocio)

```
submit(application):
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
