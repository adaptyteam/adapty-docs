// Derives the article -> skill citation map from the local clone of the
// `sdk-integration-skill` source. Read-only against that repository.
//
// The extraction rule is deliberately identical to the skills repo's own
// scripts/lint-links.mjs: same url regex, same rejection of templates, globs
// and elided examples. Two rules that must agree will drift if they are
// written twice from memory, so any change here is a change there too.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseSources, applyLocalPaths, clonePath } from './sources.mjs';
// One owner per fact: the mill already expands a `~/` path: value, in git.mjs.
import { expandHome } from './git.mjs';

const DOCS_BASE = 'https://adapty.io/docs/';
const SOURCE_ID = 'sdk-integration-skill';
const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const OUT = join(REPO_ROOT, '.claude', 'context-mill', 'skill-citations.json');

export function slugOf(url) {
  if (!url.startsWith(DOCS_BASE)) return null;
  const slug = url.slice(DOCS_BASE.length).split(/[?#]/)[0].replace(/\.md$/, '');
  if (!slug || slug.includes('llms')) return null;
  return slug;
}

export function extractDocsSlugs(markdown) {
  const slugs = [];
  for (const line of markdown.split('\n')) {
    for (const m of line.matchAll(/https:\/\/[^\s)"'`<>\]]+/g)) {
      const url = m[0].replace(/[).,:;!?]+$/, '');
      // Templates, globs and elided examples are instructions, not links.
      if (/[{}<>*…]/.test(url) || url.includes('...')) continue;
      const slug = slugOf(url);
      if (slug) slugs.push(slug);
    }
  }
  return slugs;
}

export function buildCitationMap(entries) {
  const bySlug = new Map();
  for (const { skill, markdown } of entries) {
    for (const slug of extractDocsSlugs(markdown)) {
      if (!bySlug.has(slug)) bySlug.set(slug, new Set());
      bySlug.get(slug).add(skill);
    }
  }
  return [...bySlug.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([slug, skills]) => ({ slug, skills: [...skills].sort() }));
}

async function markdownFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await markdownFiles(path)));
    else if (entry.name.endsWith('.md')) out.push(path);
  }
  return out;
}

async function resolveSkillsDir() {
  const md = await readFile(join(REPO_ROOT, '.claude', 'context-mill', 'sources.md'), 'utf8');
  let sources = parseSources(md);
  const localPath = join(REPO_ROOT, '.claude', 'context-mill', 'sources.local.md');
  if (existsSync(localPath)) sources = applyLocalPaths(sources, await readFile(localPath, 'utf8'));
  const source = sources.find(s => s.id === SOURCE_ID);
  if (!source) throw new Error(`sources.md has no ${SOURCE_ID} entry`);
  const root = expandHome(clonePath(source));
  const skills = join(root, 'skills');
  if (!existsSync(skills)) {
    throw new Error(
      `no clone at ${skills} — add a path: override for ${SOURCE_ID} in sources.local.md`,
    );
  }
  return skills;
}

async function main() {
  const skillsDir = await resolveSkillsDir();
  const entries = [];
  for (const file of await markdownFiles(skillsDir)) {
    entries.push({
      skill: relative(skillsDir, file).split('/')[0],
      markdown: await readFile(file, 'utf8'),
    });
  }
  const map = buildCitationMap(entries);
  await writeFile(OUT, JSON.stringify(map, null, 1) + '\n');
  const perSkill = new Map();
  for (const { skills } of map) for (const s of skills) perSkill.set(s, (perSkill.get(s) ?? 0) + 1);
  const coverage = [...perSkill].sort().map(([s, n]) => `${s} ${n}`).join(', ');
  console.log(`${map.length} articles cited -> ${relative(REPO_ROOT, OUT)}`);
  console.log(coverage);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch(err => {
    console.error(err.message);
    process.exitCode = 2;
  });
}
