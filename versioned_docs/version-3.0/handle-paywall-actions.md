---
title: "Respond to button actions in iOS SDK"
description: "Handle paywall button actions in iOS using Adapty for better app monetization."
metadataTitle: "Handling paywall button actions | Adapty Docs"
toc_max_heading_level: 4
keywords: ['paywall button', 'button', 'paywall button actions', 'handle actions']
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


If you are building paywalls using the Adapty paywall builder, it's crucial to set up buttons properly:

1. Add a [button in the paywall builder](paywall-buttons.md) and assign it either a pre-existing action or create a custom action ID.
2. Write code in your app to handle each action you've assigned.

This guide shows how to handle custom and pre-existing actions in your code.

:::warning
**Only purchases, restorations, paywall closures, and URL opening are handled automatically.** All other button actions require proper response implementation in the app code.
:::

## Close paywalls

To add a button that will close your paywall:

1. In the paywall builder, add a button and assign it the **Close** action.
2. In your app code, implement a handler for the `close` action that dismisses the paywall.

:::info
In the iOS SDK, the `close` action triggers closing the paywall by default. However, you can override this behavior in your code if needed. For example, closing one paywall might trigger opening another.
:::


```swift
func paywallController(_ controller: AdaptyPaywallController,
                       didPerform action: AdaptyUI.Action) {
    switch action {
        case .close:
            controller.dismiss(animated: true) // default behavior
            break
    }
}
```

## Open URLs from paywalls

:::tip
If you want to add a group of links (e.g., terms of use and purchase restoration), add a **Link** element in the paywall builder and handle it the same way as buttons with the **Open URL** action.
:::

To add a button that opens a link from your paywall (e.g., **Terms of use** or **Privacy policy**):

1. In the paywall builder, add a button, assign it the **Open URL** action, and enter the URL you want to open.
2. In your app code, implement a handler for the `openUrl` action that opens the received URL in a browser.

:::info
In the iOS SDK, the `openUrl` action triggers opening the URL by default. However, you can override this behavior in your code if needed. 
:::


```swift
func paywallController(_ controller: AdaptyPaywallController,
                       didPerform action: AdaptyUI.Action) {
    switch action {
        case let .openURL(url):
            UIApplication.shared.open(url, options: [:]) // default behavior
        break
    }
}
```

## Log into the app

To add a button that logs users into your app:

1. In the paywall builder, add a button and assign it the **Login** action.
2. In your app code, implement a handler for the `login` action that identifies your user.


```swift
func paywallController(_ controller: AdaptyPaywallController,
                      didPerform action: AdaptyUI.Action) {
   switch action {
       case .login:
           // Show a login screen
           let loginVC = UIStoryboard(name: "Main", bundle: nil).instantiateViewController(withIdentifier: "LoginViewController")
           controller.present(loginVC, animated: true)
   }
}
```

## Handle custom actions

To add a button that handles any other actions:

1. In the paywall builder, add a button, assign it the **Custom** action, and assign it an ID.
2. In your app code, implement a handler for the action ID you've created.

For example, if you have another set of subscription offers or one-time purchases, you can add a button that will display another paywall:

```swift
func paywallController(_ controller: AdaptyPaywallController,
                      didPerform action: AdaptyUI.Action) {
   switch action {
       case let .custom(id):
           if id == "openNewPaywall" {
              // Display another paywall
              }
           }
           break
   }
}
```