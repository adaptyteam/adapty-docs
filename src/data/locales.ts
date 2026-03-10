export const SUPPORTED_LOCALES = ['zh'] as const;
export type Locale = typeof SUPPORTED_LOCALES[number];
export const LOCALE_NAMES: Record<Locale, string> = { zh: '中文' };
