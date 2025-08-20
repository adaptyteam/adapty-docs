---
title: "Handle errors in Capacitor SDK"
description: "Handle errors in Capacitor SDK."
metadataTitle: "Error Handling in Capacitor | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CrossPlatformErrors from '@site/src/components/reusable/CrossPlatformErrors.md';

Every error is returned by the SDK is `AdaptyErrorCode`. Here is an example:


```typescript showLineNumbers
try {
  const params: MakePurchaseParamsInput = {};
  await adapty.makePurchase(product, params);
} catch (error) {
  if (
    error instanceof AdaptyError &&
    error.adaptyCode === getErrorCode(ErrorCode['2'])
  ) {
    // payment cancelled
  }
}
```


<CrossPlatformErrors />