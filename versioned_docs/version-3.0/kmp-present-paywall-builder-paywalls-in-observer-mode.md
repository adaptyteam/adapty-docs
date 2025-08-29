---
title: "Present Paywall Builder paywalls in Observer mode in Kotlin Multiplatform SDK"
description: "Learn how to present PB paywalls in observer mode for better insights."
metadataTitle: "Presenting PB Paywalls in Observer Mode | Adapty Docs"
displayed_sidebar: sdkkmp
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Details from '@site/src/components/Details';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

If you've customized a paywall using the Paywall Builder, you don't need to worry about rendering it in your mobile app code to display it to the user. Such a paywall contains both what should be shown within the paywall and how it should be shown.

:::warning
This section refers to [Observer mode](observer-vs-full-mode) only. If you do not work in the Observer mode, refer to the [Kotlin Multiplatform - Present Paywall Builder paywalls](kmp-present-paywalls).
:::

<details>
   <summary>Before you start presenting paywalls (Click to Expand)</summary>

      1. Set up initial integration of Adapty [with the Google Play](initial-android) and [with the App Store](initial_ios). 
   2. Install and configure Adapty SDK. Make sure to set the `observerMode` parameter to `true`. Refer to our framework-specific instructions for [Kotlin Multiplatform](sdk-installation-kotlin-multiplatform#configure-adapty-sdk).
   3. [Create products](create-product) in the Adapty Dashboard.
   4. [Configure paywalls, assign products to them](create-paywall), and customize them using Paywall Builder in the Adapty Dashboard.
   5. [Create placements and assign your paywalls to them](create-placement) in the Adapty Dashboard.
   6. [Fetch Paywall Builder paywalls and their configuration](kmp-get-pb-paywalls) in your mobile app code.

    </details>

<p> </p>

1. Implement the `AdaptyUIObserver` interface:

   ```kotlin showLineNumbers title="Kotlin"
   import com.adapty.kmp.AdaptyUIObserver
   import com.adapty.kmp.models.AdaptyPaywallProduct
   import com.adapty.kmp.models.AdaptyUIView
   import com.adapty.kmp.models.AdaptyPurchaseResult
   
   class MyAdaptyUIObserver : AdaptyUIObserver {
       override fun paywallViewDidStartPurchase(
           view: AdaptyUIView,
           product: AdaptyPaywallProduct
       ) {
           // Handle the purchase initiation
           // You can implement your custom purchase flow here
           // The SDK will handle the purchase process automatically
       }
       
       override fun paywallViewDidFinishPurchase(
           view: AdaptyUIView,
           product: AdaptyPaywallProduct,
           purchaseResult: AdaptyPurchaseResult
       ) {
           when (purchaseResult) {
               is AdaptyPurchaseResult.Success -> {
                   // Purchase successful
                   // Check access levels and handle accordingly
               }
               is AdaptyPurchaseResult.UserCanceled -> {
                   // User canceled the purchase
               }
               is AdaptyPurchaseResult.Pending -> {
                   // Purchase is pending (e.g., offline payment)
               }
           }
       }
   }
   ```

   The `paywallViewDidStartPurchase` event will inform you that the user has initiated a purchase. In observer mode, you can implement your custom purchase flow in response to this callback.

2. Set the observer:

   ```kotlin showLineNumbers title="Kotlin"
   import com.adapty.kmp.AdaptyUI
   
   AdaptyUI.setObserver(MyAdaptyUIObserver())
   ```

3. Create a paywall view:

   ```kotlin showLineNumbers title="Kotlin"
   import com.adapty.kmp.AdaptyUI
   import com.adapty.kmp.models.AdaptyPaywall
   
   val paywallView = AdaptyUI.createPaywallView(
       paywall = paywall,
       preloadProducts = true // Set to true to preload products for better performance
   )
   ```

Request parameters:

| Parameter                | Presence | Description                                                                                                                                                                                                                                                                                                           |
| :----------------------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Paywall**              | required | An `AdaptyPaywall` object to obtain a view for the desired paywall.                                                                                                                                                                                                                                             |
| **LoadTimeout**          | optional | Maximum time to wait for the paywall to load. If not specified, the default timeout is used.                                                                                                                                                                                                                                      |
| **PreloadProducts**      | optional | Whether to preload products for better performance. Default is `false`.                                                                                                                                                                                                                                      |
| **CustomTags**           | optional | Custom tags to replace placeholders in the paywall content.                                                                                                                                                                                                                                      |
| **CustomTimers**         | optional | Custom timer values for the paywall.                                                                                                                                                                                                                                      |
| **AndroidPersonalizedOffers** | optional | Android-specific personalized offers configuration.                                                                                                                                                                                                                                      |

Returns:

| Object                  | Description                                          |
| :---------------------- | :--------------------------------------------------- |
| AdaptyUIView | An object, representing the requested paywall screen |

After the object has been successfully created, you can display it like so: 

```kotlin showLineNumbers title="Kotlin"
paywallView?.present()
```

:::warning
Don't forget to [Associate paywalls to purchase transactions](report-transactions-observer-mode-kmp). Otherwise, Adapty will not determine the source paywall of the purchase. 
:::
