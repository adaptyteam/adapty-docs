# Snippet Examples

Concrete examples of well-crafted snippets for each platform.

## Example 1: Getting User Profile

### iOS
```swift
do {
    let profile = try await Adapty.getProfile()
    
    if profile.accessLevels["YOUR_ACCESS_LEVEL"]?.isActive ?? false {
        // grant access to premium features
    }
} catch {
    // handle the error
}
```

### Android (Kotlin)
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

### React Native
```typescript
try {
    const profile = await adapty.getProfile();
    // check the access
} catch (error) {
    // handle the error
}
```

### Flutter
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

### Unity
```csharp
Adapty.GetProfile((profile, error) => {
    if (error != null) {
        // handle the error
        return;
    }
    // check the access
});
```

### Kotlin Multiplatform
```kotlin
Adapty.getProfile()
    .onSuccess { profile ->
        // check the access
    }
    .onError { error ->
        // handle the error
    }
```

### Capacitor
```typescript
try {
    const profile = await adapty.getProfile();
    // check the access
} catch (error) {
    // handle the error
}
```

---

## Example 2: Making a Purchase with Context

This shows how to provide context by demonstrating parameter construction.

### iOS
```swift
do {
    let product = try await Adapty.getPaywallProduct(
        paywallId: "paywall_id",
        productId: "product_id"
    )
    
    let profile = try await Adapty.makePurchase(product: product)
    // process the purchase
} catch {
    // handle the error
}
```

### Android (Kotlin)
```kotlin
val product = AdaptyProduct(
    vendorProductId = "product_id",
    paywallId = "paywall_id"
)

Adapty.makePurchase(activity, product) { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val profile = result.value
            // process the purchase
        }
        is AdaptyResult.Error -> {
            val error = result.error
            // handle the error
        }
    }
}
```

### React Native
```typescript
try {
    const product = await adapty.getPaywallProduct({
        paywallId: "paywall_id",
        productId: "product_id"
    });
    
    const profile = await adapty.makePurchase(product);
    // process the purchase
} catch (error) {
    // handle the error
}
```

---

## Example 3: Updating Subscription (Shows Full Context)

### Android (Kotlin)
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

**Why this is good:**
- Shows how `subscriptionUpdateParams` is constructed (not just passed magically)
- Shows how `product` is constructed
- Follows the platform's idiomatic pattern (AdaptyResult with when)
- Includes error handling
- Comments are brief and actionable

---

## Example 4: Minimal vs Complete

### ❌ BAD - Too Minimal (Missing Context)
```kotlin
Adapty.makePurchase(subscriptionUpdateParams)
```
**Problem:** Where does `subscriptionUpdateParams` come from? How is it constructed?

### ❌ BAD - Too Verbose
```kotlin
// First, we need to create the subscription update parameters
// This will tell Adapty how to handle the subscription upgrade
val subscriptionUpdateParams = AdaptySubscriptionUpdateParameters(
    oldSubVendorProductId = "old_product_id", // The old subscription ID
    replacementMode = AdaptySubscriptionUpdateReplacementMode.WITH_TIME_PRORATION // Use time proration
)

// Now we need to get the product from the paywall
val product = AdaptyProduct(
    vendorProductId = "new_product_id", // The new product ID
    paywallId = "paywall_id" // The paywall ID from your dashboard
)

// Finally, make the purchase with the update parameters
Adapty.makePurchase(activity, product, subscriptionUpdateParams) { result ->
    // This callback will be called when the purchase completes
    when (result) {
        is AdaptyResult.Success -> {
            // The purchase was successful!
            val profile = result.value
            // You can now update your UI or grant access
        }
        is AdaptyResult.Error -> {
            // Something went wrong with the purchase
            val error = result.error
            // Show an error message to the user
        }
    }
}
```
**Problem:** Over-commented, verbose, explains obvious things.

### ✅ GOOD - Just Right
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
**Why this works:**
- Shows parameter construction (essential context)
- Code is self-documenting (good variable names)
- Comments are minimal and actionable
- Every line serves a purpose
- Follows platform idioms

---

## Consistency Example

If an article already has this style:

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

Then your new snippet should match:
- Same comment style (`// check the access` not `// Check the access`)
- Same brace style
- Same variable naming (`result`, `profile`, `error`)
- Same level of verbosity

**Don't** introduce a different style just because you think it's better. Consistency on the page matters more than perfect style.

---

## Example 5: Purchase with All Result Types

Show all possible purchase outcomes - success, user cancellation, and pending states.

### iOS (Swift)
```swift
do {
    let result = try await Adapty.makePurchase(product: product)

    switch result {
    case .success(let profile):
        if profile.accessLevels["YOUR_ACCESS_LEVEL"]?.isActive ?? false {
            // grant access to premium features
        }
    case .cancelled:
        // handle the case where the user canceled the purchase
    case .pending:
        // handle deferred purchases (e.g., the user will pay offline with cash)
    }
} catch {
    // handle the error
}
```

### Android (Kotlin)
```kotlin
Adapty.makePurchase(activity, product, null) { result ->
    when (result) {
        is AdaptyResult.Success -> {
            when (val purchaseResult = result.value) {
                is AdaptyPurchaseResult.Success -> {
                    val profile = purchaseResult.profile
                    if (profile.accessLevels["YOUR_ACCESS_LEVEL"]?.isActive == true) {
                        // Grant access to the paid features
                    }
                }
                is AdaptyPurchaseResult.UserCanceled -> {
                    // Handle the case where the user canceled the purchase
                }
                is AdaptyPurchaseResult.Pending -> {
                    // Handle deferred purchases (e.g., the user will pay offline with cash)
                }
            }
        }
        is AdaptyResult.Error -> {
            val error = result.error
            // Handle the error
        }
    }
}
```

### React Native (TypeScript)
```typescript
try {
    const purchaseResult = await adapty.makePurchase(product);
    switch (purchaseResult.type) {
      case 'success':
        const isSubscribed = purchaseResult.profile?.accessLevels['YOUR_ACCESS_LEVEL']?.isActive;

        if (isSubscribed) {
          // Grant access to the paid features
        }
        break;
      case 'user_cancelled':
        // Handle the case where the user canceled the purchase
        break;
      case 'pending':
        // Handle deferred purchases (e.g., the user will pay offline with cash)
        break;
    }
} catch (error) {
    // Handle the error
}
```

### Flutter (Dart)
```dart
try {
  final purchaseResult = await Adapty().makePurchase(product: product);
    switch (purchaseResult) {
      case AdaptyPurchaseResultSuccess(profile: final profile):
        if (profile.accessLevels['premium']?.isActive ?? false) {
          // Grant access to the paid features
        }
        break;
      case AdaptyPurchaseResultPending():
        // Handle deferred purchases
        break;
      case AdaptyPurchaseResultUserCancelled():
        // Handle user cancellation
        break;
      default:
        break;
    }
} on AdaptyError catch (adaptyError) {
    // Handle the error
} catch (e) {
    // Handle the error
}
```

### Unity (C#)
```csharp
Adapty.MakePurchase(product, (result, error) => {
  switch (result.Type) {
    case AdaptyPurchaseResultType.Pending:
      // handle pending purchase
      break;
    case AdaptyPurchaseResultType.UserCancelled:
      // handle purchase cancellation
      break;
    case AdaptyPurchaseResultType.Success:
      var profile = result.Profile;
      // handle successfull purchase
      break;
    default:
      break;
  }
});
```

### KMP (Kotlin)
```kotlin
Adapty.makePurchase(product = product).onSuccess { purchaseResult ->
    when (purchaseResult) {
        is AdaptyPurchaseResult.Success -> {
            val profile = purchaseResult.profile
            if (profile.accessLevels["YOUR_ACCESS_LEVEL"]?.isActive == true) {
                // Grant access to the paid features
            }
        }
        is AdaptyPurchaseResult.UserCanceled -> {
            // Handle the case where the user canceled the purchase
        }
        is AdaptyPurchaseResult.Pending -> {
            // Handle deferred purchases (e.g., the user will pay offline with cash)
        }
    }
}.onError { error ->
    // Handle the error
}
```

### Capacitor (TypeScript)
```typescript
try {
  const result = await adapty.makePurchase({ product });

  if (result.type === 'success') {
    const isSubscribed = result.profile?.accessLevels['YOUR_ACCESS_LEVEL']?.isActive;

    if (isSubscribed) {
      console.log('User is now subscribed!');
    }
  } else if (result.type === 'user_cancelled') {
    console.log('Purchase cancelled by user');
  } else if (result.type === 'pending') {
    console.log('Purchase is pending');
  }
} catch (error) {
  console.error('Purchase failed:', error);
}
```

**Key Pattern:** Always show all possible outcomes (success, cancellation, pending), not just the happy path.

---

## Example 6: SwiftUI Paywall Presentation

### iOS (SwiftUI)
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
                default:
                    // Handle other actions
                    break
            }
        },
        didFinishPurchase: { product, profile in paywallPresented = false },
        didFailPurchase: { product, error in /* handle the error */ },
        didFinishRestore: { profile in /* check access level and dismiss */  },
        didFailRestore: { error in /* handle the error */ },
        didFailRendering: { error in paywallPresented = false }
    )
}
```

**Pattern Notes:**
- State management with `@State var paywallPresented`
- Inline closures for event handlers
- Comments use `/* */` when inline
- Dismiss paywall on close, purchase success, or rendering failure

---

## Example 7: Event Handler Implementation

### Android (Kotlin)
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

### iOS (Swift - UIKit Delegate)
```swift
func paywallController(
    _ controller: AdaptyPaywallController,
    didFinishPurchase product: AdaptyPaywallProductWithoutDeterminingOffer,
    purchaseResult: AdaptyPurchaseResult
) { }
```

**Pattern Notes:**
- Event handlers often have minimal or no body in examples
- Comments like `{ }` or `{ /* Handle the event */ }`
- Focus is on the signature, not implementation details

---

## Example 8: Subscription Update Parameters

### Android (Kotlin) - Builder Pattern
```kotlin
Adapty.makePurchase(
    activity,
    product,
    AdaptyPurchaseParameters.Builder()
        .withSubscriptionUpdateParams(subscriptionUpdateParams)
        .build()
) { result ->
    when (result) {
        is AdaptyResult.Success -> {
            when (val purchaseResult = result.value) {
                is AdaptyPurchaseResult.Success -> {
                    val profile = purchaseResult.profile
                    // successful cross-grade
                }
                is AdaptyPurchaseResult.UserCanceled -> {
                    // user canceled the purchase flow
                }
                is AdaptyPurchaseResult.Pending -> {
                    // the purchase has not been finished yet, e.g. user will pay offline by cash
                }
            }
        }
        is AdaptyResult.Error -> {
            val error = result.error
            // Handle the error
        }
    }
}
```

### React Native (TypeScript) - Object Parameter Pattern
```typescript
try {
    const purchaseResult = await adapty.makePurchase(product, params);
    // ... handle result
} catch (error) {
    // Handle the error
}
```

Where params structure is:
```typescript
{
    android: {
        subscriptionUpdateParams: {
            oldSubVendorProductId: 'old_product_id',
            prorationMode: 'charge_prorated_price'
        },
        isOfferPersonalized: true
    }
}
```

### KMP (Kotlin) - Multi-step Construction
```kotlin
val subscriptionUpdateParams = AdaptyAndroidSubscriptionUpdateParameters(
    oldSubVendorProductId = "old_subscription_product_id",
    replacementMode = AdaptyAndroidSubscriptionUpdateReplacementMode.CHARGE_FULL_PRICE
)

val purchaseParams = AdaptyPurchaseParameters.Builder()
    .setSubscriptionUpdateParams(subscriptionUpdateParams)
    .build()

Adapty.makePurchase(
    product = product,
    parameters = purchaseParams
).onSuccess { purchaseResult ->
    // handle success
}.onError { error ->
    // Handle the error
}
```

### Unity (C#) - Direct Instantiation
```csharp
var subscriptionUpdateParams = new AdaptySubscriptionUpdateParameters(
    "old_product_id",
    AdaptySubscriptionUpdateReplacementMode.WithTimeProration
);

Adapty.MakePurchase(product, subscriptionUpdateParams, (profile, error) => {
  if(error != null) {
      // Handle the error
      return;
  }
  // successful cross-grade
});
```

**Pattern Notes:**
- Android/KMP use Builder pattern
- React Native/Capacitor use nested object literals
- Unity uses direct constructor
- Always show parameter construction, never assume it exists

---

## Example 9: Error Instance Checking

### React Native (TypeScript)
```typescript
try {
  const params: MakePurchaseParamsInput = {};
  await adapty.makePurchase(product, params);
} catch (error) {
  if (
    error instanceof AdaptyError &&
    error.adaptyCode === getErrorCode(ErrorCode['2'])
  ) {
    // payment cancelled
  }
}
```

**Pattern Note:** Shows specific error type checking, not just generic catch blocks.

---

## Example 10: Configuration with Options

### Flutter (Dart) - Configuration Builder
```dart
await Adapty().activate(
  configuration: AdaptyConfiguration(apiKey: 'YOUR_PUBLIC_SDK_KEY')
    ..withGoogleEnablePendingPrepaidPlans(true),
);
```

### Android (Kotlin) - Configuration Builder
```kotlin
AdaptyConfig.Builder("PUBLIC_SDK_KEY")
    .withEnablePendingPrepaidPlans(true)
    .build()
```

### React Native (TypeScript) - Configuration Object
```typescript
adapty.activate("PUBLIC_SDK_KEY", {
    android: { pendingPrepaidPlansEnabled: true }
});
```

### Capacitor (TypeScript) - Configuration Object
```typescript
await adapty.activate({
  apiKey: 'YOUR_PUBLIC_SDK_KEY',
  params: {
    android: {
        enablePendingPrepaidPlans: true,
    },
  }
});
```

**Pattern Notes:**
- Each platform has its own configuration style
- Builder pattern common in Kotlin-based SDKs
- Object literals in TypeScript-based SDKs
- Flutter uses cascade operator (`..`)

---

## Code Block Formatting Standards

All snippets in our docs follow these formatting rules:

```markdown
```swift showLineNumbers
// code here
\```
```

**Always include:**
- `showLineNumbers` attribute
- Language identifier (swift, kotlin, typescript, dart, csharp)
- Optional `title` attribute when showing file context: `title="Swift"`

**Tab groups for multiple variants:**
```markdown
<Tabs groupId="current-os" queryString>
<TabItem value="kotlin" label="Kotlin" default>
\```kotlin showLineNumbers
// Kotlin code
\```
</TabItem>
<TabItem value="java" label="Java">
\```java showLineNumbers
// Java code
\```
</TabItem>
</Tabs>
```

Common tab patterns:
- Kotlin / Java
- Swift / Swift-Callback
- SwiftUI / UIKit
- Standalone / Embedded (for presentation methods)

---

## Example 11: Multiple Presentation Methods

When SDK offers multiple ways to present content, document them with clear structure:

### Article Introduction
```markdown
Adapty Flutter SDK provides two ways to present onboardings:

- **Standalone screen**
- **Embedded widget**
```

### Minimal Example First
```dart showLineNumbers title="Flutter"
try {
  await onboardingView.present();
} on AdaptyError catch (e) {
  // handle the error
} catch (e) {
  // handle the error
}
```

### Progressive Enhancement
Show optional parameters in separate subsections:

```dart showLineNumbers
try {
  await onboardingView.present(
    iosPresentationStyle: AdaptyUIIOSPresentationStyle.pageSheet
  );
} on AdaptyError catch (e) {
  // handle the error
} catch (e) {
  // handle the error
}
```

### Tabs for Context-Specific Variants
When the same concept applies differently in different contexts:

```markdown
<Tabs>
<TabItem value="standalone" label="Standalone screen" default>

\```dart showLineNumbers title="Flutter"
final onboardingView = await AdaptyUI().createOnboardingView(
  onboarding: onboarding,
  externalUrlsPresentation: AdaptyWebPresentation.externalBrowser,
);

try {
  await onboardingView.present();
} on AdaptyError catch (e) {
  // handle the error
} catch (e) {
  // handle the error
}
\```

</TabItem>
<TabItem value="embedded" label="Embedded widget">

\```dart showLineNumbers title="Flutter"
AdaptyUIOnboardingPlatformView(
  onboarding: onboarding,
  externalUrlsPresentation: AdaptyWebPresentation.externalBrowser,
  onDidFinishLoading: (meta) {
  },
  onDidFailWithError: (error) {
  },
)
\```

</TabItem>
</Tabs>
```

**Pattern Notes:**
- Introduce all methods at the start
- Present simpler method first (standalone before embedded)
- Start minimal, add parameters progressively
- Use tabs when same concept differs by context
- Prefer convenience methods (`.present()` over `AdaptyUI().presentView()`)

---

## Example 12: Convenience Methods

SDK objects often provide convenience methods. Always prefer these in docs:

### ✅ Preferred (Convenience Method)
```dart showLineNumbers
await onboardingView.present();
await onboardingView.dismiss();
```

### ❌ Avoid (Direct Call)
```dart showLineNumbers
await AdaptyUI().presentOnboardingView(onboardingView);
await AdaptyUI().dismissOnboardingView(onboardingView);
```

**Why:** Convenience methods are:
- Cleaner and more intuitive
- What developers naturally expect
- Easier to read and maintain
- Still call the same underlying API

**How to find them:** Check the returned object's class definition in the SDK, not just the main SDK class.

---

## Example 13: Cross-Platform Translation

Often you'll have a snippet in one platform and need to translate it to another. Here's how:

### Source: React Native (TypeScript)
```typescript showLineNumbers title="React Native (TSX)"
try {
  const action = await view.showDialog({
    title: 'Close paywall?',
    content: 'You will lose access to exclusive offers.',
    primaryActionTitle: 'Stay',
    secondaryActionTitle: 'Close',
  });

  if (action === 'secondary') {
    // User confirmed - close the paywall
    await view.dismiss();
  }
  // If primary - do nothing, user stays
} catch (error) {
  // handle error
}
```

### Translation Process:

1. **Check Flutter SDK** for `showDialog` method signature
2. **Identify differences:**
   - RN: returns string `'primary'` or `'secondary'`
   - Flutter: returns enum `AdaptyUIDialogActionType.primary` or `.secondary`
   - RN: object parameter `{ title, content, ... }`
   - Flutter: named parameters `title:`, `content:`, ...
   - RN: single `catch`
   - Flutter: `on AdaptyError catch` then generic `catch`

3. **Apply Flutter patterns:**

### Target: Flutter (Dart)
```dart showLineNumbers title="Flutter"
try {
  final action = await view.showDialog(
    title: 'Close paywall?',
    content: 'You will lose access to exclusive offers.',
    primaryActionTitle: 'Stay',
    secondaryActionTitle: 'Close',
  );

  if (action == AdaptyUIDialogActionType.secondary) {
    // user confirmed - close the paywall
    await view.dismiss();
  }
  // if primary - do nothing, user stays
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
  // handle the error
}
```

### What Changed:
- ✅ **Kept the same:** Example text, logic flow, comment placement
- 🔄 **Translated:** Syntax, type checking, error handling pattern
- ✅ **Verified:** Flutter SDK has `showDialog` with same parameters

### What Stayed Consistent:
- Example scenario ("Close paywall?")
- Parameter values ("Stay", "Close")
- Logic structure (check secondary action, then dismiss)
- Comment style (lowercase, action-oriented)

**Pro tip:** When translating, keep the example text identical across platforms unless there's a platform-specific reason to change it. This helps users who work with multiple platforms recognize the same concepts.

---

## Translation Checklist

When translating a snippet from Platform A to Platform B:

- [ ] Read the source snippet completely
- [ ] Check Platform B's SDK for the equivalent method
- [ ] Verify method signature (parameters, return type)
- [ ] Check for convenience methods on returned objects
- [ ] Apply Platform B's error handling pattern
- [ ] Apply Platform B's syntax (named params, type checking, etc.)
- [ ] Keep the same example text and scenario
- [ ] Keep the same comment style
- [ ] Verify all types exist in Platform B (or find equivalents)
- [ ] Test the logic flow makes sense in Platform B

**Common translation pairs:**
- TypeScript → Dart (React Native/Capacitor → Flutter)
- Kotlin → Swift (Android → iOS, KMP → iOS)
- Swift → Kotlin (iOS → Android/KMP)
- C# → Kotlin/Swift (Unity → Android/iOS)