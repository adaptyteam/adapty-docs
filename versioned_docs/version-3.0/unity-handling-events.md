---
title: "Unity - Handle paywall events"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Paywalls configured with the [Paywall Builder](adapty-paywall-builder) don't need extra code to make and restore purchases. However, they generate some events that your app can respond to. Those events include button presses (close buttons, URLs, product selections, and so on) as well as notifications on purchase-related actions taken on the paywall. Learn how to respond to these events below.

To control or monitor processes occurring on the paywall screen within your mobile app, implement the `AdaptyUIEventListener` methods and register the observer before presenting any screen:

```csharp title="Unity"
AdaptyUI.SetEventListener(this);
```

### User-generated events

#### Actions

If a user has performed some action, this method will be invoked:

```csharp title="Unity"
public void OnPerformAction(AdaptyUI.View view, AdaptyUI.Action action) {
  switch (action.Type) {
    case AdaptyUI.ActionType.Close:
      view.Dismiss(null);
      break;
    case AdaptyUI.ActionType.OpenUrl:
      var urlString = action.Value;
      if (urlString != null {
      	Application.OpenURL(urlString); 
      }
    default:
      // handle other events
      break;
  }
}
```

The following action types are supported:

- `Close`
- `OpenUrl`
- `Custom`
- `AndroidSystemBack`. 

 At the very least you need to implement the reactions to both `close` and `openURL`.

For example, if a user taps the close button, the action `Close` will occur and you are supposed to dismiss the paywall.  
Note that `AdaptyUI.Action` has optional value property: look at this in the case of `OpenUrl` and `Custom`.

> 💡 Login Action
> 
> If you have configured Login Action in the dashboard, you should implement reaction for `Custom` action with value `"login"`

#### Product selection

If a product was selected for purchase (by a user or by the system), this method will be invoked.

```csharp title="Unity"
public void OnSelectProduct(AdaptyUI.View view, Adapty.PaywallProduct product) {
}
```

#### Started purchase

If a user initiates the purchase process, this method will be invoked.

```csharp title="Unity"
public void OnStartPurchase(AdaptyUI.View view, Adapty.PaywallProduct product) {
}
```

#### Canceled purchase

If a user initiates the purchase process but manually interrupts it, this method will be invoked. This event occurs when the `Adapty.MakePurchase()` function completes with a `.paymentCancelled` error:

```csharp title="Unity"
public void OnCancelPurchase(AdaptyUI.View view, Adapty.PaywallProduct product) {
}
```

#### Successful purchase

If `Adapty.MakePurchase()` succeeds, this method will be invoked:

```csharp title="Unity"
public void OnFinishPurchase(AdaptyUI.View view, 
                             Adapty.PaywallProduct product, 
                             Adapty.Profile profile) {
}
```

We recommend dismissing the screen in that case.

#### Failed purchase

If `Adapty.MakePurchase()` fails, this method will be invoked:

```csharp title="Unity"
public void OnFailPurchase(AdaptyUI.View view, 
                           Adapty.PaywallProduct product, 
                           Adapty.Error error) {
}
```

#### Successful restore

If `Adapty.RestorePurchases()` succeeds, this method will be invoked:

```csharp title="Unity"
public void OnFinishRestore(AdaptyUI.View view, Adapty.Profile profile) {
}
```

We recommend dismissing the screen if the user has the required `accessLevel`. Refer to the [Subscription status](subscription-status) topic to learn how to check it.

#### Failed restore

If `Adapty.RestorePurchases()` fails, this method will be invoked:

```csharp title="Unity"
public void OnFailRestore(AdaptyUI.View view, Adapty.Error error) {
}
```

### Data fetching and rendering

#### Product loading errors

If you didn't pass the product array during initialization, AdaptyUI will retrieve the necessary objects from the server by itself. In this case, this operation may fail, and AdaptyUI will report the error by invoking this method:

```csharp title="Unity"
public void OnFailLoadingProducts(AdaptyUI.View view, Adapty.Error error) {
}
```

#### Rendering errors

If an error occurs during the interface rendering, it will be reported by calling this method:

```csharp title="Unity"
public void OnFailRendering(AdaptyUI.View view, Adapty.Error error) {
}
```

In a normal situation, such errors should not occur, so if you come across one, please let us know.