import type { APIRoute } from 'astro';
import { getBuildLocales } from '../../data/locales';
import { getMobileSidebars } from '../../utils/sidebars';

// Lives under /docs/<locale>/ so a translation-only deploy, which uploads just
// the locale folders, publishes it with the pages that fetch it.
export function getStaticPaths() {
    return getBuildLocales().map((locale) => ({ params: { locale } }));
}

export const GET: APIRoute = async ({ params }) =>
    new Response(JSON.stringify(await getMobileSidebars(params.locale!)), {
        headers: { 'Content-Type': 'application/json' },
    });
