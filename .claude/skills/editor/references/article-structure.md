# Article Structure Guide

Reference for article structure — introductions, headings, lists, callouts, and doc-type conventions.

## Introduction Paragraphs

Every article must start with an introduction before the first heading that provides:
1. **What it is**: Brief explanation of the feature/concept
2. **Why it matters**: Value or benefit to the reader
3. **When to use it**: Context for application

❌ No introduction:
```markdown
# Configure Placements

## Create a placement
To create a placement...
```

✅ Has introduction:
```markdown
Placements determine which paywall users see based on their location in your app. Use placements to show different paywalls on your home screen, settings page, or after specific user actions.

# Configure Placements

## Create a placement
```

## Heading Hierarchy

**H1 (#)**: Page title — one per article.

**H2 (##)**: Main sections — visible in TOC. Use for major topics users navigate to directly.

**H3 (###)**: Subsections — visible in TOC. Use for subtopics within H2 sections.

**H4 (####)**: Minor subsections — hidden from TOC. Use sparingly — only to structure content that shouldn't appear in TOC. If you have 3+ consecutive H4s, consider restructuring to H3.

**H5+**: Never use. Indicates over-nesting — restructure the content instead.

## Parallel Heading Structure

Headings at the same level must follow consistent grammatical structure — all verb phrases OR all noun phrases.

**Procedural sections — imperative verbs:**
```markdown
## Set Up SDK
## Configure Products
## Test Integration
```

**Conceptual sections — noun phrases:**
```markdown
## SDK Architecture
## Product Configuration
## Integration Testing
```

❌ Mixed patterns (avoid):
```markdown
## SDK Architecture
## Configure Products
## How Testing Works
```

## List Formatting

### Punctuation Rules

- Complete sentences in lists end with periods
- Fragments do not need periods
- Be consistent within each list

✅ Complete sentences — with periods:
```
1. Install the SDK from npm.
2. Configure your API key in the dashboard.
3. Activate the SDK in your app.
```

✅ Fragments — no periods:
```
Requirements:
- iOS 15.0+
- Xcode 13+
- Swift 5.5+
```

❌ Inconsistent:
```
1. Install the SDK from npm
2. Configure your API key.
3. Activate the SDK
```

### Bold Label Formatting

The only accepted format for a bold-label list item is:

```
- **Label**: Capitalized explanation.
```

The word immediately after the colon must be capitalized. All other separators are wrong:

❌ `**Label** - description` (hyphen dash)
❌ `**Label** — description` (em-dash)
❌ `**Label.** Description` (period inside bold, then sentence)
❌ `**Label**: lowercase explanation` (lowercase after colon)

✅ `**Label**: Capitalized explanation.`

This applies to every bullet list where items have bold labels — in feature lists, action descriptions, best practices, option lists, and settings tables.

### Bullet vs. Inline Lists

Use bullet lists for 3+ items, especially with links — more scannable.

✅ Bullet list for items with links:
```
The page has three tabs:
- [General](#general)
- [Subscription & Billing](#billing)
- [Members](#members)
```

❌ Inline for items with links:
```
The page has three tabs: [General](#general), [Subscription & Billing](#billing), and [Members](#members).
```

Inline is OK for short simple items without links: "Supports iOS, Android, and web"

## Callout Rules

- One idea per callout — don't merge unrelated points
- No consecutive callouts — separate with content (text, steps, images) or rearrange
- Place callouts where they support the reading/execution flow, not interrupt it
- Warnings go BEFORE the action they warn about

## Breaking Up Long Text Blocks

When a section exceeds 200–300 words without structure:

**Option 1: Add subheadings**
```markdown
## Configure Webhook Integration

[150 words...]

### Create Endpoint
[100 words...]

### Validate Signatures
[100 words...]
```

**Option 2: Use lists**
```markdown
## Required Configuration

Configure these settings:
- API key from Adapty Dashboard
- Webhook URL on your server
- Event types to receive
```

**Option 3: Add a callout** to highlight key information inline

**Option 4: Split sections** — if an H2 section exceeds 500 words, split into multiple H2s

## Structure Anti-Patterns

❌ Too many H4 headings:
```markdown
## Configure SDK
#### iOS Setup
#### Android Setup
#### React Native Setup
```

✅ Promote to H3:
```markdown
## Configure SDK
### iOS Setup
### Android Setup
### React Native Setup
```

❌ Over-nesting:
```markdown
## Products
### Product Types
#### Subscriptions
##### Monthly Subscriptions
```

✅ Flatter structure:
```markdown
## Products
### Subscription Products
### Trial Configuration
```

## Doc-Type Conventions

### Integration Guides
1. System requirements (platform, versions)
2. Installation (package manager steps)
3. Basic setup (minimal code)
4. Verification (how to test)
5. Next steps

### Feature Docs
1. What it does (1 sentence)
2. When to use it
3. Code example (minimal)
4. Common parameters
5. Error handling
6. Platform differences

### Troubleshooting Guides
Entry order and symptom-first headings are covered in SKILL.md → Key Review Area 12
(Framing and order). Applies to a single troubleshooting entry inside any article, not
just to whole troubleshooting guides.

### API Reference
- Present tense: "Returns" not "Will return"
- Document all parameters with types
- Example requests and responses
- List all possible error codes

### Conceptual Docs
- Define terms on first use
- Build from simple to complex
- Link to related concepts

### Agent Skill Articles
An article that documents an agent skill (growth-advisor, flow-generator, adapty-attribution, and so on) shows at least one example session with the `AgentChat` and `ChatTurn` components. A described reply tells the reader what the skill does; a shown one lets them recognize it. Model: `export-analytics-with-ai.mdx`.

```mdx
<AgentChat title="growth-advisor" caption="Example conversation with a sample app. Your numbers will differ.">
<ChatTurn role="user">Revenue dropped last month. Why?</ChatTurn>
<ChatTurn role="tool" summary="Ran 4 read-only commands">

- `adapty analytics chart --chart revenue --group-by store`

</ChatTurn>
<ChatTurn role="agent">

**The answer in one bold sentence.**

Supporting facts.

</ChatTurn>
<ChatTurn role="confirm" summary="Create a flow copy">

The question the skill asks before it writes?

1. Yes
2. No, change something first

</ChatTurn>
</AgentChat>
```

- **Roles**: `user` is what the developer types. `tool` is the commands the skill ran, one list item each, collapsed behind `summary`. `agent` is the reply, in markdown. `confirm` is a write the skill waits on: `summary` is its title, then the question and a numbered list of options.
- **No import**: both components are registered in `src/components/mdxComponents.ts`.
- **Blank lines inside multi-line turns**: without them, MDX doesn't parse the markdown in the turn.
- **No `##`/`###` headings inside a turn**: they would show up in the article's table of contents. Use a bold line, such as `**Next steps**`.
- **The reply follows the skill's own reply rules**, from the skill's `SKILL.md` in the [adapty-skills](https://github.com/adaptyteam/adapty-skills) repo: its length, its opening, its labelled lines, and its closing. A transcript the skill could never produce is a false claim about the skill.
- **Commands in a `tool` turn are real**: check each command and flag against its CLI reference article. Drop `--app` and other noise so a command fits on one or two lines.
- **Show a `confirm` turn whenever the session writes**: it shows the reader that the skill asks first.
- **Always set `caption`** to say that the conversation is an example and that the numbers are made up. Invented numbers without a caption read as a benchmark.
- **Keep a plain code block for prompts readers copy**: a transcript shows the session, but readers can't copy a prompt from it.

### Release Notes
- Group by: New features, Improvements, Bug fixes, Breaking changes
- Start with impact: "Removed support for..." not "Support removed for..."
- Link to relevant docs; specify version numbers clearly
