import { visit } from 'unist-util-visit';

// Plugin to remove import statements from MDX and markdown files
export function remarkStripImports() {
  return (tree) => {
    const nodesToRemove = [];

    visit(tree, (node, index, parent) => {
      // For MDX files: surgically remove problematic lines from ESM blocks instead of stripping the whole node
      if (node.type === 'mdxjsEsm') {
        const lines = node.value.split('\n');
        const filteredLines = lines.filter(line => {
          const isBad = (
            line.includes("@theme/") ||
            line.includes("@site/src/components/reusable/") ||
            line.includes("@site/src/components/Details") ||
            line.includes("@site/src/components/InlineTooltip") ||
            line.includes("@site/src/components/ZoomImage") ||
            line.includes("react-medium-image-zoom") ||
            (line.includes("import ") && line.includes("'@") && !line.includes("src/components/reusable/"))
          );
          return !isBad;
        });

        if (filteredLines.length === 0) {
          nodesToRemove.push({ parent, index });
        } else {
          node.value = filteredLines.join('\n');
        }
      }

      // For regular markdown: remove paragraphs that look like import statements
      if (node.type === 'paragraph') {
        const firstChild = node.children && node.children[0];
        if (firstChild && firstChild.type === 'text' && firstChild.value.startsWith('import ')) {
          nodesToRemove.push({ parent, index });
        }
      }
    });

    // Remove in reverse order to maintain correct indices
    nodesToRemove.reverse().forEach(({ parent, index }) => {
      parent.children.splice(index, 1);
    });
  };
}
