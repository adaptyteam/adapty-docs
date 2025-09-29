---
title: "Restore purchases in mobile app in React Native SDK"
description: "Learn how to restore purchases in Adapty to ensure seamless user experience."
metadataTitle: "Restoring Purchases in Adapty | Adapty Docs"
keywords: ['restorePurchases']
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import SampleApp from '@site/src/components/reusable/SampleApp.md';

Restoring Purchases in both iOS and Android is a feature that allows users to regain access to previously purchased content, such as subscriptions or in-app purchases, without being charged again. This feature is especially useful for users who may have uninstalled and reinstalled the app or switched to a new device and want to access their previously purchased content without paying again.

:::note
In paywalls built with [Paywall Builder](adapty-paywall-builder), purchases are restored automatically without additional code from you. If that's your case — you can skip this step.
:::

To restore a purchase if you do not use the [Paywall Builder](adapty-paywall-builder) to customize the paywall, call `.restorePurchases()` method:

```typescript showLineNumbers
try {
    const profile = await adapty.restorePurchases();
    const isSubscribed = profile.accessLevels['YOUR_ACCESS_LEVEL']?.isActive;
  
    if (isSubscribed) {
        // restore access
    }
} catch (error) {
    // handle the error
}
```


Response parameters:

| Parameter | Description |
|---------|-----------|
| **Profile** | <p>An [`AdaptyProfile`](sdk-models#adaptyprofile) object. This model contains info about access levels, subscriptions, and non-subscription purchases.</p><p>Сheck the **access level status** to determine whether the user has access to the app.</p> |

<SampleApp />