---
title: "Android - Present Paywall Builder paywalls in Observer mode"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Details from '@site/src/components/Details';

If you've customized a paywall using the Paywall Builder, you don't need to worry about rendering it in your mobile app code to display it to the user. Such a paywall contains both what should be shown within the paywall and how it should be shown.

:::note
This section refers to [Observer mode](observer-vs-full-mode) only. If you do not work in Observer mode, refer to the [Android - Present Paywall Builder paywalls](android-present-paywalls) topic instead.
:::

<details>
   <summary>Before you start presenting paywalls (Click to Expand)</summary>

   1. Set up initial integration of Adapty [with the Google Play](initial-android) and [with the App Store](initial_ios). 
2. Install and configure Adapty SDK. Make sure to set the `observerMode` parameter to `true`. Refer to our framework-specific instructions [for iOS](sdk-installation-ios#configure-adapty-sdk), [for Android](sdk-installation-android), [for Flutter](sdk-installation-flutter#configure-adapty-sdks-for-ios), [for React Native](sdk-installation-reactnative#configure-adapty-sdks), and [for Unity](sdk-installation-unity#initiate-adapty-unity-plugin-on-ios).
3. [Create products](create-product) in the Adapty Dashboard.
4. [Configure paywalls, assign products to them](create-paywall), and customize them using Paywall Builder in the Adapty Dashboard.
5. [Create placements and assign your paywalls to them](create-placement) in the Adapty Dashboard.
6. [Fetch Paywall Builder paywalls and their configuration](get-pb-paywalls) in your mobile app code.
</details>

1. Implement the `AdaptyUiObserverModeHandler`. The `AdaptyUiObserverModeHandler`'s callback (`onPurchaseInitiated`) informs you when the user initiates a purchase. You can trigger your custom purchase flow in response to this callback like this:

<Tabs>
<TabItem value="kotlin" label="Kotlin" default>
   ```kotlin 
   val observerModeHandler =
   AdaptyUiObserverModeHandler { product, paywall, paywallView, onStartPurchase, onFinishPurchase ->
       onStartPurchase()
       yourBillingClient.makePurchase(
           product,
           onSuccess = { purchase ->
               onFinishPurchase()
               //handle success
           },
           onError = {
               onFinishPurchase()
               //handle error
           },
           onCancel = {
               onFinishPurchase()
               //handle cancel
           }
       )
   }
   ```
</TabItem>
<TabItem value="java" label="Java" default>
   ```java 
   AdaptyUiObserverModeHandler observerModeHandler = (product, paywall, paywallView, onStartPurchase, onFinishPurchase) -> {
       onStartPurchase.invoke();
       yourBillingClient.makePurchase(
           product,
           purchase -> {
               onFinishPurchase.invoke();
               //handle success
           },
           error -> {
               onFinishPurchase.invoke();
               //handle error
           },
           () -> { //cancellation
               onFinishPurchase.invoke();
               //handle cancel
           }
       );
   };
   ```
</TabItem>
</Tabs>



   Also, remember to invoke these callbacks to AdaptyUI. This is necessary for proper paywall behavior, such as showing the loader, among other things:

   | Callback in Kotlin | Callback in Java          | Description                                                                                                                       |
   | :----------------- | :------------------------ | :-------------------------------------------------------------------------------------------------------------------------------- |
   | onStartPurchase()  | onStartPurchase.invoke()  | The callback should be invoked to notify AdaptyUI that the purchase is started.                                                   |
   | onFinishPurchase() | onFinishPurchase.invoke() | The callback should be invoked to notify AdaptyUI that the purchase is finished successfully or not, or the purchase is canceled. |

2. In order to display the visual paywall, you must first initialize it. To do this, call the method `AdaptyUI.getPaywallView()` or create the `AdaptyPaywallView` directly:

<Tabs>
  <TabItem value="kotlin1" label="Kotlin (Views - option 1)" default>

```kotlin 
   val paywallView = AdaptyUI.getPaywallView(
       activity,
       viewConfiguration,
       products,
       eventListener,
       personalizedOfferResolver,
       tagResolver,
       timerResolver,
       observerModeHandler, 
   )
```

</TabItem>
<TabItem value="kotlin2" label="Kotlin (Views - option 2)" default>

```
   val paywallView =
        AdaptyPaywallView(activity) // or retrieve it from xml
   ...
   with(paywallView) {
       setEventListener(eventListener)
       setObserverModeHandler(observerModeHandler)
       showPaywall(
           viewConfiguration,
           products,
           personalizedOfferResolver,
           tagResolver,
           timerResolver,
       )
   }
```

</TabItem>
<TabItem value="kotlin3" label="Kotlin (Jetpack Compose)" default>

```
AdaptyPaywallScreen(
    viewConfiguration,
    products,
    eventListener,
    personalizedOfferResolver,
    tagResolver,
    timerResolver,
    observerModeHandler,
)
```

</TabItem>
<TabItem value="java1" label="Java (option 1)" default>

```java
AdaptyPaywallView paywallView = AdaptyUI.getPaywallView(
        activity,
        viewConfiguration,
        products,
        eventListener,
        personalizedOfferResolver,
        tagResolver,
        timerResolver,
        observerModeHandler
);
```

</TabItem>
<TabItem value="java2" label="Java (option 2)" default>

```
AdaptyPaywallView paywallView =
  new AdaptyPaywallView(activity); //add to the view hierarchy if needed, or you receive it from xml
...
paywallView.setEventListener(eventListener);
paywallView.showPaywall(viewConfiguration, products, personalizedOfferResolver, tagResolver, timerResolver);
```

</TabItem>
<TabItem value="XML" label="XML" default>

```xml 
<com.adapty.ui.AdaptyPaywallView xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />
```

</TabItem>
</Tabs>

   After the view has been successfully created, you can add it to the view hierarchy and display it.

   Request parameters:

| Parameter | Presence | Description |
|---------|--------|-----------|
| **Products** | optional | Provide an array of `AdaptyPaywallProduct `to optimize the display timing of products on the screen. If `null` is passed, AdaptyUI will automatically fetch the required products. |
| **ViewConfiguration** | required | Supply an `AdaptyViewConfiguration` object containing visual details of the paywall. Use the `Adapty.getViewConfiguration(paywall)` method to load it. Refer to [Fetch the visual configuration of paywall](get-pb-paywalls#fetch-the-view-configuration-of-paywall-designed-using-paywall-builder) topic for more details. |
| **EventListener** | optional | Provide an `AdaptyUiEventListener` to observe paywall events. Extending AdaptyUiDefaultEventListener is recommended for ease of use. Refer to [Handling paywall events](android-handling-events)  topic for more details. |
| **PersonalizedOfferResolver** | optional | To indicate personalized pricing ([read more](https://developer.android.com/google/play/billing/integrate#personalized-price)  ), implement `AdaptyUiPersonalizedOfferResolver`  and pass your own logic that maps `AdaptyPaywallProduct` to true if the product's price is personalized, otherwise false. |
| **TagResolver** | optional | Use `AdaptyUiTagResolver` to resolve custom tags within the paywall text. This resolver takes a tag parameter and resolves it to a corresponding string. Refer to [Custom tags in paywall builder](custom-tags-in-paywall-builder)  topic for more details. |
| **ObserverModeHandler** | required for Observer mode | The  `AdaptyUiObserverModeHandler` you've implemented in the previous step. |
| **variationId** | required | The string identifier of the variation. You can get it using `variationId` property  of the [`AdaptyPaywall`](sdk-models#adaptypaywall)   object. |
| **transaction** | required | <p>For iOS, StoreKit1: an [`SKPaymentTransaction`](https://developer.apple.com/documentation/storekit/skpaymenttransaction)   object.</p><p>For iOS, StoreKit 2: [Transaction](https://developer.apple.com/documentation/storekit/transaction)   object.</p><p>For Android: String identifier (`purchase.getOrderId()`) of the purchase, where the purchase is an instance of the billing library [Purchase](https://developer.android.com/reference/com/android/billingclient/api/Purchase)  class.</p> |

   
