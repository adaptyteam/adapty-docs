---
title: "What's new in Adapty SDK 2.6"
description: "Discover the latest features and improvements in Adapty SDK 2.6."
metadataTitle: "What's New in Adapty SDK 2.6 | Adapty Docs"
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

> 💡 If you are migrating from Adapty SDK 1.x.x, we recommend you to read [What's new in Adapty SDK 2.0](whats-new-in-adapty-sdk-20) article first.

### Android SDK

:::note
Don't forget to configure offers in Google Play Console in Adapty

Google Billing Library v5 and v6 changed the way offers work. Be sure to follow [Google Play offers](google-play-offers) guide to configure them properly.
:::

With the release of Adapty SDK version 2.6.1, we are excited to announce support for [](https://developer.android.com/google/play/billing/compatibility). This update includes several improvements and additions to the public API for the native [Android](sdk-installation-android), [Flutter](sdk-installation-flutter), [React Native](sdk-installation-reactnative). [Unity SDK](sdk-installation-unity) also supports the new versions of billing library but starting with [2.7.0](https://github.com/adaptyteam/AdaptySDK-Unity/releases/tag/2.7.0).

Here are the key changes and enhancements:

1. **Unified subscription details:** We have removed separate properties for free trials on Android to provide a more streamlined experience.** Instead, we have introduced an optional `subscriptionDetails` [property](https://kotlin.adapty.io/adapty/com.adapty.models/-adapty-paywall-product/subscription-details)  that consolidates  all subscription-related properties. **It includes an `introductoryOfferPhases` [property](https://kotlin.adapty.io/adapty/com.adapty.models/-adapty-product-subscription-details/introductory-offer-phases), which is a list that can contain up to two phases: the free trial phase and the introductory price phase.

   |                                     | Before (Kotlin)                                                      | After (Kotlin)                                                                                                                                       |
   | :---------------------------------- | :------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
   | Checking discount offer eligibility | `product.introductoryOfferEligibility == AdaptyEligibility.ELIGIBLE` | `product.subscriptionDetails?.introductoryOfferEligibility == AdaptyEligibility.ELIGIBLE`                                                            |
   | Introductory price info             | `product.introductoryDiscount`                                       | `product.subscriptionDetails?.introductoryOfferPhases?.firstOrNull { it.paymentMode in listOf(PaymentMode.PAY_UPFRONT, PaymentMode.PAY_AS_YOU_GO) }` |
   | Free trial info                     | `product.freeTrialPeriod`                                            | `product.subscriptionDetails?.introductoryOfferPhases?.firstOrNull { it.paymentMode == PaymentMode.FREE_TRIAL }?.subscriptionPeriod`                 |
   | Free trial info (localized)         | `product.localizedFreeTrialPeriod`                                   | `product.subscriptionDetails?.introductoryOfferPhases?.firstOrNull { it.paymentMode == PaymentMode.FREE_TRIAL }?.localizedSubscriptionPeriod`        |

2. **Payment mode for discounts:** To align with iOS, we have added the `paymentMode` property to the `AdaptyProductDiscountPhase` [entity](https://kotlin.adapty.io/adapty/com.adapty.models/-adapty-product-discount-phase/).

3. **Renewal type for subscriptions:** We have introduced the `renewalType` property in the `AdaptyProductSubscriptionDetails` [entity](https://kotlin.adapty.io/adapty/com.adapty.models/-adapty-product-subscription-details/) to accommodate the two types of subscriptions available on Google Play: auto-renewable and prepaid.

4. **Price entity updates:** The `price`, `localizedPrice`, `currencyCode` and `currencySymbol` properties have been moved from `AdaptyPaywallProduct` to a new [entity](https://kotlin.adapty.io/adapty/com.adapty.models/-adapty-paywall-product/-price/) called `Price`.

5. **SKU details update:** The `skuDetails` property in `AdaptyPaywallProduct` has been renamed to `productDetails` to reflect the use of original product entities from Google.

6. **Eligibility status update:** In `AdaptyEligibility`, we have replaced the `UNKNOWN `value with `NOT_APPLICABLE`. The latter is used for products that cannot contain offers, such as `prepaid` products in the Google Play console.

7. **Personalized offers**: We have added a boolean parameter `isOfferPersonalized` to `makePurchase()`, with a default value of false. For more information, refer to the following [documentation](https://developer.android.com/google/play/billing/integrate#personalized-price).

8. **Offer identification:** The `offerId` property has been added to the `AccessLevel` and `Subscription` entities in `AdaptyProfile`. It is an optional field that represents the discount offer ID from Google Play. Additionally, we want to draw your attention to the fact that the `vendorProductId` in these entities may contain either `productId` only or `productId:basePlanId`.

9. **Replacement mode:** We have renamed `ProrationMode` to `ReplacementMode`, and the [constants](https://kotlin.adapty.io/adapty/com.adapty.models/-adapty-subscription-update-parameters/-replacement-mode/) have been adjusted to align with Google's standards.

For more detailed information and step-by-step guides on adding products and base plans to the Google Play Store, refer to our [documentation](android-products).

We hope these updates enhance your experience with Adapty SDK and the integration with Google's new billing system.

### Cross-platform SDKs migration

#### Determine introductory offer eligibility

##### Adapty SDK 2.4.x and older:

<Tabs groupId="current-os" queryString>
<TabItem value="flutter" label="Flutter" default>
```javascript showLineNumbers
// Adapty 2.4.x and older

try {
  final products = await Adapty().getPaywallProducts(paywall: paywall);
  final product = products[0]; // don't forget to check products count before accessing
  
  if (product.introductoryOfferEligibility == AdaptyEligibility.eligible) {
    // display offer
  } else if (product.introductoryOfferEligibility == AdaptyEligibility.ineligible) {
    // user is not eligible for this offer
  } else {
    // Adapty SDK wasn't able to determine eligibility at this step
    // Refetch products with .waitForReceiptValidation policy:
    final products = await adapty.getPaywallProducts(
      paywall: paywall,
      fetchPolicy: AdaptyIOSProductsFetchPolicy.waitForReceiptValidation,
    );
    
    // if there wasn't error, elegibility should be eligible or ineligible.
  }
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
  // handle the error
}
```
</TabItem>
<TabItem value="unity" label="Unity" default>
```csharp showLineNumbers
// Adapty 2.4.x and older

Adapty.GetPaywallProducts(paywall, (products, error) => {
  var product = products[0]; // don't forget to check products count and error before accessing

  if (product.IntroductoryOfferEligibility == Adapty.Eligibility.Eligible) {
    // display offer
  } else if (product.IntroductoryOfferEligibility == Adapty.Eligibility.Ineligible) {
    // user is not eligible for this offer
  } else {
    // Adapty SDK wasn't able to determine eligibility at this step
    // Refetch products with .WaitForReceiptValidation policy:
    Adapty.GetPaywallProducts(paywall, IOSProductsFetchPolicy.WaitForReceiptValidation, (products, error) => {
      // if there wasn't error, elegibility should be eligible or ineligible.
    });
  }
});
```
</TabItem>
<TabItem value="rn" label="React Native (TS)" default>
```typescript showLineNumbers
// Adapty 2.4.x and older

import {adapty,OfferEligibility} from 'react-native-adapty';

const products = await adapty.getPaywallProducts(paywall);
const product = products[0]; // or any other product

switch (product.introductoryOfferEligibility) {
  case OfferEligibility.Eligible:
    // display offer
  case OfferEligibility.Ineligible:
    // user is not eligible for this offer
  case OfferEligibility.Unknown:
    // Adapty SDK wasn't able to determine eligibility at this step
    // Refetch products with 'waitForReceiptValidation' policy:   
}
```
</TabItem>
</Tabs>

##### Adapty SDK 2.6.0 and newer:

<Tabs groupId="current-os" queryString>
<TabItem value="flutter" label="Flutter" default>
```javascript showLineNumbers
// Adapty 2.6.0+

try {
  final products = await Adapty().getPaywallProducts(paywall: paywall);
  // at this step you can display products
  // but you shouldn't display offers as eligibilities are not determined yet
  
  final eligibilities = await Adapty().getProductsIntroductoryOfferEligibility(products: products);
  final introEligibility = eligibilities["your_product_id"];
  
  switch (introEligibility) {
    case AdaptyEligibility.eligible:
      // display offer
      break;
    default:
      // don't display offer
      break;
    }
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
  // handle the error
}
```
</TabItem>
<TabItem value="unity" label="Unity" default>
```csharp showLineNumbers
// Adapty 2.6.0+

Adapty.GetPaywallProducts(paywall, (products, error) => {
  // at this step you can display products              
  // but you shouldn't display offers as eligibilities are not determined yet

  Adapty.GetProductsIntroductoryOfferEligibility(products, (eligibilities, error) => {
    var introEligibility = eligibilities["your_product_id"];
    switch (introEligibility) {
      case Eligibility.Eligible:
        // display offer
        break;
      default:
        // don't display offer
        break;
     }
  });
});
```
</TabItem>
<TabItem value="rn" label="React Native (TS)" default>
```typescript showLineNumbers
// Adapty 2.6.0+

import {adapty,OfferEligibility} from 'react-native-adapty';

const products = await adapty.getPaywallProducts(paywall);
const eligibilityMap = await adapty.getProductsIntroductoryOfferEligibility(products);

const introEligibility = eligibilityMap["your_product_id"];

if (intoEligibility === OfferEligibility.Eligible) {
  // display offer
  return;
}
// user is not eligible
```
</TabItem>
</Tabs>



#### Displaying product and offers

##### Adapty SDK 2.4.x and older:

<Tabs groupId="current-os" queryString>
<TabItem value="flutter" label="Flutter" default>
```javascript showLineNumbers
// Adapty 2.4.x and older

try {
  final products = await Adapty().getPaywallProducts(paywall: paywall);
  final product = products[0];

  final titleString = product.localizedTitle;
  final priceString = product.localizedPrice;

  // Introductory Offer
  final introductoryDiscount = product.introductoryDiscount;
  
  if (introductoryDiscount != null) {
    final introPrice = introductoryDiscount.localizedPrice;
    final introPeriod = introductoryDiscount.localizedSubscriptionPeriod;
    final introNumberOfPeriods = introductoryDiscount.localizedNumberOfPeriods;
  }

  // Free Trial for Android
  final freeTrialPeriod = product.freeTrialPeriod;
  final localizedFreeTrialPeriod = product.localizedFreeTrialPeriod;
  
  // Promo Offer for iOS¡
  final promoOfferId = product.promotionalOfferId;
  final promoDisount = product.discounts.firstWhere((element) => element.identifier == promoOfferId);
  
  if (promoDisount != null) {
    final promoPrice = promoDisount.localizedPrice;
    final promoPeriod = promoDisount.localizedSubscriptionPeriod;
    final promoNumberOfPeriods = promoDisount.localizedNumberOfPeriods;
  }
} on AdaptyError catch (adaptyError) {
    // handle the error
} catch (e) {
    // handle the error
}
```
</TabItem>
<TabItem value="unity" label="Unity" default>
```csharp showLineNumbers
// Adapty 2.4.0+

Adapty.GetPaywallProducts(paywall, (products, error) => {
  // Do not forget to check arrays lenghts and nullable properties!

  var product = products[0];

  var titleString = product.LocalizedTitle;
  var priceString = product.LocalizedPrice;

  // Introductory Offer
  var introductoryDiscount = product.IntroductoryDiscount;

  if (introductoryDiscount != null) {
    var introPrice = introductoryDiscount.LocalizedPrice;
    var introPeriod = introductoryDiscount.LocalizedSubscriptionPeriod;
    var introNumberOfPeriods = introductoryDiscount.LocalizedNumberOfPeriods;
  }

  // Free Trial for Android
  var freeTrialPeriod = product.AndroidFreeTrialPeriod;
  var localizedFreeTrialPeriod = product.AndroidLocalizedFreeTrialPeriod;

  // Promo Offer for iOS
  var promoOfferId = product.PromotionalOfferId;
  ProductDiscount promoDisount = null;

  foreach (var discount in product.Discounts) {
    if (discount.Identifier == promoOfferId) {
      promoDisount = discount;
      break;
    }
  }

  if (promoDisount != null) {
    var promoPrice = promoDisount.LocalizedPrice;
    var promoPeriod = promoDisount.LocalizedSubscriptionPeriod;
    var promoNumberOfPeriods = promoDisount.LocalizedNumberOfPeriods;
  }
});
```
</TabItem>
<TabItem value="rn" label="React Native (TS)" default>
```typescript showLineNumbers
// Adapty 2.4.x and older

import {adapty} from 'adapty';

const paywall = await adapty.getPaywall('MY_PAYWALL');
const products = await adapty.getPaywallProducts(paywall);
const product = products[0]; // or any filter

const title = product.localizedTitle;
const price = product.localizedPrice;

// Introductory offer
const introDiscount = product.introductoryDiscount;
if (introDiscount) {
  const introPrice = introDiscount.localizedPrice;
  const introPeriod = introDiscount.localizedSubscriptionPeriod;
  const introNumberOfPeriods = introDiscount.localizedNumberOfPeriods;
}

// Free Trial for Android
const freeTrialPeriod = product.android?.freeTrialPeriod;
const localizedFreeTrialPeriod = product.android?.localizedFreeTrialPeriod;

// iOS Promo Offer
const promoOfferId = product.ios?.promotionalOfferId;
const promoDiscount = product.ios?.discounts.find(
  discount => discount.ios?.identifier === promoOfferId,
);
if (promoDiscount) {
  const promoPrice = promoDiscount.localizedPrice;
  const promoPeriod = promoDiscount.localizedSubscriptionPeriod;
  const promoNumberOfPeriods = promoDiscount.localizedNumberOfPeriods;
}

```
</TabItem>
</Tabs>

##### Adapty SDK 2.6.0 and newer:

<Tabs groupId="current-os" queryString>
<TabItem value="flutter" label="Flutter" default>
```javascript showLineNumbers
// Adapty 2.6.0+

try {
  final products = await Adapty().getPaywallProducts(paywall: paywall);
  final product = products[0];

  final titleString = product.localizedTitle;
  final priceString = product.localizedPrice;

  // It is possible to have more than one introductory offer (e.g. on Android)
  final introductoryOffer = product.subscriptionDetails?.introductoryOffer.first;
  
  if (introductoryOffer != null) {
    final introPrice = introductoryOffer.price.localizedString;
    final introPeriod = introductoryOffer.localizedSubscriptionPeriod;
    final introNumberOfPeriods = introductoryOffer.localizedNumberOfPeriods;
  }

  // Promo Offer
  final promotionalOfferEligibility = product.subscriptionDetails?.promotionalOfferEligibility ?? false;
  final promotionalOffer = product.subscriptionDetails?.promotionalOffer;
        
  if (promotionalOfferEligibility && promotionalOffer != null) {
    final promoPrice = promotionalOffer.price.localizedString;
    final promoPeriod = promotionalOffer.localizedSubscriptionPeriod;
    final promoNumberOfPeriods = promotionalOffer.localizedNumberOfPeriods;
  }
} on AdaptyError catch (adaptyError) {
    // handle the error
} catch (e) {
    // handle the error
}
```
</TabItem>
<TabItem value="unity" label="Unity" default>
```csharp showLineNumbers
// Adapty 2.6.0+

Adapty.GetPaywallProducts(paywall, (products, error) => {
  // Do not forget to check arrays lenghts and nullable properties!
  
  var product = products[0];

  var titleString = product.LocalizedTitle;
  var priceString = product.Price.LocalizedString;

  // It is possible to have more than one introductory offer (e.g. on Android)
  var introductoryOffer = product.SubscriptionDetails.IntroductoryOffer[0];

  if (introductoryOffer != null) {
    var introPrice = introductoryOffer.Price.LocalizedString;
    var introPeriod = introductoryOffer.LocalizedSubscriptionPeriod;
    var introNumberOfPeriods = introductoryOffer.LocalizedNumberOfPeriods;
  }

  // Promo Offer
  var promotionalOfferEligibility = product.SubscriptionDetails.PromotionalOfferEligibility;
  var promotionalOffer = product.SubscriptionDetails.PromotionalOffer;

  if (promotionalOfferEligibility && promotionalOffer != null) {
    var promoPrice = promotionalOffer.Price.LocalizedString;
    var promoPeriod = promotionalOffer.LocalizedSubscriptionPeriod;
    var promoNumberOfPeriods = promotionalOffer.LocalizedNumberOfPeriods;
  }
});
```
</TabItem>
<TabItem value="rn" label="React Native (TS)" default>
```typescript showLineNumbers
// Adapty 2.6.0+

import {adapty} from 'react-native-adapty';

const paywall = await adapty.getPaywall('MY_PAYWALL');
const products = await adapty.getPaywallProducts(paywall);
const product = products[0]; // or any filter

const title = product?.localizedTitle;
const price = product?.localizedDescription;

// It is possible to have more than one introductory offer (e.g. on Android)
const introductoryOffer =
  product?.subscriptionDetails?.introductoryOffers?.find(
    (offer, index) => index === 0,
  );
if (introductoryOffer) {
  const introPrice = introductoryOffer.price.localizedString;
  const introPeriod = introductoryOffer.localizedSubscriptionPeriod;
  const introNumberOfPeriods = introductoryOffer.localizedNumberOfPeriods;
}

// Promo Offer
const promotionalOffer = product?.subscriptionDetails?.ios?.promotionalOffer;

if (promotionalOffer) {
  const promoPrice = promotionalOffer.price.localizedString;
  const promoPeriod = promotionalOffer.localizedSubscriptionPeriod;
  const promoNumberOfPeriods = promotionalOffer.localizedNumberOfPeriods;
}

```
</TabItem>
</Tabs>