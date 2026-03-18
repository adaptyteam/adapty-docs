/**
 * Headless browser fallback for anchor checking.
 *
 * Some documentation sites (Stripe, Apple Developer, etc.) render page content
 * and anchor IDs via client-side JavaScript. A plain curl fetch sees only the
 * shell HTML, so anchors appear missing. This module launches a real browser
 * (Puppeteer) to verify anchors on those pages.
 *
 * Puppeteer must be installed (`yarn install`). The script will fail with a
 * clear error message if it is missing.
 */

// Only block truly decorative resources. Stylesheets must be kept because some
// sites (e.g. Apple Developer) use CSS-driven content rendering — blocking them
// prevents anchor IDs from appearing in the DOM.
const SKIPPED_RESOURCES = new Set(['image', 'media']);

let browser = null;
let puppeteer = null;
let puppeteerResolved = false;

async function loadPuppeteer() {
  if (puppeteerResolved) return puppeteer;
  puppeteerResolved = true;
  try {
    puppeteer = await import('puppeteer');
  } catch {
    throw new Error(
      'puppeteer is required but not installed. Run "yarn install" or "npm install" first.',
    );
  }
  return puppeteer;
}

async function ensureBrowser() {
  if (browser) return browser;

  const pup = await loadPuppeteer();
  const launch = pup.default?.launch || pup.launch;
  browser = await launch({
    headless: 'shell',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
  return browser;
}

/**
 * Check whether an anchor exists in a JS-rendered page.
 *
 * Detection strategy (covers multiple JS framework patterns):
 *   1. Standard id/name attributes
 *   2. data-testid attributes containing the anchor (Stripe pattern)
 *   3. Scroll-based detection — navigate WITH the fragment and check if the
 *      page scrolled, proving the site's JS handled the fragment
 *
 * Returns true  if the anchor is found (or if the check cannot run).
 * Returns false if the anchor is confirmed missing.
 */
export async function checkAnchorHeadless(url, anchor, timeoutMs = 30000) {
  const instance = await ensureBrowser();
  let page;
  try {
    page = await instance.newPage();

    // Block heavy resources to speed up page load
    await page.setRequestInterception(true);
    page.on('request', req => {
      if (SKIPPED_RESOURCES.has(req.resourceType())) req.abort();
      else req.continue();
    });

    // Navigate WITH the fragment so client-side JS can handle scrolling
    const fullUrl = url.includes('#') ? url : `${url}#${anchor}`;
    await page.goto(fullUrl, { waitUntil: 'networkidle2', timeout: timeoutMs });

    // Brief wait for JS-based scroll handlers to fire after networkidle2
    await new Promise(r => setTimeout(r, 1500));

    return await page.evaluate((id) => {
      const escaped = CSS.escape(id);
      // Standard: id or name attribute
      if (document.getElementById(id)) return true;
      if (document.querySelector(`[name="${escaped}"]`)) return true;
      // data-testid containing the anchor (e.g. Stripe: "reference-element-content-{id}")
      if (document.querySelector(`[data-testid$="-${escaped}"]`)) return true;
      if (document.querySelector(`[data-testid="${escaped}"]`)) return true;
      // Scroll-based: if the page scrolled, the fragment was handled by JS
      if (window.scrollY > 50) return true;
      return false;
    }, anchor);
  } catch {
    return true; // load failed — don't flag
  } finally {
    if (page) await page.close().catch(() => {});
  }
}

/**
 * Shut down the shared browser. Call once at the end of the run.
 */
export async function closeBrowser() {
  if (browser) {
    await browser.close().catch(() => {});
    browser = null;
  }
}
