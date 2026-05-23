// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { rehypeWrapTables } from '@mit-kopf/astro-blog/rehype/wrap-tables';
import { createExternalLinksPlugin } from '@mit-kopf/astro-blog/rehype/external-links';

const SITE = 'https://hundewissen-mit-kopf.de';

export default defineConfig({
  site: SITE,
  build: {
    inlineStylesheets: 'always',
  },
  image: {
    layout: 'constrained',
  },
  integrations: [sitemap()],
  markdown: {
    rehypePlugins: [
      rehypeWrapTables,
      createExternalLinksPlugin(SITE),
    ],
  },
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ['@mit-kopf/astro-blog'],
    },
  },
});
