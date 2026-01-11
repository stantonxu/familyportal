import Link from 'next/link';
import { Post } from '../data/posts';

const moodColor: Record<Post['mood'], string> = {
  sunny: 'from-sun-300/40 via-sun-500/30 to-sun-600/40',
  celebration: 'from-emerald-300/40 via-sun-400/30 to-ink-700/40',
  energized: 'from-sky-400/40 via-sun-400/30 to-ink-700/40'
};

export function PostCard({ post }: { post: Post }) {
  const moodClass = moodColor[post.mood] ?? 'from-white/10 via-white/5 to-white/10';
  const date = new Date(post.publishedAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/25 transition hover:-translate-y-1 hover:border-sun-300/40">
      <div
        className={`pointer-events-none absolute inset-0 opacity-60 blur-2xl transition group-hover:opacity-80 bg-gradient-to-br ${moodClass}`}
      />
      <div className="relative flex flex-col gap-4">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-sun-100">
          <span>{post.author}</span>
          <span className="text-ink-100">{date}</span>
        </div>
        <h3 className="text-xl font-semibold text-white">{post.title}</h3>
        <p className="text-sm text-ink-100">{post.summary}</p>
        <div className="flex flex-wrap gap-2 text-xs text-ink-100">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/10 px-3 py-1 font-medium text-white shadow-sm shadow-black/20"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-2">
          <Link
            href={`/posts/${post.slug}`}
            className="text-sm font-semibold text-sun-200 transition hover:text-sun-100"
          >
            Open post ↗
          </Link>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
            {post.mood}
          </span>
        </div>
      </div>
    </article>
  );
}
