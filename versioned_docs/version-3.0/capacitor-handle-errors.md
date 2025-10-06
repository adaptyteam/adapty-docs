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
import { adapty, AdaptyError, ErrorCodeName } from '@adapty/capacitor';

try {
  const result = await adapty.makePurchase({ product });
  
  // Handle purchase result
  if (result.type === 'success') {
    console.log('Purchase successful:', result.profile);
  } else if (result.type === 'user_cancelled') {
    console.log('User cancelled the purchase');
  } else if (result.type === 'pending') {
    console.log('Purchase is pending');
  }
} catch (error) {
  if (error instanceof AdaptyError) {
    console.error('Adapty error:', error.adaptyCode, error.localizedDescription);
    
    // Handle specific error codes
    switch (error.adaptyCode) {
      case ErrorCodeName.cantMakePayments:
        console.log('In-app purchases are not allowed on this device');
        break;
      case ErrorCodeName.notActivated:
        console.log('Adapty SDK is not activated');
        break;
      case ErrorCodeName.productPurchaseFailed:
        console.log('Purchase failed:', error.detail);
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
| `adaptyCode` | `number` | Numeric error code (e.g., `1003` for cantMakePayments) |
| `localizedDescription` | `string` | User-friendly error message |
| `detail` | `string \| undefined` | Additional error details (optional) |
| `message` | `string` | Full error message including code and description |

## Error Codes

The SDK exports constants and utilities for working with error codes:

### ErrorCodeName Constant

Maps string identifiers to numeric codes:

```typescript
import { ErrorCodeName } from '@adapty/capacitor';

ErrorCodeName.cantMakePayments // 1003
ErrorCodeName.notActivated // 2002
ErrorCodeName.networkFailed // 2005
```

### ErrorCode Constant

Maps numeric codes to string identifiers:

```typescript
import { ErrorCode } from '@adapty/capacitor';

ErrorCode[1003] // 'cantMakePayments'
ErrorCode[2002] // 'notActivated'
ErrorCode[2005] // 'networkFailed'
```

### Helper Functions

```typescript
import { getErrorCode, getErrorPrompt } from '@adapty/capacitor';

// Get numeric code from string name:
getErrorCode('cantMakePayments') // 1003

// Get string name from numeric code:
getErrorPrompt(1003) // 'cantMakePayments'
```

### Comparing Error Codes

**Important:** `error.adaptyCode` is a **number**, so compare it directly with numeric codes:

```typescript
// Option 1: Use ErrorCodeName constant (recommended) ✅
if (error.adaptyCode === ErrorCodeName.cantMakePayments) {
  console.log('Cannot make payments');
}

// Option 2: Compare with numeric literal ✅
if (error.adaptyCode === 1003) {
  console.log('Cannot make payments');
}

// NOT like this ❌ - compares number to string and will never match
if (error.adaptyCode === ErrorCode[1003]) {
}
```

## Global Error Handler

You can set up a global error handler to catch all Adapty errors:

```typescript showLineNumbers
import { AdaptyError, ErrorCodeName } from '@adapty/capacitor';

// Set up global error handler
AdaptyError.onError = (error: AdaptyError) => {
  console.error('Global Adapty error:', {
    code: error.adaptyCode,
    message: error.localizedDescription,
    detail: error.detail
  });
  
  // Handle specific error types globally
  if (error.adaptyCode === ErrorCodeName.notActivated) {
    // SDK not activated - maybe retry activation
    console.log('SDK not activated, attempting to reactivate...');
  }
};
```

## Common Error Handling Patterns

### Handle Purchase Errors

```typescript showLineNumbers
import { adapty, AdaptyError, ErrorCodeName } from '@adapty/capacitor';

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
        case ErrorCodeName.cantMakePayments:
          console.log('In-app purchases not allowed');
          break;
        case ErrorCodeName.productPurchaseFailed:
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
import { adapty, AdaptyError, ErrorCodeName } from '@adapty/capacitor';

async function fetchPaywall(placementId: string) {
  try {
    const paywall = await adapty.getPaywall({ placementId });
    return paywall;
  } catch (error) {
    if (error instanceof AdaptyError) {
      switch (error.adaptyCode) {
        case ErrorCodeName.networkFailed:
          console.log('Network error, retrying...');
          // Implement retry logic
          break;
        case ErrorCodeName.serverError:
          console.log('Server error:', error.detail);
          break;
        case ErrorCodeName.notActivated:
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