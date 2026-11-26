// Merges the seven SDK sidebars into one tree for the combined llms.txt, so
// a topic that exists on every platform is listed once with a link per
// platform instead of seven times:
//
//   - Handle events — [iOS](…/ios-handling-events.md) · [Android](…) · …
//
// Two entries from different platforms are the same topic when they sit
// under the same merged parent and either their doc ids match once the
// platform token is removed (`ios-handling-events` ~ `handling-events-android`)
// or their sidebar labels match (`migration-to-ios330` ~ `migration-to-android330`,
// both "Migrate to v3.3"). An entry with no match is inserted right after
// the last entry its own platform matched, so each platform's order survives.

const PLATFORM_TOKENS = {
    ios: ['ios'],
    android: ['android'],
    'react-native': ['react-native', 'reactnative', 'rn'],
    flutter: ['flutter'],
    unity: ['unity'],
    kmp: ['kotlin-multiplatform', 'kmp'],
    capacitor: ['capacitor'],
};

export function normalizeId(id, platformId) {
    if (!id) return null;
    let key = `-${id}-`;
    for (const token of PLATFORM_TOKENS[platformId] ?? [platformId]) {
        key = key.split(`-${token}-`).join('-');
    }
    return key.replace(/^-+|-+$/g, '') || null;
}

function itemId(item) {
    if (item.type === 'category') return item.link?.type === 'doc' ? item.link.id : (item.id ?? null);
    if (item.type === 'doc') return item.id;
    return null;
}

function itemKind(item) {
    return item.type === 'category' ? 'category' : 'leaf';
}

// `sidebars`: [{ platformId, items }] in the order platforms should appear.
// Returns a tree of nodes: { kind, entries: Map<platformId, item>, children }.
export function mergeSdkSidebars(sidebars) {
    const root = [];

    // A page on one platform can match a category on another: React Native
    // splits "Install & configure" into Expo and Pure React Native children.
    function findMatch(nodes, item, platformId) {
        const free = nodes.filter(n => !n.entries.has(platformId));
        const key = normalizeId(itemId(item), platformId);
        if (key) {
            const byId = free.find(n => n.keys.has(key));
            if (byId) return byId;
        }
        if (item.type === 'link') {
            const byHref = free.find(n => [...n.entries.values()].some(e => e.href === item.href));
            if (byHref) return byHref;
        }
        return free.find(n => [...n.entries.values()].some(e => e.label && e.label === item.label));
    }

    function mergeInto(nodes, items, platformId) {
        let cursor = -1;
        for (const item of items) {
            if (!['category', 'doc', 'link'].includes(item.type)) continue;
            let node = findMatch(nodes, item, platformId);
            if (node) {
                cursor = Math.max(cursor, nodes.indexOf(node));
            } else {
                node = { kind: itemKind(item), entries: new Map(), keys: new Set(), children: [] };
                nodes.splice(cursor + 1, 0, node);
                cursor += 1;
            }
            node.entries.set(platformId, item);
            if (itemKind(item) === 'category') node.kind = 'category';
            const key = normalizeId(itemId(item), platformId);
            if (key) node.keys.add(key);
            if (item.type === 'category' && item.items) mergeInto(node.children, item.items, platformId);
        }
    }

    for (const { platformId, items } of sidebars) mergeInto(root, items, platformId);
    return root;
}

// Picks the label most platforms use; on a tie, the first platform's.
function pickLabel(node, translate) {
    const counts = new Map();
    for (const item of node.entries.values()) {
        const label = translate(item);
        if (label) counts.set(label, (counts.get(label) ?? 0) + 1);
    }
    let best = null;
    for (const [label, count] of counts) if (best === null || count > counts.get(best)) best = label;
    return best;
}

// Renders the merged tree as llms.txt lines: titles only, one line per topic,
// one link per platform. Top-level categories become `###` headings.
// `ctx`: { platforms: [{ id, label }], baseUrl, urlPrefix, noindexDocIds, translate }
export function renderMergedSdk(nodes, ctx, depth = 0) {
    const { platforms, baseUrl, urlPrefix, noindexDocIds, translate } = ctx;
    const indent = '  '.repeat(Math.max(0, depth - 1));
    let out = '';

    const links = (node) => platforms
        .filter(p => node.entries.has(p.id))
        .map(p => {
            const item = node.entries.get(p.id);
            if (item.type === 'link') return `[${p.label}](${item.href})`;
            const id = itemId(item);
            if (!id || noindexDocIds.has(id)) return null;
            return `[${p.label}](${baseUrl}${urlPrefix}/${id}.md)`;
        })
        .filter(Boolean)
        .join(' · ');

    for (const node of nodes) {
        const label = pickLabel(node, translate);
        const nodeLinks = links(node);
        if (node.kind === 'category') {
            if (depth === 0) {
                out += `\n### ${label}\n\n`;
                if (nodeLinks) out += `- Overview — ${nodeLinks}\n`;
            } else {
                out += `${indent}- **${label}**${nodeLinks ? ` — ${nodeLinks}` : ''}\n`;
            }
            out += renderMergedSdk(node.children, ctx, depth + 1);
        } else if (nodeLinks) {
            out += `${indent}- ${label} — ${nodeLinks}\n`;
        }
    }
    return out;
}
