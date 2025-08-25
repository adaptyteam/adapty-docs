---
title: "Handle errors in Flutter SDK"
description: "Handle errors in Flutter SDK."
metadataTitle: "Error Handling in Flutter | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 
import CrossPlatformErrors from '@site/src/components/reusable/CrossPlatformErrors.md';


Every error is returned by the SDK is `AdaptyErrorCode`. Here is an example:

```javascript showLineNumbers
    try {
      final result = await adapty.makePurchase(product: product);
    } on AdaptyError catch (adaptyError) {
      if (adaptyError.code == AdaptyErrorCode.paymentCancelled) {
        // Cancelled
      }
    } catch (e) {
    }
```

<CrossPlatformErrors />