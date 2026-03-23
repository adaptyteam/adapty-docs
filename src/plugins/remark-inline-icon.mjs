import { visit } from 'unist-util-visit';

/**
 * Remark plugin to transform :icon[name] directives into <Icon name="..." /> components.
 * Must run after remarkDirective (which parses the syntax) and before remarkAside
 * (which converts unknown directives to plain text).
 */
export function remarkInlineIcon() {
  return (tree) => {
    visit(tree, 'textDirective', (node) => {
      if (node.name !== 'icon') return;

      const iconName = node.children?.[0]?.value;
      if (!iconName) return;

      node.type = 'mdxJsxTextElement';
      node.name = 'Icon';
      node.attributes = [{
        type: 'mdxJsxAttribute',
        name: 'name',
        value: iconName,
      }];
      node.children = [];

      if (node.data) delete node.data;
    });
  };
}
