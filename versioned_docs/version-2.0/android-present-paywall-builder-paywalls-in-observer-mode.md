---
title: "Android - Present Paywall Builder paywalls in Observer mode"
description: ""
metadataTitle: ""
---

If you've customized a paywall using the Paywall Builder, you don't need to worry about rendering it in your mobile app code to display it to the user. Such a paywall contains both what should be shown within the paywall and how it should be shown.

:::note
This section refers to [Observer mode](observer-vs-full-mode) only. If you do not work in Observer mode, refer to the [Android - Present Paywall Builder paywalls](android-present-paywalls) topic instead.
:::

<details>
   <summary>Before you start presenting paywalls (Click to Expand)</summary>

   1. Set up initial integration of Adapty [with the Google Play](initial-android) and [with the App Store](initial_ios). 
2. Install and configure Adapty SDK. Make sure to set the `observerMode` parameter to `true`. Refer to our framework-specific instructions [for iOS](sdk-installation-ios#configure-adapty-sdk), [for Android](adapty-sdk-installation-android#configure-adapty-sdk), [for Flutter](sdk-installation-flutter#configure-adapty-sdks-for-ios), [for React Native](sdk-installation-reactnative#configure-adapty-sdks), and [for Unity](sdk-installation-unity#initiate-adapty-unity-plugin-on-ios).
3. [Create products](create-product) in the Adapty Dashboard.
4. [Configure paywalls, assign products to them](create-paywall), and customize them using Paywall Builder in the Adapty Dashboard.
5. [Create placements and assign your paywalls to them](create-placement) in the Adapty Dashboard.
6. [Fetch Paywall Builder paywalls and their configuration](get-pb-paywalls) in your mobile app code.
</details>

1. Implement the `AdaptyUiObserverModeHandler`. The `AdaptyUiObserverModeHandler`'s callback (`onPurchaseInitiated`) informs you when the user initiates a purchase. You can trigger your custom purchase flow in response to this callback like this:

   ```kotlin title="Kotlin"
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
   ```java title="Java"
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

   Also, remember to invoke these callbacks to AdaptyUI. This is necessary for proper paywall behavior, such as showing the loader, among other things:

   | Callback in Kotlin | Callback in Java          | Description                                                                                                                       |
   | :----------------- | :------------------------ | :-------------------------------------------------------------------------------------------------------------------------------- |
   | onStartPurchase()  | onStartPurchase.invoke()  | The callback should be invoked to notify AdaptyUI that the purchase is started.                                                   |
   | onFinishPurchase() | onFinishPurchase.invoke() | The callback should be invoked to notify AdaptyUI that the purchase is finished successfully or not, or the purchase is canceled. |

2. In order to display the visual paywall, you must first initialize it. To do this, call the method `AdaptyUI.getPaywallView()` or create the `AdaptyPaywallView` directly:

   ```kotlin title="Kotlin"
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
   ```java title="Java"
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
   ```xml title="XML"
   <com.adapty.ui.AdaptyPaywallView xmlns:android="http://schemas.android.com/apk/res/android"
       android:layout_width="match_parent"
       android:layout_height="match_parent" />
   ```

   After the view has been successfully created, you can add it to the view hierarchy and display it.

   Request parameters:

   | Parameter | Presence | Description |
|---------|--------|-----------|
| **Products** | optional | Provide an array of `AdaptyPaywallProduct `to optimize the display timing of products on the screen. If `null` is passed, AdaptyUI will automatically fetch the required products. |
| **ViewConfiguration** | required | Supply an `AdaptyViewConfiguration` object containing visual details of the paywall. Use the `Adapty.getViewConfiguration(paywall)` method to load it. Refer to [Fetch the visual configuration of paywall](get-and-show-paywall-builder-paywalls#fetch-the-visual-configuration-of-paywall-customized-using-paywall-builder) topic for more details. |
| **Insets** | required | Define an `AdaptyPaywallInsets` object containing information about the area overlapped by system bars, creating vertical margins for content. If neither the status bar nor the navigation bar overlaps the `AdaptyPaywallView`, pass `AdaptyPaywallInsets.NONE`. For fullscreen mode where system bars overlap part of your UI, obtain insets as shown under the table. |
| **EventListener** | optional | Provide an `AdaptyUiEventListener` to observe paywall events. Extending AdaptyUiDefaultEventListener is recommended for ease of use. Refer to [Handling paywall events](android-handling-events)  topic for more details. |
| **PersonalizedOfferResolver** | optional | To indicate personalized pricing ([read more](https://developer.android.com/google/play/billing/integrate#personalized-price)  ), implement `AdaptyUiPersonalizedOfferResolver`  and pass your own logic that maps `AdaptyPaywallProduct` to true if the product's price is personalized, otherwise false. |
| **TagResolver** | optional | Use `AdaptyUiTagResolver` to resolve custom tags within the paywall text. This resolver takes a tag parameter and resolves it to a corresponding string. Refer to [Custom tags in paywall builder](custom-tags-in-paywall-builder)  topic for more details. |
| **ObserverModeHandler** | required for Observer mode | The  `AdaptyUiObserverModeHandler` you've implemented in the previous step. |
| **variationId** | required | The string identifier of the variation. You can get it using `variationId` property  of the [`AdaptyPaywall`](sdk-models#adaptypaywall)   object. |
| **transaction** | required | <p>For iOS, StoreKit1: an [`SKPaymentTransaction`](https://developer.apple.com/documentation/storekit/skpaymenttransaction)   object.</p><p>For iOS, StoreKit 2: [Transaction](https://developer.apple.com/documentation/storekit/transaction)   object.</p><p>For Android: String identifier (`purchase.getOrderId()`) of the purchase, where the purchase is an instance of the billing library [Purchase](https://developer.android.com/reference/com/android/billingclient/api/Purchase)  class.</p> |

   For fullscreen mode where system bars overlap part of your UI, obtain insets in the following way:

   ```kotlin title="Kotlin"
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
   ```java title="Java"
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

   Returns:

   | Object              | Description                                        |
   | :------------------ | :------------------------------------------------- |
   | `AdaptyPaywallView` | object, representing the requested paywall screen. |

:::warning
Don't forget to [Associate paywalls to purchase transactions](associate-paywalls-to-transactions). Otherwise, Adapty will not determine the source paywall of the purchase.
:::