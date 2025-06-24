import React, {useCallback, useMemo, useRef, useState, useEffect} from 'react';
import {createPortal} from 'react-dom';
import {DocSearchButton, useDocSearchKeyboardEvents} from '@docsearch/react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import {useHistory} from '@docusaurus/router';
import {
  isRegexpStringMatch,
  useSearchLinkCreator,
} from '@docusaurus/theme-common';
import {
  useAlgoliaContextualFacetFilters,
  useSearchResultUrlProcessor,
} from '@docusaurus/theme-search-algolia/client';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import translations from '@theme/SearchTranslations';
let DocSearchModal = null;
function Hit({hit, children}) {
  // Use the URL directly without processing to avoid errors
  const url = hit.url || '#';
  
  return <Link to={url}>{children}</Link>;
}
function CustomHit({hit}) {
  const processSearchResultUrl = useSearchResultUrlProcessor();
  
  // Safely process the URL with error handling
  let url;
  try {
    // Use the URL directly without processing to avoid issues with relative URLs
    url = hit.url;
  } catch (error) {
    console.warn('Invalid URL in search result:', hit.url, error);
    // Fallback to relative URL
    url = hit.url || '#';
  }
  
  // Get the title from hierarchy
  const title = hit.hierarchy?.lvl1 || hit.hierarchy?.lvl2 || hit.hierarchy?.lvl3 || hit.hierarchy?.lvl4 || hit.hierarchy?.lvl5 || hit.hierarchy?.lvl6 || 'Untitled';
  
  // Get the description from the actual description field
  const description = hit.description || hit._snippetResult?.description?.value || '';
  
  return (
    <Link to={url} className="DocSearch-Hit">
      <div className="DocSearch-Hit-Container">
        <div className="DocSearch-Hit-Content">
          <div className="DocSearch-Hit-Title">
            {title}
          </div>
          {description && (
            <div className="DocSearch-Hit-Description">
              {description}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
function ResultsFooter({state, onClose}) {
  const createSearchLink = useSearchLinkCreator();
  return (
    <Link to={createSearchLink(state.query)} onClick={onClose}>
      <Translate
        id="theme.SearchBar.seeAll"
        values={{count: state.context.nbHits}}>
        {'See all {count} results'}
      </Translate>
    </Link>
  );
}
function mergeFacetFilters(f1, f2) {
  const normalize = (f) => (typeof f === 'string' ? [f] : f);
  return [...normalize(f1), ...normalize(f2)];
}
function DocSearch({contextualSearch, externalUrlRegex, ...props}) {
  const {siteMetadata} = useDocusaurusContext();
  const processSearchResultUrl = useSearchResultUrlProcessor();
  const contextualSearchFacetFilters = useAlgoliaContextualFacetFilters();
  const configFacetFilters = props.searchParameters?.facetFilters ?? [];
  const facetFilters = contextualSearch
    ? // Merge contextual search filters with config filters
      mergeFacetFilters(contextualSearchFacetFilters, configFacetFilters)
    : // ... or use config facetFilters
      configFacetFilters;
  // We let user override default searchParameters if she wants to
  const searchParameters = {
    ...props.searchParameters,
    facetFilters,
  };
  const history = useHistory();
  const searchContainer = useRef(null);
  const searchButtonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState(undefined);
  const importDocSearchModalIfNeeded = useCallback(() => {
    if (DocSearchModal) {
      return Promise.resolve();
    }
    return Promise.all([
      import('@docsearch/react/modal'),
      import('@docsearch/react/style'),
      import('./styles.css'),
    ]).then(([{DocSearchModal: Modal}]) => {
      DocSearchModal = Modal;
    });
  }, []);
  const prepareSearchContainer = useCallback(() => {
    if (!searchContainer.current) {
      const divElement = document.createElement('div');
      searchContainer.current = divElement;
      document.body.insertBefore(divElement, document.body.firstChild);
    }
  }, []);
  const openModal = useCallback(() => {
    prepareSearchContainer();
    importDocSearchModalIfNeeded().then(() => setIsOpen(true));
  }, [importDocSearchModalIfNeeded, prepareSearchContainer]);
  const closeModal = useCallback(() => {
    setIsOpen(false);
    searchButtonRef.current?.focus();
  }, []);
  const handleInput = useCallback(
    (event) => {
      // prevents duplicate key insertion in the modal input
      event.preventDefault();
      setInitialQuery(event.key);
      openModal();
    },
    [openModal],
  );
  const navigator = useRef({
    navigate({itemUrl}) {
      // Algolia results could contain URL's from other domains which cannot
      // be served through history and should navigate with window.location
      if (isRegexpStringMatch(externalUrlRegex, itemUrl)) {
        window.location.href = itemUrl;
      } else {
        history.push(itemUrl);
      }
    },
  }).current;
  const transformItems = useRef((items) =>
    props.transformItems
      ? // Custom transformItems
        props.transformItems(items)
      : // Default transformItems
        items.map((item) => ({
          ...item,
          url: processSearchResultUrl(item.url),
        })),
  ).current;
  const resultsFooterComponent = useMemo(
    () =>
      // eslint-disable-next-line react/no-unstable-nested-components
      (footerProps) =>
        <ResultsFooter {...footerProps} onClose={closeModal} />,
    [closeModal],
  );
  const transformSearchClient = useCallback(
    (searchClient) => {
      searchClient.addAlgoliaAgent(
        'docusaurus',
        siteMetadata.docusaurusVersion,
      );
      return searchClient;
    },
    [siteMetadata.docusaurusVersion],
  );
  useDocSearchKeyboardEvents({
    isOpen,
    onOpen: openModal,
    onClose: closeModal,
    onInput: handleInput,
    searchButtonRef,
  });
  return (
    <>
      <Head>
        {/* This hints the browser that the website will load data from Algolia,
        and allows it to preconnect to the DocSearch cluster. It makes the first
        query faster, especially on mobile. */}
        <link
          rel="preconnect"
          href={`https://${props.appId}-dsn.algolia.net`}
          crossOrigin="anonymous"
        />
      </Head>

      <DocSearchButton
        onTouchStart={importDocSearchModalIfNeeded}
        onFocus={importDocSearchModalIfNeeded}
        onMouseOver={importDocSearchModalIfNeeded}
        onClick={openModal}
        ref={searchButtonRef}
        translations={translations.button}
      />

      {isOpen &&
        DocSearchModal &&
        searchContainer.current &&
        createPortal(
          <DocSearchModal
            onClose={closeModal}
            initialScrollY={window.scrollY}
            initialQuery={initialQuery}
            navigator={navigator}
            transformItems={transformItems}
            hitComponent={CustomHit}
            transformSearchClient={transformSearchClient}
            {...(props.searchPagePath && {
              resultsFooterComponent,
            })}
            {...props}
            searchParameters={searchParameters}
            placeholder={translations.placeholder}
            translations={translations.modal}
          />,
          searchContainer.current,
        )}
    </>
  );
}
export default function SearchBar() {
  const {siteConfig} = useDocusaurusContext();
  return <DocSearch {...siteConfig.themeConfig.algolia} />;
}
