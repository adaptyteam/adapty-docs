const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

/**
 * Custom plugin to add keywords and rank meta tags from frontmatter
 * This helps Algolia crawler rank search results better
 */
function customMetaPlugin() {
  console.log('CustomMetaPlugin: Plugin function called');
  return {
    name: 'custom-meta-plugin',
    async postBuild({ siteDir }) {
      console.log('CustomMetaPlugin: Starting post-build processing...');
      console.log('CustomMetaPlugin: siteDir:', siteDir);
      
      try {
        // Load frontmatter data
        const frontmatterCache = new Map();
        const docsDir = path.join(siteDir, 'versioned_docs', 'version-3.0');
        
        console.log('CustomMetaPlugin: Looking for docs in:', docsDir);
        console.log('CustomMetaPlugin: Docs dir exists:', fs.existsSync(docsDir));
        
        if (fs.existsSync(docsDir)) {
          const files = fs.readdirSync(docsDir);
          console.log('CustomMetaPlugin: Found', files.length, 'files in docs directory');
          
          for (const file of files) {
            if (file.endsWith('.md')) {
              const filePath = path.join(docsDir, file);
              const content = fs.readFileSync(filePath, 'utf8');
              const { data: frontmatter } = matter(content);
              
              // Store frontmatter data keyed by filename without extension
              const key = file.replace('.md', '');
              frontmatterCache.set(key, frontmatter);
              
              // Debug: Log stripe file specifically
              if (key === 'stripe') {
                console.log('CustomMetaPlugin: Found stripe file with frontmatter:', frontmatter);
              }
            }
          }
          
          console.log('CustomMetaPlugin: Loaded frontmatter for', frontmatterCache.size, 'files');
        }
        
        // Process HTML files in the build directory
        const buildDir = path.join(siteDir, 'build');
        await processHtmlFiles(buildDir, frontmatterCache);
        
        console.log('CustomMetaPlugin: Post-build processing completed');
      } catch (error) {
        console.error('CustomMetaPlugin: Error in post-build processing:', error);
      }
    }
  };
}

async function processHtmlFiles(dir, frontmatterCache) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    
    if (item.isDirectory()) {
      await processHtmlFiles(fullPath, frontmatterCache);
    } else if (item.isFile() && item.name.endsWith('.html')) {
      await processHtmlFile(fullPath, frontmatterCache);
    }
  }
}

async function processHtmlFile(filePath, frontmatterCache) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract page ID from the HTML
    const pageId = extractPageIdFromHtml(content);
    
    if (pageId && frontmatterCache.has(pageId)) {
      const frontmatter = frontmatterCache.get(pageId);
      let updatedContent = content;
      
      // Add keywords meta tag if present
      if (frontmatter.keywords && Array.isArray(frontmatter.keywords) && frontmatter.keywords.length > 0) {
        const keywordsContent = frontmatter.keywords.join(', ');
        updatedContent = addMetaTag(updatedContent, 'keywords', keywordsContent);
        console.log('CustomMetaPlugin: Added keywords for', pageId, ':', keywordsContent);
      }
      
      // Add rank meta tag if present
      if (frontmatter.rank !== undefined && frontmatter.rank !== null) {
        updatedContent = addMetaTag(updatedContent, 'rank', frontmatter.rank.toString());
        console.log('CustomMetaPlugin: Added rank for', pageId, ':', frontmatter.rank);
      }
      
      // Write the updated content back to the file
      if (updatedContent !== content) {
        fs.writeFileSync(filePath, updatedContent, 'utf8');
      }
    }
  } catch (error) {
    console.warn('CustomMetaPlugin: Error processing file', filePath, ':', error);
  }
}

function extractPageIdFromHtml(html) {
  try {
    // Try to extract from the page data in the HTML
    const pageDataMatch = html.match(/<script[^>]*>window\.__docusaurus\s*=\s*({.*?});<\/script>/s);
    if (pageDataMatch) {
      const pageData = JSON.parse(pageDataMatch[1]);
      
      // Get the current page info
      const currentPage = pageData?.pageMetadata?.currentPage;
      if (currentPage) {
        // Extract the page ID from the path
        const path = currentPage.permalink || currentPage.path || '';
        const id = path.split('/').pop() || path.split('/').slice(-2, -1)[0];
        return id.replace('.html', '');
      }
    }
    
    // Fallback: try to extract from URL in the HTML
    const urlMatch = html.match(/<meta[^>]*property=["']og:url["'][^>]*content=["']([^"']+)["']/);
    if (urlMatch) {
      const url = urlMatch[1];
      const id = url.split('/').pop() || url.split('/').slice(-2, -1)[0];
      return id.replace('.html', '');
    }
  } catch (error) {
    console.warn('CustomMetaPlugin: Error extracting page ID:', error);
  }
  
  return null;
}

function addMetaTag(html, name, content) {
  // Remove existing meta tag if it exists
  const existingMetaRegex = new RegExp(`<meta[^>]*name=["']${name}["'][^>]*>`, 'gi');
  html = html.replace(existingMetaRegex, '');
  
  // Try to add the meta tag in the same location as other Docusaurus meta tags
  // Look for the keywords meta tag and add rank right after it
  const keywordsRegex = /(<meta[^>]*name=["']keywords["'][^>]*>)/;
  const match = html.match(keywordsRegex);
  
  if (match) {
    // Add rank meta tag right after keywords
    const rankMetaTag = `    <meta name="${name}" content="${content}" data-rh="true">`;
    html = html.replace(match[0], match[0] + '\n' + rankMetaTag);
  } else {
    // Fallback: add before closing head tag
    const metaTag = `    <meta name="${name}" content="${content}" data-rh="true">`;
    html = html.replace('</head>', `${metaTag}\n</head>`);
  }
  
  return html;
}

module.exports = customMetaPlugin;
