import crypto from 'node:crypto';
import yaml from 'js-yaml';

const FM_RE = /^---\s*\n([\s\S]*?)\n---[ \t]*(?:\n|$)/;

export function parseFrontmatter(content) {
  const m = content.match(FM_RE);
  if (!m) return { fm: {}, body: content };
  const body = content.slice(m[0].length);
  try {
    const fm = yaml.load(m[1]);
    if (fm && typeof fm === 'object') return { fm, body };
  } catch { /* fall through to regex fallback */ }
  const fm = {};
  const title = m[1].match(/^title:\s*["']?(.*?)["']?\s*$/m);
  const desc = m[1].match(/^description:\s*["']?(.*?)["']?\s*$/m);
  if (title) fm.title = title[1];
  if (desc) fm.description = desc[1];
  return { fm, body };
}

export function extractHeadings(body) {
  const headings = [];
  for (const m of body.matchAll(/^(##|###)\s+(.+?)\s*$/gm)) {
    headings.push(m[2].replace(/\s*\{#[^}]+\}\s*$/, '').trim());
  }
  return headings;
}

export function contentHash(content) {
  return crypto.createHash('sha256').update(content).digest('hex').slice(0, 12);
}

const CODE_KEYWORDS = new Set([
  'if', 'else', 'for', 'while', 'switch', 'catch', 'return', 'function', 'func',
  'fun', 'def', 'try', 'await', 'async', 'new', 'super', 'init', 'print',
  'println', 'log', 'require', 'import', 'from', 'const', 'let', 'var', 'val',
  'when', 'guard', 'throw', 'throws', 'typeof', 'sizeof', 'assert', 'main',
]);
const SYMBOL_PREFIX_STOPLIST = /^(console|window|document|process|json|math|object|array|string|number|promise|this|self|e|err|error|res|req|response|request)\./i;

export function splitFences(body) {
  const fences = [];
  const text = body.replace(/```([\w-]*)[^\n]*\n([\s\S]*?)```/g, (_, lang, code) => {
    fences.push({ lang: lang || '', code });
    return '\n';
  });
  return { text, fences };
}

export function extractSymbols(fences) {
  const symbols = new Set();
  for (const { code } of fences) {
    for (const m of code.matchAll(/\b[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)+\b/g)) {
      const s = m[0];
      if (!SYMBOL_PREFIX_STOPLIST.test(s) && !/^\d/.test(s)) symbols.add(s);
    }
    for (const m of code.matchAll(/(?:^|[^\w.])([A-Za-z_][\w]*)\s*\(/g)) {
      const name = m[1];
      if (!CODE_KEYWORDS.has(name.toLowerCase())) symbols.add(name);
    }
    for (const m of code.matchAll(/\bAdapty[A-Za-z]\w*\b/g)) symbols.add(m[0]);
  }
  return [...symbols].sort();
}
