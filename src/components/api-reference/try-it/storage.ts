// src/components/api-reference/try-it/storage.ts
const KEY = (slug: string) => `TryIt_securitySchemeValues_${slug}`;

export function loadAuth(slug: string, fallback: Record<string, string>): Record<string, string> {
  try {
    const raw = window.localStorage.getItem(KEY(slug));
    if (!raw) return { ...fallback };
    const parsed = JSON.parse(raw);
    return typeof parsed === 'object' && parsed !== null ? { ...fallback, ...parsed } : { ...fallback };
  } catch {
    return { ...fallback };
  }
}

export function saveAuth(slug: string, values: Record<string, string>): void {
  try {
    window.localStorage.setItem(KEY(slug), JSON.stringify(values));
  } catch { /* private mode etc — fall back to in-memory only */ }
}
