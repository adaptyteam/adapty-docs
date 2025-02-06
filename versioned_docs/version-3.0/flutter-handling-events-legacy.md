---
title: "Flutter - Handle paywall events"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Paywalls configured with the [Paywall Builder](adapty-paywall-builder) don't need extra code to make and restore purchases. However, they generate some events that your app can respond to. Those events include button presses (close buttons, URLs, product selections, and so on) as well as notifications on purchase-related actions taken on the paywall. Learn how to respond to these events below.

:::warning

This guide is for **legacy Paywall Builder paywalls** only which require Adapty SDK up to v2.x. For presenting paywalls in Adapty SDK v3.0 or later designed with the new Paywall Builder, see [Flutter - Handle paywall events designed with the new Paywall Builder](flutter-handling-events).

:::

To control or monitor processes occurring on the paywall screen within your mobile app, implement the `AdaptyUIObserver` methods and register the observer before presenting any screen:

```javascript showLineNumbers title="Flutter"
AdaptyUI().addObserver(this);
```

### User-generated events

#### Actions

If a user has performed some action (`close`, `openURL`, `androidSystemBack`, or `custom`, this method will be invoked:

```javascript showLineNumbers title="Flutter"
// You have to install url_launcher plugin in order to handle urls:
// https://pub.dev/packages/url_launcher
import 'package:url_launcher/url_launcher_string.dart'; 

void paywallViewDidPerformAction(AdaptyUIView view, AdaptyUIAction action) {
  switch (action.type) {
    case AdaptyUIActionType.close:
      view.dismiss();
      break;
    case AdaptyUIActionType.openUrl:
      final urlString = action.value;
      if (urlString != null) {
          launchUrlString(urlString);
      }
    default:
      break;
  }
}
```

The following action types are supported:

- `close`
- `openUrl`
- `custom`
- `androidSystemBack`. 

Note that at the very least you need to implement the reactions to both `close` and `openURL`.

For example, if a user taps the close button, the action `close` will occur and you are supposed to dismiss the paywall. Refer to the [Hide Paywall Builder paywalls](hide-paywall-builder-paywalls) topic for details on dismissing a paywall screen.  
Note that `AdaptyUIAction` has optional value property: look at this in the case of `openUrl` and `custom`.

> 💡 Login Action
> 
> If you have configured Login Action in the dashboard, you should implement reaction for `custom` action with value `"login"`

#### Product selection

If a product is selected for purchase (by a user or by the system), this method will be invoked:

```javascript showLineNumbers title="Flutter"
void paywallViewDidSelectProduct(AdaptyUIView view, AdaptyPaywallProduct product) {
}
```

#### Started purchase

If a user initiates the purchase process, this method will be invoked:

```javascript showLineNumbers title="Flutter"
void paywallViewDidStartPurchase(AdaptyUIView view, AdaptyPaywallProduct product) {
}
```

#### Canceled purchase

If a user initiates the purchase process but manually interrupts it, the function below will be invoked. Basically, this event occurs when the `Adapty.makePurchase()` function completes with the `.paymentCancelled` error:

```javascript showLineNumbers title="Flutter"
void paywallViewDidCancelPurchase(AdaptyUIView view, AdaptyPaywallProduct product) {
}
```

#### Successful purchase

If `Adapty.makePurchase()` succeeds, this method will be invoked:

```javascript showLineNumbers title="Flutter"
void paywallViewDidFinishPurchase(AdaptyUIView view, 
                                  AdaptyPaywallProduct product, 
                                  AdaptyProfile profile) {
}
```

We recommend dismissing the screen in that case. Refer to the [Hide Paywall Builder paywalls](hide-paywall-builder-paywalls) for details on dismissing a paywall screen.

#### Failed purchase

If `Adapty.makePurchase()` fails, this method will be invoked:

```javascript showLineNumbers title="Flutter"
void paywallViewDidFailPurchase(AdaptyUIView view, 
                                AdaptyPaywallProduct product, 
                                AdaptyError error) {
}
```

#### Successful restore

If `Adapty.restorePurchases()` succeeds, this method will be invoked:

```javascript showLineNumbers title="Flutter"
void paywallViewDidFinishRestore(AdaptyUIView view, AdaptyProfile profile) {
}
```

We recommend dismissing the screen if the user has the required `accessLevel`. Refer to the [Subscription status](subscription-status) topic to learn how to check it and to [Hide Paywall Builder paywalls](hide-paywall-builder-paywalls) topic to learn how to dismiss a paywall screen.

#### Failed restore

If `Adapty.restorePurchases()` fails, this method will be invoked:

```javascript showLineNumbers title="Flutter"
void paywallViewDidFailRestore(AdaptyUIView view, AdaptyError error) {
}
```

### Data fetching and rendering

#### Product loading errors

If you don't pass the product array during the initialization, AdaptyUI will retrieve the necessary objects from the server by itself. If this operation fails, AdaptyUI will report the error by invoking this method:

```javascript showLineNumbers title="Flutter"
void paywallViewDidFailLoadingProducts(AdaptyUIView view, AdaptyIOSProductsFetchPolicy? fetchPolicy, AdaptyError error) {
}
```

#### Rendering errors

If an error occurs during the interface rendering, it will be reported by calling this method:

```javascript showLineNumbers title="Flutter"
void paywallViewDidFailRendering(AdaptyUIView view, AdaptyError error) {
}
```

In a normal situation, such errors should not occur, so if you come across one, please let us know.