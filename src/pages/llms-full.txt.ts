import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const SITE = 'https://hundewissen-mit-kopf.de';

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const sorted = posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  const isoDate = (d: Date) => d.toISOString().slice(0, 10);

  const sections: string[] = [
    `# Hundewissen mit Kopf — Vollständiger Content-Dump`,
    ``,
    `> Alle veröffentlichten Artikel der Site als ein Markdown-Dokument. Sortiert nach Veröffentlichungsdatum (neueste zuerst). Generiert am Build-Zeitpunkt.`,
    ``,
    `Ursprung: ${SITE}/`,
    `Anzahl Artikel: ${sorted.length}`,
    ``,
  ];

  for (const p of sorted) {
    const url = `${SITE}/${p.data.categorySlug}/${p.id}/`;
    sections.push(
      `\n\n================================================================================`,
      ``,
      `# ${p.data.title}`,
      ``,
      `> ${p.data.description}`,
      ``,
      `**Kategorie:** ${p.data.category}  `,
      `**Veröffentlicht:** ${isoDate(p.data.date)}` +
        (p.data.updated ? `  \n**Aktualisiert:** ${isoDate(p.data.updated)}` : ''),
      ``,
      `**URL:** ${url}`,
      ``,
      `---`,
      ``,
      p.body ?? '',
    );
  }

  return new Response(sections.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
