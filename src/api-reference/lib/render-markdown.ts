// src/api-reference/lib/render-markdown.ts
import { marked } from 'marked';

marked.setOptions({
  gfm: true,
  breaks: false,
});

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function renderMarkdown(input: string | undefined | null): string {
  if (!input) return '';
  try {
    return marked.parse(input, { async: false }) as string;
  } catch (err) {
    console.warn('[api-ref] markdown render failed:', err);
    return `<p>${escapeHtml(String(input))}</p>`;
  }
}

// Like renderMarkdown but does not wrap in <p> — for short descriptions that
// the consumer already wraps in its own block element (e.g. <p class="...">).
// Without this, marked.parse would emit <p>…</p> nested inside the consumer's
// <p>, which browsers auto-close into invalid markup.
export function renderMarkdownInline(input: string | undefined | null): string {
  if (!input) return '';
  try {
    return marked.parseInline(input, { async: false }) as string;
  } catch (err) {
    console.warn('[api-ref] inline markdown render failed:', err);
    return escapeHtml(String(input));
  }
}
