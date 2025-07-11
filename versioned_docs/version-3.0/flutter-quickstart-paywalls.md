---
title: "Display paywalls"
description: "Quickstart guide to setting up Adapty for in-app subscription management."
metadataTitle: "Adapty Quickstart Guide | Adapty Docs"
keywords: ['install sdk', 'sdk install', 'install sdk flutter']
rank: 70
displayed_sidebar: sdkflutter
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import PaywallsIntro from '@site/src/components/reusable/PaywallsIntro.md';


<PaywallsIntro />

:::tip
This is the minimum setup you need to get up and running with paywalls created using the builder. Read more detailed [guides on working with paywalls](react-native-paywalls.md).
:::

## 1. Get the paywall

Your paywalls are associated with [placements](placements.md) configured in the dashboard. Placements allow you to run different paywalls for different audiences or run [A/B tests](ab-tests.md).

That's why, to get a paywall to display, you need to:

1. Get the `paywall` object by the placement ID using the `getPaywall` method and check whether it is a paywall created in the builder using the `hasViewConfiguration` property.

2. If it is a paywall created in the builder, create its view using the `createPaywallView` method. View contains the UI elements and styling needed to display the paywall.

:::tip
This quickstart provides the minimum configuration required to display a paywall. For advanced configuration details, see our [guide on getting paywalls](flutter-get-pb-paywalls).
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

:::tip
For more details on how to display a paywall, see our [guide](flutter-present-paywalls.md).
:::

To display a paywall, use the `view.present()` method on the `view` created by the `createPaywallView` method. Each `view` can only be used once. If you need to display the paywall again, call `createPaywallView` one more to create a new `view` instance.

```dart showLineNumbers title="Flutter"
try {
  await view.present();
} on AdaptyError catch (e) {
  // handle the error
} catch (e) {
  // handle the error
}
```

:::info
If you are not using the paywall builder for your paywalls, consider our [guide for implementing paywalls manually](flutter-implement-paywalls-manually).
:::


## 3. Check subscription status before displaying

Now, you have implemented a paywall, but we want to show it only to users without the premium access. Before showing a paywall, check if the user already has premium access.

You need to get their profile using the `getProfile` method and check the access levels in the `profile` object.

By default, Adapty has the built-in `premium` access level, but you can [set up your own access levels](access-level.md) in the Adapty dashboard.

:::tip
Proceed with the quickstart guide to also [implement listening for subscription status changes](flutter-check-subscription-status).
:::

```dart showLineNumbers title="Flutter"
try {
  final profile = await Adapty().getProfile();
  final isPremiumActive = profile.accessLevels['premium']?.isActive == true;

  if (!isPremiumActive) {
    await view.present();
  }
} catch (_) {
  // handle error
}

```

## 4. Handle button actions

When users click buttons in the paywall, purchases and restoration are handled automatically. However, other buttons have custom or pre-defined IDs and require handling actions in your code.

To control or monitor processes on the paywall screen, implement the `AdaptyUIPaywallsEventsObserver` methods and set the observer before presenting any screen. If a user has performed some action, te `paywallViewDidPerformAction` will be invoked, and your app needs to respond depending on the action ID.

For example, your paywall probably has a close button. So, you need to respond to actions with the `Close` ID.

:::tip
Read our [guide](flutter-handling-events) on how to handle other button actions and events.
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
    if (action is CloseAction) {
      view.dismiss();
    }
  }
}

```

## Full example


```dart
import 'package:flutter/material.dart';
import 'package:adapty_flutter/adapty_flutter.dart';
import 'package:adapty_flutter/models/adapty_ui_action.dart';

void main() async {
  runApp(MaterialApp(home: PaywallScreen()));
}

class PaywallScreen extends StatefulWidget {
  @override
  State<PaywallScreen> createState() => _PaywallScreenState();
}

class _PaywallScreenState extends State<PaywallScreen> {
  @override
  void initState() {
    super.initState();
    AdaptyUI().setPaywallsEventsObserver(_handleAction);
    _showPaywallIfNeeded();
  }

  Future<void> _showPaywallIfNeeded() async {
    try {
      final profile = await Adapty().getProfile();

      if (profile.accessLevels['premium']?.isActive == true) return;

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

  void _handleAction(AdaptyUIPaywallView view, AdaptyUIAction action) {
    if (action is CloseAction) {
      view.dismiss();
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