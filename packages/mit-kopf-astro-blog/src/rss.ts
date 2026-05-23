import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export type BlogRssConfig = {
  title: string;
  description: string;
  /** Fallback when context.site is unset */
  siteFallback: string;
};

/** Factory for src/pages/rss.xml.ts */
export function createBlogRssHandler(config: BlogRssConfig) {
  return async function GET(context: APIContext) {
    const posts = await getCollection('blog', ({ data }) => !data.draft);
    const sorted = posts.sort(
      (a, b) => b.data.date.getTime() - a.data.date.getTime(),
    );
    const site = context.site ?? config.siteFallback;

    return rss({
      title: config.title,
      description: config.description,
      site,
      xmlns: {
        atom: 'http://www.w3.org/2005/Atom',
      },
      customData: `<atom:link href="${new URL('rss.xml', site).href}" rel="self" type="application/rss+xml" />`,
      items: sorted.map((post) => ({
        title: post.data.title,
        pubDate: post.data.updated ?? post.data.date,
        description: post.data.description,
        link: `/${post.data.categorySlug}/${post.id}/`,
      })),
    });
  };
}
