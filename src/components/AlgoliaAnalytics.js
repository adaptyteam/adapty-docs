import React, { useEffect } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import aa from 'search-insights';

// Initialize Algolia Insights only on client side
if (typeof window !== 'undefined') {
  aa('init', {
    appId: 'IPH9RRTSQS',
    apiKey: '5e3fd9357b98f9f0d44bab0f0b7634c0',
    useCookie: true,
  });
}

// AlgoliaAnalytics: Component loaded

const AlgoliaAnalyticsComponent = () => {
  // Store current search query and queryID for linking with clicks
  let currentSearchQuery = '';
  let currentQueryID = '';
  let userToken = '';
  let searchResultsData = []; // Store search results data for objectID lookup
  let objectIDMap = new Map(); // Map URLs to objectIDs from API response
  let queryIDMap = new Map(); // Map search queries to queryIDs from API response

  // Function to generate a unique user token
  const generateUserToken = () => {
    // Generate a random string for user identification
    const randomPart = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const timestamp = Date.now().toString(36);
    return `user_${randomPart}_${timestamp}`;
  };

  // Function to get or create user token
  const getUserToken = () => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return null;
    }
    
    // Try to get existing token from localStorage
    let token = localStorage.getItem('algolia_user_token');
    
    if (!token) {
      // Generate new token if none exists
      token = generateUserToken();
      localStorage.setItem('algolia_user_token', token);
    }
    
    return token;
  };

  // Function to refresh user token (useful for testing or user logout)
  const refreshUserToken = () => {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return null;
    }
    
    const newToken = generateUserToken();
    localStorage.setItem('algolia_user_token', newToken);
    userToken = newToken;
    return newToken;
  };

  // Function to generate a unique queryID
  const generateUniqueQueryID = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 15);
    const uniqueID = timestamp + random;
    // Ensure it's 32 characters long (Algolia standard)
    return uniqueID.padEnd(32, '0').substring(0, 32);
  };

  // Function to extract and store queryID from API response
  const extractQueryIDFromResponse = (responseData, query = '') => {
    let queryID = null;
    
    // Handle multi-index response format (results array)
    if (responseData.results && responseData.results.length > 0) {
      const result = responseData.results[0];
      
      // Check for queryID in various possible locations
      if (result.queryID) {
        queryID = result.queryID;
      } else if (result.params && result.params.queryID) {
        queryID = result.params.queryID;
      } else if (result.renderingContent && result.renderingContent.queryID) {
        queryID = result.renderingContent.queryID;
      }
      
      // Also check if queryID is in the hits
      if (!queryID && result.hits && result.hits.length > 0) {
        for (const hit of result.hits) {
          if (hit.queryID) {
            queryID = hit.queryID;
            break;
          }
        }
      }
    }
    // Handle single index response format
    else if (responseData.queryID) {
      queryID = responseData.queryID;
    } else if (responseData.params && responseData.params.queryID) {
      queryID = responseData.params.queryID;
    } else if (responseData.renderingContent && responseData.renderingContent.queryID) {
      queryID = responseData.renderingContent.queryID;
    }
    
    // Check for queryID in response headers (if available)
    if (!queryID && responseData.headers) {
      const queryIDHeader = responseData.headers['x-query-id'] || responseData.headers['X-Query-ID'];
      if (queryIDHeader) {
        queryID = queryIDHeader;
      }
    }
    
    // Store queryID in map if we have both queryID and query
    if (queryID && query) {
      queryIDMap.set(query, queryID);
    }
    
    // Always update current queryID when we find a new one
    if (queryID) {
      const previousQueryID = currentQueryID;
      currentQueryID = queryID;
    }
    
    return queryID;
  };

  // Function to get queryID for a specific search query
  const getQueryIDForQuery = (query) => {
    return queryIDMap.get(query) || currentQueryID;
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
        return queryID;
      }
    }
    
    // Check for queryID in search results container
    const searchContainer = document.querySelector('.DocSearch-Dropdown');
    if (searchContainer) {
      const queryID = searchContainer.getAttribute('data-query-id') ||
                     searchContainer.getAttribute('data-queryid');
      if (queryID && queryID.length === 32) {
        return queryID;
      }
    }
    
    return null;
  };

  // Function to get current search query from input field
  const getCurrentSearchQueryFromInput = () => {
    
    // Try to find the search input and get its current value
    const selectors = [
      '.DocSearch-Input',
      '.DocSearch input',
      '.DocSearch-Input input',
      '[data-testid="docsearch-input"]',
      'input[placeholder*="search"]',
      'input[placeholder*="Search"]',
      'input[placeholder*="docs"]',
      'input[placeholder*="Docs"]',
      'input[placeholder*="documentation"]',
      'input[placeholder*="Documentation"]',
      '.docsearch-input',
      '.docsearch input',
      '#docsearch-input',
      'input[type="search"]',
      'input[aria-label*="search"]',
      'input[aria-label*="Search"]'
    ];
    
    for (const selector of selectors) {
      const searchInput = document.querySelector(selector);
      if (searchInput) {
        
        if (searchInput.value.trim()) {
          const query = searchInput.value.trim();
          return query;
        } else {
        }
      }
    }
    
    // Fallback: examine all inputs
    const allInputs = document.querySelectorAll('input');
    
    for (const input of allInputs) {
      const placeholder = input.placeholder?.toLowerCase() || '';
      const ariaLabel = input.getAttribute('aria-label')?.toLowerCase() || '';
      const className = input.className?.toLowerCase() || '';
      const id = input.id?.toLowerCase() || '';
      
        if (placeholder.includes('search') || 
            placeholder.includes('docs') || 
            placeholder.includes('documentation') ||
            ariaLabel.includes('search') ||
            className.includes('search') ||
            className.includes('docsearch') ||
            id.includes('search') ||
            id.includes('docsearch')) {
        
        if (input.value.trim()) {
          const query = input.value.trim();
          return query;
        } else {
        }
      }
    }
    
    return currentSearchQuery; // Fallback to stored query
  };

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      return;
    }


    // Initialize user token
    userToken = getUserToken();

    // Intercept Algolia search requests to capture objectIDs and queryIDs from API response
    const originalFetch = window.fetch;
    window.fetch = async function(...args) {
      const [url, options] = args;
      
      
      // Check if this is an Algolia search request
      if (typeof url === 'string' && url.includes('algolia.net') && options?.method === 'POST') {
        
        // Check for different possible endpoints
        if (url.includes('/queries') || url.includes('/query')) {
          try {
            
            // Extract search query from request body if possible
            let searchQuery = '';
            if (options.body) {
              try {
                const requestBody = JSON.parse(options.body);
                searchQuery = requestBody.query || '';
                
                // Check if clickAnalytics is already enabled
                let clickAnalyticsEnabled = false;
                if (requestBody.requests && Array.isArray(requestBody.requests)) {
                  requestBody.requests.forEach((request, index) => {
                    if (typeof request.params === 'string') {
                      clickAnalyticsEnabled = request.params.includes('clickAnalytics=true');
                    } else if (typeof request.params === 'object') {
                      clickAnalyticsEnabled = request.params.clickAnalytics === true;
                    }
                  });
                }
                
                // Only force clickAnalytics if it's not already enabled
                if (!clickAnalyticsEnabled) {
                  requestBody.requests.forEach((request, index) => {
                    
                    // Parse the params string if it's a string
                    if (typeof request.params === 'string') {
                      try {
                        const parsedParams = new URLSearchParams(request.params);
                        parsedParams.set('clickAnalytics', 'true');
                        request.params = parsedParams.toString();
                      } catch (error) {
                        console.error('AlgoliaAnalytics: Error parsing params string:', error);
                        // Fallback: append clickAnalytics to the string
                        if (!request.params.includes('clickAnalytics=true')) {
                          request.params = request.params + '&clickAnalytics=true';
                        }
                      }
                    } else if (typeof request.params === 'object') {
                      // If params is an object, add clickAnalytics property
                      request.params = {
                        ...request.params,
                        clickAnalytics: true,
                      };
                    }
                  });
                  
                  // Update the request body with modified parameters
                  options.body = JSON.stringify(requestBody);
                } else {
                }
              } catch (e) {
              }
            }
            
            // Make the original request
            const response = await originalFetch.apply(this, args);
            const responseClone = response.clone();
            
            // Parse the response to extract objectIDs and queryID
            const responseData = await responseClone.json();
            
            // Extract queryID from response
            const queryID = extractQueryIDFromResponse(responseData, searchQuery);
            
            if (responseData.results && responseData.results.length > 0) {
              const result = responseData.results[0];
              if (result.hits && result.hits.length > 0) {
                
                // Clear previous objectID map
                objectIDMap.clear();
                
                // Extract objectIDs and map them to URLs
                result.hits.forEach((hit, index) => {
                  if (hit.objectID && hit.url) {
                    // Convert production URL to localhost URL for matching
                    const localUrl = hit.url.replace('https://adapty.io', 'http://localhost:3000');
                    objectIDMap.set(localUrl, hit.objectID);
                    objectIDMap.set(hit.url, hit.objectID); // Also store original URL
                    
                  }
                });
                
              }
            } else if (responseData.hits && responseData.hits.length > 0) {
              // Handle single index response format
              
              // Clear previous objectID map
              objectIDMap.clear();
              
              // Extract objectIDs and map them to URLs
              responseData.hits.forEach((hit, index) => {
                if (hit.objectID && hit.url) {
                  // Convert production URL to localhost URL for matching
                  const localUrl = hit.url.replace('https://adapty.io', 'http://localhost:3000');
                  objectIDMap.set(localUrl, hit.objectID);
                  objectIDMap.set(hit.url, hit.objectID); // Also store original URL
                  
                }
              });
              
            }
            
            return response;
          } catch (error) {
            console.error('AlgoliaAnalytics: Error intercepting search request:', error);
            return originalFetch.apply(this, args);
          }
        }
      }
      
      return originalFetch.apply(this, args);
    };

    // Also intercept XMLHttpRequest in case DocSearch uses it
    const originalXHROpen = XMLHttpRequest.prototype.open;
    const originalXHRSend = XMLHttpRequest.prototype.send;
    
    XMLHttpRequest.prototype.open = function(method, url, ...args) {
      
      // Check if this is an Algolia search request
      if (typeof url === 'string' && url.includes('algolia.net')) {
        this._isAlgoliaRequest = true;
        this._algoliaUrl = url;
      }
      
      return originalXHROpen.apply(this, [method, url, ...args]);
    };
    
    XMLHttpRequest.prototype.send = function(data) {
      if (this._isAlgoliaRequest && data) {
        
        try {
          // Try to parse the data as JSON
          const requestData = JSON.parse(data);
          
          // Check if clickAnalytics is already enabled
          let clickAnalyticsEnabled = false;
          if (requestData.requests && Array.isArray(requestData.requests)) {
            requestData.requests.forEach((request, index) => {
              if (typeof request.params === 'string') {
                clickAnalyticsEnabled = request.params.includes('clickAnalytics=true');
              } else if (typeof request.params === 'object') {
                clickAnalyticsEnabled = request.params.clickAnalytics === true;
              }
            });
          }
          
          // Only force clickAnalytics if it's not already enabled
          if (!clickAnalyticsEnabled) {
            requestData.requests.forEach((request, index) => {
              
              // Parse the params string if it's a string
              if (typeof request.params === 'string') {
                try {
                  const parsedParams = new URLSearchParams(request.params);
                  parsedParams.set('clickAnalytics', 'true');
                  request.params = parsedParams.toString();
                } catch (error) {
                  console.error('AlgoliaAnalytics: Error parsing XHR params string:', error);
                  // Fallback: append clickAnalytics to the string
                  if (!request.params.includes('clickAnalytics=true')) {
                    request.params = request.params + '&clickAnalytics=true';
                  }
                }
              } else if (typeof request.params === 'object') {
                // If params is an object, add clickAnalytics property
                request.params = {
                  ...request.params,
                  clickAnalytics: true,
                };
              }
            });
            
            // Update the request data with modified parameters
            data = JSON.stringify(requestData);
          } else {
          }
        } catch (error) {
          console.error('AlgoliaAnalytics: Error parsing XHR request data:', error);
        }
      }
      
      // Add response handler for Algolia requests
      if (this._isAlgoliaRequest) {
        this.addEventListener('load', function() {
          try {
            const responseData = JSON.parse(this.responseText);
            
            // Get the current search query from the input field
            const searchInput = document.querySelector('.DocSearch-Input');
            const searchQuery = searchInput ? searchInput.value.trim() : '';
            
            // Extract queryID from response
            const queryID = extractQueryIDFromResponse(responseData, searchQuery);
            
            // If we got a queryID and have a search query, store it in the map
            if (queryID && searchQuery) {
              queryIDMap.set(searchQuery, queryID);
            }
            
            if (responseData.results && responseData.results.length > 0) {
              const result = responseData.results[0];
              if (result.hits && result.hits.length > 0) {
                
                // Clear previous objectID map
                objectIDMap.clear();
                
                // Extract objectIDs and map them to URLs
                result.hits.forEach((hit, index) => {
                  if (hit.objectID && hit.url) {
                    // Convert production URL to localhost URL for matching
                    const localUrl = hit.url.replace('https://adapty.io', 'http://localhost:3000');
                    objectIDMap.set(localUrl, hit.objectID);
                    objectIDMap.set(hit.url, hit.objectID); // Also store original URL
                    
                  }
                });
                
              }
            }
          } catch (error) {
            console.error('AlgoliaAnalytics: Error parsing XHR response:', error);
          }
        });
      }
      
      return originalXHRSend.apply(this, [data]);
    };

    // Track clicks on search results using search-insights library
    const handleResultClick = async (event) => {
      
      // Find the closest DocSearch-Hit container
      const hitElement = event.target.closest('.DocSearch-Hit');
      if (!hitElement) {
        console.warn('AlgoliaAnalytics: No .DocSearch-Hit found for click');
        return;
      }


      // Try to extract objectID directly from the clicked element first
      const elementObjectID = hitElement.getAttribute('data-object-id') || 
                             hitElement.getAttribute('data-objectid') ||
                             hitElement.querySelector('[data-object-id]')?.getAttribute('data-object-id') ||
                             hitElement.querySelector('[data-objectid]')?.getAttribute('data-objectid');
      
      if (elementObjectID) {
      }

      // Try to extract queryID from the clicked element first
      const elementQueryID = hitElement.getAttribute('data-query-id') || 
                            hitElement.getAttribute('data-queryid') ||
                            hitElement.querySelector('[data-query-id]')?.getAttribute('data-query-id') ||
                            hitElement.querySelector('[data-queryid]')?.getAttribute('data-queryid');
      
      // Always try to get the most relevant queryID for this specific click
      let clickSpecificQueryID = null;
      
      if (elementQueryID && elementQueryID.length === 32) {
        clickSpecificQueryID = elementQueryID;
      } else {
        // Try to extract from DOM if we don't have a queryID from the element
        const domQueryID = extractQueryIDFromDOM();
        if (domQueryID) {
          clickSpecificQueryID = domQueryID;
        }
      }
      
      // Update currentQueryID only if we found a new one and it's different
      if (clickSpecificQueryID && clickSpecificQueryID !== currentQueryID) {
        currentQueryID = clickSpecificQueryID;
      }

      // Get the link URL
      const link = hitElement.querySelector('a');
      if (!link || !link.href) {
        console.warn('AlgoliaAnalytics: No link found in hit element');
        return;
      }

      // Find the position (1-based index) across ALL search results, not just within the parent group
      // This fixes the issue where positions were only valid within the first parent group due to DOM nesting
      const allSearchResults = document.querySelectorAll('.DocSearch-Hit');
      let position = 1; // Default to 1 if not found
      
      for (let i = 0; i < allSearchResults.length; i++) {
        if (allSearchResults[i] === hitElement) {
          position = i + 1; // Convert to 1-based index
          break;
        }
      }

      // Use objectID from element if available, otherwise try to find it
      let objectID = elementObjectID;
      if (!objectID) {
        // Try to extract from the hit element's data attributes
        const hitData = hitElement.getAttribute('data-hit');
        if (hitData) {
          try {
            const hit = JSON.parse(hitData);
            if (hit.objectID) {
              objectID = hit.objectID;
            }
          } catch (e) {
            console.warn('AlgoliaAnalytics: Error parsing hit data:', e);
          }
        }
      }
      
      // If still no objectID, try to find it from captured search results data
      if (!objectID) {
        objectID = findObjectIDByURL(link.href);
      }
      
      // If still no objectID, try to extract from the hit element's internal data
      if (!objectID) {
        // Check if the hit element has any internal data we can access
        
        // Try to get objectID from the hit element's internal properties
        if (hitElement._item) {
          objectID = hitElement._item.objectID;
        }
        
        // Try to get from the hit element's dataset
        if (!objectID && hitElement.dataset.objectId) {
          objectID = hitElement.dataset.objectId;
        }
        
        // Try to get from the hit element's id attribute (sometimes contains objectID)
        if (!objectID && hitElement.id) {
          const idMatch = hitElement.id.match(/objectID[_-]?(\w+)/i);
          if (idMatch) {
            objectID = idMatch[1];
          }
        }
        
        // Try to get from the link's data attributes
        if (!objectID && link) {
          const linkObjectID = link.getAttribute('data-object-id') || 
                              link.getAttribute('data-objectid') ||
                              link.dataset.objectId;
          if (linkObjectID) {
            objectID = linkObjectID;
          }
        }
        
        // Try to get from the link's href (sometimes contains objectID)
        if (!objectID && link && link.href) {
          const urlMatch = link.href.match(/[?&]objectID=([^&]+)/);
          if (urlMatch) {
            objectID = urlMatch[1];
          }
        }
        
        // Try to get from the search results container's data
        if (!objectID) {
          const searchContainer = document.querySelector('.DocSearch-Dropdown');
          if (searchContainer && searchContainer._results) {
            const results = searchContainer._results;
            const hitIndex = Array.from(hitElement.parentNode.children).indexOf(hitElement);
            if (results[hitIndex] && results[hitIndex].objectID) {
              objectID = results[hitIndex].objectID;
            }
          }
        }
        
        // Try to get from the global DocSearch instance
        if (!objectID && window.DocSearch) {
          try {
            const docSearchInstance = window.DocSearch;
            if (docSearchInstance.autocomplete && docSearchInstance.autocomplete.getState) {
              const state = docSearchInstance.autocomplete.getState();
              if (state.collections && state.collections.length > 0) {
                const collection = state.collections[0];
                const hitIndex = Array.from(hitElement.parentNode.children).indexOf(hitElement);
                if (collection.items && collection.items[hitIndex]) {
                  objectID = collection.items[hitIndex].objectID;
                }
              }
            }
          } catch (e) {
            console.warn('AlgoliaAnalytics: Error accessing DocSearch instance:', e);
          }
        }
      }
      
      if (!objectID) {
        console.warn('AlgoliaAnalytics: Could not find objectID for URL:', link.href);
        return;
      }

      // Get the best available queryID for this click
      let queryIDToUse = clickSpecificQueryID || currentQueryID;
      
      // Get the most current search query from the input field
      const currentQueryFromInput = getCurrentSearchQueryFromInput();
      if (currentQueryFromInput && currentQueryFromInput !== currentSearchQuery) {
        currentSearchQuery = currentQueryFromInput;
      }
      
      // If we have a current search query, try to get the specific queryID for it
      if (currentSearchQuery && queryIDMap.has(currentSearchQuery)) {
        const mappedQueryID = queryIDMap.get(currentSearchQuery);
        // Only use mapped queryID if we don't have a click-specific one
        if (!clickSpecificQueryID) {
          queryIDToUse = mappedQueryID;
        } else {
        }
      } else if (currentSearchQuery && !clickSpecificQueryID) {
        // Try to get queryID for the current search query only if we don't have a click-specific one
        queryIDToUse = getQueryIDForQuery(currentSearchQuery);
        if (queryIDToUse && queryIDToUse !== currentQueryID) {
        }
      }
      
      // If we still don't have a queryID and we have a search query, try to trigger a search with clickAnalytics
      if (!queryIDToUse && currentSearchQuery) {
      }
      
      // Try to get queryID from the current search results container
      if (!queryIDToUse) {
        const searchContainer = document.querySelector('.DocSearch-Dropdown');
        if (searchContainer) {
          // Try to get queryID from the search container's data attributes
          const containerQueryID = searchContainer.getAttribute('data-query-id') ||
                                  searchContainer.getAttribute('data-queryid') ||
                                  searchContainer.dataset.queryId;
          
          if (containerQueryID && containerQueryID.length === 32) {
            queryIDToUse = containerQueryID;
          }
          
          // Also try to get from the search container's internal state
          if (!queryIDToUse && searchContainer._queryID) {
            queryIDToUse = searchContainer._queryID;
          }
        }
      }
      
      // If we still don't have a queryID, try to get it from the search input
      if (!queryIDToUse) {
        const searchInput = document.querySelector('.DocSearch-Input');
        if (searchInput && searchInput.value.trim()) {
          const inputQuery = searchInput.value.trim();
          queryIDToUse = getQueryIDForQuery(inputQuery);
          if (queryIDToUse) {
          }
        }
      }
      
      // Ensure queryID uniqueness by appending timestamp if needed
      if (queryIDToUse && queryIDToUse.length === 32) {
        // Check if this queryID was already used recently (within 1 second)
        const lastUsedQueryID = window.lastUsedQueryID;
        const lastUsedTime = window.lastUsedQueryIDTime;
        const currentTime = Date.now();
        
        if (lastUsedQueryID === queryIDToUse && lastUsedTime && (currentTime - lastUsedTime) < 1000) {
          // Same queryID used recently, append timestamp to make it unique
          const timestamp = currentTime.toString(36);
          queryIDToUse = queryIDToUse + '_' + timestamp;
        }
        
        // Store this queryID and time for future reference
        window.lastUsedQueryID = queryIDToUse;
        window.lastUsedQueryIDTime = currentTime;
      }
      
      // If we still don't have a queryID, generate a unique one
      if (!queryIDToUse) {
        queryIDToUse = generateUniqueQueryID();
      }
      
      // Determine event name based on click type
      const eventName = event.type === 'contextmenu' ? 'Item Right-Clicked' : 'Item Clicked';

      // Use direct Algolia Analytics API instead of search-insights library for better control
      try {
        const insightsUrl = 'https://insights.algolia.io/1/events';
        
        const eventData = {
          events: [{
            eventType: 'click',
            eventName: eventName,
            index: 'adapty',
            objectIDs: [objectID],
            userToken: userToken,
            timestamp: Date.now(),
          }]
        };

        if (queryIDToUse && queryIDToUse.length >= 32) {
          eventData.events[0].queryID = queryIDToUse;
          eventData.events[0].positions = [position];
        } else {
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
        } else {
          console.error('AlgoliaAnalytics: Direct API failed with status:', response.status);
          // Fallback to search-insights library
          if (queryIDToUse && queryIDToUse.length >= 32) {
            aa('clickedObjectIDsAfterSearch', {
              eventName: eventName,
              index: 'adapty',
              objectIDs: [objectID],
              positions: [position],
              queryID: queryIDToUse,
              userToken: userToken,
            });
          } else {
            aa('clickedObjectIDs', {
              eventName: eventName,
              index: 'adapty',
              objectIDs: [objectID],
              userToken: userToken,
            });
          }
        }
        
      } catch (error) {
        console.error('AlgoliaAnalytics: Error sending click event:', error);
        
        // Final fallback to search-insights library
        try {
          if (queryIDToUse && queryIDToUse.length >= 32) {
            aa('clickedObjectIDsAfterSearch', {
              eventName: eventName,
              index: 'adapty',
              objectIDs: [objectID],
              positions: [position],
              queryID: queryIDToUse,
              userToken: userToken,
            });
          } else {
            aa('clickedObjectIDs', {
              eventName: eventName,
              index: 'adapty',
              objectIDs: [objectID],
              userToken: userToken,
            });
          }
        } catch (fallbackError) {
          console.error('AlgoliaAnalytics: All click event methods failed:', fallbackError);
        }
      }
    };

    // Track search queries
    const handleSearchQuery = async (event) => {
      const searchInput = event.target;
      const query = searchInput.value.trim();
      
      if (query) {
        
        // Always update the current search query, even if it's the same
        const previousQuery = currentSearchQuery;
        currentSearchQuery = query;
        
        // Note: search-insights library doesn't have a 'search' method
        // Search events are automatically tracked by Algolia when search requests are made
        // We just store the query for linking with click events
        
        // queryID will be captured from the actual Algolia search request
      } else {
        currentSearchQuery = '';
      }
    };

    // Function to set up search input listeners
    const setupSearchInputListeners = (searchInput) => {
      if (!searchInput) {
        return;
      }
      
      // Remove existing listeners to avoid duplicates
      searchInput.removeEventListener('input', handleSearchQuery);
      searchInput.removeEventListener('change', handleSearchQuery);
      searchInput.removeEventListener('keyup', handleSearchQuery);
      
      // Add multiple event listeners to catch all types of input
      searchInput.addEventListener('input', handleSearchQuery);
      searchInput.addEventListener('change', handleSearchQuery);
      searchInput.addEventListener('keyup', handleSearchQuery);
      
      
      // Also check the current value
      if (searchInput.value.trim()) {
        const previousQuery = currentSearchQuery;
        currentSearchQuery = searchInput.value.trim();
      }
    };

    // Function to find and set up search input
    const findAndSetupSearchInput = () => {
      // Try multiple selectors for DocSearch input
      const selectors = [
        '.DocSearch-Input',
        '.DocSearch input',
        '.DocSearch-Input input',
        '[data-testid="docsearch-input"]',
        'input[placeholder*="search"]',
        'input[placeholder*="Search"]',
        'input[placeholder*="docs"]',
        'input[placeholder*="Docs"]',
        'input[placeholder*="documentation"]',
        'input[placeholder*="Documentation"]',
        '.docsearch-input',
        '.docsearch input',
        '#docsearch-input',
        'input[type="search"]',
        'input[aria-label*="search"]',
        'input[aria-label*="Search"]'
      ];
      
      for (const selector of selectors) {
        const searchInput = document.querySelector(selector);
        if (searchInput) {
          setupSearchInputListeners(searchInput);
          return searchInput;
        }
      }
      
      // Also try to find any input that might be a search input by examining all inputs
      const allInputs = document.querySelectorAll('input');
      for (const input of allInputs) {
        const placeholder = input.placeholder?.toLowerCase() || '';
        const ariaLabel = input.getAttribute('aria-label')?.toLowerCase() || '';
        const className = input.className?.toLowerCase() || '';
        const id = input.id?.toLowerCase() || '';
        
        if (placeholder.includes('search') || 
            placeholder.includes('docs') || 
            placeholder.includes('documentation') ||
            ariaLabel.includes('search') ||
            className.includes('search') ||
            className.includes('docsearch') ||
            id.includes('search') ||
            id.includes('docsearch')) {
          setupSearchInputListeners(input);
          return input;
        }
      }
      
      return null;
    };

    // Listen for DocSearch events
    const handleDocSearchEvent = (event) => {
      
      // Check if this is a search event with queryID
      if (event.detail && event.detail.queryID) {
        const newQueryID = event.detail.queryID;
        if (newQueryID !== currentQueryID) {
          currentQueryID = newQueryID;
        } else {
        }
      }
      
      // Check if this is a search event with query
      if (event.detail && event.detail.query) {
        currentSearchQuery = event.detail.query;
      }
      
      // Capture search results data when results are loaded
      if (event.type === 'docsearch:results') {
        setTimeout(() => {
          captureSearchResultsData();
        }, 100); // Small delay to ensure DOM is updated
      }
    };

    // Listen for Algolia search events
    const handleAlgoliaEvent = (event) => {
      
      // Check for queryID in various event types
      if (event.detail && event.detail.queryID) {
        const newQueryID = event.detail.queryID;
        if (newQueryID !== currentQueryID) {
          currentQueryID = newQueryID;
        } else {
        }
      }
      
      // Check for query in search events
      if (event.detail && event.detail.query) {
        currentSearchQuery = event.detail.query;
      }
    };

    // Listen for search insights events
    const handleSearchInsightsEvent = (event) => {
      
      if (event.detail && event.detail.queryID) {
        const newQueryID = event.detail.queryID;
        if (newQueryID !== currentQueryID) {
          currentQueryID = newQueryID;
        } else {
        }
      }
    };

    // Monitor for queryID in search results
    const monitorSearchResults = () => {
      const searchResults = document.querySelectorAll('.DocSearch-Hit');
      for (const hit of searchResults) {
        // Check for queryID in various data attributes
        const queryID = hit.getAttribute('data-query-id') || 
                       hit.getAttribute('data-queryid') ||
                       hit.getAttribute('data-query-id') ||
                       hit.querySelector('[data-query-id]')?.getAttribute('data-query-id') ||
                       hit.querySelector('[data-queryid]')?.getAttribute('data-queryid');
        
        if (queryID && queryID.length === 32) {
          if (queryID !== currentQueryID) {
            currentQueryID = queryID;
          } else {
          }
          break;
        }
      }
    };

    // Capture search results data for objectID lookup
    const captureSearchResultsData = () => {
      const searchResults = document.querySelectorAll('.DocSearch-Hit');
      searchResultsData = [];
      
      searchResults.forEach((hit, index) => {
        const link = hit.querySelector('a');
        if (link) {
          // Try to extract objectID from various sources
          let objectID = hit.getAttribute('data-object-id') || 
                        hit.getAttribute('data-objectid') ||
                        hit.dataset.objectId;
          
          // If no objectID found, try to extract from hit data
          if (!objectID) {
            const hitData = hit.getAttribute('data-hit');
            if (hitData) {
              try {
                const hitObj = JSON.parse(hitData);
                objectID = hitObj.objectID;
              } catch (e) {
                // Ignore parsing errors
              }
            }
          }
          
          // Store the result data
          searchResultsData.push({
            index: index,
            objectID: objectID,
            url: link.href,
            title: link.textContent?.trim(),
            element: hit
          });
          
          if (objectID) {
          } else {
          }
        }
      });
      
    };

    // Find objectID by URL from captured search results
    const findObjectIDByURL = (url) => {
      
      // Normalize the URL for matching
      const normalizedUrl = url.replace(/^https?:\/\/[^\/]+/, ''); // Remove protocol and domain
      
      // First try to find in the objectID map from API response
      let objectID = objectIDMap.get(url);
      if (objectID) {
        return objectID;
      }
      
      // Try matching by normalized URL (path only)
      for (const [mapUrl, mapObjectID] of objectIDMap.entries()) {
        const mapNormalizedUrl = mapUrl.replace(/^https?:\/\/[^\/]+/, '');
        if (mapNormalizedUrl === normalizedUrl) {
          return mapObjectID;
        }
      }
      
      // Try matching by pathname
      try {
        const urlObj = new URL(url);
        const pathname = urlObj.pathname;
        
        for (const [mapUrl, mapObjectID] of objectIDMap.entries()) {
          try {
            const mapUrlObj = new URL(mapUrl);
            if (mapUrlObj.pathname === pathname) {
              return mapObjectID;
            }
          } catch (e) {
            // Skip invalid URLs
          }
        }
      } catch (e) {
        // Skip invalid URLs
      }
      
      // Fallback to captured search results data
      const result = searchResultsData.find(item => item.url === url);
      if (result && result.objectID) {
        return result.objectID;
      }
      
      objectIDMap.forEach((objectID, mapUrl) => {
      });
      
      return null;
    };

    // Function to manually capture objectIDs from current search results
    const captureObjectIDsFromCurrentResults = () => {
      
      // Get all search result links
      const searchResultLinks = document.querySelectorAll('.DocSearch-Hit a');
      
      if (searchResultLinks.length === 0) {
        return;
      }
      
      // For each link, try to find a matching objectID from the API response
      searchResultLinks.forEach((link, index) => {
        const url = link.href;
        
        // Try to find objectID for this URL
        const objectID = findObjectIDByURL(url);
        if (objectID) {
        } else {
        }
      });
    };

    // Function to sync objectID map with current search query
    const syncObjectIDMapWithCurrentQuery = async () => {
      const searchInput = document.querySelector('.DocSearch-Input');
      if (!searchInput || !searchInput.value.trim()) {
        return;
      }
      
      const query = searchInput.value.trim();
      
      try {
        const searchUrl = 'https://IPH9RRTSQS-dsn.algolia.net/1/indexes/adapty/query';
        const response = await fetch(searchUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Algolia-Application-Id': 'IPH9RRTSQS',
            'X-Algolia-API-Key': '5e3fd9357b98f9f0d44bab0f0b7634c0',
          },
          body: JSON.stringify({
            query: query,
            hitsPerPage: 20,
            attributesToRetrieve: ['objectID', 'url', 'title', 'type', 'content'],
            clickAnalytics: true, // Enable clickAnalytics to get queryID
            analytics: true // Enable analytics for better tracking
          })
        });
        
        const data = await response.json();
        
        // Extract queryID from response
        const queryID = extractQueryIDFromResponse(data, query);
        
        if (data.hits && data.hits.length > 0) {
          
          // Clear previous objectID map
          objectIDMap.clear();
          
          // Extract objectIDs and map them to URLs
          data.hits.forEach((hit, index) => {
            if (hit.objectID && hit.url) {
              // Convert production URL to localhost URL for matching
              const localUrl = hit.url.replace('https://adapty.io', 'http://localhost:3000');
              objectIDMap.set(localUrl, hit.objectID);
              objectIDMap.set(hit.url, hit.objectID); // Also store original URL
              
            }
          });
          
          
          // Now try to find objectIDs for current search results
          setTimeout(() => {
            captureObjectIDsFromCurrentResults();
          }, 500);
          
        } else {
        }
      } catch (error) {
        console.error('AlgoliaAnalytics: Error in sync API call:', error);
      }
    };

    // Expose refresh function globally for testing
    if (typeof window !== 'undefined') {
      window.refreshAlgoliaUserToken = refreshUserToken;
    }

    // Expose debug functions globally
    if (typeof window !== 'undefined') {
      window.debugAlgoliaState = () => {
        
        // Check search input
        const searchInput = document.querySelector('.DocSearch-Input');
        if (searchInput) {
        } else {
        }
        
        
        if (objectIDMap.size > 0) {
          objectIDMap.forEach((objectID, url) => {
          });
        }
        
        if (queryIDMap.size > 0) {
          queryIDMap.forEach((queryID, query) => {
          });
        }
        
        if (searchResultsData.length > 0) {
          searchResultsData.forEach((result, index) => {
          });
        }
      };

      window.testAlgoliaSearch = async (query = 'test') => {
        
        // Clear previous objectID map
        objectIDMap.clear();
        
        // Try to trigger a search through the search input
        const searchInput = document.querySelector('.DocSearch-Input');
        if (searchInput) {
          // Set the value and trigger input event
          searchInput.value = query;
          searchInput.dispatchEvent(new Event('input', { bubbles: true }));
          
          // Also trigger other events that might be needed
          searchInput.dispatchEvent(new Event('change', { bubbles: true }));
          searchInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
          
          // Wait a bit and then sync the objectID map with the current query
          setTimeout(async () => {
            await syncObjectIDMapWithCurrentQuery();
            
            
            if (objectIDMap.size > 0) {
              objectIDMap.forEach((objectID, url) => {
              });
            } else {
              captureObjectIDsFromCurrentResults();
            }
            
            if (queryIDMap.size > 0) {
              queryIDMap.forEach((queryID, searchQuery) => {
              });
            } else {
            }
          }, 2000); // Reduced delay since we're using sync approach
        } else {
        }
      };

      window.syncObjectIDMapWithCurrentQuery = syncObjectIDMapWithCurrentQuery;

      window.captureObjectIDsFromCurrentResults = captureObjectIDsFromCurrentResults;

      window.captureSearchResults = () => {
        captureSearchResultsData();
      };

      window.testAlgoliaAPI = async (query = 'stripe') => {
        
        try {
          const searchUrl = 'https://IPH9RRTSQS-dsn.algolia.net/1/indexes/adapty/query';
          const response = await fetch(searchUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Algolia-Application-Id': 'IPH9RRTSQS',
              'X-Algolia-API-Key': '5e3fd9357b98f9f0d44bab0f0b7634c0',
            },
            body: JSON.stringify({
              query: query,
              hitsPerPage: 20,
              attributesToRetrieve: ['objectID', 'url', 'title', 'type', 'content'],
              clickAnalytics: true, // Enable clickAnalytics to get queryID
              analytics: true // Enable analytics for better tracking
            })
          });
          
          const data = await response.json();
          
          // Extract queryID from response
          const queryID = extractQueryIDFromResponse(data, query);
          
          if (data.hits && data.hits.length > 0) {
            
            // Clear previous objectID map
            objectIDMap.clear();
            
            // Extract objectIDs and map them to URLs
            data.hits.forEach((hit, index) => {
              if (hit.objectID && hit.url) {
                // Convert production URL to localhost URL for matching
                const localUrl = hit.url.replace('https://adapty.io', 'http://localhost:3000');
                objectIDMap.set(localUrl, hit.objectID);
                objectIDMap.set(hit.url, hit.objectID); // Also store original URL
                
              }
            });
            
            
            return data;
          } else {
            return null;
          }
        } catch (error) {
          console.error('AlgoliaAnalytics: Error in direct API call:', error);
          return null;
        }
      };

    }

    // Set up event listeners
    const setupListeners = () => {
      
      // Listen for DocSearch events
      document.addEventListener('docsearch:search', handleDocSearchEvent);
      document.addEventListener('docsearch:results', handleDocSearchEvent);
      document.addEventListener('docsearch:opened', handleDocSearchEvent);
      document.addEventListener('docsearch:closed', handleDocSearchEvent);
      
      // Listen for Algolia events
      document.addEventListener('algolia:search', handleAlgoliaEvent);
      document.addEventListener('algolia:results', handleAlgoliaEvent);
      
      // Listen for search insights events
      document.addEventListener('search-insights:search', handleSearchInsightsEvent);
      document.addEventListener('search-insights:click', handleSearchInsightsEvent);
      
      // Listen for clicks on search results (both left and right clicks)
      const searchResults = document.querySelectorAll('.DocSearch-Hit a');
      searchResults.forEach(result => {
        result.addEventListener('click', handleResultClick);
        result.addEventListener('contextmenu', handleResultClick); // Add right-click support
      });

      // Set up search input tracking
      findAndSetupSearchInput();
      
      // Initial check for queryID in existing search results
      monitorSearchResults();
      
      // Set up periodic monitoring for queryID in search results and search input
      const queryIDMonitor = setInterval(() => {
        if (!currentQueryID) {
          monitorSearchResults();
        }
        
        // Also periodically check for search input in case it's added dynamically
        if (!document.querySelector('.DocSearch-Input')) {
          findAndSetupSearchInput();
        }
      }, 1000); // Check every second if we don't have a queryID
      
      // Store the interval ID for cleanup
      window.algoliaQueryIDMonitor = queryIDMonitor;
    };

    // Initial setup
    setupListeners();

    // Set up mutation observer to handle dynamically added search elements
    let observer = null;
    if (typeof window !== 'undefined' && typeof MutationObserver !== 'undefined') {
      observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                // Check for new search results
                const newSearchResults = node.querySelectorAll('.DocSearch-Hit a');
                newSearchResults.forEach(result => {
                  result.addEventListener('click', handleResultClick);
                  result.addEventListener('contextmenu', handleResultClick); // Add right-click support
                });

                // Check for new search input
                const newSearchInput = node.querySelector('.DocSearch-Input');
                if (newSearchInput) {
                  setupSearchInputListeners(newSearchInput);
                }
                
                // Also check if the node itself is a search input
                if (node.matches && (node.matches('.DocSearch-Input') || node.matches('input[placeholder*="search"]'))) {
                  setupSearchInputListeners(node);
                }
                
                // Check for queryID in newly added search results
                if (!currentQueryID) {
                  const newHits = node.querySelectorAll('.DocSearch-Hit');
                  for (const hit of newHits) {
                    const queryID = hit.getAttribute('data-query-id') || 
                                   hit.getAttribute('data-queryid') ||
                                   hit.querySelector('[data-query-id]')?.getAttribute('data-query-id') ||
                                   hit.querySelector('[data-queryid]')?.getAttribute('data-queryid');
                    
                    if (queryID && queryID.length === 32) {
                      currentQueryID = queryID;
                      break;
                    }
                  }
                }
                
                // Capture search results data when new results are added
                const newHits = node.querySelectorAll('.DocSearch-Hit');
                if (newHits.length > 0) {
                  setTimeout(() => {
                    captureSearchResultsData();
                  }, 100); // Small delay to ensure DOM is updated
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

    }

    // Cleanup
    return () => {
      
      if (typeof window !== 'undefined') {
        // Disconnect mutation observer
        if (observer) {
          observer.disconnect();
        }
        
        // Clear the queryID monitoring interval
        if (window.algoliaQueryIDMonitor) {
          clearInterval(window.algoliaQueryIDMonitor);
          delete window.algoliaQueryIDMonitor;
        }
        
        // Restore original fetch
        if (originalFetch) {
          window.fetch = originalFetch;
        }
        
        // Restore original XMLHttpRequest
        if (originalXHROpen) {
          XMLHttpRequest.prototype.open = originalXHROpen;
        }
        if (originalXHRSend) {
          XMLHttpRequest.prototype.send = originalXHRSend;
        }
        
        // Remove DocSearch event listeners
        document.removeEventListener('docsearch:search', handleDocSearchEvent);
        document.removeEventListener('docsearch:results', handleDocSearchEvent);
        document.removeEventListener('docsearch:opened', handleDocSearchEvent);
        document.removeEventListener('docsearch:closed', handleDocSearchEvent);
        
        // Remove Algolia event listeners
        document.removeEventListener('algolia:search', handleAlgoliaEvent);
        document.removeEventListener('algolia:results', handleAlgoliaEvent);
        
        // Remove search insights event listeners
        document.removeEventListener('search-insights:search', handleSearchInsightsEvent);
        document.removeEventListener('search-insights:click', handleSearchInsightsEvent);
        
        const searchResults = document.querySelectorAll('.DocSearch-Hit a');
        searchResults.forEach(result => {
          result.removeEventListener('click', handleResultClick);
          result.removeEventListener('contextmenu', handleResultClick);
        });
      }
    };
  }, []);

  // Expose queryID map globally for debugging
  if (typeof window !== 'undefined') {
    window.getQueryIDMap = () => {
      if (queryIDMap.size === 0) {
        return {};
      }
      
      const map = {};
      queryIDMap.forEach((queryID, query) => {
        map[query] = queryID;
      });
      return map;
    };

    // Expose function to get queryID for a specific query
    window.getQueryIDForQuery = getQueryIDForQuery;

    // Function to manually update current search query
    window.updateCurrentSearchQuery = (query) => {
      if (query && query.trim()) {
        currentSearchQuery = query.trim();
        return currentSearchQuery;
      } else {
        return null;
      }
    };

    // Function to get current search query
    window.getCurrentSearchQuery = () => {
      return currentSearchQuery;
    };

    // Function to get current search query from input field
    window.getCurrentSearchQueryFromInput = getCurrentSearchQueryFromInput;

    // Function to manually refresh search input listeners
    window.refreshSearchInputListeners = () => {
      findAndSetupSearchInput();
      return 'Search input listeners refreshed';
    };
  }

  return null;
};

const AlgoliaAnalytics = () => {
  return (
    <BrowserOnly fallback={<div />}>
      {() => <AlgoliaAnalyticsComponent />}
    </BrowserOnly>
  );
};

export default AlgoliaAnalytics; 