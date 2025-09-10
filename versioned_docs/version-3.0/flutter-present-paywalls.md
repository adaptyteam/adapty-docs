---
title: "Flutter - Present new Paywall Builder paywalls"
description: "Present paywalls in Flutter apps using Adapty's monetization features."
metadataTitle: "Presenting Paywalls in Flutter | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import SampleApp from '@site/src/components/reusable/SampleApp.md'; 

If you've customized a paywall using the Paywall Builder, you don't need to worry about rendering it in your mobile app code to display it to the user. Such a paywall contains both what should be shown within the paywall and how it should be shown.

:::warning

This guide is for **new Paywall Builder paywalls** only which require SDK v3.2.0 or later. The process for presenting paywalls differs for paywalls designed with different versions of Paywall Builder and remote config paywalls.

- For presenting **Legacy Paywall Builder paywalls**, check out [Flutter - Present legacy Paywall Builder paywalls](flutter-present-paywalls-legacy).
- For presenting **Remote config paywalls**, see [Render paywall designed by remote config](present-remote-config-paywalls).

:::

Adapty Flutter SDK provides two ways to present paywalls:

- **Embedded widget (platform view)**: Embedded component gives you complete control over dismissal through your own UI and logic. 
- **Standalone screen**: Modal presentation.

## Embed in widget hierarchy

:::important
Platform view for paywalls is available starting from Flutter SDK 3.12.
:::

To embed a paywall within your existing widget tree, use the `AdaptyUIPaywallPlatformView` widget directly in your Flutter widget hierarchy. This approach gives you full control over when and how the paywall can be dismissed.

:::note
This approach is ideal for required paywalls, mandatory purchase flows, or any scenario where you need to ensure users complete the paywall interaction before proceeding. You can control dismissal through your own UI elements and logic.
:::

```dart showLineNumbers title="Flutter"
AdaptyUIPaywallPlatformView(
  paywall: paywall, // The paywall object you fetched
  customTags: customTags,
  customTimers: customTimers,
  customAssets: customAssets,
  productPurchaseParams: productPurchaseParams,
  onDidPerformAction: (view, action) {
    // Handle user actions (e.g., close button)
    switch (action) {
      case CloseAction():
        Navigator.of(context).pop();
        break;
      default:
        break;
    }
  },
  // ... other event handlers
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


## Present as standalone screen

To display a paywall as a standalone screen that users can dismiss, use the `view.present()` method on the `view` created by the `createPaywallView` method. Each `view` can only be used once. If you need to display the paywall again, call `createPaywallView` one more time to create a new `view` instance.

:::warning

Reusing the same `view` without recreating it may result in an `AdaptyUIError.viewAlreadyPresented` error.
:::


```dart showLineNumbers title="Flutter"
try {
  await view.present();
} on AdaptyError catch (e) {
  // handle the error
} catch (e) {
  // handle the error
}
```

### Dismiss the paywall

When you need to programmatically close the paywall, use the `dismiss()` method:

```dart showLineNumbers title="Flutter"
try {
  await view.dismiss();
} on AdaptyError catch (e) {
  // handle the error
} catch (e) {
  // handle the error
}
```