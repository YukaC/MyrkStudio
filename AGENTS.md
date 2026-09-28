# AGENTS.md — WLandStudio

> Fuente de verdad: `SPEC.md`. No contradice Regla 0 de `/mnt/JuegosHDD/Proyectos/AGENTS.md`.

## Rol

Landing + whitelist para estudio Minecraft narrativo. Prioridad: copy correcto (estudio ≠ serie ≠ episodio), form usable, invites.

## Stack

React 19 · Vite 7 · TS estricto · Tailwind 4 · Vercel demo · Cloudflare DNS

## Comandos

| Cmd | Qué |
|---|---|
| `npm run dev` | Vite :5173 |
| `npm run build` | build prod |
| `npm run typecheck` | tsc |
| `npm test` | vitest (16 tests, corre en watch con `test:watch`) |

## Gates de turno (SPEC §V9/§V10/§V11)

1. `npm run typecheck` **antes** de editar. Si falla al arrancar → drift externo en el working
   tree: restituir y reportar, no seguir editando encima.
2. Todo componente en `src/components/` debe estar montado desde `App.tsx` (huérfano = drift).
3. `App.tsx` es orquestador: sin markup de sección. 1 sección = 1 componente, <300 líneas.
4. `npm run build` verde antes de dar por cerrado un bloque.

## Estructura

```
src/content/        ← fuente única por dominio: site · plazas · series · studio · lore · faq · whitelist · nav · ui (+ index.ts barrel)
src/App.tsx         ← solo compone secciones
src/hooks/          ← useCountdown
src/components/     ← 1 sección = 1 componente + primitivas (SectionHeader, Panel, PlazasMeter…)
```

## Siempre

- Distinguir **Myrk Studio** (estudio) vs **Wasteland** (serie) vs **Japan Apocalypse** (episodio)
- Discord default `https://discord.gg/3PvWKJBw`
- Invite válido → prioridad (§V3). En v0 el campo no está en el form: la aplica el staff
  al revisar en Discord (SPEC T3)
- Content copy en `src/content/` (fuente única plazas/staff) · nada de números o copy en el JSX
- Dato inventado nunca: si no existe (ej. `isLive`, fecha de estreno) se deja vacío o se
  documenta como supuesto en §B

## Nunca

- Spoilers de guion/escaleta completa en web pública
- Secretos en repo
- Confundir los nombres estudio/serie/episodio (o duplicar el sufijo: `STUDIO_NAME` ya es `Myrk Studio`)
- Parsear copy con `split()`/regex: si hay que resaltar algo, va como campo en el dato
