import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const SITE = 'https://hundewissen-mit-kopf.de';

const CATEGORIES: { name: string; slug: string; tagline: string }[] = [
  { name: 'Hundeernährung', slug: 'hundeernaehrung', tagline: 'Futter, Barfen, Trockenfutter, Allergien, Snacks, Rohfütterung' },
  { name: 'Erziehung & Verhalten', slug: 'erziehung-verhalten', tagline: 'Welpenerziehung, Training, Verhaltensprobleme, Sozialisierung' },
  { name: 'Hundepflege', slug: 'hundepflege', tagline: 'Fellpflege, Krallenschneiden, Zahnpflege, Gesundheitsvorsorge' },
  { name: 'Hundeausstattung', slug: 'hundeausstattung', tagline: 'Leinen, Geschirre, Halsbänder, Hundeboxen, Spielzeug' },
  { name: 'Hunderassen', slug: 'hunderassen', tagline: 'Rasseporträts, Charakter, Eignung für Familie/Anfänger, Pflegeaufwand' },
  { name: 'Reisen', slug: 'reisen', tagline: 'Mit Hund verreisen, hundefreundliche Hotels, Auto, Bahn, Flug' },
];

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const sorted = posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  const featured = sorted.filter((p) => p.data.featured).slice(0, 10);
  const latest = sorted.slice(0, 50);

  const lines: string[] = [
    `# Hundewissen mit Kopf`,
    ``,
    `> Deutschsprachiger Hunde-Ratgeber für verantwortungsvolle Halter. Faktenbasierte Artikel zu Ernährung, Erziehung, Pflege, Ausstattung, Rassen und Reisen — gegen Halbwahrheiten, Mythen und Panikmache. Mit Quellenangaben.`,
    ``,
    `Dieser Index ist nach [llmstxt.org](https://llmstxt.org/) formatiert.`,
    ``,
    `## Themenbereiche`,
    ``,
    ...CATEGORIES.map((c) => `- [${c.name}](${SITE}/${c.slug}/): ${c.tagline}`),
    ``,
  ];

  if (featured.length > 0) {
    lines.push(`## Empfohlene Artikel`, ``);
    for (const p of featured) {
      lines.push(`- [${p.data.title}](${SITE}/${p.data.categorySlug}/${p.id}/): ${p.data.description}`);
    }
    lines.push(``);
  }

  lines.push(`## Aktuelle Artikel`, ``);
  for (const p of latest) {
    lines.push(`- [${p.data.title}](${SITE}/${p.data.categorySlug}/${p.id}/): ${p.data.description}`);
  }

  lines.push(
    ``,
    `## Optional`,
    ``,
    `- [Sitemap (XML)](${SITE}/sitemap-index.xml): vollständige Liste aller URLs`,
    `- [llms-full.txt](${SITE}/llms-full.txt): vollständiger Markdown-Dump aller Artikel`,
    `- [Über mich](${SITE}/ueber-mich/): Autor und redaktionelle Standards`,
    ``,
  );

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
