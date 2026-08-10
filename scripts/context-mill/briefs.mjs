import { parseFrontmatter, splitFences } from './lib.mjs';

// Exact strings, in order. The validator and the roster renderer both match on
// them, so renaming a section here is a breaking change to every brief.
export const REQUIRED_SECTIONS = [
  'What this is',
  'Surfaces',
  'Sources of truth',
  "What we document, what we don't",
  'Articles',
  'Reader jobs',
  'Ripple rules',
  'Boundaries',
  'Ticket language',
  'Gaps and misses',
];

// Sections that must have prose for a brief to count as complete rather than a
// bootstrap stub. `Articles` is excluded — the script fills it.
const JUDGMENT_SECTIONS = [
  'What this is', 'Surfaces', 'Sources of truth', "What we document, what we don't",
  'Reader jobs', 'Ripple rules', 'Boundaries',
];

// Headings are detected in fence-stripped text: a brief can legitimately contain
// a fenced markdown sample with a `##` line in it, and treating that as a real
// section would both fake a section's presence and truncate the section it sits in.
// This mirrors the contract `extractHeadings` in lib.mjs already documents.
export function parseBrief(text) {
  const { fm, body } = parseFrontmatter(text);
  const prose = splitFences(body).text;
  const sections = [...prose.matchAll(/^##\s+(.+?)\s*$/gm)].map(m => m[1]);
  return { fm, body, prose, sections };
}

export function missingSections(text) {
  const present = new Set(parseBrief(text).sections);
  return REQUIRED_SECTIONS.filter(s => !present.has(s));
}

// sectionBody needs two different views of the same text at once: heading
// *positions* must come from the fence-stripped view (so a `##`-looking line
// inside a fenced sample is never mistaken for a section boundary), but the
// section *content* has to come from the untouched body — otherwise a section
// whose entire content is a legitimate fenced block (a `diff` sample under
// "Ripple rules", a markdown sample under "What we document, what we don't")
// gets sliced from text that already erased that fence, and measures as ''.
// splitFences() collapses each fenced range into a single newline rather than
// blanking it in place, so its stripped text's offsets don't line up with the
// raw body — we can't reuse its indices directly. This local range-finder
// mirrors splitFences' ``` / ~~~ pairing rules but reports offsets instead of
// collapsing them, so real headings can be located and then sliced out of the
// raw body.
const FENCE_MARKER_RE = /^[ \t]*(`{3,}|~{3,})([^\n]*)(?:\n|$)/gm;

function fencedRanges(body) {
  const markers = [...body.matchAll(FENCE_MARKER_RE)];
  const byType = { '`': [], '~': [] };
  for (const m of markers) byType[m[1][0]].push(m);
  const ranges = [];
  for (const type of ['`', '~']) {
    const list = byType[type];
    for (let i = 0; i + 1 < list.length; i += 2) {
      ranges.push([list[i].index, list[i + 1].index + list[i + 1][0].length]);
    }
  }
  return ranges.sort((a, b) => a[0] - b[0]);
}

// Real (non-fenced) `## Heading` matches with offsets into the untouched
// body — the raw-body counterpart of parseBrief's fence-stripped `sections`.
function realHeadingMatches(body) {
  const ranges = fencedRanges(body);
  return [...body.matchAll(/^##\s+(.+?)\s*$/gm)]
    .filter(m => !ranges.some(([start, end]) => m.index >= start && m.index < end));
}

// Body text of one `## Section`, up to the next real `##` or end of file.
export function sectionBody(text, name) {
  const { body } = parseBrief(text);
  const headings = realHeadingMatches(body);
  const idx = headings.findIndex(m => m[1] === name);
  if (idx === -1) return '';
  const start = headings[idx].index + headings[idx][0].length;
  const end = idx + 1 < headings.length ? headings[idx + 1].index : body.length;
  return body.slice(start, end).trim();
}

export function isStub(text) {
  return JUDGMENT_SECTIONS.some(name => {
    const content = sectionBody(text, name);
    return content === '' || /^placeholder\.?$/i.test(content);
  });
}

// A brief has three states, and the middle one is the reason this exists: an
// agent can fill every judgment section without anyone having checked a word of
// it. That brief is no longer a stub, but it carries no human judgment either —
// and reporting it with no note at all (which is what happened before) makes a
// draft look exactly like reviewed work. `stub` wins when sections are empty,
// because an accidental review stamp on an empty brief is a bug, not a state.
export function briefState({ stub, reviewedAt }) {
  if (stub) return 'stub';
  if (!reviewedAt) return 'drafted, unreviewed';
  return `reviewed_at: ${reviewedAt}`;
}

export function replaceAutoBlock(text, name, content) {
  const open = `<!-- mill:auto:${name} -->`;
  const close = '<!-- /mill:auto -->';
  const start = text.indexOf(open);
  if (start === -1) throw new Error(`no mill:auto:${name} block`);
  const end = text.indexOf(close, start + open.length);
  if (end === -1) throw new Error(`unclosed mill:auto:${name} block`);
  return `${text.slice(0, start + open.length)}\n${String(content).trim()}\n${text.slice(end)}`;
}

// Doc ids are lowercase, hyphenated, and contain no dots, parens, or
// underscores — which excludes code symbols (`Adapty.activate()`) and field
// names (`price_local`) that also appear in backticks.
//
// KNOWN AND DELIBERATE GAPS, both the same trade and both accepted:
//
// 1. Underscores. Two real article ids use them, `initial_ios` and
//    `run_stop_ab_tests`, so references to those two go unchecked. Admitting
//    underscores would fix that at a bad price — the briefs backtick 25+
//    underscored *field* names (`price_usd`, `profile_event_id`,
//    `event_datetime`, `apple_search_ads`, …), every one of which would then
//    report as a dangling id. Two checkable ids is not worth 25 false alarms.
// 2. Dots. The four API specs are corpus members whose ids carry an extension
//    (`adapty-api.yaml`), and the dot rule that keeps `Adapty.activate()` out
//    also keeps them out. Admitting dots would pull in every dotted symbol.
//
// Both sets are small and closed, so they are verified by hand instead: done
// 2026-08-10 across all 34 briefs — the 2 underscore ids and all 4 spec ids are
// spelled correctly everywhere they appear. Re-check by hand when adding a brief.
// Note an endpoint deep-link like `api-adapty/operations/updatePaywall` is
// likewise invisible (slashes, capitals), so it needs no un-backticking.
const ID_SHAPED = /^[a-z0-9][a-z0-9-]{2,}$/;
// Ticket language belongs here as much as the other two: it is a table whose
// right-hand column is nothing but article ids and family names, so it is the
// densest source of ids in a brief. Leaving it out meant every destination
// written there went unchecked, which is precisely the typo this guard exists
// to catch.
const ID_SECTIONS = ['Reader jobs', 'Ripple rules', 'Ticket language'];

// A backticked, lowercase, hyphenated token is not necessarily an article id, and
// a real brief is full of counter-examples: a written brief cites commits as
// evidence (`c65300c71`), names neighbouring zones (`sdk-flows-display`), and
// mentions code-fence languages (`diff`). All of those are id-shaped. Anything
// reported as a dangling article id when it is really one of these is a false
// alarm, and a permanently red report is one nobody reads — so filter here.
//
// Git object names: hex-only and at least 7 chars. `deadbeef` would be a false
// exclusion, but no article in this corpus is named in hex.
const GIT_SHA = /^[0-9a-f]{7,40}$/;

// Ticket language brought two whole classes of id-shaped non-ids, both a direct
// consequence of what that section is for: its left column quotes the reader's
// own words. A pasted error code (`1000`, `3001`, `103`) is all digits, and the
// "`mail-` prefix" shorthand ends in a hyphen. Neither can name an article.
const ERROR_CODE = /^[0-9]+$/;
const PREFIX_STUB = /-$/;

// Markup and language words that appear in backticks in prose about docs.
const MARKUP_WORDS = new Set([
  'diff', 'json', 'yaml', 'yml', 'bash', 'shell', 'md', 'mdx', 'jsx', 'tsx',
  'swift', 'kotlin', 'dart', 'java', 'javascript', 'typescript', 'csharp',
  'entry', 'how-to', 'reference', 'conceptual', 'migration', 'legacy-orphan',
  'dev', 'marketer', 'analyst', 'support',
  'flat', 'sdk-matrix', 'version-matrix',
  // Bare SDK method names, written without the `Adapty.` prefix or parentheses
  // that would otherwise disqualify them.
  'activate', 'identify', 'logout', 'register',
  // Field, payload and status words quoted from a ticket or a response body.
  'detail', 'format', 'null', 'draft', 'email', 'locale', 'cid', 'organic',
  'channel', 'payload', 'amount', 'price', 'value', 'error', 'date', 'data',
  'offer', 'store', 'subscription', 'metadata',
  // Access-level and other configured identifiers a reader types verbatim.
  'premium',
  // HTTP header names: lowercase and hyphenated, so shape alone cannot tell them
  // apart from an article id — they have to be excluded by name.
  'adapty-customer-user-id', 'adapty-profile-id',
  // Plural concepts that read like ids but name no article.
  'flows', 'audiences',
  // External package and skill-repo names, not articles in this corpus.
  'adapty-cli', 'adapty-sdk-integration', 'expo-secure-store',
]);

export function referencedArticleIds(text) {
  const ids = new Set();
  for (const name of ID_SECTIONS) {
    for (const m of sectionBody(text, name).matchAll(/`([^`\n]+)`/g)) {
      const token = m[1];
      if (!ID_SHAPED.test(token)) continue;
      if (GIT_SHA.test(token) || MARKUP_WORDS.has(token)) continue;
      if (ERROR_CODE.test(token) || PREFIX_STUB.test(token)) continue;
      ids.add(token);
    }
  }
  return [...ids].sort();
}

// A scaffold is deliberately a stub: `mill:status` will keep reporting it as one
// until the judgment sections are filled, which is the honest state of a zone
// nobody has thought about yet.
export function briefTemplate(zoneId) {
  const body = REQUIRED_SECTIONS.map(name => (
    name === 'Articles'
      ? `## Articles\n<!-- mill:auto:roster -->\n<!-- /mill:auto -->`
      : `## ${name}\n`
  )).join('\n');
  return `---\nzone: ${zoneId}\nsources: []\nreviewed_shape:\nreviewed_at:\n---\n\n${body}\n`;
}
