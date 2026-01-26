import { visit } from 'unist-util-visit';

// Plugin to transform require() calls to static paths
// Transforms: require('./img/file.webp').default -> '/img/file.webp'
export function remarkTransformRequire() {
    return (tree) => {
        visit(tree, (node) => {
            // Check ALL mdxJsxFlowElement and mdxJsxTextElement nodes (handles nested elements)
            if (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') {
                // Check img or ZoomImage elements
                if (node.name === 'img' || node.name === 'ZoomImage') {
                    const attrName = node.name === 'img' ? 'src' : 'id';
                    const srcAttr = node.attributes?.find(attr => attr.name === attrName);
                    if (srcAttr && srcAttr.value && typeof srcAttr.value === 'object') {
                        // This is a JSX expression, look for require pattern
                        if (srcAttr.value.type === 'mdxJsxAttributeValueExpression') {
                            const code = srcAttr.value.value;
                            // Match: require('./path').default or require("./path").default or require('./path')
                            // Match relative paths: require('./path')
                            let requireMatch = code.match(/require\(['"](\.\/[^'"]+)['"]\)(\.default)?/);
                            if (requireMatch) {
                                let path = requireMatch[1];
                                const filename = path.split('/').pop();
                                if (filename && filename !== '.md' && filename !== '.mdx') {
                                    srcAttr.value = filename;
                                }
                            } else {
                                // Match Docusaurus-style paths: require('@site/versioned_docs/version-3.0/img/...').default
                                requireMatch = code.match(/require\(['"]@site\/versioned_docs\/version-[^\/]+\/(img|FF_img|img_webhook_flows)\/([^'"]+)['"]\)(\.default)?/);
                                if (requireMatch) {
                                    const filename = requireMatch[2];
                                    if (filename && filename !== '.md' && filename !== '.mdx') {
                                        srcAttr.value = filename;
                                    }
                                }
                            }
                        }
                    } else if (srcAttr && typeof srcAttr.value === 'string') {
                        const value = srcAttr.value;
                        if (!value.startsWith('http') && !value.startsWith('/_astro/') && !value.startsWith('/@fs/')) {
                            const filename = value.split('/').pop();
                            if (filename && filename !== '.md' && filename !== '.mdx') {
                                srcAttr.value = filename;
                            }
                        }
                    }

                    // Ensure we always use our MDXImage component for image resolution
                    if (node.name === 'img') {
                        node.name = 'MDXImage';
                    }
                }
            }
        });
    };
}
