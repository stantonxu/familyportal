import type { Metadata } from 'next';
import { PostCard } from '../../components/PostCard';
import { posts } from '../../data/posts';

export const metadata: Metadata = {
  title: 'Family Posts',
  description: 'Stories, photos, and updates from the family.'
};

export default function PostsPage() {
  return (
    <div className="flex flex-col gap-6">
      <header className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/25">
        <p className="text-xs uppercase tracking-[0.2em] text-sun-200">Posts</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Family Stories</h1>
        <p className="mt-3 max-w-2xl text-sm text-ink-100">
          Read and share updates. Family members can create and edit after signing in; public readers
          can view and share links.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
