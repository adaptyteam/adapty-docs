import crypto from 'node:crypto';
import yaml from 'js-yaml';

// Trailing match consumes only spaces/tabs (+ an optional \r for CRLF files)
// + one newline after the closing `---`, so the body keeps its leading
// blank line ("\nIntro paragraph.").
const FM_RE = /^---\s*\n([\s\S]*?)\n---[ \t]*\r?(?:\n|$)/;

export function parseFrontmatter(content) {
  const m = content.match(FM_RE);
  if (!m) return { fm: {}, body: content };
  const body = content.slice(m[0].length);
  let fmError = false;
  try {
    const fm = yaml.load(m[1]);
    if (fm && typeof fm === 'object') return { fm, body };
  } catch {
    // Falls through to the regex fallback below; fmError distinguishes this
    // "frontmatter present but broken" case from "no frontmatter at all".
    fmError = true;
  }
  // Regex fallback for broken YAML (mirrors generate-llms.mjs extractDescription)
  const fm = {};
  const title = m[1].match(/^title:\s*["']?(.*?)["']?\s*$/m);
  const desc = m[1].match(/^description:\s*["']?(.*?)["']?\s*$/m);
  const slug = m[1].match(/^customSlug:\s*["']?(.*?)["']?\s*$/m);
  if (title) fm.title = title[1];
  if (desc) fm.description = desc[1];
  if (slug) fm.customSlug = slug[1];
  return fmError ? { fm, body, fmError: true } : { fm, body };
}

// Callers should pass the fence-stripped `text` from splitFences(), not the
// raw body — otherwise headings written inside fenced code samples (e.g.
// shell comments starting with `##`) would be picked up as real headings.
export function extractHeadings(text) {
  const headings = [];
  for (const m of text.matchAll(/^(##|###)\s+(.+?)\s*$/gm)) {
    let h = m[2];
    // The corpus escapes anchor braces (`\{#anchor\}`), not just `{#anchor}` —
    // strip either form.
    h = h.replace(/\s*\\?\{#[^}]*\\?\}\s*$/, '');
    // ATX headings may be closed with trailing hashes: "## Heading ##".
    h = h.replace(/\s+#+\s*$/, '');
    // Markdown backslash-escapes leading punctuation (e.g. "2\." so a
    // numbered heading isn't parsed as a list item) — undo that escaping.
    h = h.replace(/\\([^\w\s])/g, '$1');
    headings.push(h.trim());
  }
  return headings;
}

export function contentHash(content) {
  return crypto.createHash('sha256').update(content).digest('hex').slice(0, 12);
}

// Narrow hashes: a zone brief depends on an article's structure and API surface,
// not on its prose, so a typo fix or a reworded paragraph produces no drift.
export function shapeHash({ title, headings, sidebars }) {
  // Sorted here (not just by the caller) so the hash is independent of
  // whatever order `sidebars` arrives in — don't remove this as a
  // "redundant" sort; extract.mjs also sorts, but for a different reason
  // (stable JSONL output), not to satisfy this function's contract.
  const payload = JSON.stringify([title ?? '', headings ?? [], [...(sidebars ?? [])].sort()]);
  return crypto.createHash('sha256').update(payload).digest('hex').slice(0, 12);
}

export function apiHash(symbols) {
  const payload = [...new Set(symbols ?? [])].sort().join('\n');
  return crypto.createHash('sha256').update(payload).digest('hex').slice(0, 12);
}

// Guards the "bare call name" pass below against control-flow keywords and
// declaration/builtin words across our 7 SDK languages that happen to be
// followed by "(" (e.g. `if (x)`, `switch (z)`, `init(...)`) so they aren't
// mistaken for real function/method calls.
const CODE_KEYWORDS = new Set([
  'if', 'else', 'for', 'while', 'switch', 'catch', 'return', 'function', 'func',
  'fun', 'def', 'try', 'await', 'async', 'new', 'super', 'init', 'print',
  'println', 'log', 'require', 'import', 'from', 'const', 'let', 'var', 'val',
  'when', 'guard', 'throw', 'throws', 'typeof', 'sizeof', 'assert', 'main',
]);
// Guards against language builtins, self-references, and common
// throwaway-variable names showing up as "symbols" (e.g. `console.log`,
// `this.foo`, `err.message`).
const SYMBOL_PREFIX_STOPLIST = /^(console|window|document|process|json|math|object|array|string|number|promise|this|self|e|err|error|res|req|response|request)\./i;
// Rejects a dotted candidate whose final segment is a URL TLD or a file
// extension, so `adapty.io`, `release-checklist.md`, `strings.xml` etc.
// (picked up from prose URLs/filenames inside fences) aren't mistaken for
// dotted API symbols like `Adapty.activate` or `profile.accessLevels`.
const DOTTED_NOISE_SUFFIXES = new Set([
  'io', 'com', 'org', 'net', 'dev', 'app', 'co',
  'md', 'mdx', 'json', 'yaml', 'yml', 'xml', 'html', 'png', 'jpg', 'jpeg',
  'webp', 'svg', 'gif', 'txt', 'sh', 'dart', 'java', 'kt', 'swift', 'ts',
  'js', 'tsx', 'jsx', 'py', 'rb', 'gradle', 'plist', 'lock',
]);

// Matches a fence marker line for either style CommonMark supports — ``` or
// ~~~ — requiring 3+ of the *same* character. Leading `[ \t]*` tolerates
// fences nested inside numbered-list items (a common pattern in this repo,
// indented 3 spaces) — without it, indented fences are silently invisible
// and their code leaks into prose. Anything after the marker on that line
// is the (optional) info string, e.g. the language or
// `title="..." {2,4-6}` metadata.
//
// The terminator is `(?:\n|$)`, not a bare `\n`: a closing fence on the last
// line of a file with no trailing newline must still count as a marker.
// Requiring `\n` left those fences unclosed and silently dropped their code.
const FENCE_LINE_RE = /^[ \t]*(`{3,}|~{3,})([^\n]*)(?:\n|$)/gm;

export function splitFences(body) {
  const matches = [...body.matchAll(FENCE_LINE_RE)];
  // Track ``` and ~~~ marker occurrences as two independent streams — a
  // fence can only be closed by the same marker type it opened with, so a
  // stray ~~~ line inside a ``` fence (or vice versa) is just code content.
  const byType = { '`': [], '~': [] };
  for (const m of matches) byType[m[1][0]].push(m);

  const fences = [];
  const removals = [];
  let balanced = true;

  for (const type of ['`', '~']) {
    const markers = byType[type];
    // An odd count means the last marker has no partner. Rather than let a
    // stray/unclosed marker chain-pair with whatever the next real fence
    // happens to be (silently inverting code and prose from that point on),
    // leave it — and everything after it — untouched as literal prose.
    if (markers.length % 2 !== 0) balanced = false;
    for (let i = 0; i + 1 < markers.length; i += 2) {
      const open = markers[i];
      const close = markers[i + 1];
      const lang = open[2].trim().split(/\s+/)[0] || '';
      const code = body.slice(open.index + open[0].length, close.index);
      fences.push({ lang, code });
      removals.push([open.index, close.index + close[0].length]);
    }
  }

  removals.sort((a, b) => a[0] - b[0]);
  let text = '';
  let cursor = 0;
  for (const [start, end] of removals) {
    text += body.slice(cursor, start) + '\n';
    cursor = end;
  }
  text += body.slice(cursor);

  return { text, fences, balanced };
}

export function extractSymbols(fences) {
  const symbols = new Set();
  for (const { code } of fences) {
    // Dotted identifiers: Adapty.activate, profile.accessLevels
    for (const m of code.matchAll(/\b[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)+\b/g)) {
      const s = m[0];
      const lastSegment = s.slice(s.lastIndexOf('.') + 1).toLowerCase();
      if (
        !SYMBOL_PREFIX_STOPLIST.test(s) &&
        !/^\d/.test(s) &&
        !DOTTED_NOISE_SUFFIXES.has(lastSegment)
      ) symbols.add(s);
    }
    // Bare call names: getPaywall(...). Lowercasing before the CODE_KEYWORDS
    // lookup is deliberate, language-agnostic tolerance — it means Swift
    // `init(`, C# `Main(`, and `Log(` are never extracted regardless of the
    // casing convention a given SDK language uses. Don't "fix" this to a
    // case-sensitive check.
    for (const m of code.matchAll(/(?:^|[^\w.])([A-Za-z_][\w]*)\s*\(/g)) {
      const name = m[1];
      if (!CODE_KEYWORDS.has(name.toLowerCase())) symbols.add(name);
    }
    // Adapty-prefixed type names anywhere: AdaptyPaywall, AdaptyUI. This
    // intentionally overlaps with the dotted-identifier pass above — e.g.
    // for `AdaptyPurchaseResult.Success` it adds both the bare type name
    // `AdaptyPurchaseResult` *and* (via the dotted pass) the qualified
    // `AdaptyPurchaseResult.Success` — so a grep for either the bare type
    // or the fully-qualified member name finds this article.
    for (const m of code.matchAll(/\bAdapty[A-Za-z]\w*\b/g)) symbols.add(m[0]);
  }
  return [...symbols].sort();
}

export function extractComponents(text) {
  // Inline code spans (`<Key>`, `<USERNAME>`) are placeholder syntax in
  // prose, not real JSX — strip them before scanning for tags.
  const withoutInlineCode = text.replace(/`[^`\n]+`/g, '');
  const components = new Set();
  for (const m of withoutInlineCode.matchAll(/<([A-Z][A-Za-z0-9]*)[\s/>]/g)) components.add(m[1]);
  return [...components].sort();
}

export function extractLinks(text) {
  const links = new Set();
  const addTarget = (target) => {
    // Absolute in-repo doc links (`https://adapty.io/docs/<slug>.md(x)`) are
    // real doc→doc edges — the LLM-integration guides link siblings this
    // way. Every other absolute URL (including llms.txt/llms-full.txt,
    // which aren't .md/.mdx) stays external and is dropped below.
    const absoluteDocMatch = target.match(/^https?:\/\/adapty\.io\/docs\/([^/?#]+\.mdx?)(?:[?#].*)?$/i);
    if (absoluteDocMatch) {
      links.add(absoluteDocMatch[1].replace(/\.(md|mdx)$/i, ''));
      return;
    }
    if (/^(https?:|mailto:|#)/.test(target)) return;
    const pathOnly = target.split('#')[0];
    // API-reference operation links (`api-adapty/operations/<id>`,
    // `api-web/operations/<id>`) don't resolve to any .mdx file, and the
    // operationId often collides with a real SDK method name (e.g.
    // getPaywall) — tag it distinctly instead of letting it masquerade as
    // a doc id that grep-for-symbol can't tell apart from the real one.
    const apiOpMatch = pathOnly.match(/(?:^|\/)(api-adapty|api-web)\/operations\/([^/]+)\/?$/);
    if (apiOpMatch) {
      links.add(`api:${apiOpMatch[2]}`);
      return;
    }
    const base = pathOnly.split('/').filter(Boolean).pop();
    if (!base) return;
    // A remaining extension that isn't .md/.mdx marks an asset or spec
    // (image, yaml, json, etc.), not a doc id — drop it.
    const extMatch = base.match(/\.([A-Za-z0-9]+)$/);
    if (extMatch && !/^mdx?$/i.test(extMatch[1])) return;
    links.add(base.replace(/\.(md|mdx)$/, ''));
  };
  // Leading `(!?)` captures whether this is markdown image syntax
  // `![alt](...)` — those point at assets, not doc articles, so skip them.
  // Only bare `[text](...)` links point at other doc articles.
  for (const m of text.matchAll(/(!?)\[[^\]]*\]\(([^)\s]+)\)/g)) {
    if (m[1] === '!') continue;
    addTarget(m[2]);
  }
  // `(?<![\w-])` rejects `data-id="..."` (the char right before "id" would
  // be "-"); either quote style is accepted, with the closing quote
  // required to match the opening one via the `\1` backreference.
  for (const m of text.matchAll(/<Button\s+[^>]*(?<![\w-])id=(["'])([^"']+)\1/g)) links.add(m[2]);
  for (const m of text.matchAll(/<CustomDocCardList\s+[^>]*ids=\{\[([^\]]*)\]\}/g)) {
    for (const idm of m[1].matchAll(/['"]([^'"]+)['"]/g)) links.add(idm[1]);
  }
  return [...links].sort();
}

// Everything downstream keys records by id — Maps, drift snapshots, brief
// references — so two records sharing one id do not error, they silently
// overwrite each other. Worth a hard failure: `web-api.mdx` and `web-api.yaml`
// collided exactly this way the first time specs entered the map.
export function duplicateIds(records) {
  const byId = new Map();
  for (const r of records) {
    if (!byId.has(r.id)) byId.set(r.id, []);
    byId.get(r.id).push(r.path);
  }
  return [...byId.entries()]
    .filter(([, paths]) => paths.length > 1)
    .map(([id, paths]) => `${id} -> ${paths.sort().join(', ')}`)
    .sort();
}

// A published OpenAPI spec belongs to the corpus even though it is not an
// article: for the server-side and web APIs the spec *is* the reference, so an
// endpoint change is a docs change. The narrow hashes map over cleanly — URL
// paths play the part of headings (shape_hash moves when an endpoint is added
// or removed) and operationIds the part of code symbols (api_hash moves when one
// is renamed). `name` is the label from api-reference/config.json, used only
// when the spec omits `info.title`.
export function parseSpec({ id, relPath, content, name }) {
  let doc;
  try { doc = yaml.load(content) ?? {}; }
  catch (err) { throw new Error(`${relPath} is not valid YAML: ${err.message}`); }
  const paths = Object.keys(doc.paths ?? {}).sort();
  const operations = [];
  for (const item of Object.values(doc.paths ?? {})) {
    // A path item also carries non-operation keys (`parameters`, `summary`),
    // so the operationId presence check is what selects real operations.
    for (const op of Object.values(item ?? {})) {
      if (op && typeof op === 'object' && op.operationId) operations.push(String(op.operationId));
    }
  }
  const symbols = [...new Set(operations)].sort();
  const title = doc.info?.title ?? name ?? id;
  return {
    id,
    kind: 'spec',
    path: relPath,
    // A spec is reachable at its own route (`/docs/api-adapty`), it just is not
    // a sidebar doc entry — so `sidebars` is empty while `orphan` is false, and
    // that is precisely what makes the partition demand a zone for it.
    sidebars: [],
    orphan: false,
    draft: false,
    title,
    description: doc.info?.description?.split('\n')[0].trim() || null,
    slug: null,
    headings: paths,
    symbols,
    components: [],
    links: [],
    content_hash: contentHash(content),
    shape_hash: shapeHash({ title, headings: paths, sidebars: [] }),
    api_hash: apiHash(symbols),
  };
}
