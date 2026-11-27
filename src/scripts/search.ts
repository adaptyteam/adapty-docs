import {
    describeHit,
    opensElsewhere,
    preloadSearchClient,
    readSearchConfig,
    searchDocs,
    sendClickEvent,
    toLocalUrl,
    type SearchConfig,
    type SearchHit,
} from './search-core';

// The header is transition:persist, so this runs once per full page load.
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input') as HTMLInputElement | null;
    const searchResults = document.getElementById('search-results');
    const searchContainer = document.getElementById('search-container');

    if (!searchInput || !searchResults || !searchContainer) return;

    // An element rendered but hidden (e.g. Tailwind `hidden xl:flex`) has no boxes.
    const isVisible = (el: HTMLElement) =>
        !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);

    // Cmd+K / Ctrl+K focuses search
    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();

            if (isVisible(searchInput)) {
                searchInput.focus();
                return;
            }

            // Below xl the header field is hidden and search lives in the overlay.
            // Click the trigger that's actually on screen so the overlay's own
            // open handler (DocsLayout.astro) stays the single source of truth.
            const trigger = Array.from(
                document.querySelectorAll<HTMLElement>('[data-search-trigger]')
            ).find(isVisible);
            trigger?.click();
        }
    });

    if (!readSearchConfig()) {
        console.warn('Algolia search credentials missing. Search will not work.');
        return;
    }

    const hideResults = () => searchResults.classList.add('hidden');

    // Monotonic counter, so a slow response can't overwrite a newer one.
    let latestRequest = 0;

    const performSearch = async (query: string) => {
        if (query.length < 2) {
            hideResults();
            return;
        }
        const request = ++latestRequest;
        try {
            const response = await searchDocs(query);
            if (!response || request !== latestRequest) return;
            renderResults(response.hits, response.queryID, response.config);
        } catch (error) {
            console.error('Search error:', error);
        }
    };

    const renderResults = (hits: SearchHit[], queryID: string, config: SearchConfig) => {
        searchResults.innerHTML = '';

        if (hits.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'p-4 text-secondary text-sm text-center';
            noResults.textContent = searchResults.dataset.noResults || 'No results found.';
            searchResults.appendChild(noResults);
        } else {
            hits.forEach((hit, index) => {
                const item = document.createElement('a');
                item.href = toLocalUrl(hit.url || hit.objectID);
                item.className = 'block p-4 hover:bg-hover transition-colors border-b border-primary last:border-0 group search-result-item';

                // The click event is sent without blocking the link, so new-tab
                // clicks keep working. A middle click fires auxclick, not click.
                const track = () => sendClickEvent(config, queryID, hit, index + 1);
                item.addEventListener('auxclick', (e) => { if (e.button === 1) track(); });
                item.addEventListener('click', (e) => {
                    track();
                    // A same-tab click becomes a client-side navigation, and the
                    // persisted header would keep the dropdown open over the new page.
                    if (!opensElsewhere(e)) {
                        hideResults();
                        searchInput.value = '';
                        searchInput.blur();
                    }
                });

                const { title, breadcrumbs, description } = describeHit(hit);
                const breadcrumbsHtml = breadcrumbs.length
                    ? `<div class="text-[10px] text-tertiary mb-1 flex items-center gap-1 uppercase tracking-wider font-semibold search-breadcrumbs">
                        ${breadcrumbs.join(' <span class="opacity-50">/</span> ')}
                       </div>`
                    : '';

                item.innerHTML = `
                    ${breadcrumbsHtml}
                    <div class="text-[14px] font-semibold text-primary group-hover:text-accent transition-colors mb-0.5 line-clamp-1 search-title">${title}</div>
                    ${description ? `<div class="text-[12px] text-secondary line-clamp-2 leading-relaxed font-medium search-desc">${description}</div>` : ''}
                `;

                searchResults.appendChild(item);
            });
        }

        searchResults.classList.remove('hidden');
    };

    let debounceTimer: ReturnType<typeof setTimeout>;
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim();
        clearTimeout(debounceTimer);
        if (!query) {
            latestRequest++;
            hideResults();
            return;
        }
        debounceTimer = setTimeout(() => performSearch(query), 150);
    });

    document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target as Node)) hideResults();
    });

    searchInput.addEventListener('focus', () => {
        preloadSearchClient();
        if (searchInput.value.trim()) searchResults.classList.remove('hidden');
    });

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideResults();
            searchInput.blur();
        }
    });
});
