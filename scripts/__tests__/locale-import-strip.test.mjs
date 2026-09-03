import { test } from 'node:test';
import assert from 'node:assert/strict';
import { postProcessTranslation } from '../translate.mjs';

// Regression for deploy run 31807322873 (2026-08-14): the translated
// what-is-adapty.mdx kept the English source's
// `import Homepage from '../../../components/Homepage';` line. That depth is
// correct from src/content/docs/version-3.0/ but overshoots from
// src/locales/<lang>/ (one level shallower), so every build-locale-only job
// failed with "Could not resolve '../../../components/Homepage'". The keep
// rule for '../../../components/' was meant only for the *.astro imports that
// the reusable-snippet rewrite produces.

const FM = '---\ntitle: "T"\n---\n';

test('Homepage import is stripped (locale route injects a localized wrapper)', () => {
  const out = postProcessTranslation(
    FM + "\nimport Homepage from '../../../components/Homepage';\n\n<Homepage />\n",
    'zh',
  );
  assert.ok(!out.includes('import Homepage'), 'Homepage import must be stripped');
  assert.ok(out.includes('<Homepage />'), 'Homepage usage must survive');
});

test('hydrated React component imports get their depth fixed, not stripped', () => {
  const out = postProcessTranslation(
    FM +
      "\nimport { CompoundCalculator } from '../../../components/CompoundCalculator';\n\n<CompoundCalculator client:load />\n",
    'zh',
  );
  assert.ok(
    out.includes("from '../../components/CompoundCalculator'"),
    'depth must be rewritten to ../../ for src/locales/<lang>/',
  );
  assert.ok(!out.includes('../../../components/CompoundCalculator'));
});

test('reusable-snippet .astro imports are rewritten to ../../../ and kept', () => {
  // Reusable snippets arrive with the src/components/reusable/-relative form;
  // postProcessTranslation rewrites it for src/locales/<lang>/reusable/ depth.
  const out = postProcessTranslation(
    FM + "\nimport Callout from '../Callout.astro';\n\n<Callout />\n",
    'zh',
  );
  assert.ok(
    out.includes("import Callout from '../../../components/Callout.astro';"),
    '.astro imports are correct from src/locales/<lang>/reusable/ and must be kept',
  );
});

test('localized reusable snippet imports are kept', () => {
  const line =
    "import SupportForum from '@site/src/locales/zh/reusable/SupportForum.mdx';";
  const out = postProcessTranslation(FM + '\n' + line + '\n\n<SupportForum />\n', 'zh');
  assert.ok(out.includes(line));
});

test('other component imports are stripped (injected via components prop)', () => {
  const out = postProcessTranslation(
    FM + "\nimport Zoom from 'react-medium-image-zoom';\n\n<Zoom />\n",
    'zh',
  );
  assert.ok(!out.includes('import Zoom'));
});
