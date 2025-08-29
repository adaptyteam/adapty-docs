---
title: "Respond to button actions in Kotlin Multiplatform SDK"
description: "Handle paywall button actions in Kotlin Multiplatform using Adapty for better app monetization."
metadataTitle: "Handling paywall button actions | Adapty Docs"
displayed_sidebar: sdkkmp
toc_max_heading_level: 4
keywords: ['paywall button', 'button', 'paywall button actions', 'handle actions']
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::warning
**Only purchases and restorations are handled automatically.** All the other button actions, such as closing paywalls or opening links, require implementing proper responses in the app code.
:::

If you are building paywalls using the Adapty paywall builder, it's crucial to set up buttons properly:

1. Add a [button in the paywall builder](paywall-buttons.md) and assign it either a pre-existing action or create a custom action ID.
2. Write code in your app to handle each action you've assigned.

This guide shows how to handle custom and pre-existing actions in your code.

## Set up the AdaptyUIObserver

To handle paywall actions, you need to implement the `AdaptyUIObserver` interface and set it up with `AdaptyUI.setObserver()`. This should be done early in your app's lifecycle, typically in your main activity or app initialization.

```kotlin
import com.adapty.kmp.AdaptyUI
import com.adapty.kmp.AdaptyUIObserver

// In your app initialization
AdaptyUI.setObserver(MyAdaptyUIObserver())
```

## Close paywalls

To add a button that will close your paywall:

1. In the paywall builder, add a button and assign it the **Close** action.
2. In your app code, implement a handler for the `close` action that dismisses the paywall.

:::info
In the Kotlin Multiplatform SDK, the `CloseAction` and `AndroidSystemBackAction` trigger closing the paywall by default. However, you can override this behavior in your code if needed. For example, closing one paywall might trigger opening another.
:::


```kotlin
import com.adapty.kmp.AdaptyUIObserver
import com.adapty.kmp.models.AdaptyUIAction
import com.adapty.kmp.models.AdaptyUIView

class MyAdaptyUIObserver : AdaptyUIObserver {
    override fun paywallViewDidPerformAction(view: AdaptyUIView, action: AdaptyUIAction) {
        when (action) {
            AdaptyUIAction.CloseAction, AdaptyUIAction.AndroidSystemBackAction -> view.dismiss()
        }
    }
}

// Set up the observer
AdaptyUI.setObserver(MyAdaptyUIObserver())
```

## Open URLs from paywalls

:::tip
If you want to add a group of links (e.g., terms of use and purchase restoration), add a **Link** element in the paywall builder and handle it the same way as buttons with the **Open URL** action.
:::

To add a button that opens a link from your paywall (e.g., **Terms of use** or **Privacy policy**):

1. In the paywall builder, add a button, assign it the **Open URL** action, and enter the URL you want to open.
2. In your app code, implement a handler for the `openUrl` action that opens the received URL in a browser.

:::info
In the Kotlin Multiplatform SDK, the `OpenUrlAction` provides the URL that should be opened. You can implement custom logic to handle URL opening, such as showing a confirmation dialog or using your app's preferred URL handling method.
:::


```kotlin
import com.adapty.kmp.AdaptyUIObserver
import com.adapty.kmp.models.AdaptyUIAction
import com.adapty.kmp.models.AdaptyUIView
import kotlinx.coroutines.launch

class MyAdaptyUIObserver : AdaptyUIObserver {
    override fun paywallViewDidPerformAction(view: AdaptyUIView, action: AdaptyUIAction) {
        when (action) {    
            is AdaptyUIAction.OpenUrlAction -> {
                // Handle URL opening - you can use your preferred method
                // For example, in Compose Multiplatform:
                // uriHandler.openUri(action.url)
                
                // Or show a confirmation dialog first:
                view.showDialog(
                    title = "Open URL?",
                    content = action.url,
                    primaryActionTitle = "Cancel",
                    secondaryActionTitle = "Open"
                )
            }
        }
    }
}
```

## Log into the app

To add a button that logs users into your app:

1. In the paywall builder, add a button and assign it a **Custom** action with the ID "login".
2. In your app code, implement a handler for the custom action that identifies your user.

```kotlin
import com.adapty.kmp.AdaptyUIObserver
import com.adapty.kmp.models.AdaptyUIAction
import com.adapty.kmp.models.AdaptyUIView

class MyAdaptyUIObserver : AdaptyUIObserver {
    override fun paywallViewDidPerformAction(view: AdaptyUIView, action: AdaptyUIAction) {
        when (action) {
            is AdaptyUIAction.CustomAction -> {
                if (action.action == "login") {
                    // Handle login action - navigate to login screen
                    // This depends on your app's navigation system
                    // For example, in Compose Multiplatform:
                    // navController.navigate("login")
                }
            }
        }
    }
}
```

## Handle custom actions

To add a button that handles any other actions:

1. In the paywall builder, add a button, assign it the **Custom** action, and assign it an ID.
2. In your app code, implement a handler for the action ID you've created.

For example, if you have another set of subscription offers or one-time purchases, you can add a button that will display another paywall:

```kotlin
import com.adapty.kmp.AdaptyUIObserver
import com.adapty.kmp.models.AdaptyUIAction
import com.adapty.kmp.models.AdaptyUIView

class MyAdaptyUIObserver : AdaptyUIObserver {
    override fun paywallViewDidPerformAction(view: AdaptyUIView, action: AdaptyUIAction) {
        when (action) {
            is AdaptyUIAction.CustomAction -> {
                when (action.action) {
                    "openNewPaywall" -> {
                        // Display another paywall
                        // You would typically fetch and present a new paywall here
                    }
                    "login" -> {
                        // Handle login action
                    }
                    else -> {
                        // Handle other custom actions
                    }
                }
            }
        }
    }
}
```
