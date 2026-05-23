import rehypeExternalLinks from 'rehype-external-links';

/**
 * Rehype plugin tuple: external links open in new tab with nofollow.
 *
 * @param {string} siteUrl - Primary site origin (e.g. https://example.de)
 * @param {{ allowHosts?: string[] }} [options] - Additional URL prefixes to treat as internal
 */
export function createExternalLinksPlugin(siteUrl, options = {}) {
  const allowHosts = options.allowHosts ?? [];
  const allowed = [siteUrl, '/', ...allowHosts];

  return [
    rehypeExternalLinks,
    {
      target: '_blank',
      rel: ['nofollow', 'noopener', 'noreferrer'],
      test: (element) => {
        const href = element.properties?.href;
        if (typeof href !== 'string') return false;
        return !allowed.some((prefix) => href.startsWith(prefix));
      },
    },
  ];
}
