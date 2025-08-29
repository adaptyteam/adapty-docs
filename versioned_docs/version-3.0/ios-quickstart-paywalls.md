---
title: "Enable purchases by using paywalls in iOS SDK"
description: "Quickstart guide to setting up Adapty for in-app subscription management."
metadataTitle: "Adapty Quickstart Guide | Adapty Docs"
keywords: ['paywalls ios', 'sdk ios', 'paywall', 'paywall builder', 'getPaywall']
rank: 90
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import PaywallsIntro from '@site/src/components/reusable/PaywallsIntro.md';


To enable in-app purchases, you need to understand three key concepts:

- [**Products**](product.md) – anything users can buy (subscriptions, consumables, lifetime access)
- [**Paywalls**](paywalls.md) are configurations that define which products to offer. In Adapty, paywalls are the only way to retrieve products, but this design lets you modify offerings, pricing, and product combinations without touching your app code.
- [**Placements**](placements.md) – where and when you show paywalls in your app (like `main`, `onboarding`, `settings`). You set up paywalls for placements in the dashboard, then request them by placement ID in your code. This makes it easy to run A/B tests and show different paywalls to different users.

Adapty offers you three ways to enable purchases in your app. Select one of them depending on your app requirements:

| Implementation         | Complexity | When to use                                                                                                                                                                                                                                |
|------------------------|------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Adapty Paywall Builder | ✅ Easy     | You [create a complete, purchase-ready paywall in the no-code builder](quickstart-paywalls). Adapty automatically renders it and handles all the complex purchase flow, receipt validation, and subscription management behind the scenes. |
| Manually created paywalls | 🟡 Medium  | You implement your paywall UI in your app code, but still get the paywall object from Adapty to maintain flexibility in product offerings. See the [guide](making-purchases).                                                              |
| Observer mode              | 🔴 Hard    | You already have your own purchase handling infrastructure and want to keep using it. Note that the observer mode has its limitations in Adapty. See the [article](observer-vs-full-mode).                                                 |

:::important
**The steps below show how to implement a paywall created in the Adapty paywall builder.**

If you don't want to use the paywall builder, see the [guide for handling purchases in manually created paywalls](making-purchases.md).
:::

To display a paywall created in the Adapty paywall builder, in your app code, you only need to:

1. **Get the paywall**: Get the paywall from Adapty.
2. **Display the paywall and Adapty will handle purchases for you**: Show the paywall container you've got in your app.
3. **Handle button actions**: Associate user interactions with the paywall with your app's response to them. For example, open links or close the paywall when users click buttons.

## 1. Get the paywall created in the paywall builder

Your paywalls are associated with placements configured in the dashboard. Placements allow you to run different paywalls for different audiences or to run [A/B tests](ab-tests.md). 

To get a paywall created in the Adapty paywall builder, you need to:

1. Get the `paywall` object by the [placement](placements.md) ID using the `getPaywall` method and check whether it is a paywall created in the builder.

2. Get the paywall view configuration using the `getPaywallConfiguration` method. The view configuration contains the UI elements and styling needed to display the paywall.

:::important
To get the view configuration, you must switch on the **Show on device** toggle in the Paywall Builder. Otherwise, you will get an empty view configuration, and the paywall won't be displayed.
:::

<Tabs groupId="current-os" queryString>

<TabItem value="swiftui" label="SwiftUI" default>
```swift
import Adapty
import AdaptyUI

func loadPaywall() async {
let paywall = try await Adapty.getPaywall("YOUR_PLACEMENT_ID")

    guard paywall.hasViewConfiguration else {
        print("Paywall doesn't have view configuration")
        return
    }
    
    paywallConfiguration = try await AdaptyUI.getPaywallConfiguration(forPaywall: paywall)
}
```
</TabItem>

<TabItem value="uikit" label="UIKit" default>

```swift
import Adapty
import AdaptyUI

func loadPaywall() async throws -> AdaptyUI.PaywallConfiguration? {
    let paywall = try await Adapty.getPaywall("YOUR_PLACEMENT_ID")
    
    guard paywall.hasViewConfiguration else {
        print("Paywall doesn't have view configuration")
        return nil
    }
    
    return try await AdaptyUI.getPaywallConfiguration(forPaywall: paywall)
}

```
</TabItem>
</Tabs>

## 2. Display the paywall

Now, when you have the paywall configuration, it's enough to add a few lines to display your paywall.


<Tabs groupId="current-os" queryString>

<TabItem value="swiftui" label="SwiftUI" default>

In SwiftUI, when displaying the paywall, you also need to handle events. Some of them are optional, but `didFailPurchase`, `didFinishRestore`, `didFailRestore`, and `didFailRendering` are required. When testing, you can just copy the code from the snippet below to log these errors.

:::tip
Handling `didFinishPurchase` isn't required, but is useful when you want to perform actions after a successful purchase. If you don't implement that callback, the paywall will dismiss automatically.
:::

```swift
.paywall(
    isPresented: $paywallPresented,
    paywallConfiguration: paywallConfiguration,
    didFailPurchase: { product, error in
        print("Purchase failed: \(error)")
    },
    didFinishRestore: { profile in
        print("Restore finished successfully")
    },
    didFailRestore: { error in
        print("Restore failed: \(error)")
    },
    didFailRendering: { error in
        paywallPresented = false
        print("Rendering failed: \(error)")
    },
    showAlertItem: $alertItem
)
```
</TabItem>

<TabItem value="uikit" label="UIKit" default>

```swift
import UIKit
import AdaptyUI

func presentPaywall(with config: AdaptyUI.PaywallConfiguration) {
    let paywallController = AdaptyUI.paywallController(
        with: config,
        delegate: self
    )
    
    present(paywallController, animated: true)
}

```
</TabItem>
</Tabs>

:::info
For more details on how to display a paywall, see our [guide](ios-present-paywalls.md).
:::

## 3. Handle button actions

When users click buttons in the paywall, the iOS SDK automatically handles purchases, restoration, closing the paywall, and opening links. 

However, other buttons have custom or pre-defined IDs and require handling actions in your code. Or, you may want to override their default behavior.

For example, here is the default behavior for the close button. You don't need to add it in the code, but here, you can see how it is done if needed.

:::tip
Read our guides on how to handle button [actions](handle-paywall-actions.md) and [events](ios-handling-events.md).
:::


<Tabs groupId="current-os" queryString>

<TabItem value="swiftui" label="SwiftUI" default>

```swift
import SwiftUI
import AdaptyUI

didPerformAction: { action in
    switch action {
        case let .close:
            paywallPresented = false // default behavior
        default:
            break
    }
}
```
</TabItem>

<TabItem value="uikit" label="UIKit" default>

```swift
func paywallController(_ controller: AdaptyPaywallController,
                       didPerform action: AdaptyUI.Action) {
    switch action {
        case let .close:
            controller.dismiss(animated: true) // default behavior
        break
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

<TabItem value="swiftui" label="SwiftUI" default>

```swift
import SwiftUI
import Adapty
import AdaptyUI

struct ContentView: View {
  @State private var paywallPresented = false
  @State private var alertItem: AlertItem?
  @State private var paywallConfiguration: AdaptyUI.PaywallConfiguration?
  @State private var isLoading = false
  @State private var hasInitialized = false
  
  var body: some View {
    VStack {
      if isLoading {
        ProgressView("Loading...")
      } else {
        Text("Your App Content")
      }
    }
    .task {
      guard !hasInitialized else { return }
      await initializePaywall()
      hasInitialized = true
    }
    .paywall(
      isPresented: $paywallPresented,
      configuration: paywallConfiguration,
      didPerformAction: { action in
        switch action.type {
          case let .close:
              paywallPresented = false
          default:
              break
        }
      },
      didFailPurchase: { product, error in
        print("Purchase failed: \(error)")
      },
      didFinishRestore: { profile in
        print("Restore finished successfully")
      },
      didFailRestore: { error in
        print("Restore failed: \(error)")
      },
      didFailRendering: { error in
        print("Rendering failed: \(error)")
      },
      showAlertItem: $alertItem
    )
  }
  
  private func initializePaywall() async {
    isLoading = true
    defer { isLoading = false }
    
    await loadPaywall()
    paywallPresented = true
    }
  }
  
  private func loadPaywall() async {
    do {
      let paywall = try await Adapty.getPaywall("YOUR_PLACEMENT_ID")
      guard paywall.hasViewConfiguration else {
        print("Paywall doesn't have view configuration")
        return
      }
      paywallConfiguration = try await AdaptyUI.getPaywallConfiguration(forPaywall: paywall)
    } catch {
      print("Failed to load paywall: \(error)")
    }
  }
}

```
</TabItem>

<TabItem value="uikit" label="UIKit" default>

```swift
import UIKit
import Adapty
import AdaptyUI

class ViewController: UIViewController {
  private var paywallConfiguration: AdaptyUI.PaywallConfiguration?
  
  override func viewDidLoad() {
    super.viewDidLoad()
    
    Task {
      await initializePaywall()
    }
  }
  
  private func initializePaywall() async {
    do {
      paywallConfiguration = try await loadPaywall()
            
      if let paywallConfiguration {
        await MainActor.run {
          presentPaywall(with: paywallConfiguration)
        }
      }
    } catch {
      print("Error initializing paywall: \(error)")
    }
  }
  
  private func loadPaywall() async throws -> AdaptyUI.PaywallConfiguration? {
    let paywall = try await Adapty.getPaywall("YOUR_PLACEMENT_ID")
    
    guard paywall.hasViewConfiguration else {
      print("Paywall doesn't have view configuration")
      return nil
    }
    
    return try await AdaptyUI.getPaywallConfiguration(forPaywall: paywall)
  }
  
  private func presentPaywall(with config: AdaptyUI.PaywallConfiguration) {
    let paywallController = AdaptyUI.paywallController(with: config, delegate: self)
    present(paywallController, animated: true)
  }
}

// MARK: - AdaptyPaywallControllerDelegate

extension ViewController: AdaptyPaywallControllerDelegate {
  func paywallController(_ controller: AdaptyPaywallController,
                       didPerform action: AdaptyUI.Action) {
    switch action {
        case let .close:
            controller.dismiss(animated: true)
        break
    }
 }
  
  func paywallController(_ controller: AdaptyUI.PaywallController,
                         didFailPurchase product: AdaptyPaywallProduct,
                         error: AdaptyError) {
    print("Purchase failed for \(product.vendorProductId): \(error)")
    
    guard error.adaptyErrorCode != .paymentCancelled else {
      return // Don't show alert for user cancellation
    }
    
    let message = switch error.adaptyErrorCode {
      case .paymentNotAllowed:
        "Purchases are not allowed on this device."
      default:
        "Purchase failed. Please try again."
    }
    
    let alert = UIAlertController(title: "Purchase Error", message: message, preferredStyle: .alert)
    let okAction = UIAlertAction(title: "OK", style: .default) { _ in }
    alert.addAction(okAction)
    present(alert, animated: true)
  }
  
  func paywallController(_ controller: AdaptyUI.PaywallController,
                         didFinishRestore profile: AdaptyProfile) {
    print("Restore finished successfully")
    controller.dismiss(animated: true)
  }
  
  func paywallController(_ controller: AdaptyUI.PaywallController,
                         didFailRestore error: AdaptyError) {
    print("Restore failed: \(error)")
  }
  
  func paywallController(_ controller: AdaptyUI.PaywallController,
                         didFailRendering error: AdaptyError) {
    print("Rendering failed: \(error)")
    controller.dismiss(animated: true)
  }
}

```
</TabItem>
</Tabs>