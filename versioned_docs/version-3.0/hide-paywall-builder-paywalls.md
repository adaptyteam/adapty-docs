---
title: "Hide Paywall Builder paywalls (on cross-platform SDKs)"
description: "Learn how to hide Paywall Builder paywalls for better user control."
metadataTitle: "Hiding Paywall Builder Paywalls | Adapty Docs"
---

import Tabs from '@theme/Tabs'; 
import TabItem from '@theme/TabItem'; 

While Paywall Builder seamlessly handles the purchasing process upon clicking "buy" buttons, you have to manage the closure of paywall screens within your mobile app.

In native iOS and Android SDKs, you have complete control over both presenting and hiding the paywalls. However in Flutter, React Native, and Unity SDKs this works a bit differently. Learn how below.

:::warning
This guide covers only hiding **new Paywall Builder paywalls**, which works with React Native SDK version 3.0 or higher, and Flutter and Unity SDKs version 3.3.0 or higher. To learn how to hide **legacy Paywall Builder paywalls**, read the [Hide legacy Paywall Builder paywalls (on cross-platform SDKs)](hide-legacy-paywall-builder-paywalls)
:::

## Dismiss a paywall screen

<Tabs>

<TabItem value="Unity" label="Unity" default> 

You can hide a paywall view by calling the `view.Dismiss` method.

```typescript showLineNumbers title="Flutter"
AdaptyUI.DismissView(view, (error) => {
  // handle the error
});
```

  </TabItem> 

<TabItem value="RN" label="React Native (TS)" default> 

- You can hide a paywall view in 2 ways: 

  - call the `view.dismiss` method 
  - return `true` from any [event ve-handlinhandler](handling-pb-paywall-events).

```typescript showLineNumbers title="React Native (TSX)"
try {
  await view.dismiss();
} catch (error) {
  // handle the error
}
```

</TabItem> </Tabs>
