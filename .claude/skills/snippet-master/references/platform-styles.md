# Platform Style Guide

This document contains platform-specific patterns and best practices for creating code snippets.

## iOS (Swift)

### Error Handling Pattern
Use `async/await` with `do-catch`:

```swift
do {
    let profile = try await Adapty.getProfile()
    // use the profile
} catch {
    // handle the error
}
```

### Best Practices
- Use `async/await` for asynchronous operations (modern Swift)
- Use `guard` statements for early returns
- Use optional chaining (`?.`) and nil coalescing (`??`)
- Use descriptive variable names with camelCase
- Always include error handling

### Common Patterns
```swift
// Checking optional values
if profile.accessLevels["YOUR_ACCESS_LEVEL"]?.isActive ?? false {
    // grant access
}

// Guard statements
guard let userId = profile.userId else {
    // handle missing userId
    return
}

// Optional binding
if let subscription = profile.subscriptions["product_id"] {
    // use subscription
}
```

---

## Android (Kotlin)

### Error Handling Pattern
Use `AdaptyResult` sealed class with `when`:

```kotlin
Adapty.getProfile { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val profile = result.value
            // check the access
        }
        is AdaptyResult.Error -> {
            val error = result.error
            // handle the error
        }
    }
}
```

### Best Practices
- Use `when` expressions (not `if/else` for sealed classes)
- Use `val` for immutable variables (prefer over `var`)
- Use descriptive variable names with camelCase
- Always handle both Success and Error cases
- Use named parameters for clarity when constructing objects

### Common Patterns
```kotlin
// Object construction with named parameters
val params = AdaptySubscriptionUpdateParameters(
    oldSubVendorProductId = "old_product_id",
    replacementMode = AdaptySubscriptionUpdateReplacementMode.WITH_TIME_PRORATION
)

// Null safety
profile.accessLevels["YOUR_ACCESS_LEVEL"]?.isActive == true

// Sealed class handling
when (result) {
    is AdaptyResult.Success -> { /* ... */ }
    is AdaptyResult.Error -> { /* ... */ }
}
```

---

## React Native (TypeScript/JavaScript)

### Error Handling Pattern
Use `try/catch` with `async/await`:

```typescript
try {
    const profile = await adapty.getProfile();
    // check the access
} catch (error) {
    // handle the error
}
```

### Best Practices
- Use `async/await` (not `.then()/.catch()`)
- Use `const` for variables (prefer over `let`)
- Use camelCase for variables
- Always include try/catch for async operations
- Keep error handling concise

### Common Patterns
```typescript
// Async/await pattern
const profile = await adapty.getProfile();

// Accessing nested properties
if (profile.accessLevels?.["YOUR_ACCESS_LEVEL"]?.isActive) {
    // grant access
}

// Parameter objects
const params = {
    variationId: "variation_id",
    productId: "product_id"
};
```

---

## Flutter (Dart)

### Error Handling Pattern
Use `try/on/catch` with specific error types:

```dart
try {
    final profile = await Adapty().getProfile();
    // check the access
} on AdaptyError catch (adaptyError) {
    // handle the error
} catch (e) {
    // handle unexpected errors
}
```

### Best Practices
- Use `final` for variables (prefer over `var`)
- Use `await` for async operations
- Catch specific error types with `on AdaptyError`
- Always include a generic catch block
- Use camelCase for variables

### Common Patterns
```dart
// Variable declaration
final profile = await Adapty().getProfile();

// Null safety
if (profile.accessLevels?["YOUR_ACCESS_LEVEL"]?.isActive ?? false) {
    // grant access
}

// Error handling hierarchy
try {
    // code
} on AdaptyError catch (adaptyError) {
    // specific error handling
} catch (e) {
    // generic error handling
}
```

---

## Unity (C#)

### Error Handling Pattern
Use callback pattern with null check:

```csharp
Adapty.GetProfile((profile, error) => {
    if (error != null) {
        // handle the error
        return;
    }
    // check the access
});
```

### Best Practices
- Check `error != null` first, then early return
- Use PascalCase for method names (Unity convention)
- Use lambda expressions for callbacks
- Always handle the error case
- Keep callbacks concise

### Common Patterns
```csharp
// Callback with error check
Adapty.GetProfile((profile, error) => {
    if (error != null) {
        // handle the error
        return;
    }
    // use profile
});

// Null checking
if (profile.AccessLevels?["YOUR_ACCESS_LEVEL"]?.IsActive == true) {
    // grant access
}

// Parameter objects
var params = new AdaptySubscriptionUpdateParameters {
    OldSubVendorProductId = "old_product_id",
    ReplacementMode = AdaptySubscriptionUpdateReplacementMode.WithTimeProration
};
```

---

## Kotlin Multiplatform (KMP)

### Error Handling Pattern
Use `onSuccess/onError` pattern:

```kotlin
Adapty.getProfile()
    .onSuccess { profile ->
        // check the access
    }
    .onError { error ->
        // handle the error
    }
```

### Best Practices
- Use `onSuccess` and `onError` chaining
- Use `val` for immutable variables
- Use camelCase for variables
- Chain methods for readability
- Always handle both success and error

### Common Patterns
```kotlin
// Result chaining
Adapty.getProfile()
    .onSuccess { profile ->
        // use profile
    }
    .onError { error ->
        // handle error
    }

// Parameter construction
val params = AdaptySubscriptionUpdateParameters(
    oldSubVendorProductId = "old_product_id",
    replacementMode = AdaptySubscriptionUpdateReplacementMode.WithTimeProration
)

// Null safety
profile.accessLevels["YOUR_ACCESS_LEVEL"]?.isActive == true
```

---

## Capacitor (TypeScript/JavaScript)

### Error Handling Pattern
Use `try/catch` with `async/await` (same as React Native):

```typescript
try {
    const profile = await adapty.getProfile();
    // check the access
} catch (error) {
    // handle the error
}
```

### Best Practices
- Identical to React Native patterns
- Use `async/await` (not `.then()/.catch()`)
- Use `const` for variables
- Use camelCase for variables
- Always include try/catch

### Common Patterns
Same as React Native - refer to React Native section for detailed patterns.

---

## Cross-Platform Consistency Rules

### Comments
- Keep comments brief: `// check the access`, `// handle the error`
- Use lowercase for comment text
- Avoid verbose explanations

### Variable Naming
- Use meaningful names, not single letters
- Use placeholders like `"YOUR_ACCESS_LEVEL"` instead of magic strings
- Be consistent within the same article

### Error Handling
- ALWAYS include error handling - never show only the happy path
- Match the platform's idiomatic pattern
- Keep error handling consistent across snippets on the same page

### Code Length
- Show only what's necessary
- If a parameter is constructed, show that construction
- Don't show entire class implementations
- Aim for 5-15 lines maximum per snippet

---

## Additional Platform-Specific Patterns from Docs

### iOS - SwiftUI Modifiers

**Paywall Presentation Pattern:**
```swift
@State var paywallPresented = false

var body: some View {
    Text("Hello, AdaptyUI!")
        .paywall(
            isPresented: $paywallPresented,
            paywallConfiguration: <AdaptyUI.PaywallConfiguration>,
            didPerformAction: { action in
                switch action {
                    case .close:
                        paywallPresented = false
                    case let .openURL(url):
                        // handle opening the URL
                    default:
                        // handle other actions
                }
            }
        )
}
```

**Key Patterns:**
- Use `@State` for presentation state
- Binding with `$paywallPresented`
- Switch on action enums with associated values: `case let .openURL(url):`
- Inline closure handlers

### iOS - Callback Variant

When showing both async and callback patterns, use tabs:

```swift
// Swift (async/await) - default tab
let profile = try await Adapty.getProfile()

// Swift-Callback - alternative tab
Adapty.getProfile { result in
    if let profile = try? result.get() {
        // check the access
    }
}
```

### Android - Nested Result Types

**Purchase Result Pattern:**
```kotlin
Adapty.makePurchase(activity, product, null) { result ->
    when (result) {
        is AdaptyResult.Success -> {
            when (val purchaseResult = result.value) {
                is AdaptyPurchaseResult.Success -> {
                    val profile = purchaseResult.profile
                    // Grant access to the paid features
                }
                is AdaptyPurchaseResult.UserCanceled -> { }
                is AdaptyPurchaseResult.Pending -> { }
            }
        }
        is AdaptyResult.Error -> { }
    }
}
```

**Key Pattern:** Nested `when` expressions for multi-level result types.

### Android - Event Listeners

**Override Pattern:**
```kotlin
public override fun onPurchaseFinished(
    purchaseResult: AdaptyPurchaseResult,
    product: AdaptyPaywallProduct,
    context: Context,
) {
    if (purchaseResult !is AdaptyPurchaseResult.UserCanceled)
        context.getActivityOrNull()?.onBackPressed()
}
```

**Key Patterns:**
- `public override` visibility
- Named parameters on multiple lines
- Negative type checking: `!is`

### React Native - Type Discriminated Unions

**Pattern:**
```typescript
switch (purchaseResult.type) {
  case 'success':
    const profile = purchaseResult.profile;
    break;
  case 'user_cancelled':
    break;
  case 'pending':
    break;
}
```

**Key Pattern:** Use `switch` on `.type` field with string literals.

### Flutter - Pattern Matching

**Sealed Class Pattern:**
```dart
switch (purchaseResult) {
  case AdaptyPurchaseResultSuccess(profile: final profile):
    // use profile
    break;
  case AdaptyPurchaseResultPending():
    break;
  case AdaptyPurchaseResultUserCancelled():
    break;
  default:
    break;
}
```

**Key Patterns:**
- Pattern matching with destructuring: `(profile: final profile)`
- Empty constructors: `AdaptyPurchaseResultPending()`
- Always include `default` case

### Flutter - Cascade Operator

**Configuration Pattern:**
```dart
configuration: AdaptyConfiguration(apiKey: 'YOUR_PUBLIC_SDK_KEY')
  ..withGoogleEnablePendingPrepaidPlans(true)
```

**Key Pattern:** Use `..` cascade operator for fluent configuration.

### Unity - Early Return Pattern

**Error Handling:**
```csharp
Adapty.GetProfile((profile, error) => {
    if (error != null) {
        // handle the error
        return;
    }
    // use profile
});
```

**Key Pattern:** Check error first, early return, then happy path.

### KMP - Named Parameters and Builders

**Parameter Pattern:**
```kotlin
Adapty.makePurchase(product = product).onSuccess { }
```

**Builder Pattern:**
```kotlin
val purchaseParams = AdaptyPurchaseParameters.Builder()
    .setSubscriptionUpdateParams(subscriptionUpdateParams)
    .build()
```

**Key Patterns:**
- Named parameters: `product = product`
- Builder with `set` prefix methods
- Method chaining with `.onSuccess { }.onError { }`

### Capacitor - Console Logging

**Pattern:**
```typescript
if (isSubscribed) {
  console.log('User is now subscribed!');
}
```

**Key Pattern:** Capacitor examples often include `console.log`/`console.error` for demonstration, unlike other platforms.

---

## Comment Style Deep Dive

### Observed Comment Patterns

**Most Common:**
- `// Handle the error`
- `// Grant access to the paid features`
- `// handle the error` (lowercase)
- `// check the access`
- `// handle pending purchase`

**When Inline:**
- `{ /* Handle the event */ }`
- `{ /* handle the error */ }`

**Action-Oriented Verbs:**
- handle
- grant access
- check
- use
- process
- dismiss

**Never:**
- Explanatory prose
- Multiple sentences
- "First we do X, then Y"
- Over-explanation of obvious code

### Tab Groups and Variants

When showing multiple language variants, use specific tab identifiers:

```markdown
<Tabs groupId="current-os" queryString>
<TabItem value="kotlin" label="Kotlin" default>
<TabItem value="java" label="Java">

<Tabs>
<TabItem value="swiftui" label="SwiftUI" default>
<TabItem value="uikit" label="UIKit">
```

**Common groupings:**
- Kotlin / Java (Android)
- Swift / Swift-Callback (iOS async variants)
- SwiftUI / UIKit (iOS UI frameworks)

---

## Import Statements

**Show imports when:**
- First mention of a class in an article
- Using specific types that aren't obvious
- Configuration/setup examples

**Examples:**

iOS:
```swift
import Adapty
import AdaptyUI
```

Android:
```kotlin
import com.adapty.models.AdaptyConfig
```

Unity:
```csharp
using UnityEngine;
using AdaptySDK;
```

KMP:
```kotlin
import com.adapty.kmp.Adapty
import com.adapty.kmp.models.AdaptyPurchaseResult
```

Capacitor/React Native:
```typescript
import { adapty } from '@adapty/capacitor';
```

**Don't show** import statements in middle of article when classes are already introduced.