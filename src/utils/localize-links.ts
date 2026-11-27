import { SUPPORTED_LOCALES } from '../data/locales';

const alreadyLocalized = new RegExp(`^/docs/(${SUPPORTED_LOCALES.join('|')})(/|$)`);

/**
 * Points every in-docs link of a translated page at the same language:
 * /docs/paywalls → /docs/zh/paywalls. Runs on the rendered article HTML at
 * build time, so search engines and the first paint get the translated URLs.
 * Links that already name a language are left alone.
 */
export function localizeDocsLinks(html: string, locale: string): string {
    return html.replace(/(<a\b[^>]*?\shref=")(\/docs\/[^"]*)"/g, (match, before: string, href: string) =>
        alreadyLocalized.test(href) ? match : `${before}/docs/${locale}/${href.slice('/docs/'.length)}"`,
    );
}
