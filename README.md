# Next.js on GCP (Cloud Run)

Deploy-ready Next.js (App Router) starter with Tailwind, TypeScript, and a Dockerfile tuned for Cloud Run.

## Quickstart
- Install: `npm install` (generate a lockfile locally), then `npm run dev`.
- Lint/build: `npm run lint && npm run build`.
- Env: copy `.env.example` to `.env.local` and fill in secrets (not committed).

## Deploy to Cloud Run
Prereqs: `gcloud` logged in (`gcloud init`), project set, and APIs enabled (`run`, `artifactregistry`, `cloudbuild`).

1) Build + push image:
```bash
gcloud builds submit \
  --tag REGION-docker.pkg.dev/PROJECT_ID/web/next-app:latest
```
2) Deploy the service:
```bash
gcloud run deploy next-app \
  --image REGION-docker.pkg.dev/PROJECT_ID/web/next-app:latest \
  --region REGION \
  --allow-unauthenticated
```
3) Set env vars later if needed:
```bash
gcloud run services update next-app \
  --region REGION \
  --set-env-vars "NEXT_PUBLIC_API_URL=https://api.example.com"
```

## Project Structure
- `src/app` — App Router entry (`layout.tsx`, `page.tsx`), global styles.
- `public` — Static assets.
- `tests` — Add unit/integration/e2e suites here.
- `scripts` — Helper scripts for CI/CD tasks.
- `Dockerfile` — Multi-stage build using Next standalone output.

## CI/CD sketch (GitHub Actions)
- Steps: checkout → setup Node 20 → `npm ci` → lint/test/build → auth via WIF → `gcloud builds submit` → `gcloud run deploy`.
- Secrets: store `GCP_PROJECT_ID`, `GCP_REGION`, `WIF_PROVIDER`, `WIF_SERVICE_ACCOUNT`, and any app env vars as GitHub secrets.
- IAM: grant the deploy service account minimal roles (Cloud Run Admin, Artifact Registry Writer, Cloud Build Editor, plus Service Account Token Creator for WIF).
