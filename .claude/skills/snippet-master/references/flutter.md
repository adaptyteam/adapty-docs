# Flutter (Dart) Snippets

## Error Handling Pattern

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

## Best Practices
- Use `final` for variables (prefer over `var`)
- Use `await` for async operations
- Catch specific error types with `on AdaptyError`
- Always include a generic catch block after the specific one
- Use camelCase for variables

## Common Patterns

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

## Pattern Matching (Sealed Classes)

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

Key patterns:
- Pattern matching with destructuring: `(profile: final profile)`
- Empty constructors: `AdaptyPurchaseResultPending()`
- Always include `default` case

## Cascade Operator

Use `..` for fluent configuration:

```dart
configuration: AdaptyConfiguration(apiKey: 'YOUR_PUBLIC_SDK_KEY')
  ..withGoogleEnablePendingPrepaidPlans(true)
```

## Convenience Methods

SDK objects provide convenience methods — always prefer these over direct calls:

```dart
// ✅ Preferred
await onboardingView.present();
await onboardingView.dismiss();

// ❌ Avoid
await AdaptyUI().presentOnboardingView(onboardingView);
await AdaptyUI().dismissOnboardingView(onboardingView);
```

How to find them: check the returned object's class definition in the SDK, not just the main SDK class.

## Examples

### Get Profile
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

### Purchase with All Result Types
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

### Configuration with Cascade
```dart
await Adapty().activate(
  configuration: AdaptyConfiguration(apiKey: 'YOUR_PUBLIC_SDK_KEY')
    ..withGoogleEnablePendingPrepaidPlans(true),
);
```

### Multiple Presentation Methods

When the SDK offers multiple ways to present content, introduce all at the start:

```markdown
Adapty Flutter SDK provides two ways to present onboardings:
- **Standalone screen**
- **Embedded widget**
```

Minimal example first, then progressive enhancement with optional parameters:

```dart showLineNumbers title="Flutter"
// Minimal
try {
  await onboardingView.present();
} on AdaptyError catch (e) {
  // handle the error
} catch (e) {
  // handle the error
}

// With optional parameter
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

### Translation Example (from React Native)

Source (React Native):
```typescript showLineNumbers title="React Native (TSX)"
try {
  const action = await view.showDialog({
    title: 'Close paywall?',
    content: 'You will lose access to exclusive offers.',
    primaryActionTitle: 'Stay',
    secondaryActionTitle: 'Close',
  });

  if (action === 'secondary') {
    await view.dismiss();
  }
} catch (error) {
  // handle error
}
```

Target (Flutter):
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

Key differences from RN: enum type check instead of string comparison; named parameters; `on AdaptyError` handler.
