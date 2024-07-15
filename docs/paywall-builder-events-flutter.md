---
title: "Flutter – Handling events"
description: ""
metadataTitle: ""
---

If you need to control or monitor the processes that take place on the purchase screen, you need to implement the `AdaptyUIObserver` methods and register the observer before presenting any screen:

```javascript Flutter
AdaptyUI().addObserver(this);
```

### User generated events

#### Actions

If user has performed some action, this method will be invoked:

```javascript Flutter

void paywallViewDidPerformAction(AdaptyUIView view, AdaptyUIAction action) {
  switch (action.type) {
    case AdaptyUIActionType.close:
      view.dismiss();
      break;
    default:
      break;
  }
}
```

At the moment there are four types of actions supported: `close`, `openUrl`, `custom` and `androidSystemBack`. For example, if user presses the close button, the action `close` will occur and you are supposed to dismiss the paywall.  
Note that `AdaptyUIAction` has optional value property: look at this in case of `openUrl` and `custom`

> 💡 Login Action
> 
> If you have configured Login Action in the dashboard, you should implement reaction for `custom` action with value `"login"`

#### Product selection

If product was selected for purchase (by user or by system), this method will be invoked.

```javascript Flutter
void paywallViewDidSelectProduct(AdaptyUIView view, AdaptyPaywallProduct product) {
}
```

#### Started purchase

If user initiates the purchase process, this method will be invoked.

```javascript Flutter
void paywallViewDidStartPurchase(AdaptyUIView view, AdaptyPaywallProduct product) {
}
```

#### Canceled purchase

If the user initiates the purchase process but manually interrupts it, this function will be called. Basically, this event occurs when the `Adapty.makePurchase()` function completes with a `.paymentCancelled` error:

```javascript Flutter
void paywallViewDidCancelPurchase(AdaptyUIView view, AdaptyPaywallProduct product) {
}
```

#### Successful purchase

If `Adapty.makePurchase()` succeeds, this method will be invoked:

```javascript Flutter
void paywallViewDidFinishPurchase(AdaptyUIView view, 
                                  AdaptyPaywallProduct product, 
                                  AdaptyProfile profile) {
}
```

We recommend to dismiss the screen in that case.

#### Failed purchase

If `Adapty.makePurchase()` fails, this method will be invoked:

```javascript Flutter
void paywallViewDidFailPurchase(AdaptyUIView view, 
                                AdaptyPaywallProduct product, 
                                AdaptyError error) {
}
```

#### Successful restore

If `Adapty.restorePurchases()` succeeds, this method will be invoked:

```javascript Flutter
void paywallViewDidFinishRestore(AdaptyUIView view, AdaptyProfile profile) {
}
```

We recommend to dismiss the screen if the user [has](subscription-status) the required `accessLevel`.

#### Failed restore

If `Adapty.restorePurchases()` fails, this method will be invoked:

```javascript Flutter
void paywallViewDidFailRestore(AdaptyUIView view, AdaptyError error) {
}
```

### Data fetching and rendering

#### Products loading errors

If you didn't pass the product array during initialization, AdaptyUI will retrieve the necessary objects from the server by itself. In this case, this operation may fail, and AdaptyUI will report the error by invoking this method:

```javascript Flutter
void paywallViewDidFailLoadingProducts(AdaptyUIView view, AdaptyIOSProductsFetchPolicy? fetchPolicy, AdaptyError error) {
}
```

#### Rendering errors

If an error occurs during the interface rendering, it will be reported by calling this method:

```javascript Flutter
void paywallViewDidFailRendering(AdaptyUIView view, AdaptyError error) {
}
```

In a normal situation such errors should not occur, so if you come across one, please let us know about it.