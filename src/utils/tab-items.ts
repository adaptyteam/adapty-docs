/**
 * Build-time helpers for Tabs.astro: read the panels (TabItem output) of one
 * tab group from its rendered HTML, so the buttons and the starting panel can
 * be in the page itself instead of being created by a script after load.
 */

export interface TabPanel {
    value: string;
    label: string;
    isDefault: boolean;
    /** Offset of the panel's opening <div> in the HTML. */
    start: number;
}

const decode = (s: string) =>
    s.replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
        .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
        .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
        .replace(/&amp;/g, '&');

const attr = (tag: string, name: string) => {
    const m = tag.match(new RegExp(`\\s${name}="([^"]*)"`));
    return m ? decode(m[1]) : undefined;
};

/**
 * The group's own panels: `.tab-item` divs at the top level of `html`.
 * Panels of nested tab groups sit deeper and are skipped. Script, style and
 * comment bodies are skipped too, so markup inside them isn't counted.
 */
export function findTabPanels(html: string): TabPanel[] {
    const panels: TabPanel[] = [];
    const token = /<!--[\s\S]*?-->|<(script|style)\b[\s\S]*?<\/\1>|<div\b[^>]*>|<\/div>/gi;
    let depth = 0;
    for (let m = token.exec(html); m; m = token.exec(html)) {
        const tag = m[0];
        if (tag.startsWith('<!--') || m[1]) continue;
        if (tag.startsWith('</')) { depth--; continue; }
        if (depth === 0 && /\sclass="[^"]*\btab-item\b/.test(tag)) {
            const value = attr(tag, 'data-value') ?? '';
            panels.push({ value, label: attr(tag, 'data-label') || value, isDefault: attr(tag, 'data-default') === 'true', start: m.index });
        }
        depth++;
    }
    return panels;
}

/** Removes `hidden` from the opening tag of the panel at `start`, so it shows without JS. */
export function showPanel(html: string, start: number): string {
    const end = html.indexOf('>', start);
    const tag = html.slice(start, end).replace(/(\sclass="[^"]*?)\s*\bhidden\b/, '$1');
    return html.slice(0, start) + tag + html.slice(end);
}
