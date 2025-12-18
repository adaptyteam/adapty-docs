---
title: "Quickstart for integrating purchases with Adapty into your custom paywall in iOS SDK"
description: "Quickstart guide to setting up Adapty for in-app subscription management."
metadataTitle: "Adapty Quickstart Guide | Adapty Docs"
keywords: ['paywalls ios', 'sdk ios', 'paywall', 'getPaywall']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide shows you how to integrate Adapty's purchase handling into your custom paywall UI. You'll fetch products from Adapty, process purchases, and handle restores, while maintaining full control over your paywall design.

:::important
**This guide is for implementing custom paywalls.** If you want the easiest way to enable purchases, use the [Adapty Paywall Builder](ios-quickstart-paywalls.md). With Paywall Builder, you create paywalls in a no-code visual editor, and Adapty handles all purchase logic automatically.
:::

## Before you start

### Set up products

To enable in-app purchases, you need to understand three key concepts:

- [**Products**](product.md) – anything users can buy (subscriptions, consumables, lifetime access)
- [**Paywalls**](paywalls.md) are configurations that define which products to offer. In Adapty, paywalls are the only way to retrieve products, but this design lets you modify offerings, pricing, and product combinations without touching your app code.
- [**Placements**](placements.md) – where and when you show paywalls in your app (like `main`, `onboarding`, `settings`). You set up paywalls for placements in the dashboard, then request them by placement ID in your code. This makes it easy to run A/B tests and show different paywalls to different users.

Working with these concepts is required even if you work with your custom paywall. Basically, they are just your way to manage the products you sell in your app.

When implementing your custom paywall, you will need to use a **placement ID** to retrieve products, so follow the quickstart guide [here](quickstart.md).

### Manage users

You can work either with or without backend authentication on your side.

However, the Adapty SDK handles anonymous and identified users differently. Read the [identification quickstart guide](ios-quickstart-identify.md) to understand the specifics and ensure you are working with users properly.

## Step 1. Get products

To retrieve products for your custom paywall, you need to:

1. Get the `paywall` object by the [placement](placements.md) ID using the `getPaywall` method.
2. Get the products array for this paywall using the `getPaywallProducts` method.

<Tabs groupId="current-os" queryString>

<TabItem value="swift" label="Swift" default>

```swift
import Adapty

func loadPaywall() async {
    do {
        let paywall = try await Adapty.getPaywall("YOUR_PLACEMENT_ID")
        let products = try await Adapty.getPaywallProducts(paywall: paywall)
        
        // Use products to build your custom paywall UI
    } catch {
        // Handle the error
    }
}
```
</TabItem>

<TabItem value="swift-callback" label="Swift-Callback" default>

```swift
import Adapty

func loadPaywall() {
    Adapty.getPaywall("YOUR_PLACEMENT_ID") { result in
        switch result {
        case let .success(paywall):
            Adapty.getPaywallProducts(paywall: paywall) { result in
                switch result {
                case let .success(products):
                    // Use products to build your custom paywall UI
                case let .failure(error):
                    // Handle the error
                }
            }
        case let .failure(error):
            // Handle the error
        }
    }
}
```
</TabItem>
</Tabs>



## Step 2. Accept purchases

When a user taps on a product in your custom paywall, call the `makePurchase` method with the selected product. This will handle the purchase flow and return the updated profile.

<Tabs groupId="current-os" queryString>

<TabItem value="swift" label="Swift" default>

```swift
import Adapty

func purchaseProduct(_ product: AdaptyPaywallProduct) async {
    do {
        let purchaseResult = try await Adapty.makePurchase(product: product)
        
        switch purchaseResult {
        case .userCancelled:
            // User canceled the purchase
            break
        case .pending:
            // Purchase is pending (e.g., awaiting parental approval)
            break
        case let .success(profile, transaction):
            // Purchase successful, profile updated
            break
        }
    } catch {
        // Handle the error
    }
}
```
</TabItem>

<TabItem value="swift-callback" label="Swift-Callback" default>

```swift
import Adapty

func purchaseProduct(_ product: AdaptyPaywallProduct) {
    Adapty.makePurchase(product: product) { result in
        switch result {
        case let .success(purchaseResult):
            switch purchaseResult {
            case .userCancelled:
                // User canceled the purchase
                break
            case .pending:
                // Purchase is pending (e.g., awaiting parental approval)
                break
            case let .success(profile, transaction):
                // Purchase successful, profile updated
                break
            }
        case let .failure(error):
            // Handle the error
        }
    }
}
```
</TabItem>
</Tabs>

## Step 3. Handle restores

Apple requires all apps with subscriptions to provide a way for users to restore their purchases. While purchases are automatically restored when a user logs in with their Apple ID, you must still implement a restore button in your app.

Call the `restorePurchases` method when the user taps the restore button. This will sync their purchase history with Adapty and return the updated profile.

<Tabs groupId="current-os" queryString>

<TabItem value="swift" label="Swift" default>

```swift
import Adapty

func restorePurchases() async {
    do {
        let profile = try await Adapty.restorePurchases()
        // Restore successful, profile updated
    } catch {
        // Handle the error
    }
}
```
</TabItem>

<TabItem value="swift-callback" label="Swift-Callback" default>

```swift
import Adapty

func restorePurchases() {
    Adapty.restorePurchases { result in
        switch result {
        case let .success(profile):
            // Restore successful, profile updated
        case let .failure(error):
            // Handle the error
        }
    }
}
```
</TabItem>
</Tabs>

## Next steps

Your paywall is ready to be displayed in the app.

Now, you need to [check the users' access level](ios-check-subscription-status.md) to ensure you display a paywall or give access to paid features to right users.

## Full example

Here is how all the steps from this guide can be integrated in your app together.

<Tabs groupId="current-os" queryString>

<TabItem value="swift" label="Swift" default>

```swift
import Adapty

class PaywallManager {
    private var paywall: AdaptyPaywall?
    private var products: [AdaptyPaywallProduct] = []
    
    func loadPaywall() async {
        do {
            paywall = try await Adapty.getPaywall("YOUR_PLACEMENT_ID")
            products = try await Adapty.getPaywallProducts(paywall: paywall!)
            
            // Update your UI with products
        } catch {
            // Handle the error
        }
    }
    
    func purchaseProduct(_ product: AdaptyPaywallProduct) async {
        do {
            let purchaseResult = try await Adapty.makePurchase(product: product)
            
            switch purchaseResult {
            case .userCancelled:
                // User canceled the purchase
                break
            case .pending:
                // Purchase is pending (e.g., awaiting parental approval)
                break
            case let .success(profile, _):
                // Purchase successful, profile updated
                break
            }
        } catch {
            // Handle the error
        }
    }
    
    func restorePurchases() async {
        do {
            let profile = try await Adapty.restorePurchases()
            // Restore successful, profile updated
        } catch {
            // Handle the error
        }
    }
}
```
</TabItem>

<TabItem value="swift-callback" label="Swift-Callback" default>

```swift
import Adapty

class PaywallManager {
    private var paywall: AdaptyPaywall?
    private var products: [AdaptyPaywallProduct] = []
    
    func loadPaywall() {
        Adapty.getPaywall("YOUR_PLACEMENT_ID") { result in
            switch result {
            case let .success(paywall):
                self.paywall = paywall
                
                Adapty.getPaywallProducts(paywall: paywall) { result in
                    switch result {
                    case let .success(products):
                        self.products = products
                        // Update your UI with products
                    case let .failure(error):
                        // Handle the error
                    }
                }
            case let .failure(error):
                // Handle the error
            }
        }
    }
    
    func purchaseProduct(_ product: AdaptyPaywallProduct) {
        Adapty.makePurchase(product: product) { result in
            switch result {
            case let .success(purchaseResult):
                switch purchaseResult {
                case .userCancelled:
                    // User canceled the purchase
                    break
                case .pending:
                    // Purchase is pending (e.g., awaiting parental approval)
                    break
                case let .success(profile, _):
                    // Purchase successful, profile updated
                    break
                }
            case let .failure(error):
                // Handle the error
            }
        }
    }
    
    func restorePurchases() {
        Adapty.restorePurchases { result in
            switch result {
            case let .success(profile):
                // Restore successful, profile updated
            case let .failure(error):
                // Handle the error
            }
        }
    }
}
```
</TabItem>
</Tabs>