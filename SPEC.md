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

## §I

```
route: / → landing (hero, serie, lore teaser, escaleta, estudio, staff, whitelist)
route: /#whitelist → form postulación
api (v1): POST /api/applications → Application {discord,mc,age,platform,exp,motive,inviteCode?}
api (v1): GET /api/invite/:code → {valid,priority,reservedSlot?}
env: VITE_DISCORD_URL → invite Discord
env (v1): DISCORD_WEBHOOK_URL · DATABASE_URL · INVITE_SECRET
file: shared/content.ts → copy staff/series/plazas (fuente única)
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

## §T

id|status|task|cites
T1|x|bootstrap repo: SPEC README LICENSE gitignore AGENTS docs|§G
T2|x|migrar HTML base → React+Vite+TW demo deployable|V1,V2,V4,V6
T3|x|invite code field + prioridad UX (demo local validate)|V3
T4|x|deploy demo Vercel + README how-to|§I
T5|x|cotización + plan fases (QUOTE PLAN ROADMAP)|§G
T6|.|Cloudflare DNS WLandStudio.net → Vercel|§C
T7|.|API applications + Discord webhook + store|V3,V4,V5
T8|.|admin/staff panel revisar postulaciones|V3
T9|.|contenido real staff bios + assets brand|V1
T10|.|próximas series placeholders → CMS/content|V1,V7

## §B

id|date|cause|fix
