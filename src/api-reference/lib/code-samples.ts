// src/api-reference/lib/code-samples.ts
import type { ApiOperation, ApiSpec } from './model.ts';

export interface RenderInput {
  operation: ApiOperation;
  spec: ApiSpec;
  authValue?: string;
}

function authHeader(spec: ApiSpec, op: ApiOperation, authValue?: string)
    : { name: string; value: string } | null {
  if (!op.security.length) return null;
  const scheme = spec.securitySchemes[op.security[0]];
  if (!scheme || scheme.type !== 'apiKey' || !scheme.name) return null;
  const value = authValue ?? spec.defaultAuth[op.security[0]] ?? '';
  return { name: scheme.name, value };
}

function fullUrl(op: ApiOperation): string {
  return op.serverUrl + op.path;
}

function bodyExample(op: ApiOperation): unknown | undefined {
  return op.requestBody?.examples?.[0]?.value;
}

export function renderCurl({ operation, spec, authValue }: RenderInput): string {
  const url = fullUrl(operation);
  const lines: string[] = [`curl --request ${operation.method} \\`, `  --url '${url}' \\`];
  const auth = authHeader(spec, operation, authValue);
  if (auth) lines.push(`  --header '${auth.name}: ${auth.value}' \\`);
  const body = bodyExample(operation);
  if (body !== undefined && operation.method !== 'GET') {
    lines.push(`  --header 'Content-Type: ${operation.requestBody!.contentType}' \\`);
    const json = JSON.stringify(body, null, 2);
    lines.push(`  --data '${json.replace(/'/g, "'\\''")}'`);
  } else {
    // remove trailing backslash on last line
    lines[lines.length - 1] = lines[lines.length - 1].replace(/ \\$/, '');
  }
  return lines.join('\n');
}

export function renderFetch({ operation, spec, authValue }: RenderInput): string {
  const url = fullUrl(operation);
  const auth = authHeader(spec, operation, authValue);
  const headers: string[] = [];
  if (auth) headers.push(`    '${auth.name}': '${auth.value}',`);
  const body = bodyExample(operation);
  if (body !== undefined && operation.method !== 'GET') {
    headers.push(`    'Content-Type': '${operation.requestBody!.contentType}',`);
  }
  const lines = [
    `const response = await fetch('${url}', {`,
    `  method: '${operation.method}',`,
    headers.length ? `  headers: {\n${headers.join('\n')}\n  },` : '',
    body !== undefined && operation.method !== 'GET'
      ? `  body: JSON.stringify(${JSON.stringify(body, null, 2)}),`
      : '',
    `});`,
    `const data = await response.json();`,
  ].filter(Boolean);
  return lines.join('\n');
}

function jsonToPython(value: unknown): string {
  // Convert JSON literal to Python literal:
  // - true/false/null → True/False/None (with word boundaries to avoid substring collisions)
  // - keep double-quoted strings (Python accepts them)
  return JSON.stringify(value, null, 2)
    .replace(/\btrue\b/g, 'True')
    .replace(/\bfalse\b/g, 'False')
    .replace(/\bnull\b/g, 'None');
}

export function renderPython({ operation, spec, authValue }: RenderInput): string {
  const url = fullUrl(operation);
  const auth = authHeader(spec, operation, authValue);
  const headers: string[] = [];
  if (auth) headers.push(`    '${auth.name}': '${auth.value}',`);
  const body = bodyExample(operation);
  if (body !== undefined && operation.method !== 'GET') {
    headers.push(`    'Content-Type': '${operation.requestBody!.contentType}',`);
  }
  const method = operation.method.toLowerCase();
  const args: string[] = [`'${url}'`];
  if (headers.length) args.push(`headers={\n${headers.join('\n')}\n}`);
  if (body !== undefined && operation.method !== 'GET') {
    args.push(`json=${jsonToPython(body)}`);
  }
  return [
    `import requests`,
    ``,
    `response = requests.${method}(${args.join(', ')})`,
    `data = response.json()`,
  ].join('\n');
}
