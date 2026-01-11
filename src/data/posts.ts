export type Post = {
  slug: string;
  title: string;
  author: string;
  publishedAt: string;
  summary: string;
  content: string;
  tags: string[];
  mood: string;
};

export const posts: Post[] = [
  {
    slug: 'weekend-hike',
    title: 'Sunrise Hike and Pancake Party',
    author: 'Mia',
    publishedAt: '2025-01-10T08:15:00Z',
    summary: 'We caught the first light at the ridge and wrapped with pancakes back home.',
    content:
      'We started before dawn, the trail was quiet, and the air smelled like pine. By the time we reached the lookout, the sky went from deep ink to cotton candy orange. The kids brought cocoa in thermoses and we raced back for pancakes. Sharing photos and a small video clip soon!',
    tags: ['outdoors', 'kids', 'sunrise'],
    mood: 'sunny'
  },
  {
    slug: 'science-fair',
    title: 'Science Fair Win!',
    author: 'Leo',
    publishedAt: '2025-01-06T19:30:00Z',
    summary: 'The volcano project erupted (in a good way).',
    content:
      'After weeks of tinkering, painting, and testing the eruption mix, the volcano worked perfectly on stage. Big shoutout to everyone who helped rehearse the presentation and decorated the poster. We celebrated with pizza afterward. Photos and the recipe for the lava mix are here.',
    tags: ['school', 'projects'],
    mood: 'celebration'
  },
  {
    slug: 'soccer-finals',
    title: 'Soccer Finals Recap',
    author: 'Avery',
    publishedAt: '2025-01-03T14:00:00Z',
    summary: 'Tough match, great defense, and a last-minute goal.',
    content:
      'The finals were intense. We held a tight defense through the first half, then the other team scored. With five minutes left, we tied it up and pushed into extra time. The winning goal was a clean break up the wing. Proud of the whole squad for the teamwork.',
    tags: ['sports', 'soccer'],
    mood: 'energized'
  }
];

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}
