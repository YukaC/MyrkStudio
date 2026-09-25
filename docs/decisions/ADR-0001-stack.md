# ADR-0001 — Stack front + hosting

## Status

Accepted — 2026-09-25

## Context

Necesitamos demo Vercel rápida + dominio Cloudflare después. Stack habitual Yuka: React/TS; portfolio usa Next; AhorrAR usa Vite.

## Decision

- Front: **React 19 + Vite 7 + TypeScript + Tailwind 4**
- Demo host: **Vercel**
- DNS: **Cloudflare** (`WLandStudio.net`)
- API v1: decidir entre Vercel serverless vs CF Worker al empezar F3 (preferir mismo vendor que DB)

## Consequences

- Demo estática/SPA sin SSR (SEO OK con meta estáticas + prerender opcional luego)
- Migrar a Next solo si aparece requisito fuerte SSR/i18n/CMS
