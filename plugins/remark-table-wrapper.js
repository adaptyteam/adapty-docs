const { visit } = require('unist-util-visit');

/**
 * Remark plugin to wrap tables in a scrollable div
 */
function remarkTableWrapper() {
  return (tree) => {
    visit(tree, 'table', (node, index, parent) => {
      // Create a wrapper container node with the table as a child
      const wrapper = {
        type: 'mdxJsxFlowElement',
        name: 'div',
        attributes: [
          {
            type: 'mdxJsxAttribute',
            name: 'className',
            value: 'table-wrapper',
          },
        ],
        children: [node],
        data: { _mdxExplicitJsx: true },
      };
      
      // Replace the table with the wrapped version
      parent.children[index] = wrapper;
    });
  };
}

module.exports = remarkTableWrapper;
