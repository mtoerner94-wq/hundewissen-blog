import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const SITE = 'https://hundewissen-mit-kopf.de';

export async function getStaticPaths() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);

  return posts.map((entry) => ({
    params: { category: entry.data.categorySlug, id: entry.id },
    props: { entry },
  }));
}

export const GET: APIRoute = ({ props }) => {
  const { entry } = props as { entry: Awaited<ReturnType<typeof getCollection<'blog'>>>[number] };
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
    `**URL:** ${SITE}/${categorySlug}/${entry.id}/`,
    ``,
    `---`,
    ``,
  ];

  const body = entry.body ?? '';

  return new Response(headerLines.join('\n') + body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
