/**
 * Bulk AI Translation Script — language-agnostic
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang zh                              # single language, all untranslated
 *   ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang zh --all                        # retranslate everything
 *   ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang zh --platform ios               # single platform, untranslated articles only
 *   ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang zh --platform ios --incremental # single platform, changed sections only (skips up-to-date)
 *   ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang zh --file ios-sdk-overview      # single article
 *   ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang zh --ids "ios-sdk-overview,android-sdk-overview,react-native-sdk-overview"  # selected articles
 *   ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang zh --sidebar ios               # single sidebar
 *   ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang zh --sidebars                  # all untranslated sidebars, no articles
 *   ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang zh --resume <batchId>           # retrieve submitted batch
 *   ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang zh --api-specs                  # translate all API specs
 *   ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang zh --reusables                  # translate reusable snippets only
 *   ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang zh --api-specs --file adapty-api # single API spec
 *   ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --incremental                          # all locales, changed files only (build pipeline)
 *   ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang zh --incremental                # single locale, changed files only
 *   ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --incremental --only-files "src/content/docs/foo.mdx,src/data/sidebars/ios.json"
 *                                                                                               # incremental, but only check these paths (CI git-diff mode)
 *   ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --incremental --batch --only-files "src/content/docs/foo.mdx"
 *                                                                                              # incremental + Batch API (50% off), CI default
 *   node scripts/translate.mjs --incremental --batch --dry-run --only-files "..."             # show batch plan without submitting (no API key needed)
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import Anthropic from '@anthropic-ai/sdk';
import yaml from 'js-yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const DOCS_DIR      = path.resolve(__dirname, '../src/content/docs');
const SIDEBARS_DIR  = path.resolve(__dirname, '../src/data/sidebars');
const LOCALES_BASE  = path.resolve(__dirname, '../src/locales');
const BATCH_ID_FILE = path.resolve(__dirname, '../.translate-batch-id');
const API_SPECS_DIR  = path.resolve(__dirname, '../src/api-reference/specs');
const REUSABLE_DIR  = path.resolve(__dirname, '../src/components/reusable');

const LANGUAGE_NAMES = {
  zh: 'Simplified Chinese (zh-CN)',
  ja: 'Japanese (ja-JP)',
  tr: 'Turkish (tr-TR)',
  ru: 'Russian (ru-RU)',
};

// Locale-specific suffix for metadataTitle values (the part after the page title)
const METADATA_TITLE_SUFFIXES = {
  zh: '| Adapty 文档',
  ja: '| Adapty ドキュメント',
  tr: '| Adapty Dokümanları',
  ru: '| Документация Adapty',
};

// ---------------------------------------------------------------------------
// CLI argument parsing
// ---------------------------------------------------------------------------

// Error tracking. `hadErrors` flips on any translation error and gates the
// CI exit code. Article counters let the exit logic tolerate a small share
// of article-translation failures (typically transient Anthropic capacity
// errors) instead of blocking the deploy for everything else that succeeded.
let hadErrors = false;
let articlesAttempted = 0;
let articlesFailed = 0;

// Maximum share of attempted articles that may fail before the script still
// exits 0. Above this, partial output is rejected and the workflow fails.
const ARTICLE_FAILURE_TOLERANCE = 0.25;

const args = process.argv.slice(2);

const langIdx = args.indexOf('--lang');
const lang = langIdx !== -1 ? args[langIdx + 1] : null;

const flagAll           = args.includes('--all');
const flagIncremental   = args.includes('--incremental');
const flagSync          = args.includes('--sync');
const flagBatch         = args.includes('--batch');
const flagDryRun        = args.includes('--dry-run');
const flagApiSpecs      = args.includes('--api-specs');
const flagSidebarsOnly  = args.includes('--sidebars');
const flagReusables     = args.includes('--reusables');
const flagMigrateHashes = args.includes('--migrate-hashes');

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
const onlyReusableIds = onlyFilePaths
  ? new Set(onlyFilePaths.filter(p => p.startsWith('src/components/reusable/') && /\.mdx?$/.test(p)).map(p => path.basename(p).replace(/\.mdx?$/, '')))
  : null;

// Targeted operations require an explicit --lang
if ((flagResume || fileId || fileIds || sidebarName || platform) && !lang) {
  console.error('[translate] --lang <code> is required when using --resume, --file, --ids, --sidebar, or --platform');
  process.exit(1);
}

// --batch overrides the default sync routing for incremental/file/ids modes.
// Without --batch: existing behavior (sync for incremental, batch for --all/--platform).
// With --batch: route incremental through the new per-section batch path.
const syncMode = !flagBatch && (fileId != null || fileIds != null || flagIncremental || flagSync);

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

CRITICAL — ESM imports/exports:
Reproduce every \`import\` and \`export\` line byte-for-byte: same count, same order, same paths, no modifications. Do not drop imports that look unused or auto-registered — the build needs them. Preserve the blank line separating the import block from the prose; MDX requires it.

PRESERVE exactly (never translate):
- code blocks (fenced \`\`\` blocks) — content, language tag, and title attribute
- inline code (\`...\`)
- component tag names and attribute NAMES (only translate attribute VALUES when they are human-readable phrases)
- URLs in markdown links — translate the display text only, keep the href unchanged
- platform and product names: iOS, Android, React Native, Flutter, Unity, Kotlin Multiplatform, Capacitor, Adapty
- Adapty dashboard UI element names: the dashboard is English-only, so keep these exactly as written. They typically appear **bold** in text and refer to dashboard navigation — menu items, sidebar sections, page names, and button labels (e.g. **Paywalls**, **A/B tests**, **App settings**, **Add product**, **Save**). Do not confuse these with documentation section headings or sidebar titles, which should be translated normally.
- heading anchor IDs written as \\{#my-anchor\\} — keep them exactly as written including the backslash escapes
- link hrefs and URL fragments — in [text](url#fragment), translate only the display text; href and fragment stay byte-for-byte identical
- JSX tag balance: every \`<Tag>\` opening must have exactly one matching \`</Tag>\` closing in the input — output the same number of opens and closes. Do not invent extra closing tags to "fix" what looks unbalanced; the input is balanced when read whole.

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
  - label= in <TabItem> when it is a human-readable phrase — translate it (e.g. label="Before v.2.x" → label="До v.2.x", label="With fallback" → label="С фолбэком"). Keep platform names unchanged: "iOS", "Android", "React Native", "Flutter", "Unity", "Kotlin Multiplatform", "Capacitor".
  - tooltip= in <InlineTooltip> — this is the visible trigger term shown inline to the reader; always translate it (e.g. tooltip="placement" → tooltip="плейсмент", tooltip="variant" → tooltip="вариант"). Apply glossary terms where they exist.
  - children of <InlineTooltip> — the popup explanation text rendered in the slot; translate it as regular prose, including any markdown links inside it (translate link display text, keep hrefs unchanged).

TRANSLATION STYLE — write natural, idiomatic ${targetLanguage}:
- Prefer colloquial, conversational word choices over literal or formal ones where both are correct.
- Prefer concise phrasing. Drop qualifiers that are obvious from context.
- Prefer direct, demonstrative constructions over indirect ones when introducing content.
- Prefer everyday vocabulary over technical loan words when a natural equivalent exists.
- Do not translate mechanically word-for-word. Read the full sentence for meaning, then write it as a native speaker would naturally say it.

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
      .map(([en, t]) => {
        const note = t._note ? `\n  Context: ${t._note}` : '';
        return `- ${en} → ${t[lang]}${note}`;
      });
    if (lines.length === 0) return '';
    return `\nGLOSSARY — use these exact translations for product-specific terms (do not improvise). The "Context" note describes how the term is used at Adapty; treat it as background, not as text to translate:\n${lines.join('\n')}`;
  } catch {
    return ''; // dictionary not found → proceed without glossary
  }
}

// ---------------------------------------------------------------------------
// Prompt caching helper
// ---------------------------------------------------------------------------

// Wrap a system prompt string in the structured form Anthropic expects for
// prompt caching. The system prompt + glossary is identical across every
// section/file within a single language run, so caching it as ephemeral
// turns ~600 redundant copies per locale into 1 cache write + N reads
// (read = 10% of base input price, write = 125%, 5-min TTL refreshed on hit).
function cachedSystem(text) {
  return [{ type: 'text', text, cache_control: { type: 'ephemeral' } }];
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey && !flagDryRun) {
    if (flagIncremental) {
      console.error('[translate] No ANTHROPIC_API_KEY set — cannot run incremental translation.');
      process.exit(1);
    }
    console.error('[translate] ANTHROPIC_API_KEY environment variable is required.');
    process.exit(1);
  }

  const client = apiKey ? new Anthropic({ apiKey }) : null;

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

  if (flagMigrateHashes) {
    if (!lang) { console.error('[migrate-hashes] --lang is required'); process.exit(1); }
    const hashesDir = path.resolve(LOCALES_BASE, lang, '.hashes');
    await migrateHashes(hashesDir);
    return;
  }

  // --only-files: fast exit if the diff contains nothing translatable
  if (onlyFilePaths && onlyDocIds.size === 0 && onlySidebarNames.size === 0 && onlySpecIds.size === 0 && onlyReusableIds.size === 0) {
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
      // Translate reusable snippets when doing a full run or an explicit --reusables run.
      // Skip for targeted runs (--file / --ids / --sidebar / --sidebars) to avoid
      // translating all 60+ snippets when only one article is requested.
      // To translate reusables in isolation: --reusables [--lang xx]
      if (!sidebarName && !flagSidebarsOnly && !fileId && !fileIds && !platform || flagReusables) {
        await translateReusableForLang(client, currentLang, localesDir, hashesDir, systemPrompt, tag, onlyReusableIds);
      }

      // --sidebar / --sidebars target sidebar labels only; skip article translation
      if (!sidebarName && !flagSidebarsOnly) {
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

  if (hadErrors) {
    // Tolerate isolated article-translation failures below the threshold.
    // These are typically transient Anthropic capacity errors that resolve
    // on the next run. The failed files keep their previous on-disk state
    // (or stay untranslated if new) and will be retried automatically when
    // the English source next changes. Non-article failures (sidebars,
    // reusables, API specs) always exit non-zero — they're rare and usually
    // indicate a real bug, not transient load.
    const failurePct = articlesAttempted > 0 ? articlesFailed / articlesAttempted : 1;
    if (articlesFailed === 0 || failurePct >= ARTICLE_FAILURE_TOLERANCE) {
      process.exit(1);
    }
    console.warn(
      `\n[translate] WARNING: ${articlesFailed} of ${articlesAttempted} article(s) ` +
      `failed translation (${(failurePct * 100).toFixed(1)}% — below ` +
      `${(ARTICLE_FAILURE_TOLERANCE * 100).toFixed(0)}% threshold). ` +
      `Continuing with partial output; the failed files will be retried on the next run.\n`
    );
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

  // In incremental mode, skip articles that aren't in any sidebar — they are
  // orphaned pages (API reference stubs, legacy content) that don't need translation.
  if (flagIncremental && !fileId && !fileIds && !platform) {
    const sidebarIds = await getAllSidebarIds();
    files = files.filter(f => sidebarIds.has(path.basename(f, '.mdx')));
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
  const toSeed      = [];   // unchanged files that have no section cache yet
  for (const file of files) {
    const basename = path.basename(file, '.mdx');
    const translatedPath = path.join(localesDir, `${basename}.mdx`);

    if (flagIncremental) {
      const currentHash = await fileHash(file);
      const storedHash  = await getStoredHash(basename, hashesDir);
      if (storedHash === currentHash) {
        // File unchanged — but check if section cache is missing (so we can seed it now
        // without Claude rather than waiting for the next real change to trigger 20+ Claude calls).
        const hashFilePath = path.join(hashesDir, `${basename}.json`);
        let cachedData = null;
        try { cachedData = JSON.parse(await fs.readFile(hashFilePath, 'utf-8')); } catch { /* ok */ }
        if (!cachedData?.sections) toSeed.push(file);
        continue;
      }

      if (!storedHash) {
        // No hash file — check whether a translation already exists.
        // This happens when .hashes was deleted or the GH Action cache was cold.
        // Write the current hash and queue for section seeding so the next snippet
        // change doesn't trigger a full retranslation.
        //
        // Exception: if the file is explicitly in --only-files (git-diff mode), it
        // changed in this commit, so trust that signal and translate it even without
        // a stored hash to compare against.
        const explicitlyChanged = onlyDocIds?.has(basename);
        if (!explicitlyChanged) {
          try {
            await fs.access(translatedPath);
            await fs.mkdir(hashesDir, { recursive: true });
            await fs.writeFile(
              path.join(hashesDir, `${basename}.json`),
              JSON.stringify({ fileHash: currentHash }),
              'utf-8'
            );
            toSeed.push(file);
            continue; // already translated — record hash + queue section seeding
          } catch { /* no translation exists → fall through and translate */ }
        }
      }

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

  // Seed section caches for up-to-date files that have no section-level cache.
  // This runs synchronously before translation so that subsequent incremental runs
  // on any of these files can use patchCodeBlocks instead of retranslating everything.
  if (toSeed.length > 0 && flagIncremental && syncMode) {
    for (const file of toSeed) {
      try {
        await seedSectionCache(file, localesDir, hashesDir, lang);
      } catch { /* seeding is best-effort — don't abort the run */ }
    }
  }

  if (toTranslate.length === 0) {
    console.log(`${tag} Nothing to translate — all articles are up to date.`);
    return;
  }

  console.log(`${tag} ${toTranslate.length} article(s) to translate.`);
  articlesAttempted += toTranslate.length;

  if (syncMode) {
    await translateSync(client, toTranslate, systemPrompt, localesDir, hashesDir, tag, lang);
  } else if (flagBatch && flagIncremental) {
    await translateBatchSections(client, toTranslate, systemPrompt, localesDir, hashesDir, tag, lang);
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
          // Auto-switch to section mode for large files to avoid max_tokens truncation
          if (content.length > 20000) {
            await translateFileWithSections(client, file, systemPrompt, localesDir, hashesDir, lang);
          } else {
            const response = await client.messages.create({
              model: 'claude-sonnet-4-6',
              max_tokens: 16000,
              system: cachedSystem(systemPrompt),
              messages: [{ role: 'user', content }],
            });
            if (response.stop_reason === 'max_tokens') {
              throw new Error(`output truncated at max_tokens limit — increase max_tokens or split the file`);
            }
            const translatedContent = response.content[0].text;
            await writeTranslation(basename, translatedContent, file, localesDir, hashesDir, lang);
            console.log(`  ✓ ${basename}`);
          }
        }
        translated++;
      } catch (err) {
        console.error(`  ✗ ${basename}: ${err.message}`);
        errors++;
        hadErrors = true;
        articlesFailed++;
      }
    }
  }

  await Promise.all(Array.from({ length: SYNC_CONCURRENCY }, () => worker()));
  console.log(`\n${tag} Done: ${translated} translated, ${errors} errors.`);
}

// ---------------------------------------------------------------------------
// Section cache seeding (no Claude — heading + para chunk sections)
// ---------------------------------------------------------------------------

/**
 * Given an en heading-section content and its zh translation, split both into
 * paragraph-chunk pairs using the same raw-block split + greedy 600-char grouping
 * that splitByParagraphBlocks uses.
 *
 * En and zh share the same blank-line paragraph structure (same number of raw
 * blocks), so we can match blocks by index and group zh blocks according to en
 * chunk boundaries — producing one zh chunk per en para chunk.
 *
 * Returns an array of { en, zh } content pairs, or null if:
 *   - fewer than 2 chunks (no para split needed), OR
 *   - en and zh have different raw-block counts (structure diverged in translation)
 */
function mapParaChunksToZh(enContent, zhContent) {
  // Collect raw blocks (blank-line-separated, code fences kept intact) — same
  // logic as splitByParagraphBlocks so the resulting chunks are identical.
  function getRawBlocks(text) {
    const lines = text.split('\n');
    const blocks = [];
    let start = 0;
    let codeBlockFence = null;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const fenceMatch = line.match(/^(`{3,}|~{3,})/);
      if (fenceMatch) {
        if (codeBlockFence === null) codeBlockFence = fenceMatch[1][0];
        else if (line[0] === codeBlockFence) codeBlockFence = null;
      }
      if (codeBlockFence === null && line.trim() === '' && i > start) {
        const block = lines.slice(start, i + 1).join('\n');
        if (block.trim()) blocks.push(block);
        start = i + 1;
      }
    }
    const tail = lines.slice(start).join('\n');
    if (tail.trim()) blocks.push(tail);
    return blocks;
  }

  const enRaw = getRawBlocks(enContent);
  const zhRaw = getRawBlocks(zhContent);
  if (enRaw.length !== zhRaw.length) return null; // structure diverged — skip

  // Greedy grouping: accumulate raw blocks until adding the next would exceed
  // PARAGRAPH_FALLBACK_CHARS (based on en length). Apply identical index grouping
  // to zh so each zh chunk corresponds to the same blocks as the en chunk.
  const pairs = [];
  let enCur = '', zhCur = '';
  for (let i = 0; i < enRaw.length; i++) {
    const enCand = enCur ? `${enCur}\n${enRaw[i]}` : enRaw[i];
    const zhCand = zhCur ? `${zhCur}\n${zhRaw[i]}` : zhRaw[i];
    if (enCur && enCand.length > PARAGRAPH_FALLBACK_CHARS) {
      pairs.push({ en: enCur, zh: zhCur });
      enCur = enRaw[i]; zhCur = zhRaw[i];
    } else {
      enCur = enCand; zhCur = zhCand;
    }
  }
  if (enCur) pairs.push({ en: enCur, zh: zhCur });

  return pairs.length > 1 ? pairs : null;
}

/**
 * Build a single section cache entry from an en content + its existing zh translation.
 * If en and zh have the same code blocks, stores the current en hash (cache hit on next
 * unchanged run). If code differs (snippet changed since last translation), stores the
 * zh content hash as a sentinel so the next run triggers patchCodeBlocks instead of Claude.
 */
function makeSeedEntry(enContent, zhContent) {
  const cH = 'sha256:' + crypto.createHash('sha256').update(enContent).digest('hex');
  const pH = 'sha256:' + crypto.createHash('sha256').update(stripCodeBlocks(enContent)).digest('hex');
  const enCode = extractCodeBlocks(enContent);
  const zhCode = extractCodeBlocks(zhContent);
  const codeUnchanged = enCode.length === zhCode.length && enCode.every((b, j) => b === zhCode[j]);
  return {
    contentHash: codeUnchanged ? cH : 'sha256:' + crypto.createHash('sha256').update(zhContent).digest('hex'),
    proseHash: pH,
    translation: zhContent,
  };
}

/**
 * Builds a section-level hash cache for a file that already has a zh translation
 * but no section cache, without calling Claude.
 *
 * Heading sections: matched by position between en and zh heading splits.
 * Para chunks: matched by applying the same raw-block index grouping to the zh
 *   heading section content. If en and zh have different block counts (rare —
 *   translator restructured paragraphs), that heading section's para chunks are
 *   skipped safely (they'll be translated by Claude on first change).
 *
 * After this runs, both heading sections AND para chunks are cached. Subsequent
 * snippet-only changes trigger patchCodeBlocks with zero Claude calls.
 */
async function seedSectionCache(file, localesDir, hashesDir, lang) {
  const basename = path.basename(file, '.mdx');
  const content = await fs.readFile(file, 'utf-8');
  const translatedPath = path.join(localesDir, `${basename}.mdx`);

  let existingTranslation;
  try {
    existingTranslation = await fs.readFile(translatedPath, 'utf-8');
  } catch {
    return; // no zh file to seed from
  }

  const sections = deduplicateSectionIds(splitIntoSections(content));

  const engHeadSecs = splitIntoSections(content, { paragraphFallback: false });
  const zhHeadSecs  = splitIntoSections(existingTranslation, { paragraphFallback: false });
  if (engHeadSecs.length !== zhHeadSecs.length) {
    console.warn(`  ⚠ ${basename}: seed skipped — heading count mismatch (en=${engHeadSecs.length}, locale=${zhHeadSecs.length}); next edit will retranslate the whole file`);
    return;
  }

  // Map: (deduplicated) heading section ID → zh heading section content.
  // deduplicateSectionIds is applied to engHeadSecs so the IDs match what
  // translateFileWithSections stores in the cache.
  const dedupEngHead = deduplicateSectionIds(engHeadSecs);
  const dedupZhHead  = deduplicateSectionIds(zhHeadSecs);
  const zhByHeadId   = new Map(dedupEngHead.map((s, i) => [s.id, dedupZhHead[i].content]));

  // Build: (deduplicated) heading ID → zh para-chunk array (or null if no split needed)
  const paraChunksByHeadId = new Map();
  const paraSkipReasons = [];
  for (const s of dedupEngHead) {
    const zhHead = zhByHeadId.get(s.id);
    if (!zhHead) continue;
    const pairs = mapParaChunksToZh(s.content, zhHead);
    if (pairs) {
      paraChunksByHeadId.set(s.id, pairs);
    } else if (s.content.length > PARAGRAPH_FALLBACK_CHARS) {
      // Only report sections that would actually be split into para chunks — short
      // sections never have para chunks, so "no pairs" is expected and not a problem.
      paraSkipReasons.push(s.id);
    }
  }
  if (paraSkipReasons.length > 0) {
    console.warn(`  ⚠ ${basename}: seed skipped para-chunks for ${paraSkipReasons.length} heading section(s) [${paraSkipReasons.slice(0, 3).join(', ')}${paraSkipReasons.length > 3 ? ', …' : ''}] — en/locale block-count mismatch; next prose edit in those sections will retranslate them whole`);
  }

  const seeded = {};

  for (const s of sections) {
    const isParaChunk = /-p[0-9a-f]{8}$/.test(s.id);

    if (!isParaChunk) {
      const zhContent = zhByHeadId.get(s.id);
      if (zhContent) seeded[s.id] = makeSeedEntry(s.content, zhContent);
      continue;
    }

    const headId = s.id.replace(/-p[0-9a-f]{8}$/, '');
    const pairs = paraChunksByHeadId.get(headId);
    if (!pairs) continue;

    const pair = pairs.find(p => p.en === s.content);
    if (pair) seeded[s.id] = makeSeedEntry(pair.en, pair.zh);
  }

  if (Object.keys(seeded).length === 0) return;

  const headingCount = Object.keys(seeded).filter(id => !/-p[0-9a-f]{8}$/.test(id)).length;
  const paraCount    = Object.keys(seeded).length - headingCount;

  const currentHash = await fileHash(file);
  const hashFile = path.join(hashesDir, `${basename}.json`);
  await fs.mkdir(hashesDir, { recursive: true });
  await fs.writeFile(hashFile, JSON.stringify({ fileHash: currentHash, sections: seeded }), 'utf-8');
  console.log(`  ⟳ ${basename}: seeded ${headingCount} heading + ${paraCount} para-chunk sections`);
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
    // Detect stale section caches that need re-seeding:
    // Only clear when old positional paragraph IDs are present ("h2-foo-p1" → replaced by
    // content-hash IDs "h2-foo-pa3f7c1b2"). Heading-only caches (no para chunk IDs) are
    // intentionally preserved: seeding populates heading sections, para chunks get their cache
    // entries on the first Claude run, and the lookup naturally misses for uncached para chunks
    // without needing an explicit stale invalidation.
    if (storedData?.sections) {
      const cacheIds = Object.keys(storedData.sections);
      const hasOldPositionalIds = cacheIds.some(id => /-p\d+$/.test(id));
      if (hasOldPositionalIds) {
        storedData = { fileHash: storedData.fileHash };
      }
    }
  } catch { /* no cache */ }

  // Seed section cache from existing translation when no section-level cache exists.
  // Covers files translated via batch (which stores only fileHash, no sections),
  // and the post-migration run where the cache was discarded due to stale IDs.
  //
  // Para chunks are only seeded when the file hash is unchanged (cold cache recovery).
  // When the file has changed (we are in toTranslate), para chunks are intentionally
  // NOT seeded: seeding stores the current English hash as contentHash, which would
  // make prose-changed paragraphs look like cache hits, causing the zh to go stale.
  // Heading sections are always safe to seed (they are structural, never sent to Claude).
  const fileHashChanged = storedData?.fileHash && storedData.fileHash !== (await fileHash(file));
  if (!storedData?.sections) {
    const translatedPath = path.join(localesDir, `${basename}.mdx`);
    try {
      const existingTranslation = await fs.readFile(translatedPath, 'utf-8');

      const engHeadSecs = deduplicateSectionIds(splitIntoSections(content, { paragraphFallback: false }));
      const zhHeadSecs  = deduplicateSectionIds(splitIntoSections(existingTranslation, { paragraphFallback: false }));

      if (engHeadSecs.length !== zhHeadSecs.length) {
        console.warn(`  ⚠ ${basename}: inline seed skipped — heading count mismatch (en=${engHeadSecs.length}, locale=${zhHeadSecs.length}); all uncached sections will be retranslated`);
      } else {
        const zhByHeadId       = new Map(engHeadSecs.map((s, i) => [s.id, zhHeadSecs[i].content]));
        const paraChunksByHead = new Map();
        const paraSkipReasons  = [];
        for (const s of engHeadSecs) {
          const zhHead = zhByHeadId.get(s.id);
          if (!zhHead) continue;
          const pairs = mapParaChunksToZh(s.content, zhHead);
          if (pairs) {
            paraChunksByHead.set(s.id, pairs);
          } else if (s.content.length > PARAGRAPH_FALLBACK_CHARS) {
            // Only report sections that would actually be split — short sections
            // have no para chunks, so returning null is expected and not a problem.
            paraSkipReasons.push(s.id);
          }
        }
        if (paraSkipReasons.length > 0 && !fileHashChanged) {
          console.warn(`  ⚠ ${basename}: inline seed skipped para-chunks for ${paraSkipReasons.length} heading section(s) [${paraSkipReasons.slice(0, 3).join(', ')}${paraSkipReasons.length > 3 ? ', …' : ''}] — en/locale block-count mismatch; any prose edit in those sections retranslates them whole`);
        }

        const seeded = {};
        for (const s of sections) {
          const isParaChunk = /-p[0-9a-f]{8}$/.test(s.id);
          if (!isParaChunk) {
            const zhContent = zhByHeadId.get(s.id);
            if (zhContent) seeded[s.id] = makeSeedEntry(s.content, zhContent);
          } else if (!fileHashChanged) {
            // Skip para chunk seeding when file changed — prose-changed chunks must go to Claude.
            const headId = s.id.replace(/-p[0-9a-f]{8}$/, '');
            const pairs  = paraChunksByHead.get(headId);
            if (!pairs) continue;
            const pair = pairs.find(p => p.en === s.content);
            if (pair) seeded[s.id] = makeSeedEntry(pair.en, pair.zh);
          }
        }

        if (Object.keys(seeded).length > 0) {
          storedData = { sections: seeded };
          console.log(`  ↺ ${basename}: seeded section cache from existing translation`);
        }
      }
    } catch { /* no existing translation — proceed normally */ }
  }

  const storedSections = storedData?.sections ?? {};
  const newSections = {};
  const translatedParts = [];
  let apiCallCount = 0;
  let patchCount = 0;

  for (const section of sections) {
    const contentHash = 'sha256:' + crypto.createHash('sha256').update(section.content).digest('hex');
    const proseHash = 'sha256:' + crypto.createHash('sha256').update(stripCodeBlocks(section.content)).digest('hex');

    const cached = storedSections[section.id];
    let translation;

    if (cached?.contentHash === contentHash) {
      // No change at all — use cached translation
      console.log(`    · ${section.id} → cache hit`);
      translation = cached.translation;
    } else if (cached?.proseHash === proseHash && cached?.translation) {
      // Only code blocks changed — patch existing translation without calling Claude
      console.log(`    · ${section.id} → patch (code changed)`);
      translation = patchCodeBlocks(cached.translation, extractCodeBlocks(section.content));
      patchCount++;
    } else {
      // Prose changed (or first translation) — call Claude
      const reason = !cached ? 'no cache' : `prose changed (cached=${cached.proseHash?.slice(0,12)}, current=${proseHash.slice(0,12)})`;
      console.log(`    · ${section.id} → claude (${reason})`);
      let response;
      try {
        response = await withRetry(() => client.messages.create({
          model: 'claude-sonnet-4-6',
          max_tokens: 8192,
          system: cachedSystem(systemPrompt),
          messages: [{ role: 'user', content: section.content }],
        }));
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

    newSections[section.id] = { contentHash, proseHash, translation };
    translatedParts.push(translation);
  }

  const reconstructed = lang ? postProcessTranslation(translatedParts.join('\n'), lang) : translatedParts.join('\n');
  await fs.mkdir(localesDir, { recursive: true });
  await fs.writeFile(path.join(localesDir, `${basename}.mdx`), reconstructed, 'utf-8');

  const fHash = await fileHash(file);
  await fs.mkdir(hashesDir, { recursive: true });
  await fs.writeFile(hashFile, JSON.stringify({ fileHash: fHash, sections: newSections }), 'utf-8');

  const cachedCount = sections.length - apiCallCount - patchCount;
  const parts = [];
  if (apiCallCount > 0) parts.push(`${apiCallCount} translated`);
  if (patchCount > 0) parts.push(`${patchCount} code-patched`);
  if (cachedCount > 0 && (apiCallCount > 0 || patchCount > 0)) parts.push(`${cachedCount} cached`);
  console.log(`  ✓ ${basename} (${parts.length ? parts.join(', ') : 'all cached'})`);
}

// ---------------------------------------------------------------------------
// Per-section batch path (translateBatchSections)
// ---------------------------------------------------------------------------

/**
 * Build an Anthropic Batch API-safe custom_id from a basename + section id.
 * The API constraint is ^[a-zA-Z0-9_-]{1,64}$; section IDs can be longer than
 * 64 chars and can contain / { } (esp. OpenAPI path keys), so we sanitize the
 * basename (truncate, replace unsafe chars) and append a stable 16-char SHA-256
 * prefix of the section id. Callers must keep their own custom_id → section
 * lookup map (from buildBatchRequest); the suffix isn't reversible.
 */
function customIdFor(basename, sectionId) {
  const safeBase = basename.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 40);
  const idHash = crypto.createHash('sha256').update(sectionId).digest('hex').slice(0, 16);
  return `${safeBase}_${idHash}`;
}

/**
 * Decide what to do with each section of a file:
 *   'hit'   — cached translation usable as-is
 *   'patch' — only code blocks differ; patchCodeBlocks locally
 *   'send'  — needs Claude (prose changed or no cache)
 *
 * Returns: { basename, sections, decisions, storedSections, fileHashCurrent }
 */
async function buildSectionPlan(file, lang, localesDir, hashesDir) {
  const basename = path.basename(file, '.mdx');
  const content = await fs.readFile(file, 'utf-8');
  const sections = deduplicateSectionIds(splitIntoSections(content));

  const hashFile = path.join(hashesDir, `${basename}.json`);
  let storedData = null;
  try {
    storedData = JSON.parse(await fs.readFile(hashFile, 'utf-8'));
    if (storedData?.sections) {
      const cacheIds = Object.keys(storedData.sections);
      if (cacheIds.some(id => /-p\d+$/.test(id))) {
        storedData = { fileHash: storedData.fileHash };
      }
    }
  } catch { /* no cache */ }

  const fileHashCurrent = await fileHash(file);
  const fileHashChanged = storedData?.fileHash && storedData.fileHash !== fileHashCurrent;

  // Seed from existing translation when no section cache exists.
  // Mirrors translateFileWithSections:711-762.
  if (!storedData?.sections) {
    const translatedPath = path.join(localesDir, `${basename}.mdx`);
    try {
      const existingTranslation = await fs.readFile(translatedPath, 'utf-8');
      const engHeadSecs = deduplicateSectionIds(splitIntoSections(content, { paragraphFallback: false }));
      const zhHeadSecs  = deduplicateSectionIds(splitIntoSections(existingTranslation, { paragraphFallback: false }));

      if (engHeadSecs.length === zhHeadSecs.length) {
        const zhByHeadId = new Map(engHeadSecs.map((s, i) => [s.id, zhHeadSecs[i].content]));
        const paraChunksByHead = new Map();
        for (const s of engHeadSecs) {
          const zhHead = zhByHeadId.get(s.id);
          if (!zhHead) continue;
          const pairs = mapParaChunksToZh(s.content, zhHead);
          if (pairs) paraChunksByHead.set(s.id, pairs);
        }
        const seeded = {};
        for (const s of sections) {
          const isParaChunk = /-p[0-9a-f]{8}$/.test(s.id);
          if (!isParaChunk) {
            const zhContent = zhByHeadId.get(s.id);
            if (zhContent) seeded[s.id] = makeSeedEntry(s.content, zhContent);
          } else if (!fileHashChanged) {
            const headId = s.id.replace(/-p[0-9a-f]{8}$/, '');
            const pairs  = paraChunksByHead.get(headId);
            if (!pairs) continue;
            const pair = pairs.find(p => p.en === s.content);
            if (pair) seeded[s.id] = makeSeedEntry(pair.en, pair.zh);
          }
        }
        if (Object.keys(seeded).length > 0) {
          storedData = { sections: seeded };
        }
      } else {
        console.warn(`  ⚠ ${basename}: inline seed skipped — heading count mismatch (en=${engHeadSecs.length}, locale=${zhHeadSecs.length}); all uncached sections will be retranslated`);
      }
    } catch { /* no existing translation — falls through */ }
  }

  const storedSections = storedData?.sections ?? {};
  const decisions = [];

  for (const section of sections) {
    const contentHash = 'sha256:' + crypto.createHash('sha256').update(section.content).digest('hex');
    const proseHash   = 'sha256:' + crypto.createHash('sha256').update(stripCodeBlocks(section.content)).digest('hex');
    const cached = storedSections[section.id];

    if (cached?.contentHash === contentHash) {
      decisions.push({ section, kind: 'hit', contentHash, proseHash, cachedTranslation: cached.translation });
    } else if (cached?.proseHash === proseHash && cached?.translation) {
      const patched = patchCodeBlocks(cached.translation, extractCodeBlocks(section.content));
      decisions.push({ section, kind: 'patch', contentHash, proseHash, cachedTranslation: patched });
    } else {
      decisions.push({ section, kind: 'send', contentHash, proseHash });
    }
  }

  return { basename, sections, decisions, storedSections, fileHashCurrent };
}

/**
 * Per-section batch translation.
 * custom_id format: "<basename>::<sectionId>"
 *
 * On any errored entry, the affected file is left unwritten and its
 * .hashes/<basename>.json untouched — so the next push retries that file.
 * Other files in the same run still complete normally.
 */
async function translateBatchSections(client, files, systemPrompt, localesDir, hashesDir, tag, lang) {
  // Phase 1: build plans (no API calls)
  console.log(`${tag} Building section plans for ${files.length} file(s)...`);
  const plans = [];
  for (const file of files) {
    try {
      plans.push(await buildSectionPlan(file, lang, localesDir, hashesDir));
    } catch (err) {
      console.error(`  ✗ ${path.basename(file, '.mdx')}: plan failed: ${err.message}`);
      hadErrors = true;
    }
  }

  // Phase 2: collect batch entries
  const allEntries = [];
  const customIdLookup = {}; // custom_id → { basename, sectionId }
  for (const plan of plans) {
    for (const decision of plan.decisions) {
      if (decision.kind !== 'send') continue;
      const customId = customIdFor(plan.basename, decision.section.id);
      customIdLookup[customId] = { basename: plan.basename, sectionId: decision.section.id };
      allEntries.push({
        custom_id: customId,
        params: {
          model: 'claude-sonnet-4-6',
          max_tokens: 8192,
          system: cachedSystem(systemPrompt),
          messages: [{ role: 'user', content: decision.section.content }],
        },
      });
    }
  }

  const stats = plans.reduce((acc, p) => {
    for (const d of p.decisions) acc[d.kind]++;
    return acc;
  }, { hit: 0, patch: 0, send: 0 });
  console.log(`${tag} Sections: ${stats.hit} cached, ${stats.patch} code-patch, ${stats.send} to translate.`);

  if (flagDryRun) {
    console.log(`${tag} Dry run — not submitting. Batch entries that would be sent:`);
    for (const e of allEntries) {
      const meta = customIdLookup[e.custom_id];
      console.log(`  ${meta.basename}::${meta.sectionId}  (custom_id: ${e.custom_id})`);
    }
    return;
  }

  // Phase 3: submit and wait
  let translationsByCustomId = {};
  if (allEntries.length > 0) {
    console.log(`${tag} Submitting batch of ${allEntries.length} section(s)...`);
    const batch = await client.messages.batches.create({
      requests: allEntries.map(e => ({ custom_id: e.custom_id, params: e.params })),
    });
    console.log(`${tag} Batch submitted: ${batch.id}`);

    const startedAt = Date.now();
    let current = await client.messages.batches.retrieve(batch.id);
    const warnAfterMin = Math.min(60, 15 + Math.ceil(allEntries.length * 0.1));
    while (current.processing_status !== 'ended') {
      const counts = current.request_counts ?? {};
      const elapsedMin = Math.floor((Date.now() - startedAt) / 60000);
      const elapsed = elapsedMin >= 1 ? ` (${elapsedMin}m elapsed)` : '';
      const warning = elapsedMin >= warnAfterMin && (counts.succeeded ?? 0) === 0
        ? ` ⚠️  no progress in ${warnAfterMin}m`
        : '';
      console.log(
        `  Status: ${current.processing_status} — succeeded: ${counts.succeeded ?? '?'}, ` +
        `errored: ${counts.errored ?? '?'}${elapsed}${warning}`
      );
      await sleep(30_000);
      current = await client.messages.batches.retrieve(batch.id);
    }

    console.log(`${tag} Batch complete. Retrieving results...`);
    const results = await client.messages.batches.results(batch.id);
    for await (const r of results) {
      if (r.result.type === 'succeeded') {
        if (r.result.message.stop_reason === 'max_tokens') {
          const meta = customIdLookup[r.custom_id];
          console.error(`  ✗ ${meta?.basename}::${meta?.sectionId} (${r.custom_id}): output truncated at max_tokens`);
          hadErrors = true;
          continue;
        }
        translationsByCustomId[r.custom_id] = r.result.message.content[0].text;
      } else {
        console.error(`  ✗ ${customIdLookup[r.custom_id]?.basename}::${customIdLookup[r.custom_id]?.sectionId} (${r.custom_id}): ${JSON.stringify(r.result)}`);
        hadErrors = true;
      }
    }
  }

  // Phase 4: reconstruct files
  let written = 0;
  for (const plan of plans) {
    const newSections = {};
    const parts = [];
    let allOk = true;
    const allHits = plan.decisions.every(d => d.kind === 'hit');

    for (const decision of plan.decisions) {
      let translation;
      if (decision.kind === 'hit' || decision.kind === 'patch') {
        translation = decision.cachedTranslation;
      } else {
        const customId = customIdFor(plan.basename, decision.section.id);
        translation = translationsByCustomId[customId];
        if (!translation) { allOk = false; break; }
      }
      newSections[decision.section.id] = {
        contentHash: decision.contentHash,
        proseHash: decision.proseHash,
        translation,
      };
      parts.push(translation);
    }

    if (!allOk) {
      console.error(`  ✗ ${plan.basename}: some sections failed — file left unwritten`);
      articlesFailed++;
      continue;
    }

    const reconstructed = lang ? postProcessTranslation(parts.join('\n'), lang) : parts.join('\n');
    await fs.mkdir(localesDir, { recursive: true });
    // Invariant: .hashes/<basename>.json and locales/.../<basename>.mdx must never
    // disagree on which sections are translated. Skip both writes when every section
    // was a cache hit — the on-disk state is already correct.
    if (!allHits) {
      await fs.writeFile(path.join(localesDir, `${plan.basename}.mdx`), reconstructed, 'utf-8');

      await fs.mkdir(hashesDir, { recursive: true });
      await fs.writeFile(
        path.join(hashesDir, `${plan.basename}.json`),
        JSON.stringify({ fileHash: plan.fileHashCurrent, sections: newSections }),
        'utf-8'
      );
      written++;
      console.log(`  ✓ ${plan.basename}`);
    } else {
      console.log(`  · ${plan.basename} (all cached, no write)`);
    }
  }

  console.log(`${tag} Done: ${written} file(s) written.`);
}

// ---------------------------------------------------------------------------
// Batch translation (default, --all, --platform)
// ---------------------------------------------------------------------------

// Max files per batch chunk — smaller chunks complete faster and give intermediate progress.
const BATCH_CHUNK_SIZE = 40;

async function translateBatch(client, files, systemPrompt, localesDir, tag, lang) {
  const hashesDir = path.join(localesDir, '.hashes');

  // Large files can't be translated reliably in a single batch request —
  // route them to section-based sync translation instead.
  const largeFiles = [];
  const batchFiles = [];
  for (const file of files) {
    const stat = await fs.stat(file);
    if (stat.size > 20000) largeFiles.push(file);
    else batchFiles.push(file);
  }

  if (largeFiles.length > 0) {
    console.log(`${tag} ${largeFiles.length} large file(s) will be translated section-by-section (sync):`);
    for (const file of largeFiles) {
      const basename = path.basename(file, '.mdx');
      try {
        await translateFileWithSections(client, file, systemPrompt, localesDir, hashesDir, lang);
        console.log(`  ✓ ${basename}`);
      } catch (err) {
        console.error(`  ✗ ${basename}: ${err.message}`);
      }
    }
  }

  if (batchFiles.length === 0) return;

  // Split into chunks so large platforms don't sit in one huge queue entry.
  const chunks = [];
  for (let i = 0; i < batchFiles.length; i += BATCH_CHUNK_SIZE) {
    chunks.push(batchFiles.slice(i, i + BATCH_CHUNK_SIZE));
  }

  for (let c = 0; c < chunks.length; c++) {
    const chunk = chunks[c];
    const chunkLabel = chunks.length > 1 ? ` (chunk ${c + 1}/${chunks.length})` : '';

    console.log(`${tag} Reading source files${chunkLabel}...`);
    const requests = await Promise.all(
      chunk.map(async (file) => {
        const basename = path.basename(file, '.mdx');
        const content = await fs.readFile(file, 'utf-8');
        return {
          custom_id: basename,
          params: {
            model: 'claude-sonnet-4-6',
            max_tokens: 8192,
            system: cachedSystem(systemPrompt),
            messages: [{ role: 'user', content }],
          },
        };
      })
    );

    console.log(`${tag} Submitting batch of ${requests.length} requests${chunkLabel}...`);
    const batch = await client.messages.batches.create({ requests });
    const batchId = batch.id;

    await fs.writeFile(BATCH_ID_FILE, batchId, 'utf-8');
    console.log(`${tag} Batch submitted: ${batchId}`);
    console.log(`${tag} Batch ID saved to .translate-batch-id`);
    console.log(`${tag} Use --resume <batchId> to retrieve results if this process is interrupted.`);

    const fileMap = Object.fromEntries(chunk.map(f => [path.basename(f, '.mdx'), f]));
    await waitAndRetrieve(client, batchId, fileMap, localesDir, tag, lang);
  }
}

async function waitAndRetrieve(client, batchId, fileMap, localesDir, tag, lang) {
  console.log(`${tag} Polling batch status every 30 seconds...`);

  const startedAt = Date.now();
  let batch = await client.messages.batches.retrieve(batchId);
  // Warn threshold: 15 min base + 30s per request, capped at 60 min.
  const requestCount = Object.keys(fileMap).length;
  const warnAfterMin = Math.min(60, 15 + Math.ceil(requestCount * 0.5));
  while (batch.processing_status !== 'ended') {
    const counts = batch.request_counts ?? {};
    const elapsedMin = Math.floor((Date.now() - startedAt) / 60000);
    const elapsed = elapsedMin >= 1 ? ` (${elapsedMin}m elapsed)` : '';
    const warning = elapsedMin >= warnAfterMin && (counts.succeeded ?? 0) === 0
      ? ` ⚠️  no progress in ${warnAfterMin}m — API may be slow or use --sync to bypass batch`
      : '';
    console.log(
      `  Status: ${batch.processing_status} — processing: ${counts.processing ?? '?'}, ` +
      `succeeded: ${counts.succeeded ?? '?'}, errored: ${counts.errored ?? '?'}${elapsed}${warning}`
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

  // Also load reusable sources for batches that contain "reusable_*" custom IDs.
  const reusableLocalesDir = path.join(localesDir, 'reusable');
  const reusableHashesDir  = path.join(hashesDir, 'reusable');
  const reusableMap = {};
  try {
    const entries = await fs.readdir(REUSABLE_DIR, { withFileTypes: true });
    for (const e of entries) {
      if (!e.isFile() || !/\.mdx?$/.test(e.name)) continue;
      const basename = e.name.replace(/\.mdx?$/, '');
      reusableMap[basename] = { name: e.name, full: path.join(REUSABLE_DIR, e.name), basename };
    }
  } catch { /* no reusable dir */ }

  console.log(`${tag} Retrieving results...`);
  let translated = 0;
  let errors = 0;

  const results = await client.messages.batches.results(batchId);
  for await (const result of results) {
    const customId = result.custom_id;
    const isReusable = customId.startsWith('reusable_');
    const label = customId;

    if (result.result.type === 'succeeded') {
      if (result.result.message.stop_reason === 'max_tokens') {
        console.error(`  ✗ ${label}: output truncated at max_tokens limit — increase max_tokens or split the file`);
        errors++;
        continue;
      }
      const text = result.result.message.content[0].text;

      if (isReusable) {
        const basename = customId.slice('reusable_'.length);
        const file = reusableMap[basename];
        await fs.mkdir(reusableLocalesDir, { recursive: true });
        if (file) {
          await fs.mkdir(reusableHashesDir, { recursive: true });
          await writeReusableResult(file, text, lang, reusableLocalesDir, reusableHashesDir);
        } else {
          // Source file gone — write as .md without hash (best-effort)
          await fs.writeFile(path.join(reusableLocalesDir, `${basename}.md`), postProcessTranslation(text, lang), 'utf-8');
        }
      } else {
        const sourceFile = fileMap[customId];
        if (sourceFile) {
          await writeTranslation(customId, text, sourceFile, localesDir, hashesDir, lang);
        } else {
          // Source file not found — write translation without hash
          await fs.mkdir(localesDir, { recursive: true });
          await fs.writeFile(path.join(localesDir, `${customId}.mdx`), postProcessTranslation(text, lang), 'utf-8');
        }
      }
      console.log(`  ✓ ${label}`);
      translated++;
    } else {
      console.error(`  ✗ ${label}: ${JSON.stringify(result.result)}`);
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
 * Merge all per-sidebar label caches into _sidebar-labels.json.
 * Starts from the EXISTING file so that sidebars whose cache has no labels yet
 * don't get wiped (safe for partial runs like --only-files).
 * Handles both new format { en, translation } and legacy format string values.
 */
async function rebuildSidebarLabels(sidebarFiles, sidebarHashesDir, localesDir) {
  // Preserve labels we can't rebuild (sidebars without label caches)
  let merged = {};
  try {
    merged = JSON.parse(await fs.readFile(path.join(localesDir, '_sidebar-labels.json'), 'utf-8'));
  } catch { /* file doesn't exist yet — start fresh */ }

  for (const file of sidebarFiles) {
    const name = path.basename(file, '.json');
    try {
      const data = JSON.parse(await fs.readFile(path.join(sidebarHashesDir, `${name}.json`), 'utf-8'));
      if (data.labels) {
        for (const [key, value] of Object.entries(data.labels)) {
          // Handle both new format { en, translation } and legacy format string
          const translation = typeof value === 'object' ? value.translation : value;
          if (translation) merged[key] = { value: translation };
        }
      }
    } catch { /* sidebar not yet translated — skip */ }
  }
  await fs.mkdir(localesDir, { recursive: true });
  await fs.writeFile(path.join(localesDir, '_sidebar-labels.json'), JSON.stringify(merged, null, 2), 'utf-8');
}

// ---------------------------------------------------------------------------
// Reusable snippet translation
// ---------------------------------------------------------------------------

async function writeReusableResult(file, text, lang, reusableLocalesDir, reusableHashesDir) {
  const translatedContent = postProcessTranslation(text, lang);
  await fs.writeFile(path.join(reusableLocalesDir, file.name), translatedContent, 'utf-8');
  const hash = await fileHash(file.full);
  await fs.writeFile(
    path.join(reusableHashesDir, `${file.basename}.json`),
    JSON.stringify({ fileHash: hash }),
    'utf-8',
  );
}

async function translateReusableForLang(client, lang, localesDir, hashesDir, systemPrompt, tag, onlyReusableIds = null) {
  const reusableLocalesDir = path.join(localesDir, 'reusable');
  const reusableHashesDir  = path.join(hashesDir, 'reusable');

  let entries;
  try {
    entries = await fs.readdir(REUSABLE_DIR, { withFileTypes: true });
  } catch {
    return; // reusable dir doesn't exist — nothing to do
  }

  let files = entries
    .filter(e => e.isFile() && /\.mdx?$/.test(e.name))
    .map(e => ({ name: e.name, full: path.join(REUSABLE_DIR, e.name), basename: e.name.replace(/\.mdx?$/, '') }));

  if (onlyReusableIds) {
    files = files.filter(f => onlyReusableIds.has(f.basename));
    if (files.length === 0) {
      console.log(`${tag} No matching reusable snippets from --only-files — skipping.`);
      return;
    }
  }

  const toTranslate = [];
  for (const file of files) {
    if (flagIncremental) {
      const currentHash = await fileHash(file.full);
      const storedHash  = await getStoredHash(file.basename, reusableHashesDir);
      if (storedHash === currentHash) continue;
      toTranslate.push(file);
    } else if (flagAll) {
      toTranslate.push(file);
    } else {
      try {
        await fs.access(path.join(reusableLocalesDir, file.name));
        // exists → skip
      } catch {
        toTranslate.push(file);
      }
    }
  }

  if (toTranslate.length === 0) {
    console.log(`${tag} Reusable snippets: all up to date.`);
    return;
  }

  console.log(`${tag} ${toTranslate.length} reusable snippet(s) to translate.`);
  await fs.mkdir(reusableLocalesDir, { recursive: true });
  await fs.mkdir(reusableHashesDir, { recursive: true });

  // Route to sync: explicit --sync, or files too large for a single batch request.
  const syncFiles = [];
  const batchList = [];
  for (const file of toTranslate) {
    if (flagSync) { syncFiles.push(file); continue; }
    const stat = await fs.stat(file.full);
    if (stat.size > 20000) syncFiles.push(file);
    else batchList.push(file);
  }

  let translated = 0;
  let errors = 0;

  for (const file of syncFiles) {
    try {
      const content = await fs.readFile(file.full, 'utf-8');
      const response = await client.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 4096,
        system: cachedSystem(systemPrompt),
        messages: [{ role: 'user', content }],
      });
      if (response.stop_reason === 'max_tokens') {
        throw new Error('output truncated at max_tokens limit');
      }
      await writeReusableResult(file, response.content[0].text, lang, reusableLocalesDir, reusableHashesDir);
      console.log(`  ✓ reusable:${file.name}`);
      translated++;
    } catch (err) {
      console.error(`  ✗ reusable:${file.name}: ${err.message}`);
      errors++;
      hadErrors = true;
    }
  }

  if (batchList.length === 0) {
    console.log(`${tag} Reusable: ${translated} translated, ${errors} errors.`);
    return;
  }

  const chunks = [];
  for (let i = 0; i < batchList.length; i += BATCH_CHUNK_SIZE) {
    chunks.push(batchList.slice(i, i + BATCH_CHUNK_SIZE));
  }

  for (let c = 0; c < chunks.length; c++) {
    const chunk = chunks[c];
    const chunkLabel = chunks.length > 1 ? ` (chunk ${c + 1}/${chunks.length})` : '';

    console.log(`${tag} Reading reusable sources${chunkLabel}...`);
    const requests = await Promise.all(
      chunk.map(async (file) => {
        const content = await fs.readFile(file.full, 'utf-8');
        return {
          custom_id: `reusable_${file.basename}`,
          params: {
            model: 'claude-sonnet-4-6',
            max_tokens: 4096,
            system: cachedSystem(systemPrompt),
            messages: [{ role: 'user', content }],
          },
        };
      })
    );

    console.log(`${tag} Submitting reusable batch of ${requests.length} requests${chunkLabel}...`);
    const batch = await client.messages.batches.create({ requests });
    const batchId = batch.id;

    await fs.writeFile(BATCH_ID_FILE, batchId, 'utf-8');
    console.log(`${tag} Batch submitted: ${batchId}`);
    console.log(`${tag} Batch ID saved to .translate-batch-id`);
    console.log(`${tag} Use --resume <batchId> to retrieve results if this process is interrupted.`);

    const fileMap = Object.fromEntries(chunk.map(f => [`reusable_${f.basename}`, f]));

    console.log(`${tag} Polling batch status every 30 seconds...`);
    const startedAt = Date.now();
    let b = await client.messages.batches.retrieve(batchId);
    const warnAfterMin = Math.min(60, 15 + Math.ceil(requests.length * 0.5));
    while (b.processing_status !== 'ended') {
      const counts = b.request_counts ?? {};
      const elapsedMin = Math.floor((Date.now() - startedAt) / 60000);
      const elapsed = elapsedMin >= 1 ? ` (${elapsedMin}m elapsed)` : '';
      const warning = elapsedMin >= warnAfterMin && (counts.succeeded ?? 0) === 0
        ? ` ⚠️  no progress in ${warnAfterMin}m — API may be slow or use --sync to bypass batch`
        : '';
      console.log(
        `  Status: ${b.processing_status} — processing: ${counts.processing ?? '?'}, ` +
        `succeeded: ${counts.succeeded ?? '?'}, errored: ${counts.errored ?? '?'}${elapsed}${warning}`
      );
      await sleep(30_000);
      b = await client.messages.batches.retrieve(batchId);
    }

    console.log(`${tag} Batch complete. Retrieving results...`);
    const results = await client.messages.batches.results(batchId);
    for await (const result of results) {
      const file = fileMap[result.custom_id];
      if (!file) {
        console.error(`  ✗ ${result.custom_id}: unknown custom_id`);
        errors++;
        hadErrors = true;
        continue;
      }
      if (result.result.type === 'succeeded') {
        if (result.result.message.stop_reason === 'max_tokens') {
          console.error(`  ✗ reusable:${file.name}: output truncated at max_tokens limit`);
          errors++;
          hadErrors = true;
          continue;
        }
        await writeReusableResult(file, result.result.message.content[0].text, lang, reusableLocalesDir, reusableHashesDir);
        console.log(`  ✓ reusable:${file.name}`);
        translated++;
      } else {
        console.error(`  ✗ reusable:${file.name}: ${JSON.stringify(result.result)}`);
        errors++;
        hadErrors = true;
      }
    }
  }

  console.log(`${tag} Reusable: ${translated} translated, ${errors} errors.`);
}

// ---------------------------------------------------------------------------
// Sidebar translation
// ---------------------------------------------------------------------------

async function translateSidebarsForLang(client, lang, localesDir, hashesDir, targetLanguage, glossary, tag, sidebarName = null, onlySidebarNames = null) {
  const sidebarHashesDir = path.join(hashesDir, 'sidebars');

  const entries = await fs.readdir(SIDEBARS_DIR, { withFileTypes: true });
  const allSidebarFiles = entries
    .filter(e => e.isFile() && e.name.endsWith('.json'))
    .map(e => path.join(SIDEBARS_DIR, e.name));

  // sidebarFiles = the subset to process; allSidebarFiles = always used for the final rebuild
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

  const systemPrompt =
    `You translate navigation labels for a technical documentation site from English to ${targetLanguage}. ` +
    `Return ONLY a valid JSON array of translated strings — one per input label, same order, same length. ` +
    `No explanations.${glossary}`;

  let anyUpdated = false;

  for (const file of sidebarFiles) {
    const name = path.basename(file, '.json');
    try {
      const raw = await fs.readFile(file, 'utf-8');
      const parsed = JSON.parse(raw);
      const labelEntries = collectLabelEntries(parsed);

      // Load existing per-label cache and migrate old format if needed
      let cachedLabels = {};
      let isOldFormat = false;
      try {
        const cachedData = JSON.parse(await fs.readFile(path.join(sidebarHashesDir, `${name}.json`), 'utf-8'));
        if (cachedData.labels) {
          const labelMap = Object.fromEntries(labelEntries.map(e => [e.key, e.label]));
          isOldFormat = Object.values(cachedData.labels).some(v => typeof v === 'string');

          if (isOldFormat) {
            // Old format { key: "translated" } — check file hash to decide how to migrate.
            // If the sidebar file hasn't changed since last translation, labels are still valid:
            //   → set en = current label so the diff sees "no change" and skips retranslation.
            // If the file changed, we can't know which specific labels changed:
            //   → set en = null to force retranslation of all labels this one time.
            let fileUnchanged = false;
            if (cachedData.fileHash) {
              fileUnchanged = (await fileHash(file)) === cachedData.fileHash;
            }
            if (!fileUnchanged) {
              console.log(`  ↺ sidebar:${name}: first incremental run after format migration — all labels retranslated once`);
            }
            for (const [key, val] of Object.entries(cachedData.labels)) {
              if (typeof val === 'string') {
                const en = fileUnchanged ? (labelMap[key] ?? '') : null;
                cachedLabels[key] = { en, translation: val };
              } else {
                cachedLabels[key] = val;
              }
            }
          } else {
            for (const [key, val] of Object.entries(cachedData.labels)) {
              cachedLabels[key] = val;
            }
          }
        }
      } catch { /* no cache — all labels need translation */ }

      if (labelEntries.length === 0) {
        await fs.mkdir(sidebarHashesDir, { recursive: true });
        await fs.writeFile(path.join(sidebarHashesDir, `${name}.json`), JSON.stringify({ labels: {} }), 'utf-8');
        console.log(`  ✓ sidebar:${name} (no labels)`);
        continue;
      }

      // Find labels that need translation: new keys or changed English text
      const toTranslateEntries = flagAll
        ? labelEntries
        : labelEntries.filter(e => {
            const cached = cachedLabels[e.key];
            return !cached || cached.en !== e.label;
          });

      if (toTranslateEntries.length === 0) {
        // Silently upgrade old-format cache to new format so future runs are incremental
        if (isOldFormat) {
          const currentKeys = new Set(labelEntries.map(e => e.key));
          for (const key of Object.keys(cachedLabels)) {
            if (!currentKeys.has(key)) delete cachedLabels[key];
          }
          await fs.mkdir(sidebarHashesDir, { recursive: true });
          await fs.writeFile(path.join(sidebarHashesDir, `${name}.json`), JSON.stringify({ labels: cachedLabels }), 'utf-8');
        }
        console.log(`  ✓ sidebar:${name} (up to date)`);
        continue;
      }

      // Translate only the changed/new labels
      const response = await client.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 4096,
        system: cachedSystem(systemPrompt),
        messages: [{ role: 'user', content: JSON.stringify(toTranslateEntries.map(e => e.label)) }],
      });
      if (response.stop_reason === 'max_tokens') {
        throw new Error(`sidebar label output truncated at max_tokens limit`);
      }

      // Strip optional markdown fences the model may wrap the JSON in
      let responseText = response.content[0].text.trim();
      responseText = responseText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');

      const translated = JSON.parse(responseText);
      if (!Array.isArray(translated) || translated.length !== toTranslateEntries.length) {
        throw new Error(`label count mismatch: expected ${toTranslateEntries.length}, got ${translated.length}`);
      }

      // Merge new translations into cached labels (preserving untouched ones)
      for (let i = 0; i < toTranslateEntries.length; i++) {
        const entry = toTranslateEntries[i];
        cachedLabels[entry.key] = { en: entry.label, translation: translated[i] };
      }

      // Remove stale keys that no longer exist in the sidebar
      const currentKeys = new Set(labelEntries.map(e => e.key));
      for (const key of Object.keys(cachedLabels)) {
        if (!currentKeys.has(key)) delete cachedLabels[key];
      }

      await fs.mkdir(sidebarHashesDir, { recursive: true });
      await fs.writeFile(
        path.join(sidebarHashesDir, `${name}.json`),
        JSON.stringify({ labels: cachedLabels }),
        'utf-8'
      );

      console.log(`  ✓ sidebar:${name} (${toTranslateEntries.length}/${labelEntries.length} label(s) translated)`);
      anyUpdated = true;
    } catch (err) {
      console.error(`  ✗ sidebar:${name}: ${err.message}`);
      hadErrors = true;
    }
  }

  if (!anyUpdated) {
    console.log(`${tag} Sidebars: all up to date.`);
  }

  // Rebuild _sidebar-labels.json from all cached sidebar translations
  await rebuildSidebarLabels(allSidebarFiles, sidebarHashesDir, localesDir);
}

// ---------------------------------------------------------------------------
// API spec translation
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Hash migration (--migrate-hashes)
// Recomputes stored contentHash values using the current algorithm (full section
// content) without re-translating anything. Run once after changing the hash algo.
// ---------------------------------------------------------------------------

async function migrateHashes(hashesDir) {
  const DOCS_DIR = path.resolve(__dirname, '../src/content/docs');
  let updated = 0;
  let skipped = 0;

  const hashFiles = (await fs.readdir(hashesDir).catch(() => [])).filter(f => f.endsWith('.json') && f !== '_sidebar-labels.json');

  for (const hashFileName of hashFiles) {
    const hashFilePath = path.join(hashesDir, hashFileName);
    const articleId = hashFileName.replace(/\.json$/, '');

    // Find the source file
    const sourceFiles = await collectMdxFiles(DOCS_DIR);
    const sourceFile = sourceFiles.find(f => path.basename(f, '.mdx') === articleId);
    if (!sourceFile) {
      skipped++;
      continue;
    }

    const storedData = JSON.parse(await fs.readFile(hashFilePath, 'utf-8'));
    if (!storedData.sections) { skipped++; continue; }

    const content = await fs.readFile(sourceFile, 'utf-8');
    const rawSections = splitIntoSections(content);
    const sections = deduplicateSectionIds(rawSections);
    const sectionMap = Object.fromEntries(sections.map(s => [s.id, s]));

    let changed = false;
    for (const [sectionId, cached] of Object.entries(storedData.sections)) {
      const section = sectionMap[sectionId];
      if (!section) continue;
      const newHash = 'sha256:' + crypto.createHash('sha256').update(section.content).digest('hex');
      if (cached.contentHash !== newHash) {
        cached.contentHash = newHash;
        changed = true;
      }
    }

    if (changed) {
      await fs.writeFile(hashFilePath, JSON.stringify(storedData), 'utf-8');
      console.log(`  ✓ migrated: ${articleId}`);
      updated++;
    } else {
      skipped++;
    }
  }

  console.log(`\n[migrate-hashes] Done: ${updated} updated, ${skipped} already up-to-date or skipped.`);
}

/**
 * Per-section batch translation for one OpenAPI YAML spec.
 * Caches at section granularity (per-path, per-schema, etc).
 */
async function translateApiSpecBatchSections(client, spec, systemPrompt, apiHashesDir, tag, lang) {
  const sourceContent = await fs.readFile(spec.full, 'utf-8');
  const sourceDoc = yaml.load(sourceContent);
  const sections = splitYamlIntoSections(sourceContent);

  const localePath = path.join(API_SPECS_DIR, `${spec.basename}.${lang}.yaml`);
  let localeDoc = null;
  try { localeDoc = yaml.load(await fs.readFile(localePath, 'utf-8')); } catch { /* first run */ }

  const hashFile = path.join(apiHashesDir, `${spec.basename}.json`);
  let storedData = null;
  try { storedData = JSON.parse(await fs.readFile(hashFile, 'utf-8')); } catch { /* cold cache */ }
  const storedSections = storedData?.sections ?? {};

  const decisions = [];
  for (const section of sections) {
    const contentHash = 'sha256:' + crypto.createHash('sha256').update(section.content).digest('hex');
    const cached = storedSections[section.id];
    if (cached?.contentHash === contentHash) {
      decisions.push({ section, kind: 'hit', contentHash, cachedTranslation: cached.translation });
    } else {
      decisions.push({ section, kind: 'send', contentHash });
    }
  }

  const stats = {
    hit: decisions.filter(d => d.kind === 'hit').length,
    send: decisions.filter(d => d.kind === 'send').length,
  };
  console.log(`${tag} api-spec:${spec.basename}: ${stats.hit} cached, ${stats.send} to translate.`);

  if (flagDryRun) {
    console.log(`  Would send: ${decisions.filter(d => d.kind === 'send').map(d => d.section.id).join(', ') || '(none)'}`);
    return;
  }

  let newTranslations = {};
  if (stats.send > 0) {
    const customIdLookup = {};
    const requests = decisions
      .filter(d => d.kind === 'send')
      .map(d => {
        const customId = customIdFor(spec.basename, d.section.id);
        customIdLookup[customId] = d.section.id;
        return {
          custom_id: customId,
          params: {
            model: 'claude-sonnet-4-6',
            max_tokens: 16000,
            system: cachedSystem(systemPrompt),
            messages: [{ role: 'user', content: d.section.content }],
          },
        };
      });

    const batch = await client.messages.batches.create({ requests });
    console.log(`${tag}   Batch submitted: ${batch.id}`);
    let current = await client.messages.batches.retrieve(batch.id);
    while (current.processing_status !== 'ended') {
      const counts = current.request_counts ?? {};
      console.log(`    Status: ${current.processing_status} — succeeded: ${counts.succeeded ?? '?'}, errored: ${counts.errored ?? '?'}`);
      await sleep(30_000);
      current = await client.messages.batches.retrieve(batch.id);
    }

    const results = await client.messages.batches.results(batch.id);
    for await (const r of results) {
      const sectionId = customIdLookup[r.custom_id];
      if (r.result.type === 'succeeded') {
        if (r.result.message.stop_reason === 'max_tokens') {
          console.error(`  ✗ api-spec:${spec.basename} ${sectionId} (${r.custom_id}): truncated at max_tokens`);
          hadErrors = true;
          continue;
        }
        newTranslations[sectionId] = r.result.message.content[0].text;
      } else {
        console.error(`  ✗ api-spec:${spec.basename} ${sectionId} (${r.custom_id}): ${JSON.stringify(r.result)}`);
        hadErrors = true;
      }
    }
  }

  // Reconstruct: prefer fresh translations, then existing locale subtree, then source.
  const newSectionContents = {};
  const newSectionsCache = {};
  for (const decision of decisions) {
    if (decision.kind === 'hit') {
      newSectionContents[decision.section.id] = decision.cachedTranslation;
      newSectionsCache[decision.section.id] = { contentHash: decision.contentHash, translation: decision.cachedTranslation };
    } else if (newTranslations[decision.section.id]) {
      newSectionContents[decision.section.id] = newTranslations[decision.section.id];
      newSectionsCache[decision.section.id] = { contentHash: decision.contentHash, translation: newTranslations[decision.section.id] };
    }
    // errored → fall through; mergeYamlSections uses existingLocaleDoc or source
  }

  const merged = mergeYamlSections(sourceDoc, localeDoc, newSectionContents);
  await fs.writeFile(localePath, merged, 'utf-8');

  const fHash = await fileHash(spec.full);
  await fs.mkdir(apiHashesDir, { recursive: true });
  await fs.writeFile(hashFile, JSON.stringify({ fileHash: fHash, sections: newSectionsCache }), 'utf-8');
  console.log(`  ✓ api-spec:${spec.basename}`);
}

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
      if (flagBatch && flagIncremental) {
        await translateApiSpecBatchSections(client, spec, systemPrompt, apiHashesDir, tag, lang);
      } else {
        // Existing whole-file streaming path, used by --all / --api-specs without --batch
        const content = await fs.readFile(spec.full, 'utf-8');
        let translated = '';
        const stream = await client.messages.stream({
          model: 'claude-sonnet-4-6',
          max_tokens: 64000,
          system: cachedSystem(systemPrompt),
          messages: [{ role: 'user', content }],
        });
        for await (const chunk of stream) {
          if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
            translated += chunk.delta.text;
          }
        }
        const finalMessage = await stream.finalMessage();
        if (finalMessage.stop_reason === 'max_tokens') {
          throw new Error(`API spec output truncated at max_tokens limit — spec may be too large`);
        }
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
      }
    } catch (err) {
      console.error(`  ✗ api-spec:${spec.basename}: ${err.message}`);
      hadErrors = true;
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
// Maximum characters per cached chunk. Sections larger than this are split at
// paragraph (blank-line) boundaries so that a single-paragraph edit only retranslates
// that paragraph, not the entire section. ~600 chars ≈ one typical documentation paragraph.
const PARAGRAPH_FALLBACK_CHARS = 600;

/**
 * Split MDX content into H2/H3-based sections.
 * Falls back to paragraph-level splitting for sections that exceed PARAGRAPH_FALLBACK_CHARS
 * (covers articles with no headings, or long preambles before the first heading).
 * Returns Array<{id: string, content: string}> where content pieces join('\n') === original.
 */
function splitIntoSections(content, { paragraphFallback = true } = {}) {
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

  if (!paragraphFallback) return sections;

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
 * content-hash-based ID: `<parentId>-p<8-char-hash>`.
 * Using content hashes rather than positional counters means inserting or
 * deleting a paragraph does not shift the IDs of surrounding chunks, so
 * unchanged paragraphs always hit the translation cache.
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

  // Merge consecutive paragraph blocks into chunks that stay under the threshold.
  //
  // ID strategy — two goals in tension:
  //   (A) Stable across code-only changes → use prose hash → patchCodeBlocks can fire
  //   (B) Unique when prose is identical → use content hash → switching chunks is detected
  //
  // Resolution: use prose hash when it is unique within this section; fall back to
  // content hash for chunks whose prose hash collides with another chunk's.
  // Colliding chunks are rare (e.g. two code-only blocks) and sacrifice patchCodeBlocks,
  // but gain correct switch detection without positional dedup suffixes.

  // First pass: collect raw chunk contents
  const rawChunks = [];
  let current = '';
  for (const block of rawBlocks) {
    const candidate = current ? `${current}\n${block}` : block;
    if (current && candidate.length > PARAGRAPH_FALLBACK_CHARS) {
      rawChunks.push(current);
      current = block;
    } else {
      current = candidate;
    }
  }
  if (current) rawChunks.push(current);

  if (rawChunks.length <= 1) return [section];

  // Count prose-hash occurrences to detect collisions within this section
  const proseHashCount = new Map();
  for (const c of rawChunks) {
    const ph = crypto.createHash('sha256').update(stripCodeBlocks(c)).digest('hex').slice(0, 8);
    proseHashCount.set(ph, (proseHashCount.get(ph) ?? 0) + 1);
  }

  // Second pass: assign stable IDs
  const chunks = rawChunks.map(c => {
    const ph = crypto.createHash('sha256').update(stripCodeBlocks(c)).digest('hex').slice(0, 8);
    const h = proseHashCount.get(ph) === 1
      ? ph  // unique prose → stable ID, enables patchCodeBlocks
      : crypto.createHash('sha256').update(c).digest('hex').slice(0, 8); // collision → content hash
    return { id: `${section.id}-p${h}`, content: c };
  });

  return chunks.length > 1 ? chunks : [section];
}

/**
 * Split an OpenAPI/AsyncAPI YAML doc into translation-sized subtrees.
 *
 * Sections returned (each as { id, content }):
 *   - "info"                                  — single subtree
 *   - "servers"                               — single subtree
 *   - "tags"                                  — single subtree
 *   - "paths::<path>"                         — one per path
 *   - "components.<bucket>::<name>"           — one per schema/response/etc
 *   - "<other-top-level-key>"                 — anything we don't recognize
 *
 * `content` is the YAML serialization of that subtree under its top-level key.
 */
function splitYamlIntoSections(yamlContent) {
  const doc = yaml.load(yamlContent);
  if (!doc || typeof doc !== 'object') {
    return [{ id: 'whole', content: yamlContent }];
  }

  const sections = [];

  for (const [topKey, topVal] of Object.entries(doc)) {
    if (topKey === 'paths' && topVal && typeof topVal === 'object') {
      for (const [pathKey, pathVal] of Object.entries(topVal)) {
        sections.push({
          id: `paths::${pathKey}`,
          content: yaml.dump({ paths: { [pathKey]: pathVal } }, { lineWidth: -1, noRefs: true }),
        });
      }
    } else if (topKey === 'components' && topVal && typeof topVal === 'object') {
      for (const [bucket, bucketVal] of Object.entries(topVal)) {
        if (bucketVal && typeof bucketVal === 'object' && !Array.isArray(bucketVal)) {
          for (const [name, val] of Object.entries(bucketVal)) {
            sections.push({
              id: `components.${bucket}::${name}`,
              content: yaml.dump({ components: { [bucket]: { [name]: val } } }, { lineWidth: -1, noRefs: true }),
            });
          }
        } else {
          sections.push({
            id: `components.${bucket}`,
            content: yaml.dump({ components: { [bucket]: bucketVal } }, { lineWidth: -1, noRefs: true }),
          });
        }
      }
    } else {
      sections.push({
        id: topKey,
        content: yaml.dump({ [topKey]: topVal }, { lineWidth: -1, noRefs: true }),
      });
    }
  }

  return sections;
}

/**
 * Merge translated YAML subtrees back into a complete document.
 *
 * For each section: prefer fresh translation, then existing-locale subtree,
 * then source. Returns the merged YAML string.
 */
function mergeYamlSections(originalDoc, existingLocaleDoc, newSectionContents) {
  const merged = {};

  for (const topKey of Object.keys(originalDoc)) {
    if (topKey === 'paths' && originalDoc.paths && typeof originalDoc.paths === 'object') {
      merged.paths = {};
      for (const pathKey of Object.keys(originalDoc.paths)) {
        const sectionId = `paths::${pathKey}`;
        if (newSectionContents[sectionId]) {
          const parsed = yaml.load(newSectionContents[sectionId]);
          merged.paths[pathKey] = parsed.paths[pathKey];
        } else if (existingLocaleDoc?.paths?.[pathKey] !== undefined) {
          merged.paths[pathKey] = existingLocaleDoc.paths[pathKey];
        } else {
          merged.paths[pathKey] = originalDoc.paths[pathKey];
        }
      }
    } else if (topKey === 'components' && originalDoc.components && typeof originalDoc.components === 'object') {
      merged.components = {};
      for (const bucket of Object.keys(originalDoc.components)) {
        const bucketVal = originalDoc.components[bucket];
        if (bucketVal && typeof bucketVal === 'object' && !Array.isArray(bucketVal)) {
          merged.components[bucket] = {};
          for (const name of Object.keys(bucketVal)) {
            const sectionId = `components.${bucket}::${name}`;
            if (newSectionContents[sectionId]) {
              const parsed = yaml.load(newSectionContents[sectionId]);
              merged.components[bucket][name] = parsed.components[bucket][name];
            } else if (existingLocaleDoc?.components?.[bucket]?.[name] !== undefined) {
              merged.components[bucket][name] = existingLocaleDoc.components[bucket][name];
            } else {
              merged.components[bucket][name] = bucketVal[name];
            }
          }
        } else {
          const sectionId = `components.${bucket}`;
          if (newSectionContents[sectionId]) {
            const parsed = yaml.load(newSectionContents[sectionId]);
            merged.components[bucket] = parsed.components[bucket];
          } else if (existingLocaleDoc?.components?.[bucket] !== undefined) {
            merged.components[bucket] = existingLocaleDoc.components[bucket];
          } else {
            merged.components[bucket] = bucketVal;
          }
        }
      }
    } else {
      const sectionId = topKey;
      if (newSectionContents[sectionId]) {
        const parsed = yaml.load(newSectionContents[sectionId]);
        merged[topKey] = parsed[topKey];
      } else if (existingLocaleDoc?.[topKey] !== undefined) {
        merged[topKey] = existingLocaleDoc[topKey];
      } else {
        merged[topKey] = originalDoc[topKey];
      }
    }
  }

  return yaml.dump(merged, { lineWidth: -1, noRefs: true });
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
 * Strip fenced code blocks from content — returns prose-only string.
 * Used to compute a prose-only hash so that code-only changes can be patched
 * without re-translating the surrounding text.
 */
function stripCodeBlocks(content) {
  const lines = content.split('\n');
  const result = [];
  let inBlock = false;
  let fenceChar = null;
  for (const line of lines) {
    const m = line.match(/^(`{3,}|~{3,})/);
    if (m) {
      if (!inBlock) { inBlock = true; fenceChar = m[1][0]; }
      else if (line[0] === fenceChar) { inBlock = false; fenceChar = null; }
    } else if (!inBlock) {
      result.push(line);
    }
  }
  return result.join('\n');
}

/**
 * Extract all fenced code blocks from content, in traversal order.
 * Each entry is the full block string from opening fence to closing fence.
 */
function extractCodeBlocks(content) {
  const blocks = [];
  const lines = content.split('\n');
  let inBlock = false;
  let fenceChar = null;
  let blockLines = [];
  for (const line of lines) {
    const m = line.match(/^(`{3,}|~{3,})/);
    if (m) {
      if (!inBlock) {
        inBlock = true; fenceChar = m[1][0]; blockLines = [line];
      } else if (line[0] === fenceChar) {
        blockLines.push(line);
        blocks.push(blockLines.join('\n'));
        inBlock = false; fenceChar = null; blockLines = [];
      } else {
        blockLines.push(line);
      }
    } else if (inBlock) {
      blockLines.push(line);
    }
  }
  return blocks;
}

/**
 * Replace fenced code blocks in translationContent with corresponding entries
 * from newBlocks (matched by position). Used when only code changed in a section.
 */
function patchCodeBlocks(translationContent, newBlocks) {
  if (newBlocks.length === 0) return translationContent;
  const lines = translationContent.split('\n');
  const result = [];
  let inBlock = false;
  let fenceChar = null;
  let blockIndex = 0;
  for (const line of lines) {
    const m = line.match(/^(`{3,}|~{3,})/);
    if (!inBlock && m) {
      // Opening fence — emit replacement block (or original if no replacement left)
      result.push(blockIndex < newBlocks.length ? newBlocks[blockIndex] : line);
      blockIndex++;
      inBlock = true;
      fenceChar = m[1][0];
    } else if (inBlock) {
      if (m && line[0] === fenceChar) {
        // Closing fence — already consumed inside the replacement; just end tracking
        inBlock = false; fenceChar = null;
      }
      // Skip old block lines (replaced by the newBlocks entry above)
    } else {
      result.push(line);
    }
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

/** Return the union of all article IDs across every sidebar JSON file. */
async function getAllSidebarIds() {
  const entries = await fs.readdir(SIDEBARS_DIR, { withFileTypes: true });
  const ids = new Set();
  function extract(items) {
    for (const item of items) {
      if (item.id) ids.add(item.id);
      if (item.items) extract(item.items);
    }
  }
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.json')) continue;
    try {
      const sidebar = JSON.parse(await fs.readFile(path.join(SIDEBARS_DIR, entry.name), 'utf-8'));
      extract(sidebar);
    } catch { /* skip malformed files */ }
  }
  return ids;
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
      if (item.id) ids.add(item.id);
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

  // Rewrite reusable snippet import paths to point to the localized versions.
  // @site/src/components/reusable/Foo.mdx → @site/src/locales/<lang>/reusable/Foo.mdx
  content = content.replace(
    /@site\/src\/components\/reusable\//g,
    `@site/src/locales/${lang}/reusable/`
  );

  // Rewrite relative imports in reusable files that used '../Foo.astro' (relative to
  // src/components/reusable/) — those paths break when the file is placed under
  // src/locales/<lang>/reusable/. Use the correct relative path 3 levels up.
  content = content.replace(
    /from '\.\.\/([^']+\.astro)'/g,
    `from '../../../components/$1'`
  );

  // Strip non-reusable imports from locale files. The locale page renderer
  // injects all standard components (Tabs, Zoom, Details, etc.) via the
  // `components` prop, so these imports are unnecessary and break because
  // the relative paths assume the original src/content/docs/ depth.
  // Only keep imports that reference the locales/ reusable directory.
  {
    const fmClose = content.indexOf('\n---\n');
    const bodyStart = fmClose >= 0 ? fmClose + 5 : 0;
    const body = content.slice(bodyStart);
    const strippedBody = body.replace(/^import [^\n]+\n/gm, (line) => {
      // Keep reusable snippet imports (already rewritten to locales/<lang>/reusable/)
      if (line.includes('/locales/') && line.includes('/reusable/')) return line;
      return '';
    });
    // Clean up leading blank lines left by stripped imports
    content = content.slice(0, bodyStart) + strippedBody.replace(/^\n+/, '\n');
  }

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

/**
 * Retry an async function up to maxRetries times on 529 Overloaded responses.
 * Uses exponential backoff: 10s, 20s, 40s.
 */
async function withRetry(fn, maxRetries = 3) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      const isOverloaded = err.status === 529 || err.error?.type === 'overloaded_error' ||
        (err.message && err.message.includes('overloaded'));
      if (isOverloaded && attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 10_000; // 10s, 20s, 40s
        console.warn(`  ⚠ API overloaded (attempt ${attempt + 1}/${maxRetries + 1}), retrying in ${delay / 1000}s...`);
        await sleep(delay);
        continue;
      }
      throw err;
    }
  }
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

main().catch((err) => {
  console.error('[translate] Fatal error:', err);
  process.exit(1);
});
