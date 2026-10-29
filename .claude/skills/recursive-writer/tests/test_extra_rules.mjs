import { EXTRA_RULES } from '../lib/tools/extra-rules.mjs';
const DRAFT = EXTRA_RULES.filter((r) => ['possessive', 'language-adjective', 'emphatic-do', 'translated-image', 'banned-instantly', 'banned-press'].includes(r.id));
if (DRAFT.length !== 6) { console.log('missing rules'); process.exit(1); }
const pos = {
  'possessive': ["the English email's card", "a translation's tab", "a translated email's card", "the users' devices", "Adapty’s servers"],
  'language-adjective': ["the English email", "English emails", "a Portuguese device language", "the English source"],
  'emphatic-do': ["Campaign edits do reach them."],
  'translated-image': ["Adapty Mail doesn't verify translated hero images", "You can't edit a translated hero image", "A new English hero image appears in them untranslated."],
  'banned-instantly': ["Prices update instantly."],
  'banned-press': ["Press the button.", "Pressing **Save** saves it."],
};
const neg = {
  'possessive': ["it's ready", "that's all", "What's new", "Let's start", "the 'quoted' word"],
  'language-adjective': ["on the **English (base)** tab", "the **English** row", "Select English.", "the email in English"],
  'emphatic-do': ["It does not apply.", "Edits reach them."],
  'translated-image': ["translate the text on the image", "the translated email"],
  'banned-instantly': ["Prices update."],
  'banned-press': ["press Cmd/Ctrl+C", "Press Enter to confirm.", "press ⌘Z", "Press the Esc key."],
};
let fails = 0;
for (const r of DRAFT) {
  for (const s of pos[r.id]) { r.re.lastIndex = 0; if (!r.re.test(s)) { fails++; console.log(`MISS ${r.id}: ${s}`); } }
  for (const s of neg[r.id]) { r.re.lastIndex = 0; if (r.re.test(s)) { fails++; console.log(`FALSE ${r.id}: ${s}`); } }
}
console.log(fails ? `${fails} failed` : 'all pass');
