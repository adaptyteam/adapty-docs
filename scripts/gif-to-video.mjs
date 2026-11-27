#!/usr/bin/env node
/**
 * Converts animated GIFs that articles show with <ZoomImage id="x.gif"> (or the
 * legacy <img src="…/x.gif">, rendered by MDXImage) into
 * the H.264 MP4 + WebP poster pair that <DocVideo> plays, then deletes each GIF.
 *
 * Articles keep their tags: ZoomImage and MDXImage render x.mp4 as a DocVideo
 * when the GIF is gone and the video exists. So no article, snippet
 * or translation changes, and translated pages switch over with the English ones.
 *
 * Usage:
 *   node scripts/gif-to-video.mjs                 # every GIF referenced from an article
 *   node scripts/gif-to-video.mjs a.gif b.gif     # only these
 *   node scripts/gif-to-video.mjs --dry-run       # report, change nothing
 *   node scripts/gif-to-video.mjs --keep-gif      # convert but keep the GIFs
 *
 * Needs ffmpeg with libx264 on PATH (`brew install ffmpeg`) and the project's
 * node_modules (for sharp).
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const VIDEO_DIR = path.join(ROOT, 'src/assets/shared/video');
const SEARCH_DIRS = ['src/content/docs', 'src/components/reusable', 'src/locales'];
const IMAGE_DIRS = ['src/assets', 'src/content/docs'];
// Visually lossless for UI screen recordings; see the size table this prints.
const CRF = '26';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const keepGif = args.includes('--keep-gif');
const named = args.filter((a) => !a.startsWith('--')).map((a) => path.basename(a));

function walk(dir, test, out = []) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        if (entry.name.startsWith('.')) continue; // skips locales' .hashes caches
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(full, test, out);
        else if (test(entry.name)) out.push(full);
    }
    return out;
}

/** GIF filenames referenced from articles, across English and translated pages. */
function referencedGifs() {
    const names = new Set();
    for (const dir of SEARCH_DIRS) {
        for (const file of walk(path.join(ROOT, dir), (n) => /\.mdx?$/.test(n))) {
            const text = fs.readFileSync(file, 'utf8');
            // <ZoomImage id="x.gif"> and the legacy <img src="…/x.gif"> (MDXImage), which may span lines
            for (const m of text.matchAll(/<(?:ZoomImage\b[^>]*?\bid|img\b[^>]*?\bsrc)=["']([^"']+\.gif)["']/g)) {
                names.add(path.basename(m[1]));
            }
        }
    }
    return names;
}

function findGif(name) {
    for (const dir of IMAGE_DIRS) {
        const hit = walk(path.join(ROOT, dir), (n) => n === name)[0];
        if (hit) return hit;
    }
}

const mb = (bytes) => (bytes / 1048576).toFixed(2);

const targets = named.length ? named : [...referencedGifs()].sort();
fs.mkdirSync(VIDEO_DIR, { recursive: true });

let before = 0;
let after = 0;
const rows = [];

for (const name of targets) {
    const gif = findGif(name);
    const base = name.replace(/\.gif$/i, '');
    const mp4 = path.join(VIDEO_DIR, `${base}.mp4`);
    const poster = path.join(VIDEO_DIR, `${base}.webp`);

    if (!gif) {
        rows.push([name, fs.existsSync(mp4) ? 'already converted' : 'GIF NOT FOUND']);
        continue;
    }
    if (fs.existsSync(mp4)) {
        rows.push([name, `skipped: ${path.relative(ROOT, mp4)} already exists`]);
        continue;
    }
    const gifSize = fs.statSync(gif).size;
    if (dryRun) {
        rows.push([name, `${mb(gifSize)} MB, would convert`]);
        continue;
    }

    // yuv420p and even dimensions are what every browser's H.264 decoder accepts;
    // +faststart puts the index first so playback can begin before the download ends.
    execFileSync('ffmpeg', [
        '-loglevel', 'error', '-y', '-i', gif,
        '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', CRF,
        '-pix_fmt', 'yuv420p', '-vf', 'scale=trunc(iw/2)*2:trunc(ih/2)*2',
        '-movflags', '+faststart', mp4,
    ]);
    // Poster: the first frame, shown until playback starts (and kept for reduced motion)
    const firstFrame = execFileSync('ffmpeg', ['-loglevel', 'error', '-i', gif, '-frames:v', '1', '-f', 'image2pipe', '-c:v', 'png', '-']);
    await sharp(firstFrame).webp({ quality: 80 }).toFile(poster);

    const videoSize = fs.statSync(mp4).size + fs.statSync(poster).size;
    if (videoSize >= gifSize) {
        // Tiny GIFs can come out smaller than their video; keep those as they are
        fs.rmSync(mp4);
        fs.rmSync(poster);
        rows.push([name, `kept GIF: video would be larger (${mb(videoSize)} vs ${mb(gifSize)} MB)`]);
        continue;
    }

    before += gifSize;
    after += videoSize;
    if (!keepGif) fs.rmSync(gif);
    rows.push([name, `${mb(gifSize)} MB → ${mb(videoSize)} MB`]);
}

for (const [name, result] of rows) console.log(`${name.padEnd(48)} ${result}`);
if (!dryRun && before) {
    console.log(`\nConverted ${rows.filter((r) => r[1].includes('→')).length} GIFs: ${mb(before)} MB → ${mb(after)} MB (${Math.round((1 - after / before) * 100)}% smaller)`);
}
