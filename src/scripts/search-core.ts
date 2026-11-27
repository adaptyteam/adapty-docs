/**
 * Search logic shared by the header search (search.ts) and the mobile search
 * overlay (DocsLayout.astro). Both read the Algolia credentials from the data
 * attributes on the header's #search-input.
 *
 * The Algolia client is imported on first use, so pages where nobody searches
 * never download it.
 */

export interface SearchHit {
    objectID: string;
    url: string;
    description?: string;
    hierarchy: Partial<Record<'lvl0' | 'lvl1' | 'lvl2' | 'lvl3' | 'lvl4' | 'lvl5' | 'lvl6', string>>;
}

export interface SearchConfig {
    appId: string;
    apiKey: string;
    analyticsKey: string;
    indexName: string;
}

/** Reads credentials fresh each time: the header syncs data-index-name on locale change. */
export function readSearchConfig(): SearchConfig | null {
    const input = document.getElementById('search-input') as HTMLInputElement | null;
    const { appId, apiKey, analyticsKey, indexName } = input?.dataset ?? {};
    if (!appId || !apiKey || !indexName) return null;
    return { appId, apiKey, analyticsKey: analyticsKey || apiKey, indexName };
}

type Client = ReturnType<typeof import('algoliasearch/lite').liteClient>;
let clientPromise: Promise<Client> | null = null;

function getClient(appId: string, apiKey: string): Promise<Client> {
    clientPromise ??= import('algoliasearch/lite').then(({ liteClient }) => liteClient(appId, apiKey));
    return clientPromise;
}

/** Starts downloading the client ahead of the first query, e.g. on focus. */
export function preloadSearchClient() {
    const config = readSearchConfig();
    if (config) void getClient(config.appId, config.apiKey);
}

/** Anonymous token that ties click events to the searches they came from. */
function getUserToken(): string {
    const key = 'algolia_user_token';
    try {
        let token = localStorage.getItem(key);
        if (!token) {
            token = 'user-' + Math.random().toString(36).substring(2, 15);
            localStorage.setItem(key, token);
        }
        return token;
    } catch {
        return 'user-anonymous';
    }
}

export async function searchDocs(query: string) {
    const config = readSearchConfig();
    if (!config) return null;
    const client = await getClient(config.appId, config.apiKey);
    const { results } = await client.search([
        {
            indexName: config.indexName,
            params: {
                query,
                hitsPerPage: 20,
                attributesToRetrieve: ['*'],
                clickAnalytics: true,
                userToken: getUserToken(),
            },
        },
    ]);
    const response = results[0] as { hits: SearchHit[]; queryID?: string };
    return { hits: response.hits, queryID: response.queryID ?? '', config };
}

/**
 * Sends the click to Algolia Insights without holding up navigation:
 * `keepalive` lets the request outlive the page.
 */
export function sendClickEvent(config: SearchConfig, queryID: string, hit: SearchHit, position: number) {
    if (!queryID) return;
    fetch('https://insights.algolia.io/1/events', {
        method: 'POST',
        keepalive: true,
        headers: {
            'Content-Type': 'application/json',
            'X-Algolia-Application-Id': config.appId,
            'X-Algolia-API-Key': config.analyticsKey,
        },
        body: JSON.stringify({
            events: [{
                eventType: 'click',
                eventName: 'Search Result Clicked',
                index: config.indexName,
                queryID,
                objectIDs: [hit.objectID],
                positions: [position],
                userToken: getUserToken(),
            }],
        }),
    }).catch((error) => console.error('Failed to send search click event:', error));
}

/** Points production result URLs at the current host on localhost and previews. */
export function toLocalUrl(url: string): string {
    const prodPrefix = 'https://adapty.io/docs/';
    if (window.location.hostname === 'adapty.io' || !url.startsWith(prodPrefix)) return url;
    const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
    return `${window.location.origin}${base}${url.slice(prodPrefix.length)}`;
}

export function escapeHtml(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

/** Title and breadcrumb trail of a result, escaped for innerHTML. */
export function describeHit(hit: SearchHit) {
    const { lvl0, lvl1, lvl2 } = hit.hierarchy;
    const title = lvl1 || lvl2 || lvl0 || 'Documentation';
    const breadcrumbs = [lvl0, lvl1 !== title ? lvl1 : undefined].filter((s): s is string => !!s);
    return {
        title: escapeHtml(title),
        breadcrumbs: breadcrumbs.map(escapeHtml),
        description: hit.description ? escapeHtml(hit.description) : '',
    };
}

/** True when the browser will open the link elsewhere (new tab, window, download). */
export function opensElsewhere(e: MouseEvent): boolean {
    return e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
}
