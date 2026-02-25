/**
 * Bulk AI Translation Script — language-agnostic
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang zh                    # single language, all untranslated
 *   ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang zh --all              # retranslate everything
 *   ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang zh --platform ios     # single platform
 *   ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang zh --file ios-sdk-overview
 *   ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang zh --resume <batchId> # retrieve submitted batch
 *   ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --incremental                # all locales, changed files only (build pipeline)
 *   ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang zh --incremental      # single locale, changed files only
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import Anthropic from '@anthropic-ai/sdk';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const DOCS_DIR      = path.resolve(__dirname, '../src/content/docs');
const SIDEBARS_DIR  = path.resolve(__dirname, '../src/data/sidebars');
const LOCALES_BASE  = path.resolve(__dirname, '../src/locales');
const BATCH_ID_FILE = path.resolve(__dirname, '../.translate-batch-id');
const API_SPECS_DIR  = path.resolve(__dirname, '../src/api-reference/specs');

const LANGUAGE_NAMES = {
  zh: 'Simplified Chinese (zh-CN)',
  ja: 'Japanese (ja-JP)',
};

// ---------------------------------------------------------------------------
// CLI argument parsing
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);

const langIdx = args.indexOf('--lang');
const lang = langIdx !== -1 ? args[langIdx + 1] : null;

const flagAll         = args.includes('--all');
const flagIncremental = args.includes('--incremental');
const flagApiSpecs    = args.includes('--api-specs');

const platformIdx = args.indexOf('--platform');
const platform = platformIdx !== -1 ? args[platformIdx + 1] : null;

const fileIdx = args.indexOf('--file');
const fileId = fileIdx !== -1 ? args[fileIdx + 1] : null;

const resumeIdx = args.indexOf('--resume');
const resumeBatchId = resumeIdx !== -1 ? args[resumeIdx + 1] : null;

// Targeted operations require an explicit --lang
if ((resumeBatchId || fileId || platform) && !lang) {
  console.error('[translate] --lang <code> is required when using --resume, --file, or --platform');
  process.exit(1);
}

// Single-file or incremental → use sync (immediate) API; otherwise Batch API
const syncMode = fileId != null || flagIncremental;

// ---------------------------------------------------------------------------
// Locale discovery
// ---------------------------------------------------------------------------

async function discoverLocales() {
  const entries = await fs.readdir(LOCALES_BASE, { withFileTypes: true });
  return entries
    .filter(e => e.isDirectory() && !e.name.startsWith('.'))
    .map(e => e.name);
}

// ---------------------------------------------------------------------------
// System prompt (built per-language)
// ---------------------------------------------------------------------------

function buildSystemPrompt(targetLanguage) {
  return `You are a technical documentation translator. Translate the MDX documentation below from English to ${targetLanguage}.

PRESERVE exactly (never translate):
- import statements
- code blocks (fenced \`\`\` blocks) — content, language tag, and title attribute
- inline code (\`...\`)
- component tag names and attribute NAMES (only translate attribute VALUES when they are human-readable phrases)
- URLs in markdown links — translate the display text only, keep the href unchanged
- platform and product names: iOS, Android, React Native, Flutter, Unity, Kotlin Multiplatform, Capacitor, Adapty
- heading anchor IDs like {#my-anchor} — keep them exactly as written
- the suffix " | Adapty Docs" in metadataTitle values
- link hrefs and URL fragments — in [text](url#fragment), translate only the display text; href and fragment stay byte-for-byte identical

HEADING ANCHOR RULE (critical for internal links):
Every translated heading must end with a {#anchor-id} that matches what the English source would auto-generate.
- If the heading already has {#anchor-id}: keep it unchanged.
- If the heading has NO {#anchor-id}: translate the text, then append the slug of the original English text.
  Slug algorithm: lowercase → replace spaces with hyphens → keep only [a-z0-9-] → collapse consecutive hyphens.
  Example: \`## Quick Start\` → \`## 快速入门 {#quick-start}\`
  Example: \`## SDK Installation & Setup\` → \`## SDK 安装与配置 {#sdk-installation--setup}\`

TRANSLATE:
- frontmatter field VALUES: title, description, metadataTitle (translate the title portion before " | Adapty Docs"), keywords array items
- all prose: paragraphs, headings, bullet lists, numbered lists
- callout content (:::note, :::tip, :::warning, :::danger, :::info, :::important, :::link blocks)
- human-readable component prop values:
  - summary= in <Details> components
  - label= in <TabItem> when it is a phrase, not a platform name (keep "iOS", "Android", "React Native", "Flutter", "Unity", "Kotlin Multiplatform", "Capacitor" as-is)

Output valid MDX only. No explanation, no commentary, no markdown fences wrapping the output.`;
}

function buildApiSpecSystemPrompt(targetLanguage) {
  return `You are a technical documentation translator. Translate the OpenAPI YAML specification below from English to ${targetLanguage}.

PRESERVE exactly (never translate):
- All YAML keys and property names
- $ref values, operationId values, server url values
- Security scheme names and their values
- enum values, format values, type values, pattern values
- example and examples field values
- HTTP status codes
- Tag name values (under "tags: - name:") — they are used as internal anchors by Stoplight Elements
- All technical identifiers, punctuation tokens, and formatting characters

TRANSLATE:
- summary fields under operations, parameters, responses, and schemas
- description fields under operations, parameters, responses, schemas, and info
- info.title and info.description
- Tag description fields (not name fields)
- x-* extension fields whose values are human-readable prose sentences

Output valid YAML only. No explanation, no commentary, no markdown fences wrapping the output.`;
}

// ---------------------------------------------------------------------------
// Glossary loader
// ---------------------------------------------------------------------------

async function loadGlossary(lang) {
  const dictPath = path.resolve(LOCALES_BASE, 'dictionary.json');
  try {
    const dict = JSON.parse(await fs.readFile(dictPath, 'utf-8'));
    const lines = Object.entries(dict)
      .filter(([_, translations]) => lang in translations)
      .map(([en, translations]) => {
        const tr   = translations[lang];
        const note = translations['_note'] ? ` (${translations['_note']})` : '';
        return `- ${en} → ${tr}${note}`;
      });
    if (lines.length === 0) return '';
    return `\nGLOSSARY — use these exact translations for product-specific terms (do not improvise):\n${lines.join('\n')}`;
  } catch {
    return ''; // dictionary not found → proceed without glossary
  }
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    if (flagIncremental) {
      console.log('[translate] No ANTHROPIC_API_KEY set — skipping incremental translation.');
      process.exit(0);
    }
    console.error('[translate] ANTHROPIC_API_KEY environment variable is required.');
    process.exit(1);
  }

  const client = new Anthropic({ apiKey });

  // Resume uses a previously-submitted batch for a single explicit lang
  if (resumeBatchId) {
    const localesDir = path.resolve(LOCALES_BASE, lang);
    const hashesDir  = path.resolve(LOCALES_BASE, lang, '.hashes');
    await resumeBatch(client, resumeBatchId, lang, localesDir, hashesDir);
    return;
  }

  // Determine which languages to process
  const langs = lang ? [lang] : await discoverLocales();
  if (langs.length === 0) {
    console.log('[translate] No locale directories found in src/locales/ — nothing to do.');
    return;
  }

  for (const currentLang of langs) {
    const localesDir     = path.resolve(LOCALES_BASE, currentLang);
    const hashesDir      = path.resolve(LOCALES_BASE, currentLang, '.hashes');
    const targetLanguage = LANGUAGE_NAMES[currentLang] ?? currentLang;
    const glossary       = await loadGlossary(currentLang);
    const systemPrompt   = buildSystemPrompt(targetLanguage) + glossary;
    const tag            = `[translate:${currentLang}]`;

    await translateForLang(client, currentLang, localesDir, hashesDir, systemPrompt, tag);

    // Sidebars are not file/platform-specific; skip only for --file targeting
    if (!fileId) {
      await translateSidebarsForLang(client, currentLang, localesDir, hashesDir, targetLanguage, glossary, tag);
    }

    if (flagApiSpecs || flagIncremental) {
      await translateApiSpecsForLang(client, currentLang, localesDir, hashesDir, targetLanguage, glossary, tag);
    }
  }
}

// ---------------------------------------------------------------------------
// Per-language translation
// ---------------------------------------------------------------------------

async function translateForLang(client, lang, localesDir, hashesDir, systemPrompt, tag) {
  const allFiles = await collectMdxFiles(DOCS_DIR);

  // Apply --file / --platform filters
  let files = allFiles;
  if (fileId) {
    files = allFiles.filter(f => path.basename(f, '.mdx') === fileId);
    if (files.length === 0) {
      console.error(`${tag} No article found with id: ${fileId}`);
      process.exit(1);
    }
  } else if (platform) {
    const platformIds = await getSidebarIds(platform, tag);
    files = allFiles.filter(f => platformIds.has(path.basename(f, '.mdx')));
    if (files.length === 0) {
      console.error(`${tag} No articles found for platform: ${platform}`);
      process.exit(1);
    }
  }

  // Determine which files actually need translation
  const toTranslate = [];
  for (const file of files) {
    const basename = path.basename(file, '.mdx');
    const translatedPath = path.join(localesDir, `${basename}.mdx`);

    if (flagIncremental) {
      const currentHash = await fileHash(file);
      const storedHash  = await getStoredHash(basename, hashesDir);
      if (storedHash === currentHash) continue;
      toTranslate.push(file);
    } else if (flagAll) {
      toTranslate.push(file);
    } else {
      try {
        await fs.access(translatedPath);
        // exists → skip
      } catch {
        toTranslate.push(file);
      }
    }
  }

  if (toTranslate.length === 0) {
    console.log(`${tag} Nothing to translate — all articles are up to date.`);
    return;
  }

  console.log(`${tag} ${toTranslate.length} article(s) to translate.`);

  if (syncMode) {
    await translateSync(client, toTranslate, systemPrompt, localesDir, hashesDir, tag);
  } else {
    await translateBatch(client, toTranslate, systemPrompt, localesDir, tag);
  }
}

// ---------------------------------------------------------------------------
// Sync translation (--file, --incremental)
// ---------------------------------------------------------------------------

const SYNC_CONCURRENCY = 5;

async function translateSync(client, files, systemPrompt, localesDir, hashesDir, tag) {
  let translated = 0;
  let errors = 0;
  const queue = [...files];

  async function worker() {
    while (queue.length > 0) {
      const file = queue.shift();
      if (!file) break;
      const basename = path.basename(file, '.mdx');
      try {
        const content = await fs.readFile(file, 'utf-8');
        const response = await client.messages.create({
          model: 'claude-sonnet-4-6',
          max_tokens: 8192,
          system: systemPrompt,
          messages: [{ role: 'user', content }],
        });
        const translatedContent = response.content[0].text;
        await writeTranslation(basename, translatedContent, file, localesDir, hashesDir);
        console.log(`  ✓ ${basename}`);
        translated++;
      } catch (err) {
        console.error(`  ✗ ${basename}: ${err.message}`);
        errors++;
      }
    }
  }

  await Promise.all(Array.from({ length: SYNC_CONCURRENCY }, () => worker()));
  console.log(`\n${tag} Done: ${translated} translated, ${errors} errors.`);
}

// ---------------------------------------------------------------------------
// Batch translation (default, --all, --platform)
// ---------------------------------------------------------------------------

async function translateBatch(client, files, systemPrompt, localesDir, tag) {
  console.log(`${tag} Reading source files...`);
  const requests = await Promise.all(
    files.map(async (file) => {
      const basename = path.basename(file, '.mdx');
      const content = await fs.readFile(file, 'utf-8');
      return {
        custom_id: basename,
        params: {
          model: 'claude-sonnet-4-6',
          max_tokens: 8192,
          system: systemPrompt,
          messages: [{ role: 'user', content }],
        },
      };
    })
  );

  console.log(`${tag} Submitting batch of ${requests.length} requests...`);
  const batch = await client.messages.batches.create({ requests });
  const batchId = batch.id;

  await fs.writeFile(BATCH_ID_FILE, batchId, 'utf-8');
  console.log(`${tag} Batch submitted: ${batchId}`);
  console.log(`${tag} Batch ID saved to .translate-batch-id`);
  console.log(`${tag} Use --resume <batchId> to retrieve results if this process is interrupted.`);

  const fileMap = Object.fromEntries(files.map(f => [path.basename(f, '.mdx'), f]));
  await waitAndRetrieve(client, batchId, fileMap, localesDir, tag);
}

async function waitAndRetrieve(client, batchId, fileMap, localesDir, tag) {
  console.log(`${tag} Polling batch status every 30 seconds...`);

  let batch = await client.messages.batches.retrieve(batchId);
  while (batch.processing_status !== 'ended') {
    const counts = batch.request_counts ?? {};
    console.log(
      `  Status: ${batch.processing_status} — processing: ${counts.processing ?? '?'}, ` +
      `succeeded: ${counts.succeeded ?? '?'}, errored: ${counts.errored ?? '?'}`
    );
    await sleep(30_000);
    batch = await client.messages.batches.retrieve(batchId);
  }

  console.log(`${tag} Batch complete. Retrieving results...`);
  let translated = 0;
  let errors = 0;

  const results = await client.messages.batches.results(batchId);
  for await (const result of results) {
    const basename = result.custom_id;
    if (result.result.type === 'succeeded') {
      const text = result.result.message.content[0].text;
      const sourceFile = fileMap[basename];
      // hashesDir is derived from localesDir for batch results
      const hashesDir = path.join(localesDir, '.hashes');
      await writeTranslation(basename, text, sourceFile, localesDir, hashesDir);
      console.log(`  ✓ ${basename}`);
      translated++;
    } else {
      console.error(`  ✗ ${basename}: ${JSON.stringify(result.result)}`);
      errors++;
    }
  }

  console.log(`\n${tag} Done: ${translated} translated, ${errors} errors.`);
}

// ---------------------------------------------------------------------------
// Resume a submitted batch
// ---------------------------------------------------------------------------

async function resumeBatch(client, batchId, lang, localesDir, hashesDir) {
  const tag = `[translate:${lang}]`;
  let batch = await client.messages.batches.retrieve(batchId);
  console.log(`${tag} Resuming batch ${batchId} — status: ${batch.processing_status}`);

  if (batch.processing_status !== 'ended') {
    console.log(`${tag} Waiting for batch to complete...`);
    while (batch.processing_status !== 'ended') {
      const counts = batch.request_counts ?? {};
      console.log(
        `  Status: ${batch.processing_status} — processing: ${counts.processing ?? '?'}, ` +
        `succeeded: ${counts.succeeded ?? '?'}, errored: ${counts.errored ?? '?'}`
      );
      await sleep(30_000);
      batch = await client.messages.batches.retrieve(batchId);
    }
  }

  const allSourceFiles = await collectMdxFiles(DOCS_DIR);
  const fileMap = Object.fromEntries(allSourceFiles.map(f => [path.basename(f, '.mdx'), f]));

  console.log(`${tag} Retrieving results...`);
  let translated = 0;
  let errors = 0;

  const results = await client.messages.batches.results(batchId);
  for await (const result of results) {
    const basename = result.custom_id;
    if (result.result.type === 'succeeded') {
      const text = result.result.message.content[0].text;
      const sourceFile = fileMap[basename];
      if (sourceFile) {
        await writeTranslation(basename, text, sourceFile, localesDir, hashesDir);
      } else {
        // Source file not found — write translation without hash
        await fs.mkdir(localesDir, { recursive: true });
        await fs.writeFile(path.join(localesDir, `${basename}.mdx`), text, 'utf-8');
      }
      console.log(`  ✓ ${basename}`);
      translated++;
    } else {
      console.error(`  ✗ ${basename}: ${JSON.stringify(result.result)}`);
      errors++;
    }
  }

  console.log(`\n${tag} Done: ${translated} translated, ${errors} errors.`);
}

// ---------------------------------------------------------------------------
// Sidebar translation
// ---------------------------------------------------------------------------

/** Walk a sidebar JSON tree and return all label strings in traversal order. */
function collectLabels(nodes) {
  const labels = [];
  function walk(node) {
    if (Array.isArray(node)) { node.forEach(walk); return; }
    if (node && typeof node === 'object') {
      if (typeof node.label === 'string') labels.push(node.label);
      if (node.items) walk(node.items);
    }
  }
  walk(nodes);
  return labels;
}

/** Deep-clone tree and fill label fields with translated strings (same traversal order). */
function applyLabels(nodes, translations) {
  const clone = JSON.parse(JSON.stringify(nodes));
  let idx = 0;
  function walk(node) {
    if (Array.isArray(node)) { node.forEach(walk); return; }
    if (node && typeof node === 'object') {
      if (typeof node.label === 'string') node.label = translations[idx++];
      if (node.items) walk(node.items);
    }
  }
  walk(clone);
  return clone;
}

async function translateSidebarsForLang(client, lang, localesDir, hashesDir, targetLanguage, glossary, tag) {
  const sidebarLocalesDir = path.join(localesDir, 'sidebars');
  const sidebarHashesDir  = path.join(hashesDir, 'sidebars');

  const entries = await fs.readdir(SIDEBARS_DIR, { withFileTypes: true });
  const sidebarFiles = entries
    .filter(e => e.isFile() && e.name.endsWith('.json'))
    .map(e => path.join(SIDEBARS_DIR, e.name));

  const toTranslate = [];
  for (const file of sidebarFiles) {
    const name = path.basename(file, '.json');
    const translatedPath = path.join(sidebarLocalesDir, `${name}.json`);

    if (flagIncremental || flagAll) {
      const currentHash = await fileHash(file);
      const storedHash  = await getStoredHash(name, sidebarHashesDir);
      if (!flagAll && storedHash === currentHash) continue;
      toTranslate.push(file);
    } else {
      try { await fs.access(translatedPath); } catch { toTranslate.push(file); }
    }
  }

  if (toTranslate.length === 0) {
    console.log(`${tag} Sidebars: all up to date.`);
    return;
  }

  console.log(`${tag} ${toTranslate.length} sidebar(s) to translate.`);

  const systemPrompt =
    `You translate navigation labels for a technical documentation site from English to ${targetLanguage}. ` +
    `Return ONLY a valid JSON array of translated strings — one per input label, same order, same length. ` +
    `No explanations.${glossary}`;

  for (const file of toTranslate) {
    const name = path.basename(file, '.json');
    try {
      const raw    = await fs.readFile(file, 'utf-8');
      const parsed = JSON.parse(raw);
      const labels = collectLabels(parsed);

      if (labels.length === 0) {
        console.log(`  ✓ sidebar:${name} (no labels)`);
        continue;
      }

      const response = await client.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 4096,
        system: systemPrompt,
        messages: [{ role: 'user', content: JSON.stringify(labels) }],
      });

      const translated = JSON.parse(response.content[0].text.trim());
      if (!Array.isArray(translated) || translated.length !== labels.length) {
        throw new Error(`label count mismatch: expected ${labels.length}, got ${translated.length}`);
      }

      const result = applyLabels(parsed, translated);
      await fs.mkdir(sidebarLocalesDir, { recursive: true });
      await fs.writeFile(path.join(sidebarLocalesDir, `${name}.json`), JSON.stringify(result, null, 2), 'utf-8');

      const hash = await fileHash(file);
      await fs.mkdir(sidebarHashesDir, { recursive: true });
      await fs.writeFile(path.join(sidebarHashesDir, `${name}.json`), JSON.stringify({ hash }), 'utf-8');

      console.log(`  ✓ sidebar:${name}`);
    } catch (err) {
      console.error(`  ✗ sidebar:${name}: ${err.message}`);
    }
  }
}

// ---------------------------------------------------------------------------
// API spec translation
// ---------------------------------------------------------------------------

async function translateApiSpecsForLang(client, lang, localesDir, hashesDir, targetLanguage, glossary, tag) {
  const apiHashesDir = path.resolve(hashesDir, 'api-specs');
  const systemPrompt = buildApiSpecSystemPrompt(targetLanguage) + glossary;

  // Collect English source specs only — exclude already-localized files.
  // English files have exactly one dot: "adapty-api.yaml" → ["adapty-api","yaml"] (length 2).
  // Localized files have two dots: "adapty-api.zh.yaml" → length 3.
  const entries = await fs.readdir(API_SPECS_DIR, { withFileTypes: true });
  const specFiles = entries
    .filter(e => e.isFile() && e.name.endsWith('.yaml') && e.name.split('.').length === 2)
    .map(e => ({ name: e.name, full: path.join(API_SPECS_DIR, e.name), basename: path.basename(e.name, '.yaml') }));

  const toTranslate = [];
  for (const spec of specFiles) {
    const outputPath = path.join(API_SPECS_DIR, `${spec.basename}.${lang}.yaml`);

    if (flagIncremental || flagAll) {
      const currentHash = await fileHash(spec.full);
      const storedHash  = await getStoredHash(spec.basename, apiHashesDir);
      if (!flagAll && storedHash === currentHash) continue;
      toTranslate.push(spec);
    } else if (fileId) {
      if (spec.basename === fileId) toTranslate.push(spec);
    } else {
      try { await fs.access(outputPath); } catch { toTranslate.push(spec); }
    }
  }

  if (toTranslate.length === 0) {
    console.log(`${tag} API specs: all up to date.`);
    return;
  }

  console.log(`${tag} ${toTranslate.length} API spec(s) to translate.`);

  for (const spec of toTranslate) {
    try {
      const content = await fs.readFile(spec.full, 'utf-8');
      const response = await client.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 16384,
        system: systemPrompt,
        messages: [{ role: 'user', content }],
      });
      const translated = response.content[0].text;
      const outputPath = path.join(API_SPECS_DIR, `${spec.basename}.${lang}.yaml`);
      await fs.writeFile(outputPath, translated, 'utf-8');

      const hash = await fileHash(spec.full);
      await fs.mkdir(apiHashesDir, { recursive: true });
      await fs.writeFile(
        path.join(apiHashesDir, `${spec.basename}.json`),
        JSON.stringify({ hash }),
        'utf-8'
      );
      console.log(`  ✓ api-spec:${spec.basename}`);
    } catch (err) {
      console.error(`  ✗ api-spec:${spec.basename}: ${err.message}`);
    }
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function collectMdxFiles(dir) {
  const files = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectMdxFiles(fullPath)));
    } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
      files.push(fullPath);
    }
  }
  return files;
}

async function getSidebarIds(platformName, tag) {
  const sidebarPath = path.join(SIDEBARS_DIR, `${platformName}.json`);
  let sidebar;
  try {
    const content = await fs.readFile(sidebarPath, 'utf-8');
    sidebar = JSON.parse(content);
  } catch {
    console.error(`${tag} Sidebar not found for platform: ${platformName}`);
    console.error(`  Expected: ${sidebarPath}`);
    process.exit(1);
  }

  const ids = new Set();
  function extract(items) {
    for (const item of items) {
      if (item.type === 'doc' && item.id) ids.add(item.id);
      if (item.items) extract(item.items);
    }
  }
  extract(sidebar);
  return ids;
}

async function fileHash(filePath) {
  const content = await fs.readFile(filePath);
  return 'sha256:' + crypto.createHash('sha256').update(content).digest('hex');
}

async function getStoredHash(basename, hashesDir) {
  try {
    const hashFile = path.join(hashesDir, `${basename}.json`);
    const data = JSON.parse(await fs.readFile(hashFile, 'utf-8'));
    return data.hash ?? null;
  } catch {
    return null;
  }
}

async function writeTranslation(basename, content, sourceFile, localesDir, hashesDir) {
  await fs.mkdir(localesDir, { recursive: true });
  await fs.writeFile(path.join(localesDir, `${basename}.mdx`), content, 'utf-8');

  if (sourceFile) {
    const hash = await fileHash(sourceFile);
    await fs.mkdir(hashesDir, { recursive: true });
    await fs.writeFile(
      path.join(hashesDir, `${basename}.json`),
      JSON.stringify({ hash }),
      'utf-8'
    );
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

main().catch((err) => {
  console.error('[translate] Fatal error:', err);
  process.exit(1);
});
