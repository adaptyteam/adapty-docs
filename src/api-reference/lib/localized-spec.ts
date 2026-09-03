// src/api-reference/lib/localized-spec.ts
//
// Locale builds must never lose an operation that exists in the English
// spec. A localized spec file can lag behind the English one (translation
// runs are asynchronous), and `loadSpec` only falls back to English when
// the localized file is missing entirely — a stale file that parses fine
// simply has fewer operations, which used to make those operation URLs
// 404 in that locale. These helpers make the English operation list
// canonical: operations missing from the localized spec are served with
// English content instead of disappearing.

import { loadSpec } from './load-spec.ts';
import { buildApiSpec } from './model.ts';
import type { ApiConfigEntry, ApiSpec, ApiTag } from './model.ts';

/**
 * Merge a localized ApiSpec with its English counterpart.
 *
 * The English operation list is canonical: every English operation appears
 * in the result, localized where the localized spec has it, English
 * otherwise. Operations that no longer exist in the English spec are
 * dropped. Tag groups are rebuilt from the merged list so fallback
 * operations stay navigable in the sidebar.
 */
export function mergeSpecWithEnglishFallback(localeSpec: ApiSpec, enSpec: ApiSpec): ApiSpec {
  const localized = new Map(localeSpec.operations.map(o => [o.operationId, o]));
  const operations = enSpec.operations.map(o => localized.get(o.operationId) ?? o);

  const upToDate =
    operations.length === localeSpec.operations.length &&
    operations.every((op, i) => op === localeSpec.operations[i]);
  if (upToDate) return localeSpec;

  const tagOrder: string[] = [];
  const tagOps = new Map<string, string[]>();
  for (const op of operations) {
    if (!op.tag) continue;
    if (!tagOps.has(op.tag)) {
      tagOps.set(op.tag, []);
      tagOrder.push(op.tag);
    }
    tagOps.get(op.tag)!.push(op.operationId);
  }
  const tags: ApiTag[] = tagOrder.map(name => {
    const meta =
      localeSpec.tags.find(t => t.name === name) ?? enSpec.tags.find(t => t.name === name);
    return {
      name,
      descriptionHtml: meta?.descriptionHtml ?? '',
      operationIds: tagOps.get(name)!,
    };
  });

  return { ...localeSpec, operations, tags };
}

/**
 * Build the ApiSpec model for a locale with per-operation English fallback.
 * Drop-in replacement for `loadSpec` + `buildApiSpec` in locale routes.
 */
export async function buildLocalizedApiSpec(
  api: ApiConfigEntry,
  locale: string,
  localeBase: string,
): Promise<ApiSpec> {
  const localeDeref = await loadSpec(api.specFile, locale);
  const enDeref = await loadSpec(api.specFile);
  const localeSpec = buildApiSpec(localeDeref, api, localeBase);
  const enSpec = buildApiSpec(enDeref, api, localeBase);
  return mergeSpecWithEnglishFallback(localeSpec, enSpec);
}
