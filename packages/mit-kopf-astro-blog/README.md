# @mit-kopf/astro-blog

Gemeinsame Bausteine für die drei Mit-Kopf-Blogs (RSS, Rehype, Markdown-Negotiation, Pagination).

## Installation (pro Blog)

```json
"@mit-kopf/astro-blog": "file:../packages/mit-kopf-astro-blog"
```

`astro.config.mjs`:

```js
vite: {
  plugins: [tailwindcss()],
  ssr: { noExternal: ['@mit-kopf/astro-blog'] },
},
```

## Exports

| Import | Zweck |
|--------|--------|
| `@mit-kopf/astro-blog/rehype/wrap-tables` | Tabellen-Scroll-Wrapper |
| `@mit-kopf/astro-blog/rehype/external-links` | `createExternalLinksPlugin(siteUrl, { allowHosts })` |
| `@mit-kopf/astro-blog/rss` | `createBlogRssHandler({ title, description, siteFallback })` |
| `@mit-kopf/astro-blog/article-markdown` | `createArticleMarkdownRoute(siteUrl)` |
| `@mit-kopf/astro-blog/cloudflare/markdown-negotiation` | `onRequest` für `functions/_middleware.ts` |
| `@mit-kopf/astro-blog/utils/reading-time` | `calcReadingTime(body, imageCount?)` |
| `@mit-kopf/astro-blog/components/*` | Pagination, AiDisclosure |
