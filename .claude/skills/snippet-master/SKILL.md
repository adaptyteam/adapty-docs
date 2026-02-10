---
name: snippet-master
description: Creates, reviews, and fixes code snippets for technical documentation across 7 SDK platforms (iOS, Android, React Native, Flutter, Unity, Kotlin Multiplatform, Capacitor). Ensures consistency, best practices, and minimal yet contextual examples. Use when adding code snippets to docs, reviewing existing snippets, or when the user mentions SDK examples, code samples, or platform-specific implementations.
---

# Snippet Master

Creates high-quality, consistent code snippets for technical documentation by finding relevant code in SDK repositories and adapting it according to documentation guidelines and best practices.

## Core Principles

1. **Context First**: Never create a snippet without understanding the article context and purpose
2. **Minimal Yet Complete**: Show only what's necessary, but provide enough context for clarity
3. **Consistency**: Match existing snippets on the same page in style and structure
4. **Best Practices**: Apply modern, idiomatic code patterns for each platform
5. **Real SDK Code**: Base snippets on actual SDK implementation, not invented examples

## Usage Modes

This skill supports three primary workflows:

### Mode 1: Creating from Scratch
Build new snippets by examining SDK code and applying platform-specific patterns.

### Mode 2: Cross-Platform Translation
Adapt existing snippets from one platform to another. This is often faster and ensures consistency across platforms.

### Mode 3: Reviewing Existing Snippets
Evaluate existing snippets for accuracy, best practices, consistency, and completeness. See the "Reviewing Existing Snippets" section below for the detailed review process.

**When translating:**
1. Start with the source platform's snippet as a reference
2. Check the target platform's SDK to verify API differences
3. Apply target platform's syntax and patterns
4. Keep the same example scenario/text unless platform-specific
5. Verify convenience methods exist on target platform

**Example Translation Flow:**
```
React Native snippet → Check Flutter SDK → Apply Flutter patterns → Flutter snippet
```

**What to translate directly:**
- Example text and scenario ("Close paywall?", "You will lose access...")
- Parameter values ("placement_id", "YOUR_ACCESS_LEVEL")
- Logic flow (check result, dismiss if secondary action)
- Comment style and placement

**What to adapt:**
- Syntax (TypeScript → Dart, Kotlin → Swift)
- Error handling pattern (try/catch → try/on AdaptyError/catch)
- Type names (AdaptyUIDialogActionType vs string literal)
- Method calls (check for convenience methods like `.present()`)

## Workflow

### Phase 1: Gather Requirements (MANDATORY - DO NOT SKIP)

Before doing ANYTHING, you MUST collect all required information:

1. **Article Context**
    - Ask: "Which article/file should this snippet go in?"
    - Read the MDX file from `src/content/docs/[filename].mdx`
    - Understand: What section? What is being explained? What's the learning goal?

2. **Platform Information**
    - Ask: "Which platform(s)?" (iOS, Android, React Native, Flutter, Unity, Kotlin Multiplatform, Capacitor)
    - Identify the corresponding SDK repo: `AdaptySDK-[platform]` (use `KMP` for Kotlin Multiplatform, `React-Native` for RN)

3. **What to Demonstrate**
    - Ask: "What specific functionality should the snippet show?"
    - Clarify: What SDK methods/classes are involved?
    - Understand: What's the minimum viable example that makes the point?

4. **Placement in Article**
    - Ask: "Where exactly in the article should this go?" (section name or approximate location)
    - Check: Are there existing snippets in that section?

**STOP HERE if any information is missing. Do not proceed until you have all 4 pieces.**

### Phase 2: Understand Context

1. **Read the Article**
   ```bash
   view src/content/docs/[article-name].mdx
   ```
    - What's being taught in this section?
    - What knowledge does the reader already have at this point?
    - What's the next step after this snippet?

2. **Analyze Existing Snippets** (if any exist on the page)
    - Style: How verbose are they? What level of detail?
    - Structure: How are variables named? How is error handling done?
    - Comments: What style of comments (if any)?
    - **Rule: Match the existing style - consistency on the page is more important than "ideal" style**

3. **Check Platform Guidelines**
    - Read `references/platform-styles.md` for platform-specific patterns
    - Identify the idiomatic approach for this platform

### Phase 3: Find Real SDK Code

1. **Locate the SDK Repository**
    - Path: `../AdaptySDK-[platform]/` (adjust based on actual location)
    - Platforms: iOS, Android, React-Native, Flutter, Unity, KMP, Capacitor

2. **Search for Relevant Code**
   ```bash
   # Search for the method/class
   grep -r "methodName" ../AdaptySDK-[platform]/
   
   # Look at implementation
   view ../AdaptySDK-[platform]/path/to/file.swift
   ```

3. **Understand the Real API**
    - What parameters are required vs optional?
    - What does the response look like?
    - What errors can occur?
    - How is this actually used in the SDK?

### Phase 4: Create the Snippet

1. **Start Minimal**
    - Show ONLY what's necessary for the concept being taught
    - Every line must have a reason to exist

2. **Add Essential Context**
    - If showing a method call, show how parameters are constructed
    - Don't just write `Adapty.makePurchase(params)` - show where `params` comes from
    - Example:
      ```kotlin
      // BAD - no context
      Adapty.makePurchase(subscriptionUpdateParams)
      
      // GOOD - shows construction
      val subscriptionUpdateParams = AdaptySubscriptionUpdateParameters(
          oldSubVendorProductId = "old_product_id",
          replacementMode = AdaptySubscriptionUpdateReplacementMode.WITH_TIME_PRORATION
      )
      Adapty.makePurchase(subscriptionUpdateParams) { result ->
          // handle result
      }
      ```

3. **Apply Platform Idioms**
    - iOS: Use `async/await` with `do-catch`
    - Android: Use `AdaptyResult.Success/Error` pattern
    - React Native: Use `try/catch` with `async/await`
    - Flutter: Use `try/on AdaptyError/catch` pattern
    - Unity: Use callback pattern with null check
    - KMP: Use `onSuccess/onError` pattern
    - Capacitor: Use `try/catch` with `async/await`

4. **Add Appropriate Comments**
    - Use `// check the access` or `// handle the error` style
    - Keep comments brief and actionable
    - Match the comment style of existing snippets on the page

5. **Follow Best Practices**
    - Use modern language features (guard clauses, null safety, etc.)
    - Show proper error handling (always!)
    - Use descriptive variable names
    - Avoid magic strings - use meaningful placeholders like `"YOUR_ACCESS_LEVEL"`
    - Resource cleanup where relevant (dispose, close, etc.)

### Phase 4.5: Handling Multiple Approaches

When the SDK offers multiple ways to accomplish something (e.g., standalone screen vs embedded widget), follow this pattern:

1. **Document Structure**
   - Introduce all approaches at the beginning: "Adapty SDK provides two ways to X: Method A and Method B"
   - Present the simpler/more common approach first
   - Use H2 headers for each major approach
   - Use H3 headers for variations within an approach

2. **Progressive Detail**
   - Start with the minimal example (required parameters only)
   - Show variations with optional parameters in subsequent sections
   - Example structure:
     ```
     ## Present as standalone screen
     [minimal example with .present()]

     ### Dismiss the onboarding
     [show .dismiss()]

     ### Configure iOS presentation style
     [show optional iosPresentationStyle parameter]
     ```

3. **Use Tabs for Context Variants**
   - When showing the same concept in different contexts, use tabs
   - Example: Standalone vs Embedded, Kotlin vs Java
   ```markdown
   <Tabs>
   <TabItem value="standalone" label="Standalone screen" default>
   [snippet for standalone]
   </TabItem>
   <TabItem value="embedded" label="Embedded widget">
   [snippet for embedded]
   </TabItem>
   </Tabs>
   ```

4. **Code Block Language Identifiers**
   - Use the actual language: `dart`, `kotlin`, `swift`, `typescript`, `csharp`
   - Sometimes use generic identifier with specific title: `javascript showLineNumbers title="Flutter"`
   - When in doubt, check similar files in the platform directory

5. **Convenience Methods vs Direct Calls**
   - Prefer convenience methods when available: `view.present()` over `AdaptyUI().presentView(view)`
   - This is cleaner and what developers naturally expect
   - The SDK code will show both, but docs prefer the simpler API

### Phase 5: Review and Refine

1. **Self-Review Checklist**
    - [ ] Does this match existing snippets on the page in style?
    - [ ] Is every line necessary for understanding?
    - [ ] Does it show enough context (parameter construction, etc.)?
    - [ ] Is error handling present and appropriate?
    - [ ] Are best practices followed for this platform?
    - [ ] Would an experienced dev in this language approve this code?
    - [ ] Is it minimal yet complete?
    - [ ] If multiple approaches exist, are they all documented with appropriate structure?

2. **Compare to Platform Style Guide**
    - Review `references/platform-styles.md`
    - Ensure platform-specific patterns are correct

3. **Validate Against Real SDK**
    - Does this code actually work with the real SDK API?
    - Are method signatures correct?
    - Are parameter types accurate?
    - Check for convenience methods on returned objects (e.g., `.present()`, `.dismiss()`)

## Reviewing Existing Snippets

When asked to review existing snippets:

1. **Read the Article Context**
    - Understand what's being taught
    - Check if the snippet serves that purpose

2. **Check Against Criteria**
    - Consistency: Does it match other snippets on the page?
    - Completeness: Is context shown (parameter construction, etc.)?
    - Best Practices: Does it follow modern platform idioms?
    - Minimalism: Is every line necessary?
    - Accuracy: Does it match the real SDK API?

3. **Suggest Improvements**
    - Be specific about what to change and why
    - Show before/after examples
    - Explain the reasoning

## Common Mistakes to Avoid

1. **Missing Context**
    - ❌ `Adapty.makePurchase(params)`
    - ✅ Show how `params` is created

2. **Over-Commenting**
    - ❌ `// This line calls the getProfile method to retrieve the user's profile`
    - ✅ `// check the access`

3. **Inconsistency**
    - ❌ Using different error handling patterns on the same page
    - ✅ Match the established pattern

4. **No Error Handling**
    - ❌ Only showing the happy path
    - ✅ Always include error handling

5. **Outdated Patterns**
    - ❌ Using old APIs or deprecated patterns
    - ✅ Use modern, idiomatic code

6. **Too Much Code**
    - ❌ Showing entire class implementations
    - ✅ Show only the relevant method call and setup

## Platform-Specific Notes

See `references/platform-styles.md` for detailed patterns for each platform.

Quick reference:
- **iOS**: async/await with do-catch, guard clauses, optional chaining
- **Android**: AdaptyResult sealed class pattern, when expressions
- **React Native**: Promises with async/await, try/catch
- **Flutter**: try/on/catch pattern, final variables, await
- **Unity**: Callback pattern with null checks, early returns
- **KMP**: Result type with onSuccess/onError
- **Capacitor**: Promises with async/await, try/catch (similar to RN)

## Examples

For concrete examples of proper snippet style, see `references/snippet-examples.md`.