import { visit } from 'unist-util-visit';

export function remarkAside() {
    return (tree) => {
        visit(tree, (node) => {
            if (node.type !== 'containerDirective') return;

            const type = node.name;
            if (!['note', 'tip', 'info', 'warning', 'danger', 'link'].includes(type)) return;

            // Transform to MDX JSX Component (<Callout>)
            node.type = 'mdxJsxFlowElement';
            node.name = 'Callout';

            // Construct props/attributes
            node.attributes = [
                {
                    type: 'mdxJsxAttribute',
                    name: 'type',
                    value: type
                }
            ];

            // Keep the children as-is
            // Remove data fields that might interfere
            delete node.data;
        });
    };
}
