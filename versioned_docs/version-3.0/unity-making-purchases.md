---
title: "Accept purchases"
description: "Learn how to accept purchases in your Unity app with Adapty SDK."
metadataTitle: "Accept Purchases | Unity SDK | Adapty Docs"
slug: /unity-making-purchases
displayed_sidebar: sdkunity
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

## Make a purchase

To make a purchase, use the `MakePurchase` method:

```csharp
using Adapty;

var paywalls = await Adapty.GetPaywalls();
var paywall = paywalls[0];
var product = paywall.Products[0];

try
{
    var purchase = await Adapty.MakePurchase(product);
    Debug.Log($"Purchase successful: {purchase.PurchaseId}");
}
catch (Exception error)
{
    Debug.LogError($"Purchase failed: {error.Message}");
}
```

## Purchase with options

You can specify additional options when making a purchase:

```csharp
var purchase = await Adapty.MakePurchase(product, new AdaptyPurchaseOptions
{
    AndroidSubscriptionUpdateParameters = new AndroidSubscriptionUpdateParameters
    {
        ReplacementMode = "with_time_proration"
    }
});
```

## Handle purchase result

The purchase result contains detailed information:

```csharp
var purchase = await Adapty.MakePurchase(product);

Debug.Log($"Purchase ID: {purchase.PurchaseId}");
Debug.Log($"Product ID: {purchase.VendorProductId}");
Debug.Log($"Store: {purchase.Store}");
Debug.Log($"Purchase date: {purchase.PurchaseDate}");
Debug.Log($"Expires date: {purchase.ExpiresDate}");
```

## Purchase validation

Adapty automatically validates purchases:

```csharp
try
{
    var purchase = await Adapty.MakePurchase(product);
    
    if (purchase.IsActive)
    {
        Debug.Log("Purchase is active");
        // Enable premium features
    }
    else
    {
        Debug.Log("Purchase is not active");
        // Handle inactive purchase
    }
}
catch (Exception error)
{
    Debug.LogError($"Purchase failed: {error.Message}");
}
```

## Subscription updates (Android)

For Android subscription updates:

```csharp
var purchase = await Adapty.MakePurchase(product, new AdaptyPurchaseOptions
{
    AndroidSubscriptionUpdateParameters = new AndroidSubscriptionUpdateParameters
    {
        ReplacementMode = "with_time_proration",
        OldPurchaseId = "old_purchase_id"
    }
});
```

## Purchase observer

To listen for purchase events:

```csharp
Adapty.OnPurchaseStarted += (product) =>
{
    Debug.Log($"Purchase started for: {product.VendorProductId}");
};

Adapty.OnPurchaseCompleted += (purchase) =>
{
    Debug.Log($"Purchase completed: {purchase.PurchaseId}");
};

Adapty.OnPurchaseFailed += (error) =>
{
    Debug.LogError($"Purchase failed: {error.Message}");
};
```

## Error handling

Handle different types of purchase errors:

```csharp
try
{
    var purchase = await Adapty.MakePurchase(product);
}
catch (Exception error)
{
    Debug.LogError($"Purchase error: {error.Message}");
}
```

## Testing purchases

For testing, use sandbox accounts:

```csharp
// In development, use sandbox accounts
// The SDK automatically handles sandbox vs production
var purchase = await Adapty.MakePurchase(product);
Debug.Log("Purchase made in sandbox mode");
``` 