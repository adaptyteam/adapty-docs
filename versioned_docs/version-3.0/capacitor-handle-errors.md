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

Every error returned by the SDK is an `AdaptyError` instance. Here is an example:

```typescript showLineNumbers
import { adapty } from '@adapty/capacitor';

try {
  await adapty.makePurchase({ product });
} catch (error) {
  if (error instanceof AdaptyError) {
    console.error('Adapty error:', error.adaptyCode, error.localizedDescription);
    
    // Handle specific error codes
    switch (error.adaptyCode) {
      case 2: // user_cancelled
        console.log('User cancelled the purchase');
        break;
      case 1003: // cantMakePayments
        console.log('In-app purchases are not allowed on this device');
        break;
      case 2002: // notActivated
        console.log('Adapty SDK is not activated');
        break;
      default:
        console.log('Other error occurred:', error.detail);
    }
  } else {
    console.error('Non-Adapty error:', error);
  }
}
```

## Error Properties

The `AdaptyError` class provides the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `adaptyCode` | `ErrorCode` | Numeric error code (e.g., `2` for user cancellation) |
| `localizedDescription` | `string` | User-friendly error message |
| `detail` | `string \| undefined` | Additional error details (optional) |
| `message` | `string` | Full error message including code and description |

## Global Error Handler

You can set up a global error handler to catch all Adapty errors:

```typescript showLineNumbers
import { AdaptyError } from '@adapty/capacitor';

// Set up global error handler
AdaptyError.onError = (error: AdaptyError) => {
  console.error('Global Adapty error:', {
    code: error.adaptyCode,
    message: error.localizedDescription,
    detail: error.detail
  });
  
  // Handle specific error types globally
  if (error.adaptyCode === 2002) {
    // SDK not activated - maybe retry activation
    console.log('SDK not activated, attempting to reactivate...');
  }
};
```

## Common Error Handling Patterns

### Handle Purchase Errors

```typescript showLineNumbers
import { adapty } from '@adapty/capacitor';

async function handlePurchase(product: AdaptyPaywallProduct) {
  try {
    const result = await adapty.makePurchase({ product });
    
    if (result.type === 'success') {
      console.log('Purchase successful:', result.profile);
    } else if (result.type === 'user_cancelled') {
      console.log('User cancelled the purchase');
    } else if (result.type === 'pending') {
      console.log('Purchase is pending');
    }
  } catch (error) {
    if (error instanceof AdaptyError) {
      switch (error.adaptyCode) {
        case 2: // user_cancelled
          console.log('User cancelled the purchase');
          break;
        case 1003: // cantMakePayments
          console.log('In-app purchases not allowed');
          break;
        case 1006: // productPurchaseFailed
          console.log('Purchase failed:', error.detail);
          break;
        default:
          console.error('Purchase error:', error.localizedDescription);
      }
    }
  }
}
```

### Handle Network Errors

```typescript showLineNumbers
import { adapty } from '@adapty/capacitor';

async function fetchPaywall(placementId: string) {
  try {
    const paywall = await adapty.getPaywall({ placementId });
    return paywall;
  } catch (error) {
    if (error instanceof AdaptyError) {
      switch (error.adaptyCode) {
        case 2005: // networkFailed
          console.log('Network error, retrying...');
          // Implement retry logic
          break;
        case 2004: // serverError
          console.log('Server error:', error.detail);
          break;
        case 2002: // notActivated
          console.log('SDK not activated');
          break;
        default:
          console.error('Paywall fetch error:', error.localizedDescription);
      }
    }
    throw error;
  }
}
```

<CrossPlatformErrors />