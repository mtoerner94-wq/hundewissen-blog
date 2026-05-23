import { createBlogRssHandler } from '@mit-kopf/astro-blog/rss';

export const GET = createBlogRssHandler({
  title: 'Hundewissen mit Kopf',
  description:
    'Fundiertes Wissen statt Halbwahrheiten. Hundeernährung, Erziehung, Pflege und mehr.',
  siteFallback: 'https://hundewissen-mit-kopf.de',
});
