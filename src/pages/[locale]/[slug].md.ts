// Astro static endpoint: locale-prefixed Markdown view of an API spec at
// `/docs/{locale}/{slug}.md`. Mirrors `src/pages/[slug].md.ts` but emits
// one entry per locale × spec, and threads the locale through to
// `loadSpec` so a translated spec at `public/api-specs/{file}.{locale}.yaml`
// is preferred when present (it falls back to the English file otherwise).
//
// Without this route the alternate-link `<link rel="alternate" type="text/markdown">`
// emitted by DocsLayout for `/docs/{locale}/{slug}` would 404.

import type { APIRoute } from 'astro';
import apiConfig from '../../api-reference/config.json';
import { loadSpec } from '../../api-reference/lib/load-spec';
import { buildApiSpec } from '../../api-reference/lib/model';
import { buildSpecMarkdown } from '../../api-reference/lib/build-spec-md';
import { getBuildLocales } from '../../data/locales';

const PUBLIC_BASE_URL = 'https://adapty.io/docs';

export async function getStaticPaths() {
  const paths: Array<{ params: any; props: any }> = [];
  for (const locale of getBuildLocales()) {
    for (const api of apiConfig) {
      paths.push({
        params: { locale, slug: api.slug },
        props: { specFile: api.specFile, api, locale },
      });
    }
  }
  return paths;
}

export const GET: APIRoute = async ({ props }) => {
  const { specFile, api, locale } = props as { specFile: string; api: any; locale: string };
  const baseUrl = (import.meta.env.BASE_URL ?? '/').replace(/\/+$/, '');
  const localeBase = `${baseUrl}/${locale}`;
  const deref = await loadSpec(specFile, locale);
  const spec = buildApiSpec(deref, api, localeBase);

  const md = buildSpecMarkdown(spec, { baseUrl: `${PUBLIC_BASE_URL}/${locale}` });
  return new Response(md, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
