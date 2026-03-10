# Cross-Platform Reference

## Consistency Rules

### Comments
- Keep comments brief: `// check the access`, `// handle the error`
- Use lowercase for comment text
- Avoid verbose explanations
- Inline form: `{ /* Handle the event */ }`

Action-oriented verbs: handle, grant access, check, use, process, dismiss

**Never:** explanatory prose, multiple sentences, "First we do X, then Y", explaining obvious code

### Variable Naming
- Use meaningful names, not single letters
- Use `"YOUR_ACCESS_LEVEL"` placeholders instead of magic strings
- Be consistent within the same article

### Error Handling
- ALWAYS include error handling — never show only the happy path
- Match the platform's idiomatic pattern
- Keep error handling consistent across snippets on the same page

### Code Length
- Show only what's necessary
- If a parameter is constructed, show that construction
- Don't show entire class implementations
- Aim for 5–15 lines maximum per snippet

## Code Block Formatting

All snippets use:
````markdown
```swift showLineNumbers
// code here
```
````

**Always include:**
- `showLineNumbers` attribute
- Language identifier: `swift`, `kotlin`, `typescript`, `dart`, `csharp`
- Optional `title` attribute for file context: `title="Swift"`

**Tab groups:**
```markdown
<Tabs groupId="current-os" queryString>
<TabItem value="kotlin" label="Kotlin" default>
```kotlin showLineNumbers
// Kotlin code
```
</TabItem>
<TabItem value="java" label="Java">
```java showLineNumbers
// Java code
```
</TabItem>
</Tabs>
```

Common tab groupings:
- Kotlin / Java (Android)
- Swift / Swift-Callback (iOS async variants)
- SwiftUI / UIKit (iOS UI frameworks)
- Standalone / Embedded (presentation methods)

## Import Statements

Show imports when:
- First mention of a class in an article
- Using specific types that aren't obvious
- Configuration/setup examples

Don't show import statements mid-article when classes are already introduced.

```swift
import Adapty
import AdaptyUI
```

```kotlin
import com.adapty.models.AdaptyConfig
```

```csharp
using UnityEngine;
using AdaptySDK;
```

```kotlin
// KMP
import com.adapty.kmp.Adapty
import com.adapty.kmp.models.AdaptyPurchaseResult
```

```typescript
// Capacitor / React Native
import { adapty } from '@adapty/capacitor';
```

## Minimal vs. Complete

The right amount of context — not too little, not too much.

### ❌ Too Minimal (Missing Context)
```kotlin
Adapty.makePurchase(subscriptionUpdateParams)
```
Problem: Where does `subscriptionUpdateParams` come from?

### ❌ Too Verbose
```kotlin
// First, we need to create the subscription update parameters
// This will tell Adapty how to handle the subscription upgrade
val subscriptionUpdateParams = AdaptySubscriptionUpdateParameters(
    oldSubVendorProductId = "old_product_id", // The old subscription ID
    replacementMode = AdaptySubscriptionUpdateReplacementMode.WITH_TIME_PRORATION // Use time proration
)
```
Problem: Over-commented, explains obvious things.

### ✅ Just Right
```kotlin
val subscriptionUpdateParams = AdaptySubscriptionUpdateParameters(
    oldSubVendorProductId = "old_product_id",
    replacementMode = AdaptySubscriptionUpdateReplacementMode.WITH_TIME_PRORATION
)

val product = AdaptyProduct(
    vendorProductId = "new_product_id",
    paywallId = "paywall_id"
)

Adapty.makePurchase(activity, product, subscriptionUpdateParams) { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val profile = result.value
            // subscription updated
        }
        is AdaptyResult.Error -> {
            val error = result.error
            // handle the error
        }
    }
}
```

## Cross-Platform Translation

### What to Translate Directly
- Example text and scenario ("Close paywall?", "You will lose access...")
- Parameter values ("placement_id", "YOUR_ACCESS_LEVEL")
- Logic flow (check result, dismiss if secondary action)
- Comment style and placement

### What to Adapt
- Syntax (TypeScript → Dart, Kotlin → Swift)
- Error handling pattern (try/catch → try/on AdaptyError/catch)
- Type names (AdaptyUIDialogActionType vs string literal)
- Method calls (check for convenience methods like `.present()`)

### Common Translation Pairs
- TypeScript → Dart (React Native/Capacitor → Flutter)
- Kotlin → Swift (Android → iOS, KMP → iOS)
- Swift → Kotlin (iOS → Android/KMP)
- C# → Kotlin/Swift (Unity → Android/iOS)

### Translation Checklist
- [ ] Read the source snippet completely
- [ ] Check target platform's SDK for the equivalent method
- [ ] Verify method signature (parameters, return type)
- [ ] Check for convenience methods on returned objects
- [ ] Apply target platform's error handling pattern
- [ ] Apply target platform's syntax (named params, type checking, etc.)
- [ ] Keep the same example text and scenario
- [ ] Keep the same comment style
- [ ] Verify all types exist in target platform (or find equivalents)
- [ ] Test the logic flow makes sense in target platform
