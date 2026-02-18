/**
 * Shiki transformer to handle line highlighting based on metadata from remark plugin
 */
export function highlightLinesTransformer() {
  return {
    name: 'highlight-lines',
    preprocess(code, options) {
      // Try multiple ways to access meta
      const meta = options.meta?.__raw || options.meta || '';
      // console.log('[Highlight] Meta:', meta, 'Options:', options);
      
      // Parse line numbers from meta (format: {1,2,3} or {1-3,5})
      const highlightMatch = meta.match(/\{([0-9,-]+)\}/);
      
      if (highlightMatch) {
        const highlightSet = new Set();
        const ranges = highlightMatch[1].split(',');
        
        for (const range of ranges) {
          if (range.includes('-')) {
            const [start, end] = range.split('-').map(Number);
            for (let i = start; i <= end; i++) {
              highlightSet.add(i);
            }
          } else {
            highlightSet.add(Number(range));
          }
        }
        
        // console.log('[Highlight] Lines to highlight:', Array.from(highlightSet));
        this.highlightLines = highlightSet;
      } else {
        this.highlightLines = new Set();
      }
      
      return code;
    },
    line(node, line) {
      // Apply highlighting based on parsed line numbers
      if (this.highlightLines && this.highlightLines.has(line)) {
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

/**
 * Get comment patterns based on language
 */
function getCommentPatterns(lang) {
  const patterns = {
    // C-style comments
    javascript: ['//'],
    typescript: ['//'],
    java: ['//'],
    kotlin: ['//'],
    swift: ['//'],
    dart: ['//'],
    csharp: ['//'],
    cpp: ['//'],
    c: ['//'],
    objc: ['//'],
    
    // Hash comments
    python: ['#'],
    ruby: ['#'],
    shell: ['#'],
    bash: ['#'],
    yaml: ['#'],
    perl: ['#'],
    
    // HTML/XML comments
    html: ['<!--'],
    xml: ['<!--'],
    
    // SQL comments
    sql: ['--'],
    
    // Other
    lua: ['--'],
  };
  
  // Return patterns for the language, or default to common patterns
  return patterns[lang.toLowerCase()] || ['//', '#', '<!--', '--'];
}
