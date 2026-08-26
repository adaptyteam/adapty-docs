import { visit } from 'unist-util-visit';

// Plugin to transform <Details> components to native <details> HTML
export function remarkTransformDetails() {
  return (tree) => {
    visit(tree, (node) => {
      // Transform JSX opening tags
      if (node.type === 'mdxJsxFlowElement' && node.name === 'Details') {
        node.name = 'details';

        // MDX parses an inline <summary>...</summary> child as a paragraph wrapping
        // the summary. Served as <p><summary>…</summary></p>, the browser parser
        // splits that into empty <p> elements around the summary, and the details
        // content padding turns them into a visible gap. Hoist the summary out of
        // the paragraph so it compiles as a block-level element.
        node.children = (node.children || []).map((child) => {
          if (child.type !== 'paragraph') return child;
          const meaningful = child.children.filter(
            (c) => !(c.type === 'text' && c.value.trim() === '')
          );
          if (meaningful.length === 1 && meaningful[0].type === 'mdxJsxTextElement' && meaningful[0].name === 'summary') {
            return { type: 'mdxJsxFlowElement', name: 'summary', attributes: [], children: meaningful[0].children };
          }
          return child;
        });

        // A summary="..." attribute is lost on the native <details> element, so
        // convert it into a block-level child <summary> node.
        const summaryIndex = (node.attributes || []).findIndex(
          (attr) => attr.type === 'mdxJsxAttribute' && attr.name === 'summary' && typeof attr.value === 'string'
        );
        if (summaryIndex !== -1) {
          const summaryText = node.attributes[summaryIndex].value;
          node.attributes.splice(summaryIndex, 1);
          node.children = [
            {
              type: 'mdxJsxFlowElement',
              name: 'summary',
              attributes: [],
              children: [{ type: 'text', value: summaryText }],
            },
            ...(node.children || []),
          ];
        }
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

