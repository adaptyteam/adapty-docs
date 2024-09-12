---
title: "Flutter – Making Purchases"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

To make the purchase, you have to call `.makePurchase()` method:

```javascript title="Flutter"
try {
  final profile = await Adapty().makePurchase(product: product);
  // successful purchase
} on AdaptyError catch (adaptyError) {
	// handle the error
} catch (e) {
}
```

Request parameters:

- **Product** (required): an [`AdaptyPaywallProduct`](sdk-models#adaptypaywallproduct) object retrieved from the paywall.

Response parameters:

- **Profile**: an [`AdaptyProfile`](sdk-models#adaptyprofile) object. This model contains info about access levels, subscriptions, and non-subscription purchases. Generally, you have to check only access level status to determine whether the user has premium access to the app.

:::warning
Make sure you've added [App Store Shared Secret](app-store-shared-secret) in Adapty Dashboard, without it, we can't validate purchases.
:::

Below is a complete example of making the purchase and checking the user's access level.

```javascript title="Flutter"
try {
  final profile = await Adapty().makePurchase(product: product);
  if (profile?.accessLevels['premium']?.isActive ?? false) {
		// grant access to premium features      
  }
} on AdaptyError catch (adaptyError) {
	// handle the error
} catch (e) {
}
```

:::warning
Make sure to set up [App Store Server Notifications](app-store-server-notifications) to receive subscription updates without significant delays.
:::

:::warning
Subscription offers

If your paywall has an active promotional offer for the product you are attempting to purchase, Adapty will automatically apply that offer at the time of purchase.

Adapty signs the request according to Apple guidelines, please make sure you've uploaded [Subscription Key](app-store-promotional-offers) in Adapty Dashboard when using promotional offers.
:::

### Restoring purchases

To restore purchases, you have to call `.restorePurchases()` method:

```javascript title="Flutter"
try {
  final profile = await Adapty().restorePurchases();
  // check the access level
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```

Response parameters:

- **Profile**: an [`AdaptyProfile`](sdk-models#adaptyprofile) object. This model contains info about access levels, subscriptions, and non-subscription purchases. Generally, you have to check only access level status to determine whether the user has premium access to the app.

### Redeeming an Offer Code

Since iOS 14.0 your users can redeem Offer Codes. To allow them to do so, you can present the Offer Code redemption sheet by calling the related SDK method.

```javascript title="Flutter"
try {
  await Adapty().presentCodeRedemptionSheet();
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```

:::danger
Our experience shows that in some applications Offer Code Redemption sheet behaves unstable. We recommend that you redirect the user directly to the App Store.

In order to do this, you need to open the url of the following format:
`https://apps.apple.com/redeem?ctx=offercodes&id={apple_app_id}&code={code}`
:::