---
title: "Enable purchases in your custom paywall in Capacitor SDK"
description: "Integrate Adapty SDK into your custom Capacitor paywalls to enable in-app purchases."
metadataTitle: "Adapty Quickstart Guide | Adapty Docs"
keywords: ['paywalls capacitor', 'sdk capacitor', 'paywall', 'getPaywall']
---

This guide describes how to integrate Adapty into your custom paywalls. Keep full control over paywall implementation, while the Adapty SDK fetches products, handles new purchases, and restores previous ones.

:::important
**This guide is for developers who are implementing custom paywalls.** If you want the easiest way to enable purchases, use the [Adapty Paywall Builder](capacitor-quickstart-paywalls.md). With Paywall Builder, you create paywalls in a no-code visual editor, and Adapty handles all purchase logic automatically.
:::

## Before you start

### Set up products

To enable in-app purchases, you need to understand three key concepts:

- [**Products**](product.md) – anything users can buy (subscriptions, consumables, lifetime access)
- [**Paywalls**](paywalls.md) – configurations that define which products to offer. In Adapty, paywalls are the only way to retrieve products, but this design lets you modify products, prices, and offers without touching your app code.
- [**Placements**](placements.md) – where and when you show paywalls in your app (like `main`, `onboarding`, `settings`). You set up paywalls for placements in the dashboard, then request them by placement ID in your code. This makes it easy to run A/B tests and show different paywalls to different users.

Make sure you understand these concepts even if you work with your custom paywall. Basically, they are just your way to manage the products you sell in your app.

To implement your custom paywall, you will need to create a **paywall** and add it to a **placement**. This setup allows you to retrieve your products. To understand what you need to do in the dashboard, follow the quickstart guide [here](quickstart.md).

### Manage users

You can work either with or without backend authentication on your side.

However, the Adapty SDK handles anonymous and identified users differently. Read the [identification quickstart guide](capacitor-quickstart-identify.md) to understand the specifics and ensure you are working with users properly.

## Step 1. Get products

To retrieve products for your custom paywall, you need to:

1. Get the `paywall` object by passing [placement](placements.md) ID to the `getPaywall` method.
2. Get the products array for this paywall using the `getPaywallProducts` method.

```typescript showLineNumbers
import { adapty } from '@adapty/capacitor';
import type { AdaptyPaywall, AdaptyPaywallProduct } from '@adapty/capacitor';

async function loadPaywall() {
  try {
    const paywall: AdaptyPaywall = await adapty.getPaywall({
      placementId: 'YOUR_PLACEMENT_ID'
    });

    const products: AdaptyPaywallProduct[] = await adapty.getPaywallProducts({
      paywall
    });

    // Use products to build your custom paywall UI
  } catch (error) {
    // Handle the error
  }
}
```



## Step 2. Accept purchases

When a user taps on a product in your custom paywall, call the `makePurchase` method with the selected product. This will handle the purchase flow and return the updated profile.

```typescript showLineNumbers
import { adapty } from '@adapty/capacitor';
import type { AdaptyPaywallProduct, AdaptyPurchaseResult } from '@adapty/capacitor';

async function purchaseProduct(product: AdaptyPaywallProduct) {
  try {
    const result: AdaptyPurchaseResult = await adapty.makePurchase({ product });

    if (result.type === 'success') {
      // Purchase successful, profile updated
    } else if (result.type === 'user_cancelled') {
      // User canceled the purchase
    } else if (result.type === 'pending') {
      // Purchase is pending (e.g., user will pay offline with cash)
    }
  } catch (error) {
    // Handle the error
  }
}
```

## Step 3. Restore purchases

App stores require all apps with subscriptions to provide a way users can restore their purchases.

Call the `restorePurchases` method when the user taps the restore button. This will sync their purchase history with Adapty and return the updated profile.

```typescript showLineNumbers
import { adapty } from '@adapty/capacitor';
import type { AdaptyProfile } from '@adapty/capacitor';

async function restorePurchases() {
  try {
    const profile: AdaptyProfile = await adapty.restorePurchases();
    // Restore successful, profile updated
  } catch (error) {
    // Handle the error
  }
}
```

## Next steps

Your paywall is ready to be displayed in the app. To see how this works in a production-ready implementation, check out the [App.tsx](https://github.com/adaptyteam/AdaptySDK-Capacitor/blob/master/examples/adapty-devtools/src/screens/app/App.tsx) in our example app, which demonstrates purchase handling with proper error handling, loading states, and comprehensive SDK integration.

Next, [check whether users have completed their purchase](capacitor-check-subscription-status.md) to determine whether to display the paywall or grant access to paid features.
