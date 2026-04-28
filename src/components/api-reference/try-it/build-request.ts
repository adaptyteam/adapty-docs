import type { BuildRequestArgs, BuiltRequest } from './types.ts';

export function buildRequest(args: BuildRequestArgs): BuiltRequest {
  const { operation, pathParams, queryParams, headerParams, body, auth, securitySchemes } = args;

  // Leave unfilled placeholders literal (e.g. "{user_id}") so generated code
  // samples show what's missing — better UX than a percent-encoded `%7Buser_id%7D`.
  let pathExpanded = operation.path.replace(/\{([^}]+)\}/g, (_, name) =>
    pathParams[name] !== undefined && pathParams[name] !== ''
      ? encodeURIComponent(pathParams[name])
      : `{${name}}`
  );

  const qs = Object.entries(queryParams)
    .filter(([, v]) => v !== '' && v !== undefined && v !== null)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join('&');
  if (qs) pathExpanded += `?${qs}`;

  // Auth first, then user-supplied header parameters, then Content-Type.
  // Insertion order is preserved by both fetch and our snippet renderers, so
  // Authorization renders at the top of the headers block in every code sample.
  const headers: Record<string, string> = {};
  for (const schemeName of operation.security) {
    const scheme = securitySchemes[schemeName];
    if (scheme?.type === 'apiKey' && scheme.in === 'header' && scheme.name) {
      const v = auth[schemeName];
      if (v) headers[scheme.name] = v;
    }
  }
  for (const [k, v] of Object.entries(headerParams)) {
    if (v !== '' && v !== undefined && v !== null) headers[k] = v;
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
