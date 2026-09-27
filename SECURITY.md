# Security Policy

## Reporting

Report vulnerabilities privately to the repo owner (Yuka / Agustín Ciucani) — do not open public issues for secrets or exploit details.

## Secrets

Never commit `.env`, Discord webhooks, invite master lists, or database credentials.

## Deploy / Vercel

Production deploys via Vercel’s native Git integration (no CI token in this repo).
If leftover GitHub secrets `VERCEL_TOKEN` / `VERCEL_ORG_ID` / `VERCEL_PROJECT_ID` exist, delete them — they are unused.
