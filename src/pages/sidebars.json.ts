import type { APIRoute } from 'astro';
import { getMobileSidebars } from '../utils/sidebars';

/**
 * Every sidebar tree the mobile menu can show, fetched when the menu first
 * opens (see MobileSectionSwitcher.astro), so pages don't carry it inline.
 * The localized copies live at /docs/<locale>/sidebars.json.
 */
export const GET: APIRoute = async () =>
    new Response(JSON.stringify(await getMobileSidebars('en')), {
        headers: { 'Content-Type': 'application/json' },
    });
