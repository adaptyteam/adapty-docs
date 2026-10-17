// The skill's own prose rules for the Adapty docs linter, on top of scripts/lint-prose.mjs.
// Not in the shared repo: tools/lint-personal.mjs injects them into
// scripts/lint-prose.mjs at run time. Same rule shape as that file's RULES.
// Changed lines only: most of these have hundreds of legacy hits.
const LANGS =
  'English|Spanish|French|German|Italian|Portuguese|Chinese|Japanese|Korean|Russian|Turkish|Arabic|Dutch|Polish|Swedish|Ukrainian|Indonesian|Vietnamese|Thai|Hindi';

export const EXTRA_RULES = [
  // Changed lines only: most of these have hundreds of legacy hits.
  {
    id: 'banned-lets-you',
    scope: 'changed',
    re: /\blets? you\b/gi,
    hint: 'Rephrase around what the reader does; "allows you" only as a last resort.',
  },
  {
    id: 'banned-choose',
    scope: 'changed',
    re: /\b(choose|chooses|chose|chosen|choosing)\b/gi,
    hint: 'Use "select" / "selected".',
  },
  {
    id: 'banned-press',
    scope: 'changed',
    re: /\bpress(es|ed|ing)?\b(?![ \t]+(the[ \t]+)?(Cmd|Ctrl|⌘|Command|Control|Enter|Return|Esc|Escape|Shift|Tab|Option|Alt|Space|Delete|Backspace|key|keyboard)\b)/gi,
    hint: 'On-screen controls are clicked; "press" is only for physical keys and buttons.',
  },
  {
    id: 'banned-provides',
    scope: 'changed',
    re: /\bprovides?\b/gi,
    hint: 'Use "offers", or restructure the sentence.',
  },
  {
    id: 'banned-get',
    scope: 'changed',
    re: /\b(get|gets|getting|got|gotten)\b/gi,
    hint: 'Use the precise verb: receive, see, buy, become, open. Keep "get" only when none fits.',
  },
  {
    id: 'banned-your-developer',
    scope: 'changed',
    re: /\byour developers?\b(?![ \t]+(setup|account|console|tools?|environment)\b)/gi,
    hint: 'Say what the app\'s code must do, or "the developer".',
  },
  {
    id: 'wordy-phrase',
    scope: 'changed',
    re: /\b(in order to|is able to|are able to|as usual|plenty)\b/gi,
    hint: 'Cut or replace: "to", "can", or a plain word.',
  },
  {
    id: 'by-gerund',
    scope: 'changed',
    re: /\bby [a-z]+ing\b/gi,
    hint: 'Rephrase without "by" + "-ing".',
  },
  {
    id: 'whose-for-things',
    scope: 'changed',
    re: /\bwhose\b/gi,
    hint: '"Whose" is for people. For things: "groups with duplicate option IDs".',
  },
  {
    id: 'sentence-initial-connector',
    scope: 'changed',
    re: /(?:^|[.!?][ \t]+)(?:Also|So|Wherever|(?:If you|[A-Z][\w-]*) also)\b/gm,
    hint: 'State the actual relationship instead of "Also", "X also", "If you also", "So", or "Wherever".',
  },
  {
    id: 'how-statement',
    scope: 'changed',
    re: /(?:^|[.!?][ \t]+)How\b[^.?!\n]*\./gm,
    hint: 'A statement that opens with "How" reads like a question. Name the subject first.',
  },
  {
    id: 'these-before-list',
    scope: 'changed',
    re: /\bthese [a-z]+( [a-z]+)?:[ \t]*$/gim,
    hint: 'Before a list, use "the following X:".',
  },
  {
    id: 'plus-in-prose',
    scope: 'changed',
    re: /\bplus\b/gi,
    hint: 'Use "and", or restructure.',
  },
  {
    id: 'on-store',
    scope: 'changed',
    re: /\bOn (Google Play|Stripe|Paddle)\b/g,
    hint: '"On" fits only "the App Store". Write "For Google Play subscriptions".',
  },
  {
    id: 'step-in-heading',
    scope: 'changed',
    re: /^#{2,6}[ \t]+.*\bStep\b/gm,
    hint: 'Drop the word "Step" from headings; numbered setup headings read "### 1. Label".',
  },
  {
    id: 'arrow-character',
    scope: 'changed',
    re: /→/g,
    hint: 'Use ">" for UI paths; rephrase other arrows.',
  },
  {
    id: 'judgment-whether',
    scope: 'changed',
    re: /\b(whether( or not)?|make use of)\b/gi,
    hint: 'Judgment call: keep only if it\'s the clearest way; otherwise state the condition plainly.',
  },
  {
    id: 'possessive',
    scope: 'changed',
    re: /\b(?!(?:it|that|there|here|what|who|let|he|she|where|how|when|why)['’]s\b)[A-Za-z][\w-]*['’]s\b|\b[a-z][\w-]*s['’](?=[ \t]+[a-z])/gi,
    hint: 'Restructure without the possessive: name the UI place, make the owner the subject, or use "of" if it stays short.',
  },
  {
    id: 'language-adjective',
    scope: 'changed',
    re: new RegExp(`(?<!\\*\\*)\\b(${LANGS})[ \\t]+(emails?|sources?|texts?|versions?|translations?|copy|content|campaigns?|images?|subjects?|templates?|pages?|strings?|devices?|device languages?)\\b`, 'g'),
    hint: 'Don\'t use a language name as an adjective: "the email in English", "a device set to Portuguese". UI labels such as **English (base)** are exempt.',
  },
  {
    id: 'emphatic-do',
    scope: 'changed',
    re: /\b(do|does|did)[ \t]+(reach|work|count|apply|appear|show|send|change|matter|update|stay|keep|happen|exist|arrive|include|support)\b/gi,
    hint: 'Judgment: drop the emphatic "do" ("edits reach them"), unless it answers a stated doubt or forms a question.',
  },
  {
    id: 'translated-image',
    scope: 'changed',
    re: /\b(un)?translated[ \t]+([\w-]+[ \t]+)?(images?|pictures?|banners?|screenshots?|photos?)\b|\b(images?|pictures?|banners?|screenshots?|photos?)\b[^.\n]{0,40}\buntranslated\b/gi,
    hint: 'An image isn\'t translated: say what happens to the text on the image.',
  },
  {
    id: 'banned-instantly',
    scope: 'changed',
    re: /\binstantly\b/gi,
    hint: 'Cut "instantly", or state the actual timing if a source confirms it.',
  },
];
