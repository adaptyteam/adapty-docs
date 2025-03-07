---
title: "Migration guide to iOS Adapty SDK v.3.4"
description: "Migrate to Adapty SDK v3.4 for better performance and new monetization features."
metadataTitle: "Migrating to Adapty SDK v3.4 | Adapty Docs"
---

<!--- Adapty SDK 3.4.0 is a major release that introduces improvements that require migration steps on your end. ---> 

**Update Adapty SDK activation**

<Tabs groupId="current-os" queryString>
<TabItem value="swift" label="Swift" default>

```diff showLineNumbers
// In your AppDelegate class:
import Adapty

let configurationBuilder =
    AdaptyConfiguration
        .builder(withAPIKey: "PUBLIC_SDK_KEY")

- Adapty.activate(with: configurationBuilder) { error in
+ Adapty.activate(with: configurationBuilder.build()) { error in
  // handle the error
}
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI" default>

```diff showLineNumbers
import Adapty

@main
struct SampleApp: App {
    init() {
      let configurationBuilder =
        AdaptyConfiguration
          .builder(withAPIKey: "PUBLIC_SDK_KEY")
      
        Task {
-            try await Adapty.activate(with: configurationBuilder)
+            try await Adapty.activate(with: configurationBuilder.build())
        }
    }

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

</TabItem>
</Tabs>

**Update fallback paywall files**

Update your fallback paywall files to ensure compatibility with the new SDK version:

1. [Download the updated fallback paywall files](fallback-paywalls#download-fallback-paywalls-as-a-file-in-the-adapty-dashboard) from the Adapty Dashboard.
2. [Replace the existing fallback paywalls in your mobile app](ios-use-fallback-paywalls) with the new files.