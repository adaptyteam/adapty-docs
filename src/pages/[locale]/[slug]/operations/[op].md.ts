// Astro static endpoint: locale-prefixed Markdown view of a single API
// operation at `/docs/{locale}/{slug}/operations/{operationId}.md`.
// Mirrors `src/pages/[slug]/operations/[op].md.ts` but emits one entry
// per locale × spec × operation. Falls back to the English raw spec when
// a translated `public/api-specs/{file}.{locale}.yaml` is not present.

import type { APIRoute } from 'astro';
import apiConfig from '../../../../api-reference/config.json';
import { loadRawSpec } from '../../../../api-reference/lib/load-spec';
import { buildLocalizedApiSpec } from '../../../../api-reference/lib/localized-spec';
import { buildOperationMarkdown } from '../../../../api-reference/lib/build-operation-md';
import { getBuildLocales } from '../../../../data/locales';

export async function getStaticPaths() {
  const baseUrl = (import.meta.env.BASE_URL ?? '/').replace(/\/+$/, '');
  const paths: Array<{ params: any; props: any }> = [];

  for (const locale of getBuildLocales()) {
    const localeBase = `${baseUrl}/${locale}`;
    for (const api of apiConfig) {
      // English operation list is canonical — see buildLocalizedApiSpec.
      const spec = await buildLocalizedApiSpec(api, locale, localeBase);
      for (const op of spec.operations) {
        paths.push({
          params: { locale, slug: api.slug, op: op.operationId },
          props: { specFile: api.specFile, opId: op.operationId, locale },
        });
      }
    }
  }

  return paths;
}

export const GET: APIRoute = async ({ props }) => {
  const { specFile, opId, locale } = props as { specFile: string; opId: string; locale: string };
  const raw = await loadRawSpec(specFile, locale);
  let md = buildOperationMarkdown(raw, specFile, opId);
  if (!md) {
    // Operation missing from a stale localized spec — serve the English slice.
    const rawEn = await loadRawSpec(specFile);
    md = buildOperationMarkdown(rawEn, specFile, opId);
  }
  if (!md) {
    return new Response(`Operation '${opId}' not found in ${specFile}`, { status: 404 });
  }
  return new Response(md, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
