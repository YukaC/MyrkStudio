# Cotización estimada — WLandStudio

> **No es factura.** Estimación para pitch a dueños (Maxi / Holy).  
> Ajustar tarifa horaria en la tabla de abajo. Montos en **USD** (horas × tarifa).  
> Fecha: 2026-09-25 · Autor estimación: Yuka (Agustín Ciucani)

## Tarifa (editar)

| Concepto | Valor |
|---|---|
| Tarifa sugerida desarrollo web | **USD 25 / h** (cambiar si acordás otra) |
| Moneda cotización | USD |
| IVA / facturación AR | a definir con Holy (no incluido abajo) |

---

## Resumen por fase

| Fase | Qué incluye | Horas (rango) | @ USD 25/h | Prioridad |
|---|---|---|---|---|
| **F0** Docs + bootstrap repo | SPEC, plan, quote, arquitectura | 4–6 | 100–150 | Hecho / en curso |
| **F1** Demo landing Vercel | React+Vite, form, invite UX, deploy | 10–16 | 250–400 | **Pitch YA** |
| **F2** Cloudflare + dominio | DNS, SSL, redirects, OG | 2–4 | 50–100 | Post-demo |
| **F3** Backend whitelist | API, DB, invites, webhook Discord, anti-spam | 16–28 | 400–700 | Core prod |
| **F4** Admin staff | auth, cola, aceptar/rechazar, plazas live | 12–20 | 300–500 | Operación |
| **F5** Contenido & polish | bios, assets, lore terminal, analytics | 8–16 | 200–400 | Continuo |
| **Buffer** imprevistos (~15%) | QA, cambios copy, reuniones | 8–12 | 200–300 | — |

### Totales orientativos

| Paquete | Horas | USD @ 25/h | Notas |
|---|---|---|---|
| **Demo pitch** (F0+F1) | 14–22 | **350–550** | Suficiente para “tirarle la demo por la cabeza” |
| **MVP prod** (F0–F3 + F2) | 32–54 | **800–1 350** | Dominio + form real |
| **Proyecto completo** (F0–F5 + buffer) | **60–102** | **1 500–2 550** | Admin + polish |

---

## Detalle de alcance incluido / excluido

### Incluido en “proyecto total”

- Landing responsive (serie + studio + staff + próximas series)
- Form whitelist + códigos invitación con prioridad/reserva
- Deploy demo Vercel + DNS Cloudflare `WLandStudio.net`
- Persistencia postulaciones + notificación Discord
- Panel admin mínimo (revisión staff)
- Docs (SPEC, plan, arquitectura) mantenidos

### Excluido (cotizar aparte)

- Plugins/mods Minecraft, builds del mapa, cinemáticas
- Bot Discord full (roles, tickets, economía)
- App móvil / launcher
- Captación pagos (donaciones, merch)
- Branding completo (logo set, motion, trailer edit)
- Hosting del **servidor MC** (solo la web)

---

## Forma de trabajo sugerida

1. **Kickoff** con Maxi + Holy: OK tarifa, alcance MVP, fecha soft-launch
2. Entrega **demo F1** (URL Vercel) → feedback 48–72 h
3. Cierre F2+F3 (dominio + form real)
4. F4 cuando haya volumen real de postulantes
5. F5 en paralelo con contenido del studio

Pago sugerido: **40% al kickoff · 40% al MVP prod · 20% al cierre admin/polish** (negociable).

---

## Comparativa rápida “qué comprar”

| Opción | Pagan | Obtienen |
|---|---|---|
| A — Solo demo | ~USD 350–550 | URL para mostrar + docs |
| B — MVP prod | ~USD 800–1 350 | Dominio + form + invites + Discord |
| C — Full | ~USD 1 500–2 550 | + admin + polish contenido |

---

## Notas honestas

- Horas asumen copy/staff assets entregados a tiempo por el studio.
- Si el backend se hace en **Cloudflare Workers + D1** (mismo vendor DNS), F3 puede ir al piso del rango.
- Si piden Next.js full + CMS headless desde día 1, sumar ~20–30% a F1/F5.
- Cotización válida ~30 días; re-estimar si cambia alcance (bot, pagos, multi-idioma).
