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
- Anthropomorphizing UI elements: ❌ "The page manages your settings" → ✅ "The page lets you manage your settings"
- Multiple possible interpretations; missing cause-and-effect context

### 5. Voice and Verb Forms

Do NOT automatically flag passive voice. Only rewrite when active is clearly better.
- ✅ Keep: "Data is encrypted during transmission" (focus on object, actor irrelevant)
- ✅ Rewrite: "The button should be clicked" → "Click the button"

See `references/simplified-technical-english.md` → Voice Guidelines + Verb Tenses

### 6. Headings and Lists

Check for: non-parallel heading structure at same level, inconsistent list punctuation, dashes instead of colons after bold labels (`**Label**:` not `**Label** -`), inline lists where bullet lists would be clearer.

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

See `references/astro-patterns.md`

### 10. Conciseness

Check for: redundant phrases ("in order to" → "to"), wordy constructions ("make use of" → "use", "is able to" → "can"), repeated information.

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

### False Positives
Don't flag: technical terms, industry-standard terminology, code/API names, clear sentences slightly over length, passive voice when appropriate, single value word per paragraph with specific context, descriptive adjectives like "real-time", "built-in", "automatic".

Use judgment — the goal is clarity, not rigid rule-following.
