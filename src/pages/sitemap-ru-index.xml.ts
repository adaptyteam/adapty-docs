import type { APIRoute } from 'astro';

/**
 * Sitemap index for Russian-localized content.
 * Referenced by the Algolia ru crawler instead of the default sitemap-index.xml.
 */
export const GET: APIRoute = () => {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://adapty.io/docs/sitemap-ru.xml</loc>
  </sitemap>
</sitemapindex>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
