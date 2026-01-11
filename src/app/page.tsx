import Link from 'next/link';
import { CalendarPreview } from '../components/CalendarPreview';
import { PostCard } from '../components/PostCard';
import { Section } from '../components/Section';
import { posts } from '../data/posts';

export default function Page() {
  const featured = posts.slice(0, 2);
  return (
    <div className="flex flex-col gap-8">
      <header className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-sun-300/30 via-ink-800/60 to-ink-900/90 p-8 shadow-2xl shadow-black/40">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-sun-100">Family portal</p>
            <h1 className="mt-2 text-4xl font-semibold text-white sm:text-5xl">
              Share, plan, and celebrate together.
            </h1>
            <p className="mt-3 text-base text-ink-100">
              A joyful home base for posts, photos, and the shared calendar. Public posts are
              readable by friends; editing and private events will use sign-in for family members.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 text-sm">
              <Link
                href="/posts"
                className="rounded-full bg-white px-5 py-2 font-semibold text-ink-900 shadow-lg shadow-black/25 transition hover:-translate-y-0.5"
              >
                View posts
              </Link>
              <Link
                href="/calendar"
                className="rounded-full border border-sun-200/70 px-5 py-2 font-semibold text-sun-100 transition hover:-translate-y-0.5 hover:bg-sun-200/10"
              >
                Open calendar
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4 text-sm text-ink-100 shadow-lg shadow-black/25">
            <p className="text-xs uppercase tracking-[0.2em] text-sun-100">Status</p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-sun-300" /> Public posts are live.
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-sun-300" /> Calendar is read-only for
                now.
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-white/70" /> Auth: connect provider
                next.
              </li>
            </ul>
          </div>
        </div>
      </header>

      <Section
        eyebrow="Stories"
        title="Latest family posts"
        action={
          <Link
            href="/posts"
            className="text-sm font-semibold text-sun-100 underline underline-offset-4 hover:text-sun-50"
          >
            View all posts
          </Link>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          {featured.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </Section>

      <Section eyebrow="Schedule" title="Family calendar at a glance">
        <CalendarPreview />
      </Section>

      <Section eyebrow="Access" title="Family-first, with public sharing">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: 'Sign-in for edits',
              text: 'Family members sign in to add posts, edit, or manage events.'
            },
            {
              title: 'Public posts',
              text: 'Share links with friends; public pages stay read-only for visitors.'
            },
            {
              title: 'Private calendar',
              text: 'Events default to family-only; public events are clearly labeled.'
            }
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-ink-100 shadow-md shadow-black/20"
            >
              <p className="text-lg font-semibold text-white">{item.title}</p>
              <p className="mt-2">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
