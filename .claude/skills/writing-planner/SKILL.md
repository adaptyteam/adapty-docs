---
name: writing-planner
description: Documentation planning through deep interviewing. Use when planning documentation updates, new articles, or structural changes before writing. Accepts Jira task descriptions, feature specs, or verbal requests. Deeply interviews the user to understand scope, audience, and context, then produces a plan scaled to the actual documentation effort. Can also review the structure of existing articles. Triggers include plan documentation, plan an article, plan a doc update, outline an article, review article structure, what should we cover, plan docs for a feature, scope a doc change.
---

# Writing Planner - Documentation Planning Through Deep Interviewing

Plan documentation changes by interviewing the user as both an experienced docs writer and a product-aware stakeholder. Produce plans scaled to the actual documentation effort — not the feature effort.

## Core Principles

### Feature size ≠ Documentation size

A complex feature may need a single new paragraph. A small UI change may require restructuring an entire article. Always assess documentation scope independently from feature scope.

Before planning, determine:
- How much of the existing article is affected?
- Does the change fit naturally into the current structure, or does the structure need adjustment?
- Is this additive (new content) or transformative (restructuring)?

### Readers don't read linearly

Most readers will either:
- Read the intro and the first section, then leave
- Jump directly to the section they need via TOC or search

This fundamentally shapes how to structure documentation:
- **The intro must stand alone.** A reader who reads only the intro should understand what this article covers and whether it's relevant to them.
- **Every H2 section must be self-contained.** A reader jumping to "Configure competitors" shouldn't need to have read "Configure products" first, unless there's an explicit prerequisite stated at the top of the section.
- **Don't bury critical information.** If something applies to the entire workflow (a prerequisite, a limitation, a gotcha), put it in the intro or in a dedicated "Before you begin" section — not inside step 4 of 7.
- **Headings are the article's API.** Readers scan headings to decide what to read. Each heading must clearly signal what that section covers. Vague headings ("Additional options", "Other settings") force the reader to read the section to understand it.
- **Front-load value in each section.** The first sentence of each section should tell the reader what they'll get from reading it. Don't start with background — start with the outcome.

### Think like a product person

When analyzing a feature for documentation, think from the perspective of mobile developers, PMs, and marketers — the people who will actually read this:
- **Developer**: "What do I need to configure? What code do I write? What can go wrong?"
- **PM**: "What does this feature do for my metrics? Do I need to coordinate with the dev team?"
- **Marketer**: "How does this affect campaigns? Can I set this up without a developer?"

Use this product thinking to answer obvious product questions yourself (user goals, problems solved, primary audience) instead of asking the user. Only ask what you genuinely cannot figure out from the feature description and existing docs.

## Mode Detection

**Planning mode** (default): The user describes a feature, change, or task and needs a documentation plan.
→ Follow the Planning Workflow below.

**Structure review mode**: The user asks to review the structure of an existing article.
→ Skip to the Structure Review section below.

If the mode is ambiguous, ask the user to clarify.

## Planning Workflow

### Step 1: Accept and Parse the Input

The user may provide:
- **Jira task description** (pasted text, or task code if Atlassian MCP is available): Extract feature details, acceptance criteria, and UI changes
- **Brief verbal request**: "We're adding a country selector to autopilot"
- **Feature spec or PRD**: Extract scope, user-facing changes, and edge cases
- **A diff or PR**: Extract what code changed and infer documentation impact

The user may or may not specify which article to update. Often they won't — the skill must figure it out.

From any input, extract:
1. **What changed**: The feature, UI element, or behavior being added/modified
2. **Where it lives**: Which part of the product (Dashboard, SDK, API)
3. **Who it affects**: Which users interact with this change
4. **What's new vs changed**: Entirely new capability, or modification of existing one?

If any of these are unclear from the input, ask — don't assume.

### Step 2: Research and Analyze

Before asking the user anything, do your own homework — both documentation research and product analysis.

**Article discovery** (when the user doesn't specify which article to update):

**Start with sidebar files** (`src/data/sidebars/*.json`) to narrow your search:

Sidebar files define the docs navigation structure. Each file is a JSON array of `{type: "category", label, id, items: [...]}` with nested `{type: "doc", label, id}` entries. Use them to:

- **Filter by sidebar type**: Match the feature to the right sidebar before searching content:
  - `tutorial.json` — Dashboard features, general configuration, getting started. If the feature is Dashboard-only, search here and nowhere else.
  - `ios.json`, `android.json`, `react-native.json`, `flutter.json`, `unity.json`, `capacitor.json`, `kmp.json` — SDK platform-specific docs. For SDK features, search only the relevant platform sidebar.
  - `api.json` — Server-side API docs.
- **Use hierarchy for priority**: Articles higher in the sidebar are more general/important. Deeply nested articles are more specific/niche. When multiple articles match, prioritize those higher in the sidebar hierarchy — they're more likely to be overview/root pages that many readers land on.
- **Identify neighbors**: The sidebar shows which articles are siblings. Neighboring articles in the same category often need coordinated updates.

After narrowing via sidebar, proceed with content search:

1. **Search by feature keywords**: Grep for the feature name, UI element names, and related terms across the relevant docs
2. **Search by product area**: If the task mentions "autopilot," search for all articles containing "autopilot." If it mentions "A/B tests," find every article that covers A/B test configuration, results, or related workflows.
3. **Think about ripple effects**: A feature change may affect more than the obvious article. Ask yourself:
   - Does this feature appear in a **getting started** or **quickstart** guide?
   - Is this feature mentioned in an **overview** or **how it works** article?
   - Do any **SDK integration guides** reference this feature's configuration?
   - Is this feature part of a **step-by-step workflow** that spans multiple articles?
   - Are there **cross-references** in other articles that mention the old behavior?
4. **Rank by impact**: Not every mention needs updating. Classify each affected article:
   - **Primary**: The main article where this feature is documented in detail — gets the bulk of the update
   - **Secondary**: Articles that mention or reference this feature — may need a sentence updated, a link added, or a note adjusted
   - **No change needed**: Articles that mention the broader area but aren't affected by this specific change

**Documentation research** (for each affected article):
1. **Read the full article**: Understand the current structure, tone, depth, and heading patterns
2. **Read neighboring articles**: Understand how this article fits in its sidebar section
3. **Check for related content**: Identify cross-references and linking opportunities

**Product analysis** (figure this out yourself — don't ask the user):
1. **User goal**: From the feature description and existing docs, determine what problem this feature solves and who benefits. A country selector in competitor analysis helps users filter competitive data by market — you can infer this.
2. **Primary audience**: From the article's location (Dashboard guide? SDK guide? API reference?), determine whether the reader is a developer, PM, marketer, or mixed.
3. **User workflow**: From the existing article's step sequence, determine where this feature fits in the user's workflow. Does the user encounter this during initial setup, daily use, or occasional configuration?
4. **Feature importance**: Is this a core part of the workflow that every reader needs, or an optional setting that most users skip? This determines prominence in the structure.

**Report what you found** to the user before proceeding:
- **Articles affected** (if discovered, not specified by user):
  - Primary: [article] — needs [type of update]
  - Secondary: [article] — needs [brief description, e.g. "update cross-reference link"]
  - No change: [article] — mentions the area but isn't affected
- Current structure of the primary article (list of headings with levels)
- Tone and depth of existing content
- Where the new content would logically fit
- Any existing content that overlaps with or relates to the planned change
- The article's heading style (verb phrases, noun phrases, or mixed)
- Your product analysis: who reads this, what they're trying to do, and how the new feature fits their workflow

### Step 3: Assess Documentation Scope

Based on the feature input and existing content, determine how much documentation work is actually needed:

**Small update** (a paragraph, a bullet point, a note, a new option in an existing list):
- Feature adds a minor option to an existing workflow
- The article structure already accommodates the change
- No new sections needed — content slots into what exists
- Example: "Added a country selector dropdown to the competitor analysis step" → one paragraph describing the new selector, inserted into the existing "competitors" section

**Medium update** (a new section or significant rewrite of existing section):
- Feature adds a distinct new step or capability
- Requires a new H2/H3 section or substantial expansion of an existing one
- Example: "Added audience targeting to A/B test setup" → new H3 section under the existing "Configure A/B test" H2

**Large update** (new article or major restructuring):
- Feature introduces an entirely new concept or workflow
- Existing article can't accommodate it without losing coherence
- Example: "Launched Onboardings with builder, templates, and analytics" → new article with full structure

Tell the user your scope assessment and the reasoning behind it. If they disagree, adjust.

### Step 4: Present Your Analysis, Then Interview

Split this step in two: first present what you've figured out, then ask only what you genuinely can't determine yourself.

#### Part A: Present your product analysis

Based on Step 2, tell the user what you've concluded. Present these as statements, not questions — let the user correct you if needed:

- "The primary reader is a PM configuring autopilot in the Dashboard."
- "This feature helps users narrow competitor analysis to specific markets."
- "It fits into the existing 'Configure competitors' workflow as an optional filter, not a required step."
- "Since most readers will jump to this section via TOC, the section needs to work standalone — no dependency on reading the previous section."

This demonstrates that you understand the product and have done your homework. The user can quickly confirm or correct.

#### Part B: Ask what you can't figure out

Only ask the user about things that aren't in the feature description, aren't in the existing docs, and can't be reasonably inferred:

**Things you should almost never ask** (figure them out yourself):
- What the user's goal is — infer from the feature description
- Who the primary audience is — infer from the article's section and content
- Where in the sidebar this lives — the article already exists or the section is obvious
- Whether this is additive or replacing something — compare feature description to existing content
- What the natural order of operations is — read the existing article's flow
- Whether the feature is released or still in development — always assume you're documenting a current feature, even if the task comes from an in-progress Jira ticket. Write as if the feature exists today.

**Things worth asking (all scopes):**
- Technical specifics you can't infer: "Does the country selector support multi-select, or is it single-country only?"
- Limitations and edge cases: "Are there countries that aren't available? Is this feature available on all plans?"
- Prerequisites that aren't documented: "Does the user need to set up anything before this selector appears?"
- Contradictions you spotted: "The current docs say competitor analysis is available globally — does the country selector change this?"
- **SDK platform** (for SDK-related updates): Adapty has 7 SDK platforms (iOS, Android, React Native, Flutter, Unity, Kotlin Multiplatform, Capacitor), and updates ship one platform at a time. If the task involves SDK changes and the user doesn't specify which platform, always ask: "Which SDK platform is this update for?" Don't assume all platforms — each has its own article.

**Add for medium scope:**
- Detail level decision: "The sibling sections in this article use 2-3 sentences per configuration option. Should this match, or does this feature need a deeper walkthrough?"
- Dependencies between sections: "Does enabling this feature change the behavior described in the 'View results' section?"

**Add for large scope:**
- Structural choices you can't decide alone: "This could be a standalone article or a new section in the existing autopilot guide. The existing article is already 1500 words — adding 800 more might warrant a split. What do you think?"
- Content the user must provide: "I'll need the exact names of the UI elements and the configuration options available."

**Scale the interview:**
- Small update: 1-2 specific questions, then propose the plan immediately
- Medium update: 2-4 questions about technical details and scope
- Large update: 4-6 questions about structure decisions and content specifics

**Be opinionated.** After researching context, propose your plan and let the user react. "I'd add a paragraph to the 'Configure competitors' section describing the country selector, right after the frequency dropdown. It's a small optional setting, so it doesn't need its own H3 — just a sentence or two matching the depth of the other options in that section. Does that match the feature's importance?" This gives the user something to react to instead of building the plan from scratch.

Use AskUserQuestion for structured choices where options are clear. Use direct questions in your message for open-ended topics.

### Step 5: Produce the Plan

Generate a plan scaled to the documentation scope. Follow the output formats below.

## Plan Output Formats

### Small Update Plan

For additions that fit within the existing structure:

```
## Documentation Plan: [Brief title]

**Scope**: Small update to [article-name.mdx]
**Target section**: [Exact H2/H3 heading where the change goes]
**Position**: [After which paragraph/element within the section]

**What to add:**
[2-4 sentences describing what content to write and where it goes. Be specific: "Add a paragraph after the existing bullet list explaining the country selector. Mention that it filters competitors by market."]

**Key facts to include:**
- [Fact 1]
- [Fact 2]
- [Any callout/warning needed]

**Style notes:**
- [How this fits the existing section's tone and depth]
- [Any adjacent content that needs a minor tweak for consistency]
```

### Medium Update Plan

For new sections or significant rewrites:

```
## Documentation Plan: [Brief title]

**Scope**: Medium update to [article-name.mdx]
**Type**: [New section / Rewrite of existing section / Expansion of existing section]

**Where it fits in the article:**
[What comes before and after. Why this position makes sense.]

**Section outline:**

### [Heading — matching the article's heading style]

[1-2 sentence intro: what this section covers and why the reader needs it]

- [Key point / step 1]
- [Key point / step 2]
- [Key point / step 3]
- [Callout/warning if needed]

[If multi-step: "Here goes the step-by-step for configuring X, with a screenshot of the dialog"]

**Style notes:**
- Heading style: [verb phrase / noun phrase — matching siblings in the article]
- Depth: [matching existing sections, e.g. "Other sections in this article use 1-2 paragraphs per step"]
- [Any formatting conventions from the article]

**Consistency check:**
- [Whether sibling headings stay parallel with the new one]
- [Whether the article intro needs a mention of this new capability]
- [Whether adjacent sections need minor adjustments]
```

### Large Update Plan (New Article or Major Restructuring)

```
## Documentation Plan: [Brief title]

**Scope**: [New article / Major restructuring of article-name.mdx]
**File**: src/content/docs/[path]/[filename].mdx
**Sidebar position**: [After which article, in which section]

**Frontmatter:**
- title: "[Sentence case title]"
- description: "[What the reader will learn]"
- metadataTitle: "[Title | Section | Adapty Docs]"

**Introduction:**
[Draft the full intro paragraph. Must cover: what this is, why use it, when it applies. 2-4 sentences with product value.]

**Article outline:**

## [H2 heading]
[What this section covers. 1-2 sentences.]
[Placeholder if needed: "Here goes the step-by-step for initial setup with a screenshot of the dashboard"]

- Key point A
- Key point B

### [H3 sub-heading, if needed]
[What this covers]

## [H2 heading]
[What this section covers]
[Placeholder: "Here goes the configuration table with all available options"]

...

**Callouts and warnings:**
- [Section X]: Warning about [thing that can go wrong]
- [Section Y]: Note about [important edge case]

**Cross-references:**
- This article links to: [list]
- These articles should link to this: [list]

**Images needed:**
- [Section X]: Screenshot of [specific UI state]
- [Section Y]: Diagram of [flow/concept]

**Style decisions:**
- Heading style: [verb phrases / noun phrases — and why]
- Depth: [overview vs detailed walkthrough]
- Audience: [developer / PM / mixed]
```

### Multi-Article Update Plan

When a single feature change requires updates across multiple articles, produce one unified plan. This prevents scattered, inconsistent updates.

```
## Documentation Plan: [Brief title]

**Scope**: Multi-article update ([N] articles affected)

**Articles affected:**

### 1. [article-name.mdx] (Primary)
**Update type**: [Small / Medium / Large]
**What to change:**
[Full plan for this article using the appropriate single-article format above]

### 2. [article-name.mdx] (Secondary)
**Update type**: Small
**What to change:**
[Brief: "Update the cross-reference in the 'Related features' section to mention country filtering." or "Add 'country selector' to the feature list in the intro paragraph."]

### 3. [article-name.mdx] (Secondary)
**Update type**: Small
**What to change:**
[Brief description]

**Execution order:**
1. Update [primary article] first — this is the source of truth
2. Then update [secondary articles] to match
[Note if order matters, e.g. "Update the overview article before the SDK guides so cross-links are in place"]

**Consistency notes:**
- [Terminology to use consistently across all articles]
- [Feature name as it should appear everywhere]
```

## Structure Review

When the user asks to review an existing article's structure:

1. **Read the full article**
2. **Analyze and report:**

```
## Structure Review: [article title]

**Introduction:**
- Present: [Yes/No]
- Covers what/why/when: [assessment — what's missing if anything]

**Heading hierarchy:**
## [Heading]
### [Sub-heading]
### [Sub-heading]
## [Heading]
...
[Full list with levels, showing actual hierarchy]

**Heading style:**
- Pattern: [verb phrases / noun phrases / mixed]
- Inconsistencies: [any headings that break the pattern]

**Section balance:**
- [Sections that are disproportionately long or short vs siblings]
- [Sections that could be split or merged]

**Flow and ordering:**
- [Whether the order makes sense for the reader's workflow]
- [Sections that feel misplaced]

**Non-linear reading readiness:**
- [Can each H2 section be understood by a reader who jumped there directly?]
- [Are there implicit dependencies between sections that aren't stated?]
- [Is critical info (prerequisites, limitations) buried inside later sections?]
- [Does each section's first sentence signal what the reader will get?]

**Structural issues:**
- [H4 overuse or deep nesting]
- [Missing sections for completeness]
- [Long unstructured text blocks (>300 words without a break)]
- [Missing intro]

**Recommendations:**
1. [Most important structural change]
2. [Next priority]
...
```

## Structural Guidelines

These rules govern how plans should structure documentation. Apply them when producing plans and reviewing structure.

### Headings
- **Sentence case**: "Configure access levels" not "Configure Access Levels"
- **H2 (##) and H3 (###)** for main structure — these appear in TOC
- **H4 (####)** sparingly — only to hide minor subsections from TOC
- **Never deeper than H4** — restructure instead
- **Consistent style within an article**: If sibling headings use verb phrases ("Configure X", "Set up Y"), don't introduce a noun phrase ("Analytics integration"). Pick one pattern and maintain it.
- **Prefer action-oriented** headings for task/procedure sections: Configure, Set up, Create, Enable
- **Use noun phrases** for concept/reference sections: Configuration options, System requirements, General requirements

### Introduction
- Every article needs an intro paragraph before the first H2
- The intro covers: **what** this is, **why** the reader needs it, **when** it applies
- 2-4 sentences. Include product value without marketing copy.

### Non-linear reading
- **Self-contained sections**: Each H2 section must make sense to a reader who jumped there directly. If a section depends on context from a previous section, state the prerequisite explicitly at the top ("First, configure your products as described in [section]").
- **Front-load value**: The first sentence of each section tells the reader what they'll accomplish. Don't open with background — open with the outcome.
- **Scannable headings**: Headings are the primary navigation. Each heading must clearly signal what the section covers without reading it. "Configure competitor countries" beats "Additional options."
- **Don't bury critical info**: Warnings, prerequisites, and limitations that affect the whole article go in the intro or "Before you begin" — not hidden inside a later section.

### Section sizing
- Avoid micro-subsections: Don't create an H3 for a single paragraph
- Break up text blocks longer than 200-300 words with subheadings, lists, or callouts
- If an H2 section grows beyond 500 words, consider splitting it

### Lists and formatting
- Complete sentences in lists end with periods
- Sentence fragments in lists don't need periods
- Consistent punctuation within each list
- Bold labels use colons: `**Label**: Description` not `**Label** - Description`

### Instruction pattern
- Goal → Location → Action: "To create a paywall, in the Paywalls section, click **Create paywall**"
- Not: "Click **Create paywall** in the Paywalls section"

## Important Behaviors

### Don't over-plan small changes
If the user describes a small feature addition and you can see exactly where it fits in the existing article, don't run a full interview. Confirm your understanding, propose the small plan, and move on. Respect the user's time.

### Don't under-plan large changes
If the user says "write an article about X" and provides minimal context, interview thoroughly. A shallow plan leads to content that needs full rewriting.

### Respect existing article style
When planning updates to existing articles, the plan must match the article's current patterns. If the article uses noun phrase headings, your new section uses noun phrases too — even if you'd prefer verb phrases. Consistency within the article beats personal preference.

### Separate feature complexity from doc complexity
When a user pastes a long Jira task with extensive acceptance criteria, technical specs, and engineering details — assess what the documentation actually needs. A 500-word task description about backend changes to a country selector may translate to a single paragraph in the docs: "Select the target countries from the **Country** dropdown." Say this clearly: "This is a big feature change but a small documentation update."

### Always check for ripple effects
Even when the user specifies a single article, search for other articles that mention the same feature or concept. A change to "autopilot competitor analysis" might also need a one-line update in the autopilot overview article, or a mention in a "what's new" section. Report all affected articles — the user can decide which ones to update now and which to defer, but they should know the full picture.

### Propose, don't just ask
After researching the existing article, come with a concrete proposal. "I'd add a 2-sentence paragraph to the 'Configure competitors' section, right after the frequency dropdown, describing the country selector and its default behavior. Does that match what you had in mind?" This gives the user something to react to instead of building the plan from scratch.
