// src/api-reference/lib/build-operation-md.ts
//
// Renders a single OpenAPI operation as a self-contained Markdown document.
// Mirrors the format used by https://context7.com/docs (e.g. `<page>.md`):
//
//   # {summary}
//
//   > {description}
//
//   ## OpenAPI
//
//   ```yaml
//   /api-specs/{specFile} {METHOD} {path}
//   { sliced spec — only this operation + its transitively-referenced components }
//   ```
//
// The slice is built from the *raw* (un-derefed) spec so $refs survive in the
// output exactly as the human-authored YAML wrote them.

import yaml from 'js-yaml';

const VERBS = ['get', 'post', 'put', 'patch', 'delete'] as const;
type Verb = typeof VERBS[number];

interface FoundOperation {
  path: string;
  method: Verb;
  op: any;
}

export function findOperationById(rawSpec: any, operationId: string): FoundOperation | null {
  const paths = rawSpec?.paths ?? {};
  for (const [p, item] of Object.entries<any>(paths)) {
    if (!item || typeof item !== 'object') continue;
    for (const m of VERBS) {
      if (item[m]?.operationId === operationId) {
        return { path: p, method: m, op: item[m] };
      }
    }
  }
  return null;
}

// Walks `root` recursively, collecting every `$ref` that points into
// `#/components/...`, then resolves each ref and recurses through the
// resolved node. Stops on cycles. Returns `components`-shaped object
// containing only the reachable definitions.
//
// `securitySchemes` are *always* preserved (small, contextual, and
// referenced indirectly via `security: [{ schemeName: [] }]` which carries
// no `$ref` for the walker to follow).
export function buildComponentClosure(rawSpec: any, root: unknown): Record<string, any> {
  const components = rawSpec?.components ?? {};
  const seen: Record<string, Set<string>> = {};
  const queue: string[] = [];

  function visit(node: unknown): void {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) {
      node.forEach(visit);
      return;
    }
    for (const [k, v] of Object.entries(node)) {
      if (k === '$ref' && typeof v === 'string' && v.startsWith('#/components/')) {
        queue.push(v);
      } else {
        visit(v);
      }
    }
  }

  visit(root);

  while (queue.length) {
    const ref = queue.shift()!;
    const [section, name] = ref.replace(/^#\/components\//, '').split('/');
    if (!section || !name) continue;
    if (!seen[section]) seen[section] = new Set();
    if (seen[section].has(name)) continue;
    seen[section].add(name);
    const node = components[section]?.[name];
    if (node !== undefined) visit(node);
  }

  const out: Record<string, any> = {};
  for (const [section, names] of Object.entries(seen)) {
    out[section] = {};
    for (const name of names) out[section][name] = components[section]?.[name];
  }

  // Always include security schemes — operation-level `security` references
  // them by name (no $ref) so the walker would otherwise drop them.
  const schemes = components.securitySchemes;
  if (schemes && typeof schemes === 'object' && Object.keys(schemes).length > 0) {
    out.securitySchemes = { ...schemes };
  }

  return out;
}

function blockquote(text: string): string {
  // Empty lines inside a blockquote are written as bare `>` per CommonMark.
  return text.split('\n').map(line => line === '' ? '>' : `> ${line}`).join('\n');
}

export function buildOperationMarkdown(
  rawSpec: any,
  specFile: string,
  operationId: string,
): string | null {
  const found = findOperationById(rawSpec, operationId);
  if (!found) return null;
  const { path, method, op } = found;

  const pathItem = rawSpec.paths[path] ?? {};
  // Sliced path item: keep only this method + path-level metadata that scopes
  // the operation (parameters, summary, description, servers).
  const slicedPathItem: any = { [method]: op };
  for (const k of ['parameters', 'summary', 'description', 'servers'] as const) {
    if (pathItem[k] !== undefined) slicedPathItem[k] = pathItem[k];
  }

  const sliced: any = {};
  if (rawSpec.openapi !== undefined) sliced.openapi = rawSpec.openapi;
  if (rawSpec.info !== undefined) sliced.info = rawSpec.info;
  if (rawSpec.servers !== undefined) sliced.servers = rawSpec.servers;
  if (rawSpec.security !== undefined) sliced.security = rawSpec.security;
  if (rawSpec.tags !== undefined) sliced.tags = rawSpec.tags;
  sliced.paths = { [path]: slicedPathItem };

  const closure = buildComponentClosure(rawSpec, slicedPathItem);
  if (Object.keys(closure).length > 0) sliced.components = closure;

  const yamlBody = yaml.dump(sliced, {
    lineWidth: -1,    // disable wrapping — keeps long descriptions readable
    noRefs: true,     // we *want* $ref strings in the output
    quotingType: '"',
  });

  const summary = String(op.summary ?? operationId).trim();
  const description = typeof op.description === 'string' ? op.description.trim() : '';
  const headerLine = `/api-specs/${specFile} ${method} ${path}`;

  let md = `# ${summary}\n\n`;
  if (description) md += `${blockquote(description)}\n\n`;
  md += `## OpenAPI\n\n`;
  md += '```yaml\n';
  md += `${headerLine}\n`;
  md += yamlBody;
  if (!yamlBody.endsWith('\n')) md += '\n';
  md += '```\n';
  return md;
}
