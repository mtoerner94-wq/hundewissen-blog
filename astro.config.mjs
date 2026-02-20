// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import rehypeExternalLinks from 'rehype-external-links';
export default defineConfig({
  site: 'https://hundewissen-mit-kopf.de',
  build: {
    inlineStylesheets: 'always'
  },
  integrations: [sitemap()],
  markdown: {
    rehypePlugins: [
      [rehypeExternalLinks, {
        target: '_blank',
        rel: ['nofollow', 'noopener', 'noreferrer']
      }]
    ]
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
