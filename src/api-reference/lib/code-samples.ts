// src/api-reference/lib/code-samples.ts
import type { ApiOperation, ApiSpec } from './model.ts';

export interface RenderInput {
  operation: ApiOperation;
  spec: ApiSpec;
  authValue?: string;
}

/**
 * Fully resolved request data the snippet renderers consume.
 * Both server-side (defaults from spec) and client-side (live values from
 * the Try-It panel) feed into this same shape so output stays consistent.
 */
export interface SnippetInput {
  method: string;
  url: string;
  headers: Record<string, string>;
  body?: string; // JSON-serialized text
}

/**
 * Indent every line after the first with the given prefix. The first line is
 * left untouched so the result can be appended inline (e.g. after `--data '`).
 */
function indentContinuation(text: string, prefix: string): string {
  return text
    .split('\n')
    .map((line, i) => (i === 0 ? line : prefix + line))
    .join('\n');
}

function jsonToPythonLiteral(text: string): string {
  // Convert JSON literal to Python literal (word-bounded so 'trueLove' stays intact):
  return text
    .replace(/\btrue\b/g, 'True')
    .replace(/\bfalse\b/g, 'False')
    .replace(/\bnull\b/g, 'None');
}

export function renderCurlSnippet({ method, url, headers, body }: SnippetInput): string {
  const lines: string[] = [`curl --request ${method} \\`, `  --url '${url}' \\`];
  for (const [k, v] of Object.entries(headers)) {
    lines.push(`  --header '${k}: ${v}' \\`);
  }
  if (body !== undefined && method !== 'GET') {
    const json = indentContinuation(body, '  ');
    lines.push(`  --data '${json.replace(/'/g, "'\\''")}'`);
  } else {
    lines[lines.length - 1] = lines[lines.length - 1].replace(/ \\$/, '');
  }
  return lines.join('\n');
}

export function renderFetchSnippet({ method, url, headers, body }: SnippetInput): string {
  const headerLines = Object.entries(headers).map(([k, v]) => `    '${k}': '${v}',`);
  const hasBody = body !== undefined && method !== 'GET';
  const bodyJson = hasBody ? indentContinuation(body!, '  ') : '';
  const lines = [
    `const response = await fetch('${url}', {`,
    `  method: '${method}',`,
    headerLines.length ? `  headers: {\n${headerLines.join('\n')}\n  },` : '',
    hasBody ? `  body: JSON.stringify(${bodyJson}),` : '',
    `});`,
    `const data = await response.json();`,
  ].filter(Boolean);
  return lines.join('\n');
}

export function renderPythonSnippet({ method, url, headers, body }: SnippetInput): string {
  const headerLines = Object.entries(headers).map(([k, v]) => `    '${k}': '${v}',`);
  const args: string[] = [`'${url}'`];
  if (headerLines.length) args.push(`headers={\n${headerLines.join('\n')}\n}`);
  if (body !== undefined && method !== 'GET') {
    args.push(`json=${indentContinuation(jsonToPythonLiteral(body), '    ')}`);
  }
  return [
    `import requests`,
    ``,
    `response = requests.${method.toLowerCase()}(${args.join(', ')})`,
    `data = response.json()`,
  ].join('\n');
}

/** Build a default SnippetInput from an operation+spec (no live overrides). */
export function defaultSnippetInput(
  operation: ApiOperation,
  spec: ApiSpec,
  authValue?: string
): SnippetInput {
  const headers: Record<string, string> = {};
  if (operation.security.length > 0) {
    const schemeName = operation.security[0];
    const scheme = spec.securitySchemes[schemeName];
    if (scheme?.type === 'apiKey' && scheme.name) {
      const value = authValue ?? spec.defaultAuth[schemeName] ?? '';
      if (value) headers[scheme.name] = value;
    }
  }
  const bodyValue = operation.requestBody?.examples?.[0]?.value;
  if (bodyValue !== undefined && operation.method !== 'GET') {
    headers['Content-Type'] = operation.requestBody!.contentType;
  }
  return {
    method: operation.method,
    url: operation.serverUrl + operation.path,
    headers,
    body:
      bodyValue !== undefined && operation.method !== 'GET'
        ? JSON.stringify(bodyValue, null, 2)
        : undefined,
  };
}

// ---------------------------------------------------------------------------
// Legacy entry points: keep the (operation, spec) signature for SSR callers
// and tests. Internally these now route through the SnippetInput pipeline so
// SSR and live-update paths produce identical output for identical inputs.
// ---------------------------------------------------------------------------

export function renderCurl(input: RenderInput): string {
  return renderCurlSnippet(defaultSnippetInput(input.operation, input.spec, input.authValue));
}

export function renderFetch(input: RenderInput): string {
  return renderFetchSnippet(defaultSnippetInput(input.operation, input.spec, input.authValue));
}

export function renderPython(input: RenderInput): string {
  return renderPythonSnippet(defaultSnippetInput(input.operation, input.spec, input.authValue));
}
