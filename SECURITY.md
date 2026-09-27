# Security Policy

## Reporting

Report vulnerabilities privately to the repo owner (Yuka / Agustín Ciucani) — do not open public issues for secrets or exploit details.

## Secrets

Never commit `.env`, Discord webhooks, invite master lists, or database credentials.

## CI / Vercel

GitHub Actions deploy uses `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` as repo secrets.
If `vercel pull` fails with an invalid `--token`, rotate the token in Vercel and update the GitHub secret — do not put the token in the repo or in workflow logs.
