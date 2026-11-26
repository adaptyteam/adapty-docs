import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalizeId, mergeSdkSidebars, renderMergedSdk } from '../llms-sdk-merge.mjs';

const doc = (id, label) => ({ type: 'doc', id, label });
const cat = (label, id, items) => ({ type: 'category', label, id, items });

const platforms = [
    { id: 'ios', label: 'iOS' },
    { id: 'android', label: 'Android' },
    { id: 'react-native', label: 'React Native' },
];

function render(sidebars, noindex = []) {
    return renderMergedSdk(mergeSdkSidebars(sidebars), {
        platforms,
        baseUrl: 'https://x.io/docs',
        urlPrefix: '',
        noindexDocIds: new Set(noindex),
        translate: item => item.label,
    });
}

test('normalizeId strips the platform token wherever it sits', () => {
    assert.equal(normalizeId('ios-handling-events', 'ios'), 'handling-events');
    assert.equal(normalizeId('fetch-paywalls-and-products-android', 'android'), 'fetch-paywalls-and-products');
    assert.equal(normalizeId('migration-to-react-native330', 'react-native'), 'migration-to-react-native330');
    assert.equal(normalizeId('sdk-installation-kotlin-multiplatform', 'kmp'), 'sdk-installation');
});

test('same topic on several platforms becomes one line with a link each', () => {
    const out = render([
        { platformId: 'ios', items: [cat('Get started', 'ios-sdk-overview', [doc('ios-handling-events', 'Handle events')])] },
        { platformId: 'android', items: [cat('Get started', 'android-sdk-overview', [doc('handling-events-android', 'Handle events')])] },
    ]);
    assert.match(out, /^### Get started$/m);
    assert.match(out, /^- Overview — \[iOS\]\(https:\/\/x\.io\/docs\/ios-sdk-overview\.md\) · \[Android\]/m);
    assert.match(out, /^- Handle events — \[iOS\]\(https:\/\/x\.io\/docs\/ios-handling-events\.md\) · \[Android\]\(https:\/\/x\.io\/docs\/handling-events-android\.md\)$/m);
});

test('entries with different ids merge on an equal label', () => {
    const out = render([
        { platformId: 'ios', items: [doc('migration-to-ios330', 'Migrate to v3.3')] },
        { platformId: 'android', items: [doc('migration-to-android330', 'Migrate to v3.3')] },
    ]);
    assert.equal(out.trim().split('\n').length, 1);
});

test('a page merges with a category of the same topic on another platform', () => {
    const out = render([
        { platformId: 'ios', items: [doc('sdk-installation-ios', 'Install')] },
        { platformId: 'react-native', items: [cat('Install', 'sdk-installation-reactnative', [doc('sdk-installation-react-native-expo', 'Expo')])] },
    ]);
    assert.match(out, /^### Install$/m);
    assert.match(out, /^- Overview — \[iOS\].* · \[React Native\]/m);
    assert.match(out, /^- Expo — \[React Native\]/m);
});

test('a platform-only page keeps its position in that platform order', () => {
    const out = render([
        { platformId: 'ios', items: [doc('ios-a', 'A'), doc('ios-c', 'C')] },
        { platformId: 'android', items: [doc('android-a', 'A'), doc('android-b', 'B'), doc('android-c', 'C')] },
    ]);
    assert.deepEqual(out.trim().split('\n').map(l => l.split(' — ')[0]), ['- A', '- B', '- C']);
});

test('noindex pages are left out', () => {
    const out = render([{ platformId: 'ios', items: [doc('ios-a', 'A'), doc('ios-hidden', 'Hidden')] }], ['ios-hidden']);
    assert.doesNotMatch(out, /Hidden/);
});
