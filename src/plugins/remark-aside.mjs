import { visit } from 'unist-util-visit';

/**
 * Remark plugin for directives (remark-directive syntax).
 * 1. Turns :::tip, :::note, etc. into <Callout> components.
 * 2. Restores every other directive without losing anything:
 *    - text and leaf directives were never meant as directives (the ":00" in
 *      "04:00"), so they go back to their exact source text;
 *    - an unknown container (a typo like :::caution) keeps its content, without
 *      a callout box, and the build logs a warning naming the file.
 */
export function remarkAside() {
    const CALLOUT_TYPES = ['note', 'tip', 'info', 'warning', 'danger', 'important', 'link'];

    return (tree, file) => {
        const source = String(file?.value ?? '');

        // Exact source text of a node, when positions are available.
        const sourceOf = (node) => {
            const start = node.position?.start?.offset;
            const end = node.position?.end?.offset;
            return source && typeof start === 'number' && typeof end === 'number' ? source.slice(start, end) : undefined;
        };

        // Fallback when there is no source text: the marker and the label's plain text.
        const approximate = (node, prefix) => {
            const label = (node.children ?? []).map((c) => c.value ?? '').join('');
            return `${prefix}${node.name}${label ? `[${label}]` : ''}`;
        };

        visit(tree, (node, index, parent) => {
            if (node.type !== 'containerDirective' && node.type !== 'leafDirective' && node.type !== 'textDirective') return;
            const name = node.name;

            if (CALLOUT_TYPES.includes(name)) {
                // Force it to be a block element (Callout component)
                node.type = 'mdxJsxFlowElement';
                node.name = 'Callout';
                node.attributes = [{ type: 'mdxJsxAttribute', name: 'type', value: name }];
                // Clear directive-specific data to avoid conflicts with other plugins
                if (node.data) delete node.data;
                return;
            }

            if (!parent || typeof index !== 'number') return;

            if (node.type === 'textDirective') {
                parent.children[index] = { type: 'text', value: sourceOf(node) ?? approximate(node, ':') };
                return index + 1;
            }

            if (node.type === 'leafDirective') {
                parent.children[index] = {
                    type: 'paragraph',
                    children: [{ type: 'text', value: sourceOf(node) ?? approximate(node, '::') }],
                };
                return index + 1;
            }

            // Unknown container: keep its content in place; drop the directive's own label paragraph.
            const content = (node.children ?? []).filter((child) => !child.data?.directiveLabel);
            const where = file?.path ? ` in ${file.path}` : '';
            console.warn(`[remark-aside] Unknown callout type ":::${name}"${where}; rendering its content without a callout box.`);
            parent.children.splice(index, 1, ...content);
            return index; // visit the content, which may hold callouts of its own
        });
    };
}
