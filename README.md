# WLandStudio

> Web oficial de **Wasteland Studio** y su serie flagship **Wasteland: Japan Apocalypse** (Minecraft narrativo post-apocalíptico). Whitelist por invitación + formulario público.

## Cómo correr

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # dist/
npm run typecheck
```

## Estado

Demo en curso. Mente del proyecto: [`SPEC.md`](SPEC.md).

| Doc | Contenido |
|---|---|
| [`SPEC.md`](SPEC.md) | Canónico (§G §C §I §V §T §B) |
| [`docs/PLAN.md`](docs/PLAN.md) | Plan de implementación por fases |
| [`docs/QUOTE.md`](docs/QUOTE.md) | Cotización estimada detallada |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | Arquitectura |
| [`docs/LORE.md`](docs/LORE.md) | Lore público resumido (sin spoilers guion) |
| [`docs/MULTI_PAGE_PLAN.md`](docs/MULTI_PAGE_PLAN.md) | Demo dual `/` · `/m` · motion norma |
| [`ROADMAP.md`](ROADMAP.md) | Hacia dónde va |
| [`CHANGELOG.md`](CHANGELOG.md) | Cambios |

## Stack

React 19 · Vite 7 · TypeScript · Tailwind 4 · Vercel (demo) · Cloudflare DNS (`WLandStudio.net`)

## Enlaces

- **Demo Vercel:** https://wlandstudio.vercel.app
- Discord: https://discord.gg/3PvWKJBw
- Repo: https://github.com/YukaC/WLandStudio
- Dominio prod (plan): `WLandStudio.net`
- **CI:** push a `main` → GitHub Actions (`.github/workflows/deploy.yml`) → Vercel prod

### Secrets CI (`VERCEL_*`)

| Secret | Uso |
|---|---|
| `VERCEL_TOKEN` | Auth CLI (`vercel pull` / `build` / `deploy`) |
| `VERCEL_ORG_ID` | Scope del team/cuenta |
| `VERCEL_PROJECT_ID` | Proyecto WLandStudio |

> La integración nativa Vercel↔GitHub App no conecta repos privados sin instalar la app. Mientras tanto el workflow hace el deploy.

**Si el job falla en “Pull Vercel env” con** `The token provided via "--token" argument is not valid`:
1. El código y el workflow están bien — **no es un fallo de build**.
2. Regenerá un token en [Vercel → Account → Tokens](https://vercel.com/account/tokens) (scope del team del proyecto).
3. Actualizá el secret `VERCEL_TOKEN` en GitHub → Settings → Secrets and variables → Actions.
4. Re-ejecutá el workflow (`workflow_dispatch` o un push a `main`).

Runs fallidos por esto: `36344124432` (2026-09-27, commit `464143f`) y `36294551223` — misma causa.

## Licencia

MIT — ver `LICENSE`.
