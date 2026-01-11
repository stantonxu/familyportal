import Link from 'next/link';

const links = [
  { href: '/', label: 'Home' },
  { href: '/calendar', label: 'Calendar' },
  { href: '/posts', label: 'Posts' }
];

export function NavBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-sun-300 via-sun-500 to-ink-700 shadow-lg shadow-sun-900/40" />
          <div className="leading-tight">
            <p className="text-xs uppercase tracking-[0.15em] text-sun-200">Family</p>
            <p className="text-lg font-semibold text-white">Joyful Hub</p>
          </div>
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium text-ink-100">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-white hover:underline underline-offset-4"
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            className="rounded-full bg-sun-400 px-4 py-2 text-ink-900 shadow-md shadow-sun-900/25 transition hover:-translate-y-0.5 hover:bg-sun-300"
            title="Authentication placeholder"
          >
            Sign in / Join
          </button>
        </nav>
      </div>
    </header>
  );
}
