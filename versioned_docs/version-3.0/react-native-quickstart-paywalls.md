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


<PaywallsIntro />

:::info
If you are not using the paywall builder for your paywalls, consider our [guide for implementing paywalls manually](react-native-implement-paywalls-manually).
:::

## 1. Get the paywall

Your paywalls are associated with [placements](placements.md) configured in the dashboard. Placements allow you to run different paywalls for different audiences or to run [A/B tests](ab-tests.md).

That's why, to get a paywall to display, you need to:

1. Get the `paywall` object by the placement ID using the `getPaywall` method and check whether it is a paywall created in the builder using the `hasViewConfiguration` property.

2. If it is a paywall created in the builder, create its view using the `createPaywallView` method. The view contains the UI elements and styling needed to display the paywall.

:::tip
This quickstart provides the minimum configuration required to display a paywall. For advanced configuration details, see our [guide on getting paywalls](react-native-get-pb-paywalls).
:::

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

Now, your paywall is ready to be displayed in the app.

As a next step, you need to [learn how to work with user profiles](react-native-quickstart-identify.md) to ensure they can access what they have paid for.

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