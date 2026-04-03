// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import rehypeExternalLinks from 'rehype-external-links';
import { visit } from 'unist-util-visit';

function rehypeWrapTables() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName === 'table' && parent && typeof index === 'number') {
        const wrapper = {
          type: 'element',
          tagName: 'div',
          properties: { className: ['table-scroll'] },
          children: [node],
        };
        parent.children[index] = wrapper;
      }
    });
  };
}

export default defineConfig({
  site: 'https://hundewissen-mit-kopf.de',
  build: {
    inlineStylesheets: 'always'
  },
  image: {
    layout: 'constrained',
  },
  integrations: [sitemap()],
  markdown: {
    rehypePlugins: [
      rehypeWrapTables,
      [rehypeExternalLinks, {
        target: '_blank',
        rel: ['nofollow', 'noopener', 'noreferrer'],
        test: (element) => {
          const href = element.properties?.href;
          return typeof href === 'string' &&
            !href.startsWith('https://hundewissen-mit-kopf.de') &&
            !href.startsWith('/');
        }
      }]
    ]
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
