// Captures docs screenshots from a shot list, on mock data, through the adapty-demo-videos recorder.
//
//   node .claude/skills/mock-screenshots/scripts/shoot.mjs <shot-list.mjs> [--only file.webp] [--out dir] [--network]
//
// Writes WebP files to src/assets/shared/img/ unless --out is set. Run it from the docs repo root.
// --network prints each API response, to find the one that feeds a screen.
// The shot-list format is in the skill's SKILL.md.
import { existsSync, mkdirSync } from 'fs';
import { dirname, resolve } from 'path';
import { pathToFileURL } from 'url';

import sharp from 'sharp';

const args = process.argv.slice(2);
const opt = key => {
  const i = args.indexOf(`--${key}`);
  return i >= 0 ? args[i + 1] : undefined;
};
const listPath = args.find((a, i) => !a.startsWith('--') && !args[i - 1]?.startsWith('--'));
if (!listPath) {
  console.error('Usage: node shoot.mjs <shot-list.mjs> [--only file.webp] [--out dir] [--network]');
  process.exit(1);
}

const videos = resolve(process.env.DEMO_VIDEOS_REPO ?? '../adapty-demo-videos');
const targetModule = resolve(videos, 'recorder/target.mjs');
if (!existsSync(targetModule)) {
  console.error(`Can't find the recorder at ${videos}. Set DEMO_VIDEOS_REPO to your adapty-demo-videos clone.`);
  process.exit(1);
}

const { default: list } = await import(pathToFileURL(resolve(listPath)).href);
const { openTarget } = await import(pathToFileURL(targetModule).href);

const outDir = resolve(opt('out') ?? 'src/assets/shared/img');
const shots = list.shots.filter(s => !opt('only') || s.file === opt('only'));
if (!shots.length) {
  console.error(`No shots to take. Files in the list: ${list.shots.map(s => s.file).join(', ')}`);
  process.exit(1);
}

const DPR = 2;
const BOX_COLOR = '#6720ff';
const BOX_PADDING = 6;

const viewport = list.viewport ?? { width: 1440, height: 900 };
const session = await openTarget({
  target: list.target ?? 'dashboard',
  // The local clone can be stale or mid-work, so default to what is shipped.
  branch: list.branch ?? 'master',
  featureFlags: list.featureFlags,
  flow: list.flow,
  headless: true,
  dpr: DPR,
  viewport,
});
const { page } = session;

if (args.includes('--network')) {
  page.on('response', r => {
    if (['fetch', 'xhr'].includes(r.request().resourceType())) console.log(`  ${r.status()} ${r.request().method()} ${r.url()}`);
  });
}

// A clip or box is a CSS selector or a rectangle in CSS pixels.
const rectOf = async target => {
  if (typeof target !== 'string') return target;
  const rect = await page.locator(target).first().boundingBox({ timeout: 5000 });
  if (!rect) throw new Error(`Not visible: ${target}`);
  return rect;
};

// Drawn on the image, because the dashboard's CSP rules out an overlay in the page.
const boxOverlay = async (png, box, origin) => {
  const { width, height } = await sharp(png).metadata();
  const x = (box.x - origin.x - BOX_PADDING) * DPR;
  const y = (box.y - origin.y - BOX_PADDING) * DPR;
  const w = (box.width + BOX_PADDING * 2) * DPR;
  const h = (box.height + BOX_PADDING * 2) * DPR;
  const rect = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${3 * DPR}" fill="none" stroke="${BOX_COLOR}" stroke-width="${2 * DPR}"/>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">${rect}</svg>`;
  return [{ input: Buffer.from(svg) }];
};

let failed = false;
try {
  await list.setup?.(page);
  for (const shot of shots) {
    try {
      await page.setViewportSize(shot.viewport ?? viewport);
      if (shot.route) await page.goto(shot.route);
      await page.waitForLoadState('networkidle').catch(() => {});
      await shot.prepare?.(page);
      await page.waitForTimeout(shot.settle ?? 800);

      // The dashboard's CSP blocks inline styles, so taking the element out is the only way to hide it.
      for (const selector of shot.remove ?? []) {
        const removed = await page.locator(selector).evaluateAll(els => els.map(e => e.remove()).length);
        if (!removed) console.warn(`  ${shot.file}: remove matched nothing: ${selector}`);
      }

      const png =
        typeof shot.clip === 'string'
          ? await page.locator(shot.clip).first().screenshot({ timeout: 5000 })
          : await page.screenshot({ clip: shot.clip });

      const file = resolve(outDir, shot.file);
      mkdirSync(dirname(file), { recursive: true });
      const overlay = shot.box ? await boxOverlay(png, await rectOf(shot.box), shot.clip ? await rectOf(shot.clip) : { x: 0, y: 0 }) : [];
      const { width, height, size } = await sharp(png).composite(overlay).webp({ quality: 90 }).toFile(file);
      console.log(`${file} ${width}x${height} ${Math.round(size / 1024)} KB`);
    } catch (err) {
      failed = true;
      console.error(`${shot.file} failed: ${err.message.split('\n')[0]}`);
      await page.screenshot({ path: resolve(outDir, `${shot.file}.failed.png`) }).catch(() => {});
    }
  }
} finally {
  await session.close();
}
process.exit(failed ? 1 : 0);
