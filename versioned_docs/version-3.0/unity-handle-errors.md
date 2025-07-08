---
title: "Handle errors in Unity SDK"
description: "Handle errors in Unity SDK."
metadataTitle: "Error Handling in Unity | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CrossPlatformErrors from '@site/src/components/reusable/CrossPlatformErrors.md'

Every error is returned by the SDK is `AdaptyErrorCode`. Here is an example:

```csharp showLineNumbers
Adapty.MakePurchase(product, (profile, error) => {
  if (error != null && error.Code == Adapty.ErrorCode.PaymentCancelled) {
      // payment cancelled
  }
});
```

<CrossPlatformErrors.md />