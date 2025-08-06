---
title: "Show paywalls and enable purchases in Flutter SDK"
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

:::info
If you are not using the paywall builder for your paywalls, consider our [guide for implementing paywalls manually](flutter-implement-paywalls-manually).
:::

## 1. Get the paywall

Your paywalls are associated with [placements](placements.md) configured in the dashboard. Placements allow you to run different paywalls for different audiences or to run [A/B tests](ab-tests.md).

That's why, to get a paywall to display, you need to:

1. Get the `paywall` object by the placement ID using the `getPaywall` method and check whether it is a paywall created in the builder using the `hasViewConfiguration` property.

2. If it is a paywall created in the builder, create its view using the `createPaywallView` method. The view contains the UI elements and styling needed to display the paywall.

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

When users click buttons in the paywall, purchases and restoration are handled automatically. However, other buttons have custom or pre-defined IDs and require handling actions in your code.

To control or monitor processes on the paywall screen, implement the `AdaptyUIPaywallsEventsObserver` methods and set the observer before presenting any screen. If a user has performed some action, te `paywallViewDidPerformAction` will be invoked, and your app needs to respond depending on the action ID.

For example, your paywall probably has a close button and URLs to open (e.g., terms of use and privacy policy). So, you need to respond to actions with the `Close` and `OpenUrl` IDs.


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

:::tip
Read our guides on how to handle other button [actions](flutter-handle-paywall-actions.md) and [events](flutter-handling-events.md).
:::

## Next steps

Now, your paywall is ready to be displayed in the app.

As a next step, you need to [learn how to work with user profiles](flutter-quickstart-identify.md) to ensure they can access what they have paid for.

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