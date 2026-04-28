import path from 'node:path';
import fs from 'node:fs';
import SwaggerParser from '@apidevtools/swagger-parser';

const cache = new Map<string, unknown>();

function specPathFor(specFile: string, locale?: string): string {
  const base = path.join(process.cwd(), 'public', 'api-specs');
  if (!locale || locale === 'en') return path.join(base, specFile);
  const localized = specFile.replace(/\.yaml$/, `.${locale}.yaml`);
  const localizedPath = path.join(base, localized);
  return fs.existsSync(localizedPath) ? localizedPath : path.join(base, specFile);
}

export async function loadSpec(specFile: string, locale?: string): Promise<any> {
  const key = `${specFile}::${locale ?? 'en'}`;
  if (cache.has(key)) return cache.get(key);

  const filePath = specPathFor(specFile, locale);
  if (!fs.existsSync(filePath)) {
    throw new Error(`[api-ref] spec file not found: ${filePath}`);
  }

  const parsed = await SwaggerParser.dereference(filePath);
  cache.set(key, parsed);
  return parsed;
}

export function clearSpecCache(): void {
  cache.clear();
}
