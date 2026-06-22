import { visit } from 'unist-util-visit';

/**
 * Remark plugin to handle directives.
 * 1. Transforms :::tip, :::note etc. into <Callout> components.
 * 2. Transforms unknown directives (like :00 in 04:00) back into plain text to avoid rendering issues.
 */
export function remarkAside() {
    const CALLOUT_TYPES = ['note', 'tip', 'info', 'warning', 'danger', 'important', 'link'];

    return (tree) => {
        visit(tree, (node, index, parent) => {
            if (node.type === 'containerDirective' || node.type === 'leafDirective' || node.type === 'textDirective') {
                const name = node.name;

                // Handle known directives (Callouts)
                if (CALLOUT_TYPES.includes(name)) {
                    // Force it to be a block element (Callout component)
                    node.type = 'mdxJsxFlowElement';
                    node.name = 'Callout';
                    node.attributes = [{
                        type: 'mdxJsxAttribute',
                        name: 'type',
                        value: name
                    }];

                    // Clear directive-specific data to avoid conflicts with other plugins
                    if (node.data) delete node.data;
                    return;
                }

                // For all other directives (unknown containers, leaf, or text directives),
                // transform them back into text nodes IN PLACE. This is more robust during
                // AST traversal and ensures colons in text (like 04:00) are restored.
                if (parent && typeof index === 'number') {
                    const prefix = node.type === 'textDirective' ? ':' : (node.type === 'leafDirective' ? '::' : ':::');
                    const textValue = `${prefix}${name}`;

                    node.type = 'text';
                    node.value = textValue;

                    // Clean up directive properties to prevent other plugins from misinterpreting the node
                    delete node.name;
                    delete node.attributes;
                    delete node.children;
                    delete node.data;

                    return index + 1;
                }
            }
        });
    };
}
