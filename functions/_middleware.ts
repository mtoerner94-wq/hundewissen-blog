// Cloudflare Pages Function: Markdown-Content-Negotiation
// Wenn ein Client mit "Accept: text/markdown" anfragt, liefern wir die
// vorgerenderte .md-Variante (statisch erzeugt von Astro). Sonst HTML.

interface Env {
  ASSETS: { fetch: (req: Request | URL | string) => Promise<Response> };
}

const ASSET_EXTENSIONS = [
  '.md', '.txt', '.xml', '.ico',
  '.png', '.webp', '.jpg', '.jpeg', '.svg',
  '.css', '.js',
  '.woff', '.woff2',
];

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, next, env } = context;
  const url = new URL(request.url);

  if (request.method !== 'GET' && request.method !== 'HEAD') return next();

  const accept = request.headers.get('Accept') ?? '';
  if (!accept.includes('text/markdown')) return next();

  const isAsset =
    url.pathname.startsWith('/_astro/') ||
    url.pathname.startsWith('/fonts/') ||
    url.pathname.startsWith('/pagefind/') ||
    ASSET_EXTENSIONS.some((ext) => url.pathname.endsWith(ext));

  if (isAsset) return next();

  const trimmed = url.pathname.replace(/\/$/, '');
  const mdPath = trimmed === '' ? '/index.md' : `${trimmed}.md`;

  const mdResponse = await env.ASSETS.fetch(new URL(mdPath, url.origin));
  if (!mdResponse.ok) return next();

  return new Response(await mdResponse.text(), {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Vary': 'Accept',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
