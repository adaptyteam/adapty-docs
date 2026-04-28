import type { BuildRequestArgs, BuiltRequest } from './types.ts';

export function buildRequest(args: BuildRequestArgs): BuiltRequest {
  const { operation, pathParams, queryParams, headerParams, body, auth, securitySchemes } = args;

  let pathExpanded = operation.path.replace(/\{([^}]+)\}/g, (_, name) =>
    encodeURIComponent(pathParams[name] ?? `{${name}}`)
  );

  const qs = Object.entries(queryParams)
    .filter(([, v]) => v !== '' && v !== undefined && v !== null)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join('&');
  if (qs) pathExpanded += `?${qs}`;

  const headers: Record<string, string> = { ...headerParams };
  for (const schemeName of operation.security) {
    const scheme = securitySchemes[schemeName];
    if (scheme?.type === 'apiKey' && scheme.in === 'header' && scheme.name) {
      const v = auth[schemeName];
      if (v) headers[scheme.name] = v;
    }
  }
  if (body && operation.method !== 'GET' && operation.contentType) {
    headers['Content-Type'] = operation.contentType;
  }

  return {
    url: operation.serverUrl + pathExpanded,
    method: operation.method,
    headers,
    body: operation.method === 'GET' ? undefined : body,
  };
}
