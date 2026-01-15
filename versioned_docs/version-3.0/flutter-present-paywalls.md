---
title: "Flutter - Present new Paywall Builder paywalls"
description: "Present paywalls in Flutter apps using Adapty’s monetization features."
metadataTitle: "Presenting Paywalls in Flutter | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import SampleApp from '@site/src/components/reusable/SampleApp.md'; 

If you've customized a paywall using the Paywall Builder, you don't need to worry about rendering it in your mobile app code to display it to the user. Such a paywall contains both what should be shown within the paywall and how it should be shown.

:::warning

This guide is for **new Paywall Builder paywalls** only which require SDK v3.2.0 or later. The process for presenting paywalls differs for paywalls designed with different versions of Paywall Builde and remote config paywalls.

- For presenting **Legacy Paywall Builder paywalls**, check out [Flutter - Present legacy Paywall Builder paywalls](flutter-present-paywalls-legacy).
- For presenting **Remote config paywalls**, see [Render paywall designed by remote config](present-remote-config-paywalls).

:::

Adapty Flutter SDK provides two ways to present paywalls:

- **Standalone screen**

- **Embedded widget**


## Present as standalone screen

To display a paywall as a standalone screen, use the `view.present()` method on the `view` created by the `createPaywallView` method. Each `view` can only be used once. If you need to display the paywall again, call `createPaywallView` one more time to create a new `view` instance. 

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
<SampleApp />

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

### Show dialog

Use this method instead of native alert dialogs when a paywall view is presented on Android. On Android, regular alerts appear behind the paywall view, which makes them invisible to users. This method ensures proper dialog presentation above the paywall on all platforms.

```dart showLineNumbers title="Flutter"
try {
  final action = await view.showDialog(
    title: 'Close paywall?',
    content: 'You will lose access to exclusive offers.',
    primaryActionTitle: 'Stay',
    secondaryActionTitle: 'Close',
  );
  
  if (action == AdaptyUIDialogActionType.secondary) {
    // User confirmed - close the paywall
    await view.dismiss();
  }
  // If primary - do nothing, user stays
} catch (e) {
  // handle error
}
```

### Configure iOS presentation style

Configure how the paywall is presented on iOS by passing the `iosPresentationStyle` parameter to the `present()` method. The parameter accepts `AdaptyUIIOSPresentationStyle.fullScreen` (default) or `AdaptyUIIOSPresentationStyle.pageSheet` values.

```dart showLineNumbers
try {
  await view.present(iosPresentationStyle: AdaptyUIIOSPresentationStyle.pageSheet);
} on AdaptyError catch (e) {
  // handle the error
} catch (e) {
  // handle the error
}
```


## Embed in widget hierarchy

To embed a paywall within your existing widget tree, use the `AdaptyUIPaywallPlatformView` widget directly in your Flutter widget hierarchy.

```dart showLineNumbers title="Flutter"
AdaptyUIPaywallPlatformView(
  paywall: paywall, // The paywall object you fetched
  onDidAppear: (view) {
  },
  onDidDisappear: (view) {
  },
  onDidPerformAction: (view, action) {
  },
  onDidSelectProduct: (view, productId) {
  },
  onDidStartPurchase: (view, product) {
  },
  onDidFinishPurchase: (view, product, purchaseResult) {
  },
  onDidFailPurchase: (view, product, error) {
  },
  onDidStartRestore: (view) {
  },
  onDidFinishRestore: (view, profile) {
  },
  onDidFailRestore: (view, error) {
  },
  onDidFailRendering: (view, error) {
  },
  onDidFailLoadingProducts: (view, error) {
  },
  onDidFinishWebPaymentNavigation: (view, product, error) {
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
