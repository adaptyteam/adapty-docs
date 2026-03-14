/**
 * Headless browser fallback for anchor checking.
 *
 * Some documentation sites (Stripe, Apple Developer, etc.) render page content
 * and anchor IDs via client-side JavaScript. A plain curl fetch sees only the
 * shell HTML, so anchors appear missing. This module launches a real browser
 * (Puppeteer) to verify anchors on those pages.
 *
 * If Puppeteer is not installed, every check returns true (anchor assumed OK)
 * so the link checker degrades gracefully instead of producing false positives.
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
    console.log('  [headless] puppeteer not installed — skipping JS-rendered anchor checks');
    puppeteer = null;
  }
  return puppeteer;
}

async function ensureBrowser() {
  if (browser) return browser;

  const pup = await loadPuppeteer();
  if (!pup) return null;

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
 * Returns true  if the anchor is found (or if the check cannot run).
 * Returns false if the anchor is confirmed missing.
 */
export async function checkAnchorHeadless(url, anchor, timeoutMs = 15000) {
  const instance = await ensureBrowser();
  if (!instance) return true;

  let page;
  try {
    page = await instance.newPage();

    // Block heavy resources to speed up page load
    await page.setRequestInterception(true);
    page.on('request', req => {
      if (SKIPPED_RESOURCES.has(req.resourceType())) req.abort();
      else req.continue();
    });

    const pageUrl = url.replace(/#.*$/, '');
    await page.goto(pageUrl, { waitUntil: 'networkidle2', timeout: timeoutMs });

    return await page.evaluate(
      (id) => !!document.getElementById(id) || !!document.querySelector(`[name="${id}"]`),
      anchor,
    );
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
