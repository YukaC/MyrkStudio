# Cotización — WLandStudio (precio cerrado)

> **No es factura.** Pitch a Kuda / Holy.  
> Modelo: **precio fijo por web entregada** (no por hora). Estándar mercado landing/funnel estudio indie.  
> Fecha: 2026-09-25 · Yuka (Agustín Ciucani)

## Por qué fixed-price

Landing + whitelist + dominio = alcance **cerrable**. Hora confunde al dueño (“¿cuánto sale la web?”).  
Se cotiza **paquete entregable**; cambios de scope → addendum (no comerse el fixed).

Mercado ref (LATAM / freelance mid, USD 2025–26):

| Tipo | Rango típico |
|---|---|
| Landing marketing sola | USD 400–900 |
| Landing + form + deploy + dominio | USD 900–1 600 |
| + backend + invites + Discord + admin básico | USD 1 600–2 800 |

Este proyecto cae en la **tercera fila** si quieren “web terminada” operativa.

---

## Estado del alcance (2026-09-26) — leer antes de re-cotizar

> **Los precios de abajo NO se tocaron.** Esto es solo el registro de qué se hizo después
> de armar la cotización, para que la decisión de precio sea informada (SPEC §T T17).

| Qué se agregó | Dónde | Estado |
|---|---|---|
| Secciones streamers · statement · FAQ · CTA banner | SPEC T11 | En el demo (USD 0) |
| Countdown al estreno + contadores de plazas en hero | SPEC T13 | En el demo (USD 0) |
| Footer por columnas + disclaimer de marca | `SiteFooter` | En el demo (USD 0) |
| `App.tsx` 513 → 45 líneas (19 componentes + hook) | SPEC T12 | En el demo (USD 0) |
| Código de invitación **fuera** del form | SPEC T3 | **Quita alcance de B**: "Códigos invitación → prioridad" pasó a depender del backend (T7) |

Dos efectos que cambian el valor entregado de B:

1. **B incluye "Códigos invitación → prioridad/reserva plaza"** — hoy no hay campo para emitirlos
   (decisión T3). Se cumple de verdad recién con T7 (API + tabla de invites). B no debería
   cerrarse sin ese punto resuelto.
2. **El demo creció** (5 superficies nuevas) — se absorbe en el paquete A (USD 0) o se reconoce
   como addendum. Decisión del dueño.

**Pendiente de confirmar antes de cobrar B:** fecha/hora real del estreno (hoy asumida
2027-09-26 20:00 ART, SPEC §B B4) y visto bueno del copy de FAQ al estudio (SPEC T16).

---

## Paquetes (elegir uno)

### A — Demo pitch *(ya hecha)*

| | |
|---|---|
| **Precio** | **USD 0** incluido en kickoff / cortesía pitch (o **USD 200** si facturan demo aparte) |
| **Entrega** | https://wlandstudio.vercel.app · docs · form clipboard + invite UX demo |
| **No incluye** | API real · dominio · admin |

Útil solo para mostrar. Holy ya puede verla.

---

### B — Web MVP terminada ★ recomendada

| | |
|---|---|
| **Precio cerrado** | **USD 1 400** |
| **Rango negociación** | USD 1 200 – 1 600 |
| **Plazo típico** | ~2–3 semanas desde OK + assets |

**Incluye**

- Landing responsive (serie + estudio + staff + próximas series)
- Form whitelist **real** (guarda postulaciones)
- Códigos invitación → prioridad / reserva plaza
- Webhook Discord → canal staff
- DNS Cloudflare `WLandStudio.net` + HTTPS + redirects
- Deploy prod (Vercel o CF Pages)
- Anti-spam básico (rate limit / honeypot)
- 1 ronda de feedback copy/UI post-entrega
- Docs técnicos del repo

**No incluye** → ver exclusiones abajo.

---

### C — Web completa (MVP + operación staff)

| | |
|---|---|
| **Precio cerrado** | **USD 2 200** |
| **Rango negociación** | USD 1 900 – 2 500 |
| **Plazo típico** | ~3–5 semanas |

**Todo lo de B, más**

- Panel admin mínimo (login staff, cola, aceptar/rechazar, notas)
- Contador plazas live desde admin
- Polish contenido (bios, OG image, SEO básico) con assets que pase el studio
- 2 rondas de feedback

---

## Resumen para WhatsApp / pitch

```
Opción B — Web MVP terminada:  USD 1.400
Opción C — Web + admin staff:  USD 2.200
Demo actual: ya online (cortesía)
Dominio WLandStudio.net: incluido en B/C (vos comprás dominio; yo configuro DNS)
```

---

## Exclusiones (siempre aparte)

- Servidor Minecraft / plugins / mapa / cinemáticas / bot Discord full
- Branding desde cero (logo pack, motion, trailer edit)
- Pagos / merch / app móvil
- Multi-idioma · CMS headless grande
- Mantenimiento mensual (opcional: **USD 40–80/mes** post-entrega)

Cambio de alcance mid-proyecto → cotización addendum (no se “absorbe” en el fixed).

---

## Forma de pago sugerida

| Hito | % | Cuándo |
|---|---|---|
| Kickoff (OK alcance + contrato verbal/escrito) | **40%** | Al arrancar B o C |
| Entrega staging / dominio live | **40%** | Web usable en `WLandStudio.net` |
| Cierre + handoff | **20%** | Feedback rounds OK · acceso admin/docs |

IVA / monotributo / factura AR: a definir con Holy (montos arriba **netos USD**, sin impuestos).

---

## Qué decirle a Holy (script corto)

> La web del studio (landing + whitelist con invitaciones + Discord + dominio) la cotizo **cerrada**, no por hora.  
> **USD 1.400** web operativa (form real + invites + dominio).  
> **USD 2.200** si quieren panel para que el staff acepte/rechace postulantes.  
> Demo ya está: wlandstudio.vercel.app

---

## Notas

- Precio asume copy/staff/fotos a tiempo; delay de assets = delay de calendario, no sube precio solo.
- Dominio lo compra el studio (~USD 10–15/año); config DNS incluida en B/C.
- Cotización válida **30 días**.
- Interna: horas estimadas siguen en `docs/PLAN.md` (solo planning; **no** se venden al cliente).
