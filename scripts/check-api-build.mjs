// scripts/check-api-build.mjs
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import assert from 'node:assert/strict';
import yaml from 'js-yaml';   // already a transitive dep via @apidevtools/swagger-parser

const BUILD_DIR = process.argv[2] || './build';
const SPECS_DIR = path.join(BUILD_DIR, 'api-specs');
const CONFIG_PATH = './src/api-reference/config.json';
const LOCALES = ['', 'zh', 'tr', 'ru'];   // '' = English

const SIZE_BUDGET_BYTES = 150 * 1024;

const apis = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));

function* operationsOf(specFile) {
  const txt = fs.readFileSync(path.join(SPECS_DIR, specFile), 'utf-8');
  const doc = yaml.load(txt);
  for (const [p, item] of Object.entries(doc.paths ?? {})) {
    for (const m of ['get', 'post', 'put', 'patch', 'delete']) {
      const op = item[m];
      if (!op || op['x-internal']) continue;
      if (!op.operationId) continue;
      yield { method: m.toUpperCase(), path: p, operationId: op.operationId };
    }
  }
}

let failed = 0;
for (const locale of LOCALES) {
  for (const api of apis) {
    const localizedSpec = locale
      ? api.specFile.replace(/\.yaml$/, `.${locale}.yaml`)
      : api.specFile;
    const specPath = path.join(SPECS_DIR, fs.existsSync(path.join(SPECS_DIR, localizedSpec)) ? localizedSpec : api.specFile);
    if (!fs.existsSync(specPath)) {
      console.error(`  ✗ missing spec: ${specPath}`);
      failed++; continue;
    }
    const localePrefix = locale ? `${locale}/` : '';
    for (const op of operationsOf(path.basename(specPath))) {
      const htmlPath = path.join(BUILD_DIR, localePrefix + api.slug, 'operations', op.operationId, 'index.html');
      if (!fs.existsSync(htmlPath)) {
        console.error(`  ✗ missing page: ${htmlPath}`);
        failed++; continue;
      }
      const html = fs.readFileSync(htmlPath, 'utf-8');
      const gzSize = zlib.gzipSync(html).length;
      try {
        assert.match(html, /<title>/, `no <title> in ${htmlPath}`);
        assert.match(html, /<h1>/, `no <h1> in ${htmlPath}`);
        assert.match(html, new RegExp(op.method), `method pill missing in ${htmlPath}`);
        assert.match(html, /application\/ld\+json/, `JSON-LD missing in ${htmlPath}`);
        assert.ok(gzSize <= SIZE_BUDGET_BYTES, `${htmlPath} is ${gzSize} bytes gzipped (budget ${SIZE_BUDGET_BYTES})`);
      } catch (e) {
        console.error(`  ✗ ${e.message}`);
        failed++;
      }
    }
  }
}

if (failed) {
  console.error(`\n${failed} API-reference build assertion(s) failed.`);
  process.exit(1);
}
console.log('✓ all API-reference build assertions passed');
