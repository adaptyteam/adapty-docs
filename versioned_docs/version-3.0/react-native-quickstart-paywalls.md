---
title: "Enable purchases by using paywalls in React Native SDK"
description: "Learn how to present paywalls in your React Native app with Adapty SDK."
metadataTitle: "Present a Paywall | React Native SDK | Adapty Docs"
slug: /react-native-quickstart-paywalls
displayed_sidebar: sdkreactnative
keywords: [ 'paywall', 'paywall builder', 'getPaywall']
rank: 70
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import PaywallsIntro from '@site/src/components/reusable/PaywallsIntro.md';

To enable in-app purchases, you need to understand three key concepts:

- [**Products**](product.md) – anything users can buy (subscriptions, consumables, lifetime access)
- [**Paywalls**](paywalls.md) are configurations that define which products to offer. In Adapty, paywalls are the only way to retrieve products, but this design lets you modify offerings, pricing, and product combinations without touching your app code.
- [**Placements**](placements.md) – where and when you show paywalls in your app (like `main`, `onboarding`, `settings`). You set up paywalls for placements in the dashboard, then request them by placement ID in your code. This makes it easy to run A/B tests and show different paywalls to different users.

Adapty offers you three ways to enable purchases in your app. Select one of them depending on your app requirements:

| Implementation         | Complexity | When to use                                                                                                                                                                                                                                |
|------------------------|------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Adapty Paywall Builder | ✅ Easy     | You [create a complete, purchase-ready paywall in the no-code builder](quickstart-paywalls). Adapty automatically renders it and handles all the complex purchase flow, receipt validation, and subscription management behind the scenes. |
| Manually created paywalls | 🟡 Medium  | You implement your paywall UI in your app code, but still get the paywall object from Adapty to maintain flexibility in product offerings. See the [guide](react-native-making-purchases).                                                 |
| Observer mode              | 🔴 Hard    | You already have your own purchase handling infrastructure and want to keep using it. Note that the observer mode has its limitations in Adapty. See the [article](observer-vs-full-mode).                                                 |

:::important
**The steps below show how to implement a paywall created in the Adapty paywall builder.**

If you don't want to use the paywall builder, see the [guide for handling purchases in manually created paywalls](react-native-making-purchases.md).
:::

To display a paywall created in the Adapty paywall builder, in your app code, you only need to:

1. **Get the paywall**: Get the paywall from Adapty.
2. **Display the paywall and Adapty will handle purchases for you**: Show the paywall container you've got in your app.
3. **Handle button actions**: Associate user interactions with the paywall with your app's response to them. For example, open links or close the paywall when users click buttons.

## 1. Get the paywall

Your paywalls are associated with placements configured in the dashboard. Placements allow you to run different paywalls for different audiences or to run [A/B tests](ab-tests.md).

To get a paywall created in the Adapty paywall builder, you need to:

1. Get the `paywall` object by the [placement](placements.md) ID using the `getPaywall` method and check whether it is a paywall created in the builder using the `hasViewConfiguration` property.

2. Create the paywall view using the `createPaywallView` method. The view contains the UI elements and styling needed to display the paywall.

:::important
To get the view configuration, you must switch on the **Show on device** toggle in the Paywall Builder. Otherwise, you will get an empty view configuration, and the paywall won't be displayed.
:::

```typescript showLineNumbers title="React Native"
import {createPaywallView} from 'react-native-adapty';

try {
    const placementId = 'YOUR_PLACEMENT_ID';

    const paywall = await adapty.getPaywall(placementId);
  // the requested paywall
} catch (error) {
    // handle the error
}

if (paywall.hasViewConfiguration) {
    try {
        const view = await createPaywallView(paywall);
    } catch (error) {
        // handle the error
    }
} else {
    //use your custom logic
}
```

## 2. Display the paywall

Now, when you have the paywall configuration, it's enough to add a few lines to display your paywall.

<Tabs groupId="presentation-method" queryString>
<TabItem value="platform" label="React component" default>

To embed a paywall within your existing component tree, use the `AdaptyPaywallView` component directly in your React Native component hierarchy:

```typescript showLineNumbers title="React Native (TSX)"
import { AdaptyPaywallView } from 'react-native-adapty';

const onCloseButtonPress = useCallback<EventHandlers['onCloseButtonPress']>(() => {
  // Handle close button press
}, []);

const onUrlPress = useCallback<EventHandlers['onUrlPress']>((url) => {
  Linking.openURL(url);
}, []);

<AdaptyPaywallView
  paywall={paywall}
  style={styles.container}
  onCloseButtonPress={onCloseButtonPress}
  onUrlPress={onUrlPress}
/>
```

</TabItem>
<TabItem value="standalone" label="Modal presentation">

To display the paywall as a standalone screen, use the `view.present()` method on the `view` created by the `createPaywallView` method. Each `view` can only be used once. If you need to display the paywall again, call `createPaywallView` one more to create a new `view` instance.

```typescript showLineNumbers title="React Native"
try {
  await view.present();
} catch (error) {
  // handle the error
}
```

</TabItem>
</Tabs>

:::tip
For more details on how to display a paywall, see our [guide](react-native-present-paywalls.md).
:::

## 3. Handle button actions

When users click buttons in the paywall, the React Native SDK automatically handles purchases, restoration, closing the paywall, and opening URLs.

However, other buttons have custom or pre-defined IDs and require handling actions in your code. Or, you may want to override their default behavior.

For example, here is the default behavior for the close button. You don't need to add it in the code, but here, you can see how it is done if needed.

<Tabs groupId="presentation-method" queryString>
<TabItem value="platform" label="React component" default>

For React component, handle actions directly in the `AdaptyPaywallView` component:

```typescript showLineNumbers title="React Native (TSX)"
import { AdaptyPaywallView } from 'react-native-adapty';
import { Linking } from 'react-native';

const onUrlPress = useCallback<EventHandlers['onUrlPress']>((url) => {
  Linking.openURL(url);
}, []);

const onCloseButtonPress = useCallback<EventHandlers['onCloseButtonPress']>(() => {
  // Handle close button press
}, []);

const onCustomAction = useCallback<EventHandlers['onCustomAction']>((actionId) => {
  // Handle custom actions
}, []);

<AdaptyPaywallView
  paywall={paywall}
  style={styles.container}
  onUrlPress={onUrlPress}
  onCloseButtonPress={onCloseButtonPress}
  onCustomAction={onCustomAction}
/>
```

</TabItem>
<TabItem value="standalone" label="Modal presentation">

For modal presentation, implement event handlers using `registerEventHandlers`:

```typescript showLineNumbers title="React Native"
const unsubscribe = view.setEventHandlers({
    onCloseButtonPress() {
        return true; // allow paywall closing
    }
});
```

</TabItem>
</Tabs>

:::tip
Read our guides on how to handle button [actions](react-native-handle-paywall-actions.md) and [events](react-native-handling-events-1.md).
:::

## Next steps

Your paywall is ready to be displayed in the app.

Now, you need to [check the users' access level](react-native-check-subscription-status.md) to ensure you display a paywall or give access to paid features to right users.

## Full example

Here is how all those steps can be integrated in your app together.

<Tabs groupId="presentation-method" queryString>
<TabItem value="platform" label="React component" default>

```javascript showLineNumbers title="React Native (TSX)"
import React, { useState, useEffect, useCallback } from 'react';
import { Button, View } from 'react-native';
import { adapty } from '@adapty/react-native-ui';
import { AdaptyPaywallView } from 'react-native-adapty';
import { Linking } from 'react-native';

export default function PaywallScreen() {
  const [paywall, setPaywall] = useState(null);

  const loadPaywall = async () => {
    try {
      const paywallData = await adapty.getPaywall('YOUR_PLACEMENT_ID');

      if (paywallData.hasViewConfiguration) {
        setPaywall(paywallData);
      }
    } catch (error) {
      console.warn('Error loading paywall:', error);
    }
  };

  const onUrlPress = useCallback<EventHandlers['onUrlPress']>((url) => {
    Linking.openURL(url);
  }, []);

  const onCloseButtonPress = useCallback<EventHandlers['onCloseButtonPress']>(() => {
    // Handle close button press
  }, []);

  useEffect(() => {
    loadPaywall();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {paywall ? (
        <AdaptyPaywallView
          paywall={paywall}
          style={{ flex: 1 }}
          onUrlPress={onUrlPress}
          onCloseButtonPress={onCloseButtonPress}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button title="Load Paywall" onPress={loadPaywall} />
        </View>
      )}
    </View>
  );
}
```

</TabItem>
<TabItem value="standalone" label="Modal presentation">

```javascript showLineNumbers title="React Native"
import React, { useEffect } from 'react';
import { Button, View } from 'react-native';
import { Linking } from 'react-native';
import { adapty, createPaywallView } from 'react-native-adapty';

export default function PaywallScreen() {
  const showPaywall = async () => {
    try {
      const paywall = await adapty.getPaywall('YOUR_PLACEMENT_ID');

      if (!paywall.hasViewConfiguration) {
        // use your custom logic
        return;
      }

      const view = await createPaywallView(paywall);

      view.setEventHandlers({
          onCloseButtonPress() {
              return true;
        },
      });

      await view.present();
    } catch (error) {
      // handle any error that may occur during the process
      console.warn('Error showing paywall:', error);
    }
  };

  // you can add a button to manually trigger the paywall for testing purposes
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Show Paywall" onPress={showPaywall} />
    </View>
  );
}
```

</TabItem>
</Tabs>