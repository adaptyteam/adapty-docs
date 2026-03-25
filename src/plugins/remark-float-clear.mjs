import { visit } from 'unist-util-visit';

/**
 * Remark plugin that controls float clearing for ZoomImage floats.
 *
 * Instead of every heading clearing floats (the old CSS approach), this plugin
 * inserts clear-divs only where needed:
 *
 * 1. Before a heading at the same or higher level as the one preceding the float.
 * 2. Before a subsection heading whose section contains a wide element
 *    (non-floating image, table, or another floating image) — because that
 *    content needs the full width and cannot sit beside the float.
 */

function hasFloatAttr(node) {
    return node.attributes?.some(
        (attr) =>
            attr.name === 'float' &&
            attr.value !== 'none' &&
            attr.value != null
    );
}

function isFloatingImage(node) {
    return (
        node.type === 'mdxJsxFlowElement' &&
        node.name === 'ZoomImage' &&
        hasFloatAttr(node)
    );
}

function isWideElement(node) {
    return (
        node.type === 'table' ||
        (node.type === 'mdxJsxFlowElement' && node.name === 'ZoomImage')
    );
}

function makeClearNode() {
    return {
        type: 'mdxJsxFlowElement',
        name: 'div',
        attributes: [
            {
                type: 'mdxJsxAttribute',
                name: 'style',
                value: 'clear: both;',
            },
        ],
        children: [],
    };
}

/**
 * Check whether the section starting at `startIdx` (a heading) contains
 * any wide element before the next heading of the same or higher level.
 */
function sectionContainsWideElement(children, startIdx) {
    const sectionDepth = children[startIdx].depth;
    for (let j = startIdx + 1; j < children.length; j++) {
        const node = children[j];
        // Stop at the next heading of same or higher level (end of section)
        if (node.type === 'heading' && node.depth <= sectionDepth) break;
        if (isWideElement(node)) return true;
    }
    return false;
}

export function remarkFloatClear() {
    return (tree) => {
        visit(tree, (node) => {
            const children = node.children;
            if (!children || !Array.isArray(children)) return;

            let i = 0;
            while (i < children.length) {
                const child = children[i];

                if (isFloatingImage(child)) {
                    // Find the preceding heading level
                    let precedingLevel = null;
                    for (let j = i - 1; j >= 0; j--) {
                        if (children[j].type === 'heading') {
                            precedingLevel = children[j].depth;
                            break;
                        }
                    }
                    if (precedingLevel === null) {
                        precedingLevel = 1;
                    }

                    // Walk forward to find the clear point and mark
                    // any lists before it with .beside-float so CSS can
                    // move their markers inside (avoids float overlap)
                    let clearIdx = children.length;
                    for (let k = i + 1; k < children.length; k++) {
                        const sibling = children[k];

                        // Same-or-higher-level heading always clears
                        if (sibling.type === 'heading' && sibling.depth <= precedingLevel) {
                            clearIdx = k;
                            children.splice(k, 0, makeClearNode());
                            break;
                        }

                        // Subsection heading clears if its section has wide content
                        if (sibling.type === 'heading' && sibling.depth > precedingLevel) {
                            if (sectionContainsWideElement(children, k)) {
                                clearIdx = k;
                                children.splice(k, 0, makeClearNode());
                                break;
                            }
                        }

                        // Wide element directly after float (no heading in between)
                        if (isWideElement(sibling)) {
                            clearIdx = k;
                            children.splice(k, 0, makeClearNode());
                            break;
                        }
                    }

                    // Mark all lists between the float and the clear point
                    for (let k = i + 1; k < clearIdx; k++) {
                        const sibling = children[k];
                        if (sibling.type === 'list') {
                            sibling.data = sibling.data || {};
                            sibling.data.hProperties = sibling.data.hProperties || {};
                            const existing = sibling.data.hProperties.className || [];
                            sibling.data.hProperties.className = [...existing, 'beside-float'];
                        }
                    }
                }

                i++;
            }
        });
    };
}
