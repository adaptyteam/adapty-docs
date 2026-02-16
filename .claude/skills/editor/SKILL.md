---
name: editor
description: Technical documentation review, proofreading, and writing for Astro-based docs-as-code projects. Use this skill when reviewing or writing MDX files in feature branches or specific documentation articles located at src/content/docs. Review triggers: review documentation, proofread changes, check diffs for technical writing quality, verify Simplified Technical English compliance, validate links and images, improve documentation language. Writing triggers: write an article, write a section, draft documentation, create a new doc page, add content to an existing article. Essential for ensuring documentation is unambiguous, precise, concise, and follows technical writing best practices.
---

# Editor - Technical Documentation Review and Writing

Review or write technical documentation as a senior technical writer would, focusing on clarity, precision, and adherence to technical writing standards.

## Mode Detection

Determine the mode based on the user's request:

**Review mode** (default): The user asks to review, proofread, check, or improve existing content.
→ Follow the Review Workflow below.

**Write mode**: The user asks to write, draft, create, or add new content (a full article, a section, a paragraph).
→ Follow the Writing Workflow below. Do NOT start writing immediately — brainstorming and planning come first.

If the mode is ambiguous, ask the user to clarify.

## Review Workflow

Follow these steps in order:

1. **Identify scope**: Determine if reviewing a diff (feature branch) or specific article(s)
2. **Check structure** (for full articles): Verify introduction, heading hierarchy, and parallel structure
3. **Load references**: Read relevant reference files based on issues found
4. **Perform checks**: Execute all validation checks systematically
5. **Report findings**: Provide clear, actionable feedback organized by priority
6. **Suggest fixes**: Offer specific rewritten text, not just descriptions of problems

## Writing Workflow

**CRITICAL**: Never start writing content immediately. Always complete the brainstorming and planning phases first, even if the user says "just write it." Good documentation requires understanding context before composing text.

### Phase 1: Understand the Task

Before anything else, clarify the scope with the user. Ask about:

1. **What to write**: Full article, new section in an existing article, or rewrite of an existing section?
2. **Topic and goal**: What is the article/section about? What should the reader be able to do after reading it?
3. **Target audience**: Developers, PMs, marketers, or mixed? Which platforms (iOS, Android, etc.)?
4. **Placement**: Where does this content go? New file or existing article? Which sidebar section?
5. **Source material**: Does the user have notes, specs, or reference material to work from?

Use the AskUserQuestion tool to gather missing information. Do not proceed to Phase 2 until the task is clear.

### Phase 2: Research Existing Patterns

Before planning content, study the codebase:

1. **Read neighboring articles** in the same sidebar section to match tone, depth, and structure
2. **Check for existing content** on this topic — avoid duplicating what already exists
3. **Identify linking opportunities** — which existing articles should link to/from the new content?
4. **Note conventions**: frontmatter format, import patterns, component usage, heading levels used by neighboring articles
5. **Load reference files** as needed:
   - `references/simplified-technical-english.md` for STE rules
   - `references/astro-patterns.md` for MDX/Astro conventions

Report your research findings to the user before proceeding.

### Phase 3: Plan the Content

Create a detailed outline and present it to the user for approval. The plan must include:

1. **Frontmatter**: Proposed `title`, `description`, and `metadataTitle`
2. **Introduction paragraph**: Draft the full intro (what, why, when) — this is not optional
3. **Heading structure**: Full list of H2/H3 headings with a 1-2 sentence description of what each section covers
4. **Key points per section**: Bullet points of the main facts, instructions, or concepts in each section
5. **Callouts and warnings**: Note where important callouts (Note, Warning, Important) are needed
6. **Links**: Which existing articles to link to and from
7. **Images**: Whether screenshots or diagrams are needed (and which ones)

**Heading structure rules** (from Key Review Areas):
- Use H2 and H3 for main structure (visible in TOC)
- H4 only for minor subsections hidden from TOC
- Parallel grammatical structure at the same level (all verb phrases OR all noun phrases)
- Task sections: imperative verbs (Configure, Install, Deploy)
- Concept sections: noun phrases (Configuration options, System requirements)

Present the plan to the user. Do NOT proceed to Phase 4 until the user approves or adjusts the plan.

### Phase 4: Write

With the approved plan, write the content following every principle in the Key Review Areas below as a composition rule:

**Sentence construction:**
- 20 words max for procedures, 25 for descriptions
- One instruction per sentence
- Present tense for facts and procedures
- Active voice unless passive is clearly better
- No literary devices, dramatic descriptors, narrative structures, or evaluative adjectives
- No vague qualifiers, filler words, or business jargon
- No blog-style tone

**Structure construction:**
- Start with a value-oriented introduction before the first heading
- Follow the approved heading hierarchy
- Use the Location → Action instruction pattern: "To [goal], in [location], click **[element]**"
- Bold labels use colons: `**Label**: Description`
- Complete sentences in lists end with periods; fragments don't
- Break up text blocks longer than 200-300 words with subheadings, lists, or callouts
- One idea per callout — don't merge unrelated points into one callout
- Avoid consecutive callouts — separate them with regular content (text, steps, images) or rearrange
- Callouts must not break the default reading/execution order — place them where they support the flow, not interrupt it

**Value and precision:**
- Max one value-oriented word per paragraph (explore, optimize, enhance, enable, streamline)
- Every pronoun ("this", "it", "that") must have a clear antecedent
- Specific over vague: exact numbers, named features, concrete examples

**Links and images:**
- Use descriptive link text: "See [Installation guide](link)" not "click here"
- Follow Astro import patterns from `references/astro-patterns.md`
- Place images in the correct asset directory

### Phase 5: Self-Review

After writing, review your own output against the Key Review Areas checklist:

1. Run through every check in areas 1-10 below
2. Fix any violations before presenting to the user
3. Verify all links point to existing pages
4. Confirm heading hierarchy is correct and parallel
5. Check sentence lengths (count words in any sentence that looks long)
6. Verify the introduction answers what, why, and when
7. For new articles: confirm the article was added to the correct sidebar file in `src/data/sidebars/`

Present the final content to the user with a brief summary of what you wrote and any decisions you made during writing.

## Key Review Areas

These principles apply to both modes:
- **Review mode**: Check existing content against each area and flag violations.
- **Write mode**: Follow each area as a composition rule when creating new content.

### 1. Literary and Narrative Patterns (HIGH PRIORITY)

Technical documentation requires different writing patterns than other forms of writing. These patterns work well in many contexts but reduce clarity in technical documentation.

**Check for:**
- **Literary devices**: "paint a picture", "weave together", "landscape of options", "fabric of the system"
- **Dramatic descriptors**: "powerful", "revolutionary", "game-changing", "breakthrough", "stunning"
- **Narrative structures**: "embark on a journey", "our story begins", "first we'll..., then we'll..."
- **Subjective language**: "you'll be delighted", "frustrating experience", "painful process"
- **Evaluative adjectives**: "elegant solution", "seamless integration", "intuitive interface"
- **Rhetorical devices**: "Why struggle with...?", "What if you could...?", "Wouldn't it be great...?"

**Priority**: CRITICAL - These patterns create ambiguity and reduce technical precision.

**Examples of fixes:**

❌ "Embark on your journey to discover the powerful capabilities that will transform your workflow"
✅ "Configure these capabilities: access levels, A/B tests, and analytics integrations"

❌ "The elegant API seamlessly weaves together multiple data sources"
✅ "The Server-side API connects to three data sources: your backend, App Store, and Google Play"

❌ "You'll be delighted to explore the intuitive interface"
✅ "The Adapty Dashboard provides access to paywall configuration and analytics"

### 2. Simplified Technical English (STE)

**Check for:**
- Sentence length: 20 words max for procedures, 25 for descriptions
- Vague qualifiers: "pretty much", "kind of", "somewhat", "fairly", "quite", "very", "really"
- Ambiguous terms without context: "soon", "often", "recent", "large", "quickly"
- Filler words: "actually", "basically", "essentially", "simply", "just"
- Business jargon: "leverage", "utilize", "facilitate", "implement" (without specificity)
- Blog-style tone: "Let's", "You'll love", "Amazing"

**Read reference file when STE issues found:**
```
view references/simplified-technical-english.md
```

**Priority**: CRITICAL - Poor STE makes documentation unusable for both humans and LLMs.

### 3. Value-Oriented Language (BALANCED APPROACH)

Documentation should highlight value without becoming marketing copy.

**Acceptable (in moderation - max one per paragraph):**
- "explore" - OK for concept sections: "Explore configuration options"
- "streamline" - OK if specific: "Streamlines deployment from 10 steps to 3"
- "enhance" - OK with specifics: "Enhances performance by caching responses"
- "enable" - Always OK: "Enables real-time updates"
- "optimize" - OK with metrics: "Optimizes memory usage by 40%"

**Never acceptable:**
- "supercharge", "revolutionize", "transform", "unlock", "empower"
- "effortless", "seamless", "magical", "amazing", "incredible"
- "best", "perfect", "ultimate", "maximum", "total"

**Rule**: Don't dry the text out completely. One value word per paragraph is fine to highlight benefits. Flag only excessive use (2+ per paragraph) or overblown terms.

**Examples:**

✅ OK: "Explore the A/B test options to optimize your paywall conversion"
❌ Too much: "Explore the powerful features to unlock seamless optimization of your revolutionary monetization workflow"

### 4. Precision and Clarity

**Check for:**
- Ambiguous pronouns: "this", "it", "that" without clear antecedents
- Multiple possible interpretations
- Missing context or assumptions
- Unclear cause-and-effect relationships
- Anthropomorphizing inanimate objects (pages, tabs, sections)

**Don't anthropomorphize entities:**
- ❌ "The page manages your settings"
- ✅ "The page lets you manage your settings"
- ❌ "The Dashboard tracks subscriptions"
- ✅ "The Dashboard displays subscription data" or "Use the Dashboard to track subscriptions"
- Pages, tabs, and UI elements can't perform actions autonomously - they enable users to perform actions

**Examples of fixes:**

❌ "This allows you to configure it easily"
✅ "The Paywall Builder lets you set product prices and trial periods"

❌ "You can use this feature to do various things"
✅ "Use environment variables to configure these settings: API keys, store credentials, webhook URLs"

### 5. Voice and Verb Forms

**Passive voice:**
- **Acceptable when**: Actor unknown, focus on object, active would be awkward
    - ✅ "Data is encrypted during transmission"
    - ✅ "Requests are processed in order"
- **Rewrite to active when**: Subject is clear and flows naturally
    - ❌ "The button should be clicked"
    - ✅ "Click the button"

**DO NOT automatically flag all passive voice.** Only suggest rewrites when active voice is clearly better.

**Verb tenses:**
- Use present tense for facts and procedures
- Avoid progressive forms: "processes" not "is processing"
- Avoid perfect forms: "deletes after 30 days" not "has deleted"

### 6. Headings and Bullet Points

**Action-oriented principle:**
- Task sections: Use verbs (Configure, Install, Deploy)
- Concept sections: Use noun phrases (Configuration options, System requirements)
- Within same section: Maintain consistency

**List punctuation:**
- Complete sentences in lists end with periods
- Sentence fragments in lists don't need periods
- Be consistent within each list
- Bold labels followed by descriptions use colons, not dashes: `**Label**: Description.` not `**Label** - Description.`

**Bullet lists vs. inline lists:**
- Use bullet lists for 3+ items with links or important names - more scannable
- ✅ "The page has three tabs:\n- [General](#general)\n- [Subscription & Billing](#billing)\n- [Members](#members)"
- ❌ "The page has three tabs: [General](#general), [Subscription & Billing](#billing), and [Members](#members)."
- Inline lists are OK for short, simple items without links (e.g., "Supports iOS, Android, and web")
- When in doubt, prefer bullet lists - they're easier to scan

**Examples:**

✅ **Complete sentences - use periods:**
```
1. Install the SDK from npm.
2. Configure your API key in the dashboard.
3. Activate the SDK in your app.
```

✅ **Sentence fragments - no periods:**
```
Requirements:
- iOS 15.0+
- Xcode 13+
- Swift 5.5+
```

✅ **Bold labels with descriptions - use colons:**
```
1. **API Key**: Generate a new key from your account settings.
2. **Service Account**: Create a service account and download the JSON file.
```

❌ **Bold labels with dashes:**
```
1. **API Key** - Generate a new key from your account settings.
2. **Service Account** - Create a service account and download the JSON file.
```

❌ **Inconsistent:**
```
1. Install the SDK from npm
2. Configure your API key.
3. Activate the SDK
```

**Check for:**
- Inconsistent patterns within sections
- Vague headings: "Overview", "Information", "Details"
- Non-parallel structure in lists
- Missing periods on complete sentences in lists
- Unnecessary periods on fragments in lists
- Dashes instead of colons after bold labels: `**Label** -` should be `**Label**:`

**Context matters**: If changing heading style impacts product understanding or section coherence, prioritize consistency over strict action-orientation.

**Examples:**

❌ Mixed styles in procedure:
```
## How to Configure
## Installation
## Deploying the App
```

✅ Consistent action verbs:
```
## Configure Settings
## Install Dependencies  
## Deploy the Application
```

### 7. Instruction Pattern (Location → Action)

**Check for proper instruction order:**

✅ **Correct**: "To create a paywall, in the Paywalls section, click **Create paywall**"
- Result/goal first: "To create a paywall"
- Location second: "in the Paywalls section"
- Action last: "click **Create paywall**"

❌ **Incorrect**: "Click **Create paywall** to create a paywall in the Paywalls section"
- Action comes first without context
- User doesn't know where to look

**Why this matters**: Users scan for location keywords first. Stating location before action reduces cognitive load and prevents errors.

**Keep location descriptions concise:**
- ✅ "Click **Account** at the top right"
- ❌ "Click the link in the user menu in the top right corner of the Adapty Dashboard"
- Use minimal words to identify the location - avoid over-describing navigation paths
- Users can see the interface; they don't need verbose directions

**More examples:**

✅ "To enable Sandbox mode, in the App Settings, select **Enable Sandbox**"
❌ "Select **Enable Sandbox** in the App Settings to enable Sandbox mode"

✅ "To view analytics, on the Overview page, click the **Analytics** tab"
❌ "Click the **Analytics** tab on the Overview page to view analytics"

**Exception**: When location is established in previous context, it can be omitted.

### 8. Article Structure

**Check overall document organization:**

#### Introduction Before First Heading
Every article must have an introductory paragraph before the first heading that:
- Explains **what** the feature/topic is
- Shows the **value** or benefit to the reader
- Sets context for why they would use this

❌ **Missing intro**:
```markdown
# Configure A/B Tests

## Create an A/B test
To create an A/B test...
```

✅ **Has value-oriented intro**:
```markdown
A/B tests help you identify the most effective paywall designs by comparing conversion rates across variations. Use A/B tests to optimize pricing, trial periods, and UI elements.

# Configure A/B Tests

## Create an A/B test
To create an A/B test...
```

#### Heading Hierarchy
- **Use H2 (##) and H3 (###) for main structure** - these appear in table of contents
- **Use H4 (####) sparingly** - only when you need to hide from TOC or for minor subsections
- **Avoid going deeper than H4** - if you need H5, restructure the section instead

**Check for overuse of H4:**
If an article has many H4 headings, consider:
- Promoting some to H3
- Restructuring into separate H2 sections
- Using bold text instead of headings for minor points

#### Parallel Heading Structure
Headings at the same level should follow consistent grammatical structure:

❌ **Inconsistent**:
```markdown
## Configure Access Levels
## How to Set Up Products
## Integration with Analytics
```

✅ **Parallel (all verb phrases)**:
```markdown
## Configure Access Levels
## Set Up Products  
## Integrate Analytics
```

✅ **Parallel (all noun phrases)**:
```markdown
## Access Level Configuration
## Product Setup
## Analytics Integration
```

#### Breaking Up Long Blocks
When text exceeds 200-300 words without breaks:

**Consider these options:**
1. **Add subheadings** to split into logical sections
2. **Use bullet points** for lists of items or steps
3. **Add callouts** (Note, Warning, Important) to highlight key information
4. **Split into multiple sections** with H2/H3 headings

❌ **Long, unstructured block**:
```markdown
To configure webhooks you need to first create a webhook endpoint on your server that can receive POST requests. The endpoint should validate the signature that Adapty sends to ensure security. After creating the endpoint you should add it to the Adapty Dashboard in the Integrations section. You can configure which events trigger the webhook. Common events include subscription purchases, cancellations, and renewals. Make sure your endpoint responds with a 200 status code within 5 seconds...
```

✅ **Well-structured with headings and lists**:
```markdown
## Configure Webhooks

Webhooks notify your server about subscription events in real-time.

### Create Webhook Endpoint

Create a webhook endpoint on your server that:
- Accepts POST requests
- Validates Adapty signatures for security
- Responds with 200 status within 5 seconds

### Add Endpoint to Adapty

To add your endpoint, in the Integrations section, click **Add webhook**.

### Select Events

Configure which events trigger the webhook:
- Subscription purchases
- Cancellations
- Renewals
```

**When to flag structure issues:**
- Article starts with heading (no intro)
- More than 3-4 consecutive H4 headings
- Inconsistent heading patterns at same level
- Text block exceeds 300 words without structure
- Deep nesting (H5 or beyond)

### 9. Links and Images

**For diff reviews:**

**Check added links:**
- Verify internal links point to existing pages
- Check relative paths are correct: `../config` not `config/`
- Validate anchor links match heading slugs (lowercase-hyphenated)
- Ensure descriptive link text: "See Installation guide" not "click here"

**Check added images:**
- Verify image exists at path specified in import
- Shared images: Should be in `src/assets/shared/`
- Article-specific: Should be in `src/assets/<article-filename>/`
- Check for path typos: `@assets/` not `@asset/`
- Verify alt text is descriptive

**Read reference file for Astro/MDX patterns:**
```
view references/astro-patterns.md
```

**For single article reviews:**
- Validate ALL links (not just newly added)
- Check ALL images resolve correctly

### 10. Conciseness

**Check for:**
- Redundant phrases: "in order to" → "to", "at this point in time" → "now"
- Unnecessary qualifiers: "very", "really", "quite" (already covered in STE)
- Wordy constructions: "make use of" → "use", "is able to" → "can"
- Repeated information
- Overly long explanations where concise statements suffice

**Balance**: Don't remove value-oriented language (see section 3). Focus on true redundancy and wordiness.

## Output Format (Review Mode)

Structure feedback by priority:

### Critical Issues
- **Literary and narrative patterns** (literary devices, dramatic language, narrative elements, evaluative adjectives)
- **STE violations** (vague, ambiguous, filler words, business jargon)
- **Broken links or missing images** (for diff reviews: only check added items)
- **Ambiguous or imprecise instructions**
- **Incorrect instruction order** (action before location)
- **Sentence complexity** (>20 words for procedures, >25 for descriptions, >30 words always

### Important Improvements
- **Article structure issues** (missing intro, parallel headings, H4 overuse, long unstructured blocks)
- Heading/list consistency issues
- Wordiness and true redundancy
- Excessive value-oriented language (2+ per paragraph)
- Clarity improvements (ambiguous pronouns)

### Suggestions
- Passive voice that would flow better as active
- Minor wording improvements
- Style enhancements

For each issue:
1. **Quote the problematic text** (with line number if available)
2. **Explain why it's problematic** (refer to STE principles or creative writing patterns)
3. **Provide specific rewritten text**, not just descriptions

**Example feedback format:**

```
Line 23: "When you configure the SDK in your application, you need to make sure that the API keys are properly set up in the Dashboard, which you can access from the main menu."

Issue: Sentence too complex - 32 words, multiple clauses, nested information
Rewrite: "Configure the SDK in your application. Set up API keys in the Dashboard. Access the Dashboard from the main menu."
(Split into 3 sentences: 7 words, 8 words, 8 words)

Line 42: "Embark on a journey to explore the powerful features that seamlessly integrate"

Issue: Literary and narrative patterns - narrative element ("embark on a journey"), dramatic descriptor ("powerful"), evaluative adjective ("seamlessly")
Rewrite: "Configure these features: access levels, product offers, and webhook integrations"

Line 58: "This allows you to manage it easily"  

Issue: Ambiguous pronouns - unclear what "this" and "it" refer to
Rewrite: "The Profiles / CRM panel lets you manage user subscriptions"

Line 73: "Data is encrypted during transmission to App Store"

Issue: None - passive voice is appropriate here (focus on the data, not the actor)

Line 89: "Click **Save** to save your paywall settings in the Paywall Builder"

Issue: Incorrect instruction order - action before location
Rewrite: "To save your paywall settings, in the Paywall Builder, click **Save**"
```

## Output Format (Write Mode)

### During Brainstorming (Phases 1-3)

Present findings and plans as structured messages to the user:

**Phase 1 output**: Questions for the user (via AskUserQuestion or direct questions)

**Phase 2 output**: Research summary:
```
## Research Findings

**Neighboring articles reviewed:**
- [article-name.mdx] — brief note on tone/structure
- [article-name.mdx] — brief note on tone/structure

**Existing content on this topic:** [what already exists, if anything]

**Conventions noted:** [frontmatter patterns, component usage, heading levels]

**Linking opportunities:** [which articles to cross-link]
```

**Phase 3 output**: Content plan for user approval:
```
## Content Plan

**File**: src/content/docs/path/filename.mdx (new file / edit to existing)

**Frontmatter:**
- title: "..."
- description: "..."
- metadataTitle: "..."

**Introduction:** [Draft the full intro paragraph here]

**Outline:**
## Heading 1
- Key point A
- Key point B

### Sub-heading 1.1
- Key point C

## Heading 2
...

**Callouts:** [where warnings/notes are needed]
**Links:** [cross-references to add]
**Images:** [screenshots or diagrams needed]
```

### After Writing (Phases 4-5)

Deliver the content using Write or Edit tools to create/update the actual MDX file. Then provide a summary:

```
## Writing Summary

**File written/updated:** src/content/docs/path/filename.mdx

**Sections written:** [list of H2 headings written]

**Self-review results:** [any issues found and fixed during Phase 5]

**Decisions made:** [any choices made during writing not covered in the plan]

**Still needed:** [images to add, links to verify, content the user needs to provide]
```

## Special Considerations

### Diff Reviews
- Focus ONLY on added/modified lines
- Check links/images ONLY if they appear in the diff
- Consider context of surrounding unchanged text for consistency
- Structure checks are limited to visible changes (can't assess full article structure from diff)

### Full Article Reviews
- Review entire article systematically
- Validate ALL links and images
- Check overall structure: introduction, heading hierarchy, parallel headings
- Flag long unstructured text blocks (>300 words)
- Check for heading level appropriateness (H2/H3 vs H4 overuse)

### Writing a Full Article
- Complete all 5 phases — no shortcuts
- Match the tone and depth of neighboring articles in the same section
- Do not invent Adapty features or product behavior — ask the user if unsure
- If the user provides source material (specs, notes, tickets), extract facts from it but rewrite in STE
- Always create the file using the Write tool so the user gets a real file, not just a message
- **Add the article to the sidebar**: After creating the MDX file, add a `{"type": "doc", "label": "Article title", "id": "filename-without-extension"}` entry to the appropriate sidebar file in `src/data/sidebars/`. Place it at the position specified in the plan (or next to related articles if no position was specified). If unsure which sidebar file or position, ask the user.

### Writing a Section for an Existing Article
- Read the full existing article first
- Match the heading level, tone, and conventions already in the file
- Use the Edit tool to insert content at the correct location
- Verify the new section doesn't duplicate information already present in the article
- Run Phase 5 self-review on the new section plus its immediate context (neighboring sections)

### Rewriting an Existing Section
- Read the existing section and understand its purpose before rewriting
- Preserve all factual content unless the user explicitly says to change it
- Maintain the same heading level and position in the article
- Use Edit to replace the section — do not rewrite the entire file
- Show a before/after comparison in the summary

### False Positives
Some apparent issues may be acceptable:
- **Technical terms** that must be used despite complexity
- **Industry-standard terminology**
- **Code examples or API names** (don't "simplify" these)
- **Already-clear sentences** that happen to be slightly longer
- **Passive voice** when actor is unimportant or focus is on the object
- **Single value word per paragraph** ("explore", "optimize") with specific context
- **Acceptable adjectives** like "real-time", "built-in", "automatic" (describing features, not hyperbole)

Use judgment: the goal is clarity and usability, not rigid rule-following.