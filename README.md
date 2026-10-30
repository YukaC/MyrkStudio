# WLandStudio

> **Demo en vivo: <https://myrkstudio.vercel.app>**

> Web oficial de **Myrk Studio** y su serie flagship **Wasteland: Japan Apocalypse** (Minecraft narrativo post-apocalíptico). Whitelist por invitación + formulario público.

## Naturaleza de este proyecto (leer antes de mostrarlo)

Es un **sitio de marca para una serie ficticia**: Myrk Studio y "Wasteland: Japan Apocalypse" no existen
fuera de este proyecto. Está hecho como pieza de oficio (dirección de arte, motion, WebGL, CSS de sistema)
para mostrar capacidad de ejecución, no como sitio de un cliente real.

Qué es real y qué no:

| Superficie | Estado |
|---|---|
| Diseño, motion, FX, accesibilidad, performance | real |
| Contenido (lore, staff, escaleta, plazas, countdown) | inventado, editable en `src/content/` |
| Formulario de postulación | **simulado**: no envía a ningún lado (`SPEC.md` §B B15) |
| Backend de whitelist | no existe; las funciones de invitación quedan reservadas en `src/content/whitelist.ts` |

## Cómo correr

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # dist/
npm run typecheck
```

## Deploy

Vercel, build estático con `vercel.json` ya configurado (`framework: vite`, `dist`, rewrite SPA):

```bash
npx vercel deploy --prod   # https://myrkstudio.vercel.app
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
- **Deploy:** push a `main` → Vercel Git (repo `YukaC/WLandStudio` vinculado). Sin workflow GHA ni secrets `VERCEL_*`.

## Licencia

MIT — ver `LICENSE`.
