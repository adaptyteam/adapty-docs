---
title: "Android - Present Paywall Builder paywalls in Observer mode"
description: "Learn how to present paywalls in observer mode using Adapty’s Paywall Builder."
metadataTitle: "Presenting Paywalls in Observer Mode | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Details from '@site/src/components/Details';

If you've customized a paywall using the Paywall Builder, you don't need to worry about rendering it in your mobile app code to display it to the user. Such a paywall contains both what should be shown within the paywall and how it should be shown.

:::warning
This section refers to [Observer mode](observer-vs-full-mode) only. If you do not work in the Observer mode, refer to the [Android - Present Paywall Builder paywalls](android-present-paywalls) topic instead.
:::

<Tabs groupId="current-os" queryString> 
<TabItem value="SDK3" label="New Paywall Builder (SDK 3.0+)" default> 
<details>
   <summary>Before you start presenting paywalls (Click to Expand)</summary>

      1. Set up initial integration of Adapty [with the Google Play](initial-android) and [with the App Store](initial_ios). 
   2. Install and configure Adapty SDK. Make sure to set the `observerMode` parameter to `true`. Refer to our framework-specific instructions [for Android](sdk-installation-android), [Flutter](sdk-installation-flutter#configure-adapty-sdk), [React Native](sdk-installation-reactnative#configure-adapty-sdks), and [Unity](sdk-installation-unity#configure-adapty-sdk).
   3. [Create products](create-product) in the Adapty Dashboard.
   4. [Configure paywalls, assign products to them](create-paywall), and customize them using Paywall Builder in the Adapty Dashboard.
   5. [Create placements and assign your paywalls to them](create-placement) in the Adapty Dashboard.
   6. [Fetch Paywall Builder paywalls and their configuration](get-pb-paywalls) in your mobile app code.

    </details>

<p> </p>

1. Implement the `AdaptyUiObserverModeHandler`. The `AdaptyUiObserverModeHandler`'s callback (`onPurchaseInitiated`) informs you when the user initiates a purchase. You can trigger your custom purchase flow in response to this callback like this:

<Tabs groupId="current-os" queryString>
<TabItem value="kotlin" label="Kotlin" default>
   ```kotlin showLineNumbers
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
   ```java showLineNumbers
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

2. In order to display the visual paywall on the device screen, you must first configure it.

<Tabs groupId="current-os" queryString>
<TabItem value="views" label="Views" default>

To do this, call the method `AdaptyUI.getPaywallView()` or create the `AdaptyPaywallView` directly:

<Tabs groupId="current-os" queryString>
  <TabItem value="kotlin1" label="Kotlin (option 1)" default>

```kotlin showLineNumbers
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
<TabItem value="kotlin2" label="Kotlin (option 2)" default>

```kotlin showLineNumbers
   val paywallView =
        AdaptyPaywallView(activity) // or retrieve it from xml
   ...
   with(paywallView) {
       showPaywall(
           viewConfiguration,
           products,
					 eventListener,
           personalizedOfferResolver,
           tagResolver,
           timerResolver,
					 observerModeHandler,
       )
   }
```

</TabItem>
<TabItem value="java1" label="Java (option 1)" default>

```java showLineNumbers
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

```java showLineNumbers
AdaptyPaywallView paywallView =
  new AdaptyPaywallView(activity); //add to the view hierarchy if needed, or you receive it from xml
...
paywallView.showPaywall(viewConfiguration, products, eventListener, personalizedOfferResolver, tagResolver, timerResolver, observerModeHandler);
```

</TabItem>
<TabItem value="XML" label="XML" default>

```xml showLineNumbers
<com.adapty.ui.AdaptyPaywallView xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />
```

</TabItem>
</Tabs>

   After the view has been successfully created, you can add it to the view hierarchy and display it.

</TabItem>
<TabItem value="compose" label="Jetpack Compose" default>

To do this, use this composable function:

```kotlin showLineNumbers
AdaptyPaywallScreen(
    viewConfiguration,
    products,
    eventListener,
    personalizedOfferResolver,
    tagResolver,
    timerResolver,
)
```

</TabItem>
</Tabs>

   Request parameters:

| Parameter | Presence | Description |
|---------|--------|-----------|
| **Products** | optional | Provide an array of `AdaptyPaywallProduct `to optimize the display timing of products on the screen. If `null` is passed, AdaptyUI will automatically fetch the required products. |
| **ViewConfiguration** | required | Supply an `AdaptyViewConfiguration` object containing visual details of the paywall. Use the `Adapty.getViewConfiguration(paywall)` method to load it. Refer to [Fetch the visual configuration of paywall](get-pb-paywalls#fetch-the-view-configuration-of-paywall-designed-using-paywall-builder) topic for more details. |
| **EventListener** | optional | Provide an `AdaptyUiEventListener` to observe paywall events. Extending AdaptyUiDefaultEventListener is recommended for ease of use. Refer to [Handling paywall events](android-handling-events)  topic for more details. |
| **PersonalizedOfferResolver** | optional | To indicate personalized pricing ([read more](https://developer.android.com/google/play/billing/integrate#personalized-price)  ), implement `AdaptyUiPersonalizedOfferResolver`  and pass your own logic that maps `AdaptyPaywallProduct` to true if the product's price is personalized, otherwise false. |
| **TagResolver** | optional | Use `AdaptyUiTagResolver` to resolve custom tags within the paywall text. This resolver takes a tag parameter and resolves it to a corresponding string. Refer to [Custom tags in Paywall Builder](custom-tags-in-paywall-builder)  topic for more details. |
| **ObserverModeHandler** | required for Observer mode | The  `AdaptyUiObserverModeHandler` you've implemented in the previous step. |
| **variationId** | required | The string identifier of the variation. You can get it using `variationId` property  of the [`AdaptyPaywall`](sdk-models#adaptypaywall)   object. |
| **transaction** | required | <p>For iOS, StoreKit1: an [`SKPaymentTransaction`](https://developer.apple.com/documentation/storekit/skpaymenttransaction)   object.</p><p>For iOS, StoreKit 2: [Transaction](https://developer.apple.com/documentation/storekit/transaction)   object.</p><p>For Android: String identifier (`purchase.getOrderId()`) of the purchase, where the purchase is an instance of the billing library [Purchase](https://developer.android.com/reference/com/android/billingclient/api/Purchase)  class.</p> |

</TabItem> 
<TabItem value="SDK2" label="Legacy Paywall Builder (SDK up to 2.x)" default> 
<details>
   <summary>Before you start presenting paywalls (Click to Expand)</summary>

   1. Set up initial integration of Adapty [with the Google Play](initial-android) and [with the App Store](initial_ios). 
2. Install and configure Adapty SDK. Make sure to set the `observerMode` parameter to `true`. Refer to our framework-specific instructions [for Android](sdk-installation-android), [Flutter](sdk-installation-flutter#configure-adapty-sdk), [React Native](sdk-installation-reactnative#configure-adapty-sdks), and [Unity](sdk-installation-unity#configure-adapty-sdk).
3. [Create products](create-product) in the Adapty Dashboard.
4. [Configure paywalls, assign products to them](create-paywall), and customize them using Paywall Builder in the Adapty Dashboard.
5. [Create placements and assign your paywalls to them](create-placement) in the Adapty Dashboard.
6. [Fetch Paywall Builder paywalls and their configuration](get-pb-paywalls) in your mobile app code.
</details>

1. Implement the `AdaptyUiObserverModeHandler`. The `AdaptyUiObserverModeHandler`'s callback (`onPurchaseInitiated`) informs you when the user initiates a purchase. You can trigger your custom purchase flow in response to this callback like this:

<Tabs groupId="current-os" queryString>
<TabItem value="kotlin" label="Kotlin" default>
   ```kotlin showLineNumbers
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
   ```java showLineNumbers
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

<Tabs groupId="current-os" queryString>
<TabItem value="kotlin" label="Kotlin" default>
   ```kotlin showLineNumbers
   val paywallView = AdaptyUI.getPaywallView(
       activity,
       viewConfiguration,
       products,
       AdaptyPaywallInsets.of(topInset, bottomInset),
       eventListener,
       personalizedOfferResolver,
       tagResolver,
       observerModeHandler,
   )

   //======= OR =======

   val paywallView =
        AdaptyPaywallView(activity) // or retrieve it from xml
   ...
   with(paywallView) {
       setEventListener(eventListener)
       setObserverModeHandler(observerModeHandler)
       showPaywall(
           viewConfiguration,
           products,
           AdaptyPaywallInsets.of(topInset, bottomInset),
           personalizedOfferResolver,
           tagResolver,
       )
   }
   ```
</TabItem>
<TabItem value="java" label="Java" default>
   ```java showLineNumbers
   AdaptyPaywallView paywallView = AdaptyUI.getPaywallView(
           activity,
           viewConfiguration,
           products,
           AdaptyPaywallInsets.of(topInset, bottomInset),
           eventListener,
           personalizedOfferResolver,
           tagResolver,
           observerModeHandler
   );

   //======= OR =======

   AdaptyPaywallView paywallView =
     new AdaptyPaywallView(activity); //add to the view hierarchy if needed, or you receive it from xml
   ...
   paywallView.setEventListener(eventListener);
   paywallView.setObserverModeHandler(observerModeHandler);
   paywallView.showPaywall(viewConfiguration, products, AdaptyPaywallInsets.of(topInset, bottomInset), personalizedOfferResolver);
   ```
</TabItem>
<TabItem value="XML" label="XML" default>
   ```xml showLineNumbers
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
| **Insets** | required | Define an `AdaptyPaywallInsets` object containing information about the area overlapped by system bars, creating vertical margins for content. If neither the status bar nor the navigation bar overlaps the `AdaptyPaywallView`, pass `AdaptyPaywallInsets.NONE`. For fullscreen mode where system bars overlap part of your UI, obtain insets as shown under the table. |
| **EventListener** | optional | Provide an `AdaptyUiEventListener` to observe paywall events. Extending AdaptyUiDefaultEventListener is recommended for ease of use. Refer to [Handling paywall events](android-handling-events)  topic for more details. |
| **PersonalizedOfferResolver** | optional | To indicate personalized pricing ([read more](https://developer.android.com/google/play/billing/integrate#personalized-price)  ), implement `AdaptyUiPersonalizedOfferResolver`  and pass your own logic that maps `AdaptyPaywallProduct` to true if the product's price is personalized, otherwise false. |
| **TagResolver** | optional | Use `AdaptyUiTagResolver` to resolve custom tags within the paywall text. This resolver takes a tag parameter and resolves it to a corresponding string. Refer to [Custom tags in Paywall Builder](custom-tags-in-paywall-builder)  topic for more details. |
| **ObserverModeHandler** | required for Observer mode | The  `AdaptyUiObserverModeHandler` you've implemented in the previous step. |
| **variationId** | required | The string identifier of the variation. You can get it using `variationId` property  of the [`AdaptyPaywall`](sdk-models#adaptypaywall)   object. |
| **transaction** | required | <p>For iOS, StoreKit1: an [`SKPaymentTransaction`](https://developer.apple.com/documentation/storekit/skpaymenttransaction)   object.</p><p>For iOS, StoreKit 2: [Transaction](https://developer.apple.com/documentation/storekit/transaction)   object.</p><p>For Android: String identifier (`purchase.getOrderId()`) of the purchase, where the purchase is an instance of the billing library [Purchase](https://developer.android.com/reference/com/android/billingclient/api/Purchase)  class.</p> |

   For fullscreen mode where system bars overlap part of your UI, obtain insets in the following way:

<Tabs groupId="current-os" queryString>
<TabItem value="kotlin" label="Kotlin" default>
   ```kotlin showLineNumbers
   import androidx.core.graphics.Insets
   import androidx.core.view.ViewCompat
   import androidx.core.view.WindowInsetsCompat

   //create extension function
   fun View.onReceiveSystemBarsInsets(action: (insets: Insets) -> Unit) {
       ViewCompat.setOnApplyWindowInsetsListener(this) { _, insets ->
           val systemBarInsets = insets.getInsets(WindowInsetsCompat.Type.systemBars())
           ViewCompat.setOnApplyWindowInsetsListener(this, null)
           action(systemBarInsets)
           insets
       }
   }
   //and then use it with the view
   paywallView.onReceiveSystemBarsInsets { insets ->
       val paywallInsets = AdaptyPaywallInsets.of(insets.top, insets.bottom)
       paywallView.setEventListener(eventListener)
       paywallView.setObserverModeHandler(observerModeHandler)
       paywallView.showPaywall(viewConfig, products, paywallInsets, personalizedOfferResolver, tagResolver)
   }
   ```
</TabItem>
<TabItem value="java" label="Java" default>
   ```java showLineNumbers
   import androidx.core.graphics.Insets;
   import androidx.core.view.ViewCompat;
   import androidx.core.view.WindowInsetsCompat;

   ...

   ViewCompat.setOnApplyWindowInsetsListener(paywallView, (view, insets) -> {
       Insets systemBarInsets = insets.getInsets(WindowInsetsCompat.Type.systemBars());
       ViewCompat.setOnApplyWindowInsetsListener(paywallView, null);
     
       AdaptyPaywallInsets paywallInsets =
                    AdaptyPaywallInsets.of(systemBarInsets.top, systemBarInsets.bottom);
       paywallView.setEventListener(eventListener);
       paywallView.setObserverModeHandler(observerModeHandler);
       paywallView.showPaywall(viewConfiguration, products, paywallInsets, personalizedOfferResolver, tagResolver);
               
       return insets;
   });
   ```
</TabItem>
</Tabs>



   Returns:

   | Object              | Description                                        |
   | :------------------ | :------------------------------------------------- |
   | `AdaptyPaywallView` | object, representing the requested paywall screen. |

:::warning
Don't forget to [Associate paywalls to purchase transactions](report-transactions-observer-mode). Otherwise, Adapty will not determine the source paywall of the purchase.
:::

</TabItem> 
</Tabs>



   
