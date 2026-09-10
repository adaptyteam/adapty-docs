---
name: "editor"
description: Use when reviewing or writing MDX files in src/content/docs — proofreading, checking technical writing quality, verifying Simplified Technical English compliance, validating links and images, or drafting new doc content.
---

# Editor - Technical Documentation Review and Writing

Review or write technical documentation as a senior technical writer, focusing on clarity, precision, and STE compliance.

## Mode Detection

**Review mode** (default): User asks to review, proofread, check, or improve existing content → follow Review Workflow.

**Write mode**: User asks to write, draft, create, or add new content → follow Writing Workflow. Do NOT start writing immediately.

If mode is ambiguous, ask to clarify.

## Review Workflow

1. **Identify scope**: Diff or full article?
2. **Load references** — trigger on the task, never on the findings. You cannot know an issue is present until you have read the list that names it, so "load if relevant" resolves to "never load":
   - Always: `references/simplified-technical-english.md`
   - Full-article reviews, and all writing: `references/article-structure.md`
   - Anything touching links, images, imports, or anchors: `references/astro-patterns.md`
   - Producing a plan or annotated feedback: `references/output-templates.md`
3. **Identify the doc type** (integration guide, feature doc, troubleshooting, API reference, conceptual, release notes) and check the article follows that shape — see `references/article-structure.md` → Doc-Type Conventions
4. **Check structure** (full articles): Introduction, heading hierarchy, parallel structure
5. **Perform checks**: Work through the Review Pass Order below — it sequences every Key Review Area
6. **Report findings**: Organized by priority — see Output Format
7. **Suggest fixes**: Provide specific rewritten text, not just descriptions

## Writing Workflow

**Never start writing immediately.** Complete all phases first.

### Phase 1: Understand the Task

Ask about:
1. Scope: Full article, new section, or rewrite of existing section?
2. Topic and goal: What should the reader be able to do after reading?
3. Target audience: Developers, PMs, marketers? Which platforms?
4. Placement: New file or existing article? Which sidebar section?
5. Source material: Notes, specs, or reference material available?

Use AskUserQuestion tool. Do not proceed until task is clear.

### Phase 2: Research Existing Patterns

1. Read neighboring articles in the same sidebar section — match tone, depth, structure
2. Check for existing content on this topic — avoid duplication. Read the zone brief for the area (`context-mill` skill, lookup mode) rather than grepping the docs tree: its `Boundaries` section exists precisely to answer "does this already live somewhere else, and where", and its roster lists every article in the area with its role. A term search can only tell you which files mention a word; the brief tells you which one owns the topic
3. Identify linking opportunities
4. Note conventions: frontmatter format, component usage, heading levels
5. Load references — same trigger rule as Review Workflow step 2. For writing, that is always `simplified-technical-english.md` and `article-structure.md`.

Report findings to user. See `output-templates.md` for output format.

### Phase 3: Plan the Content

Create a detailed outline and present it for user approval. Include: frontmatter, full draft introduction, H2/H3 heading structure with descriptions, key points per section, callout placement, cross-links, and images needed.

**Do not proceed to Phase 4 without user approval.**

See `output-templates.md` for the plan format.

### Phase 4: Write

Apply all Key Review Areas below as composition rules. Use Write/Edit tools to create actual MDX files — don't deliver content as chat messages.

### Phase 5: Self-Review

After writing:
1. Run the Review Pass Order over what you wrote
2. Fix all violations before presenting — after each fix, re-read the whole bullet or paragraph (see After Any Edit)
3. Verify all links point to existing pages
4. Check sentence lengths on any sentence that looks long
5. Verify introduction answers what, why, and when
6. For new articles: add entry to sidebar in `src/data/sidebars/`
7. **Scan every bullet list with bold labels** — confirm every item is `- **Label**: Capitalized explanation.` Fix any `—`, `-`, `.**`, or lowercase-after-colon patterns. ❌ `- **Label**: connects to...` → ✅ `- **Label**: Connects to...`
8. **For UI workflow articles**: Output a screenshot capture table after the writing summary — one row per `:::note` placeholder, with filename and what the screenshot should show. This lets the user capture everything in one pass.

Present final content with a brief writing summary. See `references/output-templates.md` for format.

### Phase 6: Report back to the zone brief

You read the source to write this article, which is the cheapest moment there will ever be to test what the zone brief claims. Invoke the `context-mill` skill and follow **Mode 4 — Autolog**; it holds the full rule, so don't reimplement it here.

The short version: treat the brief as a hypothesis and the code as the check, then report a **diff** — what you learned that the brief doesn't say, **what the brief says that turned out wrong** (lead with this), and what you couldn't verify. Edit the brief only where you have command output that settles it, and date the edit. Never run `mill:reviewed` — that is the owner's act, not a side effect of writing an article.

Skip this phase only if you wrote from the user's prose alone and never opened an SDK repo, a backend module or a spec. If you read source, you owe the diff.

## Review Pass Order

Work outside-in: decide what stays before polishing it, and fix what's *wrong* before what's *unpolished*. Editing a sentence you're about to delete is waste; editing a sentence whose claim is false is worse than waste.

**Pass 0 — the linter.** `node scripts/lint-prose.mjs --full <file>`. Free and mechanical: banned words, overclaim candidates, vague verbs, spatial metaphors, roadmap leaks. Runs automatically on every MDX edit via the `PostToolUse` hook, so in review mode you're re-running it deliberately over the whole file. Every hit is a candidate, not a verdict.

**Pass 1 — what stays.** The heading↔content contract (Area 12). Read each heading, then ask of every paragraph under it whether it advances that promise. This decides scope, so it comes before any line editing.

**Pass 2 — correctness.** Wrong documentation, in the order the defects actually occur:
- Referents (Area 4) — the highest-frequency defect by a wide margin
- Verbs (Area 5) — what, and where to
- Claims (Area 13) — absolutes, cardinality, whose data, staleness
- Terminology and UI labels (Area 11) — names verified against the source

**Pass 3 — shape.** Structure (Areas 6, 8), framing and order (Area 12), instruction pattern (Area 7). Regroup before polishing: sentences you're about to move don't need their commas fixed yet.

**Pass 4 — polish.** Sentence length as a range (Area 2), register and literary patterns (Areas 1, 3), conciseness (Area 10).

**Pass 5 — connections.** Links and images (Area 9), redundancy and consolidation (Area 10).

**Pass 6 — re-read.** Every unit you edited, whole, from the start. See After Any Edit. This is not optional and it is not covered by any of the passes above — it's what stops each fix from introducing the next defect.

## Key Review Areas

### 1. Literary and Narrative Patterns (CRITICAL)

Check for: literary devices, dramatic descriptors ("powerful", "revolutionary"), narrative structures ("embark on a journey"), subjective language, evaluative adjectives ("seamless", "intuitive"), rhetorical questions.

**Rhetorical scaffolding**: delete any sentence that tells the reader how to read the next one — "One condition causes every case:", "Two consequences follow:", "Here's the thing:". State the thing instead.

**Openers**: don't open an article or section with a hypothetical ("Say a user…") — state what the section covers. A hypothetical mid-section that illustrates a mechanism is fine.

See `references/simplified-technical-english.md` → Literary and Narrative Patterns

### 2. Simplified Technical English (CRITICAL)

Check for: sentences over 20 words (procedures) / 25 words (descriptions), vague qualifiers, ambiguous terms, filler words, business jargon, blog-style tone.

**Sentence length is a range, not a ceiling.** Over-splitting is also a defect — five or more consecutive sentences under eight words read as a telegram. If a passage has been chopped into one-clause sentences, merge some back. Enforcing the ceiling alone produces this failure.

See `references/simplified-technical-english.md` → Sentence Structure + Word Choice

### 3. Value-Oriented Language

**Acceptable** (max one per paragraph): "explore", "streamline", "enhance", "enable", "optimize"
**Never acceptable**: "supercharge", "revolutionize", "seamless", "effortless", "magical", "best", "ultimate"

Only flag 2+ per paragraph or overblown terms — don't remove all value language.

See `references/simplified-technical-english.md` → Value-Oriented Language

### 4. Precision and Clarity

**Unresolvable references** — the highest-frequency defect. Six tests:

- Pronouns (`this`, `that`, `it`, `them`, `there`): can you swap in a noun from the previous sentence? If the nearest candidate is the wrong one, it's broken.
- `the X` on first mention: has X been introduced?
- Counts and set members: "one of the two" — which one? A bare number needs a referent the reader can enumerate: "Adapty reports one revenue figure; PostHog stores three" — one and three of *what*?
- Temporal words (`already`, `afterwards`, `later`, `still`): anchored to what moment?
- `this setting` / `that option`: is it named, and is it actually of that type?
- Compressed noun phrases: "a saved integration doesn't prove the path is open" makes the reader decode it into "the fact that the save succeeded". Name the event the reader performed.

**Pronoun at the start of a callout**: the visual break makes the antecedent unresolvable. Always use the explicit noun.

**Name the subject even when the pronoun resolves.** Where the antecedent is a named call, field, or setting, use the name. ❌ "Your app calls **it** too late" → ✅ "**The `setIntegrationIdentifier` call** happens too late."

Name it at every section entry, in every heading, and anywhere the nearest candidate is the wrong one. Within a paragraph, once you have named it and it is the only candidate, a pronoun is fine — repeating a long identifier in consecutive sentences trades one defect for wordiness (Area 10).

**Scope every plural and unit.** ❌ "**Events** sent before the call" → ✅ "**Subscription events** that occur before the call". An unqualified plural invites the reader to include their own. Same for units — *install*, not app, device, or user.

**Abstract entities have no body and no location.** A flow, paywall, screen, placement, variable, or style is a record. It has no sides, no inside, no surface, and it takes no human action. Only its representation does — a **row**, **card**, **panel**, **column**, **dropdown**, **entry**.

- *Verbs*: ❌ "the setting lives in the Design panel", "every call finds a person", "the page manages your settings" → name what Adapty does or what the reader sees. ✅ "The page lets you manage your settings."
- *Prepositions of place*: for every `next to`, `beside`, `inside`, `at the end of`, name what it modifies. If that's an abstract entity, substitute the representation. ❌ "open the context menu next to the flow" → ✅ "in the flow's row".
- *Possessives*: the possessive must be true of the representation. ✅ "the flow's row". ❌ "the flow's context menu" — the row displays the menu. ❌ "users whose app version includes the font" — the app is yours; the user installed a build of it.
- *Reverse error*: a label is not the control. ❌ "Open **All placements**" → ✅ "Open the **All placements** filter above the list."
- *Don't stack two locatives in one instruction.* ❌ "In the Flows list, open the context menu in the flow's row" → ✅ "In the **Flows** list, find the flow. In its row, open the context menu." One location per sentence, each still leading with its location (Area 7).

Also check for:
- **Abstract nouns**: flag `figure`, `item`, `thing` — replace each with the concrete noun. Words like `value`, `data`, and `entity` are fine when bound to a named field or domain ("the value of `expires_at`", "revenue data") and vague when not ("we send the value"). The test is whether the noun is attached to something named, not the word itself.
- Multiple possible interpretations; missing cause-and-effect context
- **Inaccurate metaphors**: a metaphor that contradicts the described behavior. ❌ "Works like a checklist" when evaluation stops at the first match (if/else-if/else) → remove or replace with an accurate analogy
- **Self-contradicting callouts**: e.g., saying an action "overrides" a setting and then saying they're "interchangeable" in the same callout — both can't be true. Flag and rewrite to resolve

### 5. Verbs

Do NOT automatically flag passive voice. Only rewrite when active is clearly better.
- ✅ Keep: "Data is encrypted during transmission" (focus on object, actor irrelevant)
- ✅ Rewrite: "The button should be clicked" → "Click the button"

**Every technical verb needs an object and a destination.** Two tests:

- **Missing object or destination.** For verbs of movement or change (`writes`, `sends`, `puts`, `skips`, `charges`, `separates`, `passes`), ask "what, and where to?" If the sentence can't answer, it's incomplete. ❌ "Adapty skips any event" → ✅ "Adapty doesn't send the event, and the Event Feed flags it as expired."
- **Vague operation.** These pass the first test and still say nothing, because each is compatible with several mechanisms: `records`, `handles`, `processes`, `manages`, `tracks`, `captures`, `stores`, `logs`, `registers`, `reflects`. For each, ask whether the reader can name the operation, the medium, and the destination from the verb alone.
- **A field name needs a home.** ❌ "the ID Adapty puts in `distinct_id`" → ✅ "the ID Adapty sends as the `distinct_id` on each event."

If supplying the object and destination pushes the sentence past Area 2's length ceiling, **split the sentence — don't drop the destination.** Precision sets the content; length governs how you package it. The same applies to scoping a plural or a unit (Area 4).

**Prefer the plainest verb that stays true.** ❌ "Adapty **groups by** your app's reporting timezone" → ✅ "Adapty **uses** your app's reporting timezone."

**Prefer the reader as the subject where the reader acts.** ❌ "The clipboard keeps the screen between flows" → ✅ "You can copy a screen from one flow to another, or between browser tabs." Where the mechanism acts and the reader doesn't, the mechanism stays the subject — "Adapty sends the event to PostHog" is correct.

**State conditions as something the reader has, not something the system detects.** ❌ "This filter appears only when at least one placement uses a flow" → ✅ "…only when **you have at least one flow assigned to a placement**."

**Put `only` next to what it limits.** ❌ "reach Adapty Analytics **only**" → ✅ "**only** reach Adapty Analytics."

See `references/simplified-technical-english.md` → Voice Guidelines + Verb Tenses

### 6. Headings and Lists

Check for: non-parallel heading structure at same level, inconsistent list punctuation, inline lists where bullet lists would be clearer.

**Bold-label list items — one correct format only:** `- **Label**: Capitalized explanation.`

All of these are wrong and must be fixed:
- `**Label** - description` → hyphen dash
- `**Label** — description` → em-dash
- `**Label.** Description` → period inside bold, sentence follows
- `**Label**: lowercase` → lowercase after colon

Every list where items have bold labels must follow this format: feature lists, action descriptions, best practices, option lists, settings.

**A label must be true of what it labels, and must add something.**

*Accuracy:*
- If a sentence announces a speech act — a question, warning, summary, choice — it must perform it. ❌ "Raises a question:" followed by a statement of consequence. Either ask the question, or drop the label and state the thing.
- A column header names what's in the cells, not the modifier distinguishing them. ❌ `In USD` / `In the buyer's currency` → ✅ `Event property (In USD)` / `Event property (In the buyer's currency)`. ❌ "Effect" above dropdown-option descriptions.
- Headings are labels too — see Area 12's heading↔content contract.

*Information:*
- The explanation must add what the label can't say on its own. ❌ "**Products**: The products assigned to each screen." → ✅ "**Assigned products**: The connections between your product cards and your store products." Name both ends of the relationship. Repeating the label's noun is fine — "**Placement**: A placement is a spot in your app…" is normal definitional writing.
- No circular definitions. ❌ "**Archived**: Archived and no longer editable." Define the state, don't restate the label.

**Exception — UI/product names**: If a heading uses the exact name of a product feature or UI element, do not flag it for breaking parallelism. Feature names take precedence over grammatical consistency. Example: `## Sharing paid access between user accounts` is the name of the feature in the UI — do not rewrite it to fix parallel structure.

See `references/article-structure.md` → Parallel Heading Structure + List Formatting

### 7. Instruction Pattern (Location → Action)

Instructions must follow: Goal → Location → Action

✅ "To create a paywall, in the Paywalls section, click **Create paywall**"
❌ "Click **Create paywall** to create a paywall in the Paywalls section"

**Don't document self-evident mechanics.** Would a competent user need telling? "Enter part of a name in **Search by flow name**", "Open the filter and select what you want", "Click **Save** to save" — zero information. Delete the sentence, not the section.

Every such bullet has exactly one fact worth keeping: the scope, limit, or side effect the control doesn't advertise.
- Search → *matches the flow name only, not placements or screen content*
- Filter → *the label is **All states**, not Status*

Often, naming the control is the entire deliverable: `- **All states**: Filters by status.`

This rule and the instruction pattern run in order, not in competition: **this one decides whether the step exists; Goal → Location → Action shapes the ones that survive.** A step that earns its place still names its location.

**Do not over-granularize**: A short inline instruction (2–3 steps expressible in one clear sentence) should stay inline. Breaking it into a numbered list introduces unnecessary friction. Use numbered steps only when: (a) the sequence has 4+ distinct actions, (b) each step requires separate verification, or (c) the sentence becomes unreadably long. Conciseness takes priority — do not flag a clear one-sentence instruction as a problem.

See `references/simplified-technical-english.md` → Instruction Pattern

### 8. Article Structure

Check for: missing intro before first heading, H4 overuse, non-parallel headings at same level, text blocks over 300 words without structure, consecutive callouts, callouts that interrupt flow.

- **Title/description scope mismatch**: the frontmatter `title` or `description` claims coverage the article doesn't provide. ❌ `description: "Show or hide elements and screens"` when only elements are covered → fix to match actual scope
- **Product/feature name capitalization**: "Flow Builder" not "Flow builder". Check that multi-word product names are consistently capitalized as proper nouns throughout
- **Split anything that outgrows its container**: a callout over ~3 sentences, or a troubleshooting entry that has grown subsections, gets promoted to its own section. Leave a pointer behind where it was.
- **Parallel paragraphs are a list**: three or more consecutive paragraphs with the same shape (bold lead + explanation) → convert to a bullet list.
- **Tables carry data; prose carries reasoning**: if a sentence describes a pattern that holds across items (a `_local` / `_usd` naming convention, say), that pattern is a table column, not a sentence. First confirm the set belongs in the article at all — see Area 13, don't enumerate what lives in code.
- **Group items that share a claim under that claim**: five flat bullets, three of them about missing data → one parent bullet stating the claim, with those three as sub-bullets. A flat list hides the pattern.
- **Speculative `keywords`**: `keywords` feeds doc search — do not add or expand it unless the user explicitly asks. Flag frontmatter where keywords were added during writing/editing without a request; propose removing them. If keywords are requested, keep the list to a few specific terms.

See `references/article-structure.md`

### 9. Links and Images

Run the link checker in diff mode to validate links automatically:

```bash
npm run check-links-diff
```

This checks outgoing links from changed files AND incoming links to changed files (catches breakage from renamed files or removed headings). Reports are written to `_temp/link-report.md` and `_temp/link-report.html`.

After the script finishes, read `_temp/link-report.md` and include a summary in your review output. Report only **broken links** (errors) and **stale links** (warnings) — skip the "manual check" category. If issues were found, tell the user they can open the full HTML report:

```
open _temp/link-report.html
```

**Link text must be self-describing out of context** — readers scan links.
- Name the destination, not a bare pointer: ❌ "learn more [here](url)", ❌ "[click here](url)".
- Make it precise: ❌ "Fix the [three causes](#…)" → ✅ "Fix the [three divergence causes](#…)".
- Let the link text carry the classification instead of appending a pointer: ❌ "**has no toggle** — see [Limitations](#…)" → ✅ "is a [**permanent limitation**](#…)".
- On a legacy full-article review this can produce many hits — group them as one finding rather than listing each.

Additionally check images manually: image files exist, `@assets/` not `@asset/`, descriptive alt text.

**Alt text checks:**
- Missing alt entirely: `<ZoomImage id="x.webp" width="500px" />` — flag, always required
- Generic alt text copied from a nearby image: e.g., two consecutive images both with `alt="Static navigation"` — the second was copy-pasted and describes the wrong image. Each alt must describe its specific screenshot

**Screenshot placeholders**: In UI workflow articles, every distinct UI state — screen selection, dialog, results view, confirmation — should have a `:::note` placeholder callout. Check that sections describing a UI step are not missing one. See Screenshot Placeholders section below.

See `references/astro-patterns.md`

### 10. Conciseness

Check for: redundant phrases ("in order to" → "to"), wordy constructions ("make use of" → "use", "is able to" → "can"), repeated information.

- **Filler adverbs**: "Simply" (implies the task is trivial), "Instantly" (adds no information). Remove both — they're invisible to the reader when accurate and condescending when not.
- **Redundant section preambles**: a sentence that just restates the section heading. ❌ `## Add lists` followed by "You can add lists to screens:" → remove the sentence, go straight to steps.

**Cut the restated condition.** After stating a rule, does the next clause spell out a case the rule already covers? Delete it. ❌ "A copy is always a **Draft** until you publish it, even when you copied a published flow." → ✅ "A copy is always a **Draft** until published." *Always* already covers the published-source case.

**Banned words.** Substitutions, not just prohibitions:
- **"check"** as a verb — not ESL-safe, and our docs auto-translate: it means verify, inspect, *and* tick. Use **select** for checkboxes, **review** or **verify** for inspection.
- **"the X you want"** — filler and presumptuous. "Select one or more statuses" is shorter and documents multi-select besides.
- **"for now" / "not yet" / "coming soon"** — leaks roadmap and half-promises a change. State the present truth: "You can't restore an archived flow."
- **Nouned verbs as subjects** — "A publish is in progress" → "Adapty is publishing the flow." Same for "a copy", "a paste".

Enforcement: `for now`, `not yet`, `coming soon`, `is in progress` are flagged anywhere. `check` and `you want` are flagged only in added or changed lines — 900+ existing instances make a full-article sweep its own project, not a review finding.

**Single source of truth within an article.** After adding a section, grep the article for its key nouns. If another section explains the same mechanism, one of them becomes a link. (Cross-*article* duplication is handled in Writing Phase 2 via the zone brief.)

This targets duplicated **explanations and procedures**, not repeated **identification**. Naming which tool owns a method, term, or setting — "PostHog's `identify()`", "the Adapty **profile**" — is required in every section that uses it (Area 12, sections are entry points) and is never the duplicate to delete. Explaining the same mechanism three times is duplication; tagging the same owner three times is not.

**Deduplicate by ownership, not by trimming.** Diff the two passages, move only what's unique to the owner, delete the duplicate, leave a link. Ownership convention:
- Prevention lives in setup.
- Diagnosis lives in troubleshooting.
- They link to each other, in both directions.

If the same explanation appears three times in one passage (an intro plus two table rows), state it once.

**Consolidate restrictions of the same kind.** If you state that something can't be done, grep the article for the other things that also can't be done to it. Scattered between a callout and body prose, restrictions read as unrelated facts — "an archived flow can't be restored" in a warning, "can't be edited or copied" three paragraphs down, leaves the reader asking "copy too?"

The gain is usually a deletion: merging scattered constraints tends to expose that one of the fragments was saying nothing new.

Don't remove value-oriented language — only flag true redundancy.

See `references/simplified-technical-english.md` → Filler Words + Advanced STE Practices

### 11. Terminology and UI labels

**Names come from the source, not from memory.**
- UI labels: grep the frontend for the exact string before you bold it. Quote typos as-is — the reader has to find it on screen.
- Vendor terms: use the vendor's own noun (PostHog says *insight*, not *query*). Check their glossary.
- Never a competitor's vocabulary: `entitlements` is RevenueCat's word — Adapty says **access levels**.
- Reader-visible names, not internal ones: a webhook field may be `event_datetime` internally while the payload the reader inspects says `timestamp`. Document what they see.

**Before committing to a term, grep three scopes:**
- *This article* — does the noun already name something else here? ("the events list" one sentence after the Event Feed)
- *The doc set* — `rg "<term>" src/content/docs`. "The Adapty app" already means Adapty's own mobile app, so using it for the dashboard entity creates two ambiguities instead of one.
- *The other system* — when two systems share a name, mark whose it is: **PostHog's `identify()`**, the Adapty **profile** vs PostHog's **person**.

**A UI reference needs more than the right label.** Before documenting a control, verify against `adapty-dashboard-interface` (and `adapty-dashboard-api` for integration form fields):
- **Does it have a noun?** See Area 4's reverse-error rule — a label is not the control.
- **Does it always render?** Grep for an early `return null`. A filter behind `if (!atLeastOneExist) return null` is invisible until the condition holds, and may be absent from the screenshot you're documenting from.
- **Does the term exist in our docs?** `rg "<term>" src/content/docs`. Zero hits outside your own line means you invented it, or you're leaning on an undocumented control.

**One term, one meaning per article.** The same element must not be "Design tab" in one section and "Design panel" in another.

**Disambiguate by emphasis, not negation.** ❌ "PostHog's `identify()` — **not** `Adapty.identify()`" → ✅ "**PostHog's `identify()`**". Naming the wrong option plants it.

**Fold the vendor into the term, and gloss it by what it means for the reader** — not by what the system does internally. ✅ "**identified PostHog events** — meaning they are associated with a specific person".

**Mark borrowed jargon on every use**, not just the first: italics plus attribution — "an *identified event* **in PostHog terminology**".

**Classify every quoted string** — error, warning, field, label — so the reader knows what kind of thing to look for. ✅ "look for the `Refused to merge an already identified user` **error**".

**When no term is safe, describe the behavior instead of naming the container.** ✅ "all flows in one app share the same products and fonts" — *flows in one app* pins the word to the dashboard entity, because flows exist nowhere else.

### 12. Framing and order

**Prescribe, don't describe.** Every paragraph should tell the reader something to do, decide, or check. ❌ listing three IDs a user might end up with → ✅ state the mechanism, then the instruction.

**Every claim needs a stated value.** "Repeat calls are cheap" — cheap buys the reader what? Name it, or cut the claim.

**State the purpose, not the penalty.** For every step, ask what it accomplishes. If the sentence says what breaks when the reader skips it, rewrite toward the goal — and put the goal first (Area 7).
- ❌ "Add the copy to a placement. Until you do, your app never shows it." (penalty)
- ❌ "Add the copy to a placement to show it to users." (purpose, but goal last)
- ✅ "To show the copy to users, add it to a placement."

This governs *steps* — for a warning about something that genuinely goes wrong, state the consequence instead.

**No directive-shaped tautologies.** ❌ "Mismatched IDs **are what to avoid**" → ✅ "Mismatched IDs **cause data fragmentation**." State what goes wrong and how bad it is. This governs *warnings*; a step states its purpose instead — see purpose-not-penalty above.

**Say what's wrong with the end state, not its shape.** ❌ "one person **becomes two**" → ✅ "one person **splits into two unconnected entities**".

**Comparisons must be symmetrical.** Fully specify both sides; don't leave one as "another". ❌ "…with **one** ID while Adapty sends **another**" → ✅ "**The ID you send** to PostHog with `identify()` **is different from the ID Adapty sends** as the `distinct_id` on each event."

**Can the reader act on this detail?** Cut internal names, endpoints, and enumerated variants they can't use. ❌ "A successful save proves only that **`/decide`** works" → ✅ "Adapty uses **a different endpoint** to check your key" — same warning, without inviting them to go configure `/decide`. Likewise drop variants of one cause: "if you **rotate or delete** the key after you save" → "if you **delete the integration key**".

**Don't assume the reader built the thing.** For each instruction, ask whether it assumes the reader administers the system it touches. ❌ "add a reverse-proxy rule for `/capture`" → ✅ "make sure the server accepts POST requests at `/capture`" — which works whether they change it themselves or ask whoever does.

**Don't assume internal knowledge.** For each internal term, ask whether someone who only *uses* the product would know it. Applies to dev-facing writeups too — assuming familiarity with one corner of the codebase is the same defect.

**The heading↔content contract — run this first.** It decides what stays, before any line editing. Read each heading, then ask of every paragraph under it: does this advance that promise? If not, the content moves or the heading changes. Renaming a heading without re-reading its body is the usual cause. Acceptance test for any paragraph: (1) can the reader follow it, (2) does it serve the heading?

**Order within a passage:**
- Importance before derivation — lead with the more serious of two problems.
- Consequence before mechanism — the damage is the point; how it arose is background.
- Reason before mitigation in limitations — what's restricted and why it hurts, then the workaround.
- Symptom before mechanism in troubleshooting — headings and opening sentences name what the reader observes, not the cause. ❌ "Exclude historical events is on by default" → ✅ "PostHog is missing historical events."
- Good news is not a footnote. If a passage has one actionable sentence and four constraints, the actionable one leads.

**Placement across passages:**
- Recovery goes after diagnosis, not inside it: symptom → causes → repair window → how to confirm → repair → prevention.
- The payoff belongs with what produces it — close the list that earns it, not a later section.
- When you subsection a long passage, re-home its parent-level content. Splitting a section strands facts that applied to the whole under one subsection.
- Promote content that outgrows its container and put it where the decision is made, not where it grew. Leave a pointer behind.

**One concern per unit.** For every step, bullet, or beat: can you name two concerns in it? Split. A setup step carrying both a dropdown and four unrelated toggles is two steps; a date-range bullet carrying timezone is two bullets. Two contrasting limits hold apart as sub-bullets and collapse as prose. A procedure in prose becomes numbered steps — one action per step, conditions as sub-points.

**Sections are entry points, not continuations.** Readers arrive from search, mid-article.
- Read any section cold, skipping everything above it. Does every method, label, and acronym identify its owner? "the `identify` call" — whose SDK?
- Don't use `above`, `below`, or `earlier`. Content moves; headings get anchors for free. Link instead.

**Grouping and relevance:**
- Group by the reader's category, not the writer's convenience — funnels, retention, and conversion are not revenue metrics.
- Parallel alternatives get parallel shape. Two branches of one decision written as unlike paragraphs don't read as a choice.
- Illustrations must be plausible — would a real user hit this case?

**Never hand the reader a contradiction to resolve.** For any sentence with `but`, `still`, `anyway`, `even though`, `despite` — is the reason stated *before* the surprising claim? If the pivot word arrives first, the reader holds two incompatible facts with no way to reconcile them.

❌ "Adapty never attempts to deliver it — but the Event Feed marks it as a failed delivery **anyway**."
✅ "Adapty never sends it. But Adapty records an outcome for every enabled integration, and an unsupported event counts as a failure. That's the line you're seeing."

Corollary: `anyway` and `still` at the end of a clause are almost always a missing explanation. Delete the word — if the sentence stops making sense, the causal step is what's absent.

**Stating a contrast is not explaining a relationship.** For every "differs from", "separate from", "unlike", "whereas" — is the axis of difference named in the same sentence? "Two separate limits" leaves the reader to infer; "one you can turn off, one you can't" names the axis.

### 13. Claims and verification

**Absolutes need a second look.** Grep `only way`, `must`, `always`, `never`, `requires`. For each: is there a second path? "The only way" was wrong three times in one article, each time naming one route when a second documented route existed.

**Qualify absolutes that have exceptions.** "never" invites "how long never?" — if the real answer has a recoverable case, say so.

**Whose data?** When a sentence says "the data", "the history", or "the events", name the system. ❌ "each user's history starts at their first launch of an Adapty build" — that ignores the customer's own SDK events.

**Read the sentence as a literal claim.** ❌ "one user's events landed on two persons" — each event lands on exactly one. Check cardinality claims literally.

**Quantifiers must be exact.** "half the values" and "half the fields" are different claims.

**Drop low-probability disclaimers.** A caveat covering a case nobody hits costs the reader attention and buys nothing.

**Read the code, don't reason from naming.** A mechanism inferred from a field or function name is a guess. Find the actual code path.

**One source is not verification.** If two sources conflict, document neither and say they conflict. A single vendor page is not enough to call something a factual error.

**Check our own docs for contradictions before citing them.** If three articles disagree, cite the correct one and fix the others — don't silently pick one.

**Say which half you know.** Code proves the reference; it doesn't prove the outcome. "The product ID persists" is a code fact. "The product doesn't load" is a test result.

**Frequency is a signal.** If the same defect fires twice in one article, stop fixing instances and grep for the pattern.

**Before reporting a defect as live, check the right baseline.** Your working branch is not the state of the world — a fix may exist on another. One command is enough: `git log --all --oneline -S '<symbol>'`. Only at the point of reporting or filing, not for every claim you verify.

**Don't overstate applicability.** ❌ "**This affects** self-hosted deployments" → ✅ "**May affect** self-hosted deployments", absent evidence that it always does.

**Don't write what a future change silently falsifies.**
- **Don't enumerate what lives in code.** If a list mirrors a constant, enum, or config (supported event types, available fields), link to where the reader can *see* the current set — the dashboard section, the settings page, an existing table — instead of copying it. Exception: enumerate when the set is already named elsewhere in the same article, or when it's a stable external contract and the list is the point of the warning.
- **Don't state counts that edits invalidate.** "Four differences" goes stale the first time someone adds a fifth. Write "These differences" and let the list carry the count.

Same ordering as above: **this rule decides whether the set is enumerated at all; Area 8's "tables carry data" decides the shape of the sets that survive.** A table is an enumeration — reaching for one doesn't exempt it from this test.

**Don't document a bug.** When you discover behavior by testing, ask whether a reasonable person would call it correct. If not, don't write it down — describing a defect blesses it, and the text goes stale the moment it's fixed.

Write guidance that survives either resolution. ❌ three sentences explaining that archiving a live flow leaves it serving users you can no longer edit or restore → ✅ "Don't archive a live flow. Remove it from every placement that uses it first." If Adapty later blocks the archive, that line becomes the required step instead of a caution.

If readers will hit the defect and need to recognize it, the symptom and workaround still belong in troubleshooting — describe what they see and what to do, not the mechanism as though it were designed.

File the bug. The finding is valuable; it belongs in a ticket, not an article.

**Verification steps state the expectation, not the fact.** The reader is checking, not being told. ❌ "Your sandbox purchase **has** `environment: Sandbox`" → ✅ "The `environment` property of your purchase **should be** `Sandbox`."

## Output Format (Review Mode)

### Critical Issues
- Literary/narrative patterns, STE violations
- Broken links/missing images (diff: only added items)
- Ambiguous/imprecise instructions, incorrect instruction order
- Sentences >30 words

### Important Improvements
- Missing intro, heading hierarchy issues, long unstructured blocks, consecutive callouts
- List consistency, wordiness, ambiguous pronouns

### Suggestions
- Passive → active where it flows better
- Minor wording improvements

For each issue: quote the text (with line number) → explain why → provide specific rewrite.

See `references/output-templates.md` for annotated feedback example.

### Interactive Review Flow

After completing all checks, follow this flow:

1. **Number every finding** sequentially across all categories (Critical, Important, Suggestions). Assign a single global number to each, not per-category numbers.

2. **Present the full numbered list** as a concise "whole picture" — one line per finding, format: `**N.** [article if multiple] brief description → proposed fix`

3. **Ask before proceeding**: *"Here are all [N] findings. Would you like to go through them interactively, deciding which to accept?"* — wait for the answer.

4. **If yes — use `AskUserQuestion`**, 4 suggestions at a time:
   - Question label (header, max 12 chars): `#N Topic`
   - Question text: `#N — filename line X: [quoted text] → [proposed rewrite]`
   - Options: **Accept** (describe what changes), **Skip** (leave as-is). "Other" is always available for custom comments.
   - Handle user comments: if the user types a custom note, incorporate it before applying the fix.

5. **Apply only accepted changes** after all answers are collected. Do not edit anything until the full quiz is complete.

6. **Re-read every edited unit whole** — see After Any Edit.

## After Any Edit

**Re-read the whole unit, not the clause you changed.** After editing any sentence, read the entire bullet or paragraph from the start. Fixing a clause in isolation is how the next defect gets introduced.

This applies to one-line changes, not just large rewrites — small edits break referents just as reliably, and nobody re-reads a one-sentence change. One three-sentence bullet took seven rounds: each round fixed the flagged defect and left or created another — an unverified consequence, then internal jargon as the subject, then a dangling correlative, then a verb used as a noun, then an ambiguous term, then a broken "them", then a missing origin. Every one was already covered by an existing rule. The ruleset wasn't the problem; editing without re-reading was.

After a large rewrite, re-run the earlier passes on the rewritten text — removed metaphors reappear.

## Special Considerations

### Diff Reviews
- Get the diff from the merge base, not the branch target — `origin/main` may have advanced, which pulls in every unrelated file merged since the branch point: `git diff $(git merge-base origin/main HEAD)`
- Focus ONLY on added/modified lines
- Check links/images only if in the diff
- Structure checks limited to visible changes

### Full Article Reviews
- Validate ALL links and images
- Check intro, heading hierarchy, parallel headings, long blocks

### Hiding or Excluding Content

Verify any hide/exclude/transform mechanism against the build output before recommending it. MDX rendering nothing is not the same as the content being gone — a mechanism can hide a block from the page and still ship it to `public/*.md`, `llms.txt`, and `llms-full.txt`.

- **Never link to a `draft: true` page.** The file exists, so the link checker passes — but the route 404s for readers.
- To remove content, delete it. Git keeps the history.

### Localization
Files in `src/locales/` are automatically translated and updated by a GitHub Actions workflow on push to `main`. Do not edit them as part of normal doc work — edit only the source English file in `src/content/docs/`. The exception is targeted manual corrections explicitly requested (e.g., a native speaker flagging a translation error).

### Writing a Full Article
- Complete all 5 phases — no shortcuts
- Match tone and depth of neighboring articles
- Do not invent Adapty features — ask if unsure
- Extract facts from source material, rewrite in STE
- Always use Write tool — don't deliver as chat message
- **No keywords**: Leave `keywords` out of frontmatter unless the user explicitly asks for them. Keywords feed doc search, and speculative ones pollute results. If requested, keep the list to a few specific terms.
- **Add to sidebar**: After creating, add entry to `src/data/sidebars/`

### Writing a Section for an Existing Article
- Read full existing article first
- Match heading level, tone, and conventions already in the file
- Use Edit tool to insert at correct location
- Verify no duplication with existing content

### Applying Content Across Multiple Articles

Sweeping the same section, entry, or claim across a set of articles (integration docs, the seven SDK platforms) has its own failure modes. The `context-mill` skill's Ripple rules tell you *which* articles are in scope; these tests decide what actually lands in each.

1. **Verify the mechanism per target.** Don't infer uniformity from the first two. One sweep across 19 integration articles turned up two with restricted event sets, one that needed the text generalized, and one where it didn't apply at all.
2. **Ask what it adds against that article's baseline.** Accuracy isn't sufficiency. Where failed rows are already the normal state, one more documented cause is noise.
3. **Script the verification, don't spot-check.** Assert placement across all targets — that every insertion landed inside a `## Troubleshooting` section, for instance. Appending at end-of-file files content under whichever heading happens to be last.

### Rewriting an Existing Section
- Read and understand the section's purpose first
- **Check whether the text is already published** — `git show main:<path>`. Published wording has survived review; rewriting it reopens settled arguments and enlarges the diff for no gain. Quote it verbatim and change only what's inaccurate. Often the right change is one inserted sentence, not a replacement.
- **Correctness justifies a change; style doesn't.** On published text the Key Review Areas apply to what's *wrong*, not what's *unpolished*. Do not restructure live prose to satisfy a formatting rule — bold-label lists, parallel-paragraphs-become-a-list, sentence length, register. Those govern new text. This is the rule that gets overridden in practice: a formatting rule always has a visible fix, so it wins unless you stop it. If a published passage genuinely needs restructuring, say so separately and let the user decide — never fold it into an accuracy fix.
- **Label what you show.** When presenting a passage, say plainly whether it's the live text or your rewrite, and state how much you changed. Never display a rewrite in a way that reads as the current text.
- Preserve all factual content unless user says otherwise
- Use Edit — do not rewrite the entire file
- Show before/after comparison in summary

### Screenshot Placeholders (UI Workflow Articles)

When writing an article that describes a step-by-step UI workflow, add `:::note` callouts as screenshot placeholders at every distinct UI state — screen selections, modal dialogs, results views, confirmation states, and any step that produces a visible change.

**Format** — the callout contains only the intended filename, nothing else:

```
:::note
feature-name-screen.webp
:::
```

**Naming convention**: `[feature]-[screen].webp`, e.g., `market-intelligence-select-app.webp`.

**Where to place them**: After the prose that describes the UI state, not before it. The reader reads the description, then sees the screenshot that confirms it.

**How many**: Aim for one per distinct UI state. Err on the side of more — it's easier to remove a placeholder than to remember later what needed capturing.

After drafting, output a capture table as part of the writing summary:

| File | What to capture |
|---|---|
| `feature-name-screen.webp` | What is visible on screen at this point |

This lets the user take all screenshots in one pass and replace placeholders with `<ZoomImage>` elements.

### False Positives
Don't flag: technical terms, industry-standard terminology, code/API names, clear sentences slightly over length, passive voice when appropriate, single value word per paragraph with specific context, descriptive adjectives like "real-time", "built-in", "automatic".

Use judgment — the goal is clarity, not rigid rule-following.
