---
title: "Present onboardings in Flutter SDK"
description: "Learn how to present onboardings effectively to drive more conversions."
metadataTitle: "Presenting onboardings | Adapty Docs"
displayed_sidebar: sdkflutter
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

If you've customized an onboarding using the builder, you don't need to worry about rendering it in your Flutter app code to display it to the user. Such an onboarding contains both what should be shown within the onboarding and how it should be shown.

Before you start, ensure that:

1. You have installed [Adapty Flutter SDK](sdk-installation-flutter.md) 3.8.0 or later.
2. You have [created an onboarding](create-onboarding.md).
3. You have added the onboarding to a [placement](placements.md).

Adapty Flutter SDK provides two ways to present onboardings:

- **Standalone screen**: Modal presentation that can be dismissed by users through native platform gestures (swipe, back button). Best for optional onboardings where users should be able to skip or dismiss the content.

- **Embedded widget (platform view)**: Embedded component gives you complete control over dismissal through your own UI and logic. Ideal for required onboardings where you want to ensure users complete the flow before proceeding.


## Present as standalone screen

To display an onboarding as a standalone screen that users can dismiss, use the `onboardingView.present()` method on the `onboardingView` created by the `createOnboardingView` method. Each `view` can only be used once. If you need to display the onboarding again, call `createOnboardingView` one more time to create a new `onboardingView` instance.

:::warning
Reusing the same `onboardingView` without recreating it may result in an `AdaptyUIError.viewAlreadyPresented` error.
:::

:::note
This approach is best for optional onboardings where users should have the freedom to dismiss the screen using native gestures (swipe down on iOS, back button on Android). To have more customization options, [embed it in the component hierarchy](#embed-in-widget-hierarchy).
:::

```javascript showLineNumbers title="Flutter"
try {
  await onboardingView.present();
} on AdaptyError catch (e) {
  // handle the error
} catch (e) {
  // handle the error
}
```

### Dismiss the onboarding

When you need to programmatically close the onboarding, use the `dismiss()` method:

```dart showLineNumbers title="Flutter"
try {
  await onboardingView.dismiss();
} on AdaptyError catch (e) {
  // handle the error
} catch (e) {
  // handle the error
}
```


## Embed in widget hierarchy

To embed an onboarding within your existing widget tree, use the `AdaptyUIOnboardingPlatformView` widget directly in your Flutter widget hierarchy. This approach gives you full control over when and how the onboarding can be dismissed.

:::note
This approach is ideal for required onboardings, mandatory tutorials, or any flow where you need to ensure users complete the onboarding before proceeding. You can control dismissal through your own UI elements and logic.
:::

```javascript showLineNumbers title="Flutter"
AdaptyUIOnboardingPlatformView(
  onboarding: onboarding, // The onboarding object you fetched
  onDidFinishLoading: (meta) {
  },
  onDidFailWithError: (error) {
  },
  onCloseAction: (meta, actionId) {
  },
  onPaywallAction: (meta, actionId) {
  },
  onCustomAction: (meta, actionId) {
  },
  onStateUpdatedAction: (meta, elementId, params) {
  },
  onAnalyticsEvent: (meta, event) {
  },
)
```

:::note 
For Android platform view to work, ensure your `MainActivity` extends `FlutterFragmentActivity`:

```kotlin showLineNumbers title="Kotlin"
class MainActivity : FlutterFragmentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }
}
```
:::

## Loader during onboarding

By default, between the splash screen and onboarding, you will see the loading screen until the onboarding is fully loaded. However, if you want to make the transition smoother, you can override this in your Flutter app:

- To customize the native loader on iOS, add `AdaptyOnboardingPlaceholderView.xib` to your Xcode project.
- For full control, overlay your own widget above `AdaptyUIOnboardingPlatformView` and hide it on `onDidFinishLoading`.
- To customize the native loader on Android, create `adapty_onboarding_placeholder_view.xml` in `res/layout` and define a placeholder there.

This helps create seamless transitions and custom loading experiences.
