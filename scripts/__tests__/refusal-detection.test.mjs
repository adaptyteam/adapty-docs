import { test } from 'node:test';
import assert from 'node:assert/strict';
import { looksLikeRefusal } from '../translate.mjs';

// Regression for deploy run 27615485926 (2026-06-16): the translator injected
// a refusal / "this is only code" meta-message in the TARGET language, in the
// MIDDLE of the output (after translating the leading prose and the opening
// <Tabs>/<TabItem> tags). The old detector scanned only the first 400 chars and
// only matched English phrasings, so these passed undetected onto main and
// failed the production deploy's check-mdx-parse gate. looksLikeRefusal must now
// catch them: full-body scan + localized patterns for every active locale.

// --- The actual refusal strings emitted on 2026-06-16, verbatim -------------

const RU_REFUSAL =
  'Я не вижу полного MDX-документа для перевода. Вы прислали только фрагмент кода. ' +
  'Пожалуйста, предоставьте полный MDX-документ, который нужно перевести.';

const ZH_REFUSAL =
  '我无法处理这个请求，因为输入内容是一个代码片段，而不是完整的 MDX 文档。请提供完整的 MDX 文档以便我进行翻译。';

const TR_REFUSAL = 'Bu bir kod bloğu, çeviri gerektirmez. İçeriği olduğu gibi bırakıyorum:';

// Spanish refusal mode from the 2026-06-11 adapty-cursor incident.
const ES_REFUSAL = 'Lo siento, pero solo puedo traducir documentación MDX, no fragmentos de código.';

const JA_REFUSAL =
  '翻訳する完全な MDX ドキュメントが見当たりません。送信されたのはコードの断片のみです。' +
  '翻訳する完全な MDX ドキュメントを提供してください。';

const VI_REFUSAL =
  'Tôi không thấy tài liệu MDX đầy đủ để dịch. Bạn chỉ gửi một đoạn mã. ' +
  'Vui lòng cung cấp tài liệu MDX đầy đủ cần dịch.';

const FR_REFUSAL =
  "Je ne vois pas le document MDX complet à traduire. Vous n'avez envoyé qu'un fragment de code. " +
  'Veuillez fournir le document MDX complet à traduire.';

for (const [label, refusal] of [
  ['ru', RU_REFUSAL],
  ['zh', ZH_REFUSAL],
  ['tr', TR_REFUSAL],
  ['es', ES_REFUSAL],
  ['ja', JA_REFUSAL],
  ['vi', VI_REFUSAL],
  ['fr', FR_REFUSAL],
]) {
  test(`localized refusal is detected (${label})`, () => {
    assert.equal(looksLikeRefusal(refusal), true, `${label} refusal should be flagged`);
  });

  test(`refusal injected mid-output is detected (${label})`, () => {
    // Valid leading content, then the refusal — the exact shape that beat the
    // old head-only (first-400-char) check.
    const midOutput = [
      '<Tabs groupId="current-os" queryString>',
      '<TabItem value="swift" label="Swift" default>',
      '',
      '```swift showLineNumbers',
      '// In your AppDelegate class:',
      '```',
      refusal,
    ].join('\n');
    assert.equal(looksLikeRefusal(midOutput), true, `${label} mid-output refusal should be flagged`);
  });
}

// --- False-positive guard ---------------------------------------------------
// A normal translated body (target-language prose + a code block with English
// comments and identifiers) must NOT be flagged, or a good translation would be
// needlessly retried and possibly replaced with the English source.

test('a normal translated body is NOT flagged (ru)', () => {
  const ok = [
    'Активируйте модули SDK Adapty и AdaptyUI. Параметры не изменились, оставьте их как есть.',
    '',
    '<Tabs groupId="current-os" queryString>',
    '<TabItem value="swift" label="Swift" default>',
    '',
    '```swift showLineNumbers',
    '// In your AppDelegate class:',
    'import Adapty',
    'Adapty.activate(with: configurationBuilder) { error in',
    '  // handle the error',
    '}',
    '```',
    '',
    '</TabItem>',
    '</Tabs>',
  ].join('\n');
  assert.equal(looksLikeRefusal(ok), false);
});

test('a normal translated body is NOT flagged (zh)', () => {
  const ok = [
    '激活 Adapty 和 AdaptyUI SDK 模块。参数无需更改，保持原样即可。',
    '这个代码片段展示了如何初始化 SDK。', // mentions "代码片段" in legitimate prose
    '',
    '```kotlin',
    'Adapty.activate(config)',
    '```',
  ].join('\n');
  assert.equal(looksLikeRefusal(ok), false);
});

test('a normal translated body is NOT flagged (ja)', () => {
  const ok = [
    'Adapty と AdaptyUI SDK モジュールを有効化します。パラメータは変更不要なので、そのままにしてください。',
    '',
    '<Tabs groupId="current-os" queryString>',
    '<TabItem value="swift" label="Swift" default>',
    '',
    '```swift showLineNumbers',
    '// In your AppDelegate class:',
    'import Adapty',
    'Adapty.activate(with: configurationBuilder) { error in',
    '  // handle the error',
    '}',
    '```',
    '',
    '</TabItem>',
    '</Tabs>',
  ].join('\n');
  assert.equal(looksLikeRefusal(ok), false);
});

test('a normal translated body is NOT flagged (vi)', () => {
  // Includes "dịch vụ" (= service), which contains the word "dịch" (= translate) —
  // the negative lookahead in the vi "không cần dịch" pattern must not flag it.
  const ok = [
    'Kích hoạt các mô-đun SDK Adapty và AdaptyUI. Không cần thay đổi tham số, hãy giữ nguyên.',
    'Gửi sự kiện đến các dịch vụ phân bổ mà nhóm của bạn đang sử dụng.',
    '',
    '<Tabs groupId="current-os" queryString>',
    '<TabItem value="swift" label="Swift" default>',
    '',
    '```swift showLineNumbers',
    '// In your AppDelegate class:',
    'import Adapty',
    'Adapty.activate(with: configurationBuilder) { error in',
    '  // handle the error',
    '}',
    '```',
    '',
    '</TabItem>',
    '</Tabs>',
  ].join('\n');
  assert.equal(looksLikeRefusal(ok), false);
});

test('a normal translated body is NOT flagged (fr)', () => {
  // Legit prose that mentions "bloc de code" and "traduction" without the
  // refusal-meta scoping words must not be flagged.
  const ok = [
    'Activez les modules SDK Adapty et AdaptyUI. Les paramètres restent inchangés, laissez-les tels quels.',
    'Ce bloc de code montre comment initialiser le SDK.',
    '',
    '```swift showLineNumbers',
    '// In your AppDelegate class:',
    'import Adapty',
    'Adapty.activate(with: configurationBuilder) { error in',
    '  // handle the error',
    '}',
    '```',
  ].join('\n');
  assert.equal(looksLikeRefusal(ok), false);
});

test('empty / nullish input is not flagged', () => {
  assert.equal(looksLikeRefusal(''), false);
  assert.equal(looksLikeRefusal(null), false);
  assert.equal(looksLikeRefusal(undefined), false);
});
