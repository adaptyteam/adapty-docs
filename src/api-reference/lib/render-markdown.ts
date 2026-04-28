// src/api-reference/lib/render-markdown.ts
import { marked } from 'marked';

marked.setOptions({
  gfm: true,
  breaks: false,
});

export function renderMarkdown(input: string | undefined | null): string {
  if (!input) return '';
  try {
    return marked.parse(input, { async: false }) as string;
  } catch (err) {
    console.warn('[api-ref] markdown render failed:', err);
    const escaped = String(input)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `<p>${escaped}</p>`;
  }
}
