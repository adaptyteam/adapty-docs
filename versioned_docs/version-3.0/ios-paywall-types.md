---
title: "Paywall types in Adapty"
metadataTitle: "Guides | iOS SDK | Adapty Docs"
displayed_sidebar: sdkios
---

Adapty offers three distinct approaches to load and display paywall data: custom, remote config, and Paywall Builder. Each have specific loading requirements and you will want to factor those in when integrating them into your app’s architecture.

### Custom Paywall

Custom paywalls give you complete control over UI and UX. It requires the least remote data but demands the most architectural consideration since you're responsible for the entire rendering pipeline.

**Data Requirements:**

- Product information (pricing, subscription terms, identifiers)
- Basic placement configuration
- Optional custom attributes for personalization

**Ideal for:**

- Apps with specific design requirements that don't fit standard templates
- Teams with strong iOS development resources
- Apps needing tight integration with existing design systems

#### When to Load

The best time to load a custom paywall is just before the user is likely to access premium content without an active subscription, or before they request display of the paywall itself, like in placements within app settings. This optimizes the app’s memory usage, especially where you have multiple paywall locations. For custom paywalls, the list of products is critical to rendering your native views. The below extension adds to the functionality of the paywall repository, allowing you to get the products for a given placement by first fetching the paywall and then extracting its products.

```swift
extension PaywallRepository {
	func products(for placement: Placement) async throws -> [AdaptyPaywallProduct] {
    let paywall = paywall(for: placement)
    return Adapty.getPaywallProducts(paywall: paywall)
  }
}
```

#### Integration with Views

With the list of products for a given paywall in-hand, you can render your custom paywall design using their properties. Below is an example paywall view showcasing a basic design. Note the use of various properties in the `PaywallSubscriptionButton` like `.localizedTitle`, `.localizedPrice`, and `.localizedSubscriptionPeriod`. These and others like it are provided by the Adapty SDK to make it easy to present fields to your user in an already localized state.

```swift
import SwiftUI
import Adapty

struct AdaptyPaywallView: View {
  let paywallRepository: PaywallRepository
  let onDismiss: () -> Void
  
  @State private var paywallProducts: [AdaptyPaywallProduct]?
  @State private var selectedProduct: AdaptyPaywallProduct?
  @State private var isLoading = true
  
  var body: some View {
    NavigationStack {
      VStack {
        if let paywallProducts {
          ForEach(paywallProducts, id: \.vendorProductId) { product in
            Button {
              // no action for individual product button, see continue button below
            } label: {
              PaywallSubscriptionButton(
                selectedProduct: $selectedProduct,
                product: product
              )
              .padding(.horizontal)
              .padding(.top, 10)
            }
          }
          
          Button {
            Task {
              // Purchase product action
            }
          } label: {
            Text("Continue")
              .foregroundStyle(.white)
          }
          .padding(.horizontal)
          .disabled(selectedProduct == nil)
        }
      }
    }
    .task {
      do {
        paywallProducts = try await paywallRepository.products(for: .onboarding)
        isLoading = false
      } catch {
        // Error handling goes here...
      }
    }
  }
}

struct PaywallSubscriptionButton: View {
  @Binding var selectedProduct: AdaptyPaywallProduct?
  let product: AdaptyPaywallProduct
  
  var isCurrentlySelected: Bool {
    selectedProduct?.vendorProductId == product.vendorProductId
  }
  
  private let backgroundColor: Color = Color(hue: 221/360, saturation: 5/100, brightness: 95/100)
  private let selectedBackgroundColor: Color = Color(hue: 221/360, saturation: 15/100, brightness: 90/100)
  private let borderColor: Color = Color(hue: 221/360, saturation: 30/100, brightness: 75/100)
    
  var body: some View {
    Button {
      selectedProduct = product
    } label: {
      VStack(alignment: .leading) {
        Text(product.localizedTitle)
          .font(.title3)
        
        if let price = product.localizedPrice,
           let period = product.localizedSubscriptionPeriod {
          HStack(alignment: .firstTextBaseline, spacing: 2) {
            Text(price)
              .font(.title.weight(.semibold))
            
            Text("/ \(period)")
              .bold()
          }
        }
      }
      .padding()
      .background(isCurrentlySelected ? selectedBackgroundColor : backgroundColor, in: RoundedRectangle(cornerRadius: 16))
      .overlay(
        RoundedRectangle(cornerRadius: 16)
          .stroke(borderColor, lineWidth: isCurrentlySelected ? 2 : 0)
      )
      .foregroundStyle(.black)
    }
  }
}
```

### Remote Config Paywall

Remote config paywalls provide a middle ground between full control and convenience, using JSON configuration to drive custom UI rendering. They provide product information just like custom paywalls, but the additional JSON can define layout, styling, and content requirements for the view. If the configuration is malformed or missing, a fallback condition will be needed to render the paywall view in a default configuration.

**Data Requirements:**

- Product information (same as custom paywalls)
- Structured JSON configuration defining layout, content, and styling
- Fallback configuration for error scenarios

**Ideal for:**

- Apps wanting some remote control without giving up design flexibility
- Teams comfortable with JSON-driven UI patterns
- Apps with changing content requirements but consistent design patterns

#### JSON Configuration Management

To ensure the remote config data is delivered in a complete state, define a Swift model to represent and mirror what you’ve configured in your Adapty dashboard. What follows is an example providing properties for the key-value pairs from the server-side JSON, as well as a fallback that could be used in the event that the remote config data is malformed or missing. The `RemoteConfig` protocol can be applied to all remote config models you create to ensure compliance for decoding and fallback. Please note that the below example is just that. Your remote config needs will likely differ, so use this code as a starting point for designing your own model that’s customized to your app.

```swift
protocol RemoteConfigurable: Codable {
	static var fallback: Self { get }
}

struct OnboardingRemoteConfig: RemoteConfigurable {
    let headerText: String
    let backgroundColor: String
    let callToAction: String
    let features: [String]
    let layout: LayoutConfiguration
    
    struct LayoutConfiguration: Codable {
        let style: String
        let showFeatures: Bool
        let primaryButtonColor: String
    }
    
    static let fallback = OnboardingRemoteConfig(
        headerText: "Unlock Premium Features",
        backgroundColor: "#FFFFFF",
        callToAction: "Start Free Trial",
        features: ["Feature 1", "Feature 2", "Feature 3"],
        layout: LayoutConfiguration(
            style: "default",
            showFeatures: true,
            primaryButtonColor: "#007AFF"
        )
    )
}
```

With the above model in-hand, an additional function in the paywall repository will allow you to fetch the remote config data fully decoded for use with your view:

```
extension PaywallRepository {
	func remoteConfig<T: RemoteConfigurable>(for placement: Placement) async throws -> T? {
    let paywall = try await paywall(for: placement)
    if let data = paywall.remoteConfig?.jsonString.data(using: .utf8) {
      return try JSONDecoder().decode(T.self, from: data)
    }
    
    return nil
  }
}
```

From here, in a similar fashion to the custom paywall strategy, use the product data from the paywall in conjunction with the decoded remote config model to render your paywall view.

### Paywall Builder

Paywall Builder paywalls are fully designed and configured remotely, with the SDK handling all rendering and caching automatically.

**Data Requirements:**

- Product information (handled automatically)
- Complete UI configuration (managed by Adapty)
- Asset dependencies (images, fonts, handled by SDK)

**Ideal for:**

- Teams wanting to iterate on paywall design without app releases
- Apps where marketing teams need direct control over paywall presentation
- Rapid A/B testing scenarios requiring frequent paywall changes

#### Fetching `PaywallConfiguration`

Showing a Paywall Builder paywall in your app requires the `PaywallConfiguration` for a given `AdaptyPaywall` object. By adding the following to the paywall repository, you can get this by just providing the placement:

```swift
extension PaywallRepository {
	func configuration(for placement: Placement) async throws -> AdaptyUI.PaywallConfiguration {
    let paywall = paywall(for: placement)
    return try await AdaptyUI.getPaywallConfiguration(forPaywall: paywall)
  }
}
```

#### Presenting a Paywall Builder Paywall

Using the configuration object from above, it’s trivial to show a paywall, but keep in mind you’ll need to handle all possible outcomes of this presentation in the same place:

```swift
var body: some View {
    Text("Hello, world!")
      .paywall(
        isPresented: $isShowingPaywall,
        paywallConfiguration: paywallConfig,
        didFinishPurchase: { _, purchaseResult in
          switch purchaseResult {
            case .success(let profile, _):
              // TODO: Process new profile and unlock premium features
            default:
              break
          }
          isShowingPaywall = false
        },
        didFailPurchase: { _, error in
          isShowingPaywall = false
          // TODO: Present error to user and offer alternative
        },
        didFinishRestore: { profile in
          // TODO: Process updated profile and unlock premium features
          isShowingPaywall = false
        },
        didFailRestore: { error in
          isShowingPaywall = false
          // TODO: Present error to user and offer alternative
        },
        didFailRendering: { error in
          isShowingPaywall = false
          // TODO: Present error to user and offer alternative
        }
	    )
}
```

The `.paywall()` view modifier requires all of the above arguments to properly function. The two `didFinish...` closures cover the success states, and the remaining closures handle the various possible failure states. Be sure to both process the returned values as well as dismiss the paywall modal view.

This guide should help convey to you that paywall loading isn't just a technical implementation detail, but rather a core business capability that deserves the same architectural rigor as any other revenue-critical system. The patterns covered here represent a shift in thinking from paywalls as simple API calls to instead seeing them as an integral part of the user experience. How you approach paywall placement, loading speed, caching, and responsiveness will either accelerate or handicap both your technical execution and business results. By treating paywall performance as a first-class architectural concern, you create the foundation for sustainable revenue growth that scales with your user base rather than degrading under load.