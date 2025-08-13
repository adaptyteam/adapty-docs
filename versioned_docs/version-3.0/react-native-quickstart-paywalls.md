---
title: "Show paywalls and enable purchases in React Native SDK"
description: "Learn how to present paywalls in your React Native app with Adapty SDK."
metadataTitle: "Present a Paywall | React Native SDK | Adapty Docs"
slug: /react-native-quickstart-paywalls
displayed_sidebar: sdkreactnative
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import PaywallsIntro from '@site/src/components/reusable/PaywallsIntro.md';


To enable any kind of in-app purchases, you need to understand how Adapty structures purchases:

- **Products** are anything available for purchase – subscriptions, consumables, or lifetime access.
- **Paywalls** are configurations that define which products to offer. In Adapty, paywalls are the only way to retrieve products, but this design lets you modify offerings, pricing, and product combinations without touching your app code.

Adapty offers you three ways to enable purchases in your app. Select one of them depending on your app requirements:

| Implementation             | Complexity | When to use                                                                                                                                                                                                                                |
|----------------------------|------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Adapty Paywall Builder** | ✅ Easy     | You [create a complete, purchase-ready paywall in the no-code builder](quickstart-paywalls). Adapty automatically renders it and handles all the complex purchase flow, receipt validation, and subscription management behind the scenes. |
| `makePurchase`             | 🟡 Medium  | You implement your paywall UI in your app code and use the Adapty SDK method for handling purchases. See the [guide](react-native-making-purchases).                                                                                       |
| Observer mode              | 🔴 Hard    | You implement the purchase flow yourself completely. See the [guide](implement-observer-mode-react-native).                                                                                                                                |


:::danger
**The steps below show how to implement a paywall created in the Adapty paywall builder.**
:::

To display a paywall created in the Adapty paywall builder, in your app code, you only need to:

1. **Get the paywall**: Get the paywall from Adapty.
2. **Display the paywall and delegate handling purchases to Adapty**: Show the paywall container you've got in your app.
3. **Handle button actions**: Associate user interactions with the paywall with your app's response to them. For example, open links or close the paywall when users click buttons.


## 1. Get the paywall

Your paywalls are associated with placements configured in the dashboard. Placements allow you to run different paywalls for different audiences or to run [A/B tests](ab-tests.md).

That's why, to get a paywall to display, you need to:

1. Get the `paywall` object by the [placement](placements.md) ID using the `getPaywall` method and check whether it is a paywall created in the builder using the `hasViewConfiguration` property.

2. Create the paywall view using the `createPaywallView` method. The view contains the UI elements and styling needed to display the paywall.

```typescript showLineNumbers title="React Native"
import {createPaywallView} from '@adapty/react-native-ui';

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

To display the paywall, use the `view.present()` method on the `view` created by the `createPaywallView` method. Each `view` can only be used once. If you need to display the paywall again, call `createPaywallView` one more to create a new `view` instance.

:::important
For the paywall to be displayed, you must switch on the **Show on device** toggle in the Paywall Builder.
:::

```typescript showLineNumbers title="React Native"
try {
  await view.present();
} catch (error) {
  // handle the error
}
```

:::tip
For more details on how to display a paywall, see our [guide](react-native-present-paywalls.md).
:::

## 3. Handle button actions

When users click buttons in the paywall, purchases, restoration, and closing the paywall are handled automatically in the React Native SDK.

However, other buttons have custom or pre-defined IDs and require handling actions in your code. Or, you may want to override their default behavior.

For example, you may want to keep the paywall open after your app users open a web link. Let's see how you can handle it in your implementation.

:::tip
Read our guides on how to handle other button [actions](react-native-handle-paywall-actions.md) and [events](react-native-handling-events-1.md).
:::

:::info
If you are not using the paywall builder for your paywalls, consider our [guide for implementing paywalls manually](react-native-implement-paywalls-manually).
:::

```typescript showLineNumbers title="React Native"
const unsubscribe = view.registerEventHandlers({
    onUrlPress(url) {
      Linking.openURL(url);
      return false;
  },
});
```

## Next steps

Your paywall is ready to be displayed in the app.

Now, you need to [check the users' access level](react-native-check-subscription-status.md) to ensure you display a paywall or give access to paid features to right users.

## Full example

Here is how all those steps can be integrated in your app together.

```javascript showLineNumbers title="React Native"
import React, { useEffect } from 'react';
import { Button, View } from 'react-native';
import { adapty, createPaywallView } from '@adapty/react-native-ui';

export default function PaywallScreen() {
  const showPaywall = async () => {
    try {
      const paywall = await adapty.getPaywall('YOUR_PLACEMENT_ID');

      if (!paywall.hasViewConfiguration) {
        // use your custom logic
        return;
      }

      const view = await createPaywallView(paywall);

      view.registerEventHandlers({
          onUrlPress(url) {
              Linking.openURL(url);
              return false;
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