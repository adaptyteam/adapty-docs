export const SUPPORTED_LOCALES = ['zh', 'tr', 'ru', 'es'] as const;
export type Locale = typeof SUPPORTED_LOCALES[number];
export const LOCALE_NAMES: Record<Locale, string> = { zh: '中文', tr: 'Türkçe', ru: 'Русский', es: 'Español' };

/**
 * Returns the subset of SUPPORTED_LOCALES to build in this run.
 * Controlled by the BUILD_LOCALES env var (comma-separated, e.g. "zh,tr").
 * When unset, returns all supported locales (default behavior).
 */
// Read BUILD_LOCALES at import time, before Vite replaces process.env.
 
const _buildLocalesEnv: string = (() => {
  try { return globalThis.process?.env?.BUILD_LOCALES ?? ''; }
  catch { return ''; }
})();

export function getBuildLocales(): readonly string[] {
  if (!_buildLocalesEnv) return SUPPORTED_LOCALES;
  if (_buildLocalesEnv.trim() === 'none') return [];
  const requested = _buildLocalesEnv.split(',').map(s => s.trim()).filter(Boolean);
  return requested.filter(l => (SUPPORTED_LOCALES as readonly string[]).includes(l));
}

/** True when building only locale pages (English routes should be skipped). */
export const isLocaleOnlyBuild = Boolean(_buildLocalesEnv && _buildLocalesEnv.trim() !== 'none');
