// Expands a ~40-row sidebar category → zone map into the 719 individual
// article → zone assignments the mill actually needs, plus two small
// heuristics for SDK-specific metadata (family, migration version).
//
// Heuristics live here and nowhere else. The renderer (roster.mjs) and the
// validator read only declared values from zones.json —
// a heuristic in that path would be fragile, and this corpus is exactly
// where it would break: filenames are frozen for SEO while content moves on
// (`paywall-layout-and-products` is titled "Screens and layers",
// `paywall-builder-templates` is "Create a flow"). So proposals key off
// sidebar position, never off the filename, and every proposal is a
// suggestion a human confirms — never a silent write.

import { PLATFORMS } from './roster.mjs';

// Every article's position in every sidebar that lists it, as a label path.
// A category's own link-doc (its "overview" article, e.g. `adapty-flow-builder`
// for the "Flows (Beta)" category) is recorded at the SAME path as its
// siblings — the path including the category's own label — not at the
// parent's path. It reads "at" that category, same depth as everything else
// inside it, so a category → zone rule also covers the category's overview
// page instead of silently missing it.
export function categoryPaths(sidebars) {
  const paths = new Map();
  const record = (id, sidebar, path, isCategoryLanding) => {
    if (!paths.has(id)) paths.set(id, []);
    paths.get(id).push({ sidebar, path: [...path], isCategoryLanding });
  };
  const walk = (items, sidebar, path) => {
    for (const item of items) {
      if (item.type === 'category') {
        const id = item.link?.type === 'doc' ? item.link.id : item.id;
        const childPath = [...path, item.label];
        if (id) record(id, sidebar, childPath, true);
        if (item.items) walk(item.items, sidebar, childPath);
      } else if (item.type === 'doc' && item.id) {
        record(item.id, sidebar, path, false);
      }
    }
  };
  for (const [sidebar, items] of Object.entries(sidebars)) walk(items, sidebar, []);
  return paths;
}

// Role heuristics, in priority order. Every case except the first needs a
// human's judgment, so this proposes null ("a human decides") rather than
// guessing — in particular it never defaults to `how-to`: a wrong role is
// invisible once written, and `reference` vs `how-to` is exactly the
// distinction the briefs need to be right about.
//   1. A category's own landing page (reached via the category's `link.id`
//      or `id`, recorded as isCategoryLanding above) -> `entry`. This is the
//      one role that genuinely follows from position.
//   2. An id matching /migrat/i -> `migration`.
//   3. Otherwise -> null.
export function proposeRole(id, placements) {
  if (placements.some(p => p.isCategoryLanding)) return 'entry';
  if (/migrat/i.test(id)) return 'migration';
  return null;
}

// Deepest match wins, so "Flows (Beta) > Elements" can send elements somewhere
// different from the rest of Flows without restating the parent.
// A rule key is either a bare category path ("Flows (Beta) > Elements") or one
// scoped to a sidebar ("unity:Paywalls"). Scoping is not optional decoration:
// the label `Paywalls` exists in BOTH the tutorial sidebar (legacy dashboard
// paywalls) and the unity one (SDK paywall display), so a single bare rule would
// send Unity's SDK articles into the legacy dashboard zone. At equal depth a
// scoped rule beats a bare one; deeper always beats shallower.
export function proposeZones(paths, map) {
  const out = new Map();
  for (const [id, placements] of paths) {
    if (map.overrides?.[id]) { out.set(id, { zone: map.overrides[id], via: 'override' }); continue; }
    let best = { zone: null, via: null, depth: -1, scoped: false };
    const atBest = new Set();
    for (const { path, sidebar } of placements) {
      for (let i = path.length; i > 0; i--) {
        const key = path.slice(0, i).join(' > ');
        for (const [candidate, scoped] of [[`${sidebar}:${key}`, true], [key, false]]) {
          const zone = map.categories?.[candidate];
          if (!zone) continue;
          if (i > best.depth || (i === best.depth && scoped && !best.scoped)) {
            best = { zone, via: candidate, depth: i, scoped };
            atBest.clear();
            atBest.add(zone);
          } else if (i === best.depth && scoped === best.scoped) {
            atBest.add(zone);
          }
        }
      }
    }
    // An article listed in two sidebar categories of equal depth that map to
    // different zones is a genuine judgment call, not something to settle by
    // iteration order. This corpus reuses one file in two navigations on
    // purpose — a legacy category and its flow-era replacement both list it, to
    // keep old links alive — so the tie is a fact about the docs, and picking a
    // winner silently would hide a decision. Report it and let a human resolve
    // it with an override.
    const tie = atBest.size > 1 ? [...atBest].sort() : null;
    out.set(id, { zone: best.zone, via: best.via, ...(tie ? { tie } : {}) });
  }
  return out;
}

// Audience follows the zone, not the article: everything in `analytics` is read
// by the same people. Defaults live in zone-map.json so a zone's audience is
// stated once instead of 37 times.
export function proposeAudience(zone, map) {
  const value = map.audiences?.[zone];
  return Array.isArray(value) ? value : [];
}

const PLATFORM_TOKENS = [...PLATFORMS, 'reactnative', 'rn', 'kotlin-multiplatform'];

// Strips a platform token wherever it sits in the id (prefix, suffix, or
// mid-word like `migration-to-react-native-sdk-34`), so siblings across all
// 7 platforms collapse onto one family key.
export function proposeFamily(id) {
  let out = id;
  for (const token of PLATFORM_TOKENS) {
    out = out.replace(new RegExp(`(^|[-_])${token}([-_]|$)`, 'g'), '$1$2');
  }
  return out.replace(/[-_]{2,}/g, '-').replace(/^[-_]|[-_]$/g, '') || id;
}

// Only patterns actually present in the 49 migration guides. Anything else
// returns null: an empty cell the validator flags beats a wrong row in the
// grid.
//
// The corpus mixes two different 3-digit encodings and there is no separator
// that tells them apart — only the digits themselves do, against the actual
// minor versions this SDK has shipped (3.3, 3.4, 3.8, 3.10, 3.12, 3.14, 3.15,
// 3.16, 4.0; verified against real article titles):
//   - `ios330` / `guide-380` -> 3.3 / 3.8: a single-digit minor with a
//     trailing padding zero.
//   - `ios-315` / `guide-310` -> 3.15 / 3.10: a genuine two-digit minor in
//     the 10-19 range.
// The distinguishing feature is the tens digit: this corpus's two-digit
// minors all start with 1 (10, 12, 14, 15, 16), so "tens digit is 1" keeps
// both digits; a trailing zero with any other tens digit is padding.
export function proposeVersion(id) {
  if (!/migrat/i.test(id)) return null;
  const vMajor = id.match(/[-_]v(\d+)$/);
  if (vMajor) return `${vMajor[1]}.0`;
  const digits = id.match(/(\d{2,3})$/);
  if (digits) {
    const d = digits[1];
    if (d.length === 2) return `${d[0]}.${d[1]}`;
    const [major, tens, ones] = d;
    if (ones === '0' && tens !== '1') return `${major}.${tens}`;
    return `${major}.${tens}${ones}`;
  }
  const dotted = id.match(/(\d+)\.(\d+)/);
  if (dotted) return `${dotted[1]}.${dotted[2]}`;
  return null;
}
