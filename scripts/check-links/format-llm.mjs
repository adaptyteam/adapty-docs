import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { statusLabel, groupBySource } from './group.mjs';

/**
 * Generate a plain-text, LLM-friendly link check report.
 * Structured for easy parsing: one issue per line, grouped by file.
 */
export async function generateLlmReport(results, { outputPath, fileCount, totalLinks }) {
  const { uniqueErrors, uniqueWarnings, manualCheckList, whitelistedWarnings = [] } = results;

  const lines = [];

  // Header
  lines.push('# Link Check Report');
  lines.push('');
  lines.push(`Files scanned: ${fileCount}`);
  lines.push(`Total links: ${totalLinks}`);
  lines.push(`Broken: ${uniqueErrors.length}`);
  lines.push(`Stale: ${uniqueWarnings.length}`);
  lines.push(`Manual check: ${manualCheckList.length}`);
  lines.push(`Whitelisted: ${whitelistedWarnings.length}`);
  lines.push('');

  // Broken links grouped by file
  if (uniqueErrors.length > 0) {
    lines.push('## Broken links');
    lines.push('');
    for (const [source, items] of groupBySource(uniqueErrors)) {
      lines.push(`### ${source}`);
      for (const b of items) {
        lines.push(`- Line ${b.line}: ${b.url} — ${statusLabel(b)}`);
      }
      lines.push('');
    }
  }

  // Stale links grouped by file
  if (uniqueWarnings.length > 0) {
    lines.push('## Stale links');
    lines.push('');
    for (const [source, items] of groupBySource(uniqueWarnings)) {
      lines.push(`### ${source}`);
      for (const b of items) {
        lines.push(`- Line ${b.line}: ${b.url} — ${statusLabel(b)}${b.redirect ? ` -> ${b.redirect}` : ''}${b.anchor ? ` (${b.anchor})` : ''}`);
      }
      lines.push('');
    }
  }

  // Manual check grouped by file
  if (manualCheckList.length > 0) {
    lines.push('## Manual check required');
    lines.push('');
    for (const [source, items] of groupBySource(manualCheckList)) {
      lines.push(`### ${source}`);
      for (const b of items) {
        lines.push(`- Line ${b.line}: ${b.url} — ${statusLabel(b)}${b.redirect ? ` -> ${b.redirect}` : ''}`);
      }
      lines.push('');
    }
  }

  // Whitelisted
  if (whitelistedWarnings.length > 0) {
    lines.push('## Whitelisted');
    lines.push('');
    for (const [source, items] of groupBySource(whitelistedWarnings)) {
      lines.push(`### ${source}`);
      for (const b of items) {
        lines.push(`- Line ${b.line}: ${b.url} — ${statusLabel(b)}`);
      }
      lines.push('');
    }
  }

  const text = lines.join('\n');
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, text, 'utf-8');
  console.log(`LLM report written to: ${outputPath}`);
}
