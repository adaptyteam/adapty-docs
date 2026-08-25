#!/usr/bin/env node
/**
 * Prose linter for src/content/docs — a CANDIDATE FINDER, not a gate.
 *
 * Every rule here mirrors one in `.claude/skills/editor/SKILL.md`. The skill
 * documents them for judgment; this script fires them mechanically, because a
 * word list held in a model's head across a 3000-word article is the one thing
 * that reliably does not get applied. Rules that need judgment (is the reason
 * stated before the surprising claim? does this paragraph serve its heading?)
 * are deliberately absent — they cannot be grepped and a bad proxy is worse
 * than none.
 *
 * NOTHING HERE FAILS A BUILD. Exit code is always 0. Most hits are legitimate:
 * "you must call activate()" is correct, "revenue data" is correct. The output
 * is a list to read, not a list to fix.
 *
 * Two scopes, assigned by measured hit rate across the corpus:
 *
 *   always  — rare enough that every hit is worth reading (~150 corpus-wide).
 *   changed — common enough that whole-file reporting is noise, so these fire
 *             only on lines you actually touched. `check` alone has 622 existing
 *             hits; flagging them all on a one-line edit trains you to ignore
 *             the tool.
 *
 * Usage:
 *   node scripts/lint-prose.mjs <file.mdx> [more.mdx ...]
 *   node scripts/lint-prose.mjs --all           # every doc, `always` rules only
 *   node scripts/lint-prose.mjs --full <file>   # both scopes, ignore the diff
 *
 * Wired into the PostToolUse hook in .claude/settings.json so it runs on every
 * MDX edit without anyone remembering to ask for it.
 */

import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { relative, resolve } from 'node:path';

const DOCS_ROOT = 'src/content/docs';

/**
 * scope: 'always'  → report anywhere in the file
 *        'changed' → report only on added/modified lines
 * Each hint names the fix, not just the offence — a linter that only says "bad"
 * gets argued with.
 */
const RULES = [
  // ---------- always ----------
  {
    id: 'overclaim-only-way',
    scope: 'always',
    re: /\bonly way\b/gi,
    hint: 'Is there a second path? "The only way" was wrong 3× in one article. (Area 13)',
  },
  {
    id: 'competitor-vocabulary',
    scope: 'always',
    re: /\bentitlements?\b/gi,
    hint: '"Entitlement" is RevenueCat\'s word — Adapty says access level. (Area 11)',
  },
  {
    id: 'business-jargon',
    scope: 'always',
    re: /\b(leverage|utilize|facilitate)\b/gi,
    hint: 'Use "use", or name the specific action. (STE reference)',
  },
  {
    id: 'hedging',
    scope: 'always',
    re: /\b(it seems|it appears|generally speaking|in most cases|to some extent)\b/gi,
    hint: 'State it directly or be specific. (STE reference)',
  },
  {
    id: 'vague-qualifier',
    scope: 'always',
    re: /\b(pretty much|kind of|somewhat|fairly|quite|very|really|extremely|highly)\b/gi,
    hint: 'Remove, or replace with a number. (STE reference)',
  },
  {
    id: 'conversational-opener',
    scope: 'always',
    re: /^(Now|Of course|Basically|Well),/gim,
    hint: 'Cut the opener and state the content. (Area 1)',
  },
  {
    id: 'roadmap-leak',
    scope: 'always',
    re: /\b(for now|not yet|coming soon|is in progress)\b/gi,
    hint: 'State the present truth — "You can\'t restore an archived flow." (Area 10)',
  },
  {
    id: 'anthropomorphic-finds',
    scope: 'always',
    re: /\bfinds\b/gi,
    hint: 'Finds where? State the resulting state instead. (Area 4)',
  },

  // ---------- changed lines only ----------
  {
    id: 'vague-operation',
    scope: 'changed',
    re: /\b(records|handles|processes|manages|tracks|captures|stores|logs|registers|reflects)\b/gi,
    hint: 'Can the reader name the operation, medium, and destination from this verb? (Area 5)',
  },
  {
    id: 'verb-needs-object',
    scope: 'changed',
    re: /\b(writes|sends|puts|skips|charges|separates|passes)\b/gi,
    hint: 'What, and where to? (Area 5)',
  },
  {
    id: 'abstract-noun',
    scope: 'changed',
    re: /\b(figure|item|thing)s?\b/gi,
    hint: 'Replace with the concrete noun. (Area 4)',
  },
  {
    id: 'anthropomorphic-verb',
    scope: 'changed',
    re: /\b(sits|lives|holds|carries|picks|walks|arrives?|travels?|survives?)\b/gi,
    hint: 'An abstract entity takes no human action — name what Adapty does. (Area 4)',
  },
  {
    id: 'preposition-of-place',
    scope: 'changed',
    re: /\b(next to|beside|at the end of)\b/gi,
    hint: 'A flow has no sides. Use its representation — "in the flow\'s row". (Area 4)',
  },
  {
    id: 'overclaim-absolute',
    scope: 'changed',
    re: /\b(must|always|never|requires)\b/gi,
    hint: 'Is there a second path or a recoverable case? (Area 13)',
  },
  {
    id: 'relative-direction',
    scope: 'changed',
    re: /\b(above|below|earlier)\b/gi,
    hint: 'Content moves; headings get anchors for free. Link instead. (Area 12)',
  },
  {
    id: 'filler-word',
    scope: 'changed',
    re: /\b(actually|basically|essentially|simply|just|truly|certainly|definitely)\b/gi,
    hint: 'Remove. (STE reference)',
  },
  {
    id: 'banned-check',
    scope: 'changed',
    re: /\bcheck(s|ed|ing)?\b/gi,
    hint: 'Not ESL-safe and we auto-translate: "select" for checkboxes, "review"/"verify" for inspection. (Area 10)',
  },
  {
    id: 'banned-you-want',
    scope: 'changed',
    re: /\byou want\b/gi,
    hint: '"Select one or more statuses" — shorter, and documents multi-select. (Area 10)',
  },
  // Bold-label list format. The only accepted shape is:
  //   - **Label**: Capitalized explanation.
  // Precise enough to be near-zero false positive, but ~300 pre-existing hits,
  // so 'changed' scope keeps legacy articles from drowning the report.
  {
    id: 'bold-label-separator',
    scope: 'changed',
    re: /^[ \t]*[-*][ \t]+\*\*[^*\n]+\*\*[ \t]*[-—][ \t]/gm,
    hint: 'Bold-label lists use a colon: `- **Label**: Capitalized explanation.` (Area 6)',
  },
  {
    id: 'bold-label-period',
    scope: 'changed',
    re: /^[ \t]*[-*][ \t]+\*\*[^*\n]+\.\*\*[ \t]/gm,
    hint: 'Period belongs outside the bold: `- **Label**: Capitalized explanation.` (Area 6)',
  },
  {
    id: 'bold-label-lowercase',
    scope: 'changed',
    re: /^[ \t]*[-*][ \t]+\*\*[^*\n]+\*\*:[ \t]+[a-z]/gm,
    hint: 'Capitalize the word after the colon in a bold-label list. (Area 6)',
  },
];

/**
 * Blank out everything that isn't prose, preserving offsets so line/column
 * numbers stay true: frontmatter, fenced code, inline code, link targets,
 * JSX/HTML tags and their attributes.
 */
function maskNonProse(src) {
  let out = src;

  const blank = (m) => m.replace(/[^\n]/g, ' ');

  // Frontmatter (only when it opens the file)
  out = out.replace(/^---\n[\s\S]*?\n---/, blank);
  // Fenced code blocks
  out = out.replace(/^[ \t]*(`{3,}|~{3,})[\s\S]*?^[ \t]*\1[ \t]*$/gm, blank);
  // JSX comments — not rendered prose
  out = out.replace(/\{\/\*[\s\S]*?\*\/\}/g, blank);
  // Inline code
  out = out.replace(/`[^`\n]+`/g, blank);
  // Link and image targets — keep the text, drop the URL
  out = out.replace(/\]\([^)\n]*\)/g, blank);
  // JSX / HTML tags with their attributes
  out = out.replace(/<[^>\n]+>/g, blank);
  // Bare URLs
  out = out.replace(/https?:\/\/\S+/g, blank);

  return out;
}

/** Line numbers (1-indexed) added or modified vs HEAD. */
function changedLines(file) {
  const abs = resolve(file);
  try {
    execFileSync('git', ['ls-files', '--error-unmatch', abs], { stdio: 'ignore' });
  } catch {
    return null; // untracked → treat every line as new
  }
  let diff;
  try {
    diff = execFileSync('git', ['diff', '-U0', 'HEAD', '--', abs], { encoding: 'utf8' });
  } catch {
    return new Set();
  }
  const lines = new Set();
  for (const m of diff.matchAll(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@/gm)) {
    const start = Number(m[1]);
    const count = m[2] === undefined ? 1 : Number(m[2]);
    for (let i = 0; i < count; i++) lines.add(start + i);
  }
  return lines;
}

function lintFile(file, { full = false } = {}) {
  const src = readFileSync(file, 'utf8');
  const prose = maskNonProse(src);
  const lineStarts = [0];
  for (let i = 0; i < prose.length; i++) if (prose[i] === '\n') lineStarts.push(i + 1);
  const lineOf = (idx) => {
    let lo = 0;
    let hi = lineStarts.length - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (lineStarts[mid] <= idx) lo = mid;
      else hi = mid - 1;
    }
    return lo + 1;
  };

  const needsDiff = !full && RULES.some((r) => r.scope === 'changed');
  const changed = needsDiff ? changedLines(file) : null;
  const isChanged = (ln) => full || changed === null || changed.has(ln);

  const findings = [];
  for (const rule of RULES) {
    rule.re.lastIndex = 0;
    for (const m of prose.matchAll(rule.re)) {
      const line = lineOf(m.index);
      if (rule.scope === 'changed' && !isChanged(line)) continue;
      findings.push({ line, rule: rule.id, text: m[0].trim(), hint: rule.hint });
    }
  }
  findings.sort((a, b) => a.line - b.line || a.rule.localeCompare(b.rule));
  return findings;
}

function collectAllDocs() {
  const out = execFileSync('git', ['ls-files', `${DOCS_ROOT}/**/*.mdx`, `${DOCS_ROOT}/*.mdx`], {
    encoding: 'utf8',
  });
  return out.split('\n').filter(Boolean);
}

// ---------------------------------------------------------------------------

const argv = process.argv.slice(2);
const full = argv.includes('--full');
const all = argv.includes('--all');
let files = argv.filter((a) => !a.startsWith('--'));

if (all) files = collectAllDocs();
files = files.filter((f) => f.endsWith('.mdx') && existsSync(f));

if (files.length === 0) process.exit(0);

let total = 0;
for (const file of files) {
  // --all reports `always` rules only; per-file diff scoping is meaningless there.
  const findings = lintFile(file, { full: full && !all });
  if (findings.length === 0) continue;
  console.log(`\n${relative(process.cwd(), file)}`);
  for (const f of findings) {
    console.log(`  ${String(f.line).padStart(4)}  ${f.text.padEnd(14)} ${f.hint}`);
  }
  total += findings.length;
}

if (total > 0) {
  console.log(
    `\n${total} prose candidate${total === 1 ? '' : 's'} — judgment required, not a gate. ` +
      `Many will be correct as written.`
  );
}

process.exit(0);
