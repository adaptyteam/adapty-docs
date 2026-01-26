import { visit } from 'unist-util-visit';

// Plugin to transform <Details> components to native <details> HTML
export function remarkTransformDetails() {
  return (tree) => {
    visit(tree, (node) => {
      // Transform JSX opening tags
      if (node.type === 'mdxJsxFlowElement' && node.name === 'Details') {
        node.name = 'details';
      }
      
      // Transform JSX in text nodes (for inline usage)
      if (node.type === 'text' && node.value) {
        node.value = node.value
          .replace(/<Details>/g, '<details>')
          .replace(/<Details\s+/g, '<details ')
          .replace(/<\/Details>/g, '</details>');
      }
      
      // Transform in HTML nodes
      if (node.type === 'html' && node.value) {
        node.value = node.value
          .replace(/<Details>/g, '<details>')
          .replace(/<Details\s+/g, '<details ')
          .replace(/<\/Details>/g, '</details>');
      }
    });
  };
}

