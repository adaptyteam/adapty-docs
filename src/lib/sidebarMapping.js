// Automated sidebar mapping system
// Generates mapping dynamically from sidebar configuration and groups by title

import sidebarConfig from '../../versioned_sidebars/version-3.0-sidebars.json';

// Mobile SDK sidebar IDs
const MOBILE_SDK_SIDEBARS = ['sdkios', 'sdkandroid', 'sdkflutter', 'sdkreactnative', 'sdkunity'];

// Function to extract all documents from a sidebar recursively
function extractDocumentsFromSidebar(sidebarItems, sidebarId) {
  const documents = [];
  
  for (const item of sidebarItems) {
    if (item.type === 'doc') {
      documents.push({
        id: item.id,
        label: item.label || item.id,
        sidebarId: sidebarId
      });
    } else if (item.type === 'category' && item.items) {
      documents.push(...extractDocumentsFromSidebar(item.items, sidebarId));
    }
  }
  
  return documents;
}

// Function to generate the mapping
function generateSidebarMapping() {
  const mapping = {};
  const titleGroups = {};
  
  // Extract documents from mobile SDK sidebars
  for (const sidebarId of MOBILE_SDK_SIDEBARS) {
    if (sidebarConfig[sidebarId]) {
      const documents = extractDocumentsFromSidebar(sidebarConfig[sidebarId], sidebarId);
      
      for (const doc of documents) {
        // Add to direct mapping
        mapping[doc.id] = doc.sidebarId;
        
        // Group by title for cross-platform mapping
        const title = doc.label.toLowerCase().trim();
        if (!titleGroups[title]) {
          titleGroups[title] = [];
        }
        titleGroups[title].push({
          id: doc.id,
          sidebarId: doc.sidebarId,
          label: doc.label
        });
      }
    }
  }
  
  return { mapping, titleGroups };
}

// Generate the mapping
const { mapping: sidebarMapping, titleGroups } = generateSidebarMapping();

// Function to get sidebar ID from document ID
export function getSidebarIdFromDocId(docId) {
  return sidebarMapping[docId] || null;
}

// Function to check if a document belongs to a mobile SDK sidebar
export function isMobileSdkDocument(docId) {
  const sidebarId = getSidebarIdFromDocId(docId);
  return sidebarId && MOBILE_SDK_SIDEBARS.includes(sidebarId);
}

// Function to get all documents with the same title across platforms
export function getDocumentsByTitle(title) {
  const normalizedTitle = title.toLowerCase().trim();
  return titleGroups[normalizedTitle] || [];
}

// Function to get the corresponding document ID in another platform
export function getCorrespondingDocId(docId, targetSidebarId) {
  const currentDoc = sidebarMapping[docId];
  if (!currentDoc) return null;
  
  // Find the document with the same title in the target sidebar
  const currentSidebarId = getSidebarIdFromDocId(docId);
  if (!currentSidebarId) return null;
  
  // Get all documents from the current sidebar
  const currentSidebarDocs = extractDocumentsFromSidebar(sidebarConfig[currentSidebarId], currentSidebarId);
  const currentDocData = currentSidebarDocs.find(doc => doc.id === docId);
  
  if (!currentDocData) return null;
  
  // Get all documents from the target sidebar
  const targetSidebarDocs = extractDocumentsFromSidebar(sidebarConfig[targetSidebarId], targetSidebarId);
  
  // Find document with the same title
  const correspondingDoc = targetSidebarDocs.find(doc => 
    doc.label.toLowerCase().trim() === currentDocData.label.toLowerCase().trim()
  );
  
  return correspondingDoc ? correspondingDoc.id : null;
}

// Export the mapping for debugging/development
export { sidebarMapping, titleGroups };

// Log the generated mapping for verification
console.log('Generated sidebar mapping:', sidebarMapping);
console.log('Title groups:', titleGroups);
