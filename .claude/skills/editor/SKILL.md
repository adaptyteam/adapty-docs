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
2. **Check structure** (full articles): Introduction, heading hierarchy, parallel structure
3. **Load references**: Read relevant reference files based on issues found
4. **Perform checks**: Run through all 10 Key Review Areas
5. **Report findings**: Organized by priority — see Output Format
6. **Suggest fixes**: Provide specific rewritten text, not just descriptions

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
2. Check for existing content on this topic — avoid duplication
3. Identify linking opportunities
4. Note conventions: frontmatter format, component usage, heading levels
5. Load references as needed

Report findings to user. See `output-templates.md` for output format.

### Phase 3: Plan the Content

Create a detailed outline and present it for user approval. Include: frontmatter, full draft introduction, H2/H3 heading structure with descriptions, key points per section, callout placement, cross-links, and images needed.

**Do not proceed to Phase 4 without user approval.**

See `output-templates.md` for the plan format.

### Phase 4: Write

Apply all Key Review Areas below as composition rules. Use Write/Edit tools to create actual MDX files — don't deliver content as chat messages.

### Phase 5: Self-Review

After writing:
1. Run every check in Key Review Areas 1–10
2. Fix all violations before presenting
3. Verify all links point to existing pages
4. Check sentence lengths on any sentence that looks long
5. Verify introduction answers what, why, and when
6. For new articles: add entry to sidebar in `src/data/sidebars/`
7. **Scan every bullet list with bold labels** — confirm every item is `- **Label**: Capitalized explanation.` Fix any `—`, `-`, `.**`, or lowercase-after-colon patterns. ❌ `- **Label**: connects to...` → ✅ `- **Label**: Connects to...`
8. **For UI workflow articles**: Output a screenshot capture table after the writing summary — one row per `:::note` placeholder, with filename and what the screenshot should show. This lets the user capture everything in one pass.

Present final content with a brief writing summary. See `references/output-templates.md` for format.

## Key Review Areas

### 1. Literary and Narrative Patterns (CRITICAL)

Check for: literary devices, dramatic descriptors ("powerful", "revolutionary"), narrative structures ("embark on a journey"), subjective language, evaluative adjectives ("seamless", "intuitive"), rhetorical questions.

See `references/simplified-technical-english.md` → Literary and Narrative Patterns

### 2. Simplified Technical English (CRITICAL)

Check for: sentences over 20 words (procedures) / 25 words (descriptions), vague qualifiers, ambiguous terms, filler words, business jargon, blog-style tone.

See `references/simplified-technical-english.md` → Sentence Structure + Word Choice

### 3. Value-Oriented Language

**Acceptable** (max one per paragraph): "explore", "streamline", "enhance", "enable", "optimize"
**Never acceptable**: "supercharge", "revolutionize", "seamless", "effortless", "magical", "best", "ultimate"

Only flag 2+ per paragraph or overblown terms — don't remove all value language.

See `references/simplified-technical-english.md` → Value-Oriented Language

### 4. Precision and Clarity

Check for:
- Ambiguous pronouns: "this", "it", "that" without clear antecedents
- **Pronoun at the start of a callout**: "It should always be..." — the visual break makes the antecedent unresolvable. Replace with the explicit noun: "**Navigate to screen** should always be..."
- Anthropomorphizing UI elements: ❌ "The page manages your settings" → ✅ "The page lets you manage your settings"
- Multiple possible interpretations; missing cause-and-effect context
- **Inaccurate metaphors**: a metaphor that contradicts the described behavior. ❌ "Works like a checklist" when evaluation stops at the first match (if/else-if/else) → remove or replace with an accurate analogy
- **Self-contradicting callouts**: e.g., saying an action "overrides" a setting and then saying they're "interchangeable" in the same callout — both can't be true. Flag and rewrite to resolve
- **Inconsistent naming for the same UI element**: "Design tab" in one section and "Design panel" in another for the same control. Pick one term and apply throughout

### 5. Voice and Verb Forms

Do NOT automatically flag passive voice. Only rewrite when active is clearly better.
- ✅ Keep: "Data is encrypted during transmission" (focus on object, actor irrelevant)
- ✅ Rewrite: "The button should be clicked" → "Click the button"

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

**Exception — UI/product names**: If a heading uses the exact name of a product feature or UI element, do not flag it for breaking parallelism. Feature names take precedence over grammatical consistency. Example: `## Sharing paid access between user accounts` is the name of the feature in the UI — do not rewrite it to fix parallel structure.

See `references/article-structure.md` → Parallel Heading Structure + List Formatting

### 7. Instruction Pattern (Location → Action)

Instructions must follow: Goal → Location → Action

✅ "To create a paywall, in the Paywalls section, click **Create paywall**"
❌ "Click **Create paywall** to create a paywall in the Paywalls section"

**Do not over-granularize**: A short inline instruction (2–3 steps expressible in one clear sentence) should stay inline. Breaking it into a numbered list introduces unnecessary friction. Use numbered steps only when: (a) the sequence has 4+ distinct actions, (b) each step requires separate verification, or (c) the sentence becomes unreadably long. Conciseness takes priority — do not flag a clear one-sentence instruction as a problem.

See `references/simplified-technical-english.md` → Instruction Pattern

### 8. Article Structure

Check for: missing intro before first heading, H4 overuse, non-parallel headings at same level, text blocks over 300 words without structure, consecutive callouts, callouts that interrupt flow.

- **Title/description scope mismatch**: the frontmatter `title` or `description` claims coverage the article doesn't provide. ❌ `description: "Show or hide elements and screens"` when only elements are covered → fix to match actual scope
- **Product/feature name capitalization**: "Flow Builder" not "Flow builder". Check that multi-word product names are consistently capitalized as proper nouns throughout

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

Don't remove value-oriented language — only flag true redundancy.

See `references/simplified-technical-english.md` → Filler Words + Advanced STE Practices

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

## Special Considerations

### Diff Reviews
- Focus ONLY on added/modified lines
- Check links/images only if in the diff
- Structure checks limited to visible changes

### Full Article Reviews
- Validate ALL links and images
- Check intro, heading hierarchy, parallel headings, long blocks

### Localization
Files in `src/locales/` are automatically translated and updated by a GitHub Actions workflow on push to `main`. Do not edit them as part of normal doc work — edit only the source English file in `src/content/docs/`. The exception is targeted manual corrections explicitly requested (e.g., a native speaker flagging a translation error).

### Writing a Full Article
- Complete all 5 phases — no shortcuts
- Match tone and depth of neighboring articles
- Do not invent Adapty features — ask if unsure
- Extract facts from source material, rewrite in STE
- Always use Write tool — don't deliver as chat message
- **Add to sidebar**: After creating, add entry to `src/data/sidebars/`

### Writing a Section for an Existing Article
- Read full existing article first
- Match heading level, tone, and conventions already in the file
- Use Edit tool to insert at correct location
- Verify no duplication with existing content

### Rewriting an Existing Section
- Read and understand the section's purpose first
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
