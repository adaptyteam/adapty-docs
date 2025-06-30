// Simple test to check objectIDs in your Algolia index
import { liteClient as algoliasearch } from 'algoliasearch/lite';

const client = algoliasearch('IPH9RRTSQS', '5e3fd9357b98f9f0d44bab0f0b7634c0');
const index = client.initIndex('adapty');

// Search for a few records to see their object IDs
index.search('setting user attributes', {
  hitsPerPage: 5,
  attributesToRetrieve: ['objectID', 'url', 'hierarchy']
}).then(({ hits }) => {
  console.log('Sample object IDs from your index:');
  hits.forEach((hit, i) => {
    console.log(`${i + 1}. Object ID: "${hit.objectID}"`);
    console.log(`   URL: ${hit.url}`);
    console.log(`   Title: ${hit.hierarchy?.lvl1 || 'N/A'}`);
    console.log('');
  });
}).catch(error => {
  console.error('Error fetching records:', error);
}); 