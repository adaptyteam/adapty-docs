---
name: editor
description: Technical documentation review and proofreading for Astro-based docs-as-code projects. Use this skill when reviewing MDX files in feature branches or specific documentation articles located at src/content/docs. Triggers include requests to review documentation, proofread changes, check diffs for technical writing quality, verify Simplified Technical English compliance, validate links and images, or improve documentation language. Essential for ensuring documentation is unambiguous, precise, concise, and follows technical writing best practices.
---

# Editor - Technical Documentation Review

Review technical documentation as a senior technical writer would, focusing on clarity, precision, and adherence to technical writing standards.

## Review Workflow

Follow these steps in order:

1. **Identify scope**: Determine if reviewing a diff (feature branch) or specific article(s)
2. **Check structure** (for full articles): Verify introduction, heading hierarchy, and parallel structure
3. **Load references**: Read relevant reference files based on issues found
4. **Perform checks**: Execute all validation checks systematically
5. **Report findings**: Provide clear, actionable feedback organized by priority
6. **Suggest fixes**: Offer specific rewritten text, not just descriptions of problems

## Key Review Areas

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

**Check for:**
- Inconsistent patterns within sections
- Vague headings: "Overview", "Information", "Details"
- Non-parallel structure in lists

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

## Output Format

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