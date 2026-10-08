/**
 * Resolve <LocaleOnly locales={[...]}>…</LocaleOnly> blocks for one locale.
 *
 * If `locale` is listed, the block is unwrapped (content kept, tags dropped);
 * otherwise the whole block is cut. English is 'en'.
 *
 * translate.mjs applies this to the English source before translating, so the
 * tag never reaches the model and locale files hold only their own content.
 * The markdown/llms exports apply it too; the page itself is handled by
 * src/components/LocaleOnly.astro, which English pages and untranslated
 * locale fallbacks still render through.
 */
const LOCALE_ONLY_RE =
  /<LocaleOnly\s+locales=\{\[([^\]]*)\]\}\s*>([\s\S]*?)<\/LocaleOnly>/g;

export function resolveLocaleOnly(content, locale) {
  return content.replace(LOCALE_ONLY_RE, (_, list, inner) =>
    (list.match(/[\w-]+/g) ?? []).includes(locale) ? inner : "",
  );
}
