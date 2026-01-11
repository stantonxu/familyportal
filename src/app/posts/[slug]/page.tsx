import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Section } from '../../../components/Section';
import { getPostBySlug, posts } from '../../../data/posts';

type Params = {
  slug: string;
};

export function generateStaticParams(): Params[] {
  return posts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: 'Post not found' };
  return {
    title: `${post.title} | Family Posts`,
    description: post.summary
  };
}

export default function PostPage({ params }: { params: Params }) {
  const post = getPostBySlug(params.slug);
  if (!post) return notFound();

  const date = new Date(post.publishedAt).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="flex flex-col gap-6">
      <Section
        title={post.title}
        eyebrow="Family post"
        action={
          <Link
            href="/posts"
            className="text-sm font-semibold text-sun-100 underline underline-offset-4"
          >
            Back to posts
          </Link>
        }
      >
        <div className="flex flex-wrap items-center gap-3 text-sm text-ink-100">
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
            {post.author}
          </span>
          <span>{date}</span>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4 text-base leading-relaxed text-ink-50">{post.content}</div>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-ink-100">
          <span className="rounded-full bg-ink-800 px-3 py-1 font-semibold text-sun-100">
            Public read-only
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1 font-semibold text-white">
            Edit requires sign-in
          </span>
        </div>
      </Section>

      <Section title="Next steps" eyebrow="Permissions">
        <ul className="list-disc space-y-2 pl-5 text-sm text-ink-100">
          <li>When auth is connected, show edit/delete buttons for signed-in family members.</li>
          <li>Public readers get shareable links; comments can be family-only or public.</li>
          <li>Store posts in a database with a visibility flag and owner IDs.</li>
        </ul>
      </Section>
    </div>
  );
}
