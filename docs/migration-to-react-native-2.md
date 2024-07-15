---
title: "React Native — What's new"
description: ""
metadataTitle: ""
---

In the new version of the Adapty SDK, we've made quite a lot of changes to the internal implementation of our SDK, applying all of our accumulated experience. We also redesigned our public API and relationships between some entities so that it causes as little misunderstanding as possible and reduces the number of errors made by developers.

First, let's outline the things that have changed, and then let's discuss every item individually.

### Synopsis

- [Activation](#activation) — function moved to `adapty` namespace, arguments redesigned
- [Logging and debugging](#logging-and-debugging) — Clear errors messages, customization
- [Profile](#profile) — Methods renamed
- [Getting paywalls](#getting-paywalls) — Getting only requested paywall instead of all. `AdaptyPaywall` interface has changed
- [Getting products](#getting-products) — Getting list of products of a provided paywall separately. `AdaptyProduct` interface has changed
- [Introductory offer eligibility](#introductory-offer-eligibility) – Instead of a boolean, now there is an extended list of options
- [Products fetch policy](#products-fetch-policy) – Ability to explicitly get products after we send the receipt to our servers
- [Making purchases](#making-purchases) — Method renamed. Removed the `offerId` parameter
- [Updating attribution](#updating-attribution) — Arguments changed order
- [Promos](#promos) — Promo API discontinued. All methods removed
- [Event listeners](#event-listeners) — Events changed

### Activation

**Methods**  
In SDK v1, there was a separate `activateAdapty` function, that you would import. It read one object argument with all the parameters for initialization.

In SDK v2 there are several changes:

1. It is now a method `activate` of `adapty` namespace, so you would only need to import `adapty` instance
2. All the parameters besides `sdkKey` are now expected from the second argument (refer to example)
3. For a `logLevel` parameter, you may now import JavaScript-friendly `LogLevel` to make sure you provide a valid value. TypeScript string validation remains

**Example**  
 Note, that you can switch tabs:

- `v2.0.0 (New)` is an example of basic and precise activations for SDK v2
- `v1.x.x (Previous)` is an example of basic and precise activations for a latest `v1.x.x` version

```typescript v2.0.0 (New)
// AdaptySDK 2.0.0
import { adapty, LogLevel } from 'react-native-adapty';

// Basic setup:
await adapty.activate('MY_API_KEY');

// Or precise setup:
await adapty.activate('MY_API_KEY', {
	customerUserId: 'MY_USER_ID',
	observerMode: true,
	logLevel: LogLevel.VERBOSE, // ← can be replaced with a string 'verbose' too
});
```
```typescript v1.x.x (Previous)
// AdaptySDK 1.x.x
import { activateAdapty } from 'react-native-adapty';

// Basic setup:
await activateAdapty({
	sdkKey: 'MY_API_KEY',
});

// Or precise setup:
await activateAdapty({
	sdkKey: 'MY_API_KEY',
	customerUserId: 'MY_USER_ID',
	observerMode: true,
	logLevel: 'verbose',
});
```

**Motivation**

1. Simplifying the most common usage scenario
2. Excluding ambiguous functions outside `adapty` scope

### Logging and debugging

In SDK v2 there are several new features:

**Error prefixes**  
In SDK v2 you can now prepend a string to all Adapty error logs. It is ok to call this before initialization and wherever you want.

```typescript
import { AdaptyError } from 'react-native-adapty';

AdaptyError.prefix = "[ADAPTY]";
```

**Understandable logs**  
If you were trying to log error message, you would previously see "Unknown Adapty Error", as message was not handled by stdout. In SDK v2 logging errors are clear and concise.  
This is an example: `[ADAPTY] #2002 (notActivated): The Adapty is not activated`

1. `[ADAPTY]` is a prefix, that you can manually set as stated above
2. `#2002` is an Adapty code for you to Google around
3. `notActivated` is a string representation of a code. It might give you enough info to do a fix
4. `The Adapty is not activated` is a `localizedDescription` field from SDK v1

**Error hooks**  
You can now handle all the Adapty errors from any given place with `onError` hook. It will send to a callback all the registered AdaptyErrors right after they are created

```typescript
import { AdaptyError } from 'react-native-adapty';

AdaptyError.onError = error => {
	// ...
};
```

**Changing `logLevel` in a runtime**  
Now you can change your `logLevel` without reinitializing the SDK.

```typescript
import { adapty, LogLevel } from 'react-native-adapty';

adapty.setLogLevel(LogLevel.WARN); // string 'warn' would also work
```

### Profile

**Methods**  
Previously, in SDK v1,  there were  several methods:

1. `adapty.purchases.getInfo`
2. `adapty.profile.identify`
3. `adapty.profile.logout`
4. `adapty.profile.update`

In SDK v2, methods are renamed:

1. `adapty.purchases.getInfo` → `adapty.getProfile`
2. `adapty.profile.identify` → `adapty.identify`
3. `adapty.profile.logout` → `adapty.logout`
4. `adapty.profile.update` → `adapty.updateProfile`

**Example**  
 Note, that you can switch tabs:

- `v2.0.0 (New)` is an example of getting user profile for SDK v2
- `v1.x.x (Previous)` is an example of getting user profile for a latest `v1.x.x` SDK version

```typescript v2.0.0 (New)
// AdaptySDK 2.0.0
await adapty.identify();

const profile = await adapty.getProfile();

await adapty.updateProfile({firstName: "John", lastName: "Doe" });

await adapty.logout();
```
```typescript v1.x.x (Previous)
// AdaptySDK 1.x.x
await adapty.profile.identify();

const profile = await adapty.purchases.getInfo({ forceUpdate: true });

await adapty.profile.update({firstName: "John", lastName: "Doe" });

await adapty.profile.logout();
```

**Interfaces**

First of all, interfaces are renamed to improve readability and understanding. It is unlikely, that you've imported these to your project, but if you are, refer here:

1. `AdaptyPurchaserInfo` → `AdaptyProfile`
2. `AdaptyProfile` → `AdaptyProfileParameters`
3. `AdaptyPaidAccessLevelsInfo` → `AdaptyAccessLevel`
4. `AdaptyNonSubscriptionsInfo` → `AdaptyNonSubscription`
5. `AdaptySubscriptionsInfo` → `AdaptySubscription`
6. `AdaptyOfferType` → `OfferType`
7. `AdaptyVendorStore` → `VendorStore`

If you are using JavaScript, there are several new objects that may guarantee you safe values. You may import and use them as enums:

1. `OfferType` for example in `AdaptyAccessLevel.activeIntroductoryOfferType` and many more
2. `CancellationReason` for example in `AdaptyAccessLevel.cancellationReason`
3. `VendorStore` for example in `AdaptyAccessLevel.store`
4. `AppTrackingTransparencyStatus` in `AdaptyProfileParameters.appTrackingTransparencyStatus`
5. `Gender` in `AdaptyProfileParameters.gender`

Below you may find an extensive diff for every _profile_ interface:

```diff Profile interfaces diff
// Returned from `getProfile`, `makePurchase`, `restorePurchases`
-interface AdaptyPurchaserInfo {
+interface AdaptyProfile {
	accessLevels?: Record<string, AdaptyAccessLevel>;
+	customAttributes: Partial<AdaptyProfileParameters>;
-	customerUserId: string;
+	customerUserId?: string;
	nonSubscriptions?: Record<string, AdaptyNonSubscription[]>;
	profileId: string;
	subscriptions?: Record<string, AdaptySubscription>;
}

-interface AdaptyPaidAccessLevelsInfo {
+interface AdaptyAccessLevel {
-	activatedAt: string;
+	activatedAt: Date;
-	activeIntroductoryOfferType: AdaptyOfferType;
+	activeIntroductoryOfferType?: OfferType;
+	activePromotionalOfferId?: string;
-	activePromotionalOfferType: AdaptyOfferType;
+	activePromotionalOfferType?: OfferType;
-	billingIssueDetectedAt?: string;
+	billingIssueDetectedAt?: Date;
+	cancellationReason?: CancellationReason;
-	expiresAt: string;
+	expiresAt?: Date;
	id: string;
	isActive: boolean;
	isInGracePeriod: boolean;
	isLifetime: boolean;
+	isRefund: boolean;
-	renewedAt: string;
+	renewedAt?: Date;
-	startsAt: string;
+	startsAt?: Date;
	store: VendorStore;
-	unsubscribedAt?: string;
+	unsubscribedAt?: Date;
+	vendorOriginalTransactionId?: string;
	vendorProductId: string;
+	vendorTransactionId?: string;
	willRenew: boolean;
}

-interface AdaptyProfile {
+interface AdaptyProfileParameters {
	amplitudeDeviceId?: string;
	amplitudeUserId?: string;
+	analyticsDisabled?: boolean;
-	attStatus?: 0 | 1 | 2 | 3;
+	appTrackingTransparencyStatus?: AppTrackingTransparencyStatus;
	appmetricaDeviceId?: string;
	appmetricaProfileId?: string;
-	birthday?: Date;
+	birthday?: string;
-	customAttributes: { [key: string]: any };
+	codableCustomAttributes?: { [key: string]: any };
-	customerUserId: string;
	email?: string;
	facebookAnonymousId?: string;
-	facebookUserId: string;
+	firebaseAppInstanceId?: string;
	firstName?: string;
-	gender: 'male' | 'female' | 'other';
	gender?: Gender;
-	idfa: string;
	lastName?: string;
	mixpanelUserId?: string;
+	oneSignalPlayerId?: string;
	phoneNumber?: string;
+	pushwooshHWID?: string;
+	storeCountry?: string;
}

-interface AdaptyNonSubscriptionsInfo {
+interface AdaptyNonSubscription {
	isOneTime: boolean;
+	isRefund: boolean;
	isSandbox: boolean;
	purchaseId: string;
-	purchasedAt?: string;
+	purchasedAt: Date;
	store: VendorStore;
-	vendorOriginalTransactionId: string;
	vendorProductId: String;
-	vendorTransactionId: string;
+	vendorTransactionId?: string;
}

-interface AdaptySubscriptionsInfo {
+interface AdaptySubscription {
-	activatedAt?: string;
+	activatedAt: Date;
-	activeIntroductoryOfferType: AdaptyOfferType;
+	activeIntroductoryOfferType?: OfferType;
+	activePromotionalOfferId?: string;
	activePromotionalOfferType?: OfferType;
-	billingIssueDetectedAt?: string;
+	billingIssueDetectedAt?: Date;
-	cancellationReason?: string;
+	cancellationReason?: CancellationReason;
-	expiresAt?: string;
+	expiresAt?: Date;
	isActive: boolean;
	isInGracePeriod: boolean;
	isLifetime: boolean;
	isRefund: boolean;
	isSandbox: boolean;
-	renewedAt?: string;
+	renewedAt?: Date;
-	startsAt?: string;
+	startsAt?: Date;
	store: VendorStore;
-	unsubscribedAt?: string;
+	unsubscribedAt?: Date;
-	vendorOriginalTransactionId?: string;
+	vendorOriginalTransactionId: string;
	vendorProductId: string;
-	vendorTransactionId?: string;
+	vendorTransactionId: string;
	willRenew: boolean;
}
```

**Motivation**  
This name reflects the essence of the model much more correctly, because not every user is a subscriber

### Getting paywalls

**Methods**  
In SDK v1 there you could use `adapty.paywalls.getPaywalls(args?: { forceUpdate?: boolean })` that returned a list of paywalls.

In SDK v2, you can't fetch all paywalls at once. Instead you are expected to fetch the one you need via _developer ID_. Moreover, in SDK v2 fetching full products is a separate method. There are 2 methods available to you:

- `adapty.getPaywall(id: string)` fetches one paywall for a provided _developer id_
- `adapty.getPaywallProducts(paywall: AdaptyPaywall)` fetches a list of products for a provided paywall. It will be discussed in the next section

**Example**  
Previously, developers had to query an array of paywalls and then search that array for the desired element. We have significantly simplified this use case, so now you can get only the requested object, without touching the rest.  
Note, that you can switch tabs:

- `v2.0.0 (New)` is how you can get a paywall in a new SDK v2
- `v1.x.x (Previous)` is how you you could get a paywall and its products in SDK v1

```typescript v2.0.0 (New)
// AdaptySDK 2.0.0
const paywall = await adapty.getPaywall('YOUR_PLACEMENT_ID');
```
```typescript v1.x.x (Previous)
// AdaptySDK 1.x.x
const { paywalls } = await adapty.paywalls.getPaywalls({ forceUpdate: true });
// Find your preferred paywall. For example:
const paywall = paywalls.find(paywall => paywall.developerId === 'MY_PAYWALL');
```

**Logging**  
Previously, in SDK v1 there was a `adapty.paywalls.logShow` method to log, that user has opened a paywall.  
In SDK v2 there are two separate methods now:

- `adapty.paywalls.logShow` is renamed to `adapty.logShowPaywall`
- `adapty.logShowOnboarding`

**Fallback paywalls**  
Previously, in SDK v1 there was `adapty.paywalls.setFallback` method. In SDK v2 it is now called `adapty.setFallbackPaywalls`.

```typescript v2.0.0 (New)
// AdaptySDK 2.0.0
await adapty.logShowPaywall();

await adapty.setFallbackPaywalls(jsonStr);
```
```typescript v1.x.x (Previous)
// AdaptySDK 1.x.x
await adapty.paywalls.logShow();

await adapty.paywalls.setFallback(jsonStr);
```

**Interfaces**  
Below you can find all the changes introduced in v2.0.0 to `AdaptyPaywall` interface. Note, that you can switch tabs:

- `Changes` is a diff, that shows what have been removed and what have been added. Comments are provided
- `v2.0.0 (New)` is an interface representation in a new SDK v2
- `v1.x.x (Previous)` is an interface representation in a latest `v1.x.x` version

```diff Changes
interface AdaptyPaywall {
-	abTestName?: string; // it is now required
+	abTestName: string;
-	customPayloadString?: string; // renamed to `remoteConfigString`
+	remoteConfigString?: string;
+	remoteConfig?: string; // parsed JSON from `remoteConfigString`
-	developerId: string; // renamed to `id`
+	id: string;
-	isPromo: boolean; // Promos are no longer supported
	name?: string;
-	products: AdaptyProduct[]; // Full products are no longer fetched
+	vendorProductIds: string[]; // List of vendor ids is fetched instead
	revision: number;
	variationId: string;
-	visualPaywall?: string; // Visual paywalls are not currently supported
}
```
```typescript v2.0.0 (New)
// AdaptySDK 2.0.0
export interface AdaptyPaywall {
	readonly abTestName: string;
	readonly id: string;
	readonly name?: string;
	readonly remoteConfig?: Record<string, any>;
	readonly remoteConfigString?: string;
	readonly revision: number;
	readonly variationId: string;
	readonly vendorProductIds?: string[];
}
```
```typescript v1.x.x (Previous)
// AdaptySDK 1.x.x
export interface AdaptyPaywall {
	abTestName?: string;
	customPayloadString?: string;
	developerId: string;
	isPromo: boolean;
	name?: string;
	products: AdaptyProduct[];
	revision: number;
	variationId: string;
	visualPaywall?: string;
}
```

**Motivation**

1. Simplifying the most common usage scenario
2. Reduce internet traffic, to immensely improve response time

### Getting products

**Methods**  
Previously, in SDK v1 a product list was a part of `AdaptyPaywall`. Now in SDK v2 a product list is independent, although it can only exist in the context of the `AdaptyPaywall`.

There is a new method to get products: `adapty.getPaywallProducts(paywall)`.

**Example**  
Note, that you can switch tabs:

- \`v2.0.0 (New) is how you can query products in SDK v2
- `v1.x.x (Previous)` is how you could query products in SDK v1

```typescript v2.0.0 (New)
// AdaptySDK 2.0.0
const paywall = await adapty.getPaywall('YOUR_PLACEMENT_ID');
const products = await adapty.getPaywallProducts(paywall);
```
```typescript
// AdaptySDK 1.x.x
const { paywalls } = await adapty.paywalls.getPaywalls({ forceUpdate: true });
// Find your preferred paywall. For example:
const paywall = paywalls.find(paywall => paywall.developerId === 'MY_PAYWALL');
const products = paywall.products;
```

**Interface**  
Two interfaces slightly changed: `AdaptyProduct` and `AdaptyProductDiscount`. You may find diff below  
Interfaces renamed:

1. `AdaptyProductSubscriptionPeriod` → `AdaptySubscriptionPeriod`

```diff
interface AdaptyProduct {
-	currencyCode: string;
+	currencyCode?: string;
-	currencySymbol: string;
+	currencySymbol?: string;
	introductoryDiscount?: AdaptyProductDiscount;
-	introductoryOfferEligibility: boolean;
+	introductoryOfferEligibility: OfferEligibility;
	localizedDescription: string;
-	localizedPrice: string;
+	localizedPrice?: string;
	localizedSubscriptionPeriod?: string;
	localizedTitle: string;
-	paywallABTestName?: string;
+	paywallABTestName: string;
-	paywallName?: string;
+	paywallName: string;
	price: number;
	subscriptionPeriod: AdaptySubscriptionPeriod;
-	variationId?: string;
+	variationId: string;
	vendorProductId: string;
  
	android?: {
		freeTrialPeriod?: AdaptySubscriptionPeriod;
+		localizedFreeTrialPeriod?: string;
	};
	ios?: {
		discounts: AdaptyProductDiscount[];
		isFamilyShareable: boolean;
-		promotionalOfferEligibility: boolean;
+		promotionalOfferEligibility: OfferEligibility;
		promotionalOfferId?: string;
		regionCode?: string;
		subscriptionGroupIdentifier?: string;
	};
}


interface AdaptyProductDiscount {
+	localizedNumberOfPeriods?: string;
-	localizedPrice: string;
+	localizedPrice?: string;
-	localizedSubscriptionPeriod: string;
+	localizedSubscriptionPeriod?: string;
	numberOfPeriods: number;
	price: number;
	subscriptionPeriod: AdaptySubscriptionPeriod;

	ios?: {
		identifier?: string;
		paymentMode: OfferType;
-		localizedNumberOfPeriods?: string; // now crossplatform
	};
}
```

**Motivation:**  
We believe that this architecture will provide more flexibility in terms of receiving paywalls and products (for example, now you are not blocked by Apple when you receive a paywall), and will also optimize the load on the servers, which will speed up the response. Also, this approach is less error-prone.

:::warning
Products outside the paywalls

If you for some reason want to work with a product (or an array of products), please create a paywall for it. This approach is great for scaling and analytics.
:::

### Introductory offer eligibility

The `AdaptyProduct` entity has the `introductoryOfferEligibility` property, that determines whether the introductory offer is available to the user (for example, a free trial period). 

In SDK v1 it was a boolean value. In SDK v2 now it is a string union `'eligible' | 'ineligible' | 'unknown''`. You can also import `OfferEligibility` enum object if you need.

Note, that you can switch tabs:

- `v2.0.0 (New)` is how you can handle `introductoryOfferEligibility` in SDK v2
- `v1.x.x (Previous)` is how you handled `introductoryOfferEligibility` in SDK v1

```typescript v2.0.0 (New)
// AdaptySDK 2.0.0
import { OfferEligibility } from 'react-native-adapty';
// ...
switch (product.introductoryOfferEligibility) {
	case OfferEligibility.Eligible: // or 'eligible' string
		// ...
	case OfferEligibility.Ineligible: // or 'ineligible' string
		// ...
  case OfferEligibility.Unknown: // or 'unknown' string
		// ...
}
```
```typescript v1.x.x (Previous)
// AdaptySDK 1.x.x
// ...
if (product.introductoryOfferEligibility) {
	// ...
} else {
	// ...
}
```

**Motivation**  
**StoreKit** does not provide a convenient and reliable way to determine this value, so we have to do it by analyzing the receipt from the system. Since there are cases when this receipt is missing, we decided to inform you about these situations using the value `unknown`. We recommend working with `unknown` in the same way as `ineligible`. 

### Products fetch policy

Previously, SDK v1 did not allow you to reliably determine the value of the `introductoryOfferEligibility` without analyzing the receipt. Despite the fact that a missing receipt at startup is a pretty rare situation, we have added the ability to explicitly get products after we send the receipt to our servers.

In SDK v2 we will try to request a receipt in its unavailability in advance, and there is a special parameter of `getPaywallProducts` function to get products with a correct `introductoryOfferEligibility`

On JavaScript you can import `FetchPolicy` object to validate the passing values.

```typescript
// AdaptySDK v2.0.0
adapty.getPaywallProducts({ios: { fetchPolicy: 'waitForReceiptValidation' }});
```

**Motivation**  
We recommend first requesting products without overriding `fetchPolicy`, and then immediately rendering the UI. If you get back objects with an unknown `introductoryOfferEligibility` value, you can re-request products with `waitForReceiptValidation` policy and update the UI afterward.  
Read more about handling such a scenario in the [_Displaying Paywalls & Products_](https://docs.adapty.io/docs/ios-displaying-products) section.

### Making purchases

**Methods**  
Previously, in SDK v1 there was one method: `adapty.purchases.makePurchase`, that accepted product and platform-specific offer IDs.

In SDK v2 the method is renamed to `adapty.makePurchase`. It only accepts a product now. If your paywall has an active promotional offer for the product you are attempting to purchase, Adapty will automatically apply that offer at the time of purchase.

**Example**  
Note that you can switch tabs:

- `v2.0.0 (New)` is how you can make a purchase in SDK v2
- `v1.x.x (Previous)` is how you could make a purchase in SDK v1

```typescript v2.0.0 (New)
// AdaptySDK v2.0.0
await adapty.makePurchase(product);
```
```typescript v1.x.x (Previous)
// AdaptySDK v1.x.x
await adapty.purchases.makePurchase(product, { ios: { offerId: offerId }});
```

:::warning
Adapty signs the request according to Apple guidelines, please make sure you've uploaded [Subscription Key](app-store-promotional-offers) in Adapty Dashboard when using promotional offers.
:::

**Other purchase methods**

Previously, in SDK v1 there were 2 more methods:

1. `adapty.purchases.setVariationId` to inform Adapty about paywall purchases in _Observer Mode_
2. `adapty.purchases.restore`

In SDK v2 these methods have been renamed:

1. `adapty.purchases.setVariationId` → `adapty.setVariationId`
2. `adapty.purchases.restore` → `adapty.restorePurchases`

**Example**  
Note that you can switch tabs:

- `v2.0.0 (New)` is how you can set a `variationId` in SDK v2
- `v1.x.x (Previous)` is how you could set a `variationId` in SDK v1

```typescript v2.0.0 (New)
// AdaptySDK v2.0.0
await adapty.setVariationId(variationId, transactionId);

await adapty.restorePurchases();
```
```typescript v1.x.x (Previous)
// AdaptySDK v1.x.x
await adapty.purchases.setVariationId(variationId, transactionId);

await adapty.purchases.restore();
```

### Updating attribution

**Methods**  
Previously, in SDK v1 you needed to pass three arguments to an `updateAttribution` call: `networkUserId: string`, `attribution: Object`, `source: string union` consecutively.  
It caused a problem for several sources: they do not provide an exposed `networkUserId`, which was handled in SDK v2.

In SDK v2, there are several changes:

1. Arguments now have different order to make `networkUserId` optional: `attribution`, `source`, then optional `networkUserId`
2. For a `source` parameter, you may now import JavaScript-friendly `AttributionSource` object to make sure you provide a valid value. TypeScript string validation remains

**Example**  
 Note, that you can switch tabs:

- `v2.0.0 (New)` is an example of updating attribution for SDK v2
- `v1.x.x (Previous)` is an example of updating attribution for a latest `v1.x.x` SDK version

```typescript v2.0.0 (New)
// AdaptySDK 2.0.0
import { adapty, AttributionSource } from 'react-native-adapty';

// AppsFlyer example
appsFlyer.onInstallConversionData((installData) => {
	const networkUserId = appsFlyer.getAppsFlyerUID();
  
	await adapty.updateAttribution(
		installData,
		AttributionSource.AppsFlyer, // ← can be replaced with a string 'AppsFlyer' too
		networkUserId,
	);
});
```
```typescript v1.x.x (Previous)
// AdaptySDK 1.x.x
import { adapty } from 'react-native-adapty';

// AppsFlyer example
appsFlyer.onInstallConversionData((installData) => {
	const networkUserId = appsFlyer.getAppsFlyerUID();
  
	await adapty.updateAttribution(
		networkUserId,
		installData,
		'AppsFlyer',
	);
});
```

**Motivation**  
As stated, with introduction of new sources, `networkUserId` became optional. Major library update allows to change order of arguments to avoid passing something like`""`

### Promos

Adapty no longer supports Promo Push API. All methods were removed, except iOS native one. 

**`presentCodeRedemptionSheet` renamed**  
`adapty.promo.presentCodeRedemptionSheet` → `adapty.presentCodeRedemptionSheet`

### Event listeners

Previously, in SDK v1 there were 3 event listeners:

- `onInfoUpdate` `(profile: AdaptyProfile)`
- `onDeferredPurchase` `(product: AdaptyProduct)`
- `onPromoReceived` `(promo: AdaptyPromo)`

In SDK v2, there are only two event listeners:

- `onLatestProfileLoad` `(profile: AdaptyProfile)`
- `onDeferredPurchase` `(profile: AdaptyProfile)`

Deferred purchase event now sends a `AdaptyProfile` callback instead of a product. `onLatestProfileLoad` replaces `onInfoUpdate` and works exactly at the same times as previously

### In lieu of a conclusion

In this article, we have listed the most significant changes introduced in the new version, which can be seen in the public API. However, most of the improvements are hidden "under the hood" and are not mentioned here. Of course, we've completely updated our documentation to reflect the new release, so you can feel free to use it. 

You can find the complete list of changes on the [release page](https://github.com/adaptyteam/AdaptySDK-iOS/releases/tag/2.0.2). 

Stay tuned for more updates!