// src/api-reference/lib/build-spec-md.ts
//
// Renders an OpenAPI spec landing page (the "root" doc for an API) as a
// Markdown index — name, version, description, servers, auth, and a tagged
// list of operations linking to each operation's `.md` page.
//
// The HTML version of the same page is `[slug].astro` + SpecLandingPage.astro.
// The per-operation Markdown pages are emitted by `[slug]/operations/[op].md.ts`
// and built via `build-operation-md.ts` — this file is the index that points
// at all of them, so an LLM can fetch one URL and discover the whole API.

import type { ApiSpec } from './model.ts';

function blockquote(text: string): string {
  return text.split('\n').map(line => line === '' ? '>' : `> ${line}`).join('\n');
}

// Convert `marked`-rendered HTML descriptions back to a Markdown-flavored
// plain text. We don't attempt full HTML→MD round-tripping — descriptions are
// typically a paragraph or two of prose, so handling the common inline tags
// (strong, em, code, a) and block separators is enough to preserve intent.
function htmlToPlainText(html: string): string {
  if (!html) return '';
  return html
    // Block separators
    .replace(/<\/p>\s*<p[^>]*>/gi, '\n\n')
    .replace(/<br\s*\/?>(\s*)/gi, '\n')
    .replace(/<\/?(?:p|div|section)[^>]*>/gi, '')
    // Inline formatting → Markdown
    .replace(/<(?:strong|b)[^>]*>([\s\S]*?)<\/(?:strong|b)>/gi, '**$1**')
    .replace(/<(?:em|i)[^>]*>([\s\S]*?)<\/(?:em|i)>/gi, '_$1_')
    .replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, '`$1`')
    .replace(/<a\s+[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)')
    // Fallback: drop any remaining tags
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

interface BuildSpecMarkdownOptions {
  // Absolute URL prefix for operation `.md` links, e.g. `https://adapty.io/docs`.
  // Required because `.md` consumers are external — relative paths break when
  // the doc is fetched outside its origin.
  baseUrl: string;
}

export function buildSpecMarkdown(spec: ApiSpec, opts: BuildSpecMarkdownOptions): string {
  const baseUrl = opts.baseUrl.replace(/\/+$/, '');
  const lines: string[] = [];

  lines.push(`# ${spec.name}`);
  lines.push('');

  if (spec.version) {
    lines.push(`Version: \`${spec.version}\``);
    lines.push('');
  }

  const description = htmlToPlainText(spec.descriptionHtml);
  if (description) {
    lines.push(blockquote(description));
    lines.push('');
  }

  if (spec.servers.length > 0) {
    lines.push('## Servers');
    lines.push('');
    for (const s of spec.servers) {
      const desc = htmlToPlainText(s.descriptionHtml ?? '');
      lines.push(`- \`${s.url}\`${desc ? ` — ${desc}` : ''}`);
    }
    lines.push('');
  }

  const schemeNames = Object.keys(spec.securitySchemes);
  if (schemeNames.length > 0) {
    lines.push('## Authentication');
    lines.push('');
    for (const name of schemeNames) {
      const scheme = spec.securitySchemes[name];
      const parts: string[] = [];
      parts.push(`type: \`${scheme.type}\``);
      if (scheme.in) parts.push(`in: \`${scheme.in}\``);
      if (scheme.name) parts.push(`header: \`${scheme.name}\``);
      if (scheme.scheme) parts.push(`scheme: \`${scheme.scheme}\``);
      lines.push(`### ${name}`);
      lines.push('');
      lines.push(parts.join(' · '));
      const schemeDesc = htmlToPlainText(scheme.descriptionHtml ?? '');
      if (schemeDesc) {
        lines.push('');
        lines.push(schemeDesc);
      }
      lines.push('');
    }
  }

  lines.push('## Operations');
  lines.push('');

  const opUrl = (operationId: string) =>
    `${baseUrl}/${spec.slug}/operations/${operationId}.md`;

  const renderOp = (opId: string) => {
    const op = spec.operations.find(o => o.operationId === opId);
    if (!op) return null;
    const flag = op.deprecated ? ' _(deprecated)_' : '';
    return `- **${op.method}** \`${op.path}\` — [${op.summary}](${opUrl(op.operationId)})${flag}`;
  };

  if (spec.tags.length === 0) {
    for (const op of spec.operations) {
      const line = renderOp(op.operationId);
      if (line) lines.push(line);
    }
  } else {
    for (const tag of spec.tags) {
      lines.push(`### ${tag.name}`);
      lines.push('');
      const tagDesc = htmlToPlainText(tag.descriptionHtml ?? '');
      if (tagDesc) {
        lines.push(tagDesc);
        lines.push('');
      }
      for (const opId of tag.operationIds) {
        const line = renderOp(opId);
        if (line) lines.push(line);
      }
      lines.push('');
    }
    // Operations without a tag: list at the end so they aren't silently dropped.
    const tagged = new Set(spec.tags.flatMap(t => t.operationIds));
    const untagged = spec.operations.filter(o => !tagged.has(o.operationId));
    if (untagged.length > 0) {
      lines.push('### Other');
      lines.push('');
      for (const op of untagged) {
        const line = renderOp(op.operationId);
        if (line) lines.push(line);
      }
      lines.push('');
    }
  }

  // Trailing newline; collapse any accidental triple-blank runs.
  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';
}
