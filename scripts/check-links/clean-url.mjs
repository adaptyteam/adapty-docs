/**
 * URL cleaning utilities for redirect target URLs.
 */

const TRACKING_PARAMS = new Set([
  'visit_id', 'rd',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
  'fbclid', 'gclid', 'dclid', 'msclkid',
  'tt4b_lang_redirect',
]);

/**
 * Strip known tracking parameters from a URL.
 */
export function stripTrackingParams(url) {
  try {
    const u = new URL(url);
    for (const key of [...u.searchParams.keys()]) {
      if (TRACKING_PARAMS.has(key)) {
        u.searchParams.delete(key);
      }
    }
    let result = u.toString();
    // Remove trailing '?' if no params left
    if (u.searchParams.size === 0) {
      result = result.replace(/\?$/, '');
    }
    return result;
  } catch {
    return url;
  }
}
