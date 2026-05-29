// Astro static endpoint: serves a Markdown overview of an API spec at
// `/docs/{slug}.md` (e.g. `/docs/api-adapty.md`). The HTML view of the same
// page is produced by `[slug].astro`, and per-operation Markdown lives at
// `[slug]/operations/[op].md.ts`.
//
// The DocsLayout already emits `<link rel="alternate" type="text/markdown">`
// pointing at `{currentURL}.md`, so any LLM crawler that respects the
// convention will discover this file automatically once it lands.

import type { APIRoute } from 'astro';
import apiConfig from '../api-reference/config.json';
import { loadSpec } from '../api-reference/lib/load-spec';
import { buildApiSpec } from '../api-reference/lib/model';
import { buildSpecMarkdown } from '../api-reference/lib/build-spec-md';

const PUBLIC_BASE_URL = 'https://adapty.io/docs';

export async function getStaticPaths() {
  const { isLocaleOnlyBuild } = await import('../data/locales');
  if (isLocaleOnlyBuild) return [];
  return apiConfig.map(api => ({
    params: { slug: api.slug },
    props: { specFile: api.specFile, api },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const { specFile, api } = props as { specFile: string; api: any };
  const baseUrl = (import.meta.env.BASE_URL ?? '/').replace(/\/+$/, '');
  const deref = await loadSpec(specFile);
  const spec = buildApiSpec(deref, api, baseUrl);

  const md = buildSpecMarkdown(spec, { baseUrl: PUBLIC_BASE_URL });
  return new Response(md, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
