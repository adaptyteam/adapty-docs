---
title: "Respond to new Paywall Builder button actions"
description: "Handle subscription-related actions in iOS using Adapty for better app monetization."
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
**Only purchases and restorations are handled automatically.** All the other button actions, such as closing paywalls or opening links, require implementing proper responses in the app code.
:::

## Close paywalls

To add a button that will close your paywall:

1. In the paywall builder, add a button and assign it the **Close** action.
2. In your app code, implement a handler for the `close` action that dismisses the paywall.

:::info
In the iOS, Android, and React Native SDKs, the `close` action triggers closing the paywall by default. However, you can override this behavior in your code if needed. For example, closing one paywall might trigger opening another.
:::

<Tabs groupId="current-os" queryString>
<TabItem value="swift" label="Swift" default>

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
</TabItem>

<TabItem value="android" label="Android">

```kotlin
override fun onActionPerformed(action: AdaptyUI.Action, context: Context) {
    when (action) {
        AdaptyUI.Action.Close -> (context as? Activity)?.onBackPressed() // default behavior
    }
}
```
</TabItem>

<TabItem value="flutter" label="Flutter">

```dart
void paywallViewDidPerformAction(AdaptyUIPaywallView view, AdaptyUIAction action) {
    switch (action) {
      case const CloseAction():
      case const AndroidSystemBackAction():
        view.dismiss();
        break;
      default:
        break;
    }
}
```
</TabItem>

<TabItem value="react-native" label="React Native">

```javascript
import {createPaywallView} from 'react-native-adapty/dist/ui';

const view = await createPaywallView(paywall);

const unsubscribe = view.registerEventHandlers({
  onCloseButtonPress() {
      view.dismiss(); // default behavior
      return true;
  }
});
```
</TabItem>

<TabItem value="unity" label="Unity">

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
</TabItem>
</Tabs>

## Open URLs from paywalls

:::tip
If you want to add a group of links (e.g., terms of use and purchase restoration), add a **Link** element in the paywall builder and handle it the same way as buttons with the **Open URL** action.
:::

To add a button that opens a link from your paywall (e.g., **Terms of use** or **Privacy policy**):

1. In the paywall builder, add a button, assign it the **Open URL** action, and enter the URL you want to open.
2. In your app code, implement a handler for the `openUrl` action that opens the received URL in a browser.

:::info
In the iOS, Android, and React Native SDKs (for React Native, you need to update the SDK to the version 3.9.0 or later), the `openUrl` action triggers opening the URL by default. However, you can override this behavior in your code if needed. 
:::


<Tabs groupId="current-os" queryString>
<TabItem value="swift" label="Swift" default>

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
</TabItem>

<TabItem value="android" label="Android">

```kotlin
override fun onActionPerformed(action: AdaptyUI.Action, context: Context) {
   when (action) {    
       is AdaptyUI.Action.OpenUrl -> {
           val intent = Intent(Intent.ACTION_VIEW, Uri.parse(action.url)) // default behavior
           context.startActivity(intent)
       }
   }
}
```
</TabItem>

<TabItem value="flutter" label="Flutter">

```dart
// You have to install url_launcher plugin in order to handle urls:
// https://pub.dev/packages/url_launcher
import 'package:url_launcher/url_launcher_string.dart'; 

void paywallViewDidPerformAction(AdaptyUIView view, AdaptyUIAction action) {
    switch (action) {
      case OpenUrlAction(url: final url):
        final Uri uri = Uri.parse(url);
        launchUrl(uri, mode: LaunchMode.inAppBrowserView);
        break;
      default:
        break;
    }
}
```
</TabItem>

<TabItem value="react-native" label="React Native">

```javascript
import {createPaywallView} from 'react-native-adapty/dist/ui';
import {Linking} from 'react-native';

const view = await createPaywallView(paywall);

const unsubscribe = view.registerEventHandlers({
    onUrlPress(url) {
        Linking.openURL(url);
        return false; // default behavior
    },
});
```
</TabItem>

<TabItem value="unity" label="Unity">

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
</TabItem>
</Tabs>

## Log into the app

To add a button that logs users into your app:

1. In the paywall builder, add a button and assign it the **Login** action.
2. In your app code, implement a handler for the `login` action that identifies your user.

<Tabs groupId="current-os" queryString>
<TabItem value="swift" label="Swift" default>

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
</TabItem>

<TabItem value="android" label="Android">

```kotlin
override fun onActionPerformed(action: AdaptyUI.Action, context: Context) {
   when (action) {
       AdaptyUI.Action.Login -> {
           val intent = Intent(context, LoginActivity::class.java)
           context.startActivity(intent)
       }
   }
}
```
</TabItem>

<TabItem value="flutter" label="Flutter">

```dart
void paywallViewDidPerformAction(AdaptyUIPaywallView view, AdaptyUIAction action) {
    switch (action) {
      case CustomAction(action: 'login'):
        // Handle login action
        Navigator.of(context).push(MaterialPageRoute(builder: (context) => LoginScreen()));
        break;
      default:
        break;
    }
}
```
</TabItem>

<TabItem value="react-native" label="React Native">

```javascript
import {createPaywallView} from 'react-native-adapty/dist/ui';

const view = await createPaywallView(paywall);

const unsubscribe = view.registerEventHandlers({
    onCustomAction(actionId) {
        if (actionId === 'login') {
            navigation.navigate('Login');
        }
    }
});
```
</TabItem>

<TabItem value="unity" label="Unity">

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
</TabItem>
</Tabs>

## Handle custom actions

To add a button that handles any other actions:

1. In the paywall builder, add a button, assign it the **Custom** action, and assign it an ID.
2. In your app code, implement a handler for the action ID you've created.

For example, if you have another set of subscription offers or one-time purchases, you can add a button that will display another paywall:

<Tabs groupId="current-os" queryString>
<TabItem value="swift" label="Swift" default>

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
</TabItem>

<TabItem value="android" label="Android">

```kotlin
override fun onActionPerformed(action: AdaptyUI.Action, context: Context) {
   when (action) {
       is AdaptyUI.Action.Custom -> {
           if (action.customId == "openNewPaywall") {
               // Display another paywall
           }
       }
   }
}
```
</TabItem>

<TabItem value="flutter" label="Flutter">

```dart
void paywallViewDidPerformAction(AdaptyUIPaywallView view, AdaptyUIAction action) {
   switch (action) {
     case CustomAction(action: 'openNewPaywall'):
       // Display another paywall
       break;
     default:
       break;
   }
}
```
</TabItem>

<TabItem value="react-native" label="React Native">

```javascript
const unsubscribe = view.registerEventHandlers({
    onCustomAction(actionId) {
        if (actionId === 'openNewPaywall') {
            // Display another paywall
        }
    },
});
```
</TabItem>

<TabItem value="unity" label="Unity">

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
</TabItem>
</Tabs>
