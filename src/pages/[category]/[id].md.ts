import { createArticleMarkdownRoute } from '@mit-kopf/astro-blog/article-markdown';

const { getStaticPaths, GET } = createArticleMarkdownRoute('https://hundewissen-mit-kopf.de');
export { getStaticPaths, GET };
