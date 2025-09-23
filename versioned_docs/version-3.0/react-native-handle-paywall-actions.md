---
title: "Respond to button actions in React Native SDK"
description: "Handle paywall button actions in React Native using Adapty for better app monetization."
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

<Tabs groupId="version" queryString>
<TabItem value="new" label="SDK version 3.12 or later" default>

<Tabs groupId="presentation-method" queryString>
<TabItem value="platform" label="Platform view" default>

For platform view, handle the close action through the `eventHandlers` prop:

```javascript
import { AdaptyPaywallView } from 'react-native-adapty/dist/ui';

<AdaptyPaywallView
  paywall={paywall}
  eventHandlers={{
    onCloseButtonPress() {
      // Handle close button press - navigate away or hide component
      navigation.goBack();
    },
    onAndroidSystemBack() {
      // Handle Android back button
      navigation.goBack();
    },
  }}
/>
```

</TabItem>
<TabItem value="standalone" label="Standalone screen">

For standalone screen, implement the close handler:

```javascript
import {createPaywallView} from 'react-native-adapty/dist/ui';

const view = await createPaywallView(paywall);

const unsubscribe = view.setEventHandlers({
  onCloseButtonPress() {
      return true; // allow paywall closing
  }
});
```

</TabItem>
</Tabs>

</TabItem>

<TabItem value="old" label="SDK version < 3.12" default>

For SDK version < 3.12, only standalone screen presentation is supported:

```javascript
import {createPaywallView} from 'react-native-adapty/dist/ui';

const view = await createPaywallView(paywall);

const unsubscribe = view.registerEventHandlers({
  onCloseButtonPress() {
      return true; // allow paywall closing
  }
});
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

<Tabs groupId="version" queryString>
<TabItem value="new" label="SDK version 3.12 or later" default>

<Tabs groupId="presentation-method" queryString>
<TabItem value="platform" label="Platform view" default>

For platform view, handle URL opening through the `eventHandlers` prop:

```javascript
import { AdaptyPaywallView } from 'react-native-adapty/dist/ui';
import { Linking } from 'react-native';

<AdaptyPaywallView
  paywall={paywall}
  eventHandlers={{
    onUrlPress(url) {
      Linking.openURL(url);
    },
  }}
/>
```

</TabItem>
<TabItem value="standalone" label="Standalone screen">

For standalone screen, implement the URL handler:

```javascript
import {createPaywallView} from 'react-native-adapty/dist/ui';
import {Linking} from 'react-native';

const view = await createPaywallView(paywall);

const unsubscribe = view.setEventHandlers({
    onUrlPress(url) {
        Linking.openURL(url);
        return false; // Keep paywall open
    },
});
```

</TabItem>
</Tabs>

</TabItem>

<TabItem value="old" label="SDK version < 3.12" default>

For SDK version < 3.12, only standalone screen presentation is supported:

```javascript
import {createPaywallView} from 'react-native-adapty/dist/ui';
import {Linking} from 'react-native';

const view = await createPaywallView(paywall);

const unsubscribe = view.registerEventHandlers({
    onUrlPress(url) {
        Linking.openURL(url);
        return false; // Keep paywall open
    },
});
```

</TabItem>
</Tabs>

## Log into the app

To add a button that logs users into your app:

1. In the paywall builder, add a button and assign it the **Login** action.
2. In your app code, implement a handler for the `login` action that identifies your user.

<Tabs groupId="version" queryString>
<TabItem value="new" label="SDK version 3.12 or later" default>

<Tabs groupId="presentation-method" queryString>
<TabItem value="platform" label="Platform view" default>

For platform view, handle login through the `eventHandlers` prop:

```javascript
import { AdaptyPaywallView } from 'react-native-adapty/dist/ui';

<AdaptyPaywallView
  paywall={paywall}
  eventHandlers={{
    onCustomAction(actionId) {
      if (actionId === 'login') {
        navigation.navigate('Login');
      }
    },
  }}
/>
```

</TabItem>
<TabItem value="standalone" label="Standalone screen">

For standalone screen, implement the login handler:

```javascript
import {createPaywallView} from 'react-native-adapty/dist/ui';

const view = await createPaywallView(paywall);

const unsubscribe = view.setEventHandlers({
    onCustomAction(actionId) {
        if (actionId === 'login') {
            navigation.navigate('Login');
        }
    }
});
```

</TabItem>
</Tabs>

</TabItem>

<TabItem value="old" label="SDK version < 3.12" default>

For SDK version < 3.12, only standalone screen presentation is supported:

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
</Tabs>

## Handle custom actions

To add a button that handles any other actions:

1. In the paywall builder, add a button, assign it the **Custom** action, and assign it an ID.
2. In your app code, implement a handler for the action ID you've created.

For example, if you have another set of subscription offers or one-time purchases, you can add a button that will display another paywall:

<Tabs groupId="version" queryString>
<TabItem value="new" label="SDK version 3.12 or later" default>

<Tabs groupId="presentation-method" queryString>
<TabItem value="platform" label="Platform view" default>

For platform view, handle custom actions through the `eventHandlers` prop:

```javascript
import { AdaptyPaywallView } from 'react-native-adapty/dist/ui';

<AdaptyPaywallView
  paywall={paywall}
  eventHandlers={{
    onCustomAction(actionId) {
      if (actionId === 'openNewPaywall') {
        // Display another paywall
      }
    },
  }}
/>
```

</TabItem>
<TabItem value="standalone" label="Standalone screen">

For standalone screen, implement custom action handlers:

```javascript
const unsubscribe = view.setEventHandlers({
    onCustomAction(actionId) {
        if (actionId === 'openNewPaywall') {
            // Display another paywall
        }
    },
});
```

</TabItem>
</Tabs>

</TabItem>

<TabItem value="old" label="SDK version < 3.12" default>

For SDK version < 3.12, only standalone screen presentation is supported:

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
</Tabs>