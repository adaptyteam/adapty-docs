---
title: "Hide legacy Paywall Builder paywalls (on cross-platform SDKs)"
description: ""
metadataTitle: ""
---

import Tabs from '@theme/Tabs'; 
import TabItem from '@theme/TabItem'; 

While Paywall Builder seamlessly handles the purchasing process upon clicking "buy" buttons, you have to manage the closure of paywall screens within your mobile app.

In native iOS and Android SDKs, you have complete control over both presenting and hiding the paywalls. However in Flutter, React Native, and Unity SDKs this works a bit differently. Learn how below.

:::warning
This guide covers only hiding **legacy Paywall Builder paywalls** which supports Adapty SDK v2.x or earlier. To learn how to hide **new Paywall Builder paywalls**, read the [Hide Paywall Builder paywalls (on cross-platform SDKs)](hide-paywall-builder-paywalls)
:::

   <Tabs>  

<TabItem value="Flutter" label="Flutter" default> 

You can hide a paywall screen by calling the `view.dismiss` method.

```typescript showLineNumbers
try {
  await view.dismiss();
} on AdaptyError catch (e) {
  // handle the error
} catch (e) {
  // handle the error
}
```

</TabItem> 

<TabItem value="Unity" label="Unity" default> 

You can hide a paywall view by calling the `view.Dismiss` method.

```typescript
view.Dismiss((error) => {
  // handle the error
});
```

  </TabItem> 

<TabItem value="RN" label="React Native (TS)" default> 

You can hide a paywall view in 2 ways:

- call the `view.dismiss` method 
- return `true` from any [event ve-handlinhandler](handling-pb-paywall-events).

```typescript
try {
  await view.dismiss();
} catch (error) {
  // handle the error
}

```

</TabItem> </Tabs>

