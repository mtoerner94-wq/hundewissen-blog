import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

/** Factory for src/pages/[category]/[id].md.ts */
export function createArticleMarkdownRoute(siteUrl: string) {
  const site = siteUrl.replace(/\/$/, '');

  async function getStaticPaths() {
    const posts = await getCollection('blog', ({ data }) => !data.draft);
    return posts.map((entry) => ({
      params: { category: entry.data.categorySlug, id: entry.id },
      props: { entry },
    }));
  }

  const GET: APIRoute = ({ props }) => {
    const { entry } = props as {
      entry: Awaited<ReturnType<typeof getCollection<'blog'>>>[number];
    };
    const { title, description, date, updated, category, categorySlug } = entry.data;
    const isoDate = (d: Date) => d.toISOString().slice(0, 10);

    const headerLines = [
      `# ${title}`,
      ``,
      `> ${description}`,
      ``,
      `**Kategorie:** ${category}  `,
      `**Veröffentlicht:** ${isoDate(date)}` +
        (updated ? `  \n**Aktualisiert:** ${isoDate(updated)}` : ''),
      ``,
      `**URL:** ${site}/${categorySlug}/${entry.id}/`,
      ``,
      `---`,
      ``,
    ];

    return new Response(headerLines.join('\n') + (entry.body ?? ''), {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  };

  return { getStaticPaths, GET };
}
