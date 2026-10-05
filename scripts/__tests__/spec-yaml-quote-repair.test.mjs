import { test } from 'node:test';
import assert from 'node:assert/strict';
import yaml from 'js-yaml';
import { quoteYamlPlainScalars, parseOrRepairSpecSection } from '../translate.mjs';

// Regression for the vi spec sections that failed on every run since
// 2026-09-18: "ví dụ:" ("for example:") inside an unquoted value reads as a
// new YAML key → "bad indentation of a mapping entry".

const metricData = [
  'components:',
  '  schemas:',
  '    MetricData:',
  '      properties:',
  '        type:',
  '          type: string',
  "          description: Loại chỉ số (ví dụ: 'multi', 'single')",
  '        lang:',
  '          type: string',
  '          description: Mã ngôn ngữ của Remote Config (ví dụ: "en", "es", "fr")',
  '        os:',
  '          description: Hệ điều hành, ví dụ: `iOS` hoặc `Android`.',
  '',
].join('\n');

test('the vi MetricData fixture reproduces the parse error', () => {
  assert.throws(() => yaml.load(metricData), /bad indentation of a mapping entry/);
});

test('quoteYamlPlainScalars quotes values containing ": " and keeps their text', () => {
  const doc = yaml.load(quoteYamlPlainScalars(metricData));
  const p = doc.components.schemas.MetricData.properties;
  assert.equal(p.type.description, "Loại chỉ số (ví dụ: 'multi', 'single')");
  assert.equal(p.lang.description, 'Mã ngôn ngữ của Remote Config (ví dụ: "en", "es", "fr")');
  assert.equal(p.os.description, 'Hệ điều hành, ví dụ: `iOS` hoặc `Android`.');
  assert.equal(p.type.type, 'string');
});

test('a value with both quote kinds is single-quoted with doubled apostrophes', () => {
  const out = quoteYamlPlainScalars(`description: Ví dụ: 'a' và "b"`);
  assert.equal(yaml.load(out).description, `Ví dụ: 'a' và "b"`);
});

test('quoted, block, flow and colon-free values are left alone', () => {
  const src = [
    'a: "already: quoted"',
    "b: 'also: quoted'",
    'c: |',
    '  block: text',
    'd: [x, y]',
    'e: plain text',
    'f: https://example.com/path',
  ].join('\n');
  assert.equal(quoteYamlPlainScalars(src), src);
});

test('parseOrRepairSpecSection returns valid text unchanged and repairs broken text', () => {
  const ok = 'info:\n  title: Tiêu đề\n';
  assert.equal(parseOrRepairSpecSection(ok, 'info'), ok);
  const fixed = parseOrRepairSpecSection(metricData, 'components.schemas::MetricData', 'test');
  assert.ok(yaml.load(fixed).components.schemas.MetricData);
});

test('parseOrRepairSpecSection still throws when the repair cannot help', () => {
  assert.throws(() => parseOrRepairSpecSection('Here is your YAML.', 'info'));
});
