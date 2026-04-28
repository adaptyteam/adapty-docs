import path from 'node:path';
import fs from 'node:fs';
import yaml from 'js-yaml';
import SwaggerParser from '@apidevtools/swagger-parser';

const cache = new Map<string, unknown>();
const rawCache = new Map<string, unknown>();

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

// Load the spec without dereferencing — preserves `$ref` strings so callers
// (e.g. the per-operation Markdown export) can emit a sliced spec that still
// looks like the human-authored YAML.
export async function loadRawSpec(specFile: string, locale?: string): Promise<any> {
  const key = `${specFile}::${locale ?? 'en'}`;
  if (rawCache.has(key)) return rawCache.get(key);

  const filePath = specPathFor(specFile, locale);
  if (!fs.existsSync(filePath)) {
    throw new Error(`[api-ref] spec file not found: ${filePath}`);
  }

  const text = await fs.promises.readFile(filePath, 'utf-8');
  const parsed = yaml.load(text);
  rawCache.set(key, parsed);
  return parsed;
}

export function clearSpecCache(): void {
  cache.clear();
  rawCache.clear();
}
