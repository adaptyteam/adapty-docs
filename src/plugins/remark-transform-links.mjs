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
    const baseUrl = '/docs';

    return (tree) => {
        // Visit all link nodes in the markdown AST
        visit(tree, 'link', (node) => {
            if (!node.url) return;
            
            let url = node.url;
            
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
            
            if (url === '.md' || url === '.mdx' || url === './.md' || url === './.mdx') {
                return;
            }

            // Transform the link by removing .md or .mdx extension
            url = url
                .replace(/\.mdx?(#[^#]*)?$/, '$1')
                .replace(/\.mdx?$/, '');

            // Prepend base URL if it's an internal link
            // 1. Root-relative links: /path -> /docs/path
            if (url.startsWith('/')) {
                if (!url.startsWith(baseUrl + '/') && url !== baseUrl) {
                    url = `${baseUrl}${url}`.replace(/\/+/g, '/');
                }
            } 
            // 2. Relative links: something -> /docs/something
            //    Exclude anchor-only which we checked above
            else if (!url.includes(':') && !url.startsWith('.')) {
                url = `${baseUrl}/${url}`.replace(/\/+/g, '/');
            }
            
            node.url = url;
        });
        
        // Also handle JSX link components if any (for MDX)
        visit(tree, 'mdxJsxFlowElement', (node) => {
            if (node.name === 'a' || node.name === 'Link') {
                const hrefAttr = node.attributes?.find(attr => attr.name === 'href');
                
                if (hrefAttr && typeof hrefAttr.value === 'string') {
                    let url = hrefAttr.value;
                    
                    if (url.startsWith('http://') || 
                        url.startsWith('https://') || 
                        url.startsWith('//') ||
                        url.startsWith('mailto:') ||
                        url.startsWith('tel:') ||
                        url.startsWith('#')) {
                        return;
                    }
                    
                    // Transform the link
                    url = url
                        .replace(/\.mdx?(#[^#]*)?$/, '$1')
                        .replace(/\.mdx?$/, '');

                    if (url.startsWith('/')) {
                        if (!url.startsWith(baseUrl + '/') && url !== baseUrl) {
                            url = `${baseUrl}${url}`.replace(/\/+/g, '/');
                        }
                    } else if (!url.includes(':') && !url.startsWith('.')) {
                        url = `${baseUrl}/${url}`.replace(/\/+/g, '/');
                    }

                    hrefAttr.value = url;
                }
            }
        });
    };
}

