---
title: "iOS – Configure Adapty SDK"
description: ""
metadataTitle: ""
---

You only need to configure the Adapty SDK once, typically early in your application lifecycle:

```swift title="Swift"
// In your AppDelegate class:

let configurationBuilder =
	Adapty.Configuration
		.Builder(withAPIKey: "PUBLIC_SDK_KEY")
		.with(observerMode: false)
		.with(customerUserId: "YOUR_USER_ID")
		.with(idfaCollectionDisabled: false)
		.with(ipAddressCollectionDisabled: false)

Adapty.activate(with: configurationBuilder) { error in
  // handle the error
}
```
```swift title="SwiftUI"
import Adapty

@main
struct SampleApp: App {
    init() 
      let configurationBuilder =
        Adapty.Configuration
          .Builder(withAPIKey: "PUBLIC_SDK_KEY")
          .with(observerMode: false)
          .with(customerUserId: "YOUR_USER_ID")
          .with(idfaCollectionDisabled: false)
          .with(ipAddressCollectionDisabled: false)

        Adapty.activate(with: configurationBuilder) { error in
          // handle the error
        }
    }

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

Parameters:

| Parameter | Presence | Description |
|---------|--------|-----------|
| **PUBLIC_SDK_KEY** | required | The key you can find in the **Public SDK key** field of your app settings in Adapty: [**App settings**-> **General** tab -> **API keys** subsection](https://app.adapty.io/settings/general) |
| **observerMode** | optional | <p>A boolean value controlling [Observer mode](observer-vs-full-mode). Turn it on if you handle purchases and subscription status yourself and use Adapty for sending subscription events and analytics.</p><p>The default value is `false`.</p><p></p><p>🚧 When running in Observer mode, Adapty SDK won't close any transactions, so make sure you're handling it.</p> |
| **customerUserId** | optional | An identifier of the user in your system. We send it in subscription and analytical events, to attribute events to the right profile. You can also find customers by `customerUserId` in the [**Profiles and Segments**](https://app.adapty.io/profiles/users) menu. |
| **idfaCollectionDisabled** | optional | <p>Set to `true` to disable IDFA collection and sharing.</p><p>the user IP address sharing.</p><p>The default value is `false`.</p><p>For more details on IDFA collection, refer to the [Analytics integration](analytics-integration#ios)   section.</p> |
| **ipAddressCollectionDisabled** | optional | <p>Set to `true` to disable user IP address collection and sharing.</p><p>The default value is `false`.</p> |


:::note
Make sure you use the **Public SDK key** for Adapty initialization, the **Secret key** should be used for [server-side API](getting-started-with-server-side-api) only.

Also, note that **SDK keys** are unique for every app, so if you have multiple apps make sure you choose the right one.
:::

## Logging system

Adapty logs errors and other important information to help you understand what is going on. There are four levels available:

1. `.error`: only errors will be logged 
2. `.warn`: messages from the SDK that do not cause critical errors, but are worth paying attention to
3. `.info`: various information messages, such as those that log the lifecycle of various modules
4. `.verbose`: any additional information that may be useful during debugging, such as function calls, API queries, etc.

You can set `logLevel` at any time in the application's lifecycle, but we recommend that you do this before calling `.activate()`.

```swift title="Swift"
Adapty.logLevel = .verbose
```

### Overriding logger handler

If you for some reason need to send messages from Adapty to your system or save them to a file, you can override the default behavior:

```swift title="Swift"
Adapty.setLogHandler { level, message in
    writeToLocalFile("Adapty \(level): \(message)")
}
```

## Redirect the logging system messages

If you for some reason need to send messages from Adapty to your system or save them to a file, you can override the default behavior:

```swift title="Swift"
Adapty.setLogHandler { level, message in
    writeToLocalFile("Adapty \(level): \(message)")
}
```