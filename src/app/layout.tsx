import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Next.js on GCP',
  description: 'Starter Next.js + Tailwind scaffold ready for Cloud Run deployment.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-ink-950 text-ink-50 font-sans">
        <div className="min-h-screen bg-gradient-to-br from-ink-950 via-ink-900 to-ink-800">
          <main className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-12 md:px-10 md:py-16">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
