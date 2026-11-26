/**
 * Turns sidebar JSON (src/data/sidebars) into render-ready trees: labels filled
 * from article titles, hrefs resolved (custom slugs included), and, for
 * translated pages, labels replaced from the locale's _sidebar-labels.json.
 *
 * Used by Sidebar.astro for the desktop nav and by the sidebars.json
 * endpoints for the mobile menu, so both render the same tree.
 */
import { getCollection } from 'astro:content';
import platformsData from '../data/platforms.json';

export type SidebarItem = Record<string, any>;

type DocLookups = { titles: Map<string, string | undefined>; slugs: Map<string, string> };

let lookupsPromise: Promise<DocLookups> | null = null;

/**
 * Article titles and custom slugs, keyed by full id and by basename. Built once
 * per production build; rebuilt per request in dev so title edits show up.
 */
export function getDocLookups(): Promise<DocLookups> {
    if (import.meta.env.DEV) lookupsPromise = null;
    lookupsPromise ??= getCollection('docs').then((allDocs) => {
        const titles = new Map<string, string | undefined>();
        const slugs = new Map<string, string>();
        for (const doc of allDocs) {
            if (!doc.id || typeof doc.id !== 'string') continue;
            const idWithoutExt = doc.id.replace(/\.(md|mdx)$/, '');
            const basename = idWithoutExt.split('/').pop();

            titles.set(idWithoutExt, doc.data.title);
            if (basename) titles.set(basename, doc.data.title);

            if (doc.data.customSlug) {
                slugs.set(idWithoutExt, doc.data.customSlug);
                if (basename) slugs.set(basename, doc.data.customSlug);
            }
        }
        return { titles, slugs };
    });
    return lookupsPromise;
}

export function transformItems(items: SidebarItem[], lookups: DocLookups): SidebarItem[] {
    const { titles, slugs } = lookups;
    const base = import.meta.env.BASE_URL; // e.g. "/docs/"
    return items.map((item) => {
        const newItem = { ...item };

        // If label is missing or empty, fetch from frontmatter
        if (item.type === 'doc' && item.id && (!item.label || item.label.trim() === '')) {
            const title = titles.get(item.id);
            if (title) newItem.label = title;
        }

        // Handle category with link but no label (either link.id or direct id)
        if (item.type === 'category' && (!item.label || item.label.trim() === '')) {
            const linkId = item.link?.id || item.id;
            if (linkId) {
                const title = titles.get(linkId);
                if (title) newItem.label = title;
            }
        }

        // Generate href, using custom slug if available
        if (item.type === 'doc' && item.id && !item.href) {
            const customSlug = slugs.get(item.id);
            newItem.href = `${base}${customSlug || `/${item.id}`}`.replace(/\/+/g, '/');
        }

        // Handle explicit links: /api-adapty -> /docs/api-adapty
        if (item.type === 'link' && item.href && item.href.startsWith('/')) {
            const normalizedBase = base.endsWith('/') ? base : `${base}/`;
            if (!item.href.startsWith(normalizedBase) && item.href !== base && item.href !== normalizedBase.slice(0, -1)) {
                newItem.href = `${normalizedBase}${item.href.startsWith('/') ? item.href.slice(1) : item.href}`;
            }
            newItem.href = newItem.href.replace(/\/+/g, '/');
        }

        // Handle category with link (either link.id or direct id)
        if (item.type === 'category' && !item.href) {
            const linkId = item.link?.id || item.id;
            if (linkId) {
                const customSlug = slugs.get(linkId);
                newItem.href = `${base}${customSlug || `/${linkId}`}`.replace(/\/+/g, '/');
            }
        }

        if (item.items) newItem.items = transformItems(item.items, lookups);
        return newItem;
    });
}

const sidebarModules = import.meta.glob<{ default: SidebarItem[] }>('../data/sidebars/*.json', { eager: true });
const labelModules = import.meta.glob<{ default: Record<string, { value: string }> }>(
    '../locales/*/_sidebar-labels.json',
    { eager: true },
);

function applyLabels(items: SidebarItem[], labels: Record<string, { value: string }>): SidebarItem[] {
    return items.map((item) => {
        const id = item.id || item.link?.id;
        const translated = id ? labels[id] : null;
        const translatedCategory = item.label ? labels[item.label] : null;
        return {
            ...item,
            label: translated?.value ?? translatedCategory?.value ?? item.label,
            items: item.items ? applyLabels(item.items, labels) : undefined,
        };
    });
}

export type MobileSidebars = {
    tutorial: SidebarItem[];
    api: SidebarItem[];
    sdk: Record<string, SidebarItem[]>;
};

/** Every tree the mobile menu can show, for one locale ('en' or a locale code). */
export async function getMobileSidebars(locale: string): Promise<MobileSidebars> {
    const lookups = await getDocLookups();
    const labels = locale !== 'en' ? labelModules[`../locales/${locale}/_sidebar-labels.json`]?.default ?? {} : {};
    const hasLabels = Object.keys(labels).length > 0;
    const tree = (file: string) => {
        const items = transformItems(sidebarModules[`../data/sidebars/${file}`]?.default ?? [], lookups);
        return hasLabels ? applyLabels(items, labels) : items;
    };

    return {
        tutorial: tree('tutorial.json'),
        api: tree('api.json'),
        sdk: Object.fromEntries(platformsData.sdkPlatforms.map((p) => [p.id, tree(p.sidebar)])),
    };
}

/** URL of the JSON the mobile menu fetches; see src/pages/sidebars.json.ts. */
export function mobileSidebarsUrl(locale?: string): string {
    const base = import.meta.env.BASE_URL.replace(/\/$/, '');
    return locale && locale !== 'en' ? `${base}/${locale}/sidebars.json` : `${base}/sidebars.json`;
}
