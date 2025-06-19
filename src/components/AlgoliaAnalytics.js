import React, { useEffect } from 'react';
import aa from 'search-insights';

// Initialize Algolia Insights
aa('init', {
  appId: 'IPH9RRTSQS',
  apiKey: '5e3fd9357b98f9f0d44bab0f0b7634c0',
  useCookie: true,
});

console.log('AlgoliaAnalytics: Component loaded, aa initialized:', typeof aa);

const AlgoliaAnalytics = () => {
  // Store current search query and queryID for linking with clicks
  let currentSearchQuery = '';
  let currentQueryID = '';
  let searchTimeout = null;
  let userToken = '';

  // Function to generate a unique user token
  const generateUserToken = () => {
    // Generate a random string for user identification
    const randomPart = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const timestamp = Date.now().toString(36);
    return `user_${randomPart}_${timestamp}`;
  };

  // Function to get or create user token
  const getUserToken = () => {
    // Try to get existing token from localStorage
    let token = localStorage.getItem('algolia_user_token');
    
    if (!token) {
      // Generate new token if none exists
      token = generateUserToken();
      localStorage.setItem('algolia_user_token', token);
      console.log('AlgoliaAnalytics: 🆕 Generated new user token:', token);
    } else {
      console.log('AlgoliaAnalytics: 🔄 Using existing user token:', token);
    }
    
    return token;
  };

  // Function to refresh user token (useful for testing or user logout)
  const refreshUserToken = () => {
    const newToken = generateUserToken();
    localStorage.setItem('algolia_user_token', newToken);
    userToken = newToken;
    console.log('AlgoliaAnalytics: 🔄 Refreshed user token:', newToken);
    return newToken;
  };

  useEffect(() => {
    console.log('AlgoliaAnalytics: useEffect running, setting up event listeners');
    console.log('AlgoliaAnalytics: 🎯 Analytics Tracking Enabled');
    console.log('   - Search queries: ✅');
    console.log('   - Click events: ✅');
    console.log('   - ObjectID tracking: ✅');
    console.log('   - Position tracking: ✅');
    console.log('   - QueryID linking: ✅');
    console.log('   - User token tracking: ✅');

    // Initialize user token
    userToken = getUserToken();
    console.log('AlgoliaAnalytics: 👤 Current user token:', userToken);

    // Function to find objectID by URL using Algolia search
    const findObjectIDByURL = async (url) => {
      try {
        // Transform localhost URL to production URL without anchor
        const localUrl = new URL(url);
        const urlWithoutAnchor = 'https://adapty.io' + localUrl.pathname;
        
        console.log('AlgoliaAnalytics: Looking for objectID with url_without_anchor:', urlWithoutAnchor);
        
        // Search for the specific record
        const searchUrl = `https://IPH9RRTSQS-dsn.algolia.net/1/indexes/adapty/query`;
        const response = await fetch(searchUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Algolia-Application-Id': 'IPH9RRTSQS',
            'X-Algolia-API-Key': '5e3fd9357b98f9f0d44bab0f0b7634c0',
          },
          body: JSON.stringify({
            query: localUrl.pathname.split('/').pop() || 'quickstart',
            hitsPerPage: 10,
            attributesToRetrieve: ['objectID', 'url_without_anchor', 'url', 'title']
          })
        });
        
        const data = await response.json();
        console.log('AlgoliaAnalytics: Search response for query:', localUrl.pathname.split('/').pop(), data);
        
        if (data.hits && data.hits.length > 0) {
          // Try to find exact match first
          const exactMatch = data.hits.find(hit => hit.url_without_anchor === urlWithoutAnchor);
          if (exactMatch) {
            console.log('AlgoliaAnalytics: Found exact match objectID:', exactMatch.objectID);
            return exactMatch.objectID;
          }
          
          // If no exact match, try to find a close match
          const closeMatch = data.hits.find(hit => 
            hit.url && hit.url.startsWith(urlWithoutAnchor)
          );
          if (closeMatch) {
            console.log('AlgoliaAnalytics: Found close match objectID:', closeMatch.objectID);
            return closeMatch.objectID;
          }
          
          // Try matching by pathname
          const pathMatch = data.hits.find(hit => 
            hit.url && hit.url.includes(localUrl.pathname)
          );
          if (pathMatch) {
            console.log('AlgoliaAnalytics: Found path match objectID:', pathMatch.objectID);
            return pathMatch.objectID;
          }
          
          // Fallback to first hit
          const objectID = data.hits[0].objectID;
          console.log('AlgoliaAnalytics: Using first hit objectID:', objectID);
          return objectID;
        } else {
          console.warn('AlgoliaAnalytics: No record found for URL:', urlWithoutAnchor);
          return null;
        }
      } catch (error) {
        console.error('AlgoliaAnalytics: Error finding objectID:', error);
        return null;
      }
    };

    // Function to extract queryID from DocSearch DOM elements
    const extractQueryIDFromDOM = () => {
      // Look for queryID in various places where DocSearch might store it
      const searchResults = document.querySelectorAll('.DocSearch-Hit');
      for (const hit of searchResults) {
        // Check for data attributes
        const queryID = hit.getAttribute('data-query-id') || 
                       hit.getAttribute('data-queryid') ||
                       hit.querySelector('[data-query-id]')?.getAttribute('data-query-id') ||
                       hit.querySelector('[data-queryid]')?.getAttribute('data-queryid');
        
        if (queryID && queryID.length === 32) {
          console.log('AlgoliaAnalytics: ✅ Found queryID in DOM element:', queryID);
          return queryID;
        }
      }
      
      // Check for queryID in search results container
      const searchContainer = document.querySelector('.DocSearch-Dropdown');
      if (searchContainer) {
        const queryID = searchContainer.getAttribute('data-query-id') ||
                       searchContainer.getAttribute('data-queryid');
        if (queryID && queryID.length === 32) {
          console.log('AlgoliaAnalytics: ✅ Found queryID in search container:', queryID);
          return queryID;
        }
      }
      
      return null;
    };

    // Intercept Algolia search requests to capture queryID
    const originalFetch = window.fetch;
    window.fetch = async function(...args) {
      const [url, options] = args;
      
      // Check if this is an Algolia search request
      if (typeof url === 'string' && url.includes('algolia.net') && url.includes('/query') && options?.method === 'POST') {
        try {
          console.log('AlgoliaAnalytics: 🔍 Intercepting Algolia search request');
          
          // Parse the request body to inject clickAnalytics parameter
          let requestBody = {};
          if (options.body) {
            try {
              requestBody = JSON.parse(options.body);
              console.log('AlgoliaAnalytics: Original request body:', requestBody);
            } catch (e) {
              console.error('AlgoliaAnalytics: Error parsing request body:', e);
            }
          }
          
          // Inject clickAnalytics parameter if not present
          if (!requestBody.clickAnalytics) {
            requestBody.clickAnalytics = true;
            console.log('AlgoliaAnalytics: ✅ Injected clickAnalytics parameter');
            
            // Update the request body
            const modifiedOptions = {
              ...options,
              body: JSON.stringify(requestBody)
            };
            
            // Make the modified request
            const response = await originalFetch.call(this, url, modifiedOptions);
            const responseClone = response.clone();
            
            // Parse the response to get the queryID
            const responseData = await responseClone.json();
            console.log('AlgoliaAnalytics: Search response data:', responseData);
            console.log('AlgoliaAnalytics: Response keys:', Object.keys(responseData));
            
            if (responseData.queryID) {
              currentQueryID = responseData.queryID;
              console.log('AlgoliaAnalytics: ✅ Captured real queryID from search response:', currentQueryID);
              
              // Also capture the search query if available
              if (requestBody.query) {
                currentSearchQuery = requestBody.query;
                console.log('AlgoliaAnalytics: Captured search query:', currentSearchQuery);
              }
            } else {
              console.log('AlgoliaAnalytics: No queryID found in search response');
              console.log('AlgoliaAnalytics: Checking hits for queryID...');
              
              // Sometimes queryID might be in individual hits
              if (responseData.hits && responseData.hits.length > 0) {
                const firstHit = responseData.hits[0];
                if (firstHit.__queryID) {
                  currentQueryID = firstHit.__queryID;
                  console.log('AlgoliaAnalytics: ✅ Found queryID in hit:', currentQueryID);
                }
              }
            }
            
            return response;
          } else {
            console.log('AlgoliaAnalytics: clickAnalytics already present in request');
            // Make the original request if clickAnalytics is already present
            const response = await originalFetch.apply(this, args);
            const responseClone = response.clone();
            
            // Parse the response to get the queryID
            const responseData = await responseClone.json();
            if (responseData.queryID) {
              currentQueryID = responseData.queryID;
              console.log('AlgoliaAnalytics: ✅ Captured real queryID from search response:', currentQueryID);
              
              // Also capture the search query if available
              if (requestBody.query) {
                currentSearchQuery = requestBody.query;
                console.log('AlgoliaAnalytics: Captured search query:', currentSearchQuery);
              }
            }
            
            return response;
          }
        } catch (error) {
          console.error('AlgoliaAnalytics: Error intercepting search request:', error);
          return originalFetch.apply(this, args);
        }
      }
      
      return originalFetch.apply(this, args);
    };

    // Track clicks on search results using search-insights library
    const handleResultClick = async (event) => {
      console.log('AlgoliaAnalytics: Click detected on:', event.target);
      
      // Find the closest DocSearch-Hit container
      const hitElement = event.target.closest('.DocSearch-Hit');
      if (!hitElement) {
        console.warn('AlgoliaAnalytics: No .DocSearch-Hit found for click');
        return;
      }

      console.log('AlgoliaAnalytics: Found hit element:', hitElement);

      // Try to extract queryID from the clicked element first
      const elementQueryID = hitElement.getAttribute('data-query-id') || 
                            hitElement.getAttribute('data-queryid') ||
                            hitElement.querySelector('[data-query-id]')?.getAttribute('data-query-id') ||
                            hitElement.querySelector('[data-queryid]')?.getAttribute('data-queryid');
      
      if (elementQueryID && elementQueryID.length === 32) {
        currentQueryID = elementQueryID;
        console.log('AlgoliaAnalytics: ✅ Found queryID in clicked element:', currentQueryID);
      } else if (!currentQueryID) {
        // Try to extract from DOM if we don't have a queryID yet
        const domQueryID = extractQueryIDFromDOM();
        if (domQueryID) {
          currentQueryID = domQueryID;
        }
      }

      // Get the link URL
      const link = hitElement.querySelector('a');
      if (!link || !link.href) {
        console.warn('AlgoliaAnalytics: No link found in hit element');
        return;
      }

      // Find the position (1-based index)
      const position = Array.from(hitElement.parentNode.children).indexOf(hitElement) + 1;

      // Find the correct objectID using Algolia API
      const objectID = await findObjectIDByURL(link.href);
      
      if (!objectID) {
        console.warn('AlgoliaAnalytics: Could not find objectID for URL:', link.href);
        return;
      }

      console.log('AlgoliaAnalytics: Sending click event with objectID:', objectID, 'at position:', position);

      // Use search-insights library to send the click event
      try {
        if (currentQueryID && currentQueryID.length === 32) {
          // Send click event with queryID and position
          aa('clickedObjectIDsAfterSearch', {
            eventName: 'Item Clicked',
            index: 'adapty',
            objectIDs: [objectID],
            positions: [position],
            queryID: currentQueryID,
            userToken: userToken,
          });
          console.log('AlgoliaAnalytics: ✅ Click event sent with queryID and position via search-insights');
        } else {
          // Send click event without queryID (fallback)
          aa('clickedObjectIDs', {
            eventName: 'Item Clicked',
            index: 'adapty',
            objectIDs: [objectID],
            userToken: userToken,
          });
          console.log('AlgoliaAnalytics: ⚠️ Click event sent without queryID (fallback)');
        }
        
        console.log('AlgoliaAnalytics: 📊 Analytics Summary:');
        console.log('   - ObjectID:', objectID);
        console.log('   - Position:', position);
        console.log('   - QueryID:', currentQueryID || 'Not available');
        console.log('   - Search Query:', currentSearchQuery || 'Not available');
        console.log('   - User Token:', userToken);
      } catch (error) {
        console.error('AlgoliaAnalytics: Error sending click event via search-insights:', error);
        
        // Fallback to direct API call
        try {
          console.log('AlgoliaAnalytics: Trying direct API call as fallback...');
          const insightsUrl = 'https://insights.algolia.io/1/events';
          
          const eventData = {
            events: [{
              eventType: 'click',
              eventName: 'Item Clicked',
              index: 'adapty',
              objectIDs: [objectID],
              userToken: userToken,
              timestamp: Date.now(),
            }]
          };

          if (currentQueryID && currentQueryID.length === 32) {
            eventData.events[0].queryID = currentQueryID;
            eventData.events[0].positions = [position];
          }

          const response = await fetch(insightsUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Algolia-Application-Id': 'IPH9RRTSQS',
              'X-Algolia-API-Key': '5e3fd9357b98f9f0d44bab0f0b7634c0',
            },
            body: JSON.stringify(eventData)
          });

          if (response.ok) {
            console.log('AlgoliaAnalytics: ✅ Click event sent successfully via direct API fallback');
          } else {
            console.error('AlgoliaAnalytics: Direct API fallback failed with status:', response.status);
          }
        } catch (fallbackError) {
          console.error('AlgoliaAnalytics: Direct API fallback also failed:', fallbackError);
        }
      }
    };

    // Track search queries
    const handleSearchQuery = async (event) => {
      const searchInput = event.target;
      const query = searchInput.value.trim();
      
      if (query) {
        console.log('AlgoliaAnalytics: User typed search query:', query);
        currentSearchQuery = query;
        
        // Track search event with user token
        try {
          aa('search', {
            eventName: 'Search Query',
            index: 'adapty',
            query: query,
            userToken: userToken,
          });
          console.log('AlgoliaAnalytics: ✅ Search event tracked for query:', query);
        } catch (error) {
          console.error('AlgoliaAnalytics: Error tracking search event:', error);
        }
        
        // queryID will be captured from the actual Algolia search request
      }
    };

    // Expose refresh function globally for testing
    window.refreshAlgoliaUserToken = refreshUserToken;
    console.log('AlgoliaAnalytics: 🔧 Global function available: window.refreshAlgoliaUserToken()');

    // Set up event listeners
    const setupListeners = () => {
      console.log('AlgoliaAnalytics: Setting up event listeners');
      
      // Listen for clicks on search results
      const searchResults = document.querySelectorAll('.DocSearch-Hit a');
      console.log('AlgoliaAnalytics: Found search result links:', searchResults.length);
      searchResults.forEach(result => {
        result.addEventListener('click', handleResultClick);
      });

      // Listen for search queries
      const searchInput = document.querySelector('.DocSearch-Input');
      if (searchInput) {
        console.log('AlgoliaAnalytics: Found search input, setting up query tracking');
        searchInput.addEventListener('input', handleSearchQuery);
      } else {
        console.log('AlgoliaAnalytics: Search input not found');
      }
    };

    // Initial setup
    setupListeners();

    // Set up mutation observer to handle dynamically added search elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              // Check for new search results
              const newSearchResults = node.querySelectorAll('.DocSearch-Hit a');
              newSearchResults.forEach(result => {
                result.addEventListener('click', handleResultClick);
              });

              // Check for new search input
              const newSearchInput = node.querySelector('.DocSearch-Input');
              if (newSearchInput) {
                console.log('AlgoliaAnalytics: Found new search input, setting up query tracking');
                newSearchInput.addEventListener('input', handleSearchQuery);
              }
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    console.log('AlgoliaAnalytics: Mutation observer set up');

    // Cleanup
    return () => {
      console.log('AlgoliaAnalytics: Cleaning up event listeners');
      observer.disconnect();
      
      const searchResults = document.querySelectorAll('.DocSearch-Hit a');
      searchResults.forEach(result => {
        result.removeEventListener('click', handleResultClick);
      });
    };
  }, []);

  return null;
};

export default AlgoliaAnalytics; 