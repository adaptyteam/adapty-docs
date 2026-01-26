import { visit } from 'unist-util-visit';

// Plugin to remove import statements from MDX and markdown files
export function remarkStripImports() {
  return (tree) => {
    const nodesToRemove = [];

    visit(tree, (node, index, parent) => {
      // For MDX files: surgically remove problematic lines from ESM blocks instead of stripping the whole node
      if (node.type === 'mdxjsEsm') {
        nodesToRemove.push({ parent, index });
      }

      // For regular markdown: remove paragraphs that look like import statements
      if (node.type === 'paragraph') {
        const firstChild = node.children && node.children[0];
        if (firstChild && firstChild.type === 'text') {
          const value = firstChild.value.trim();
          if (value.startsWith('import ') || value.startsWith('export ')) {
            nodesToRemove.push({ parent, index });
          }
        }
      }
    });

    // Remove in reverse order to maintain correct indices
    nodesToRemove.reverse().forEach(({ parent, index }) => {
      if (parent && parent.children) {
        parent.children.splice(index, 1);
      }
    });
  };
}
