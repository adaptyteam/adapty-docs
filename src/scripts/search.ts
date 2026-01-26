import { liteClient as algoliasearch } from 'algoliasearch/lite';
import aa from 'search-insights';

// Define the Hit type based on DocSearch structure
interface SearchHit {
    objectID: string;
    url: string;
    description?: string;
    hierarchy: {
        lvl0?: string;
        lvl1?: string;
        lvl2?: string;
        lvl3?: string;
        lvl4?: string;
        lvl5?: string;
        lvl6?: string;
    };
    _snippetResult?: {
        content?: { value: string };
    };
}

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input') as any;
    const searchResults = document.getElementById('search-results');
    const searchContainer = document.getElementById('search-container');

    if (!searchInput || !searchResults || !searchContainer) return;

    // Cmd+K / Ctrl+K keyboard shortcut to focus search
    document.addEventListener('keydown', (e) => {
        // Check for Cmd+K (Mac) or Ctrl+K (Windows/Linux)
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
    });

    const appId = searchInput.dataset.appId;
    const apiKey = searchInput.dataset.apiKey;
    const indexName = searchInput.dataset.indexName;
    const analyticsKey = searchInput.dataset.analyticsKey || apiKey; // Fallback to search key if not provided

    if (!appId || !apiKey || !indexName) {
        console.warn('Algolia search credentials missing. Search will not work.');
        return;
    }

    // Initialize Algolia
    const client = algoliasearch(appId, apiKey);

    // Initialize Algolia Insights
    aa('init', {
        appId: appId,
        apiKey: analyticsKey,
        useCookie: true,
    });

    // Helper to get or create a user token for Algolia
    function getOrCreateUserToken() {
        let token = localStorage.getItem('algolia_user_token');
        if (!token) {
            token = 'user-' + Math.random().toString(36).substring(2, 15);
            localStorage.setItem('algolia_user_token', token);
        }
        return token;
    }

    let debounceTimer: ReturnType<typeof setTimeout>;

    /**
     * Transform URL based on current environment.
     * Maps production URLs to appropriate local/staging paths when needed.
     * 
     * @param originalUrl - The original URL from Algolia (typically production URL)
     * @returns Transformed URL appropriate for the current environment
     */
    const transformUrlForEnvironment = (originalUrl: string): string => {
        const currentOrigin = window.location.origin;
        const baseUrl = import.meta.env.BASE_URL;

        // Parse the original URL
        let url = originalUrl;

        // Check if we're in a non-production environment
        const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const isVercel = window.location.hostname.includes('vercel.app');
        const isProduction = window.location.hostname === 'adapty.io';

        // If the URL is from production (adapty.io), transform it to current environment
        if (url.startsWith('https://adapty.io/docs/')) {
            if (isLocalhost || isVercel || !isProduction) {
                // Extract the path after /docs/
                const path = url.replace('https://adapty.io/docs/', '');

                // Construct the new URL with current origin and base URL
                url = `${currentOrigin}${baseUrl}/${path}`.replace(/\/+/g, '/');
            }
        }

        return url;
    };

    const performSearch = async (query: string) => {
        if (!query) {
            searchResults.classList.add('hidden');
            return;
        }

        try {
            const { results } = await client.search([
                {
                    indexName,
                    params: {
                        query,
                        hitsPerPage: 20,
                        attributesToRetrieve: ['*'],
                        clickAnalytics: true,
                        userToken: getOrCreateUserToken(), // Required for linking events to searches
                    },
                },
            ]);

            const searchResponse = (results as any)[0];
            const hits = searchResponse.hits as SearchHit[];
            const queryID = searchResponse.queryID;

            renderResults(hits, queryID);
        } catch (error) {
            console.error('Search error:', error);
        }
    };

    const renderResults = (hits: SearchHit[], queryID: string) => {
        searchResults.innerHTML = '';

        if (hits.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'p-4 text-secondary text-sm text-center';
            noResults.textContent = 'No results found.';
            searchResults.appendChild(noResults);
        } else {
            hits.forEach((hit, index) => {
                const item = document.createElement('a');

                // Store original URL for analytics (always use the original from Algolia)
                const originalUrl = hit.url || hit.objectID;

                // Transform URL based on current environment for navigation
                let navigationUrl = transformUrlForEnvironment(originalUrl);

                item.href = navigationUrl;

                item.className = 'block p-4 hover:bg-hover transition-colors border-b border-primary last:border-0 group search-result-item';

                // Tracking: Send click event to Algolia
                item.addEventListener('click', (e) => {
                    const position = index + 1;
                    const targetUrl = item.href;

                    // Prevent immediate navigation
                    e.preventDefault();

                    // Using direct fetch to bypass some ad-blockers that target the library
                    const eventData = {
                        events: [
                            {
                                eventType: 'click',
                                eventName: 'Search Result Clicked',
                                index: indexName,
                                queryID: queryID,
                                objectIDs: [hit.objectID],
                                positions: [position],
                                userToken: getOrCreateUserToken(),
                            },
                        ],
                    };

                    fetch(`https://insights.algolia.io/1/events`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-Algolia-Application-Id': appId || '',
                            'X-Algolia-API-Key': analyticsKey || '',
                        },
                        body: JSON.stringify(eventData)
                    }).catch(error => {
                        console.error('Failed to send search click event:', error);
                    });

                    // Small delay to ensure event is sent, then navigate to environment-aware URL
                    setTimeout(() => {
                        window.location.href = targetUrl;
                    }, 150);
                });

                // Extract title: Priority to specific levels (lvl1 is page title, lvl2+ are headings)
                const title = hit.hierarchy.lvl1 || hit.hierarchy.lvl2 || hit.hierarchy.lvl0 || 'Documentation';

                // Extract breadcrumbs: Typically lvl0 (category) and lvl1 (page)
                const breadcrumbs = [];
                if (hit.hierarchy.lvl0) breadcrumbs.push(hit.hierarchy.lvl0);
                if (hit.hierarchy.lvl1 && hit.hierarchy.lvl1 !== title) breadcrumbs.push(hit.hierarchy.lvl1);

                const breadcrumbsHtml = breadcrumbs.length
                    ? `<div class="text-[10px] text-tertiary mb-1 flex items-center gap-1 uppercase tracking-wider font-semibold search-breadcrumbs">
                        ${breadcrumbs.join(' <span class="opacity-50">/</span> ')}
                       </div>`
                    : '';

                item.innerHTML = `
                    ${breadcrumbsHtml}
                    <div class="text-[14px] font-bold text-primary group-hover:text-accent transition-colors mb-0.5 line-clamp-1 search-title">${title}</div>
                    ${hit.description ? `<div class="text-[12px] text-secondary line-clamp-2 leading-relaxed font-medium search-desc">${hit.description}</div>` : ''}
                `;

                searchResults.appendChild(item);
            });
        }

        searchResults.classList.remove('hidden');
    };

    searchInput.addEventListener('input', (e: any) => {
        const query = (e.target as any).value.trim();

        if (!query) {
            searchResults.classList.add('hidden');
            return;
        }

        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            performSearch(query);
        }, 150); // Snappy 150ms debounce
    });

    document.addEventListener('click', (e) => {
        // Use composedPath to penetrate Shadow DOM (Stoplight Elements)
        const path = e.composedPath();
        const isInApiContainer = path.some(el => (el as any).classList?.contains('api-container'));

        // Skip if clicking inside API container to avoid focus issues
        if (isInApiContainer) return;

        if (!searchContainer.contains(e.target as Node)) {
            searchResults.classList.add('hidden');
        }
    });

    // Focus to show results if query exists
    searchInput.addEventListener('focus', () => {
        if (searchInput.value.trim()) {
            searchResults.classList.remove('hidden');
        }
    });

    // Handle keys (Esc to close)
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchResults.classList.add('hidden');
            searchInput.blur();
        }
    });
});
