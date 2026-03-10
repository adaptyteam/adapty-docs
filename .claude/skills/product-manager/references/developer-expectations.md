# Developer Expectations Reference

What mobile developers expect from documentation — use this when evaluating Developer Authenticity (review area 9).

## Voice & Tone

Mobile developers expect casual, direct language — not corporate or formal tone.

❌ Corporate speak:
- "Leverage our robust SDK to facilitate seamless integration"
- "Our platform enables organizations to maximize ROI"

✅ Developer speak:
- "Use the SDK to handle subscriptions"
- "Track subscription revenue"

❌ Too formal:
```
"One must ensure that the application has been properly configured
prior to attempting integration with the Adapty SDK."
```

✅ Natural developer tone:
```
"Before integrating the SDK, make sure you've configured your app in
the Adapty Dashboard."
```

## 12 Developer Expectations

### 1. Code First, Explanation After

❌ Explanation without code:
```
# Initialize SDK

The SDK must be initialized during application startup, preferably in
your application delegate or main activity. Initialization requires
your API key which can be obtained from the dashboard.
```

✅ Code first:
```
# Initialize SDK

```swift
// AppDelegate.swift
Adapty.activate("YOUR_API_KEY")
```

Call this in your app delegate's didFinishLaunching. Get your API key
from Dashboard → App Settings → General.
```

### 2. Error Messages and Troubleshooting Embedded

❌ No error info:
```
Initialize the SDK with your API key.
```

✅ Shows what can go wrong:
```
Initialize the SDK with your API key:

```swift
Adapty.activate("YOUR_API_KEY")
```

**Common issues:**
- "API key is invalid" → Check you copied the full key from Dashboard
- Crash on startup → Make sure you call this before any Adapty methods
```

### 3. Platform-Specific Reality

❌ Generic cross-platform:
```
Add the SDK to your project and initialize it.
```

✅ Platform-specific details:
```
Add to Podfile:
```ruby
pod 'Adapty', '~> 2.0'
```

Then run `pod install`.

**Requirements:**
- iOS 12.0+
- Xcode 13+
- Swift 5.5+
```

Note: Each SDK platform (iOS, Android, React Native, Flutter, Unity, Capacitor, KMP) has its own sidebar/section. An iOS doc should only contain iOS code, an Android doc only Android code.

### 4. Real Working Examples, Not Pseudocode

❌ Pseudocode:
```
// Get profile
profile = adapty.getProfile()
if profile.hasAccess:
    showPremiumContent()
```

✅ Actual code that compiles:
```swift
Adapty.getProfile { result in
    if let profile = try? result.get(),
       profile.accessLevels["premium"]?.isActive == true {
        showPremiumContent()
    }
}
```

### 5. "Why" Explained for Non-Obvious Things

❌ Just the what:
```
Call identify() when your user logs in.
```

✅ Includes the why:
```
Call identify() when your user logs in:

```swift
Adapty.identify("user_id_123")
```

Why: This links purchases to your user IDs, letting users restore
purchases on new devices and see their subscription across platforms.
```

### 6. Version/Platform Requirements Up Front

❌ Hidden in footnotes:
```
# Install SDK

Add the SDK to your project...

*Note: Requires iOS 12+
```

✅ Requirements first:
```
# Install SDK

**Requirements:**
- iOS 12.0+
- Xcode 13+
- Swift 5.5+

Add to Podfile:
...
```

### 7. Migration Paths for Existing Code

❌ Assumes greenfield:
```
Integrate the SDK to handle purchases.
```

✅ Acknowledges existing code:
```
## Already handling purchases?

Keep your existing purchase code and use Adapty in Observer Mode
to get analytics. See Observer Mode Guide.

## Starting fresh?

Let Adapty handle purchases completely. Follow this guide.
```

### 8. Links to Source/API Reference

❌ No way to go deeper:
```
Use the getProfile method to check subscription status.
```

✅ Links to details:
```
Use `getProfile()` to check subscription status:

```swift
Adapty.getProfile { result in ... }
```

See [SDK Reference](link) for all profile properties.
```

### 9. Limitations and Known Issues

❌ Only happy path:
```
A/B tests let you compare paywalls.
```

✅ Mentions limitations:
```
A/B tests let you compare paywalls.

**Limitations:**
- Requires minimum 100 users per variation for statistical significance
- Results can take 2-3 days to stabilize
- Can't A/B test offer types (trials vs. paid) — only UI/pricing
```

### 10. Time Estimates

❌ No time context:
```
Follow these steps to integrate.
```

✅ Sets expectations:
```
Follow these steps to integrate (takes ~15 minutes):
```

### 11. Success Criteria / Verification

❌ No way to verify:
```
Initialize the SDK.
```

✅ Shows how to verify:
```
Initialize the SDK:

```swift
Adapty.activate("YOUR_API_KEY")
```

**Verify it works:**
Check Xcode console for "Adapty: SDK initialized successfully"
Or open Dashboard → Users — you should see a test user appear.
```

### 12. Next Steps / Related Topics

❌ Dead end:
```
That's how you initialize the SDK.
```

✅ Clear path forward:
```
That's how you initialize the SDK.

**Next:**
- [Show a paywall](link)
- [Track purchases](link)
- [Check subscription status](link)
```

## Expected Doc Structure by Type

**Integration guides:**
1. Requirements (platform, versions)
2. Installation (package manager steps)
3. Basic setup (minimal code)
4. Verification (how to test)
5. Next steps

**Feature docs:**
1. What it does (1 sentence)
2. When to use it
3. Code example (minimal)
4. Common parameters
5. Error handling
6. Platform differences if any

**Troubleshooting:**
1. Symptom
2. Cause
3. Solution (exact steps)
4. How to verify fix

**API reference:**
1. Method signature
2. Brief description
3. Parameters with types
4. Return value
5. Example usage
6. Related methods

## Anti-Patterns Developers Dislike

- No code until page 3
- Marketing copy in technical docs
- "Just do X" for complex things
- Missing error handling
- Generic cross-platform content that doesn't work for their platform
- Pseudocode instead of real code
- No way to test if it's working
- Buried prerequisites
- No troubleshooting section

## When to Flag Developer Authenticity Issues

Flag when:
- No code examples in first screenful
- Marketing language in technical content
- Pseudocode instead of real, compilable code
- No error handling shown
- No platform-specific details
- No troubleshooting guidance
- No verification steps
- No links to deeper docs
- No time estimates for complex tasks

Context matters: conceptual overview docs can have less code; API reference has different structure than tutorials.
