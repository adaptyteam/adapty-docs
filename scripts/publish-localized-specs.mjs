// scripts/publish-localized-specs.mjs
//
// The localized API landing pages (e.g. /docs/ru/api-adapty) link the
// "Download OpenAPI spec" button at `${baseUrl}/${locale}/api-specs/{file}.yaml`
// (see src/api-reference/lib/model.ts → specFileUrl). The translated YAML
// files, however, live flat in `public/api-specs/` with a locale suffix
// (e.g. adapty-api.ru.yaml). This script publishes each translated spec at
// the URL the page actually links to: `public/{locale}/api-specs/{file}.yaml`.
//
// When a localized spec is missing, the English file is copied as a fallback
// to mirror loadSpec()'s behavior so the download link is never broken.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const SPECS_DIR = path.join(ROOT, 'public', 'api-specs');
const LOCALES_DIR = path.join(ROOT, 'src', 'locales');

// Discover locales from `src/locales/` — each subdirectory is one locale.
// Matches how the rest of the project defines supported languages
// (see src/data/locales.ts → SUPPORTED_LOCALES).
const LOCALES = fs.existsSync(LOCALES_DIR)
  ? fs
      .readdirSync(LOCALES_DIR, { withFileTypes: true })
      .filter((e) => e.isDirectory() && !e.name.startsWith('.'))
      .map((e) => e.name)
  : [];

if (!fs.existsSync(SPECS_DIR)) {
  console.log('[publish-localized-specs] no public/api-specs directory yet, skipping');
  process.exit(0);
}

const englishSpecs = fs
  .readdirSync(SPECS_DIR)
  .filter((f) => f.endsWith('.yaml') && !/\.[a-z]{2}\.yaml$/i.test(f));

if (englishSpecs.length === 0) {
  console.log('[publish-localized-specs] no English spec files found, skipping');
  process.exit(0);
}

let copied = 0;
let fellBack = 0;
for (const locale of LOCALES) {
  const outDir = path.join(ROOT, 'public', locale, 'api-specs');
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });

  for (const specFile of englishSpecs) {
    const localizedName = specFile.replace(/\.yaml$/, `.${locale}.yaml`);
    const localizedPath = path.join(SPECS_DIR, localizedName);
    const englishPath = path.join(SPECS_DIR, specFile);
    const source = fs.existsSync(localizedPath) ? localizedPath : englishPath;
    if (!fs.existsSync(localizedPath)) fellBack++;
    fs.copyFileSync(source, path.join(outDir, specFile));
    copied++;
  }
}

console.log(
  `[publish-localized-specs] published ${copied} spec(s) across ${LOCALES.length} locale(s)` +
    (fellBack ? ` (${fellBack} fell back to English)` : '')
);
