---
title: "App lifecycle integration patterns"
metadataTitle: "Guides | iOS SDK | Adapty Docs"
displayed_sidebar: sdkios
---

Integrating paywall data loading into your app's lifecycle requires careful consideration of timing, user experience, and performance. The key is fetching data when it's most likely to be needed while avoiding unnecessary requests that could impact app launch performance or user experience.

The timing of your initial paywall data fetching can significantly impact perceived app performance and user experience. The strategy should vary based on how central paywalls are to your app's core functionality.

## Early launch strategy
For apps where paywalls are critical to the user journey (freemium apps, content subscription apps), fetch paywall data early in the launch process. The previously mentioned paywall repository will automatically fetch the critical paywalls passed in during `init`.

```swift
@main
struct MyApp: App {
    @State private var paywallRepo: PaywallRepository
    
    init() {
	    let paywallService = AdaptyPaywallService()
	    let paywallRepository = PaywallRepository(paywallService: paywallService, criticalPlacements: [Placement.onboarding, Placement.settings])
	    self.paywallRepo = paywallRepository
    }
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(paywallRepo)
        }
    }
}
```

## Lazy loading strategy
For apps where paywalls are secondary features, or you don’t frequently update or A/B test your paywalls, defer paywall loading until actually needed:

```swift
extension PaywallRepository {
	private func paywall(for placement: Placement) async throws -> AdaptyPaywall {
    if let cached = cachedPaywalls[placement] {
      Task {
        // Opportunistically refresh paywall cache for next fetch
        if let fresh = try? await paywallService.refreshPaywallCache(for: placement) {
          cachedPaywalls[placement] = fresh
        }
      }
      return cached
    } else {
      let paywall = try await paywallService.getPaywall(for: placement)
      cachedPaywalls[placement] = paywall
      return paywall
    }
  }
}
```
