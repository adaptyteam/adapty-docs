import { visit } from 'unist-util-visit';

/**
 * Remark plugin for floating ZoomImage elements.
 *
 * Two responsibilities:
 * 1. Insert clear-divs before elements that need full width after a float
 *    (same-or-higher headings, wide elements, subsections with wide content).
 * 2. Add .beside-float to lists between a float and its clear point so CSS
 *    can move list markers inside (prevents overlap with the floated image).
 */

function hasFloatAttr(node) {
    return node.attributes?.some(
        (a) => a.name === 'float' && a.value !== 'none' && a.value != null
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

function makeClearDiv() {
    return {
        type: 'mdxJsxFlowElement',
        name: 'div',
        attributes: [{ type: 'mdxJsxAttribute', name: 'style', value: 'clear: both;' }],
        children: [],
    };
}

/** True if the section starting at `idx` contains a wide element before the next same-level heading. */
function sectionContainsWideElement(children, idx) {
    const depth = children[idx].depth;
    for (let j = idx + 1; j < children.length; j++) {
        if (children[j].type === 'heading' && children[j].depth <= depth) break;
        if (isWideElement(children[j])) return true;
    }
    return false;
}

/** Find the heading level above `pos`, defaulting to 1. */
function precedingHeadingLevel(children, pos) {
    for (let j = pos - 1; j >= 0; j--) {
        if (children[j].type === 'heading') return children[j].depth;
    }
    return 1;
}

/** Walk forward from a float to find where it should clear. Returns the index, or children.length if none found. */
function findClearPoint(children, start, level) {
    for (let k = start; k < children.length; k++) {
        const node = children[k];
        if (node.type === 'heading' && node.depth <= level) return k;
        if (node.type === 'heading' && sectionContainsWideElement(children, k)) return k;
        if (isWideElement(node)) return k;
    }
    return children.length;
}

/** Add .beside-float class to a list node via hProperties. */
function markListBesideFloat(node) {
    node.data = node.data || {};
    node.data.hProperties = node.data.hProperties || {};
    const existing = node.data.hProperties.className || [];
    node.data.hProperties.className = [...existing, 'beside-float'];
}

export function remarkFloatClear() {
    return (tree) => {
        visit(tree, (node) => {
            const children = node.children;
            if (!children || !Array.isArray(children)) return;

            let i = 0;
            while (i < children.length) {
                if (!isFloatingImage(children[i])) { i++; continue; }

                const level = precedingHeadingLevel(children, i);
                const clearIdx = findClearPoint(children, i + 1, level);

                // Insert clear div
                if (clearIdx < children.length) {
                    children.splice(clearIdx, 0, makeClearDiv());
                }

                // Mark lists in the float zone
                for (let k = i + 1; k < clearIdx; k++) {
                    if (children[k].type === 'list') markListBesideFloat(children[k]);
                }

                i++;
            }
        });
    };
}
