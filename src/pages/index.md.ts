import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const SITE = 'https://hundewissen-mit-kopf.de';

const CATEGORIES: { name: string; slug: string; tagline: string }[] = [
  { name: 'Hundeernährung', slug: 'hundeernaehrung', tagline: 'Futter, Barfen, Allergien, Snacks' },
  { name: 'Erziehung & Verhalten', slug: 'erziehung-verhalten', tagline: 'Welpenerziehung, Training, Probleme lösen' },
  { name: 'Hundepflege', slug: 'hundepflege', tagline: 'Fellpflege, Krallen, Zähne, Gesundheit' },
  { name: 'Hundeausstattung', slug: 'hundeausstattung', tagline: 'Leinen, Geschirre, Spielzeug, Transport' },
  { name: 'Hunderassen', slug: 'hunderassen', tagline: 'Rasseporträts, Eignung, Eigenheiten' },
  { name: 'Reisen', slug: 'reisen', tagline: 'Mit Hund verreisen, Urlaubsorte, Tipps' },
];

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const latest = posts
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    .slice(0, 12);

  const lines = [
    `# Hundewissen mit Kopf`,
    ``,
    `> Deutschsprachiger Hunde-Ratgeber: faktenbasierte Artikel zu Ernährung, Erziehung, Pflege, Ausstattung, Rassen und Reisen mit Hund. Gegen Halbwahrheiten, Mythen und Panikmache.`,
    ``,
    `**URL:** ${SITE}/`,
    ``,
    `---`,
    ``,
    `## Themenbereiche`,
    ``,
    ...CATEGORIES.map((c) => `- [${c.name}](${SITE}/${c.slug}/) — ${c.tagline}`),
    ``,
    `## Aktuelle Artikel`,
    ``,
    ...latest.map(
      (p) => `- [${p.data.title}](${SITE}/${p.data.categorySlug}/${p.id}/) — ${p.data.description}`,
    ),
    ``,
    `## Weiterführende Ressourcen`,
    ``,
    `- [Sitemap](${SITE}/sitemap-index.xml)`,
    `- [llms.txt](${SITE}/llms.txt) — kuratierter Site-Index für LLMs`,
    `- [llms-full.txt](${SITE}/llms-full.txt) — vollständiger Markdown-Dump aller Artikel`,
    ``,
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
