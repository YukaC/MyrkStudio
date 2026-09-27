# Roadmap — WLandStudio

```
NOW     F2 dominio Cloudflare WLandStudio.net  (T6)
THEN    F3 API whitelist + invites reales (el campo de código vuelve acá si T7 expone el endpoint) · F4 admin
LATER   F5 contenido/brand (bios reales, assets, reveal series) · T15 SEO single-source · T16 copy real
MAYBE   bot Discord · lore unlock codes · CMS · multi-serie hub
```

Detalle: [`docs/PLAN.md`](docs/PLAN.md) · plata: [`docs/QUOTE.md`](docs/QUOTE.md) ·
invariantes + estado: [`SPEC.md`](SPEC.md)

## Gates de cada turno

- **V9** · `npm run typecheck` verde **antes** de editar (si falla → drift externo, restaurar y reportar)
- **V10** · todo componente en `src/components/` está montado desde `App.tsx`
- `npm run build` verde antes de dar por cerrado un bloque

## Decisiones abiertas (bloquean trabajo futuro)

| id | Decisión | Bloquea | Notas |
|---|---|---|---|
| B4 | Confirmar fecha/hora real del estreno | Copy de la campaña | Hoy `2027-09-26T20:00:00-03:00`, hora asumida |
| T15 | ¿SEO vive en `index.html` o en `content/site.ts`? | T6 (migración de dominio) | Hoy están los dos, sin conectar (B6) |
| T6 | ¿comprar/configurar `WLandStudio.net`? | Quote B/C (lo incluye) | Falta zona en Cloudflare |
| T16 | Copy real de FAQ / bios / proyectos | Lanzamiento | Hoy redactado desde §G, sin visto bueno del estudio |
| T17 | ¿El demo ampliado entra en B o va como addendum? | Precio | Decisión del dueño; precios sin tocar |

**Resuelto:** T3 · el código de invitación sale del form en v0 y la prioridad la aplica el staff
revisando en Discord (SPEC §T T3 · §B B7). El endpoint `GET /api/invite/:code` sigue previsto
en §I para cuando exista backend.
