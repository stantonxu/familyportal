import type { Metadata } from 'next';
import { NavBar } from '../components/NavBar';
import './globals.css';

export const metadata: Metadata = {
  title: 'Family Portal',
  description: 'Joyful family portal with posts, photos, and a shared calendar.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-ink-950 text-ink-50 font-sans">
        <div className="min-h-screen bg-gradient-to-br from-ink-950/95 via-ink-900/90 to-ink-800/90">
          <NavBar />
          <main className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-12 md:px-10 md:py-16">
            {children}
          </main>
          <footer className="border-t border-white/10 bg-ink-950/80 py-6 text-center text-sm text-ink-200">
            Built for our family • Private where it matters, joyful everywhere else.
          </footer>
        </div>
      </body>
    </html>
  );
}
