// src/components/api-reference/LanguageSwitcher.tsx
import { useState, type ChangeEvent } from 'react';

interface HarHeader { name: string; value: string; }
interface HarRequest {
  method: string; url: string; headers: HarHeader[];
  postData?: { mimeType: string; text: string };
}

interface Props {
  operationId: string;
  harRequest: HarRequest;
}

const PREBUILT = ['curl', 'fetch', 'python'] as const;
const EXTRA = [
  { id: 'node', label: 'Node.js', target: 'node', client: 'native' },
  { id: 'ruby', label: 'Ruby', target: 'ruby', client: 'native' },
  { id: 'go', label: 'Go', target: 'go', client: 'native' },
  { id: 'java', label: 'Java', target: 'java', client: 'okhttp' },
  { id: 'php', label: 'PHP', target: 'php', client: 'curl' },
  { id: 'csharp', label: 'C#', target: 'csharp', client: 'restsharp' },
  { id: 'swift', label: 'Swift', target: 'swift', client: 'nsurlsession' },
];
const PREBUILT_LABELS: Record<string, string> = {
  curl: 'cURL', fetch: 'JavaScript', python: 'Python',
};

function show(operationId: string, lang: string) {
  const root = document.querySelector(`[data-op-id="${operationId}"]`);
  if (!root) return;
  root.querySelectorAll<HTMLElement>('.api-code-sample').forEach(el => {
    el.hidden = el.dataset.lang !== lang;
  });
}

function renderDynamic(operationId: string, code: string) {
  const root = document.querySelector(`[data-op-id="${operationId}"]`);
  const slot = root?.querySelector<HTMLElement>('.api-code-sample-dynamic code');
  if (slot) slot.textContent = code;
}

export default function LanguageSwitcher({ operationId, harRequest }: Props) {
  const [current, setCurrent] = useState<string>('curl');
  const [error, setError] = useState<string | null>(null);

  async function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    const lang = e.target.value;
    setCurrent(lang);
    setError(null);

    if ((PREBUILT as readonly string[]).includes(lang)) {
      show(operationId, lang);
      return;
    }
    const extra = EXTRA.find(x => x.id === lang);
    if (!extra) return;

    try {
      const mod = await import('httpsnippet');
      const Snippet = (mod as any).HTTPSnippet;
      const inst = new Snippet(harRequest);
      const code = inst.convert(extra.target, extra.client) || '';
      renderDynamic(operationId, code);
      show(operationId, 'dynamic');
    } catch (err) {
      setError(`Could not load ${extra.label}`);
      show(operationId, 'curl');
      setCurrent('curl');
    }
  }

  return (
    <div className="lang-switcher">
      <select value={current} onChange={handleChange}>
        {PREBUILT.map(l => <option key={l} value={l}>{PREBUILT_LABELS[l]}</option>)}
        {EXTRA.map(l => <option key={l.id} value={l.id}>{l.label}</option>)}
      </select>
      {error && <span className="lang-switcher-error">{error}</span>}
    </div>
  );
}
