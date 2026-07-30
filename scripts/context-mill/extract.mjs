// Context mill: builds .claude/context-mill/docs-map.jsonl (mechanical layer)
// and reports staleness against docs-enrichment.jsonl (Claude-curated layer).
//
// Usage:
//   node scripts/context-mill/extract.mjs extract   # rebuild docs-map.jsonl
//   node scripts/context-mill/extract.mjs status    # list new/stale/deleted enrichment
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  parseFrontmatter, extractHeadings, contentHash,
  splitFences, extractSymbols, extractComponents, extractLinks,
  diffStatus,
} from './lib.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const SIDEBARS_DIR = path.join(ROOT, 'src/data/sidebars');
const DOCS_BASE = path.join(ROOT, 'src/content/docs');
const MILL_DIR = path.join(ROOT, '.claude/context-mill');
const MAP_FILE = path.join(MILL_DIR, 'docs-map.jsonl');
const ENRICHMENT_FILE = path.join(MILL_DIR, 'docs-enrichment.jsonl');

// Same shape as collectDocIds in generate-llms.mjs, but records WHICH sidebar.
function collectDocIds(items, ids) {
  for (const item of items) {
    if (item.type === 'category') {
      if (item.link && item.link.type === 'doc') ids.add(item.link.id);
      else if (item.id) ids.add(item.id);
      if (item.items) collectDocIds(item.items, ids);
    } else if (item.type === 'doc' && item.id) {
      ids.add(item.id);
    }
  }
}

async function buildSidebarMembership() {
  const membership = new Map(); // docId -> Set<sidebarName>
  const files = (await fs.readdir(SIDEBARS_DIR)).filter(f => f.endsWith('.json'));
  for (const file of files) {
    const name = file.replace(/\.json$/, '');
    const data = JSON.parse(await fs.readFile(path.join(SIDEBARS_DIR, file), 'utf-8'));
    const ids = new Set();
    collectDocIds(Array.isArray(data) ? data : [], ids);
    for (const id of ids) {
      if (!membership.has(id)) membership.set(id, new Set());
      membership.get(id).add(name);
    }
  }
  return membership;
}

async function* walkMdx(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walkMdx(full);
    else if (entry.name.endsWith('.mdx')) yield full;
  }
}

function parseArticle(filePath, content, sidebars) {
  const id = path.basename(filePath, '.mdx');
  const { fm, body } = parseFrontmatter(content);
  const { text, fences } = splitFences(body);
  return {
    id,
    path: path.relative(ROOT, filePath),
    sidebars: [...sidebars].sort(),
    orphan: sidebars.size === 0,
    draft: fm.draft === true,
    title: fm.title ?? null,
    description: fm.description ?? null,
    slug: fm.customSlug ?? null,
    headings: extractHeadings(text),
    symbols: extractSymbols(fences),
    components: extractComponents(text),
    links: extractLinks(text),
    hash: contentHash(content),
  };
}

async function readJsonl(file) {
  let raw;
  try { raw = await fs.readFile(file, 'utf-8'); } catch { return []; }
  const entries = [];
  for (const [i, line] of raw.split('\n').entries()) {
    if (!line.trim()) continue;
    try { entries.push(JSON.parse(line)); }
    catch { console.warn(`⚠ ${path.basename(file)}:${i + 1} is not valid JSON — skipped`); }
  }
  return entries;
}

async function extract() {
  const membership = await buildSidebarMembership();
  const records = [];
  for await (const filePath of walkMdx(DOCS_BASE)) {
    const content = await fs.readFile(filePath, 'utf-8');
    const id = path.basename(filePath, '.mdx');
    records.push(parseArticle(filePath, content, membership.get(id) ?? new Set()));
  }
  records.sort((a, b) => a.id.localeCompare(b.id));
  await fs.mkdir(MILL_DIR, { recursive: true });
  await fs.writeFile(MAP_FILE, records.map(r => JSON.stringify(r)).join('\n') + '\n');
  const enrichable = records.filter(r => !r.orphan && !r.draft).length;
  console.log(`docs-map.jsonl: ${records.length} articles (${enrichable} enrichable, ${records.length - enrichable} orphan/draft)`);
}

async function status() {
  const map = await readJsonl(MAP_FILE);
  if (map.length === 0) {
    console.error('docs-map.jsonl is missing or empty — run `npm run mill` first.');
    process.exitCode = 1;
    return;
  }
  const enrichment = await readJsonl(ENRICHMENT_FILE);
  const { newIds, staleIds, deletedIds } = diffStatus(map, enrichment);
  const section = (label, ids) => {
    console.log(`\n${label}: ${ids.length}`);
    for (const id of ids) console.log(`  ${id}`);
  };
  section('NEW (no enrichment yet)', newIds);
  section('STALE (article changed since enrichment)', staleIds);
  section('DELETED (enrichment for missing article)', deletedIds);
  if (newIds.length + staleIds.length + deletedIds.length === 0) {
    console.log('\n✓ Enrichment is up to date.');
  }
}

const cmd = process.argv[2] || 'extract';
if (cmd === 'extract') await extract();
else if (cmd === 'status') await status();
else { console.error(`Unknown command: ${cmd}. Use: extract | status`); process.exitCode = 1; }
