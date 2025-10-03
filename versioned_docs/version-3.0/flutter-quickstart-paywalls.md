---
title: "Enable purchases by using paywalls in Flutter SDK"
description: "Quickstart guide to setting up Adapty for in-app subscription management."
metadataTitle: "Adapty Quickstart Guide | Adapty Docs"
keywords: [ 'paywall', 'paywall builder', 'getPaywall']
rank: 70
displayed_sidebar: sdkflutter
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import PaywallsIntro from '@site/src/components/reusable/PaywallsIntro.md';

To enable in-app purchases, you need to understand three key concepts:

- [**Products**](product.md) – anything users can buy (subscriptions, consumables, lifetime access)
- [**Paywalls**](paywalls.md) are configurations that define which products to offer. In Adapty, paywalls are the only way to retrieve products, but this design lets you modify offerings, pricing, and product combinations without touching your app code.
- [**Placements**](placements.md) – where and when you show paywalls in your app (like `main`, `onboarding`, `settings`). You set up paywalls for placements in the dashboard, then request them by placement ID in your code. This makes it easy to run A/B tests and show different paywalls to different users.

Adapty offers you three ways to enable purchases in your app. Select one of them depending on your app requirements:

| Implementation         | Complexity | When to use                                                                                                                                                                                                                                |
|------------------------|------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Adapty Paywall Builder | ✅ Easy     | You [create a complete, purchase-ready paywall in the no-code builder](quickstart-paywalls). Adapty automatically renders it and handles all the complex purchase flow, receipt validation, and subscription management behind the scenes. |
| Manually created paywalls | 🟡 Medium  | You implement your paywall UI in your app code, but still get the paywall object from Adapty to maintain flexibility in product offerings. See the [guide](flutter-making-purchases).                                                      |
| Observer mode              | 🔴 Hard    | You already have your own purchase handling infrastructure and want to keep using it. Note that the observer mode has its limitations in Adapty. See the [article](observer-vs-full-mode).                                                 |

:::important
**The steps below show how to implement a paywall created in the Adapty paywall builder.**

If you don't want to use the paywall builder, see the [guide for handling purchases in manually created paywalls](flutter-making-purchases.md).
:::

To display a paywall created in the Adapty paywall builder, in your app code, you only need to:

1. **Get the paywall**: Get the paywall from Adapty.
2. **Display the paywall and Adapty will handle purchases for you**: Show the paywall container you've got in your app.
3. **Handle button actions**: Associate user interactions with the paywall with your app's response to them. For example, open links or close the paywall when users click buttons.

## 1. Get the paywall

Your paywalls are associated with placements configured in the dashboard. Placements allow you to run different paywalls for different audiences or to run [A/B tests](ab-tests.md).

To get a paywall created in the Adapty paywall builder, you need to:

1. Get the `paywall` object by the [placement](placements.md) ID using the `getPaywall` method and check whether it is a paywall created in the builder using the `hasViewConfiguration` property.

2. Create the paywall view using the `createPaywallView` method. The view contains the UI elements and styling needed to display the paywall.

:::important
To get the view configuration, you must switch on the **Show on device** toggle in the Paywall Builder. Otherwise, you will get an empty view configuration, and the paywall won't be displayed.
:::

```dart showLineNumbers
import 'package:adapty_flutter/adapty_flutter.dart';

try {
  final paywall = await Adapty().getPaywall(placementId: "YOUR_PLACEMENT_ID", locale: "en");
  // the requested paywall
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}

try {
  final view = await AdaptyUI().createPaywallView(
        paywall: paywall,
      );
} on AdaptyError catch (e) {
  // handle the error
} catch (e) {
  // handle the error
}
```

## 2. Display the paywall

Now, when you have the paywall configuration, it's enough to add a few lines to display your paywall.

To display the paywall, use the `view.present()` method on the `view` created by the `createPaywallView` method. Each `view` can only be used once. If you need to display the paywall again, call `createPaywallView` one more to create a new `view` instance.

```dart showLineNumbers title="Flutter"
try {
  await view.present();
} on AdaptyError catch (e) {
  // handle the error
} catch (e) {
  // handle the error
}
```

:::tip
For more details on how to display a paywall, see our [guide](flutter-present-paywalls.md).
:::

## 3. Handle button actions

When users click buttons in the paywall, the Flutter SDK automatically handles purchases and restoration. However, other buttons have custom or pre-defined IDs and require handling actions in your code.

To control or monitor processes on the paywall screen, implement the `AdaptyUIPaywallsEventsObserver` methods and set the observer before presenting any screen. If a user has performed some action, te `paywallViewDidPerformAction` will be invoked, and your app needs to respond depending on the action ID.

For example, your paywall probably has a close button and URLs to open (e.g., terms of use and privacy policy). So, you need to respond to actions with the `Close` and `OpenUrl` IDs.

:::tip
Read our guides on how to handle button [actions](flutter-handle-paywall-actions.md) and [events](flutter-handling-events.md).
:::

```dart showLineNumbers title="Flutter"
class _PaywallScreenState extends State<PaywallScreen> implements AdaptyUIPaywallsEventsObserver {
  @override
  void initState() {
    super.initState();
    // Register this class as the paywalls event observer
    AdaptyUI().setPaywallsEventsObserver(this);
  }

  // This method is called when user performs an action on the paywall UI
  @override
  void paywallViewDidPerformAction(AdaptyUIPaywallView view, AdaptyUIAction action) {
    switch (action) {
      case const CloseAction():
      case const AndroidSystemBackAction():
        view.dismiss();
        break;
      case OpenUrlAction(url: final url):
        // Open the URL using url_launcher package
        _launchUrl(url);
        break;
    }
  }

  // Helper method to launch URLs
  Future<void> _launchUrl(String url) async {
    try {
      final Uri uri = Uri.parse(url);
      if (await canLaunchUrl(uri)) {
        await launchUrl(uri, mode: LaunchMode.externalApplication);
      } else {
        // Handle case where URL cannot be launched
        print('Could not launch $url');
      }
    } catch (e) {
      // Handle any errors
      print('Error launching URL: $e');
    }
  }
}

```

## Next steps

Your paywall is ready to be displayed in the app.

Now, you need to [check the users' access level](flutter-check-subscription-status.md) to ensure you display a paywall or give access to paid features to right users.

## Full example

Here is how all those steps can be integrated in your app together.

```dart
import 'package:flutter/material.dart';
import 'package:adapty_flutter/adapty_flutter.dart';
import 'package:url_launcher/url_launcher.dart';

void main() async {
  runApp(MaterialApp(home: PaywallScreen()));
}

class PaywallScreen extends StatefulWidget {
  @override
  State<PaywallScreen> createState() => _PaywallScreenState();
}

class _PaywallScreenState extends State<PaywallScreen> implements AdaptyUIPaywallsEventsObserver {
  @override
  void initState() {
    super.initState();
    // Register this class as the paywalls event observer
    AdaptyUI().setPaywallsEventsObserver(this);
    _showPaywallIfNeeded();
  }

  Future<void> _showPaywallIfNeeded() async {
    try {

      final paywall = await Adapty().getPaywall(
        placementId: 'YOUR_PLACEMENT_ID',
      );

      if (!paywall.hasViewConfiguration) return;

      final view = await AdaptyUI().createPaywallView(paywall: paywall);

      await view.present();
    } catch (_) {
      // Handle any errors (network, SDK issues, etc.)
    }
  }

  // This method is called when user performs an action on the paywall UI
  @override
  void paywallViewDidPerformAction(AdaptyUIPaywallView view, AdaptyUIAction action) {
    switch (action) {
      case const CloseAction():
      case const AndroidSystemBackAction():
        view.dismiss();
        break;
      case OpenUrlAction(url: final url):
        // Open the URL using url_launcher package
        _launchUrl(url);
        break;
    }
  }

  // Helper method to launch URLs
  Future<void> _launchUrl(String url) async {
    try {
      final Uri uri = Uri.parse(url);
      if (await canLaunchUrl(uri)) {
        await launchUrl(uri, mode: LaunchMode.externalApplication);
      } else {
        // Handle case where URL cannot be launched
        print('Could not launch $url');
      }
    } catch (e) {
      // Handle any errors
      print('Error launching URL: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Adapty Paywall Example')),
      body: Center(
        // Add a button to re-trigger the paywall for testing purposes
        child: ElevatedButton(
          onPressed: _showPaywallIfNeeded,
          child: Text('Show Paywall'),
        ),
      ),
    );
  }
}

```