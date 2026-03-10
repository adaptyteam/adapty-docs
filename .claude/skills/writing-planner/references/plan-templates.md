# Plan Output Templates

Use these templates in Step 5 of the Planning Workflow. Choose the template that matches the scope assessed in Step 3.

## Small Update Plan

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

## Medium Update Plan

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

## Large Update Plan (New Article or Major Restructuring)

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

## Multi-Article Update Plan

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
