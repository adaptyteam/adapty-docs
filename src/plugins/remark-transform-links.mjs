import { visit } from 'unist-util-visit';

/**
 * Remark plugin to transform markdown/mdx links by removing file extensions
 * 
 * Transforms:
 *   [Link](paywalls.md) -> [Link](paywalls)
 *   [Link](paywalls.mdx) -> [Link](paywalls)
 *   [Link](../paywalls.md) -> [Link](../paywalls)
 *   [Link](./subfolder/page.mdx#anchor) -> [Link](./subfolder/page#anchor)
 * 
 * Preserves:
 *   - External links (http://, https://, //)
 *   - Absolute paths starting with /
 *   - Anchor-only links (#section)
 *   - mailto: and other protocols
 *   - Links to other file types (.pdf, .png, etc.)
 */
export function remarkTransformLinks() {
    return (tree) => {
        // Visit all link nodes in the markdown AST
        visit(tree, 'link', (node) => {
            if (!node.url) return;
            
            const url = node.url;
            
            // Skip external links
            if (url.startsWith('http://') || 
                url.startsWith('https://') || 
                url.startsWith('//') ||
                url.startsWith('mailto:') ||
                url.startsWith('tel:')) {
                return;
            }
            
            // Skip anchor-only links
            if (url.startsWith('#')) {
                return;
            }
            
            // Skip absolute paths (already processed)
            // But allow them to be transformed if they have .md/.mdx
            // Actually, let's transform all internal links
            
            // Transform the link by removing .md or .mdx extension
            // Handle cases with or without anchors: page.md#section or page.mdx
            const transformedUrl = url
                .replace(/\.mdx?(#[^#]*)?$/, '$1')  // Remove .md or .mdx, keep anchor
                .replace(/\.mdx?$/, '');             // Remove .md or .mdx at the end
            
            if (transformedUrl !== url) {
                node.url = transformedUrl;
            }
        });
        
        // Also handle JSX link components if any (for MDX)
        visit(tree, 'mdxJsxFlowElement', (node) => {
            // Check for <a> elements or Link components
            if (node.name === 'a' || node.name === 'Link') {
                const hrefAttr = node.attributes?.find(attr => attr.name === 'href');
                
                if (hrefAttr && typeof hrefAttr.value === 'string') {
                    const url = hrefAttr.value;
                    
                    // Skip external links
                    if (url.startsWith('http://') || 
                        url.startsWith('https://') || 
                        url.startsWith('//') ||
                        url.startsWith('mailto:') ||
                        url.startsWith('tel:') ||
                        url.startsWith('#')) {
                        return;
                    }
                    
                    // Transform the link
                    const transformedUrl = url
                        .replace(/\.mdx?(#[^#]*)?$/, '$1')
                        .replace(/\.mdx?$/, '');
                    
                    if (transformedUrl !== url) {
                        hrefAttr.value = transformedUrl;
                    }
                }
            }
        });
    };
}

