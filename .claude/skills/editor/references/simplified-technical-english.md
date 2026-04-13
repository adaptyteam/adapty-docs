# Simplified Technical English (STE) Guidelines

## Core Principles

1. **Unambiguous**: One word, one meaning. Avoid words with multiple interpretations.
2. **Precise**: Use exact, specific terms. Avoid vague language.
3. **Concise**: Short sentences. Remove unnecessary words.
4. **Clear for LLMs and humans**: Documentation must be machine-parseable and human-readable.
5. **Value-aware**: Highlight benefits without excessive marketing language.

## Sentence Structure

### Length Guidelines
- **Maximum sentence length**: 20 words for procedural steps, 25 words for descriptive text
- **One instruction per sentence**: Split complex instructions into multiple sentences
- **Compound sentences**: Use coordinating conjunctions (and, but, or) for related ideas
- **Subordinate clauses**: Keep to minimum; prefer separate sentences for clarity

### Voice Guidelines
- **Passive voice is acceptable when**:
    - The actor is unknown or unimportant: "The request is processed automatically"
    - Focus should be on the object: "Data is encrypted during transmission"
    - Active voice would be awkward or unclear
- **Use active voice when**:
    - Subject is clear and the sentence flows naturally
    - Instructions require specific actions: "Click Save" not "The Save button should be clicked"
    - Assigning responsibility: "The API returns an error" not "An error is returned"

### Verb Tenses
- **Present tense for facts**: "The system stores logs for 30 days"
- **Present tense for procedures**: "Click Configure to open settings"
- **Future for consequences**: "This will delete all data" (when emphasis needed)
- **Avoid progressive forms**: Use "The system processes requests" not "The system is processing requests"
- **Avoid perfect forms**: Use "The system deletes logs after 30 days" not "The system has deleted logs"

## Word Choice

### Literary and Narrative Patterns

These patterns are effective in many forms of writing but reduce clarity and precision in technical documentation.

#### Literary Devices
❌ "Paint a picture", "weave together", "landscape of options", "fabric of the system"
✅ Direct descriptions: "The Adapty Dashboard displays...", "Connect integrations...", "Available placements include..."

#### Dramatic Descriptors
❌ "Powerful", "revolutionary", "game-changing", "breakthrough", "stunning"
✅ Specific benefits: "Increases conversion by 30%", "Supports 1M active subscriptions"

#### Narrative Structures
❌ "Embark on a journey", "first we'll..., then we'll...", "our story begins"
✅ Direct structure: "This guide covers...", "Complete these steps: 1. ... 2. ..."

#### Subjective Language
❌ "You'll be delighted to discover", "frustrating experience", "painful process"
✅ Factual statements: "This feature provides...", "The process requires manual configuration"

#### Evaluative Adjectives
❌ "Elegant solution", "seamless integration", "intuitive interface", "robust architecture"
✅ Measurable or specific: "Single API endpoint", "Connects via webhook", "Three-step setup", "99.9% uptime"

#### Rhetorical Devices
❌ "Why struggle with complex configurations?", "What if you could...?", "Wouldn't it be great if...?"
✅ Statements: "This feature simplifies paywall configuration", "You can configure A/B tests"

### Vague Qualifiers (Always Remove)
- "pretty much", "kind of", "somewhat", "fairly", "rather", "quite"
- "very", "really", "extremely", "highly", "absolutely"
- "a lot of", "a number of", "various", "several" (without specifics)

### Ambiguous Terms (Require Context)
- **Time**: "recent", "soon", "later", "eventually" → Use "within 24 hours", "after completion"
- **Quantity**: "large", "small", "few", "many" → Use "500 MB", "3 steps", "10 items"
- **Frequency**: "often", "rarely", "sometimes" → Use "every 5 minutes", "once per session"
- **Speed**: "quickly", "slowly", "fast" → Use "5 seconds", "2 minutes", "real-time"

### Value-Oriented Language (Use Judiciously)

Some marketing-style words are acceptable when they genuinely describe value:

✅ **Acceptable (in moderation — max one per paragraph)**:
- "explore" - OK for concept sections: "Explore A/B test configuration options"
- "streamline" - OK if specific: "Streamlines paywall deployment from 10 steps to 3"
- "enhance" - OK with specifics: "Enhances analytics by tracking 50+ events"
- "enable" - Always OK: "Enables real-time subscription updates"
- "optimize" - OK with metrics: "Optimizes conversion rate by 25%"

❌ **Avoid (even for value)**:
- "supercharge", "revolutionize", "transform", "unlock", "empower"
- "effortless", "seamless", "magical", "amazing", "incredible"
- "best", "perfect", "ultimate", "maximum", "total"

**Rule of thumb**: One value-oriented word per paragraph maximum.

### Filler Words (Always Remove)
- "actually", "basically", "essentially", "simply", "just"
- "really", "truly", "certainly", "definitely"
- "in order to" → "to"
- "at this point in time" → "now"
- "due to the fact that" → "because"

### Business Jargon (Technical Alternative Required)
❌ "leverage" → ✅ "use"
❌ "utilize" → ✅ "use"
❌ "facilitate" → ✅ "enable" or "allow"
❌ "implement" → ✅ "create", "set up", "configure" (be specific)
❌ "solution" → ✅ Name the specific thing: "SDK", "API", "integration", "paywall"

## Common Issues

### ❌ Avoid
- "You can leverage this feature to enhance your workflow" (business jargon + vague)
- "This will allow you to easily configure the settings" (filler word)
- "Simply navigate to the dashboard to access the feature" (filler + obvious instruction)
- "Feel free to explore the various options available" (unnecessary permission + vague)
- "The elegant solution seamlessly integrates with your system" (flowery + vague)
- "Embark on your journey to discover powerful capabilities" (literary + dramatic)

### ✅ Correct
- "Use this feature to automate revenue tracking" (specific action + benefit)
- "Configure access levels in the Adapty Dashboard" (direct instruction)
- "Open the Adapty Dashboard to access paywall analytics" (clear action)
- "Select from these integration options: Amplitude, Firebase, Mixpanel" (specific list)
- "The Server-side API connects to your backend via webhook" (specific mechanism)
- "Configure these subscription features: trials, offers, grace periods" (clear, specific)

## Documentation-Specific Rules

### Headings
- Use action-oriented verbs for task headings: "Configure", "Install", "Deploy"
- Use noun phrases for concept headings: "Configuration options", "Installation requirements"
- Be consistent within sections
- Use sentence case

### Lists
- Start bullet points with verbs for action lists
- Use parallel structure (all items same grammatical form)
- Keep items concise (under 15 words when possible)

### Links and References
- Descriptive link text: "See Installation guide" not "click here"
- No ambiguous references: "this", "that", "it" require clear antecedents

### Numbers and Units
- Use numerals for all numbers: "3 steps" not "three steps"
- Always include units: "500 MB" not "500", "5 minutes" not "5"
- Use consistent units within a section
- Spell out "percent" or use %: "50 percent" or "50%"

### Conditional Statements
- Use "if...then" structure: "If the server fails, then the backup activates"
- Keep conditions simple and testable
- Avoid nested conditions; break into separate sentences

### Prerequisites and Requirements
- State prerequisites explicitly at the start
- Use "must", "should", "can" correctly:
    - "must" = mandatory requirement
    - "should" = strong recommendation
    - "can" = optional capability
- Avoid "need to" (ambiguous between must/should)

### Warnings and Notes
- Place warnings BEFORE the action: "Warning: This deletes all data. Click Delete to proceed."
- Use specific warning types:
    - **Warning**: Potential data loss or system impact
    - **Caution**: Possible errors or incorrect results
    - **Note**: Additional helpful information
    - **Important**: Critical information for success

### Instruction Pattern: Location → Action → Result

**Best practice**: State WHERE/WHAT before HOW

✅ **Correct pattern**: "To create a placement, in the Placements section, click **Create placement**"
- Location/Context first: "in the Placements section"
- Action second: "click **Create placement**"
- Result is implied or stated: "to create a placement"

❌ **Poor pattern**: "Click **Create placement** to create a placement in the Placements section"
- Action comes first without context
- User doesn't know where to look before reading the whole sentence

**Why this works**:
- Users scan for location keywords first
- Reduces cognitive load (find → act → verify)
- Prevents errors from clicking wrong UI elements

**More examples**:

✅ "To enable A/B test, in the Placements panel, select **Run A/B test**"
✅ "To view subscriber data, on the Profiles / CRM page, click the **Subscribers** tab"
✅ "To delete a product, in the product row, click the trash icon"

❌ "Select **Run A/B test** in the Placements panel to enable A/B test"
❌ "Click the **Subscribers** tab on the Profiles / CRM page to view subscriber data"
❌ "Click the trash icon in the product row to delete a product"

**Exception**: When location is already established in previous context, you can omit it:
```
1. Open the App Settings.
2. Click **Enable Sandbox**. (location established in step 1)
```

### UI Element References
- **Bold all UI elements**: buttons, tabs, menu items, page names
  - Buttons: **Save**, **Configure**, **Cancel**
  - Tabs: **General**, **Subscription & Billing**, **Members**
  - Pages/sections: **Dashboard**, **Analytics**, **Placements**
- Use exact text from interface
- Describe location if helpful: "Click **Save** in the top-right corner"

### Tables
- Use tables for comparisons or structured data
- Keep cells concise (under 10 words when possible)
- Include header row
- Align numbers right, text left

### Error Messages
- Quote error text exactly: "Error: Connection timeout"
- Explain the cause
- Provide specific solution steps
- Don't just say "troubleshoot" or "check settings"

## Advanced STE Practices

### Avoid These Common Technical Writing Mistakes

**1. Nominalizations (turning verbs into nouns)**
❌ "Perform the installation of..." → ✅ "Install..."
❌ "Make a modification to..." → ✅ "Modify..."
❌ "Give consideration to..." → ✅ "Consider..."

**2. Hidden Verbs**
❌ "take action" → ✅ "act"
❌ "make a decision" → ✅ "decide"
❌ "provide assistance" → ✅ "help"

**3. Weak Verbs + Adverbs**
❌ "quickly run" → ✅ "run" (or be specific: "runs in 5 seconds")
❌ "carefully configure" → ✅ "configure" (or explain what care means)
❌ "easily manage" → ✅ "manage" (or specify the ease: "3-click workflow")

**4. Redundant Pairs**
❌ "each and every" → ✅ "each"
❌ "first and foremost" → ✅ "first"
❌ "null and void" → ✅ "null"

**5. Hedging Language**
❌ "It seems that...", "It appears that...", "It might be..." → ✅ State directly
❌ "Generally speaking...", "In most cases..." → ✅ Be specific or remove
❌ "To some extent...", "In a way..." → ✅ Remove or clarify

**6. Unclear Pronouns**
❌ "The API connects to the database. It stores data."
(Does "it" refer to API or database?)
✅ "The API connects to the database. The database stores data."

**7. Double Negatives**
❌ "Not uncommon" → ✅ "common"
❌ "Cannot be not configured" → ✅ "must be configured"
❌ "Not without limitations" → ✅ "has limitations"

**8. Starting Sentences with -ing Words**
❌ "Having configured the settings, you can now deploy"
✅ "After you configure the settings, deploy the application"

❌ "Being a complex system, it requires..."
✅ "This complex system requires..."

**9. Overuse of "There is/are" or "It is"**
❌ "There are three options available" → ✅ "Three options are available" or "Select from three options"
❌ "It is important to note that..." → ✅ "Note that..." or just state the fact

**10. Multiple Concepts in One Sentence**
❌ "Configure the API key in the settings panel, which requires admin access and will enable webhook functionality"
✅ Break into steps:
1. Request admin access
2. Open the settings panel
3. Configure the API key to enable webhooks

### Detecting Complex Sentences

**Automatic flags - check EVERY sentence:**
1. Count words - flag if exceeds limit (20 for procedures, 25 for descriptions)
2. Count commas - flag if 3+ commas
3. Count conjunctions - flag if 3+ "and/but/or/because/while/although/since"
4. Check for nested structures - flag parentheses within clauses

**Complexity patterns to flag:**

**Pattern 1: Multiple dependent clauses**
❌ "When you configure the settings, which are located in the dashboard, you should make sure that all required fields are filled in before you click save."
✅ "Configure the settings in the dashboard. Fill in all required fields. Then click save."

**Pattern 2: Long chains of "of" phrases**
❌ "The configuration of the integration of the SDK with the platform requires the setup of the credentials."
✅ "To integrate the SDK with the platform, set up your credentials."

**Pattern 3: Multiple ideas in one sentence**
❌ "The A/B test feature allows you to test different paywalls with different audiences and track which one performs better while automatically allocating traffic."
✅ "The A/B test feature tests different paywalls with different audiences. It tracks performance and automatically allocates traffic."

**Pattern 4: Long introductory phrases**
❌ "In order to successfully complete the integration process and ensure everything works correctly, you must first configure your API credentials."
✅ "First, configure your API credentials to complete the integration."

**Pattern 5: Stacked modifiers**
❌ "The highly configurable advanced analytics integration feature dashboard"
✅ "The Analytics integration dashboard" (remove stacked adjectives)

### Simplification Strategies

When a sentence is too complex:

1. **Split at conjunctions**: Every "and", "but", "because" is a potential split point
2. **Extract conditions**: Move "if/when/while" clauses to separate sentences
3. **List instead of chain**: Convert "A and B and C" to bullet points
4. **Remove hedging**: Cut "in order to", "make sure that", "need to ensure"
5. **Active voice**: "You configure" not "Configuration should be done by you"
