---
title: "Handle paywall button actions"
description: "Handle subscription-related actions in iOS using Adapty for better app monetization."
metadataTitle: "Handling paywall button actions | Adapty Docs"
toc_max_heading_level: 4
keywords: ['paywall button', 'button', 'paywall button actions', 'handle actions']
---

If you are build paywalls using the Adapty paywall builder, it is crucial to understand how buttons work:

1. **Design phase**: Add a [button in the paywall builder](paywall-buttons.md) and assign it either a pre-existing action or create a custom action ID.
2. **Development phase**: Write code in your app to handle each action ID you've assigned.
3. **User interaction**: When a user taps the button, your app receives the corresponding action ID.
4. **App response**: Your app executes the specific code you wrote for that action ID.

## Close paywalls

To add a button that will close your paywall:

1. In the paywall builder, add a button and assign it the **Close** action.
2. In your app code, implement a handler for the `close` action ID that dismisses the paywall.

```swift
func paywallController(_ controller: AdaptyPaywallController,
                       didPerform action: AdaptyUI.Action) {
    switch action {
        case .close:
            controller.dismiss(animated: true)
            break
    }
}
```

```kotlin
override fun onActionPerformed(action: AdaptyUI.Action, context: Context) {
    when (action) {
        AdaptyUI.Action.Close -> (context as? Activity)?.onBackPressed()
    }
}
```

```dart

```

## Open URLs from paywalls

To add a button that opens a link from your paywall (e.g., **Terms of use** or **Privacy policy**):

1. In the paywall builder, add a button, assign it the **Open URL** action, and enter the URL you want to open.
2. In your app code, implement a handler for the `openUrl` action ID that opens the received URL in a browser.

:::tip
If you don't want your links to look like buttons, add a **Link** element in the paywall builder and handle it the same way as buttons with the **Open URL** action.
:::

```
code samples
```

## Restore purchases

If you use the paywall builder, you don't need to implement the action handler in the code. You only need to add a button and assign it the **Restore** action.

## Log into the app

To add a button that logs users into your app:

1. In the paywall builder, add a button and assign it the **Login** action.
2. In your app code, implement a handler for the `login` action ID that identifies your user.

```
code samples
```

## Handle custom actions

To add a button that handles any other actions:

1. In the paywall builder, add a button, assign it the **Custom** action, and assign it an ID.
2. In your app code, implement a handler for the action ID you've created.

```
code samples
```