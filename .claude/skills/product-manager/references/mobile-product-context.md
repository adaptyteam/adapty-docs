# Mobile Product Development Context

## Adapty Documentation Structure

**Platform-specific documentation:**
- Each SDK platform has its own sidebar/section:
    - iOS
    - Android
    - React Native
    - Flutter
    - Unity
    - Kotlin Multiplatform (KMP)
    - Capacitor
- Articles are platform-specific - an iOS doc contains only iOS content
- No mixing of multiple platforms in a single article
- Developers navigate to their platform's section and stay there

**Implications for documentation:**
- Focus on one platform per article
- Don't say "On iOS... On Android..." (that's not how Adapty docs are organized)
- Include platform-specific requirements, code, and gotchas
- Can link to equivalent docs in other platforms if helpful
- Platform choice should be obvious from navigation context

## Mobile App Lifecycle & Documentation Timing

### Pre-Launch Phase
**User needs:** Developers integrating for first time
**Documentation focus:**
- Quick start guides
- Integration tutorials
- Store setup (App Store Connect, Google Play Console)
- Testing and validation
- Release checklist

### Growth Phase
**User needs:** Optimizing conversion and revenue
**Documentation focus:**
- A/B testing setup
- Paywall optimization
- Analytics interpretation
- Segmentation strategies
- Integration with attribution

### Scale Phase
**User needs:** Advanced features, custom workflows
**Documentation focus:**
- Server-side API
- Custom analytics exports
- Webhook integrations
- Edge case handling
- Enterprise features

## Developer Mental Models

### How Developers Think
- Code-first (show me the code)
- Error-driven (what could go wrong)
- Platform-specific (iOS ≠ Android)
- Integration-focused (does this work with X?)
- Time-conscious (how long will this take?)

### What Developers Skip
- Long explanations
- Marketing language
- Conceptual overviews (initially)
- "Why" sections (until blocked)

### What Developers Need
- Working code examples
- Copy-paste snippets
- Error messages and solutions
- Version compatibility info
- Migration guides

## Product Manager Mental Models

### How PMs Think
- Goal-oriented (how does this help my KPIs?)
- User-journey focused (where in the funnel?)
- Tradeoff-aware (cost vs benefit)
- Stakeholder-conscious (who needs to know?)
- Timeline-driven (when can we ship?)

### What PMs Skip
- Technical implementation details
- Code examples
- Deep technical explanations

### What PMs Need
- Business impact
- User-facing changes
- Timeline implications
- Dependencies and blockers
- Success metrics

## Marketer Mental Models

### How Marketers Think
- Campaign-driven (how to track?)
- Segment-focused (which users?)
- Conversion-oriented (does this increase revenue?)
- Attribution-conscious (which channel?)
- Creative-first (what's the message?)

### What Marketers Skip
- Technical details
- Code
- Deep analytics math
- SDK information

### What Marketers Need
- Campaign setup steps
- Tracking and attribution
- Audience creation
- A/B test results interpretation
- Integration with ad platforms

## Mobile Subscription Fundamentals

### Subscription States
Users move through states that affect documentation needs:

**Non-subscriber:**
- Needs: Paywall presentation, trial offers, pricing info
- Docs: Integration guides, paywall setup

**Trial:**
- Needs: Trial cancellation, conversion to paid
- Docs: Trial handling, conversion optimization

**Active:**
- Needs: Feature access, billing management
- Docs: Access level checks, entitlement logic

**Grace Period:**
- Needs: Payment retry, notification
- Docs: Grace period handling, retry logic

**Churned:**
- Needs: Win-back offers, reactivation
- Docs: Churn detection, win-back campaigns

### Common Subscription Patterns

**Freemium:**
- Free app with premium features behind paywall
- Show paywall at feature gates
- Docs need: Feature gating, access level checks

**Free Trial:**
- Time-limited full access
- Paywall at app start or after exploration
- Docs need: Trial offer setup, conversion tracking

**Paywalled Content:**
- Specific content requires subscription
- Paywall when accessing premium content
- Docs need: Content gating, partial access

**Feature Upsell:**
- Basic features free, advanced features paid
- Paywall when using advanced feature
- Docs need: Tiered access, feature flags

## Mobile Development Realities

### Platform Fragmentation
- iOS versions in the wild
- Android OS versions and manufacturers
- Different SDK capabilities per platform
- Store policy differences

**Documentation impact:** Specify platform support clearly

### Testing Challenges
- Sandbox limitations
- TestFlight delays
- Google Play review times
- Production-only behaviors

**Documentation impact:** Include testing guidance and known limitations

### Release Cycles
- App Store review: 1-2 days
- Google Play review: hours to days
- Cannot hotfix client-side bugs
- Remote config is critical

**Documentation impact:** Emphasize remote config capabilities

### App Size Constraints
- Users abandon large downloads
- Every MB matters
- SDK size is scrutinized
- Asset optimization critical

**Documentation impact:** Mention SDK size when relevant

## Mobile User Behavior

### Attention Span
- Users skim, don't read
- Decisions made in seconds
- Friction = abandonment
- Clear CTAs critical

**Documentation impact:** Emphasize paywall clarity and simplicity

### Trust Issues
- Subscription fatigue
- Privacy concerns
- Unclear pricing = abandonment
- Cancellation must be easy

**Documentation impact:** Emphasize transparency in pricing display

### Platform Expectations
- iOS users expect polish
- Android users expect flexibility
- Platform conventions matter
- Breaking conventions = confusion

**Documentation impact:** Reference platform guidelines

## Documentation Anti-Patterns for Mobile

### ❌ Desktop-First Thinking
Assuming users read everything, have large screens, use mouse

### ❌ Web-First Assumptions
Mobile purchases work differently than web
Can't A/B test like web (app review required)
Analytics different (app sessions vs page views)

### ❌ Ignoring Store Constraints
App Store/Google Play have strict rules
Review process affects timelines
Store listings matter for conversion

### ❌ Over-Abstracting
Mobile devs want concrete examples
Platform-specific matters
Generic guidance less helpful

### ❌ Treating All Platforms The Same
iOS ≠ Android ≠ React Native
Each has unique constraints
Copy-paste code rarely works across platforms

## Developer Content Expectations

### What Developers Actually Look For

Developers don't just expect a certain tone - they expect specific content patterns based on years of using documentation across the industry.

#### Code Examples Are Required

**Developers expect:**
- Code in the first screenful (above the fold)
- Real, compilable code (not pseudocode)
- Platform-specific syntax
- Complete examples (with imports, error handling)
- Copy-paste ready snippets

**Not enough:**
- Long prose explanation without code
- Pseudocode or generic syntax
- Partial code that won't compile
- "See example below" that's 3 pages down

#### Error Information Is Expected

**Developers expect to see:**
- Common error messages quoted exactly
- What causes each error
- How to fix it
- How to verify the fix worked

**Example:**
```
**Common errors:**

❌ "API key is invalid"
Cause: Typo in API key or using test key in production
Fix: Copy the key again from Dashboard → App Settings
Verify: Check console for "Adapty: SDK initialized"

❌ "Network request failed"
Cause: SDK called before initialization
Fix: Move Adapty.activate() earlier in app startup
```

#### Platform Differences Must Be Explicit

**In Adapty's documentation structure:**
- Each SDK platform has its own sidebar/section
- Articles are platform-specific (iOS article = iOS only, Android article = Android only)
- No mixing of platforms in one article

**Developers expect in platform-specific docs:**
- Clear platform in title or intro if ambiguous
- Platform-specific version requirements
- Code examples in that platform's language only
- Platform-specific limitations called out
- Links to equivalent docs in other platforms if helpful

**For iOS docs:**
- Swift or Objective-C (specify which)
- iOS version requirements
- StoreKit-specific behavior
- App Store-specific notes

**For Android docs:**
- Kotlin or Java (specify which)
- Android minSdk version
- Billing Library version
- Google Play-specific notes

**For cross-platform frameworks (React Native, Flutter, Unity):**
- Framework version requirements
- Native module dependencies
- Platform-specific setup if any (iOS vs Android)
- Known platform differences in behavior

**Not acceptable in platform-specific docs:**
- "Add the SDK to your project" (which file? which tool?)
- Code examples from wrong platform
- Generic instructions without platform details

#### Troubleshooting Is Not Optional

**Every feature doc should include:**
- "Common issues" or "Troubleshooting" section
- Known limitations
- Platform-specific gotchas
- What to do when it doesn't work

**Developers immediately skip to troubleshooting when something breaks**

#### Prerequisites Go First

**Developers need to know before starting:**
- Platform/OS version requirements
- Dependencies needed
- Account setup required
- Time estimate

**Not:**
- Hidden in middle of doc
- In footnotes
- "By the way, you need..."

#### Verification Steps Are Expected

**After any setup step, developers expect:**
- How to verify it worked
- What success looks like
- Where to look (console logs, dashboard, etc.)
- What to do if verification fails

**Example:**
```
**Verify it worked:**
1. Check Xcode console for "Adapty: SDK v2.10.1 initialized"
2. Open Dashboard → Users → should see test user
3. If not showing, see Troubleshooting below
```

#### API Reference Links Are Expected

**Developers expect:**
- Links to full API reference
- Links to source code (if open source)
- Related methods/classes
- Type definitions

**Don't:**
- Explain every parameter in tutorial
- Duplicate API docs in guides
- Leave developers wondering "what else can this do?"

#### Real-World Context Expected

**Developers expect docs to acknowledge:**
- "This is tricky"
- "Watch out for..."
- "Common mistake:"
- "Known limitation:"
- "On iOS 14+, behavior changes..."

**Not:**
- Everything always works perfectly
- No gotchas mentioned
- Generic happy path only

### Document Structure Patterns

#### Integration Guide Expected Structure

1. **Requirements** (versions, dependencies)
2. **Installation** (package manager commands)
3. **Configuration** (API keys, setup)
4. **Basic example** (minimal working code)
5. **Verification** (how to test)
6. **Troubleshooting** (common issues)
7. **Next steps** (what to read next)

#### Feature Documentation Expected Structure

1. **One-line description** (what it does)
2. **When to use** (the use case)
3. **Quick example** (minimal code)
4. **Parameters explained** (only if non-obvious)
5. **Error handling** (what can go wrong)
6. **Platform notes** (if behavior differs)
7. **Related features** (see also)

#### API Reference Expected Structure

1. **Method signature** (with types)
2. **Brief description** (one sentence)
3. **Parameters** (name, type, description)
4. **Return value** (type and what it contains)
5. **Example** (actual usage)
6. **Throws** (possible errors)
7. **Platform** (if not all platforms)

#### Troubleshooting Expected Structure

1. **Symptom** (exact error or behavior)
2. **Cause** (why this happens)
3. **Solution** (step-by-step fix)
4. **Verification** (how to confirm fixed)
5. **If still broken** (escalation path)

### Content Anti-Patterns

**❌ Tutorial without code examples**
```
This section explains how to initialize the SDK. The SDK initialization
process involves obtaining your API key from the dashboard and calling
the initialization method during application startup.
```

**✅ Tutorial with code first**
```
Initialize the SDK in your app delegate:

```swift
// AppDelegate.swift
func application(_ application: UIApplication, 
                didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    Adapty.activate("YOUR_API_KEY")
    return true
}
```

Get your API key from Dashboard → App Settings.
```

**❌ No error handling shown**
```swift
let profile = Adapty.getProfile()
print(profile.accessLevels)
```

**✅ Real error handling**
```swift
Adapty.getProfile { result in
    switch result {
    case .success(let profile):
        print(profile.accessLevels)
    case .failure(let error):
        print("Failed to get profile: \(error)")
    }
}
```

**❌ Generic, not platform-specific**
```
Add the SDK dependency to your project configuration file.
```

**✅ Platform-specific (for iOS doc)**
```
Add to Podfile:
```ruby
pod 'Adapty', '~> 2.0'
```

Then run `pod install`.
```

**✅ Platform-specific (for Android doc)**
```
Add to app/build.gradle:
```gradle
implementation 'io.adapty:android-sdk:2.0.0'
```

Requires minSdk 21+.
```

**❌ No way to verify**
```
Configure your API key in the SDK.
```

**✅ Shows verification**
```
Configure your API key:

```swift
Adapty.activate("YOUR_API_KEY")
```

**Verify:** Check Xcode console for "Adapty: SDK initialized successfully"
If you see "API key is invalid", copy the key again from Dashboard.
```

### What Developers Don't Expect (and dislike)

**❌ Marketing copy in dev docs**
```
Our revolutionary platform empowers developers to unlock unprecedented
value through cutting-edge subscription technology.
```

**❌ Long explanations before code**
```
The SDK provides a comprehensive framework for managing in-app purchases
across multiple platforms. Before integration, it's important to understand
the architecture and design principles that inform the SDK's approach...

[3 more paragraphs]

Here's how to integrate:
```

**❌ "Simply" or "just" for complex things**
```
Simply configure your server-side receipt validation with webhook
signature verification and you're done!
```

**❌ No troubleshooting**
```
If you encounter issues, please contact support.
```

**❌ Outdated version info**
```
This works in SDK v1.x
```
(No info about current version v2.x)

**❌ "Contact support" without trying to help**
```
If this doesn't work, open a support ticket.
```
(No troubleshooting steps, no common causes)

### How Developers Actually Talk

Developers have a distinct communication style shaped by:
- Stack Overflow culture (direct, code-focused)
- GitHub issue threads (problem → solution)
- Technical Slack/Discord channels (casual but precise)
- Conference talks (conversational expertise)

**Characteristics of authentic developer voice:**
- **Direct**: "Do X" not "One should consider doing X"
- **Casual**: Contractions are normal ("you'll", "won't", "it's")
- **Code-first**: Show code, then explain
- **Problem-aware**: Acknowledge gotchas directly
- **Precise without formality**: "Returns null" not "shall return a null value"
- **Second person**: "You" not "the developer" or "one"

### Language Developers Use

**Common developer phrases:**
- "Here's how..."
- "Watch out for..."
- "Quick note:"
- "This fails when..."
- "You'll need..."
- "Make sure to..."
- "Heads up:"
- "Worth noting:"
- "I ran into this when..."

**Phrases developers DON'T use:**
- "It is imperative that..."
- "One must ensure..."
- "Please be advised..."
- "Prior to attempting..."
- "In order to facilitate..."
- "Utilize the aforementioned..."
- "It is recommended that the developer..."

### Stack Overflow Style

Developers are trained by Stack Overflow to expect:

**Question structure:**
1. What I'm trying to do
2. What I tried
3. What happened (error message)
4. Environment details

**Answer structure:**
1. Direct solution (code first)
2. Brief explanation (why it works)
3. Gotchas if any

**NOT:**
- Long preambles
- Corporate disclaimers
- Marketing language
- Formal academic tone

### GitHub Issue/PR Style

Developers communicate in issues/PRs:
- Casual but professional
- Direct problem statements
- Code snippets inline
- Links to docs/code
- @mentions for people
- Emoji for emphasis (✅ ❌ 🚨)

**Tone:**
- "This breaks when..." (not "Under certain conditions, failure may occur")
- "Should we..." (not "It is advisable to consider")
- "Fixed by..." (not "Resolution achieved through")

### Documentation Anti-Patterns

**❌ Corporate/Marketing voice in developer docs:**
```
"Our revolutionary platform empowers organizations to leverage cutting-edge
subscription technology, enabling developers to unlock unprecedented value
through our comprehensive suite of enterprise-grade tools."
```

**✅ Developer voice:**
```
"Adapty handles subscription payments, analytics, and paywalls.
Integrate it in about 10 minutes."
```

**❌ Overly formal technical writing:**
```
"Prior to initializing the SDK, it is imperative that the developer ensures
that all prerequisite configuration steps have been completed in accordance
with the integration documentation."
```

**✅ Natural developer tone:**
```
"Before you initialize the SDK, make sure you've:
- Created your app in the Adapty Dashboard
- Copied your API key
- Added the SDK to your project"
```

**❌ Passive voice everywhere:**
```
"Once the configuration has been completed and the SDK has been initialized,
paywalls can be presented to users by calling the appropriate methods."
```

**✅ Active voice, direct:**
```
"After you configure and initialize the SDK, show paywalls to users:

[code example]"
```

### Trust Signals for Developers

**Builds trust:**
- Acknowledging known issues/limitations
- Showing actual error messages
- Real code examples (not pseudocode)
- Platform-specific gotchas
- "This is tricky" honesty
- Version specifics

**Destroys trust:**
- Marketing speak in technical docs
- Oversimplifying ("just" for complex things)
- Hiding limitations
- Generic "contact support" without specifics
- No error handling in examples
- Corporate legalese

### When Writing for Developers

**Do:**
- Use "you" consistently
- Include working code examples
- Acknowledge when something is complex
- Show actual error messages
- Link to source code when relevant
- Use casual but precise language
- Add "Why?" explanations for non-obvious things

**Don't:**
- Use "one" or "the developer"
- Write in passive voice
- Use marketing language
- Hide complexity
- Use formal corporate tone
- Say "simply" or "just" for hard things
- Avoid contractions to sound "professional"

### For Any Feature Documentation

**1. Lead with User Benefit**
Not: "This API endpoint returns user subscription status"
But: "Check if users have access to premium features"

**2. Show Business Impact**
Not: "Configure webhook events"
But: "Automate user onboarding when they subscribe"

**3. Connect to Workflow**
Not: "Create a placement"
But: "Control which paywall users see on your home screen"

**4. Reduce Perceived Complexity**
Not: "Implement observer mode with server-side validation"
But: "Keep your existing billing code and add Adapty analytics"

**5. Address Objections**
Not: [feature description]
But: "Unlike [alternative], this approach lets you [benefit]"

## Onboarding Optimization Principles

### Progressive Disclosure
- Don't show everything at once
- Start with minimum viable knowledge
- Layer complexity gradually
- Link to deep dives

### Quick Wins First
- Get to working code fast
- Defer edge cases
- Show value immediately
- Optimize later

### Clear Prerequisites
- State what you need before starting
- Link to dependency docs
- Mention time estimates
- Warn about common blockers

### Expected Outcomes
- Show what success looks like
- Include screenshots/outputs
- Explain how to verify
- Troubleshoot common issues

### Next Steps
- Always suggest what to do next
- Provide multiple paths
- Link to related topics
- Offer support options