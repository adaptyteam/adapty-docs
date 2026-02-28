import { appendFile, writeFile } from 'node:fs/promises';
import { statusLabel } from './group.mjs';

/**
 * Emit GitHub Actions annotations for broken/bad links.
 * ::error annotations for broken links, ::warning for warnings.
 */
export function emitAnnotations({ uniqueErrors, uniqueWarnings, manualCheckList }) {
  for (const b of uniqueErrors) {
    const msg = `Broken link: ${b.url} — ${statusLabel(b)}`;
    console.log(`::error file=src/content/docs/${b.source},line=${b.line}::${msg}`);
  }
  for (const b of uniqueWarnings) {
    const detail = b.redirect || b.anchor || statusLabel(b);
    const msg = `Stale link: ${b.url} — ${detail}`;
    console.log(`::warning file=src/content/docs/${b.source},line=${b.line}::${msg}`);
  }
  for (const b of manualCheckList) {
    const msg = `Manual check: ${b.url} — ${statusLabel(b)}`;
    console.log(`::warning file=src/content/docs/${b.source},line=${b.line}::${msg}`);
  }
}

/**
 * Write a Markdown summary to $GITHUB_STEP_SUMMARY.
 */
export async function writeStepSummary({ allLinks, uniqueErrors, uniqueWarnings, manualCheckList, files }) {
  const summaryFile = process.env.GITHUB_STEP_SUMMARY;
  if (!summaryFile) return;

  const lines = [
    '## Link Check Report',
    '',
    `| Metric | Count |`,
    `|--------|------:|`,
    `| Total links scanned | ${allLinks.length} |`,
    `| Files scanned | ${files.length} |`,
    `| Broken links | ${uniqueErrors.length} |`,
    `| Stale links (warnings) | ${uniqueWarnings.length} |`,
    `| Manual check required | ${manualCheckList.length} |`,
    '',
  ];

  if (uniqueErrors.length > 0) {
    lines.push(
      '<details><summary>Broken links</summary>',
      '',
      '| Source | URL | Status |',
      '|--------|-----|--------|',
    );
    for (const b of uniqueErrors) {
      lines.push(`| \`${b.source}:${b.line}\` | ${b.url} | ${statusLabel(b)} |`);
    }
    lines.push('', '</details>', '');
  }

  if (uniqueWarnings.length > 0) {
    lines.push(
      '<details><summary>Stale links</summary>',
      '',
      '| Source | URL | Issue |',
      '|--------|-----|-------|',
    );
    for (const b of uniqueWarnings) {
      const detail = b.redirect || b.anchor || statusLabel(b);
      lines.push(`| \`${b.source}:${b.line}\` | ${b.url} | ${detail} |`);
    }
    lines.push('', '</details>', '');
  }

  if (manualCheckList.length > 0) {
    lines.push(
      '<details><summary>Manual check required</summary>',
      '',
      '| Source | URL | Reason |',
      '|--------|-----|--------|',
    );
    for (const b of manualCheckList) {
      lines.push(`| \`${b.source}:${b.line}\` | ${b.url} | ${statusLabel(b)} |`);
    }
    lines.push('', '</details>', '');
  }

  await appendFile(summaryFile, lines.join('\n') + '\n', 'utf-8');
}
