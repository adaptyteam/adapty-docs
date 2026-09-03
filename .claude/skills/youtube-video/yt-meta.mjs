#!/usr/bin/env node
//
// Fetch a YouTube video's title and description, and pull the docs links out of
// the description.
//
//   node .claude/skills/youtube-video/yt-meta.mjs <url-or-id> [more...]
//
// WebFetch cannot do this job: YouTube serves it a navigation-only shell with
// no title and no description. Two sources are used instead —
//
//   * oEmbed, a small documented JSON endpoint, for the title and channel;
//   * the watch page's embedded player JSON for `shortDescription`, which is
//     the only place the full description is available without an API key.
//
// The second source is undocumented and can break. When it does, the title
// still resolves and the failure is reported in `warnings` rather than being
// passed off as an empty description — a video placed on the strength of a
// silently-empty description would land in the wrong article.

const ID_PATTERN = /^[\w-]{11}$/;

/** Accepts a bare ID or any YouTube URL. Mirrors src/components/YouTube.astro. */
export function extractVideoId(value) {
  const raw = (value ?? '').trim();
  if (!raw) return undefined;
  if (ID_PATTERN.test(raw)) return raw;

  let url;
  try {
    url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
  } catch {
    return undefined;
  }

  const host = url.hostname.replace(/^www\./, '');
  let candidate = null;

  if (host === 'youtu.be') {
    candidate = url.pathname.slice(1);
  } else if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtube-nocookie.com') {
    candidate = url.pathname === '/watch'
      ? url.searchParams.get('v')
      : url.pathname.match(/^\/(?:embed|shorts|live|v)\/([^/?#]+)/)?.[1] ?? null;
  }

  return candidate && ID_PATTERN.test(candidate) ? candidate : undefined;
}

async function fetchOEmbed(id) {
  const endpoint = `https://www.youtube.com/oembed?url=${encodeURIComponent(
    `https://www.youtube.com/watch?v=${id}`
  )}&format=json`;
  const res = await fetch(endpoint);
  if (!res.ok) throw new Error(`oEmbed returned ${res.status} — is the video public?`);
  return res.json();
}

async function fetchDescription(id) {
  // A browser User-Agent is required; without one YouTube serves the consent
  // or nav-only shell that has no player JSON in it.
  const res = await fetch(`https://www.youtube.com/watch?v=${id}`, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
    },
  });
  if (!res.ok) throw new Error(`watch page returned ${res.status}`);
  const html = await res.text();

  const match = html.match(/"shortDescription":"((?:[^"\\]|\\.)*)"/);
  if (!match) throw new Error('no shortDescription in the watch page — YouTube may have changed its markup');
  return JSON.parse(`"${match[1]}"`);
}

/**
 * Docs URLs in the description, in order, deduplicated.
 *
 * These are CANDIDATES, not a placement instruction: descriptions list related
 * reading, so a video whose home is one article routinely links five.
 */
export function extractDocsLinks(description) {
  const seen = new Set();
  const links = [];
  const re = /https?:\/\/adapty\.io\/docs\/([\w-]+(?:\/[\w-]+)*)\/?(?:[?#][^\s)]*)?/g;
  for (const m of description.matchAll(re)) {
    const slug = m[1].replace(/\/$/, '');
    if (seen.has(slug)) continue;
    seen.add(slug);
    // Whether the link sat under a "Docs:" heading or was mentioned in passing
    // is a weak signal, but a real one — record it rather than flatten it away.
    const preceding = description.slice(0, m.index);
    const underDocsHeading = /(^|\n)\s*Docs:\s*\n[^]*$/i.test(preceding)
      && !/(^|\n)\s*(Watch next|Timestamps|What you'll learn|Need help)\s*:?\s*\n[^]*$/i.test(
        preceding.slice(preceding.search(/(^|\n)\s*Docs:/i))
      );
    links.push({ slug, url: m[0], underDocsHeading });
  }
  return links;
}

export async function videoMeta(input) {
  const id = extractVideoId(input);
  if (!id) throw new Error(`Not a YouTube video ID or URL: ${input}`);

  const warnings = [];
  const oembed = await fetchOEmbed(id);

  let description = null;
  try {
    description = await fetchDescription(id);
  } catch (err) {
    warnings.push(
      `Could not read the description (${err.message}). ` +
        `Placement must not be guessed from the title alone — ask for the description, ` +
        `or open https://www.youtube.com/watch?v=${id} and paste it in.`
    );
  }

  return {
    id,
    title: oembed.title,
    channel: oembed.author_name,
    watchUrl: `https://youtu.be/${id}`,
    description,
    docsLinks: description ? extractDocsLinks(description) : [],
    warnings,
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const inputs = process.argv.slice(2);
  if (!inputs.length) {
    console.error('usage: node yt-meta.mjs <url-or-id> [more...]');
    process.exit(1);
  }
  const results = [];
  for (const input of inputs) {
    try {
      results.push(await videoMeta(input));
    } catch (err) {
      results.push({ input, error: err.message });
      process.exitCode = 1;
    }
  }
  console.log(JSON.stringify(results.length === 1 ? results[0] : results, null, 2));
}
