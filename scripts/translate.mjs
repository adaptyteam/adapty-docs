/**
 * Bulk AI Translation Script — language-agnostic
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang zh                              # single language, all untranslated
 *   ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang zh --all                        # retranslate everything
 *   ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang zh --platform ios               # single platform
 *   ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang zh --file ios-sdk-overview      # single article
 *   ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang zh --ids "ios-sdk-overview,android-sdk-overview,react-native-sdk-overview"  # selected articles
 *   ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang zh --sidebar ios               # single sidebar
 *   ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang zh --resume <batchId>           # retrieve submitted batch
 *   ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang zh --api-specs                  # translate all API specs
 *   ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang zh --api-specs --file adapty-api # single API spec
 *   ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --incremental                          # all locales, changed files only (build pipeline)
 *   ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang zh --incremental                # single locale, changed files only
 *   ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --incremental --only-files "src/content/docs/foo.mdx,src/data/sidebars/ios.json"
 *                                                                                               # incremental, but only check these paths (CI git-diff mode)
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

// Locale-specific suffix for metadataTitle values (the part after the page title)
const METADATA_TITLE_SUFFIXES = {
  zh: '| Adapty 文档',
  ja: '| Adapty ドキュメント',
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

const idsIdx = args.indexOf('--ids');
const fileIds = idsIdx !== -1 ? args[idsIdx + 1].split(',').map(s => s.trim()).filter(Boolean) : null;

const sidebarIdx = args.indexOf('--sidebar');
const sidebarName = sidebarIdx !== -1 ? args[sidebarIdx + 1] : null;

const resumeIdx = args.indexOf('--resume');
const flagResume = resumeIdx !== -1;
// Explicit batch ID passed after --resume (may be absent — auto-read from file in main())
const resumeArgValue = flagResume ? args[resumeIdx + 1] : null;

const onlyFilesIdx = args.indexOf('--only-files');
const onlyFilePaths = onlyFilesIdx !== -1
  ? args[onlyFilesIdx + 1].split(',').map(s => s.trim()).filter(Boolean)
  : null;

// Derive per-category ID sets from --only-files (null = no filter)
const onlyDocIds = onlyFilePaths
  ? new Set(onlyFilePaths.filter(p => p.startsWith('src/content/docs/') && p.endsWith('.mdx')).map(p => path.basename(p, '.mdx')))
  : null;
const onlySidebarNames = onlyFilePaths
  ? new Set(onlyFilePaths.filter(p => p.startsWith('src/data/sidebars/') && p.endsWith('.json')).map(p => path.basename(p, '.json')))
  : null;
const onlySpecIds = onlyFilePaths
  ? new Set(onlyFilePaths.filter(p => /^src\/api-reference\/specs\/[^./]+\.yaml$/.test(p)).map(p => path.basename(p, '.yaml')))
  : null;

// Targeted operations require an explicit --lang
if ((flagResume || fileId || fileIds || sidebarName || platform) && !lang) {
  console.error('[translate] --lang <code> is required when using --resume, --file, --ids, --sidebar, or --platform');
  process.exit(1);
}

// Single-file, multi-id, or incremental → use sync (immediate) API; otherwise Batch API
const syncMode = fileId != null || fileIds != null || flagIncremental;

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

function buildSystemPrompt(targetLanguage, metadataTitleSuffix = '| Adapty Docs') {
  return `You are a technical documentation translator. Translate the MDX documentation below from English to ${targetLanguage}.

PRESERVE exactly (never translate):
- import statements
- code blocks (fenced \`\`\` blocks) — content, language tag, and title attribute
- inline code (\`...\`)
- component tag names and attribute NAMES (only translate attribute VALUES when they are human-readable phrases)
- URLs in markdown links — translate the display text only, keep the href unchanged
- platform and product names: iOS, Android, React Native, Flutter, Unity, Kotlin Multiplatform, Capacitor, Adapty
- Adapty dashboard UI element names: the dashboard is English-only, so keep these exactly as written. They typically appear **bold** in text and refer to dashboard navigation — menu items, sidebar sections, page names, tab labels, and button labels (e.g. **Paywalls**, **A/B tests**, **App settings**, **Add product**, **Save**). Do not confuse these with documentation section headings or sidebar titles, which should be translated normally.
- heading anchor IDs written as \\{#my-anchor\\} — keep them exactly as written including the backslash escapes
- link hrefs and URL fragments — in [text](url#fragment), translate only the display text; href and fragment stay byte-for-byte identical

HEADING ANCHOR RULE (critical for internal links):
Every translated heading must end with a \\{#anchor-id\\} that matches what the English source would auto-generate.
- If the heading already has \\{#anchor-id\\}: keep it unchanged, including the backslash escapes. The closing \\} must be the very last character of the heading line — do not add any punctuation or text after it.
- If the heading has NO \\{#anchor-id\\}: translate the text, then append the slug of the original English text using the \\{#...\\} syntax.
  Slug algorithm: lowercase → replace spaces with hyphens → keep only [a-z0-9-] → collapse consecutive hyphens.
  Example: \`## Quick Start\` → \`## 快速入门 \\{#quick-start\\}\`
  Example: \`## SDK Installation & Setup\` → \`## SDK 安装与配置 \\{#sdk-installation--setup\\}\`

TRANSLATE:
- frontmatter field VALUES: title, description, keywords array items
- metadataTitle: translate the title portion, then append exactly " ${metadataTitleSuffix}" as the suffix (replacing any English suffix)
- all prose: paragraphs, headings, bullet lists, numbered lists
- callout content (:::note, :::tip, :::warning, :::danger, :::info, :::important, :::link blocks)
- human-readable component prop values:
  - summary= in <Details> components
  - label= in <TabItem> when it is a phrase, not a platform name (keep "iOS", "Android", "React Native", "Flutter", "Unity", "Kotlin Multiplatform", "Capacitor" as-is)

Output valid MDX only. No explanation, no commentary, no markdown fences wrapping the output. For section fragments that do not include frontmatter, do not add import statements, frontmatter blocks, or document-level wrapper structure.`;
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
      .map(([en, translations]) => `- ${en} → ${translations[lang]}`);
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
      console.error('[translate] No ANTHROPIC_API_KEY set — cannot run incremental translation.');
      process.exit(1);
    }
    console.error('[translate] ANTHROPIC_API_KEY environment variable is required.');
    process.exit(1);
  }

  const client = new Anthropic({ apiKey });

  // Resolve --resume batch ID: use explicit arg or auto-read from saved file
  if (flagResume) {
    let resumeBatchId = resumeArgValue && !resumeArgValue.startsWith('--') ? resumeArgValue : null;
    if (!resumeBatchId) {
      try {
        resumeBatchId = (await fs.readFile(BATCH_ID_FILE, 'utf-8')).trim();
        console.log(`[translate] Auto-reading batch ID from .translate-batch-id: ${resumeBatchId}`);
      } catch {
        console.error(`[translate] --resume given but no batch ID provided and ${BATCH_ID_FILE} not found.`);
        process.exit(1);
      }
    }
    const localesDir = path.resolve(LOCALES_BASE, lang);
    const hashesDir  = path.resolve(LOCALES_BASE, lang, '.hashes');
    await resumeBatch(client, resumeBatchId, lang, localesDir, hashesDir);
    return;
  }

  // --only-files: fast exit if the diff contains nothing translatable
  if (onlyFilePaths && onlyDocIds.size === 0 && onlySidebarNames.size === 0 && onlySpecIds.size === 0) {
    console.log('[translate] --only-files: no translatable files in diff — nothing to do.');
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
    const targetLanguage       = LANGUAGE_NAMES[currentLang] ?? currentLang;
    const glossary             = await loadGlossary(currentLang);
    const metadataTitleSuffix  = METADATA_TITLE_SUFFIXES[currentLang] ?? '| Adapty Docs';
    const systemPrompt         = buildSystemPrompt(targetLanguage, metadataTitleSuffix) + glossary;
    const tag            = `[translate:${currentLang}]`;

    // --api-specs targets API specs only; skip article and sidebar translation
    if (!flagApiSpecs) {
      // --sidebar targets a single sidebar only; skip article translation
      if (!sidebarName) {
        await translateForLang(client, currentLang, localesDir, hashesDir, systemPrompt, tag, onlyDocIds);
      }

      // Sidebars are not file/platform-specific; skip only for --file/--ids targeting
      if (!fileId && !fileIds) {
        await translateSidebarsForLang(client, currentLang, localesDir, hashesDir, targetLanguage, glossary, tag, sidebarName, onlySidebarNames);
      }
    }

    if (flagApiSpecs || flagIncremental) {
      await translateApiSpecsForLang(client, currentLang, localesDir, hashesDir, targetLanguage, glossary, tag, onlySpecIds);
    }
  }
}

// ---------------------------------------------------------------------------
// Per-language translation
// ---------------------------------------------------------------------------

async function translateForLang(client, lang, localesDir, hashesDir, systemPrompt, tag, onlyDocIds = null) {
  const allFiles = await collectMdxFiles(DOCS_DIR);

  // Apply --only-files filter (git-diff mode): restrict to specific article IDs
  let files = onlyDocIds ? allFiles.filter(f => onlyDocIds.has(path.basename(f, '.mdx'))) : allFiles;
  if (onlyDocIds && files.length === 0) {
    console.log(`${tag} No matching articles from --only-files — skipping docs.`);
    return;
  }

  // Apply --file / --ids / --platform filters
  if (fileId) {
    files = allFiles.filter(f => path.basename(f, '.mdx') === fileId);
    if (files.length === 0) {
      console.error(`${tag} No article found with id: ${fileId}`);
      process.exit(1);
    }
  } else if (fileIds) {
    const fileIdsSet = new Set(fileIds);
    files = allFiles.filter(f => fileIdsSet.has(path.basename(f, '.mdx')));
    const notFound = fileIds.filter(id => !files.some(f => path.basename(f, '.mdx') === id));
    if (notFound.length > 0) {
      console.error(`${tag} Articles not found: ${notFound.join(', ')}`);
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
    } else if (flagAll || fileId != null || fileIds != null) {
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
    await translateSync(client, toTranslate, systemPrompt, localesDir, hashesDir, tag, lang);
  } else {
    await translateBatch(client, toTranslate, systemPrompt, localesDir, tag, lang);
  }
}

// ---------------------------------------------------------------------------
// Sync translation (--file, --incremental)
// ---------------------------------------------------------------------------

const SYNC_CONCURRENCY = 5;

async function translateSync(client, files, systemPrompt, localesDir, hashesDir, tag, lang) {
  let translated = 0;
  let errors = 0;
  const queue = [...files];

  async function worker() {
    while (queue.length > 0) {
      const file = queue.shift();
      if (!file) break;
      const basename = path.basename(file, '.mdx');
      try {
        if (flagIncremental) {
          await translateFileWithSections(client, file, systemPrompt, localesDir, hashesDir, lang);
        } else {
          const content = await fs.readFile(file, 'utf-8');
          const response = await client.messages.create({
            model: 'claude-sonnet-4-6',
            max_tokens: 8192,
            system: systemPrompt,
            messages: [{ role: 'user', content }],
          });
          if (response.stop_reason === 'max_tokens') {
            throw new Error(`output truncated at max_tokens limit — increase max_tokens or split the file`);
          }
          const translatedContent = response.content[0].text;
          await writeTranslation(basename, translatedContent, file, localesDir, hashesDir, lang);
          console.log(`  ✓ ${basename}`);
        }
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
// Section-level incremental translation (--incremental only)
// ---------------------------------------------------------------------------

async function translateFileWithSections(client, file, systemPrompt, localesDir, hashesDir, lang) {
  const basename = path.basename(file, '.mdx');
  const content = await fs.readFile(file, 'utf-8');

  const rawSections = splitIntoSections(content);
  const sections = deduplicateSectionIds(rawSections);

  // Load stored per-section cache
  const hashFile = path.join(hashesDir, `${basename}.json`);
  let storedData = null;
  try {
    storedData = JSON.parse(await fs.readFile(hashFile, 'utf-8'));
  } catch { /* no cache */ }

  const storedSections = storedData?.sections ?? {};
  const newSections = {};
  const translatedParts = [];
  let apiCallCount = 0;

  for (const section of sections) {
    const translatableText = extractTranslatableText(section.content);
    const contentHash = 'sha256:' + crypto.createHash('sha256').update(translatableText).digest('hex');

    const cached = storedSections[section.id];
    let translation;

    if (cached?.contentHash === contentHash) {
      translation = cached.translation;
    } else {
      let response;
      try {
        response = await client.messages.create({
          model: 'claude-sonnet-4-6',
          max_tokens: 8192,
          system: systemPrompt,
          messages: [{ role: 'user', content: section.content }],
        });
      } catch (err) {
        // Save partial progress so the next run can resume from this section
        const fHashPartial = await fileHash(file);
        await fs.mkdir(hashesDir, { recursive: true });
        await fs.writeFile(hashFile, JSON.stringify({ fileHash: fHashPartial, sections: newSections }), 'utf-8');
        throw new Error(`section '${section.id}' failed: ${err.message}`);
      }
      if (response.stop_reason === 'max_tokens') {
        const fHashPartial = await fileHash(file);
        await fs.mkdir(hashesDir, { recursive: true });
        await fs.writeFile(hashFile, JSON.stringify({ fileHash: fHashPartial, sections: newSections }), 'utf-8');
        throw new Error(`section '${section.id}' output truncated at max_tokens limit`);
      }
      translation = response.content[0].text;
      apiCallCount++;
    }

    newSections[section.id] = { contentHash, translation };
    translatedParts.push(translation);
  }

  const reconstructed = lang ? postProcessTranslation(translatedParts.join('\n'), lang) : translatedParts.join('\n');
  await fs.mkdir(localesDir, { recursive: true });
  await fs.writeFile(path.join(localesDir, `${basename}.mdx`), reconstructed, 'utf-8');

  const fHash = await fileHash(file);
  await fs.mkdir(hashesDir, { recursive: true });
  await fs.writeFile(hashFile, JSON.stringify({ fileHash: fHash, sections: newSections }), 'utf-8');

  console.log(`  ✓ ${basename} (${apiCallCount}/${sections.length} section(s) translated)`);
}

// ---------------------------------------------------------------------------
// Batch translation (default, --all, --platform)
// ---------------------------------------------------------------------------

async function translateBatch(client, files, systemPrompt, localesDir, tag, lang) {
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
  await waitAndRetrieve(client, batchId, fileMap, localesDir, tag, lang);
}

async function waitAndRetrieve(client, batchId, fileMap, localesDir, tag, lang) {
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
      if (result.result.message.stop_reason === 'max_tokens') {
        console.error(`  ✗ ${basename}: output truncated at max_tokens limit — increase max_tokens or split the file`);
        errors++;
        continue;
      }
      const text = result.result.message.content[0].text;
      const sourceFile = fileMap[basename];
      // hashesDir is derived from localesDir for batch results
      const hashesDir = path.join(localesDir, '.hashes');
      await writeTranslation(basename, text, sourceFile, localesDir, hashesDir, lang);
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
      if (result.result.message.stop_reason === 'max_tokens') {
        console.error(`  ✗ ${basename}: output truncated at max_tokens limit — increase max_tokens or split the file`);
        errors++;
        continue;
      }
      const text = result.result.message.content[0].text;
      const sourceFile = fileMap[basename];
      if (sourceFile) {
        await writeTranslation(basename, text, sourceFile, localesDir, hashesDir, lang);
      } else {
        // Source file not found — write translation without hash
        await fs.mkdir(localesDir, { recursive: true });
        await fs.writeFile(path.join(localesDir, `${basename}.mdx`), postProcessTranslation(text, lang), 'utf-8');
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

/**
 * Walk a sidebar JSON tree and return [{key, label}] pairs in traversal order.
 * key: doc id (for doc items) or label text (for category items) — matches what
 * the page component uses to look up translations in _sidebar-labels.json.
 */
function collectLabelEntries(nodes) {
  const entries = [];
  function walk(node) {
    if (Array.isArray(node)) { node.forEach(walk); return; }
    if (node && typeof node === 'object') {
      if (typeof node.label === 'string') {
        entries.push({ key: node.id ?? node.label, label: node.label });
      }
      if (node.items) walk(node.items);
    }
  }
  walk(nodes);
  return entries;
}

/**
 * Read all per-sidebar hash-cache files and merge their `labels` objects into
 * a single flat _sidebar-labels.json in the format the page component expects:
 * { "doc-id-or-label": { "value": "translated string" } }
 */
async function rebuildSidebarLabels(sidebarFiles, sidebarHashesDir, localesDir) {
  const merged = {};
  for (const file of sidebarFiles) {
    const name = path.basename(file, '.json');
    try {
      const data = JSON.parse(await fs.readFile(path.join(sidebarHashesDir, `${name}.json`), 'utf-8'));
      if (data.labels) {
        for (const [key, value] of Object.entries(data.labels)) {
          merged[key] = { value };
        }
      }
    } catch { /* sidebar not yet translated — skip */ }
  }
  await fs.mkdir(localesDir, { recursive: true });
  await fs.writeFile(path.join(localesDir, '_sidebar-labels.json'), JSON.stringify(merged, null, 2), 'utf-8');
}

async function translateSidebarsForLang(client, lang, localesDir, hashesDir, targetLanguage, glossary, tag, sidebarName = null, onlySidebarNames = null) {
  const sidebarHashesDir = path.join(hashesDir, 'sidebars');

  const entries = await fs.readdir(SIDEBARS_DIR, { withFileTypes: true });
  const allSidebarFiles = entries
    .filter(e => e.isFile() && e.name.endsWith('.json'))
    .map(e => path.join(SIDEBARS_DIR, e.name));

  // sidebarFiles = the subset to translate; allSidebarFiles = always used for the final rebuild
  let sidebarFiles = allSidebarFiles;

  if (sidebarName) {
    const match = allSidebarFiles.find(f => path.basename(f, '.json') === sidebarName);
    if (!match) {
      console.error(`${tag} No sidebar found with name: ${sidebarName}`);
      console.error(`  Available: ${allSidebarFiles.map(f => path.basename(f, '.json')).join(', ')}`);
      process.exit(1);
    }
    sidebarFiles = [match];
  } else if (onlySidebarNames) {
    sidebarFiles = allSidebarFiles.filter(f => onlySidebarNames.has(path.basename(f, '.json')));
    if (sidebarFiles.length === 0) {
      console.log(`${tag} No matching sidebars from --only-files — skipping sidebars.`);
      return;
    }
  }

  const toTranslate = [];
  for (const file of sidebarFiles) {
    const name = path.basename(file, '.json');

    if (flagIncremental || flagAll) {
      const currentHash = await fileHash(file);
      const storedHash  = await getStoredHash(name, sidebarHashesDir);
      if (!flagAll && storedHash === currentHash) continue;
      toTranslate.push(file);
    } else {
      // Needs translation if cache is missing or has no labels (old format)
      try {
        const cached = JSON.parse(await fs.readFile(path.join(sidebarHashesDir, `${name}.json`), 'utf-8'));
        if (!cached.labels) toTranslate.push(file);
      } catch {
        toTranslate.push(file);
      }
    }
  }

  if (toTranslate.length === 0) {
    console.log(`${tag} Sidebars: all up to date.`);
    // Still rebuild _sidebar-labels.json in case it was deleted
    await rebuildSidebarLabels(allSidebarFiles, sidebarHashesDir, localesDir);
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
      const labelEntries = collectLabelEntries(parsed);

      if (labelEntries.length === 0) {
        const hash = await fileHash(file);
        await fs.mkdir(sidebarHashesDir, { recursive: true });
        await fs.writeFile(path.join(sidebarHashesDir, `${name}.json`), JSON.stringify({ fileHash: hash, labels: {} }), 'utf-8');
        console.log(`  ✓ sidebar:${name} (no labels)`);
        continue;
      }

      const response = await client.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 4096,
        system: systemPrompt,
        messages: [{ role: 'user', content: JSON.stringify(labelEntries.map(e => e.label)) }],
      });
      if (response.stop_reason === 'max_tokens') {
        throw new Error(`sidebar label output truncated at max_tokens limit`);
      }

      // Strip optional markdown fences the model may wrap the JSON in
      let responseText = response.content[0].text.trim();
      responseText = responseText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');

      const translated = JSON.parse(responseText);
      if (!Array.isArray(translated) || translated.length !== labelEntries.length) {
        throw new Error(`label count mismatch: expected ${labelEntries.length}, got ${translated.length}`);
      }

      // Build flat labels map: key → translated label
      const labelsObj = Object.fromEntries(labelEntries.map((e, i) => [e.key, translated[i]]));

      const hash = await fileHash(file);
      await fs.mkdir(sidebarHashesDir, { recursive: true });
      await fs.writeFile(path.join(sidebarHashesDir, `${name}.json`), JSON.stringify({ fileHash: hash, labels: labelsObj }), 'utf-8');

      console.log(`  ✓ sidebar:${name}`);
    } catch (err) {
      console.error(`  ✗ sidebar:${name}: ${err.message}`);
    }
  }

  // Rebuild the single _sidebar-labels.json from all cached sidebar translations
  await rebuildSidebarLabels(allSidebarFiles, sidebarHashesDir, localesDir);
}

// ---------------------------------------------------------------------------
// API spec translation
// ---------------------------------------------------------------------------

async function translateApiSpecsForLang(client, lang, localesDir, hashesDir, targetLanguage, glossary, tag, onlySpecIds = null) {
  const apiHashesDir = path.resolve(hashesDir, 'api-specs');
  const systemPrompt = buildApiSpecSystemPrompt(targetLanguage) + glossary;

  // Collect English source specs only — exclude already-localized files.
  // English files have exactly one dot: "adapty-api.yaml" → ["adapty-api","yaml"] (length 2).
  // Localized files have two dots: "adapty-api.zh.yaml" → length 3.
  const entries = await fs.readdir(API_SPECS_DIR, { withFileTypes: true });
  let specFiles = entries
    .filter(e => e.isFile() && e.name.endsWith('.yaml') && e.name.split('.').length === 2)
    .map(e => ({ name: e.name, full: path.join(API_SPECS_DIR, e.name), basename: path.basename(e.name, '.yaml') }));

  // Apply --only-files filter
  if (onlySpecIds) {
    specFiles = specFiles.filter(s => onlySpecIds.has(s.basename));
    if (specFiles.length === 0) {
      console.log(`${tag} No matching API specs from --only-files — skipping specs.`);
      return;
    }
  }

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

  // Error out if --file targeted a spec that doesn't exist
  if (fileId && !specFiles.some(s => s.basename === fileId)) {
    console.error(`${tag} No API spec found with id: ${fileId}`);
    process.exit(1);
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
        max_tokens: 64000,
        system: systemPrompt,
        messages: [{ role: 'user', content }],
      });
      if (response.stop_reason === 'max_tokens') {
        throw new Error(`API spec output truncated at max_tokens limit — spec may be too large`);
      }
      const translated = response.content[0].text;
      const outputPath = path.join(API_SPECS_DIR, `${spec.basename}.${lang}.yaml`);
      await fs.writeFile(outputPath, translated, 'utf-8');

      const hash = await fileHash(spec.full);
      await fs.mkdir(apiHashesDir, { recursive: true });
      await fs.writeFile(
        path.join(apiHashesDir, `${spec.basename}.json`),
        JSON.stringify({ fileHash: hash }),
        'utf-8'
      );
      console.log(`  ✓ api-spec:${spec.basename}`);
    } catch (err) {
      console.error(`  ✗ api-spec:${spec.basename}: ${err.message}`);
    }
  }
}

// ---------------------------------------------------------------------------
// Section-level helpers (used by translateFileWithSections)
// ---------------------------------------------------------------------------

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Sections larger than this get split further by paragraph blocks.
const PARAGRAPH_FALLBACK_CHARS = 3000;

/**
 * Split MDX content into H2/H3-based sections.
 * Falls back to paragraph-level splitting for sections that exceed PARAGRAPH_FALLBACK_CHARS
 * (covers articles with no headings, or long preambles before the first heading).
 * Returns Array<{id: string, content: string}> where content pieces join('\n') === original.
 */
function splitIntoSections(content) {
  const lines = content.split('\n');
  const sections = [];
  let sectionStart = 0;
  let currentId = 'preamble';
  let inFrontmatter = false;
  let frontmatterDone = false;
  let codeBlockFence = null; // null = not in code block; '`' or '~' = inside one

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Frontmatter detection (only at start of file)
    if (!frontmatterDone) {
      if (i === 0 && line.trim() === '---') {
        inFrontmatter = true;
        continue;
      } else if (i === 0) {
        frontmatterDone = true;
        // fall through to heading detection for line 0
      } else if (inFrontmatter) {
        if (line.trim() === '---') {
          inFrontmatter = false;
          frontmatterDone = true;
        }
        continue;
      }
    }

    // Code block toggle — track opening character so ~~~ cannot close a ``` block
    const fenceMatch = line.match(/^(`{3,}|~{3,})/);
    if (fenceMatch) {
      if (codeBlockFence === null) {
        codeBlockFence = fenceMatch[1][0]; // enter block; record '`' or '~'
      } else if (line[0] === codeBlockFence) {
        codeBlockFence = null; // exit block only if same fence character
      }
    }

    // H2 or H3 heading → start a new section
    if (codeBlockFence === null && /^#{2,3} /.test(line)) {
      sections.push({ id: currentId, content: lines.slice(sectionStart, i).join('\n') });
      sectionStart = i;
      const level = line.startsWith('### ') ? 'h3' : 'h2';
      const headingText = line
        .replace(/^#{2,3} /, '')
        .replace(/\s*\{#[^}]+\}\s*$/, '')
        .trim();
      currentId = `${level}-` + slugify(headingText);
    }
  }

  sections.push({ id: currentId, content: lines.slice(sectionStart).join('\n') });

  // Paragraph fallback: split large sections that have no sub-headings into
  // paragraph-sized chunks so we don't re-translate an entire H2+ block when
  // only one paragraph changed. Also handles heading-free articles.
  const result = [];
  for (const section of sections) {
    if (section.content.length <= PARAGRAPH_FALLBACK_CHARS) {
      result.push(section);
    } else {
      result.push(...splitByParagraphBlocks(section));
    }
  }
  return result;
}

/**
 * Split a section that is too large into paragraph-sized chunks separated by
 * blank lines (respecting code block boundaries). Each chunk gets a stable
 * positional ID: `<parentId>-p1`, `<parentId>-p2`, etc.
 * If the section cannot be split (e.g. one giant code block), returns it as-is.
 */
function splitByParagraphBlocks(section) {
  const lines = section.content.split('\n');
  const rawBlocks = [];
  let start = 0;
  let codeBlockFence = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const fenceMatch = line.match(/^(`{3,}|~{3,})/);
    if (fenceMatch) {
      if (codeBlockFence === null) codeBlockFence = fenceMatch[1][0];
      else if (line[0] === codeBlockFence) codeBlockFence = null;
    }

    // Blank line outside a code block = paragraph boundary
    if (codeBlockFence === null && line.trim() === '' && i > start) {
      const block = lines.slice(start, i + 1).join('\n');
      if (block.trim()) rawBlocks.push(block);
      start = i + 1;
    }
  }
  const tail = lines.slice(start).join('\n');
  if (tail.trim()) rawBlocks.push(tail);

  if (rawBlocks.length <= 1) return [section]; // can't split further

  // Merge consecutive paragraph blocks into chunks that stay under the threshold
  const chunks = [];
  let current = '';
  let idx = 1;
  for (const block of rawBlocks) {
    const candidate = current ? `${current}\n${block}` : block;
    if (current && candidate.length > PARAGRAPH_FALLBACK_CHARS) {
      chunks.push({ id: `${section.id}-p${idx}`, content: current });
      idx++;
      current = block;
    } else {
      current = candidate;
    }
  }
  if (current) chunks.push({ id: `${section.id}-p${idx}`, content: current });

  return chunks.length > 1 ? chunks : [section];
}

/** Append -2, -3 suffixes for duplicate section ids. */
function deduplicateSectionIds(sections) {
  const counts = new Map();
  return sections.map(s => {
    const prev = counts.get(s.id) ?? 0;
    counts.set(s.id, prev + 1);
    const id = prev === 0 ? s.id : `${s.id}-${prev + 1}`;
    return { ...s, id };
  });
}

/**
 * Strip fenced code blocks and import lines — used only for hashing,
 * not for sending to the API.
 */
function extractTranslatableText(content) {
  const lines = content.split('\n');
  const result = [];
  let codeBlockFence = null;
  for (const line of lines) {
    const fenceMatch = line.match(/^(`{3,}|~{3,})/);
    if (fenceMatch) {
      if (codeBlockFence === null) {
        codeBlockFence = fenceMatch[1][0];
      } else if (line[0] === codeBlockFence) {
        codeBlockFence = null;
      }
      continue;
    }
    if (codeBlockFence !== null) continue;
    if (/^import /.test(line)) continue;
    result.push(line);
  }
  return result.join('\n');
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
    return data.fileHash ?? data.hash ?? null;
  } catch {
    return null;
  }
}

/**
 * Post-process translated MDX content:
 * 1. Normalize heading anchor IDs to the escaped form \{#id\} required by MDX.
 *    Handles both unescaped {#id} (which MDX would crash on) and already-correct \{#id\},
 *    and also strips any trailing characters Claude may have appended after the closing brace.
 * 2. Rewrite absolute https://adapty.io/docs/<id> links to include the locale prefix.
 */
function postProcessTranslation(content, lang) {
  // Normalize heading anchors: match optional leading backslash, strip trailing chars
  content = content.replace(
    /^(#{1,6} .*?)\\?\{#([\w-]+)\}[^\n]*$/gm,
    '$1\\{#$2\\}'
  );

  // Localize absolute adapty.io/docs/ links (skip already-localized paths)
  content = content.replace(
    /https:\/\/adapty\.io\/docs\/(?![a-z]{2}\/)([^\s"')\]>]+)/g,
    `https://adapty.io/docs/${lang}/$1`
  );

  return content;
}

async function writeTranslation(basename, content, sourceFile, localesDir, hashesDir, lang = null) {
  if (lang) content = postProcessTranslation(content, lang);
  await fs.mkdir(localesDir, { recursive: true });
  await fs.writeFile(path.join(localesDir, `${basename}.mdx`), content, 'utf-8');

  if (sourceFile) {
    const hash = await fileHash(sourceFile);
    await fs.mkdir(hashesDir, { recursive: true });
    await fs.writeFile(
      path.join(hashesDir, `${basename}.json`),
      JSON.stringify({ fileHash: hash }),
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
