/**
 * Bulk AI Translation Script — Simplified Chinese (zh-CN)
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-... node scripts/translate-zh.mjs                     # all untranslated
 *   ANTHROPIC_API_KEY=sk-... node scripts/translate-zh.mjs --all               # retranslate everything
 *   ANTHROPIC_API_KEY=sk-... node scripts/translate-zh.mjs --platform ios      # single platform
 *   ANTHROPIC_API_KEY=sk-... node scripts/translate-zh.mjs --file ios-sdk-overview
 *   ANTHROPIC_API_KEY=sk-... node scripts/translate-zh.mjs --resume <batchId>  # retrieve submitted batch
 *   ANTHROPIC_API_KEY=sk-... node scripts/translate-zh.mjs --incremental       # sync, changed only (build pipeline)
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import Anthropic from '@anthropic-ai/sdk';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const DOCS_DIR = path.resolve(__dirname, '../src/content/docs');
const LOCALES_ZH_DIR = path.resolve(__dirname, '../src/locales/zh');
const HASHES_DIR = path.resolve(__dirname, '../src/locales/zh/.hashes');
const SIDEBARS_DIR = path.resolve(__dirname, '../src/data/sidebars');
const BATCH_ID_FILE = path.resolve(__dirname, '../.translate-batch-id');

// ---------------------------------------------------------------------------
// System prompt
// ---------------------------------------------------------------------------

const SYSTEM_PROMPT = `You are a technical documentation translator. Translate the MDX documentation below from English to Simplified Chinese (zh-CN).

PRESERVE exactly (never translate):
- import statements
- code blocks (fenced \`\`\` blocks) — content, language tag, and title attribute
- inline code (\`...\`)
- component tag names and attribute NAMES (only translate attribute VALUES when they are human-readable phrases)
- URLs in markdown links — translate the display text only, keep the href unchanged
- platform and product names: iOS, Android, React Native, Flutter, Unity, Kotlin Multiplatform, Capacitor, Adapty
- heading anchor IDs like {#my-anchor}
- the suffix " | Adapty Docs" in metadataTitle values

TRANSLATE:
- frontmatter field VALUES: title, description, metadataTitle (translate the title portion before " | Adapty Docs"), keywords array items
- all prose: paragraphs, headings, bullet lists, numbered lists
- callout content (:::note, :::tip, :::warning, :::danger, :::info, :::important, :::link blocks)
- human-readable component prop values:
  - summary= in <Details> components
  - label= in <TabItem> when it is a phrase, not a platform name (keep "iOS", "Android", "React Native", "Flutter", "Unity", "Kotlin Multiplatform", "Capacitor" as-is)

Output valid MDX only. No explanation, no commentary, no markdown fences wrapping the output.`;

// ---------------------------------------------------------------------------
// CLI argument parsing
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);
const flagAll = args.includes('--all');
const flagIncremental = args.includes('--incremental');

const platformIdx = args.indexOf('--platform');
const platform = platformIdx !== -1 ? args[platformIdx + 1] : null;

const fileIdx = args.indexOf('--file');
const fileId = fileIdx !== -1 ? args[fileIdx + 1] : null;

const resumeIdx = args.indexOf('--resume');
const resumeBatchId = resumeIdx !== -1 ? args[resumeIdx + 1] : null;

// Single-file or incremental → use sync (immediate) API; otherwise Batch API
const syncMode = fileId != null || flagIncremental;

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    if (flagIncremental) {
      console.log('[translate-zh] No ANTHROPIC_API_KEY set — skipping incremental translation.');
      process.exit(0);
    }
    console.error('[translate-zh] ANTHROPIC_API_KEY environment variable is required.');
    process.exit(1);
  }

  const client = new Anthropic({ apiKey });

  // Resume a previously submitted batch
  if (resumeBatchId) {
    await resumeBatch(client, resumeBatchId);
    return;
  }

  // Collect all source MDX files
  const allFiles = await collectMdxFiles(DOCS_DIR);

  // Apply --file / --platform filters
  let files = allFiles;
  if (fileId) {
    files = allFiles.filter(f => path.basename(f, '.mdx') === fileId);
    if (files.length === 0) {
      console.error(`[translate-zh] No article found with id: ${fileId}`);
      process.exit(1);
    }
  } else if (platform) {
    const platformIds = await getSidebarIds(platform);
    files = allFiles.filter(f => platformIds.has(path.basename(f, '.mdx')));
    if (files.length === 0) {
      console.error(`[translate-zh] No articles found for platform: ${platform}`);
      process.exit(1);
    }
  }

  // Determine which files actually need translation
  const toTranslate = [];
  for (const file of files) {
    const basename = path.basename(file, '.mdx');
    const translatedPath = path.join(LOCALES_ZH_DIR, `${basename}.mdx`);

    if (flagIncremental) {
      // Hash-based: only translate if source has changed
      const currentHash = await fileHash(file);
      const storedHash = await getStoredHash(basename);
      if (storedHash === currentHash) continue;
      toTranslate.push(file);
    } else if (flagAll) {
      toTranslate.push(file);
    } else {
      // Default: skip if translation already exists
      try {
        await fs.access(translatedPath);
        // File exists → skip
      } catch {
        toTranslate.push(file);
      }
    }
  }

  if (toTranslate.length === 0) {
    console.log('[translate-zh] Nothing to translate — all articles are up to date.');
    return;
  }

  console.log(`[translate-zh] ${toTranslate.length} article(s) to translate.`);

  if (syncMode) {
    await translateSync(client, toTranslate);
  } else {
    await translateBatch(client, toTranslate);
  }
}

// ---------------------------------------------------------------------------
// Sync translation (--file, --incremental)
// ---------------------------------------------------------------------------

const SYNC_CONCURRENCY = 5;

async function translateSync(client, files) {
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
          system: SYSTEM_PROMPT,
          messages: [{ role: 'user', content }],
        });
        const translatedContent = response.content[0].text;
        await writeTranslation(basename, translatedContent, file);
        console.log(`  ✓ ${basename}`);
        translated++;
      } catch (err) {
        console.error(`  ✗ ${basename}: ${err.message}`);
        errors++;
      }
    }
  }

  await Promise.all(Array.from({ length: SYNC_CONCURRENCY }, () => worker()));
  console.log(`\n[translate-zh] Done: ${translated} translated, ${errors} errors.`);
}

// ---------------------------------------------------------------------------
// Batch translation (default, --all, --platform)
// ---------------------------------------------------------------------------

async function translateBatch(client, files) {
  console.log('[translate-zh] Reading source files...');
  const requests = await Promise.all(
    files.map(async (file) => {
      const basename = path.basename(file, '.mdx');
      const content = await fs.readFile(file, 'utf-8');
      return {
        custom_id: basename,
        params: {
          model: 'claude-sonnet-4-6',
          max_tokens: 8192,
          system: SYSTEM_PROMPT,
          messages: [{ role: 'user', content }],
        },
      };
    })
  );

  console.log(`[translate-zh] Submitting batch of ${requests.length} requests...`);
  const batch = await client.messages.batches.create({ requests });
  const batchId = batch.id;

  await fs.writeFile(BATCH_ID_FILE, batchId, 'utf-8');
  console.log(`[translate-zh] Batch submitted: ${batchId}`);
  console.log(`[translate-zh] Batch ID saved to .translate-batch-id`);
  console.log('[translate-zh] Use --resume <batchId> to retrieve results if this process is interrupted.');

  // Build a map for hash saving after results come in
  const fileMap = Object.fromEntries(files.map(f => [path.basename(f, '.mdx'), f]));
  await waitAndRetrieve(client, batchId, fileMap);
}

async function waitAndRetrieve(client, batchId, fileMap) {
  console.log('[translate-zh] Polling batch status every 30 seconds...');

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

  console.log('[translate-zh] Batch complete. Retrieving results...');
  let translated = 0;
  let errors = 0;

  const results = await client.messages.batches.results(batchId);
  for await (const result of results) {
    const basename = result.custom_id;
    if (result.result.type === 'succeeded') {
      const text = result.result.message.content[0].text;
      const sourceFile = fileMap[basename];
      await writeTranslation(basename, text, sourceFile);
      console.log(`  ✓ ${basename}`);
      translated++;
    } else {
      console.error(`  ✗ ${basename}: ${JSON.stringify(result.result)}`);
      errors++;
    }
  }

  console.log(`\n[translate-zh] Done: ${translated} translated, ${errors} errors.`);
}

// ---------------------------------------------------------------------------
// Resume a submitted batch
// ---------------------------------------------------------------------------

async function resumeBatch(client, batchId) {
  let batch = await client.messages.batches.retrieve(batchId);
  console.log(`[translate-zh] Resuming batch ${batchId} — status: ${batch.processing_status}`);

  if (batch.processing_status !== 'ended') {
    console.log('[translate-zh] Waiting for batch to complete...');
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

  // For resume, find source files by basename to save hashes
  const allSourceFiles = await collectMdxFiles(DOCS_DIR);
  const fileMap = Object.fromEntries(allSourceFiles.map(f => [path.basename(f, '.mdx'), f]));

  console.log('[translate-zh] Retrieving results...');
  let translated = 0;
  let errors = 0;

  const results = await client.messages.batches.results(batchId);
  for await (const result of results) {
    const basename = result.custom_id;
    if (result.result.type === 'succeeded') {
      const text = result.result.message.content[0].text;
      const sourceFile = fileMap[basename];
      if (sourceFile) {
        await writeTranslation(basename, text, sourceFile);
      } else {
        // Source file not found — write translation without hash
        await fs.mkdir(LOCALES_ZH_DIR, { recursive: true });
        await fs.writeFile(path.join(LOCALES_ZH_DIR, `${basename}.mdx`), text, 'utf-8');
      }
      console.log(`  ✓ ${basename}`);
      translated++;
    } else {
      console.error(`  ✗ ${basename}: ${JSON.stringify(result.result)}`);
      errors++;
    }
  }

  console.log(`\n[translate-zh] Done: ${translated} translated, ${errors} errors.`);
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

async function getSidebarIds(platformName) {
  const sidebarPath = path.join(SIDEBARS_DIR, `${platformName}.json`);
  let sidebar;
  try {
    const content = await fs.readFile(sidebarPath, 'utf-8');
    sidebar = JSON.parse(content);
  } catch {
    console.error(`[translate-zh] Sidebar not found for platform: ${platformName}`);
    console.error(`  Expected: ${sidebarPath}`);
    process.exit(1);
  }

  const ids = new Set();
  function extract(items) {
    for (const item of items) {
      if (item.type === 'doc' && item.id) {
        ids.add(item.id);
      }
      if (item.items) {
        extract(item.items);
      }
    }
  }
  extract(sidebar);
  return ids;
}

async function fileHash(filePath) {
  const content = await fs.readFile(filePath);
  return 'sha256:' + crypto.createHash('sha256').update(content).digest('hex');
}

async function getStoredHash(basename) {
  try {
    const hashFile = path.join(HASHES_DIR, `${basename}.json`);
    const data = JSON.parse(await fs.readFile(hashFile, 'utf-8'));
    return data.hash ?? null;
  } catch {
    return null;
  }
}

async function writeTranslation(basename, content, sourceFile) {
  await fs.mkdir(LOCALES_ZH_DIR, { recursive: true });
  await fs.writeFile(path.join(LOCALES_ZH_DIR, `${basename}.mdx`), content, 'utf-8');

  // Save hash sidecar so incremental mode can detect future changes
  if (sourceFile) {
    const hash = await fileHash(sourceFile);
    await fs.mkdir(HASHES_DIR, { recursive: true });
    await fs.writeFile(
      path.join(HASHES_DIR, `${basename}.json`),
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
  console.error('[translate-zh] Fatal error:', err);
  process.exit(1);
});
