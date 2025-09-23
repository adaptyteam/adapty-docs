---
title: "Respond to button actions in Unity SDK"
description: "Handle paywall button actions in Unity using Adapty for better app monetization."
metadataTitle: "Handling paywall button actions | Adapty Docs"
toc_max_heading_level: 4
rank: 40
keywords: ['paywall button', 'button', 'paywall button actions', 'handle actions']
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


If you are building paywalls using the Adapty paywall builder, it's crucial to set up buttons properly:

1. Add a [button in the paywall builder](paywall-buttons.md) and assign it either a pre-existing action or create a custom action ID.
2. Write code in your app to handle each action you've assigned.

This guide shows how to handle custom and pre-existing actions in your code.

:::warning
**Only purchases and restorations are handled automatically.** All the other button actions, such as closing paywalls or opening links, require implementing proper responses in the app code.
:::

## Close paywalls

To add a button that will close your paywall:

1. In the paywall builder, add a button and assign it the **Close** action.
2. In your app code, implement a handler for the `close` action that dismisses the paywall.


```javascript
public void PaywallViewDidPerformAction(
  AdaptyUIView view, 
  AdaptyUIUserAction action
) {
  switch (action.Type) {
    case AdaptyUIUserActionType.Close:
      view.Dismiss(null);
      break;
    default:
      // handle other events
      break;
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

```javascript
public void PaywallViewDidPerformAction(
    AdaptyUIView view,
    AdaptyUIUserAction action
) {
    switch (action.Type) {
        case AdaptyUIUserActionType.OpenUrl:
            var urlString = action.Value;
            if (urlString != null {
                Application.OpenURL(urlString);
            }
        default:
            // handle other events
            break;
    }
}
```

## Log into the app

To add a button that logs users into your app:

1. In the paywall builder, add a button and assign it the **Login** action.
2. In your app code, implement a handler for the `login` action that identifies your user.

```javascript
public void PaywallViewDidPerformAction(
    AdaptyUIView view,
    AdaptyUIUserAction action
) {
    switch (action.Type) {
        case AdaptyUIUserActionType.Custom:
            if (action.Value == "login") {
                SceneManager.LoadScene("LoginScene");
            }
            break;
        default:
            // handle other events
            break;
    }
}
```
## Handle custom actions

To add a button that handles any other actions:

1. In the paywall builder, add a button, assign it the **Custom** action, and assign it an ID.
2. In your app code, implement a handler for the action ID you've created.

For example, if you have another set of subscription offers or one-time purchases, you can add a button that will display another paywall:

```javascript
public void PaywallViewDidPerformAction(
    AdaptyUIView view,
    AdaptyUIUserAction action
) {
    switch (action.Type) {
        case AdaptyUIUserActionType.Custom:
            if (action.Value == "openNewPaywall") {
                // Display another paywall
            }
            break;
        default:
            // handle other events
            break;
    }
}

```