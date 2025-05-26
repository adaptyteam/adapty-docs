---
title: "iOS - Present Paywall Builder paywalls in Observer mode"
description: "Learn how to present PB paywalls in observer mode for better insights."
metadataTitle: "Presenting PB Paywalls in Observer Mode | Adapty Docs"
---


import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Details from '@site/src/components/Details';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

If you've customized a paywall using the Paywall Builder, you don't need to worry about rendering it in your mobile app code to display it to the user. Such a paywall contains both what should be shown within the paywall and how it should be shown.

:::warning
This section refers to [Observer mode](observer-vs-full-mode) only. If you do not work in the Observer mode, refer to the [iOS - Present Paywall Builder paywalls](ios-present-paywalls).
:::
<Tabs groupId="current-os" queryString>
<TabItem value="sdk3" label="New Paywall Builder (SDK 3.0+)" default>
<details>
   <summary>Before you start presenting paywalls (Click to Expand)</summary>

      1. Set up initial integration of Adapty [with the Google Play](initial-android) and [with the App Store](initial_ios). 
   2. Install and configure Adapty SDK. Make sure to set the `observerMode` parameter to `true`. Refer to our framework-specific instructions for [iOS](sdk-installation-ios#configure-adapty-sdk), [Flutter](sdk-installation-flutter#configure-adapty-sdk), [React Native](sdk-installation-reactnative#configure-adapty-sdks), and [Unity](sdk-installation-unity#configure-adapty-sdk).
   3. [Create products](create-product) in the Adapty Dashboard.
   4. [Configure paywalls, assign products to them](create-paywall), and customize them using Paywall Builder in the Adapty Dashboard.
   5. [Create placements and assign your paywalls to them](create-placement) in the Adapty Dashboard.
   6. [Fetch Paywall Builder paywalls and their configuration](get-pb-paywalls) in your mobile app code.

    </details>

<p> </p>

<Tabs groupId="current-os" queryString> 

<TabItem value="swift" label="Swift" default> 

1. Implement the `AdaptyObserverModeResolver` object:

   ```swift showLineNumbers title="Swift"
   func observerMode(didInitiatePurchase product: AdaptyPaywallProduct,
                     onStartPurchase: @escaping () -> Void,
                     onFinishPurchase: @escaping () -> Void) {
          // use the product object to handle the purchase
          // use the onStartPurchase and onFinishPurchase callbacks to notify AdaptyUI about the process of the purchase
   }
   ```

   The `observerMode(didInitiatePurchase:onStartPurchase:onFinishPurchase:)` event will inform you that the user has initiated a purchase. You can trigger your custom purchase flow in response to this callback.

   Also, remember to invoke the following callbacks to notify AdaptyUI about the process of the purchase. This is necessary for proper paywall behavior, such as showing the loader, among other things:

   | Callback           | Description                                                                      |
   | :----------------- | :------------------------------------------------------------------------------- |
   | onStartPurchase()  | The callback should be invoked to notify AdaptyUI that the purchase is started.  |
   | onFinishPurchase() | The callback should be invoked to notify AdaptyUI that the purchase is finished. |

2. Create a paywall configuration object:

   ```swift showLineNumbers title="Swift"
   do {
       let paywallConfiguration = try AdaptyUI.getPaywallConfiguration(
        forPaywall: <paywall object>, 
        observerModeResolver: <AdaptyObserverModeResolver>
        )
   } catch {
       // handle the error
   }
   ```

   Request parameters:

   | Parameter                | Presence | Description                                                                                                                                                                                                                                                                                                           |
   | :----------------------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | **Paywall**              | required | An `AdaptyPaywall` object to obtain a controller for the desired paywall.                                                                                                                                                                                                                                             |
   | **ObserverModeResolver** | required | The  `AdaptyObserverModeResolver` object you've implemented in the previous step                                                                                                                                                                                                                                      |

3. Initialize the visual paywall you want to display by using the  `.paywallController(for:products:viewConfiguration:delegate:)` method:

   ```swift showLineNumbers title="Swift"
   import Adapty
   import AdaptyUI
   
   let visualPaywall = AdaptyUI.paywallController(
       with: <paywall configuration object>,
       delegate: <AdaptyPaywallControllerDelegate>
   )
   ```

Request parameters:

| Parameter                | Presence | Description                                                                                                                                                                                                                                                                                                           |
| :----------------------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Paywall Configuration**              | required | An `AdaptyUI.PaywallConfiguration` object containing visual details of the paywall. Use the `AdaptyUI.getPaywallConfiguration(forPaywall:locale:)` method.  Refer to [Fetch Paywall Builder paywalls and their configuration](get-pb-paywalls) topic for more details.                                                                                                                                                                                                                                             |
| **Delegate**             | required | An `AdaptyPaywallControllerDelegate` to listen to paywall events. Refer to [Handling paywall events](ios-handling-events) topic for more details.                                                                                                                                                                 |

Returns:

| Object                  | Description                                          |
| :---------------------- | :--------------------------------------------------- |
| AdaptyPaywallController | An object, representing the requested paywall screen |

After the object has been successfully created, you can display it like so: 

```swift showLineNumbers title="Swift"
present(visualPaywall, animated: true)
```

:::warning
Don't forget to [Associate paywalls to purchase transactions](report-transactions-observer-mode). Otherwise, Adapty will not determine the source paywall of the purchase. 
:::
</TabItem> 
<TabItem value="swiftui" label="SwiftUI" default> 

In order to display the visual paywall on the device screen, use the `.paywall` modifier in SwiftUI:

```swift showLineNumbers title="SwiftUI"
@State var paywallPresented = false

var body: some View {
	Text("Hello, AdaptyUI!")
			.paywall(
          isPresented: $paywallPresented,
          paywallConfiguration: <paywall configuration object>,
          didPerformAction: { action in
              switch action {
                  case .close:
                      paywallPresented = false
                  default:
                      // Handle other actions
                      break
              }
          },
          didFinishRestore: { profile in /* check access level and dismiss */  },
          didFailRestore: { error in /* handle the error */ },
          didFailRendering: { error in paywallPresented = false }
      )
}
```

Request parameters:

| Parameter                | Presence | Description                                                                                                                                                                                                                                                                                                            |
| :----------------------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Paywall Configuration**              | required | An `AdaptyUI.PaywallConfiguration` object containing visual details of the paywall. Use the `AdaptyUI.getPaywallConfiguration(forPaywall:locale:)` method.  Refer to [Fetch Paywall Builder paywalls and their configuration](get-pb-paywalls) topic for more details.                                                                                                                                                                                                                                             |
| **Products**             | optional | Provide an array of `AdaptyPaywallProducts` to optimize the display timing of products on the screen. If `nil` is passed, AdaptyUI will automatically fetch the necessary products.                                                                                                                                   |
| **TagResolver**          | optional | Define a dictionary of custom tags and their resolved values. Custom tags serve as placeholders in the paywall content, dynamically replaced with specific strings for personalized content within the paywall. Refer to [Custom tags in Paywall Builder](custom-tags-in-paywall-builder)  topic for more details. |
| **ObserverModeResolver** | optional | The `AdaptyObserverModeResolver` object you've implemented in the previous step                                                                                                                                                                                                                                        |

Closure parameters:

| Closure parameter    | Description                                                                       |
| :------------------- | :-------------------------------------------------------------------------------- |
| **didFinishRestore** | If Adapty.restorePurchases() succeeds, this callback will be invoked.             |
| **didFailRestore**   | If Adapty.restorePurchases() fails, this callback will be invoked.                |
| **didFailRendering** | If an error occurs during the interface rendering, this callback will be invoked. |

Refer to the [iOS - Handling events](ios-handling-events) topic for other closure parameters.

:::warning
Don't forget to [Associate paywalls to purchase transactions](report-transactions-observer-mode). Otherwise, Adapty will not determine the source paywall of the purchase.
::: 

</TabItem> 
</Tabs>

</TabItem>
<TabItem value="sdk2" label="Legacy Paywall Builder (SDK up to 2.x)" default>
<details>
   <summary>Before you start presenting paywalls (Click to Expand)</summary>

   1. Set up initial integration of Adapty [with the Google Play](initial-android) and [with the App Store](initial_ios). 
1. Install and configure Adapty SDK. Make sure to set the `observerMode` parameter to `true`. Refer to our framework-specific instructions for [iOS](sdk-installation-ios#configure-adapty-sdk), [Flutter](sdk-installation-flutter#configure-adapty-sdk), [React Native](sdk-installation-reactnative#configure-adapty-sdks), and [Unity](sdk-installation-unity#configure-adapty-sdk).
2. [Create products](create-product) in the Adapty Dashboard.
3. [Configure paywalls, assign products to them](create-paywall), and customize them using Paywall Builder in the Adapty Dashboard.
4. [Create placements and assign your paywalls to them](create-placement) in the Adapty Dashboard.
5. [Fetch Paywall Builder paywalls and their configuration](get-pb-paywalls) in your mobile app code.
</details>

<p> </p>
<Tabs groupId="current-os" queryString>
<TabItem value="swift" label="Swift" default>
1. Implement the `AdaptyObserverModeDelegate` object:

   ```swift showLineNumbers title="Swift"
   func paywallController(_ controller: AdaptyPaywallController,
                          didInitiatePurchase product: AdaptyPaywallProduct,
                          onStartPurchase: @escaping () -> Void,
                          onFinishPurchase: @escaping () -> Void) {
          // use the product object to handle the purchase
          // use the onStartPurchase and onFinishPurchase callbacks to notify AdaptyUI about the process of the purchase
   }
   ```

   The `paywallController(_:didInitiatePurchase:onStartPurchase:onFinishPurchase:)` event will inform you that the user has initiated a purchase. You can trigger your custom purchase flow in response to this event.

   Also, remember to invoke the following callbacks to notify AdaptyUI about the process of the purchase. This is necessary for proper paywall behavior, such as showing the loader, among other things:

   | Callback         | Description                                                                      |
   | :--------------- | :------------------------------------------------------------------------------- |
   | onStartPurchase  | The callback should be invoked to notify AdaptyUI that the purchase is started.  |
   | onFinishPurchase | The callback should be invoked to notify AdaptyUI that the purchase is finished. |

2. Initialize the visual paywall you want to display by using the  `.paywallController(for:products:viewConfiguration:delegate:observerModeDelegate:)` method:

   ```swift showLineNumbers title="Swift"
   import Adapty
   import AdaptyUI
   
   let visualPaywall = AdaptyUI.paywallController(
       for: <paywall object>,
       products: <paywall products array>,
       viewConfiguration: <LocalizedViewConfiguration>,
       delegate: <AdaptyPaywallControllerDelegate>
       observerModeDelegate: <AdaptyObserverModeDelegate>
   )
   ```

Request parameters:

| Parameter                | Presence | Description                                                  |
| :----------------------- | :------- | :----------------------------------------------------------- |
| **Paywall**              | required | An `AdaptyPaywall` object to obtain a controller for the desired paywall. |
| **Products**             | optional | Provide an array of `AdaptyPaywallProducts` to optimize the display timing of products on the screen. If `nil` is passed, AdaptyUI will automatically fetch the necessary products. |
| **ViewConfiguration**    | required | An `AdaptyUI.LocalizedViewConfiguration` object containing visual details of the paywall. Use the `AdaptyUI.getViewConfiguration(paywall:locale:)` method.  Refer to [Fetch Paywall Builder paywalls and their configuration](get-pb-paywalls) topic for more details. |
| **Delegate**             | required | An `AdaptyPaywallControllerDelegate` to listen to paywall events. Refer to [Handling paywall events](ios-handling-events) topic for more details. |
| **ObserverModeDelegate** | required | The  `AdaptyObserverModeDelegate` object you've implemented in the previous step |
| **TagResolver**          | optional | Define a dictionary of custom tags and their resolved values. Custom tags serve as placeholders in the paywall content, dynamically replaced with specific strings for personalized content within the paywall. Refer to [Custom tags in Paywall Builder](custom-tags-in-paywall-builder) topic for more details. |

Returns:

| Object                  | Description                                          |
| :---------------------- | :--------------------------------------------------- |
| AdaptyPaywallController | An object, representing the requested paywall screen |

After the object has been successfully created, you can display it like so: 

```swift showLineNumbers title="Swift"
present(visualPaywall, animated: true)
```

:::warning
Don't forget to [Associate paywalls to purchase transactions](report-transactions-observer-mode). Otherwise, Adapty will not determine the source paywall of the purchase.
:::
</TabItem>
<TabItem value="swiftui" label="SwiftUI" default>
In order to display the visual paywall on the device screen, use the `.paywall` modifier in SwiftUI:

```swift showLineNumbers title="SwiftUI"
@State var paywallPresented = false

var body: some View {
	Text("Hello, AdaptyUI!")
			.paywall(
          isPresented: $paywallPresented,
          paywall: <paywall object>,
          configuration: <LocalizedViewConfiguration>,
          didPerformAction: { action in
              switch action {
                  case .close:
                      paywallPresented = false
                  default:
                      // Handle other actions
                      break
              }
          },
          didFinishRestore: { profile in /* check access level and dismiss */  },
          didFailRestore: { error in /* handle the error */ },
          didFailRendering: { error in paywallPresented = false },
          observerModeDidInitiatePurchase: { product, onStartPurchase, onFinishPurchase in
              // use the product object to handle the purchase
              // use the onStartPurchase and onFinishPurchase callbacks to notify AdaptyUI about the process of the purchase
          }, 
      )
}
```

Request parameters:

| Parameter         | Presence | Description                                                                                                                                                                                                                                                                                                            |
| :---------------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Paywall**       | required | An `AdaptyPaywall` object to obtain a controller for the desired paywall.                                                                                                                                                                                                                                              |
| **Product**       | optional | Provide an array of `AdaptyPaywallProducts` to optimize the display timing of products on the screen. If `nil` is passed, AdaptyUI will automatically fetch the necessary products.                                                                                                                                    |
| **Configuration** | required | An `AdaptyUI.LocalizedViewConfiguration` object containing visual details of the paywall. Use the `AdaptyUI.getViewConfiguration(paywall:locale:)` method.  Refer to [Fetch Paywall Builder paywalls and their configuration](get-pb-paywalls) topic for more details.                                             |
| **TagResolver**   | optional | Define a dictionary of custom tags and their resolved values. Custom tags serve as placeholders in the paywall content, dynamically replaced with specific strings for personalized content within the paywall. Refer to [Custom tags in paywall builder](custom-tags-in-paywall-builder)  topic for more details. |

Closure parameters:

| Closure parameter                   | Description                                                                       |
| :---------------------------------- | :-------------------------------------------------------------------------------- |
| **didFinishRestore**                | If Adapty.restorePurchases() succeeds, this callback will be invoked.             |
| **didFailRestore**                  | If Adapty.restorePurchases() fails, this callback will be invoked.                |
| **didFailRendering**                | If an error occurs during the interface rendering, this callback will be invoked. |
| **observerModeDidInitiatePurchase** | This callback is invoked when a user initiates a purchase.                        |

Refer to the [iOS - Handling events](ios-handling-events) topic for other closure parameters.

:::warning
Don't forget to [Associate paywalls to purchase transactions](report-transactions-observer-mode). Otherwise, Adapty will not determine the source paywall of the purchase.
:::
</TabItem>
</Tabs>


</TabItem>
</Tabs>

















