const steps = [
  {
    title: '1) Install & run locally',
    detail: 'npm install && npm run dev',
    note: 'Keep config in .env.local; copy defaults from .env.example.'
  },
  {
    title: '2) Build the app',
    detail: 'npm run lint && npm run build',
    note: 'Ensures the standalone output for Cloud Run is ready.'
  },
  {
    title: '3) Deploy to Cloud Run',
    detail:
      'gcloud builds submit --tag REGION-docker.pkg.dev/PROJECT/web/next-app:latest && gcloud run deploy next-app --image REGION-docker.pkg.dev/PROJECT/web/next-app:latest --region REGION --allow-unauthenticated',
    note: 'Requires gcloud auth + run/artifact registry APIs enabled.'
  }
];

export default function Page() {
  return (
    <div className="flex flex-col gap-12">
      <header className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/30 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-ink-200">Starter</p>
            <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
              Deploy-ready Next.js + Tailwind on GCP
            </h1>
            <p className="mt-3 text-base text-ink-200">
              App router, TypeScript, and a Dockerfile tuned for Cloud Run.
            </p>
          </div>
          <a
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-ink-900 shadow-lg shadow-black/25 transition hover:-translate-y-0.5 hover:shadow-xl"
            href="https://cloud.google.com/run/docs/quickstarts/build-and-deploy"
            rel="noreferrer"
            target="_blank"
          >
            Cloud Run guide ↗
          </a>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {steps.map((step) => (
          <article
            key={step.title}
            className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/25 backdrop-blur"
          >
            <p className="text-sm font-semibold text-ink-100">{step.title}</p>
            <code className="rounded-lg bg-black/40 px-3 py-2 text-sm text-ink-100">
              {step.detail}
            </code>
            <p className="text-sm text-ink-200">{step.note}</p>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-lg shadow-black/25 backdrop-blur">
        <h2 className="text-xl font-semibold text-white">CI/CD sketch (GitHub Actions)</h2>
        <p className="mt-2 text-sm text-ink-200">
          Steps: checkout → setup Node 20 → npm ci → lint/test/build → auth via Workload Identity
          Federation → gcloud builds submit → gcloud run deploy.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-ink-100">
          <li>Store GCP project, region, and WIF provider details as GitHub secrets.</li>
          <li>Use least-privilege service account bound to the WIF provider for deploys.</li>
          <li>Add Cloud CDN in front of Cloud Run for global static acceleration when needed.</li>
        </ul>
      </section>
    </div>
  );
}
