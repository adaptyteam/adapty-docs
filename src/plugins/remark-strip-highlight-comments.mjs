import { visit } from 'unist-util-visit';

/**
 * Remark plugin to strip highlight comment lines and mark which lines to highlight
 */
export function remarkStripHighlightComments() {
  return (tree) => {
    visit(tree, 'code', (node) => {
      if (!node.value) return;
      
      const lang = node.lang || '';
      const commentPatterns = getCommentPatterns(lang);
      
      // Split code into lines
      const lines = node.value.split('\n');
      const filteredLines = [];
      const linesToHighlight = [];
      let inBlock = false;
      let outputLineNum = 1;
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();
        let isHighlightComment = false;
        
        // Check for highlight comments
        for (const pattern of commentPatterns) {
          const escapedPattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          
          // Check for highlight-start
          if (new RegExp(`^${escapedPattern}\\s*highlight-start`).test(trimmed)) {
            inBlock = true;
            isHighlightComment = true;
            break;
          }
          
          // Check for highlight-end
          if (new RegExp(`^${escapedPattern}\\s*highlight-end`).test(trimmed)) {
            inBlock = false;
            isHighlightComment = true;
            break;
          }
          
          // Check for highlight-next-line
          if (new RegExp(`^${escapedPattern}\\s*highlight-next-line`).test(trimmed)) {
            // Mark next line for highlighting
            if (i + 1 < lines.length) {
              linesToHighlight.push(outputLineNum + 1);
            }
            isHighlightComment = true;
            break;
          }
        }
        
        // If not a comment line, add to output
        if (!isHighlightComment) {
          filteredLines.push(line);
          
          // If in highlight block, mark this line
          if (inBlock) {
            linesToHighlight.push(outputLineNum);
          }
          
          outputLineNum++;
        }
      }
      
      // Update node value with filtered lines
      node.value = filteredLines.join('\n');
      
      // Store highlight info in node metadata for Shiki
      if (linesToHighlight.length > 0) {
        const highlightMeta = `{${linesToHighlight.join(',')}}`;
        node.meta = (node.meta || '') + ` ${highlightMeta}`;
        console.log('[Remark] Added highlight metadata:', highlightMeta, 'to node with lang:', node.lang);
      }
    });
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
