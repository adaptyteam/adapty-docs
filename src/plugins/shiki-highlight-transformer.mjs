/**
 * Shiki transformers for fenced code blocks in docs articles.
 * Registered in astro.config.mjs; hooks run in Shiki's order (line → pre → root).
 */

/** Highlights the lines named in the fence meta: ```swift {2,4-6} */
export function highlightLinesTransformer() {
  return {
    name: 'highlight-lines',
    preprocess(code, options) {
      const meta = options.meta?.__raw || options.meta || '';
      // Format: {1,2,3} or {1-3,5}
      const highlightMatch = meta.match(/\{([0-9,-]+)\}/);

      this.highlightLines = new Set();
      if (highlightMatch) {
        for (const range of highlightMatch[1].split(',')) {
          if (range.includes('-')) {
            const [start, end] = range.split('-').map(Number);
            for (let i = start; i <= end; i++) this.highlightLines.add(i);
          } else {
            this.highlightLines.add(Number(range));
          }
        }
      }
      return code;
    },
    line(node, line) {
      if (this.highlightLines?.has(line)) {
        node.properties = node.properties || {};
        node.properties.className = node.properties.className || [];
        if (typeof node.properties.className === 'string') {
          node.properties.className = [node.properties.className];
        }
        node.properties.className.push('highlight-line');
      }
    },
  };
}

/** Copies the fence's title="…" and language onto <pre> as data attributes. */
export function titleTransformer() {
  return {
    name: 'title-transformer',
    pre(node) {
      const meta = this.options.meta?.__raw || '';
      const titleMatch = meta.match(/title="([^"]+)"/);
      if (titleMatch) node.properties['data-title'] = titleMatch[1];

      const lang = this.options.lang || '';
      if (lang) node.properties['data-language'] = lang;
    },
  };
}

/**
 * Wraps the block in the frame global.css styles (.code-block-wrapper, title
 * bar from data-title) with its copy button, so the block renders in its final
 * shape. DocsLayout.astro handles the button's clicks.
 */
export function codeBlockWrapperTransformer() {
  return {
    name: 'code-block-wrapper',
    root(root) {
      const pre = root.children.find((node) => node.type === 'element' && node.tagName === 'pre');
      if (!pre) return;
      const title = pre.properties['data-title'];
      root.children = [{
        type: 'element',
        tagName: 'div',
        properties: { className: ['code-block-wrapper'], ...(title ? { 'data-title': title } : {}) },
        children: [
          {
            type: 'element',
            tagName: 'button',
            properties: { type: 'button', className: ['copy-button'] },
            children: [{ type: 'text', value: 'Copy' }],
          },
          pre,
        ],
      }];
    },
  };
}
