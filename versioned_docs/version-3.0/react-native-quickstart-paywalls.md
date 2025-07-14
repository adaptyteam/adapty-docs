---
title: "Present a paywall in React Native SDK"
description: "Learn how to present paywalls in your React Native app with Adapty SDK."
metadataTitle: "Present a Paywall | React Native SDK | Adapty Docs"
slug: /react-native-quickstart-paywalls
displayed_sidebar: sdkreactnative
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import PaywallsIntro from '@site/src/components/reusable/PaywallsIntro.md';


<PaywallsIntro />

:::tip
This is the minimum setup you need to get up and running with paywalls created using the builder. Read more detailed [guides on working with paywalls](react-native-paywalls.md).
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

:::tip
For more details on how to display a paywall, see our [guide](react-native-present-paywalls.md).
:::

To display the paywall, use the `view.present()` method on the `view` created by the `createPaywallView` method. Each `view` can only be used once. If you need to display the paywall again, call `createPaywallView` one more to create a new `view` instance.

```typescript showLineNumbers title="React Native"
try {
  await view.present();
} catch (error) {
  // handle the error
}
```

:::info
If you are not using the paywall builder for your paywalls, consider our [guide for implementing paywalls manually](react-native-implement-paywalls-manually).
:::

## 3. Check subscription status before displaying

Now that you've implemented the paywall, you will want to only show it to users who baven't already paid for premium access. Before showing a paywall, check if the user already has premium access.

You need to get their profile using the `getProfile` method and check the access levels in the `profile` object.

By default, Adapty provides a built-in access level called `premium`, but you can [set up your own access levels](access-level.md) in the Adapty dashboard.

:::tip
Proceed with the quickstart guide to also [implement listening for subscription status changes](react-native-check-subscription-status).
:::

```typescript showLineNumbers title="React Native"
// highlight-start
try {
    const profile = await adapty.getProfile();
    const isPremiumActive = profile.accessLevels["premium"]?.isActive === true;

    if (!isPremiumActive) {
// highlight-end
        try {
            await view.present();
        } catch (presentError) {
            // handle paywall presentation error
        }
    }
// highlight-start
} catch (profileError) {
    // handle profile fetching error
}
// highlight-end
```

## 4. Handle button actions

When users click buttons in the paywall, purchases and restoration are handled automatically. However, other buttons have custom or pre-defined IDs and require handling actions in your code.

For example, your paywall probably has a close button. In React Native, returning `true` in `onCloseButtonPress` is the trigger. You don’t need to call any explicit close method.

You need to register your event handler before presenting the view.

:::tip
Read our [guide](react-native-handling-events-1) on how to handle other button actions and events.
:::

```typescript showLineNumbers title="React Native"
const unsubscribe = view.registerEventHandlers({
  onCloseButtonPress() {
    return true;
  },
});
```

## Full example

Here is how all those steps can be integrated in your app together.

```javascript showLineNumbers title="React Native"
import React, { useEffect } from 'react';
import { Button, View } from 'react-native';
import { adapty, createPaywallView } from '@adapty/react-native-ui';

export default function PaywallScreen() {
  const showPaywall = async () => {
    try {
      const profile = await adapty.getProfile();
      const isPremiumActive = profile.accessLevels['premium']?.isActive === true;

      if (isPremiumActive) {
        return; // user already has access
      }

      const paywall = await adapty.getPaywall('YOUR_PLACEMENT_ID');

      if (!paywall.hasViewConfiguration) {
        // use your custom logic
        return;
      }

      const view = await createPaywallView(paywall);

      view.registerEventHandlers({
        onCloseButtonPress: () => {
          // Return true to allow the paywall to close
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