// src/components/api-reference/TryItPanel.tsx
import { useEffect, useState } from 'react';
import { loadAuth, saveAuth } from './try-it/storage';
import { buildRequest } from './try-it/build-request';
import type { SerializedOperation, AuthValues } from './try-it/types';
import type { ApiSecurityScheme } from '../../api-reference/lib/model';
import './TryItPanel.css';

interface Props {
  slug: string;
  operation: SerializedOperation;
  defaultAuth: Record<string, string>;
  securitySchemes: Record<string, ApiSecurityScheme>;
}

export default function TryItPanel({ slug, operation, defaultAuth, securitySchemes }: Props) {
  const [auth, setAuth] = useState<AuthValues>({});
  const [pathParams, setPathParams] = useState<Record<string, string>>({});
  const [queryParams, setQueryParams] = useState<Record<string, string>>({});
  const [headerParams, setHeaderParams] = useState<Record<string, string>>({});
  const [body, setBody] = useState<string>(operation.bodyExample ?? '');

  useEffect(() => { setAuth(loadAuth(slug, defaultAuth)); }, [slug, defaultAuth]);

  function updateAuth(scheme: string, value: string) {
    const next = { ...auth, [scheme]: value };
    setAuth(next);
    saveAuth(slug, next);
  }

  const pathSpec = operation.parameters.filter(p => p.in === 'path');
  const querySpec = operation.parameters.filter(p => p.in === 'query');
  const headerSpec = operation.parameters.filter(p => p.in === 'header');

  const [sending, setSending] = useState(false);
  const [bodyError, setBodyError] = useState<string | null>(null);
  const [response, setResponse] = useState<{
    status: number; ok: boolean; headers: Record<string, string>; body: string;
  } | null>(null);
  const [networkError, setNetworkError] = useState<string | null>(null);

  function formatJson() {
    try {
      setBody(JSON.stringify(JSON.parse(body), null, 2));
      setBodyError(null);
    } catch (e: any) {
      setBodyError(`Invalid JSON: ${e.message}`);
    }
  }

  async function send() {
    setNetworkError(null);
    setResponse(null);
    setSending(true);

    // Validate JSON body
    if (operation.method !== 'GET' && body) {
      try { JSON.parse(body); } catch (e: any) {
        setBodyError(`Invalid JSON: ${e.message}`); setSending(false); return;
      }
    }

    // Validate required path params
    for (const p of pathSpec) {
      if (p.required && !pathParams[p.name]) {
        setNetworkError(`Required: ${p.name}`); setSending(false); return;
      }
    }

    const built = buildRequest({
      operation, pathParams, queryParams, headerParams,
      body: body || undefined, auth, securitySchemes,
    });

    try {
      const res = await fetch(built.url, {
        method: built.method, headers: built.headers, body: built.body,
      });
      const text = await res.text();
      let pretty = text;
      try { pretty = JSON.stringify(JSON.parse(text), null, 2); } catch { /* leave as text */ }
      const headers: Record<string, string> = {};
      res.headers.forEach((v, k) => { headers[k] = v; });
      setResponse({ status: res.status, ok: res.ok, headers, body: pretty });
    } catch (err: any) {
      setNetworkError(`Network/CORS error: ${err.message}`);
    } finally {
      setSending(false);
    }
  }

  function copyAsCurl() {
    const built = buildRequest({
      operation, pathParams, queryParams, headerParams,
      body: body || undefined, auth, securitySchemes,
    });
    const lines = [`curl --request ${built.method} \\`, `  --url '${built.url}' \\`];
    for (const [k, v] of Object.entries(built.headers)) {
      lines.push(`  --header '${k}: ${v}' \\`);
    }
    if (built.body) lines.push(`  --data '${built.body.replace(/'/g, "'\\''")}'`);
    else lines[lines.length - 1] = lines[lines.length - 1].replace(/ \\$/, '');
    navigator.clipboard?.writeText(lines.join('\n'));
  }

  return (
    <section className="try-it">
      <h3>Try it</h3>

      {operation.security.map(name => (
        <div className="try-it-row" key={name}>
          <label>{securitySchemes[name]?.name ?? name}</label>
          <input
            type="text"
            value={auth[name] ?? ''}
            placeholder={defaultAuth[name] ?? ''}
            onChange={e => updateAuth(name, e.target.value)}
          />
        </div>
      ))}

      {pathSpec.length > 0 && (
        <fieldset><legend>Path parameters</legend>
          {pathSpec.map(p => (
            <div className="try-it-row" key={p.name}>
              <label>{p.name}{p.required && <span className="required">*</span>}</label>
              <input
                value={pathParams[p.name] ?? ''}
                placeholder={p.example ? String(p.example) : ''}
                onChange={e => setPathParams({ ...pathParams, [p.name]: e.target.value })}
              />
            </div>
          ))}
        </fieldset>
      )}

      {querySpec.length > 0 && (
        <fieldset><legend>Query parameters</legend>
          {querySpec.map(p => (
            <div className="try-it-row" key={p.name}>
              <label>{p.name}{p.required && <span className="required">*</span>}</label>
              <input
                value={queryParams[p.name] ?? ''}
                onChange={e => setQueryParams({ ...queryParams, [p.name]: e.target.value })}
              />
            </div>
          ))}
        </fieldset>
      )}

      {headerSpec.length > 0 && (
        <fieldset><legend>Header parameters</legend>
          {headerSpec.map(p => (
            <div className="try-it-row" key={p.name}>
              <label>{p.name}{p.required && <span className="required">*</span>}</label>
              <input
                value={headerParams[p.name] ?? ''}
                onChange={e => setHeaderParams({ ...headerParams, [p.name]: e.target.value })}
              />
            </div>
          ))}
        </fieldset>
      )}

      {operation.method !== 'GET' && (
        <fieldset><legend>Body</legend>
          <textarea
            className="try-it-body"
            rows={8}
            value={body}
            onChange={e => { setBody(e.target.value); setBodyError(null); }}
          />
          <button type="button" onClick={formatJson}>Format JSON</button>
          {bodyError && <p className="try-it-error">{bodyError}</p>}
        </fieldset>
      )}

      <div className="try-it-actions">
        <button type="button" onClick={send} disabled={sending}>
          {sending ? 'Sending…' : 'Send'}
        </button>
        <button type="button" onClick={copyAsCurl}>Copy as curl</button>
      </div>

      {networkError && (
        <div className="try-it-network-error">
          <p>{networkError}</p>
          <button type="button" onClick={copyAsCurl}>Copy as curl</button>
        </div>
      )}

      {response && (
        <div className="try-it-response">
          <div className={`try-it-status ${response.ok ? 'ok' : 'err'}`}>
            Status: {response.status}
          </div>
          <details><summary>Headers</summary>
            <pre>{Object.entries(response.headers).map(([k, v]) => `${k}: ${v}`).join('\n')}</pre>
          </details>
          <details open><summary>Body</summary>
            <pre>{response.body}</pre>
          </details>
        </div>
      )}
    </section>
  );
}
