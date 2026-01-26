import { visit } from 'unist-util-visit';

export function remarkHeadingId() {
    return (tree) => {
        visit(tree, 'heading', (node) => {
            const lastChild = node.children[node.children.length - 1];

            if (!lastChild) return;

            // Handle standard text (markdown)
            // Since we escape \{#id\} in MDX source, it appears as text node `{#id}` here.
            if (lastChild.type === 'text') {
                const match = lastChild.value.match(/\s*{#([^}]+)}\s*$/);
                if (match) {
                    const id = match[1];
                    lastChild.value = lastChild.value.replace(match[0], '');
                    if (!node.data) node.data = {};
                    if (!node.data.hProperties) node.data.hProperties = {};
                    node.data.hProperties.id = id;
                }
            }
        });
    };
}
