---
title: "Understand the caching system in Adapty"
metadataTitle: "Guides | iOS SDK | Adapty Docs"
displayed_sidebar: sdkios
---

Adapty's caching architecture is designed to ensure your paywalls load reliably and quickly, even in challenging network conditions. Understanding how this system works is crucial for making informed decisions about when and how to fetch paywall data in production applications.

## How Adapty's multi-layer caching works
Adapty implements a sophisticated caching system with multiple layers working together to ensure paywall reliability:

1. **Regularly updated cache**: Local device cache that stores the most recent paywall data
2. **CDN Layer**: Content Delivery Network for faster global fetching
3. **Fallback server**: Stand-alone server used when CDN is unreachable
4. **Fallback paywalls**: Static paywall configurations stored locally as a last resort

This approach ensures you always get the latest version of your paywalls while maintaining reliability even when internet connectivity is scarce.

### How the layers work together
When you request a paywall, Adapty's SDK follows this priority order:

1. **Primary attempt**: Fetch fresh data from CDN
2. **CDN failure**: Fall back to the standalone Adapty server
3. **Network failure**: Return data from regularly updated cache
4. **Cache unavailable**: Use fallback paywall as last resort
5. **All layers fail**: Throw appropriate error

The system is designed to be invisible to your app's logic while maximizing both performance and reliability. Note that the fallback paywall does require configuration in your app project to function, but its usage at runtime is governed by the above order and will happen automatically. See [this doc](ios-use-fallback-paywalls.md) for more information on configuring local fallback paywalls in your project.

## Fetch policies
Adapty provides three distinct fetching strategies that let you balance data freshness against loading speed based on your app's needs and your users' network conditions.

#### .reloadRevalidatingCacheData

The recommended strategy (and default choice) for most production applications:

```swift
let paywall = try await Adapty.getPaywall(
    placementId: "from_onboarding",
    fetchPolicy: .reloadRevalidatingCacheData
)
```

This policy attempts to fetch fresh data from the server first, and falls back to cached data if the server request fails.

Use this policy when:

- Your paywalls include time-sensitive offers or pricing
- You frequently update paywall content or run A/B tests
- Network connectivity is generally stable for your user base
- Data accuracy is more important than loading speed

#### .returnCacheDataElseLoad
The strategy prioritizing speed; useful for users with unstable internet:

```swift
let paywall = try await Adapty.getPaywall(
    placementId: "from_onboarding", 
    fetchPolicy: .returnCacheDataElseLoad
)
```

This policy returns cached data immediately if it’s available, and only makes a network request if no cached data exists. It provides faster loading times, but at the possible expense of the freshest configuration. The cache is automatically updated regularly in the background by the SDK, making this approach a reliable way of loading paywall data, but there is the possibility that the latest changes may not be reflected in the paywall rendered.

Use this policy when:

- Your users frequently have poor internet connectivity
- Loading speed is critical to your user experience
- Your paywall content is relatively stable
- You can tolerate slightly outdated information

#### .returnCacheDataIfNotExpiredElseLoad(maxAge:)
The strategy prioritizing speed, but with a max age cutoff:

```swift
let paywall = try await Adapty.getPaywall(
    placementId: "from_onboarding", 
    fetchPolicy: .returnCacheDataIfNotExpiredElseLoad(maxAge: TimeInterval(60*30)) // 30 min timeout
)
```

This policy returns cached data immediately if it’s available, and only makes a network request if no cached data exists or if the cached data timeout has been exceeded. Compared to the previous two strategies, this one balances quick loading with a sensible timeout to prevent stale paywall data from being loaded from local resources.

Use this policy when:

- You want to balance loading speed with fresh paywall data
- You can tolerate slightly outdated information

## Cache persistence and lifecycle

Understanding the Adapty SDK’s cache behavior is critical to using it effectively. The cache:

- Survives app restarts and remains available across sessions
- Only cleared when:
    - The app is completely uninstalled and reinstalled
    - Manual cleanup is performed (rare edge cases)
- The Adapty SDK performs regular automatic cache updates

You may wish to dynamically choose a preferred loading strategy based on the network conditions of the device at runtime. What follows is an incomplete example designed to illustrate a possible implementation of this idea. Note that the `NetworkMonitor` type is left up to the reader to implement, and the `AdaptyPaywallService` is just a stand-in for a more full-featured service.

```swift
import Adapty

enum Placement: String {
  case onboarding = "from_onboarding"
  case deepLink = "deep_link"
  case settings = "from_settings"
}

class AdaptyPaywallService {
  private let networkMonitor = NetworkMonitor()
  
  func getPaywall(for placement: Placement, overrideWith policyOverride: AdaptyPlacementFetchPolicy? = nil) async throws -> AdaptyPaywall {
    let fetchPolicy: AdaptyPlacementFetchPolicy
    if let policyOverride {
      fetchPolicy = policyOverride
    } else {
      fetchPolicy = await networkMonitor.quality < .good ? .returnCacheDataElseLoad : .reloadRevalidatingCacheData
    }
    
    return try await Adapty.getPaywall(placementId: placement.rawValue, fetchPolicy: fetchPolicy)
  }
  
  func refreshPaywallCache(for placement: Placement) async throws -> AdaptyPaywall {
    // Explicitly refresh cache with fresh data
    return try await getPaywall(
      for: placement,
      overrideWith: .reloadRevalidatingCacheData
    )
  }
}
```

An implementation like the above allows the app to determine the network quality and choose an appropriate fetching policy at runtime. The `policyOverride` parameter also lets the developer override that determination if it’s known for a particular placement what policy should be used.

The `refreshPaywallCache` function attempts to provide you with an up-to-date version of the paywall data cached locally, perhaps for the critical placements where you want to preload the freshest data.

## Integration with сomplex app architectures

Understanding Adapty's caching enables more sophisticated integration patterns. One such option is to create a repository for paywalls that follows the specific rules you need for your use-cases.

Shown below is a possible strategy that attempts to pre-load the critical placements before they are needed. If it fails, the system will fall back to using the paywall service’s standard behavior (live reload unless network conditions are poor). If the `criticalPlacements` set is initialized as empty, no preloading will occur, and all paywalls will be fetched using the standard behavior of the paywall service.

```swift
import Adapty

class PaywallRepository {
  private let paywallService: AdaptyPaywallService
  private(set) var cachedPaywalls: [Placement: AdaptyPaywall] = [:]
  
  init(paywallService: AdaptyPaywallService, criticalPlacements: Set<Placement> = []) {
    self.paywallService = paywallService
    if criticalPlacements.count > 0 {
      Task {
        for placement in criticalPlacements {
          cachedPaywalls[placement] = try? await paywallService.refreshPaywallCache(for: placement)
        }
      }
    }
  }
}
```