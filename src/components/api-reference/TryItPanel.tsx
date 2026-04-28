// src/components/api-reference/TryItPanel.tsx
import { useEffect, useRef, useState } from 'react';
import { loadAuth, saveAuth } from './try-it/storage';
import { buildRequest } from './try-it/build-request';
import type { SerializedOperation, AuthValues } from './try-it/types';
import type { ApiSecurityScheme } from '../../api-reference/lib/model';
import './TryItPanel.css';

export const TRY_IT_CHANGE_EVENT = 'try-it:change';

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
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    setAuth(loadAuth(slug, defaultAuth));
    setAuthReady(true);
  }, [slug, defaultAuth]);

  // Broadcast the live request so the code-samples panel can re-render snippets
  // with the user's current values. Wait for auth to load on mount so the first
  // dispatch carries the resolved auth (not the empty initial state).
  const lastDispatchedRef = useRef<string>('');
  useEffect(() => {
    if (!authReady) return;
    const built = buildRequest({
      operation, pathParams, queryParams, headerParams,
      body: body || undefined, auth, securitySchemes,
    });
    const key = JSON.stringify(built);
    if (key === lastDispatchedRef.current) return;
    lastDispatchedRef.current = key;
    document.dispatchEvent(new CustomEvent(TRY_IT_CHANGE_EVENT, {
      detail: { operationId: operation.operationId, input: built },
    }));
  }, [authReady, operation, pathParams, queryParams, headerParams, body, auth, securitySchemes]);

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
      <div className="try-it-header">
        <h3>Try it</h3>
      </div>

      {operation.security.map(name => (
        <div className="try-it-row" key={name}>
          <label htmlFor={`try-it-auth-${name}`}>{securitySchemes[name]?.name ?? name}</label>
          <input
            id={`try-it-auth-${name}`}
            type="text"
            value={auth[name] ?? ''}
            placeholder={defaultAuth[name] ?? ''}
            onChange={e => updateAuth(name, e.target.value)}
          />
        </div>
      ))}

      {pathSpec.length > 0 && (
        <fieldset>
          <legend>Path parameters</legend>
          {pathSpec.map(p => (
            <div className="try-it-row" key={p.name}>
              <label htmlFor={`try-it-path-${p.name}`}>
                {p.name}{p.required && <span className="required">*</span>}
              </label>
              <input
                id={`try-it-path-${p.name}`}
                value={pathParams[p.name] ?? ''}
                placeholder={p.example ? String(p.example) : ''}
                onChange={e => setPathParams({ ...pathParams, [p.name]: e.target.value })}
              />
            </div>
          ))}
        </fieldset>
      )}

      {querySpec.length > 0 && (
        <fieldset>
          <legend>Query parameters</legend>
          {querySpec.map(p => (
            <div className="try-it-row" key={p.name}>
              <label htmlFor={`try-it-query-${p.name}`}>
                {p.name}{p.required && <span className="required">*</span>}
              </label>
              <input
                id={`try-it-query-${p.name}`}
                value={queryParams[p.name] ?? ''}
                onChange={e => setQueryParams({ ...queryParams, [p.name]: e.target.value })}
              />
            </div>
          ))}
        </fieldset>
      )}

      {headerSpec.length > 0 && (
        <fieldset>
          <legend>Header parameters</legend>
          {headerSpec.map(p => (
            <div className="try-it-row" key={p.name}>
              <label htmlFor={`try-it-header-${p.name}`}>
                {p.name}{p.required && <span className="required">*</span>}
              </label>
              <input
                id={`try-it-header-${p.name}`}
                value={headerParams[p.name] ?? ''}
                onChange={e => setHeaderParams({ ...headerParams, [p.name]: e.target.value })}
              />
            </div>
          ))}
        </fieldset>
      )}

      {operation.method !== 'GET' && (
        <fieldset className="try-it-body-field">
          <legend>Body</legend>
          <div className="try-it-body-card">
            <textarea
              className="try-it-body"
              rows={8}
              value={body}
              onChange={e => { setBody(e.target.value); setBodyError(null); }}
            />
          </div>
          {bodyError && <p className="try-it-error">{bodyError}</p>}
        </fieldset>
      )}

      <div className="try-it-actions">
        <button type="button" className="try-it-send" onClick={send} disabled={sending}>
          {sending ? 'Sending…' : 'Send'}
        </button>
        <button
          type="button"
          className="try-it-copy-curl"
          onClick={copyAsCurl}
          aria-label="Copy as curl"
          title="Copy as curl"
        >
          <svg
            className="try-it-copy-curl-icon"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <rect x="3.5" y="3.5" width="7" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
            <path
              d="M5.5 3.5V2.5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-1"
              stroke="currentColor"
              strokeWidth="1.4"
              fill="none"
            />
          </svg>
          <span className="try-it-copy-curl-label">Copy as curl</span>
        </button>
      </div>

      {networkError && (
        <div className="try-it-network-error">
          <p>{networkError}</p>
          <button
            type="button"
            className="try-it-copy-curl"
            onClick={copyAsCurl}
            aria-label="Copy as curl"
            title="Copy as curl"
          >
            <svg
              className="try-it-copy-curl-icon"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <rect x="3.5" y="3.5" width="7" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
              <path
                d="M5.5 3.5V2.5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-1"
                stroke="currentColor"
                strokeWidth="1.4"
                fill="none"
              />
            </svg>
            <span className="try-it-copy-curl-label">Copy as curl</span>
          </button>
        </div>
      )}

      {response && (
        <div className="try-it-response">
          <div className={`try-it-status ${response.ok ? 'ok' : 'err'}`}>
            Status: {response.status}
          </div>
          <details>
            <summary>Headers</summary>
            <pre>{Object.entries(response.headers).map(([k, v]) => `${k}: ${v}`).join('\n')}</pre>
          </details>
          <details open>
            <summary>Body</summary>
            <pre>{response.body}</pre>
          </details>
        </div>
      )}
    </section>
  );
}
