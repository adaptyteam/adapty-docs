#!/usr/bin/env node
/**
 * Runs the docs repo's own prose linter (scripts/lint-prose.mjs) with only the
 * personal rules in extra-rules.mjs. The shared file is read at run time and
 * never written, so these rules stay out of the repo and always run on the
 * current masking and diff logic.
 *
 * Run it from the docs repo root, with the same arguments as lint-prose.mjs:
 *   node .claude/skills/recursive-writer/lib/tools/lint-personal.mjs [--full] <file.mdx>
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const repo = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const linterPath = join(repo, 'scripts/lint-prose.mjs');
const marker = 'const RULES = [';

let src;
try {
  src = readFileSync(linterPath, 'utf8');
} catch {
  console.error(`lint-personal: no linter at ${linterPath}. Run it from the docs repo root.`);
  process.exit(1);
}

if (src.split(marker).length !== 2) {
  console.error(`lint-personal: expected one "${marker}" in ${linterPath}. The shared linter changed shape; update lint-personal.mjs.`);
  process.exit(1);
}

const rulesUrl = new URL('./extra-rules.mjs', import.meta.url).href;
const patched =
  `import { EXTRA_RULES } from ${JSON.stringify(rulesUrl)};\n` +
  src
    .replace(/^#!.*\n/, '')
    .replace(marker, 'const RULES = EXTRA_RULES;\nconst SHARED_RULES = [');

// The linter reads process.argv.slice(2), which is this script's arguments.
await import(`data:text/javascript,${encodeURIComponent(patched)}`);
