// Astro static endpoint: serves a Markdown view of a single API operation
// at `/docs/{slug}/operations/{operationId}.md`. The HTML view of the same
// operation is produced by `[slug]/[...rest].astro`.

import type { APIRoute } from 'astro';
import apiConfig from '../../../api-reference/config.json';
import { loadSpec, loadRawSpec } from '../../../api-reference/lib/load-spec';
import { buildApiSpec } from '../../../api-reference/lib/model';
import { buildOperationMarkdown } from '../../../api-reference/lib/build-operation-md';

export async function getStaticPaths() {
  const { isLocaleOnlyBuild } = await import('../../../data/locales');
  if (isLocaleOnlyBuild) return [];

  const baseUrl = (import.meta.env.BASE_URL ?? '/').replace(/\/+$/, '');
  const paths: Array<{ params: any; props: any }> = [];

  for (const api of apiConfig) {
    const deref = await loadSpec(api.specFile);
    const spec = buildApiSpec(deref, api, baseUrl);
    for (const op of spec.operations) {
      paths.push({
        params: { slug: api.slug, op: op.operationId },
        props: { specFile: api.specFile, opId: op.operationId },
      });
    }
  }

  return paths;
}

export const GET: APIRoute = async ({ props }) => {
  const { specFile, opId } = props as { specFile: string; opId: string };
  const raw = await loadRawSpec(specFile);
  const md = buildOperationMarkdown(raw, specFile, opId);
  if (!md) {
    return new Response(`Operation '${opId}' not found in ${specFile}`, { status: 404 });
  }
  return new Response(md, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
