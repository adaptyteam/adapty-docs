import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveLocaleOnly } from '../locale-only.mjs';

const src = `Before.

<LocaleOnly locales={['zh', 'ja']}>

:::tip
Mirror tip.
:::

</LocaleOnly>

After.`;

test('unwraps the block for a listed locale and drops the tags', () => {
  const out = resolveLocaleOnly(src, 'zh');
  assert.match(out, /Mirror tip\./);
  assert.doesNotMatch(out, /LocaleOnly/);
});

test('cuts the whole block for an unlisted locale', () => {
  for (const locale of ['en', 'fr']) {
    const out = resolveLocaleOnly(src, locale);
    assert.doesNotMatch(out, /Mirror tip|LocaleOnly/);
    assert.match(out, /Before\.[\s\S]*After\./);
  }
});

test('handles several blocks independently', () => {
  const two = `<LocaleOnly locales={["zh"]}>A</LocaleOnly> <LocaleOnly locales={['fr']}>B</LocaleOnly>`;
  assert.equal(resolveLocaleOnly(two, 'zh'), 'A ');
  assert.equal(resolveLocaleOnly(two, 'fr'), ' B');
});
