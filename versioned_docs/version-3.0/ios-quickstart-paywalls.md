---
title: "Present a paywall in iOS SDK"
description: "Quickstart guide to setting up Adapty for in-app subscription management."
metadataTitle: "Adapty Quickstart Guide | Adapty Docs"
keywords: ['paywalls ios', 'sdk ios']
rank: 70
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import PaywallsIntro from '@site/src/components/reusable/PaywallsIntro.md';


<PaywallsIntro />

:::tip
This is the minimum setup you need to get up and running with paywalls created using the builder. Read more detailed [guides on working with paywalls](ios-paywalls.md).
:::

## 1. Get the paywall

Your paywalls are associated with [placements](placements.md) configured in the dashboard. Placements allow you to run different paywalls for different audiences or to run [A/B tests](ab-tests.md). 

That's why, to get a paywall to display, you need to:

1. Get the `paywall` object by the placement ID using the `getPaywall` method and check whether it is a paywall created in the builder.

2. If it is a paywall created in the builder, get its view configuration using the `getPaywallConfiguration` method. The view configuration contains the UI elements and styling needed to display the paywall.

:::tip
This quickstart provides the minimum configuration required to display a paywall. For advanced configuration details, see our [guide on getting paywalls](get-pb-paywalls).
::: 

<Tabs>

<TabItem value="swiftui" label="SwiftUI" default>
```swift
import Adapty
import AdaptyUI

@State private var paywallConfiguration: AdaptyUI.PaywallConfiguration?
@State private var isLoadingPaywall = false
@State private var paywallError: Error?

func loadPaywall() async {
    isLoadingPaywall = true
    defer { isLoadingPaywall = false }

    do {
        let paywall = try await Adapty.getPaywall("YOUR_PLACEMENT_ID")
        
        guard paywall.hasViewConfiguration else {
            print("Paywall doesn't have view configuration")
            return
        }
        
        paywallConfiguration = try await AdaptyUI.getPaywallConfiguration(forPaywall: paywall)
        paywallError = nil
    } catch {
        paywallError = error
        print("Failed to load paywall: \(error)")
    }
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

:::tip
For more details on how to display a paywall, see our [guide](ios-present-paywalls.md).
:::

<Tabs>

<TabItem value="swiftui" label="SwiftUI" default>

In SwiftUI, when displaying the paywall, you also need to handle events. Some of them are optional, but `didFailPurchase`, `didFinishRestore`, `didFailRestore`, and `didFailRendering` are required. When testing, you can just copy the code from the snippet below to log these errors.

:::tip
Handling `didFinishPurchase` isn't required, but is useful when you want to perform actions after a successful purchase. If you don't implement that callback, the paywall will dismiss automatically.
:::

```swift
struct ContentView: View {
    @State private var paywallPresented = false
    @State private var alertItem: AlertItem?
    @State private var paywallConfiguration: AdaptyUI.PaywallConfiguration?

    var body: some View {
        VStack {
            Text("Your App Content")
        }
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
    }
}

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
If you are not using the paywall builder for your paywalls, consider our [guide for implementing paywalls manually](ios-implement-paywalls-manually).
:::

## 3. Check subscription status before displaying

Now that you've implemented the paywall, you will want to only show it to users who baven't already paid for premium access. Before showing a paywall, check if the user already has premium access.

You need to get their profile using the `getProfile` method and check the access levels in the `profile` object.

By default, Adapty provides a built-in access level called `premium`, but you can [set up your own access levels](access-level.md) in the Adapty dashboard.

:::tip
Proceed with the quickstart guide to also [implement listening for subscription status changes](ios-check-subscription-status).
:::

<Tabs>

<TabItem value="swiftui" label="SwiftUI" default>
The basic idea of how paywalls are displayed in SwiftUI is that `isPresented` must be set to `true` when you need to show the paywall and to `false` when you need to hide it. By default, we'll set it to `false` and temporarily set it to `true` when you check the subscription status.

Check the access level in the view to change the `paywallPresented` state.

```swift
import SwiftUI
import AdaptyUI

struct ContentView: View {
  @State private var paywallPresented = false
  @State private var alertItem: AlertItem? = nil
  @State private var paywallConfiguration: AdaptyUI.PaywallConfiguration? = nil // config from previous step
  
  var body: some View {
    VStack {
      Text("Your App Content")
    }
    .paywall(
      isPresented: $paywallPresented,
      configuration: paywallConfiguration,
      // ...other required parameters
    )
    .task {
      await loadPaywall()
      let hasAccess = await checkAccessLevel()
      if !hasAccess && paywallConfiguration != nil {
        paywallPresented = true
      }
    }
  }
  
  func checkAccessLevel() async -> Bool {
    do {
      let profile = try await Adapty.getProfile()
      return profile.accessLevels["premium"]?.isActive ?? false
    } catch {
      print("Error checking access level: \(error)")
      // Return false to show paywall if access check fails
      return false
    }
  }
}
```
</TabItem>

<TabItem value="uikit" label="UIKit" default>

In UIKit, you will probably want to display the paywall controller only if the access level is not premium. So, we will run `checkAccessLevel` and, if it is true, present the paywall.

```swift
func checkAccessLevel() async throws -> Bool {
    let profile = try await Adapty.getProfile()
    return profile.accessLevels["premium"]?.isActive ?? false
}

override func viewDidLoad() {
    super.viewDidLoad()
    
    Task {
        do {
            let config = try await loadPaywall()
            let hasAccess = try await checkAccessLevel()
            
            if !hasAccess, let config = config {
                await MainActor.run {
                    presentPaywall(with: config)
                }
            }
        } catch {
            print("Error: \(error)")
        }
    }
}
```
</TabItem>
</Tabs>

## 4. Handle button actions

When users click buttons in the paywall, purchases and restoration are handled automatically. However, other buttons have custom or pre-defined IDs and require handling actions in your code.

For example, your paywall probably has a close button. Let's see how you can handle it in your implementation.

:::tip
Read our [guide](ios-handling-events) on how to handle other button actions and events.
:::


<Tabs>

<TabItem value="swiftui" label="SwiftUI" default>

For SwiftUI, if you get the `close` action, you change the `paywallPresented` value to `false`, so the paywall is hidden.

```swift
import SwiftUI
import AdaptyUI

struct ContentView: View {
    @State private var paywallPresented = false
    @State private var alertItem: AlertItem? = nil
    @State private var paywallConfiguration: AdaptyUI.PaywallConfiguration? = nil // from previous step

    var body: some View {
        VStack {
            Text("Your App Content")
        }
        .paywall(
            isPresented: $paywallPresented,
            configuration: paywallConfiguration,
            // highlight-start
            didPerformAction: { action in
              switch action {
                  case .close:
                      paywallPresented = false
                  default:
                      // Handle other actions
                      break
              }
            },
            // highlight-end
            // other parameters
        )
    }
}

```
</TabItem>

<TabItem value="uikit" label="UIKit" default>
For UIKit, you need to implement the `paywallController(_:didPerform:)` method from the delegate that will dismiss the displayed controller when the user clicks the `close` button.

```swift
func paywallController(_ controller: AdaptyUI.PaywallController, 
                       didPerform action: AdaptyUI.UserAction) {
    switch action.type {
    case .close:
        controller.dismiss(animated: true)
    default:
        break
    }
}

```
</TabItem>
</Tabs>

## Full example

Here is how all those steps can be integrated in your app together.

<Tabs>

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
          case .close:
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
    
    let hasAccess = await checkAccessLevel()
    if !hasAccess && paywallConfiguration != nil {
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
  
  private func checkAccessLevel() async -> Bool {
    do {
      let profile = try await Adapty.getProfile()
      return profile.accessLevels["premium"]?.isActive ?? false
    } catch {
      print("Error checking access level: \(error)")
      return false
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
      let hasAccess = try await checkAccessLevel()
            
      if !hasAccess,
         let paywallConfiguration {
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
  
  private func checkAccessLevel() async throws -> Bool {
    let profile = try await Adapty.getProfile()
    return profile.accessLevels["premium"]?.isActive ?? false
  }
  
  private func presentPaywall(with config: AdaptyUI.PaywallConfiguration) {
    let paywallController = AdaptyUI.paywallController(with: config, delegate: self)
    present(paywallController, animated: true)
  }
}

// MARK: - AdaptyPaywallControllerDelegate

extension ViewController: AdaptyPaywallControllerDelegate {
  func paywallController(_ controller: AdaptyUI.PaywallController,
                         didPerform action: AdaptyUI.UserAction) {
    switch action.type {
      case .close:
        controller.dismiss(animated: true)
      default:
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