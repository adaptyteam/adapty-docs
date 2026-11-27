/**
 * Where each SDK platform's entry in the platform switcher leads from a given
 * page: the same topic on the other platform when one exists, otherwise that
 * platform's overview. Computed at build time; the links are plain hrefs.
 *
 * Matching runs on the raw sidebar JSON, so a page matches across platforms
 * only through a `label` written in the sidebar file.
 */
import platformsData from '../data/platforms.json';

type SidebarItem = {
    type?: string;
    id?: string;
    label?: string;
    link?: { id?: string };
    items?: SidebarItem[];
};

const sidebarModules = import.meta.glob<{ default: SidebarItem[] }>('../data/sidebars/*.json', { eager: true });

function sidebarOf(platformId: string): SidebarItem[] {
    const platform = platformsData.sdkPlatforms.find((p) => p.id === platformId);
    return platform ? sidebarModules[`../data/sidebars/${platform.sidebar}`]?.default ?? [] : [];
}

function findByActiveId(items: SidebarItem[], activeId: string): SidebarItem | undefined {
    for (const item of items) {
        if (item.id && (item.id === activeId || item.id.endsWith(activeId))) return item;
        const linkId = item.link?.id;
        if (linkId && (linkId === activeId || linkId.endsWith(activeId))) return item;
        const found = item.items && findByActiveId(item.items, activeId);
        if (found) return found;
    }
}

function findIdByLabel(items: SidebarItem[], label: string): string | undefined {
    for (const item of items) {
        if (item.label === label && item.type === 'doc' && item.id) return item.id;
        if (item.label === label && item.type === 'category' && item.link?.id) return item.link.id;
        const found = item.items && findIdByLabel(item.items, label);
        if (found) return found;
    }
}

const isOverviewId = (id: string) => /overview|intro/.test(id.toLowerCase());

function findFirstDocId(items: SidebarItem[]): string | undefined {
    for (const item of items) {
        if (item.type === 'doc' && item.id) return item.id;
        const found = item.items && findFirstDocId(item.items);
        if (found) return found;
    }
}

/** The first page whose id says "overview" or "intro", else the first page. */
function findOverviewId(items: SidebarItem[]): string | undefined {
    const search = (list: SidebarItem[]): string | undefined => {
        for (const item of list) {
            const id = item.id || item.link?.id;
            if (id && isOverviewId(id)) return id;
            const found = item.items && search(item.items);
            if (found) return found;
        }
    };
    return search(items) ?? findFirstDocId(items);
}

function targetId(currentPlatformId: string, activeId: string, targetPlatformId: string): string {
    const target = sidebarOf(targetPlatformId);
    const isCurrentOverview = isOverviewId(activeId) || activeId === 'what-is-adapty';

    if (isCurrentOverview) {
        const overview = findOverviewId(target);
        if (overview) return overview;
    }

    const currentLabel = findByActiveId(sidebarOf(currentPlatformId), activeId)?.label;
    const sameTopic = currentLabel && findIdByLabel(target, currentLabel);
    if (sameTopic) return sameTopic;

    return findOverviewId(target) ?? `${targetPlatformId}-sdk-overview`;
}

/** platform id → href of its switcher entry, for the page `activeId` on `currentPlatformId`. */
export function getPlatformSwitchLinks(
    currentPlatformId: string,
    activeId: string,
    locale?: string,
): Record<string, string> {
    const base = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${locale && locale !== 'en' ? `${locale}/` : ''}`;
    return Object.fromEntries(
        platformsData.sdkPlatforms.map((p) => [p.id, base + targetId(currentPlatformId, activeId, p.id)]),
    );
}
