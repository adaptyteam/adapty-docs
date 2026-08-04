#!/usr/bin/env node
/**
 * SEO audit for src/content/docs.
 *
 * Reports only what a regex can decide. Every finding here is mechanical:
 * lengths, duplicates, missing fields, banned vocabulary, structural absences.
 * Wording judgment belongs to the seo skill, not to this script.
 *
 * Usage:
 *   node scripts/seo-audit.mjs                    # whole docs tree
 *   node scripts/seo-audit.mjs --diff             # files changed vs origin/main
 *   node scripts/seo-audit.mjs a.mdx b.mdx        # specific files
 *   node scripts/seo-audit.mjs --json             # machine-readable
 *   node scripts/seo-audit.mjs --platform unity   # one platform's files
 *
 * Duplicate detection always scans the full tree, even when the report is
 * scoped: a collision is only visible against every sibling.
 */

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const DOCS_DIR = 'src/content/docs';

// Google truncates the title tag around 60 characters and the meta description
// around 160. The lower description bound is ours, not Google's: below ~120 the
// field is almost always restating the title instead of adding information.
const TITLE_TAG_MAX = 60;
const DESC_MIN = 120;
const DESC_MAX = 160;
const THIN_BODY_WORDS = 120;

// Vocabulary the editor skill forbids. An SEO pass must not introduce these and
// should clean them out when it touches a field that already has one.
const BANNED = [
  'seamless', 'effortless', 'supercharge', 'revolutioniz', 'magical',
  'ultimate', 'best-in-class', 'cutting-edge', 'game-chang', 'powerful',
  'robust', 'simply ', 'instantly', 'blazing', 'unlock the power',
];

const PLATFORMS = [
  { id: 'ios', label: 'iOS', filePrefixes: ['ios-'], dirs: ['ios'] },
  { id: 'android', label: 'Android', filePrefixes: ['android-'], dirs: ['android'] },
  { id: 'unity', label: 'Unity', filePrefixes: ['unity-'], dirs: ['unity'] },
  { id: 'flutter', label: 'Flutter', filePrefixes: ['flutter-'], dirs: ['flutter'] },
  { id: 'react-native', label: 'React Native', filePrefixes: ['react-native-', 'rn-'], dirs: ['react-native'] },
  { id: 'capacitor', label: 'Capacitor', filePrefixes: ['capacitor-'], dirs: ['capacitor'] },
  { id: 'kmp', label: 'Kotlin Multiplatform', filePrefixes: ['kmp-'], dirs: ['kmp'] },
];

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith('--')));
const platformFlagIndex = args.indexOf('--platform');
const platformFilter = platformFlagIndex !== -1 ? args[platformFlagIndex + 1] : null;
const explicitFiles = args.filter(
  (a) => !a.startsWith('--') && a !== platformFilter && a.endsWith('.mdx'),
);

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.name.endsWith('.mdx')) out.push(full);
  }
  return out;
}

/** Minimal frontmatter reader: flat `key: value` pairs, which is all this schema uses. */
function parse(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  const fm = match ? match[1] : '';
  const body = match ? raw.slice(match[0].length) : raw;

  const field = (key) => {
    const m = new RegExp(`^${key}:\\s*(.*)$`, 'm').exec(fm);
    if (!m) return null;
    return m[1].trim().replace(/^["']|["']$/g, '').trim() || null;
  };

  const slug = path.basename(file, '.mdx');
  const platform = PLATFORMS.find(
    (p) =>
      p.filePrefixes.some((pre) => slug.startsWith(pre)) ||
      p.dirs.some((d) => file.includes(`${path.sep}${d}${path.sep}`)),
  );

  // A hub page's whole body is a card list; it is thin by design, not by neglect.
  const isHub = /<CustomDocCardList/.test(body);

  return {
    file,
    slug,
    platform,
    isHub,
    title: field('title'),
    metadataTitle: field('metadataTitle'),
    description: field('description'),
    keywords: field('keywords'),
    customSlug: field('customSlug'),
    noindex: field('noindex'),
    body,
    words: body.replace(/```[\s\S]*?```/g, ' ').split(/\s+/).filter(Boolean).length,
    headings: (body.match(/^##\s+\S/gm) || []).length,
  };
}

/**
 * Cross-linking related concepts is deliberately NOT checked here.
 *
 * An earlier version matched sidebar labels against article prose and filtered
 * them by document frequency. It was removed on purpose: deciding whether a term
 * deserves a link needs to know whose feature it names. On the Firebase page half
 * the suggestions pointed at *Firebase's* Predictions and A/B Testing rather than
 * Adapty's same-named articles, and no frequency statistic can tell those apart.
 *
 * Do not reintroduce it. The `seo` skill handles cross-linking as a judgment step.
 */

/** Body split into prose and fenced code, so each can be inspected separately. */
function splitCode(body) {
  const fences = body.match(/```[\s\S]*?```/g) || [];
  return { prose: body.replace(/```[\s\S]*?```/g, ' '), code: fences.join('\n') };
}

/** Adapty API method names appearing in code fences, e.g. Adapty.RestorePurchases(...). */
function codeSymbols(code) {
  const out = new Set();
  for (const m of code.matchAll(/\b[Aa]dapty[A-Za-z]*\s*\(?\)?\s*\.\s*([A-Za-z_][A-Za-z0-9_]{3,})\s*\(/g)) {
    out.add(m[1]);
  }
  return out;
}

function changedFiles() {
  try {
    const base = execSync('git merge-base HEAD origin/main', { encoding: 'utf8' }).trim();
    return execSync(`git diff --name-only ${base} HEAD; git diff --name-only HEAD`, {
      encoding: 'utf8',
    })
      .split('\n')
      .map((s) => s.trim())
      .filter((f) => f.endsWith('.mdx') && f.startsWith(DOCS_DIR) && fs.existsSync(f));
  } catch {
    console.error('Could not diff against origin/main; auditing the full tree instead.');
    return null;
  }
}

// ---------------------------------------------------------------------------

const all = walk(DOCS_DIR).map(parse);

let scoped = all;
if (explicitFiles.length) {
  const wanted = new Set(explicitFiles.map((f) => path.normalize(f)));
  scoped = all.filter((d) => wanted.has(path.normalize(d.file)));
} else if (flags.has('--diff')) {
  const changed = changedFiles();
  if (changed) {
    const wanted = new Set(changed.map((f) => path.normalize(f)));
    scoped = all.filter((d) => wanted.has(path.normalize(d.file)));
  }
} else if (platformFilter) {
  scoped = all.filter((d) => d.platform?.id === platformFilter);
}

const findings = [];
const add = (severity, code, doc, message, detail) =>
  findings.push({ severity, code, file: doc.file, slug: doc.slug, message, detail });

// --- duplicate groups, always computed across the whole tree ----------------
function groupBy(field) {
  const map = new Map();
  for (const d of all) {
    const v = d[field];
    if (!v) continue;
    const key = v.toLowerCase().replace(/\s+/g, ' ').trim();
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(d);
  }
  return map;
}

const dupTitleTag = groupBy('metadataTitle');
const dupDesc = groupBy('description');
const dupH1 = groupBy('title');
const inScope = new Set(scoped.map((d) => d.file));

for (const doc of scoped) {
  // --- required fields -----------------------------------------------------
  if (!doc.title) add('error', 'missing-title', doc, 'No `title` — the H1 and JSON-LD headline are empty.');
  if (!doc.metadataTitle) {
    add('error', 'missing-title-tag', doc,
      'No `metadataTitle` — the <title> tag falls back to `title`, which is rarely the right search phrasing.');
  }
  if (!doc.description) {
    add('error', 'missing-description', doc,
      'No `description` — no meta description, no og:description, and a blank doc card.');
  }

  // --- lengths -------------------------------------------------------------
  if (doc.metadataTitle && doc.metadataTitle.length > TITLE_TAG_MAX) {
    add('warn', 'title-tag-long', doc,
      `metadataTitle is ${doc.metadataTitle.length} chars; truncated past ~${TITLE_TAG_MAX}.`,
      doc.metadataTitle);
  }
  if (doc.description) {
    const n = doc.description.length;
    if (n > DESC_MAX) {
      add('warn', 'description-long', doc, `description is ${n} chars; truncated past ~${DESC_MAX}.`, doc.description);
    } else if (n < DESC_MIN) {
      add('info', 'description-short', doc,
        `description is ${n} chars, leaving ~${DESC_MIN - n} unused. Add the concrete situation or API name.`,
        doc.description);
    }
  }

  // --- house convention ----------------------------------------------------
  if (doc.metadataTitle && !/\|\s*Adapty Docs\s*$/.test(doc.metadataTitle)) {
    add('warn', 'title-tag-suffix', doc,
      'metadataTitle does not end with "| Adapty Docs" (the convention on 671 of 686 pages).',
      doc.metadataTitle);
  }
  if (doc.platform && doc.metadataTitle) {
    const hasPlatform = new RegExp(doc.platform.label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
      .test(doc.metadataTitle);
    if (!hasPlatform) {
      // The highest-value finding in this script. Not because of duplication --
      // duplication carries no penalty -- but because the page lacks the term a
      // platform-qualified searcher actually used.
      add('error', 'title-tag-no-platform', doc,
        `<title> never names ${doc.platform.label}, so the page lacks the disambiguating term for platform-qualified queries.`,
        doc.metadataTitle);
    }
  }

  // --- duplicates ----------------------------------------------------------
  // Duplication carries no ranking penalty. These are reported as diagnostics:
  // a shared value is how you spot a page that never names its own platform, and
  // it is a real defect on the doc-card and site-search surfaces. Severity is
  // deliberately below title-tag-no-platform.
  const dupReport = (map, field, code, label, severity, why) => {
    const v = doc[field];
    if (!v) return;
    const key = v.toLowerCase().replace(/\s+/g, ' ').trim();
    const group = map.get(key) || [];
    if (group.length < 2) return;
    // Report a group once, on its first in-scope member.
    const first = group.find((g) => inScope.has(g.file));
    if (first !== doc) return;
    add(severity, code, doc,
      `${label} is byte-identical across ${group.length} pages. ${why}`,
      `"${v}"\n     ${group.map((g) => g.slug).join(', ')}`);
  };
  dupReport(dupTitleTag, 'metadataTitle', 'duplicate-title-tag', 'metadataTitle', 'warn',
    'Check whether each names its own platform; no penalty for the sharing itself.');
  dupReport(dupDesc, 'description', 'duplicate-description', 'description', 'warn',
    'Google usually rewrites descriptions anyway — the real cost is identical doc cards and search snippets.');
  dupReport(dupH1, 'title', 'duplicate-h1', 'title (H1)', 'warn',
    'If the pages share a platform, this is a content-architecture question, not a metadata fix.');

  // --- description that adds nothing ---------------------------------------
  if (doc.description && doc.title) {
    const norm = (s) => s.toLowerCase().replace(/[.\s]+/g, ' ').trim();
    if (norm(doc.description) === norm(doc.title)) {
      add('warn', 'description-echoes-title', doc,
        'description just restates `title`; it adds no information to the SERP or the doc card.',
        doc.description);
    }
  }

  // --- banned vocabulary ---------------------------------------------------
  for (const f of ['metadataTitle', 'description']) {
    const v = doc[f];
    if (!v) continue;
    for (const b of BANNED) {
      if (v.toLowerCase().includes(b)) {
        add('error', 'banned-word', doc, `\`${f}\` contains "${b.trim()}", which the editor skill forbids.`, v);
      }
    }
  }

  // --- keywords: report, never touch ---------------------------------------
  if (doc.keywords) {
    add('info', 'keywords-present', doc,
      'Has `keywords`. It renders <meta name="keywords">, which Google ignores, and it feeds Algolia. Leave it alone unless the user explicitly asks.',
      doc.keywords);
  }

  // --- structure -----------------------------------------------------------
  if (!doc.isHub && doc.headings === 0 && doc.words > 150) {
    add('warn', 'no-headings', doc,
      'No `##` headings, so no ToC entries, no deep-link anchors, and no SERP jump-links.');
  }
  if (!doc.isHub && doc.words < THIN_BODY_WORDS) {
    add('info', 'thin-body', doc, `Body is ${doc.words} words and is not a card-list hub.`);
  }
  if (doc.isHub && doc.words < 30) {
    add('info', 'hub-no-intro', doc,
      'Card-list hub with no intro sentence — every word on this URL is generated from its children.');
  }
  if (doc.platform && !new RegExp(doc.platform.label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i').test(doc.body)) {
    add('info', 'platform-absent-from-body', doc,
      `Body never says "${doc.platform.label}"; the platform exists only in frontmatter.`);
  }


  // --- API symbol present in prose, not only in a code fence ---------------
  const { prose, code } = splitCode(doc.body);
  if (code) {
    const symbols = codeSymbols(code);
    if (symbols.size) {
      const inProse = [...symbols].filter((s) => prose.includes(s));
      if (inProse.length === 0) {
        add('warn', 'symbol-not-in-prose', doc,
          'API method appears only inside a code fence, never in the prose that surrounds it.',
          `symbols: ${[...symbols].slice(0, 6).join(', ')}`);
      }
    }
  }
}

// ---------------------------------------------------------------------------

// Never call process.exit() after writing: stdout to a pipe is async in Node and
// exiting truncates the output at the pipe buffer (~64 KB). Let the process end
// naturally so the write flushes.
if (flags.has('--json')) {
  console.log(JSON.stringify({ scanned: scoped.length, findings }, null, 2));
} else {
  report();
}

function report() {
const ORDER = { error: 0, warn: 1, info: 2 };
const ICON = { error: '✗', warn: '!', info: '·' };
findings.sort((a, b) => ORDER[a.severity] - ORDER[b.severity] || a.code.localeCompare(b.code));

console.log(`\nSEO audit — ${scoped.length} file(s) in scope, ${all.length} in the tree\n`);

if (!findings.length) {
  console.log('No mechanical issues found.\n');
  return;
}

// A tree-wide run produces hundreds of low-severity findings. Listing them all
// buries the errors, so cap each group in the console view; --json stays complete.
const LIST_CAP = { error: Infinity, warn: 25, info: 10 };

let currentCode = null;
let shown = 0;
for (const f of findings) {
  if (f.code !== currentCode) {
    currentCode = f.code;
    shown = 0;
    const n = findings.filter((x) => x.code === f.code).length;
    console.log(`\n${ICON[f.severity]} ${f.code} (${n})`);
  }
  shown += 1;
  const cap = LIST_CAP[f.severity];
  if (shown > cap) {
    if (shown === cap + 1) {
      const n = findings.filter((x) => x.code === f.code).length;
      console.log(`   … and ${n - cap} more (use --json, or scope with --platform / a filename)`);
    }
    continue;
  }
  console.log(`   ${f.slug}: ${f.message}`);
  if (f.detail) console.log(`     ${f.detail.split('\n').join('\n     ')}`);
}

const counts = findings.reduce((acc, f) => ({ ...acc, [f.severity]: (acc[f.severity] || 0) + 1 }), {});
console.log(
  `\n${counts.error || 0} error, ${counts.warn || 0} warn, ${counts.info || 0} info\n` +
  `Mechanical only — wording decisions belong to the seo skill.\n`,
);
}
