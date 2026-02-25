import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { buildDocPaths } from '../utils/docs';
import { SUPPORTED_LOCALES } from '../data/locales';

/**
 * Sitemap for all Chinese-localized pages (/docs/zh/...).
 * Mirrors the locale route generation in [locale]/[...slug].astro —
 * skips redirect entries, includes only canonical pages.
 */
export const GET: APIRoute = async () => {
  const allDocs = await getCollection('docs');
  const englishPaths = await buildDocPaths(allDocs);

  const urls: string[] = [];

  for (const locale of SUPPORTED_LOCALES) {
    for (const entry of englishPaths) {
      // Skip redirect stubs — same rule as [locale]/[...slug].astro
      if (entry.props.redirectTo) continue;

      const slug: string | undefined = entry.params.slug;
      const loc = slug
        ? `https://adapty.io/docs/${locale}/${slug}`
        : `https://adapty.io/docs/${locale}/`;

      urls.push(loc);
    }
  }

  const urlEntries = urls
    .map((url) => `  <url><loc>${url}</loc></url>`)
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
