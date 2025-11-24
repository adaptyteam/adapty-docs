---
title: "Implement web paywalls in iOS SDK"
description: "Set up a web paywall to get paid without the App Store fees and audits."
metadataTitle: "Accept payments in web for iOS apps in the US"
keywords: ['web paywalls']
sidebar_label: "Implement web paywalls"
---
import Zoom from 'react-medium-image-zoom';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::important
Before you begin, make sure you have [configured your web paywall in the dashboard](web-paywall.md) and installed Adapty SDK version 3.6.1 or later.
:::

## Open web paywalls

If you are working with a paywall you developed yourself, you need to handle web paywalls using the SDK method. The `.openWebPaywall` method:
1. Generates a unique URL allowing Adapty to link a specific paywall shown to a particular user to the web page they are redirected to.
2. Tracks when your users return to the app and then requests `.getProfile` at short intervals to determine whether the profile access rights have been updated. 

This way, if the payment has been successful and access rights have been updated, the subscription activates in the app almost immediately.

```swift showLineNumbers title="Swift"
do {
    try await Adapty.openWebPaywall(for: product)
} catch {
    print("Failed to open web paywall: \(error)")
}
```

:::note
There are two versions of the `openWebPaywall` method:
1. `openWebPaywall(product)` that generates URLs by paywall and adds the product data to URLs as well.
2. `openWebPaywall(paywall)` that generates URLs by paywall without adding the product data to URLs. Use it when your products in the Adapty paywall differ from those in the web paywall.
:::

## Handle errors

| Error                                   | Description                                            | Recommended action                                                        |
|-----------------------------------------|--------------------------------------------------------|---------------------------------------------------------------------------|
| AdaptyError.paywallWithoutPurchaseUrl   | The paywall doesn't have a web purchase URL configured | Check if the paywall has been properly configured in the Adapty Dashboard |
| AdaptyError.productWithoutPurchaseUrl   | The product doesn't have a web purchase URL            | Verify the product configuration in the Adapty Dashboard                  |
| AdaptyError.failedOpeningWebPaywallUrl  | Failed to open the URL in the browser                  | Check device settings or provide an alternative purchase method           |
| AdaptyError.failedDecodingWebPaywallUrl | Failed to properly encode parameters in the URL        | Verify URL parameters are valid and properly formatted                    |

## Implementation example
```swift showLineNumbers title="Swift"
class SubscriptionViewController: UIViewController {
    var paywall: AdaptyPaywall?
    
    @IBAction func purchaseButtonTapped(_ sender: UIButton) {
        guard let paywall = paywall, let product = paywall.products.first else { return }
         Task {
            await offerWebPurchase(for: product)
         }
    }
    
    func offerWebPurchase(for paywallProduct: AdaptyPaywallProduct) async {
        do {
            // Attempt to open web paywall
            try await Adapty.openWebPaywall(for: product)
        } catch let error as AdaptyError {
            
            switch error {
            case .paywallWithoutPurchaseUrl, .productWithoutPurchaseUrl:
                showAlert(message: "Web purchase is not available for this product.")
            case .failedOpeningWebPaywallUrl:
                showAlert(message: "Could not open web browser. Please try again.")
            default:
                showAlert(message: "An error occurred: \(error.localizedDescription)")
            }
        } catch {
            showAlert(message: "An unexpected error occurred.")
        }
    }
    
    // Helper methods
    private func showAlert(message: String) { /* ... */ }
}
```
:::note
After users return to the app, refresh the UI to reflect the profile updates. `AdaptyDelegate` will receive and process profile update events.
:::

## Open web paywalls in in-app browser

By default, web paywalls open in the external browser – e.g., in Safari.

However, to make the user experience smoother, you can open web paywalls in the in-app browser. This way, a browser window will appear on top of the running application, allowing users to make a purchase and then, quickly get back to the app.

To do this, set `in` to `inAppBrowser` when opening a web paywall:

```swift
do {
    try await Adapty.openWebPaywall(for: product, in: .inAppBrowser)
} catch {
    print("Failed to open web paywall: \(error)")
}
```